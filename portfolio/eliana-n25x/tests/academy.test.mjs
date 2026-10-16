// Automated model/DOM tests. linkedom is not a browser and cannot verify WebGL,
// layout, native touch input, actual downloads, installation or audio output.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import {parseHTML} from 'linkedom';
import {fresh,reward,addProject,updateProject,parseProfile,parseAcademy,SAVE_KEY} from '../workshop/model.mjs';
import * as curriculum from '../workshop/curriculum.mjs';
import {runProgram,SCORE_PROGRAM,validScoreProgram} from '../workshop/program.mjs';
import {CREATION_TEMPLATES,validateCreation,blankQuiz,parseCreation,serializeCreation,renderCreationHTML,projectPlayer} from '../workshop/creations.mjs';
import {createAcademy} from '../workshop/academy.mjs';
import {TEXT,translate} from '../workshop/i18n.mjs';
const {MISSIONS,LEARNING_LANGUAGES,WORD_MEANINGS,SUBJECTS,local,checkMission}=curriculum;
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const playerCopy={complete:'Complete',restart:'Restart',score:'Score',correct:'Correct',correctAnswer:'Correct answer',finish:'Finish',next:'Next',programError:'Program error',start:'Start',pause:'Pause',flip:'Flip',createdWith:'Made with Eliana & N25x',rights:'All rights reserved.'};
const quiz=()=>({name:'My quiz',kind:'quiz',data:blankQuiz(k=>translate('en',k))});
function clickByText(document,text){const e=[...document.querySelectorAll('button')].find(e=>e.textContent===text);assert(e,'button '+text);e.click();return e;}

