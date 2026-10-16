import * as T from './vendor/three.module.js';
import {LEVELS,obstacles} from './simulation.mjs';
const mat=(color,metalness=0,roughness=.65)=>new T.MeshStandardMaterial({color,metalness,roughness});
export function createWorld(index=0,mobile=false){
 const L=LEVELS[index],scene=new T.Scene();scene.background=new T.Color(L.sky);scene.fog=new T.FogExp2(L.sky,.009);
 const solids=[],animated=[],items=[],disposables=[];
 const accents=[0xf064ee,0xff6568,0xb87dff,0x27e6e0,0xff756b,0xb181ff],accentColor=accents[index];
 const stone=mat(L.wall,.25,.43),metal=mat(0x142a56,.6,.32),glass=mat(index===1?0x293e7c:0x174c83,.55,.2),white=mat(0xe4f1ff,.16,.42),green=mat(index===3?0x32bd62:0x1cac7b,0,.82);
 const neon=new T.MeshStandardMaterial({color:L.color,emissive:L.color,emissiveIntensity:.65,roughness:.25,metalness:.2,toneMapped:false});
 const accent=new T.MeshBasicMaterial({color:accentColor,toneMapped:false});
 const signal=new T.MeshStandardMaterial({color:0xffd45a,emissive:0xffb52e,emissiveIntensity:.85,roughness:.25,metalness:.25,toneMapped:false});
 const boxGeo=new T.BoxGeometry(1,1,1);
 function box(x,y,z,w,h,d,m=stone,solid=false){const mesh=new T.Mesh(boxGeo,m);mesh.position.set(x,y,z);mesh.scale.set(w,h,d);mesh.receiveShadow=true;mesh.castShadow=true;scene.add(mesh);if(solid)solids.push(mesh);return mesh;}
 function cylinder(x,y,z,r,h,m=metal,segments=20){const mesh=new T.Mesh(new T.CylinderGeometry(r,r,h,segments),m);mesh.position.set(x,y,z);mesh.castShadow=true;scene.add(mesh);return mesh;}
 function ring(x,y,z,r,m=neon){const mesh=new T.Mesh(new T.TorusGeometry(r,.026,6,40),m);mesh.position.set(x,y,z);scene.add(mesh);return mesh;}
 // Coloured materials carry the look even on phones without real-time shadows.
 const hemi=new T.HemisphereLight(0xd3eaff,0x34538b,1.65);scene.add(hemi);
 const sun=new T.DirectionalLight(index===4?0xffdab3:0xfff1df,index===5?2:2.65);sun.position.set(-12,25,12);sun.castShadow=true;sun.shadow.mapSize.setScalar(mobile?512:1024);sun.shadow.camera.left=-27;sun.shadow.camera.right=27;sun.shadow.camera.top=25;sun.shadow.camera.bottom=-27;sun.shadow.normalBias=.035;sun.shadow.bias=-.0003;scene.add(sun);
 const fill=new T.DirectionalLight(0x92bfff,.95);fill.position.set(14,10,-15);scene.add(fill);
 // A self-contained repeating pavement texture; no texture server or image dependency.
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle=new T.Color(L.ground).getStyle();ctx.fillRect(0,0,256,256);ctx.strokeStyle='rgba(16,38,80,.28)';ctx.lineWidth=3;ctx.strokeRect(1,1,254,254);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(128,0);ctx.lineTo(128,256);ctx.moveTo(0,128);ctx.lineTo(256,128);ctx.stroke();ctx.fillStyle='rgba(210,243,255,.5)';for(const [x,y]of[[8,8],[236,8],[8,236],[236,236]])ctx.fillRect(x,y,12,2);
 const texture=new T.CanvasTexture(canvas);texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.repeat.set(16,19);texture.colorSpace=T.SRGBColorSpace;disposables.push(texture);
 const floorMat=mat(0xffffff,.18,.65);floorMat.map=texture;box(0,-.16,0,40,.32,48,floorMat);
 const pathMat=mat(index===3?0x83b99c:0x4e739d,.32,.42);box(0,.007,0,7,.012,44,pathMat);
 for(const x of [-3.6,3.6])box(x,.02,1,.045,.025,36,neon);
 // Thin facade/road lights share two instanced draws, with no new obstacles.
 const lightBoxes=[],accentBoxes=[];
 function lightBox(list,x,y,z,w,h,d){list.push([x,y,z,w,h,d]);}
 for(let z=-13;z<=19;z+=4){for(const x of [-3.35,3.35])lightBox(lightBoxes,x,.027,z,.22,.025,.65);for(const x of [-6.8,6.8])lightBox(accentBoxes,x,.025,z,.8,.025,.055);}
 for(const x of [-18.9,18.9])for(let z=-20;z<22;z+=3)lightBox(accentBoxes,x,.04,z,.08,.04,1.3);
 for(const x of [-19.5,19.5]){box(x,.55,0,.35,1.1,47,metal,true);box(x,1.12,0,.35,.04,47,neon);}
 box(0,.5,22.7,39,1,.3,metal,true);box(0,.5,-23.5,39,1,.3,metal,true);
 const walls=obstacles(index,true).filter(b=>['west','east','planter','bench'].includes(b.id)||b.id.startsWith('room-')||b.id.startsWith('gate-'));
 for(const b of walls){
  if(b.id==='planter'){
   box(b.x,b.h/2,b.z,b.w,b.h,b.d,white,true);box(b.x,b.h,b.z,b.w-.2,.1,b.d-.2,green);
   cylinder(0,1.8,4,.16,2.7,mat(0x67513e));
   for(let j=0;j<3;j++){const mesh=new T.Mesh(new T.IcosahedronGeometry(1.2-j*.12,1),green);mesh.position.set(Math.sin(j*2)*.45,2.6+j*.45,4+Math.cos(j*2)*.35);scene.add(mesh);mesh.castShadow=true;}
  }else if(b.id==='bench'){
   box(b.x,.4,b.z,b.w,.8,b.d,metal,true);box(b.x,.84,b.z,b.w+.1,.08,b.d+.1,mat(0x977e62));
  }else if(b.id==='west'||b.id==='east'){
   box(b.x,b.h/2,b.z,b.w,b.h,b.d,index===3?glass:stone,true);
   box(b.x,b.h+.15,b.z,b.w+.6,.3,b.d+.6,white);
   for(let y=1.6;y<b.h-.5;y+=2.3){
    box(b.x,y,b.z+b.d/2+.015,b.w-.5,1.25,.04,glass);
    box(b.x+(b.id==='west'?b.w/2:-b.w/2),y,b.z,.04,1.25,b.d-.7,glass);
    box(b.x,y-.67,b.z,b.w+.08,.08,b.d+.08,metal);
    lightBox(lightBoxes,b.x,y-.62,b.z+b.d/2+.055,b.w-.45,.045,.06);
    for(let j=-3;j<=3;j+=1.5)lightBox(j>0?accentBoxes:lightBoxes,b.x+j,y,b.z+b.d/2+.06,.08,1.05,.055);
    const side=b.x+(b.id==='west'?b.w/2+.035:-b.w/2-.035);
    lightBox(accentBoxes,side,y-.62,b.z,.07,.045,b.d-.6);
   }
   for(let j=-3;j<=3;j+=2)box(b.x+j,b.h/2,b.z+b.d/2+.07,.08,b.h,.12,white);
   for(const side of [-1,1]){lightBox(accentBoxes,b.x+side*(b.w/2-.12),b.h/2,b.z+b.d/2+.16,.085,b.h-.3,.08);lightBox(lightBoxes,b.x+side*2.5,b.h+.38,b.z,1.2,.14,b.d-.8);}
   if(index===1){for(let j=0;j<7;j++){const r=box(b.x+(j%3-1)*2,.15,b.z+b.d/2+1+(j%2),.7,.3,.6,metal);r.rotation.y=j*1.7;}}
   if(index===3){for(let j=0;j<4;j++)cylinder(b.x-2+j*1.4,b.h+.4,b.z,.4,.7,green);}
  }else box(b.x,b.h/2,b.z,b.w,b.h,b.d,b.id.startsWith('gate')?metal:stone,true);
 }
 // Light roof beams make the small room legible while leaving its doorway open.
 box(-13,3.7,-8,10,.15,.15,metal);box(-13,3.7,-3,10,.15,.15,metal);box(-13,3.76,-8,.1,.1,10,neon);
  for(let j=0;j<3;j++){box(-16+j*2.3,.75,-11.9,1.5,.15,.7,white,true);box(-16+j*2.3,.42,-12.1,.1,.7,.1,metal);box(-16+j*2.3,1.1,-12.1,.7,.55,.08,glass);}
 box(0,4,-16,8.6,.35,1.1,metal);
 box(0,4.2,-15.8,8.1,.055,.08,accent);
 for(const x of [-6,6])box(x,2.5,-15.47,2.1,.07,.04,neon);
 const gate=new T.Group();gate.position.set(0,1.8,-16);scene.add(gate);
 const gatePanel=new T.Mesh(new T.BoxGeometry(7.9,3.6,.3),new T.MeshStandardMaterial({color:L.color,emissive:L.color,emissiveIntensity:.18,metalness:.55,roughness:.2,transparent:true,opacity:.72}));gate.add(gatePanel);solids.push(gatePanel);
 for(const x of [-3.85,0,3.85]){const strip=new T.Mesh(new T.BoxGeometry(.06,3.6,.34),neon);strip.position.x=x;gate.add(strip);}
 for(const z of [-19,-21])box(0,.02,z,4,.025,.10,neon);
 // Distant silhouettes are instanced to keep draw calls stable on phones.
 const skyGeo=new T.BoxGeometry(1,1,1),skyMat=mat(index===5?0x344b96:0x3d70ad,.3,.5),skyline=new T.InstancedMesh(skyGeo,skyMat,64),dummy=new T.Object3D();
 for(let i=0;i<64;i++){const a=i/64*Math.PI*2,r=42+(i%7)*3,h=6+(i*13%25);dummy.position.set(Math.cos(a)*r,h/2-(index===5?18:0),Math.sin(a)*r);dummy.scale.set(4+i%4,h,4+i%3);dummy.updateMatrix();skyline.setMatrixAt(i,dummy.matrix);}scene.add(skyline);
 // Window bands face the plaza; saturated beacons define the skyline.
 for(let i=0;i<64;i++){const a=i/64*Math.PI*2,r=42+(i%7)*3,h=6+(i*13%25),x=Math.cos(a)*r,z=Math.sin(a)*r,base=index===5?-18:0;for(let j=0;j<3;j++)lightBox(i%2?lightBoxes:accentBoxes,x,base+h*(.35+j*.23),z,4+i%4+.06,.10,4+i%3+.06);}
 function instanceLights(list,m){const mesh=new T.InstancedMesh(boxGeo,m,list.length),o=new T.Object3D();list.forEach(([x,y,z,w,h,d],i)=>{o.position.set(x,y,z);o.scale.set(w,h,d);o.updateMatrix();mesh.setMatrixAt(i,o.matrix);});scene.add(mesh);}
 instanceLights(lightBoxes,neon);instanceLights(accentBoxes,accent);
 // Original electronic display generated once and shared by facades; no text.
 const board=document.createElement('canvas');board.width=512;board.height=256;const bc=board.getContext('2d');bc.fillStyle='#0a1e49';bc.fillRect(0,0,512,256);bc.strokeStyle=new T.Color(L.color).getStyle();bc.lineWidth=3;bc.strokeRect(10,10,492,236);
 for(let i=0;i<7;i++){const x=32+i*65,y=44+(i*31%94);bc.beginPath();bc.moveTo(x,224);bc.lineTo(x,y+20);bc.lineTo(x+18,y);bc.lineTo(x+45,y);bc.stroke();bc.fillStyle=new T.Color(i%2?accentColor:L.color).getStyle();bc.fillRect(x+22,y-4,20,8);}
 bc.fillStyle='#e0f5ff';for(let i=0;i<5;i++)bc.fillRect(30+i*34,28,23,7);
 const boardTexture=new T.CanvasTexture(board);boardTexture.colorSpace=T.SRGBColorSpace;disposables.push(boardTexture);const boardMaterial=new T.MeshBasicMaterial({map:boardTexture,toneMapped:false});
 for(const [x,z,h]of[[-13,11.13,index===3?1.7:4.3],[13,11.13,index===3?1.8:4.3]]){box(x,h,z,3.4,1.7,.035,boardMaterial);box(x,h+.94,z,3.8,.08,.07,accent);}
 function pedestal(x,z,kind,id){
  const g=new T.Group();g.position.set(x,0,z);scene.add(g);const base=new T.Mesh(new T.CylinderGeometry(.43,.47,.18,24),metal);base.position.y=.09;g.add(base);
  const h=new T.Mesh(new T.CylinderGeometry(.18,.25,.65,16),white);h.position.y=.46;g.add(h);
  let object;
  if(kind==='valve'){object=new T.Mesh(new T.TorusGeometry(.28,.055,8,20),signal);object.rotation.x=.3;}
  else if(kind==='archive'||kind==='panel'){object=new T.Mesh(new T.BoxGeometry(.43,.3,.06),signal);object.rotation.x=-.3;}
  else if(kind==='beacon'){object=new T.Mesh(new T.OctahedronGeometry(.28,0),signal);}
  else {object=new T.Mesh(new T.CylinderGeometry(.15,.15,.4,12),signal);object.rotation.z=.2;}
  object.position.y=1.03;g.add(object);animated.push({object,y:1.03,id});
  const halo=ring(x,.04,z,.7,signal);halo.rotation.x=Math.PI/2;return {root:g,object,halo,id};
 }
 L.items.forEach(([x,z],i)=>items.push(pedestal(x,z,L.kind,'item'+i)));
 const clue=pedestal(L.clue[0],L.clue[1],'archive','clue');
 box(0,.66,-11,1.3,1.32,.8,metal,true);const screen=box(0,1.44,-10.86,1.16,.55,.13,neon);screen.rotation.x=-.2;
 const antenna=cylinder(1.5,2.4,-11,.06,4,white);ring(1.5,3.8,-11,.6);ring(1.5,3.8,-11,.9).rotation.y=Math.PI/2;
 const dataRing=ring(1.5,3.8,-11,.74,accent);dataRing.rotation.x=.7;
 const scanRing=ring(0,.15,-10,1);scanRing.rotation.x=Math.PI/2;scanRing.visible=false;
 const beam=new T.Mesh(new T.ConeGeometry(1.1,3.7,32,1,true),new T.MeshBasicMaterial({color:L.color,transparent:true,opacity:.10,side:T.DoubleSide,depthWrite:false}));beam.position.set(0,1.7,-10);scene.add(beam);beam.visible=false;
 // Location-specific architecture and equipment outside the traversable corridor.
 if(index===2){for(const x of [10,14,17]){cylinder(x,13.8,3,.08,3,white);ring(x,15,3,.7);}}
 if(index===3){
  const water=mat(0x4ea7b3,.65,.18);for(const x of [-6.5,6.5]){box(x,.025,1,.45,.03,25,water);for(let j=0;j<7;j++){cylinder(x+(x<0?-.7:.7),.36,-12+j*4,.32,.7,green);}}
  for(let i=0;i<4;i++){const arch=new T.Mesh(new T.TorusGeometry(9,.08,6,32,Math.PI),metal);arch.position.set(0,3,10-i*8);scene.add(arch);}
 }
 if(index===4){for(const x of [-13,13]){box(x,1.9,11.08,2,2.8,.08,metal);box(x,2.95,11.16,1.7,.08,.1,neon);}}
 if(index===5){for(const x of [-13,13]){cylinder(x,15,5,.17,7,metal);for(let i=0;i<4;i++){const dish=new T.Mesh(new T.SphereGeometry(1.4,20,12,0,Math.PI*2,0,Math.PI*.4),white);dish.position.set(x,15+i*.8,5);dish.rotation.z=Math.PI/3;scene.add(dish);}}const horizon=ring(0,8,-40,22);horizon.rotation.x=.7;}
 const motes=new T.BufferGeometry(),positions=new Float32Array(90*3);for(let i=0;i<90;i++){positions[i*3]=(i*17%38)-19;positions[i*3+1]=1+(i*7%11);positions[i*3+2]=(i*23%44)-22;}motes.setAttribute('position',new T.BufferAttribute(positions,3));const particles=new T.Points(motes,new T.PointsMaterial({color:L.color,size:.035,transparent:true,opacity:.55}));scene.add(particles);
 let gateProgress=0;
 return {scene,solids,items,clue,gate,get gateProgress(){return gateProgress;},update(dt,time,chapter,task){
  gateProgress=T.MathUtils.damp(gateProgress,chapter.restored?1:0,2.2,dt);gate.position.y=1.8+gateProgress*4.1;
  items.forEach((item,i)=>{item.object.visible=!chapter.items[i];item.halo.visible=!chapter.items[i];});clue.object.material=chapter.clue?white:signal;
  for(const a of animated){a.object.rotation.y=time*.6;a.object.position.y=a.y+Math.sin(time*2+a.id.length)*.06;}
  scanRing.visible=beam.visible=Boolean(task);if(task){const scale=1+Math.sin(time*4)*.2;scanRing.scale.setScalar(scale);beam.rotation.y=time;}
  particles.rotation.y=Math.sin(time*.05)*.03;dataRing.rotation.y=time*.22;screen.material=chapter.restored?white:neon;
 },snapGate(open){gateProgress=open?1:0;gate.position.y=1.8+gateProgress*4.1;},dispose(){
  const geometries=new Set(),materials=new Set(),textures=new Set(disposables);scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);}});for(const g of geometries)g.dispose();for(const m of materials){if(m.map)textures.add(m.map);m.dispose();}for(const t of textures)t.dispose();sun.shadow.map?.dispose();
 }};
}
