import { $, $$ } from "../utils/dom.js";
import { i18n } from "../i18n/index.js";
import { db, persist } from "../state/db.js";
import { session } from "../state/session.js";

/** Apply a UI language: updates every [data-i18n] element and the toggle labels. */
export function setLang(lang) {
  session.lang = lang;
  db.settings.lang = lang;
  persist();
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((el) => {
    const text = i18n[lang][el.dataset.i18n];
    if (text) el.textContent = text;
  });
  $$("[data-lang]").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  $("#langToggle").textContent = lang === "id" ? "🇮🇩 ID / EN" : "🇬🇧 EN / ID";
}

export function initLanguage() {
  $("#langToggle").onclick = () => setLang(session.lang === "id" ? "en" : "id");
  $$("[data-lang]").forEach((b) => (b.onclick = () => setLang(b.dataset.lang)));
}
