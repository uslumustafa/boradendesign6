// A sticky film can still intersect the viewport after the next section covers it.
const opening=document.querySelector('.opening-sequence');
if(opening){
  const cinema=opening.querySelector('.cinema');
  const about=opening.querySelector('.approach');
  const controls=opening.querySelector('.hero-bottom');
  let covered=false,scheduled=false;
  const update=()=>{
    scheduled=false;
    const film=cinema.getBoundingClientRect();
    const edge=about.getBoundingClientRect().top;
    const next=Math.min(edge,film.bottom)-Math.max(0,film.top)<=film.height*.15;
    controls.inert=controls.getBoundingClientRect().bottom>edge;
    controls.classList.toggle('controls-covered',controls.inert);
    cinema.inert=next;
    if(next!==covered){covered=next;document.dispatchEvent(new CustomEvent('boraden:film-visibility',{detail:{covered}}));}
  };
  const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}};
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  new ResizeObserver(schedule).observe(opening);
  update();
}
