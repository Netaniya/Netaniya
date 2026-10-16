// Deterministic game rules, collision queries and navigation. No renderer required.
export const SAVE_KEY='eliana-n25x.3d.v1';
export const LANGUAGES=['de','en','ru','uk'];
export const BOUNDS={minX:-19,maxX:19,minZ:-23,maxZ:22};
export const SPAWN={x:0,z:17};
export const LEVELS=[
 {id:'cobalt',name:'city',color:0x19e9ff,sky:0x62b4ee,ground:0x6a9bb9,wall:0x3262c4,target:180,items:[[6,9],[-12,-8],[12,-5]],clue:[-4,13],terminal:[0,-11],kind:'energy'},
 {id:'silent',name:'silent',color:0xffa63d,sky:0x7093cf,ground:0x797a9c,wall:0x585c87,target:190,items:[[7,8],[-12,-8],[7,-9]],clue:[-4,13],terminal:[0,-11],kind:'relay'},
 {id:'aurora',name:'campus',color:0x66e5ff,sky:0x84c9f5,ground:0x87a8c8,wall:0x7861cc,target:190,items:[[-6,7],[-12,-8],[12,-5]],clue:[-4,13],terminal:[0,-11],kind:'archive'},
 {id:'garden',name:'garden',color:0x9fff43,sky:0x73d0dc,ground:0x67a783,wall:0x288d97,target:210,items:[[7,8],[-12,-8],[12,-5]],clue:[-4,13],terminal:[0,-11],kind:'valve'},
 {id:'home',name:'home',color:0xffcf46,sky:0xffc49a,ground:0xb49caa,wall:0xc5709c,target:180,items:[[-6,7],[-12,-8],[12,-5]],clue:[-4,13],terminal:[0,-11],kind:'panel'},
 {id:'lighthouse',name:'tower',color:0x39e6ff,sky:0x485eb3,ground:0x6385b5,wall:0x435ac1,target:210,items:[[7,8],[-12,-8],[12,-5]],clue:[-4,13],terminal:[0,-11],kind:'beacon'}
];
export function obstacles(level=0,gateOpen=false){
 const L=LEVELS[level];
 const a=[
  {id:'west',x:-13,z:6,w:8,d:10,h:level===3?2.8:9},
  {id:'east',x:13,z:5,w:8,d:12,h:level===3?3:12},
  {id:'room-n',x:-13,z:-13,w:10,d:.6,h:3.6},
  {id:'room-w',x:-18,z:-8,w:.6,d:10,h:3.6},
  {id:'room-e1',x:-8,z:-11,w:.6,d:4,h:3.6},
  {id:'room-e2',x:-8,z:-3.6,w:.6,d:1.2,h:3.6},
  {id:'planter',x:0,z:4,w:4,d:3,h:.65},
  {id:'bench',x:-4,z:-1,w:.8,d:3,h:.8},
  {id:'gate-left',x:-11.5,z:-16,w:15,d:1,h:3.8},
  {id:'gate-right',x:11.5,z:-16,w:15,d:1,h:3.8},
  {id:'terminal',x:L.terminal[0],z:L.terminal[1],w:1.3,d:.8,h:1.4},
  {id:'clue',x:L.clue[0],z:L.clue[1],w:.94,d:.94,h:1.05},
  {id:'antenna',x:1.5,z:-11,w:.14,d:.14,h:4.4},
  ...[0,1,2].map(j=>({id:'desk'+j,x:-16+j*2.3,z:-11.9,w:1.5,d:.7,h:.83})),
  ...L.items.map(([x,z],i)=>({id:'item'+i,x,z,w:.94,d:.94,h:.65}))
 ];
 if(level===1)for(const [id,x,z,d]of[['west',-13,6,10],['east',13,5,12]])for(let j=0;j<7;j++)a.push({id:'debris-'+id+j,x:x+(j%3-1)*2,z:z+d/2+1+j%2,w:.94,d:.94,h:.3});
 if(!gateOpen)a.push({id:'gate',x:0,z:-16,w:8,d:.65,h:3.6});
 return a;
}
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function freeAt(p,boxes,r=.34){
 if(p.x<BOUNDS.minX+r||p.x>BOUNDS.maxX-r||p.z<BOUNDS.minZ+r||p.z>BOUNDS.maxZ-r)return false;
 return !boxes.some(b=>{const dx=p.x-Math.max(b.x-b.w/2,Math.min(p.x,b.x+b.w/2));const dz=p.z-Math.max(b.z-b.d/2,Math.min(p.z,b.z+b.d/2));return dx*dx+dz*dz<r*r-1e-8;});
}
export function move(p,dx,dz,boxes,r=.34){
 const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.12));let x=p.x,z=p.z;
 for(let i=0;i<n;i++){if(freeAt({x:x+dx/n,z},boxes,r))x+=dx/n;if(freeAt({x,z:z+dz/n},boxes,r))z+=dz/n;}
 return {x,z};
}
export function clearLine(a,b,boxes,r=.34){
 const d=distance(a,b),steps=Math.max(1,Math.ceil(d/.16));
 for(let i=0;i<=steps;i++)if(!freeAt({x:a.x+(b.x-a.x)*i/steps,z:a.z+(b.z-a.z)*i/steps},boxes,r))return false;
 return true;
}
export function pathTo(start,target,boxes,r=.38){
 const width=38,height=45;
 const point=k=>({x:k%width-18.5,z:Math.floor(k/width)-22.5});
 const cells=Array.from({length:width*height},(_,k)=>freeAt(point(k),boxes,r));
 function nearest(p,fromStart=false){let id=-1,best=Infinity;for(let k=0;k<cells.length;k++){if(!cells[k])continue;const d=distance(point(k),p);if(d<best&&(!fromStart||clearLine(start,point(k),boxes,r))){best=d;id=k;}}return id;}
 const first=nearest(start,true),last=nearest(target);if(first<0||last<0)return [];
 const queue=[first],parents=new Int32Array(cells.length).fill(-2);parents[first]=-1;
 for(let i=0;i<queue.length&&parents[last]===-2;i++){const k=queue[i],x=k%width,z=Math.floor(k/width);for(const [nx,nz]of[[x-1,z],[x+1,z],[x,z-1],[x,z+1]]){if(nx<0||nx>=width||nz<0||nz>=height)continue;const j=nz*width+nx;if(!cells[j]||parents[j]!==-2||!clearLine(point(k),point(j),boxes,r))continue;parents[j]=k;queue.push(j);}}
 if(parents[last]===-2)return [];
 const result=[];for(let k=last;k!==-1;k=parents[k])result.push(point(k));result.reverse();
 if(freeAt(target,boxes,r)&&clearLine(point(last),target,boxes,r))result.push({...target});
 // The continuous start-to-grid segment must also be collision-free.
 if(result.length&&!clearLine(start,result[0],boxes,r))return [];
 const smooth=[];let anchor=start,index=0;while(index<result.length){let far=index;for(let j=index+1;j<result.length;j++){if(clearLine(anchor,result[j],boxes,r))far=j;}smooth.push(result[far]);anchor=result[far];index=far+1;}
 return smooth;
}
const chapter=()=>({clue:false,items:[false,false,false],scanned:false,restored:false,elapsed:0,finished:false});
export function newGame({lang='de',mode='explorer',records}={}){return {schema:SAVE_KEY,lang:LANGUAGES.includes(lang)?lang:'de',mode:mode==='challenge'?'challenge':'explorer',level:0,chapters:LEVELS.map(chapter),records:records||{explorer:LEVELS.map(()=>null),challenge:LEVELS.map(()=>null)},position:{...SPAWN},yaw:0,sound:true,volume:.35,started:false,complete:false};}
export function goal(s){const c=s.chapters[s.level];return !c.clue?'clue':c.items.some(v=>!v)?'items':!c.scanned?'scan':!c.restored?'repair':'exit';}
export function target(s){const L=LEVELS[s.level],g=goal(s),c=s.chapters[s.level];if(g==='clue')return {id:'clue',x:L.clue[0],z:L.clue[1]};if(g==='items'){const i=c.items.indexOf(false);return {id:'item'+i,x:L.items[i][0],z:L.items[i][1]};}if(g==='exit')return {id:'exit',x:0,z:-21};return {id:g,x:0,z:-9.5};}
export function interact(s,id,p){
 const c=s.chapters[s.level],L=LEVELS[s.level],g=goal(s);let object;
 if(id==='clue')object={x:L.clue[0],z:L.clue[1]};
 else if(/^item[0-2]$/.test(id)){const i=Number(id.at(-1));object={x:L.items[i][0],z:L.items[i][1]};}
 else if(id==='scan'||id==='repair')object={x:0,z:-10};else return 'unavailable';
 const boxes=obstacles(s.level,c.restored).filter(b=>b.id!==id&&!(['scan','repair'].includes(id)&&b.id==='terminal'));
 if(distance(p,object)>2.3||!clearLine(p,object,boxes,.04))return 'tooFar';
 if(id==='clue'){if(c.clue)return 'known';c.clue=true;return 'clue';}
 if(id.startsWith('item')){if(!c.clue)return 'needClue';const i=Number(id.at(-1));if(c.items[i])return 'known';if(L.kind==='relay'&&c.items.indexOf(false)!==i)return 'order';c.items[i]=true;return 'collect';}
 if(id!==g)return 'requirements';return id;
}
export function award(s){const c=s.chapters[s.level];const bonus=s.mode==='challenge'?Math.max(0,120-Math.floor(Math.max(0,c.elapsed-LEVELS[s.level].target)/2)):0;return {score:350+bonus,bonus,seconds:Math.round(c.elapsed)};}
export function finish(s){const c=s.chapters[s.level];if(!c.restored||c.finished)return null;c.finished=true;const result=award(s),old=s.records[s.mode][s.level];if(!old||old.score<result.score)s.records[s.mode][s.level]=result;if(s.level===5)s.complete=true;return result;}
export function advance(s){if(!s.chapters[s.level].finished||s.level>=5)return false;s.level++;s.position={...SPAWN};s.yaw=0;return true;}
export function score(s){return LEVELS.reduce((total,_,i)=>total+Math.max(s.records.explorer[i]?.score||0,s.records.challenge[i]?.score||0),0);}
export function parseSave(text){try{
 const x=JSON.parse(text);if(x.schema!==SAVE_KEY||!Number.isInteger(x.level)||x.level<0||x.level>5||!Array.isArray(x.chapters)||x.chapters.length!==6)return null;
 const s=newGame({lang:x.lang,mode:x.mode});
 for(let i=0;i<6;i++){const c=x.chapters[i];if(!c||!['clue','scanned','restored','finished'].every(k=>typeof c[k]==='boolean')||!Array.isArray(c.items)||c.items.length!==3||c.items.some(v=>typeof v!=='boolean')||!Number.isFinite(c.elapsed)||c.elapsed<0||c.elapsed>1e8)return null;if(c.scanned&&(!c.clue||c.items.some(v=>!v))||c.restored&&!c.scanned||c.finished&&!c.restored)return null;if(i<x.level&&!c.finished)return null;s.chapters[i]={...c,items:[...c.items]};}
 s.level=x.level;s.complete=Boolean(x.complete)&&s.level===5&&s.chapters[5].finished;s.started=Boolean(x.started);
 s.sound=typeof x.sound==='boolean'?x.sound:true;s.volume=Number.isFinite(x.volume)?Math.max(0,Math.min(1,x.volume)):.35;
 if(x.position&&Number.isFinite(x.position.x)&&Number.isFinite(x.position.z)&&freeAt(x.position,obstacles(s.level,s.chapters[s.level].restored)))s.position={x:x.position.x,z:x.position.z};
 s.yaw=Number.isFinite(x.yaw)?x.yaw%(Math.PI*2):0;
 for(const mode of ['explorer','challenge'])for(let i=0;i<6;i++){const r=x.records?.[mode]?.[i];if(r&&Number.isInteger(r.score)&&r.score>=350&&r.score<=470&&Number.isFinite(r.seconds)&&r.seconds>=0&&Number.isInteger(r.bonus)&&r.bonus===r.score-350)s.records[mode][i]={score:r.score,bonus:r.bonus,seconds:r.seconds};}
 return s;
 }catch{return null;}}
