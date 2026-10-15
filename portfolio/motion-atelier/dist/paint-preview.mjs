const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=(a,b,value)=>{const t=clamp((value-a)/(b-a));return t*t*(3-2*t);};
export const PAINT_TONES=Object.freeze({ocean:{h:212,s:1,tone:'blue'},silver:{h:214,s:.045,tone:'silver'},ruby:{h:350,s:.88,tone:'red'},graphite:{h:216,s:.1,tone:'dark'}});
const protectedMaterials={
 'gt-01':{size:[1536,1024],polygons:[[[518,261],[633,251],[800,253],[934,258],[981,270],[1027,306],[1088,361],[1136,390],[1150,401],[1142,406],[585,407],[569,400],[557,385],[544,352],[531,316]],[[397,244],[423,253],[447,273],[468,303],[486,341],[507,394],[511,411],[479,410],[476,377],[470,363],[459,361],[439,365],[411,373],[398,381],[391,397],[387,403],[357,397],[367,347],[383,286]],[[379,242],[352,244],[325,251],[296,264],[268,282],[245,303],[231,322],[230,338],[238,350],[253,361],[279,373],[307,383],[333,391],[346,344],[362,289]]]},
 'cross-02':{size:[1639,959],polygons:[[[414,319],[573,179],[714,123],[1018,101],[1140,124],[983,323],[967,334]],[[1189,136],[1228,137],[1283,154],[1296,295],[1200,316],[1184,279],[1123,266],[1114,329],[1067,335],[1117,225],[1150,174]],[[1296,162],[1402,212],[1435,250],[1429,273],[1395,286],[1305,303]]]},
 'sport-03':{size:[1628,966],polygons:[[[205,366],[655,202],[910,203],[515,390]],[[568,411],[967,228],[1018,239],[1056,356],[811,385]],[[1025,241],[1228,277],[1251,345],[1070,358]],[[56,451],[419,471],[419,487],[56,467]]]}
};
const masks=new WeakMap();
function materialMask(source,model){
 const spec=protectedMaterials[model];if(!spec)return null;
 if(!masks.has(source))masks.set(source,new Map());const cached=masks.get(source);if(cached.has(model))return cached.get(model);
 const {width,height}=source,mask=new Uint8Array(width*height),sx=width/spec.size[0],sy=height/spec.size[1];
 for(const original of spec.polygons){const poly=original.map(([x,y])=>[x*sx,y*sy]),min=Math.max(0,Math.floor(Math.min(...poly.map(p=>p[1])))),max=Math.min(height-1,Math.ceil(Math.max(...poly.map(p=>p[1]))));
  for(let y=min;y<=max;y++){const cuts=[];for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[j],b=poly[i],row=y+.5;if((a[1]<=row&&b[1]>row)||(b[1]<=row&&a[1]>row))cuts.push(a[0]+(row-a[1])*(b[0]-a[0])/(b[1]-a[1]));}cuts.sort((a,b)=>a-b);for(let i=0;i+1<cuts.length;i+=2)mask.fill(1,y*width+Math.max(0,Math.ceil(cuts[i])),y*width+Math.min(width,Math.floor(cuts[i+1])+1));}
 }
 cached.set(model,mask);return mask;
}

function rgbToHsl(r,g,b){
 r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min,l=(max+min)/2;
 if(!delta)return [0,0,l];
 let h=max===r?(g-b)/delta+(g<b?6:0):max===g?(b-r)/delta+2:(r-g)/delta+4;
 return [h*60,delta/(1-Math.abs(2*l-1)),l];
}
function hslToRgb(h,s,l){const a=s*Math.min(l,1-l),f=n=>{const k=(n+h/30)%12;return 255*(l-a*Math.max(-1,Math.min(k-3,9-k,1)));};return [f(0),f(8),f(4)];}

