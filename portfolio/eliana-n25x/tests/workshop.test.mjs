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
 for(const p of SHOP)assert(TEXT.de[p.id]);
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
test('Studio: configurable robots are real meshes; limbs and base variants change, and a wave moves the arm',()=>{
 const a=createRobot(fresh().robot),b=createRobot({...fresh().robot,base:'hover',head:'antenna',module:'projector'});let count=0;a.root.traverse(o=>{if(o.isMesh){count++;assert(o.geometry.attributes.position.count>12);}});assert(count>40);assert.equal(a.legs.length,2);assert.equal(b.legs.length,0);a.update(.2,1,'wave',.3);assert(a.arms[1].rotation.z<-2);b.update(.2,1);assert(b.root.position.y>.1);a.dispose();b.dispose();
});
test('Studio: WAV export is actual mono PCM audio with nonzero samples and correct duration',()=>{
 const wav=makeWav([1,2,3,4,5,0,1,0],120),v=new DataView(wav),text=(a,n)=>String.fromCharCode(...new Uint8Array(wav,a,n));assert.equal(text(0,4),'RIFF');assert.equal(text(8,4),'WAVE');assert.equal(v.getUint32(24,true),22050);assert.equal(v.getUint16(22,true),1);assert.equal(v.getUint32(40,true),wav.byteLength-44);assert(wav.byteLength>170000);assert(new Int16Array(wav,44).some(n=>Math.abs(n)>500));
});
const dir=new URL('../workshop/dist/',import.meta.url);
test('Studio: offline inventory hashes all modules, mentor images, font, icon and licenses',async()=>{
 const info=JSON.parse(await fs.readFile(new URL('build-info.json',dir),'utf8'));assert.equal(info.precacheFiles,17);const app=await fs.readFile(new URL('app.mjs',dir),'utf8');assert(app.includes("const BUILD_VERSION='"+info.version+"'"));assert(!app.includes('__STUDIO_BUILD__'));
 for(const [file,hash]of Object.entries(info.hashes)){const bytes=await fs.readFile(new URL(file,dir));assert.equal(createHash('sha256').update(bytes).digest('hex'),hash);if(/\.m?js$/.test(file)){for(const match of bytes.toString().matchAll(/from\s*['"](\.[^'"]+)['"]/g)){const target=new URL(match[1],new URL(file,dir)),key='./'+target.pathname.slice(dir.pathname.length);assert(info.hashes[key],key);}}}
 assert(info.hashes['./assets/eliana-portrait.webp']);assert(info.hashes['./assets/n25x-portrait.webp']);
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
