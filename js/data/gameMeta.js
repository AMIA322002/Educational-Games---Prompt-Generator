/**
 * Per-mechanic metadata used in the builder info box and in the generated prompt.
 * Tuple: [core interaction, scoring & feedback notes, technical complexity, offline/asset note]
 */
export const gameMeta = {
  "Multiple Choice Quiz": [
    "Select one correct answer from plausible options.",
    "Score each question; validate one key; explain why the answer is correct.",
    "Low–medium",
    "Excellent"
  ],
  "Multiple Response Quiz": [
    "Select all correct answers; support more than one key.",
    "Define exact-set or partial-credit rules; prevent accidental duplicate scoring.",
    "Medium",
    "Excellent"
  ],
  "True or False Quiz": [
    "Judge statements based on supplied material.",
    "Explain each statement; avoid ambiguous wording.",
    "Low",
    "Excellent"
  ],
  "Fill in the Blanks": [
    "Enter missing words, numbers, formulas, or terms.",
    "Normalize whitespace/case where appropriate; define accepted answers.",
    "Low–medium",
    "Excellent"
  ],
  "Short Answer Quiz": [
    "Type a concise answer; use exact accepted answers or a transparent rubric.",
    "Do not claim semantic AI grading without an actual model; show accepted answers or rubric.",
    "Medium",
    "Excellent"
  ],
  "Timed Quiz": [
    "Answer questions within a configurable time limit.",
    "Use a reliable timer; define what happens when time expires.",
    "Medium",
    "Good"
  ],
  "Rapid-Fire Quiz": [
    "Answer short questions quickly in sequence.",
    "Display timer and progress; avoid penalizing accessibility needs unfairly.",
    "Medium",
    "Good"
  ],
  "Randomized Quiz": [
    "Shuffle questions and/or options without breaking answer keys.",
    "Keep each question's answer key linked after shuffling.",
    "Medium",
    "Excellent"
  ],
  "Adaptive Quiz": [
    "Change difficulty based on performance.",
    "Specify transparent progression rules and fallback if no adaptive logic is implemented.",
    "High",
    "Good"
  ],
  "Word Matching": [
    "Match related words or terms.",
    "Score correct pairs once; provide clear mismatch feedback.",
    "Low",
    "Excellent"
  ],
  "Image Matching": [
    "Match pictures to labels or concepts.",
    "Require supplied or embedded assets and alt text.",
    "Medium",
    "Depends on assets"
  ],
  "Definition Matching": [
    "Match terms to definitions.",
    "Ensure each definition has an unambiguous match.",
    "Low",
    "Excellent"
  ],
  "Memory Cards": [
    "Flip cards and find matching pairs.",
    "Count moves and matches; prevent clicking already matched cards.",
    "Medium",
    "Excellent"
  ],
  "Audio-Image Matching": [
    "Match playable audio to images or labels.",
    "Requires supplied audio or generated/linked assets; include fallback.",
    "High",
    "Depends on audio"
  ],
  "Concept Matching": [
    "Match related concepts, examples, or categories.",
    "Allow one-to-one or many-to-one rules to be specified.",
    "Low–medium",
    "Excellent"
  ],
  "Drag and Drop": [
    "Move items into targets or categories.",
    "Provide keyboard/tap alternatives; verify each drop and allow reset.",
    "Medium",
    "Good"
  ],
  "Categorization": [
    "Place items in correct categories.",
    "Define categories, item keys, and partial credit.",
    "Low–medium",
    "Excellent"
  ],
  "Classification": [
    "Classify objects or examples using rules.",
    "Explain classification criteria and handle edge cases.",
    "Medium",
    "Excellent"
  ],
  "Sentence Ordering": [
    "Arrange words or sentence parts in the correct order.",
    "Check exact or accepted ordering; provide a model answer.",
    "Medium",
    "Excellent"
  ],
  "Timeline Ordering": [
    "Place events in chronological order.",
    "Use date/event data; explain ordering rules.",
    "Medium",
    "Excellent"
  ],
  "Ranking": [
    "Arrange options by a specified criterion.",
    "Clearly define whether one order or multiple valid orders exist.",
    "Medium",
    "Good"
  ],
  "Grouping": [
    "Group items by common properties.",
    "Define group rules and scoring for each correct assignment.",
    "Medium",
    "Good"
  ],
  "Sorting Bins": [
    "Move items into labeled bins.",
    "Offer touch-friendly controls and clear bin labels.",
    "Medium",
    "Good"
  ],
  "Crossword": [
    "Fill a grid using clues and answers.",
    "Validate grid dimensions, intersections, spelling, and answer reveal.",
    "High",
    "Good"
  ],
  "Word Search": [
    "Find hidden words in a letter grid.",
    "Generate a valid grid and verify all target words exist.",
    "Medium",
    "Excellent"
  ],
  "Anagram": [
    "Rearrange letters to form a target word.",
    "Avoid ambiguous anagrams or list acceptable answers.",
    "Low–medium",
    "Excellent"
  ],
  "Jumbled Words": [
    "Reorder scrambled words or phrases.",
    "Preserve punctuation and accepted variations.",
    "Low",
    "Excellent"
  ],
  "Spelling Challenge": [
    "Type or select correctly spelled words.",
    "Give gentle correction and retry settings.",
    "Low",
    "Excellent"
  ],
  "Sentence Builder": [
    "Build sentences from word tiles.",
    "Define target order and acceptable alternatives.",
    "Medium",
    "Good"
  ],
  "Missing Letters": [
    "Complete partially hidden words.",
    "Use age-appropriate hints and accepted answers.",
    "Low",
    "Excellent"
  ],
  "Logic Puzzle": [
    "Solve a logic problem using clues.",
    "Validate puzzle uniqueness and explain the reasoning.",
    "High",
    "Good"
  ],
  "Number Puzzle": [
    "Solve numerical patterns or problems.",
    "Show calculation steps and handle valid equivalent answers.",
    "Medium–high",
    "Good"
  ],
  "Digital Board Game": [
    "Move along a board and answer learning challenges.",
    "Define board path, turn rules, randomization, and finish condition.",
    "High",
    "Good"
  ],
  "Dice Game": [
    "Roll dice and complete tasks.",
    "Provide fair dice logic and a no-animation fallback.",
    "Medium",
    "Good"
  ],
  "Maze": [
    "Navigate a path while solving tasks or collecting items.",
    "Support keyboard and touch controls; prevent impossible mazes.",
    "High",
    "Good"
  ],
  "Treasure Hunt": [
    "Solve clues to unlock locations and rewards.",
    "Ensure each clue has a valid solution and next-step mapping.",
    "High",
    "Good"
  ],
  "Platform Challenge": [
    "Navigate obstacles and learning checkpoints.",
    "Use accessible alternatives and simple physics appropriate to target devices.",
    "Very high",
    "Limited offline complexity"
  ],
  "Story Quest": [
    "Progress through a narrative by completing learning tasks.",
    "Keep story branches and learning outcomes consistent.",
    "High",
    "Good"
  ],
  "Mission-Based Game": [
    "Complete a sequence of learning missions.",
    "Track mission status and define failure/retry behavior.",
    "Medium–high",
    "Good"
  ],
  "Level Progression": [
    "Unlock progressively harder tasks.",
    "Define unlock rules, saved progress, and completion states.",
    "Medium",
    "Excellent"
  ],
  "Collectible Rewards": [
    "Collect items through learning achievements.",
    "Prevent duplicate rewards and define reward triggers.",
    "Medium",
    "Good"
  ],
  "Virtual Lab": [
    "Manipulate variables and observe outcomes.",
    "Model relationships responsibly; distinguish simulation from real experiment.",
    "Very high",
    "Good"
  ],
  "Business Simulation": [
    "Make decisions about resources and outcomes.",
    "Define model assumptions, state changes, and outcome calculations.",
    "Very high",
    "Good"
  ],
  "Historical Scenario": [
    "Explore a historically grounded scenario.",
    "Use verified source content; label fictionalized elements clearly.",
    "High",
    "Good"
  ],
  "Role-Playing Scenario": [
    "Respond from a role or perspective.",
    "Use a transparent rubric; avoid claiming subjective answers have one key.",
    "High",
    "Good"
  ],
  "Case Study": [
    "Analyze a scenario and choose or justify a response.",
    "Use criteria or rubric for open-ended answers.",
    "Medium–high",
    "Good"
  ],
  "Branching Narrative": [
    "Choose actions that change the story path.",
    "Validate every branch, ending, and navigation route.",
    "High",
    "Good"
  ],
  "Decision Tree": [
    "Follow choices through a structured decision path.",
    "Ensure all branches terminate and consequences are clear.",
    "Medium–high",
    "Good"
  ],
  "Virtual Experiment": [
    "Change variables and observe modeled results.",
    "Document assumptions and avoid unsupported scientific claims.",
    "Very high",
    "Good"
  ],
  "Flashcards": [
    "Review question-answer or term-definition cards.",
    "Track known/unknown cards and allow shuffling.",
    "Low",
    "Excellent"
  ],
  "Listening Comprehension": [
    "Listen to supplied audio and answer questions.",
    "Requires audio assets; include transcript/accessible fallback as configured.",
    "High",
    "Depends on audio"
  ],
  "Pronunciation Practice": [
    "Practice pronunciation with audio and optional speech input.",
    "Speech recognition support varies by browser; do not fabricate pronunciation scores.",
    "Very high",
    "Browser/API dependent"
  ],
  "Dialogue Completion": [
    "Complete a conversation with appropriate responses.",
    "Allow contextually valid answers and explain pragmatic choices.",
    "Medium",
    "Excellent"
  ],
  "Picture Description": [
    "Describe an image or select a matching description.",
    "Requires image assets and clear scoring rubric.",
    "Medium",
    "Depends on assets"
  ],
  "Audio Challenge": [
    "Identify, order, or respond to audio clips.",
    "Requires audio assets and fallback text where appropriate.",
    "High",
    "Depends on audio"
  ],
  "Sentence Reconstruction": [
    "Rebuild a sentence from fragments.",
    "Define valid order and acceptable punctuation variations.",
    "Medium",
    "Excellent"
  ],
  "Visual Identification": [
    "Identify visual objects, patterns, or concepts.",
    "Requires appropriate images/icons and descriptive alternatives.",
    "Medium",
    "Depends on assets"
  ],
  "Escape Room": [
    "Unlock stages by solving a sequence of puzzles.",
    "Ensure clues, answer validation, hints, locks, and completion route work.",
    "High",
    "Good"
  ],
  "Cooperative Challenge": [
    "Complete tasks collaboratively.",
    "True multi-user collaboration needs networking; provide local team mode otherwise.",
    "High",
    "Local mode"
  ],
  "Team Competition": [
    "Compare team scores across rounds.",
    "Define turn-taking and tie-breaking; local mode works without networking.",
    "Medium",
    "Local mode"
  ],
  "Tournament": [
    "Run multiple rounds and rank players or teams.",
    "Define bracket/scoring/tie rules and reset behavior.",
    "High",
    "Local mode"
  ],
  "Multi-Stage Challenge": [
    "Complete several linked game types or rounds.",
    "Keep shared progress and consistent scoring across stages.",
    "High",
    "Good"
  ],
  "Multiplayer Game": [
    "Synchronize players across devices.",
    "Requires backend/realtime service for genuine online multiplayer; do not fake synchronization.",
    "Very high",
    "Backend required"
  ],
  "Project-Based Game": [
    "Complete a larger task through milestones.",
    "Use rubric-based assessment, checkpoints, and teacher review.",
    "High",
    "Good"
  ]
};
