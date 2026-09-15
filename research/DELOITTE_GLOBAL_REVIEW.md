# Deloitte Global English — Boraden için araştırma

İnceleme: 16 Eylül 2026. Araştırma ve tasarım değerlendirmesidir; uygulama değişikliği değildir.

## Kapsam: envanter ile inceleme farklıdır

- [Resmî Global English XML site haritasındaki](https://www.deloitte.com/global/sitemaps/secured/sitemap_global_en.xml) **4.665 farklı URL'nin tamamı** envantere alındı. Bu adreslerin tamamı tek tek açılmış, okunmuş veya görsel olarak test edilmiş değildir.
- **74 farklı sayfa/ekran açılıp incelendi:** 72 Global İngilizce hedef ve Global gezinmeden ulaşılan 2 US İngilizce hedef. Buna bir arama sonuç ekranı dahildir. İzleme parametreleri, filtre değişiklikleri ve tekrar açılışlar sayıyı artırmaz. Bazı dinamik sayfalar yalnızca sınırlı metin verdi; aşağıdaki kayıtlarda belirtilmiştir.
- Ana menünün **18/18 hizmet** ve **6/6 ana sektör** girişleri kapsandı. Kurumsal, yayın, araştırma, uzman, vaka, kariyer, iletişim, ittifak, etkinlik ve ofis sayfa türleri ayrıca incelendi.
- Dokuz hedef tarayıcıda açıldı: Global ana sayfa, What We Do, About, Together makes progress, Audit, Job Search, Gen Z 2026, Insights ve arama. About için DOM yapısı; diğerlerinde ekran görüntüsü ve ilgili etkileşimler incelendi. Bu, dokuz sayfanın bütün etkileşimlerinin test edildiği anlamına gelmez.
- Masaüstü Chrome kullanıldı. Mobil, erişilebilirlik denetimi, performans ölçümü, bütün PDF'ler, ülke siteleri ve başvuru/form gönderimleri bu incelemeye dahil değildir.

Kayıtlar: [URL envanteri](DELOITTE_GLOBAL_URL_INVENTORY.txt), [41 sayfalık hizmet/sektör incelemesi](DELOITTE_GLOBAL_SERVICES_REVIEW.md), [33 sayfalık kurumsal/yayın/kariyer incelemesi](DELOITTE_GLOBAL_EDITORIAL_REVIEW.md). İki rapor ana sayfa ve iletişim sayfasında kesişir: 41 + 33 − 2 = 72. Bu rapordaki Together makes progress ve arama ekranı eklenince 74 olur.

## Ana çıkarım

Deloitte'un güçlü tarafı, çok büyük içerik havuzunu kullanıcının sıradaki kararına göre bölmesi. Ana gezinme kurumsal bilgi, yapılan işler, düşünce/yayınlar ve kariyeri ayırıyor. İçerik ayrıntısı alt sayfalarda derinleşiyor. Boraden için çıkarımım: önce hangi soruyu cevapladığımızı netleştirmek, sonra o soruya uygun görsel ve hareket seçmek. [Global ana sayfa](https://www.deloitte.com/global/en.html), [What We Do](https://www.deloitte.com/global/en/what-we-do.html).

## Tarayıcıda doğrulanan tasarım ve hareket

### Ana sayfa ve yayın vitrini

Global açılışta siyah zemin, belirgin bir başlık, kısa açıklama ve tek ana eylem var. Aşağı kaydırıldığında video alanı alttan görünür hale geliyor. Yayın, çalışma örnekleri ve kariyer bölümleri farklı renkli başlık şeritleriyle ayrılıyor; kaydırma sırasında bölüm şeridi üstte kalabiliyor. İncelenen genişlikte menü dört ana dalı olan bir panel olarak açılıyor.

Yayın vitrini dört beyaz kart gösteriyor: başlık, kısa özet, varsa tür ve konuya özgü görsel. Çalışma örnekleri ise aynı kart dizilimini tekrarlamıyor; büyük bir anlatı, yana taşan sonraki içerik, oklar ve sıra göstergesi kullanıyor. Sonraki öğeye geçiş tıklanarak doğrulandı. Bazı metinler üç noktayla kısalıyor; bunu Boraden'de okunabilirlik pahasına kopyalamak gerekmiyor. [Kaynak](https://www.deloitte.com/global/en.html).

### Kullanıcının gönderdiği sabit görsel–kayan panel

Ekran görüntülerinin kaynağı [Together makes progress](https://www.deloitte.com/global/en/about/story/together-makes-progress.html). Partnerships ve Ecosystems bölümleri ardışık kaydırmalarla karşılaştırıldı:

1. Büyük fotoğraf sahnesi ekrana yerleşiyor.
2. Sağdaki beyaz içerik paneli yukarı ilerlerken fotoğraf belirli bir aralıkta sabit kalıyor.
3. Sonraki sahne farklı fotoğrafı ve kendi paneliyle alttan geliyor.
4. Sağdaki bölüm göstergesinin aktif noktası ilerliyor.

Bu bir video ilerletme efekti olarak doğrulanmadı; gözlenen şey fotoğraf sahnesi ile metnin farklı kaydırma davranışı. Aynı sayfanın sonunda dört vaka kartı bulunuyor. Boraden önerisi: bu hareketi seçili iki veya üç anlatıda kullanmak; her sahneye ayrı anlam ve görsel vermek. Bütün ana sayfayı uzun bir sabit sahne zincirine çevirmemek.

### Hizmet detayları

[Audit](https://www.deloitte.com/global/en/services/audit-assurance-overview/services/audit.html) açılışı siyah zemin, solda kapsam/iletişim, sağda üç boyut hissi veren soyut bir görsel içeriyor. Alttaki açıklama açık zemine geçiyor. External Audit öğesi tıklandığında sayfayı karartan bir katman üzerinde kısa açıklama penceresi açıldı. İlgili yayınlar ve isimli uzman iletişimi ayrı bölümler.

Boraden için: kısa ek açıklamada açılır bölüm kullanılabilir; asıl hizmet içeriği paylaşılabilir kendi adresinde kalmalı. Hizmet sayfası, yalnızca büyük başlık ve uzun paragraf olmamalı: ihtiyaç, kapsam, çalışma adımları, çıktı, ilgili yazı ve sorumlu kişi bir arada tasarlanmalı.

### Araştırma ve yayın merkezi

[Gen Z 2026](https://www.deloitte.com/global/en/issues/work/genz-millennial-survey.html) konuya özgü hero, belirgin PDF indirme, kısa tema bölümleri, farklı görseller, kişi atıflı alıntı, uzman ve eski rapor bağlantıları kullanıyor. Bölüm gezinmesi uzun içeriği erişilebilir kılıyor. PDF içeriği bu turda okunmadı.

[Deloitte Insights](https://www.deloitte.com/global/en/insights.html) ana kurumsal siteden farklı, dergi düzeninde: güçlü başlıklar, farklı ağırlıkta görseller, yan içerik kolonu, konu ve tür ayrımları. Bu yoğun yayın düzenini Boraden ana sayfasına taşımak yerine ayrı yayın merkezine uyarlamak daha uygun.

### Arama ve kariyer

Ana sayfanın aramasına `audit` girildi. [Sonuç ekranı](https://www.deloitte.com/global/en/search-results.html?qr=audit) görsel, başlık, tür, tarih ve özet gösterdi. Profiles filtresi seçildiğinde sonuçlar kişi profillerine dönüştü; iletişim bağlantıları görünüyordu. Arama, dekoratif ikon olmanın ötesinde ayrı bir keşif yolu.

[Job Search](https://www.deloitte.com/global/en/careers/job-search.html) ülke seçimiyle çalışıyor. Turkey (English) seçimi yeni sekmede `https://jobs2.deloitte.com/tr/en` adresini açtı; bu oturumda hedef **DNS_PROBE_FINISHED_NXDOMAIN** verdi. Yönlendirme doğrulandı, çalışan ilan/başvuru akışı doğrulanmadı. Bu nedenle bütün Deloitte akışlarını kusursuz kabul etmiyoruz.

## Boraden için tasarım önerisi

Bu maddeler öneridir; bu araştırma sırasında uygulanmadı. Mevcut Boraden içerikleri ve kullanıcının tercihleri korunacak.

| Alan | Önerilen düzen | Kullanıcıya yararı |
| --- | --- | --- |
| Navigasyon | Siyah header ve ortadaki Boraden logosunu koru; Kurumsal, Hizmetler, Yayınlar, Bilgi Merkezi ve Kariyer girişlerini açık ayır. İletişim ve arama kolay erişilir olsun. | İhtiyacı olan bölümü tahmin etmek zorunda kalmaz. |
| Açılış | Mevcut sessiz insan filmi; ardından kısa Boraden tanımı. Filmden açık zemine kontrollü yukarı geçiş. | Marka ile firmanın yaptığı iş arasında anlam bağlantısı kurar. |
| Yayın vitrini | Ortalı bölüm başlığı altında masaüstünde 3–4 kompakt kart. Kısa başlık, gerçek tarih/tür, özgün kapak; tüm yayınlara tek çıkış. | Bir ekranda seçenekleri karşılaştırır. Haftalık içerik ana sayfayı uzatmaz. |
| Uzmanlık | Seçili 2–3 konuda farklı görselli, sabit sahne ve kayan kısa panel. Detaylara açık bağlantı. Puzzle kullanılmaz. | Hareket hizmeti anlatır; genel bir gösteriye dönüşmez. |
| Hizmet sayfası | İhtiyaç → kapsam → süreç/çıktı → ilgili içerik → sorumlu uzman. | Ne sunulduğunu ve kime ulaşacağını bilir. |
| Bilgi Merkezi | Hesaplama araçları, mevzuat ve sirküler kendi merkezinde; ana sayfada küçük giriş alanı. | Kullanışlı araçlar bulunur, kurumsal anlatı bölünmez. |
| Perspektifler | Renkli portre, kaynak ve özgün yorum ayrımı; konuyla ilgili hizmet bağlantısı. Ana sayfada az sayıda seçki, devamı arşivde. | Sözü görüp arkasındaki düşünceye ve ilgili uzmanlığa ulaşır. |
| Kariyer | Alt bölümde özgün görsel ve kısa davet; ayrı sayfada pozisyonlar ve genel başvuru. | İş başvurusu genel iletişimden ayrılır. |

Ana sayfa için önerilen sıra: **film → Boraden kim → seçili yayınlar → kısa uzmanlık anlatısı → perspektifler → küçük Bilgi Merkezi girişi → kariyer/kapanış**. Dünya animasyonu korunacaksa kapanış anlatısıyla birleştirilmeli; araya yeni uzun bölüm eklenmemeli. Sıra kullanıcı kararıyla kesinleşir.

Boraden'e özgü görsel fikir: logonun üç renkli işaretini ayrı birer servis rengine kilitlemek yerine, sahneler arasında ince bir renk geçişi olarak kullanmak. Fotoğrafın tamamını renge boğmadan kenar, odak çizgisi veya kart vurgusu aydınlanabilir. Aynı hover dili klavye odağında da görünmeli; hareket azaltma tercihinde sahneler normal belge akışına dönmeli.

## İçerik ve Wagtail için sonuç

- Hizmet, sektör, uzman, yayın, belge ve kariyer kayıtları birbirine ilişkilendirilmeli. Bir yayın ana sayfa, ilgili hizmet ve yayın arşivinde aynı kayıttan gösterilebilir. Bu bir içerik modeli önerisidir; backend'in çalıştığına dair iddia değildir.
- Yayın tarihi, güncelleme tarihi ve araştırmanın veri dönemi farklı anlamlara gelir. Her kayda aynı tarih veya varsayılan okuma süresi yazılmamalı. Kaynağı belirsiz sözlerde tarih uydurulmamalı; özet doğrudan alıntı gibi sunulmamalı.
- Boraden'in hizmet sorumluları, fotoğrafları ve iletişim bilgileri müşteriden doğrulandığında yayınlanmalı. Tasarımda boş kart hazırlanabilir; canlı sitede eksik kişi kartı gizlenmeli.
- Kariyer formunun Wagtail kaydı ve atanmış kişiye e-posta iletimi ayrıca geliştirilip test edilmeli; sadece form tasarımı bu işlevleri sağlamaz.
- Deloitte'un müşterileri, başarıları, ölçeği, araştırmaları veya partner logoları Boraden'in kendi referansları olarak kullanılamaz. İçerik sahipliği görünür kalmalı.

## Sınırlar ve sıradaki kontrol

4.665 URL'nin tamamı için içerik, kırık bağlantı, görsel ve mobil kontrolü **tamamlanmış değildir**. Mevcut inceleme bütün ana hizmet/sektör girişlerini ve önemli sayfa türlerini kapsar. Events, Offices, bazı yayın filtreleri ve basın listelerinde metin çıkarımı sınırlıydı; Technology Management için web aracı erişim hatası verdi. Araç hatası sunucunun kesin 404 verdiği anlamına gelmez. Kaynakların bazıları önbellekliydi; kişi/unvan ve mevzuat verileri yayın öncesi yeniden doğrulanmalıdır.

Boraden'de sonraki uygulamanın kabul ölçütü: ana sayfadan hizmete, ilgili yayına, hesaplama aracına ve kariyere açık yollar; okunabilir kartlar; birbirini örten işaretçi olmaması; her sahnede konuya uygun görsel; gerçek metadata; mobil ve azaltılmış hareket kontrolü. Bu turda uygulama kodu, video veya paket değiştirilmedi; Gemini API çağrısı, commit ve push yapılmadı.
