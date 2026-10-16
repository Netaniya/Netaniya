import test from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../engine.mjs';

function act(state,action){return core.command(state,action).state;}
export function solve(state,index){
 state=act(state,{type:'ENTER',index});
 state=act(state,{type:'ACTOR',value:'eliana'});
 state=act(state,{type:'INSPECT'});
 state=act(state,{type:'ACTOR',value:'n25x'});
 const puzzle=action=>{state=act(state,{type:'PUZZLE',...action});};
 if(index===0)[1,2,0,3,0,1,0,0,0].forEach((n,i)=>{for(let j=0;j<n;j++)puzzle({index:i});});
 if(index===1)[0,1,2,3].forEach(value=>puzzle({value}));
 if(index===2)[3,5,4].forEach((value,index)=>puzzle({index,value}));
 if(index===3)[0,3].forEach(index=>puzzle({index}));
 if(index===4)for(const [index,other] of [[0,1],[1,3],[2,3]])puzzle({index,other});
 if(index===5)[24,0].forEach((value,index)=>puzzle({index,value}));
 return act(state,{type:'SUBMIT'});
}

test('new journeys normalize inputs and do not share puzzle arrays',()=>{
 const s=core.newGame({lang:'invalid',mode:'invalid'});
 assert.equal(s.lang,'de');assert(s.chapters.every(x=>x.mode==='explorer'));
 const next=act(s,{type:'ENTER',index:0});
 assert.equal(s.chapters[0].entered,false);assert.equal(next.chapters[0].entered,true);
});
test('progression, actor and clue gates reject premature actions without mutation',()=>{
 let s=core.newGame();
 for(const action of [{type:'ENTER',index:5},{type:'ENTER',index:-1},{type:'PUZZLE',index:0}])assert.equal(core.command(s,action).state,s);
 s=act(s,{type:'ENTER',index:0});
 assert.equal(core.command(s,{type:'EXIT'}).effect,'solveRequired');
 assert.equal(core.command(s,{type:'SUBMIT'}).effect,'needRobot');
 s=act(s,{type:'ACTOR',value:'n25x'});
 assert.equal(core.command(s,{type:'INSPECT'}).effect,'needEliana');
 assert.equal(core.command(s,{type:'SUBMIT'}).effect,'clueRequired');
});
for(const mode of ['explorer','challenge'])test(`all six distinct puzzles complete and survive save/reload in ${mode} mode`,()=>{
 let s=core.newGame({mode,lang:'uk'});
 for(let i=0;i<6;i++){
  s=solve(s,i);assert.equal(s.chapters[i].solved,true,core.SCENES[i].type);
  s=act(s,{type:'COLLECT'});s=act(s,{type:'TICK',ms:2500});
  const done=core.command(s,{type:'EXIT'});s=done.state;
  assert.equal(done.effect,i===5?'finale':'taskComplete');
  assert.equal(s.chapters[i].award.total,mode==='explorer'?250:300);
  const raw=JSON.stringify(s);s=core.parseSave(raw);assert(s,'reload chapter '+i);
  const repeated=core.command(s,{type:'EXIT'});assert.equal(repeated.state,s);assert.equal(repeated.effect,'completed');
 }
 assert.equal(core.completedCount(s),6);assert.equal(core.overallScore(s),mode==='explorer'?1500:1800);
 assert.equal(s.unlocked,5);
});
test('only a continuous electrical path from input to output is accepted',()=>{
 assert.equal(core.isSolved('grid',[0,0,0,0,0,0,0,0,0]),false);
 assert.equal(core.isSolved('grid',[1,2,0,3,0,1,0,0,0]),true);
 assert.equal(core.isSolved('grid',[1,2,0,3,0,0,0,0,0]),false);
});
test('wrong attempts lower precision, time lowers only the challenge bonus',()=>{
 let s=core.newGame({mode:'challenge'});s=act(s,{type:'ENTER',index:0});s=act(s,{type:'INSPECT'});s=act(s,{type:'ACTOR',value:'n25x'});
 s=act(s,{type:'SUBMIT'});assert.equal(s.chapters[0].mistakes,1);
 const a={...s.chapters[0],collected:true,elapsedMs:140000};
 assert.deepEqual(core.scoreAttempt(a,0),{base:200,discovery:25,precision:20,speed:45,total:290});
 assert.equal(core.scoreAttempt({...a,elapsedMs:86400000,mistakes:999},0).total,225);
 assert.equal(core.scoreAttempt({...a,mode:'explorer'},0).total,245);
});
test('replaying or changing mode retains records and never duplicates rewards',()=>{
 let s=solve(core.newGame(),0);s=act(s,{type:'EXIT'});assert.equal(core.overallScore(s),225);
 s=act(s,{type:'COLLECT'});assert.equal(core.overallScore(s),250);
 assert.equal(core.command(s,{type:'COLLECT'}).effect,'alreadyCollected');
 s=act(s,{type:'MODE',value:'challenge'});s=act(s,{type:'ENTER',index:0});
 assert.equal(s.chapters[0].completed,false);assert.equal(s.chapters[0].mode,'challenge');assert.equal(core.overallScore(s),250);
 s=solve(s,0);s=act(s,{type:'EXIT'});assert.equal(core.overallScore(s),275);
 s=act(s,{type:'RESTART'});assert.equal(core.overallScore(s),275);assert.equal(s.chapters[0].solved,false);
});
test('invalid puzzle moves, ranges and oversized ticks are rejected',()=>{
 let s=act(core.newGame(),{type:'ENTER',index:0});s=act(s,{type:'INSPECT'});s=act(s,{type:'ACTOR',value:'n25x'});
 for(const action of [{type:'PUZZLE',index:9},{type:'PUZZLE',index:NaN},{type:'LANGUAGE',value:'<script>'},{type:'VOLUME',value:2}])assert.equal(core.command(s,action).state,s);
 s=act(s,{type:'TICK',ms:9999999});assert.equal(s.chapters[0].elapsedMs,0);
 s=act(s,{type:'TICK',ms:1000});assert.equal(core.formatTime(s.chapters[0].elapsedMs),'00:01');
});
test('corrupt and incompatible saves fail safely, storage failures remain recoverable',()=>{
 for(const raw of ['',null,'{','{}','x'.repeat(120001)])assert.equal(core.parseSave(raw),null);
 for(const mutate of [s=>s.schema='v0',s=>s.active=5,s=>s.lang='xx',s=>s.chapters[0].puzzle=[99],s=>s.chapters[0].solved=true,s=>s.records.explorer=[],s=>s.records.challenge[0]={score:9999}]){const s=core.newGame();mutate(s);assert.equal(core.parseSave(JSON.stringify(s)),null);}
 assert.equal(core.loadProgress({getItem(){throw Error('blocked');}}).warning,true);
 assert.equal(core.saveProgress({setItem(){throw Error('quota');}},core.newGame()),false);
 const data=new Map(),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
 assert.equal(core.loadProgress(storage).warning,false);core.saveProgress(storage,solve(core.newGame(),0));assert.equal(core.loadProgress(storage).state.chapters[0].solved,true);
 data.set(core.SCHEMA,'broken');assert.equal(core.loadProgress(storage).warning,true);assert.equal(data.get(core.SCHEMA),'broken');
});
