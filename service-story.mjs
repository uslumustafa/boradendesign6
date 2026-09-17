import {esc} from './render.mjs';

export function serviceStory(D){
  const group=id=>{const g=D.groups.find(g=>g.id===id);return g?{label:g.name,url:`/hizmetler/alan/${g.id}/`}:null;};
  const service=id=>{const s=D.services.find(s=>s.id===id);return s?{label:s.title,url:`/hizmetler/${s.id}/`}:null;};
  const chapters=[
    {label:'DENETİM & VERGİ',title:'Denetim, vergi ve muhasebe.',text:'Bağımsız denetim, finansal raporlama, vergi ve mali müşavirlik hizmetleri.',links:[group('denetim'),group('vergi')]},
    {label:'KURULUŞ & DEĞERLEME',title:'Şirket kuruluşu ve değerleme.',text:'Şirket kuruluş danışmanlığı, şirket değerlemesi ve kurumsal danışmanlık.',links:[service('sirket-kurulus-danismanligi'),service('sirket-degerlemesi'),group('danismanlik')]},
    {label:'İNSAN & SİSTEMLER',title:'İnsan kaynakları ve iş süreçleri.',text:'İnsan kaynakları, bordro, iş zekâsı ve kurumsal eğitim.',links:[group('insan'),group('sistem'),group('akademi')]}
  ];
  return `<section class="service-story" id="ihtiyaciniz" aria-labelledby="needs-title">
    <header class="service-story-heading"><div><p class="eyebrow">BORADEN / UZMANLIK</p><h2 id="needs-title">Hizmetler ve <em>çalışma alanları.</em></h2></div><a href="/hizmetler/">Tüm hizmetler <span aria-hidden="true">↗</span></a></header>
    <div class="service-story-stage">
      <figure class="service-story-visual"><img src="/assets/brand/boraden-perspectives-v1.webp" width="1672" height="941" loading="lazy" decoding="async" alt="Boraden’in mavi, turuncu ve yeşil renkleriyle mimari kompozisyon"><figcaption><small>Boraden / Farklı uzmanlıklar.</small></figcaption></figure>
      <div class="service-story-chapters">${chapters.map((c,i)=>`<article class="service-story-chapter" data-story-chapter="${i+1}"><p class="eyebrow"><span>0${i+1}</span> ${esc(c.label)}</p><h3>${esc(c.title)}</h3><p class="service-story-description">${esc(c.text)}</p><nav aria-label="${esc(c.label)} hizmetleri">${c.links.filter(Boolean).map(l=>`<a href="${esc(l.url)}">${esc(l.label)}<span aria-hidden="true">↗</span></a>`).join('')}</nav></article>`).join('')}</div>
    </div>
  </section>`;
}
