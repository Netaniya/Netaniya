import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {datasetForLanguage} from '../portfolio/ai-quality-lab/src/engine.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
export const languages=['de','en','ru','uk'];
const projects=['motion-atelier','ai-request-desk','ai-quality-lab','eliana-n25x'];
const read=p=>fs.readFile(path.join(root,p),'utf8');
const embed=s=>s.replace(/^import .*?;\n/gm,'').replace(/\bexport (?=(const|function))/g,'');
function replaceOnce(source,find,replacement){if(source.split(find).length!==2)throw Error('Source contract changed: '+find.slice(0,80));return source.replace(find,replacement);}
function prefixAttributes(text,base){return text.replace(/\b(href|src|poster)="\/(?!\/)/g,(_,key)=>key+'="'+base+'/');}
function prefixCSS(text,base){return text.replace(/url\((['"]?)\/(?!\/)/g,(_,quote)=>'url('+quote+base+'/');}

export function adaptMotion(text,relative,base,origin){
 text=text.replaceAll('https://motion-atelier-neta26.wellolm4.chatgpt.site',origin+base);
 if(relative.endsWith('.html'))return prefixAttributes(text,base);
 if(relative.endsWith('.css')&&!relative.startsWith('assets/vendor/'))return prefixCSS(text,base);
 if(!relative.endsWith('.mjs'))return text;
 if(relative==='app.mjs'){
  text=replaceOnce(text,"const path=location.pathname.endsWith('/')?location.pathname:location.pathname+'/';",'const PAGES_BASE='+JSON.stringify(base)+";\nconst siteUrl=value=>value.startsWith('/')&&!value.startsWith('//')?PAGES_BASE+value:value;\nconst localPath=(location.pathname.slice(PAGES_BASE.length)||'/').replace(/\\/index\\.html$/,'/');\nconst path=localPath.endsWith('/')?localPath:localPath+'/';");
  text=replaceOnce(text,'${esc(href)}','${esc(siteUrl(href))}');
  text=replaceOnce(text,'href="${href}"','href="${siteUrl(href)}"');
  text=text.replace(/\b(href|src)="\/(?!\/)/g,(_,key)=>key+'="${PAGES_BASE}/');
  text=replaceOnce(text,"new URL('/configure/?'+encodeConfig(cfg),location.origin)","new URL(siteUrl('/configure/?'+encodeConfig(cfg)),location.origin)");
  text=replaceOnce(text,".href='/about/#music-credits'",".href=siteUrl('/about/#music-credits')");
 }
 return text.replace(/(['"])\/assets\//g,(_,quote)=>quote+base+'/assets/');
}

export const browserCopy={
 de:{runHelp:'Die Prüfung läuft lokal in deinem Browser. Antworten werden nicht an einen Server gesendet.',pythonHelp:'Python prüft denselben Katalog lokal; diese Web-Demo verwendet JavaScript im Browser.'},
 en:{runHelp:'Checks run locally in your browser. Answers are not sent to a server.',pythonHelp:'Python evaluates the same suite locally; this web demo uses JavaScript in your browser.'},
 ru:{runHelp:'Проверка выполняется в твоём браузере. Ответы не отправляются на сервер.',pythonHelp:'Python проверяет тот же набор локально; это веб-демо использует JavaScript в браузере.'},
 uk:{runHelp:'Перевірка виконується у твоєму браузері. Відповіді не надсилаються на сервер.',pythonHelp:'Python перевіряє той самий набір локально; це вебдемо використовує JavaScript у браузері.'}
};

export async function buildPages({basePath='/Netaniya',origin='https://netaniya.github.io',outDir=path.join(root,'_site')}={}){
 if(!/^\/[A-Za-z0-9_-]+$/.test(basePath)&&basePath!=='')throw Error('Invalid base path');
 const originURL=new URL(origin);if(originURL.protocol!=='https:')throw Error('HTTPS origin required');origin=originURL.origin;
 const write=async(rel,content)=>{const file=path.join(outDir,rel);await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,content);};
 await fs.mkdir(outDir,{recursive:true});
 await fs.cp(path.join(root,'assets/screenshots'),path.join(outDir,'screenshots'),{recursive:true});
 await fs.cp(path.join(root,'portfolio/ai-request-desk/dist'),path.join(outDir,'ai-request-desk'),{recursive:true});
 const motionBase=basePath+'/motion-atelier';
 await fs.cp(path.join(root,'portfolio/motion-atelier/dist'),path.join(outDir,'motion-atelier'),{recursive:true});
 async function adaptDir(dir,rel=''){for(const item of await fs.readdir(dir,{withFileTypes:true})){const next=path.join(dir,item.name),relative=path.posix.join(rel,item.name);if(item.isDirectory())await adaptDir(next,relative);else if(/\.(?:mjs|css|html|xml|txt)$/.test(item.name)){const original=await fs.readFile(next,'utf8'),changed=adaptMotion(original,relative,motionBase,origin);if(changed!==original)await fs.writeFile(next,changed);}}}
 await adaptDir(path.join(outDir,'motion-atelier'));

 const lab='portfolio/ai-quality-lab/',labBase=basePath+'/ai-quality-lab';
 const dataset=JSON.parse(await read(lab+'src/fixtures.json'));
 let state=await read(lab+'src/state.mjs'),ui=await read(lab+'src/ui.mjs');
 state=state.replaceAll("runtime:'javascript_worker'","runtime:'javascript_browser'");
 const request="let data;try{const response=await fetch('/api/evaluate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language:state.lang,case_ids:[id],outputs:{a:{[id]:payload.outputs.a[id]},b:{[id]:payload.outputs.b[id]}}}),signal:controller.signal});if(!response.ok)throw Error('evaluation');data=await response.json()}finally{clearTimeout(timeout)}";
 ui=replaceOnce(ui,request,"let data;try{await new Promise(resolve=>setTimeout(resolve,0));if(controller.signal.aborted)throw new Error('evaluation_timeout');const validationStart=performance.now();data={...evaluate({language:state.lang,case_ids:[id],outputs:{a:{[id]:payload.outputs.a[id]},b:{[id]:payload.outputs.b[id]}}},DATASET),validation_ms:performance.now()-validationStart};}finally{clearTimeout(timeout)}");
 ui=replaceOnce(ui,"runtime:'javascript_worker'","runtime:'javascript_browser'");
 ui=replaceOnce(ui,"'/download/fixtures.json?lang='+state.lang",JSON.stringify(labBase+'/download/fixtures.')+"+state.lang+'.json'");
 const override='for(const [lang,copy] of Object.entries('+JSON.stringify(browserCopy)+'))Object.assign(dictionaries[lang],copy);';
 const js=['const DATASET='+JSON.stringify(dataset).replaceAll('<','\\u003c')+';',embed(await read(lab+'src/engine.mjs')),embed(state),embed(await read(lab+'src/i18n.mjs')),override,embed(ui)].join('\n');
 let html=prefixAttributes(await read(lab+'src/page.html'),labBase).replace('/*__CSS__*/',prefixCSS(await read(lab+'src/style.css'),labBase)).replace('/*__JS__*/',js);
 html=html.replace('Die Prüfung läuft auf dem Server. Antworten werden dort nicht gespeichert.',browserCopy.de.runHelp).replace('Python prüft denselben Katalog lokal; die Web-Demo verwendet JavaScript auf dem Server.',browserCopy.de.pythonHelp);
 html=html.replace('href="'+labBase+'/download/fixtures.json"','href="'+labBase+'/download/fixtures.de.json"');
 await write('ai-quality-lab/index.html',html);
 for(const weight of ['regular','bold'])await write('ai-quality-lab/assets/quality-sans-'+weight+'.woff',Buffer.from((await read(lab+'assets/fonts/quality-sans-'+weight+'.woff.b64')).trim(),'base64'));
 await write('ai-quality-lab/assets/OFL.txt',await read(lab+'assets/fonts/OFL.txt'));
 await write('ai-quality-lab/download/evaluator.py',await read(lab+'python/evaluator.py'));
 for(const lang of languages)await write('ai-quality-lab/download/fixtures.'+lang+'.json',JSON.stringify(datasetForLanguage(dataset,lang),null,2));
 const game=path.join(root,'portfolio/eliana-n25x');
 await promisify(execFile)(process.execPath,[path.join(game,'build.mjs')]);
 for(const name of ['index.html','style.css','app.mjs','engine.mjs','i18n.mjs','audio.mjs','manifest.webmanifest','sw.js','build-info.json'])await write('eliana-n25x/'+name,await fs.readFile(path.join(game,name)));
 for(const name of ['assets','download'])await fs.cp(path.join(game,name),path.join(outDir,'eliana-n25x',name),{recursive:true});
 await promisify(execFile)(process.execPath,[path.join(game,'3d/build.mjs')]);
 await fs.cp(path.join(game,'3d/dist'),path.join(outDir,'eliana-n25x/3d'),{recursive:true});
 await write('index.html',(await read('pages/index.html')).replaceAll('__BASE__',basePath));
 await write('404.html',(await read('pages/404.html')).replaceAll('__BASE__',basePath));
 await write('.nojekyll','');
 return {outDir,basePath,origin,projects};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(await buildPages({basePath:process.env.PAGES_BASE_PATH??'/Netaniya',origin:process.env.PAGES_ORIGIN??'https://netaniya.github.io'})));

