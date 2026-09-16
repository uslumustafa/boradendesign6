# Boraden — konuşma ve devam notları

16 Eylül 2026. Kullanıcı mevcut çalışmanın ve konuşmadaki kararların kaydedilip GitHub'a pushlanmasını istedi.

Bu dosya konuşmanın karar ve iş özeti niteliğindedir; birebir mesaj dökümü değildir. Tamamlanan işler ile henüz uygulanmayan öneriler aşağıda ayrılmıştır.

Son güncelleme: dünya zoom turu kaldırıldı; sabit mesafede dönüş, Türkiye’den yedi kıtaya temsili hatlar ve ayrıca Türkiye → İngiltere / Orbis hattı eklendi. Orbis şirketi kullanıcı tarafından bildirildi; URL ve kesin ofis adresi henüz verilmedi. Güncel öncelikler: [BORADEN_TODO.md](BORADEN_TODO.md).

## Çalışma ve kayıt yeri

- Çalışma alanı: `/Users/mustafauslu/Desktop/Boraden`.
- Güncel ön yüz deposu: `boradendesign2/`. Klasör adı tarihsel; güncel GitHub hedefi **private `uslumustafa/boradendesign6`**, remote `design6`, dal `main`.
- Yerel dal: `codex/puzzle-concept`; eski isim aktif tasarımın hâlâ puzzle olduğu anlamına gelmez.
- Önceki uzak kayıt noktası: `c03afd74eebc13a9a4a340f0a27093698a5c804b`. Önceki tasarımlar Git geçmişinde korunur.
- Sunum adresi: `http://127.0.0.1:4174/insan/`; `/` aynı güncel açılışı sunar.
- Bu bir yerel tasarım prototipidir. Canlı Wagtail uygulaması veya production yayını değildir.

## Tasarım kararlarının gelişimi

1. Legacy Boraden yalnız şirket içeriği ve bilgi mimarisi kaynağı olarak kabul edildi; eski renk ve düzenler bağlayıcı değil.
2. İlk premium tasarımda pastel renkler, hareketli kartlar, hizmet görselleri, dünya perspektifleri ve hesaplama araçları geliştirildi. Müşteri bunu yoğun buldu.
3. İkinci tasarımda hizmetlerden birleşen puzzle fikri denendi. Daha sonra kullanıcı puzzle tasarımını bırakıp daha özgün ve sade bir yön istedi. Eski puzzle talimatları güncel ana sayfa kararının önüne geçmez.
4. Güncel yön: Apple benzeri kontrollü kompozisyon, Deloitte benzeri kolay içerik keşfi; siyah header, merkezde renkli Boraden logosu, sessiz insan filmi, ardından açık zeminler ve logo renklerinden vurgular.
5. Müşterinin ölçütü: kurumsal güven, firmanın ne yaptığının kolay anlaşılması, aradığı hizmeti bulabilme. Çok sayıda efekt veya birbirini tekrarlayan kartla sayfa doldurulmamalı.

## Korunacak kullanıcı tercihleri

- Logo navbar'ın ortasında; menüler sağ ve solda. Aşağı kaydırmada navbar gizlenir; masaüstünde üst kenara imleç geldiğinde erişilir, ayrılınca gizlenir. Klavye/dokunmatik erişim korunur.
- Film konuşmasız ve sessiz, 30 saniyeyi aşmaz. Sonunda slogan ve logo; “Bağımsız Denetim & Danışmanlık” ifadesi marka kapanışında ortalı kalır.
- İlk portrenin kadrajı diğerlerine yaklaştırılmalı; bu düzeltme mevcut kayıtta yapıldı.
- Video fare hareketiyle ilerlemez; görünürlük ve kullanıcı oynatma kontrolleriyle çalışır. Eski scroll-scrub istekleri her videoya otomatik uygulanmaz.
- Bölümler arası geçiş güçlü olabilir; metin okunurluğu, mobil kullanım ve azaltılmış hareket tercihi korunmalı. İşaretçiler metnin üstüne binmemeli.
- Aynı görseli bütün sayfa boyunca veya bütün hizmetlerde tekrarlama. Gerçek olmayan çalışan/ofis görüntülerini Boraden'in gerçek fotoğrafı gibi sunma.
- Her şeyi ana sayfaya sığdırma. Hizmet, yayın, kariyer, mevzuat ve araçların ayrı girişleri olsun.
- Boraden'e ait olmayan istatistikleri, müşteri başarılarını veya şirket bilgisini uydurma. Referansların metinleri ve tasarımları birebir kopyalanmaz.
- Yeni ücretli medya üretimi için son onayların bütçe sınırları aşılmaz; bu kayıtta yeni üretim/kredi harcaması yapılmadı.

