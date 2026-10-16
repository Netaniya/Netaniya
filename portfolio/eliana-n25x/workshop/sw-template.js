const CACHE='__CACHE_VERSION__';
const FILES=__PRECACHE_FILES__;
const HASHES=__PRECACHE_HASHES__;
const scoped=path=>new URL(path,self.registration.scope).href;
let preparing;
async function prepare(){
 if(preparing)return preparing;
 preparing=(async()=>{const cache=await caches.open(CACHE);for(const path of FILES){const url=scoped(path);if(!await cache.match(url)){const response=await fetch(new Request(url,{cache:'reload'}));if(!response.ok)throw Error('asset_unavailable');await cache.put(url,response);}}return cache;})();
 try{return await preparing;}finally{preparing=null;}
}
async function verify(){const cache=await prepare();for(const path of FILES){const response=await cache.match(scoped(path));if(!response||!response.ok)throw Error('incomplete');const digest=await crypto.subtle.digest('SHA-256',await response.arrayBuffer());const hash=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');if(hash!==HASHES[path])throw Error('integrity');}return FILES.length;}
self.addEventListener('install',event=>event.waitUntil(verify().then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('en25xstudio-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type!=='VERIFY_OFFLINE')return;event.waitUntil((async()=>{try{const count=await verify();event.source?.postMessage({type:'OFFLINE_READY',version:CACHE,count});}catch{event.source?.postMessage({type:'OFFLINE_ERROR'});}})());});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 if(event.request.mode==='navigate'){event.respondWith((async()=>{try{const response=await fetch(event.request);if(response.ok)return response;}catch{}const cache=await caches.open(CACHE);return await cache.match(scoped('./index.html'))||Response.error();})());return;}
 event.respondWith((async()=>{const cache=await caches.open(CACHE);return await cache.match(event.request,{ignoreSearch:true})||fetch(event.request);})());
});
