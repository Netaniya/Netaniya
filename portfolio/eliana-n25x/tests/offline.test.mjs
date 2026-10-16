import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const source=await fs.readFile(new URL('../sw.js',import.meta.url),'utf8');
const scope='https://example.test/Netaniya/eliana-n25x/';
function worker(){
 const handlers={},stores=new Map(),network={online:true,bad:null,calls:[]},lifecycle={claimed:false,skipped:false},messages=[];
 const key=x=>typeof x==='string'?x:x.url;
 const caches={async open(name){if(!stores.has(name))stores.set(name,new Map());const map=stores.get(name);return {async match(request,{ignoreSearch=false}={}){const query=key(request);for(const [url,response]of map){if((ignoreSearch?url.split('?')[0]:url)===(ignoreSearch?query.split('?')[0]:query))return response.clone();}},async put(request,response){map.set(key(request),response.clone());}};},async keys(){return [...stores.keys()];},async delete(name){return stores.delete(name);}};
 const ctx={URL,Request,Response,caches,self:{registration:{scope},location:{origin:new URL(scope).origin},addEventListener:(type,fn)=>handlers[type]=fn,skipWaiting:async()=>{lifecycle.skipped=true;},clients:{claim:async()=>{lifecycle.claimed=true;}}},fetch:async request=>{const url=key(request);network.calls.push(url);if(!network.online)throw Error('offline');return new Response(url,{status:url===network.bad?404:200});}};
 vm.createContext(ctx);vm.runInContext(source,ctx);
 return {stores,network,lifecycle,messages,files:vm.runInContext('FILES',ctx),cache:vm.runInContext('CACHE',ctx),async event(type,values={}){let result;handlers[type]({...values,waitUntil:p=>result=p,respondWith:p=>result=p,source:{postMessage:m=>messages.push(m)}});return result===undefined?undefined:await result;}};
}
test('install caches every complete scene, font, module and icon before reporting offline readiness',async()=>{
 const w=worker();await w.event('install');assert.equal(w.lifecycle.skipped,true);assert.equal(w.stores.get(w.cache).size,w.files.length);
 for(const name of ['super-city','silent-city','aurora-school','sky-garden','home-sector','sky-station'])assert(w.files.includes('./assets/'+name+'.webp'));
 await w.event('message',{data:{type:'STATUS'}});assert.equal(w.messages[0].type,'OFFLINE_READY');assert.equal(w.messages[0].count,w.files.length);
});
test('offline home navigation and queried static modules return cached content',async()=>{
 const w=worker();await w.event('install');w.network.online=false;
 const home=await w.event('fetch',{request:{url:scope+'?source=installed',method:'GET',mode:'navigate'}});assert.equal(await home.text(),scope+'index.html');
 const app=await w.event('fetch',{request:new Request(scope+'app.mjs?v=1')});assert.equal(await app.text(),scope+'app.mjs');
 assert.equal(await w.event('fetch',{request:new Request('https://other.test/a')}),undefined);
 assert.equal(await w.event('fetch',{request:new Request('https://example.test/Netaniya/motion-atelier/')}),undefined);
 assert.equal(await w.event('fetch',{request:new Request(scope+'api',{method:'POST',body:'x'})}),undefined);
});
test('missing assets never produce a false offline-ready signal, and retry repairs the cache',async()=>{
 const w=worker();w.network.bad=scope+'assets/sky-garden.webp';await w.event('message',{data:{type:'CACHE_ALL'}});assert.equal(w.messages.at(-1).type,'OFFLINE_ERROR');
 w.network.bad=null;await w.event('message',{data:{type:'CACHE_ALL'}});assert.equal(w.messages.at(-1).type,'OFFLINE_READY');
});
test('activation removes only older Eliana caches and preserves other portfolio projects',async()=>{
 const w=worker();w.stores.set('en25x-old',new Map());w.stores.set('motion-atelier-v1',new Map());await w.event('install');await w.event('activate');assert.equal(w.lifecycle.claimed,true);assert(!w.stores.has('en25x-old'));assert(w.stores.has('motion-atelier-v1'));assert(w.stores.has(w.cache));
});
test('navigating a downloadable file cannot overwrite the cached game entry point',async()=>{
 const w=worker();await w.event('install');await w.event('fetch',{request:{url:scope+'download/eliana-n25x-offline.html',method:'GET',mode:'navigate'}});w.network.online=false;
 const home=await w.event('fetch',{request:{url:scope,method:'GET',mode:'navigate'}});assert.equal(await home.text(),scope+'index.html');
});
