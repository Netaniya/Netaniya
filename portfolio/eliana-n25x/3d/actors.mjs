import * as T from './vendor/three.module.js';
// Original articulated 3D meshes. Every limb is a volume, with a joint hierarchy.
// This is a provisional game interpretation, not a scan of the portrait reference.
const material=(color,roughness=.55,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness});
function ellipsoid(parent,mat,x,y,z,sx,sy,sz,segments=20){const m=new T.Mesh(new T.SphereGeometry(1,segments,14),mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function lathe(parent,mat,profile,x,y,z,scaleZ=1){const m=new T.Mesh(new T.LatheGeometry(profile.map(([r,h])=>new T.Vector2(r,h)),24),mat);m.position.set(x,y,z);m.scale.z=scaleZ;m.castShadow=true;parent.add(m);return m;}
function group(parent,x=0,y=0,z=0){const g=new T.Group();g.position.set(x,y,z);parent.add(g);return g;}
function tube(parent,points,radius,mat){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const m=new T.Mesh(new T.TubeGeometry(curve,16,radius,5,false),mat);m.castShadow=true;parent.add(m);return m;}
function box(parent,mat,x,y,z,w,h,d){const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
export function createActor(robot=false){
 const root=new T.Group(),body=group(root),hip=group(body,0,.89,0),chest=group(hip,0,.25,0);
 const skin=material(0xc58e74,.65),cloth=material(robot?0xe1e6e6:0xc5c1b7,.4,robot?.48:.03),dark=material(robot?0x101a20:0x243239,.52,.12),hair=material(0x3c241e,.82),hairLight=material(0x573326,.72),boot=material(0x263138,.6,.05);
 const light=new T.MeshStandardMaterial({color:0x72e6ed,emissive:0x28b2d0,emissiveIntensity:1.2,roughness:.3,metalness:.25});
 lathe(hip,dark,[[.12,-.06],[.17,.01],[.16,.13],[.13,.2]],0,0,0,.7);
 lathe(chest,cloth,[[.13,-.06],[.135,.02],[.18,.15],[robot?.235:.205,.28],[.17,.31],[.075,.32]],0,0,0,robot?.62:.68);
 lathe(chest,dark,[[.07,0],[.07,.08]],0,.31,0,.85);
 if(robot){
  for(const side of [-1,1])tube(chest,[[side*.16,.03,-.08],[side*.17,.14,-.11],[side*.17,.26,-.08]],.003,dark);
 }else{
  lathe(hip,cloth,[[.175,-.115],[.18,-.08],[.17,.08],[.135,.20]],0,0,0,.72);
  box(chest,dark,0,.12,-.121,.09,.3,.012);for(const side of [-1,1])tube(chest,[[side*.12,.02,-.08],[side*.15,.17,-.116],[side*.18,.25,-.07]],.004,dark);
  box(hip,boot,0,.08,-.015,.32,.04,.22);box(hip,light,.03,.08,-.13,.055,.035,.018);
 }
 const head=group(chest,0,.44,0);
 ellipsoid(head,robot?cloth:skin,0,0,0,robot?.125:.112,.153,.105,24);
 if(robot){
  ellipsoid(head,new T.MeshStandardMaterial({color:0x080e13,metalness:.48,roughness:.14}),0,0,-.064,.112,.135,.065,24);
  box(head,light,.124,-.01,-.008,.005,.035,.012);
  for(const side of [-1,1])ellipsoid(head,dark,side*.12,0,0,.025,.046,.038);
 }else{
  // A restrained, fully modelled face; no photograph mapped onto a plane.
  ellipsoid(head,skin,0,-.022,-.099,.020,.033,.025);
  const white=material(0xc7c3ad,.5),iris=material(0x4c5543,.4),lip=material(0x925f53,.6);
  for(const side of [-1,1]){
   ellipsoid(head,skin,side*.105,-.012,0,.024,.04,.02);
   ellipsoid(head,white,side*.039,.022,-.089,.027,.011,.015);
   ellipsoid(head,iris,side*.039,.022,-.102,.009,.009,.0035);
   tube(head,[[side*.016,.045,-.096],[side*.039,.051,-.101],[side*.066,.045,-.09]],.004,hair);
  }
  ellipsoid(head,lip,0,-.067,-.094,.028,.005,.008);
  // Hair cap plus curved locks down the back and shoulders.
  const cap=new T.Mesh(new T.SphereGeometry(1,28,18,0,Math.PI*2,0,Math.PI*.52),hair);cap.scale.set(.118,.164,.113);cap.position.y=.005;cap.castShadow=true;head.add(cap);
  for(let i=0;i<19;i++){
   const angle=(i/18)*Math.PI,side=Math.cos(angle),back=Math.sin(angle);
   tube(head,[[side*.096,.08,back*.064],[side*.12,-.04,.055+back*.045],[side*.135,-.24,.08+back*.05],[side*.12,-.43,.10+back*.025],[side*.10,-.61+Math.sin(i)*.035,.06+back*.02]],.021,i%4===0?hairLight:hair);
  }
  for(const side of [-1,1])tube(head,[[side*.018,.145,-.07],[side*.08,.105,-.09],[side*.10,-.02,-.04],[side*.11,-.22,.03]],.018,hair);
 }
 const legs=[],arms=[];
 for(const side of [-1,1]){
  const upper=group(hip,side*.103,0,0),lower=group(upper,0,-.40,0),foot=group(lower,0,-.365,0);
  lathe(upper,robot?cloth:dark,[[.055,-.38],[.075,-.31],[.087,-.15],[.09,-.03],[.07,.03]],0,0,0,.86);
  ellipsoid(lower,dark,0,0,-.008,.062,.065,.063);
  lathe(lower,robot?cloth:dark,[[.038,-.35],[.052,-.26],[.065,-.12],[.052,-.025]],0,0,.005,.86);
  ellipsoid(foot,boot,0,-.045,-.042,.064,.075,.122);
  if(robot)box(lower,light,0,-.15,-.056,.018,.13,.012);
  else box(upper,boot,side*.058,-.19,.01,.035,.13,.09);
  legs.push({upper,lower,foot});
  const shoulder=group(chest,side*(robot?.225:.192),.26,0),elbow=group(shoulder,0,-.255,0),hand=group(elbow,0,-.24,0);
  ellipsoid(shoulder,cloth,0,-.025,0,robot?.078:.065,.09,.068);
  lathe(shoulder,cloth,[[.04,-.245],[.054,-.19],[.058,-.08],[.05,.015]],0,0,0,.88);
  ellipsoid(elbow,dark,0,0,0,.046,.048,.046);
  lathe(elbow,cloth,[[.033,-.22],[.041,-.15],[.043,-.025]],0,0,0,.86);
  ellipsoid(hand,robot?dark:skin,0,-.035,0,.038,.055,.024);
  for(let f=0;f<4;f++)ellipsoid(hand,robot?cloth:skin,(f-1.5)*.016,-.081-Math.sin(f/3*Math.PI)*.007,-.002,.007,.026,.008,10);
  ellipsoid(hand,robot?cloth:skin,-side*.041,-.038,-.005,.012,.026,.012,10);
  shoulder.rotation.z=side*.06;arms.push({shoulder,elbow,hand});
 }
 if(robot)root.scale.setScalar(1.12);
 const shadowMaterial=new T.MeshBasicMaterial({color:0x0b1b20,transparent:true,opacity:.28,depthWrite:false});
 if(typeof document!=='undefined'){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const c=canvas.getContext('2d');const fade=c.createRadialGradient(32,32,2,32,32,32);fade.addColorStop(0,'rgba(255,255,255,.85)');fade.addColorStop(.55,'rgba(255,255,255,.38)');fade.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=fade;c.fillRect(0,0,64,64);shadowMaterial.map=new T.CanvasTexture(canvas);
 }
 const shadow=new T.Mesh(new T.CircleGeometry(.35,24),shadowMaterial);shadow.rotation.x=-Math.PI/2;shadow.scale.y=1.3;shadow.position.y=.041;root.add(shadow);
 const halo=new T.Mesh(new T.RingGeometry(.24,.32,32),new T.MeshBasicMaterial({color:robot?0x66dce7:0xffcf90,transparent:true,opacity:robot?.13:.06,side:T.DoubleSide,depthWrite:false}));halo.rotation.x=-Math.PI/2;halo.position.y=.039;root.add(halo);
 let phase=0,pace=0;
 return {root,body,head,legs,arms,get phase(){return phase;},update(dt,speed=0,working=false){
  pace=T.MathUtils.damp(pace,Math.min(speed/2.7,1.8),10,dt);phase+=dt*(speed>3.6?10:7.2)*Math.min(1,pace);
  body.position.y=(speed>.2?Math.abs(Math.sin(phase))*.018*pace:Math.sin(performance.now()*.0018)*.004);
  chest.rotation.y=Math.sin(phase)*.035*pace;head.rotation.y=-chest.rotation.y*.6;
  legs.forEach((leg,i)=>{const a=phase+i*Math.PI;leg.upper.rotation.x=Math.sin(a)*.52*pace;leg.lower.rotation.x=-Math.max(0,Math.cos(a))*.7*pace;leg.foot.rotation.x=-leg.upper.rotation.x*.3-leg.lower.rotation.x*.35;});
  arms.forEach((arm,i)=>{const a=phase+i*Math.PI;arm.shoulder.rotation.x=working?-.95:Math.sin(a+Math.PI)*.38*pace;arm.elbow.rotation.x=working?-.7:-.15-Math.max(0,-Math.sin(a))*.18*pace;});
 }};
}
