// A reversal must travel 20px before it changes the header; the first 96px stay visible.
export function headerScrollState(state,y,locked=false){
 y=Math.max(0,y);
 if(locked||y<=96)return {lastY:y,anchor:y,direction:0,hidden:false};
 const direction=Math.sign(y-state.lastY);
 if(!direction)return state;
 const anchor=direction===state.direction?state.anchor:state.lastY;
 return {lastY:y,anchor,direction,hidden:Math.abs(y-anchor)>=20?direction>0:state.hidden};
}

if(typeof document!=='undefined'){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const norm=s=>String(s||'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ı','i').trim();
// Native links and server-rendered content are the baseline. JS adds wayfinding.
const dialog=$('#search-dialog');let returnFocus;
$$('.search-toggle').forEach(button=>button.addEventListener('click',()=>{returnFocus=button;dialog.showModal();$('#global-search').focus();updateSearch();}));
$('.close-search')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('close',()=>returnFocus?.focus());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
function updateSearch(){const term=norm($('#global-search').value);let count=0;$$('.search-results>a').forEach(row=>{const match=norm(row.dataset.search).includes(term);row.hidden=!match;if(match)count++;});$('.search-count').textContent=count?`${count} sonuç`:'Bu aramayla eşleşen sonuç yok. Farklı bir sözcük deneyin.';}
$('#global-search')?.addEventListener('input',updateSearch);
document.addEventListener('click',event=>$$('.header details[open]').forEach(d=>{if(!d.contains(event.target))d.open=false;}));
document.addEventListener('keydown',event=>{if(event.key==='Escape')$$('.header details[open]').forEach(d=>d.open=false);});
const serviceInput=$('#service-search');
serviceInput?.addEventListener('input',()=>{const term=norm(serviceInput.value);let count=0;$$('[data-filter-group]').forEach(group=>{let groupCount=0;group.querySelectorAll('[data-filter-text]').forEach(row=>{row.hidden=!norm(row.dataset.filterText).includes(term);if(!row.hidden){groupCount++;count++;}});group.hidden=!groupCount;});$('#service-count').textContent=count?`${count} hizmet`:'Sonuç bulunamadı. Başka bir terim deneyin.';});
$('#archive-search')?.addEventListener('input',event=>{const term=norm(event.target.value);let count=0;$$('.archive-list [data-filter-text]').forEach(row=>{row.hidden=!norm(row.dataset.filterText).includes(term);if(!row.hidden)count++;});$('.archive-count').textContent=`${count} belge`;});

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const opening=$('.opening-art');
if(opening){
 opening.classList.add('is-ready');
 let visible=false,active=false;
 function syncOpening(){
  const next=visible&&!document.hidden&&!reduced.matches;
  for(const animation of opening.getAnimations({subtree:true})){
   if(!animation.animationName?.startsWith('opening-'))continue;
   if(next&&!active){animation.currentTime=0;animation.play();}
   else if(!next)animation.pause();
  }
  active=next;
 }
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.5;syncOpening();},{threshold:.5}).observe(opening);
 document.addEventListener('visibilitychange',syncOpening);
 reduced.addEventListener('change',syncOpening);
 window.addEventListener('pageshow',event=>{if(event.persisted){active=false;syncOpening();}});
}
const header=$('.header');
if(header){
 let state={lastY:window.scrollY,anchor:window.scrollY,direction:0,hidden:false},frame=0,atTopEdge=false,overHeader=false;
 function updateHeader(){
  frame=0;
  const y=Math.max(0,Math.min(window.scrollY,document.documentElement.scrollHeight-window.innerHeight));
  const locked=atTopEdge||overHeader||header.contains(document.activeElement)||!!header.querySelector('details[open]')||!!dialog?.open;
  state=headerScrollState(state,y,locked);
  header.classList.toggle('is-hidden',state.hidden);
 }
 function scheduleHeader(){if(!frame)frame=requestAnimationFrame(updateHeader);}
 window.addEventListener('scroll',scheduleHeader,{passive:true});
 window.addEventListener('resize',scheduleHeader,{passive:true});
 document.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const near=event.clientY<=16;if(near!==atTopEdge){atTopEdge=near;scheduleHeader();}},{passive:true});
 document.addEventListener('pointerleave',()=>{atTopEdge=false;overHeader=false;scheduleHeader();});
 header.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch'){overHeader=true;scheduleHeader();}});
 header.addEventListener('pointerleave',()=>{overHeader=false;scheduleHeader();});
 document.addEventListener('focusin',scheduleHeader);
 document.addEventListener('focusout',scheduleHeader);
 header.querySelectorAll('details').forEach(menu=>menu.addEventListener('toggle',scheduleHeader));
 dialog?.addEventListener('close',scheduleHeader);
 dialog?.addEventListener('toggle',scheduleHeader);
 scheduleHeader();
}

