// Automated model/DOM tests. linkedom is not a browser and cannot verify WebGL,
// layout, native touch input, actual downloads, installation or audio output.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';
import {parseHTML} from 'linkedom';
import {fresh,reward,addProject,updateProject,parseProfile,parseAcademy,SAVE_KEY,parseLabProgress,labSummary} from '../workshop/model.mjs';
import * as curriculum from '../workshop/curriculum.mjs';
import {runProgram,SCORE_PROGRAM,validScoreProgram,reviewProgram,codeReviewPrompt,requestCodeMentor,customProgramTest,createApiLab,SQL_SAMPLE,SQL_LESSONS,queryProjects,gradeSQL,runPython,PYTHON_LESSONS,gradePython,WEB_LESSONS,compileWebLab,gradeWebLab,AGENT_GOALS,agentPlan,parseAgentPlan,createAgentLab,proposeAgentPlan,GIT_LESSONS,createGitLab,REVIEW_LESSONS,createReviewLab} from '../workshop/program.mjs';
import {CREATION_TEMPLATES,validateCreation,blankQuiz,parseCreation,serializeCreation,renderCreationHTML,projectPlayer} from '../workshop/creations.mjs';
import {createAcademy} from '../workshop/academy.mjs';
import {TEXT,translate} from '../workshop/i18n.mjs';
const {MISSIONS,LEARNING_LANGUAGES,WORD_MEANINGS,SUBJECTS,local,checkMission}=curriculum;
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const playerCopy={complete:'Complete',restart:'Restart',score:'Score',correct:'Correct',correctAnswer:'Correct answer',finish:'Finish',next:'Next',programError:'Program error',start:'Start',pause:'Pause',flip:'Flip',createdWith:'Made with N25x',rights:'All rights reserved.'};
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
 assert.equal(MISSIONS.length,48);
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
 const other=fresh();assert(addProject(other,parsed.kind,parsed.data,parsed.name));assert.equal(other.robot.name,'Eliana');
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
  assert.equal(document.body.dataset.ready,'fallback');assert.equal(document.querySelector('#content h2').textContent,TEXT.de.robotGreeting.replace('{name}','Eliana'));assert(errors.every(v=>v.includes('WebGLRenderer')),'only expected canvas-unavailable errors');
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

test('Guided subjects cover six disciplines, stable stages and 73 localized questions',()=>{assert.equal(SUBJECTS.length,6);assert.equal(SUBJECTS.reduce((n,s)=>n+s.tasks.length,0),73);for(const s of SUBJECTS){assert.equal(s.stages[0].start,0);assert.equal(s.stages.at(-1).end,s.tasks.length);for(const [i,g] of s.stages.entries()){assert(g.end>g.start);assert.equal(g.title.length,4);if(i)assert.equal(g.start,s.stages[i-1].end);}for(const t of s.tasks){assert.equal(t.options.length,3);for(let k=0;k<4;k++)assert.equal(new Set(t.options.map(v=>v[k])).size,3);}}assert.equal(curriculum.MISSION_STAGES.at(-1).end,MISSIONS.length);});

test('Piano learning: 38 original practice patterns, wrong note does not advance, exports and old profiles migrate',async()=>{const {PIANO_LESSONS,pianoPracticeStep,parsePiano,freshPiano,makeMidi,renderScoreWav}=await import('../workshop/piano-score.mjs');assert.equal(PIANO_LESSONS.length,38);assert.deepEqual([...new Set(PIANO_LESSONS.map(v=>v.stage))],[1,2,3,4,5,6,7,8]);assert.equal(new Set(PIANO_LESSONS.map(v=>v.id)).size,38);const p=freshPiano();for(const l of PIANO_LESSONS){let index=0;const first=(l.octave+1)*12;for(const midi of l.notes){assert(midi>=first&&midi<first+24);assert.equal(pianoPracticeStep(l,index,midi+1).index,index);const r=pianoPracticeStep(l,index,midi);assert(r.correct);index=r.index;assert.equal(r.complete,index===l.notes.length);}p.practice.passed[l.id]=true;const score={tempo:120,bars:4,tracks:[{name:'Exercise',instrument:'piano',notes:l.notes.map((midi,i)=>({midi,beat:i,duration:.5,velocity:.6}))}]};assert.equal(String.fromCharCode(...makeMidi(score).slice(0,4)),'MThd');const wav=renderScoreWav(score);assert.equal(String.fromCharCode(...new Uint8Array(wav,0,4)),'RIFF');assert(new Int16Array(wav,44).some(n=>n!==0));}assert.deepEqual(parsePiano(p),p);delete p.practice;assert.deepEqual(parsePiano(p).practice,{passed:{},rhythmPassed:{},earPassed:{},staffPassed:{},chordPassed:{},harmonyPassed:{}});});

