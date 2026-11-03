/** Builder form: wizard steps, reading/writing field values, summary. */
import { $, $$, value, escapeHtml } from "../utils/dom.js";
import { toast } from "../ui/toast.js";
import { gameGroups } from "../data/gameTypes.js";
import { gameMeta } from "../data/gameMeta.js";
import { session } from "../state/session.js";
import { DEFAULT_GAME_TYPE, TOTAL_STEPS } from "../config.js";

/** ids of every builder field that is saved in a project / passed to the prompt builder. */
const FIELD_IDS = [
  "level", "grade", "ability", "difficulty", "objectives", "prior",
  "subject", "customSubject", "topic", "curriculum", "material", "qa", "count", "sourcePolicy",
  "gameType", "gameMode", "theme", "players", "levelsCount", "duration", "attempts", "hints",
  "points", "penalty", "partial", "retry", "feedbackTiming", "completion", "scoringExtra", "feedbackStyle",
  "outputLang", "languageOrder", "palette", "visualStyle", "textSize", "animation", "audio", "accessibility",
  "outputFormat", "offline", "devices", "assetPolicy", "promptDepth", "documentation", "extraRequirements",
];

/** Fields that fall back to a default when left empty. */
const DEFAULTS = { count: "10", levelsCount: "3", duration: "10", attempts: "3", points: "10" };

/** Read the whole form into a plain config object. */
export function collect() {
  const c = {};
  FIELD_IDS.forEach((id) => (c[id] = value(id)));
  Object.entries(DEFAULTS).forEach(([id, fallback]) => (c[id] = c[id] || fallback));
  // A custom subject overrides the select only when "Custom Subject" is chosen.
  if (c.subject === "Custom Subject" && c.customSubject) c.subject = c.customSubject;
  return c;
}

/** Fill the form from a saved config (inverse of collect). */
export function applyConfig(c) {
  if (!c) return;
  FIELD_IDS.forEach((id) => {
    const el = $("#" + id);
    if (!el || c[id] == null) return;
    const isOption = Array.from(el.options || []).some((o) => o.value === c[id] || o.text === c[id]);
    if (isOption) el.value = c[id];
    else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.value = c[id];
  });
  updateGameInfo();
}

export function fillGameTypes() {
  const sel = $("#gameType");
  gameGroups.forEach((g) => {
    const og = document.createElement("optgroup");
    og.label = g.group;
    g.types.forEach((t) => {
      const o = document.createElement("option");
      o.value = t;
      o.textContent = t;
      og.appendChild(o);
    });
    sel.appendChild(og);
  });
  sel.value = DEFAULT_GAME_TYPE;
}

export function updateGameInfo() {
  const type = $("#gameType").value;
  const m = gameMeta[type];
  if (!m) return;
  $("#gameInfo").innerHTML =
    "<strong>" + escapeHtml(type) + "</strong>" +
    "<br>Mechanic: " + escapeHtml(m[0]) +
    "<br>Scoring & feedback: " + escapeHtml(m[1]) +
    "<br>Technical complexity: " + escapeHtml(m[2]) +
    " · Offline/asset note: " + escapeHtml(m[3]);
}

export function updateSummary() {
  const c = collect();
  const rows = [
    ["Jenjang", c.level],
    ["Kelas/usia", c.grade || "Tidak ditentukan"],
    ["Subjek", c.subject],
    ["Topik", c.topic],
    ["Tujuan", c.objectives || "Belum ditentukan"],
    ["Jenis gim", c.gameType],
    ["Kesulitan", c.difficulty],
    ["Mode", c.gameMode],
    ["Bahasa", c.outputLang],
    ["Format", c.outputFormat],
    ["Kedalaman prompt", c.promptDepth],
  ];
  $("#summaryBox").innerHTML = rows
    .map(([label, val]) => "<div style='margin:4px 0'><b>" + escapeHtml(label) + ":</b> " + escapeHtml(val) + "</div>")
    .join("");
}

export function setStep(n) {
  session.currentStep = Math.max(1, Math.min(TOTAL_STEPS, n));
  const step = session.currentStep;
  $$(".formstep").forEach((el) => el.classList.toggle("hidden", Number(el.dataset.formstep) !== step));
  $$(".step").forEach((el) => el.classList.toggle("current", Number(el.dataset.step) === step));
  $("#prevStep").disabled = step === 1;
  $("#nextStep").classList.toggle("hidden", step === TOTAL_STEPS);
  if (step === TOTAL_STEPS) updateSummary();
  if (step < TOTAL_STEPS) $("#promptPanel").classList.add("hidden");
}

export function resetForm() {
  if (!confirm("Reset semua isian form?")) return;
  $("#builderForm").reset();
  $("#gameType").value = DEFAULT_GAME_TYPE;
  $("#promptPanel").classList.add("hidden");
  $("#promptOutput").value = "";
  session.lastPrompt = "";
  session.lastConfig = null;
  updateGameInfo();
  setStep(1);
  toast("Form direset.");
}

export function initForm() {
  $("#prevStep").onclick = () => setStep(session.currentStep - 1);
  $("#nextStep").onclick = () => {
    if (session.currentStep === 2 && (!value("topic") || !value("subject"))) {
      toast("Isi mata pelajaran dan topik terlebih dahulu.");
      return;
    }
    setStep(session.currentStep + 1);
  };
  $("#resetForm").onclick = resetForm;
  $("#gameType").onchange = updateGameInfo;
}
