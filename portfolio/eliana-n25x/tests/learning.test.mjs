import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {MATH_TOPICS,MATH_VARIANTS,courseTask,checkCourseAnswer,freshMathCourse,parseMathCourse,recordMath,recordMathAssessmentAnswer,startMathAssessment,mathEvidence} from '../workshop/math-course.mjs';
import {createMathClassroom} from '../workshop/math-classroom.mjs';
import {fresh,parseProfile,reward} from '../workshop/model.mjs';
import {translate} from '../workshop/i18n.mjs';
import {freshScore,validateScore,noteName,midiFrequency,makeMidi,renderScoreWav,RHYTHM_LESSONS,gradeRhythm} from '../workshop/piano-score.mjs';
import {createPiano} from '../workshop/piano.mjs';
import {LANGUAGE_UNITS,LANGUAGE_ITEMS,COURSE_LANGUAGES,phraseTokens,phraseMatches,meaningChoices,parseLanguageCourse,meaningSource,wordOrder,nextLanguageExercise,languageMistakes,scheduleLanguage,dueLanguageReviews,REVIEW_INTERVALS,GRAMMAR_LESSONS,grammarOptions,gradeGrammar,grammarRoute} from '../workshop/language-course.mjs';
import {createLanguageClassroom} from '../workshop/language-classroom.mjs';
import {updateProject} from '../workshop/model.mjs';
test('Mathematics: all 12,288 parameter variants are finite, uniquely presented within their topic, and accept exact fractions',()=>{
 assert.equal(MATH_TOPICS.length,52);assert.equal(MATH_VARIANTS,13312);
 for(const topic of MATH_TOPICS){const seen=new Set();for(const lang of ['de','en','ru','uk'])assert(topic.title[lang]&&topic.rule[lang]);for(let i=0;i<256;i++){const t=courseTask(topic.id,i);assert(Number.isFinite(t.answer),t.id);assert(checkCourseAnswer(t,t.display),t.id);assert(!checkCourseAnswer(t,String(t.answer+1)),t.id);assert(!checkCourseAnswer(t,'window.location=1'),t.id);assert(!seen.has(t.expression),t.id);seen.add(t.expression);assert(t.steps.length);}}
 assert.throws(()=>courseTask('add',256));assert.throws(()=>courseTask('missing',0));
});
test('Language lessons: 152 distinct meanings have all ten scripts, four explanations and usable reading/writing/order exercises',()=>{
 assert.equal(LANGUAGE_UNITS.length,16);assert.equal(LANGUAGE_ITEMS.length,152);assert.equal(new Set(LANGUAGE_ITEMS.map(i=>i.id)).size,152);
 for(const u of LANGUAGE_UNITS)for(const lang of ['de','en','ru','uk'])assert(u.title[lang]&&u.note[lang]);
 for(const item of LANGUAGE_ITEMS)for(const lang of COURSE_LANGUAGES){assert(item.text[lang]?.length>2,item.id+':'+lang);assert(phraseMatches(item.text[lang],item.text[lang],lang));const tokens=phraseTokens(item.text[lang],lang);assert(tokens.length);assert(phraseMatches(tokens.join(' '),item.text[lang],lang),item.id+':'+lang);}
 for(const item of LANGUAGE_ITEMS)for(const lang of COURSE_LANGUAGES){const choices=meaningChoices(item,lang);assert.equal(choices.length,3);assert.equal(new Set(choices.map(v=>v.text[lang])).size,3);assert(choices.some(v=>v.id===item.id));}
 assert(LANGUAGE_ITEMS.every(i=>/[\u10a0-\u10ff]/u.test(i.text.ka)));assert(LANGUAGE_ITEMS.every(i=>/[\u4e00-\u9fff]/u.test(i.text.zh)));assert(LANGUAGE_ITEMS.every(i=>/[\u3040-\u30ff\u4e00-\u9fff]/u.test(i.text.ja)));
 assert(phraseMatches('HELLO!', 'Hello.', 'en'));assert(!phraseMatches('water','friend','en'));
});
test('Language classroom: whole-sentence reading, writing and word order preserve checkpoints and do not repeat rewards',()=>{
 const previous=globalThis.document,{document}=parseHTML('<html><body data-view="languageCourse"><section id="content"></section></body></html>');globalThis.document=document;
 try{const s=fresh();s.lang='ru';let controller;const api={getState:()=>s,tr:(k,p)=>translate(s.lang,k,p),esc:v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),save(){},award:(id,n)=>reward(s,id,n),navigate(){},toast(){},audio:{cue(){}},render(){document.getElementById('content').innerHTML=controller.render();}};controller=createLanguageClassroom(api);api.render();const item=LANGUAGE_UNITS[0].items[0];
 controller.click({dataset:{l:'meaning',id:item.id}});assert.equal(s.points,85);controller.click({dataset:{l:'meaning',id:item.id}});assert.equal(s.points,85);
 controller.click({dataset:{l:'mode',mode:'write'}});document.getElementById('course-language-answer').value=item.text.en;controller.submit({target:document.getElementById('course-language-form'),preventDefault(){}});assert.equal(s.points,90);
 controller.click({dataset:{l:'mode',mode:'order'}});for(const [i]of phraseTokens(item.text.en,'en').entries())controller.click({dataset:{l:'word',index:String(i)}});controller.click({dataset:{l:'check-order'}});assert.equal(s.points,95);
 const restored=parseProfile(JSON.stringify(s));assert.deepEqual(restored.learning.languages,s.learning.languages);assert.equal(restored.learning.languages.done['en/'+item.id],7);
 controller.click({dataset:{l:'next'}});assert.equal(s.learning.languages.index,1);for(const lang of ['de','en','ru','uk']){s.lang=lang;api.render();assert(document.getElementById('content').textContent.includes(translate(lang,'languageCourse')));assert(!document.getElementById('content').textContent.includes('undefined'));}
 const safe=parseLanguageCourse({language:'evil',unit:'evil',done:{'en/missing':15},review:['evil|read|missing']});assert.equal(safe.language,'en');assert.deepEqual(safe.done,{});
 }finally{globalThis.document=previous;}
});
test('Piano: 88 pitches, validated chords and profile migration preserve full compositions alongside earlier projects',()=>{
 assert.equal(noteName(21),'A0');assert.equal(noteName(108),'C8');assert.equal(midiFrequency(69),440);const score=freshScore();score.tracks[0].notes=[{midi:60,beat:0,duration:1,velocity:.7},{midi:64,beat:0,duration:1,velocity:.8}];assert.deepEqual(validateScore(score),score);
 for(const change of [{midi:20},{midi:109},{beat:-1},{duration:0},{duration:Infinity},{velocity:2}]){const bad=structuredClone(score);Object.assign(bad.tracks[0].notes[0],change);assert.equal(validateScore(bad),null);}
 const s=fresh();s.piano.score=score;updateProject(s,0,'piano',score,'My chord');updateProject(s,0,'melody',{steps:[1,0,2,0,3,0,4,0],tempo:110},'Earlier melody');assert.deepEqual(parseProfile(JSON.stringify(s)),s);const old={...s};delete old.piano;assert.deepEqual(parseProfile(JSON.stringify(old)).piano,fresh().piano);
});
test('Piano: MIDI encodes tempo, separate tracks and overlapping notes; WAV has actual deterministic PCM audio',()=>{
 const score={tempo:120,bars:4,tracks:[{name:'Piano',instrument:'piano',notes:[{midi:60,beat:0,duration:1,velocity:.7},{midi:64,beat:0,duration:1,velocity:.7}]},{name:'Bass',instrument:'bass',notes:[{midi:48,beat:0,duration:2,velocity:.7}]}]},m=makeMidi(score),buffer=Buffer.from(m);assert.equal(buffer.toString('ascii',0,4),'MThd');assert.equal(buffer.readUInt16BE(8),1);assert.equal(buffer.readUInt16BE(10),3);assert.equal(buffer.readUInt16BE(12),480);assert(buffer.includes(Buffer.from([255,81,3,7,161,32])));assert(buffer.includes(Buffer.from([144,60,89])));assert(buffer.includes(Buffer.from([144,64,89])));assert(buffer.includes(Buffer.from([145,48,89])));assert.equal(buffer.toString('latin1').split('MTrk').length-1,3);
 const wav=renderScoreWav(score),v=new DataView(wav);assert.equal(Buffer.from(wav).toString('ascii',0,4),'RIFF');assert.equal(v.getUint32(24,true),22050);assert.equal(v.getUint32(40,true),wav.byteLength-44);assert(wav.byteLength>60000);let energy=0;for(let i=44;i<wav.byteLength;i+=2)energy+=Math.abs(v.getInt16(i,true));assert(energy>100000);assert(Buffer.from(wav).equals(Buffer.from(renderScoreWav(score))));
});
test('Piano controller: two pointers form a recorded chord, cancellation releases notes, editor and saved projects work in four UI languages',async()=>{
 const previous=globalThis.document,perf=globalThis.performance,{document,window}=parseHTML('<html><body data-view="piano"><section id="content"></section></body></html>');globalThis.document=document;let now=0;globalThis.performance={now:()=>now};let piano;
 try{const s=fresh();s.lang='ru';const api={getState:()=>s,tr:(k,p)=>translate(s.lang,k,p),esc:v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),save(){},navigate(){},toast(){},download(){},audio:{tone(){}},saveProject:(kind,data,name,id)=>updateProject(s,id,kind,data,name),render(){document.getElementById('content').innerHTML=piano.render();piano.mount();}};piano=createPiano(api);api.render();await piano.click({dataset:{p:'record'}});
 const emit=(type,id,midi)=>{const e=new window.Event(type,{bubbles:true});Object.defineProperty(e,'pointerId',{value:id});(midi?document.querySelector('[data-piano-note="'+midi+'"]'):document).dispatchEvent(e);};emit('pointerdown',1,60);emit('pointerdown',2,64);assert.equal(piano.status.held,2);now=500;emit('pointerup',1);emit('pointercancel',2);assert.equal(piano.status.held,0);await piano.click({dataset:{p:'stop'}});assert.equal(s.piano.score.tracks[0].notes.length,2);assert(s.piano.score.tracks[0].notes.every(n=>n.beat===0&&n.duration>0));
 await piano.click({dataset:{p:'save'}});assert.equal(s.projects[0].kind,'piano');for(const lang of ['de','en','ru','uk']){s.lang=lang;api.render();assert(document.getElementById('content').textContent.includes(translate(lang,'piano')));assert(!document.getElementById('content').textContent.includes('undefined'));}
 }finally{piano?.stop(false);globalThis.document=previous;globalThis.performance=perf;}
});
test('Mathematics: independently specified reference answers cover every family and several boundary variants',()=>{
 const expected=[4,2,7,2,4,2,8,12,1,2/3,2,4/3,.4,.2,.04,2,.4,50,19.6,20.4,0,0,4,-2,3,2,2,2,2,16,2,4,8,2,4,12,4,8,2,4,2,8/3,.5,8,2,2,4,64,6,8,4,10];
 assert.equal(expected.length,MATH_TOPICS.length);for(const [i,t]of MATH_TOPICS.entries())assert(Math.abs(courseTask(t.id,0).answer-expected[i])<1e-8,t.id);
 assert.equal(courseTask('root',255).answer,257);assert.equal(courseTask('linear',255).answer,18);assert.equal(courseTask('rectangle-area',255).answer,289);assert.equal(courseTask('negative-divide',255).answer,-17);
 assert(checkCourseAnswer(courseTask('fraction-subtract',0),'2/3'));assert(checkCourseAnswer(courseTask('linear',0),'x = 3'));assert(!checkCourseAnswer(courseTask('linear',0),'x = 4'));
});
test('Mathematics: review queue, checkpoints and in-progress assessment survive a validated profile round-trip',()=>{
 const c=freshMathCourse(),t=courseTask('add',3);recordMath(c,t,false);recordMath(c,t,false);assert.equal(c.mistakes.length,1);recordMath(c,t,true);recordMath(c,t,true);assert.equal(c.done.add.length,1);assert.equal(c.mistakes.length,0);
 c.assessment={topic:'add',indices:Array.from({length:10},(_,i)=>i*7),answers:[true,false],answered:true};c.index=7;const s=fresh();s.learning.math=c;const restored=parseProfile(JSON.stringify(s));assert.deepEqual(restored.learning.math,c);assert.equal(restored.learning.math.assessment.answered,true);
 const old={...s};delete old.learning;assert.deepEqual(parseProfile(JSON.stringify(old)).learning.math,freshMathCourse());assert.deepEqual(parseMathCourse({topic:'evil',index:Infinity,done:{add:[-1,999]},assessment:{}}).assessment,null);
});
test('Mathematics classroom: real DOM forms reward once, review errors and complete an assessment; all four UI languages render',()=>{
 const previous=globalThis.document,{document}=parseHTML('<html><body><section id="content"></section></body></html>');globalThis.document=document;
 try{const s=fresh();s.lang='ru';let controller,saves=0;const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const api={getState:()=>s,tr:(k,p)=>translate(s.lang,k,p),esc,save:()=>saves++,award:(id,n)=>reward(s,id,n),navigate:()=>{},toast:()=>{},audio:{cue(){}},render:()=>{document.getElementById('content').innerHTML=controller.render();}};controller=createMathClassroom(api);api.render();
 const answer=value=>{document.getElementById('course-answer').value=String(value);controller.submit({target:document.getElementById('course-answer-form'),preventDefault(){}});};
 answer(999);assert.equal(s.learning.math.mistakes.length,1);answer(4);assert.equal(s.points,85);answer(4);assert.equal(s.points,85);assert.equal(s.learning.math.mistakes.length,0);
 controller.click({dataset:{m:'assessment'}});for(let i=0;i<10;i++){answer(courseTask(s.learning.math.topic,s.learning.math.index).display);if(i<9)controller.click({dataset:{m:'next'}});}assert.equal(s.learning.math.assessment.answers.filter(Boolean).length,10);assert.equal(s.learning.math.evidence.add.latest,10);assert.equal(s.learning.math.evidence.add.rounds,1);assert(document.getElementById('content').textContent.includes('10 / 10'));assert.equal(s.points,160);assert.equal(document.getElementById('course-answer-form'),null);assert.equal(reward(s,'course-assess:add',30),0);
 for(const lang of ['de','en','ru','uk']){s.lang=lang;api.render();assert(document.getElementById('content').textContent.includes(translate(lang,'mathCourse')));assert(!document.getElementById('content').textContent.includes('undefined'));}assert(saves>10);
 }finally{globalThis.document=previous;}
});