test('Rhythm: exact, jitter, drift, missing and invalid taps; persistence',async()=>{const {RHYTHM_LESSONS,gradeRhythm,parsePiano,freshPiano}=await import('../workshop/piano-score.mjs');const p=freshPiano();assert.equal(RHYTHM_LESSONS.length,12);for(const l of RHYTHM_LESSONS){const t=l.beats.map(v=>1000+v*60000/l.bpm);assert(gradeRhythm(l,t).passed);assert(gradeRhythm(l,t.map((v,i)=>v+(i%2?70:0))).passed);assert(!gradeRhythm(l,t.map((v,i)=>v+i*210)).passed);assert.equal(gradeRhythm(l,t.slice(1)),null);assert.equal(gradeRhythm(l,t.map(()=>0)),null);p.practice.rhythmPassed[l.id]=true;}assert.deepEqual(parsePiano(p),p);});

test('AI Code Lab diagnoses every mission without modifying drafts; model is opt-in and advisory',async()=>{
 for(const m of MISSIONS){const old=JSON.stringify(m),bad=reviewProgram(m,m.source),fixed=m.source.replace(m.block.from,m.block.choices[1]),good=reviewProgram(m,fixed);assert(bad.failed);assert.equal(good.passed,good.total);assert.equal(good.failed,null);assert.equal(JSON.stringify(m),old);}
 const m=MISSIONS[0],prompt=codeReviewPrompt(m,m.source,'ru');assert(prompt.includes('Russian'));assert.equal(JSON.parse(prompt.slice(prompt.indexOf('\n')+1)).source,m.source);
 let created=0,destroyed=0;
 const mock={availability:async()=> 'available',create:async()=>{created++;return {prompt:async()=>'<b>untrusted advice</b>',destroy:()=>destroyed++};}};
 assert.equal((await requestCodeMentor(mock,m,m.source,'ru')).status,'unavailable');assert.equal(created,0);
 assert.equal((await requestCodeMentor({...mock,availability:async()=> 'downloadable'},m,m.source,'en')).status,'unavailable');assert.equal(created,0);
 assert.deepEqual(await requestCodeMentor(mock,m,m.source,'en'),{status:'ok',text:'<b>untrusted advice</b>'});assert.equal(created,1);assert.equal(destroyed,1);
 const cancel=new AbortController();cancel.abort();assert.equal((await requestCodeMentor(mock,m,m.source,'en',cancel.signal)).status,'cancelled');assert.equal(created,1);
 assert.equal((await requestCodeMentor({...mock,create:async()=>{throw Error('offline');}},m,m.source,'en')).status,'error');
});

test('Custom test cases accept bounded primitives and never grant completion',()=>{
 const m=MISSIONS.find(v=>v.id==='ai-f1'),src=m.source.replace(m.block.from,m.block.choices[1]),before=JSON.stringify(m);
 assert.equal(customProgramTest(m,src,'[3,1,1]','0.75').status,'pass');assert.equal(customProgramTest(m,m.source,'[3,1,1]','0.75').status,'fail');
 assert.equal(customProgramTest(m,'invalid','[3,1,1]','0.75').status,'error');
 for(const bad of ['[1,2]','[1,2,3,4]','[1,2,"3"]','[1,2,null]','[1,2,1e99]','alert(1)','{}'])assert.equal(customProgramTest(m,src,bad,'0').status,'invalid');
 for(const bad of ['{}','"0.75"','NaN','1e99','null'])assert.equal(customProgramTest(m,src,'[3,1,1]',bad).status,'invalid');
 assert.equal(JSON.stringify(m),before);
 const b=MISSIONS.find(v=>v.id==='ai-classifier-threshold');assert.equal(customProgramTest(b,b.source.replace(b.block.from,b.block.choices[1]),'[50,50]','true').status,'pass');
});

