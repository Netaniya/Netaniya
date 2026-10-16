import {SCORE_PROGRAM,validScoreProgram,runProgram,createInterpreter} from './program.mjs';
export const CREATION_SCHEMA='eliana-n25x.project.v1';
export const MAX_CREATION_BYTES=160000;
export const WRITING_TEMPLATES=['letter','message','script','lyrics','poem','article','comic','greeting','mindmap','plan'];
export const CREATION_TEMPLATES=['quiz','story',...WRITING_TEMPLATES,'webpage','checklist','timer','flashcards','badge','sticker'];
export const PALETTE={cyan:'#8ad9e8',mint:'#9be2bc',violet:'#c2aff7'};
const text=(value,max=8000)=>typeof value==='string'&&value.trim().length&&value.length<=max?value.trim().normalize('NFC'):null;
export function validateCreation(kind,data) {
 if(!data||typeof data!=='object'||Array.isArray(data))return null;
 if(kind==='quiz') {
  if(!Array.isArray(data.questions)||data.questions.length<1||data.questions.length>8||!validScoreProgram(data.program))return null;
  const questions=[];
  for(const q of data.questions){
   if(!q||!text(q.prompt,240)||!Array.isArray(q.options)||q.options.length!==3||!q.options.every(v=>text(v,120))||new Set(q.options.map(v=>v.trim().normalize('NFC').toLocaleLowerCase())).size!==3||!Number.isInteger(q.answer)||q.answer<0||q.answer>2)return null;
   questions.push({prompt:text(q.prompt,240),options:q.options.map(v=>text(v,120)),answer:q.answer});
  }
  return {questions,program:data.program};
 }
 if(kind==='story'){
  const fields=['intro','choiceA','endingA','choiceB','endingB'];if(fields.some(k=>!text(data[k],k.startsWith('choice')?100:2400)))return null;
  return Object.fromEntries(fields.map(k=>[k,text(data[k],k.startsWith('choice')?100:2400)]));
 }
 if(kind!=='creation'||!CREATION_TEMPLATES.includes(data.template)||['quiz','story'].includes(data.template))return null;
 const {template}=data,content=text(data.content);if(!content)return null;
 if(['badge','sticker'].includes(template)&&content.length>24)return null;
 if(template==='timer'&&(!/^\d+$/.test(content)||+content<1||+content>60))return null;
 if(template==='flashcards'&&(content.split('\n').filter(v=>v.trim()).length>20||content.split('\n').filter(v=>v.trim()).some(v=>v.split('|').length!==2||v.split('|').some(x=>!x.trim()||x.length>160))))return null;
 if(['checklist','plan','mindmap','comic'].includes(template)&&content.split('\n').filter(v=>v.trim()).length>24)return null;
 return {template,content,color:Object.hasOwn(PALETTE,data.color)?data.color:'cyan'};
}
export function serializeCreation(project){return JSON.stringify({schema:CREATION_SCHEMA,name:project.name,kind:project.kind,data:project.data},null,2);}
export function parseCreation(raw){
 try{if(typeof raw!=='string'||raw.length>MAX_CREATION_BYTES)return null;const p=JSON.parse(raw);if(p.schema!==CREATION_SCHEMA||!text(p.name,24))return null;const data=validateCreation(p.kind,p.data);return data?{name:text(p.name,24),kind:p.kind,data}:null;}catch{return null;}
}
export const projectTemplate=p=>p.kind==='creation'?p.data.template:p.kind;
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeJSON=value=>JSON.stringify(value).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');

