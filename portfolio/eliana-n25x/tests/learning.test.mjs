import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {MATH_TOPICS,MATH_VARIANTS,courseTask,checkCourseAnswer,freshMathCourse,parseMathCourse,recordMath} from '../workshop/math-course.mjs';
import {createMathClassroom} from '../workshop/math-classroom.mjs';
import {fresh,parseProfile,reward} from '../workshop/model.mjs';
import {translate} from '../workshop/i18n.mjs';
import {freshScore,validateScore,noteName,midiFrequency,makeMidi,renderScoreWav} from '../workshop/piano-score.mjs';
import {createPiano} from '../workshop/piano.mjs';
import {LANGUAGE_UNITS,LANGUAGE_ITEMS,COURSE_LANGUAGES,phraseTokens,phraseMatches,meaningChoices,parseLanguageCourse} from '../workshop/language-course.mjs';
import {createLanguageClassroom} from '../workshop/language-classroom.mjs';
import {updateProject} from '../workshop/model.mjs';
test('Mathematics: all 12,288 parameter variants are finite, uniquely presented within their topic, and accept exact fractions',()=>{
 assert.equal(MATH_TOPICS.length,48);assert.equal(MATH_VARIANTS,12288);
 for(const topic of MATH_TOPICS){const seen=new Set();for(const lang of ['de','en','ru','uk'])assert(topic.title[lang]&&topic.rule[lang]);for(let i=0;i<256;i++){const t=courseTask(topic.id,i);assert(Number.isFinite(t.answer),t.id);assert(checkCourseAnswer(t,t.display),t.id);assert(!checkCourseAnswer(t,String(t.answer+1)),t.id);assert(!checkCourseAnswer(t,'window.location=1'),t.id);assert(!seen.has(t.expression),t.id);seen.add(t.expression);assert(t.steps.length);}}
 assert.throws(()=>courseTask('add',256));assert.throws(()=>courseTask('missing',0));
});
test('Language lessons: 120 distinct meanings have all ten scripts, four explanations and usable reading/writing/order exercises',()=>{
 assert.equal(LANGUAGE_UNITS.length,12);assert.equal(LANGUAGE_ITEMS.length,120);assert.equal(new Set(LANGUAGE_ITEMS.map(i=>i.id)).size,120);
 for(const u of LANGUAGE_UNITS)for(const lang of ['de','en','ru','uk'])assert(u.title[lang]&&u.note[lang]);
 for(const item of LANGUAGE_ITEMS)for(const lang of COURSE_LANGUAGES){assert(item.text[lang]?.length>2,item.id+':'+lang);assert(phraseMatches(item.text[lang],item.text[lang],lang));const tokens=phraseTokens(item.text[lang],lang);assert(tokens.length);assert(phraseMatches(tokens.join(' '),item.text[lang],lang),item.id+':'+lang);}
 for(const item of LANGUAGE_ITEMS)for(const lang of ['de','en','ru','uk']){const choices=meaningChoices(item,lang);assert.equal(choices.length,3);assert.equal(new Set(choices.map(v=>v.text[lang])).size,3);assert(choices.some(v=>v.id===item.id));}
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
 const expected=[4,2,7,2,4,2,8,12,1,2/3,2,4/3,.4,.2,.04,2,.4,50,19.6,20.4,0,0,4,-2,3,2,2,2,2,16,2,4,8,2,4,12,4,8,2,4,2,8/3,.5,8,2,2,4,64];
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
 controller.click({dataset:{m:'assessment'}});for(let i=0;i<10;i++){answer(courseTask(s.learning.math.topic,s.learning.math.index).display);if(i<9)controller.click({dataset:{m:'next'}});}assert.equal(s.learning.math.assessment.answers.filter(Boolean).length,10);assert(document.getElementById('content').textContent.includes('10 / 10'));assert.equal(s.points,160);assert.equal(document.getElementById('course-answer-form'),null);assert.equal(reward(s,'course-assess:add',30),0);
 for(const lang of ['de','en','ru','uk']){s.lang=lang;api.render();assert(document.getElementById('content').textContent.includes(translate(lang,'mathCourse')));assert(!document.getElementById('content').textContent.includes('undefined'));}assert(saves>10);
 }finally{globalThis.document=previous;}
});
