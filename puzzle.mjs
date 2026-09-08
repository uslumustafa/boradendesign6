// Shared edges use the same control points in either direction, so every tab fits.
export const palette=['#cfdfd2','#d4e3ed','#e1dbe9','#efdfd1','#d7e5df','#ebe7d1'];
export const shapes=[
  {id:'vergi',points:[[0,0],[1,0],[2,0],[2,1],[1,1],[0,1]],center:[1,.5],label:['Vergi & Mali','Müşavirlik'],offset:[-19,-27],rotation:-4},
  {id:'denetim',points:[[2,0],[3,0],[3,1],[2,1]],center:[2.5,.5],label:['Denetim &','Raporlama'],offset:[27,-18],rotation:5},
  {id:'danismanlik',points:[[0,1],[1,1],[1,2],[0,2]],center:[.5,1.5],label:['Kurumsal','Danışmanlık'],offset:[-34,6],rotation:-5},
  {id:'insan',points:[[2,1],[3,1],[3,2],[2,2]],center:[2.5,1.5],label:['İnsan Kaynakları','& Bordro'],offset:[33,14],rotation:4},
  {id:'sistem',points:[[0,2],[1,2],[1,3],[0,3]],center:[.5,2.5],label:['Sistemler &','İş Zekâsı'],offset:[-18,34],rotation:5},
  {id:'akademi',points:[[1,2],[2,2],[3,2],[3,3],[2,3],[1,3]],center:[2,2.5],label:['Boraden Akademi'],offset:[18,34],rotation:-3},
  {id:'boraden',points:[[1,1],[2,1],[2,2],[1,2]],center:[1.5,1.5],label:['BORADEN'],offset:[0,0],rotation:0}
];
const cell=140, origin=65;
const pos=p=>p.map(v=>origin+v*cell);
export function edgeControls(p,q){
  const forward=p[0]<q[0]||(p[0]===q[0]&&p[1]<q[1]);
  const a=forward?p:q,b=forward?q:p;
  const outside=(a[0]===b[0]&&(a[0]===0||a[0]===3))||(a[1]===b[1]&&(a[1]===0||a[1]===3));
  if(outside)return [pos(p),pos(q)];
  const x=pos(a),y=pos(b),dx=y[0]-x[0],dy=y[1]-x[1];
  const sign=((a[0]+a[1])%2?1:-1);
  const at=(t,n=0)=>[x[0]+dx*t-dy*n*sign,x[1]+dy*t+dx*n*sign];
  const coords=[at(0),at(.34),at(.44),at(.39,.15),at(.5,.15),at(.61,.15),at(.56),at(.66),at(1)];
  return forward?coords:coords.reverse();
}
export function shapePath(shape){
  let d='M'+pos(shape.points[0]).join(' ');
  shape.points.forEach((p,i)=>{
    const c=edgeControls(p,shape.points[(i+1)%shape.points.length]);
    d+=c.length===2?' L'+c[1].join(' '):' L'+c[1].join(' ')+' C'+c.slice(2,5).map(v=>v.join(' ')).join(' ')+' C'+c.slice(5,8).map(v=>v.join(' ')).join(' ')+' L'+c[8].join(' ');
  });return d+' Z';
}
export const progressAt=(index,total=6)=>Math.min(total,Math.max(0,Math.floor(index)+1));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function puzzle({mode='complete',selected='',id='puzzle',interactive=true}={}){
  return `<svg class="puzzle-svg puzzle-${mode}" viewBox="0 0 550 550" role="${interactive?'group':'img'}" aria-label="Boraden uzmanlık yapbozu; altı hizmet alanı bir bütün oluşturur" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="${id}-shadow" x="-40%" y="-40%" width="180%" height="190%"><feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#536d67" flood-opacity=".12"/></filter></defs>
  ${shapes.map((s,i)=>{const [cx,cy]=pos(s.center),central=i===6,tag=central||!interactive?'g':'a';const attrs=tag==='a'?`href="/hizmetler/alan/${s.id}/" aria-label="${esc(s.label.join(' '))} hizmetleri"`:'';
  return `<${tag} ${attrs} class="puzzle-piece ${central?'piece-center':''} ${s.id===selected?'piece-selected':''}" data-piece="${i}" style="--piece-order:${i};--piece-fill:${central?'#ffffff':palette[i]};--ox:${s.offset[0]}px;--oy:${s.offset[1]}px;--turn:${s.rotation}deg;--cx:${cx}px;--cy:${cy}px" ${!interactive?'aria-hidden="true"':''}><g class="piece-face" filter="url(#${id}-shadow)"><path class="piece-outline" d="${shapePath(s)}"/><path class="piece-shine" d="${shapePath(s)}"/>
  ${central?`<g class="puzzle-check"><path d="M${cx-34} ${cy-24}l8 8 22-25" style="stroke:#438b96"/><path d="M${cx-17} ${cy-24}l8 8 22-25" style="stroke:#d98370"/><path d="M${cx} ${cy-24}l8 8 22-25" style="stroke:#6d9a77"/></g><text x="${cx}" y="${cy+13}" class="piece-brand">BORADEN</text><text x="${cx}" y="${cy+30}" class="piece-subtitle">BİRLİKTE, BÜTÜNE.</text>`:`<text x="${cx}" y="${cy-22}" class="piece-number">0${i+1}</text><text class="piece-label">${s.label.map((line,j)=>`<tspan x="${cx}" y="${cy+1+j*18}">${esc(line)}</tspan>`).join('')}</text><circle cx="${cx}" cy="${cy+43}" r="2" class="piece-dot"/>`}
  </g></${tag}>`;}).join('')}</svg>`;
}