test('Language exercise source cannot reveal the target answer; deterministic word shuffle varies by item',()=>{for(const target of COURSE_LANGUAGES)for(const ui of ['de','en','ru','uk'])for(const selected of ['auto',...COURSE_LANGUAGES])assert.notEqual(meaningSource(target,selected,ui),target);const samples=LANGUAGE_ITEMS.map(q=>wordOrder(['a','b','c','d'],q.id+'|en').map(v=>v.i).join(','));assert(new Set(samples).size>10);assert(samples.every(v=>v!=='0,1,2,3'));assert.deepEqual(wordOrder(['a','b','c'],'test'),wordOrder(['a','b','c'],'test'));for(const lang of ['de','en','ru','uk'])assert(translate(lang,'studyProgress'));});
test('Imported math assessment restores the expected exercise and clamps impossible accuracy',()=>{const p=freshMathCourse();p.attempts=2;p.correct=99;p.index=255;p.assessment={topic:'add',indices:Array.from({length:10},(_,i)=>i*5),answers:[true,false],answered:false};let r=parseMathCourse(p);assert.equal(r.correct,2);assert.equal(r.index,10);p.assessment.answered=true;r=parseMathCourse(p);assert.equal(r.index,5);});

test('Guided language path prioritizes selected-language mistakes, covers all core skills and stops at completion',()=>{const s=fresh().learning.languages,item=LANGUAGE_ITEMS[0];assert.equal(nextLanguageExercise(s).mode,'read');s.done['en/'+item.id]=1;assert.equal(nextLanguageExercise(s).mode,'order');s.review=['de|write|'+item.id,'en|write|'+item.id];assert.equal(nextLanguageExercise(s).mode,'write');assert(nextLanguageExercise(s).review);s.review=[];for(const x of LANGUAGE_ITEMS)s.done['en/'+x.id]=7;assert.equal(nextLanguageExercise(s),null);s.language='de';assert.equal(nextLanguageExercise(s).mode,'read');});

