# Tasarım ve içerik doğruluğu — 17 Eylül 2026

## Bu incelemenin kapsamı

Bağımsız, salt okunur denetim: mevcut `DESIGN_DIRECTION_2026-09-17.md`, `SERVICE_SECTOR_REVIEW_2026-09-17.md`, `ABOUT_CONTENT_REVIEW.md`; sektör, Hakkımızda, kariyer, perspektif ve kurum akışı şablonları/verileri; kullanıcının üç ekran görüntüsü. Eski Boraden'in üç resmî sayfası yeniden açıldı. Bu rapor her URL'nin tarayıcıda tek tek incelendiği anlamına gelmez; ana çalışmanın rota/ekran kontrolünden ayrıdır. Uygulama dosyası değiştirilmedi.

## İçerik kararı

- [Eski Sektörler sayfası](https://boraden.com.tr/sektor-raporlari) yalnız **Sektör Birincileri**, **En Kârlı Şirketler**, **Sermaye Yapısına Göre İlk 1.000 İhracatçı Firma** başlıklarını içeriyor. Altı iş modeli kategorisi prototipte oluşturulmuş. Bunlara açıklama eklemek, kullanıcının bu kategorileri kaldırma beklentisini karşılamıyor.
- `/sektorler/` üç tarihsel rapordan oluşmalı. Doğrulanmış 2017 etiketleri korunmalı; bilinmeyen yıl uydurulmamalı. Eski alt URL'ler, yeni sektör iddiası kurmadan ilgili gerçek hizmetlere yönlendiren küçük uyumluluk sayfaları olabilir. Ana menü ve kartlar altı kategoriyi yeniden öne çıkarmamalı.
- [Biz Kimiz](https://boraden.com.tr/biz-kimiz) 1993'ü temellerin atıldığı yıl olarak anlatıyor. Mevcut Hakkımızda veri modeli denetim, YMM, muhasebe, mali/hukuki/yönetim danışmanlığı, insan kaynakları, sistemler ve eğitim kapsamını içeriyor; eski personel sayısını taşımaması doğru. Hukuki kapsam kullanıcı tarafından ayrıca onaylanmış.
- [Kariyer](https://boraden.com.tr/kariyer) ayrı bir kurumsal sayfa. Yeni sayfanın önizleme formu devre dışı ve açık iş ilanı olmadığı açık. Wagtail kayıt/e-posta gönderimi henüz tamamlanmış gibi sunulmamalı; gerçek ekip/pozisyon verisi bulunmadan çalışan veya boş kadro uydurulmamalı.
- `cozum-prosedurleri` veri kaydında eski anket yüzdeleri ve genel prosedür kapsamı arasında eşleşme sorunu sürüyor. Önceki Hakkımızda raporu da bunu işaretliyor. Tarihsiz anket bir güncel şirket kanıtı olarak kullanılmamalı; ayrı içerik düzeltmesi gerekir.

## Tek tasarım sistemi önerisi

- Siyah navbar ve açılış filmi kalsın. İçerik sayfaları için nötr kırık beyaz `#f7f7f4`, beyaz yüzeyler, ana metin `#202a30`, yardımcı metin `#59666d`, ince gri sınır. Marka mavi/turuncu/yeşili geniş blok zemini yerine çizgi, ikon ve eylemde kullanılsın.
- Perspektiflerde geniş düz mavi bölüm yerine açık zemin, beyaz okuma paneli ve renkli portre. Kaynak tarihi, editoryal özet etiketi ve kişi/marka ilişkisi bulunmadığı bilgisi korunsun. Tek kontrastlı mavi eylem yeterli.
- **Bilgi Merkezi** gerçek ana başlık olsun: ortalı 48–60 px masaüstü başlık, altında kısa açıklama, ardından eşit genişlikte üç büyük kart. Kartlar ~280–320 px yüksek; küçük başlık/sol kolon düzeni terk edilsin. Mobil tek kolon.
- Kurum şeridi Bilgi Merkezi'nin hemen ardından kalmalı. `Resmî Gazete` veri kaydında logo hiç yok (`logo: null`), nötr gazete SVG'si var. Görünür okunur simge ve tam ad kullanılmalı; resmî logo bulunduğu iddia edilmemeli. Sekiz bağlantı, durdurma/odak ve hareket azaltma davranışı korunmalı.
- Hakkımızda açık zeminde kurum adı, 1993 ve altı gerçek hizmet ailesiyle güçlüdür; yeni slogan eklemek yerine hiyerarşi düzeltmek yeterli. Kariyerde beyaz form paneli, tutarlı başlık ölçeği, açıklayıcı durum mesajı; sahte insan fotoğrafı eklemeye gerek yok.
- Aynı font ailesi ve başlık ölçeği, 160–240 ms küçük eylem geçişleri ve aynı kart sınırı tüm sayfa türlerinde tutarlılık sağlar. Jost sektörlerde zaten varsa çok ince ağırlıklardan kaçınılmalı; gövde metni 400, kart başlığı 500, yardımcı bilgi en az 14–16 px.

## Öncelik

1. Kullanıcının reddettiği altı sektör kartını kaldır; koyu temayı açık nötre geçir.
2. Bilgi Merkezi boyutlandırmasını ve perspektif zeminini düzelt; Resmî Gazete simgesini görünür kıl.
3. Tüm rota envanterinde kayıp bağlantı/görsel, taşma, başlık hiyerarşisi ve aynı tasarım değişkenlerini kontrol et; her sayfanın canlı görsel incelemesini yapmadan 'hepsi görüldü' deme.
