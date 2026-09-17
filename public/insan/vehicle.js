// Acquisition-year limits stay fixed throughout that vehicle's schedule.
// Source: GİB 2026 Serbest Meslek Kazancı guide p.9; method: Binek Oto guide p.14–16.
export const VEHICLE_LIMITS=Object.freeze({2026:Object.freeze({net:1380000,gross:2600000})});
export function vehicleSchedule({cost,month,kind,year=2026}){
 cost=Number(cost);month=Number(month);
 if(!Number.isFinite(cost)||cost<=0||cost>1e10)throw new Error('0’dan büyük, en fazla 10 milyar TL tutarında bir maliyet girin.');
 if(!Number.isInteger(month)||month<1||month>12)throw new Error('Geçerli bir ay seçin.');
 if(!['new-net','new-gross','used'].includes(kind))throw new Error('Geçerli bir maliyet türü seçin.');
 if(!Object.hasOwn(VEHICLE_LIMITS,year))throw new Error('Bu alış yılı için doğrulanmış sınır bulunmuyor.');
 year=Number(year);
 const limit=VEHICLE_LIMITS[year][kind==='new-net'?'net':'gross'];
 const total=Math.round(cost*100),eligible=Math.min(total,limit*100);
 const annual=Math.round(total/5),annualEligible=Math.round(eligible/5);
 let bookUsed=0,eligibleUsed=0;
 const rows=Array.from({length:5},(_,i)=>{
  const book=i===4?total-bookUsed:i===0?Math.round(annual*(13-month)/12):annual;
  const deductible=i===4?eligible-eligibleUsed:i===0?Math.round(annualEligible*(13-month)/12):annualEligible;
  bookUsed+=book;eligibleUsed+=deductible;
  return {year:year+i,book:book/100,deductible:deductible/100,disallowed:(book-deductible)/100};
 });
 return {limit,cost:total/100,eligible:eligible/100,rows};
}
const form=typeof document==='undefined'?null:document.querySelector('#vehicle-form');
if(form){
 const reveal=()=>{if(location.hash==='#arac-amortisman')form.closest('details').open=true;};
 reveal();
 window.addEventListener('hashchange',reveal);
 const result=document.querySelector('.vehicle-result'),error=document.querySelector('.vehicle-error');
 const money=n=>n.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})+' TL';
 form.addEventListener('submit',e=>{
  e.preventDefault();error.textContent='';
  try{
   const r=vehicleSchedule({cost:form.elements.cost.value,month:form.elements.month.value,kind:form.elements.kind.value});
   result.innerHTML='<div class="vehicle-totals"><div><small>2026 ALIŞ YILI SINIRI</small><strong>'+money(r.limit)+'</strong></div><div><small>GİDERLEŞTİRİLEBİLİR AMORTİSMAN MATRAHI</small><strong>'+money(r.eligible)+'</strong></div></div><div class="vehicle-table" tabindex="0" role="region" aria-label="Amortisman tablosu"><table><caption>2026 alışı için normal amortisman planı</caption><thead><tr><th scope="col">Yıl</th><th scope="col">Amortisman</th><th scope="col">Gider kabul edilen</th><th scope="col">KKEG</th></tr></thead><tbody>'+r.rows.map(row=>'<tr><th scope="row">'+row.year+'</th><td>'+money(row.book)+'</td><td>'+money(row.deductible)+'</td><td>'+money(row.disallowed)+'</td></tr>').join('')+'</tbody></table></div><p>KKEG: Kanunen kabul edilmeyen gider. İlk yıl ay kesri tam ay sayılır; kalan ilk yıl payı son yılda tamamlanır. Alış yılı sınırı sonraki yıllarda yükseltilmez.</p>';
  }catch(err){error.textContent=err.message;result.replaceChildren();}
 });
 form.addEventListener('input',()=>{result.textContent='Girdiler değişti. Yeni sonuç için Hesapla’ya basın.';error.textContent='';});
}
