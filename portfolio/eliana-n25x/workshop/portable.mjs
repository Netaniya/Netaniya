// A self-contained offline copy. It neither pushes code nor changes hosting.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('./',import.meta.url)),dist=path.join(root,'dist');
const out=process.argv[2];if(!out||!path.isAbsolute(out))throw Error('Pass an absolute output HTML path after building Studio.');
const info=JSON.parse(await fs.readFile(path.join(dist,'build-info.json'),'utf8'));
const imports={},assets={},hashes={},mime={'.mjs':'text/javascript','.js':'text/javascript','.ttf':'font/ttf','.webp':'image/webp','.png':'image/png','.txt':'text/plain'};
for(const [relative,expected]of Object.entries(info.hashes)){
 const name=relative.slice(2),bytes=await fs.readFile(path.join(dist,name));if(createHash('sha256').update(bytes).digest('hex')!==expected)throw Error('Build changed: '+name);if(name.startsWith('download/'))continue;hashes[name]=expected;
 if(name.endsWith('.mjs')||name.endsWith('.js')){
  const code=bytes.toString().replace(/from\s*(['"])(\.[^'"]+)\1/g,(_m,_q,spec)=>'from '+JSON.stringify('studio/'+path.posix.normalize(path.posix.join(path.posix.dirname(name),spec))));
  imports['studio/'+name]='data:text/javascript;base64,'+Buffer.from(code).toString('base64');
 }else if(name.startsWith('assets/')||name.startsWith('vendor/'))assets[name]='data:'+(mime[path.extname(name)]||'application/octet-stream')+';base64,'+bytes.toString('base64');
}
let css=await fs.readFile(path.join(dist,'studio.css'),'utf8');css=css.replace(/url\((['"]?)\.\/(assets\/[^)'"\s]+)\1\)/g,(_m,_q,name)=>'url("'+assets[name]+'")');
let html=await fs.readFile(path.join(dist,'index.html'),'utf8');
html=html.replace(/<link rel="manifest"[^>]*>/,'').replace('<link rel="stylesheet" href="./studio.css">','<style>'+css+'</style>');
html=html.replace(/\b(src|href)="\.\/((?:assets|vendor)\/[^"]+)"/g,(_m,attribute,name)=>attribute+'="'+assets[name]+'"');
html=html.replace('class="brand" href="./"','class="brand" href="#"');
const boot='<script>globalThis.EN25X_STUDIO_PORTABLE=true;globalThis.EN25X_STUDIO_ASSETS='+JSON.stringify(assets)+';</script><script type="importmap">'+JSON.stringify({imports})+'</script><script type="application/json" id="portable-build-info">'+JSON.stringify({version:info.version,author:'Natalie Ragulina',copyright:'© 2026 Natalie Ragulina. All rights reserved.',mode:'standalone-offline',hashes})+'</script><script type="module">import "studio/app.mjs";</script>';
html=html.replace('<script type="module" src="./app.mjs"></script>',boot);
if(/(?:src|href)="\.\/(?:assets|vendor)|src="\.\/app\.mjs|url\(['"]?\.\//.test(html))throw Error('Unembedded runtime asset');
await fs.mkdir(path.dirname(out),{recursive:true});await fs.writeFile(out,html);console.log(JSON.stringify({file:out,version:info.version,bytes:Buffer.byteLength(html),modules:Object.keys(imports).length,assets:Object.keys(assets).length}));
