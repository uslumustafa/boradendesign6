import {initServiceMenu} from './service-menu.js';
import '../header-motion.js';
import {searchItems} from './search-core.js';
const header=document.querySelector('.discovery-header');
if(header){
 header.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>header.querySelector('.mobile-menu').open=false));
 const menus=[...header.querySelectorAll('.service-menu,.knowledge-menu,.mobile-menu')];
 menus.forEach(menu=>menu.addEventListener('toggle',()=>{if(menu.open)menus.filter(x=>x!==menu).forEach(x=>x.open=false);}));
 document.addEventListener('click',e=>menus.forEach(menu=>{if(!menu.contains(e.target))menu.open=false;}));
 menus.forEach(menu=>menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.open=false;menu.querySelector('summary').focus();e.stopPropagation();}}));
 initServiceMenu(header.querySelector('.service-menu'));
}
const choices=[...document.querySelectorAll('.need-choice')];
choices.forEach(choice=>choice.addEventListener('toggle',()=>{if(choice.open)choices.filter(x=>x!==choice).forEach(x=>x.open=false);}));
const dialog=document.querySelector('#discovery-search');
if(dialog){
 const items=JSON.parse(document.querySelector('#discovery-index').textContent),input=dialog.querySelector('input'),results=dialog.querySelector('.search-results'),status=dialog.querySelector('.search-status');
 let origin;
 function update(){
  const term=input.value.trim(),matches=term?searchItems(items,term):items.filter(x=>['Şirket Değerlemesi','Bağımsız Denetim','Şirket Kuruluş Danışmanlığı','Binek otomobil amortismanı'].includes(x.title));
  results.replaceChildren();status.textContent=term?(matches.length?`${matches.length} sonuç gösteriliyor`:'Eşleşen sonuç yok. Daha kısa bir konu veya hizmet adı deneyin.'):'Sık aranan konular';
  matches.forEach(item=>{const a=document.createElement('a'),name=document.createElement('span'),category=document.createElement('small'),arrow=document.createElement('b');a.href=item.href;name.textContent=item.title;category.textContent=item.category;arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');a.append(name,category,arrow);results.append(a);});
 }
 document.querySelectorAll('[data-search-open]').forEach(button=>{button.hidden=false;button.addEventListener('click',()=>{origin=button;header?.querySelectorAll('details[open]').forEach(x=>x.open=false);dialog.showModal();update();input.focus();});});
 dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();dialog.close();}});
 input.addEventListener('input',update);dialog.addEventListener('close',()=>origin?.focus());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const box=dialog.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)dialog.close();}});
}
const film=document.querySelector('#people');
film?.addEventListener('ended',()=>document.querySelector('.opening-sequence')?.classList.add('brand-landed'));
