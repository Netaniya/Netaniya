import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import {grade,evaluate,datasetForLanguage} from '../src/engine.mjs';
import {defaults,restoreState,switchLanguage} from '../src/state.mjs';
import {dictionaries,translate} from '../src/i18n.mjs';
import worker from '../worker/index.js';
const dataset=JSON.parse(fs.readFileSync('src/fixtures.json','utf8'));
const base=()=>defaults(dataset);
test('known examples yield independently specified scores and failed cases',()=>{
 const r=evaluate(base(),dataset);
 assert.equal(r.results.a.passed,4);assert.equal(r.results.b.passed,7);
 assert.ok(Math.abs(r.results.a.score-20/39)<1e-12);assert.ok(Math.abs(r.results.b.score-11/13)<1e-12);
 assert.deepEqual(r.results.a.rows.filter(x=>!x.passed).map(x=>x.case_id),['T01','T04','T06','T07']);
 assert.deepEqual(r.results.b.rows.filter(x=>!x.passed).map(x=>x.case_id),['T08']);
 assert.equal(r.model_calls,0);assert.equal(r.model_cost_eur,null);
});
test('edited wrong answers change results; corrected answers pass',()=>{const p=base();p.outputs.b.T08='P-208';assert.equal(evaluate(p,dataset).results.b.score,1);p.outputs.b.T02='delivery';assert.equal(evaluate(p,dataset).results.b.passed,7)});
test('JSON is strict about objects, field types, extra fields and nonstandard constants',()=>{const item=dataset.cases[0];for(const output of ['[]','null','{"id":"DEMO-104","total_eur":"149"}','{"id":"DEMO-104","total_eur":true}','{"id":"DEMO-104","total_eur":149,"extra":1}','{"id":"DEMO-104","total_eur":NaN}'])assert.equal(grade(item,output).passed,false);assert.equal(grade(item,' {"total_eur":149.0,"id":"DEMO-104"} ').passed,true)});
test('missing, duplicate, unknown and empty selections are rejected',()=>{for(const ids of [[],['T01','T01'],['UNKNOWN']])assert.throws(()=>evaluate({...base(),case_ids:ids},dataset));const p=base();delete p.outputs.a.T01;assert.throws(()=>evaluate(p,dataset));p.outputs.a.T01='x'.repeat(20001);assert.throws(()=>evaluate(p,dataset))});
test('changing selected tests changes the weighted denominator',()=>{const p=base();p.case_ids=['T04'];const r=evaluate(p,dataset);assert.equal(r.results.a.score,2/3);assert.equal(r.results.b.score,1)});
test('Python and JavaScript agree on demo, edited answers and malformed JSON',()=>{
 const payloads=[base(),{...base(),case_ids:['T01','T04','T07','T08']}];payloads[1].outputs.a.T01='{"id":"DEMO-104","total_eur":NaN}';payloads[1].outputs.b.T08='P-208';
 for(const p of payloads){const code='import json,sys; from python.evaluator import evaluate; p=json.loads(sys.stdin.read()); d=json.load(open("src/fixtures.json")); print(json.dumps(evaluate(p,d)))';const py=spawnSync('python3',['-c',code],{input:JSON.stringify(p),encoding:'utf8'});assert.equal(py.status,0,py.stderr);const actual=JSON.parse(py.stdout),expected=evaluate(p,dataset);for(const k of ['a','b']){assert.ok(Math.abs(actual.results[k].score-expected.results[k].score)<1e-12);actual.results[k].score=expected.results[k].score}assert.deepEqual(actual,expected)}
});
test('safe persistence defaults and stale reports cannot be restored',()=>{
 assert.equal(restoreState('broken',dataset).lang,'de');const p={...defaults(datasetForLanguage(dataset,'uk')),language:'uk'};const report={...evaluate(p,dataset),...p,validation_ms:1,created_at:'2026-10-14T15:00:00Z'};const saved={version:2,lang:'uk',...p,report};assert.ok(restoreState(JSON.stringify(saved),dataset).report);saved.outputs.a.T02='delivery';assert.equal(restoreState(JSON.stringify(saved),dataset).report,null);saved.case_ids=[];assert.equal(restoreState(JSON.stringify(saved),dataset).report,null);
});
test('four languages cover all visible labels and placeholders',()=>{
 const keys=Object.keys(dictionaries.de).sort();for(const [lang,d] of Object.entries(dictionaries)){assert.deepEqual(Object.keys(d).sort(),keys);for(const key of keys)assert.ok(translate(lang,key).length>0)}
 const html=fs.readFileSync('src/page.html','utf8');for(const m of html.matchAll(/data-t="(\w+)"/g))assert.ok(dictionaries.de[m[1]],m[1]);
});
test('worker checks real POSTs, denies invalid requests and exposes truthful health',async()=>{
 const post=(payload,options={})=>worker.fetch(new Request('https://example.test/api/evaluate',{method:'POST',headers:{'Content-Type':'application/json',...options.headers},body:JSON.stringify(payload)}));
 const good=await post(base());assert.equal(good.status,200);const data=await good.json();assert.deepEqual(data.results,evaluate(base(),dataset).results);assert.ok(data.validation_ms>=0);
 assert.equal((await post({})).status,400);assert.equal((await post(base(),{headers:{Origin:'https://evil.test'}})).status,403);
 assert.equal((await worker.fetch(new Request('https://example.test/api/evaluate'))).status,405);
 const health=await (await worker.fetch(new Request('https://example.test/api/health'))).json();assert.equal(health.model_connected,false);
});
test('worker size limit, downloads and HTML CSP are valid',async()=>{
 const large=new Request('https://example.test/api/evaluate',{method:'POST',headers:{'Content-Type':'application/json'},body:'x'.repeat(400001)});assert.equal((await worker.fetch(large)).status,413);
 const page=await worker.fetch(new Request('https://example.test/'));assert.match(page.headers.get('Content-Security-Policy'),/sha256-/);const html=await page.text();assert.match(html,/<html lang="de">/);assert.ok(!html.includes('/*__JS__*/'));
 assert.equal(await (await worker.fetch(new Request('https://example.test/download/evaluator.py'))).text(),fs.readFileSync('python/evaluator.py','utf8'));
 assert.equal((await worker.fetch(new Request('https://example.test/unknown'))).status,404);
});
test('both self-hosted font files are served intact with the correct MIME type',async()=>{
 for(const weight of ['regular','bold']){const response=await worker.fetch(new Request('https://example.test/assets/quality-sans-'+weight+'.woff'));assert.equal(response.status,200);assert.equal(response.headers.get('Content-Type'),'font/woff');const bytes=Buffer.from(await response.arrayBuffer());const source=Buffer.from(fs.readFileSync('assets/fonts/quality-sans-'+weight+'.woff.b64','utf8').trim(),'base64');assert.deepEqual(bytes,source);assert.equal(bytes.subarray(0,4).toString(),'wOFF')}
});
test('restored report metadata remains truthful and negative durations are rejected',()=>{
 const p=base();const report={...evaluate(p,dataset),...p,validation_ms:1,created_at:'2026-10-14T15:00:00Z',model_calls:999,source:'live_api',elapsed_ms:-1};const saved={version:1,lang:'de',...p,report};const loaded=restoreState(JSON.stringify(saved),dataset);assert.equal(loaded.report.model_calls,0);assert.equal(loaded.report.source,'saved_outputs');assert.equal(loaded.report.elapsed_ms,null);saved.report.validation_ms=-1;assert.equal(restoreState(JSON.stringify(saved),dataset).report,null);
});
test('Python and JavaScript use the same Unicode whitespace and UTF-16 length rules',()=>{
 for(const point of [0xfeff,0x85,0x2007,0x200b]){
  const p=base();p.case_ids=['T02'];p.outputs.a.T02=String.fromCodePoint(point)+'billing'+String.fromCodePoint(point);
  const code='import json,sys; from python.evaluator import evaluate; p=json.loads(sys.stdin.read()); d=json.load(open("src/fixtures.json")); print(json.dumps(evaluate(p,d)))';
  const py=spawnSync('python3',['-c',code],{input:JSON.stringify(p),encoding:'utf8'});assert.equal(py.status,0,py.stderr);assert.deepEqual(JSON.parse(py.stdout),evaluate(p,dataset));
 }
 for(const [n,valid] of [[10000,true],[10001,false]]){
  const p=base();p.outputs.a.T02='😀'.repeat(n);if(valid)assert.doesNotThrow(()=>evaluate(p,dataset));else assert.throws(()=>evaluate(p,dataset));
  const py=spawnSync('python3',['-c','import json,sys; from python.evaluator import output_valid; print(output_valid(json.loads(sys.stdin.read())))'],{input:JSON.stringify(p.outputs.a.T02),encoding:'utf8'});assert.equal(py.status,0,py.stderr);assert.equal(py.stdout.trim(),valid?'True':'False');
 }
});
test('downloaded evaluator and dataset replay a saved report in a standalone folder',async()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'quality-replay-'));
 try{
  for(const name of ['evaluator.py','fixtures.json'])fs.writeFileSync(path.join(tmp,name),await (await worker.fetch(new Request('https://example.test/download/'+name))).text());
  const p=base();p.outputs.b.T08='P-208';const report={...evaluate(p,dataset),...p};fs.writeFileSync(path.join(tmp,'report.json'),JSON.stringify(report));
  const py=spawnSync('python3',['evaluator.py','--input','report.json','--output','replay.json'],{cwd:tmp,encoding:'utf8'});assert.equal(py.status,0,py.stderr);const replay=JSON.parse(fs.readFileSync(path.join(tmp,'replay.json'),'utf8'));assert.equal(replay.results.b.score,1);assert.ok(Math.abs(replay.results.a.score-report.results.a.score)<1e-12);assert.equal(replay.model_calls,0);assert.equal(replay.runtime,'python');assert.deepEqual(replay.outputs,p.outputs);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});

