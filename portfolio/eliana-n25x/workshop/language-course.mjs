import {LANGUAGE_UNITS,LANGUAGE_CONTENT_INFO,GRAMMAR_LESSONS,DIALOGUE_LESSONS,GRAMMAR_EXTENDED} from './language-data.mjs';
export {LANGUAGE_UNITS,LANGUAGE_CONTENT_INFO,GRAMMAR_LESSONS,DIALOGUE_LESSONS,GRAMMAR_EXTENDED};
export const LANGUAGE_ITEMS=LANGUAGE_UNITS.flatMap(unit=>unit.items.map(item=>({...item,unit:unit.id})));
export const COURSE_MODES=['read','write','order','listen'];
export const COURSE_LANGUAGES=['de','en','ka','uk','ru','zh','es','fr','it','ja'];
export function meaningSource(target,chosen,ui){const source=chosen==='auto'?ui:chosen;return source!==target&&COURSE_LANGUAGES.includes(source)?source:target==='de'?'en':'de';}
function hash(value){let n=2166136261;for(const c of value)n=Math.imul(n^c.codePointAt(0),16777619)>>>0;return n||1;}
export function wordOrder(tokens,seed){const out=tokens.map((text,i)=>({text,i}));let n=hash(seed);for(let i=out.length-1;i>0;i--){n^=n<<13;n^=n>>>17;n^=n<<5;const j=(n>>>0)%(i+1);[out[i],out[j]]=[out[j],out[i]];}if(out.length>1&&out.every((v,i)=>v.i===i))[out[0],out[1]]=[out[1],out[0]];return out;}
export function freshLanguageCourse(){return {language:'en',unit:LANGUAGE_UNITS[0].id,index:0,mode:'read',source:'auto',done:{},review:[],schedule:{},grammar:{passed:{},evidence:{},extended:{}},dialogues:{passed:{}}};}
export function parseLanguageCourse(raw){const c=freshLanguageCourse();if(!raw||typeof raw!=='object')return c;if(COURSE_LANGUAGES.includes(raw.language))c.language=raw.language;if(LANGUAGE_UNITS.some(u=>u.id===raw.unit))c.unit=raw.unit;const unit=LANGUAGE_UNITS.find(u=>u.id===c.unit);if(Number.isInteger(raw.index)&&raw.index>=0&&raw.index<unit.items.length)c.index=raw.index;if(COURSE_MODES.includes(raw.mode))c.mode=raw.mode;if(['auto',...COURSE_LANGUAGES].includes(raw.source))c.source=raw.source;const itemIDs=new Set(LANGUAGE_ITEMS.map(i=>i.id)),validKey=k=>{const [lang,id,...rest]=k.split('/');return !rest.length&&COURSE_LANGUAGES.includes(lang)&&itemIDs.has(id);};for(const [k,v]of Object.entries(raw.done||{}))if(validKey(k)&&Number.isInteger(v)&&v>=1&&v<=15)c.done[k]=v;if(Array.isArray(raw.review))c.review=[...new Set(raw.review.filter(validReviewKey))].slice(-200);for(const [key,value] of Object.entries(raw.schedule||{})){if(validScheduleKey(key)&&value&&Number.isInteger(value.step)&&value.step>=0&&value.step<REVIEW_INTERVALS.length&&Number.isSafeInteger(value.due)&&value.due>=0&&value.due<=200000){c.schedule[key]={step:value.step,due:value.due,reset:value.reset===true};}}for(const lesson of GRAMMAR_LESSONS){const id=lesson.id,total=lesson.checkpoint.length;if(raw.grammar?.passed?.[id]===true)c.grammar.passed[id]=true;const v=raw.grammar?.evidence?.[id];if(v&&Array.isArray(v.missed)&&new Set(v.missed).size===v.missed.length&&v.missed.every(i=>Number.isInteger(i)&&i>=0&&i<total)&&Number.isInteger(v.latest)&&v.latest===total-v.missed.length&&Number.isInteger(v.best)&&v.best>=v.latest&&v.best<=total&&Number.isSafeInteger(v.rounds)&&v.rounds>=1&&v.rounds<=1000000){c.grammar.evidence[id]={latest:v.latest,best:v.best,rounds:v.rounds,missed:[...v.missed].sort((a,b)=>a-b)};if(v.best===total)c.grammar.passed[id]=true;}}for(const [id,qs] of Object.entries(GRAMMAR_EXTENDED)){const v=raw.grammar?.extended?.[id];if(v&&Array.isArray(v.missed)&&new Set(v.missed).size===v.missed.length&&v.missed.every(i=>Number.isInteger(i)&&i>=0&&i<qs.length)&&v.latest===qs.length-v.missed.length&&Number.isInteger(v.best)&&v.best>=v.latest&&v.best<=qs.length&&Number.isSafeInteger(v.rounds)&&v.rounds>=1&&v.rounds<=1000000)c.grammar.extended[id]={latest:v.latest,best:v.best,rounds:v.rounds,missed:[...v.missed].sort((a,b)=>a-b)};}
 for(const lang of COURSE_LANGUAGES)for(const lesson of DIALOGUE_LESSONS){const key=lang+'/'+lesson.id;if(raw.dialogues?.passed?.[key]===true)c.dialogues.passed[key]=true;}return c;}
