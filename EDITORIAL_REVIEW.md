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

## 16 Eylül — gezinme ve ana sayfa sadeleştirmesi

- Değişiklik öncesi dönüş noktası: `c03afd74eebc13a9a4a340f0a27093698a5c804b`; private `uslumustafa/boradendesign6` deposunun `main` dalına push edildi.
- Ortak hizmet menüsü ve Türkçe/ASCII arama; dört ihtiyaçtan ilgili hizmete yönlendirme; bir büyük + iki küçük yayın; kısa giriş ve logo çizgileri; hizmet detaylarında üç soruluk özet.
- Film ve dünya animasyonu korunur. Hesaplama ve mevzuat içerikleri Bilgi Merkezi üzerinden erişilir. Wagtail bağlantısı bu ön yüz çalışmasının kapsamında değildir.
- Node testleri, yayın filtreleri, arama sıralaması ve yerel bağlantı hedefleri kontrol edildi. Masaüstü ve mobil tarayıcıda menü, ihtiyaç seçimi, yayın düzeni ve arama incelendi.

## 16 Eylül — navbar, uzman kartları ve yapbozdan çıkış

- Ortak navbar: masaüstünde aşağı kaydırınca gizlenir, üst 18px alana gelince açılır, imleç ayrılınca kapanır. Klavye odağı ve arama açıkken korunur; dokunmatik kullanımda yukarı kaydırma ile erişilir.
- Hizmet/grup, hakkımızda ve iletişim sayfalarında yapboz kaldırıldı; logo renklerinden üç mimari çizgi kullanıldı. Ana kök adres artık /insan/ ile aynı yeni tasarımı sunar; eski tasarım kaynakları Git'te korunur.
- data/service-contacts.json alanları: name, role, photo, email, phone. Grup varsayılanı services[serviceId] ile özelleştirilebilir. Boş profiller tasarım yer tutucusudur; kişi veya iletişim bilgisi uydurulmaz. Telefon/e-posta ve yerel fotoğraf sınırları test edildi.
- Kariyer menü ve ana sayfa bağlantısı, açıklama ve devre dışı başvuru alanı eklendi. Wagtail başvuru kaydı, yetkiler, saklama koşulları ve atanmış kişiye e-posta hâlâ backend aşamasıdır.
- Referans incelemesi: https://www.deloitte.com/tr/tr.html (16 Eylül 2026); hizmet, görüş ve kurumsal menü ayrımı. Tasarım/metin kopyalanmadı.
- Build, 11 mevcut Node testi, 4 uzman kartı testi, navbar durum testi, yayın/rota testleri ve video kontrol testi geçti. Masaüstü navbar gizleme/açma/ayrılma ve 390px uzman kartı tarayıcıda doğrulandı.

## 16 Eylül — kartlar, perspektifler ve yayın tasarımı