test('Spaced review: 1/3/7/14/30 day ladder, no early promotion, assisted reset, per-language filtering and profile roundtrip',()=>{const s=fresh(),p=s.learning.languages,item=LANGUAGE_ITEMS[0],key='en|read|'+item.id;p.mode='read';let day=20000;scheduleLanguage(p,item,true,{day});assert.deepEqual(p.schedule[key],{step:0,due:day+1,reset:false});scheduleLanguage(p,item,true,{day});assert.equal(p.schedule[key].due,day+1);for(let step=1;step<5;step++){day=p.schedule[key].due;assert(dueLanguageReviews(p,day).includes(key));scheduleLanguage(p,item,true,{day});assert.equal(p.schedule[key].step,step);assert.equal(p.schedule[key].due,day+REVIEW_INTERVALS[step]);}scheduleLanguage(p,item,false,{day});assert(p.schedule[key].reset);scheduleLanguage(p,item,true,{day,assisted:true});assert.equal(p.schedule[key].due,day);assert.equal(nextLanguageExercise(p,day).review,true);scheduleLanguage(p,item,true,{day});assert.equal(p.schedule[key].due,day+1);p.language='de';assert.equal(dueLanguageReviews(p,day+1).length,0);assert.deepEqual(parseProfile(JSON.stringify(s)).learning.languages,p);const old={...p};delete old.schedule;assert.deepEqual(parseLanguageCourse(old).schedule,{});assert.deepEqual(parseLanguageCourse({schedule:{'en|read|missing':{step:0,due:1},[key]:{step:99,due:1}}}).schedule,{});});

