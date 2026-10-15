import {evaluate, datasetForLanguage} from './engine.mjs';
import {dictionaries, translate} from './i18n.mjs';
import {defaults, restoreState, switchLanguage} from './state.mjs';
const $=id=>document.getElementById(id);
const STORE='ai-quality-lab-v1';
let raw=null,storageAvailable=true;try{raw=localStorage.getItem(STORE)}catch{storageAvailable=false}
let state=restoreState(raw,DATASET),busy=false,activeCase=null,started=0,ticker=null,notice=null,externalUpdate=false;
let currentDataset=datasetForLanguage(DATASET,state.lang);
const t=(key,vars)=>translate(state.lang,key,vars);
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pct=n=>new Intl.NumberFormat(state.lang,{maximumFractionDigits:1}).format(n*100);
function persist(){try{localStorage.setItem(STORE,JSON.stringify({version:2,...state}))}catch{storageAvailable=false}}
function message(key,error=false){notice=key;$('message').textContent=key?t(key):'';$('message').classList.toggle('error',error)}
function invalidate(key){state.report=null;$('progress').value=0;$('elapsed').textContent=durationText(0);persist();render();message(key)}
function ruleText(rule){return t('rule_'+rule.op,{field:rule.field??'',value:rule.value===undefined?'':JSON.stringify(rule.value)})}
function status(row){if(!row)return '—';const key=row.passed?'pass':row.score>0?'partial':'fail';return `<span class="status ${key}">${row.passed?'✓':row.score>0?'◐':'×'} ${esc(t(key))}</span>`}
function renderGroups(){
  const names=['structure','accuracy','reliability'];
  $('groups').innerHTML=names.map(name=>{const cases=currentDataset.cases.filter(c=>c.category===name),n=cases.filter(c=>state.case_ids.includes(c.id)).length;return `<button class="group-button ${n===cases.length?'active':n?'partial':''}" data-group="${name}" aria-pressed="${n===cases.length?'true':n?'mixed':'false'}" ${busy?'disabled':''}><span class="group-check" aria-hidden="true">${n===cases.length?'✓':'−'}</span><span>${esc(t(name))}</span><small>${n}/${cases.length}</small></button>`}).join('');
  $('selectedCount').textContent=state.case_ids.length+' / '+currentDataset.cases.length;
  $('weightCount').textContent=currentDataset.cases.filter(c=>state.case_ids.includes(c.id)).reduce((s,c)=>s+c.weight,0);
}
function renderRows(){
  $('caseRows').innerHTML=currentDataset.cases.map(item=>{const selected=state.case_ids.includes(item.id);return `<tr><td><span class="case-name"><input type="checkbox" class="case-toggle" data-case="${item.id}" aria-label="${esc(item.id+' '+item.title)}" ${selected?'checked':''} ${busy?'disabled':''}><span class="case-id">${item.id}</span><strong>${esc(item.title)}</strong></span></td><td class="group-cell"><span class="category ${item.category}">${esc(t(item.category))}</span></td><td class="weight-cell" data-label="${esc(t('weight'))}">${item.weight}</td><td class="candidate-cell" data-label="${esc(t('candidateA'))}">${selected?status(state.report?.results.a.rows.find(r=>r.case_id===item.id)):'—'}</td><td class="candidate-cell" data-label="${esc(t('candidateB'))}">${selected?status(state.report?.results.b.rows.find(r=>r.case_id===item.id)):'—'}</td><td><button class="row-detail" data-open="${item.id}" ${busy?'disabled':''}>${esc(t('open'))}</button></td></tr>`}).join('');
}
function renderScores(){
  for(const candidate of ['a','b']){
    const suffix=candidate.toUpperCase(),result=state.report?.results[candidate];
    $('score'+suffix).innerHTML=result?`${esc(pct(result.score))}<small>%</small>`:'—';
    $('bar'+suffix).style.width=result?result.score*100+'%':'0%';
    $('pass'+suffix).textContent=result?t('passedCount',{n:result.passed,total:result.total}):t('noRun');
  }
  $('validation').textContent=state.report?new Intl.NumberFormat(state.lang,{maximumFractionDigits:3}).format(state.report.validation_ms)+' ms':'—';
  $('totalDuration').textContent=Number.isFinite(state.report?.elapsed_ms)?new Intl.NumberFormat(state.lang,{maximumFractionDigits:2}).format(state.report.elapsed_ms/1000)+' s':'—';
  $('reportTime').textContent=state.report?t('savedAt',{time:new Date(state.report.created_at).toLocaleString(state.lang,{timeZone:'Europe/Berlin',dateStyle:'short',timeStyle:'short'})}):'';
  $('export').disabled=!state.report||busy;
}
function render(){
  document.documentElement.lang=state.lang;
  $('storageNotice').hidden=storageAvailable;
  document.querySelectorAll('[data-t]').forEach(el=>{if(el.dataset.t==='hero'){el.replaceChildren(...t('hero').split('\n').flatMap((s,i)=>i?[document.createElement('br'),document.createTextNode(s)]:[document.createTextNode(s)]))}else el.textContent=t(el.dataset.t)});
  $('datasetDownload').href='/download/fixtures.json?lang='+state.lang;$('language').value=state.lang;$('language').disabled=busy;$('closeDetail').setAttribute('aria-label',t('close'));
  $('progress').setAttribute('aria-label',t('working'));
  $('run').disabled=busy||!state.case_ids.length;
  $('run').firstElementChild.textContent=t(busy?'working':'run');
  $('restore').disabled=busy;$('editFirst').disabled=busy;
  if(!busy){$('runState').textContent=t(state.report?'complete':'ready');$('elapsed').textContent=durationText(state.report?.elapsed_ms??0)}
  renderGroups();renderRows();renderScores();if(notice)$('message').textContent=t(notice);tickClock();
  if(activeCase&&$('detail').open)renderDetail();
}
function tickClock(){$('clock').textContent=new Date().toLocaleTimeString(state.lang,{timeZone:'Europe/Berlin',hour12:false});$('clock').dateTime=new Date().toISOString()}
function durationText(ms){const n=Math.floor(Math.max(0,ms)/100);return String(Math.floor(n/600)).padStart(2,'0')+':'+String(Math.floor(n/10)%60).padStart(2,'0')+(state.lang==='en'?'.':',')+n%10}
function tickElapsed(){$('elapsed').textContent=durationText(performance.now()-started)}
function renderDetail(){
  const item=currentDataset.cases.find(c=>c.id===activeCase);$('detailId').textContent=item.id+' / '+t(item.category);$('detailTitle').textContent=item.title;$('prompt').textContent=item.prompt;
  $('rules').innerHTML=item.checks.map(rule=>`<li>${esc(ruleText(rule))}</li>`).join('');
  for(const k of ['a','b']){const matches=$('output'+k.toUpperCase()).value===state.outputs[k][activeCase];const row=matches?state.report?.results[k].rows.find(r=>r.case_id===activeCase):null;$('checks'+k.toUpperCase()).innerHTML=row?row.checks.map(c=>`<span class="${c.pass?'pass':'fail'}">${c.pass?'✓':'×'} ${esc(ruleText(c))}</span>`).join(''):''}
}
function openDetail(id){if(busy)return;activeCase=id;$('outputA').value=state.outputs.a[id];$('outputB').value=state.outputs.b[id];renderDetail();$('detail').showModal()}
$('closeDetail').addEventListener('click',()=>{$('detail').close();activeCase=null});
for(const id of ['outputA','outputB'])$(id).addEventListener('input',()=>{$('checksA').textContent='';$('checksB').textContent=''});
$('detail').addEventListener('close',()=>{activeCase=null});
$('saveDetail').addEventListener('click',()=>{const a=$('outputA').value,b=$('outputB').value;const changed=state.outputs.a[activeCase]!==a||state.outputs.b[activeCase]!==b;state.outputs.a[activeCase]=a;state.outputs.b[activeCase]=b;$('detail').close();activeCase=null;if(changed)invalidate('changed')});
$('language').addEventListener('change',e=>{if(busy)return;const next=switchLanguage(state,e.target.value,DATASET);if(activeCase){for(const k of ['a','b']){const el=$('output'+k.toUpperCase());if(el.value!==state.outputs[k][activeCase])next.outputs[k][activeCase]=el.value;el.value=next.outputs[k][activeCase];}}state=next;currentDataset=datasetForLanguage(DATASET,state.lang);persist();render()});
$('groups').addEventListener('click',e=>{const button=e.target.closest('[data-group]');if(!button||busy)return;const ids=currentDataset.cases.filter(c=>c.category===button.dataset.group).map(c=>c.id),all=ids.every(id=>state.case_ids.includes(id));state.case_ids=currentDataset.cases.filter(c=>all?!ids.includes(c.id)&&state.case_ids.includes(c.id):ids.includes(c.id)||state.case_ids.includes(c.id)).map(c=>c.id);invalidate('scopeChanged')});
$('caseRows').addEventListener('click',e=>{const button=e.target.closest('[data-open]');if(button)openDetail(button.dataset.open)});
$('caseRows').addEventListener('change',e=>{if(!e.target.matches('[data-case]')||busy)return;const id=e.target.dataset.case;state.case_ids=currentDataset.cases.filter(c=>c.id===id?e.target.checked:state.case_ids.includes(c.id)).map(c=>c.id);invalidate('scopeChanged')});
$('editFirst').addEventListener('click',()=>openDetail(state.case_ids[0]??currentDataset.cases[0].id));
$('restore').addEventListener('click',()=>{state={...defaults(currentDataset),lang:state.lang,report:null};invalidate('restored')});
$('run').addEventListener('click',async()=>{
  if(busy)return;if(!state.case_ids.length){message('empty');return}
  busy=true;externalUpdate=false;state.report=null;notice=null;persist();document.body.classList.add('is-running');render();message(null);
  const payload={language:state.lang,case_ids:[...state.case_ids],outputs:structuredClone(state.outputs)};
  $('progress').max=payload.case_ids.length;$('progress').value=0;started=performance.now();ticker=setInterval(tickElapsed,50);let validation=0;
  try{
    for(const [index,id] of payload.case_ids.entries()){
      if(externalUpdate)throw Error('external_change');
      $('runState').textContent=t('running',{n:index+1,total:payload.case_ids.length});
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
      let data;try{const response=await fetch('/api/evaluate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language:state.lang,case_ids:[id],outputs:{a:{[id]:payload.outputs.a[id]},b:{[id]:payload.outputs.b[id]}}}),signal:controller.signal});if(!response.ok)throw Error('evaluation');data=await response.json()}finally{clearTimeout(timeout)}
      const expected=evaluate({...payload,case_ids:[id]},DATASET);
      if(JSON.stringify(data.results)!==JSON.stringify(expected.results)||!Number.isFinite(data.validation_ms)||data.validation_ms<0)throw Error('invalid_result');
      validation+=data.validation_ms;$('progress').value=index+1;
    }
    if(externalUpdate)throw Error('external_change');
    const elapsed=performance.now()-started;
    state.report={...evaluate(payload,DATASET),...payload,created_at:new Date().toISOString(),validation_ms:validation,elapsed_ms:elapsed,runtime:'javascript_worker',dataset_provenance:currentDataset.provenance};persist();message('done');
  }catch(error){if(externalUpdate){let latest=null;try{latest=localStorage.getItem(STORE)}catch{}state=restoreState(latest,DATASET);currentDataset=datasetForLanguage(DATASET,state.lang);message('externalChange')}else{state.report=null;persist();message('error',true)}}finally{clearInterval(ticker);tickElapsed();busy=false;document.body.classList.remove('is-running');render();if(state.report&&!externalUpdate)$('results').scrollIntoView({block:'start',behavior:'auto'})}
});
$('export').addEventListener('click',()=>{if(!state.report||busy)return;const blob=new Blob([JSON.stringify(state.report,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='ai-quality-lab-report-'+state.report.created_at.slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
window.addEventListener('storage',event=>{if(event.key!==STORE)return;if(busy){externalUpdate=true;return}state=restoreState(event.newValue,DATASET);currentDataset=datasetForLanguage(DATASET,state.lang);$('detail').close();activeCase=null;notice='externalChange';render()});
render();setInterval(tickClock,1000);
