import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {createRouteMap,mapCoordinates,loadLeaflet,TILE_URL} from '../dist/route-map.mjs?v=8';

function fixture(){
 const {document}=parseHTML('<html><head></head><body><div id="map"></div><div id="fallback"></div><p id="status"></p><button id="retry"></button><button id="fit"></button></body></html>');
 const events=new Map(),calls={maps:0,removed:0,lines:[],markers:[],bounds:[],tiles:[]};
 const map={remove(){calls.removed++;},fitBounds(bounds,options){calls.bounds.push({bounds,options});}};
 const L={map(){calls.maps++;return map;},control:{zoom:options=>({addTo(){calls.zoom=options;return this;}})},polyline:(points,options)=>({addTo(){calls.lines.push({points,options});return this;},getBounds(){return points;}}),circleMarker:(point,options)=>({bindTooltip(node){calls.markers.push({point,node,options});return this;},addTo(){return this;}}),tileLayer:(url,options)=>{calls.tiles.push({url,options});return {on(name,fn){events.set(name,fn);return this;},addTo(){return this;}};}};
 const args={container:document.getElementById('map'),fallback:document.getElementById('fallback'),status:document.getElementById('status'),retry:document.getElementById('retry'),fitButton:document.getElementById('fit'),geometry:[[11.5,48.1],[12,48],[13,47.8]],fromName:'München',toName:'Salzburg',labels:{loading:'Loading',ready:'Road route',estimated:'Estimate',unavailable:'Unavailable',zoomIn:'Zoom in',zoomOut:'Zoom out'}};
 return {document,L,args,calls,events};
}

test('route coordinates change from GeoJSON lon/lat to map lat/lon and retain endpoints',()=>{
 assert.deepEqual(mapCoordinates([[11.5,48.1],[13,47.8]]),[[48.1,11.5],[47.8,13]]);
 const dense=Array.from({length:18000},(_,i)=>[10+i/10000,48]);const result=mapCoordinates(dense);
 assert(result.length<=5001);assert.deepEqual(result.at(-1),[48,dense.at(-1)[0]]);
 assert.throws(()=>mapCoordinates([[999,48],[12,49]]));assert.throws(()=>mapCoordinates([[11,NaN],[12,49]]));
});

test('map draws road geometry with real tile attribution, labelled endpoints and full-route control',async()=>{
 const f=fixture(),controller=createRouteMap({doc:f.document,win:{},loadLibrary:async()=>f.L});await controller.mount(f.args);
 assert.equal(f.calls.maps,1);assert.deepEqual(f.calls.lines[0].points,[[48.1,11.5],[48,12],[47.8,13]]);assert.equal(f.calls.lines[0].options.dashArray,null);
 assert.deepEqual(f.calls.markers.map(x=>x.node.textContent),['München','Salzburg']);assert.equal(f.calls.tiles[0].url,TILE_URL);assert.match(f.calls.tiles[0].options.attribution,/OpenStreetMap contributors/);
 assert.equal(f.args.container.inert,true);f.events.get('tileload')();assert.equal(f.args.fallback.hidden,true);assert.equal(f.args.container.inert,false);assert.equal(f.args.status.textContent,'Road route');
 controller.fit();assert.equal(f.calls.bounds.length,2);assert.equal(f.calls.bounds[1].options.animate,false);
});

test('estimated connections stay dashed and failed tiles restore the labelled schematic',async()=>{
 const f=fixture(),controller=createRouteMap({doc:f.document,win:{},loadLibrary:async()=>f.L});await controller.mount({...f.args,estimated:true});assert.equal(f.calls.lines[0].options.dashArray,'10 10');
 f.events.get('tileload')();assert.equal(f.args.status.textContent,'Estimate');f.events.get('loading')();f.events.get('tileerror')();f.events.get('load')();
 assert.equal(f.args.fallback.hidden,false);assert.equal(f.args.container.hidden,true);assert.equal(f.args.status.textContent,'Unavailable');assert.equal(f.args.retry.hidden,false);assert.equal(f.calls.removed,1);
});

test('late library resolution cannot recreate a map after the route or page has changed',async()=>{
 const f=fixture();let resolve;const pending=new Promise(r=>resolve=r);const controller=createRouteMap({doc:f.document,win:{},loadLibrary:()=>pending});const run=controller.mount(f.args);controller.destroy();resolve(f.L);await run;assert.equal(f.calls.maps,0);
 const failing=createRouteMap({doc:f.document,win:{},loadLibrary:async()=>{throw Error('blocked');}});await failing.mount(f.args);assert.equal(f.args.fallback.hidden,false);assert.equal(f.args.retry.hidden,false);assert.equal(f.args.status.textContent,'Unavailable');
});

test('library loader requires its stylesheet and validates both assets before creating maps',async()=>{
 const {document}=parseHTML('<html><head></head><body></body></html>');const timers=new Map();let timer=0;const win={L:{map(){}},setTimeout:fn=>{timers.set(++timer,fn);return timer;},clearTimeout:id=>timers.delete(id)};
 let ready=false;const load=loadLeaflet({doc:document,win}).then(value=>{ready=true;return value;});
 const css=document.querySelector('link'),script=document.querySelector('script');assert(css&&script);assert.match(css.integrity,/^sha256-/);assert.match(script.integrity,/^sha256-/);
 script.onload();await Promise.resolve();assert.equal(ready,false);css.onload();assert.equal(await load,win.L);assert(document.querySelector('link[data-leaflet-ready]'));assert.equal(timers.size,0);
});
