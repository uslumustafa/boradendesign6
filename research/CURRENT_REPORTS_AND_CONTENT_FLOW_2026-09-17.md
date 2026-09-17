# Güncel yayınlar ve bilgi akışı — 17 Eylül 2026

## Kaynaklar
İki bağımsız görev: resmî yayın araştırması ve aktif akışın metin denetimi. 2017 kartları kaldırılmış durumda; üç kaynak yedi ek resmî yayınla genişletildi. Raporlar kopyalanmadı, kısa kapsam özeti ve özgün kurum bağlantıları kullanıldı. İstatistik bülteni / araştırma / rapor türleri etiketlendi.

| Yayın | Veri dönemi / kapsam | Yayın tarihi | Kurum | Bağlantı |
|---|---|---|---|---|
| Sektör Bilançoları | 2025 | 2026-09-16 | TÜİK · TCMB | [Kaynak](https://veriportali.tuik.gov.tr/tr/press/58019) |
| Girişimlerde Bilişim Teknolojileri Kullanımı | 2025–2026 | 2026-09-10 | TÜİK | [Kaynak](https://veriportali.tuik.gov.tr/tr/press/58021) |
| Dolaylı Ar-Ge Teşvikleri | 2025 | 2026-09-04 | TÜİK | [Kaynak](https://veriportali.tuik.gov.tr/tr/press/58305) |
| Türkiye Sektörel PMI | Ağustos 2026 | 2026-09-01 | İstanbul Sanayi Odası · S&P Global | [Kaynak](https://www.iso.org.tr/haberler/diger-haberler/iso-turkiye-imalat-pmi-agustos-2026-raporu-ile-turkiye-sektorel-pmi-raporu-aciklandi/) |
| Enflasyon Raporu 2026-III | Ağustos 2026 değerlendirmesi | 2026-08-13 | Türkiye Cumhuriyet Merkez Bankası | [Kaynak](https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB%2BTR/Main%2BMenu/Yayinlar/Raporlar/Enflasyon%2BRaporu/2026/Enflasyon%2BRaporu%2B2026%2B-%2BIII/) |
| Türkiye’nin İkinci 500 Büyük Sanayi Kuruluşu | 2025 | 2026-07-20 | İstanbul Sanayi Odası | [Kaynak](https://www.iso.org.tr/haberler/basin-aciklamalari/iso-turkiyenin-ikinci-500-buyuk-sanayi-kurulusu2025-arastirmasinin-sonuclarini-acikladi/) |
| Türkiye’nin 500 Büyük Sanayi Kuruluşu | 2025 | 2026-06-17 | İstanbul Sanayi Odası | [Kaynak](https://www.iso500.org.tr/500-buyuk-sanayi-kurulusu?yil=2025) |
| Finansal İstikrar Raporu | Mayıs 2026 | 2026-05-22 | Türkiye Cumhuriyet Merkez Bankası | [Kaynak](https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB%2BTR/Main%2BMenu/Yayinlar/Raporlar/Finansal%2BIstikrar%2BRaporu/2026/Sayi%2B42) |
| Türkiye’de E-Ticaretin Görünümü | 2025 | 2026-05-14 | T.C. Ticaret Bakanlığı | [Kaynak](https://icticaret.ticaret.gov.tr/haberler/turkiyede-e-ticaretin-gorunumu-raporu-2025-yayinlandi) |
| Türkiye’nin İlk 1000 İhracatçısı | 2025 | Kesin gün doğrulanmadı | Türkiye İhracatçılar Meclisi | [Kaynak](https://tim.org.tr/tr/turkiyenin-ilk-1000-ihracatci-arastirmasi-2025) |

TÜİK bilişim yayını internet/bulut/güvenlik için 2026, bazı e-satış ve diğer göstergeler için 2025 içerdiğinden dönem 2025–2026 olarak gösterilir. Sektör Bilançoları 2025 yeni yayını 16 Eylül 2026 tarihli resmî bültende ve gerçek tarayıcı sayfasında doğrulandı. TCMB enflasyon tahminleri gerçekleşmiş veriler olarak sunulmaz. TİM için kesin yayın günü uydurulmadı. Yeni yayınların tamamının PDF içeriği okunmuş olduğu iddia edilmez; kaynak başlığı, dönem, tarih ve kapsam doğrulandı.

GİB özelge bağlantısı artık [doğrudan arama](https://gib.gov.tr/mevzuat/arama?kanun-turu=ozelge&ktype=99&tur=vergi-mevzuati) sayfasıdır.

## Uygulama
Mevcut editorial.js kontrolü dört bölüm için ortak native scroll davranışına dönüştürüldü: blog, perspektifler, Bilgi Merkezi, Son Raporlar. 18px/s yavaş hareket; sona gelince yön değiştirir. Klon kart yok, bağlantılar bir kez sunulur. Fare üzerindeyken ve klavye odağında durur; manuel duraklatma, oklar, perspektif seçimi ve dokunma kontrolü vardır. Ekran dışında ve arka planda durur; reduced-motion tercihinde otomatik hareket kapalıdır. Yeni bağımlılık yok.

Bilgi Merkezi altı doğrudan karta ayrıldı. Ana sayfa/kurumsal başlıklar, blog başlıkları ve çağrılar bilgilendirici dile alındı. Hakkımızda'ya ihtiyaçlar ve üç adımlı kapsam/çalışma anlatımı eklendi. Mevcut doğrulanmış hizmetler, 1993 temelleri, hukuki kapsam ve gerçek/tüzel kamu/özel hedef kitle korunuyor. Kişi profilleri değiştirilmedi; Wagtail/form entegrasyonu yapılmadı.

## Kontrol
Build, mevcut 13 test, editorial.test.mjs ve yeni card-flow.test.mjs geçti. Yeni test hareket sınırları, hover/klavye/fare odağı ayrımı, manuel/dokunma durdurma, ekran dışı/arka plan ve reduced-motion durumlarını kontrol eder. Masaüstü blog, perspektifler, Bilgi Merkezi ve raporlar; 390px raporlar/perspektifler/Bilgi Merkezi ve Hakkımızda kontrol edildi. Ölçülen sayfalarda yatay belge taşması yok; sektör sayfasında tarayıcı JS hatası yok. Okla gezinme manuel duraklatmaya geçer. Ayrı inceleme erişilebilirlik kontrolünü tamamladı.

Yerel önizleme; bu tur Git push veya üretim yayını yok. Başlangıç yedeği: ../.agent/checkpoints/20260917-moving-content/.
