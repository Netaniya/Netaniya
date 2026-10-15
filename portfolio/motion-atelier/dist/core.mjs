import {VEHICLES,PAINTS,WHEELS,INTERIORS,CITIES,LANGS,LOCALES} from './data.mjs?v=8';
export const vehicle=id=>VEHICLES.find(x=>x.id===id)||VEHICLES[0];
export const defaultConfig=id=>({model:vehicle(id).id,paint:'ocean',wheels:'aero',interior:'light'});
export function validConfig(c){return c&&VEHICLES.some(v=>v.id===c.model)&&PAINTS.some(v=>v.id===c.paint)&&WHEELS.some(v=>v.id===c.wheels)&&INTERIORS.some(v=>v.id===c.interior);}
export function configuration(c){if(!validConfig(c))throw new Error('invalid_config');const v=vehicle(c.model),p=PAINTS.find(x=>x.id===c.paint),w=WHEELS.find(x=>x.id===c.wheels),i=INTERIORS.find(x=>x.id===c.interior);return {...c,price:v.price+p.price+w.price+i.price,consumption:v.consumption+w.extraConsumption,battery:v.battery,range:Math.floor(v.battery/(v.consumption+w.extraConsumption)*100)};}
export const money=(cents,lang='de')=>new Intl.NumberFormat(LOCALES[lang]||LOCALES.de,{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(cents/100);
export const number=(n,lang='de',digits=0)=>new Intl.NumberFormat(LOCALES[lang]||LOCALES.de,{maximumFractionDigits:digits}).format(n);
function finite(n,min,max){if(typeof n!=='number'||!Number.isFinite(n)||n<min||n>max)throw new Error('invalid_number');return n;}
export function planEnergy({distance,battery,consumption,start=90,reserve=15,chargeTo=80,price=.59,chargeKw=140}){
 finite(distance,0,10000);finite(battery,10,300);finite(consumption,5,60);finite(start,5,100);finite(reserve,5,40);finite(chargeTo,50,100);finite(price,0,3);finite(chargeKw,1,500);
 if(start<=reserve||chargeTo<=reserve)throw new Error('invalid_soc');
 const required=distance*consumption/100,available=(start-reserve)*battery/100,perStop=(chargeTo-reserve)*battery/100;
 const extra=Math.max(0,required-available),stops=extra<1e-9?0:Math.ceil((extra-1e-9)/perStop),chargingMinutes=extra/chargeKw*60;
 const points=[];let travelled=available/consumption*100;
 for(let i=0;i<stops;i++){points.push(Math.min(distance,travelled));travelled+=perStop/consumption*100;}
 return {required,extra,stops,chargingMinutes,cost:required*price,chargingCost:extra*price,arrival:stops?reserve:Math.max(reserve,start-required/battery*100),points};
}
export function haversine(a,b){const R=6371,toRad=x=>x*Math.PI/180,dl=toRad(b.lat-a.lat),dn=toRad(b.lon-a.lon);return 2*R*Math.asin(Math.sqrt(Math.sin(dl/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dn/2)**2));}
export function recommend({budget,seats,priority}){finite(budget,10000,200000);finite(seats,1,5);if(!['distance','family','performance'].includes(priority))throw new Error('invalid_priority');return VEHICLES.map(v=>({v,eligible:v.price<=budget*100&&v.seats>=seats,score:(v.tag===priority?40:0)+(v.price<=budget*100?25:-40)+(v.seats>=seats?25:-100)+Math.floor(v.battery/v.consumption)})).sort((a,b)=>Number(b.eligible)-Number(a.eligible)||b.score-a.score);}
export function encodeConfig(c){if(!validConfig(c))throw new Error('invalid_config');return new URLSearchParams({model:c.model,paint:c.paint,wheels:c.wheels,interior:c.interior}).toString();}
export function decodeConfig(search){const p=new URLSearchParams(search),c={model:p.get('model')||'gt-01',paint:p.get('paint')||'ocean',wheels:p.get('wheels')||'aero',interior:p.get('interior')||'light'};return validConfig(c)?c:defaultConfig(p.get('model'));}
export function validateGarage(raw){if(raw===null)return [];const x=JSON.parse(raw);if(!Array.isArray(x)||x.length>30)throw new Error('invalid_storage');const ids=new Set();for(const v of x){if(!v||!validConfig(v.config)||typeof v.id!=='string'||!v.id||v.id.length>100||ids.has(v.id)||!Number.isFinite(Date.parse(v.savedAt)))throw new Error('invalid_storage');ids.add(v.id);}return x;}
export function loadState(storage){let lang='de',theme='dark',garage=[],error=false;try{const l=storage.getItem('motion-language');if(LANGS.includes(l))lang=l;const pref=storage.getItem('motion-theme');if(['light','dark'].includes(pref))theme=pref;garage=validateGarage(storage.getItem('motion-garage'));}catch{error=true;}return {lang,theme,garage,error};}
export function readRoute(data){const r=data?.routes?.[0];if(data?.code!=='Ok'||!r||!Number.isFinite(r.distance)||r.distance<=0||r.distance>10000000||!Number.isFinite(r.duration)||r.duration<0||r.geometry?.type!=='LineString'||!Array.isArray(r.geometry.coordinates)||r.geometry.coordinates.length<2||r.geometry.coordinates.length>100000)throw new Error('invalid_route');for(const p of r.geometry.coordinates){if(!Array.isArray(p)||p.length<2||!Number.isFinite(p[0])||!Number.isFinite(p[1])||Math.abs(p[0])>180||Math.abs(p[1])>90)throw new Error('invalid_route');}return {distance:r.distance/1000,duration:r.duration/60,geometry:r.geometry.coordinates};}
export async function fetchRoute(from,to,{fetcher=fetch,signal}={}){if(!CITIES.includes(from)||!CITIES.includes(to)||from.id===to.id)throw new Error('invalid_cities');const url=`https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson&steps=false`;const r=await fetcher(url,{signal});if(!r.ok)throw new Error('route_unavailable');return readRoute(await r.json());}
export async function fetchWeather(city,{fetcher=fetch,signal}={}){if(!CITIES.includes(city))throw new Error('invalid_city');const r=await fetcher(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,wind_speed_10m&timezone=auto`,{signal});if(!r.ok)throw new Error('weather_unavailable');const d=await r.json(),t=d.current?.temperature_2m,w=d.current?.wind_speed_10m;if(!Number.isFinite(t)||t< -90||t>70||!Number.isFinite(w)||w<0||w>500||typeof d.current.time!=='string')throw new Error('invalid_weather');return {temperature:t,wind:w,time:d.current.time};}
export function routePath(coords,width=900,height=440,pad=48){if(!Array.isArray(coords)||coords.length<2)return '';const xs=coords.map(c=>c[0]),ys=coords.map(c=>c[1]);if([...xs,...ys].some(x=>!Number.isFinite(x)))throw new Error('invalid_coordinates');const lo=Math.min(...xs),hi=Math.max(...xs),bottom=Math.min(...ys),top=Math.max(...ys),dx=Math.max(hi-lo,.01),dy=Math.max(top-bottom,.01),scale=Math.min((width-2*pad)/dx,(height-2*pad)/dy),ox=(width-dx*scale)/2,oy=(height-dy*scale)/2;return coords.filter((_,i)=>i%Math.max(1,Math.floor(coords.length/1000))===0||i===coords.length-1).map((c,i)=>`${i?'L':'M'}${(ox+(c[0]-lo)*scale).toFixed(2)},${(height-oy-(c[1]-bottom)*scale).toFixed(2)}`).join(' ');}

// Preferences are independent of garage records. Invalid or blocked preferences never break the UI.
export function initialConfig(storage,search=''){
 const query=new URLSearchParams(search);
 if(['model','paint','wheels','interior'].some(k=>query.has(k)))return decodeConfig(search);
 try{const raw=storage.getItem('motion-last-config');if(raw!==null){const c=JSON.parse(raw);if(validConfig(c))return {model:c.model,paint:c.paint,wheels:c.wheels,interior:c.interior};}}catch{}
 return defaultConfig();
}
export function rememberConfig(storage,c){
 if(!validConfig(c))return false;
 try{storage.setItem('motion-last-config',JSON.stringify({model:c.model,paint:c.paint,wheels:c.wheels,interior:c.interior}));return true;}catch{return false;}
}
export function readComparison(storage){
 try{const values=JSON.parse(storage.getItem('motion-compare')||'[]');if(Array.isArray(values))return new Set(values.filter(id=>VEHICLES.some(v=>v.id===id)));}catch{}
 return new Set();
}
export function rememberComparison(storage,values){
 try{storage.setItem('motion-compare',JSON.stringify([...values].filter(id=>VEHICLES.some(v=>v.id===id))));return true;}catch{return false;}
}
