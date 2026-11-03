/** Prompt builder page: generate, check, copy, download and save the prompt. */
import { $, value } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { slug } from "../utils/text.js";
import { downloadText, copyText } from "../utils/files.js";
import { templates } from "../data/templates.js";
import { buildPrompt } from "../core/promptBuilder.js";
import { validate } from "../core/validation.js";
import { checkPrompt } from "../core/promptChecklist.js";
import { session } from "../state/session.js";
import { showPage } from "./navigation.js";
import { collect, setStep, updateGameInfo } from "./form.js";
import { addHistory } from "./history.js";
import { saveProject, savePromptAsProject } from "./projects.js";

/** Open the builder, optionally pre-filled from a starter template. */
export function goBuilder(templateKey) {
  const t = templateKey && templates.find((x) => x.key === templateKey);
  if (t) {
    $("#gameType").value = t.game;
    $("#topic").value = t.topic;
    $("#theme").value = t.title;
    updateGameInfo();
  }
  showPage("builder");
  setStep(1);
}

export function generate() {
  const c = collect();
  const errors = validate(c);
  if (errors.length) {
    toast(errors.join(" "));
    if (!value("topic")) {
      $("#topic").focus();
      setStep(2);
    }
    return;
  }
  session.lastConfig = c;
  session.lastPrompt = buildPrompt(c);
  $("#promptOutput").value = session.lastPrompt;
  $("#promptDepthTag").textContent = c.promptDepth.toUpperCase();
  $("#promptPanel").classList.remove("hidden");
  $("#qaReport").innerHTML = "";
  addHistory(c, session.lastPrompt);
  toast("Prompt berhasil dibuat. Periksa sebelum disalin.");
  $("#promptPanel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function showChecklist() {
  const rows = checkPrompt($("#promptOutput").value)
    .map(([name, ok]) => `<div style="padding:5px 0">${ok ? "✅" : "⚠️"} ${name}: ${ok ? "included" : "review required"}</div>`)
    .join("");
  $("#qaReport").innerHTML =
    '<div class="panel" style="margin-top:10px"><h4 style="margin-top:0">Prompt completeness checklist</h4>' +
    rows +
    '<p class="hint">Ini memeriksa keberadaan bagian prompt, bukan menguji kode gim yang akan dihasilkan AI.</p></div>';
}

function downloadPrompt(ext, mime) {
  const name = slug(session.lastConfig?.topic || "educational-game-prompt") + "." + ext;
  downloadText($("#promptOutput").value, name, mime);
}

export function initBuilder() {
  $("#headerNew").onclick = $("#heroStart").onclick = () => goBuilder();
  $("#generateBtn").onclick = generate;
  $("#saveConfigBtn").onclick = () => saveProject(false);
  $("#savePrompt").onclick = savePromptAsProject;
  $("#copyPrompt").onclick = () => copyText($("#promptOutput").value);
  $("#downloadTxt").onclick = () => downloadPrompt("txt");
  $("#downloadMd").onclick = () => downloadPrompt("md", "text/markdown;charset=utf-8");
  $("#checkPrompt").onclick = showChecklist;
}
