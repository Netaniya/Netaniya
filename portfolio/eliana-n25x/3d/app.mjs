import * as T from './vendor/three.module.js';
import {createActor} from './actors.mjs';
import {createWorld} from './world.mjs';
import {SAVE_KEY,LANGUAGES,LEVELS,SPAWN,newGame,parseSave,obstacles,move,freeAt,clearLine,pathTo,distance,goal,target,interact,finish,advance,score} from './simulation.mjs';
import {t} from './i18n.mjs';
import {createGameAudio} from './audio.mjs';

const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state;try{state=parseSave(localStorage.getItem(SAVE_KEY))||newGame();}catch{state=newGame();}
let panel='intro',renderer,world,eliana,n25x,camera,task=null,robotPath=[],navWait=0,lastNavTarget=null;
let player={...state.position},robot={x:player.x-1.5,z:player.z+1},yaw=state.yaw,pitch=.37,zoom=5.3,runToggle=false,quality='auto',near=null,last=0,clock=0,hudWait=0,saveWait=0,stepTime=0,robotSpeed=0;
let offlineState='offlinePending',workerReg=null,installPrompt=null,offlineTimer=null,hiddenPause=false,storageFailed=false;
const keys=new Set(),stick={id:null,x:0,y:0},look={id:null,x:0,y:0};
const touch=matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0;
document.body.classList.toggle('touch',touch);
const audio=createGameAudio();
const tr=key=>t(state.lang,key),chapter=()=>state.chapters[state.level];
const isRunning=()=>!panel&&state.started&&!state.complete&&!document.hidden;
function audioConfig(){audio.update({enabled:state.sound,volume:state.volume,paused:!isRunning(),hidden:document.hidden,ambience:isRunning(),scene:state.level});}
function unlock(){audio.start({enabled:state.sound,volume:state.volume,paused:false,hidden:false});audioConfig();}
function tone(name){if(state.sound)audio.play(name);}
function save(notify=false){state.position={...player};state.yaw=yaw;try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));storageFailed=false;if(notify)toast(tr('checkpoint'));}catch{if(!storageFailed){storageFailed=true;toast(tr('saveError'),8000);}}}
function clearInput(){keys.clear();stick.id=null;stick.x=stick.y=0;look.id=null;const knob=$('stick-knob');if(knob)knob.style.transform='translate(0,0)';}
function toast(text,ms=4200){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').classList.remove('visible'),ms);}
const languages=()=>'<select data-language aria-label="'+esc(tr('language'))+'">'+LANGUAGES.map(code=>'<option value="'+code+'" '+(state.lang===code?'selected':'')+'>'+({de:'Deutsch',en:'English',ru:'Русский',uk:'Українська'}[code])+'</option>').join('')+'</select>';
const btn=(action,label,style='')=>'<button type="button" data-action="'+action+'" class="'+style+'">'+esc(label)+'</button>';
function modeOptions(){return '<label>'+esc(tr('mode'))+'<select id="mode"><option value="explorer" '+(state.mode==='explorer'?'selected':'')+'>'+esc(tr('explorer'))+'</option><option value="challenge" '+(state.mode==='challenge'?'selected':'')+'>'+esc(tr('challenge'))+'</option></select></label><p class="help">'+esc(tr(state.mode==='explorer'?'explorerHelp':'challengeHelp'))+'</p>';}
function copyright(){return '© 2026 Natalie Ragulina. '+tr('rights');}
function showPanel(kind){panel=kind;clearInput();save();renderPanel();audioConfig();document.body.dataset.playState=kind||'running';if(!kind)$('viewport').focus({preventScroll:true});}
function renderPanel(){
 const overlay=$('overlay');overlay.hidden=!panel;if(!panel)return;
 let content='',title='',eyebrow='ELIANA & N25x';
 if(panel==='intro'){
  title=tr('tagline');content='<p class="lead">'+esc(tr('opening'))+'</p>'+modeOptions()+'<div class="buttons">'+btn(state.complete?'results':'start',state.complete?tr('finalTitle'):tr(state.started?'continue':'start'),'primary')+btn('settings',tr('settings'))+'</div><p class="help">'+esc(tr(touch?'touchHelp':'controls'))+'</p>';
 }else if(panel==='pause'||panel==='settings'){
  title=tr(panel==='pause'?'pause':'settings');content='<div class="buttons">'+btn('resume',tr('resume'),'primary')+'</div>'+modeOptions()+'<div class="setting-row"><label><input type="checkbox" id="sound" '+(state.sound?'checked':'')+'> '+esc(tr('sound'))+'</label><label class="volume">'+esc(tr('volume'))+' <output id="volume-value">'+Math.round(state.volume*100)+'%</output><input id="volume" type="range" min="0" max="100" value="'+Math.round(state.volume*100)+'"></label></div><p class="help">'+esc(tr('audioHelp'))+'</p><label>'+esc(tr('quality'))+'<select id="quality">'+['auto','low','high'].map(q=>'<option value="'+q+'" '+(q===quality?'selected':'')+'>'+esc(tr(q))+'</option>').join('')+'</select></label><div class="offline-state" role="status">'+esc(tr(offlineState))+'</div><div class="buttons compact">'+btn('offline',tr('offline'))+btn('install',tr('install'))+btn('export',tr('export'))+btn('import',tr('import'))+btn('credits',tr('credits'))+btn('new',tr('again'))+'</div><p class="help">'+esc(tr('controls'))+'<br>'+esc(tr('camera'))+'</p>';
 }else if(panel==='briefing'){
  title=tr('found');eyebrow=tr('locations')[state.level];content='<p class="lead">'+esc(tr('clues')[state.level])+'</p>'+btn('resume',tr('resume'),'primary');
 }else if(panel==='chapter'||panel==='results'){
  const final=state.complete;title=tr(final?'finalTitle':'completed');eyebrow=tr('locations')[state.level];const result=state.records[state.mode][state.level];content=(final?'<p class="lead">'+esc(tr('finalText'))+'</p>':'')+'<div class="results"><div><span>'+esc(tr('points'))+'</span><strong>'+score(state)+'</strong></div><div><span>'+esc(tr('bonus'))+'</span><strong>+'+(result?.bonus||0)+'</strong></div><div><span>'+esc(tr('time'))+'</span><strong>'+formatTime(chapter().elapsed)+'</strong></div></div>'+btn(final?'new':'next',tr(final?'again':'next'),'primary')+btn('settings',tr('settings'));
 }else if(panel==='new'){
  title=tr('again');content='<p class="lead">'+esc(tr('newConfirm'))+'</p><div class="buttons">'+btn('confirm-new',tr('confirm'),'primary')+btn('settings',tr('cancel'))+'</div>';
 }else if(panel==='credits'){
  title=tr('credits');content='<p class="lead">'+esc(tr('creditsText'))+'</p><div class="license-links"><a href="./vendor/LICENSE.three.txt" target="_blank" rel="noopener">Three.js · MIT</a><a href="./assets/OFL.txt" target="_blank" rel="noopener">Manrope · SIL OFL</a><a href="../" target="_blank" rel="noopener">'+esc(tr('classic'))+'</a></div>'+btn('settings',tr('back'));
 }else if(panel==='error'){
  title=tr('webglError');content=btn('retry',tr('retry'),'primary')+'<p><a href="../">'+esc(tr('classic'))+'</a></p>';
 }
 overlay.innerHTML='<section class="panel '+(panel==='intro'?'intro':'')+'" role="dialog" aria-modal="true" aria-labelledby="panel-title"><div class="panel-top"><span class="eyebrow">'+esc(eyebrow)+'</span>'+languages()+'</div><h1 id="panel-title">'+esc(title)+'</h1>'+content+'<footer>'+esc(copyright())+'</footer></section>';
}
function formatTime(seconds){const v=Math.floor(seconds);return Math.floor(v/60)+':'+String(v%60).padStart(2,'0');}
function translateUI(){
 document.documentElement.lang=state.lang;document.title='Eliana & N25x · '+tr('locations')[state.level];$('location').textContent=tr('locations')[state.level];$('hud-language').innerHTML=languages();$('menu').setAttribute('aria-label',tr('menu'));$('menu').title=tr('menu');$('objective-label').textContent=tr('objective');$('points-label').textContent=tr('points');$('inventory-label').textContent=tr('inventory');$('copyright').textContent=copyright();$('hint').textContent=tr(touch?'touchHelp':'controls');$('camera-hint').textContent=tr('camera');$('run').textContent=tr(runToggle?'walk':'run');$('run').setAttribute('aria-pressed',String(runToggle));$('center').setAttribute('aria-label',tr('center'));$('joystick').setAttribute('aria-label',tr('controls'));$('viewport').setAttribute('aria-label','Eliana & N25x · '+tr('locations')[state.level]);$('pause-label').textContent=tr('menu');renderPanel();updateHUD();
}
function setupLevel(){
 if(world)world.dispose();task=null;robotPath=[];navWait=0;lastNavTarget=null;player={...state.position};
 const boxes=obstacles(state.level,chapter().restored);if(!freeAt(player,boxes))player={...SPAWN};
 robot={x:player.x-1.5,z:player.z+.8};if(!freeAt(robot,boxes,.38)){const p=pathTo(player,{x:player.x+2,z:player.z},boxes,.38);robot=p.at(-1)||{...SPAWN};}
 world=createWorld(state.level,touch||quality==='low');world.snapGate(chapter().restored);eliana=createActor();n25x=createActor(true);world.scene.add(eliana.root,n25x.root);eliana.root.position.set(player.x,0,player.z);n25x.root.position.set(robot.x,0,robot.z);camera.position.set(player.x+Math.sin(yaw)*zoom,3.2,player.z+Math.cos(yaw)*zoom);translateUI();
}
function applyQuality(){if(!renderer)return;const low=quality==='low'||quality==='auto'&&touch;renderer.setPixelRatio(Math.min(devicePixelRatio||1,low?1.15:1.75));renderer.shadowMap.enabled=!low;resize();}
function resize(){if(!renderer)return;const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
function init(){
 try{renderer=new T.WebGLRenderer({canvas:$('viewport'),antialias:!touch,powerPreference:'high-performance'});renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;renderer.shadowMap.type=T.PCFSoftShadowMap;camera=new T.PerspectiveCamera(54,innerWidth/innerHeight,.12,180);applyQuality();setupLevel();$('loading').hidden=true;renderPanel();requestAnimationFrame(frame);}catch(error){console.error('3D initialization failed',error);$('loading').hidden=true;showPanel('error');}
}
function candidates(){
 const c=chapter(),L=LEVELS[state.level],list=[];
 if(!c.clue)list.push({id:'clue',x:L.clue[0],z:L.clue[1]});
 L.items.forEach(([x,z],i)=>{if(!c.items[i])list.push({id:'item'+i,x,z});});
 if(c.clue&&c.items.every(Boolean)&&!c.restored)list.push({id:c.scanned?'repair':'scan',x:0,z:-10});
 return list;
}
function interactionName(id){return id==='clue'?tr('clue'):id?.startsWith('item')?tr('collect')[state.level]:id==='scan'?tr('scan'):id==='repair'?tr('repair'):tr('interact');}
function updateHUD(){
 const c=chapter(),g=goal(state),next=target(state);$('chapter').textContent=tr('chapter')+' '+(state.level+1)+' / 6';$('goal').textContent=g==='items'?tr('itemGoals')[state.level]:g==='exit'&&state.level===5?tr('finalExit'):tr(g+'Goal');$('item-count').textContent=c.items.filter(Boolean).length+' / 3';$('points').textContent=score(state);$('clock').textContent=formatTime(c.elapsed);$('clock-wrap').hidden=state.mode!=='challenge';$('waypoint').textContent=Math.round(distance(player,next))+' m';
 const boxes=obstacles(state.level,world?.gateProgress>.92);near=candidates().filter(o=>distance(player,o)<2.3&&clearLine(player,o,boxes.filter(b=>b.id!==o.id&&!(['scan','repair'].includes(o.id)&&b.id==='terminal')),.04)).sort((a,b)=>distance(player,a)-distance(player,b))[0]||null;
 $('interact').disabled=!near||Boolean(task)||!isRunning();$('interaction-name').textContent=interactionName(near?.id);$('interaction-key').textContent=touch?'●':'E';$('interaction-context').textContent=near?interactionName(near.id):'';
 $('task-box').hidden=!task;
 if(task){$('task-status').textContent=distance(player,{x:0,z:-10})>4.7?tr('stay'):distance(robot,{x:-1.4,z:-9})>1.1?tr('robotComing'):tr(task.type==='scan'?'scanning':'repairing');$('task-progress').value=task.progress/(task.type==='scan'?3:4.2);}
 drawMap(boxes,next);
 if(new URLSearchParams(location.search).has('qa')){$('qa').hidden=false;$('qa').textContent='E '+player.x.toFixed(2)+','+player.z.toFixed(2)+' · N '+robot.x.toFixed(2)+','+robot.z.toFixed(2)+' · '+g+' · '+(near?.id||'—')+' · gate '+(world?.gateProgress||0).toFixed(2)+' · walk '+eliana?.phase.toFixed(1);}
}
function drawMap(boxes,next){const canvas=$('map'),ctx=canvas.getContext('2d');const w=canvas.width,h=canvas.height,s=2.65;ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(12,29,40,.88)';ctx.fillRect(0,0,w,h);const project=p=>[w/2+p.x*s,h/2+p.z*s];ctx.fillStyle='#3c5965';for(const b of boxes){const [x,y]=project(b);ctx.fillRect(x-b.w*s/2,y-b.d*s/2,b.w*s,b.d*s);}ctx.font='9px sans-serif';ctx.textAlign='center';
 for(const o of candidates()){const [x,y]=project(o);ctx.fillStyle=o.id===next.id?'#ffdc95':'#79cfde';ctx.beginPath();ctx.arc(x,y,o.id==='clue'?3:2.4,0,Math.PI*2);ctx.fill();if(LEVELS[state.level].kind==='relay'&&o.id.startsWith('item'))ctx.fillText(String(Number(o.id.at(-1))+1),x,y-4);}
 const [nx,ny]=project(next);ctx.strokeStyle='#ffe1a8';ctx.strokeRect(nx-4,ny-4,8,8);for(const [p,color]of[[robot,'#82e5ee'],[player,'#fff4d9']]){const [x,y]=project(p);ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,2.9,0,Math.PI*2);ctx.fill();}
 const [px,py]=project(player);ctx.strokeStyle='#fff4d9';ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-Math.sin(yaw)*8,py-Math.cos(yaw)*8);ctx.stroke();ctx.fillStyle='#c7d6dc';ctx.fillText(tr('north'),w-10,12);}
