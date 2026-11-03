/** Settings page: backup export, project import, local data reset. */
import { $ } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { downloadText } from "../utils/files.js";
import { db, persist, resetDb } from "../state/db.js";
import { DEFAULT_LANG } from "../config.js";
import { setLang } from "./language.js";
import { renderProjects, updateStats } from "./projects.js";
import { renderHistory } from "./history.js";

function exportBackup() {
  downloadText(JSON.stringify(db, null, 2), "educational-games-generator-backup.json", "application/json");
}

/** Accepts either a full backup ({projects:[...]}) or a single exported project ({config:{...}}). */
async function importProjects(file) {
  try {
    const data = JSON.parse(await file.text());
    if (Array.isArray(data.projects)) {
      db.projects = [...data.projects, ...(db.projects || [])];
    } else if (data.config) {
      db.projects.unshift(data);
    } else {
      throw Error("Format JSON tidak dikenal");
    }
    persist();
    renderProjects();
    toast("Proyek berhasil diimpor.");
  } catch (err) {
    toast("File JSON tidak valid atau format tidak didukung.");
  }
}

function clearLocalData() {
  if (!confirm("Hapus seluruh proyek, riwayat, dan pengaturan yang tersimpan di browser ini?")) return;
  resetDb();
  persist();
  renderProjects();
  renderHistory();
  updateStats();
  setLang(DEFAULT_LANG);
  toast("Data lokal dihapus.");
}

export function initSettings() {
  $("#exportProjects").onclick = $("#downloadBackup").onclick = exportBackup;
  $("#importProjectsBtn").onclick = () => $("#importProjectsFile").click();
  $("#importProjectsFile").onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await importProjects(file);
    e.target.value = "";
  };
  $("#clearLocalData").onclick = clearLocalData;
}
