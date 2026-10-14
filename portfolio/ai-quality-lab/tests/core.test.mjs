import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {grade,evaluate} from '../src/engine.mjs';
import {defaults,restoreState} from '../src/state.mjs';
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
 assert.equal(restoreState('broken',dataset).lang,'de');const p=base();const report={...evaluate(p,dataset),...p,validation_ms:1,created_at:'2026-10-14T15:00:00Z'};const saved={version:1,lang:'uk',...p,report};assert.ok(restoreState(JSON.stringify(saved),dataset).report);saved.outputs.a.T02='delivery';assert.equal(restoreState(JSON.stringify(saved),dataset).report,null);saved.case_ids=[];assert.equal(restoreState(JSON.stringify(saved),dataset).report,null);
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
