import { $, escapeHtml } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { listAllowed, addAllowed, removeAllowed } from "../state/store.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function setAdminVisible(isAdmin) {
  $("#navAdmin").classList.toggle("hidden", !isAdmin);
}

export async function renderAllowlist() {
  let rows = [];
  try { rows = await listAllowed(); }
  catch (e) { toast("Gagal memuat daftar: " + e.message); }
  $("#allowList").innerHTML = rows.length
    ? rows.map((r) => [
        '<div class="project"><div>',
        `<strong>${escapeHtml(r.email)}</strong>`,
        `<small>${new Date(r.created_at).toLocaleString()}</small>`,
        '</div><div class="actions">',
        `<button class="btn small danger" data-removeemail="${escapeHtml(r.email)}">Hapus</button>`,
        "</div></div>",
      ].join("")).join("")
    : '<div class="empty">Belum ada email yang disetujui.</div>';
}

async function add() {
  const emails = [...new Set(
    $("#allowInput").value.toLowerCase().split(/[\s,;]+/).filter(Boolean)
  )];
  if (!emails.length) return toast("Masukkan minimal satu email.");
  const bad = emails.filter((e) => !EMAIL_RE.test(e));
  if (bad.length) return toast("Format email tidak valid: " + bad.join(", "));
  try {
    await addAllowed(emails);
    $("#allowInput").value = "";
    await renderAllowlist();
    toast(emails.length + " email disetujui.");
  } catch (e) {
    toast("Gagal menyimpan: " + e.message);
  }
}

export function initAdmin() {
  $("#allowAdd").onclick = add;
  $("#allowList").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-removeemail]");
    if (!btn) return;
    if (!confirm("Hapus persetujuan untuk " + btn.dataset.removeemail + "?")) return;
    try { await removeAllowed(btn.dataset.removeemail); await renderAllowlist(); toast("Dihapus."); }
    catch (err) { toast("Gagal menghapus: " + err.message); }
  });
}