test('Grammar has separate practice and checkpoint examples; scoring and profile validation',()=>{assert.equal(GRAMMAR_LESSONS.length,88);const s=fresh();for(const v of GRAMMAR_LESSONS){assert.equal(v.practice.length,2);assert.equal(v.checkpoint.length,2);assert.equal(new Set([...v.practice,...v.checkpoint].map(q=>q.sentence)).size,4);assert.equal(gradeGrammar(v,v.checkpoint.map(q=>q.answer)),2);assert.equal(gradeGrammar(v,v.checkpoint.map(q=>q.options[1])),0);assert.equal(gradeGrammar(v,[]),null);for(const q of [...v.practice,...v.checkpoint])assert.equal(new Set(grammarOptions(q,v.id)).size,3);s.learning.languages.grammar.passed[v.id]=true;}s.learning.languages.grammar.passed.invalid=true;assert.equal(Object.keys(parseProfile(JSON.stringify(s)).learning.languages.grammar.passed).length,88);assert.deepEqual(parseLanguageCourse({}).grammar,{passed:{},evidence:{},extended:{}});});

test('Grammar controller: wrong answers, separate checkpoint examples, local persistence and all UI languages',()=>{
 const previous=globalThis.document,{document}=parseHTML('<html><body data-view="languageCourse"><section id="content"></section></body></html>');globalThis.document=document;
 try{const s=fresh(),p=s.learning.languages;let controller;const api={getState:()=>s,tr:(k,v)=>translate(s.lang,k,v),esc:v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),save(){},award:(id,n)=>reward(s,id,n),navigate(){},toast(){},audio:{cue(){}},render(){document.getElementById('content').innerHTML=controller.render();}};controller=createLanguageClassroom(api);const click=(l,value)=>controller.click({dataset:{l,value}});
 for(const language of COURSE_LANGUAGES){p.language=language;click('grammar-open');for(const lesson of GRAMMAR_LESSONS.filter(v=>v.language===language)){controller.change({id:'grammar-lesson',value:lesson.id});assert(document.getElementById('content').textContent.includes(lesson.example));click('grammar-answer',lesson.practice[0].options[1]);click('grammar-next');assert(document.getElementById('content').textContent.includes(lesson.practice[0].sentence));for(const q of lesson.practice){click('grammar-answer',q.answer);click('grammar-next');}click('grammar-test');assert(!document.getElementById('content').textContent.includes(lesson.example));for(const q of lesson.checkpoint)click('grammar-answer',q.options[1]);assert(!p.grammar.passed[lesson.id]);assert.equal(p.grammar.evidence[lesson.id].latest,0);assert.equal(document.querySelectorAll('[data-grammar-corrections] li').length,2);assert(document.getElementById('content').textContent.includes('0 / 2'));click('grammar-test');for(const q of lesson.checkpoint)click('grammar-answer',q.answer);assert(p.grammar.passed[lesson.id]);assert.equal(p.grammar.evidence[lesson.id].rounds,2);assert.equal(p.grammar.evidence[lesson.id].missed.length,0);assert(document.getElementById('content').textContent.includes('2 / 2'));}for(const lang of ['de','en','ru','uk']){s.lang=lang;api.render();assert(document.getElementById('content').textContent.includes(translate(lang,'grammarCourse')));}click('grammar-close');}
 assert.equal(Object.keys(parseProfile(JSON.stringify(s)).learning.languages.grammar.passed).length,88);assert.equal(s.points,80);
 }finally{globalThis.document=previous;}
});

