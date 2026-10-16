import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {webcrypto,createHash} from 'node:crypto';
import {fresh,configure,reward,buy,addProject,parseProfile,SAVE_KEY,SHOP} from '../workshop/model.mjs';
import {solve,parseExpression,matchesAnswer,MATH,dailyTasks} from '../workshop/math.mjs';
import {TEXT} from '../workshop/i18n.mjs';
import {makeWav} from '../workshop/sound.mjs';
import {createRobot} from '../workshop/dist/robot.mjs';
import * as T from '../3d/vendor/three.module.js';
test('Studio: purchases debit exactly once, require funds, and locked parts cannot be equipped',()=>{
 const s=fresh();assert.equal(configure(s,'module','orbit'),false);assert.equal(configure(s,'color','orchid'),false);
 assert.equal(buy(s,'projector'),'funds');assert.equal(s.points,80);assert.equal(buy(s,'orchid'),'bought');assert.equal(s.points,20);assert.equal(s.robot.color,'orchid');assert.equal(buy(s,'orchid'),'owned');assert.equal(s.points,20);assert.equal(buy(s,'unknown'),'invalid');
});
test('Studio: one achievement has one reward and projects survive duplicate saves and deletion without farming',()=>{
 const s=fresh();assert.equal(reward(s,'math:1:0',15),15);assert.equal(reward(s,'math:1:0',15),0);assert.equal(reward(s,'bad',-4),0);
 const data={steps:[1,2,3,4,5,0,0,1],tempo:110},p=addProject(s,'melody',data,'song');assert.equal(p.bonus,30);assert.equal(addProject(s,'melody',data,'again').bonus,0);s.projects=[];assert.equal(addProject(s,'melody',data,'again').bonus,0);assert.equal(s.points,125);
 assert.equal(addProject(s,'routine',{actions:['wave','execute']},'x'),null);assert.equal(addProject(s,'melody',{steps:[0,0,0,0,0,0,0,0],tempo:100},'x'),null);
});
test('Studio: separate profile round-trips without changing name, parts, projects or earned balance',()=>{
 const s=fresh();s.started=true;configure(s,'name','Neta');configure(s,'base','hover');reward(s,'code:0',30);buy(s,'projector');addProject(s,'routine',{actions:['wave','nod']},'Hi');
 const p=parseProfile(JSON.stringify(s));assert.deepEqual(p,s);assert.notEqual(SAVE_KEY,'eliana-n25x.3d.v1');assert.notEqual(SAVE_KEY,'eliana-n25x.save.v1');assert.equal(parseProfile('{'),null);const long=fresh();long.points=120000;for(let i=0;i<3000;i++){long.earned['daily:2026-10-16:'+i]=15;long.solved.push('daily:2026-10-16:'+i);}assert.deepEqual(parseProfile(JSON.stringify(long)),long);assert.equal(parseProfile(JSON.stringify({...s,points:-1})),null);
 const malformed={...s,robot:{...s.robot,color:'evil',module:'orbit',name:'<b>hello</b>'}};const safe=parseProfile(JSON.stringify(malformed));assert.equal(safe.robot.color,'pearl');assert.equal(safe.robot.module,'none');assert(!safe.robot.name.includes('<'));
});
test('Studio math: precedence, implicit multiplication, percentages and fractions are computed without executing input',()=>{
 for(const [input,expected]of[['2*(3+4)',14],['-2^2',-4],['(-2)^2',4],['1/2+1/4',.75],['20%*150',30],['2,4+1,8',4.2],['(2+1)(4-1)',9]])assert.equal(solve(input).value,expected,input);
 assert(matchesAnswer('3/4',.75));assert(!matchesAnswer('x',0));for(const s of ['globalThis','alert(1)','1/0','1/(x+1)','2^1000','((((2)','2..5','1e9999'])assert.equal(solve(s).kind,'error',s);
 assert.throws(()=>parseExpression('('.repeat(30)+'1'+')'.repeat(30)));
});
test('Studio math: linear/quadratic solutions, identities and polynomial derivatives are correct',()=>{
 assert.equal(solve('2x+3=11').value,4);assert.equal(solve('3(x+2)=18').value,4);assert.deepEqual(solve('x^2-9=0').roots,[-3,3]);assert.equal(solve('x^2+1=0').kind,'noReal');assert.equal(solve('2x=2x').kind,'identity');assert.equal(solve('2x+1=2x').kind,'none');assert.equal(solve('d/dx 3x^3-2x+1').answer,'9x^2-2');
 assert.equal(MATH.length,11);assert(MATH.every(l=>l.tasks.length===3));assert.equal(MATH[10].tasks[0][1],12);
});
test('Studio: all four languages contain complete interface, teacher messages and copyright',()=>{
 assert.equal(fresh().lang,'de');for(const lang of ['en','ru','uk'])assert.deepEqual(Object.keys(TEXT[lang]).sort(),Object.keys(TEXT.de).sort());for(const copy of Object.values(TEXT))assert(Object.values(copy).every(v=>typeof v==='string'&&v.length));assert(TEXT.ru.rights.includes('Все права защищены'));
 for(const p of SHOP)assert(TEXT.de[p.id]);for(const copy of Object.values(TEXT)){assert(copy.robotGreeting.includes('{name}'));assert(!copy.greeting.includes('{name}'));}
});
test('Studio: daily exercises are reproducible, change by date, and have correct answers across 11 levels',()=>{
 for(let grade=1;grade<=11;grade++){
  assert.deepEqual(dailyTasks(grade,'2026-10-16'),dailyTasks(grade,'2026-10-16'));
  assert.notDeepEqual(dailyTasks(grade,'2026-10-16'),dailyTasks(grade,'2026-10-17'));
  for(let day=0;day<60;day++)for(const [text,answer,hint]of dailyTasks(grade,new Date(Date.UTC(2026,9,day+1)).toISOString().slice(0,10))){
   let actual;
   if(grade===11){const m=text.match(/^f\(x\)=(.+); f′\((\d+)\)$/),p=parseExpression(m[1]),x=Number(m[2]);actual=p.reduce((n,c,i)=>i?n+i*c*x**(i-1):n,0);}
   else{const result=solve(text.split(';')[0]);actual=grade===10?Math.max(...result.roots):result.value;}
   assert(Math.abs(actual-answer)<1e-7,text);assert(hint.length>3);
  }
 }
});
test('Studio: humanoid has human proportions, five fingers per hand and real articulated limbs',()=>{
 const a=createRobot(fresh().robot);a.root.updateMatrixWorld(true);const box=new T.Box3().setFromObject(a.root),head=new T.Box3().setFromObject(a.head);let count=0,triangles=0;
 a.root.traverse(o=>{if(o.isMesh){count++;const p=o.geometry.attributes.position;assert(p.count>12);assert([...p.array].every(Number.isFinite));triangles+=(o.geometry.index?.count||p.count)/3;}});
 assert(box.max.y-box.min.y>1.7&&box.max.y-box.min.y<2.1);assert((head.max.y-head.min.y)/(box.max.y-box.min.y)<.17);assert(box.max.x-box.min.x<.85);assert(count<180&&triangles<90000);
 assert.equal(a.legs.length,2);assert.equal(a.knees.length,2);assert.equal(a.elbows.length,2);assert.equal(a.fingers.length,10);assert.equal(a.fingers.filter(f=>f.thumb).length,2);assert(a.fingers.every(f=>f.joints.length===3));
 const shell=a.body.children.find(o=>o.isMesh&&o.material.isMeshPhysicalMaterial),p=shell.geometry.attributes.position,n=shell.geometry.attributes.normal;let positive=0,total=0;
 for(let i=0;i<p.count;i++){if(Math.hypot(p.getX(i),p.getZ(i))>.035){total++;if(p.getX(i)*n.getX(i)+p.getZ(i)*n.getZ(i)>0)positive++;}}assert(positive/total>.96,'shell normals face outwards');
 a.update(.2,1,'wave',.3);assert(a.arms[1].rotation.z>1.5);assert(a.elbows[1].rotation.z>.7);assert(a.head.getObjectByName('dark-faceplate'));a.dispose();
});
test('Studio: every mobility and body/finish option preserves a complete humanoid, and IK keeps stepping soles above the platform',()=>{
 let narrow,wide,ceramic,titanium,satin;
 for(const frame of ['balanced','athletic','slender'])for(const finish of ['ceramic','titanium','satin'])for(const base of ['feet','wheels','hover']){
  const a=createRobot({...fresh().robot,frame,finish,base});assert.equal(a.legs.length,2);assert.equal(a.fingers.length,10);a.root.updateMatrixWorld(true);const b=new T.Box3().setFromObject(a.root);assert(b.max.y-b.min.y>1.7&&b.max.y-b.min.y<2.1);
  if(frame==='slender')narrow=b.max.x-b.min.x;if(frame==='athletic')wide=b.max.x-b.min.x;
  const material=a.body.children.find(o=>o.isMesh&&o.material.isMeshPhysicalMaterial).material;if(finish==='ceramic')ceramic=material.metalness;if(finish==='titanium')titanium=material.metalness;if(finish==='satin')satin=material.roughness;
  if(base==='feet')for(let i=0;i<=32;i++){a.update(.03,2,'step',i/32);a.root.updateMatrixWorld(true);for(const foot of a.footMeshes){const y=new T.Box3().setFromObject(foot).min.y;assert(y>=.075&&y<.15,'planted or lifted sole: '+y);}}
  a.dispose();
 }
 assert(wide>narrow+.08);assert(titanium>ceramic+.4);assert(satin>.4);
 const gripper=createRobot({...fresh().robot,hands:'clamp'});assert.equal(gripper.fingers.length,0);assert.equal(gripper.legs.length,2);gripper.dispose();
});
test('Studio: existing profiles gain humanoid defaults without losing name, mobility, points or projects',()=>{
 const old=fresh();old.started=true;old.robot.name='My saved robot';old.robot.base='hover';old.points=187;addProject(old,'routine',{actions:['wave','turn']},'Saved');delete old.robot.frame;delete old.robot.finish;
 const p=parseProfile(JSON.stringify(old));assert.equal(p.robot.frame,'balanced');assert.equal(p.robot.finish,'ceramic');assert.equal(p.robot.name,old.robot.name);assert.equal(p.robot.base,'hover');assert.equal(p.points,old.points);assert.deepEqual(p.projects,old.projects);assert.equal(p.schema,SAVE_KEY);
});
test('Studio: WAV export is actual mono PCM audio with nonzero samples and correct duration',()=>{
 const wav=makeWav([1,2,3,4,5,0,1,0],120),v=new DataView(wav),text=(a,n)=>String.fromCharCode(...new Uint8Array(wav,a,n));assert.equal(text(0,4),'RIFF');assert.equal(text(8,4),'WAVE');assert.equal(v.getUint32(24,true),22050);assert.equal(v.getUint16(22,true),1);assert.equal(v.getUint32(40,true),wav.byteLength-44);assert(wav.byteLength>170000);assert(new Int16Array(wav,44).some(n=>Math.abs(n)>500));
});
const dir=new URL('../workshop/dist/',import.meta.url);
test('Studio: offline inventory hashes every learning/music module, robot portrait, font, icon and licenses',async()=>{
 const info=JSON.parse(await fs.readFile(new URL('build-info.json',dir),'utf8'));assert.equal(info.precacheFiles,Object.keys(info.hashes).length);assert(info.precacheFiles>=29);const app=await fs.readFile(new URL('app.mjs',dir),'utf8');assert(app.includes("const BUILD_VERSION='"+info.version+"'"));assert(!app.includes('__STUDIO_BUILD__'));
 for(const [file,hash]of Object.entries(info.hashes)){const bytes=await fs.readFile(new URL(file,dir));assert.equal(createHash('sha256').update(bytes).digest('hex'),hash);if(/\.m?js$/.test(file)){for(const match of bytes.toString().matchAll(/from\s*['"](\.[^'"]+)['"]/g)){const target=new URL(match[1],new URL(file,dir)),key='./'+target.pathname.slice(dir.pathname.length);assert(info.hashes[key],key);}}}
 assert(!info.hashes['./assets/eliana-portrait.webp']);const html=await fs.readFile(new URL('index.html',dir),'utf8');assert(!/Eliana|ELIANA|eliana-portrait/.test(html));for(const file of ['math-course.mjs','math-classroom.mjs','language-data.mjs','language-classroom.mjs','piano.mjs','piano-score.mjs'])assert(info.hashes['./'+file]);assert(info.hashes['./assets/n25x-portrait.webp']);
});
async function harness(){const handlers={},stores=new Map(),messages=[],root='https://example.test/Netaniya/eliana-n25x/workshop/';let network=true;const caches={async open(key){if(!stores.has(key))stores.set(key,new Map());const s=stores.get(key);return {async match(req){return s.get(typeof req==='string'?req:req.url)?.clone();},async put(req,res){s.set(typeof req==='string'?req:req.url,res.clone());}};},async keys(){return [...stores.keys()];},async delete(k){return stores.delete(k);}};
 const c={URL,Request,Response,Uint8Array,crypto:webcrypto,caches,fetch:async req=>{if(!network)throw Error('offline');try{return new Response(await fs.readFile(new URL((typeof req==='string'?req:req.url).slice(root.length),dir)),{status:200});}catch{return new Response('',{status:404});}},self:{registration:{scope:root},location:{origin:'https://example.test'},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(n,fn)=>handlers[n]=fn}};vm.runInNewContext(await fs.readFile(new URL('sw.js',dir),'utf8'),c);async function event(name,extra={}){let work;handlers[name]({...extra,waitUntil:p=>work=p,respondWith:p=>work=p});return await work;}return {root,stores,caches,event,messages,setNetwork:v=>network=v,message:()=>event('message',{data:{type:'VERIFY_OFFLINE'},source:{postMessage:m=>messages.push(m)}})};}
