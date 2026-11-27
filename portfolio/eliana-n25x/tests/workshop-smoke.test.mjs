// Fast source-only smoke suite: no browser, WebGL, npm packages or build artifacts.
import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_LANGUAGES,LANGUAGE_ITEMS,LANGUAGE_UNITS,freshLanguageCourse,phraseMatches,phraseTokens,recordLanguage,scheduleLanguage,dueLanguageReviews,nextLanguageExercise,grammarRoute,gradeGrammar,languageMistakes} from '../workshop/language-course.mjs';
import {PIANO_LESSONS,RHYTHM_LESSONS,pianoPracticeStep,gradeRhythm,parsePiano,freshPiano,makeMidi,renderScoreWav} from '../workshop/piano-score.mjs';

test('Every language: word-order roundtrip, guided progression, scheduled review and grammar',()=>{
 let skills=0,questions=0,phrases=0;
 for(const lang of COURSE_LANGUAGES){
  const c=freshLanguageCourse();c.language=lang;
  for(const item of LANGUAGE_ITEMS){
   assert(phraseMatches(phraseTokens(item.text[lang],lang).join(' '),item.text[lang],lang),lang+'/'+item.id);phrases++;
  }
  for(let i=0;i<LANGUAGE_ITEMS.length*3;i++){
   const n=nextLanguageExercise(c,20000);assert(n&&!n.review);
   const item=LANGUAGE_UNITS.find(u=>u.id===n.unit).items[n.index];c.mode=n.mode;recordLanguage(c,item,true);scheduleLanguage(c,item,true,{day:20000});skills++;
  }
  assert.equal(nextLanguageExercise(c,20000),null);assert.equal(dueLanguageReviews(c,20001).length,LANGUAGE_ITEMS.length*3);
  c.review=['de|read|'+LANGUAGE_ITEMS[0].id,lang+'|write|'+LANGUAGE_ITEMS[0].id];
  assert(languageMistakes(c).every(k=>k.startsWith(lang+'|')));
  for(const lesson of grammarRoute(lang)){
   for(const q of [...lesson.practice,...lesson.checkpoint]){assert(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);questions++;}
   assert.equal(gradeGrammar(lesson,lesson.checkpoint.map(q=>q.answer)),lesson.checkpoint.length);
  }
 }
 assert.equal(COURSE_LANGUAGES.length,10);assert.equal(phrases,COURSE_LANGUAGES.length*LANGUAGE_ITEMS.length);assert.equal(skills,phrases*3);assert(questions>=320);
 console.log(JSON.stringify({skills,phrases,grammarQuestions:questions}));
});

test('Piano: note sequences, original MIDI/WAV, timing and saved progress',()=>{
 const profile=freshPiano();let steps=0,exports=0,rhythmChecks=0;
 for(const lesson of PIANO_LESSONS){
  let i=0;const first=(lesson.octave+1)*12;
  for(const midi of lesson.notes){assert(midi>=first&&midi<first+24);assert.equal(pianoPracticeStep(lesson,i,midi+1).index,i);const r=pianoPracticeStep(lesson,i,midi);assert(r.correct);assert.equal(r.index,++i);assert.equal(r.complete,i===lesson.notes.length);steps+=2;}
  const s={tempo:120,bars:Math.max(4,Math.ceil(lesson.notes.length/4)),tracks:[{name:'Exercise',instrument:'piano',notes:lesson.notes.map((midi,i)=>({midi,beat:i,duration:.5,velocity:.6}))}]};
  assert.equal(String.fromCharCode(...makeMidi(s).slice(0,4)),'MThd');const wav=renderScoreWav(s);assert.equal(String.fromCharCode(...new Uint8Array(wav,0,4)),'RIFF');assert(new Int16Array(wav,44).some(v=>v!==0));exports+=2;profile.practice.passed[lesson.id]=true;
 }
 for(const lesson of RHYTHM_LESSONS){
  const ideal=lesson.beats.map(b=>1000+b*60000/lesson.bpm);
  assert(gradeRhythm(lesson,ideal).passed);assert(gradeRhythm(lesson,ideal.map((t,i)=>t+(i%2?40:0))).passed);
  assert(!gradeRhythm(lesson,ideal.map((t,i)=>t+(i===ideal.length-1?250:0))).passed);
  assert.equal(gradeRhythm(lesson,ideal.slice(1)),null);assert.equal(gradeRhythm(lesson,ideal.map(()=>0)),null);assert.equal(gradeRhythm(lesson,ideal.map((t,i)=>i===1?NaN:t)),null);rhythmChecks+=6;profile.practice.rhythmPassed[lesson.id]=true;
 }
 assert.deepEqual(parsePiano(profile),profile);assert(PIANO_LESSONS.length>=24);assert(RHYTHM_LESSONS.length>=8);
 console.log(JSON.stringify({steps,exports,rhythmChecks}));
});
