import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {serviceStory} from './service-story.mjs';
const D=JSON.parse(fs.readFileSync(new URL('data/boraden.json',import.meta.url)));
const content=serviceStory(D);
assert.equal((content.match(/<img /g)||[]).length,1);
assert.ok(content.includes('/assets/brand/boraden-perspectives-v1.webp'));
assert.ok(!content.includes('bagimsiz-denetim.jpg'));
assert.equal((content.match(/data-story-chapter=/g)||[]).length,3);
assert.ok(!/<button|data-field-panel/.test(content));
for(const g of D.groups){
 assert.equal(content.split(`href="/hizmetler/alan/${g.id}/"`).length-1,1);
 assert.ok(content.replaceAll('&amp;','&').includes(g.name));
}
assert.ok(!fs.readFileSync(new URL('public/insan/index.html',import.meta.url),'utf8').includes('data-film-pane'));
// Covered sticky film pauses; its obscured controls cannot receive keyboard focus.
const events={},changes=[];
let edge=800,filmTop=0;
const cinema={getBoundingClientRect:()=>({top:filmTop,bottom:filmTop+800,height:800})};
const about={getBoundingClientRect:()=>({top:edge})};
const opening={querySelector:s=>s==='.cinema'?cinema:s==='.approach'?about:null};
const context={document:{querySelector:()=>opening,dispatchEvent:e=>changes.push(e.detail.covered)},window:{addEventListener:(n,f)=>events[n]=f},requestAnimationFrame:fn=>fn(),ResizeObserver:class{observe(){}},CustomEvent:class{constructor(name,options){this.detail=options.detail;}}};
vm.runInNewContext(fs.readFileSync(new URL('public/insan/experience.js',import.meta.url),'utf8'),context);
assert.equal(cinema.inert,false);
edge=500;events.scroll();assert.equal(cinema.inert,false);
edge=100;events.scroll();assert.equal(cinema.inert,true);assert.equal(changes.at(-1),true);
edge=800;events.scroll();assert.equal(cinema.inert,false);assert.equal(changes.at(-1),false);
// In normal mobile/reduced-motion flow the film itself scrolls off screen.
filmTop=-750;edge=50;events.scroll();assert.equal(cinema.inert,true);
filmTop=0;edge=800;events.resize();assert.equal(cinema.inert,false);
console.log('PASS: one image, six direct destinations, intact film, covered playback and focus handoff');
