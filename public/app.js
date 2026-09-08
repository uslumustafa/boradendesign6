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

const chapters=$$('[data-chapter]'),assembly=$('.assembly'),pieces=$$('.puzzle-assemble [data-piece]'),motionButton=$('.motion-toggle');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),small=matchMedia('(max-width: 600px)');
let paused=false,frame=0,current=-1;
function draw(index){if(index===current)return;current=index;pieces.forEach((piece,i)=>{piece.classList.toggle('is-joined',i<=index||i===6);piece.classList.toggle('piece-current',i===index);});if(chapters.length){$('.stage-name').textContent=chapters[index].querySelector('h3').textContent;$('.stage-count').textContent=String(index+1).padStart(2,'0');$('.stage-progress i').style.width=`${(index+1)/6*100}%`;assembly.dataset.assembled=String(index+1);}}
function updateJourney(){frame=0;if(!assembly)return;const still=paused||reduced.matches||small.matches;document.documentElement.classList.toggle('js-motion',!still);if(still){draw(5);$('.stage-name').textContent='Bir bütün olarak Boraden.';return;}
 let index=0;const checkpoint=innerHeight*.52;chapters.forEach((chapter,i)=>{if(chapter.getBoundingClientRect().top<=checkpoint)index=i;});draw(index);
}
function schedule(){if(!frame)frame=requestAnimationFrame(updateJourney);}
if(assembly){window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',()=>{current=-1;schedule();},{passive:true});reduced.addEventListener('change',()=>{current=-1;schedule();});small.addEventListener('change',()=>{current=-1;schedule();});motionButton.addEventListener('click',()=>{paused=!paused;motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Yapboz hareketini sürdür':'Yapboz hareketini durdur');motionButton.textContent=paused?'▷':'Ⅱ';current=-1;schedule();});schedule();}

// Decorative detail piece drifts locally; reading content never moves with it.
const detail=$('[data-detail-piece]');if(detail){let detailFrame=0;const move=()=>{detailFrame=0;detail.style.transform=reduced.matches||small.matches?'':`translateY(${Math.min(scrollY*.09,48)}px)`;};const scheduleDetail=()=>{if(!detailFrame)detailFrame=requestAnimationFrame(move);};addEventListener('scroll',scheduleDetail,{passive:true});reduced.addEventListener('change',scheduleDetail);small.addEventListener('change',scheduleDetail);}

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