// Runtime shader for blue-painted cutouts. Neutral glass, tires, lights and transparent
// pixels retain their source values. The source buffer is never changed.
export function recolorPaint(source,paint,model){
 const palette=PAINT_TONES[paint];if(!palette)throw Error('invalid_paint');
 if(!source||!Number.isInteger(source.width)||!Number.isInteger(source.height)||source.width<1||source.height<1||source.data?.length!==source.width*source.height*4)throw Error('invalid_pixels');
 const output=new Uint8ClampedArray(source.data);
 if(paint==='ocean')return {data:output,width:source.width,height:source.height};
 const protectedMask=materialMask(source,model);
 for(let i=0;i<output.length;i+=4){
  if(!source.data[i+3]||protectedMask?.[i/4])continue;
  const [h,s,l]=rgbToHsl(source.data[i],source.data[i+1],source.data[i+2]);
  const chroma=(Math.max(source.data[i],source.data[i+1],source.data[i+2])-Math.min(source.data[i],source.data[i+1],source.data[i+2]))/255;
  const blend=(protectedMask?smooth(.08,.23,s):smooth(.58,.78,s))*smooth(.08,.16,chroma)*smooth(175,198,h)*(1-smooth(252,274,h));
  if(!blend)continue;
  const light=palette.tone==='silver'?Math.pow(l,.68):palette.tone==='dark'?l*.48:l*.93;
  const target=hslToRgb(palette.h,palette.tone==='red'?Math.min(1,s*palette.s):palette.s,clamp(light));
  for(let channel=0;channel<3;channel++)output[i+channel]=source.data[i+channel]*(1-blend)+target[channel]*blend;
 }
 return {data:output,width:source.width,height:source.height};
}

export function createPaintPreviews({doc,win,loadPixels}){
 let sequence=0;const sources=new Map();
 const decode=loadPixels??(url=>new Promise((resolve,reject)=>{
  const image=new win.Image();let done=false;
  const finish=(error,value)=>{if(done)return;done=true;win.clearTimeout(timer);image.onload=null;image.onerror=null;error?reject(error):resolve(value);};
  const timer=win.setTimeout(()=>finish(Error('preview_timeout')),12000);
  image.decoding='async';image.onerror=()=>finish(Error('preview_image_unavailable'));
  image.onload=()=>{try{const scale=Math.min(1,1000/image.naturalWidth),width=Math.max(1,Math.round(image.naturalWidth*scale)),height=Math.max(1,Math.round(image.naturalHeight*scale));const canvas=doc.createElement('canvas');canvas.width=width;canvas.height=height;const context=canvas.getContext('2d',{willReadFrequently:true});if(!context)throw Error('canvas_unavailable');context.drawImage(image,0,0,width,height);const pixels=context.getImageData(0,0,width,height);finish(null,{width,height,data:new Uint8ClampedArray(pixels.data)});}catch(error){finish(error);}};
  image.src=url;
 }));
 const source=url=>{if(!sources.has(url)){const promise=decode(url).catch(error=>{sources.delete(url);throw error;});sources.set(url,promise);}return sources.get(url);};
 function destroy(){sequence++;}
 async function sync(root){
  const own=sequence;
  await Promise.allSettled([...root.querySelectorAll('[data-paint-preview]')].map(async node=>{
   const canvas=node.querySelector('canvas'),fallback=node.querySelector('[data-paint-fallback]'),status=node.querySelector('[data-paint-status]');
   node.dataset.previewState='loading';node.setAttribute('aria-busy','true');canvas.hidden=true;fallback.hidden=false;status.textContent=node.dataset.loading;
   try{
    const original=await source(node.dataset.paintSrc);if(own!==sequence||!node.isConnected)return;
    const pixels=recolorPaint(original,node.dataset.paint,node.dataset.paintModel),context=canvas.getContext('2d');if(!context)throw Error('canvas_unavailable');
    canvas.width=pixels.width;canvas.height=pixels.height;const image=context.createImageData(pixels.width,pixels.height);image.data.set(pixels.data);context.putImageData(image,0,0);
    canvas.hidden=false;fallback.hidden=true;status.textContent='';node.dataset.previewState='ready';node.setAttribute('aria-busy','false');
   }catch{
    if(own!==sequence||!node.isConnected)return;canvas.hidden=true;fallback.hidden=false;status.textContent=node.dataset.unavailable;node.dataset.previewState='error';node.setAttribute('aria-busy','false');
   }
  }));
 }
 return {sync,destroy};
}