test('Academy interpreter: executable variables, branches, nested calls and loop traces produce correct results',()=>{
 assert.equal(runProgram(SCORE_PROGRAM,'mark',[7,true,5]).value,12);
 assert.equal(runProgram(SCORE_PROGRAM,'mark',[7,false,5]).value,7);
 const source='function bonus(x) { return x * 2; } function total(n) { let score = 1; for (let i = 0; i < n; i++) { score = bonus(score); } return score; }';
 const r=runProgram(source,'total',[5]);assert(r.ok);assert.equal(r.value,32);assert(r.trace.some(t=>t.name==='score'&&t.value===16));assert(r.steps>20);
 assert.equal(runProgram('function choose(x) { if (x > 2 && x < 5) { return -x; } else { return 0; } }','choose',[3]).value,-3);
});
test('Academy interpreter: loops, recursion, excessive nesting and host access fail in bounded execution',()=>{
 for(const source of ['function x() { return window; }','function x() { return globalThis.fetch(1); }','function x() { return constructor(); }','function x() { return import(1); }','function x() { let a = 1; for (let i = 0; true; i++) { a = a + 1; } return a; }','function x() { return x(); }','function x() { return 1 / 0; }','function x() { return '+ '('.repeat(65)+'1'+')'.repeat(65)+'; }'])assert.equal(runProgram(source,'x',[]).ok,false,source);
 assert.equal(runProgram('x'.repeat(4001),'x',[]).error,'size');assert(!validScoreProgram(SCORE_PROGRAM.replace('+ points','- points')));assert(validScoreProgram(SCORE_PROGRAM));
});
test('Academy missions: initial bugs fail and learner repairs pass every normal and zero/false test case',()=>{
 assert.equal(MISSIONS.length,5);
 for(const m of MISSIONS){assert(checkMission(m,m.source,runProgram).some(r=>!r.ok||r.value!==r.expected),m.id);const corrected=m.source.replace(m.block.from,m.block.choices[1]);assert(checkMission(m,corrected,runProgram).every(r=>r.ok&&r.value===r.expected),m.id);assert.equal(runProgram(m.source,m.entry,m.sample).value,m.expectedPrediction);}
});
test('Academy content: ten language tracks, sixty cards and all original subject explanations have four UI languages',()=>{
 assert.equal(LEARNING_LANGUAGES.length,10);assert.equal(new Set(LEARNING_LANGUAGES.map(v=>v.id)).size,10);assert.equal(WORD_MEANINGS.length,6);
 for(const c of LEARNING_LANGUAGES){assert.equal(c.words.length,6);if(c.reading)assert.equal(c.reading.length,6);for(let i=0;i<6;i++){const choices=curriculum.wordChoices(c.id,i);assert.equal(choices.length,3);assert.equal(new Set(choices.map(v=>v.text)).size,3);assert(choices.some(v=>v.index===i&&v.text===c.words[i]));}}
 for(const m of MISSIONS)for(const key of ['title','task','hint','why'])assert.equal(m[key].filter(Boolean).length,4);
 for(const subject of SUBJECTS){assert.equal(subject.title.filter(Boolean).length,4);for(const task of subject.tasks){assert.equal(task.q.filter(Boolean).length,4);assert.equal(task.why.filter(Boolean).length,4);assert(task.options[task.answer]);for(const option of task.options)assert.equal(option.filter(Boolean).length,4);}}
});
test('Academy profiles: unfinished code and quiz edits survive reload alongside old points, robot and projects',()=>{
 const s=fresh();s.robot.name='Saved Nova';s.points=215;addProject(s,'routine',{actions:['wave']},'Old routine');
 s.academy.mission=2;s.academy.drafts.loop={source:'function total(n) {\n  return n *\n}'};s.academy.learningLanguage='ka';s.academy.languageIndex=4;
 s.academy.quiz={name:'Work in progress',questions:[{prompt:'',options:['one','',''],answer:2}],program:'unfinished',editingID:0};
 const restored=parseProfile(JSON.stringify(s));assert.deepEqual(restored,s);assert.equal(restored.schema,SAVE_KEY);
 const old={...s};delete old.academy;assert.deepEqual(parseProfile(JSON.stringify(old)).academy,fresh().academy);
 const invalid=parseAcademy({mission:-4,learningLanguage:'evil',languageIndex:900,quiz:{questions:new Array(99)},drafts:{__proto__:{source:'x'}}});assert.deepEqual(invalid,fresh().academy);
});
test('Academy project files contain only editable work, reject malformed imports and preserve profile rewards on editing',()=>{
 const s=fresh(),p=quiz(),result=addProject(s,p.kind,p.data,p.name);assert(result);assert.equal(result.bonus,30);
 const points=s.points,edited=structuredClone(p.data);edited.questions[0].prompt='What is 3 + 1?';assert.equal(updateProject(s,result.project.id,'quiz',edited,'Edited').bonus,0);assert.equal(s.points,points);assert.equal(s.projects.length,1);
 const raw=serializeCreation(result.project),parsed=parseCreation(raw);assert(parsed);assert(!raw.includes('earned'));assert(!raw.includes('robot'));assert(!raw.includes('owned'));assert.equal(parsed.data.questions[0].prompt,'What is 3 + 1?');
 const other=fresh();assert(addProject(other,parsed.kind,parsed.data,parsed.name));assert.equal(other.robot.name,'Nova');
 for(const bad of ['{}','{',JSON.stringify({...parsed,schema:'wrong'}),JSON.stringify({schema:'eliana-n25x.project.v1',...parsed,data:{...parsed.data,program:'function mark() { return window; }'}})])assert.equal(parseCreation(bad),null);
 assert.equal(validateCreation('quiz',{...p.data,questions:[{prompt:'Question',options:['same','same','different'],answer:0}]}),null);
 assert.deepEqual(parseProfile(JSON.stringify(s)),s);
});
function runExport(project){
 const html=renderCreationHTML(project,'en',playerCopy),{document,window}=parseHTML(html),script=document.querySelector('script').textContent,storage=new Map(),timers=[];
 let time=Date.now();class TestDate extends Date{static now(){return time;}}
 const sandbox={document,Date:TestDate,console,setInterval:fn=>{timers.push(fn);return timers.length;},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)}};
 vm.runInNewContext(script,sandbox,{timeout:1000});return {html,document,window,storage,timers,advance:ms=>{time+=ms;timers.forEach(fn=>fn());}};
}
test('Academy exported quiz: real answer controls count once, expose mistakes, complete, and restart',()=>{
 const p=quiz();p.data.questions.push({prompt:'3 + 3?',options:['4','5','6'],answer:2});const {document,html}=runExport(p);
 const correct=clickByText(document,'4');correct.click();clickByText(document,'Next');assert(document.getElementById('screen').textContent.includes('Score: 10'));
 clickByText(document,'4');assert(document.getElementById('screen').textContent.includes('Correct answer: 6'));clickByText(document,'Finish');assert(document.querySelector('h2').textContent.includes('10 / 20'));clickByText(document,'Restart');assert(document.querySelector('h2').textContent.includes('2 + 2'));
 assert(!/<(?:script|link|img)[^>]+(?:src|href)=/.test(html));assert(!html.includes('fetch('));assert(html.includes('© 2026 Natalie Ragulina. All rights reserved.'));
});
test('Academy timer: elapsed time, pause, completion and restart use actual deadlines',()=>{
 const h=runExport({name:'Focus',kind:'creation',data:{template:'timer',content:'1',color:'cyan'}});
 clickByText(h.document,'Start');h.advance(15000);assert.equal(h.document.querySelector('output').textContent,'00:45');clickByText(h.document,'Pause');h.advance(20000);assert.equal(h.document.querySelector('output').textContent,'00:45');clickByText(h.document,'Start');h.advance(45000);assert.equal(h.document.querySelector('output').textContent,'00:00');assert(h.document.querySelector('.feedback').textContent.includes('Complete'));clickByText(h.document,'Restart');assert.equal(h.document.querySelector('output').textContent,'01:00');
});
test('Academy exported projects: hostile text cannot escape JSON or create executable elements',()=>{
 const p=quiz();p.name='</title><img src=x>';p.data.questions[0].prompt='</script><script>globalThis.hacked=true</script>';
 const {document,html}=runExport(p);assert.equal(document.querySelectorAll('script').length,1);assert.equal(document.querySelectorAll('img').length,0);assert(document.querySelector('h2').textContent.includes('</script>'));assert(!html.includes('"prompt":"</script>'));
});
test('Academy creators: all eighteen new templates export working editable artifacts, including two story branches',()=>{
 assert.equal(CREATION_TEMPLATES.length+2,20);
 for(const template of CREATION_TEMPLATES){
  const p=template==='quiz'?quiz():template==='story'?{name:'Story',kind:'story',data:{intro:'Choose a path',choiceA:'Garden',endingA:'A sensor',choiceB:'Tower',endingB:'A message'}}:{name:template,kind:'creation',data:{template,content:template==='timer'?'5':template==='flashcards'?'hello|привет\nwater|вода':['badge','sticker'].includes(template)?'Nova':'First idea\nSecond idea',color:'mint'}};
  assert(validateCreation(p.kind,p.data),template);const {document,storage,timers}=runExport(p);assert(document.getElementById('screen').childNodes.length>0,template);
  if(template==='story'){clickByText(document,'Garden');assert(document.getElementById('screen').textContent.includes('A sensor'));clickByText(document,'Restart');clickByText(document,'Tower');assert(document.getElementById('screen').textContent.includes('A message'));}
  if(template==='flashcards'){clickByText(document,'Flip');assert(document.querySelector('h2').textContent.includes('привет'));clickByText(document,'Next');assert(document.querySelector('h2').textContent.includes('water'));}
  if(template==='checklist'||template==='plan'){const input=document.querySelector('input');input.checked=true;input.dispatchEvent(new document.defaultView.Event('change'));assert.equal(storage.size,1);assert(document.querySelector('#screen .eyebrow').textContent.startsWith('1 /'));}
  if(template==='timer'){assert.equal(document.querySelector('output').textContent,'05:00');clickByText(document,'Start');clickByText(document,'Pause');assert.equal(timers.length,1);}
  if(template==='badge'||template==='sticker')assert(document.querySelector('svg text').textContent==='Nova');
 }
 assert.equal(validateCreation('creation',{template:'timer',content:'0'}),null);assert.equal(validateCreation('creation',{template:'flashcards',content:'no separator'}),null);
});

