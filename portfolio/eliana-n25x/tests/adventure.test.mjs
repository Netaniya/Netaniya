import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {webcrypto,createHash} from 'node:crypto';
import {SAVE_KEY,LEVELS,LANGUAGES,SPAWN,newGame,parseSave,obstacles,freeAt,move,distance,pathTo,clearLine,interact,goal,finish,advance,score} from '../3d/simulation.mjs';
import {createActor} from '../3d/actors.mjs';
import {TEXT} from '../3d/i18n.mjs';
const dir=new URL('../3d/dist/',import.meta.url);
function walk(from,to,boxes){let p={...from};const route=pathTo(p,to,boxes);assert(route.length,'route exists '+JSON.stringify({from,to}));for(const node of route){let guard=0;while(distance(p,node)>.06&&guard++<3000){const d=distance(p,node),step=Math.min(.09,d),q=move(p,(node.x-p.x)/d*step,(node.z-p.z)/d*step,boxes);assert(freeAt(q,boxes));assert(distance(q,p)>.00001,'route cannot get stuck');p=q;}assert(guard<3000);}assert(distance(p,to)<.13,'arrived');return p;}
test('3D: swept movement stops at buildings, bounds, corners and the locked physical gate',()=>{
 const boxes=obstacles(0);assert(distance(move({x:-7,z:6},-15,0,boxes),{x:-8.66,z:6})<.15);
 const p=move({x:0,z:-13},0,-20,boxes);assert(p.z>-15.4);const q=move({x:0,z:-13},0,-8,obstacles(0,true));assert(q.z<-20);
 const desk=move({x:-16,z:-10},0,-3,boxes);assert(desk.z>-11.22,'laboratory desks block the character');
 for(const d of [[200,200],[-200,200],[200,-200],[-200,-200]])assert(freeAt(move(SPAWN,...d,boxes),boxes));
});
test('3D: navigation goes around the central planter and uses the open room doorway',()=>{
 for(let i=0;i<6;i++){const boxes=obstacles(i);const start={x:0,z:8},end={x:0,z:0};assert(!clearLine(start,end,boxes));walk(start,end,boxes);walk(SPAWN,{x:-12,z:-6.7},boxes);walk({x:-12,z:-6.7},{x:12,z:-3.7},boxes);}
});
test('3D: complete all six missions using collision-checked routes, with a physical exit and final score',()=>{
 const s=newGame();s.started=true;let p={...SPAWN};
 for(let level=0;level<6;level++){
  const L=LEVELS[level],boxes=obstacles(level);assert.equal(s.level,level);assert.equal(finish(s),null);
  p=walk(p,{x:L.clue[0],z:L.clue[1]+1.25},boxes);assert.equal(interact(s,'clue',p),'clue');
  for(let i=0;i<3;i++){p=walk(p,{x:L.items[i][0],z:L.items[i][1]+1.25},boxes);assert.equal(interact(s,'item'+i,p),'collect');}
  p=walk(p,{x:0,z:-9.6},boxes);assert.equal(goal(s),'scan');assert.equal(interact(s,'scan',p),'scan');
  // Task completion is tested separately in the browser; this covers spatial mission rules.
  const robot=walk({x:0,z:17},{x:-1.4,z:-9},boxes);assert(distance(robot,{x:-1.4,z:-9})<.13);
  s.chapters[level].scanned=true;assert.equal(interact(s,'repair',p),'repair');s.chapters[level].restored=true;
  p=walk(p,{x:0,z:-21},obstacles(level,true));assert.equal(finish(s).score,350);assert.equal(finish(s),null);
  if(level<5){assert(advance(s));p={...s.position};}
 }
 assert(s.complete);assert.equal(score(s),2100);assert(!advance(s));
});
test('3D: interactions cannot be performed remotely or through a wall; relay order is enforced',()=>{
 const s=newGame();assert.equal(interact(s,'clue',SPAWN),'tooFar');assert.equal(interact(s,'item0',{x:6,z:10.2}),'needClue');
 s.level=1;s.chapters[1].clue=true;assert.equal(interact(s,'item2',{x:7,z:-7.7}),'order');assert.equal(goal(s),'items');
 const p={x:-7,z:-11};s.level=0;assert.equal(interact(s,'item1',p),'tooFar');
});
test('3D: speed bonus, pause-independent engine time and best scores do not multiply on repeat',()=>{
 const s=newGame({mode:'challenge'});Object.assign(s.chapters[0],{clue:true,items:[true,true,true],scanned:true,restored:true,elapsed:180});assert.equal(finish(s).score,470);assert.equal(score(s),470);
 s.chapters[0].finished=false;s.chapters[0].elapsed=400;assert.equal(finish(s).bonus,10);assert.equal(score(s),470);
});
test('3D: separate saves round-trip, reject broken prerequisites and recover blocked positions',()=>{
 const s=newGame({lang:'ru'});s.started=true;s.chapters[0].clue=true;s.position={x:7,z:12};const raw=JSON.stringify(s);assert.deepEqual(parseSave(raw),s);assert.notEqual(SAVE_KEY,'eliana-n25x.save.v1');assert.equal(parseSave('{'),null);
 s.position={x:-13,z:6};assert.deepEqual(parseSave(JSON.stringify(s)).position,SPAWN);s.chapters[0].restored=true;assert.equal(parseSave(JSON.stringify(s)),null);
});
test('3D: all four languages translate every UI key and all six missions; first visit is German',()=>{
 assert.equal(newGame().lang,'de');for(const lang of LANGUAGES){assert.deepEqual(Object.keys(TEXT[lang]).sort(),Object.keys(TEXT.de).sort());for(const [key,value]of Object.entries(TEXT[lang])){assert(value,lang+key);if(Array.isArray(value)){assert.equal(value.length,6);assert(value.every(v=>typeof v==='string'&&v.length>3));}}}
 assert(TEXT.ru.rights.includes('Все права защищены'));assert(TEXT.uk.rights.includes('Усі права захищені'));
});
test('3D: the characters are volumetric articulated models with changing walk/run joint poses',()=>{
 for(const robot of [false,true]){const actor=createActor(robot);let meshes=0;actor.root.traverse(o=>{if(o.isMesh){meshes++;assert(o.geometry.attributes.position.count>3);}});assert(meshes>35);assert.equal(actor.legs.length,2);assert.equal(actor.arms.length,2);actor.update(.1,2.65);const a=actor.legs[0].upper.rotation.x;actor.update(.15,5);assert.notEqual(actor.legs[0].upper.rotation.x,a);assert(actor.legs[0].lower.rotation.x<=0);actor.update(.2,0,true);assert.equal(actor.arms[0].shoulder.rotation.x,-.95);}
});
test('3D: emitted offline inventory contains every local module, texture, font, icon and license',async()=>{
 const metadata=JSON.parse(await fs.readFile(new URL('build-info.json',dir),'utf8'));assert.equal(metadata.locations,6);assert.deepEqual(metadata.languages,LANGUAGES);
 for(const [file,hash]of Object.entries(metadata.hashes)){const bytes=await fs.readFile(new URL(file,dir));assert.equal(createHash('sha256').update(bytes).digest('hex'),hash);if(/\.m?js$/.test(file)){const text=bytes.toString();for(const m of text.matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g)){const resolved=new URL(m[1],new URL(file,dir));assert(await fs.stat(resolved));assert(Object.keys(metadata.hashes).includes('./'+resolved.pathname.slice(dir.pathname.length)),m[1]);}}}
 assert(metadata.hashes['./vendor/three.module.js']);assert(metadata.hashes['./audio.mjs']);assert(metadata.hashes['./actors.mjs']);
});
async function swHarness(){
 const handlers={},stores=new Map(),messages=[],root='https://example.test/Netaniya/eliana-n25x/3d/';let network=true;
 const caches={async open(key){if(!stores.has(key))stores.set(key,new Map());const store=stores.get(key);return {async match(req){return store.get(typeof req==='string'?req:req.url)?.clone();},async put(req,response){store.set(typeof req==='string'?req:req.url,response.clone());}};},async keys(){return [...stores.keys()];},async delete(key){return stores.delete(key);}};
 const context={URL,Request,Response,Uint8Array,crypto:webcrypto,caches,fetch:async req=>{if(!network)throw Error('offline');const path=(typeof req==='string'?req:req.url).slice(root.length);try{return new Response(await fs.readFile(new URL(path,dir)),{status:200});}catch{return new Response('',{status:404});}},self:{registration:{scope:root},location:{origin:'https://example.test'},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(name,fn)=>handlers[name]=fn}};
 vm.runInNewContext(await fs.readFile(new URL('sw.js',dir),'utf8'),context);async function event(name,extra={}){let work;handlers[name]({...extra,waitUntil:p=>work=p,respondWith:p=>work=p});return await work;}
 return {root,caches,stores,messages,event,setNetwork:v=>network=v,message:()=>event('message',{data:{type:'VERIFY_OFFLINE'},source:{postMessage:m=>messages.push(m)}})};
}
test('3D: offline worker verifies real bytes and serves a cold navigation plus every dependency without network',async()=>{
 const h=await swHarness();await h.event('install');await h.event('activate');await h.message();assert.equal(h.messages.at(-1).type,'OFFLINE_READY');h.setNetwork(false);
 const home=await h.event('fetch',{request:{method:'GET',url:h.root,mode:'navigate'}});assert(home.ok);assert((await home.text()).includes('id="viewport"'));
 const metadata=JSON.parse(await fs.readFile(new URL('build-info.json',dir),'utf8'));for(const file of Object.keys(metadata.hashes)){const r=await h.event('fetch',{request:new Request(new URL(file,h.root))});assert(r.ok,file);assert((await r.arrayBuffer()).byteLength>0);}
});
test('3D: incomplete/corrupt offline files never report ready and classic caches survive upgrades',async()=>{
 const h=await swHarness();h.setNetwork(false);await assert.rejects(h.event('install'));h.setNetwork(true);await h.event('install');const name=[...h.stores.keys()][0];await (await h.caches.open(name)).put(h.root+'actors.mjs',new Response('corrupted'));await h.message();assert.equal(h.messages.at(-1).type,'OFFLINE_ERROR');
 await h.caches.open('en25x-classic-version');await h.caches.open('en25x3d-old');await h.event('activate');assert(h.stores.has('en25x-classic-version'));assert(!h.stores.has('en25x3d-old'));
});