## Bu kayıtta mevcut uygulama

- Ortalanmış siyah header, ortak navigasyon ve Türkçe/ASCII arama; hizmet, yayın ve Bilgi Merkezi yolları.
- Sessiz 15 saniyelik insan filmi. Aktif kaynak `public/insan/people-short-v4.mp4`, poster `people-framing-v2.jpg`. Önceki 22 saniyelik film korunur. İlk 22 kare yakınlaştırıldı; orijinal medya korunur.
- Filmden kısa Boraden anlatımına yukarı kayan açık yüzey geçişi.
- Hizmet keşfinde sabit temsili görsel ve üç kısa anlatı; mobil ve reduced-motion normal akış. **Şu an bu üç anlatıda tek görsel var; farklı sahneli öneri henüz uygulanmadı.**
- Ortalı yayın başlığı ve yatay renkli kartlar; mevcut üç yazı korunur, uygun yayınlar veriden seçilir. Henüz gerçek haftalık canlı yayın sistemi yok.
- 14 kaynak temelli dünya perspektifi; renkli portreler, kaynak/kredi bağlantıları, okuma ve ilgili hizmet yönlendirmeleri. Özetler doğrudan alıntı gibi gösterilmez.
- Sabit 6 Eylül / 4 dakika etiketleri yerine doğrulanmış kaynak tarihi veya dürüst içerik etiketi. Doğrulanmayan tarihler uydurulmaz.
- Bilgi Merkezi girişlerinde logo renklerinin hover/klavye odak sırası.
- Hizmet/kurumsal şablonlarda puzzle yerine marka çizgileri; kapsam ve ilgili uzman bölümleri. Kişi kartları veriden doldurulabilir; gerçek isim/fotoğraf/iletişim bekleniyor.
- Alt bölümde özgün kariyer görseli ve ayrı kariyer sayfasına davet. Başvuru gönderimi/backend henüz bağlı değil.
- Türkiye odaklı gece dünya animasyonu korunur. Son görünümün müşteri değerlendirmesi devam edebilir; kullanıcının bütün ayrıntılara nihai onay verdiği varsayılmaz.
- Tailwind CSS 4.3.3 build aracı; mevcut HTML/CSS/ES module mimarisi korunur. Yeni framework göçü yapılmadı.

## Toplantı notları ve içerik kapsamı

- Firma kimdir, neyi niçin yapar: kısa tanıtım ve ilgili hizmetlere açık yollar; şirket özelindeki ifadeler müşteri tarafından onaylanmalı.
- Her hizmetin sonunda sorumlu kişi: ad, soyad, görev, fotoğraf, e-posta ve telefon. `data/service-contacts.json` doldurulacak; kişi bilgisi uydurulmayacak.
- Zorunlu hizmetler: Şirket Değerlemesi, Şirket Kuruluş Danışmanlığı, İnsan Kaynakları ve Bordro Hizmetleri.
- Araçlar: binek otomobili standart amortisman ön hesabı `/insan/araclar/`; gelir vergisi, KDV ve brüt/net araçları `/hesaplama/`. Bütün satın alma muhasebesi, vergilendirme istisnaları ve özel durumların kapsandığı iddia edilmez.
- Resmî Gazete, özelge kaynakları ve sirküler arşivi Bilgi Merkezi'nden erişilir. Özelgeler için yerel kapsamlı veri tabanı henüz yok.
- 7326 Excel dosyası tarihsel arşivdir; güncel açık bir matrah artırımı olanağı gibi sunulmaz.
- Önceki parametre/kaynak kontrolleri `EDITORIAL_REVIEW.md` ve `research/CALCULATOR_SOURCES.md` içindedir. Her yıl mevzuatı otomatik doğrulayan sistem yok; yayın öncesi güncellik kontrolü gerekir.
- Ekibimiz sonradan doldurulacak; istenmezse kaldırılabilir. Doğrulanmamış personel üretilmez.
- Duyurular gerçek içerik gelene kadar boş kalabilir. Bloga eski sitedeki yazılar gelişigüzel aktarılmayacak; kaynaklı, özgün ve editör onaylı yayınlar hazırlanacak.

