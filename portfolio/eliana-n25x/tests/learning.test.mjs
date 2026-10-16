import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {MATH_TOPICS,MATH_VARIANTS,courseTask,checkCourseAnswer,freshMathCourse,parseMathCourse,recordMath} from '../workshop/math-course.mjs';
import {createMathClassroom} from '../workshop/math-classroom.mjs';
import {fresh,parseProfile,reward} from '../workshop/model.mjs';
import {translate} from '../workshop/i18n.mjs';
test('Mathematics: all 12,288 parameter variants are finite, uniquely presented within their topic, and accept exact fractions',()=>{
 assert.equal(MATH_TOPICS.length,48);assert.equal(MATH_VARIANTS,12288);
 for(const topic of MATH_TOPICS){const seen=new Set();for(const lang of ['de','en','ru','uk'])assert(topic.title[lang]&&topic.rule[lang]);for(let i=0;i<256;i++){const t=courseTask(topic.id,i);assert(Number.isFinite(t.answer),t.id);assert(checkCourseAnswer(t,t.display),t.id);assert(!checkCourseAnswer(t,String(t.answer+1)),t.id);assert(!checkCourseAnswer(t,'window.location=1'),t.id);assert(!seen.has(t.expression),t.id);seen.add(t.expression);assert(t.steps.length);}}
 assert.throws(()=>courseTask('add',256));assert.throws(()=>courseTask('missing',0));
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
