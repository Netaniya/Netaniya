import {MATH_TOPICS,MATH_VARIANTS,VARIANTS_PER_TOPIC,courseTask,checkCourseAnswer,recordMath} from './math-course.mjs';
export function createMathClassroom(api){
 const {tr,esc,save,award,navigate,toast}=api,$=id=>document.getElementById(id),state=()=>api.getState(),c=()=>state().learning.math,l=v=>v[state().lang];
 let feedback='',showAnswer=false,checked=false;
 const b=(action,label,style='secondary',extra='')=>'<button type="button" data-m="'+action+'" class="'+style+'" '+extra+'>'+esc(label)+'</button>';
 const topic=()=>MATH_TOPICS.find(t=>t.id===c().topic),task=()=>courseTask(c().topic,c().index);
 function reset(){feedback='';showAnswer=false;checked=false;}
 function taskHTML(t,active=false){return (t.question?'<p class="help">'+esc(l(t.question))+'</p>':'')+'<div class="exercise" '+(active?'id="course-exercise"':'')+'>'+esc(t.expression)+'</div>';}
 function stepsHTML(t){return '<ol class="worked-steps">'+t.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>';}
 function render(){
  const p=c(),t=topic(),q=task(),done=p.done[t.id]?.length||0,ex=courseTask(t.id,(p.index+127)%256),exam=p.assessment,finished=exam&&exam.answers.length===10;checked=Boolean(exam?.answered);
  return b('back','← '+tr('learn'),'back-link')+'<h2>'+esc(tr('mathCourse'))+'</h2><p class="help">'+esc(tr('mathInventory',{topics:MATH_TOPICS.length,n:MATH_VARIANTS}))+'</p><div class="course-stats"><span><b>'+Object.values(p.done).reduce((n,v)=>n+v.length,0)+'</b>'+esc(tr('solved'))+'</span><span><b>'+p.mistakes.length+'</b>'+esc(tr('reviewQueue'))+'</span><span><b>'+Math.round(p.attempts?p.correct/p.attempts*100:0)+'%</b>'+esc(tr('accuracy'))+'</span></div><label for="math-topic">'+esc(tr('chooseTopic'))+'</label><select id="math-topic">'+MATH_TOPICS.map(v=>'<option value="'+v.id+'" '+(v.id===t.id?'selected':'')+'>'+v.grade+' · '+esc(l(v.title))+' ('+(p.done[v.id]?.length||0)+'/'+VARIANTS_PER_TOPIC+')</option>').join('')+'</select><h3>'+esc(l(t.title))+'</h3><p class="help">'+esc(tr('topicProgress',{n:done,total:VARIANTS_PER_TOPIC}))+'</p><progress aria-label="'+esc(tr('progress'))+'" max="256" value="'+done+'"></progress><div class="buttons">'+b('practice',tr('practice'),exam?'outline':'primary')+b('assessment',tr('assessment'),exam?'primary':'outline')+b('review',tr('reviewMistakes'),'outline',p.mistakes.length?'':'disabled')+'</div>'+
   (finished?'<section class="panel"><h3>'+esc(tr('assessmentResult',{n:exam.answers.filter(Boolean).length}))+'</h3><p class="help">'+esc(tr(exam.answers.filter(Boolean).length>=8?'assessmentPass':'assessmentReview'))+'</p>'+b('practice',tr('continue'),'primary')+'</section>':(exam?'':'<details class="panel" id="math-lesson" open><summary>'+esc(tr('lessonAndExample'))+'</summary><p>'+esc(l(t.rule))+'</p>'+taskHTML(ex)+stepsHTML(ex)+'</details>')+'<section class="panel"><div class="eyebrow">'+esc(exam?tr('assessmentStep',{n:exam.answers.length+1}):tr('variantNumber',{n:p.index+1}))+'</div>'+taskHTML(q,true)+'<form id="course-answer-form" class="answer-row"><input id="course-answer" aria-label="'+esc(tr('answer'))+'" maxlength="80" autocomplete="off" inputmode="decimal" '+(exam&&checked?'disabled':'')+'><button type="submit" class="primary" '+(exam&&checked?'disabled':'')+'>'+esc(tr('check'))+'</button></form><p class="help">'+esc(tr('numericAnswerHelp'))+'</p><p id="course-feedback" class="feedback" role="status">'+esc(feedback)+'</p>'+(showAnswer?'<div class="hint-box"><b>'+esc(tr('correctAnswer'))+': '+esc(q.display)+'</b>'+stepsHTML(q)+'</div>':'')+'<div class="buttons">'+(exam?'':b('hint',tr('showSolution'),'outline'))+b('next',tr('next'),'secondary',exam&&!checked?'disabled':'')+'</div></section>')+'<p class="help">'+esc(tr('mathScopeNote'))+'</p>';
 }
 function refresh(){api.render();}
 function next(){const p=c(),exam=p.assessment;if(exam){if(!checked)return;if(exam.answers.length<10)p.index=exam.indices[exam.answers.length];exam.answered=false;}else p.index=(p.index+1)%256;reset();save();refresh();}
 function click(button){const action=button.dataset.m;if(!action)return false;const p=c();
  if(action==='back')navigate('learn');
  else if(action==='practice'){p.assessment=null;reset();save();refresh();}
  else if(action==='assessment'){const seed=p.index;p.assessment={topic:p.topic,indices:Array.from({length:10},(_,i)=>(seed+i*73)%256),answers:[],answered:false};reset();save();refresh();}
  else if(action==='review'){const entry=p.mistakes[0];if(entry){const [id,index]=entry.split(':');p.topic=id;p.index=+index;p.assessment=null;reset();save();refresh();}}
  else if(action==='hint'){showAnswer=true;refresh();}
  else if(action==='next')next();
  return true;
 }
 function change(e){if(e.id!=='math-topic')return false;const p=c();if(MATH_TOPICS.some(t=>t.id===e.value)){p.topic=e.value;p.index=0;p.assessment=null;reset();save();refresh();}return true;}
 function submit(event){if(event.target.id!=='course-answer-form')return false;event.preventDefault();const p=c();if(checked&&p.assessment)return true;const q=task(),ok=checkCourseAnswer(q,$('course-answer').value);recordMath(p,q,ok);if(p.assessment){p.assessment.answers.push(ok);p.assessment.answered=true;checked=true;if(p.assessment.answers.length===10&&p.assessment.answers.filter(Boolean).length>=8)award('course-assess:'+p.topic,30);}feedback=tr(ok?'correct':'wrong');showAnswer=true;if(ok){const n=award(q.id,5);if(n)feedback+=' '+tr('earned',{n});}else api.audio.cue(false);save();refresh();return true;}
 return {render,click,change,submit,reset};
}
