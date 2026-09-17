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

## Current local revision — 17 September: service menu and typography

The earlier unpushed work above is now checkpointed and pushed to **private `uslumustafa/boradendesign6`, main, `b0273fc`**. Remote `design6` is the intended destination; do not push the old `origin` for this project.

After that checkpoint the shared services menu was changed to a click-based drilldown: six initially collapsed fields, selected field's links, back navigation and an intrinsic-height transition. The three service cards over the meeting image remain. Instrument display styles were replaced with existing Manrope; perspectives now use a strong blue surface, and publication/tool cards carry clear three-colour brand accents. Mobile portrait space was reduced. No new dependency, section, photograph or backend integration.

Scope, references and checks: [research/DESIGN_DIRECTION_2026-09-17.md](research/DESIGN_DIRECTION_2026-09-17.md). New runnable check: `node service-menu.test.mjs`. These post-checkpoint edits are local, not yet pushed. The older “no push” statements and directory-layout metrics above are historical.

## 2026-09-17 — service / sector interface revision (local)
Service directory and all shared group/detail templates now use direct cards, native scope disclosures and original field graphics. Sector provenance corrected: old Sektörler is a historical reports page, the six new sector pages are editorial guides. Source archive stored in `data/boraden.json` sectorReports. Homepage keeps scrolling card layout with new human-free brand architecture image. See `research/SERVICE_SECTOR_REVIEW_2026-09-17.md` for evidence, media prompt, validation and rollback. No push in this turn; Wagtail backend is still pending.

## 2026-09-17 — official-source ribbon restored (local)
Reused institutionsBand on active root and /insan/ immediately after tools, before globe. Added Resmî Gazete with a neutral newspaper icon; preserved seven original institution records/logos including TSPB SVG. Extracted existing motion CSS/JS into shared motion-bands files; legacy app uses the same behavior. Compact 247px desktop / 225px mobile strip; all logos preloaded (about 55KB unique assets) to avoid empty cards during animation. Hover/focus/manual pause and reduced-motion behavior retained. Build and targeted animation, old expertise isolation and active-homepage integration tests passed. Actual desktop/mobile checks: eight destinations, all logos load, no horizontal page overflow, stop/resume work. Changes remain local.

## 17 Eylül — açık içerik paleti ve tam sayfa taraması
- Kullanıcı koyu sektör temasını ve büyük mavi perspektif zeminini reddetti. Siyah film/navbar korunuyor; içerik paleti kırık beyaz, beyaz kartlar, koyu nötr yazı ve üç marka vurgusu.
- /sektorler/ artık yalnız eski Boraden'de doğrulanan üç tarihsel raporu sunuyor. Altı sonradan üretilmiş sektör rehberi ana sayfadan/aramadan kaldırıldı; eski alt URL'ler aynı rapor arşivini açarak boşa düşmüyor. Menü etiketi Sektör Raporları. Jost bu arşivde korunuyor.
- Bilgi Merkezi büyük ortalı başlık, açıklama ve üç geniş karta dönüştürüldü. Mobil tek sütun.
- Resmî Gazete için yerel gazete SVG simgesi eklendi (resmî logo olduğu iddia edilmez); kurum şeridinde görsel olarak kontrol edildi, hareket/durdurma çalışıyor.
- Dokuz haber/sirküler/duyuru detayı mevcut okuma paneli düzenine alındı. Doğrulanmamış yayın tarihi ayrıntı başlığında gösterilmiyor.
- İki bağımsız ajan raporu: research/DESIGN_REVIEW_2026-09-17.md ve research/ROUTE_AUDIT_2026-09-17.md. 109 route gerçek masaüstü tarayıcıda açıldı; seçili aileler ayrıca ekran görüntüsüyle incelendi. Ana sayfa araçları ve sektör arşivi 390px'de kontrol edildi. Son build109HTML/11.453 yerel referans, sıfır eksik hedef; npm test13/13 başarılı.
- SEO açıklamaları, gerçek yayın tarihleri ve Wagtail kariyer kaydı/e-posta ayrı kalan işlerdir. cozum-prosedurleri legacy anket metni içerik doğrulaması bekliyor. Git push yapılmadı.

