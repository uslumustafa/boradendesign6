import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from './public/insan/vendor/three.module.js';
// Exercise the actual globe lifecycle without WebGL or a browser dependency.
const node=()=>({style:{},events:{},attrs:{},addEventListener(k,v){this.events[k]=v;},setAttribute(k,v){this.attrs[k]=v;}});
const stage={...node(),clientWidth:600,clientHeight:600,prepend(){}},label=node(),orbisLabel=node(),pause=node(),home=node(),canvas=node();
const captured=new Set();canvas.setPointerCapture=id=>captured.add(id);canvas.hasPointerCapture=id=>captured.has(id);canvas.releasePointerCapture=id=>captured.delete(id);
const classes=new Set(),section={querySelector:s=>({'.world-stage':stage,'.world-origin':label,'.world-orbis':orbisLabel,'.world-pause':pause,'.world-home':home})[s],classList:{add:s=>classes.add(s)}};
const media={matches:false,addEventListener(k,v){this.change=v;}},doc={hidden:false,querySelector:()=>section,addEventListener(k,v){this[k]=v;}};
const textureURLs=[],observers=[],frames=new Map();let id=0,renders=0,lastScene,lastCamera,resize;
const mock={...THREE,WebGLRenderer:class{domElement=canvas;setPixelRatio(){}setClearColor(){}setSize(){}render(s,c){renders++;lastScene=s;lastCamera=c;}},TextureLoader:class{async loadAsync(url){textureURLs.push(url);return new THREE.Texture();}}};
const source=fs.readFileSync(new URL('./public/insan/world.js',import.meta.url),'utf8').replace("await import('./vendor/three.module.js')",'MOCK');
vm.runInNewContext(source,{document:doc,matchMedia:()=>media,MOCK:mock,devicePixelRatio:2,performance:{now:()=>100},requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:i=>frames.delete(i),IntersectionObserver:class{constructor(fn){observers.push(fn);}observe(){}disconnect(){}},ResizeObserver:class{constructor(fn){resize=fn;}observe(){}}});
assert.equal(renders,0,'Globe must not load until near viewport');
await observers[0]([{isIntersecting:true}]);assert.ok(classes.has('world-ready'));
assert.equal(textureURLs.length,2);
for(const route of ['/', '/insan/']) for(const url of textureURLs){
  const resolved=new URL(url,'https://boraden.example'+route);
  assert.ok(resolved.pathname.startsWith('/insan/earth/'),'Textures resolve from root and /insan/');
  assert.ok(fs.existsSync(new URL('./public'+resolved.pathname,import.meta.url)),'Texture exists in published assets');
}
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
advance(1); // Complete an already-home reset.
const fixedDistance=lastCamera.position.z,initialRotation=globe.quaternion.clone();
advance(1);assert.ok(globe.quaternion.angleTo(initialRotation)>0,'Rotation starts without a waiting period');
for(let i=0;i<520;i++){advance(1);assert.equal(lastCamera.position.z,fixedDistance,'Camera distance never oscillates');}
assert.ok(globe.quaternion.angleTo(initialRotation)>.5,'Earth rotates at fixed distance');
assert.ok(globe.getObjectByName('turkey-orbis-route'),'Turkey to England route exists');
const continents=['europe','asia','africa','north-america','south-america','australia','antarctica'];
assert.equal(globe.children.filter(child=>child.name.startsWith('continent-')).length,7,'Seven continental routes in addition to Orbis');
for(const name of continents){
  const path=globe.getObjectByName('continent-'+name).geometry.parameters.path;
  assert.ok(path.getPoint(0).distanceTo(origin.position)<1e-8,'Every continental route starts in Turkey');
  assert.ok(path.getPoint(1).distanceTo(origin.position)>.1,'Each route reaches a distinct destination');
}
const arrow=globe.getObjectByName('orbis-arrow');assert.ok(arrow,'Directional arrow exists');
const route=globe.getObjectByName('turkey-orbis-route').geometry.parameters.path;
assert.ok(new THREE.Vector3(0,1,0).applyQuaternion(arrow.quaternion).dot(route.getTangent(.91))>.999,'Arrow points toward England');
const html=fs.readFileSync(new URL('./public/insan/index.html',import.meta.url),'utf8');
assert.match(html,/class="world-orbis"[^>]*><strong>ORBIST<\/strong>/);
assert.match(html,/class="world-connection"[\s\S]*?<strong>ORBIST<\/strong>/,'Orbis remains readable without WebGL');
assert.doesNotMatch(html,/<a[^>]*href="[^"]*orbis/i,'Do not invent an Orbis URL');

