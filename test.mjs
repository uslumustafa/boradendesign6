import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {shapes,edgeControls,progressAt,servicePiece} from './puzzle.mjs';
import {serviceMotionAt} from './public/service-motion.js';
import {headerScrollState} from './public/app.js';
import {render,routeList,safeURL} from './render.mjs';
const D=JSON.parse(fs.readFileSync(new URL('data/boraden.json',import.meta.url))),L=JSON.parse(fs.readFileSync(new URL('data/legacy.json',import.meta.url)));
test('service pieces preserve identity, isolate SVG ids and settle before reading',()=>{
 for(const service of D.services){
  const html=render('/hizmetler/'+service.id+'/',D,L).html;
  assert.equal((html.match(/class="service-piece-svg"/g)||[]).length,1);
  const piece=servicePiece({group:service.group,title:service.title});
  assert.equal((piece.match(/class="piece-outline"/g)||[]).length,1);
  assert.ok(piece.includes('aria-hidden="true"'));
 }
 assert.ok(servicePiece({group:'denetim',title:'<script> & "test"'}).includes('&lt;script&gt;'));
 for(const route of ['/',...D.groups.map(g=>'/hizmetler/alan/'+g.id+'/')]){
  const html=render(route,D,L).html,ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,route);
  for(const [,id] of html.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(id),id);
 }
 const start=serviceMotionAt(0,778);assert.ok(start.arrival<1&&start.opacity>.5);
 const end=serviceMotionAt(373,778);assert.equal(end.depth,1);assert.ok(Math.abs(end.opacity-.13)<.001);
 assert.deepEqual(serviceMotionAt(-100,778),start);
 assert.deepEqual(serviceMotionAt(0,778,true),serviceMotionAt(5000,778,true));
 for(const h of [320,778,1800])for(const y of [0,40,200,1000]){const s=serviceMotionAt(y,h);assert.ok(s.arrival>=0&&s.arrival<=1.1&&s.depth>=0&&s.depth<=1&&s.opacity>=0&&s.opacity<=1);}
});
test('home retains perspectives and places both films with lazy media and editable brand cues',()=>{
 const html=render('/',D,L).html;
 assert.equal((html.match(/data-perspective-slide/g)||[]).length,14);
 for(const t of D.thinkers){assert.ok(D.perspectives.some(p=>p.id===t.perspective));assert.ok(html.includes('href="/perspektifler/'+t.perspective+'/"'));}
 const videos=html.match(/<video\b[^>]*>/g);assert.equal(videos.length,2);
 for(const video of videos){assert.ok(!/\ssrc=/.test(video));assert.ok(video.includes('preload="none"'));}
 assert.ok(videos[0].includes('data-src="/assets/boraden-turkiye-business.mp4"'));assert.ok(videos[0].includes('poster="/assets/boraden-turkiye-business.jpg"'));
 assert.ok(videos[1].includes('data-src="/assets/sector-entry-office.mp4"'));
 const brand=html.slice(html.indexOf('class="sector-film brand-film"'),html.indexOf('class="expertise-sheet"'));
 assert.ok(html.indexOf('class="opening-scene"')<html.indexOf('class="sector-film brand-film"'));assert.ok(html.indexOf('class="sector-film brand-film"')<html.indexOf('class="expertise-sheet"'));
 assert.deepEqual([...brand.matchAll(/data-caption-at="(\d+)"/g)].map(m=>Number(m[1])),[0,4,8,12,16]);
 for(const text of ['Farklı ihtiyaçlar. Birbirini tamamlayan uzmanlıklar.','İşinize yakından bakıyoruz.','Büyük resmi birlikte görüyoruz.','Parçadan bütüne.','Birlikte, Boraden.'])assert.ok(brand.includes(text));
 assert.ok(brand.includes('Yapay zekâ ile üretilmiş temsili iş hayatı sahneleri'));assert.ok(!brand.includes('sector-feature-copy'));
 assert.ok(html.indexOf('id="sektorel-bakis"')>html.indexOf('class="completion"'));
 assert.ok(html.includes('Bağımsız Denetim ve Danışmanlık A.Ş.'));
});
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
 const normal=opening();assert.equal(normal.main.inert,true);normal.run(5200);normal.run(550);assert.equal(normal.main.inert,false);assert.equal(normal.overlay.removed,true);
 const replay=opening({seen:true,query:'?intro=1',storageFails:true});replay.skip.click();replay.run(100);assert.equal(replay.classes.has('intro-active'),false);
 const escape=opening();escape.events.keydown({key:'Escape'});escape.run(100);assert.equal(escape.main.inert,false);
 const failed=opening();failed.run(5900);failed.run(100);assert.equal(failed.main.inert,false);
 assert.ok(render('/',D,L).html.includes('id="brand-intro"'));assert.ok(!render('/hizmetler/',D,L).html.includes('id="brand-intro"'));
});
test('header waits for intentional direction changes and expertise links remain paired',()=>{
 let state={lastY:0,anchor:0,direction:0,hidden:false};
 const move=(y,locked=false)=>(state=headerScrollState(state,y,locked)).hidden;
 assert.equal(move(96),false);assert.equal(move(115),false);assert.equal(move(116),true);
 assert.equal(move(110),true);assert.equal(move(97),true);assert.equal(move(96),false);
 assert.equal(move(300),true);assert.equal(move(281),true);assert.equal(move(280),false);
 assert.equal(move(500,true),false);assert.equal(move(519),false);assert.equal(move(520),true);
 assert.equal(move(-30),false);
 const html=render('/',D,L).html;
 assert.ok(html.indexOf('class="expertise-puzzle"')<html.indexOf('class="expertise-grid"'));
 assert.equal((html.match(/data-expertise-card=/g)||[]).length,6);
 for(const [i,g] of D.groups.entries())assert.ok(html.includes(`data-expertise-card="${i}" id="alan-${g.id}" href="/hizmetler/alan/${g.id}/"`));
 assert.ok(!html.includes('data-chapter='));assert.ok(!html.includes('motion-toggle'));
});
test('preserved calculator engine and important transferred content remain available',()=>{const context=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(new URL('public/calculator-core.js',import.meta.url),'utf8'),context);const calc=context.window.BoradenCalc;assert.equal(calc.vat(10000,20,false).total,12000);assert.equal(calc.vat(12000,20,true).net,10000);assert.throws(()=>calc.vat(-1,20,false));for(const s of D.services){const html=render('/hizmetler/'+s.id+'/',D,L).html;for(const n of s.needs||[])assert.ok(html.includes(n),s.id+': '+n);}assert.ok(render('/hesaplama/kdv/',D,L).html.includes('data-initial-calculator="vat"'));});
test('every internal jigsaw edge interlocks exactly in reverse traversal',()=>{const pairs=new Map();for(const s of shapes)for(let i=0;i<s.points.length;i++){const p=s.points[i],q=s.points[(i+1)%s.points.length],key=[p.join(','),q.join(',')].sort().join('|');const coords=edgeControls(p,q);if(pairs.has(key))assert.deepEqual(coords,pairs.get(key).slice().reverse(),key);else pairs.set(key,coords);}assert.equal(shapes.length,7);assert.equal(progressAt(-10),0);assert.equal(progressAt(100),6);});
test('all preserved services and editorial routes render, unsafe URL rejected',()=>{const routes=routeList(D);assert.equal(new Set(routes).size,routes.length);for(const route of routes)assert.equal(render(route,D,L).status,200,route);assert.equal(render('/not-a-page/',D,L).status,404);assert.equal(D.services.length,47);assert.equal(L.documents.length,247);assert.equal(safeURL('javascript:alert(1)'),'#');assert.equal(safeURL('//untrusted.example'),'#');});

