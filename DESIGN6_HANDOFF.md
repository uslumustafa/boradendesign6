# Boraden Design 6 — 16 September 2026 checkpoint

Private repository: https://github.com/uslumustafa/boradendesign6

Current design entry: `/insan/`; `/` now serves the same human-film homepage. Existing service, article, tools and corporate routes remain available.
On a fresh checkout run `npm ci`, then `npm run build` and `npm start`; open `http://127.0.0.1:4174/insan/`.
The existing local preview remains in the `boradendesign2` folder; the repository name does not change routing or code paths.

Latest conversation decisions and next steps: [SESSION_NOTES_2026-09-16.md](SESSION_NOTES_2026-09-16.md). Detailed implementation and prior validation: [EDITORIAL_REVIEW.md](EDITORIAL_REVIEW.md). Film history: [HUMAN_FILM.md](HUMAN_FILM.md).

The saved design has the centered black header with scroll/hover reveal, a 22-second silent portrait film with a closer first portrait, centered brand ending, a scrolling introduction sheet, sticky service story, colored publication cards and portraits, knowledge tools, Turkey-centered night globe and a career invitation. Puzzle artwork has been replaced on the current homepage and service/corporate templates. The historical design source remains in Git.

Runnable checks: `npm test` and the standalone `node human-opening.test.mjs`, `node world.test.mjs`, `node vehicle.test.mjs`, `node service-contact.test.mjs`, `node editorial.test.mjs`, `node editorial-meta.test.mjs`, `node header-motion.test.mjs`, `node search-core.test.mjs`. CSS source: `styles/editorial.css`; `npm run build` compiles Tailwind CSS and builds the static pages.

Video originals and the closing-card renderer are archived in `source-media/human-opening/`. The renderer is preserved as used; its ROOT, FONTS, OUT and FF paths refer to the original workstation and need adjustment before running elsewhere. The current web film is `public/insan/people-framing-v2.mp4`, with its matching poster; the original `people.mp4` remains available.

Pending: client-supplied service-contact names/photos/emails/phone numbers, clarification of sidebar visibility, Wagtail publishing and career/email integration, annual calculator review, and application of the latest Deloitte Global research. No production backend or live application delivery is implied. The preview deliberately remains noindex.

Deloitte Global review: [research/DELOITTE_GLOBAL_REVIEW.md](research/DELOITTE_GLOBAL_REVIEW.md). Inventory: 4,665 sitemap URLs; actual review: 74 distinct pages/screens with documented limits. The newly recommended compact blog grid and separate service-image scenes have not yet been implemented.

Secrets, dependency folders, build output and local agent scratch files are excluded. Rebuild dist locally. Local-browser content-editor drafts are not Git files. This checkpoint saves the existing work; no additional design change was made during the save.
