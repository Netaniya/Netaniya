// Fast source-only smoke suite: no browser, WebGL, npm packages or build artifacts.
import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSE_LANGUAGES,LANGUAGE_ITEMS,LANGUAGE_UNITS,freshLanguageCourse,parseLanguageCourse,meaningSource,meaningChoices,phraseMatches,phraseTokens,recordLanguage,scheduleLanguage,dueLanguageReviews,nextLanguageExercise,grammarRoute,gradeGrammar,languageMistakes} from '../workshop/language-course.mjs';
import {PIANO_LESSONS,RHYTHM_LESSONS,pianoPracticeStep,gradeRhythm,parsePiano,freshPiano,makeMidi,renderScoreWav,CHORD_TYPES,CHORD_LESSONS,chordNotes,makeChordRound,gradeEarRound,HARMONY_LESSONS,harmonyNotes,gradeHarmony} from '../workshop/piano-score.mjs';

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
 assert.equal(COURSE_LANGUAGES.length,10);assert.equal(phrases,COURSE_LANGUAGES.length*LANGUAGE_ITEMS.length);assert.equal(skills,phrases*3);assert(questions>=352);
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

test('Chord qualities: independent semitone formulas, transposition, valid distractors and progress',()=>{
 const expected=[[0,4,7],[0,3,7],[0,3,6],[0,4,8],[0,2,7],[0,5,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]];
 assert.equal(CHORD_TYPES.length,9);assert.equal(CHORD_LESSONS.length,4);
 for(let i=0;i<expected.length;i++)for(const root of [48,60,71])assert.deepEqual(chordNotes(i,root),expected[i].map(n=>root+n));
 assert.equal(chordNotes(-1,60),null);assert.equal(chordNotes(6,108),null);
 const p=freshPiano();for(const l of CHORD_LESSONS){
 for(const seed of [0,1,42,4294967295]){const round=makeChordRound(l.id,seed);
 assert.deepEqual(round,makeChordRound(l.id,seed));assert.deepEqual([...new Set(round.map(q=>q.interval))].sort((a,b)=>a-b),l.types);
 for(const q of round){assert(q.options.includes(q.interval));assert.equal(new Set(q.options).size,q.options.length);assert(q.options.every(v=>l.types.includes(v)));assert(chordNotes(q.interval,q.root).every(m=>m>=21&&m<=108));}
 const answers=round.map(q=>q.interval);assert(gradeEarRound(round,answers).passed);answers[0]=round[0].options.find(v=>v!==answers[0]);assert(!gradeEarRound(round,answers).passed);}
 p.practice.chordPassed[l.id]=true;
 }assert.deepEqual(parsePiano(p),p);delete p.practice.chordPassed;assert.deepEqual(parsePiano(p).practice.chordPassed,{});p.practice.chordPassed={unknown:true,'chord-basic':'true'};assert.deepEqual(parsePiano(p).practice.chordPassed,{});
});

test('Harmony: reference chord voicings, inversions, rejection and profile migration',()=>{
 const expected=[[[60,64,67],[65,69,72],[67,71,74],[60,64,67]],[[55,59,62],[62,66,69],[64,67,71],[60,64,67]],[[57,60,64],[62,65,69],[52,56,59,62],[57,60,64]],[[60,64,67],[64,67,72],[67,72,76],[60,64,67]],[[62,65,69],[55,58,62],[57,61,64,67],[62,65,69]],[[62,65,69,72],[67,71,74,77],[60,64,67,71],[60,64,67]]];
 assert.equal(HARMONY_LESSONS.length,6);const p=freshPiano();
 HARMONY_LESSONS.forEach((l,i)=>{l.steps.forEach((q,j)=>{const notes=harmonyNotes(q);assert.deepEqual(notes,expected[i][j]);assert(notes.every(m=>m>=(l.octave+1)*12&&m<(l.octave+3)*12));assert(gradeHarmony(q,[...notes].reverse()));assert(!gradeHarmony(q,notes.slice(1)));assert(!gradeHarmony(q,[...notes,notes[0]]));assert(!gradeHarmony(q,notes.map(m=>m+12)));});p.practice.harmonyPassed[l.id]=true;});
 assert.deepEqual(parsePiano(p),p);delete p.practice.harmonyPassed;assert.deepEqual(parsePiano(p).practice.harmonyPassed,{});p.practice.harmonyPassed={unknown:true,'harmony-c':'true'};assert.deepEqual(parsePiano(p).practice.harmonyPassed,{});
});