test('section films synchronize cues, respect poster preferences and recover from interrupted play',async()=>{
 const source=fs.readFileSync(new URL('public/section-video.js',import.meta.url),'utf8');
 function scene({width=1200,reduce=false,saveData=false}={}){
  const target=extra=>Object.assign({events:{},addEventListener(name,fn){(this.events[name]??=[]).push(fn);},fire(name){for(const fn of this.events[name]||[])fn();}},extra);
  const classes=(...names)=>{const set=new Set(names);return {contains:n=>set.has(n),add:n=>set.add(n),remove:n=>set.delete(n),toggle(n,on){on?set.add(n):set.delete(n);}};};
  const frames=[],global=target({}),media=target({matches:reduce}),connection=target({saveData});let frameId=0;
  const items=[0,1].map(index=>{
   const captions=index?[]:[0,4,8,12,16].map(at=>({dataset:{captionAt:String(at)},hidden:!!at}));
   const button=target({attrs:{},setAttribute(n,v){this.attrs[n]=v;}}),rect={top:index?1200:0,bottom:index?1800:600,height:600};
   const host={classList:classes('sector-film'),style:{setProperty(){}},querySelector:()=>button,querySelectorAll:()=>captions,getBoundingClientRect:()=>rect};
   const video=target({dataset:{videoMode:'auto',src:index?'office.mp4':'brand.mp4'},classList:classes(),parentElement:{getBoundingClientRect:()=>rect},paused:true,currentTime:0,duration:20,plays:0,loads:0,src:'',closest:()=>host,getAttribute(n){return this[n];},load(){this.loads++;this.currentTime=0;},play(){this.plays++;return new Promise((resolve,reject)=>{this.pending={resolve,reject};});},pause(){this.paused=true;if(this.pending){const pending=this.pending;this.pending=null;pending.reject({name:'AbortError'});}},finish(){const pending=this.pending;this.pending=null;this.paused=false;this.fire('playing');pending.resolve();}});
   return {video,host,button,rect,captions};
  });
  const doc=target({hidden:false,documentElement:{classList:classes()},querySelectorAll:()=>items.map(i=>i.video)});
  const context={document:doc,navigator:{connection},matchMedia:()=>media,innerWidth:width,innerHeight:800,requestAnimationFrame(fn){frames.push(fn);return ++frameId;},addEventListener:(n,fn)=>global.addEventListener(n,fn),MutationObserver:class{observe(){}}};
  vm.runInNewContext(source,context);
  return {items,doc,connection,media,context,global,async flush(){for(let i=0;i<5;i++){frames.splice(0).forEach(fn=>fn());await Promise.resolve();}assert.equal(frames.length,0);}};
 }
 for(const preference of [{width:767},{reduce:true},{saveData:true}]){
  const s=scene(preference);await s.flush();for(const i of s.items){assert.equal(i.video.loads,0);assert.equal(i.video.plays,0);assert.ok(i.host.classList.contains('video-static'));assert.equal(i.button.hidden,true);}
  assert.equal(s.items[0].captions[0].hidden,false);
 }
 const s=scene();await s.flush();const [brand,office]=s.items;
 assert.equal(brand.video.plays,1);assert.equal(office.video.loads,0);
 // Leaving while play() is pending aborts it without marking the clip unavailable.
 brand.rect.top=1000;brand.rect.bottom=1600;s.global.fire('scroll');await s.flush();
 assert.equal(brand.video.paused,true);assert.equal(brand.host.classList.contains('video-unavailable'),false);
 brand.rect.top=0;brand.rect.bottom=600;s.global.fire('scroll');await s.flush();assert.equal(brand.video.plays,2);
 brand.video.finish();await s.flush();assert.ok(brand.video.classList.contains('ready'));
 for(const [time,index] of [[0,0],[3.99,0],[4,1],[7.99,1],[8,2],[11.99,2],[12,3],[15.99,3],[16,4],[19.99,4],[0,0]]){
  brand.video.currentTime=time;brand.video.fire('timeupdate');assert.deepEqual(brand.captions.map(c=>c.hidden),[0,1,2,3,4].map(i=>i!==index));
 }
 brand.button.fire('click');await s.flush();assert.equal(brand.video.paused,true);assert.equal(brand.button.attrs['aria-pressed'],'true');
 s.global.fire('scroll');await s.flush();assert.equal(brand.video.plays,2);
 brand.button.fire('click');await s.flush();brand.video.finish();await s.flush();
 s.doc.hidden=true;s.doc.fire('visibilitychange');await s.flush();assert.equal(brand.video.paused,true);
 s.doc.hidden=false;s.doc.fire('visibilitychange');await s.flush();brand.video.finish();await s.flush();
 s.connection.saveData=true;s.connection.fire('change');await s.flush();assert.equal(brand.video.paused,true);assert.equal(brand.video.classList.contains('ready'),false);assert.equal(brand.button.hidden,true);assert.equal(brand.captions[0].hidden,false);
 s.connection.saveData=false;s.connection.fire('change');await s.flush();brand.video.finish();await s.flush();
 brand.rect.top=1000;brand.rect.bottom=1600;office.rect.top=0;office.rect.bottom=600;s.global.fire('scroll');await s.flush();office.video.finish();await s.flush();
 assert.equal(brand.video.paused,true);assert.equal(office.video.paused,false);
});