// The same player is used in sandboxed previews and offline HTML exports.
// User-authored content is inserted with textContent, never innerHTML.
export function projectPlayer(project,copy,runProgram) {
 const screen=document.getElementById('screen'),data=project.data;
 const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
 const button=(text,fn)=>{const e=el('button',text);e.type='button';e.addEventListener('click',fn);return e;};
 let index=0,score=0,flipped=false;
 function quiz(){
  screen.replaceChildren();
  if(index>=data.questions.length){screen.append(el('span',copy.complete,'eyebrow'),el('h2',score+' / '+data.questions.length*10),button(copy.restart,()=>{index=0;score=0;quiz();}));return;}
  const q=data.questions[index],feedback=el('p','','feedback'),choices=el('div',undefined,'choices');let answered=false;
  screen.append(el('span',(index+1)+' / '+data.questions.length+' · '+copy.score+': '+score,'eyebrow'),el('h2',q.prompt),choices,feedback);
  q.options.forEach((answer,i)=>choices.append(button(answer,()=>{
   if(answered)return;answered=true;choices.querySelectorAll('button').forEach(b=>b.disabled=true);
   const correct=i===q.answer,result=runProgram(data.program,'mark',[score,correct,10]);
   if(!result.ok){feedback.textContent=copy.programError;return;}
   score=result.value;feedback.textContent=correct?copy.correct:copy.correctAnswer+': '+q.options[q.answer];
   screen.append(button(index===data.questions.length-1?copy.finish:copy.next,()=>{index++;quiz();}));
  })));
 }
 if(project.kind==='quiz'){quiz();return;}
 if(project.kind==='story'){
  const start=()=>{screen.replaceChildren(el('p',data.intro,'prose'),button(data.choiceA,()=>end(data.endingA)),button(data.choiceB,()=>end(data.endingB)));};
  const end=text=>screen.replaceChildren(el('p',text,'prose'),button(copy.restart,start));start();return;
 }
 const {template,content}=data,lines=content.split('\n').filter(v=>v.trim());
 if(template==='timer'){
  let remaining=Number(content)*60,deadline=0,running=false;const output=el('output','','clock');
  const paint=()=>{if(running)remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));output.textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');if(running&&!remaining){running=false;toggle.textContent=copy.start;status.textContent=copy.complete;}};
  const toggle=button(copy.start,()=>{if(!remaining)remaining=Number(content)*60;running=!running;if(running)deadline=Date.now()+remaining*1000;toggle.textContent=running?copy.pause:copy.start;status.textContent='';paint();});
  const status=el('p','','feedback');status.setAttribute('aria-live','polite');screen.append(output,toggle,button(copy.restart,()=>{running=false;remaining=Number(content)*60;toggle.textContent=copy.start;status.textContent='';paint();}),status);setInterval(paint,250);paint();return;
 }
 if(template==='flashcards'){
  const pairs=lines.map(line=>line.split('|').map(v=>v.trim()));
  const show=()=>{screen.replaceChildren(el('span',(index+1)+' / '+pairs.length,'eyebrow'),el('h2',pairs[index][flipped?1:0]),button(copy.flip,()=>{flipped=!flipped;show();}),button(copy.next,()=>{index=(index+1)%pairs.length;flipped=false;show();}));};show();return;
 }
 if(template==='checklist'||template==='plan'){
  let hash=2166136261;for(const c of content)hash=Math.imul(hash^c.codePointAt(0),16777619);const key='en25x-creation-checks:'+hash;let done=[];try{const saved=JSON.parse(localStorage.getItem(key));if(Array.isArray(saved))done=saved.filter(v=>Number.isInteger(v)&&v>=0&&v<lines.length);}catch{}
  const progress=el('p','','eyebrow'),update=()=>{progress.textContent=done.length+' / '+lines.length;try{localStorage.setItem(key,JSON.stringify(done));}catch{}};screen.append(progress);
  lines.forEach((line,i)=>{const label=el('label'),input=el('input');input.type='checkbox';input.checked=done.includes(i);input.addEventListener('change',()=>{done=done.filter(v=>v!==i);if(input.checked)done.push(i);update();});label.append(input,el('span',line));screen.append(label);});update();return;
 }
 if(template==='badge'||template==='sticker'){
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 400 300');svg.setAttribute('role','img');svg.setAttribute('aria-label',content);
  const shape=document.createElementNS(ns,'rect');shape.setAttribute('x','25');shape.setAttribute('y','40');shape.setAttribute('width','350');shape.setAttribute('height','220');shape.setAttribute('rx','60');shape.setAttribute('fill',data.color==='mint'?'#9be2bc':data.color==='violet'?'#c2aff7':'#8ad9e8');
  const label=document.createElementNS(ns,'text');label.setAttribute('x','200');label.setAttribute('y','160');label.setAttribute('text-anchor','middle');label.setAttribute('font-size','23');label.setAttribute('font-family','system-ui,sans-serif');label.setAttribute('fill','#0a1727');label.textContent=content.slice(0,24);svg.append(shape,label);if(template==='sticker')svg.classList.add('sticker');screen.append(svg);return;
 }
 if(template==='comic'||template==='mindmap'){
  const grid=el('div',undefined,template==='comic'?'comic':'mindmap');lines.forEach((line,i)=>{const card=el('section');if(template==='comic')card.append(el('span',String(i+1),'eyebrow'));card.append(el('p',line));grid.append(card);});screen.append(grid);return;
 }
 screen.append(el('p',content,'prose'));
}

