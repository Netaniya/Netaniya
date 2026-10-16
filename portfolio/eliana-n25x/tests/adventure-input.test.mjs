// DOM/event and frame-loop checks with a renderer double, not browser/device QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
import * as T from '../3d/vendor/three.module.js';
import * as core from '../3d/simulation.mjs';
import {createActor} from '../3d/actors.mjs';
import {t} from '../3d/i18n.mjs';
import {createGameAudio} from '../audio.mjs';
import {AudioDouble} from './audio-double.mjs';
const html=await fs.readFile(new URL('../3d/index.html',import.meta.url),'utf8'),source=(await fs.readFile(new URL('../3d/app.mjs',import.meta.url),'utf8')).replace(/^import .*?;\n/gm,'');
function boot(){
 const {document,window}=parseHTML(html),memory=new Map([['eliana-n25x.save.v1','classic-save-untouched']]),callbacks=[];let now=0;
 const ctx=new Proxy({},{get:()=>()=>{}});
 for(const canvas of document.querySelectorAll('canvas')){canvas.getContext=()=>ctx;canvas.focus=()=>{};canvas.setPointerCapture=()=>{};}
 const joystick=document.getElementById('joystick');joystick.getBoundingClientRect=()=>({left:0,top:0,width:120,height:120});joystick.setPointerCapture=()=>{};
 class Renderer{constructor(){this.shadowMap={};}setPixelRatio(){}setSize(){}render(){}}
 const scope={...core,T:{...T,WebGLRenderer:Renderer},createActor,t,createGameAudio:()=>createGameAudio({getContext:()=>AudioDouble}),createWorld:()=>({scene:new T.Scene(),solids:[],gateProgress:0,snapGate(v){this.gateProgress=v?1:0;},update(){},dispose(){}}),document,window,console,location:{search:'?qa=1'},navigator:{maxTouchPoints:2},matchMedia:()=>({matches:true}),devicePixelRatio:1,innerWidth:390,innerHeight:844,URLSearchParams,Blob,URL,performance:{now:()=>now},localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},addEventListener:window.addEventListener.bind(window),requestAnimationFrame:fn=>callbacks.push(fn),setTimeout:()=>1,clearTimeout:()=>{}};
 vm.createContext(scope);vm.runInContext(source,scope);
 const run=code=>vm.runInContext(code,scope);
 const emit=(el,type,props={})=>{const event=new window.Event(type,{bubbles:true,cancelable:true});for(const [k,v]of Object.entries(props))Object.defineProperty(event,k,{value:v});el.dispatchEvent(event);return event;};
 const click=selector=>emit(document.querySelector(selector),'click');
 const frames=(n=60)=>{for(let i=0;i<n;i++){now+=1000/60;callbacks.shift()(now);}};
 return {document,window,memory,run,emit,click,frames,start:()=>click('[data-action="start"]')};
}
test('3D input: two simultaneous pointers move and orbit independently; cancellation releases only its own input',()=>{
 const b=boot();b.start();const stick=b.document.getElementById('joystick'),canvas=b.document.getElementById('viewport');
 assert(b.document.body.classList.contains('touch'));b.emit(stick,'pointerdown',{pointerId:1,clientX:60,clientY:20});b.emit(canvas,'pointerdown',{pointerId:2,clientX:220,clientY:300});b.emit(canvas,'pointermove',{pointerId:2,clientX:270,clientY:310});
 assert.equal(b.run('stick.id'),1);assert.equal(b.run('look.id'),2);assert.notEqual(b.run('yaw'),0);const before=b.run('JSON.stringify(player)');b.frames();assert.notEqual(b.run('JSON.stringify(player)'),before);
 b.emit(canvas,'pointercancel',{pointerId:2});assert.equal(b.run('look.id'),null);assert.equal(b.run('stick.id'),1);b.emit(stick,'pointercancel',{pointerId:1});const p=b.run('JSON.stringify(player)');b.frames();assert.equal(b.run('JSON.stringify(player)'),p);
 assert.equal(b.memory.get('eliana-n25x.save.v1'),'classic-save-untouched');
});
test('3D input: keyboard moves, running is faster, pause stops motion/time/audio, and resume clears held input',()=>{
 const b=boot();b.start();const key=(type,code)=>b.emit(b.window,type,{code});key('keydown','KeyW');b.frames();key('keyup','KeyW');const z1=b.run('player.z');assert(z1<17);
 key('keydown','KeyW');key('keydown','ShiftLeft');b.frames();key('keyup','KeyW');key('keyup','ShiftLeft');const z2=b.run('player.z');assert(z1-z2>17-z1);
 key('keydown','KeyD');b.click('[data-action="pause"]');const p=b.run('JSON.stringify(player)'),elapsed=b.run('chapter().elapsed');b.frames(120);assert.equal(b.run('JSON.stringify(player)'),p);assert.equal(b.run('chapter().elapsed'),elapsed);assert(AudioDouble.instances.at(-1).suspends>0);
 b.click('[data-action="resume"]');b.frames();assert.equal(b.run('JSON.stringify(player)'),p);assert(b.run('chapter().elapsed')>elapsed);
});
test('3D input: live language switches translate the open menu, goal and copyright without resetting position',()=>{
 const b=boot();b.start();b.click('[data-action="pause"]');const position=b.run('JSON.stringify(player)');
 for(const lang of core.LANGUAGES){const select=b.document.querySelector('#overlay [data-language]');Object.defineProperty(select,'value',{value:lang,configurable:true});b.emit(select,'change');assert.equal(b.document.documentElement.lang,lang);assert.equal(b.document.getElementById('panel-title').textContent,t(lang,'pause'));assert.equal(b.document.getElementById('goal').textContent,t(lang,'clueGoal'));assert(b.document.getElementById('copyright').textContent.includes(t(lang,'rights')));assert.equal(b.run('JSON.stringify(player)'),position);}
});