test('Grammar progression: both languages have 20 lessons across five ordered stages',()=>{for(const language of ['de','en']){const route=grammarRoute(language);assert.equal(route.length,20);assert.deepEqual([...new Set(route.map(v=>v.stage))],[1,2,3,4,5]);assert.equal(new Set(route.map(v=>v.id)).size,20);}});

test('All ten languages have their own grammar routes and original lesson IDs',()=>{for(const language of COURSE_LANGUAGES){const route=grammarRoute(language);assert.equal(route.length,['de','en'].includes(language)?20:6);assert.deepEqual([...new Set(route.map(v=>v.stage))],['de','en'].includes(language)?[1,2,3,4,5]:[1,2,3,4]);}assert.equal(new Set(GRAMMAR_LESSONS.map(v=>v.id)).size,88);});


test('Rhythm grading: all eight patterns accept exact and bounded jitter, reject drift and invalid input',()=>{
 for(const lesson of RHYTHM_LESSONS){
  const beat=60000/lesson.bpm,origin=2000,ideal=lesson.beats.map(b=>origin+b*beat);
  assert(gradeRhythm(lesson,ideal).passed,lesson.id);
  assert(gradeRhythm(lesson,ideal.map((t,i)=>t+(i%2?40:0))).passed,lesson.id);
  const bad=gradeRhythm(lesson,ideal.map((t,i)=>t+(i===ideal.length-1?250:0)));
  assert.equal(bad.passed,false);assert.equal(bad.correct,ideal.length-1);
  assert.equal(gradeRhythm(lesson,ideal.slice(1)),null);
  assert.equal(gradeRhythm(lesson,ideal.map(()=>origin)),null);
  assert.equal(gradeRhythm(lesson,ideal.map((t,i)=>i===1?NaN:t)),null);
 }
});

test('Rhythm controller: failed and successful takes, replay, mute guards and profile round-trip',async()=>{
 const previous=globalThis.document,perf=globalThis.performance,{document}=parseHTML('<html><body data-view="piano"><section id="content"></section></body></html>');
 globalThis.document=document;let now=0;globalThis.performance={now:()=>now};let piano;
 try{
  const s=fresh();s.lang='en';s.sound=true;
  const api={getState:()=>s,tr:(k,p)=>translate(s.lang,k,p),esc:v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),save(){},navigate(){},toast(){},download(){},audio:{tone(){}},render(){document.getElementById('content').innerHTML=piano.render();piano.mount();}};
  piano=createPiano(api);api.render();
  const click=async p=>piano.click({dataset:{p}});
  const disabled=p=>document.querySelector('[data-p="'+p+'"]').hasAttribute('disabled');
  const original=structuredClone(s.piano.score),points=s.points;
  assert(!disabled('rhythm-example'));await click('rhythm-start');
  assert(disabled('rhythm-example'));assert(disabled('practice-example'));
  for(let i=0;i<5;i++){now=1000+i*100;await click('rhythm-tap');}
  assert(!s.piano.practice.rhythmPassed.steady);assert(disabled('rhythm-tap'));assert(!disabled('rhythm-example'));assert(!disabled('practice-example'));
  await click('rhythm-start');
  for(let i=0;i<5;i++){now=3000+i*1000;await click('rhythm-tap');}
  assert(s.piano.practice.rhythmPassed.steady);assert(!disabled('rhythm-example'));assert(disabled('rhythm-tap'));
  assert.deepEqual(s.piano.score,original);assert.equal(s.points,points);
  assert(parseProfile(JSON.stringify(s)).piano.practice.rhythmPassed.steady);
  s.sound=false;api.render();assert(disabled('rhythm-example'));assert(disabled('practice-example'));
  await click('stop');assert(disabled('rhythm-tap'));
 }finally{piano?.stop(false);globalThis.document=previous;globalThis.performance=perf;}
});


test('Language mistakes: queue is isolated per selected language and imported keys are validated',()=>{
 const item=LANGUAGE_ITEMS[0],en='en|write|'+item.id,de='de|read|'+item.id,ja='ja|listen|'+item.id;
 const p=parseLanguageCourse({language:'en',review:[de,en,en,ja,en+'|junk','en|bogus|'+item.id,'en|read|missing',42]});
 assert.deepEqual(p.review,[de,en,ja]);assert.deepEqual(languageMistakes(p),[en]);
 p.language='de';assert.deepEqual(languageMistakes(p),[de]);p.language='ja';assert.deepEqual(languageMistakes(p),[ja]);p.language='fr';assert.deepEqual(languageMistakes(p),[]);
});

test('Language classroom: manual mistake review cannot silently change the chosen language',()=>{
 const previous=globalThis.document,{document}=parseHTML('<html><body><section id="content"></section></body></html>');globalThis.document=document;
 try{const s=fresh(),p=s.learning.languages,item=LANGUAGE_ITEMS[0],de='de|read|'+item.id,en='en|write|'+item.id;p.language='en';p.review=[de,en];let controller;
 const api={getState:()=>s,tr:(k,v)=>translate(s.lang,k,v),esc:v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),save(){},award:(id,n)=>reward(s,id,n),navigate(){},toast(){},audio:{cue(){}},render(){document.getElementById('content').innerHTML=controller.render();}};
 controller=createLanguageClassroom(api);api.render();const button=()=>document.querySelector('[data-l="review"]');
 assert(!button().hasAttribute('disabled'));controller.click({dataset:{l:'review'}});assert.equal(p.language,'en');assert.equal(p.mode,'write');assert.deepEqual(p.review,[de,en]);
 p.language='fr';api.render();assert(button().hasAttribute('disabled'));controller.click({dataset:{l:'review'}});assert.equal(p.language,'fr');
 }finally{globalThis.document=previous;}
});