function academyDOM(){
 const {document}=parseHTML('<html><body><section id="content"></section><input id="creation-file" type="file"></body></html>'),previous=globalThis.document;globalThis.document=document;
 // No layout engine: scrolling is deliberately outside these automated tests.
 document.defaultView.HTMLElement.prototype.scrollIntoView=()=>{};
 const state=fresh(),toasts=[],downloads=[];let view='programming',academy;
 const render=()=>{document.getElementById('content').innerHTML=academy.render(view);academy.mount();};
 const api={getState:()=>state,tr:(k,p)=>translate(state.lang,k,p),esc:escapeHTML,save:()=>true,caption:()=>{},award:(id,n)=>reward(state,id,n),navigate:v=>{view=v;render();},render,toast:t=>toasts.push(t),download:(blob,name)=>downloads.push({blob,name}),audio:{cue:()=>{}}};
 academy=createAcademy(api);render();
 return {academy,state,document,toasts,downloads,render,navigate:api.navigate,get view(){return view;},async click(selector){const b=document.querySelector(selector);assert(b,selector);await academy.click(b);},input(id,value){const e=document.getElementById(id);assert(e,id);e.value=value;academy.input(e);},cleanup(){globalThis.document=previous;}};
}
test('Academy DOM: repair and run all five programs, earn each reward once and restore the actual edited draft',async()=>{
 const h=academyDOM();try{
  for(let i=0;i<MISSIONS.length;i++){
   h.state.academy.mission=i;h.render();const before=h.state.points;await h.click('[data-a=tests]');assert.equal(h.state.points,before);assert(h.document.querySelector('.test-case.fail'));
   await h.click('[data-a=block][data-index="1"]');await h.click('[data-a=sample]');assert(h.document.querySelector('[data-program-results]'));
   await h.click('[data-a=tests]');assert.equal(h.state.points,before+30);assert(!h.document.querySelector('.test-case.fail'));await h.click('[data-a=tests]');assert.equal(h.state.points,before+30);
   const restored=parseProfile(JSON.stringify(h.state));assert.equal(restored.academy.drafts[MISSIONS[i].id].source,h.document.querySelector('#program-source').value);
  }
 }finally{h.cleanup();}
});
test('Academy DOM: sixty language exercises accept choices and typed answers without repeat points',async()=>{
 const h=academyDOM();try{
  for(const c of LEARNING_LANGUAGES){h.state.academy.learningLanguage=c.id;h.state.academy.languageMode='practice';for(let i=0;i<6;i++){
   h.state.academy.languageIndex=i;h.navigate('languages');await h.click('[data-a=language-mode][data-mode=practice]');const before=h.state.points;
   if(i%2){h.input('language-input',c.words[i]);h.academy.submit({target:{id:'language-form'},preventDefault(){}});}else await h.click('[data-a=language-answer][data-index="'+i+'"]');
   assert.equal(h.state.points,before+10,c.id+':'+i);assert(h.document.querySelector('.word-options button').disabled);
  }}
  assert.equal(h.state.solved.filter(v=>v.startsWith('language:')).length,60);
 }finally{h.cleanup();}
});
test('Academy DOM: quiz drafts, new questions, actual preview, project save/edit and file exports are connected',async()=>{
 const h=academyDOM();try{
  h.academy.selectTemplate('quiz');h.input('quiz-name','My working quiz');await h.click('[data-a=add-question]');h.input('quiz-question-1','3 + 3?');for(const [j,value]of ['5','6','7'].entries())h.input('quiz-option-1-'+j,value);
  const select=h.document.getElementById('quiz-correct-1');for(const option of select.querySelectorAll('option')){option.removeAttribute('selected');if(option.value==='1')option.setAttribute('selected','');}await h.academy.change(select);assert.equal(h.state.academy.quiz.questions[1].answer,1);
  await h.click('[data-a=preview]');assert(h.document.getElementById('creation-preview').srcdoc.includes('3 + 3?'));
  await h.click('[data-a=save-creation]');assert.equal(h.state.projects.length,1);const points=h.state.points;h.input('quiz-name','Renamed');await h.click('[data-a=save-creation]');assert.equal(h.state.projects.length,1);assert.equal(h.state.points,points);
  await h.click('[data-a=export-html]');await h.click('[data-a=export-creation]');assert.equal(h.downloads.length,2);assert((await h.downloads[0].blob.text()).includes('Renamed'));assert(parseCreation(await h.downloads[1].blob.text()));
  assert(parseProfile(JSON.stringify(h.state)).academy.quiz.questions[1].prompt==='3 + 3?');
 }finally{h.cleanup();}
});
test('Academy DOM: all screens and all creators render with complete labels in German, English, Russian and Ukrainian',async()=>{
 const h=academyDOM();try{
  for(const lang of ['de','en','ru','uk']){h.state.lang=lang;for(const view of ['programming','languages','schoolLabs','subjectLab','quiz','exchange']){h.navigate(view);assert(h.document.querySelector('#content').textContent.length>40);assert(!h.document.querySelector('#content').textContent.includes('undefined'));}for(const template of CREATION_TEMPLATES){h.academy.selectTemplate(template);assert(h.document.querySelector('#content').textContent.includes(TEXT[lang][template]));}}
 }finally{h.cleanup();}
});
test('Academy DOM: switching tools preserves separate unfinished drafts and rejects broken scoring before export',async()=>{
 const h=academyDOM();try{
  h.academy.selectTemplate('letter');h.input('creation-content','An unfinished letter');h.academy.selectTemplate('poem');h.input('creation-content','An unfinished poem');h.academy.selectTemplate('letter');assert.equal(h.document.getElementById('creation-content').value,'An unfinished letter');
  const restored=parseProfile(JSON.stringify(h.state));assert.equal(restored.academy.creators.poem.content,'An unfinished poem');assert.equal(restored.academy.creator.content,'An unfinished letter');
  h.academy.selectTemplate('quiz');await h.click('[data-a=score-block][data-index="1"]');const points=h.state.points;await h.click('[data-a=export-html]');await h.click('[data-a=save-creation]');assert.equal(h.downloads.length,0);assert.equal(h.state.projects.length,0);assert.equal(h.state.points,points);assert(h.toasts.at(-1).includes(TEXT.de.previewInvalid));
 }finally{h.cleanup();}
});
test('Academy application wiring: actual app navigation, inputs, rewards and language changes work in DOM fallback',async()=>{
 const {document,window}=parseHTML(await fs.readFile(new URL('../workshop/index.html',import.meta.url),'utf8'));
 const initial=fresh();initial.started=true;const storage=new Map([[SAVE_KEY,JSON.stringify(initial)]]);
 const timers=[],nativeTimeout=globalThis.setTimeout;
 const overrides={document,window,navigator:{},location:{search:''},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},addEventListener:(...args)=>window.addEventListener(...args),scrollTo:()=>{},innerWidth:390,devicePixelRatio:1,setTimeout:(fn,ms,...args)=>{const id=nativeTimeout(fn,ms,...args);timers.push(id);return id;}};
 const old=Object.fromEntries(Object.keys(overrides).map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)])),errors=[],consoleError=console.error;
 try{
  for(const [k,value]of Object.entries(overrides))Object.defineProperty(globalThis,k,{value,writable:true,configurable:true});
  console.error=(...args)=>errors.push(args.join(' '));await import('../workshop/dist/app.mjs?automated-dom-fallback=1');console.error=consoleError;
  assert.equal(document.body.dataset.ready,'fallback');assert(errors.every(v=>v.includes('WebGLRenderer')),'only expected canvas-unavailable errors');
  const click=async selector=>{const button=document.querySelector(selector);assert(button,selector);button.click();await new Promise(resolve=>setImmediate(resolve));};
  await click('#navigation [data-do=learn]');await click('[data-do=programming]');assert.equal(document.body.dataset.view,'programming');await click('[data-a=block][data-index="1"]');await click('[data-a=tests]');assert.equal(JSON.parse(storage.get(SAVE_KEY)).points,110);
  await click('#navigation [data-do=create]');await click('[data-a=template][data-template=quiz]');assert(document.querySelector('#quiz-question-0'));await click('[data-a=save-creation]');assert.equal(JSON.parse(storage.get(SAVE_KEY)).projects.length,1);
  // The primary language control is now outside settings and always in the header.
  assert(!document.querySelector('#dialog').contains(document.getElementById('site-language')));
  for(const lang of ['ru','en','uk','de']){const select=document.getElementById('site-language');for(const option of select.querySelectorAll('option')){option.removeAttribute('selected');if(option.value===lang)option.setAttribute('selected','');}select.dispatchEvent(new window.Event('change',{bubbles:true}));await new Promise(resolve=>setImmediate(resolve));assert.equal(document.documentElement.lang,lang);assert.equal(document.getElementById('site-language-label').textContent,TEXT[lang].interfaceLanguage);assert(document.getElementById('copyright').textContent.includes(TEXT[lang].rights));assert(document.querySelector('#content h2').textContent.includes(TEXT[lang].quiz));assert.equal(JSON.parse(storage.get(SAVE_KEY)).projects.length,1);}
 }finally{console.error=consoleError;timers.forEach(clearTimeout);for(const [k,d]of Object.entries(old))if(d)Object.defineProperty(globalThis,k,d);else delete globalThis[k];}
});
test('Academy panels: choosing predictions or scoring blocks keeps the open controls visible after rendering',async()=>{
 const h=academyDOM();try{
  h.document.getElementById('program-predict').setAttribute('open','');await h.click('[data-a=predict][data-index="0"]');assert(h.document.getElementById('program-predict').hasAttribute('open'));
  h.academy.selectTemplate('quiz');h.document.getElementById('quiz-scoring').setAttribute('open','');await h.click('[data-a=score-block][data-index="1"]');assert(h.document.getElementById('quiz-scoring').hasAttribute('open'));await h.click('[data-a=check-scoring]');assert(h.document.getElementById('scoring-result').textContent.includes(TEXT.de.testsFailed));
  await h.click('[data-a=score-block][data-index="0"]');assert(h.document.getElementById('quiz-scoring').hasAttribute('open'));await h.click('[data-a=check-scoring]');assert(h.document.getElementById('scoring-result').textContent.includes(TEXT.de.testsPassed));
 }finally{h.cleanup();}
});
