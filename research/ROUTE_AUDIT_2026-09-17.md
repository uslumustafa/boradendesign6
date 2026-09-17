# Boraden: full generated-route static audit

Date: 17 September 2026. Read-only implementation review; this report is the sole file added by this reviewer. Generated output was inspected before the supervising agent's current palette/sector correction. This is **not a claim of visual inspection of every page** or of external-source/legal verification.

## Exact coverage

- 109 generated HTML documents, excluding the frozen `__compare` experiments: 107 route-manifest entries plus `/insan/` and `/insan/araclar/`.
- Every document parsed with Python's standard-library HTML parser, including the 404 document.
- 11,446 local `href`, `src` and `poster` reference instances checked against generated files. Directory links resolve to `index.html`; local fragments checked against target IDs.
- All 109 have exactly one H1, a nonempty title, `lang="tr"`, no duplicate HTML IDs and `alt` attributes on every image.
- Zero missing local destinations/assets and zero unresolved local fragment targets in this snapshot.
- Route families: 54 service pages (directory, 6 expertise groups, 47 services); 7 sector routes; 15 perspective pages; 4 blog pages; 7 news pages; 3 circular pages; 2 announcement pages; 4 calculator routes; the additional `/insan/araclar/` tools page; both homepage URLs; and the remaining corporate/archive/contact/policy/404 pages.
- Shared generators reviewed: navigation/footer, company profile, career, service catalogue/group/detail, sector landing/detail, publications and article detail, perspectives and detail, calculator pages, team/mission/policy/contact. Shared brand, editorial and service-contact styling inspected.

## Findings and decisions

1. **Remove unapproved sector taxonomy from the public presentation.** The current supervising-agent change replaces the six topic guides with the historical sector-report archive. Retain old URLs safely, remove guide claims from search/navigation, and preserve the three report sources and their period labels. This audit does not count these soon-to-change pages as a remaining implementation defect.
2. **Use one light base across internal pages.** The black video/navigation can remain the strongest dark area. Broad blue perspective surfaces and dark sector surfaces compete with it. A white/light-neutral background, dark text, restrained blue/orange/green borders and hover details create continuity without further page-length growth. This is the supervising agent's current change.
3. **Nine non-blog article detail pages still have a different, plain treatment.** Six news, two circulars and one announcement use `intro + paragraphs + sources`, while blog and perspective details have structured reading panels. Reuse existing reading components, with a compact category/title/summary/source-date header and source panel. Do not add artificial illustrations or length to two-paragraph updates.
4. **All generated descriptions are the same generic sentence.** Appropriate for this development preview but not a completed SEO implementation. Before launch, derive unique descriptions from actual page summaries and choose canonical URLs for `/` vs `/insan/` and `/hakkimizda/` vs `/biz-kimiz/`. Repeated titles occur only on these two intentional aliases. Current `noindex,nofollow` and robots exclusion should remain until launch is authorized.
5. **Career is a deliberately disabled preview, not a working application system.** Its notice is clear; fieldset/button are disabled, it collects nothing. Wagtail submission storage, assigned-recipient notification, upload validation and consent handling remain separate backend work. Service staff and team profiles are also deliberate placeholders, not verified employee records. Do not describe them as complete functionality.
6. **Date labels need editorial ownership.** Eleven of twelve current publication records use 6 September 2026. The record alone cannot establish whether this is an actual publication date or an import/setup date. Keep source dates separate from Boraden publication dates; verify them before public release instead of inventing differing dates or reading-time values. Perspective source-date labels already use the dedicated metadata helper.
7. **Current company scope is materially broader and correctly includes the user-confirmed legal scope.** About copy covers audit/YMM, tax/accounting, finance/legal/management, HR/payroll, accounting/data systems and training. Preserve this breadth during shortening. The six compact scope links can carry details without duplicating long service descriptions on the homepage.
8. **Small secondary text is still a review target.** Some shared mobile/footer and attribution styles use 10–12 px. These can be legitimate metadata, but not essential service explanations or primary controls. Keep body and actionable information around 16–18 px; verify attribution readability in browser at actual size rather than inferring final cascade values from source CSS.

## What this check does not establish

- Actual rendered contrast, clipping, hover/scroll behavior, image decode or screenshot appearance. The supervising agent's browser review covers selected responsive representatives.
- Current external-source availability or accuracy of financial/legal rates.
- Successful form delivery, CMS integration, production indexing or measured Core Web Vitals.

The structural/link scan should be rerun against the final build only if route generation changes; do not confuse this pre-change count with a visual approval of every route.

## Post-change rendered-browser pass

The same 109 unique URLs were subsequently opened individually in the Codex in-app browser through CUA, in a dedicated temporary tab, at the actual 1280 px desktop viewport. No viewport override was applied. Each navigation was followed by accessibility-state and read-only rendered-DOM inspection.

- 109/109 pages had a rendered H1 with a nonzero box and visible display/visibility styling.
- 109/109 pages had no horizontal document overflow.
- No completed image reported `naturalWidth === 0` at inspection time. This does not assert that every offscreen lazy image was decoded; the earlier static pass verified every referenced image file exists.
- Manrope was the computed H1 family across the main site; Jost was the computed family on the seven sector archive/alias routes.
- Homepage body remained near-black; sector pages used `rgb(247, 247, 244)`. Other internal bodies were transparent over the neutral root background. Transparency was not mistaken for a black background.
- Actual screenshots reviewed for About, Career, a service detail (Bireysel Vergi Danışmanlığı), and a news detail (ÖTV). About and career are spacious, readable light layouts with black navigation; the career placeholder notice remains visible.
- The revised ÖTV page already showed the shared reading layout, chapter separators and source navigation. Finding 3 above is resolved by the supervising agent's current implementation across all nine non-blog detail pages.
- Service entrance is a brief fade; an immediate screenshot can capture reduced opacity during that animation. This is not a permanent washed-out text colour.

This pass verifies rendered layout basics for every page, plus screenshot review of the listed representatives. It does not claim manual screenshot inspection of every route or mobile testing of every route.

### Supervisor final-build verification
After archive/article generation changed, all109 generated HTML files were reparsed;11,453 local href/src/poster references and their local fragment targets resolved with zero failures. `npm test`:13/13 passing. Final sector screenshot caught inherited white archive text; sector archive ink and secondary text were explicitly corrected and desktop/mobile screenshots rechecked. Bilgi Merkezi was checked at390px: centered title, full-width cards, no document overflow. Resmî Gazete localSVG decoded and was visibly present in the paused ribbon; the running ribbon state was also observed. These targeted final checks do not imply screenshot review of all109 pages or all mobile routes.
