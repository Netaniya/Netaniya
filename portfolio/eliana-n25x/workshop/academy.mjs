import * as curriculum from './curriculum.mjs';
import {runProgram,SCORE_PROGRAM,validScoreProgram} from './program.mjs';
import {CREATION_TEMPLATES,WRITING_TEMPLATES,PALETTE,blankQuiz,validateCreation,parseCreation,serializeCreation,renderCreationHTML,projectTemplate,MAX_CREATION_BYTES} from './creations.mjs';
import {addProject,updateProject,cleanName} from './model.mjs';
const {MISSIONS,LEARNING_LANGUAGES,WORD_MEANINGS,SUBJECTS,local,wordChoices,checkMission}=curriculum;
export const ACADEMY_VIEWS=['programming','languages','schoolLabs','subjectLab','quiz','maker','exchange'];
export const CREATIVE_ICONS={quiz:'?',story:'⌁',letter:'✉',message:'☏',script:'▷',lyrics:'♫',poem:'✎',article:'▤',comic:'▥',greeting:'✦',webpage:'⌘',checklist:'☑',timer:'◴',flashcards:'▱',badge:'◇',sticker:'✧',mindmap:'⌘',plan:'▦'};

export function createAcademy(api){
 const {tr,esc,save,award,caption,navigate,toast,download,audio}=api,$=id=>document.getElementById(id);
 const state=()=>api.getState(),progress=()=>state().academy,l=values=>local(values,state().lang);
 let currentView='',lastLanguage=state().lang,testResults=null,sampleResult=null,prediction=null,help='',flipped=false,languageFeedback='',languageCorrect=false,lab=SUBJECTS[0].id,labIndex=0,labFeedback='',labCorrect=false,showPreview=false;
 const a=(action,label,cls='',attrs='')=>'<button type="button" data-a="'+action+'" class="'+cls+'" '+attrs+'>'+label+'</button>';
 const detailOpen={'program-predict':false,'quiz-scoring':false};
 function rememberDetails(){for(const id of Object.keys(detailOpen)){const element=$(id);if(element)detailOpen[id]=element.hasAttribute('open');}}
 const back=(target,label)=>a('navigate','← '+esc(tr(label)),'back-link','data-target="'+target+'"');
 const mission=()=>MISSIONS[progress().mission];
 function source(){return progress().drafts[mission().id]?.source??mission().source;}
 function setSource(value){progress().drafts[mission().id]={source:value.slice(0,4000)};testResults=null;sampleResult=null;save();}
 const input=(id,label,value,max=240,attrs='')=>'<label for="'+id+'">'+esc(label)+'</label><input id="'+id+'" '+attrs+' maxlength="'+max+'" value="'+esc(value)+'">';
 const textarea=(id,label,value,max=4000,attrs='')=>'<label for="'+id+'">'+esc(label)+'</label><textarea id="'+id+'" maxlength="'+max+'" '+attrs+'>'+esc(value)+'</textarea>';
 const solved=id=>state().solved.includes(id);
 function complete(id,points){if(!solved(id))state().solved.push(id);const n=award(id,points);return n?tr('earned',{n}):tr('completed');}
 function catalogue(){const primary=['quiz','story','webpage','checklist'],cards=items=>'<div class="creator-grid">'+items.map(t=>a('template','<span aria-hidden="true">'+CREATIVE_ICONS[t]+'</span><b>'+esc(tr(t))+'</b>','','data-template="'+t+'"')).join('')+'</div>';return cards(primary)+'<details class="more-tools"><summary>'+esc(tr('moreTools'))+'</summary>'+cards(CREATION_TEMPLATES.filter(t=>!primary.includes(t)))+'</details>';}
 function copy(){return {complete:tr('completeGame'),restart:tr('restart'),score:tr('score'),correct:tr('correct'),correctAnswer:tr('correctAnswer'),finish:tr('finishGame'),next:tr('next'),programError:tr('programError'),start:tr('startTimer'),pause:tr('pause'),flip:tr('flip'),createdWith:tr('createdWith'),rights:tr('rights')};}
 function programResult(r){return r.ok?String(r.value):tr('programError');}
 function resultsView(){
  let html='';
  if(sampleResult)html+='<section class="panel" data-program-results aria-live="polite"><div class="eyebrow">'+esc(tr('result'))+'</div><h3>'+esc(programResult(sampleResult))+'</h3>'+(sampleResult.trace?.length?'<p class="help">'+esc(tr('trace'))+'</p><ol class="program-trace">'+sampleResult.trace.map(t=>'<li><code>'+esc(t.name)+' = '+esc(t.value)+'</code></li>').join('')+'</ol>':'')+'</section>';
  if(testResults)html+='<div class="panel" data-program-results><h3>'+esc(tr('testCases'))+'</h3><div class="test-results">'+testResults.map(r=>'<div class="test-case '+(r.ok&&r.value===r.expected?'pass':'fail')+'"><code>'+esc(mission().entry)+'('+esc(r.args.join(', '))+')</code><span>'+esc(tr('expected'))+': '+esc(r.expected)+'<br>'+esc(tr('actual'))+': '+esc(programResult(r))+'</span></div>').join('')+'</div><p class="feedback '+(testResults.every(r=>r.ok&&r.value===r.expected)?'':'error')+'" role="status">'+esc(tr(testResults.every(r=>r.ok&&r.value===r.expected)?'testsPassed':'testsFailed'))+'</p></div>';
  return html;
 }
 function programmingView(){
  const m=mission(),src=source();
  return back('learn','learn')+'<h2>'+esc(tr('programming'))+'</h2><p class="help">'+esc(tr('missionHelp'))+'</p><label for="mission-select">'+esc(tr('missionSelect'))+'</label><select id="mission-select">'+MISSIONS.map((m,i)=>'<option value="'+i+'" '+(i===progress().mission?'selected':'')+'>'+(solved('program:'+m.id)?'✓ ':'')+(i+1)+'. '+esc(l(m.title))+'</option>').join('')+'</select><section class="panel"><div class="eyebrow">'+esc(l(m.title))+'</div><h3>'+esc(l(m.task))+'</h3><details id="program-predict" '+(detailOpen['program-predict']?'open':'')+'><summary>'+esc(tr('predict'))+'</summary><pre class="source-code">'+esc(m.source)+'\n\n'+esc(m.entry)+'('+esc(m.sample.join(', '))+')</pre><div class="choice-row">'+m.prediction.map((v,i)=>a('predict',esc(v),'choice','data-index="'+i+'"')).join('')+'</div><p class="feedback" role="status">'+(prediction===null?'':esc(tr(prediction?'predictionRight':'predictionWrong')))+'</p></details><label>'+esc(tr('blocks'))+'</label><div class="choice-row code-blocks">'+m.block.choices.map((v,i)=>a('block','<code>'+esc(v)+'</code>','choice','data-index="'+i+'" aria-pressed="'+src.includes(v)+'"')).join('')+'</div>'+textarea('program-source',tr('codeEditor'),src,4000,'spellcheck="false" autocapitalize="off" autocorrect="off" class="source-code"')+'<p class="help">'+esc(tr('codeScope'))+'</p><div class="buttons">'+a('sample',esc(tr('runSample')),'secondary')+a('tests',esc(tr('runTests')),'primary')+'</div>'+a('restore',esc(tr('restoreCode')),'back-link')+'</section>'+resultsView()+tutorView()+'<div class="buttons">'+a('next-mission',esc(tr(progress().mission===MISSIONS.length-1?'quiz':'nextMission')),'lime')+'</div><p class="help">'+esc(tr('draftSaved'))+'</p>';
 }
 function tutorView(){return '<section class="panel tutor"><h3>'+esc(tr('askRobot'))+'</h3><p class="help">'+esc(tr('localTutor'))+'</p><div class="example-chips">'+['whyWorks','helpNext','helpTest'].map((key,i)=>a('tutor',esc(tr(key)),'','data-index="'+i+'"')).join('')+'</div>'+(help?'<div class="tutor-message" role="status"><b>N25x</b><p>'+esc(help)+'</p></div>':'')+'</section>';}
 function languageView(){
  const p=progress(),course=LEARNING_LANGUAGES.find(v=>v.id===p.learningLanguage),i=p.languageIndex,n=[0,1,2,3,4,5].filter(i=>solved('language:'+course.id+':'+i)).length;
  const isPractice=p.languageMode==='practice',meaning=l(WORD_MEANINGS[i]),word=course.words[i];
  return back('learn','learn')+'<h2>'+esc(tr('languagesLearn'))+'</h2><p class="help">'+esc(tr('languageStarter'))+'</p><label for="learning-language">'+esc(tr('learningLanguage'))+'</label><select id="learning-language">'+LEARNING_LANGUAGES.map(c=>'<option value="'+c.id+'" '+(c.id===course.id?'selected':'')+'>'+esc(c.name)+'</option>').join('')+'</select><div class="choice-row mode-row">'+a('language-mode',esc(tr('cardsMode')),'choice','data-mode="cards" aria-pressed="'+!isPractice+'"')+a('language-mode',esc(tr('practiceMode')),'choice','data-mode="practice" aria-pressed="'+isPractice+'"')+'</div><section class="panel"><div class="eyebrow">'+(i+1)+' / 6 · '+n+' ✓</div><h3 class="language-word">'+esc(meaning)+'</h3>'+(isPractice?'<p class="help">'+esc(tr('languageHint'))+'</p><div class="word-options">'+wordChoices(course.id,i).map(v=>a('language-answer','<span lang="'+course.id+'">'+esc(v.text)+'</span>','','data-index="'+v.index+'" '+(languageCorrect?'disabled':''))).join('')+'</div><form id="language-form" class="answer-row"><input id="language-input" aria-label="'+esc(tr('writeWord'))+'" lang="'+course.id+'" autocomplete="off" maxlength="100" '+(languageCorrect?'disabled':'')+'><button type="submit" class="secondary" '+(languageCorrect?'disabled':'')+'>'+esc(tr('check'))+'</button></form>':'<div class="flashcard">'+(flipped?'<strong lang="'+course.id+'">'+esc(word)+'</strong>'+(course.reading?'<p>'+esc(course.reading[i])+'</p>':''):'<span>?</span>')+'</div>'+a('flip-language',esc(tr('flip')),'secondary'))+'<p class="feedback" role="status">'+esc(languageFeedback)+'</p><div class="buttons">'+a('next-language',esc(tr('next')),'primary')+'</div>'+(n===6?'<p class="help">'+esc(tr('starterComplete'))+'</p>'+a('template',esc(tr('flashcards')),'outline','data-template="flashcards"'):'')+'</section>';
 }
 function labsView(){return back('learn','learn')+'<h2>'+esc(tr('schoolLabs'))+'</h2><p class="help">'+esc(tr('schoolLabsHelp'))+'</p><div class="subject-list">'+SUBJECTS.map(s=>a('lab','<span class="symbol">'+s.symbol+'</span><span><b>'+esc(l(s.title))+'</b><small>'+s.tasks.length+' · '+esc(tr('practice'))+'</small></span>','','data-lab="'+s.id+'"')).join('')+'</div>';}
 function labView(){const subject=SUBJECTS.find(s=>s.id===lab),task=subject.tasks[labIndex],offset=(labIndex+SUBJECTS.indexOf(subject))%3,order=[0,1,2].slice(offset).concat([0,1,2].slice(0,offset));return back('schoolLabs','schoolLabs')+'<h2>'+esc(l(subject.title))+'</h2><section class="panel"><div class="eyebrow">'+(labIndex+1)+' / '+subject.tasks.length+'</div><h3>'+esc(l(task.q))+'</h3><div class="word-options">'+order.map(i=>a('lab-answer',esc(l(task.options[i])),'','data-index="'+i+'" '+(labCorrect?'disabled':''))).join('')+'</div><p class="feedback" role="status">'+esc(labFeedback)+'</p>'+(labCorrect?'<div class="hint-box">'+esc(l(task.why))+'</div>':'')+'<div class="buttons">'+a('next-lab',esc(tr('next')),'secondary')+'</div></section>';}
 function ensureQuiz(){if(!progress().quiz)progress().quiz={name:tr('quiz'),...blankQuiz(tr),editingID:0};return progress().quiz;}
 function quizView(){
  const q=ensureQuiz();
  return back('create','create')+'<h2>'+esc(tr('quiz'))+'</h2><p class="help">'+esc(tr('quizHelp'))+'</p>'+input('quiz-name',tr('projectName'),q.name,24)+q.questions.map((question,i)=>'<fieldset class="panel"><legend>'+esc(tr('question'))+' '+(i+1)+'</legend>'+input('quiz-question-'+i,tr('quizPrompt'),question.prompt,240,'data-q="'+i+'" data-field="prompt"')+question.options.map((value,j)=>input('quiz-option-'+i+'-'+j,tr('answer')+' '+(j+1),value,120,'data-q="'+i+'" data-option="'+j+'"')).join('')+'<label for="quiz-correct-'+i+'">'+esc(tr('correctAnswer'))+'</label><select id="quiz-correct-'+i+'" data-q="'+i+'" data-correct>'+[0,1,2].map(j=>'<option value="'+j+'" '+(j===question.answer?'selected':'')+'>'+(j+1)+'</option>').join('')+'</select>'+(q.questions.length>1?a('remove-question',esc(tr('removeQuestion')),'back-link','data-index="'+i+'"'):'')+'</fieldset>').join('')+a('add-question',esc(tr('addQuestion')),'outline',q.questions.length===8?'disabled':'')+'<details class="panel" id="quiz-scoring" '+(detailOpen['quiz-scoring']?'open':'')+'><summary>'+esc(tr('scoring'))+'</summary><p class="help">'+esc(tr('scoringHelp'))+'</p>'+textarea('quiz-program',tr('codeEditor'),q.program,4000,'class="source-code" spellcheck="false" autocapitalize="off"')+'<div class="choice-row">'+a('score-block','<code>score + points</code>','choice','data-index="0"')+a('score-block','<code>score - points</code>','choice','data-index="1"')+'</div><div class="buttons">'+a('check-scoring',esc(tr('runTests')),'secondary')+a('restore-scoring',esc(tr('restoreCode')),'outline')+'</div><p id="scoring-result" class="feedback" role="status"></p></details>'+creationControls()+'<p class="help">'+esc(tr('draftSaved'))+'</p>'+previewFrame();
 }
 function currentProject(){
  if(currentView==='quiz'){const q=ensureQuiz();return {id:q.editingID,kind:'quiz',name:cleanName(q.name||tr('quiz')),data:{questions:q.questions,program:q.program}};}
  const c=progress().creator;if(!c)return null;const kind=c.template==='story'?'story':'creation';return {id:c.editingID,kind,name:cleanName(c.name||tr(c.template)),data:kind==='story'?Object.fromEntries(['intro','choiceA','endingA','choiceB','endingB'].map(k=>[k,c[k]])):{template:c.template,content:c.content,color:c.color}};
 }
 function creationControls(){return '<div class="buttons">'+a('preview',esc(tr('preview')),'primary')+a('save-creation',esc(tr('saveProject')),'lime')+'</div><div class="buttons">'+a('export-html',esc(tr('exportGame')),'outline')+a('export-creation',esc(tr('exportProject')),'outline')+'</div><p class="help">'+esc(tr('exchangeHelp'))+'</p>';}
 function previewFrame(){return showPreview?'<section class="panel"><h3>'+esc(tr('previewTitle'))+'</h3><iframe id="creation-preview" sandbox="allow-scripts" title="'+esc(tr('previewTitle'))+'"></iframe></section>':'';}
 function makerView(){
  const c=progress().creator;if(!c||!CREATION_TEMPLATES.includes(c.template)){return back('create','create')+catalogue();}
  const kind=c.template,hint=kind==='timer'?'timerHint':kind==='flashcards'?'flashcardHint':['badge','sticker'].includes(kind)?'badgeHint':['checklist','plan','mindmap','comic'].includes(kind)?'linesHint':'writingHint';
  return back('create','create')+'<h2>'+esc(tr(kind))+'</h2>'+input('creation-name',tr('projectName'),c.name,24)+(kind==='story'?['intro','choiceA','endingA','choiceB','endingB'].map(k=>textarea('creation-'+k,tr(k==='intro'?'introStory':k),c[k],k.startsWith('choice')?100:2400,'data-story="'+k+'"')).join(''):'<p class="help">'+esc(tr(hint))+'</p>'+textarea('creation-content',tr('contentText'),c.content,['badge','sticker'].includes(kind)?24:8000,'placeholder="'+esc(tr(hint))+'"')+'<label for="creation-color">'+esc(tr('accentColor'))+'</label><select id="creation-color">'+Object.keys(PALETTE).map(key=>'<option value="'+key+'" '+(c.color===key?'selected':'')+'>'+esc(tr(key))+'</option>').join('')+'</select>')+creationControls()+'<p class="help">'+esc(tr('draftSaved'))+'</p>'+previewFrame();
 }
 function exchangeView(){return back('create','create')+'<h2>'+esc(tr('exchange'))+'</h2><p class="help">'+esc(tr('exchangeHelp'))+'</p><div class="buttons">'+a('import-creation',esc(tr('importProject')),'primary')+a('navigate',esc(tr('collection')),'secondary','data-target="collection"')+'</div><section class="panel"><h3>'+esc(tr('quiz'))+'</h3>'+a('template',esc(tr('create')),'lime','data-template="quiz"')+'</section><p class="help">'+esc(tr('chatStatus'))+'</p>';}
 function render(view){rememberDetails();if(lastLanguage!==state().lang){lastLanguage=state().lang;help='';languageFeedback='';labFeedback='';}currentView=view;return ({programming:programmingView,languages:languageView,schoolLabs:labsView,subjectLab:labView,quiz:quizView,maker:makerView,exchange:exchangeView}[view])?.()||'';}
 function mount(){if($('program-source'))$('program-source').value=source();if($('quiz-program'))$('quiz-program').value=ensureQuiz().program;const frame=$('creation-preview');if(frame){const p=currentProject();if(p&&validateCreation(p.kind,p.data))frame.srcdoc=renderCreationHTML(p,state().lang,copy());}}
 function refresh(){api.render();}
 function selectTemplate(template){
  if(!CREATION_TEMPLATES.includes(template))return;
  showPreview=false;
  if(template==='quiz'){ensureQuiz();save();navigate('quiz');return;}
  if(progress().creator)progress().creators[progress().creator.template]=progress().creator;
  if(progress().creators[template])progress().creator=progress().creators[template];
  else if(progress().creator?.template!==template){
   const content=template==='timer'?'5':template==='flashcards'?'Hello | '+tr('hello')+'\nWater | '+tr('water'):['checklist','plan'].includes(template)?tr('checklistSeed').split('; ').join('\n'):'';
   progress().creator={template,name:cleanName(tr(template)),content,color:'cyan',editingID:0,intro:tr('storySeed'),choiceA:tr('choiceSeedA'),choiceB:tr('choiceSeedB'),endingA:tr('endingSeedA'),endingB:tr('endingSeedB')};
  }
  save();navigate('maker');
 }
 function changed(){showPreview=false;const old=$('creation-preview');old?.closest('section')?.remove();if(progress().creator)progress().creators[progress().creator.template]=progress().creator;save();}
 function openProject(p){showPreview=false;if(p.kind==='quiz'){progress().quiz={name:p.name,...structuredClone(p.data),editingID:p.id||0};save();navigate('quiz');return true;}if(p.kind==='creation'||p.kind==='story'){if(progress().creator)progress().creators[progress().creator.template]=progress().creator;progress().creator={name:p.name,template:projectTemplate(p),content:'',color:'cyan',intro:'',choiceA:'',endingA:'',choiceB:'',endingB:'',...structuredClone(p.data),editingID:p.id||0};progress().creators[progress().creator.template]=progress().creator;save();navigate('maker');return true;}return false;}
 async function importFile(file){try{if(!file||file.size>MAX_CREATION_BYTES)throw Error();const p=parseCreation(await file.text());if(!p)throw Error();const result=addProject(state(),p.kind,p.data,p.name);if(!result)throw Error();save();caption();openProject(result.project);toast(tr('projectSaved'));}catch{toast(tr('projectImportError'));}}
 function answerLanguage(correct){if(languageCorrect)return;languageCorrect=correct;if(correct){const id='language:'+progress().learningLanguage+':'+progress().languageIndex;languageFeedback=tr('correct')+' '+complete(id,10);}else{languageFeedback=tr('wrong');audio.cue(false);}refresh();}
 async function click(button){
  rememberDetails();const action=button.dataset.a;if(!action)return false;
  if(action==='navigate')navigate(button.dataset.target);
  else if(action==='template')selectTemplate(button.dataset.template);
  else if(action==='predict'){prediction=mission().prediction[+button.dataset.index]===mission().expectedPrediction;audio.cue(prediction);refresh();}
  else if(action==='block'){const m=mission();let code=source();const matched=m.block.choices.find(v=>code.includes(v));code=matched?code.replace(matched,m.block.choices[+button.dataset.index]):m.source.replace(m.block.from,m.block.choices[+button.dataset.index]);setSource(code);refresh();}
  else if(action==='sample'){sampleResult=runProgram(source(),mission().entry,mission().sample);refresh();audio.cue(sampleResult.ok);}
  else if(action==='tests'){testResults=checkMission(mission(),source(),runProgram);const passed=testResults.every(r=>r.ok&&r.value===r.expected);if(passed)toast(complete('program:'+mission().id,30));else audio.cue(false);refresh();}
  else if(action==='restore'){setSource(mission().source);prediction=null;refresh();}
  else if(action==='tutor'){help=+button.dataset.index===0?l(mission().why):+button.dataset.index===1?l(mission().hint):tr('testExplanation');refresh();}
  else if(action==='next-mission'){if(progress().mission<MISSIONS.length-1){progress().mission++;save();testResults=null;sampleResult=null;prediction=null;help='';refresh();}else selectTemplate('quiz');}
  else if(action==='language-mode'){progress().languageMode=button.dataset.mode;languageFeedback='';languageCorrect=false;flipped=false;save();refresh();}
  else if(action==='flip-language'){flipped=!flipped;refresh();}
  else if(action==='next-language'){progress().languageIndex=(progress().languageIndex+1)%6;languageCorrect=false;languageFeedback='';flipped=false;save();refresh();}
  else if(action==='language-answer')answerLanguage(+button.dataset.index===progress().languageIndex);
  else if(action==='lab'){lab=button.dataset.lab;labIndex=0;labFeedback='';labCorrect=false;navigate('subjectLab');}
  else if(action==='lab-answer'){if(labCorrect)return true;const subject=SUBJECTS.find(s=>s.id===lab);labCorrect=+button.dataset.index===subject.tasks[labIndex].answer;labFeedback=tr(labCorrect?'correct':'wrong');if(labCorrect)labFeedback+=' '+complete('lab:'+lab+':'+labIndex,15);else audio.cue(false);refresh();}
  else if(action==='next-lab'){const subject=SUBJECTS.find(s=>s.id===lab);if(labIndex===subject.tasks.length-1)navigate('schoolLabs');else{labIndex++;labFeedback='';labCorrect=false;refresh();}}
  else if(action==='add-question'){if(ensureQuiz().questions.length<8){ensureQuiz().questions.push({prompt:'',options:['','',''],answer:0});changed();refresh();}}
  else if(action==='remove-question'){if(ensureQuiz().questions.length>1){ensureQuiz().questions.splice(+button.dataset.index,1);changed();refresh();}}
  else if(action==='restore-scoring'){ensureQuiz().program=SCORE_PROGRAM;changed();refresh();}
  else if(action==='score-block'){ensureQuiz().program=SCORE_PROGRAM.replace('score + points',+button.dataset.index===0?'score + points':'score - points');changed();refresh();}
  else if(action==='check-scoring'){const pass=validScoreProgram(ensureQuiz().program);$('scoring-result').textContent=tr(pass?'testsPassed':'testsFailed');audio.cue(pass);}
  else if(['preview','save-creation','export-html','export-creation'].includes(action)){
   const p=currentProject();if(!p||!validateCreation(p.kind,p.data)){toast(tr(currentView==='quiz'?'previewInvalid':'creationInvalid'));audio.cue(false);return true;}
   if(action==='preview'){showPreview=true;refresh();$('creation-preview')?.scrollIntoView({block:'nearest',behavior:'auto'});}
   else if(action==='save-creation'){const result=updateProject(state(),p.id,p.kind,p.data,p.name);if(result){if(p.kind==='quiz')ensureQuiz().editingID=result.project.id;else progress().creator.editingID=result.project.id;save();caption();toast(tr('projectSaved')+(result.bonus?' '+tr('earned',{n:result.bonus}):''));audio.cue(true);}}
   else if(action==='export-html')download(new Blob([renderCreationHTML(p,state().lang,copy())],{type:'text/html;charset=utf-8'}),'N25x-'+projectTemplate(p)+'.html');
   else download(new Blob([serializeCreation(p)],{type:'application/json'}),'N25x-project.json');
  }
  else if(action==='import-creation'){$('creation-file')?.click();}
  return true;
 }
 function inputEvent(e){
  if(e.id==='program-source'){setSource(e.value);$('content').querySelectorAll('[data-program-results]').forEach(el=>el.remove());return true;}
  if(e.id==='quiz-name'){ensureQuiz().name=e.value;changed();return true;}
  if(e.id==='quiz-program'){ensureQuiz().program=e.value;changed();return true;}
  if(e.dataset.q!==undefined&&e.tagName==='INPUT'){const q=ensureQuiz().questions[+e.dataset.q];if(q){if(e.dataset.field==='prompt')q.prompt=e.value;else q.options[+e.dataset.option]=e.value;changed();}return true;}
  if(e.id==='creation-name'){progress().creator.name=e.value;changed();return true;}
  if(e.id==='creation-content'){progress().creator.content=e.value;changed();return true;}
  if(e.dataset.story){progress().creator[e.dataset.story]=e.value;changed();return true;}
  return false;
 }
 async function changeEvent(e){
  if(e.id==='mission-select'){progress().mission=+e.value;testResults=null;sampleResult=null;prediction=null;help='';save();refresh();return true;}
  if(e.id==='learning-language'){progress().learningLanguage=e.value;progress().languageIndex=0;languageFeedback='';languageCorrect=false;flipped=false;save();refresh();return true;}
  if(e.dataset.correct!==undefined){ensureQuiz().questions[+e.dataset.q].answer=+e.value;changed();return true;}
  if(e.id==='creation-color'){progress().creator.color=e.value;changed();return true;}
  if(e.id==='creation-file'){await importFile(e.files[0]);e.value='';return true;}
  return false;
 }
 function submit(event){if(event.target.id!=='language-form')return false;event.preventDefault();const course=LEARNING_LANGUAGES.find(v=>v.id===progress().learningLanguage);const normalize=s=>s.normalize('NFC').toLocaleLowerCase().replace(/\s+/g,' ').trim();answerLanguage(normalize($('language-input').value)===normalize(course.words[progress().languageIndex]));return true;}
 return {render,mount,click,input:inputEvent,change:changeEvent,submit,catalogue,openProject,selectTemplate};
}
