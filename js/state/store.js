import { supabase } from "./supabase.js";
import { MAX_HISTORY } from "../config.js";

async function run(q) {
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export const listProjects = () =>
  run(supabase.from("projects").select("*").order("created_at", { ascending: false }));
export const addProject = (row) => run(supabase.from("projects").insert(row).select().single());
export const deleteProject = (id) => run(supabase.from("projects").delete().eq("id", id));

export const listHistory = () =>
  run(supabase.from("history").select("*").order("created_at", { ascending: false }).limit(MAX_HISTORY));
export const addHistoryRow = (row) => run(supabase.from("history").insert(row));
export const clearHistory = () => run(supabase.from("history").delete().not("id", "is", null)); // RLS limits to own rows

export const listAllowed = () =>
  run(supabase.from("allowed_emails").select("*").order("created_at", { ascending: false }));
export const addAllowed = (emails) =>
  run(supabase.from("allowed_emails").upsert(emails.map((email) => ({ email })), { onConflict: "email", ignoreDuplicates: true }));
export const removeAllowed = (email) =>
  run(supabase.from("allowed_emails").delete().eq("email", email));