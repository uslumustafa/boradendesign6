// Desktop is pointer-revealed; touch users can reveal navigation by scrolling up.
export function headerHidden({y,previousY=y,reveal=false,held=false,touch=false,wasHidden=false}){
 if(y<=96||held||reveal)return false;
 if(touch){if(Math.abs(y-previousY)<8)return wasHidden;return y>previousY;}
 return true;
}
if(typeof document!=='undefined'){
 const header=document.querySelector('.discovery-header');
 if(header){
  const touch=matchMedia('(hover: none)');let previousY=scrollY,reveal=false,frame=0;
  function draw(){frame=0;const y=Math.max(0,scrollY),held=!!header.querySelector(':focus-visible,.service-menu[open],.knowledge-menu[open],.mobile-menu[open]')||!!document.querySelector('#discovery-search[open]');
   header.classList.toggle('is-hidden',headerHidden({y,previousY,reveal,held,touch:touch.matches,wasHidden:header.classList.contains('is-hidden')}));previousY=y;
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw);};
  addEventListener('scroll',()=>{reveal=false;schedule();},{passive:true});
  document.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const rect=header.getBoundingClientRect();reveal=e.clientY<=18||(!header.classList.contains('is-hidden')&&e.clientY<=rect.bottom);schedule();},{passive:true});
  document.addEventListener('pointerleave',()=>{reveal=false;schedule();});
  header.addEventListener('pointerleave',e=>{if(e.pointerType==='touch'||header.querySelector(':focus-visible'))return;reveal=false;if(scrollY>96)header.querySelectorAll('.service-menu[open],.knowledge-menu[open],.mobile-menu[open]').forEach(menu=>menu.open=false);schedule();});
  document.addEventListener('focusin',schedule);document.addEventListener('focusout',schedule);
  header.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',schedule));
  document.querySelector('#discovery-search')?.addEventListener('close',schedule);
  addEventListener('resize',schedule,{passive:true});draw();
 }
}