test('All ten translation-source languages: distinct choices, persistence and collision safety',()=>{let choiceSets=0,pairs=0;for(const target of COURSE_LANGUAGES)for(const source of COURSE_LANGUAGES){const p=freshLanguageCourse();p.language=target;p.source=source;assert.equal(parseLanguageCourse(p).source,source);assert.equal(meaningSource(target,source,'de'),source===target?(target==='de'?'en':'de'):source);pairs++;}for(const source of COURSE_LANGUAGES)for(const item of LANGUAGE_ITEMS){const choices=meaningChoices(item,source);assert.equal(choices.length,3);assert.equal(new Set(choices.map(q=>q.text[source])).size,3);assert(choices.some(q=>q.id===item.id));choiceSets++;}console.log(JSON.stringify({pairs,choiceSets}));});

test('Math evidence across every topic and ten-question retest seeds',async()=>{
 const {MATH_TOPICS,freshMathCourse,parseMathCourse,startMathAssessment,recordMathAssessmentAnswer,mathEvidence}=await import('../workshop/math-course.mjs');
 const p=freshMathCourse();let answers=0;
 for(const t of MATH_TOPICS){p.topic=t.id;for(let seed=0;seed<256;seed++){assert(startMathAssessment(p,seed));const next=new Set(Array.from({length:10},(_,i)=>(seed+16+i*73)%256));assert.equal(new Set(p.assessment.indices).size,10);assert(p.assessment.indices.every(i=>!next.has(i)));}for(const [round,seed] of [0,16].entries()){assert(startMathAssessment(p,seed));for(let i=0;i<10;i++){assert(recordMathAssessmentAnswer(p,i<5+round*3));assert(!recordMathAssessmentAnswer(p,true));if(i<9)p.assessment.answered=false;answers++;}}
 assert.deepEqual(p.evidence[t.id],{latest:8,best:8,rounds:2,seed:16});}
 assert.equal(mathEvidence(p).filter(t=>t.result).length,MATH_TOPICS.length);assert.deepEqual(parseMathCourse(p).evidence,p.evidence);console.log(JSON.stringify({answers,topics:MATH_TOPICS.length}));
});

test('All 88 grammar checkpoints: evidence, missed questions, language isolation and migration',async()=>{
 const {GRAMMAR_LESSONS,recordGrammarCheckpoint,grammarReviewLessons,nextGrammarLesson}=await import('../workshop/language-course.mjs');const p=freshLanguageCourse();
 for(const l of GRAMMAR_LESSONS){p.language=l.language;const good=l.checkpoint.map(q=>q.answer),bad=l.checkpoint.map(q=>q.options.find(v=>v!==q.answer));assert(!recordGrammarCheckpoint(p,l,[]));assert(recordGrammarCheckpoint(p,l,bad));assert.equal(p.grammar.evidence[l.id].latest,0);assert(grammarReviewLessons(p).some(v=>v.id===l.id));assert(recordGrammarCheckpoint(p,l,good));assert.equal(p.grammar.evidence[l.id].best,l.checkpoint.length);assert(!grammarReviewLessons(p).some(v=>v.id===l.id));}
 assert.deepEqual(parseLanguageCourse(p).grammar,p.grammar);assert.equal(Object.keys(p.grammar.evidence).length,88);assert.deepEqual(parseLanguageCourse({grammar:{passed:p.grammar.passed}}).grammar.evidence,{});
});

test('Extended grammar bank has 80 original distinct prompts across all languages, scored separately',async()=>{const {GRAMMAR_LESSONS,GRAMMAR_EXTENDED,recordExtendedGrammar,grammarReviewLessons}=await import('../workshop/language-course.mjs');const p=freshLanguageCourse();let questions=0;for(const [id,qs] of Object.entries(GRAMMAR_EXTENDED)){const l=GRAMMAR_LESSONS.find(x=>x.id===id);assert(l);p.language=l.language;assert.equal(qs.length,4);assert.equal(new Set([...l.practice,...l.checkpoint,...qs].map(q=>q.sentence)).size,8);for(const q of qs){assert.equal(new Set(q.options).size,3);assert(q.options.includes(q.answer));questions++;}assert(!recordExtendedGrammar(p,id,[]));assert(recordExtendedGrammar(p,id,qs.map(q=>q.options.find(v=>v!==q.answer))));assert(grammarReviewLessons(p).some(v=>v.id===id));assert(recordExtendedGrammar(p,id,qs.map(q=>q.answer)));assert(!grammarReviewLessons(p).some(v=>v.id===id));}assert.equal(questions,80);assert.deepEqual(parseLanguageCourse(p).grammar,p.grammar);});
