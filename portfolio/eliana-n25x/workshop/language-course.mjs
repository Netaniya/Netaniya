import {LANGUAGE_UNITS,LANGUAGE_CONTENT_INFO} from './language-data.mjs';
export {LANGUAGE_UNITS,LANGUAGE_CONTENT_INFO};
export const LANGUAGE_ITEMS=LANGUAGE_UNITS.flatMap(unit=>unit.items.map(item=>({...item,unit:unit.id})));
export const COURSE_MODES=['read','write','order','listen'];
export const COURSE_LANGUAGES=['de','en','ka','uk','ru','zh','es','fr','it','ja'];
export function meaningSource(target,chosen,ui){const source=chosen==='auto'?ui:chosen;return source!==target&&['de','en','ru','uk'].includes(source)?source:target==='de'?'en':'de';}
function hash(value){let n=2166136261;for(const c of value)n=Math.imul(n^c.codePointAt(0),16777619)>>>0;return n||1;}
export function wordOrder(tokens,seed){const out=tokens.map((text,i)=>({text,i}));let n=hash(seed);for(let i=out.length-1;i>0;i--){n^=n<<13;n^=n>>>17;n^=n<<5;const j=(n>>>0)%(i+1);[out[i],out[j]]=[out[j],out[i]];}if(out.length>1&&out.every((v,i)=>v.i===i))[out[0],out[1]]=[out[1],out[0]];return out;}
export function freshLanguageCourse(){return {language:'en',unit:LANGUAGE_UNITS[0].id,index:0,mode:'read',source:'auto',done:{},review:[],schedule:{}};}
export function parseLanguageCourse(raw){const c=freshLanguageCourse();if(!raw||typeof raw!=='object')return c;if(COURSE_LANGUAGES.includes(raw.language))c.language=raw.language;if(LANGUAGE_UNITS.some(u=>u.id===raw.unit))c.unit=raw.unit;const unit=LANGUAGE_UNITS.find(u=>u.id===c.unit);if(Number.isInteger(raw.index)&&raw.index>=0&&raw.index<unit.items.length)c.index=raw.index;if(COURSE_MODES.includes(raw.mode))c.mode=raw.mode;if(['auto','de','en','ru','uk'].includes(raw.source))c.source=raw.source;const itemIDs=new Set(LANGUAGE_ITEMS.map(i=>i.id)),validKey=k=>{const [lang,id,...rest]=k.split('/');return !rest.length&&COURSE_LANGUAGES.includes(lang)&&itemIDs.has(id);};for(const [k,v]of Object.entries(raw.done||{}))if(validKey(k)&&Number.isInteger(v)&&v>=1&&v<=15)c.done[k]=v;if(Array.isArray(raw.review))c.review=raw.review.filter(k=>typeof k==='string'&&COURSE_LANGUAGES.includes(k.split('|')[0])&&COURSE_MODES.includes(k.split('|')[1])&&LANGUAGE_ITEMS.some(i=>i.id===k.split('|')[2])).slice(-200);for(const [key,value] of Object.entries(raw.schedule||{})){if(validScheduleKey(key)&&value&&Number.isInteger(value.step)&&value.step>=0&&value.step<REVIEW_INTERVALS.length&&Number.isSafeInteger(value.due)&&value.due>=0&&value.due<=200000){c.schedule[key]={step:value.step,due:value.due,reset:value.reset===true};}}return c;}
export function normalizePhrase(text){return String(text).normalize('NFKC').toLocaleLowerCase().replace(/[’‘`]/g,"'").replace(/[\p{P}\p{S}]/gu,'').replace(/\s+/g,' ').trim();}
export function phraseMatches(actual,expected,language){const clean=s=>normalizePhrase(s).replace(language==='zh'||language==='ja'?/\s+/g:/$^/g,'');return clean(actual)===clean(expected);}
export function phraseTokens(text,language){if(['zh','ja'].includes(language)&&typeof Intl.Segmenter==='function')return [...new Intl.Segmenter(language,{granularity:'word'}).segment(text)].filter(v=>v.isWordLike).map(v=>v.segment);if(['zh','ja'].includes(language))return Array.from(text).filter(v=>!/[\p{P}\p{S}\s]/u.test(v));return text.split(/\s+/).map(v=>v.replace(/^[\p{P}]+|[\p{P}]+$/gu,'')).filter(Boolean);}
export function meaningChoices(item,source){const others=LANGUAGE_ITEMS.filter(i=>i.id!==item.id&&i.text[source]!==item.text[source]);const choices=[item,others[(LANGUAGE_ITEMS.findIndex(v=>v.id===item.id)+13)%others.length],others[(LANGUAGE_ITEMS.findIndex(v=>v.id===item.id)+37)%others.length]].filter(Boolean);const unique=[...new Map(choices.map(v=>[v.text[source],v])).values()];for(const v of others)if(unique.length<3&&!unique.some(i=>i.text[source]===v.text[source]))unique.push(v);const shift=hash(item.id+'|'+source)%unique.length;return unique.slice(shift).concat(unique.slice(0,shift));}
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
export function nextLanguageExercise(course,day=studyDay()){const language=course.language;const due=dueLanguageReviews(course,day);for(const entry of [...course.review,...due]){const [lang,mode,id]=entry.split('|');if(lang!==language||!['read','order','write'].includes(mode))continue;const item=LANGUAGE_ITEMS.find(i=>i.id===id);if(item)return {unit:item.unit,index:LANGUAGE_UNITS.find(u=>u.id===item.unit).items.findIndex(i=>i.id===id),mode,review:true};}for(const u of LANGUAGE_UNITS)for(const [index,item] of u.items.entries())for(const mode of ['read','order','write'])if(!((course.done[language+'/'+item.id]||0)&(1<<COURSE_MODES.indexOf(mode))))return {unit:u.id,index,mode,review:false};return null;}
