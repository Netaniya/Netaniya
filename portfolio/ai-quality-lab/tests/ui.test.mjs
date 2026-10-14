// Interaction tests with a DOM double, not browser rendering or visual QA.
import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import worker from '../worker/index.js';
async function setup({fail=false,saved=null,holdFirst=false,storageBlocked=false}={}){
 const html=await (await worker.fetch(new Request('https://lab.test/'))).text(),ids=new Map(),data=new Map(saved?[['ai-quality-lab-v1',saved]]:[]);
 class Element{
  constructor(){this.value='';this.dataset={};this.style={};this.handlers={};this.disabled=false;this.open=false;this.classList={toggle(){},add(){},remove(){}};this.children=[];this.innerHTML='';this.textContent='';this.firstElementChild={textContent:''};this.attributes={}}
  addEventListener(k,f){this.handlers[k]=f}setAttribute(k,v){this.attributes[k]=v}replaceChildren(...children){this.children=children;this.textContent=children.map(c=>c.textContent??'').join('')}showModal(){this.open=true}close(){this.open=false;this.handlers.close?.()}click(){if(!this.disabled)return this.handlers.click?.()}emit(k,e={}){return this.handlers[k]?.(e)}scrollIntoView(){this.scrolled=true}
 }
 for(const m of html.matchAll(/\bid="([^"]+)"/g))ids.set(m[1],new Element());
 const downloads=[];const texts=[...html.matchAll(/data-t="([^"]+)"/g)].map(m=>{const e=new Element();e.dataset.t=m[1];return e}),doc={getElementById:id=>ids.get(id),querySelectorAll:()=>texts,documentElement:{},body:new Element(),createTextNode:text=>({textContent:text}),createElement:tag=>{const e=new Element();if(tag==='a')e.handlers.click=()=>downloads.push({url:e.href,filename:e.download});return e}};
 const handlers={};let release;const barrier=new Promise(resolve=>{release=resolve});let calls=0;const c={document:doc,localStorage:{getItem:k=>{if(storageBlocked)throw Error('blocked');return data.get(k)??null},setItem:(k,v)=>{if(storageBlocked)throw Error('blocked');data.set(k,v)}},window:{addEventListener(k,f){handlers[k]=f}},fetch:async(url,options)=>{calls++;if(fail)throw Error('offline');if(holdFirst&&calls===1)await barrier;return worker.fetch(new Request('https://lab.test'+url,options))},structuredClone,performance,Intl,Date,JSON,Blob,URL,console,setInterval:()=>1,clearInterval(){},setTimeout:()=>1,clearTimeout(){},AbortController};
 vm.createContext(c);vm.runInContext(html.match(/<script type="module">([\s\S]*)<\/script>/)[1],c);
 return {ids,data,doc,run:s=>vm.runInContext(s,c),calls:()=>calls,handlers,release,downloads};
}
test('default German, four UI languages and an actual completed comparison',async()=>{
 const x=await setup();assert.equal(x.doc.documentElement.lang,'de');assert.equal(x.ids.get('export').disabled,true);
 for(const lang of ['en','ru','uk','de']){x.ids.get('language').emit('change',{target:{value:lang}});assert.equal(x.doc.documentElement.lang,lang)}
 await x.ids.get('run').click();assert.equal(x.calls(),8);const saved=JSON.parse(x.data.get('ai-quality-lab-v1'));assert.equal(saved.report.results.a.passed,4);assert.equal(saved.report.results.b.passed,7);assert.equal(x.ids.get('export').disabled,false);assert.equal(x.ids.get('progress').value,8);assert.equal(x.ids.get('run').disabled,false);
 const y=await setup({saved:x.data.get('ai-quality-lab-v1')});assert.equal(y.ids.get('export').disabled,false);
});
test('editing a response invalidates the old report and a new run changes score',async()=>{
 const x=await setup();await x.ids.get('run').click();x.run("openDetail('T08')");assert.equal(x.ids.get('detail').open,true);x.ids.get('outputB').value='P-208';x.ids.get('saveDetail').click();assert.equal(x.ids.get('export').disabled,true);await x.ids.get('run').click();assert.equal(JSON.parse(x.data.get('ai-quality-lab-v1')).report.results.b.score,1);
});
test('network failure removes old results and unlocks controls',async()=>{
 const x=await setup({fail:true});await x.ids.get('run').click();assert.equal(x.ids.get('export').disabled,true);assert.equal(x.ids.get('run').disabled,false);assert.equal(JSON.parse(x.data.get('ai-quality-lab-v1')).report,null);assert.match(x.ids.get('message').textContent,/erneut versuchen/);
});
test('empty selection is disabled; reset restores all cases and original answers',async()=>{
 const x=await setup();x.run("state.case_ids=[];invalidate('scopeChanged')");assert.equal(x.ids.get('run').disabled,true);x.ids.get('restore').click();assert.equal(x.ids.get('run').disabled,false);assert.equal(JSON.parse(x.data.get('ai-quality-lab-v1')).case_ids.length,8);
});
test('edited answers never display stale check results after changing the UI language',async()=>{
 const x=await setup();await x.ids.get('run').click();x.run("openDetail('T08')");x.ids.get('outputB').value='P-208';x.ids.get('outputB').emit('input');x.ids.get('language').emit('change',{target:{value:'uk'}});assert.equal(x.ids.get('checksB').innerHTML,'');assert.equal(x.ids.get('outputB').value,'P-208');
});
test('a running comparison cannot overwrite newer answers from another tab',async()=>{
 const x=await setup({holdFirst:true});const running=x.ids.get('run').click();assert.equal(x.ids.get('language').disabled,true);assert.equal(x.ids.get('export').disabled,true);
 const newer=JSON.parse(x.data.get('ai-quality-lab-v1'));newer.outputs.b.T08='P-208';const raw=JSON.stringify(newer);x.data.set('ai-quality-lab-v1',raw);x.handlers.storage({key:'ai-quality-lab-v1',newValue:raw});x.release();await running;
 assert.equal(x.data.get('ai-quality-lab-v1'),raw);assert.equal(x.run('state.outputs.b.T08'),'P-208');assert.equal(x.ids.get('language').disabled,false);assert.equal(x.ids.get('export').disabled,true);assert.match(x.ids.get('message').textContent,/anderen Fenster/);
});
test('successful completion reveals results and restores the measured timer after reload',async()=>{
 const x=await setup();await x.ids.get('run').click();assert.equal(x.ids.get('results').scrolled,true);const saved=JSON.parse(x.data.get('ai-quality-lab-v1'));saved.report.elapsed_ms=3240;
 const y=await setup({saved:JSON.stringify(saved)});assert.equal(y.ids.get('elapsed').textContent,'00:03,2');assert.match(y.ids.get('totalDuration').textContent,/3,24/);
});
test('the report download contains the actual selected answers and current results',async()=>{
 const x=await setup();await x.ids.get('run').click();x.ids.get('export').click();assert.equal(x.downloads.length,1);const download=x.downloads[0];assert.match(download.filename,/^ai-quality-lab-report-\d{4}-\d{2}-\d{2}\.json$/);const report=await (await fetch(download.url)).json();URL.revokeObjectURL(download.url);const saved=JSON.parse(x.data.get('ai-quality-lab-v1')).report;assert.deepEqual(report,saved);assert.equal(report.model_calls,0);assert.equal(report.case_ids.length,8);
});
test('blocked local storage keeps comparison and export usable with a persistent notice',async()=>{
 const x=await setup({storageBlocked:true});assert.equal(x.ids.get('storageNotice').hidden,false);await x.ids.get('run').click();assert.equal(x.ids.get('export').disabled,false);assert.equal(x.ids.get('storageNotice').hidden,false);assert.equal(x.run('state.report.results.b.passed'),7);
});
