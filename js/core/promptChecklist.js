/**
 * Completeness check for a generated prompt: verifies the expected sections exist.
 * It does not test the game code an AI tool would produce from the prompt.
 * @returns {Array<[string, boolean]>} [label, present] pairs
 */
export function checkPrompt(p) {
  return [
    ["Learner profile", /LEARNER PROFILE/.test(p)],
    ["Subject and topic", /Subject:/.test(p) && /Topic:/.test(p)],
    ["Game mechanic", /Selected mechanic:/.test(p)],
    ["Scoring rules", /SCORING/.test(p)],
    ["Feedback", /Feedback/.test(p)],
    ["Technical requirements", /TECHNICAL IMPLEMENTATION/.test(p)],
    ["Accessibility", /Accessibility/.test(p)],
    ["Testing checklist", /QUALITY, CONTENT ACCURACY/.test(p)],
  ];
}
