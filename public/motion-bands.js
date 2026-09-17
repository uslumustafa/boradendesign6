// Shared by the current homepage and the preserved source ribbons.
if(typeof document!=='undefined'){
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const motionBands=document.querySelectorAll('[data-motion-band]');
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

}
