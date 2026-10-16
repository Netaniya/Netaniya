import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {boot,flush,solveUI} from './helpers.mjs';
import {TEXT,translate} from '../i18n.mjs';
import {SCENES,LANGUAGES} from '../engine.mjs';

test('every locale has complete copy with no Russian/Ukrainian leakage in German or English',()=>{
 for(const lang of LANGUAGES){assert.deepEqual(Object.keys(TEXT[lang]).sort(),Object.keys(TEXT.de).sort());for(const value of Object.values(TEXT[lang])){assert(value.trim());if(['de','en'].includes(lang))assert(!/[\u0400-\u04ff]/u.test(value));}}
});
test('copyright visibly names Natalie Ragulina in every language',()=>{
 for(const lang of LANGUAGES){const b=boot({lang});const footer=b.document.querySelector('footer').textContent;assert(footer.includes('© 2026 Natalie Ragulina'));assert(footer.includes(translate(lang,'rightsReserved')));b.click('[data-action="credits"]');assert.equal(b.document.querySelector('.ownership').textContent,translate(lang,'ownershipNotice'));assert(!b.document.querySelector('.ownership').textContent.includes('Netaniya'));}
});
for(const lang of LANGUAGES)test(`all six chapters can be completed through the UI in ${lang}`,()=>{
 const b=boot({lang});assert.equal(b.document.documentElement.lang,lang);assert.equal(b.document.querySelectorAll('.world-card').length,6);
 b.click('[data-action="mode"][data-mode="challenge"]');b.click('[data-action="continue"]');b.route(b.ctx.location.hash);
 for(let i=0;i<6;i++){
  assert.equal(b.document.querySelector('main h1').textContent,translate(lang,'c'+i+'Title'));
  assert.equal(b.document.querySelector('.scene>img').getAttribute('src'),'./assets/'+SCENES[i].image);
  assert.equal(b.document.querySelectorAll('.hotspot').length,4);
  solveUI(b,i);assert.equal(b.state.chapters[i].award.total,300);
  assert.equal(b.document.querySelector('#modal h2').textContent,translate(lang,i===5?'finale':'taskComplete'));
  if(i<5){b.click('[data-action="next"]');b.route(b.ctx.location.hash);}
 }
 assert.equal(b.state.records.challenge.reduce((sum,r)=>sum+r.score,0),1800);
 const reloaded=boot({rawSave:b.memory.values().next().value,hash:'#play/lighthouse'});
 assert.equal(reloaded.state.chapters[5].completed,true);assert.equal(reloaded.document.documentElement.lang,lang);
});
test('locked locations, role prompts, wrong solutions and reset work through visible controls',()=>{
 const b=boot();b.click('[data-action="enter"][data-index="4"]');assert.equal(b.ctx.location.hash,'#home');
 b.route('#play/home');assert(b.document.querySelector('.hero'));
 b.click('[data-action="continue"]');b.route(b.ctx.location.hash);b.click('[data-action="terminal"]');
 assert(b.document.querySelector('#modal').textContent.includes(translate('de','needRobot')));
 b.click('[data-action="switch-role"]');b.click('[data-action="terminal"]');assert(b.document.querySelector('#modal').textContent.includes(translate('de','clueRequired')));
 b.click('[data-action="switch-role"]');b.click('[data-action="inspect"]');b.click('#modal [data-action="close"]');b.key('n');b.click('[data-action="terminal"]');b.click('[data-action="submit"]');
 assert.equal(b.state.chapters[0].mistakes,1);assert(b.document.querySelector('.puzzle-status').textContent.includes(translate('de','attemptFailed')));
 b.click('[data-action="tile"][data-index="0"]');b.click('[data-action="reset-puzzle"]');assert.deepEqual(b.state.chapters[0].puzzle,Array(9).fill(0));
});
test('language changes translate an open puzzle without resetting progress',()=>{
 const b=boot();b.route('#play/cobalt');b.click('[data-action="inspect"]');b.click('#modal [data-action="close"]');b.key('n');b.click('[data-action="terminal"]');b.click('[data-action="tile"][data-index="0"]');
 for(const lang of LANGUAGES){b.change('#language',lang);assert.equal(b.document.querySelector('#modal h2').textContent,translate(lang,'gridTitle'));assert.equal(b.state.chapters[0].puzzle[0],1);}
});
test('clock pauses in settings and on hidden pages and resumes after BFCache return',()=>{
 const b=boot();b.route('#play/cobalt');b.advance(1000);assert.equal(b.state.chapters[0].elapsedMs,1000);
 b.click('[data-action="pause"]');b.advance(2000);assert.equal(b.state.chapters[0].elapsedMs,1000);b.click('[data-action="pause"]');
 b.click('[data-action="settings"]');b.advance(1000);assert.equal(b.state.chapters[0].elapsedMs,1000);b.click('#modal [data-action="close"]');
 Object.defineProperty(b.document,'hidden',{value:true,configurable:true});b.advance(1000);assert.equal(b.state.chapters[0].elapsedMs,1000);
 Object.defineProperty(b.document,'hidden',{value:false,configurable:true});b.document.dispatchEvent(new b.window.Event('visibilitychange'));b.advance(1000);assert.equal(b.state.chapters[0].elapsedMs,2000);
 b.window.dispatchEvent(new b.window.Event('pagehide'));assert.equal(b.intervals.size,0);b.window.dispatchEvent(new b.window.Event('pageshow'));assert.equal(b.intervals.size,1);b.advance(1000);assert.equal(b.state.chapters[0].elapsedMs,3000);
});
test('settings export, safe import and confirmed reset retain chosen language',async()=>{
 const b=boot({lang:'ru'});b.route('#play/cobalt');b.click('[data-action="inspect"]');b.click('#modal [data-action="close"]');b.click('[data-action="settings"]');b.click('[data-action="export"]');
 assert.equal(b.downloads.length,1);const raw=await b.downloads[0].blob.text();assert.equal(JSON.parse(raw).chapters[0].clue,true);
 b.click('[data-action="confirm-reset"]');assert.equal(b.state.started,true);b.click('[data-action="reset-game"]');assert.equal(b.state.started,false);assert.equal(b.state.lang,'ru');
 const input=b.document.getElementById('save-file');Object.defineProperty(input,'files',{value:[{size:raw.length,text:async()=>raw}],configurable:true});input.dispatchEvent(new b.window.Event('change'));await flush();assert.equal(b.state.chapters[0].clue,true);
 Object.defineProperty(input,'files',{value:[{size:2,text:async()=>'{}'}],configurable:true});input.dispatchEvent(new b.window.Event('change'));await flush();assert.equal(b.state.chapters[0].clue,true);assert.equal(b.document.querySelector('#toast').textContent,translate('ru','invalidSave'));
});
test('unavailable storage produces a warning while the game remains playable',()=>{
 const b=boot({blockedStorage:true});assert(b.document.querySelector('.save-warning'));b.route('#play/cobalt');solveUI(b,0);assert.equal(b.state.unlocked,1);
});
test('portable download contains every image and no runtime file dependencies',async()=>{
 const portable=await fs.readFile(new URL('../download/eliana-n25x-offline.html',import.meta.url),'utf8');
 const code=portable.slice(portable.lastIndexOf('<script>')+8,portable.lastIndexOf('</script>'));
 assert(!/<script[^>]+src=/.test(portable));assert(!/<link[^>]+(?:manifest|stylesheet|preload)/.test(portable));
 const b=boot({code,markup:portable,portable:true});
 for(const image of b.document.querySelectorAll('img'))assert(image.getAttribute('src').startsWith('data:image/webp;base64,'));
 b.click('[data-action="settings"]');assert(!b.document.querySelector('[data-offline-file]'));assert(b.document.querySelector('#modal').textContent.includes(translate('de','offlineReady')));b.click('#modal [data-action="close"]');
 b.route('#play/cobalt');solveUI(b,0);assert.equal(b.state.chapters[0].completed,true);
});
test('offline preparation reports success only after worker acknowledgement and times out',async()=>{
 const sent=[],listeners={};const serviceWorker={register:async()=>({}),ready:Promise.resolve({active:{postMessage:x=>sent.push(x)}}),addEventListener:(name,fn)=>listeners[name]=fn};
 const b=boot({serviceWorker});await flush();b.click('[data-action="settings"]');b.click('[data-action="offline"]');await flush();assert.equal(b.run('offlineBusy'),true);assert.equal(b.run('offlineReady'),false);assert(sent.some(x=>x.type==='CACHE_ALL'));
 listeners.message({data:{type:'OFFLINE_READY'}});assert.equal(b.run('offlineReady'),true);assert.equal(b.run('offlineBusy'),false);
 b.ctx.navigator.onLine=false;const link=b.document.querySelector('[data-offline-file]'),e=new b.window.Event('click',{bubbles:true,cancelable:true});link.dispatchEvent(e);assert.equal(e.defaultPrevented,true);
 b.ctx.navigator.onLine=true;b.click('[data-action="offline"]');await flush();const timeout=[...b.timeouts.values()].find(x=>x.ms===15000);assert(timeout);timeout.fn();assert.equal(b.run('offlineBusy'),false);assert.equal(b.document.querySelector('#toast').textContent,translate('de','offlineError'));
});
