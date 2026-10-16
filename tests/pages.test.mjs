// Deployment-contract and DOM interaction tests; not browser rendering or visual QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {parseHTML} from '../portfolio/motion-atelier/node_modules/linkedom/esm/index.js';
import {browserCopy,languages} from '../scripts/build-pages.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),site=path.join(root,'_site'),base='/Netaniya',motion=base+'/motion-atelier';
const read=p=>fs.readFile(path.join(root,p),'utf8');
const data=await import('../_site/motion-atelier/data.mjs?v=7'),core=await import('../_site/motion-atelier/core.mjs?v=7');
const {translator}=await import('../_site/motion-atelier/i18n.mjs?v=7');
const {createExperience}=await import('../_site/motion-atelier/experience.mjs?v=7');
const {createRouteMap}=await import('../_site/motion-atelier/route-map.mjs?v=7');
const source=(await read('_site/motion-atelier/app.mjs')).replace(/^import .*?;\n/gm,''),html=await read('_site/motion-atelier/index.html');
const original=await read('portfolio/motion-atelier/tests/ui.test.mjs');
const bootText=original.slice(original.indexOf('function boot('),original.indexOf('\nconst tick='));
assert(bootText.startsWith('function boot('));
const boot=vm.runInNewContext('('+bootText+')',{parseHTML,Date,data,core,translator,createExperience,createRouteMap,vm,source,html,assert,webcrypto,URL,URLSearchParams,Blob,Intl,AbortController});
const tick=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};

test('official model films start and close under the GitHub Pages project path',()=>{
 for(const lang of languages)for(const v of data.VEHICLES){
  const b=boot({path:motion+'/models/'+v.id+'/',lang});
  assert.equal(b.document.querySelector('.film-poster').getAttribute('src'),motion+'/assets/'+v.image);
  assert(!b.document.querySelector('.model-film iframe'));
  b.click('[data-action="play-film"]');
  const url=new URL(b.document.querySelector('.model-film iframe').getAttribute('src'));
  assert.equal(url.origin,'https://www.youtube-nocookie.com');
  assert.equal(url.pathname,'/embed/'+data.TESLA_FILMS[v.id].youtubeId);
  assert.equal(url.searchParams.get('origin'),'https://example.test');
  b.click('[data-action="close-film"]');
  assert(!b.document.querySelector('.model-film iframe'));
 }
});

