import {esc} from './render.mjs';

export function serviceStory(D){
  const group=id=>{const g=D.groups.find(g=>g.id===id);return g?{label:g.name,url:`/hizmetler/alan/${g.id}/`}:null;};
  const service=id=>{const s=D.services.find(s=>s.id===id);return s?{label:s.title,url:`/hizmetler/${s.id}/`}:null;};
  const chapters=[
    {label:'DENETİM & VERGİ',title:'Kararlarınızın temeli, güven.',text:'Finansal tablolarınızı, vergi ve muhasebe süreçlerinizi birlikte değerlendirin. İhtiyacınız olan uzmanlığı seçin.',links:[group('denetim'),group('vergi')]},
    {label:'KURULUŞ & DEĞERLEME',title:'Bir sonraki adımı netleştirin.',text:'Bir şirket kurarken ya da değerini anlamaya çalışırken, doğru sorulardan başlayın. Çalışma kapsamını kendi ihtiyacınız üzerinden keşfedin.',links:[service('sirket-kurulus-danismanligi'),service('sirket-degerlemesi'),group('danismanlik')]},
    {label:'İNSAN & SİSTEMLER',title:'İşiniz, birlikte ilerlesin.',text:'İnsan kaynaklarından veri akışına, kurumsal öğrenmeden yönetim raporlamasına: işleyişinizi destekleyen alanları bir arada keşfedin.',links:[group('insan'),group('sistem'),group('akademi')]}
  ];
  return `<section class="service-story" id="ihtiyaciniz" aria-labelledby="needs-title">
    <header class="service-story-heading"><div><p class="eyebrow">BORADEN / UZMANLIK</p><h2 id="needs-title">İşinize yakından.<br><em>Geleceğinize birlikte.</em></h2></div><a href="/hizmetler/">Tüm hizmetleri keşfedin <span aria-hidden="true">↗</span></a></header>
    <div class="service-story-stage">
      <figure class="service-story-visual"><img src="/assets/services/bagimsiz-denetim.jpg" width="1672" height="941" loading="lazy" decoding="async" alt="Denetim dosyaları üzerinde birlikte çalışan profesyonelleri gösteren temsili sahne"><figcaption>Bağımsız bakış.<br><em>Ortak akıl.</em><small>Temsili görsel.</small></figcaption></figure>
      <div class="service-story-chapters">${chapters.map((c,i)=>`<article class="service-story-chapter" data-story-chapter="${i+1}"><p class="eyebrow"><span>0${i+1}</span> ${esc(c.label)}</p><h3>${esc(c.title)}</h3><p class="service-story-description">${esc(c.text)}</p><nav aria-label="${esc(c.label)} hizmetleri">${c.links.filter(Boolean).map(l=>`<a href="${esc(l.url)}">${esc(l.label)}<span aria-hidden="true">↗</span></a>`).join('')}</nav></article>`).join('')}</div>
    </div>
  </section>`;
}