function perform(){if(!isRunning()||!near||task)return;unlock();const result=interact(state,near.id,player);if(result==='clue'){tone('clue');save();showPanel('briefing');}else if(result==='collect'){tone(LEVELS[state.level].kind==='valve'?'switch':'collect');save();toast(tr('collected'));}else if(result==='scan'||result==='repair'){task={type:result,progress:0};navWait=0;robotPath=[];tone(result==='scan'?'scan':'switch');}else{tone('error');toast(tr(result));}updateHUD();}
function updateRobot(dt,boxes){
 const desired=task?{x:-1.4,z:-9}:{x:player.x+Math.sin(eliana.root.rotation.y)*1.8-1.1,z:player.z+Math.cos(eliana.root.rotation.y)*1.8};
 navWait-=dt;const movingTarget=!lastNavTarget||distance(desired,lastNavTarget)>1.2;
 if(navWait<=0&&(movingTarget||!robotPath.length||task)){robotPath=pathTo(robot,desired,boxes,.38);lastNavTarget={...desired};navWait=.65;}
 let speed=0;
 if(robotPath.length&&distance(robot,desired)>.25&&(task||distance(robot,player)>1.35)){
  const p=robotPath[0],d=distance(robot,p);if(d<.12)robotPath.shift();else{
   const v=Math.min(task?3.1:distance(robot,player)>5?4.8:3.4,d/Math.max(.001,dt)),previous=robot;robot=move(robot,(p.x-robot.x)/d*v*dt,(p.z-robot.z)/d*v*dt,boxes,.38);speed=distance(previous,robot)/Math.max(.001,dt);
   if(speed>.08){const angle=Math.atan2(previous.x-robot.x,previous.z-robot.z);n25x.root.rotation.y+=Math.atan2(Math.sin(angle-n25x.root.rotation.y),Math.cos(angle-n25x.root.rotation.y))*Math.min(1,dt*9);}else{robotPath=[];navWait=0;}
  }
 }
 if(task&&speed<.1){const angle=Math.atan2(robot.x,robot.z+11);n25x.root.rotation.y+=Math.atan2(Math.sin(angle-n25x.root.rotation.y),Math.cos(angle-n25x.root.rotation.y))*Math.min(1,dt*6);}
 robotSpeed=speed;n25x.root.position.set(robot.x,0,robot.z);n25x.update(dt,speed,Boolean(task)&&distance(robot,{x:-1.4,z:-9})<1.1);
}
function updateTask(dt){if(!task)return;if(distance(robot,{x:-1.4,z:-9})>1.1||distance(player,{x:0,z:-10})>4.7)return;task.progress+=dt;if(task.progress<(task.type==='scan'?3:4.2))return;if(task.type==='scan'){chapter().scanned=true;tone('solved');toast(tr('scanned'));}else{chapter().restored=true;tone('door');toast(tr('restored'),6500);}task=null;save(true);}
function updateCamera(dt){
 const focus=new T.Vector3(player.x,1.15,player.z),offset=new T.Vector3(Math.sin(yaw)*Math.cos(pitch)*zoom,Math.sin(pitch)*zoom,Math.cos(yaw)*Math.cos(pitch)*zoom);
 const ray=new T.Raycaster(focus,offset.clone().normalize(),0,offset.length());const hit=ray.intersectObjects(world.solids,false)[0];if(hit)offset.setLength(Math.max(.55,hit.distance-.25));
 const desired=focus.clone().add(offset);camera.position.lerp(desired,1-Math.exp(-dt*12));camera.lookAt(focus);
}
function frame(time){
 if(!renderer)return;const raw=last?(time-last)/1000:0;last=time;const dt=Math.min(raw,.05);clock+=dt;
 if(isRunning()){
  chapter().elapsed+=Math.min(raw,.5);let x=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0)+stick.x,y=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0)-stick.y;const length=Math.hypot(x,y);if(length>1){x/=length;y/=length;}
  const running=runToggle||keys.has('ShiftLeft')||keys.has('ShiftRight'),speed=running?5:2.65,dx=(Math.cos(yaw)*x-Math.sin(yaw)*y)*speed*dt,dz=(-Math.sin(yaw)*x-Math.cos(yaw)*y)*speed*dt,boxes=obstacles(state.level,world.gateProgress>.92),before=player;player=move(player,dx,dz,boxes);const actual=distance(before,player)/Math.max(.001,dt);
  if(actual>.08){const angle=Math.atan2(before.x-player.x,before.z-player.z);eliana.root.rotation.y+=Math.atan2(Math.sin(angle-eliana.root.rotation.y),Math.cos(angle-eliana.root.rotation.y))*Math.min(1,dt*12);stepTime+=dt;if(stepTime>(running?.25:.41)){tone('step');stepTime=0;}}else stepTime=0;
  eliana.root.position.set(player.x,0,player.z);eliana.update(dt,actual);updateRobot(dt,boxes);updateTask(dt);
  if(chapter().restored&&world.gateProgress>.92&&player.z<-19.1&&!chapter().finished){finish(state);save();tone(state.complete?'finale':'arrival');showPanel(state.complete?'results':'chapter');}
  saveWait+=dt;if(saveWait>4){saveWait=0;save();}
 }
 world.update(dt,clock,chapter(),isRunning()?task:null);updateCamera(dt);renderer.render(world.scene,camera);hudWait+=dt;if(hudWait>.1){hudWait=0;updateHUD();}requestAnimationFrame(frame);
}

