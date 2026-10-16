// Real Chromium rendering and actual keyboard/mouse/touch input. No game-state
// injection, teleportation, automatic completion command or mocked WebGL renderer.
import {chromium} from 'playwright';
import {createServer} from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {LEVELS,SAVE_KEY,obstacles,pathTo,distance,freeAt} from '../simulation.mjs';
import {TEXT} from '../i18n.mjs';
const root=fileURLToPath(new URL('../dist/',import.meta.url)),results=fileURLToPath(new URL('./results/',import.meta.url));
await fs.mkdir(results,{recursive:true});
const mime={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.ttf':'font/ttf','.png':'image/png','.txt':'text/plain'};
const server=createServer(async(req,res)=>{try{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!name.startsWith('/3d/'))throw Error();name=name.slice(4)||'index.html';const file=path.resolve(root,name);if(!file.startsWith(root))throw Error();const bytes=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);}catch{res.writeHead(404);res.end('not found');}});
await new Promise(resolve=>server.listen(4179,'127.0.0.1',resolve));
const scope=process.env.ELIANA_BROWSER_SCOPE||'all';
const metadata=JSON.parse(await fs.readFile(path.join(root,'build-info.json'),'utf8'));
const report={scope,buildVersion:metadata.version,author:'Natalie Ragulina',startedAt:new Date().toISOString(),checks:[],missions:[],errors:[],physicalDevicesTested:false};
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1280,height:800},recordVideo:{dir:path.join(results,'video'),size:{width:960,height:600}}});
await context.addInitScript(()=>{
 localStorage.setItem('eliana-n25x.save.v1','classic-sentinel');
 window.__audioForTest=[];const Native=window.AudioContext;
 if(Native)window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audioForTest.push(this);}};
});
const page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
page.on('console',message=>{if(message.type()==='error')report.errors.push(message.text());});
function check(name,details={}){report.checks.push({name,...details});console.log('PASS '+name,JSON.stringify(details));}
async function telemetry(){const text=await page.locator('#qa').innerText(),m=text.match(/E (-?[\d.]+),(-?[\d.]+).*N (-?[\d.]+),(-?[\d.]+).*gate ([\d.]+).*walk ([\d.]+).*yaw (-?[\d.]+).*speed ([\d.]+)/);assert(m,'readable rendered telemetry: '+text);return {player:{x:+m[1],z:+m[2]},robot:{x:+m[3],z:+m[4]},gate:+m[5],phase:+m[6],yaw:+m[7],speed:+m[8]};}
async function down(key,ms){await page.keyboard.down(key);await page.waitForTimeout(ms);await page.keyboard.up(key);await page.waitForTimeout(350);}
async function aim(angle){let current=(await telemetry()).yaw;let delta=Math.atan2(Math.sin(angle-current),Math.cos(angle-current));while(Math.abs(delta)>.012){const part=Math.max(-2.4,Math.min(2.4,delta));await page.mouse.move(640,450);await page.mouse.down();await page.mouse.move(640-part/.005,450,{steps:5});await page.mouse.up();await page.waitForFunction(expected=>{const m=document.querySelector('#qa').textContent.match(/yaw (-?[\d.]+)/);return m&&Math.abs(Math.atan2(Math.sin(+m[1]-expected),Math.cos(+m[1]-expected)))<.015;},current+part,{timeout:30000});current=(await telemetry()).yaw;delta=Math.atan2(Math.sin(angle-current),Math.cos(angle-current));}}
async function driveTo(destination,level){
 let s=await telemetry();const boxes=obstacles(level,s.gate>.92);const route=pathTo(s.player,destination,boxes,.34);assert(route.length,'browser route exists '+JSON.stringify({destination,player:s.player}));
 for(const waypoint of route){let attempts=0;while(true){s=await telemetry();if(destination.z<-19&&await page.locator('#overlay').isVisible())return;const d=distance(s.player,waypoint);if(d<.42)break;assert(attempts++<240,'browser movement stuck '+JSON.stringify({s,waypoint}));await aim(Math.atan2(s.player.x-waypoint.x,s.player.z-waypoint.z));if(d<1.7&&await page.locator('#run').getAttribute('aria-pressed')==='true')await page.locator('#run').click();if(d>2&&await page.locator('#run').getAttribute('aria-pressed')==='false')await page.locator('#run').click();await page.keyboard.down('w');await page.waitForFunction(([x,z,amount,exit])=>{const m=document.querySelector('#qa').textContent.match(/E (-?[\d.]+),(-?[\d.]+)/);return (exit&&!document.querySelector('#overlay').hidden)||m&&Math.hypot(+m[1]-x,+m[2]-z)>=amount;},[s.player.x,s.player.z,Math.min(.3,d*.4),destination.z<-19],{timeout:30000});await page.keyboard.up('w');await page.waitForTimeout(150);s=await telemetry();assert(freeAt(s.player,boxes,.32),'player cannot cross collision geometry');assert(freeAt(s.robot,boxes,.36),'companion cannot cross collision geometry');}}
}
async function useAt(destination,level,expected){await driveTo(destination,level);await page.locator('#interact').waitFor({state:'visible'});assert(await page.locator('#interact').isEnabled(),'nearby interaction is enabled: '+expected);await page.keyboard.press('e');await page.waitForTimeout(250);}
let mobileContext,capturePage=page;
try{
 if(scope!=='touch'){
 await page.goto('http://127.0.0.1:4179/3d/?qa=1');await page.locator('#loading').waitFor({state:'hidden'});assert(!(await page.locator('#panel-title').innerText()).includes(TEXT.de.webglError));assert.equal(await page.locator('html').getAttribute('lang'),'de');
 check('real WebGL scene initializes; first visit is German');
 for(const lang of ['en','ru','uk','de']){await page.locator('#overlay [data-language]').selectOption(lang);assert.equal(await page.locator('#panel-title').innerText(),TEXT[lang].tagline);assert((await page.locator('#copyright').innerText()).includes(TEXT[lang].rights));}
 check('all four languages switch in the rendered browser');
 await page.locator('#overlay [data-language]').selectOption('en');await page.locator('[data-action="settings"]').click();await page.locator('#quality').selectOption('low');await page.locator('.offline-state').filter({hasText:TEXT.en.offlineReady}).waitFor({timeout:45000});await page.locator('#volume').press('ArrowLeft');assert((await page.locator('#volume-value').innerText()).includes('34'));
 await page.locator('#sound').uncheck();await page.locator('#sound').check();await page.locator('[data-action="resume"]').click();await page.locator('[data-action="start"]').click();await page.waitForTimeout(500);
 assert.equal(await page.evaluate(()=>window.__audioForTest[0]?.state),'running');check('native Web Audio starts on gesture; volume and mute controls work');
 const first=await telemetry();await page.keyboard.down('w');await page.waitForFunction(z=>{const m=document.querySelector('#qa').textContent.match(/E (-?[\d.]+),(-?[\d.]+)/);return m&&+m[2]<z-.9;},first.player.z,{timeout:30000});const walking=await telemetry();await page.keyboard.up('w');assert(walking.phase>first.phase);assert(walking.speed>2.5&&walking.speed<2.8);await page.keyboard.down('Shift');await page.keyboard.down('w');await page.waitForFunction(z=>{const m=document.querySelector('#qa').textContent.match(/E (-?[\d.]+),(-?[\d.]+)/);return m&&+m[2]<z-.9;},walking.player.z,{timeout:30000});const running=await telemetry();await page.keyboard.up('w');await page.keyboard.up('Shift');assert(running.speed>4.8&&running.speed<5.2);assert(running.phase>walking.phase);
 check('keyboard walk and run move the animated model',{walkDistance:first.player.z-walking.player.z,runDistance:walking.player.z-running.player.z,walkSpeed:walking.speed,runSpeed:running.speed});
 await aim(.6);assert(Math.abs((await telemetry()).yaw-.6)<.03);check('mouse drag changes the follow camera');await aim(0);
 await page.locator('#menu').click();const paused=await telemetry(),savedBefore=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY);await page.waitForTimeout(700);assert.deepEqual((await telemetry()).player,paused.player);assert.equal(await page.evaluate(()=>window.__audioForTest[0]?.state),'suspended');await page.locator('[data-action="resume"]').click();check('pause stops movement, elapsed time and native audio');
 await page.locator('#run').click();
 // Walk directly into the central planter; actual collision must stop the actor.
 await driveTo({x:0,z:8},0);await aim(0);await down('w',1900);assert((await telemetry()).player.z>5.7);check('real movement is blocked by a solid planter');
 for(let level=0;level<6;level++){
  const L=LEVELS[level];await useAt({x:L.clue[0],z:L.clue[1]+1.25},level,'clue');assert.equal(await page.locator('#panel-title').innerText(),TEXT.en.found);await page.locator('[data-action="resume"]').click();
  for(let i=0;i<3;i++)await useAt({x:L.items[i][0],z:L.items[i][1]+1.25},level,'item'+i);
  assert.equal(await page.locator('#item-count').innerText(),'3 / 3');await useAt({x:0,z:-9.6},level,'scan');await page.waitForFunction(text=>document.querySelector('#goal').textContent===text,TEXT.en.repairGoal,{timeout:70000});
  const scanEnd=await telemetry();assert(distance(scanEnd.robot,{x:-1.4,z:-9})<1.2,'robot physically reaches the node before scan completion');await page.keyboard.press('e');await page.waitForFunction(()=>/gate (0\.9[3-9]|1\.00)/.test(document.querySelector('#qa').textContent),null,{timeout:45000});
  check('mission '+(level+1)+' scan and repair complete with N25x on location');if(level===0)await page.screenshot({path:path.join(results,'city-gate-open.png')});
  await driveTo({x:0,z:-20.5},level);await page.waitForFunction(()=>!document.querySelector('#overlay').hidden);const data=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY);assert(data.chapters[level].finished);assert(data.records.explorer[level]?.score===350);report.missions.push({level:level+1,id:L.id,score:data.records.explorer[level].score,elapsed:data.chapters[level].elapsed});console.log('MISSION '+(level+1)+' FINISHED');
  if(level<5){await page.locator('[data-action="next"]').click();await page.waitForTimeout(300);
   if(level===0){
    await page.locator('#menu').click();const beforeReload=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY);await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});await page.locator('#loading').waitFor({state:'hidden'});await page.locator('[data-action="start"]').click();const after=await telemetry();assert(Math.abs(after.player.x-beforeReload.position.x)<.05);assert.equal(await page.locator('#chapter').innerText(),'CHAPTER 2 / 6');await down('w',500);assert(distance((await telemetry()).player,after.player)>.2);await context.setOffline(false);await page.locator('#run').click();assert.equal(await page.evaluate(()=>localStorage.getItem('eliana-n25x.save.v1')),'classic-sentinel');check('cold offline reload restores the checkpoint and permits real movement; classic save untouched');
   }
  }
 }
 assert.equal(await page.locator('#panel-title').innerText(),TEXT.en.finalTitle);assert.equal(await page.locator('#points').innerText(),'2100');await page.screenshot({path:path.join(results,'six-district-finale.png')});check('all six districts complete through browser input, with final screen and 2100 points');
 }
 if(scope!=='desktop'){
 mobileContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,recordVideo:{dir:path.join(results,'mobile-video'),size:{width:390,height:844}}});const mobile=await mobileContext.newPage();capturePage=mobile;mobile.on('pageerror',e=>report.errors.push(String(e)));await mobile.goto('http://127.0.0.1:4179/3d/?qa=1');await mobile.locator('#loading').waitFor({state:'hidden'});await mobile.locator('[data-action="start"]').click();await mobile.waitForTimeout(300);
 const cdp=await mobileContext.newCDPSession(mobile);const beforeTouch=await mobile.locator('#qa').innerText();const stickRect=await mobile.locator('#joystick').boundingBox();assert(stickRect);const sx=stickRect.x+stickRect.width/2,sy=stickRect.y+stickRect.height/2;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:sx,y:sy,id:1},{x:260,y:450,id:2}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:sx,y:sy-35,id:1},{x:310,y:465,id:2}]});await mobile.waitForTimeout(850);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await mobile.waitForTimeout(250);const afterTouch=await mobile.locator('#qa').innerText();assert.notEqual(afterTouch,beforeTouch);assert(!afterTouch.includes('yaw 0.000'));assert(!afterTouch.includes('E 0.00,17.00'));assert.equal(await mobile.evaluate(()=>window.scrollY),0);assert(await mobile.locator('#interact').isVisible());await mobile.screenshot({path:path.join(results,'mobile-portrait.png')});check('emulated mobile multi-touch moves and orbits simultaneously without page scrolling',{viewport:'390x844'});
 await mobile.setViewportSize({width:844,height:390});await mobile.waitForTimeout(250);assert(await mobile.locator('#joystick').isVisible());await mobile.screenshot({path:path.join(results,'mobile-landscape.png')});check('mobile landscape controls remain visible',{viewport:'844x390'});
 }
 assert.deepEqual(report.errors,[]);report.success=true;
}catch(error){report.success=false;report.failure=String(error.stack||error);console.error(error);await capturePage.screenshot({path:path.join(results,'failure.png')}).catch(()=>{});process.exitCode=1;}
finally{report.finishedAt=new Date().toISOString();await fs.writeFile(path.join(results,'verification.json'),JSON.stringify(report,null,2));await mobileContext?.close();await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
