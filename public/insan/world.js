// Load the existing Design3 globe only when this closing section approaches.
const section = document.querySelector('.world');
const stage = section.querySelector('.world-stage');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const loader = new IntersectionObserver(async ([entry]) => {
  if (!entry.isIntersecting) return;
  loader.disconnect();
  try { await start(); }
  catch { section.classList.add('world-fallback'); }
}, {rootMargin:'250px'});
loader.observe(section);

async function start() {
  const THREE = await import('./vendor/three.module.js');
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setClearColor(0x080d13,0);
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('role','img');
  canvas.setAttribute('aria-label','Türkiye merkezli dünya küresi. Ok tuşlarıyla döndürün; Home ile Türkiye’ye dönün.');
  stage.prepend(canvas);
  const scene = new THREE.Scene();
  // A restrained star field stays behind the Earth as the camera moves.
  const stars=[];
  for(let i=0;i<180;i++){
    const angle=i*2.39996323,radius=3+((i*37)%100)/13;
    stars.push(Math.cos(angle)*radius,Math.sin(angle)*radius,-5-((i*17)%10));
  }
  const starGeometry=new THREE.BufferGeometry();
  starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));
  scene.add(new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xb4cbe3,size:.012,transparent:true,opacity:.55,depthWrite:false})));

  const camera = new THREE.PerspectiveCamera(39,1,.1,100);
  camera.position.z = 2.65;
  const globe = new THREE.Group();
  scene.add(globe);
  scene.add(new THREE.AmbientLight(0x668fb8,.075));
  const sun = new THREE.DirectionalLight(0x94c9ff,2.2);
  sun.position.set(-4,2,-2.8);scene.add(sun);
  const fill = new THREE.DirectionalLight(0x326b9d,.25);
  fill.position.set(3,-1,4);scene.add(fill);
  const textures = new THREE.TextureLoader();
  const load = name => textures.loadAsync('./earth/'+name);
  const [lights,clouds] = await Promise.all([load(stage.clientWidth<800?'nasa-night-mobile.jpg':'nasa-night.jpg'),load('earth_clouds.png')]);
  lights.colorSpace=THREE.SRGBColorSpace;
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.5,64,48),new THREE.MeshPhongMaterial({map:lights,emissiveMap:lights,emissive:0xffffff,emissiveIntensity:.95,shininess:12})));
  globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.516,64,48),new THREE.MeshPhongMaterial({map:clouds,transparent:true,opacity:.08,depthWrite:false})));
  function point(lat,lon,r=1.52) {
    const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
    return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
  }
  const turkey=point(39,35);
  const home=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),39*Math.PI/180).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.atan2(-turkey.x,turkey.z)));
  globe.quaternion.copy(home);
  const origin = new THREE.Mesh(new THREE.SphereGeometry(.008,16,12),new THREE.MeshBasicMaterial({color:0xff784d}));
  origin.position.copy(turkey);globe.add(origin);
  const ring = new THREE.Mesh(new THREE.RingGeometry(.015,.018,40),new THREE.MeshBasicMaterial({color:0xff936e,side:THREE.DoubleSide,transparent:true,opacity:.8}));
  ring.position.copy(turkey.clone().multiplyScalar(1.002));ring.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),turkey.clone().normalize());globe.add(ring);
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.555,64,48),new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec3 vNormal; varying vec3 vView; void main(){vec4 p=modelViewMatrix*vec4(position,1.0);vNormal=normalize(normalMatrix*normal);vView=-p.xyz;gl_Position=projectionMatrix*p;}',
    fragmentShader:'varying vec3 vNormal; varying vec3 vView; void main(){float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vView)),0.0),3.5);gl_FragColor=vec4(0.18,0.48,0.78,rim*0.85);}'
  }));
  globe.add(atmosphere);
  // Illustrative directions, never office locations or claims of operations.
  const routes=[[48,10],[38,-97],[-14,-58],[2,24],[34,100],[-25,134]];
  const paths=[],dots=[];
  routes.forEach(([lat,lon],i)=>{
    const end=point(lat,lon),points=[];
    for(let j=0;j<=70;j++){const t=j/70;points.push(turkey.clone().lerp(end,t).normalize().multiplyScalar(1.52+Math.sin(Math.PI*t)*.3));}
    const path=new THREE.CatmullRomCurve3(points),color=[0x62b0db,0xee875f,0x7fc895][i%3];
    globe.add(new THREE.Mesh(new THREE.TubeGeometry(path,100,.0016,5,false),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.42})));
    const dot=new THREE.Mesh(new THREE.SphereGeometry(.006,12,8),new THREE.MeshBasicMaterial({color}));
    globe.add(dot);paths.push(path);dots.push(dot);
  });
  const label=section.querySelector('.world-origin');
  const pause=section.querySelector('.world-pause');
  let visible=false,paused=false,frame=0,last=0,elapsed=0,returning=false,drag=null;
  let flightTime=0;
  function cameraPosition(){
    // A 26-second breathing orbit: Turkey close-up → full Earth → Turkey.
    const journey=reduced.matches?1:(1-Math.cos(2*Math.PI*flightTime/26))/2;
    camera.position.z=(2.65+2.35*journey)/Math.min(1,camera.aspect);
  }
  function draw(){
    globe.updateMatrixWorld(true);
    const p=turkey.clone().applyMatrix4(globe.matrixWorld),front=p.z>0;
    p.project(camera);
    label.style.opacity=front?'1':'0';
    label.style.left=(p.x*.5+.5)*stage.clientWidth+'px';
    label.style.top=(-p.y*.5+.5)*stage.clientHeight+'px';
    renderer.render(scene,camera);
  }
  function tick(now){
    frame=0;const dt=Math.max(0,Math.min((now-last)/1000,.25));last=now;elapsed+=dt;
    if(!drag&&!returning)flightTime+=dt;
    cameraPosition();
    if(returning){globe.quaternion.slerp(home,1-Math.exp(-dt*4));if(globe.quaternion.angleTo(home)<.002)returning=false;}
    else if(!drag&&elapsed>3)globe.rotateY(dt*.012*Math.cos(elapsed*.10));
    globe.children[1].rotation.y+=dt*.006;
    ring.scale.setScalar(1+Math.sin(elapsed*2)*.12);
    dots.forEach((dot,i)=>dot.position.copy(paths[i].getPoint((elapsed*.12+i/6)%1)));
    draw();frame=requestAnimationFrame(tick);
  }
  function sync(){
    cancelAnimationFrame(frame);frame=0;
    const playing=visible&&!document.hidden&&!paused&&!reduced.matches;
    pause.textContent=paused||reduced.matches?'Hareketi başlat':'Hareketi durdur';
    pause.disabled=reduced.matches;
    pause.setAttribute('aria-pressed',String(playing));
    cameraPosition();
    if(playing){last=performance.now();frame=requestAnimationFrame(tick);}else draw();
  }
  function resize(){renderer.setSize(stage.clientWidth,stage.clientHeight);camera.aspect=stage.clientWidth/stage.clientHeight;cameraPosition();
    camera.setViewOffset(stage.clientWidth,stage.clientHeight,stage.clientWidth>900?-stage.clientWidth*.18:0,0,stage.clientWidth,stage.clientHeight);
    camera.updateProjectionMatrix();draw();}
  new ResizeObserver(resize).observe(stage);resize();
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.05}).observe(stage);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  pause.addEventListener('click',()=>{paused=!paused;sync();});
  const reset=()=>{elapsed=0;flightTime=0;returning=true;cameraPosition();if(!frame){globe.quaternion.copy(home);returning=false;draw();}};
  section.querySelector('.world-home').addEventListener('click',reset);
  canvas.addEventListener('keydown',e=>{
    if(e.key==='Home'){e.preventDefault();reset();return;}
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
    e.preventDefault();returning=false;elapsed=0;
    if(e.key==='ArrowLeft'||e.key==='ArrowRight')globe.rotateY(e.key==='ArrowLeft'?-.12:.12);
    else globe.rotateX(e.key==='ArrowUp'?-.12:.12);
    draw();
  });
  canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;drag=[e.clientX,e.clientY];returning=false;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!drag)return;globe.rotateY((e.clientX-drag[0])*.004);globe.rotateX((e.clientY-drag[1])*.004);drag=[e.clientX,e.clientY];elapsed=0;draw();});
  const release=()=>{drag=null;};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);
  section.classList.add('world-ready');
}
