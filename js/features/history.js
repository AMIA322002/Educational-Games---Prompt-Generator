import { $, escapeHtml } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { copyText } from "../utils/files.js";
import { listHistory, addHistoryRow, clearHistory } from "../state/store.js";
import { session } from "../state/session.js";
import { showPage } from "./navigation.js";
import { setStep } from "./form.js";

let cache = [];

export async function addHistory(config, prompt) {
  try {
    await addHistoryRow({ title: config.topic + " — " + config.gameType, config, prompt });
    await renderHistory();
  } catch (e) {
    toast("Riwayat gagal disimpan: " + e.message);
  }
}

function historyRow(h) {
  return [
    '<div class="project"><div>',
    `<strong>${escapeHtml(h.title)}</strong>`,
    `<small>${new Date(h.created_at).toLocaleString()}</small>`,
    '</div><div class="actions">',
    `<button class="btn small" data-openhistory="${h.id}">Buka Prompt</button>`,
    `<button class="btn small" data-copyhistory="${h.id}">Salin</button>`,
    "</div></div>",
  ].join("");
}

export async function renderHistory() {
  try { cache = await listHistory(); } catch (e) { cache = []; }
  $("#historyList").innerHTML = cache.length
    ? cache.map(historyRow).join("")
    : '<div class="empty">Belum ada riwayat prompt.</div>';
}

export function clearHistoryView() {
  cache = [];
  $("#historyList").innerHTML = "";
}

function openHistory(id) {
  const h = cache.find((x) => x.id === id);
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
  $("#historyList").addEventListener("click", (e) => {
    const open = e.target.closest("[data-openhistory]");
    if (open) return openHistory(open.dataset.openhistory);
    const copy = e.target.closest("[data-copyhistory]");
    if (copy) {
      const h = cache.find((x) => x.id === copy.dataset.copyhistory);
      if (h) copyText(h.prompt);
    }
  });
  $("#clearHistory").onclick = async () => {
    if (!confirm("Hapus seluruh riwayat prompt?")) return;
    try { await clearHistory(); await renderHistory(); toast("Riwayat dihapus."); }
    catch (e) { toast("Gagal menghapus: " + e.message); }
  };
}