export function normalizePhrase(text){return String(text).normalize('NFKC').toLocaleLowerCase().replace(/[’‘`]/g,"'").replace(/[\p{P}\p{S}]/gu,'').replace(/\s+/g,' ').trim();}
export function phraseMatches(actual,expected,language){const clean=s=>normalizePhrase(s).replace(language==='zh'||language==='ja'?/\s+/g:/$^/g,'');return clean(actual)===clean(expected);}
export function phraseTokens(text,language){if(['zh','ja'].includes(language)&&typeof Intl.Segmenter==='function')return [...new Intl.Segmenter(language,{granularity:'word'}).segment(text)].filter(v=>v.isWordLike).map(v=>v.segment);if(['zh','ja'].includes(language))return Array.from(text).filter(v=>!/[\p{P}\p{S}\s]/u.test(v));return text.split(/\s+/).map(v=>v.replace(/^[\p{P}]+|[\p{P}]+$/gu,'')).filter(Boolean);}
export function meaningChoices(item,source){const others=LANGUAGE_ITEMS.filter(i=>i.id!==item.id&&i.text[source]!==item.text[source]);const choices=[item,others[(LANGUAGE_ITEMS.findIndex(v=>v.id===item.id)+13)%others.length],others[(LANGUAGE_ITEMS.findIndex(v=>v.id===item.id)+37)%others.length]].filter(Boolean);const unique=[...new Map(choices.map(v=>[v.text[source],v])).values()];for(const v of others)if(unique.length<3&&!unique.some(i=>i.text[source]===v.text[source]))unique.push(v);const shift=hash(item.id+'|'+source)%unique.length;return unique.slice(shift).concat(unique.slice(0,shift));}
function validReviewKey(key){if(typeof key!=='string')return false;const [lang,mode,id,...rest]=key.split('|');return !rest.length&&COURSE_LANGUAGES.includes(lang)&&COURSE_MODES.includes(mode)&&LANGUAGE_ITEMS.some(i=>i.id===id);}
export function languageMistakes(course){return (course.review||[]).filter(key=>validReviewKey(key)&&key.startsWith(course.language+'|'));}
export function recordLanguage(course,item,correct){const reviewKey=[course.language,course.mode,item.id].join('|');if(correct){const key=course.language+'/'+item.id;course.done[key]=(course.done[key]||0)|(1<<COURSE_MODES.indexOf(course.mode));course.review=course.review.filter(v=>v!==reviewKey);}else if(!course.review.includes(reviewKey))course.review.push(reviewKey);course.review=course.review.slice(-200);}

// Spaced practice uses UTC day numbers and a small deterministic interval ladder.
// Existing completions remain valid; old profiles acquire scheduling as skills are practised again.
export const REVIEW_INTERVALS=Object.freeze([1,3,7,14,30]);
export const studyDay=(now=Date.now())=>Math.floor(now/86400000);
const coreModes=['read','order','write'];
function validScheduleKey(key){const [lang,mode,id,...rest]=key.split('|');return !rest.length&&COURSE_LANGUAGES.includes(lang)&&coreModes.includes(mode)&&LANGUAGE_ITEMS.some(v=>v.id===id);}
export function scheduleLanguage(course,item,ok,{assisted=false,day=studyDay()}={}){
 if(!coreModes.includes(course.mode)||!Number.isSafeInteger(day)||day<0||day>199970)return;
 const key=[course.language,course.mode,item.id].join('|');if(!validScheduleKey(key))return;
 const schedule=course.schedule??=( {} ),prev=schedule[key];
 if(!ok||assisted){schedule[key]={step:0,due:day,reset:true};return;}
 // Early practice never increases the interval or postpones an already scheduled review.
 if(prev&&prev.due>day)return;
 const step=prev&&!prev.reset?Math.min(prev.step+1,REVIEW_INTERVALS.length-1):0;
 schedule[key]={step,due:day+REVIEW_INTERVALS[step],reset:false};
}
export function dueLanguageReviews(course,day=studyDay()){
 return Object.entries(course.schedule||{}).filter(([key,v])=>key.startsWith(course.language+'|')&&v.due<=day&&validScheduleKey(key)).sort((a,b)=>a[1].due-b[1].due||a[0].localeCompare(b[0])).map(([key])=>key);
}
// Skill-based route: selected-language mistakes, due reviews, then unfinished core skills. Listening is optional.
export function nextLanguageExercise(course,day=studyDay()){const language=course.language;const due=dueLanguageReviews(course,day);for(const entry of [...languageMistakes(course),...due]){const [lang,mode,id]=entry.split('|');if(lang!==language||!['read','order','write'].includes(mode))continue;const item=LANGUAGE_ITEMS.find(i=>i.id===id);if(item)return {unit:item.unit,index:LANGUAGE_UNITS.find(u=>u.id===item.unit).items.findIndex(i=>i.id===id),mode,review:true};}for(const u of LANGUAGE_UNITS)for(const [index,item] of u.items.entries())for(const mode of ['read','order','write'])if(!((course.done[language+'/'+item.id]||0)&(1<<COURSE_MODES.indexOf(mode))))return {unit:u.id,index,mode,review:false};return null;}

export function grammarLesson(id){return GRAMMAR_LESSONS.find(v=>v.id===id);}
export function grammarOptions(question,seed){return wordOrder(question.options,seed).map(v=>v.text);}
export function gradeGrammar(lesson,answers){if(!lesson||!Array.isArray(answers)||answers.length!==lesson.checkpoint.length)return null;return answers.reduce((n,v,i)=>n+Number(v===lesson.checkpoint[i].answer),0);}

export function grammarRoute(language){return GRAMMAR_LESSONS.filter(v=>v.language===language).sort((a,b)=>a.stage-b.stage);}

export function dialogueOptions(lesson,language){const t=lesson?.turns?.[language];return t?wordOrder(t.options,lesson.id+'|'+language).map(v=>v.text):[];}
export function gradeDialogue(lesson,language,answer){return typeof answer==='string'&&lesson?.turns?.[language]?.answer===answer;}

 // Store only completed, valid checkpoints. Earlier passed flags stay intact.
 export function recordGrammarCheckpoint(course,lesson,answers){
 const canonical=grammarLesson(lesson?.id);
 if(!canonical||canonical.language!==course.language||!Array.isArray(answers)||answers.length!==canonical.checkpoint.length||!answers.every((v,i)=>canonical.checkpoint[i].options.includes(v)))return false;
 const id=canonical.id,total=canonical.checkpoint.length,missed=canonical.checkpoint.flatMap((q,i)=>answers[i]===q.answer?[]:[i]),latest=total-missed.length,prev=course.grammar.evidence[id];
 course.grammar.evidence[id]={latest,best:Math.max(latest,prev?.best??0),rounds:Math.min((prev?.rounds??0)+1,1000000),missed};
 if(latest===total)course.grammar.passed[id]=true;
 return true;
 }
 export function grammarReviewLessons(course){
 return grammarRoute(course.language).filter(v=>course.grammar.evidence[v.id]?.missed.length>0||course.grammar.extended[v.id]?.missed.length>0);
 }
 export function nextGrammarLesson(course){
 const list=grammarRoute(course.language);
 return grammarReviewLessons(course)[0]||list.find(v=>!course.grammar.passed[v.id])||null;
 }

export function extendedGrammarQuestions(id){return GRAMMAR_EXTENDED[id]||[];}
export function recordExtendedGrammar(course,id,answers){
 const lesson=grammarLesson(id),qs=extendedGrammarQuestions(id);
 if(!lesson||lesson.language!==course.language||!qs.length||!Array.isArray(answers)||answers.length!==qs.length||!answers.every((v,i)=>qs[i].options.includes(v)))return false;
 const missed=qs.flatMap((q,i)=>answers[i]===q.answer?[]:[i]),latest=qs.length-missed.length,prev=course.grammar.extended[id];
 course.grammar.extended[id]={latest,best:Math.max(latest,prev?.best??0),rounds:Math.min((prev?.rounds??0)+1,1000000),missed};return true;
}
