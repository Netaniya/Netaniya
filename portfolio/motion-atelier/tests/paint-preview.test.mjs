import test from 'node:test';import assert from 'node:assert/strict';import {parseHTML} from 'linkedom';
import {recolorPaint,createPaintPreviews} from '../dist/paint-preview.mjs?v=8';
const source=()=>({width:3,height:1,data:new Uint8ClampedArray([7,89,182,255,32,32,32,255,0,0,0,0])});
test('four paint choices produce distinct body colors while preserving neutral material and alpha',()=>{
 const pixels=source(),results=Object.fromEntries(['ocean','silver','ruby','graphite'].map(paint=>[paint,recolorPaint(pixels,paint).data]));
 assert.equal(new Set(Object.values(results).map(x=>[...x.slice(0,3)].join(','))).size,4);assert(results.ruby[0]>results.ruby[2]*2);assert(results.ocean[2]>results.ocean[0]*2);assert(Math.abs(results.silver[0]-results.silver[2])<20);assert(results.graphite[0]<results.silver[0]);
 for(const out of Object.values(results)){assert.deepEqual([...out.slice(4)],[32,32,32,255,0,0,0,0]);assert.equal(out[3],255);}
 const glass={width:2,height:1,data:new Uint8ClampedArray([116,154,212,252,43,59,74,252])};for(const paint of ['silver','ruby','graphite'])assert.deepEqual(recolorPaint(glass,paint).data,glass.data,'glass reflections retain their source color');
});
test('recoloring never mutates the source, retains edge alpha and rejects unknown choices',()=>{
 const pixels=source();pixels.data[3]=120;const before=new Uint8ClampedArray(pixels.data);recolorPaint(pixels,'ruby');assert.deepEqual(pixels.data,before);assert.equal(recolorPaint(pixels,'graphite').data[3],120);assert.throws(()=>recolorPaint(pixels,'unknown'),/invalid_paint/);assert.throws(()=>recolorPaint({width:2,height:2,data:[]},'ruby'),/invalid_pixels/);
});
test('model-specific glass protection retains sky reflections while recoloring muted body reflections',()=>{
 const pixels={width:1628,height:966,data:new Uint8ClampedArray(1628*966*4)},glass=(290*1628+680)*4,body=(500*1628+1000)*4;
 pixels.data.set([116,154,212,252],glass);pixels.data.set([116,154,212,252],body);
 for(const paint of ['ruby','silver','graphite']){const result=recolorPaint(pixels,paint,'sport-03').data;assert.deepEqual([...result.slice(glass,glass+4)],[116,154,212,252]);assert.notDeepEqual([...result.slice(body,body+3)],[116,154,212]);assert.equal(result[body+3],252);}
 const white={width:1,height:1,data:new Uint8ClampedArray([250,252,255,255])};assert.deepEqual(recolorPaint(white,'graphite','sport-03').data,white.data);
});
function scene(paint='ruby'){
 const {document,window}=parseHTML('<html><body><main><div data-paint-preview data-paint="'+paint+'" data-paint-src="/assets/test.webp" data-loading="Loading" data-unavailable="Unavailable"><img data-paint-fallback><canvas hidden></canvas><p data-paint-status></p></div></main></body></html>');const root=document.querySelector('main'),node=root.firstElementChild,canvas=node.querySelector('canvas'),written=[];
 canvas.getContext=()=>({createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData:output=>written.push(output)});
 return {document,window,root,node,canvas,written};
}
test('decoded preview visibly replaces the fallback with the selected pixel color',async()=>{
 const s=scene(),view=createPaintPreviews({doc:s.document,win:s.window,loadPixels:async()=>source()});await view.sync(s.root);assert.equal(s.canvas.hidden,false);assert.equal(s.node.querySelector('[data-paint-fallback]').hidden,true);assert.equal(s.node.dataset.previewState,'ready');assert.equal(s.node.getAttribute('aria-busy'),'false');assert(s.written[0].data[0]>s.written[0].data[2]);
});
test('rapid paint selection reuses decoded pixels and never commits a stale render',async()=>{
 const s=scene();let release,calls=0;const promise=new Promise(resolve=>{release=resolve;}),view=createPaintPreviews({doc:s.document,win:s.window,loadPixels:()=>{calls++;return promise;}});const old=view.sync(s.root);view.destroy();s.node.dataset.paint='silver';release(source());await old;assert.equal(s.written.length,0);await view.sync(s.root);assert.equal(calls,1);assert.equal(s.written.length,1);assert(Math.abs(s.written[0].data[0]-s.written[0].data[2])<20);
});
test('missing image keeps the original visible, announces failure and allows a later retry',async()=>{
 const s=scene();let fail=true;const view=createPaintPreviews({doc:s.document,win:s.window,loadPixels:async()=>{if(fail)throw Error('offline');return source();}});await view.sync(s.root);assert.equal(s.canvas.hidden,true);assert.equal(s.node.querySelector('[data-paint-fallback]').hidden,false);assert.equal(s.node.querySelector('[data-paint-status]').textContent,'Unavailable');assert.equal(s.node.getAttribute('aria-busy'),'false');fail=false;view.destroy();await view.sync(s.root);assert.equal(s.node.dataset.previewState,'ready');
});
test('a detached preview is not painted after its image finishes loading',async()=>{
 const s=scene();let release;const view=createPaintPreviews({doc:s.document,win:s.window,loadPixels:()=>new Promise(resolve=>{release=resolve;})});const pending=view.sync(s.root);s.node.remove();release(source());await pending;assert.equal(s.written.length,0);
});