test('REST lab supports CRUD, correct response codes, validated JSON and isolated sessions',()=>{
 const lab=createApiLab(),other=createApiLab(),r=(m,p,b)=>lab.request(m,p,b);
 assert.equal(r('GET','/projects').status,200);assert.equal(r('POST','/projects','{"title":"Test"}').status,201);assert.deepEqual(r('GET','/projects/2').body,{id:2,title:'Test',done:false});
 assert.equal(r('PATCH','/projects/2','{"done":true}').status,200);assert.equal(r('GET','/projects/2').body.done,true);
 const before=lab.snapshot();for(const b of ['{}','null','[]','{"id":4}','{"done":1}','{"__proto__":{"polluted":true}}','{"title":""}','broken'])assert.equal(r('PATCH','/projects/2',b).status,400);
 assert.deepEqual(lab.snapshot(),before);assert.equal(r('POST','/projects/2','{}').status,405);assert.equal(r('DELETE','/projects').status,405);assert.equal(r('PUT','/projects/2','{}').status,405);assert.equal(r('GET','https://example.com').status,404);
 const exposed=r('GET','/projects').body;exposed[0].title='changed';assert.notEqual(lab.snapshot()[0].title,'changed');
 assert.deepEqual(r('DELETE','/projects/2'),{status:204,body:null});assert.equal(r('GET','/projects/2').status,404);assert.equal(other.snapshot().length,1);
 for(let i=0;i<19;i++)assert.equal(r('POST','/projects','{"title":"x"}').status,201);assert.equal(r('POST','/projects','{"title":"x"}').status,409);
 lab.reset();assert.equal(lab.snapshot().length,1);assert.equal(r('POST','/projects','{"title":"Again"}').body.id,2);
});

test('SQL Lab: six checked queries, typed filters, ordering, counts, limits and REST integration',()=>{
 for(const [i,l] of SQL_LESSONS.entries())assert(gradeSQL(i,l.sql).passed);
 assert(!gradeSQL(2,'SELECT title FROM projects ORDER BY id').passed);
 assert.deepEqual(queryProjects('select title from projects where done = 0 order by id').rows,[['Music'],['AI']]);
 assert.deepEqual(queryProjects('SELECT COUNT(*) FROM projects WHERE done = 1').rows,[[2]]);
 assert.deepEqual(queryProjects('SELECT id FROM projects WHERE id >= 2 ORDER BY id DESC LIMIT 2').rows,[[4],[3]]);
 assert.deepEqual(queryProjects('SELECT COUNT(*) FROM projects LIMIT 0').rows,[]);
 for(const q of ['DROP TABLE projects','SELECT * FROM projects; DELETE FROM projects','SELECT password FROM projects','SELECT id,id FROM projects','SELECT * FROM projects WHERE done = 2','SELECT * FROM projects WHERE id = \'1\'','SELECT * FROM projects WHERE title = 1','SELECT * FROM projects WHERE id=1 OR 1=1'])assert(!queryProjects(q).ok,q);
 const api=createApiLab();api.request('POST','/projects','{"title":"From API","done":true}');assert.deepEqual(queryProjects('SELECT title FROM projects WHERE done = 1',api.snapshot()).rows,[['From API']]);assert.equal(SQL_SAMPLE.length,4);
});
test('Python Studio: all six solutions pass and broken drafts fail; strict bounded subset',()=>{
 for(const [i,m] of PYTHON_LESSONS.entries()){assert(gradePython(i,m.source).some(r=>!r.passed));assert(gradePython(i,m.solution).every(r=>r.passed));}
 const r=(body,args=[])=>runPython('def f('+ (args.length?'x':'') +'):\n'+body,'f',args);
 assert.equal(r('    return -7 // 3').value,-3);assert.equal(r('    return -7 % 3').value,2);
 assert.equal(r('    return 7 % -3').value,-2);assert.equal(r('    return not 1 == 2').value,true);
 assert.equal(r('    return False and 1 / 0').value,false);assert.equal(r('    return True + 2').value,3);
 assert.equal(r('    s = 0\n    for i in range(5, 0, -2):\n        s = s + i\n    return s').value,9);
 assert.equal(r('    for i in range(100000):\n        x = i\n    return 1').error,'budget');
 for(const b of ['    import os','    return __import__(1)','    return x.constructor','    return 1 < 2 < 3','  return 1','    return 1 / 0','    return 1; return 2','    for i in range(0, 4, 0):\n        x = i\n    return 0'])assert(!r(b).ok,b);
});

