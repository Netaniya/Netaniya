const CACHE='__CACHE_VERSION__';
const FILES=__PRECACHE_FILES__;
const scoped=path=>new URL(path,self.registration.scope).href;
let preparing;
async function prepare(){if(preparing)return preparing;preparing=(async()=>{const cache=await caches.open(CACHE);for(const path of FILES){const url=scoped(path);if(!await cache.match(url)){const response=await fetch(new Request(url,{cache:'reload'}));if(!response.ok)throw Error('asset_unavailable');await cache.put(url,response);}}return cache;})();try{return await preparing;}finally{preparing=null;}}
self.addEventListener('install',event=>{event.waitUntil(prepare().then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('en25x-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('message',event=>{
 if(!['CACHE_ALL','STATUS'].includes(event.data?.type))return;
 event.waitUntil((async()=>{try{const cache=await prepare();for(const path of FILES)if(!await cache.match(scoped(path)))throw Error('incomplete');event.source?.postMessage({type:'OFFLINE_READY',count:FILES.length});}catch{event.source?.postMessage({type:'OFFLINE_ERROR'});}})());
});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 if(request.mode==='navigate'){event.respondWith((async()=>{const cache=await caches.open(CACHE),home=url.pathname===new URL(self.registration.scope).pathname||url.pathname===new URL(scoped('./index.html')).pathname,key=home?scoped('./index.html'):request;try{const response=await fetch(request);if(response.ok){await cache.put(key,response.clone());return response;}}catch{}return await cache.match(key)||Response.error();})());return;}
 event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(request,{ignoreSearch:true});if(cached)return cached;const response=await fetch(request);if(response.ok&&url.origin===self.location.origin)await cache.put(request,response.clone());return response;})());
});
