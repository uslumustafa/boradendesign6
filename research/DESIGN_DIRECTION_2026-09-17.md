# 17 Eylül 2026 — menü, tipografi ve renk kararı

## Kullanıcının son kararı

Hizmet menüsündeki kalabalık tablo hissi azaltılacak; kullanıcı alanı tıklayıp alt hizmetlerini açacak. El yazısına benzeyen vurgular sadeleşecek. Site canlı olacak, ana sayfa uzamayacak. Kullanıcının beğendiği tek toplantı fotoğrafı üzerinde kayan üç açık renkli hizmet kartı korunacak.

## Gerçek inceleme kapsamı

İki bağımsız araştırma ajanı kullanıldı. Aşağıdakiler seçili sayfa ve etkileşim incelemeleridir; bütün sitelerin veya bütün projelerin incelendiği iddia edilmez.

| Kaynak | Gözlenen yaklaşım | Boraden kararı |
| --- | --- | --- |
| [Populous](https://populous.com/) ve [Locomotive vaka çalışması](https://locomotive.ca/en/work/populous) | Tarayıcıda tıklanarak açılan belirgin menü, birincil/ikincil bağlantı ayrımı; Escape ve odağın geri dönüşü kontrol edildi. | Önce altı alan, tıklanınca yalnız seçilen alanın alt hizmetleri. Geri dönüş, dış tıklama ve Escape korunuyor. |
| [Studio Dumbar](https://studiodumbar.com/) ve [hizmetleri](https://studiodumbar.com/services) | Ana sayfada baskın hareketli görsel; hizmetlerde yalın sans tipografi ve güçlü kontrast. Seçili ekranlar tarayıcıda incelendi. | Filmi korumak, onunla yarışan yeni hareketli katmanlar eklememek; yazıda tek aile kullanmak. |
| [Locomotive](https://locomotive.ca/en) | Kaydırma sırasında belirgin görselden açık yüzeye geçiş; doğrudan proje bağlantıları. | Mevcut film → açık tanıtım geçişini ve doğrudan hizmet bağlantılarını korumak. |
| [Deloitte Global](https://www.deloitte.com/global/en.html) ve [Türkiye](https://www.deloitte.com/tr/tr.html) | Ana sayfalar ve Global hizmet menüsü tarayıcıda incelendi: yalın yazı, kısa içerik, belirgin bağlantılar. | İçerik miktarını artırmadan daha okunur menü ve başlık hiyerarşisi. |
| [Pentagram / Sustainability Solutions Group](https://www.pentagram.com/work/sustainability-solutions-group) | Vaka çalışmasında güçlü renk yüzeyleri ve yalın tipografi; seçili renk uygulamaları tarayıcıda incelendi. | Perspektiflerde Boraden mavisi, beyaz yazı; blog ve araçlarda üç marka renginden kontrollü vurgu. |
| [Pentagram / PayPal](https://www.pentagram.com/work/paypal) | Resmî vaka metni: sade sans kimlik, ürün eylemlerinden türeyen hareket ve mavi vurgu. | Hareketi tıklama, açılma, geri dönüş ve odak eylemlerine bağlamak. |
| [Pentagram / Droit](https://www.pentagram.com/work/droit) | Resmî finans/mevzuat teknolojisi kimlik çalışmasında keskin sans tipografi ve açıklık. | Finansal içeriği süslü harflerden arındırmak; kaynak ve kapsam metinlerini okunur bırakmak. |

Hızlar, ölçüler ve renk yerleşimleri Boraden için verilen tasarım kararlarıdır; referanslardan ölçülmüş değerler olarak sunulmaz. Başka markaların tasarım, görsel veya içerikleri kopyalanmadı.

## Uygulananlar

- Ortak hizmet menüsü: kapalı başlayan altı alan; tek tıklamayla detay, içeriğe göre yükseklik, 240 ms yükseklik ve 220 ms içerik geçişi. 47 hizmet gerçek bağlantı olarak sunuluyor. Küçük ekranda mevcut mobil menü korunuyor; 1100 px altında devreye giriyor.
- Başlıklar, perspektif metinleri, hizmet numaraları, kariyer ve iç sayfa/footer vurgularında Manrope. El yazısı hissi veren Instrument kullanımları kaldırıldı; mevcut font dosyaları kullanılıyor.
- Perspektifler düz Boraden mavisi üzerinde beyaz metin ve renkli portrelerle gösteriliyor. Blog kartları ve bilgi araçlarında üç marka rengi daha belirgin. Yeni görsel veya bölüm eklenmedi.
- Mobil perspektif portresi ve boşlukları küçültüldü. 390×844 görünümde bölüm 1296 px'den 1127 px'e indi; kaynak/atıf metinleri duruyor.

## Kontrol

`npm run build`, `npm test`, `node --test service-menu.test.mjs human-opening.test.mjs experience.test.mjs editorial.test.mjs header-motion.test.mjs` başarılı. 107 sayfa üretildi. Menü için boyut geçişi, tek alanın açık kalması, erişilebilir adlar, yeniden açılma ve hareket azaltma kontrolü eklendi.

Gerçek tarayıcı: altı alanın tamamı, toplam 47 alt hizmet, geri dönüş, Enter, Escape/odak, dış tıklama, 390 px mobil menü ve iç hizmet sayfası, 1120 px navbar sınırı, blog/perspektif görünümü kontrol edildi. 1120×640 kısa ekranda 15 hizmet içeren İnsan Kaynakları listesinin son bağlantısına panel içinden kaydırılarak erişildi. İncelenen ekranlarda yatay taşma yok. Hareket azaltma davranışı çalıştırılabilir testle doğrulandı; işletim sistemi tercihi değiştirilmedi.

Önceki hâl private `uslumustafa/boradendesign6` reposunun `main` dalına `b0273fc` olarak pushlandı. Bu dosyada anlatılan sonraki düzenlemeler yerel çalışma ağacındadır. Wagtail backend ve canlı yayın bu tasarım turuna dahil değildir.
