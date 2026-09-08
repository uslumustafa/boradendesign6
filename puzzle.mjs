// Shared edges use the same control points in either direction, so every tab fits.
export const palette=['#315e7e','#234965','#426e79','#3c6a63','#47747c','#556985'];
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
const svgID=id=>String(id).replace(/[^a-zA-Z0-9_-]/g,'-')||'puzzle';
function materialDefs(id){return `<defs>
  <filter id="${id}-shadow" x="-40%" y="-40%" width="180%" height="190%"><feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#142a3c" flood-opacity=".24"/></filter>
  <linearGradient id="${id}-surface" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#071522" stop-opacity=".24"/></linearGradient>
  <linearGradient id="${id}-bevel" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".45" stop-color="#d8e7f1" stop-opacity=".2"/><stop offset="1" stop-color="#071827" stop-opacity=".5"/></linearGradient>
  </defs>`;}
function surface(s,id){const d=shapePath(s);return `<path class="piece-depth" d="${d}" transform="translate(0 7)"/><path class="piece-rim" d="${d}" transform="translate(0 3)"/><path class="piece-outline" d="${d}"/><path class="piece-surface" d="${d}" fill="url(#${id}-surface)"/><path class="piece-shine" d="${d}" style="stroke:url(#${id}-bevel)"/>`;}
export function puzzle({mode='complete',selected='',id='puzzle',interactive=true}={}){
  id=svgID(id);
  return `<svg class="puzzle-svg puzzle-${mode}" viewBox="0 0 550 550" role="${interactive?'group':'img'}" aria-label="Boraden uzmanlık yapbozu; altı hizmet alanı bir bütün oluşturur" xmlns="http://www.w3.org/2000/svg">
  ${materialDefs(id)}
  ${shapes.map((s,i)=>{const [cx,cy]=pos(s.center),central=i===6,tag=central||!interactive?'g':'a';const attrs=tag==='a'?`href="/hizmetler/alan/${s.id}/" aria-label="${esc(s.label.join(' '))} hizmetleri"`:'';
  return `<${tag} ${attrs} class="puzzle-piece ${central?'piece-center':''} ${s.id===selected?'piece-selected':''}" data-piece="${i}" style="--piece-order:${i};--piece-fill:${central?'#f0f3f6':palette[i]};--piece-shadow:url(#${id}-shadow);--ox:${s.offset[0]}px;--oy:${s.offset[1]}px;--turn:${s.rotation}deg;--cx:${cx}px;--cy:${cy}px" ${!interactive?'aria-hidden="true"':''}><g class="piece-face" filter="url(#${id}-shadow)">${surface(s,id)}
  ${central?`<g class="puzzle-check"><path d="M${cx-34} ${cy-24}l8 8 22-25" style="stroke:#00547c"/><path d="M${cx-17} ${cy-24}l8 8 22-25" style="stroke:#e94d2a"/><path d="M${cx} ${cy-24}l8 8 22-25" style="stroke:#259e3c"/></g><text x="${cx}" y="${cy+13}" class="piece-brand">BORADEN</text><text x="${cx}" y="${cy+30}" class="piece-subtitle">BİRLİKTE, BÜTÜNE.</text>`:`<text x="${cx}" y="${cy-22}" class="piece-number">0${i+1}</text><text class="piece-label">${s.label.map((line,j)=>`<tspan x="${cx}" y="${cy+1+j*18}">${esc(line)}</tspan>`).join('')}</text><circle cx="${cx}" cy="${cy+43}" r="2" class="piece-dot"/>`}
  </g></${tag}>`;}).join('')}</svg>`;
}

// The same fitted geometry carries the actual service name in its page backdrop.
export function servicePiece({group,title,id='service-piece'}={}){
  const shape=shapes.find(s=>s.id===group&&s.id!=='boraden');
  if(!shape)return '';
  id=svgID(id);
  const index=shapes.indexOf(shape),[cx,cy]=pos(shape.center);
  const points=shape.points.map(pos),minX=Math.min(...points.map(p=>p[0])),minY=Math.min(...points.map(p=>p[1]));
  const width=Math.max(...points.map(p=>p[0]))-minX,height=Math.max(...points.map(p=>p[1]))-minY;
  const lines=[],limit=width>cell?31:17;
  for(const word of String(title||shape.label.join(' ')).split(/\s+/)){if(!word)continue;const last=lines.length-1;if(last<0||(lines[last]+' '+word).length>limit)lines.push(word);else lines[last]+=' '+word;}
  const font=Math.min(width>cell?19:14,82/Math.max(lines.length,1)),leading=font*1.35;
  return `<svg class="service-piece-svg" viewBox="${minX-40} ${minY-40} ${width+80} ${height+88}" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${materialDefs(id)}<g class="service-piece-material" style="--piece-fill:${palette[index]};--piece-shadow:url(#${id}-shadow)"><g class="piece-face" filter="url(#${id}-shadow)">${surface(shape,id)}<text class="piece-label service-piece-label" style="font-size:${font}px">${lines.map((line,i)=>`<tspan x="${cx}" y="${cy+(i-(lines.length-1)/2)*leading+font*.3}">${esc(line)}</tspan>`).join('')}</text></g></g></svg>`;
}
