import { $, $$ } from "../utils/dom.js";

/** Optional callbacks run when a page is shown, e.g. re-render its list. */
const pageHooks = {};

export function onPageShow(page, fn) {
  pageHooks[page] = fn;
}

export function showPage(page) {
  $$(".page").forEach((p) => p.classList.toggle("active", p.id === "page-" + page));
  $$(".navbtn").forEach((b) => b.classList.toggle("active", b.dataset.page === page));
  $("#sidebar").classList.remove("open");
  pageHooks[page]?.();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function initNavigation() {
  $$(".navbtn").forEach((b) => b.addEventListener("click", () => showPage(b.dataset.page)));
  $("#mobileMenu").onclick = () => $("#sidebar").classList.toggle("open");
  $("#heroTemplates").onclick = () => showPage("templates");
}