export function renderCreationHTML(project,lang,copy) {
 const p={name:project.name,kind:project.kind,data:validateCreation(project.kind,project.data)};
 if(!p.data)throw Error('invalid project');
 const accent=PALETTE[p.data.color]||PALETTE.cyan;
 const css='*{box-sizing:border-box}body{margin:0;background:#090e18;color:#ecf4ff;font:17px/1.65 system-ui,sans-serif;padding:24px 18px}main{max-width:700px;margin:0 auto}h1{font-size:clamp(27px,6vw,44px);line-height:1.2;overflow-wrap:anywhere}h2{font-size:clamp(24px,5vw,33px);line-height:1.4;overflow-wrap:anywhere}button{display:block;width:100%;min-height:52px;border:1px solid #476078;border-radius:15px;padding:13px 17px;background:#1a3047;color:#ecf4ff;font:600 17px/1.5 system-ui;text-align:left;margin:12px 0;cursor:pointer;touch-action:manipulation;overflow-wrap:anywhere}button:hover{border-color:var(--accent)}button:focus-visible,input:focus-visible{outline:3px solid var(--accent);outline-offset:3px}button:disabled{opacity:.6;cursor:default}#screen{background:#121f30;border:1px solid #30465f;border-radius:24px;padding:24px;min-height:220px}.eyebrow{font-size:12px;color:var(--accent);letter-spacing:1px}.feedback{color:#bde4cd;min-height:26px}.prose{white-space:pre-wrap;overflow-wrap:anywhere}footer{font-size:11px;color:#9eb2c9;margin:28px 0}.clock{display:block;font-size:64px;font-variant-numeric:tabular-nums}label{min-height:54px;display:flex;align-items:center;gap:14px;padding:9px 0;border-bottom:1px solid #2b3b50;overflow-wrap:anywhere}input[type=checkbox]{width:25px;height:25px;flex:none;accent-color:var(--accent)}svg{width:100%;max-height:340px}.comic,.mindmap{display:grid;gap:14px}.comic section,.mindmap section{border:1px solid #49627e;padding:18px;border-radius:17px;background:#192c42}.mindmap section:first-child{border-color:var(--accent);text-align:center}.mindmap section:not(:first-child){margin-left:25px;border-left:4px solid var(--accent)}.sticker{animation:float 2.4s ease-in-out infinite}@keyframes float{50%{transform:translateY(-9px) rotate(3deg)}}@media(prefers-reduced-motion:reduce){.sticker{animation:none}}@media(max-width:420px){#screen{padding:19px}body{padding:18px 14px}}';
 return '<!doctype html><html lang="'+escapeHTML(lang)+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#090e18"><title>'+escapeHTML(p.name)+' · N25x</title><style>:root{--accent:'+accent+'}'+css+'</style></head><body><main><span class="eyebrow">N25x · ROBOT STUDIO</span><h1>'+escapeHTML(p.name)+'</h1><div id="screen"></div><footer>'+escapeHTML(copy.createdWith)+'<br>© 2026 Natalie Ragulina. '+escapeHTML(copy.rights)+'</footer></main><script>const createInterpreter='+createInterpreter.toString()+';const runProgram='+runProgram.toString()+';('+projectPlayer.toString()+')('+safeJSON(p)+','+safeJSON(copy)+',runProgram);</script></body></html>';
}
export function blankQuiz(translate){return {questions:[{prompt:translate('quizExample'),options:['3','4','5'],answer:1}],program:SCORE_PROGRAM};}
