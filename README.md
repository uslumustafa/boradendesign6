# Boraden — Birlikte, bütüne.

Second Boraden design exploration. Light palette and a progressive puzzle of six service disciplines around Boraden.

Run with Node.js: `npm run build`, then `npm start`. Open http://127.0.0.1:4174/. No package installation is needed. `npm test` checks puzzle geometry, transferred routes and calculator reuse.

Current direction: near-white blue surfaces, navy typography, and restrained blue/green/red accents derived from the Boraden logo. The user's latest decision restores the previous 4173 design's Manrope and italic Instrument Serif. Six interlocking service pieces assemble around Boraden as the reader scrolls. Each service page highlights its own piece against a faint puzzle. Native navigation and search remain available throughout. Mobile and reduced-motion use a completed static puzzle.

Opening sequence: fullscreen black, six large service pieces assemble, then colored checks and a full-width BORADEN reveal with “Bağımsız Denetim ve Danışmanlık A.Ş.” underneath. Duration is about 4.9 seconds. This black intro explicitly supersedes the earlier no-black decision for the opening only. It plays on the first home-page visit per browser tab session. Skip or Escape enters directly; reduced-motion bypasses the intro. `/?intro=1` replays it for design review. Without JavaScript the page opens directly.

The homepage includes all 14 world perspectives with their existing reading/source links and portrait credits. The 1.5-second carousel pauses on hover, keyboard focus, hidden tabs, offscreen and reduced-motion; manual controls remain available. The approved exterior-to-office video is the final section before the footer. Its original visibility-based playback code is reused: lazy, muted, inline, offscreen pause, mobile/reduced-motion poster fallback.

The preserved first prototype is in `reference/`; the active content snapshot is in `data/`; media and all archived PDFs are in `public/assets/`. Archived source photos refer to the media in `public/assets` rather than being committed twice.

The legacy visual design does not bind this design. Company facts, editorial sources, dates, media attribution and limitations must be retained. No invented team members or client outcomes. Wagtail backend and delivery of career applications/email remain a later integration.

Local design preview; not a live production deployment. Source data migration is recorded in `data/migration.json`. Browser-local editor records are not in Git and are not copied by the snapshot.

The preview deliberately uses `noindex`. Wagtail, publication approvals, search indexing and production delivery are not implemented. Calculator logic and its dated scope/source notes are reused without changing financial parameters. The previous Boraden repository remains unchanged.
