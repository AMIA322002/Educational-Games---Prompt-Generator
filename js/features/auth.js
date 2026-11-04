import { $ } from "../utils/dom.js"
import { toast } from "../ui/toast.js"
import { supabase } from "../state/supabase.js"

let mode = "login"

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
    const password = 
}