test('Ear training: all 13 intervals, varied roots, fair options, correct and incorrect rounds, profile migration',async()=>{
 const {EAR_LESSONS,INTERVAL_NAMES,makeEarRound,gradeEarRound,parsePiano,freshPiano}=await import('../workshop/piano-score.mjs');
 const p=freshPiano(),seen=new Set();
 assert.equal(EAR_LESSONS.length,5);assert.equal(INTERVAL_NAMES.length,13);
 for(const lesson of EAR_LESSONS){
  for(const seed of [0,1,42,4294967295]){
   const round=makeEarRound(lesson.id,seed);
   assert.deepEqual(round,makeEarRound(lesson.id,seed));assert.deepEqual([...new Set(round.map(q=>q.interval))].sort((a,b)=>a-b),lesson.intervals);
   for(const q of round){seen.add(q.interval);assert(q.root>=48&&q.root+q.interval<=83);assert(q.options.includes(q.interval));assert.equal(new Set(q.options).size,q.options.length);assert(q.options.every(v=>lesson.intervals.includes(v)));}
   const answers=round.map(q=>q.interval);assert(gradeEarRound(round,answers).passed);answers[0]=round[0].options.find(v=>v!==answers[0]);assert.equal(gradeEarRound(round,answers).correct,round.length-1);assert(!gradeEarRound(round,answers).passed);assert.equal(gradeEarRound(round,answers.slice(1)),null);
  }
  p.practice.earPassed[lesson.id]=true;
 }
 assert.equal(seen.size,13);assert.deepEqual(parsePiano(p),p);delete p.practice.earPassed;assert.deepEqual(parsePiano(p).practice.earPassed,{});p.practice.earPassed={unknown:true,'ear-foundations':'true'};assert.deepEqual(parsePiano(p).practice.earPassed,{});
 assert.equal(makeEarRound('unknown',0),null);assert.equal(makeEarRound(EAR_LESSONS[0].id,-1),null);
});

test('Staff notation: reference positions, enharmonic spelling, ledger lines, all notes within keyboard and migration',async()=>{
 const {STAFF_LESSONS,staffNote,staffPracticeStep,parsePiano,freshPiano}=await import('../workshop/piano-score.mjs');
 assert.deepEqual(staffNote('E4','treble'),{midi:64,step:0,accidental:'',ledger:[]});
 assert.deepEqual(staffNote('C4','treble'),{midi:60,step:-2,accidental:'',ledger:[-2]});
 assert.deepEqual(staffNote('A5','treble'),{midi:81,step:10,accidental:'',ledger:[10]});
 assert.deepEqual(staffNote('G2','bass'),{midi:43,step:0,accidental:'',ledger:[]});
 assert.deepEqual(staffNote('C4','bass'),{midi:60,step:10,accidental:'',ledger:[10]});
 assert.equal(staffNote('C#5','treble').midi,staffNote('Db5','treble').midi);assert.notEqual(staffNote('C#5','treble').step,staffNote('Db5','treble').step);
 assert.equal(staffNote('X4','treble'),null);assert.equal(staffNote('C4','unknown'),null);
 const p=freshPiano();for(const lesson of STAFF_LESSONS){let i=0;for(const spelling of lesson.notes){const q=staffNote(spelling,lesson.clef);assert(q.midi>=(lesson.octave+1)*12&&q.midi<(lesson.octave+3)*12);assert.equal(staffPracticeStep(lesson,i,q.midi+1).index,i);const r=staffPracticeStep(lesson,i,q.midi);assert(r.correct);assert.equal(r.index,++i);assert.equal(r.complete,i===lesson.notes.length);}p.practice.staffPassed[lesson.id]=true;}
 assert.deepEqual(parsePiano(p),p);delete p.practice.staffPassed;assert.deepEqual(parsePiano(p).practice.staffPassed,{});p.practice.staffPassed={unknown:true,'staff-treble':'true'};assert.deepEqual(parsePiano(p).practice.staffPassed,{});
});

