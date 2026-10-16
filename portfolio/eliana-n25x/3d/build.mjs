import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('./',import.meta.url)),out=path.join(root,'dist');
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
const files=['index.html','app.mjs','game.css','world.mjs','actors.mjs','simulation.mjs','i18n.mjs','manifest.webmanifest','vendor/three.module.js','vendor/LICENSE.three.txt'];
for(const file of files){await fs.mkdir(path.dirname(path.join(out,file)),{recursive:true});await fs.copyFile(path.join(root,file),path.join(out,file));}
await fs.copyFile(path.join(root,'../audio.mjs'),path.join(out,'audio.mjs'));files.push('audio.mjs');
await fs.mkdir(path.join(out,'assets'),{recursive:true});
for(const file of ['Manrope.ttf','OFL.txt','icon-192.png','icon-512.png']){await fs.copyFile(path.join(root,'../assets',file),path.join(out,'assets',file));files.push('assets/'+file);}
const hashes={};for(const file of files)hashes['./'+file]=createHash('sha256').update(await fs.readFile(path.join(out,file))).digest('hex');
const source=await fs.readFile(path.join(root,'sw-template.js'),'utf8');const version='en25x3d-'+createHash('sha256').update(JSON.stringify(hashes)+source).digest('hex').slice(0,14);
await fs.writeFile(path.join(out,'sw.js'),source.replace('__CACHE_VERSION__',version).replace('__PRECACHE_FILES__',JSON.stringify(Object.keys(hashes))).replace('__PRECACHE_HASHES__',JSON.stringify(hashes)));
const metadata={version,locations:6,languages:['de','en','ru','uk'],precacheFiles:files.length,hashes};await fs.writeFile(path.join(out,'build-info.json'),JSON.stringify(metadata,null,2)+'\n');
console.log(JSON.stringify({version,locations:6,precacheFiles:files.length}));
