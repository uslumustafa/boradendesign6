# Service and sector interface — 17 September 2026

## Source check
- https://boraden.com.tr/sektor-raporlari is the actual destination of the old site's Sektörler navigation. It contains three report links, not the six editorial sector categories in this prototype.
- https://boraden.com.tr/sektor-birincileri and https://boraden.com.tr/en-karli-sirketler show 2017 data. Do not present their firms as Boraden clients or their rankings as current.
- https://boraden.com.tr/sermaye-yapisina-gore-ilk-1000-ihracatci-firma remains labelled a historical table: no unverified date was added.
- Prototype's six sector categories are editorial guides mapping business topics to existing services. Landing/detail copy now makes that distinction explicit. Original source tables are linked in a separate archive, not silently transformed into current data.
- Deloitte tax page https://www.deloitte.com/tr/tr/services/tax.html reviewed in the actual browser at the hero and service overview. Adopted a stronger graphic entrance and direct service choices, not its claims, identity, text or assets. No claim to have reviewed every page/animation.

## Changes
- Shared service directory, 6 group pages, 47 service pages and 7 sector pages rebuilt around concise entrances, purposeful original graphics, direct linked cards and native disclosure sections.
- Existing detailed scope, needs, preparation, FAQs, historical text and sources retained. Duplicate overview text is omitted only where already rendered in the scope or intro.
- Directory search expands matching groups. Full native links and disclosures work without JS. Keyboard focus, reduced motion and mobile layouts included.
- Sector graphics use production, logistics, technology, retail, construction and connected professional-services motifs rather than unrelated service icons.
- Homepage keeps its three scrolling service cards, film and section order. Only its AI meeting photo was replaced with an original brand architecture image.
- New image: public/assets/brand/boraden-perspectives-v1.webp, 1672×941, about 143KB. Human-free generated concept, not a real Boraden location.
- Content remains JSON/templates; Wagtail integration is still a separate backend step. Added sectorReports data records should become a repeatable report block when integrated. Preview remains noindex.

## Validation
- Production build: 107 pages, 47 services, 247 documents.
- Existing 11-test suite passed; focused service regression plus new search/provenance check passed after template refinements.
- Experience and service menu checks passed. 61 service/sector routes checked for one H1, unique IDs, valid local assets and hash targets.
- Actual browser: desktop directory expansion and bordro search, service scope switching, group/detail/sector page visuals, homepage stationary art with three scrolling cards.
- Mobile 390×844: found and fixed an aspect-ratio min-width overflow in the hero artwork (460px into 329px); rechecked artwork/container both 329px and disclosure behavior.
- First visual critique led to distinct sector artwork and stronger filled hover states. No new dependency or API video spend.

## Rollback
Pre-change sources saved locally under ../.agent/checkpoints/20260917-internal-services. Previous design6/main checkpoint b0273fc remains unchanged. This turn's edits are local, not pushed.

## Image generation prompt
Use case: stylized-concept. Create one exceptionally art-directed wide 16:9 website background photograph-like architectural sculpture for BORADEN, an independent audit and advisory firm. Original design, not a copy of Deloitte. No people, no company team, no text, no lettering, no logo, no charts or numbers, no puzzle. A calm monumental composition of three substantial folded ribbon / architectural planes with chamfered edges: deep petrol blue (#00547c), warm vermilion orange (#e94d2a), and clear green (#259e3c). They align and intersect spatially like three disciplined perspectives creating a clear central passage. Premium architectural model photography: frosted glass edges, finely brushed anodized metal faces, precise joints, directional daylight, tactile realistic materials, deep but soft shadows and believable surface reflections. Background and ground are pale neutral limestone, not pastel coloured. Artful cropped large scale, eye-level oblique view, the main sculptural structure occupying the RIGHT 60% of the frame with a strong sense of depth. LEFT 40% mostly quiet stone negative space, suitable for overlaying a large opaque white service panel. Beautiful, restrained, intelligent financial brand identity, energetic through bold colour and tension in the planes, no generic office, no plants, no skyline, no small decorative objects, no busy gradients. Clean high quality wide landscape image.
