import * as T from './vendor/three.module.js';
import {COLORS} from './model.mjs';

function rounded(w,h,d,r=.02){
 r=Math.max(.0003,Math.min(r,w/2-.0002,h/2-.0002));
 const s=new T.Shape();s.moveTo(r,0);s.lineTo(w-r,0);s.quadraticCurveTo(w,0,w,r);s.lineTo(w,h-r);s.quadraticCurveTo(w,h,w-r,h);s.lineTo(r,h);s.quadraticCurveTo(0,h,0,h-r);s.lineTo(0,r);s.quadraticCurveTo(0,0,r,0);
 const bevel=Math.min(.004,w*.06,h*.06,d*.08),g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelThickness:bevel,bevelSize:bevel,bevelSegments:2,steps:1,curveSegments:8});g.translate(-w/2,-h/2,-d/2);return g;
}
function mesh(parent,geometry,material,x=0,y=0,z=0){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;parent.add(m);return m;}
const group=(p,name,x=0,y=0,z=0)=>{const g=new T.Group();g.name=name;g.position.set(x,y,z);p.add(g);return g;};
// Smooth elliptical cross-sections form curved shells rather than stacked boxes.
function shellGeometry(profile,segments=32,rings=28){
 const curve=new T.CatmullRomCurve3(profile.map(([y,x,z])=>new T.Vector3(x,y,z))),positions=[],uv=[],indices=[];
 for(let j=0;j<=rings;j++){const p=curve.getPoint(j/rings),rx=Math.max(0,p.x),rz=Math.max(0,p.z);for(let i=0;i<=segments;i++){const a=i/segments*Math.PI*2;positions.push(Math.sin(a)*rx,p.y,Math.cos(a)*rz);uv.push(i/segments,j/rings);}}
 for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i,b=a+segments+1;indices.push(a,a+1,b,b,a+1,b+1);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function createRobot(config){
 const root=new T.Group();root.name='N25x-personal-humanoid';
 const frame=config.frame||'balanced',finish=config.finish||'ceramic',width=frame==='athletic'?1.13:frame==='slender'?.90:1;
 const tint=new T.Color(COLORS[config.color]||COLORS.pearl);
 const shell=new T.MeshPhysicalMaterial({color:tint,metalness:finish==='titanium'?.88:finish==='satin'?.48:.22,roughness:finish==='satin'?.47:finish==='titanium'?.25:.27,clearcoat:finish==='ceramic'?.9:.45,clearcoatRoughness:.18});
 const alloy=new T.MeshStandardMaterial({color:0x96a9ba,metalness:.92,roughness:.27}),dark=new T.MeshStandardMaterial({color:0x090e17,metalness:.62,roughness:.32});
 const glass=new T.MeshPhysicalMaterial({color:0x03070e,metalness:.36,roughness:.13,clearcoat:1,clearcoatRoughness:.09});
 const accentColor=new T.Color(config.interest==='nature'?0x8ce8c5:config.interest==='music'?0xb6a0f5:0x81deef),accent=new T.MeshBasicMaterial({color:accentColor,toneMapped:false});
 const sphere=new T.SphereGeometry(1,24,16),cylinder=new T.CylinderGeometry(1,1,1,24);
 const box=(p,w,h,d,m,x=0,y=0,z=0,r=.02)=>mesh(p,rounded(w,h,d,r),m,x,y,z);
 const ellipsoid=(p,rx,ry,rz,m,x=0,y=0,z=0)=>{const o=mesh(p,sphere,m,x,y,z);o.scale.set(rx,ry,rz);return o;};
 const cyl=(p,r,h,m,x=0,y=0,z=0)=>{const o=mesh(p,cylinder,m,x,y,z);o.scale.set(r,h,r);return o;};
 const ring=(p,r,t,m,x=0,y=0,z=0)=>mesh(p,new T.TorusGeometry(r,t,6,32),m,x,y,z);
 const line=(p,points,r,m)=>mesh(p,new T.TubeGeometry(new T.CatmullRomCurve3(points.map(v=>new T.Vector3(...v))),32,r,6,false),m);
 const shellPart=(p,profile,m,x=0,y=0,z=0)=>mesh(p,shellGeometry(profile),m,x,y,z);
 const body=group(root,'torso',0,1.12,0),hips=group(root,'pelvis',0,1.035,0);
 shellPart(body,[[-.075,0,0],[-.06,.126*width,.077],[.02,.145*width,.086],[.15,.197*width,.105],[.285,.215*width,.094],[.37,.175*width,.069],[.398,.075,.045],[.4,0,0]],shell);
 shellPart(body,[[-.13,0,0],[-.12,.112,.066],[-.06,.135,.078],[.04,.132,.078],[.08,.11,.063],[.085,0,0]],dark);
 for(let i=0;i<3;i++){const rib=ring(body,.115-i*.003,.006,alloy,0,-.085+i*.026,0);rib.rotation.x=Math.PI/2;rib.scale.y=.65;}
 // Recessed sternum seam, shoulder insets and a subtle status strip.
 line(body,[[0,.34,.083],[0,.22,.109],[0,.12,.108],[0,.07,.095]],.0018,dark);
 for(const side of [-1,1]){line(body,[[side*.08,.338,.070],[side*.16*width,.30,.081],[side*.194*width,.23,.092]],.0022,alloy);box(body,.036,.004,.003,accent,side*.068,.24,.106,.001);}
 box(body,.053,.012,.004,dark,0,.29,.092,.004);box(body,.034,.002,.004,accent,0,.29,.095,.0007);
 shellPart(hips,[[-.08,0,0],[-.064,.103,.065],[.015,.151*width,.080],[.061,.128*width,.075],[.072,0,0]],dark);
 for(const side of [-1,1]){
  const plate=ellipsoid(hips,.045,.081,.065,shell,side*.133*width,-.012,.006);plate.rotation.z=side*.12;
  const motor=cyl(hips,.052,.022,alloy,side*.150*width,-.035,-.012);motor.rotation.z=Math.PI/2;
 }
 const neck=group(body,'neck',0,.455,0);cyl(neck,.036,.180,dark);cyl(neck,.052,.016,alloy,0,-.060,0);
 const head=group(body,'head',0,.625,.002);
 shellPart(head,[[-.125,0,0],[-.112,.040,.041],[-.071,.073,.067],[.015,.085,.074],[.082,.071,.063],[.119,.032,.037],[.126,0,0]],glass);
 const face=ellipsoid(head,config.head==='visor'?.079:.071,.102,.029,glass,0,-.001,.059);face.name='dark-faceplate';
 for(const side of [-1,1]){
  const temple=cyl(head,.026,.008,alloy,side*.077,.005,-.012);temple.rotation.z=Math.PI/2;
  const inset=cyl(head,.018,.009,dark,side*.082,.005,-.012);inset.rotation.z=Math.PI/2;
 }
 if(config.head==='visor')line(head,[[-.063,.045,.076],[-.03,.052,.086],[.03,.052,.086],[.063,.045,.076]],.0016,accent);
 else if(config.head==='antenna'){
  for(const side of [-1,1]){box(head,.012,.057,.019,alloy,side*.080,.063,-.022,.004);box(head,.003,.026,.018,accent,side*.087,.069,-.021,.001);}
  line(head,[[-.038,-.08,.076],[0,-.091,.080],[.038,-.08,.076]],.0014,accent);
 }else{
  for(const side of [-1,1])line(head,[[side*.034,.103,.054],[side*.060,.074,.070],[side*.066,.013,.082],[side*.044,-.077,.074]],.0015,alloy);
  box(head,.025,.0025,.003,accent,0,.045,.088,.001);
 }
 const arms=[],elbows=[],wrists=[],fingers=[];
 function hand(parent,side){
  const wrist=group(parent,'wrist:'+side,0,-.273,.003);cyl(wrist,.024,.030,alloy);const palm=group(wrist,'hand:'+side,0,-.048,0);
  box(palm,.070,.076,.032,dark,0,0,0,.018);box(palm,.062,.061,.014,shell,0,.004,-.018,.014);
  if(config.hands==='clamp'){
   for(const sign of [-1,1]){const jaw=group(palm,'gripper',sign*.032,-.030,0);jaw.rotation.z=sign*.14;box(jaw,.015,.075,.024,alloy,0,-.027,.005,.005);box(jaw,.018,.017,.035,dark,-sign*.005,-.061,.010,.004);}
  }else{
   for(let f=0;f<5;f++){
    const thumb=f===4,L=thumb?[.030,.025,.019]:[.034,.026,.019].map(v=>v*([.84,1,.95,.76][f]));
    const digit=group(palm,(thumb?'thumb:':'finger:')+side+':'+f,thumb?-side*.037:(f-1.5)*.017,thumb?-.010:-.036,thumb?.005:0);
    if(thumb){digit.rotation.z=-side*.83;digit.rotation.y=side*.32;}
    let bone=digit;const joints=[];
    for(let j=0;j<3;j++){
     if(j)bone=group(bone,'phalanx:'+j,0,-L[j-1],0);
     const radius=(thumb?.0075:.0068)*(1-j*.15);cyl(bone,radius*.85,.010,dark,0,0,0).rotation.x=Math.PI/2;
     const phalanx=mesh(bone,new T.CapsuleGeometry(radius,Math.max(.003,L[j]-radius*2),3,8),j===2?alloy:shell,0,-L[j]/2,0);phalanx.name='finger-shell';joints.push(bone);
    }
    fingers.push({joints,thumb});
   }
  }
  return wrist;
 }
 for(const side of [-1,1]){
  const axle=cyl(body,.029,.11,alloy,side*.213*width,.365,0);axle.rotation.z=Math.PI/2;
  const shoulder=group(body,'shoulder:'+side,side*.258*width,.405,0);ellipsoid(shoulder,.052,.055,.053,dark);
  const cap=ellipsoid(shoulder,.063,.081,.066,shell,side*.014,-.034,0);cap.rotation.z=side*.16;
  shellPart(shoulder,[[-.277,0,0],[-.266,.031,.035],[-.21,.040,.043],[-.10,.049,.047],[-.047,.045,.041],[-.040,0,0]],shell);
  const elbow=group(shoulder,'elbow:'+side,0,-.294,0);ellipsoid(elbow,.039,.043,.039,dark);const servo=cyl(elbow,.029,.087,alloy);servo.rotation.z=Math.PI/2;
  shellPart(elbow,[[-.255,0,0],[-.245,.026,.028],[-.17,.038,.039],[-.067,.046,.044],[-.026,.033,.030],[-.020,0,0]],shell);
  line(elbow,[[side*.033,-.053,-.013],[side*.034,-.14,-.017],[side*.022,-.23,-.011]],.003,dark);
  const wrist=hand(elbow,side);arms.push(shoulder);elbows.push(elbow);wrists.push(wrist);
 }
 const legs=[],knees=[],ankles=[],footMeshes=[],wheels=[];
 for(const side of [-1,1]){
  const leg=group(root,'hip:'+side,side*.103*width,.975,0);ellipsoid(leg,.052,.048,.051,alloy);
  shellPart(leg,[[-.350,0,0],[-.343,.035,.042],[-.26,.056,.060],[-.11,.073,.071],[-.038,.069,.060],[-.026,0,0]],shell);
  const knee=group(leg,'knee:'+side,0,-.370,0);ellipsoid(knee,.043,.046,.045,dark);const motor=cyl(knee,.032,.094,alloy);motor.rotation.z=Math.PI/2;
  ellipsoid(knee,.040,.060,.022,shell,0,-.010,.041);
  shellPart(knee,[[-.358,0,0],[-.347,.031,.035],[-.25,.039,.049],[-.10,.056,.057],[-.040,.041,.041],[-.032,0,0]],shell);
  line(knee,[[side*.027,-.07,-.032],[side*.036,-.19,-.038],[side*.022,-.32,-.025]],.0035,alloy);
  const ankle=group(knee,'ankle:'+side,0,-.385,0);ellipsoid(ankle,.031,.037,.033,dark);
  cyl(ankle,.024,.064,dark,0,-.049,-.018);
  const foot=group(ankle,'foot:'+side,0,-.093,.046);
  const sole=box(foot,.106,.027,.248,dark,0,-.033,0,.032);sole.name='sole';footMeshes.push(sole);
  ellipsoid(foot,.052,.047,.122,dark,0,-.004,.003);box(foot,.061,.012,.048,alloy,0,.026,-.062,.007);
  if(config.base==='wheels')for(const edge of [-1,1]){const w=cyl(foot,.034,.018,dark,edge*.057,-.013,-.062);w.rotation.z=Math.PI/2;wheels.push(w);const hub=cyl(foot,.017,.020,alloy,edge*.057,-.013,-.062);hub.rotation.z=Math.PI/2;}
  if(config.base==='hover')for(const edge of [-1,1]){cyl(foot,.017,.035,alloy,edge*.035,-.014,.048);cyl(foot,.013,.007,accent,edge*.035,-.036,.048);}
  legs.push(leg);knees.push(knee);ankles.push(ankle);
 }
 const module=group(body,'module',0,.13,-.11);
 if(config.module==='speaker'){
  box(module,.22,.26,.055,dark,0,0,-.019,.025);
  for(const x of [-.054,.054])for(let i=0;i<5;i++)box(module,.027,.003,.004,alloy,x,-.065+i*.033,-.050,.001);
  box(body,.034,.003,.003,accent,.109,.28,.091,.001);
 }
 if(config.module==='projector'){
  box(body,.051,.035,.052,alloy,.15,.343,.04,.008);
  const holo=mesh(root,new T.IcosahedronGeometry(.055,0),new T.MeshBasicMaterial({color:0x93e6f4,wireframe:true,transparent:true,opacity:.72}),.31,1.59,.10);ring(root,.077,.0016,accent,.31,1.51,.10).rotation.x=Math.PI/2;module.userData.holo=holo;
 }
 if(config.module==='orbit'){const orbit=ring(root,.38,.002,accent,0,1.19,0);orbit.rotation.x=1.1;orbit.rotation.z=.25;module.userData.orbit=orbit;}
 let phase=0;const baseY=config.base==='hover'?.055:0;
 root.position.y=baseY;
 function update(dt,time,action='idle',amount=0){
  phase+=dt;const p=amount*Math.PI*2,stepping=action==='step';root.rotation.y=action==='turn'?p:0;root.position.set(0,baseY+(config.base==='hover'?Math.sin(time*1.7)*.009:0)-(stepping?.020:0),0);
  body.rotation.z=Math.sin(time*.75)*.004;body.rotation.y=Math.sin(time*.5)*.009;head.rotation.set(action==='nod'?Math.sin(p*2)*.13:0,Math.sin(time*(config.personality==='focused'?.4:.65))*.045,config.personality==='cheerful'?.018:0);
  arms.forEach((a,i)=>{a.rotation.set(-.025,0,(i?1:-1)*.075);elbows[i].rotation.set(-.10,0,0);wrists[i].rotation.set(0,(i?1:-1)*.12,0);});
  fingers.forEach(f=>f.joints.forEach((joint,j)=>{joint.rotation.x=action==='wave'?-0.035:-.12-j*.06;}));
  legs.forEach((leg,i)=>{leg.rotation.x=0;knees[i].rotation.x=0;ankles[i].rotation.x=0;
   if(stepping){const q=p*2+i*Math.PI,lift=Math.max(0,Math.sin(q))*.055,z=Math.cos(q)*.075,dy=.735-lift,d=Math.min(.754,Math.hypot(dy,z)),a=Math.atan2(-z,dy)-Math.acos(T.MathUtils.clamp((.370**2+d*d-.385**2)/(2*.370*d),-1,1)),b=Math.PI-Math.acos(T.MathUtils.clamp((.370**2+.385**2-d*d)/(2*.370*.385),-1,1));leg.rotation.x=a;knees[i].rotation.x=b;ankles[i].rotation.x=-(a+b);arms[i].rotation.x=-Math.sin(q)*.16;}
  });
  if(action==='wave'){arms[1].rotation.z=1.65;elbows[1].rotation.z=.88;wrists[1].rotation.x=Math.sin(p*2)*.22;head.rotation.z=-.035;}
  accent.color.copy(accentColor).multiplyScalar(action==='glow'?1.2+Math.sin(p*3)*.3:.86);
  wheels.forEach(w=>w.rotation.y=stepping?p*3:0);
  if(module.userData.holo)module.userData.holo.rotation.y=time*.65;if(module.userData.orbit)module.userData.orbit.rotation.z=.25+time*.12;
 }
 update(0,0);
 return {root,body,head,arms,elbows,wrists,legs,knees,ankles,fingers,footMeshes,anatomy:{frame,finish,height:1.79,humanoid:true},get phase(){return phase;},update,dispose(){const gs=new Set([sphere,cylinder]),ms=new Set([shell,alloy,dark,glass,accent]);root.traverse(o=>{if(o.geometry)gs.add(o.geometry);if(o.material)ms.add(o.material);});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}};
}
export function createStage(canvas,onError=()=>{}){
 let renderer;try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,preserveDrawingBuffer:true,powerPreference:'high-performance'});}catch{onError();return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;renderer.shadowMap.enabled=innerWidth>700;renderer.shadowMap.type=T.PCFSoftShadowMap;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(32,1,.1,40);let yaw=.28;const target=new T.Vector3(0,1.02,0);
 scene.add(new T.HemisphereLight(0x9cb9dc,0x080d17,.9));const key=new T.DirectionalLight(0xfff5e9,3.6);key.position.set(-3,5,5);key.castShadow=true;key.shadow.mapSize.setScalar(1024);key.shadow.camera.left=-3;key.shadow.camera.right=3;key.shadow.camera.top=4;key.shadow.camera.bottom=-2;key.shadow.normalBias=.03;scene.add(key);const rim=new T.DirectionalLight(0x8de4ff,3.0);rim.position.set(3,2,-3);scene.add(rim);const fill=new T.DirectionalLight(0xacc8ed,1.8);fill.position.set(3,2,4);scene.add(fill);
 const faces=[];for(let i=0;i<6;i++){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d'),g=ctx.createLinearGradient(0,0,128,128);g.addColorStop(0,i===2?'#b7c9dd':'#26374c');g.addColorStop(.42,'#64778c');g.addColorStop(.50,'#1d2b40');g.addColorStop(1,'#060a12');ctx.fillStyle=g;ctx.fillRect(0,0,128,128);ctx.fillStyle='#ffffff';ctx.fillRect(12,0,14,110);ctx.fillRect(80,12,6,85);faces.push(c);}const cube=new T.CubeTexture(faces);cube.colorSpace=T.SRGBColorSpace;cube.needsUpdate=true;const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromCubemap(cube);scene.environment=env.texture;cube.dispose();pmrem.dispose();
 const platform=mesh(scene,new T.CylinderGeometry(.59,.61,.08,64),new T.MeshPhysicalMaterial({color:0x162434,metalness:.7,roughness:.29,clearcoat:.6}),0,.04,0);platform.receiveShadow=true;
 const ring=mesh(scene,new T.TorusGeometry(.581,.0025,8,64),new T.MeshBasicMaterial({color:0x55d3e1}),0,.083,0);ring.rotation.x=Math.PI/2;
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=64;const sc=shadowCanvas.getContext('2d'),grad=sc.createRadialGradient(32,32,1,32,32,32);grad.addColorStop(0,'#000a');grad.addColorStop(1,'#0000');sc.fillStyle=grad;sc.fillRect(0,0,64,64);const shadowTex=new T.CanvasTexture(shadowCanvas);const sh=mesh(scene,new T.PlaneGeometry(.93,.78),new T.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false}),0,.084,.015);sh.rotation.x=-Math.PI/2;
 let actor,time=0,last=0,queue=[],elapsed=0,finish=null,stopped=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function resize(){const rect=canvas.parentElement.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix();renderer.render(scene,camera);}
 const observer=new ResizeObserver(resize);observer.observe(canvas.parentElement);resize();
 function render(t){if(stopped)return;const dt=last?Math.min((t-last)/1000,.1):0;last=t;if(!document.hidden){time+=dt;elapsed+=dt;if(queue.length&&elapsed>=1.05){elapsed=0;queue.shift();if(!queue.length){finish?.();finish=null;}}actor?.update(reduced&&!queue.length?0:dt,reduced&&!queue.length?0:time,queue[0]||'idle',elapsed/1.05);camera.position.set(Math.sin(yaw)*3.85,1.33,Math.cos(yaw)*3.85);camera.lookAt(target);renderer.render(scene,camera);}requestAnimationFrame(render);}
 requestAnimationFrame(render);
 return {get actor(){return actor;},get active(){return queue.length>0;},configure(config){if(actor){scene.remove(actor.root);actor.dispose();}actor=createRobot(config);scene.add(actor.root);},rotate(value){yaw+=value;},play(actions,done){queue=[...actions];elapsed=0;finish=done;},stop(){queue=[];finish=null;elapsed=0;},png(){renderer.render(scene,camera);return canvas.toDataURL('image/png');},dispose(){stopped=true;observer.disconnect();actor?.dispose();env.dispose();shadowTex.dispose();renderer.dispose();}};
}
