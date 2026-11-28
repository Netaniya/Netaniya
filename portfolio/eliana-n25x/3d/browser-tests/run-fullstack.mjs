// © 2026 Natalie Ragulina (Netaniya). All rights reserved.
// Real browser, real Python HTTP, real persistent SQLite; synthetic data only.
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const lab=fileURLToPath(new URL('../../fullstack-lab/',import.meta.url)),results=fileURLToPath(new URL('./workshop-results/',import.meta.url));
const scope=process.env.ELIANA_BROWSER_SCOPE||'desktop',tmp=await fs.mkdtemp(path.join(os.tmpdir(),'n25x-fullstack-')),db=path.join(tmp,'practice.sqlite');
await fs.mkdir(results,{recursive:true});
let child,browser;
const errors=[],checks=[],failedRequests=[],verifiedNoContentEvents=[];
function check(name){checks.push(name);console.log('PASS full-stack '+name);}
async function start(){
 child=spawn('python3',[path.join(lab,'server.py'),'--db',db,'--port','0'],{stdio:['ignore','pipe','pipe']});
 return new Promise((resolve,reject)=>{
  let buffer='',stderr='';
  const timeout=setTimeout(()=>reject(Error('server startup timed out '+stderr)),10000);
  child.stderr.on('data',d=>stderr+=d);
  child.once('error',e=>{clearTimeout(timeout);reject(e);});
  child.once('exit',code=>{clearTimeout(timeout);reject(Error('server exited '+code+' '+stderr));});
  child.stdout.on('data',d=>{buffer+=d;const m=/http:\/\/127\.0\.0\.1:(\d+)/.exec(buffer);if(m){clearTimeout(timeout);resolve(m[0]);}});
 });
}
async function stop(){if(child&&child.exitCode===null&&child.signalCode===null){const exit=once(child,'exit');child.kill();await exit;}child=null;}
try{
 let url=await start();browser=await chromium.launch({headless:true});
 const context=await browser.newContext(scope==='touch'?{viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:1}:{viewport:{width:1280,height:900}});
 const page=await context.newPage();page.setDefaultTimeout(15000);
 page.on('pageerror',e=>errors.push(String(e)));
 page.on('requestfailed',r=>failedRequests.push({request:r,error:r.failure()?.errorText}));
 const click=async loc=>{if(scope==='touch')await loc.tap();else await loc.click();};
 const status=async text=>page.waitForFunction(t=>document.querySelector('#status')?.textContent===t,text);
 const overflow=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.goto(url);await status('Success');assert.equal(await page.locator('#stats').innerText(),'0 total · 0 done · 0 open');
 const title='<img src=x onerror=alert(1)> SQL practice';
 await page.locator('#title').fill(title);const post=page.waitForResponse(r=>r.request().method()==='POST'&&r.url().endsWith('/api/projects'));
 await click(page.getByRole('button',{name:'POST · Create'}));assert.equal((await post).status(),201);
 await page.waitForFunction(t=>document.querySelector('#records span')?.textContent===t,title);await status('Success');
 assert.equal(await page.locator('#records img').count(),0);assert((await page.locator('#response').innerText()).includes('HTTP 201'));check('POST creates record and HTML-like title is rendered as text');
 const patch=page.waitForResponse(r=>r.request().method()==='PATCH');await click(page.getByRole('button',{name:'PATCH · Complete'}));assert.equal((await patch).status(),200);
 await page.waitForFunction(()=>document.querySelector('#stats')?.textContent==='1 total · 1 done · 0 open');await status('Success');assert((await page.locator('#response').innerText()).includes('PATCH /api/projects/'));
 await overflow();await page.screenshot({path:path.join(results,scope+'-fullstack.png')});check('PATCH updates real database and displayed aggregates');
 await stop();url=await start();await page.goto(url);await status('Success');assert.equal(await page.locator('#records span').innerText(),title);assert.equal(await page.locator('#stats').innerText(),'1 total · 1 done · 0 open');check('SQLite persists across actual server restart');
 const del=page.waitForResponse(r=>r.request().method()==='DELETE'&&/^\/api\/projects\/[1-9]\d*$/.test(new URL(r.url()).pathname));await click(page.getByRole('button',{name:'DELETE'}));const deleted=await del;assert.equal(deleted.status(),204);assert.equal(await deleted.headerValue('content-length'),null);assert.equal(await deleted.headerValue('transfer-encoding'),null);
 await page.waitForFunction(()=>document.querySelector('#records')?.children.length===0);await status('Success');assert((await page.locator('#response').innerText()).includes('HTTP 204'));assert.equal(await page.locator('#stats').innerText(),'0 total · 0 done · 0 open');await overflow();check('DELETE removes real record and displays HTTP 204');
 // Chromium may report ERR_ABORTED for an already delivered bodyless 204.
 // Independently confirm the exact deleted resource and aggregate state before
 // classifying that single request. All other failed requests remain fatal.
 const missing=await context.request.get(deleted.url());
 assert.equal(missing.status(),404);assert.deepEqual(await missing.json(),{error:'not_found'});
 const remaining=await context.request.get(url+'/api/projects');
 assert.equal(remaining.status(),200);assert.deepEqual(await remaining.json(),[]);
 const totals=await context.request.get(url+'/api/stats');
 assert.equal(totals.status(),200);assert.deepEqual(await totals.json(),{total:0,done:0,open:0});
 await page.waitForLoadState('networkidle');
 for(const entry of failedRequests){
  const req=entry.request;
  if(req===deleted.request()&&entry.error==='net::ERR_ABORTED'){
   verifiedNoContentEvents.push({method:req.method(),url:req.url(),status:204,error:entry.error});
  }else errors.push(req.method()+' '+req.url()+' '+entry.error);
 }
 assert(verifiedNoContentEvents.length<=1,'duplicate abort events for DELETE');
 assert.deepEqual(errors,[]);check('no page errors or unexpected failed browser requests; DELETE verified independently');
}finally{try{await browser?.close();}finally{await stop();await fs.rm(tmp,{recursive:true,force:true});await fs.writeFile(path.join(results,scope+'-fullstack-report.json'),JSON.stringify({scope,checks,errors,verifiedNoContentEvents,physicalDevice:false},null,2));}}
