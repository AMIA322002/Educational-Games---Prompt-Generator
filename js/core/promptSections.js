/**
 * Individual sections of the generated AI-coding prompt.
 * Each function takes the collected form config (and, where needed, prompt-depth flags)
 * and returns the markdown text for that section. Pure functions: no DOM access.
 */
import { gameMeta } from "../data/gameMeta.js";

/** Mechanic-specific spec block embedded in section 3. */
export function gameSpec(c) {
  const m=gameMeta[c.gameType]||["Use a suitable game mechanic.","Use mechanic-appropriate scoring and feedback.","Medium","Review requirements"];
  return `Selected mechanic: ${c.gameType}
- Core interaction: ${m[0]}
- Scoring and feedback: ${m[1]}
- Technical complexity: ${m[2]}
- Offline/assets note: ${m[3]}
- Implement the actual mechanics, not a static mockup or a generic quiz.
- Define the game state, player actions, validation, success/failure states, reset behavior, and completion logic.
- If a required capability depends on assets, browser APIs, a backend, or networking, explain the limitation and provide a graceful fallback. Do not fake unavailable functionality.`;
}

/** Title line and role statement. */
export function intro({ adv, quick }) {
  return `# ${adv?"ADVANCED DEVELOPER PROMPT":quick?"QUICK GAME-BUILD PROMPT":"EDUCATIONAL GAME DEVELOPMENT PROMPT"}

Act as a senior educational game designer, instructional designer, UI/UX designer, accessibility specialist, and expert web developer. Build a complete, playable educational web game using the configuration below.`;
}

/** Section 1: learner profile. */
export function learnerProfile(c) {
  return `## 1. LEARNER PROFILE
- Education level: ${c.level}
- Grade / age: ${c.grade||"Not specified; use an appropriate default and state the assumption"}
- Prior ability: ${c.ability}
- Difficulty: ${c.difficulty}
- Prior knowledge / support needs: ${c.prior||"Not specified"}
- Learning objectives: ${c.objectives||"Derive clear, measurable objectives from the supplied topic and content; label them as proposed objectives."}`;
}

/** Section 2: subject and learning content. */
export function content(c) {
  return `## 2. SUBJECT AND LEARNING CONTENT
- Subject: ${c.subject}
- Topic: ${c.topic}
- Curriculum standards / criteria: ${c.curriculum||"Not supplied. Do not invent official standards, curriculum codes, or citations."}
- Source material:
${c.material||"[No source material supplied. Create suitable draft content only if the selected content policy allows it, and flag it for teacher review.]"}
- Teacher-provided questions and answer key:
${c.qa||"[No teacher-provided questions or answer key supplied.]"}
- Requested number of questions/tasks: ${c.count}
- Content policy: ${c.sourcePolicy==="source"?"Prioritize and stay faithful to teacher-supplied material. Do not invent unsupported facts.":c.sourcePolicy==="supplement"?"Use teacher material as the basis and add relevant content only when justified; clearly identify additions for review.":"Create new draft content where needed and explicitly mark AI-generated content for teacher review."}`;
}

/** Section 3: game design. */
export function gameDesign(c) {
  return `## 3. GAME DESIGN
- Game type: ${c.gameType}
- Game mode: ${c.gameMode}
- Theme / story: ${c.theme||"Choose an age-appropriate theme that supports the learning goal."}
- Player mode: ${c.players}
- Number of levels: ${c.levelsCount}
- Target duration: ${c.duration} minutes
- Attempts / lives: ${c.attempts}
- Hints: ${c.hints}

${gameSpec(c)}`;
}

/** Section 4: rules, scoring and progress. */
export function scoring(c) {
  return `## 4. RULES, SCORING, AND PROGRESS
- Base points per correct response: ${c.points}
- Incorrect response penalty: ${c.penalty}
- Partial credit: ${c.partial}
- Retry policy: ${c.retry}
- Feedback timing: ${c.feedbackTiming}
- Completion condition: ${c.completion}
- Additional scoring rules: ${c.scoringExtra||"None specified. Use a simple, transparent system appropriate to this game mechanic."}
- Feedback style: ${c.feedbackStyle||"Encouraging, specific, age-appropriate, and explanatory; never shame learners."}

Scoring requirements:
1. Define the score model before implementing it and show the rules to players.
2. Prevent duplicate scoring for the same action or answer.
3. Specify handling of unanswered, skipped, partially correct, and retried responses.
4. For quiz-style games, accuracy = correct scored responses / total scored questions × 100. Avoid division by zero.
5. Use a mechanic-appropriate scoring model for non-quiz games; do not force every game into a quiz format.
6. Display final score, accuracy when meaningful, completion status, and constructive next-step feedback.`;
}

