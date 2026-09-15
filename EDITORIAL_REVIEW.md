# Boraden — editorial direction and meeting-note review

16 September 2026. Applies to `/insan/`; existing service/article routes remain available. This is a local prototype, not a deployed Wagtail application.

## Applied

- Retained the centered black brand header, silent 22-second film and night globe.
- White introduction sheet rises over the sticky film with native scrolling; reduced motion uses normal flow.
- Sequence: film → Boraden introduction → blog rail → perspectives → expertise → compact knowledge access → globe.
- Replaced the homepage puzzle with six readable, linked expertise rows. This supersedes the earlier handwritten puzzle request for this prototype.
- Reused three existing blog posts, preserving titles, dates and content; no invented weekly news. Homepage shows the latest six eligible posts, with horizontal navigation and all-posts link.
- Reused 14 source-based perspectives, original portrait credits, article links and associated service links. Summaries are explicitly identified as paraphrases, not quotations or endorsements.
- Moved the unchanged vehicle form to `/insan/araclar/`; income tax, VAT and gross/net tools remain at `/hesaplama/`. Header's Bilgi Merkezi groups publications, perspectives, circulars and tools.
- Designed abstract vector artwork avoids a dependency on interchangeable stock photographs.
- Fixed the renderer's hardcoded 8 September publication cutoff. Eligibility now uses published status and valid publication dates up to the build date in Europe/Istanbul. Article routes and homepage share the same rule.

## Meeting notes — actual completion status

| Request | Status |
|---|---|
| Explain who Boraden is and why/how it helps | Short introduction and linked existing corporate/service content present; company-specific wording still subject to client approval. |
| Service owner at the bottom of each service | Existing service-contact slots retained. Names, approved photos and emails await client input; no people invented. |
| New/used car acquisition and amortization | 2026 standard depreciation estimator implemented; vehicle acquisition taxes, accounting entries and all special cases are outside its declared scope. |
| Annual calculator updates | Parameters centralized; automatic annual regulatory verification/editing is not implemented. |
| Resmî Gazete, özelgeler, circulars | Links and circular archive available. Özelgeler currently leads to GİB for research, not a local private-ruling database. |
| Stronger sidebar type; hide sidebar on unspecified page | Existing detail type strengthened. New homepage has none; the note does not identify the other page. |
| Coherent visuals, professional tone, no crowded sales feel | Applied to the new homepage; legacy detail-page visual migration remains a separate pass. |
| Weekly publication management | Frontend data-driven rail is ready; live Wagtail editor, scheduled publishing and deployment remain backend work. |

## Source check

Compared implemented parameters with primary sources on 16 September 2026:

- [GİB 2026 income tariff](https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-tarifeleri%2Fgelir-vergisi-tarifesi-2026.pdf): wage/non-wage thresholds and progressive rates match.
- [ÇSGB 2026 minimum wage](https://www.csgb.gov.tr/Media/gm2fekds/asgari-%C3%BCcret-2026.pdf): gross 33,030 TL, standard net 28,075.50 TL and employee deductions match.
- [SGK 2026 contribution base](https://www.sgk.gov.tr/Content/Post/2e0c9e1a-2cfe-4456-af10-49d3de0c58ba/Prime-Esas-Kazanc-Miktarlari-2026-01-14-10-35-39): monthly ceiling 297,270 TL matches.
- [GİB 2026 guide, page 9](https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=DUYURU/UNIVERSAL/2026/2026_Serbest_Meslek_Kazanci.pdf): vehicle limits of 1,380,000 / 2,600,000 TL and acquisition-year rule match.
- VAT arithmetic retains explicitly user-selected 1/10/20% rates. The earlier GİB classification reference returned no readable text in this check; product/service-specific VAT classification has not been newly verified. The tool does not infer it.
- The legacy 7326 workbook is an archive, not evidence of an open amnesty or a new 2026 facility. See research/CALCULATOR_SOURCES.md for scopes and historical sources.

These checks do not certify every transaction, exemption or payroll circumstance. No calculation arithmetic was altered in this visual pass.

## Next editorial ideas (not published news)

- “Bu hafta ne değişti?”: effective date, source, affected audience, and one practical next step, reviewed before publishing.
- “Bir soruda uzmanlık”: a compact explanation linking an article to the relevant service and eventually its named specialist.
- “Kararın arkasındaki hesap”: article + suitable calculator + scope notes, rather than a disconnected tool directory.

Wagtail mapping: retain title, slug/id, summary, category, publication date, status, body, sources and associated service. Replace build-time data access with the future backend query; do not maintain a second independent publication list. Local static preview requires rebuild after data edits; it is not a live weekly publishing system.

## Validation

`node build.mjs`, `node human-opening.test.mjs`, `node editorial.test.mjs`, `node vehicle.test.mjs`, `npm test`. Browser checks cover rail controls, first/last perspectives, mobile menu and the relocated vehicle form. Review notes were implemented by Codex after the Gemini worker exited before any file writes; no duplicate implementation or worker retry.