test('Unified study dashboard: six independent progress measures, due reviews and non-mutating counts',async()=>{
 const {fresh,studySummary,parseProfile}=await import('../workshop/model.mjs');
 const {MATH_TOPICS,MATH_VARIANTS}=await import('../workshop/math-course.mjs');
 const {LANGUAGE_ITEMS,grammarRoute,scheduleLanguage}=await import('../workshop/language-course.mjs');
 const {MISSIONS,SUBJECTS}=await import('../workshop/curriculum.mjs');
 const s=fresh(),l=s.learning.languages,day=20000;const zero=studySummary(s,day);
 assert.equal(zero.math.total,MATH_VARIANTS);assert.equal(zero.language.total,LANGUAGE_ITEMS.length*3);assert.equal(zero.grammar.total,grammarRoute(l.language).length);assert.equal(zero.dialogues.total,10);assert.equal(zero.programming.total,MISSIONS.length);assert.equal(zero.school.total,SUBJECTS.reduce((n,v)=>n+v.tasks.length,0));assert.equal(zero.music.total,52);assert.equal(zero.projects,0);
 for(const key of ['math','language','grammar','dialogues','programming','school','music'])assert.equal(zero[key].done,0);
 s.learning.math.done[MATH_TOPICS[0].id]=[0,1];s.learning.math.mistakes=[MATH_TOPICS[0].id+':2'];
 const item=LANGUAGE_ITEMS[0];l.done[l.language+'/'+item.id]=15;l.done['de/'+item.id]=7;l.mode='read';scheduleLanguage(l,item,true,{day:day-1});l.review=[l.language+'|read|'+item.id,'de|read|'+item.id];l.grammar.passed[grammarRoute(l.language)[0].id]=true;l.grammar.passed[grammarRoute('de')[0].id]=true;l.dialogues.passed['en/greeting']=true;l.dialogues.passed['de/greeting']=true;l.dialogues.passed['de/shop']=true;
 s.solved=['program:'+MISSIONS[0].id,'lab:'+SUBJECTS[0].id+':0','lab:'+SUBJECTS[0].id+':0'];s.piano.practice.harmonyPassed['harmony-c']=true;
 const before=JSON.stringify(s),v=studySummary(s,day);assert.equal(JSON.stringify(s),before);
 assert.equal(v.math.done,2);assert.equal(v.math.review,1);assert.equal(v.language.done,3);assert.equal(v.language.review,1);assert.equal(v.grammar.done,1);assert.equal(v.dialogues.done,1);assert.equal(v.programming.done,1);assert.equal(v.school.done,1);assert.equal(v.music.done,1);
 assert.deepEqual(studySummary(parseProfile(JSON.stringify(s)),day),v);
});

test('Contextual dialogue practice covers every language and persists independent completion',async()=>{
 const {DIALOGUE_LESSONS,COURSE_LANGUAGES,dialogueOptions,gradeDialogue,freshLanguageCourse,parseLanguageCourse}=await import('../workshop/language-course.mjs');
 const p=freshLanguageCourse();assert.equal(DIALOGUE_LESSONS.length,10);assert.equal(new Set(DIALOGUE_LESSONS.map(m=>m.id)).size,10);
 for(const lang of COURSE_LANGUAGES)for(const m of DIALOGUE_LESSONS){const t=m.turns[lang],opts=dialogueOptions(m,lang);assert(t.prompt.trim());assert.equal(new Set(opts).size,3);assert.equal(opts.filter(v=>gradeDialogue(m,lang,v)).length,1);assert(gradeDialogue(m,lang,t.answer));p.dialogues.passed[lang+'/'+m.id]=true;}
 assert.deepEqual(parseLanguageCourse(p),p);p.dialogues.passed['xx/greeting']=true;assert(!parseLanguageCourse(p).dialogues.passed['xx/greeting']);delete p.dialogues;assert.deepEqual(parseLanguageCourse(p).dialogues,{passed:{}});
});

test('Every supported source language survives profile roundtrip; target collision uses a different language',()=>{for(const target of COURSE_LANGUAGES)for(const source of ['auto',...COURSE_LANGUAGES]){const p=fresh();p.learning.languages.language=target;p.learning.languages.source=source;const restored=parseProfile(JSON.stringify(p)).learning.languages;assert.equal(restored.source,source);const actual=meaningSource(target,source,'ru');assert.equal(actual,source==='auto'?(target==='ru'?'de':'ru'):source===target?(target==='de'?'en':'de'):source);}assert.equal(parseLanguageCourse({source:'invalid'}).source,'auto');});

test('Personal study plan balances selected difficulty, prioritizes reviews, rotates extras and never changes state',async()=>{
 const {studyPlan}=await import('../workshop/model.mjs');
 const s=fresh(),m=s.learning.math,l=s.learning.languages,day=20000;
 for(let grade=1;grade<=11;grade++){
  s.grade=grade;const before=JSON.stringify(s),p=studyPlan(s,day);
  assert.equal(p.length,3);assert.equal(p[0].kind,'math');assert.equal(MATH_TOPICS.find(t=>t.id===p[0].topic).grade,grade);assert.equal(p[0].index,0);assert.equal(p[1].kind,'language');assert.equal(p[2].kind,'grammar');assert.equal(JSON.stringify(s),before);
 }
 s.grade=5;const first=studyPlan(s,day)[0];m.done[first.topic]=[0];assert.notEqual(studyPlan(s,day)[0].topic,first.topic);
 m.mistakes=['add:7'];assert.deepEqual(studyPlan(s,day)[0],{kind:'math',reason:'planMathReview',topic:'add',index:7,title:MATH_TOPICS.find(t=>t.id==='add').title});
 m.assessment={topic:m.topic,indices:Array.from({length:10},(_,i)=>i),answers:[false],answered:true};assert.equal(studyPlan(s,day)[0].reason,'planResume');
 const item=LANGUAGE_ITEMS[0];l.review=['en|write|'+item.id];const lang=studyPlan(s,day)[1];assert.equal(lang.reason,'planLanguageReview');assert.equal(lang.mode,'write');
 assert.deepEqual(Array.from({length:5},(_,i)=>studyPlan(s,day+i)[2].kind),['grammar','dialogues','programming','school','music']);
 for(const lesson of grammarRoute(l.language))l.grammar.passed[lesson.id]=true;assert.equal(studyPlan(s,day)[2].kind,'dialogues');
 const before=JSON.stringify(s);studyPlan(s,day);assert.equal(JSON.stringify(s),before);
 for(const lang of ['de','en','ru','uk'])for(const key of ['planTitle','planScope','planResume','planMathReview','planMathNew','planLanguageReview','planLanguageNew','planExtra','planDone'])assert.notEqual(translate(lang,key),key);
});

