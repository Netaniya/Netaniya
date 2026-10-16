export const SCHEMA='eliana-n25x.save.v1';
export const LANGUAGES=['de','en','ru','uk'];
export const SCENES=Object.freeze([
 {id:'cobalt',image:'super-city.webp',type:'grid',clue:[.158,.598],terminal:[.746,.611],module:[.505,.837],exit:[.58,.43],targetSeconds:120},
 {id:'silent',image:'silent-city.webp',type:'sequence',clue:[.164,.546],terminal:[.846,.546],module:[.571,.826],exit:[.52,.43],targetSeconds:95},
 {id:'aurora',image:'aurora-school.webp',type:'balance',clue:[.182,.472],terminal:[.791,.379],module:[.518,.744],exit:[.59,.40],targetSeconds:150},
 {id:'garden',image:'sky-garden.webp',type:'valves',clue:[.236,.422],terminal:[.811,.486],module:[.442,.797],exit:[.57,.40],targetSeconds:100},
 {id:'home',image:'home-sector.webp',type:'order',clue:[.192,.255],terminal:[.953,.302],module:[.472,.729],exit:[.68,.46],targetSeconds:120},
 {id:'lighthouse',image:'sky-station.webp',type:'tune',clue:[.210,.572],terminal:[.705,.587],module:[.468,.828],exit:[.51,.40],targetSeconds:100}
]);
export const SYMBOLS=['◇','△','○','□'];
export const GRID_TYPES=['elbow','elbow','straight','elbow','elbow','straight','elbow','straight','elbow'];
const clone=x=>JSON.parse(JSON.stringify(x));
const integer=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
const bool=x=>typeof x==='boolean';
export function initialPuzzle(type){return type==='grid'?[0,0,0,0,0,0,0,0,0]:type==='sequence'?[]:type==='balance'?[2,4,6]:type==='valves'?[true,false,true,false]:type==='order'?[2,0,3,1]:[20,3];}
export function newAttempt(index,mode='explorer'){return {entered:false,mode,clue:false,solved:false,collected:false,completed:false,puzzle:initialPuzzle(SCENES[index].type),moves:0,mistakes:0,elapsedMs:0,award:null};}
export function newGame({lang='de',mode='explorer'}={}){mode=['explorer','challenge'].includes(mode)?mode:'explorer';return {schema:SCHEMA,lang:LANGUAGES.includes(lang)?lang:'de',mode:['explorer','challenge'].includes(mode)?mode:'explorer',actor:'eliana',active:0,started:false,unlocked:0,sound:false,volume:.35,chapters:SCENES.map((_,i)=>newAttempt(i,mode)),records:{explorer:SCENES.map(()=>null),challenge:SCENES.map(()=>null)}};}
export function connections(type,rotation){return (type==='straight'?[0,2]:[0,1]).map(x=>(x+rotation)%4);}
export function poweredTiles(rotations){
 if(!Array.isArray(rotations)||rotations.length!==9)return [];
 const links=rotations.map((r,i)=>connections(GRID_TYPES[i],r));
 if(!links[3].includes(3))return [];
 const found=new Set([3]),queue=[3],directions=[[-1,0],[0,1],[1,0],[0,-1]];
 while(queue.length){const i=queue.shift(),row=Math.floor(i/3),col=i%3;for(const d of links[i]){const [dy,dx]=directions[d],y=row+dy,x=col+dx;if(x<0||x>2||y<0||y>2)continue;const j=y*3+x;if(links[j].includes((d+2)%4)&&!found.has(j)){found.add(j);queue.push(j);}}}
 return [...found];
}
export function isSolved(type,p){
 if(type==='grid')return poweredTiles(p).includes(5)&&connections(GRID_TYPES[5],p[5]).includes(1);
 if(type==='sequence')return p.length===4&&p.every((x,i)=>x===i);
 if(type==='balance')return p[0]+p[1]+p[2]===12&&p[1]===p[0]+2&&p[2]===p[0]+1;
 if(type==='valves')return p.every(Boolean);
 if(type==='order')return p.every((x,i)=>x===i);
 if(type==='tune')return p[0]===24&&p[1]===0;
 return false;
}
export function scoreAttempt(attempt,index){const base=200,discovery=attempt.collected?25:0,precision=Math.max(0,25-attempt.mistakes*5),speed=attempt.mode==='challenge'?Math.max(0,50-Math.floor(Math.max(0,attempt.elapsedMs/1000-SCENES[index].targetSeconds)/4)):0;return {base,discovery,precision,speed,total:base+discovery+precision+speed};}
export function overallScore(state){return SCENES.reduce((sum,_,i)=>sum+Math.max(state.records.explorer[i]?.score||0,state.records.challenge[i]?.score||0),0);}
export function completedCount(state){return SCENES.filter((_,i)=>state.records.explorer[i]||state.records.challenge[i]).length;}
export function command(current,action){
 const s=clone(current);let effect='';const index=s.active,a=s.chapters[index],scene=SCENES[index];
 if(action.type==='LANGUAGE'){if(!LANGUAGES.includes(action.value))return {state:current,effect:'invalid'};s.lang=action.value;}
 else if(action.type==='MODE'){if(!['explorer','challenge'].includes(action.value))return {state:current,effect:'invalid'};s.mode=action.value;}
 else if(action.type==='ACTOR'){if(!['eliana','n25x'].includes(action.value))return {state:current,effect:'invalid'};s.actor=action.value;}
 else if(action.type==='SOUND')s.sound=Boolean(action.value);
 else if(action.type==='VOLUME'){if(!Number.isFinite(action.value)||action.value<0||action.value>1)return {state:current,effect:'invalid'};s.volume=action.value;}
 else if(action.type==='ENTER'){
  if(!integer(action.index,0,5)||action.index>s.unlocked)return {state:current,effect:'locked'};
  s.started=true;s.active=action.index;const next=s.chapters[action.index];
  if(next.mode!==s.mode)s.chapters[action.index]=newAttempt(action.index,s.mode);
  s.chapters[action.index].entered=true;
 }
 else if(action.type==='RESTART'){s.chapters[index]=newAttempt(index,s.mode);s.chapters[index].entered=true;s.actor='eliana';}
 else if(action.type==='TICK'){if(a.entered&&!a.completed&&integer(action.ms,0,5000))a.elapsedMs=Math.min(86400000,a.elapsedMs+action.ms);}
 else if(action.type==='INSPECT'){if(!a.entered)return {state:current,effect:'invalid'};if(s.actor!=='eliana')return {state:current,effect:'needEliana'};a.clue=true;effect='clueFound';}
 else if(action.type==='COLLECT'){if(!a.entered)return {state:current,effect:'invalid'};if(a.collected)return {state:current,effect:'alreadyCollected'};a.collected=true;effect='collected';if(a.completed){a.award=scoreAttempt(a,index);const best=s.records[a.mode][index];if(!best||a.award.total>best.score)s.records[a.mode][index]={score:a.award.total,elapsedMs:a.elapsedMs,mistakes:a.mistakes,collected:true};}}
 else if(action.type==='PUZZLE'||action.type==='SUBMIT'||action.type==='RESET_PUZZLE'){
  if(!a.entered||a.completed)return {state:current,effect:'invalid'};
  if(s.actor!=='n25x')return {state:current,effect:'needRobot'};
  if(!a.clue)return {state:current,effect:'clueRequired'};
  if(a.solved)return {state:current,effect:'solved'};
  if(action.type==='RESET_PUZZLE'){a.puzzle=initialPuzzle(scene.type);a.moves++;}
  else if(action.type==='SUBMIT'){if(isSolved(scene.type,a.puzzle)){a.solved=true;effect='solved';}else {a.mistakes++;effect='attemptFailed';}}
  else {
   const p=a.puzzle;
   if(scene.type==='grid'&&integer(action.index,0,8))p[action.index]=(p[action.index]+1)%4;
   else if(scene.type==='sequence'&&action.clear===true)a.puzzle=[];
   else if(scene.type==='sequence'&&integer(action.value,0,3)&&p.length<4)p.push(action.value);
   else if(scene.type==='balance'&&integer(action.index,0,2)&&integer(action.value,0,8))p[action.index]=action.value;
   else if(scene.type==='valves'&&integer(action.index,0,3)){for(const j of [[0,1],[1,2],[2,3],[0,3]][action.index])p[j]=!p[j];}
   else if(scene.type==='order'&&integer(action.index,0,3)&&integer(action.other,0,3)&&action.index!==action.other)[p[action.index],p[action.other]]=[p[action.other],p[action.index]];
   else if(scene.type==='tune'&&integer(action.index,0,1)&&integer(action.value,action.index===0?1:0,action.index===0?40:8))p[action.index]=action.value;
   else return {state:current,effect:'invalid'};
   a.moves++;
  }
 }
 else if(action.type==='EXIT'){
  if(a.completed)return {state:current,effect:'completed'};
  if(!a.clue||!a.solved)return {state:current,effect:'solveRequired'};
  a.completed=true;a.award=scoreAttempt(a,index);const best=s.records[a.mode][index];
  if(!best||a.award.total>best.score||(a.award.total===best.score&&a.elapsedMs<best.elapsedMs))s.records[a.mode][index]={score:a.award.total,elapsedMs:a.elapsedMs,mistakes:a.mistakes,collected:a.collected};
  s.unlocked=Math.max(s.unlocked,Math.min(5,index+1));effect=index===5?'finale':'taskComplete';
 }
 else return {state:current,effect:'invalid'};
 return {state:s,effect};
}
function validPuzzle(p,type){if(!Array.isArray(p))return false;if(type==='grid')return p.length===9&&p.every(x=>integer(x,0,3));if(type==='sequence')return p.length<=4&&p.every(x=>integer(x,0,3));if(type==='balance')return p.length===3&&p.every(x=>integer(x,0,8));if(type==='valves')return p.length===4&&p.every(bool);if(type==='order')return p.length===4&&new Set(p).size===4&&p.every(x=>integer(x,0,3));return p.length===2&&integer(p[0],1,40)&&integer(p[1],0,8);}
export function parseSave(raw){
 try{if(typeof raw!=='string'||raw.length>120000)return null;const x=JSON.parse(raw);
  if(x.schema!==SCHEMA||!LANGUAGES.includes(x.lang)||!['explorer','challenge'].includes(x.mode)||!['eliana','n25x'].includes(x.actor)||!integer(x.active,0,5)||!integer(x.unlocked,0,5)||x.active>x.unlocked||!bool(x.started)||!bool(x.sound)||!Number.isFinite(x.volume)||x.volume<0||x.volume>1||!Array.isArray(x.chapters)||x.chapters.length!==6)return null;
  const s=newGame({lang:x.lang,mode:x.mode});Object.assign(s,{actor:x.actor,active:x.active,started:x.started,unlocked:x.unlocked,sound:x.sound,volume:x.volume});
  for(let i=0;i<6;i++){const a=x.chapters[i];if(!a||!['explorer','challenge'].includes(a.mode)||!['entered','clue','solved','collected','completed'].every(k=>bool(a[k]))||!integer(a.moves,0,1000000)||!integer(a.mistakes,0,1000000)||!integer(a.elapsedMs,0,86400000)||!validPuzzle(a.puzzle,SCENES[i].type)||(a.solved&&(!a.clue||!isSolved(SCENES[i].type,a.puzzle)))||(a.completed&&!a.solved))return null;s.chapters[i]={entered:a.entered,mode:a.mode,clue:a.clue,solved:a.solved,collected:a.collected,completed:a.completed,puzzle:clone(a.puzzle),moves:a.moves,mistakes:a.mistakes,elapsedMs:a.elapsedMs,award:a.completed?scoreAttempt(a,i):null};}
  for(const mode of ['explorer','challenge']){if(!Array.isArray(x.records?.[mode])||x.records[mode].length!==6)return null;for(let i=0;i<6;i++){const r=x.records[mode][i];if(r===null)continue;if(!r||!integer(r.score,200,300)||!integer(r.elapsedMs,0,86400000)||!integer(r.mistakes,0,1000000)||!bool(r.collected))return null;s.records[mode][i]={score:r.score,elapsedMs:r.elapsedMs,mistakes:r.mistakes,collected:r.collected};}}
  return s;
 }catch{return null;}
}
export function loadProgress(storage){try{const raw=storage.getItem(SCHEMA),parsed=raw===null?null:parseSave(raw);return {state:parsed||newGame(),warning:raw!==null&&!parsed};}catch{return {state:newGame(),warning:true};}}
export function saveProgress(storage,state){try{storage.setItem(SCHEMA,JSON.stringify(state));return true;}catch{return false;}}
export function formatTime(ms){const seconds=Math.floor(Math.max(0,ms)/1000);return Math.floor(seconds/60).toString().padStart(2,'0')+':'+(seconds%60).toString().padStart(2,'0');}