const expertise=$('[data-expertise]');
if(expertise){
 const cards=[...expertise.querySelectorAll('[data-expertise-card]')],pieces=[...expertise.querySelectorAll('.expertise-puzzle a[data-piece]')];
 const items=[...cards,...pieces],overlay=expertise.querySelector('[data-piece-overlay]');
 const indexOf=item=>Number(item.dataset.expertiseCard??item.dataset.piece);
 let activeIndex=-1,overlayAnimation;
 const raised='translateY(-12px) scale(1.28)';
 function select(index){
  if(index===activeIndex)return;
  activeIndex=index;
  items.forEach(item=>item.classList.toggle('is-selected',indexOf(item)===index));
  const piece=pieces.find(item=>indexOf(item)===index&&item.id);
  overlayAnimation?.cancel();overlayAnimation=null;
  if(overlay){
   overlay.style.removeProperty('transform');
   if(piece){
    overlay.style.setProperty('--cx',piece.style.getPropertyValue('--cx'));
    overlay.style.setProperty('--cy',piece.style.getPropertyValue('--cy'));
    overlay.setAttribute('href','#'+piece.id);
    if(reduced.matches)overlay.style.transform=raised;
    else overlayAnimation=overlay.animate([{transform:'translateY(0) scale(1)'},{transform:raised}],{duration:300,easing:'cubic-bezier(.16,.8,.2,1)',fill:'both'});
   }else overlay.removeAttribute('href');
  }
 }
 reduced.addEventListener('change',()=>{if(reduced.matches&&overlayAnimation){overlayAnimation.cancel();overlayAnimation=null;overlay.style.transform=raised;}});
 function selectFocused(){const focused=items.find(item=>item.contains(document.activeElement));select(focused?indexOf(focused):-1);}
 items.forEach(item=>{
  item.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')select(indexOf(item));});
  item.addEventListener('pointerleave',selectFocused);
  item.addEventListener('focusin',()=>select(indexOf(item)));
  item.addEventListener('focusout',()=>requestAnimationFrame(selectFocused));
 });
}

const motionBands=$$('[data-motion-band]');
motionBands.forEach(band=>{
 const windowEl=band.querySelector('.motion-window'),button=band.querySelector('[data-band-pause]');
 if(!windowEl||!button)return;
 band.classList.add('is-ready');
 let visible=false,manualPause=false,focused=false,running=false;
 function syncBand(){
  const active=visible&&!document.hidden&&!reduced.matches;
  const nextRunning=active&&!manualPause&&!focused;
  if(nextRunning&&!running)windowEl.scrollLeft=0;
  running=nextRunning;
  band.classList.toggle('is-active',active);
  band.classList.toggle('is-paused',manualPause);
  band.classList.toggle('is-focused',focused);
  band.classList.toggle('is-static',reduced.matches);
  button.hidden=reduced.matches;button.disabled=reduced.matches;
  button.setAttribute('aria-pressed',String(manualPause));
  button.setAttribute('aria-label',`${button.dataset.label}: ${manualPause?'Başlat':'Durdur'}`);
  button.textContent=manualPause?'▷':'Ⅱ';
 }
 button.addEventListener('click',()=>{manualPause=!manualPause;syncBand();});
 windowEl.addEventListener('focusin',event=>{focused=event.target.matches(':focus-visible');syncBand();if(focused)requestAnimationFrame(()=>{if(document.activeElement===event.target)event.target.scrollIntoView({behavior:'instant',block:'nearest',inline:'nearest'});});});
 windowEl.addEventListener('focusout',()=>requestAnimationFrame(()=>{focused=windowEl.contains(document.activeElement)&&document.activeElement.matches(':focus-visible');syncBand();}));
 document.addEventListener('visibilitychange',syncBand);
 reduced.addEventListener('change',syncBand);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncBand();},{threshold:0}).observe(band);
 syncBand();
});

const world=$('.world-perspectives'),slides=$$('[data-perspective-slide]');
if(world&&slides.length){
 const picker=$('[data-perspective-select]'),pause=$('[data-perspective-pause]');
 let index=0,manualPause=false,visible=false,hovered=false,timeout;
 $('.perspective-controls').hidden=false;
 function show(next){index=(next+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==index);picker.value=String(index);$('[data-perspective-count]').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;}
 function schedule(){clearTimeout(timeout);pause.disabled=reduced.matches;pause.setAttribute('aria-pressed',String(manualPause));pause.setAttribute('aria-label',manualPause?'Otomatik geçişi başlat':'Otomatik geçişi durdur');pause.textContent=manualPause?'▷':'Ⅱ';if(!visible||manualPause||reduced.matches||document.hidden||hovered||world.contains(document.activeElement))return;timeout=setTimeout(()=>{show(index+1);schedule();},1500);}
 $('[data-perspective-prev]').addEventListener('click',()=>{show(index-1);schedule();});
 $('[data-perspective-next]').addEventListener('click',()=>{show(index+1);schedule();});
 picker.addEventListener('change',()=>{show(Number(picker.value));schedule();});
 pause.addEventListener('click',()=>{manualPause=!manualPause;schedule();});
 world.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;schedule();}});
 world.addEventListener('pointerleave',()=>{hovered=false;schedule();});
 world.addEventListener('focusin',schedule);world.addEventListener('focusout',()=>setTimeout(schedule,0));
 document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',schedule);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.2}).observe(world);
 show(0);schedule();
}

}
