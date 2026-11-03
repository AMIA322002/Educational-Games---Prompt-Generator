/** Template library page: searchable list of starter templates and game mechanics. */
import { $, escapeHtml } from "../utils/dom.js";
import { templates } from "../data/templates.js";
import { gameGroups } from "../data/gameTypes.js";
import { gameMeta } from "../data/gameMeta.js";
import { showPage } from "./navigation.js";
import { setStep, updateGameInfo } from "./form.js";
import { goBuilder } from "./builder.js";

function templateCard(t) {
  return [
    '<div class="template">',
    `<div class="emoji">${t.emoji}</div>`,
    `<span class="tag">${escapeHtml(t.game)}</span>`,
    `<h4>${escapeHtml(t.title)}</h4>`,
    `<p>${escapeHtml(t.desc)}</p>`,
    `<div class="meta">Starter topic: ${escapeHtml(t.topic)}</div>`,
    `<button class="btn small" data-template="${t.key}">Use template →</button>`,
    "</div>",
  ].join("");
}

function gameTypeCard(group, type) {
  const meta = gameMeta[type];
  return [
    '<div class="template">',
    `<div class="emoji">${group.emoji}</div>`,
    `<span class="tag">${escapeHtml(group.group)}</span>`,
    `<h4>${escapeHtml(type)}</h4>`,
    `<p>${escapeHtml((meta || ["Interactive learning game"])[0])}</p>`,
    `<div class="meta">Complexity: ${escapeHtml((meta || ["", "", "Medium"])[2])}</div>`,
    `<button class="btn small" data-gametype="${escapeHtml(type)}">Use game type →</button>`,
    "</div>",
  ].join("");
}

export function renderTemplates(filter = "") {
  const q = filter.toLowerCase();
  let html = "";
  templates.forEach((t) => {
    if ((t.title + " " + t.desc + " " + t.game).toLowerCase().includes(q)) html += templateCard(t);
  });
  gameGroups.forEach((g) =>
    g.types.forEach((type) => {
      if ((type + " " + g.group).toLowerCase().includes(q)) html += gameTypeCard(g, type);
    })
  );
  $("#templateGrid").innerHTML = html || '<div class="empty">Tidak ada templat yang cocok.</div>';
}

export function initTemplates() {
  $("#templateSearch").oninput = (e) => renderTemplates(e.target.value);

  // Delegated: covers the dashboard quick-start cards and the library grid alike.
  document.addEventListener("click", (e) => {
    const tpl = e.target.closest("[data-template]");
    if (tpl) return goBuilder(tpl.dataset.template);
    const gt = e.target.closest("[data-gametype]");
    if (gt) {
      showPage("builder");
      $("#gameType").value = gt.dataset.gametype;
      updateGameInfo();
      setStep(1);
    }
  });
}