test('Studio: cold navigation and every resource work without network; earlier games keep their caches',async()=>{
 const h=await harness();await h.caches.open('en25x3d-current');await h.caches.open('en25x-classic');await h.caches.open('en25xstudio-old');await h.event('install');await h.event('activate');await h.message();assert.equal(h.messages.at(-1).type,'OFFLINE_READY');assert(h.stores.has('en25x3d-current'));assert(h.stores.has('en25x-classic'));assert(!h.stores.has('en25xstudio-old'));h.setNetwork(false);const r=await h.event('fetch',{request:{method:'GET',url:h.root,mode:'navigate'}});assert((await r.text()).includes('robot-canvas'));
 const info=JSON.parse(await fs.readFile(new URL('build-info.json',dir),'utf8'));for(const file of Object.keys(info.hashes))assert((await h.event('fetch',{request:new Request(new URL(file,h.root))})).ok,file);
});
test('Studio: corrupt or missing offline data never reports readiness',async()=>{
 const h=await harness();h.setNetwork(false);await assert.rejects(h.event('install'));h.setNetwork(true);await h.event('install');const name=[...h.stores.keys()][0];await(await h.caches.open(name)).put(h.root+'robot.mjs',new Response('bad bytes'));await h.message();assert.equal(h.messages.at(-1).type,'OFFLINE_ERROR');
});
test('Studio: offline app download serves the actual standalone copy and never substitutes the home document',async()=>{
 const h=await harness();await h.event('install');h.setNetwork(false);
 const response=await h.event('fetch',{request:{method:'GET',url:h.root+'download/N25x-Studio.html',mode:'navigate'}}),html=await response.text();
 assert(response.ok);assert(html.includes('id="portable-build-info"'));assert(html.includes('globalThis.EN25X_STUDIO_PORTABLE=true'));assert(!html.includes('private-update-patch'));assert(html.includes('© 2026 Natalie Ragulina. All rights reserved.'));
 const missing=await h.event('fetch',{request:{method:'GET',url:h.root+'missing.html',mode:'navigate'}});assert.equal(missing.ok,false);
});
test('Studio: private portable review embeds its complete module graph, assets, font and license downloads',async()=>{
 const {execFile}=await import('node:child_process'),{promisify}=await import('node:util'),{tmpdir}=await import('node:os'),path=await import('node:path');const tmp=await fs.mkdtemp(path.join(tmpdir(),'eliana-private-'));
 try{const file=path.join(tmp,'review.html');await promisify(execFile)(process.execPath,[new URL('../workshop/portable.mjs',import.meta.url).pathname,file]);const html=await fs.readFile(file,'utf8'),map=JSON.parse(html.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]);assert(Object.keys(map.imports).length>=19);assert(map.imports['studio/piano.mjs']);assert(map.imports['studio/language-data.mjs']);
  for(const value of Object.values(map.imports)){assert(value.startsWith('data:text/javascript;base64,'));const source=Buffer.from(value.split(',')[1],'base64').toString();for(const ref of source.matchAll(/from\s*["'](studio\/[^"']+)/g))assert(map.imports[ref[1]],ref[1]);assert(!/from\s*["']\.\//.test(source));}
  assert(html.includes('globalThis.EN25X_STUDIO_PORTABLE=true'));assert(html.includes('data:font/ttf;base64,'));assert(html.includes('data:image/webp;base64,'));assert(!/<script[^>]+src=|<link rel="manifest"/.test(html));assert(!/url\(['"]?\.\/|(?:src|href)="\.\/(?:assets|vendor)/.test(html));
  const app=Buffer.from(map.imports['studio/app.mjs'].split(',')[1],'base64').toString();assert(app.includes("if(PORTABLE)offlineStatus('offlinePortable')"));assert(app.includes('const asset=name=>'));assert(app.includes("PORTABLE?'':btn('install'"));
 }finally{await fs.rm(tmp,{recursive:true,force:true});}
});