test('GitHub project base: all ten Motion pages and four languages render with valid links and photos',async()=>{
 for(const lang of languages)for(const local of data.ROUTES){
  const b=boot({path:motion+local,lang});assert.equal(b.document.documentElement.lang,lang);assert.equal(b.document.querySelectorAll('main h1').length,1,local);assert(!/undefined|NaN/.test(b.document.querySelector('main').textContent));
  if(local.startsWith('/models/'))assert(b.document.querySelector('main h1').textContent.includes(core.vehicle(local.split('/')[2]).name));
  for(const node of b.document.querySelectorAll('a[href^="/"],img[src^="/"]')){
   const href=node.getAttribute('href')??node.getAttribute('src');assert(href.startsWith(motion+'/'),href);const relative=href.split(/[?#]/)[0].slice(base.length+1);const target=path.join(site,relative,href.split(/[?#]/)[0].endsWith('/')?'index.html':'');assert((await fs.stat(target)).isFile(),href);
  }
 }
});
test('configuration and garage keep calculations and shareable links inside the project base',async()=>{
 const b=boot({path:motion+'/configure/',search:'?model=cross-02&paint=silver&wheels=aero&interior=dark'});const before=b.document.querySelector('.total strong').textContent;b.change('input[name="wheels"][value="sport"]','sport');assert.notEqual(b.document.querySelector('.total strong').textContent,before);let copied;b.ctx.navigator.clipboard.writeText=async text=>{copied=text;};b.click('[data-action="share"]');await tick();assert(copied.startsWith('https://example.test'+motion+'/configure/?'),copied);assert(copied.includes('model=cross-02'));b.click('[data-action="save"]');assert.equal(JSON.parse(b.memory.get('motion-garage'))[0].config.wheels,'sport');
});
test('configuration edits and reset preserve a reloadable GitHub Pages address in every language',()=>{
 for(const lang of languages){
  const b=boot({path:motion+'/configure/',lang});
  let current=new URL(b.ctx.location.href);
  b.ctx.history.replaceState=(_state,_title,address)=>{
   current=new URL(address,current);
   Object.assign(b.ctx.location,{pathname:current.pathname,search:current.search,href:current.href});
  };
  for(const change of [()=>b.change('input[name="wheels"][value="sport"]','sport'),()=>b.change('select[name="model"]','cross-02'),()=>b.click('[data-action="reset-choice"]')]){
   change();assert.equal(current.pathname,motion+'/configure/');
   const refreshed=boot({path:current.pathname,search:current.search,lang});
   assert(refreshed.document.querySelector('#config-form'));
   assert.equal(refreshed.document.querySelector('.total strong').textContent,b.document.querySelector('.total strong').textContent);
   assert.equal(refreshed.document.querySelector('.config-car').getAttribute('src'),b.document.querySelector('.config-car').getAttribute('src'));
  }
 }
});
test('video, audio, stylesheet and map assets retain valid addresses and Leaflet integrity',async()=>{
 const b=boot({path:motion+'/',reduced:false});assert.equal(b.video.src,motion+'/assets/arrival-drive.mp4');assert.equal(b.audio.src,motion+'/assets/intro-music.mp3');
 for(const asset of ['leaflet.js','leaflet.css'])assert((await fs.readFile(path.join(site,'motion-atelier/assets/vendor/leaflet',asset))).equals(await fs.readFile(path.join(root,'portfolio/motion-atelier/dist/assets/vendor/leaflet',asset))));
 const map=await read('_site/motion-atelier/route-map.mjs');assert(map.includes(motion+'/assets/vendor/leaflet/leaflet.js'));assert(map.includes(motion+'/assets/vendor/leaflet/leaflet.css'));
 const css=await read('_site/motion-atelier/style.css');for(const m of css.matchAll(/url\(['"]?(\/[^)'"\s]+)/g)){assert(m[1].startsWith(motion+'/'));assert((await fs.stat(path.join(site,m[1].slice(base.length+1)))).isFile(),m[1]);}
});

async function bootLab(){
 const fixture=await read('portfolio/ai-quality-lab/tests/ui.test.mjs');let setup=fixture.slice(fixture.indexOf('async function setup('),fixture.indexOf('\ntest('));
 setup=setup.replace("const html=await (await worker.fetch(new Request('https://lab.test/'))).text(),ids=",'const html=staticHTML,ids=');
 setup=setup.replace('setTimeout:()=>1','setTimeout:(fn,ms)=>{if(ms===0)queueMicrotask(fn);return 1;}');
 return vm.runInNewContext('('+setup+')',{staticHTML:await read('_site/ai-quality-lab/index.html'),vm,assert,structuredClone,performance,Intl,Date,JSON,Blob,URL,console,queueMicrotask,AbortController,Request})({fail:true});
}
test('static Quality Lab completes all cases in four languages without contacting an API',async()=>{
 const b=await bootLab();for(const lang of languages){b.ids.get('language').emit('change',{target:{value:lang}});await b.ids.get('run').click();const report=JSON.parse(b.data.get('ai-quality-lab-v1')).report;assert(report,lang);assert.equal(b.calls(),0);assert.equal(report.results.a.passed,4);assert.equal(report.results.b.passed,7);assert.equal(report.language,lang);assert.equal(report.runtime,'javascript_browser');assert.equal(b.ids.get('export').disabled,false);assert.equal(b.run("t('runHelp')"),browserCopy[lang].runHelp);assert.equal(b.ids.get('datasetDownload').href,base+'/ai-quality-lab/download/fixtures.'+lang+'.json');}
});
test('editing answers changes the browser result and exported report includes actual answers',async()=>{
 const b=await bootLab();await b.ids.get('run').click();b.run("openDetail('T08')");b.ids.get('outputB').value='P-208';b.ids.get('saveDetail').click();assert.equal(b.ids.get('export').disabled,true);await b.ids.get('run').click();assert.equal(b.run('state.report.results.b.score'),1);b.ids.get('export').click();const exported=await (await fetch(b.downloads[0].url)).json();URL.revokeObjectURL(b.downloads[0].url);assert.equal(exported.outputs.b.T08,'P-208');assert.equal(exported.runtime,'javascript_browser');assert.equal(exported.model_calls,0);
});
test('downloaded test datasets match the selected UI language and Python evaluator exists',async()=>{
 for(const lang of languages){const b=await bootLab();b.ids.get('language').emit('change',{target:{value:lang}});const fixture=JSON.parse(await read('_site/ai-quality-lab/download/fixtures.'+lang+'.json'));assert.equal(fixture.cases[5].prompt,b.run('currentDataset.cases[5].prompt'));assert.equal(fixture.cases[5].outputs.b,b.run('currentDataset.cases[5].outputs.b'));}
 assert((await read('_site/ai-quality-lab/download/evaluator.py')).includes('def '));
});
test('public output has no old hosting addresses, broken static references or private source',async()=>{
 async function walk(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){assert(!['.openai','fullstack','backend'].includes(entry.name));await walk(file);}else if(/\.(html|mjs|css|xml|txt)$/.test(entry.name)&&!file.includes('/assets/vendor/')){const text=await fs.readFile(file,'utf8');assert(!/\.chatgpt\.site/.test(text),file);if(entry.name.endsWith('.html')){const {document}=parseHTML(text);for(const node of document.querySelectorAll('[href],[src],[poster]'))for(const attribute of ['href','src','poster']){const href=node.getAttribute(attribute);if(!href?.startsWith('/')||href.startsWith('//'))continue;const url=href.split(/[?#]/)[0];assert(url.startsWith(base+'/'),url);const target=path.join(site,url.slice(base.length+1),url.endsWith('/')?'index.html':'');assert((await fs.stat(target)).isFile(),url);}}}}}
 await walk(site);
});

test('adventure runtime, all six locations and offline download resolve under the Pages project path',async()=>{
 const dir=path.join(site,'eliana-n25x'),html=await fs.readFile(path.join(dir,'index.html'),'utf8');
 const {document}=parseHTML(html);
 for(const el of document.querySelectorAll('link[href],script[src]')){
  const href=el.getAttribute('href')||el.getAttribute('src'),url=new URL(href,'https://netaniya.github.io'+base+'/eliana-n25x/');
  assert(url.pathname.startsWith(base+'/eliana-n25x/'));assert((await fs.stat(path.join(site,url.pathname.slice(base.length+1)))).isFile());
 }
 const sw=await fs.readFile(path.join(dir,'sw.js'),'utf8');
 const files=JSON.parse(sw.match(/const FILES=(\[[^;]+\]);/)[1]);
 for(const item of files)assert((await fs.stat(path.join(dir,item))).isFile(),item);
 const metadata=JSON.parse(await fs.readFile(path.join(dir,'build-info.json'),'utf8'));
 assert.equal(metadata.locations,6);assert.deepEqual(metadata.languages,languages);assert.equal(metadata.precacheFiles,files.length);
 const offline=await fs.readFile(path.join(dir,'download/eliana-n25x-offline.html'),'utf8');assert(offline.includes('window.EN25X_PORTABLE=true'));assert(!/<script[^>]+src=/.test(offline));assert.equal(Buffer.byteLength(offline),metadata.offlineBytes);
 for(const name of ['node_modules','tests','build.mjs','sw-template.js','package.json'])await assert.rejects(fs.stat(path.join(dir,name)));
});
test('Robot Studio is independently installable and all offline resources resolve under its Pages path',async()=>{
 const studio=path.join(site,'eliana-n25x/workshop'),{document}=parseHTML(await fs.readFile(path.join(studio,'index.html'),'utf8'));
 for(const node of document.querySelectorAll('link[href],script[src]')){
  const u=new URL(node.getAttribute('href')||node.getAttribute('src'),'https://netaniya.github.io'+base+'/eliana-n25x/workshop/');
  assert(u.pathname.startsWith(base+'/eliana-n25x/workshop/'));assert((await fs.stat(path.join(site,u.pathname.slice(base.length+1)))).isFile());
 }
 const info=JSON.parse(await fs.readFile(path.join(studio,'build-info.json'),'utf8'));
 for(const file of Object.keys(info.hashes))assert((await fs.stat(path.join(studio,file))).isFile());
 const manifest=JSON.parse(await fs.readFile(path.join(studio,'manifest.webmanifest'),'utf8'));assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./');
 assert((await fs.stat(path.join(site,'eliana-n25x/3d/index.html'))).isFile());
 for(const name of ['node_modules','tests','build.mjs','sw-template.js','PROGRESS.ru.md'])await assert.rejects(fs.stat(path.join(studio,name)));
});
test('portfolio overview exposes four projects and complete four-language descriptions',async()=>{
 const html=await fs.readFile(path.join(site,'index.html'),'utf8'),{document}=parseHTML(html);
 assert.equal(document.querySelectorAll('.card').length,4);assert(document.querySelector('a.card[href="'+base+'/eliana-n25x/workshop/"]'));
 const script=html.slice(html.indexOf('<script>')+8,html.indexOf('</script>')),ctx={document};vm.createContext(ctx);vm.runInContext(script,ctx);
 const dictionaries=vm.runInContext('copy',ctx);for(const lang of languages){for(const key of ['label','title','intro','motion','desk','lab','game','open'])assert(dictionaries[lang][key],lang+key);}
});

