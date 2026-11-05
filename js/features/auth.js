import { $ } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { supabase } from "../state/supabase.js";

let mode = "login"; // or "signup"

export async function getRole(userId) {
  const { data } = await supabase.from("profiles").select("role").eq("id", userId).single();
  return data?.role || "teacher";
}

function setMode(m) {
  mode = m;
  $("#authSubmit").textContent = m === "login" ? "Masuk" : "Daftar";
  $("#authSwitch").textContent = m === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk";
}

async function submit(e) {
  e.preventDefault();
  const email = $("#authEmail").value.trim();
  const password = $("#authPassword").value;
  const fn = mode === "login" ? "signInWithPassword" : "signUp";
  const { error } = await supabase.auth[fn]({ email, password });
  if (error) return toast(error.message);
  if (mode === "signup") toast("Akun dibuat. Cek email untuk konfirmasi (jika diaktifkan).");
}

export function initAuth(onUser) {
  $("#authForm").addEventListener("submit", submit);
  $("#authSwitch").onclick = () => setMode(mode === "login" ? "signup" : "login");
  $("#logoutBtn").onclick = () => supabase.auth.signOut();

  let lastId;
  supabase.auth.onAuthStateChange((_e, session) => {
    const user = session?.user ?? null;
    if ((user?.id ?? null) === lastId) return;
    lastId = user?.id ?? null;
    setTimeout(() => onUser(user), 0);
  });
  setMode("login");
}