test('Web Studio checks six exercises and reconstructs safe static previews',()=>{
 for(const [i,m] of WEB_LESSONS.entries()){assert(!gradeWebLab(i,m.html,m.css).passed);const r=gradeWebLab(i,m.solutionHTML,m.solutionCSS);assert(r.ok&&r.passed);assert(r.document.includes('Content-Security-Policy'));}
 for(const html of ['<script>alert(1)</script>','<img src="https://example.com">','<p onclick="x()">X</p>','<iframe></iframe>','<a href="https://example.com">X</a>','<meta http-equiv="refresh">','<div><p></div>','<svg></svg>','<p style="color:red">X</p>'])assert(!compileWebLab(html,'').ok,html);
 for(const css of ['@import "https://example.com";','p { background-color: url(https://example.com); }','p { color: red; } </style>','p { position: fixed; }','p { color: var(--x); }'])assert(!compileWebLab('<p>Hi</p>',css).ok,css);
 assert(compileWebLab('<p>5 & 7</p>','p { color: #2455a0; }').document.includes('5 &amp; 7'));
});

test('Agent Lab enforces goal scope, dry-run approval, atomic effects and stale plan rejection',()=>{
 for(const goal of AGENT_GOALS){const lab=createAgentLab(),before=lab.snapshot(),text=JSON.stringify(agentPlan(goal.id,before)),r=lab.preview(text,goal.id);assert(r.ok);assert.deepEqual(lab.snapshot(),before);assert(!lab.apply(text+' ',goal.id));assert(lab.apply(text,goal.id));assert(!lab.apply(text,goal.id));assert.deepEqual(lab.snapshot(),r.after);}
 const lab=createAgentLab(),before=lab.snapshot(),p=JSON.stringify([{tool:'complete',id:1},{tool:'complete',id:999},{tool:'stats'}]);assert(!lab.preview(p,'finish').ok);assert.deepEqual(lab.snapshot(),before);assert(!lab.apply(p,'finish'));
 assert(!lab.preview(JSON.stringify([{tool:'create',title:'x'},{tool:'stats'}]),'audit').ok);
 assert(!lab.preview(JSON.stringify([{tool:'complete',id:1},{tool:'stats'}]),'finish').ok);
 for(const text of ['{}','[]','[{"tool":"delete","id":1}]','[{"tool":"stats","url":"https://example.com"}]','[{"tool":"create","title":""}]','[{"tool":"complete","id":-1}]'])assert.equal(parseAgentPlan(text),null);
 const good=JSON.stringify(agentPlan('finish',before));assert(lab.preview(good,'finish').ok);lab.invalidate();assert(!lab.apply(good,'finish'));assert.deepEqual(lab.snapshot(),before);
});
test('Agent model adapter is opt-in and validates output without execution',async()=>{
 let created=0,destroyed=0;
 const model={availability:async()=> 'available',create:async()=>{created++;return {prompt:async()=> '[{"tool":"list"},{"tool":"stats"}]',destroy:()=>destroyed++};}};
 const lab=createAgentLab(),before=lab.snapshot();
 assert.equal((await proposeAgentPlan(null,'audit',before)).status,'unavailable');
 assert.equal((await proposeAgentPlan({...model,availability:async()=> 'downloadable'},'audit',before)).status,'unavailable');assert.equal(created,0);
 const r=await proposeAgentPlan(model,'audit',before);assert.equal(r.status,'ok');assert.equal(created,1);assert.equal(destroyed,1);assert.deepEqual(lab.snapshot(),before);assert(!lab.apply(r.text,'audit'));
 const bad={...model,create:async()=>({prompt:async()=> '[{"tool":"delete","id":1}]',destroy(){}})};assert.equal((await proposeAgentPlan(bad,'audit',before)).status,'invalid');
});

test('Git guided model separates working file, index, commits and branches',()=>{
 const l=createGitLab(),initial=l.snapshot();assert(!l.run('git commit -m "Update README"').ok);
 assert(l.run('edit','first').ok);assert.equal(l.snapshot().unstagedChange,true);assert.equal(l.snapshot().stagedChange,false);
 assert(l.run('git add README.md').ok);assert.equal(l.snapshot().unstagedChange,false);assert.equal(l.snapshot().stagedChange,true);
 for(const [i,m] of GIT_LESSONS.entries())if(i>=2)assert(l.run(m.command,m.command==='edit'?'second':'').ok,i);
 const s=l.snapshot();assert.equal(s.step,10);assert.equal(s.branch,'main');assert.equal(s.head,'second');assert.equal(s.branches.main,s.branches.feature);assert.equal(s.commits.length,3);assert.equal(l.run('git log --oneline').log.length,3);assert(!l.run('git push').ok);
 l.reset();assert.deepEqual(l.snapshot(),initial);
});

