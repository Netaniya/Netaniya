// DOM interaction harness. This is not real-browser visual or device testing.
import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import * as core from '../engine.mjs';
import {translate} from '../i18n.mjs';
const html=await fs.readFile(new URL('../index.html',import.meta.url),'utf8');
const source=(await fs.readFile(new URL('../app.mjs',import.meta.url),'utf8')).replace(/^import .*?;\n/gm,'');
export function boot({lang='de',rawSave,hash='#home',code=source,markup=html,portable=false,blockedStorage=false,serviceWorker}={}){
 const {window,document}=parseHTML(markup),memory=new Map();
 memory.set(core.SCHEMA,rawSave??JSON.stringify(core.newGame({lang})));
 Object.defineProperty(window,'localStorage',{value:{getItem:k=>{if(blockedStorage)throw Error('blocked');return memory.get(k)??null;},setItem:(k,v)=>{if(blockedStorage)throw Error('blocked');memory.set(k,v);}},configurable:true});
 window.matchMedia=()=>({matches:false});window.EN25X_PORTABLE=portable;
 const dialog=document.getElementById('modal');
 Object.defineProperty(dialog,'open',{get(){return this.hasAttribute('open');}});
 dialog.showModal=function(){this.setAttribute('open','');};dialog.close=function(){this.removeAttribute('open');};
 let timerId=0;const timeouts=new Map(),intervals=new Map(),clock={now:0},downloads=[],workerMessages=[];
 const createURL=blob=>{const id='blob:test-'+downloads.length;downloads.push({url:id,blob});return id;};
 class BrowserURL extends URL{static createObjectURL=createURL;static revokeObjectURL(){}}
 const navigator={onLine:true,...(serviceWorker?{serviceWorker}:{} )};
 const ctx={...core,translate,document,window,location:{hash,protocol:'https:',origin:'https://example.test',pathname:'/Netaniya/eliana-n25x/'},navigator,performance:{now:()=>clock.now},Intl,Blob,URL:BrowserURL,console,
  setTimeout:(fn,ms)=>{const id=++timerId;timeouts.set(id,{fn,ms});return id;},clearTimeout:id=>timeouts.delete(id),
  setInterval:(fn,ms)=>{const id=++timerId;intervals.set(id,{fn,ms});return id;},clearInterval:id=>intervals.delete(id)};
 vm.createContext(ctx);vm.runInContext(code,ctx,{filename:'game-app.js'});
 const run=text=>vm.runInContext(text,ctx);
 return {ctx,window,document,memory,clock,timeouts,intervals,downloads,workerMessages,run,
  get state(){return JSON.parse(portable?memory.get(core.SCHEMA):run('JSON.stringify(state)'));},
  click(sel){const el=document.querySelector(sel);assert(el,'missing '+sel);assert(!el.disabled,'disabled '+sel);el.dispatchEvent(new window.Event('click',{bubbles:true,cancelable:true}));},
  change(sel,value,event='change'){const el=document.querySelector(sel);assert(el,sel);Object.defineProperty(el,'value',{value,configurable:true});el.dispatchEvent(new window.Event(event,{bubbles:true}));},
  route(hash){ctx.location.hash=hash;window.dispatchEvent(new window.Event('hashchange'));},
  advance(ms=1000){clock.now+=ms;for(const {fn} of [...intervals.values()])fn();},
  key(key){const e=new window.Event('keydown',{bubbles:true,cancelable:true});Object.defineProperty(e,'key',{value:key});document.body.dispatchEvent(e);}
 };
}
export const flush=async()=>{for(let i=0;i<16;i++)await Promise.resolve();};
export function solveUI(b,index){
 b.click('[data-action="actor"][data-actor="eliana"]');b.click('[data-action="inspect"]');b.click('#modal [data-action="close"]');
 b.click('[data-action="actor"][data-actor="n25x"]');b.click('[data-action="terminal"]');
 if(index===0)[1,2,0,3,0,1,0,0,0].forEach((n,i)=>{for(let j=0;j<n;j++)b.click('[data-action="tile"][data-index="'+i+'"]');});
 if(index===1)[0,1,2,3].forEach(i=>b.click('[data-action="symbol"][data-index="'+i+'"]'));
 if(index===2)[3,5,4].forEach((v,i)=>b.change('[data-puzzle-slider="'+i+'"]',String(v),'input'));
 if(index===3)[0,3].forEach(i=>b.click('[data-action="valve"][data-index="'+i+'"]'));
 if(index===4)for(const [a,z] of [[0,1],[1,3],[2,3]]){b.click('[data-action="order"][data-index="'+a+'"]');b.click('[data-action="order"][data-index="'+z+'"]');}
 if(index===5)[24,0].forEach((v,i)=>b.change('[data-puzzle-slider="'+i+'"]',String(v),'input'));
 b.click('[data-action="submit"]');assert.equal(b.state.chapters[index].solved,true);
 b.click('[data-action="finish-puzzle"]');b.click('[data-action="module"]');b.click('[data-action="exit"]');
}
