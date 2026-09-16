# Boraden human-first opening film

Preview: `/insan/` and `/`.

## Current cut — 16 September 2026

- Active video: `public/insan/people-short-v4.mp4`; unchanged poster: `people-framing-v2.jpg`.
- Approximately 15 seconds (14.63s): varied fictional portraits, followed by the slogan and centered Boraden ending. Four-frame dissolves soften the two newly edited cuts. No audio, no loop; final logo remains visible.
- Keep original portrait motion/framing. Retain source seconds 0–10 and 14–15; reduce the 16–22s closing cards to four seconds. Previous 22-second file remains for rollback. No generation or credits used.
- Previous hard-cut v3 recipe (preserved for reference):

```sh
ffmpeg -i public/insan/people-framing-v2.mp4 -filter_complex '[0:v]trim=start=0:end=10,setpts=PTS-STARTPTS[a];[0:v]trim=start=14:end=15,setpts=PTS-STARTPTS[b];[0:v]trim=start=16:end=22,setpts=(PTS-STARTPTS)/1.5[c];[a][b][c]concat=n=3:v=1:a=0,fps=24[v]' -map '[v]' -an -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -movflags +faststart public/insan/people-short-v3.mp4
```

Current v4 uses the same three source intervals with constant 24fps on every input: crossfade 0.166667s at 9.833333s, then crossfade 0.166667s at 10.666667s. Normalize time bases with settb=AVTB and frame rate after each join. The export contains no audio; v3 and original sources are preserved.

Service-story headings and descriptions now state the service areas directly, without promotional slogans. Existing visual composition and scroll layout remain.

The entries below describe earlier versions. Current globe uses fixed-distance rotation, seven illustrative continental routes and a separate Turkey–England Orbis route; no camera zoom.

## Approved direction — 15 September 2026

- Total runtime below 30 seconds; current export 22 seconds (528 frames at 24 fps).
- 0–8s: eight studio portraits from the approved first film.
- 8–16s: eight additional studio portraits, varied ages and backgrounds.
- 16–19s: “Farklı bakışlar. Ortak değer: güven.”
- 19–22s: original three-color Boraden check mark, BORADEN, “BAĞIMSIZ DENETİM & DANIŞMANLIK”. Hold final logo; no automatic loop.
- No audio stream. No voice, speech, music or sound effects.

Flow / Omni 1.1 Flash generated the fictional people and business scenes. They are not Boraden employees, customers or offices. Ethnic identity cannot be verified from generated appearances. Deloitte Türkiye was reviewed for large-format imagery and brand-film pacing; none of its footage, text or logo was copied.

For the two new clips the user approved a ceiling of 30 existing Flow credits. Flow quoted and received approval for 22 credits (8-second portraits: 12; 6-second business clip: 10). No upgrade or additional purchase was accepted.

Media: `public/insan/people.mp4` (H.264, 1280×720, no audio), `people.jpg` poster. Local source clips and closing-card renderer: `.agent/human-opening/` (ignored). Typography uses the existing local Manrope fonts; logo paths match the existing site.

Playback respects reduced motion, data saving, manual pause and page visibility. “Yeniden izle” explicitly restarts the completed film.

Validation: `node human-opening.test.mjs`; `node build.mjs`; browser desktop/mobile inspection; final-frame and replay checks.

Latest revision: user removed the business montage and chose “Farklı bakışlar. Ortak değer: güven.” No additional media credits were used. Logo is centered in a symmetrical three-column navbar; service links are on the left and corporate/contact links on the right.

## Refinement — opening and closing globe

- The second portrait (1–2s) holds its neutral, closed-mouth frame; no new generation. Runtime stays 22s with no audio.
- The closing descriptor is centered, letter-spaced Manrope; it enters 0.85s after the logo begins appearing.
- Slogan is unchanged pending the user's decision. Suggested alternative: “Bağımsız bakış. Güçlü kararlar.”
- The final section reuses Design3's Three.js modules and Earth textures, with Turkey facing the visitor and restrained outward paths. Paths are illustrative, not office/operating-location claims.
- Globe loads near the viewport, pauses offscreen/in background, honors reduced motion, supports pause, keyboard/drag rotation and return to Turkey. A static globe remains if WebGL cannot initialize.
- Check: `node world.test.mjs`. Desktop 1440px and mobile 390px were visually checked, with no horizontal overflow.

## Handwritten client notes — next stage, not implemented here

- Explain who Boraden is, why it exists and how it helps a visitor unfamiliar with the firm.
- Add named service contacts once supplied and confirmed by the client.
- Explore a current new/used passenger-car purchase and amortization calculator; verify regulations before implementation.
- Organize legislation into Resmî Gazete, özelgeler and sirküler.
- Keep puzzle items navigable; strengthen thin typography and revisit sidebar visibility.
- Favor coherent designed visuals over interchangeable stock photographs.
- Maintain professional, trustworthy, restrained communication without overwhelming visitors or using a sales-heavy tone.
- Unclear handwriting remains subject to confirmation; it is not a source of company facts.

Latest visual refinement: closer Earth camera with aspect-aware framing, a blue atmospheric rim, independently moving clouds and dimensional connection paths. The approach section rises over the film during native scrolling; supporting browsers also apply a subtle upward video movement. Reduced-motion uses ordinary document flow. No forced scrolling and no change to the handwritten-notes scope.

## Night flight and initial client-note implementation

- Globe now opens close to Turkey, pulls out and returns over 26 seconds. Pausing, reduced motion and offscreen suspension cover the camera too. NASA Black Marble 2016 night map replaces the low-resolution legacy lights; 8192px desktop and 4096px small-stage textures are loaded lazily. Source: https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/ . NASA Earth Observatory / Joshua Stevens, Suomi NPP VIIRS / Miguel Román; imagery is a historical composite, not live data.
- Implemented in /insan/: clearer firm introduction, shared six-area clickable puzzle, navigation to existing service content, Resmî Gazete/GİB/sirküler access, and a collapsible 2026 new/used passenger-car depreciation estimator. No stock photographs added to these sections. Existing detail navigation typography increased.
- Estimator uses acquisition-year limits (1,380,000 TL net new vehicle; 2,600,000 TL capitalized taxes/used vehicle), normal 20% five-year depreciation, first-year month proration and final-year remainder. Source links and exclusions appear with the form. It is not a tax-saving or vehicle-purchase-tax calculator.
- Validation: vehicle.test.mjs covers limits, mode selection, cent totals, first/final year and unsupported years. world.test.mjs now proves actual near/far/near camera distances.
- Service contact slots already exist in data/service-contacts.json and service-contact.mjs; names/photo/email await the client. No fictitious people were populated.
- Wagtail integration and annual parameter editing remain backend-stage work. Current verified vehicle parameters are centralized in vehicle.js; 2027 is deliberately unsupported until checked. Existing cars must retain acquisition-year limits.
- The handwritten note does not name which other page should hide its sidebar. /insan/ has none; service-detail navigation remains available and is bolder.

QA: fixed negative first-frame deltas (rAF timestamp can precede the performance.now sample); clamped to zero and covered by a regression check. Flight timing tolerates lower frame rates. Mobile near/far renders and calculator form/results were checked; table scroll stays inside its own region.
