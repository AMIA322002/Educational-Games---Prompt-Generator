# Universal Educational Games Generator — Prompt Studio

A small web app that turns a learning configuration into a ready-to-paste prompt for AI coding tools, so you can get a playable educational web game out of them.

It only builds the prompt. The game code itself comes from whichever AI coding tool you paste the prompt into. No backend and no API key needed.

## Features

- 60+ game mechanics in 8 categories (quizzes, matching, sorting, word puzzles, adventure, simulation, language, collaborative)
- Step-by-step builder covering learner profile, content, game design, rules and scoring, visual design, and technical requirements
- Three prompt depths: Quick, Standard, and Advanced Developer
- Starter templates and a searchable library of game mechanics
- Projects and prompt history saved in your browser (localStorage), with JSON export/import for backups
- Indonesian / English interface

## Getting started

ES modules don't load from `file://`, so serve the folder locally:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
python3 -m http.server 8000
```

Then open http://localhost:8000. `npx serve` or VS Code Live Server work too. There is no build step.

## Project structure

```
index.html            markup only
css/                  base, layout, components, dashboard, forms, library, utilities, responsive
js/
  main.js             entry point: init and wiring
  config.js           constants
  data/               game types, mechanic metadata, templates
  i18n/               id.js, en.js
  core/               pure logic (prompt builder, sections, checklist, validation), no DOM
  state/              localStorage-backed data and in-memory UI state
  ui/                 toast
  utils/              dom, text, file helpers
  features/           navigation, language, form, builder, templates, projects, history, settings
```

Dependencies flow one way: `main → features → core / state / data / utils`. Nothing in `core/` touches the DOM.

## Extending

- **New game mechanic:** add it to `js/data/gameTypes.js` and `js/data/gameMeta.js`.
- **New UI string:** add the key to both `js/i18n/id.js` and `js/i18n/en.js`, then use `data-i18n="key"` in the HTML.
- **New form field:** add the input in `index.html`, add its id to `FIELD_IDS` in `js/features/form.js`, and use it in `js/core/promptSections.js`.
- **Change prompt wording:** edit the matching section function in `js/core/promptSections.js`.

## Notes

- Data lives only in the browser it was created in. Use the backup export in Settings before clearing site data or switching devices.
- Always review a generated prompt, and the game it produces, before using it with learners.

## License

Add a license of your choice (MIT is a common default for projects like this).