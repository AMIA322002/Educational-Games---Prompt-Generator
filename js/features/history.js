import { $, escapeHtml } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { copyText } from "../utils/files.js";
import { db, persist } from "../state/db.js";
import { session } from "../state/session.js";
import { MAX_HISTORY } from "../config.js";
import { showPage } from "./navigation.js";
import { setStep } from "./form.js";

/** Record a generated prompt (newest first, capped at MAX_HISTORY). */
export function addHistory(config, prompt) {
  db.history = db.history || [];
  db.history.unshift({
    id: Date.now(),
    title: config.topic + " — " + config.gameType,
    created: new Date().toISOString(),
    prompt,
    config,
  });
  db.history = db.history.slice(0, MAX_HISTORY);
  persist();
  renderHistory();
}

function historyRow(h) {
  return [
    '<div class="project">',
    "<div>",
    `<strong>${escapeHtml(h.title)}</strong>`,
    `<small>${new Date(h.created).toLocaleString()}</small>`,
    "</div>",
    '<div class="actions">',
    `<button class="btn small" data-openhistory="${h.id}">Buka Prompt</button>`,
    `<button class="btn small" data-copyhistory="${h.id}">Salin</button>`,
    "</div>",
    "</div>",
  ].join("");
}

export function renderHistory() {
  const list = db.history || [];
  $("#historyList").innerHTML = list.length
    ? list.map(historyRow).join("")
    : '<div class="empty">Belum ada riwayat prompt.</div>';
}

function openHistory(id) {
  const h = db.history.find((x) => x.id === id);
  if (!h) return;
  session.lastPrompt = h.prompt;
  session.lastConfig = h.config;
  $("#promptOutput").value = h.prompt;
  $("#promptPanel").classList.remove("hidden");
  showPage("builder");
  setStep(7);
  $("#promptPanel").scrollIntoView({ behavior: "smooth" });
}

export function initHistory() {
  // One delegated listener instead of re-binding buttons after every render.
  $("#historyList").addEventListener("click", (e) => {
    const open = e.target.closest("[data-openhistory]");
    if (open) return openHistory(Number(open.dataset.openhistory));
    const copy = e.target.closest("[data-copyhistory]");
    if (copy) {
      const h = db.history.find((x) => x.id === Number(copy.dataset.copyhistory));
      if (h) copyText(h.prompt);
    }
  });
  $("#clearHistory").onclick = () => {
    if (confirm("Hapus seluruh riwayat prompt?")) {
      db.history = [];
      persist();
      renderHistory();
      toast("Riwayat dihapus.");
    }
  };
}