test('all localized corpora retain independent expected scores and replay identically in Python',async()=>{for(const language of ['de','en','ru','uk']){const localized=datasetForLanguage(dataset,language),p={...defaults(localized),language};const report=evaluate(p,dataset);assert.equal(report.language,language);assert.equal(report.results.a.passed,4);assert.equal(report.results.b.passed,7);assert.ok(Math.abs(report.results.a.score-20/39)<1e-12);assert.ok(Math.abs(report.results.b.score-11/13)<1e-12);const response=await worker.fetch(new Request('https://lab.test/download/fixtures.json?lang='+language));assert.deepEqual(await response.json(),localized);const py=spawnSync('python3',['-c','import json,sys; from python.evaluator import evaluate; p=json.loads(sys.stdin.read()); d=json.load(open("src/fixtures.json")); print(json.dumps(evaluate(p,d)))'],{input:JSON.stringify(p),encoding:'utf8'});assert.equal(py.status,0,py.stderr);const replay=JSON.parse(py.stdout);for(const k of ['a','b']){assert.ok(Math.abs(replay.results[k].score-report.results[k].score)<1e-12);replay.results[k].score=report.results[k].score;}assert.deepEqual(replay,report);const api=await worker.fetch(new Request('https://lab.test/api/evaluate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}));assert.equal(api.status,200);assert.deepEqual((await api.json()).results,report.results);}});
test('old non-German saved samples migrate and custom answers survive language switching',()=>{const old=base();old.outputs.a.T08='My answer';const loaded=restoreState(JSON.stringify({version:1,lang:'ru',...old}),dataset);assert.equal(loaded.outputs.b.T06,'НЕИЗВЕСТНО');assert.equal(loaded.outputs.a.T08,'My answer');let state=loaded;for(const lang of ['uk','en','de']){state=switchLanguage(state,lang,dataset);assert.equal(state.outputs.a.T08,'My answer');assert.equal(state.outputs.b.T06,datasetForLanguage(dataset,lang).cases[5].outputs.b);assert.equal(state.report,null);}});

test('a downloaded single-language corpus cannot be mislabeled as a different language',()=>{const english=datasetForLanguage(dataset,'en');assert.throws(()=>datasetForLanguage(english,'ru'),/dataset_language/);assert.throws(()=>evaluate({...defaults(english),language:'ru'},english),/dataset_language/);});
