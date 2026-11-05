import { db } from "./state/db.js";
import { DEFAULT_LANG } from "./config.js";
import { $ } from "./utils/dom.js";
import { initNavigation, onPageShow, showPage } from "./features/navigation.js";
import { initLanguage, setLang } from "./features/language.js";
import { initForm, fillGameTypes, updateGameInfo, setStep } from "./features/form.js";
import { initBuilder } from "./features/builder.js";
import { initTemplates, renderTemplates } from "./features/templates.js";
import { initProjects, renderProjects, clearProjectsView } from "./features/projects.js";
import { initHistory, renderHistory, clearHistoryView } from "./features/history.js";
import { initSettings } from "./features/settings.js";
import { initAuth, getRole } from "./features/auth.js";
import { initAdmin, renderAllowlist, setAdminVisible } from "./features/admin.js";
import { showPage } from "./features/navigation.js";

function init() {
  onPageShow("projects", renderProjects);
  onPageShow("history", renderHistory);
  onPageShow("templates", () => renderTemplates());
  onPageShow("admin", renderAllowlist);

  initNavigation();
  initLanguage();
  initForm();
  initBuilder();
  initTemplates();
  initProjects();
  initHistory();
  initSettings();
  initAdmin();
  
  fillGameTypes();
  updateGameInfo();
  setLang(db.settings?.lang || DEFAULT_LANG);
  renderTemplates();
  setStep(1);

  initAuth((user) => {
    $("#authView").classList.toggle("hidden", !!user);
    $(".app").classList.toggle("hidden", !user);
    if (user) {
      setAdminVisible((await getRole(user.id)) === "admin");
      renderProjects();
      renderHistory();
    } else {
      setAdminVisible(false);
      showPage("dashboard");
      clearProjectsView();
      clearHistoryView();
    }
  });
}

init();