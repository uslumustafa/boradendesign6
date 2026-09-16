# Boraden Design 6 — 16 September 2026 checkpoint

Private repository: https://github.com/uslumustafa/boradendesign6

Current design entry: `/insan/`; `/` now serves the same human-film homepage. Existing service, article, tools and corporate routes remain available.
On a fresh checkout run `npm ci`, then `npm run build` and `npm start`; open `http://127.0.0.1:4174/insan/`.
The existing local preview remains in the `boradendesign2` folder; the repository name does not change routing or code paths.

Latest conversation decisions and next steps: [SESSION_NOTES_2026-09-16.md](SESSION_NOTES_2026-09-16.md). Detailed implementation and prior validation: [EDITORIAL_REVIEW.md](EDITORIAL_REVIEW.md). Film history: [HUMAN_FILM.md](HUMAN_FILM.md).

The saved design has the centered black header with scroll/hover reveal, a 15-second silent portrait film with a closer first portrait, centered brand ending, an intact-film scroll transition into a factual company introduction, three light service cards scrolling over one sticky image, editorial publication cards and portraits, knowledge tools, Turkey-centered night globe and a career invitation. Puzzle artwork has been replaced on the current homepage and service/corporate templates. The historical design source remains in Git.

Runnable checks: `npm test` and the standalone `node human-opening.test.mjs`, `node experience.test.mjs`, `node world.test.mjs`, `node vehicle.test.mjs`, `node service-contact.test.mjs`, `node editorial.test.mjs`, `node editorial-meta.test.mjs`, `node header-motion.test.mjs`, `node search-core.test.mjs`. CSS source: `styles/editorial.css`; `npm run build` compiles Tailwind CSS and builds the static pages.

Video originals and the closing-card renderer are archived in `source-media/human-opening/`. The renderer is preserved as used; its ROOT, FONTS, OUT and FF paths refer to the original workstation and need adjustment before running elsewhere. The current web film is `public/insan/people-short-v4.mp4`, with the unchanged `people-framing-v2.jpg` poster; the original `people.mp4` remains available.

Pending: client-supplied service-contact names/photos/emails/phone numbers, clarification of sidebar visibility, Wagtail publishing and career/email integration, annual calculator review, and application of the latest Deloitte Global research. No production backend or live application delivery is implied. The preview deliberately remains noindex.

Deloitte Global review: [research/DELOITTE_GLOBAL_REVIEW.md](research/DELOITTE_GLOBAL_REVIEW.md). Inventory: 4,665 sitemap URLs; actual review: 74 distinct pages/screens with documented limits. The homepage has a blog grid with three original covers and one service-directory image; service detail imagery remains available on the corresponding pages.

Secrets, dependency folders, build output and local agent scratch files are excluded. Rebuild dist locally. Local-browser content-editor drafts are not Git files. This checkpoint saves the existing work; no additional design change was made during the save.

## Earlier local iteration — 17 September 2026: compact A selected

The user compared the exact pre-revision checkpoint (A) with the three-window/selected-panel revision (B), then chose **A: shorten the previous flow**. The current homepage restores A's intact-film transition and restrained brand lines. The company introduction keeps the full verified name, 1993 foundation context and complete scope summary; duplicated activity links were removed from this section. Six visible anchors beside one existing image now lead directly to service groups. Company establishment and valuation also retain direct links. There are no film masks, panel-selection steps or long pinned service chapters.

Main files: `public/insan/experience.css`, `public/insan/experience.js`, `service-story.mjs`, and `aboutSummary` in `human-editorial.mjs`. `experience.js` only handles the sticky film's covered playback/focus state. The film, centered black navigation, editorial/blog content, perspectives, knowledge tools, globe and career section remain in place. No new dependency or backend change.

At a 1440×900 viewport (1425px document width), measured document heights: A 7,831px; B 6,605px; current compact A 6,005px. The service chapter is 732px versus A's 2,287px. Current desktop and 390px mobile layouts were visually inspected, including the intact transition and direct service navigation. Keyboard tabbing moves between direct links. Build, opening/experience/editorial checks pass; manual pause, reduced-motion and data-saver behavior remain covered by the playback checks.

Exact pre-change sources are in the parent project's ignored `.agent/checkpoints/20260916-235714-first-three-scenes/`; a second backup immediately before compact A is `.agent/checkpoints/20260917-compact-a/before.zip`. Comparison snapshots are in `.agent/comparisons/first-three-scenes/preview/`; the local `/__compare/` view is copied into generated `dist` and is removed by a normal rebuild. It can be restored by copying that saved preview directory to `dist/__compare`. Do not rerender the B snapshot from newly changed source. A/B share unchanged content and assets; they isolate the opening/company/services revision rather than reproducing an entire old repository state.

This work is local and has not been committed or pushed. Existing service pages still need the separately discussed content/typography pilot; this homepage pass does not claim to redesign all pages.

## Latest preference — service story restored

The user preferred the screenshot showing a light service card moving over a stationary meeting image. The six-row directory was replaced with the previous three-card service story. All six service groups and the two company establishment/valuation shortcuts remain real links. Redundant explanatory sentences and large inter-card gaps were reduced; the photograph and card styling are preserved. Mobile and reduced-motion use ordinary document flow instead of a pinned background.

The compact company introduction and intact film transition remain unchanged. The 6,005px/732px measurements above describe the now-superseded directory iteration, not this card layout. Checkpoint: parent `.agent/checkpoints/20260917-service-story-return/before.zip`. Build and opening/experience/editorial checks passed; desktop scrolling and the mobile layout were visually inspected. No commit or push.