test('Math self-test evidence survives topic changes, supports retesting, and distinguishes incomplete rounds',async()=>{
 const {studyPlan}=await import('../workshop/model.mjs');const s=fresh(),m=s.learning.math;
 m.topic=MATH_TOPICS.find(t=>t.grade===s.grade).id;
 assert.equal(mathEvidence(m).length,MATH_TOPICS.length);assert(mathEvidence(m).every(t=>t.result===null));
 assert(startMathAssessment(m,31));const original=[...m.assessment.indices];
 for(let i=0;i<10;i++){assert(recordMathAssessmentAnswer(m,i<6));assert(!recordMathAssessmentAnswer(m,true));if(i<9)m.assessment.answered=false;}
 assert.deepEqual(m.evidence[m.topic],{latest:6,best:6,rounds:1,seed:31});
 const plan=studyPlan(s,20000)[0];assert.equal(plan.reason,'planMathRetest');assert.equal(plan.index,47);assert(startMathAssessment(m,plan.index));assert(m.assessment.indices.every(i=>!original.includes(i)));
 assert(recordMathAssessmentAnswer(m,true));assert.equal(m.evidence[m.topic].rounds,1);
 assert.deepEqual(parseProfile(JSON.stringify(s)).learning.math.evidence,m.evidence);
 m.assessment.answered=false;for(let i=1;i<10;i++){assert(recordMathAssessmentAnswer(m,true));if(i<9)m.assessment.answered=false;}
 assert.deepEqual(m.evidence[m.topic],{latest:10,best:10,rounds:2,seed:47});
 assert.notEqual(studyPlan(s,20000)[0].reason,'planMathRetest');
 const legacy=JSON.parse(JSON.stringify(m));delete legacy.evidence;assert.equal(parseMathCourse(legacy).evidence[m.topic].latest,10);
 const invalid={...m,assessment:null,evidence:{[m.topic]:{latest:11,best:11,rounds:1,seed:0},invalid:{latest:1,best:1,rounds:1,seed:0}}};assert.deepEqual(parseMathCourse(invalid).evidence,{});
});

test('Grammar review recommendations remain independent per language, even after an earlier pass',async()=>{
 const {recordGrammarCheckpoint,grammarReviewLessons,nextGrammarLesson}=await import('../workshop/language-course.mjs');const {studyPlan}=await import('../workshop/model.mjs');
 const s=fresh(),p=s.learning.languages;
 for(const lang of COURSE_LANGUAGES){p.language=lang;const l=grammarRoute(lang)[0],good=l.checkpoint.map(q=>q.answer),bad=l.checkpoint.map(q=>q.options.find(v=>v!==q.answer));
 assert(!recordGrammarCheckpoint(p,l,good.slice(1)));assert(!p.grammar.evidence[l.id]);
 assert(recordGrammarCheckpoint(p,l,good));assert(recordGrammarCheckpoint(p,l,bad));assert(p.grammar.passed[l.id]);assert.equal(p.grammar.evidence[l.id].best,2);
 assert.deepEqual(grammarReviewLessons(p).map(v=>v.id),[l.id]);assert.equal(nextGrammarLesson(p).id,l.id);
 assert.equal(studyPlan(s,20001).find(v=>v.kind==='grammar').reason,'planGrammarReview');assert.deepEqual(parseProfile(JSON.stringify(s)).learning.languages.grammar,p.grammar);
 assert(recordGrammarCheckpoint(p,l,good));assert.equal(grammarReviewLessons(p).length,0);assert.equal(p.grammar.evidence[l.id].rounds,3);
 }
 const l=grammarRoute(p.language)[0];assert(!recordGrammarCheckpoint(p,grammarRoute('en')[0],['x','x']));const broken={...p,grammar:{passed:{},evidence:{[l.id]:{latest:1,best:2,rounds:1,missed:[0,0]},unknown:{latest:2,best:2,rounds:1,missed:[]}}}};assert.deepEqual(parseLanguageCourse(broken).grammar.evidence,{});
});

test('Extended grammar checkpoints: independent results, correction priority and old profile compatibility',async()=>{
 const {GRAMMAR_EXTENDED,extendedGrammarQuestions,recordExtendedGrammar,grammarReviewLessons}=await import('../workshop/language-course.mjs');const s=fresh(),p=s.learning.languages;
 assert.equal(Object.keys(GRAMMAR_EXTENDED).length,88);
 for(const lang of COURSE_LANGUAGES){p.language=lang;const lessons=grammarRoute(lang).filter(l=>extendedGrammarQuestions(l.id).length);assert.equal(lessons.length,grammarRoute(lang).length);for(const l of lessons){const qs=extendedGrammarQuestions(l.id);assert.equal(qs.length,4);assert.equal(new Set([...l.practice,...l.checkpoint,...qs].map(q=>q.sentence)).size,8);
 assert(recordExtendedGrammar(p,l.id,qs.map(q=>q.options.find(v=>v!==q.answer))));assert(grammarReviewLessons(p).some(v=>v.id===l.id));assert(!p.grammar.passed[l.id]);assert(!p.grammar.evidence[l.id]);assert(recordExtendedGrammar(p,l.id,qs.map(q=>q.answer)));assert(!grammarReviewLessons(p).some(v=>v.id===l.id));assert.equal(p.grammar.extended[l.id].best,4);}}
 assert.deepEqual(parseProfile(JSON.stringify(s)).learning.languages.grammar,p.grammar);assert.deepEqual(parseLanguageCourse({grammar:{passed:{'en-be':true}}}).grammar.extended,{});
});
