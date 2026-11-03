import { $, escapeHtml } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { slug } from "../utils/text.js";
import { downloadText } from "../utils/files.js";
import { db, persist } from "../state/db.js";
import { session } from "../state/session.js";
import { showPage } from "./navigation.js";
import { collect, applyConfig, setStep } from "./form.js";

export function projectRecord(config, prompt, title) {
  return {
    id: Date.now(),
    title: title || config.topic + " — " + config.gameType,
    created: new Date().toISOString(),
    config,
    prompt: prompt || "",
  };
}

export function updateStats() {
  $("#statProjects").textContent = (db.projects || []).length;
}

/** Save the current form (optionally with the generated prompt) as a project. */
export function saveProject(withPrompt) {
  const c = collect();
  if (!c.topic) {
    toast("Isi topik terlebih dahulu.");
    setStep(2);
    return;
  }
  const prompt = withPrompt ? $("#promptOutput").value || session.lastPrompt : "";
  db.projects = db.projects || [];
  db.projects.unshift(projectRecord(c, prompt));
  persist();
  updateStats();
  renderProjects();
  toast("Proyek disimpan di browser ini.");
}

/** Save the prompt currently shown in the output box as a project. */
export function savePromptAsProject() {
  const prompt = $("#promptOutput").value;
  if (!prompt.trim()) {
    toast("Buat prompt terlebih dahulu.");
    return;
  }
  const config = session.lastConfig || collect();
  db.projects = db.projects || [];
  db.projects.unshift(projectRecord(config, prompt));
  persist();
  renderProjects();
  toast("Prompt disimpan ke Proyek Saya.");
}

function projectRow(p) {
  return [
    '<div class="project">',
    "<div>",
    `<strong>${escapeHtml(p.title)}</strong>`,
    `<small>${new Date(p.created).toLocaleString()} · ${escapeHtml(p.config?.level || "")}</small>`,
    `<div class="hint">${escapeHtml(p.config?.gameType || "")} · ${escapeHtml(p.config?.outputLang || "")}</div>`,
    "</div>",
    '<div class="actions">',
    `<button class="btn small" data-load="${p.id}">Buka</button>`,
    `<button class="btn small" data-exportproject="${p.id}">Unduh</button>`,
    `<button class="btn small danger" data-deleteproject="${p.id}">Hapus</button>`,
    "</div>",
    "</div>",
  ].join("");
}

export function renderProjects() {
  const list = db.projects || [];
  $("#projectsList").innerHTML = list.length
    ? list.map(projectRow).join("")
    : '<div class="empty">Belum ada proyek tersimpan. Buat prompt lalu klik Simpan Proyek.</div>';
  updateStats();
}

function loadProject(id) {
  const p = db.projects.find((x) => x.id === id);
  if (!p) return;
  applyConfig(p.config);
  showPage("builder");
  setStep(1);
  if (p.prompt) {
    session.lastPrompt = p.prompt;
    session.lastConfig = p.config;
    $("#promptOutput").value = p.prompt;
    $("#promptPanel").classList.remove("hidden");
  }
  toast("Konfigurasi proyek dimuat.");
}

function deleteProject(id) {
  db.projects = db.projects.filter((p) => p.id !== id);
  persist();
  renderProjects();
  toast("Proyek dihapus.");
}

function exportProject(id) {
  const p = db.projects.find((x) => x.id === id);
  if (p) downloadText(JSON.stringify(p, null, 2), (slug(p.title) || "project") + ".json", "application/json");
}

export function initProjects() {
  // One delegated listener instead of re-binding buttons after every render.
  $("#projectsList").addEventListener("click", (e) => {
    const load = e.target.closest("[data-load]");
    if (load) return loadProject(Number(load.dataset.load));
    const del = e.target.closest("[data-deleteproject]");
    if (del) return deleteProject(Number(del.dataset.deleteproject));
    const exp = e.target.closest("[data-exportproject]");
    if (exp) exportProject(Number(exp.dataset.exportproject));
  });
}
