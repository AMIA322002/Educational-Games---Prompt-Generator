import { DEFAULT_LANG } from "../config.js";

/** In-memory UI state for the current page load (not persisted). */
export const session = {
  lang: DEFAULT_LANG,
  currentStep: 1,
  lastPrompt: "",
  lastConfig: null,
};
