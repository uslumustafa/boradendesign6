import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {shapes,edgeControls,progressAt} from './puzzle.mjs';
import {render,routeList,safeURL} from './render.mjs';
const D=JSON.parse(fs.readFileSync(new URL('data/boraden.json',import.meta.url))),L=JSON.parse(fs.readFileSync(new URL('data/legacy.json',import.meta.url)));
test('intro can finish or skip safely, while repeat visits and reduced motion bypass it',()=>{
 const source=fs.readFileSync(new URL('public/intro.js',import.meta.url),'utf8');
 function opening({seen=false,reduce=false,query='',storageFails=false}={}){
  const classes=new Set(),events={},timers=new Map();let n=0;
  const main={inert:false,setAttribute(){},focus(){doc.activeElement=this;}};
  const skip={addEventListener(name,fn){this[name]=fn;}};
  const overlay={removed:false,inert:false,setAttribute(){},contains(el){return el===this||el===skip;},remove(){this.removed=true;},focus(){doc.activeElement=this;}};
  const doc={documentElement:{classList:{add(...names){names.forEach(n=>classes.add(n));},remove(...names){names.forEach(n=>classes.delete(n));}}},body:{children:[overlay,main]},getElementById(id){return {'brand-intro':overlay,'intro-skip':skip,main}[id];},addEventListener(n,fn){events[n]=fn;},removeEventListener(n){delete events[n];}};
  const media={matches:reduce,addEventListener(){},removeEventListener(){}};
  const context={document:doc,matchMedia:()=>media,location:{search:query},URLSearchParams,sessionStorage:{getItem(){if(storageFails)throw Error();return seen?'1':null;},setItem(){if(storageFails)throw Error();seen=true;}},setTimeout(fn,ms){timers.set(++n,{fn,ms});return n;},clearTimeout(id){timers.delete(id);}};
  vm.runInNewContext(source,context);events.DOMContentLoaded?.();
  return {classes,main,skip,overlay,events,run(ms){const timer=[...timers.values()].find(t=>t.ms===ms);assert.ok(timer);timer.fn();}};
 }
 for(const mode of [{seen:true},{reduce:true}])assert.equal(opening(mode).classes.has('intro-active'),false);
 const normal=opening();assert.equal(normal.main.inert,true);normal.run(3400);normal.run(650);assert.equal(normal.main.inert,false);assert.equal(normal.overlay.removed,true);
 const replay=opening({seen:true,query:'?intro=1',storageFails:true});replay.skip.click();replay.run(100);assert.equal(replay.classes.has('intro-active'),false);
 const escape=opening();escape.events.keydown({key:'Escape'});escape.run(100);assert.equal(escape.main.inert,false);
 const failed=opening();failed.run(5500);failed.run(100);assert.equal(failed.main.inert,false);
 assert.ok(render('/',D,L).html.includes('id="brand-intro"'));assert.ok(!render('/hizmetler/',D,L).html.includes('id="brand-intro"'));
});
test('preserved calculator engine and important transferred content remain available',()=>{const context=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(new URL('public/calculator-core.js',import.meta.url),'utf8'),context);const calc=context.window.BoradenCalc;assert.equal(calc.vat(10000,20,false).total,12000);assert.equal(calc.vat(12000,20,true).net,10000);assert.throws(()=>calc.vat(-1,20,false));for(const s of D.services){const html=render('/hizmetler/'+s.id+'/',D,L).html;for(const n of s.needs||[])assert.ok(html.includes(n),s.id+': '+n);}assert.ok(render('/hesaplama/kdv/',D,L).html.includes('data-initial-calculator="vat"'));});
test('every internal jigsaw edge interlocks exactly in reverse traversal',()=>{const pairs=new Map();for(const s of shapes)for(let i=0;i<s.points.length;i++){const p=s.points[i],q=s.points[(i+1)%s.points.length],key=[p.join(','),q.join(',')].sort().join('|');const coords=edgeControls(p,q);if(pairs.has(key))assert.deepEqual(coords,pairs.get(key).slice().reverse(),key);else pairs.set(key,coords);}assert.equal(shapes.length,7);assert.equal(progressAt(-10),0);assert.equal(progressAt(100),6);});
test('all preserved services and editorial routes render, unsafe URL rejected',()=>{const routes=routeList(D);assert.equal(new Set(routes).size,routes.length);for(const route of routes)assert.equal(render(route,D,L).status,200,route);assert.equal(render('/not-a-page/',D,L).status,404);assert.equal(D.services.length,47);assert.equal(L.documents.length,247);assert.equal(safeURL('javascript:alert(1)'),'#');assert.equal(safeURL('//untrusted.example'),'#');});