## Son Deloitte Global incelemesi

[Ana rapor](research/DELOITTE_GLOBAL_REVIEW.md), [hizmet/sektör](research/DELOITTE_GLOBAL_SERVICES_REVIEW.md), [kurumsal/yayın/kariyer](research/DELOITTE_GLOBAL_EDITORIAL_REVIEW.md), [URL envanteri](research/DELOITTE_GLOBAL_URL_INVENTORY.txt).

- Resmî Global English site haritasının 4.665 URL'si envanterlendi; bunların tamamı tek tek okunmuş veya görsel olarak test edilmiş değildir.
- 74 sayfa/ekran incelendi: 72 Global, 2 US; ana menünün 18 hizmet ve 6 sektör girişinin tamamı. Dinamik içerik/erişim sınırları raporda kayıtlıdır.
- Kullanıcının gösterdiği sabit fotoğraf ve kayan beyaz panelin kaynağı `https://www.deloitte.com/global/en/about/story/together-makes-progress.html`; tarayıcıda kaydırılarak doğrulandı.
- Hizmet detayındaki kısa açıklama penceresi, arama sonuçları/uzman filtresi, araştırma ve kariyer akışı da incelendi.
- Bu son araştırma turunda uygulama değiştirilmedi. Aşağıdaki öneriler uygulanmış sayılmamalı.

## Sonraki tasarım adımı — henüz yapılmadı

1. Blog vitrinini kullanıcının paylaştığı örneğe yakın yoğunlukta, aynı ekranda 3–4 seçeneği gösteren kompakt kartlara dönüştürmek. Kısa başlık, gerçek metadata, her yazıya özgü kapak.
2. Sabit hizmet anlatısındaki tek fotoğrafı, her biri konusuna uygun farklı sahnelerle değiştirmek; yalnız seçili 2–3 anlatıda kontrollü hareket. Detayları hizmet sayfalarına bırakmak.
3. Hizmet ve yayın detaylarında kısa giriş, bölüm hiyerarşisi, süreç/çıktı kartları, ilgili yayın ve sorumlu uzman akışını bütünleştirmek.
4. Ana sayfa uzunluğunu yeniden değerlendirmek; film → Boraden kim → yayınlar → uzmanlık → perspektifler → küçük Bilgi Merkezi → kariyer/kapanış önerisi henüz kesin kullanıcı kararı değil.
5. Masaüstü/mobil tarayıcıda her değişikliği görerek denetlemek: okunurluk, menü erişimi, taşma, işaretçi çakışması, hareket azaltma ve linkler. Sadece build başarısını tasarım onayı saymamak.

## Wagtail ve yayın sınırı

Wagtail backend daha sonra geliştirilecek. İçerik/veri tasarımı buna aktarılabilir fakat entegrasyon tamamlanmadı. Yayın modelleri, StreamField sıralaması, gerçek tarihli haftalık içerikler, medya yönetimi, arama ve ilişkili hizmetler aynı veri kaynağından beslenmeli.

Kariyer başvurusu Wagtail'de kaydolacak ve atanmış kişiye e-posta gidecek: bu kullanıcı gereksinimi korunuyor, henüz çalışan özellik değil. İzinler, dosya kabulü, veri saklama ve e-posta teslimi backend aşamasında doğrulanacak.

Önizleme bilinçli olarak noindex. Production SEO, canonical/domain ayarları, sitemap/robots yayını ve gerçek ortam performans testleri yayına çıkış aşamasıdır; “SEO tamamen tamamlandı” denmez.

## Yeniden başlatma

`boradendesign2/` içinde taze kurulumda `npm ci`, sonra `npm run build`, ardından `npm start`. `/insan/` adresini aç. Build çıktısı `dist/` Git'e eklenmez. Paket kilidi ve medya kaynakları depoda tutulur.

Önce `DESIGN6_HANDOFF.md`, bu not ve `EDITORIAL_REVIEW.md` okunmalı. Konuşma veya eski README içindeki daha önce bırakılmış puzzle/palet fikirleri güncel kullanıcı tercihlerini geçersiz kılmaz. `.gemini`/env/secrets okunmaz veya Git'e eklenmez. Başarılı kontroller sebepsiz tekrarlanmaz; sonraki kod değişikliğinin ilgili testi çalıştırılır.
