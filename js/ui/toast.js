import { $ } from "../utils/dom.js";
import { TOAST_MS } from "../config.js";

let timer;

/** Show a short status message in the toast element. */
export function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.style.display = "block";
  clearTimeout(timer);
  timer = setTimeout(() => (t.style.display = "none"), TOAST_MS);
}
