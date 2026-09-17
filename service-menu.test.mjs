import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const code=fs.readFileSync(new URL('./public/insan/service-menu.js',import.meta.url),'utf8').replace('export function','function');
const frames=[],calls=[],media={matches:false};
let cancelled=0;
const panel={height:380,getBoundingClientRect(){return {height:this.height};},animate(keyframes){calls.push(keyframes);return {cancel(){cancelled++;}};}};
const node=()=>({events:{},addEventListener(name,fn){this.events[name]=fn;}});
const areas=Array.from({length:6},(_,i)=>{
  const summary={...node(),label:`Alan ${i}`,getAttribute(){return this.label;},setAttribute(_,v){this.label=v;}};
  return {...node(),open:false,summary,querySelector:s=>s==='summary'?summary:panel};
});
const menu={...node(),open:true,querySelectorAll:()=>areas,querySelector:()=>panel};
vm.runInNewContext(`${code}\ninitServiceMenu(menu)`,{menu,matchMedia:()=>media,requestAnimationFrame:fn=>frames.push(fn)});
areas[0].summary.events.click();areas[0].open=true;areas[0].events.toggle();panel.height=520;frames.shift()();
assert.equal(calls[0][0].height,'380px');assert.equal(calls[0][1].height,'520px');
assert.equal(areas[0].summary.label,'Tüm uzmanlık alanlarına dön');
areas[1].open=true;areas[1].events.toggle();assert.equal(areas[0].open,false,'Only one service area stays open');
areas[0].events.toggle();assert.equal(areas[0].summary.label,'Alan 0');
media.matches=true;const count=calls.length;areas[1].summary.events.click();frames.shift()();assert.equal(calls.length,count,'Reduced motion skips panel animations');
menu.open=false;menu.events.toggle();assert.ok(areas.every(area=>!area.open),'Reopening starts with all six choices');assert.ok(cancelled>0);
console.log('PASS: menu height transition, exclusivity, accessible labels, reset and reduced motion');