- [Deloitte Türkiye](https://www.deloitte.com/tr/tr.html): güçlü başlık, tek odaklı araştırma alanı ve video geçişi; [Sistem Global](https://sistemglobal.com.tr/): hizmet/kaynak grupları, kısa açıklama ve açık yönlendirme incelendi. Metin ve tasarımlar kopyalanmadı.
- Bloglar ortalanmış başlık altında üç renkli kapaklarla yatay kayar; ok ve dokunmatik kaydırma çalışır. İhtiyaç seçimi dört görsel karta taşındı. Bilgi Merkezi kartlarında mavi → turuncu → yeşil hover/klavye odak sırası var.
- Portrelerin siyah-beyaz filtresi kaldırıldı; kaynak fotoğraflar ve lisans bağlantıları korundu. Perspektifler kaynak, yorum, sorular ve ilgili hizmete ayrıldı; hizmet kapsamı kartlaştırıldı.
- Ortak 6 Eylül / 4 dakika etiketleri perspektiflerden kaldırıldı. Buffett'ın 1989 faaliyet mektubu [2 Mart 1990 tarihinde imzalanmış](https://www.berkshirehathaway.com/letters/1989.html); kaynak tarihi bu nedenle 2 Mart 1990. Diğer tarihler doğrulanmadığında yalnız “Kaynak temelli okuma” yazılır. Blog yayın tarihi doğrulanmamışsa “Boraden görüşü” gösterilir.
- [Tailwind CSS](https://tailwindcss.com/docs/installation/tailwind-cli) 4.3.3 build aracı olarak eklendi. Native HTML, CSS ve ES modules korunur; mevcut projeyi başka framework'e taşımak gerekmez. Kurulum/build: `npm ci`, `npm run build`. CSS kaynağı `styles/editorial.css`; derlenmiş dosya elle düzenlenmez.

### Wagtail'e aktarılacak alanlar

[StreamField](https://docs.wagtail.org/en/stable/topics/streamfield.html) bölüm sırası, başlık, açıklama ve kart listelerini; Django şablonları mevcut HTML/CSS yapısını karşılayabilir. [Headless](https://docs.wagtail.org/en/stable/advanced_topics/headless.html) ayrı bir mimari seçeneğidir, zorunluluk değildir.

- Blog: mevcut id/slug, title, summary, category, body, sources, service; yayın tarihi `date` ve doğrulama `publicationDateVerified`. Haftalık gerçek yayınlarda editörün belirlediği tarih kullanılır. Ana sayfa son altı yayını gösterir, tümü blog listesinde bulunur.
- Perspektif: source, sourceTitle, sourceDate/sourceYear, sourceDateVerified; kişi, fotoğraf/kredi/lisans, yorum, sorular ve ilgili hizmet. Kaynak tarihi Boraden yayın tarihinden ayrıdır.
- Hizmet ve ihtiyaç kartları mevcut hizmet kimliklerine bağlanır; uzman alanları `data/service-contacts.json` üzerinden doldurulur. Görsel bileşenler Wagtail şablonuna aktarılabilir; canlı model, yönetim paneli, zamanlanmış yayın ve e-posta entegrasyonu henüz kurulmadı.
- Doğrulama: 107 sayfa build; 11 mevcut Node testi; yayın/rota, kaynak tarihi ve video testleri geçti. 1280px ve 390px tarayıcı kontrollerinde blog geçişi, ihtiyaç seçimi, renk sırası, portre kadrajı ve hizmet kapsamı incelendi. Mobil yatay taşma bulunmadı. Gemini tarih yardımcı dosyasını yazdıktan sonra genel hatayla durdu; tekrar çağrılmadı, ürettiği modül yerelde test edilip kullanıldı.

## 16 Eylül — sabit görselle hizmet keşfi

- Dört ihtiyaç kartının yerini üç kısa anlatı aldı: denetim/vergi, kuruluş/değerleme, insan/sistemler. Altı uzmanlık alanı ve iki doğrudan hizmet bağlantısı mevcut veriden üretilir; detay içerikleri hizmet sayfalarında kalır.
- Mevcut temsili denetim görseli masaüstünde CSS sticky ile sabitlenir; kartlar normal kaydırmayla ilerler. JS veya scroll kilidi eklenmedi. Mobilde ve reduced-motion tercihinde normal belge akışı kullanılır.
- 1440px tarayıcı testinde scrollY 1932 ve 2562 iken görsel üstü 0px kaldı; bloga geçişte serbest kaldı. 390px mobilde taşma yok, bağlantılar en az 57px yüksekliğinde. Build, rota/kaçış ve video kontrolleri geçti. Worker hiçbir dosya yazmadan genel hatayla durduğu için uygulama Codex tarafından tamamlandı; ikinci API denemesi yapılmadı.

## 16 Eylül — ilk portrenin kadrajı

- `public/insan/people-framing-v2.mp4`: ilk 22 kare (0–0,9167 sn) 914×514, x184/y10 kırpılıp 1280×720'ye ölçeklendi. Yaklaşık %40 yakın plan; ilk portredeki fazla gövde/yan boşluğu azaltıldı. Kapak karesi aynı videodan `people-framing-v2.jpg` olarak çıkarıldı.
- Orijinal `people.mp4` / `people.jpg` korunur. Yeni dosya H.264, 24 fps, 22 saniye, sessizdir. İlk plan dışındaki 506 kare kaynakla SSIM 0,998923; sıra, süre, slogan ve logo kapanışı korunur. Bu medya işlemi worker'ın izinli komutları dışında olduğu için yerel FFmpeg kullanıldı.
- Ana sayfa kaynakları güncellendi; build ve video davranış testi geçti. Tarayıcıda yeni kaynak, süre, sessiz oynatma ve ilk portre kadrajı doğrulandı.
