const libraryLoads=new WeakMap();
export const TILE_URL='https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export function loadLeaflet({doc,win}){
 if(win.L?.map&&doc.querySelector('link[data-leaflet-ready]'))return Promise.resolve(win.L);
 if(libraryLoads.has(doc))return libraryLoads.get(doc);
 const promise=new Promise((resolve,reject)=>{
  const css=doc.createElement('link'),script=doc.createElement('script');let styleReady=false,scriptReady=false,done=false;
  css.rel='stylesheet';css.href='/assets/vendor/leaflet/leaflet.css?v=1.9.4';css.integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
  script.src='/assets/vendor/leaflet/leaflet.js?v=1.9.4';script.integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';script.async=true;
  const fail=()=>{if(done)return;done=true;win.clearTimeout(timer);css.remove();script.remove();libraryLoads.delete(doc);reject(new Error('map_library_unavailable'));};
  const ready=()=>{if(done||!styleReady||!scriptReady)return;if(!win.L?.map){fail();return;}done=true;win.clearTimeout(timer);resolve(win.L);};
  const timer=win.setTimeout(fail,8000);
  css.onload=()=>{styleReady=true;css.setAttribute('data-leaflet-ready','true');ready();};script.onload=()=>{scriptReady=true;ready();};css.onerror=fail;script.onerror=fail;
  doc.head.append(css,script);
 });
 libraryLoads.set(doc,promise);return promise;
}

export function mapCoordinates(geometry,maxPoints=5000){
 if(!Array.isArray(geometry)||geometry.length<2)throw new Error('invalid_geometry');
 for(const point of geometry)if(!Array.isArray(point)||point.length<2||!Number.isFinite(point[0])||!Number.isFinite(point[1])||Math.abs(point[0])>180||Math.abs(point[1])>90)throw new Error('invalid_geometry');
 const step=Math.max(1,Math.ceil(geometry.length/maxPoints));
 return geometry.filter((_,i)=>i%step===0||i===geometry.length-1).map(([lon,lat])=>[lat,lon]);
}

export function createRouteMap({doc,win,loadLibrary=()=>loadLeaflet({doc,win})}){
 let active=null,sequence=0,bounds=null;
 function destroy(){++sequence;if(active){active.remove();active=null;}bounds=null;}
 function fit(){if(active&&bounds)active.fitBounds(bounds,{padding:[28,28],maxZoom:12,animate:false});}
 async function mount({container,fallback,status,retry,fitButton,geometry,fromName,toName,estimated=false,labels}){
  destroy();const own=sequence;status.textContent=labels.loading;retry.hidden=true;fitButton.disabled=true;container.hidden=true;container.inert=true;fallback.hidden=false;
  const unavailable=()=>{if(own!==sequence)return;container.hidden=true;container.inert=true;fallback.hidden=false;status.textContent=labels.unavailable;retry.hidden=false;fitButton.disabled=true;if(active){active.remove();active=null;}bounds=null;};
  try{
   const points=mapCoordinates(geometry),L=await loadLibrary();if(own!==sequence||!container.isConnected)return;
   container.hidden=false;
   const map=L.map(container,{zoomControl:false,scrollWheelZoom:false,preferCanvas:true});active=map;
   L.control.zoom({zoomInTitle:labels.zoomIn,zoomOutTitle:labels.zoomOut,zoomInText:'+',zoomOutText:'−'}).addTo(map);
   const line=L.polyline(points,{color:'#0759d9',weight:5,opacity:.95,dashArray:estimated?'10 10':null,smoothFactor:1.2}).addTo(map);bounds=line.getBounds();
   const marker=(position,name,color)=>{const label=doc.createElement('span');label.textContent=name;return L.circleMarker(position,{radius:7,weight:3,color:'#fff',fillColor:color,fillOpacity:1}).bindTooltip(label,{direction:'top'}).addTo(map);};
   marker(points[0],fromName,'#0759d9');marker(points.at(-1),toName,'#16846b');
   let loaded=0,failed=0;
   const tiles=L.tileLayer(TILE_URL,{maxZoom:19,minZoom:2,keepBuffer:0,updateWhenIdle:true,updateWhenZooming:false,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'});
   tiles.on('loading',()=>{loaded=0;failed=0;});
   tiles.on('tileload',()=>{if(own!==sequence||active!==map)return;loaded++;container.inert=false;fallback.hidden=true;status.textContent=estimated?labels.estimated:labels.ready;retry.hidden=true;fitButton.disabled=false;});
   tiles.on('tileerror',()=>{failed++;});
   tiles.on('load',()=>{if(loaded===0&&failed>0)unavailable();});
   tiles.addTo(map);fit();
  }catch{unavailable();}
 }
 return {mount,destroy,fit};
}