## 17 Eylül — Son Raporlar / 2025–2026
Kullanıcının güncelleme talebi üzerine yukarıdaki 2017 arşiv kararı değiştirildi. Üç tarihsel kart, data/boraden.json sectorReports içinden kaldırıldı; /sektorler/ ve korunan alt URL'ler artık Son Raporlar bölümünü gösteriyor. Arama özeti de güncellendi.

Doğrulanan birincil kaynaklar:
- Türkiye Sektörel PMI, Ağustos 2026. Yayın 1 Eylül 2026. https://www.iso.org.tr/haberler/diger-haberler/iso-turkiye-imalat-pmi-agustos-2026-raporu-ile-turkiye-sektorel-pmi-raporu-aciklandi/ — rapor PDF: https://www.iso.org.tr/file/TRSektorelPMI_2026.08_TUR-13639.pdf
- TİM Türkiye'nin İlk 1000 İhracatçısı, veri yılı 2025. Resmî sayfa tarayıcıda açıldı ve 2025 kitap/Excel bağlantıları doğrulandı. Kesin yayın günü gösterilmediği için publishedAt null. https://tim.org.tr/tr/turkiyenin-ilk-1000-ihracatci-arastirmasi-2025 — kitabın tamamı okunmadı; kart yalnız kapsamı özetler.
- İSO Türkiye'nin 500 Büyük Sanayi Kuruluşu, veri yılı 2025. Sonuçlar: https://www.iso500.org.tr/500-buyuk-sanayi-kurulusu?yil=2025 — 17 Haziran 2026 yayın tarihi: https://www.iso.org.tr/basin/basin-bultenleri/iso-turkiyenin-500-buyuk-sanayi-kurulusu-arastirmasi2025-sonuclarini-acikladi/

Veri dönemi, yayın tarihi ve kaynak kontrol tarihi ayrı alanlardır. Raporların tamamı kopyalanmadı; kurumun özgün yayınına bağlantı verilir. Yeni kütüphane yok. Build ve service directory search odaklı testi geçti; masaüstü ve 390px mobil görünüm kontrol edildi, yatay taşma/2017 kartı yok. Karşılaştırma önizlemesi tekrar dist/__compare içine kopyalandı. Değişiklikler yerel önizlemede; Git push veya üretim yayını yapılmadı.

## 17 Eylül — hareketli bilgi kartları ve sade kurum anlatımı
- Güncel resmî yayınlar 3'ten 10'a çıktı; 2025/2026 veri dönemleri, yayın tarihleri ve yayın türleri ayrı tutuldu. Kaynaklar: research/CURRENT_REPORTS_AND_CONTENT_FLOW_2026-09-17.md.
- Blog, perspektifler, Bilgi Merkezi ve Son Raporlar ortak yavaş yatay akış kullanır. Sonda yön değiştirir; klon yok. Hover/klavye odağı/dokunma/manuel durdurma ve reduced-motion desteklenir. Native kaydırma ve oklar her karta eriştirir. JS yalnız görünürken çalışır.
- Bilgi Merkezi: amortisman, vergi/ücret hesaplaması, Resmî Gazete, doğrudan GİB özelge araması, sirküler ve son raporlar. Menü/ana sayfa uzatılmadan ayrı kartlar.
- Reklam tonundaki ana sayfa, blog, kariyer, iletişim ve altbilgi ifadeleri sadeleştirildi. Hakkımızda ihtiyaçlar ve çalışma süreciyle genişletildi; kişiler değişmedi.
- Kontroller: build, mevcut13test, editorial ve yeni card-flow.test.mjs. Masaüstü ve seçili390px görsel kontrol; yerel değişiklikler, push yok. Film, hizmet sahnesi, dünya ve önceki yedek korunur.

## 17 Eylül — site GitHub kaydı
Bu checkpoint yukarıdaki yerel tasarım, hizmet menüsü, resmî kaynak şeridi, güncel raporlar, hareketli kartlar ve sade metin düzenlemelerini birlikte kaydeder. Hedef mevcut özel `uslumustafa/boradendesign6` deposunun `main` dalıdır; önceki yerel/push yok notları tarihsel durumları anlatır.

Kullanıcının talebiyle müşteri tanıtım ekran kaydı ve arşiv notları güncel depodan kaldırıldı; kayıt bilgisayarda korunur ve tekrar Git'e eklenmemelidir. Sitede kullanılan giriş filmi bu değişikliğin kapsamında değildir. Başvuru altyapısı ve diğer bekleyen işler yukarıdaki gibi devam eder.