/** Section 5: language and visual design. */
export function languageVisual(c) {
  return `## 5. LANGUAGE AND VISUAL DESIGN
- Output language: ${c.outputLang}
- Language order: ${c.languageOrder}
- Color theme: ${c.palette}
- Visual style: ${c.visualStyle}
- Text size: ${c.textSize}
- Animation: ${c.animation}
- Audio: ${c.audio}
- Accessibility: ${c.accessibility}

Keep instructions, questions, feedback, and explanations consistent with the selected language mode. In bilingual mode, provide accurate English and Bahasa Indonesia without changing the meaning of supplied source material. Use readable typography, clear hierarchy, meaningful feedback, touch-friendly controls, visible keyboard focus, sufficient contrast, semantic HTML, and reduced-motion support where feasible. Adapt visual complexity and instructions to the learner age and ability.`;
}

/** Section 6: technical implementation (extra bullets in advanced mode). */
export function technical(c, { adv }) {
  return `## 6. TECHNICAL IMPLEMENTATION
- Requested output: ${c.outputFormat}
- Offline requirement: ${c.offline}
- Target devices: ${c.devices}
- External assets: ${c.assetPolicy}
- Code documentation: ${c.documentation}
${adv?"- Separate game state, content data, validation, scoring, rendering, and persistence into clear modules/functions where practical.\\n- Include a data schema and describe critical edge cases.\\n- Include a test plan and expected outcomes for key user flows.":""}

Implementation rules:
- Produce a complete playable implementation, not a design description, static mockup, or pseudocode.
- If single-file HTML is selected, provide the full HTML document with embedded CSS and JavaScript in one file. Do not omit sections or use TODO placeholders.
- If a multi-file project is selected, provide a complete file tree and full contents of every required file.
- Make all controls functional: start, gameplay actions, answer validation, score, feedback, progress, completion, and restart.
- Do not expose API keys or secrets in client-side code.
- Do not execute arbitrary imported content as code.
- Avoid external dependencies when offline operation is requested. If an external asset or service is necessary, explain it and provide a fallback where feasible.
- Do not claim that the game was tested unless it was actually executed and tested.`;
}

/** Section 7: quality, accuracy and safety (static). */
export function quality() {
  return `## 7. QUALITY, CONTENT ACCURACY, AND SAFETY
- Ensure questions and answer keys are internally consistent and unambiguous.
- Base factual claims on supplied content or reliable subject knowledge; flag uncertainty for teacher review.
- Do not fabricate official curriculum references, sources, or citations.
- Use age-appropriate examples and respectful, inclusive language.
- Do not collect personal student data unless explicitly required and appropriately protected.
- For pronunciation or speech-recognition features, state browser/API limitations and never invent accuracy scores.
- For multiplayer, explain that real cross-device synchronization requires a backend or networking service. Do not simulate online multiplayer while claiming it is real.
- For simulations, document assumptions and distinguish simulated outcomes from real-world experiments.`;
}

/** Section 8: required output and acceptance checklist (static). */
export function acceptance() {
  return `## 8. REQUIRED OUTPUT AND ACCEPTANCE CHECKLIST
Deliver the complete code in the requested format, followed by concise instructions for saving and running it.
Verify or provide a test checklist for:
- Start, play, answer, and finish flows
- Correct and incorrect responses
- Scoring, partial credit, penalties, hints, and retries
- Level progression and completion rules
- Reset and restart behavior
- Responsive layout on target devices
- Keyboard/touch accessibility
- Missing or malformed content
- Offline and external-asset behavior
- Accuracy of questions, explanations, and answer keys

Do not state that any test passed unless you actually performed it. Clearly identify any remaining limitations.`;
}

/** Section 9: additional user requirements. */
export function extras(c) {
  return `## 9. ADDITIONAL USER REQUIREMENTS
${c.extraRequirements||"No additional requirements supplied."}

Build the game now. Prioritize a working, educationally sound implementation over decorative complexity. If any critical requirement is technically infeasible in the requested format, explain the limitation and implement the best honest fallback.`;
}
