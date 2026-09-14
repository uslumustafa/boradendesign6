import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from './public/insan/vendor/three.module.js';
// Exercise the actual globe lifecycle without WebGL or a browser dependency.
const node=()=>({style:{},events:{},attrs:{},addEventListener(k,v){this.events[k]=v;},setAttribute(k,v){this.attrs[k]=v;}});
const stage={...node(),clientWidth:600,clientHeight:600,prepend(){}},label=node(),pause=node(),home=node(),canvas=node();
const classes=new Set(),section={querySelector:s=>({'.world-stage':stage,'.world-origin':label,'.world-pause':pause,'.world-home':home})[s],classList:{add:s=>classes.add(s)}};
const media={matches:false,addEventListener(k,v){this.change=v;}},doc={hidden:false,querySelector:()=>section,addEventListener(k,v){this[k]=v;}};
const observers=[],frames=new Map();let id=0,renders=0,lastScene,lastCamera,resize;
const mock={...THREE,WebGLRenderer:class{domElement=canvas;setPixelRatio(){}setClearColor(){}setSize(){}render(s,c){renders++;lastScene=s;lastCamera=c;}},TextureLoader:class{async loadAsync(){return new THREE.Texture();}}};
const source=fs.readFileSync(new URL('./public/insan/world.js',import.meta.url),'utf8').replace("await import('./vendor/three.module.js')",'MOCK');
vm.runInNewContext(source,{document:doc,matchMedia:()=>media,MOCK:mock,devicePixelRatio:2,performance:{now:()=>100},requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:i=>frames.delete(i),IntersectionObserver:class{constructor(fn){observers.push(fn);}observe(){}disconnect(){}},ResizeObserver:class{constructor(fn){resize=fn;}observe(){}}});
assert.equal(renders,0,'Globe must not load until near viewport');
await observers[0]([{isIntersecting:true}]);assert.ok(classes.has('world-ready'));
observers[1]([{isIntersecting:true}]);assert.equal(frames.size,1);
pause.events.click();assert.equal(frames.size,0);observers[1]([{isIntersecting:false}]);observers[1]([{isIntersecting:true}]);assert.equal(frames.size,0,'Manual pause survives return');
pause.events.click();assert.equal(frames.size,1);doc.hidden=true;doc.visibilitychange();assert.equal(frames.size,0);doc.hidden=false;doc.visibilitychange();assert.equal(frames.size,1);
media.matches=true;media.change();assert.equal(frames.size,0);assert.equal(pause.disabled,true);
const globe=lastScene.children.find(c=>c.isGroup),origin=globe.children[2];
const position=origin.position.clone().applyQuaternion(globe.quaternion);
assert.ok(Math.abs(position.x)<1e-9&&Math.abs(position.y)<1e-9&&position.z>1.5,'Turkey faces the visitor');
canvas.events.keydown({key:'ArrowRight',preventDefault(){}});home.events.click();assert.ok(globe.children[2].position.clone().applyQuaternion(globe.quaternion).distanceTo(position)<1e-9,'Home restores Turkey');
observers[1]([{isIntersecting:false}]);assert.equal(frames.size,0);
for(const [w,h] of [[680,690],[355,390]]){
  stage.clientWidth=w;stage.clientHeight=h;resize();
  const coverage=1.555/(Math.sqrt(lastCamera.position.z**2-1.555**2)*Math.tan(lastCamera.fov*Math.PI/360));
  assert.ok(coverage<=1&&coverage/lastCamera.aspect<=1,'Atmosphere fits viewport');
  assert.ok(coverage>.8,'Globe remains close enough on desktop and mobile');
}
media.matches=false;media.change();observers[1]([{isIntersecting:true}]);home.events.click();
let now=100;
function advance(count){for(let i=0;i<count;i++){const fn=frames.values().next().value;assert.ok(fn);frames.clear();now+=50;fn(now);}}
const near=lastCamera.position.z;advance(261);const far=lastCamera.position.z;
assert.ok(far-near>2,'Camera must visibly move away from Turkey');advance(260);assert.ok(Math.abs(lastCamera.position.z-near)<.03,'Camera must return to the close-up');
pause.events.click();assert.equal(frames.size,0,'Pause stops the flight');
pause.events.click();const earlyFrame=frames.values().next().value;frames.clear();assert.doesNotThrow(()=>earlyFrame(99),'A same-frame callback may predate performance.now; progress must never be negative');assert.equal(frames.size,1);pause.events.click();
console.log('PASS: 26-second near/far/near flight, lazy globe, pause persistence, background/offscreen stop, reduced motion, Turkey orientation, keyboard reset');
