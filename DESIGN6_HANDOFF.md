# Boraden Design 6 — 15 September 2026

Private repository: https://github.com/uslumustafa/boradendesign6

Current design entry: `/insan/`. The previous home and service routes are preserved.
Run `npm run build`, then `npm start`; open the local server’s `/insan/` URL.
The existing local preview remains in the `boradendesign2` folder; the repository name does not change routing or code paths.

Latest state and decisions: see HUMAN_FILM.md. The 22-second silent portrait film, centered brand ending, scrolling section transition, Turkey-centered night globe and initial client-note implementation are saved.

Runnable checks: `node human-opening.test.mjs`, `node world.test.mjs`, `node vehicle.test.mjs`, `node service-contact.test.mjs`.

Video originals and the closing-card renderer are archived in `source-media/human-opening/`. The renderer is preserved as used; its ROOT, FONTS, OUT and FF paths refer to the original workstation and need adjustment before running elsewhere. The finished web film is `public/insan/people.mp4`.

Pending: client-supplied service-contact names/photos/emails, clarification of sidebar visibility, Wagtail integration and annually verified calculator parameters. No production backend or live application delivery is implied.

Secrets, dependency folders, build output and local agent scratch files are excluded. Rebuild dist locally. No new design changes were made during this save.
