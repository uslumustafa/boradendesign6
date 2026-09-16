# Boraden — yapılacaklar

16 Eylül 2026. Kaynak: kullanıcı kararları, toplantı notları ve `SESSION_NOTES_2026-09-16.md`. Bu liste yeni bir şirket bilgisi veya mevzuat doğrulaması değildir.

## Son karar — dünya ve Orbis

- [x] Uzun uzaklaşma/yakınlaşma döngüsü kaldırıldı; dünya sabit mesafede, beklemeden yavaşça dönüyor.
- [x] Türkiye’den yedi kıtaya temsili hatlar ve ayrıca Türkiye → İngiltere yönlü Orbis bağlantısı eklendi. Orbis İngiltere üzerinde yazıyor; kesin şehir/ofis adresi belirtilmedi.
- [x] Hareketi durdurma, Türkiye’ye dönüş, klavye, görünürlük ve azaltılmış hareket davranışları korundu.
- [ ] Kullanıcı Orbis’in tam web adresini sağlayacak. Sonrasında etiket ve metin bağlantısı gerçek siteye yönlendirilecek; şimdilik sahte bağlantı yok.

## 1. Sıradaki tasarım turu

- [ ] Blog vitrinini aynı ekranda 3–4 yayını keşfettiren kompakt premium kartlarla düzenle: kısa özet, özgün kapak, doğrulanmış tarih. Sahte sabit tarih/okuma süresi kullanma.
- [ ] Sabit görsel/kayan metin anlatısında denetim, kuruluş/değerleme ve insan/bordro için ayrı sahneler kullan. Tek görsel bütün bölümlerde tekrarlanmasın; mobilde normal akış.
- [ ] Ana sayfa sırasını kısa tut: film → Boraden kim → yayınlar; diğer uzmanlık, perspektif, araç, dünya ve kariyer girişlerinin sırasını birlikte netleştir. Ayrıntıları alt sayfalara taşı.
- [ ] Hizmet/yayın detaylarında kısa giriş, kapsam, süreç, çıktı ve ilgili içerik hiyerarşisini güçlendir. Düz uzun metin yerine işe yarayan görsel düzen kullan.
- [ ] Her değişiklikte masaüstü/mobil gerçek tarayıcı kontrolü: okunurluk, taşma, imleç/focus, menü, çakışan işaretçiler, motion ve çalışan bağlantılar.

## 2. Müşteriden içerik ve onay

- [x] Ana sayfa tanıtımı ve Hakkımızda, legacy kaynaklar ve mevcut hizmet verileriyle genişletildi; hukuki danışmanlık/sözleşme/tahsilat kapsamı kullanıcı tarafından onaylandı. Kaynak ve farklar: `research/ABOUT_CONTENT_REVIEW.md`.
- [ ] Çözüm Prosedürleri hizmet detayını onaylanan hukuki kapsamla uzlaştır; yanlış eşleşmiş tarihsel metinleri temizle.

- [ ] “Kimiz, neyi niçin yapıyoruz?” metninin şirket özelindeki iddialarını onaylat.
- [ ] Her hizmet için sorumlu kişinin ad/soyad, görev, fotoğraf, e-posta ve telefonunu al; mevcut `data/service-contacts.json` alanlarını doldur.
- [ ] Ekibimiz alanı şimdilik boş; yayımlanması/kaldırılması müşteri kararına bağlı.
- [ ] Mevcut üç zorunlu hizmetin kapsam/metin onayı: Şirket Değerlemesi, Şirket Kuruluş Danışmanlığı, İnsan Kaynakları ve Bordro Hizmetleri.
- [ ] Sidebar’ın hangi sayfalarda görüneceğini netleştir; toplantı notunun belirsiz kısmını varsayma.
- [ ] Gerçek haftalık yayınları ve duyuruları editör onayıyla ekle. Perspektiflerin kaynak, portre lisansı ve ilgili hizmet bağlantılarını koru.

## 3. Bilgi Merkezi ve hesaplamalar

- [x] Binek otomobili amortisman ön hesabı ile gelir vergisi, KDV ve brüt/net araçları için girişler mevcut.
- [ ] Yayın öncesi yıllık parametreleri resmî kaynaklarla tekrar doğrula; kapsam, istisnalar ve hesap sınırlarını muhasebe uzmanıyla kontrol et.
- [ ] Sıfır/ikinci el binek araç senaryolarının kapsadığı durumları açıklaştır; eksik senaryoları onaylı kurallarla tamamla.
- [ ] Resmî Gazete, özelgeler ve sirkülerleri Bilgi Merkezi altında arama/filtrelerle düzenle. Özelge veri tabanı henüz kurulmadı.
- [ ] 7326/matrah artırımı materyalini tarihsel arşiv olarak tut; yürürlükte yeni başvuru imkânı varmış gibi sunma.

## 4. Wagtail — sonraki backend aşaması

- [ ] Hizmetler, uzmanlar, blog/haber, perspektifler, sirküler, kariyer ve Orbis bağlantısını editörden yönetilecek alanlara bağla.
- [ ] Haftalık yayınlar: gerçek yayın/güncelleme tarihi, taslak/onay/yayın akışı, kapak ve ilgili hizmet ilişkileri.
- [ ] Kariyer başvurularını Wagtail’e kaydet ve atanmış sorumluya e-posta gönder; dosya kabulü, erişim izinleri, KVKK/saklama ve teslim hatalarını doğrula. Şu an canlı gönderim yok.
- [ ] Formlar, arama ve medya yönetimini gerçek backend’e bağla; prototip davranışlarını canlı işlev gibi gösterme.

## 5. Yayına hazırlık

- [ ] Gerçek domain/canonical, sitemap/robots, yapılandırılmış veri ve paylaşım kartlarını doğrula. Önizlemenin noindex durumu bilinçli; canlı için ayrıca ayarlanacak.
- [ ] Kırık linkler, erişilebilirlik, mobil performans, video/görsel boyutları ve gerçek cihaz kontrolleri.
- [ ] Müşteri onayı ve geri dönüş noktasıyla yayınla. “Tam SEO uyumlu” veya “backend tamam” ifadelerini test edilmeden kullanma.

## Korunacaklar

Siyah ve ortalanmış logolu header, konuşmasız/sessiz 15 saniyelik film, ortalı marka kapanışı, logo renkleri, kısa kurumsal dil, renkli kaynaklı perspektifler ve kariyer daveti korunur. Puzzle tasarımı ile dünya zoom turu terk edildi. Deloitte bir içerik keşfi/etkileşim referansıdır; metinleri veya tasarımı kopyalanmaz. Framework göçü ya da yeni paket bu listenin gereği değildir.
