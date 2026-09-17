import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const code = fs.readFileSync(new URL('./public/insan/opening.js', import.meta.url), 'utf8');
function setup(reduce = false, saveData = false) {
  const events = {}, documentEvents = {}, attributes = {};
  const video = {setAttribute:(k,v)=>attributes[k]=v,paused:true, muted:false, duration:8, currentTime:2, addEventListener:(n,f)=>events[n]=f, play(){this.paused=false;events.play?.();return Promise.resolve();}, pause(){this.paused=true;events.pause?.();}};
  const media={matches:reduce,addEventListener:(n,f)=>media.change=f};
  const document={hidden:false,querySelector:s=>s==='#people'?video:null,querySelectorAll:()=>[],addEventListener:(n,f)=>documentEvents[n]=f};
  let intersection;
  vm.runInNewContext(code,{document,window:{matchMedia:()=>media},navigator:{connection:{saveData}},IntersectionObserver:class{constructor(fn){intersection=fn;}observe(){}}});
  return {video,events,attributes,media,document,documentEvents,enter:v=>intersection([{isIntersecting:v}]),click:()=>events.click()};
}
const a=setup();a.enter(true);assert.equal(a.video.paused,false);assert.equal(a.video.muted,true);assert.match(a.attributes['aria-label'],/Filmi durdur/);
a.click();assert.equal(a.video.paused,true);a.enter(false);a.enter(true);assert.equal(a.video.paused,true,'Manual pause must survive viewport return');
a.click();assert.equal(a.video.paused,false);a.document.hidden=true;a.documentEvents.visibilitychange();assert.equal(a.video.paused,true);a.document.hidden=false;a.documentEvents.visibilitychange();assert.equal(a.video.paused,false);
for(const restricted of [setup(true),setup(false,true)]){restricted.enter(true);assert.equal(restricted.video.paused,true);restricted.click();assert.equal(restricted.video.paused,false);}
a.media.matches=true;a.media.change();assert.equal(a.video.paused,true);
const masked=setup();masked.enter(true);masked.documentEvents['boraden:film-visibility']({detail:{covered:true}});assert.equal(masked.video.paused,true,'Covered film must stop even while its sticky box intersects');masked.documentEvents['boraden:film-visibility']({detail:{covered:false}});assert.equal(masked.video.paused,false);masked.click();masked.documentEvents['boraden:film-visibility']({detail:{covered:true}});masked.documentEvents['boraden:film-visibility']({detail:{covered:false}});assert.equal(masked.video.paused,true,'Uncovering must not override manual pause');
const end=setup();end.enter(true);end.video.ended=true;end.video.paused=true;end.events.ended();assert.match(end.attributes['aria-label'],/Yeniden izle/);end.enter(false);end.enter(true);assert.equal(end.video.paused,true,'Finished film must never restart automatically');
Object.defineProperty(end.video,'currentTime',{get(){return 0;},set(){this.ended=false;}});end.click();assert.equal(end.video.paused,false,'Explicit replay starts the film');
const keyboard=setup();keyboard.enter(true);let prevented=false;keyboard.events.keydown({key:' ',preventDefault(){prevented=true;}});assert.equal(keyboard.video.paused,true);assert.equal(prevented,true);keyboard.events.keydown({key:'Enter',preventDefault(){}});assert.equal(keyboard.video.paused,false);
const html=fs.readFileSync(new URL('./public/insan/index.html',import.meta.url),'utf8');
assert.ok(!/class="(?:hero-bottom|film-progress)"/.test(html),'Film has no visible overlay controls');
assert.ok(!/<video[^>]*\bloop\b/.test(html),'The film cannot loop');
const built=fs.readFileSync(new URL('./dist/insan/index.html',import.meta.url),'utf8');
assert.ok(!built.includes('puzzle-piece'),'The editorial opening no longer uses puzzle navigation');
assert.equal((built.match(/class="mega-area"/g)||[]).length,6,'Six service groups remain discoverable in navigation');
const directory=built.split('class="service-story-chapters"')[1].split('</section>')[0];
assert.equal((directory.match(/href="\/hizmetler\/alan\//g)||[]).length,6,'All six service fields are direct links without JavaScript');
for(const [,href] of built.matchAll(/href="(\/[^"#]*)"/g)){const target=new URL('./dist'+href+(href.endsWith('/')?'index.html':''),import.meta.url);assert.ok(fs.existsSync(target),href);}
console.log('PASS: muted playback, pause persistence, visibility, reduced motion, data saver, navigation targets');

const hub=fs.readFileSync(new URL('./dist/hesaplama/index.html',import.meta.url),'utf8');
for(const url of ['/insan/araclar/#arac-amortisman','/hesaplama/gelir-vergisi/','/hesaplama/kdv/','/hesaplama/brut-net-maas/'])assert.ok(hub.includes('href="'+url+'"'));
assert.ok(!built.includes('⌄</span></summary>'));