// Drag follows screen axes even when the Earth is tilted or upside down.
const beforeDrag=globe.quaternion.clone();
const orientations=[beforeDrag,new THREE.Quaternion().setFromEuler(new THREE.Euler(.9,1.7,2.5))];
const pointer=(x,y,id=1)=>({clientX:x,clientY:y,pointerId:id,pointerType:'mouse',button:0});
for(const orientation of orientations){
 for(const [dx,dy] of [[40,0],[-40,0],[0,40],[0,-40]]){
  globe.quaternion.copy(orientation);
  const front=new THREE.Vector3(0,0,1.5).applyQuaternion(orientation.clone().invert());
  canvas.events.pointerdown(pointer(100,100));
  canvas.events.pointermove(pointer(100+dx,100+dy));
  const moved=front.applyQuaternion(globe.quaternion);
  if(dx){assert.ok(moved.x*dx>0,'Horizontal drag follows the pointer');assert.ok(Math.abs(moved.y)<1e-9,'Horizontal drag cannot drift vertically after tilt');}
  else{assert.ok(moved.y*dy<0,'Vertical drag follows screen direction');assert.ok(Math.abs(moved.x)<1e-9,'Vertical drag cannot drift sideways after tilt');}
  const held=globe.quaternion.clone();advance(1);assert.ok(globe.quaternion.angleTo(held)<1e-7,'Automatic spin stays suspended during drag');
  canvas.events.pointerup(pointer(100+dx,100+dy));
  assert.equal(captured.size,0,'Release clears pointer capture');
 }
}
globe.quaternion.copy(beforeDrag);
canvas.events.pointerdown({...pointer(100,100),button:2});canvas.events.pointermove(pointer(200,100));assert.ok(globe.quaternion.angleTo(beforeDrag)<1e-7,'Right button cannot rotate');
canvas.events.pointerdown(pointer(100,100));canvas.events.pointermove(pointer(200,100,2));assert.ok(globe.quaternion.angleTo(beforeDrag)<1e-7,'Other pointers cannot hijack drag');
canvas.events.pointercancel(pointer(100,100));canvas.events.pointermove(pointer(200,100));assert.ok(globe.quaternion.angleTo(beforeDrag)<1e-7,'Cancelled drag stops accepting motion');
canvas.events.pointerdown(pointer(100,100));captured.delete(1);canvas.events.lostpointercapture(pointer(100,100));advance(1);assert.ok(globe.quaternion.angleTo(beforeDrag)>0,'Capture loss resumes automatic spin');
globe.quaternion.copy(orientations[1]);const keyFront=new THREE.Vector3(0,0,1.5).applyQuaternion(globe.quaternion.clone().invert());canvas.events.keydown({key:'ArrowRight',preventDefault(){}});const keyMoved=keyFront.applyQuaternion(globe.quaternion);assert.ok(keyMoved.x>0&&Math.abs(keyMoved.y)<1e-9,'Keyboard shares screen axes');

pause.events.click();assert.equal(frames.size,0,'Pause stops rotation');
pause.events.click();const earlyFrame=frames.values().next().value;frames.clear();assert.doesNotThrow(()=>earlyFrame(99),'A same-frame callback may predate performance.now; progress must never be negative');assert.equal(frames.size,1);pause.events.click();
console.log('PASS: fixed distance over 26 seconds, immediate rotation, Turkey–Orbis arrow, honest link fallback, lazy globe, pause, visibility, reduced motion, responsive fit, keyboard reset');