test('Pull request lab requires current passing tests and explicit review approval',()=>{
 for(const [i,m] of REVIEW_LESSONS.entries()){
  const l=createReviewLab(i);assert(!l.merge());assert(!l.review('approve','ok'));
  const bad=l.tests();assert(bad.passed<bad.total);assert(!l.review('approve','ok'));assert(l.review('changes','Check edge cases'));assert(!l.merge());
  assert(l.edit(m.solution));assert(!l.snapshot().checked);assert.equal(l.snapshot().decision,'pending');assert(!l.merge());
  const good=l.tests();assert.equal(good.passed,good.total);assert(!l.review('approve',''));assert(l.review('approve','Checked tests'));
  assert(l.edit(m.solution+'\n'));assert(!l.merge());l.tests();assert(l.review('approve','Rechecked'));assert(l.merge());assert(!l.merge());assert(!l.edit(m.source));assert(l.snapshot().merged);
 }
});

test('Lab drafts and verified progress round-trip without stale or forged pass flags',()=>{
 const s=fresh(),p=PYTHON_LESSONS[0],w=WEB_LESSONS[0],q=SQL_LESSONS[0];
 s.academy.labs.python[p.id]={source:p.solution,passed:true};
 s.academy.labs.web[0]={html:w.solutionHTML,css:w.solutionCSS,passed:true};
 s.academy.labs.sql[0]={query:q.sql,passed:true};
 s.academy.labs.selected={python:2,web:3,sql:4};
 const copy=parseProfile(JSON.stringify(s));assert.deepEqual(copy.academy.labs,s.academy.labs);assert.deepEqual(labSummary(copy.academy),{python:{done:1,total:6},web:{done:1,total:6},sql:{done:1,total:6}});
 s.academy.labs.python[p.id].source=p.source;s.academy.labs.web[0].html='<script>x</script>';s.academy.labs.sql[0].query='DROP TABLE projects';s.academy.labs.selected.sql=999;
 const bad=parseLabProgress(s.academy.labs);assert(!bad.python[p.id].passed);assert(!bad.web[0].passed);assert(!bad.sql[0].passed);assert.equal(bad.selected.sql,0);
 assert.deepEqual(parseLabProgress({python:{fake:{source:'x',passed:true}},web:{0:{html:'x'.repeat(4001),css:'',passed:true}},sql:{0:{query:'x'.repeat(513),passed:true}}}),fresh().academy.labs);
 const old=JSON.parse(JSON.stringify(fresh()));delete old.academy.labs;assert.deepEqual(parseProfile(JSON.stringify(old)).academy.labs,fresh().academy.labs);
 assert.equal(copy.points,s.points);
});

 test('Practical project repairs pass normal and boundary tests while both wrong choices fail',async()=>{const {reviewProgram}=await import('../workshop/program.mjs');for(const m of MISSIONS.slice(42)){assert(m.tests.length>=7);assert(reviewProgram(m,m.source).failed);assert.equal(reviewProgram(m,m.source.replace(m.block.from,m.block.choices[1])).passed,m.tests.length);assert(reviewProgram(m,m.source.replace(m.block.from,m.block.choices[2])).failed);}assert.equal(new Set(MISSIONS.map(v=>v.id)).size,48);});

test('Ten beginner guides execute three independent examples each and do not grant points or edit drafts',async()=>{
 assert.equal(curriculum.PROGRAM_GUIDES.length,curriculum.MISSION_STAGES.length);
 for(const g of curriculum.PROGRAM_GUIDES){assert.equal(g.explanation.length,4);assert.equal(g.examples.length,3);for(const e of g.examples){const r=runProgram(g.source,g.entry,e.args);assert(r.ok);assert.equal(r.value,e.expected);}}
 const h=academyDOM();try{for(const [i,stage] of curriculum.MISSION_STAGES.entries()){h.state.academy.mission=stage.start;h.render();const before=JSON.stringify(h.state);for(let j=0;j<3;j++){await h.click('[data-a=guide-run][data-index="'+j+'"]');assert(h.document.querySelector('[data-guide-result]').textContent.includes(String(curriculum.PROGRAM_GUIDES[i].examples[j].expected)));assert.equal(JSON.stringify(h.state),before);}}}finally{h.cleanup();}
});

