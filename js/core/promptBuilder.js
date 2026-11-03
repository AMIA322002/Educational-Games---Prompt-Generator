import {
  intro, learnerProfile, content, gameDesign, scoring,
  languageVisual, technical, quality, acceptance, extras,
} from "./promptSections.js";

/**
 * Assemble the full prompt from a collected form config.
 * @param {object} c  config returned by features/form.collect()
 * @returns {string}
 */
export function buildPrompt(c) {
  const adv = c.promptDepth === "Advanced Developer Prompt";
  const quick = c.promptDepth === "Quick Prompt";

  let p = [
    intro({ adv, quick }),
    learnerProfile(c),
    content(c),
    gameDesign(c),
    scoring(c),
    languageVisual(c),
    technical(c, { adv }),
    quality(),
    acceptance(),
    extras(c),
  ].join("\n\n");

  if (quick) {
    p = p.replace(/\\n## [\\s\\S]*?$/, "") + "\n\nCreate a simple but complete game with working mechanics, scoring, feedback, restart, responsive design, and teacher-review notes. Return complete runnable code.";
  }
  return p;
}
