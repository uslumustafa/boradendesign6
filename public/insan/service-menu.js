// Native details provide click/keyboard operation; animate only the panel change.
export function initServiceMenu(menu){
  if(!menu)return;
  const areas=[...menu.querySelectorAll('.mega-area')];
  const panel=menu.querySelector('.service-mega');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let animation;
  areas.forEach(area=>{
    const summary=area.querySelector('summary'),label=summary.getAttribute('aria-label');
    area.addEventListener('toggle',()=>{
      summary.setAttribute('aria-label',area.open?'Tüm uzmanlık alanlarına dön':label);
      if(area.open)areas.filter(other=>other!==area).forEach(other=>other.open=false);
    });
    summary.addEventListener('click',()=>{
      const before=panel.getBoundingClientRect().height;
      animation?.cancel();
      requestAnimationFrame(()=>{
        if(reduced.matches||!menu.open)return;
        const after=panel.getBoundingClientRect().height;
        animation=panel.animate([{height:`${before}px`},{height:`${after}px`}],{duration:240,easing:'cubic-bezier(.2,.7,.2,1)'});
        if(area.open)area.querySelector('.mega-detail').animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:220,easing:'ease-out'});
      });
    });
  });
  menu.addEventListener('toggle',()=>{
    if(!menu.open){animation?.cancel();areas.forEach(area=>area.open=false);}
  });
}
