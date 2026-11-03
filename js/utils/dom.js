/** Small DOM helpers shared by every feature module. */

export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => Array.from(document.querySelectorAll(selector));

/** Trimmed value of a form control by id ("" when the element is missing). */
export function value(id) {
  return ($("#" + id)?.value || "").trim();
}

export function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}
