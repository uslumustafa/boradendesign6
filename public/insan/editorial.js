(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function rail(selector,itemSelector,previous,next,onChange){
    const element=document.querySelector(selector);
    if(!element)return;
    const items=[...element.querySelectorAll(itemSelector)];
    if(!items.length)return;
    let current=0,scheduled=false;
    const move=index=>{current=Math.max(0,Math.min(index,items.length-1));element.scrollTo({left:items[current].offsetLeft,behavior:reduced.matches?'instant':'smooth'});};
    const sync=()=>{scheduled=false;current=items.reduce((best,item,i)=>Math.abs(item.offsetLeft-element.scrollLeft)<Math.abs(items[best].offsetLeft-element.scrollLeft)?i:best,0);onChange?.(current,items.length);if(previous)previous.disabled=element.scrollLeft<2;if(next)next.disabled=element.scrollLeft+element.clientWidth>=element.scrollWidth-2;};
    previous?.addEventListener('click',()=>move(current-1));next?.addEventListener('click',()=>move(current+1));
    element.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(sync);}},{passive:true});
    new ResizeObserver(sync).observe(element);sync();return move;
  }
  const journalControls=document.querySelector('.rail-controls');
  if(journalControls){const track=document.querySelector('.journal-track');rail('.journal-track','[data-journal-story]',journalControls.querySelector('[data-journal-prev]'),journalControls.querySelector('[data-journal-next]'),()=>{journalControls.hidden=track.scrollWidth<=track.clientWidth+2;});}
  const controls=document.querySelector('.perspectives-controls');
  if(controls){const select=controls.querySelector('select'),count=controls.querySelector('[data-perspective-count]');controls.hidden=false;
    const move=rail('.perspectives-rail','[data-perspective]',controls.querySelector('[data-perspective-prev]'),controls.querySelector('[data-perspective-next]'),(i,n)=>{select.value=String(i);count.textContent=String(i+1).padStart(2,'0')+' / '+n;});
    select.addEventListener('change',()=>move?.(Number(select.value)));
  }
})();
