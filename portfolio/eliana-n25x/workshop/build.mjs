import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const root=fileURLToPath(new URL('./',import.meta.url)),out=path.join(root,'dist');
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
const files=['index.html','studio.css','app.mjs','model.mjs','math.mjs','robot.mjs','sound.mjs','i18n.mjs','program.mjs','curriculum.mjs','creations.mjs','academy.mjs','manifest.webmanifest'];
for(const file of files)await fs.copyFile(path.join(root,file),path.join(out,file));
await fs.mkdir(path.join(out,'vendor'));for(const file of ['three.module.js','LICENSE.three.txt']){await fs.copyFile(path.join(root,'../3d/vendor',file),path.join(out,'vendor',file));files.push('vendor/'+file);}
await fs.mkdir(path.join(out,'assets'));for(const file of ['Manrope.ttf','OFL.txt','icon-192.png','icon-512.png','eliana-portrait.webp','n25x-portrait.webp']){await fs.copyFile(path.join(root,'../assets',file),path.join(out,'assets',file));files.push('assets/'+file);}
const hashes={};for(const file of files)hashes['./'+file]=createHash('sha256').update(await fs.readFile(path.join(out,file))).digest('hex');
const source=await fs.readFile(path.join(root,'sw-template.js'),'utf8'),portableSource=await fs.readFile(path.join(root,'portable.mjs'),'utf8'),version='en25xstudio-'+createHash('sha256').update(JSON.stringify(hashes)+source+portableSource).digest('hex').slice(0,14);
// Inject the expected worker version, then hash the final app bytes. The version
// fingerprint uses the unexpanded source, avoiding a self-referential hash.
const appPath=path.join(out,'app.mjs');await fs.writeFile(appPath,(await fs.readFile(appPath,'utf8')).replace('__STUDIO_BUILD__',version));
hashes['./app.mjs']=createHash('sha256').update(await fs.readFile(appPath)).digest('hex');
// Generate the standalone download from the already-versioned core files. Its
// metadata excludes downloads, so including its hash below is not recursive.
await fs.writeFile(path.join(out,'build-info.json'),JSON.stringify({version,precacheFiles:files.length,hashes},null,2)+'\n');
const standalone='download/Eliana-N25x-Studio.html';
await promisify(execFile)(process.execPath,[path.join(root,'portable.mjs'),path.join(out,standalone)]);
files.push(standalone);hashes['./'+standalone]=createHash('sha256').update(await fs.readFile(path.join(out,standalone))).digest('hex');
await fs.writeFile(path.join(out,'sw.js'),source.replace('__CACHE_VERSION__',version).replace('__PRECACHE_FILES__',JSON.stringify(Object.keys(hashes))).replace('__PRECACHE_HASHES__',JSON.stringify(hashes)));
await fs.writeFile(path.join(out,'build-info.json'),JSON.stringify({version,precacheFiles:files.length,hashes},null,2)+'\n');
console.log(JSON.stringify({version,precacheFiles:files.length}));
