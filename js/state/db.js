/**
 * Persistent data (projects, history, settings) backed by localStorage.
 * `db` is a single shared object: mutate it, then call persist().
 */
import { STORAGE_KEY, DEFAULT_LANG } from "../config.js";
import { toast } from "../ui/toast.js";

const emptyDb = () => ({ projects: [], history: [], settings: { lang: DEFAULT_LANG } });

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyDb(), ...JSON.parse(raw) } : emptyDb();
  } catch (e) {
    return emptyDb();
  }
}

export const db = load();

export function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (e) {
    toast("Browser tidak mengizinkan penyimpanan lokal. Unduh backup agar data tidak hilang.");
    return false;
  }
}

/** Wipe everything back to the empty state (caller should persist() and re-render). */
export function resetDb() {
  Object.keys(db).forEach((k) => delete db[k]);
  Object.assign(db, emptyDb());
}
