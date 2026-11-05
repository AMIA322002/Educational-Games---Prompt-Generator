import { $, escapeHtml } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { slug } from "../utils/text.js";
import { downloadText } from "../utils/files.js";
import { listProjects, addProject, deleteProject as removeProject } from "../state/store.js";
import { session } from "../state/session.js";
import { showPage } from "./navigation.js";
import { collect, applyConfig, setStep } from "./form.js";

let cache = [];

export function updateStats() {
  $("#statProjects").textContent = cache.length;
}

async function create(config, prompt) {
  try {
    await addProject({ title: config.topic + " — " + config.gameType, config, prompt: prompt || "" });
    await renderProjects();
    return true;
  } catch (e) {
    toast("Gagal menyimpan: " + e.message);
    return false;
  }
}

export async function saveProject(withPrompt) {
  const c = collect();
  if (!c.topic) { toast("Isi topik terlebih dahulu."); setStep(2); return; }
  const prompt = withPrompt ? $("#promptOutput").value || session.lastPrompt : "";
  if (await create(c, prompt)) toast("Proyek disimpan.");
}

export async function savePromptAsProject() {
  const prompt = $("#promptOutput").value;
  if (!prompt.trim()) { toast("Buat prompt terlebih dahulu."); return; }
  if (await create(session.lastConfig || collect(), prompt)) toast("Prompt disimpan ke Proyek Saya.");
}

function projectRow(p) {
  return [
    '<div class="project"><div>',
    `<strong>${escapeHtml(p.title)}</strong>`,
    `<small>${new Date(p.created_at).toLocaleString()} · ${escapeHtml(p.config?.level || "")}</small>`,
    `<div class="hint">${escapeHtml(p.config?.gameType || "")} · ${escapeHtml(p.config?.outputLang || "")}</div>`,
    '</div><div class="actions">',
    `<button class="btn small" data-load="${p.id}">Buka</button>`,
    `<button class="btn small" data-exportproject="${p.id}">Unduh</button>`,
    `<button class="btn small danger" data-deleteproject="${p.id}">Hapus</button>`,
    "</div></div>",
  ].join("");
}

export async function renderProjects() {
  try { cache = await listProjects(); } catch (e) { toast("Gagal memuat proyek: " + e.message); cache = []; }
  $("#projectsList").innerHTML = cache.length
    ? cache.map(projectRow).join("")
    : '<div class="empty">Belum ada proyek tersimpan. Buat prompt lalu klik Simpan Proyek.</div>';
  updateStats();
}

export function clearProjectsView() {
  cache = [];
  $("#projectsList").innerHTML = "";
  updateStats();
}

function loadProject(id) {
  const p = cache.find((x) => x.id === id);
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

async function deleteProject(id) {
  try { await removeProject(id); await renderProjects(); toast("Proyek dihapus."); }
  catch (e) { toast("Gagal menghapus: " + e.message); }
}

function exportProject(id) {
  const p = cache.find((x) => x.id === id);
  if (p) downloadText(JSON.stringify(p, null, 2), (slug(p.title) || "project") + ".json", "application/json");
}

export function initProjects() {
  $("#projectsList").addEventListener("click", (e) => {
    const load = e.target.closest("[data-load]");
    if (load) return loadProject(load.dataset.load);
    const del = e.target.closest("[data-deleteproject]");
    if (del) return deleteProject(del.dataset.deleteproject);
    const exp = e.target.closest("[data-exportproject]");
    if (exp) exportProject(exp.dataset.exportproject);
  });
}