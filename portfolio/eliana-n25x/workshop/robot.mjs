import * as T from './vendor/three.module.js';
import {COLORS} from './model.mjs';
function rounded(w,h,d,r=.12){r=Math.min(r,w/2-.005,h/2-.005);const s=new T.Shape();s.moveTo(r,0);s.lineTo(w-r,0);s.quadraticCurveTo(w,0,w,r);s.lineTo(w,h-r);s.quadraticCurveTo(w,h,w-r,h);s.lineTo(r,h);s.quadraticCurveTo(0,h,0,h-r);s.lineTo(0,r);s.quadraticCurveTo(0,0,r,0);const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelThickness:.018,bevelSize:.018,bevelSegments:3,steps:1,curveSegments:12});g.translate(-w/2,-h/2,-d/2);return g;}
function mesh(parent,geometry,material,x=0,y=0,z=0){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;parent.add(m);return m;}
const group=(p,x=0,y=0,z=0)=>{const g=new T.Group();g.position.set(x,y,z);p.add(g);return g;};
export function createRobot(config){
 const root=new T.Group(),body=group(root,0,1.02,0),head=group(root,0,1.93,0),arms=[];
 const shell=new T.MeshPhysicalMaterial({color:COLORS[config.color]||COLORS.pearl,metalness:.42,roughness:.24,clearcoat:.75,clearcoatRoughness:.2});
 const alloy=new T.MeshStandardMaterial({color:0xa5bdd0,metalness:.9,roughness:.27}),dark=new T.MeshStandardMaterial({color:0x172536,metalness:.58,roughness:.32});
 const glass=new T.MeshPhysicalMaterial({color:0x071422,metalness:.7,roughness:.11,clearcoat:1,clearcoatRoughness:.08});
 const cyan=new T.MeshBasicMaterial({color:config.interest==='nature'?0x61f2be:config.interest==='music'?0xb69aff:0x60ddff,toneMapped:false});
 const box=(p,w,h,d,m,x=0,y=0,z=0,r=.12)=>mesh(p,rounded(w,h,d,r),m,x,y,z);
 const ball=(p,r,m,x=0,y=0,z=0)=>mesh(p,new T.SphereGeometry(r,24,16),m,x,y,z);
 const cyl=(p,r,h,m,x=0,y=0,z=0)=>mesh(p,new T.CylinderGeometry(r,r,h,24),m,x,y,z);
 const ring=(p,r,t,m,x=0,y=0,z=0)=>mesh(p,new T.TorusGeometry(r,t,8,48),m,x,y,z);
 box(body,.98,.78,.61,shell,0,.07,0,.19);box(body,.72,.45,.035,dark,0,.08,.335,.11);
 const core=ring(body,.15,.026,alloy,0,.10,.368);ring(body,.115,.018,cyan,0,.1,.378);ball(body,.065,cyan,0,.1,.38);
 for(const side of [-1,1]){box(body,.035,.35,.025,cyan,side*.39,.12,.292,.015);for(let j=0;j<3;j++)box(body,.09,.016,.03,alloy,side*.26,-.19+j*.035,.335,.006);}
 cyl(root,.19,.22,dark,0,1.54,0);ring(root,.19,.018,alloy,0,1.57,0).rotation.x=Math.PI/2;
 const hw=config.head==='visor'?1.30:1.15;
 box(head,hw,.70,.62,shell,0,0,0,config.head==='visor'?.18:.27);
 box(head,hw-.18,.48,.042,glass,0,-.01,.341,.17);
 const eyes=[];for(const side of [-1,1]){eyes.push(box(head,.17,.075,.014,cyan,side*.225,.03,.379,.034));const ear=cyl(head,.165,.10,alloy,side*(hw/2+.04),0,0);ear.rotation.z=Math.PI/2;const e=ring(head,.13,.013,cyan,side*(hw/2+.097),0,0);e.rotation.y=Math.PI/2;}
 const mouth=box(head,.16,.015,.014,cyan,0,-.125,.379,.006);
 if(config.head==='arc'){const arc=new T.Mesh(new T.TorusGeometry(.38,.018,8,40,Math.PI),cyan);arc.position.set(0,.19,.27);head.add(arc);}
 if(config.head==='antenna'){cyl(head,.027,.26,alloy,.43,.46,-.02);ball(head,.06,cyan,.43,.62,-.02);}
 for(const side of [-1,1]){
  const shoulder=group(root,side*.62,1.31,0);ball(shoulder,.13,dark);box(shoulder,.22,.36,.26,shell,side*.025,-.12,0,.09);const elbow=group(shoulder,side*.04,-.35,0);ball(elbow,.09,alloy);box(elbow,.17,.28,.21,shell,0,-.12,0,.075);const hand=group(elbow,0,-.31,.01);ball(hand,.10,dark);
  if(config.hands==='clamp'){for(const sign of [-1,1]){box(hand,.055,.19,.07,alloy,sign*.075,-.07,.02,.02);box(hand,.06,.035,.10,dark,sign*.055,-.15,.04,.012);}}
  else{box(hand,.17,.14,.13,shell,0,-.04,.045,.055);for(let f=-1;f<=1;f++)box(hand,.035,.09,.055,alloy,f*.048,-.14,.05,.015);}
  arms.push(shoulder);
 }
 const legs=[];
 if(config.base==='feet'){for(const side of [-1,1]){const leg=group(root,side*.26,.65,0);ball(leg,.10,dark);box(leg,.25,.33,.28,shell,0,-.18,0,.075);cyl(leg,.10,.23,alloy,0,-.37,0);box(leg,.33,.17,.52,dark,0,-.51,.07,.08);box(leg,.23,.025,.10,cyan,0,-.42,.25,.01);legs.push(leg);}}
 else if(config.base==='wheels'){box(root,.93,.24,.63,shell,0,.4,0,.10);for(const side of [-1,1]){const w=cyl(root,.28,.16,dark,side*.49,.30,0);w.rotation.z=Math.PI/2;const r=ring(root,.18,.027,alloy,side*.585,.30,0);r.rotation.y=Math.PI/2;const n=ring(root,.11,.015,cyan,side*.59,.30,0);n.rotation.y=Math.PI/2;}box(root,.45,.18,.30,alloy,0,.63,0);}
 else{const disc=cyl(root,.47,.17,shell,0,.54,0);disc.scale.z=.78;const r=ring(root,.43,.024,cyan,0,.44,0);r.rotation.x=Math.PI/2;for(const x of [-.26,.26]){cyl(root,.11,.18,dark,x,.39,0);cyl(root,.075,.06,cyan,x,.28,0);}root.position.y=.10;}
 const module=group(body,0,-.06,-.39);
 if(config.module==='speaker'){box(module,.64,.41,.16,dark,0,0,0,.08);for(const x of [-.17,.17]){ring(module,.12,.018,alloy,x,0,-.095);ball(module,.08,dark,x,0,-.09);}box(body,.24,.035,.02,cyan,0,.30,.33,.01);}
 if(config.module==='projector'){box(body,.21,.15,.18,alloy,.35,.40,.13,.04);const holo=mesh(root,new T.IcosahedronGeometry(.19,0),new T.MeshBasicMaterial({color:0x6ee7ff,wireframe:true,transparent:true,opacity:.7}),.78,1.95,.08);ring(root,.28,.012,cyan,.78,1.7,.08).rotation.x=Math.PI/2;module.userData.holo=holo;}
 if(config.module==='orbit'){const orbit=ring(root,.83,.021,cyan,0,1.12,0);orbit.rotation.x=1.1;orbit.rotation.z=.25;module.userData.orbit=orbit;}
 let phase=0;const baseY=root.position.y;
 return {root,head,arms,legs,get phase(){return phase;},update(dt,time,action='idle',amount=0){
  phase+=dt;root.position.y=baseY+(config.base==='hover'?Math.sin(time*1.7)*.035:Math.sin(time*1.8)*.008);body.rotation.z=Math.sin(time*.9)*.012;
  head.rotation.y=Math.sin(time*.8)*.08;head.rotation.z=0;root.rotation.y=0;root.position.x=0;root.position.z=0;arms.forEach((a,i)=>{a.rotation.x=0;a.rotation.z=(i?1:-1)*.08;});legs.forEach(l=>l.rotation.x=0);
  const blink=Math.sin(time*.37)> .995?.13:1;eyes.forEach(e=>e.scale.y=blink);mouth.scale.x=config.personality==='cheerful'?1.35:.85;
  const p=amount*Math.PI*2;
  if(action==='wave'){arms[1].rotation.z=-2.2;arms[1].rotation.x=Math.sin(p*2)*.3;head.rotation.z=-.1;}
  if(action==='turn')root.rotation.y=p;
  if(action==='step'){root.position.z=Math.sin(p)*.25;legs.forEach((l,i)=>l.rotation.x=Math.sin(p*2+i*Math.PI)*.4);arms.forEach((a,i)=>a.rotation.x=-Math.sin(p*2+i*Math.PI)*.3);}
  if(action==='nod')head.rotation.x=Math.sin(p*2)*.16;else head.rotation.x=0;
  if(action==='glow')eyes.forEach(e=>e.scale.set(1.1+Math.sin(p*3)*.15,1.3,1));else eyes.forEach(e=>e.scale.x=1);
  if(module.userData.holo)module.userData.holo.rotation.y=time*.8;if(module.userData.orbit)module.userData.orbit.rotation.z=.25+time*.15;
 },dispose(){const gs=new Set(),ms=new Set();root.traverse(o=>{if(o.geometry)gs.add(o.geometry);if(o.material)ms.add(o.material);});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}};
}
export function createStage(canvas,onError=()=>{}){
 let renderer;try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,preserveDrawingBuffer:true,powerPreference:'high-performance'});}catch{onError();return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.shadowMap.enabled=innerWidth>700;renderer.shadowMap.type=T.PCFSoftShadowMap;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.1,40);let yaw=.27;const target=new T.Vector3(0,1.25,0);
 scene.add(new T.HemisphereLight(0xe4f3ff,0x365b80,2));const key=new T.DirectionalLight(0xffeedc,4);key.position.set(-3,5,5);key.castShadow=true;key.shadow.mapSize.setScalar(1024);key.shadow.camera.left=-3;key.shadow.camera.right=3;key.shadow.camera.top=4;key.shadow.camera.bottom=-2;key.shadow.normalBias=.03;scene.add(key);const rim=new T.DirectionalLight(0x83d6ff,3);rim.position.set(3,2,-3);scene.add(rim);
 const faces=[];for(let i=0;i<6;i++){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d'),g=ctx.createLinearGradient(0,0,128,128);g.addColorStop(0,i===2?'#ffffff':'#b9d5e8');g.addColorStop(.45,'#edf8ff');g.addColorStop(.5,'#46647b');g.addColorStop(1,'#172437');ctx.fillStyle=g;ctx.fillRect(0,0,128,128);ctx.fillStyle='#ffffff';ctx.fillRect(12,0,14,110);ctx.fillRect(80,12,6,85);faces.push(c);}const cube=new T.CubeTexture(faces);cube.colorSpace=T.SRGBColorSpace;cube.needsUpdate=true;const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromCubemap(cube);scene.environment=env.texture;cube.dispose();pmrem.dispose();
 const platform=mesh(scene,new T.CylinderGeometry(1.13,1.17,.09,64),new T.MeshPhysicalMaterial({color:0x183d53,metalness:.65,roughness:.26,clearcoat:.6}),0,.045,0);platform.receiveShadow=true;
 const ring=mesh(scene,new T.TorusGeometry(1.08,.012,8,64),new T.MeshBasicMaterial({color:0x55d3e1}),0,.097,0);ring.rotation.x=Math.PI/2;
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=64;const sc=shadowCanvas.getContext('2d'),grad=sc.createRadialGradient(32,32,1,32,32,32);grad.addColorStop(0,'#000a');grad.addColorStop(1,'#0000');sc.fillStyle=grad;sc.fillRect(0,0,64,64);const shadowTex=new T.CanvasTexture(shadowCanvas);const sh=mesh(scene,new T.PlaneGeometry(2.1,1.5),new T.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false}),0,.10,.05);sh.rotation.x=-Math.PI/2;
 let actor,time=0,last=0,queue=[],elapsed=0,finish=null,stopped=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function resize(){const rect=canvas.parentElement.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix();}
 const observer=new ResizeObserver(resize);observer.observe(canvas.parentElement);resize();
 function render(t){if(stopped)return;const dt=last?Math.min((t-last)/1000,.1):0;last=t;if(!document.hidden){time+=dt;elapsed+=dt;if(queue.length&&elapsed>=1.05){elapsed=0;queue.shift();if(!queue.length){finish?.();finish=null;}}actor?.update(reduced&&!queue.length?0:dt,reduced&&!queue.length?0:time,queue[0]||'idle',elapsed/1.05);camera.position.set(Math.sin(yaw)*5.9,2.75,Math.cos(yaw)*5.9);camera.lookAt(target);renderer.render(scene,camera);}requestAnimationFrame(render);}
 requestAnimationFrame(render);
 return {get actor(){return actor;},get active(){return queue.length>0;},configure(config){if(actor){scene.remove(actor.root);actor.dispose();}actor=createRobot(config);scene.add(actor.root);},rotate(value){yaw+=value;},play(actions,done){queue=[...actions];elapsed=0;finish=done;},stop(){queue=[];finish=null;elapsed=0;},png(){renderer.render(scene,camera);return canvas.toDataURL('image/png');},dispose(){stopped=true;observer.disconnect();actor?.dispose();env.dispose();shadowTex.dispose();renderer.dispose();}};
}