test('Python, SQL and Web beginner guides run independently of learner drafts',async()=>{
 const {LAB_GUIDES,runLabGuide}=await import('../workshop/program.mjs');
 for(const kind of ['python','sql','web']){assert.equal(LAB_GUIDES[kind].length,6);for(const [i,g] of LAB_GUIDES[kind].entries()){assert.equal(g.explanation.length,4);const r=runLabGuide(kind,i);assert(r.ok);if(kind==='python')assert.equal(r.value,g.expected);if(kind==='sql'){assert.deepEqual(r.columns,g.columns);assert.deepEqual(r.rows,g.rows);}if(kind==='web'){assert.match(r.document,/Content-Security-Policy/);assert(!r.document.includes('<script'));}}}
 assert(!runLabGuide('invalid',0).ok);assert(!runLabGuide('python',-1).ok);assert(!runLabGuide('__proto__',0).ok);
 const h=academyDOM();try{for(const kind of ['python','sql','web']){const before=JSON.stringify(h.state);await h.click('[data-a=lab-guide-run][data-kind="'+kind+'"]');assert(h.document.querySelector('[data-lab-guide-result="'+kind+'"]'));assert.equal(JSON.stringify(h.state),before);}assert(h.document.querySelector('#web-guide-preview').getAttribute('sandbox')==='');}finally{h.cleanup();}
});

test('Workflow guides isolate API, Git, review and agent examples from learner progress',async()=>{const {WORKFLOW_GUIDES,runWorkflowGuide}=await import('../workshop/program.mjs');for(const [kind,gs] of Object.entries(WORKFLOW_GUIDES))for(const [i,g] of gs.entries()){assert.equal(g.explanation.length,4);assert(runWorkflowGuide(kind,i).ok);}assert.deepEqual(runWorkflowGuide('api',0).steps.map(s=>s.status),[200,404]);assert.deepEqual(runWorkflowGuide('api',1).steps.map(s=>s.status),[201,200,204]);const invalid=runWorkflowGuide('api',2);assert.deepEqual(invalid.before,invalid.after);assert.equal(invalid.steps[0].status,400);const review=runWorkflowGuide('review',0);assert(review.blocked&&review.approved&&review.merged);const agent=runWorkflowGuide('agent',1);assert(agent.unchanged&&agent.applied&&agent.after.every(r=>r.done));const h=academyDOM();try{for(const kind of Object.keys(WORKFLOW_GUIDES)){const before=JSON.stringify(h.state);await h.click('[data-a=workflow-guide-run][data-kind="'+kind+'"][data-index="0"]');assert(h.document.querySelector('[data-workflow-guide-result="'+kind+'"]'));assert.equal(JSON.stringify(h.state),before);}}finally{h.cleanup();}});

test('Capstone validates data flow, varied fixtures, stale edits and imported claims',async()=>{const {freshCapstone,gradeCapstone,parseCapstone}=await import('../workshop/program.mjs');const solved={"plan":"[{\"method\":\"POST\",\"path\":\"/projects\",\"body\":{\"title\":\"Website\"}},{\"method\":\"POST\",\"path\":\"/projects\",\"body\":{\"title\":\"Music\"}},{\"method\":\"PATCH\",\"path\":\"/projects/2\",\"body\":{\"done\":true}}]","query":"SELECT COUNT(*) FROM projects WHERE done = 1","source":"function progress(done,total) { if (total===0) { return 0; } return 100*done/total; }","html":"<main><h1>Dashboard</h1><article class=\"card\"><p>Projects</p></article></main>","css":".card { padding: 12px; }","passed":true};assert(!gradeCapstone(freshCapstone()).passed);assert(gradeCapstone(solved).passed);for(const key of ['plan','query','source','html','css']){const bad={...solved,[key]:freshCapstone()[key]};assert(!gradeCapstone(bad).passed);assert(!parseCapstone(bad).passed);}const h=academyDOM();try{for(const key of ['plan','query','source','html','css'])h.input('cap-'+key,solved[key]);await h.click('[data-a=cap-run]');assert(h.state.academy.capstone.passed);assert(parseProfile(JSON.stringify(h.state)).academy.capstone.passed);h.input('cap-query','SELECT COUNT(*) FROM projects');assert(!h.state.academy.capstone.passed);assert(!h.document.querySelector('[data-cap-result]'));}finally{h.cleanup();}});
