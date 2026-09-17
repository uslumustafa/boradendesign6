// Native horizontal scrolling: one set of real links, no duplicated screen-reader content.
export function advanceRail(position,max,direction,seconds){
 const next=position+direction*18*Math.min(seconds,.05);
 return next>=max?{position:max,direction:-1}:next<=0?{position:0,direction:1}:{position:next,direction};
}
if(typeof document!=='undefined'){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-card-flow]').forEach(section=>{
  const track=section.querySelector('[data-flow-track]'),pause=section.querySelector('[data-flow-pause]');
  if(!track||!pause)return;
  const items=[...track.children],previous=section.querySelector('[data-flow-prev]'),next=section.querySelector('[data-flow-next]'),select=section.querySelector('[data-flow-select]');
  let visible=false,hovered=false,focused=false,manual=false,frame=0,last=0,position=track.scrollLeft,direction=1;
  const maximum=()=>Math.max(0,track.scrollWidth-track.clientWidth);
  const offset=item=>item.getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft;
  function controls(){
   const current=items.reduce((best,item,i)=>Math.abs(offset(item)-track.scrollLeft)<Math.abs(offset(items[best])-track.scrollLeft)?i:best,0);
   if(select)select.value=String(current);
   if(previous)previous.disabled=track.scrollLeft<2;
   if(next)next.disabled=track.scrollLeft>=maximum()-2;
   return current;
  }
  function tick(time){
   const step=advanceRail(position,maximum(),direction,last?(time-last)/1000:0);
   position=step.position;direction=step.direction;last=time;track.scrollLeft=position;
   frame=requestAnimationFrame(tick);
  }
  function sync(){
   cancelAnimationFrame(frame);frame=0;last=0;position=track.scrollLeft;
   const state=reduced.matches?'reduced':maximum()<2?'static':manual?'manual':!visible||document.hidden?'offscreen':hovered||focused?'paused':'running';
   section.dataset.flowState=state;
   pause.hidden=reduced.matches||maximum()<2;
   pause.textContent=manual?'Akışı başlat':'Akışı durdur';
   if(state==='running')frame=requestAnimationFrame(tick);
  }
  function move(index){manual=true;sync();track.scrollTo({left:Math.min(maximum(),offset(items[Math.max(0,Math.min(index,items.length-1))])),behavior:reduced.matches?'instant':'smooth'});}
  previous?.addEventListener('click',()=>move(controls()-1));next?.addEventListener('click',()=>move(controls()+1));
  select?.addEventListener('change',()=>move(Number(select.value)));
  pause.hidden=false;pause.addEventListener('click',()=>{manual=!manual;sync();});
  section.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch'){hovered=true;sync();}});
  section.addEventListener('pointerleave',()=>{hovered=false;sync();});
  section.addEventListener('focusin',()=>{focused=Boolean(document.activeElement?.matches(':focus-visible'));sync();});
  section.addEventListener('focusout',()=>requestAnimationFrame(()=>{focused=section.contains(document.activeElement)&&document.activeElement.matches(':focus-visible');sync();}));
  track.addEventListener('pointerdown',event=>{if(event.pointerType==='touch'){manual=true;sync();}},{passive:true});
  track.addEventListener('wheel',event=>{if(Math.abs(event.deltaX)>Math.abs(event.deltaY)){manual=true;sync();}},{passive:true});
  track.addEventListener('scroll',controls,{passive:true});
  new ResizeObserver(()=>{controls();sync();}).observe(track);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.15}).observe(track);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  section.querySelectorAll('[data-flow-controls]').forEach(el=>el.hidden=false);
  controls();sync();
 });
}