document.addEventListener('click',async event=>{
 const a=event.target.closest('[data-action]')?.dataset.action;if(!a)return;unlock();
 if(a==='start'){state.started=true;showPanel('');tone('arrival');}
 else if(a==='resume'){if(!state.started){showPanel('intro');return;}if(state.complete){showPanel('results');return;}if(chapter().finished){showPanel('chapter');return;}showPanel('');}
 else if(a==='pause')showPanel('pause');else if(['settings','credits','new','results'].includes(a))showPanel(a);
 else if(a==='interact')perform();
 else if(a==='next'){if(advance(state)){yaw=0;setupLevel();save();showPanel('');tone('arrival');}}
 else if(a==='confirm-new'){const old=state;state=newGame({lang:old.lang,mode:old.mode,records:old.records});state.sound=old.sound;state.volume=old.volume;state.started=true;yaw=0;setupLevel();showPanel('');save();tone('arrival');}
 else if(a==='run'){runToggle=!runToggle;translateUI();}
 else if(a==='center'){yaw=eliana.root.rotation.y;pitch=.37;}
 else if(a==='offline')prepareOffline();else if(a==='install'){if(installPrompt){await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;}else toast(tr('installHelp'),9500);}
 else if(a==='export'){save();const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download='Eliana-N25x-3D-progress.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);toast(tr('downloaded'));}
 else if(a==='import')$('save-file').click();else if(a==='retry')location.reload();
});
document.addEventListener('change',event=>{
 const e=event.target;if(e.matches('[data-language]')){if(!LANGUAGES.includes(e.value))return;state.lang=e.value;save();translateUI();}
 if(e.id==='mode'){state.mode=e.value==='challenge'?'challenge':'explorer';save();renderPanel();updateHUD();}
 if(e.id==='sound'){state.sound=e.checked;unlock();save();audioConfig();}
 if(e.id==='quality'){quality=e.value;applyQuality();}
});
document.addEventListener('input',event=>{if(event.target.id==='volume'){state.volume=Number(event.target.value)/100;$('volume-value').textContent=Math.round(state.volume*100)+'%';unlock();audioConfig();save();}});
$('save-file').addEventListener('change',async()=>{const file=$('save-file').files?.[0];if(!file)return;try{if(file.size>50000)throw Error();const restored=parseSave(await file.text());if(!restored)throw Error();state=restored;yaw=state.yaw;setupLevel();save();showPanel('intro');toast(tr('imported'));}catch{toast(tr('invalidSave'));}$('save-file').value='';});
addEventListener('keydown',event=>{
 if(event.target.matches?.('select,input,textarea'))return;
 if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyW','KeyA','KeyS','KeyD','ShiftLeft','ShiftRight','KeyE','Escape','KeyP'].includes(event.code))event.preventDefault();
 if(event.code==='Escape'||event.code==='KeyP'){if(!event.repeat)showPanel(panel?state.started&&!state.complete&&!chapter().finished?'':'intro':'pause');return;}
 if(event.code==='KeyE'){if(event.repeat)return;if(panel==='briefing')showPanel('');else perform();return;}
 if(isRunning())keys.add(event.code);
});
addEventListener('keyup',event=>keys.delete(event.code));
addEventListener('blur',()=>{clearInput();if(isRunning()){showPanel('pause');hiddenPause=true;}save();});
document.addEventListener('visibilitychange',()=>{clearInput();if(document.hidden){save();if(!panel){panel='pause';renderPanel();hiddenPause=true;}}audioConfig();});
addEventListener('pagehide',()=>{save();audio.suspend();});addEventListener('resize',resize);document.addEventListener('contextmenu',event=>{if(event.target.id==='viewport')event.preventDefault();});
const viewport=$('viewport');
viewport.addEventListener('pointerdown',event=>{if(!isRunning()||look.id!==null)return;look.id=event.pointerId;look.x=event.clientX;look.y=event.clientY;viewport.setPointerCapture(event.pointerId);event.preventDefault();unlock();});
viewport.addEventListener('pointermove',event=>{if(look.id!==event.pointerId||!isRunning())return;yaw-=(event.clientX-look.x)*.005;pitch=Math.max(.08,Math.min(1.05,pitch+(event.clientY-look.y)*.004));look.x=event.clientX;look.y=event.clientY;});
const stopLook=event=>{if(look.id===event.pointerId)look.id=null;};for(const name of ['pointerup','pointercancel','lostpointercapture'])viewport.addEventListener(name,stopLook);
viewport.addEventListener('wheel',event=>{event.preventDefault();zoom=Math.max(2.4,Math.min(8,zoom+event.deltaY*.006));},{passive:false});
const joystick=$('joystick');
function updateStick(event){const r=joystick.getBoundingClientRect(),dx=event.clientX-r.left-r.width/2,dy=event.clientY-r.top-r.height/2,max=r.width*.32,length=Math.hypot(dx,dy),factor=length>max?max/length:1;stick.x=dx*factor/max;stick.y=dy*factor/max;$('stick-knob').style.transform='translate('+dx*factor+'px,'+dy*factor+'px)';}
joystick.addEventListener('pointerdown',event=>{if(!isRunning()||stick.id!==null)return;stick.id=event.pointerId;joystick.setPointerCapture(event.pointerId);updateStick(event);event.preventDefault();unlock();});
joystick.addEventListener('pointermove',event=>{if(stick.id===event.pointerId){updateStick(event);event.preventDefault();}});
const stopStick=event=>{if(stick.id===event.pointerId){stick.id=null;stick.x=stick.y=0;$('stick-knob').style.transform='translate(0,0)';}};for(const name of ['pointerup','pointercancel','lostpointercapture'])joystick.addEventListener(name,stopStick);

async function prepareOffline(){
 offlineState='offlinePending';if(panel)renderPanel();clearTimeout(offlineTimer);offlineTimer=setTimeout(()=>{offlineState='offlineError';if(panel)renderPanel();},25000);
 try{const reg=workerReg||await navigator.serviceWorker?.ready;if(!reg?.active)throw Error();reg.active.postMessage({type:'VERIFY_OFFLINE'});}catch{clearTimeout(offlineTimer);offlineState='offlineError';if(panel)renderPanel();}
}
if('serviceWorker' in navigator){
 navigator.serviceWorker.addEventListener('message',event=>{if(event.data?.type==='OFFLINE_READY'){clearTimeout(offlineTimer);offlineState='offlineReady';if(panel)renderPanel();}else if(event.data?.type==='OFFLINE_ERROR'){clearTimeout(offlineTimer);offlineState='offlineError';if(panel)renderPanel();}});
 navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(async reg=>{
  workerReg=reg;if(!reg.active){const worker=reg.installing||reg.waiting;if(!worker)throw Error('missing_worker');await new Promise((resolve,reject)=>{const changed=()=>{if(worker.state==='activated')resolve();if(worker.state==='redundant')reject(Error('install_failed'));};worker.addEventListener('statechange',changed);changed();});}
  prepareOffline();
 }).catch(()=>{offlineState='offlineError';if(panel)renderPanel();});
}else offlineState='offlineError';
addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;});
$('loading').textContent=tr('loading');translateUI();init();
