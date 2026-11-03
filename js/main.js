/**
 * Entry point: wires the feature modules together and renders the initial state.
 * Feature modules own their own DOM event bindings via init*() functions.
 */
import { db } from "./state/db.js";
import { DEFAULT_LANG } from "./config.js";
import { initNavigation, onPageShow } from "./features/navigation.js";
import { initLanguage, setLang } from "./features/language.js";
import { initForm, fillGameTypes, updateGameInfo, setStep } from "./features/form.js";
import { initBuilder } from "./features/builder.js";
import { initTemplates, renderTemplates } from "./features/templates.js";
import { initProjects, renderProjects, updateStats } from "./features/projects.js";
import { initHistory, renderHistory } from "./features/history.js";
import { initSettings } from "./features/settings.js";

function init() {
  // Re-render list pages whenever they are opened.
  onPageShow("projects", renderProjects);
  onPageShow("history", renderHistory);
  onPageShow("templates", () => renderTemplates());

  initNavigation();
  initLanguage();
  initForm();
  initBuilder();
  initTemplates();
  initProjects();
  initHistory();
  initSettings();

  fillGameTypes();
  updateGameInfo();
  setLang(db.settings?.lang || DEFAULT_LANG);
  renderTemplates();
  renderProjects();
  renderHistory();
  updateStats();
  setStep(1);
}

init();
