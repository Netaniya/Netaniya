/*!
 * N25X / ELIANA · © 2026 Natalie Ragulina (Netaniya). All rights reserved.
 * Preview serves only the verified generated browser build; no other portfolio files.
 */
import {createServer} from 'node:http';
import {readFile,realpath,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8'};
export function previewPath(raw){
 if(typeof raw!=='string'||!raw.startsWith('/')||raw.startsWith('//')||raw.length>2048)return null;
 let decoded;try{decoded=decodeURIComponent(raw.split('?')[0]);}catch{return null;}
 if(decoded==='/')return 'index.html';
 if(!decoded.startsWith('/')||decoded.includes('\\')||!/^\/[A-Za-z0-9._/-]+$/.test(decoded))return null;
 const segments=decoded.slice(1).split('/');
 if(segments.some(s=>!s||s.startsWith('.')))return null;
 return segments.join('/');
}
export async function createPreviewServer(directory){
 const base=await realpath(directory),metadata=JSON.parse(await readFile(path.join(base,'build-info.json'),'utf8'));
 if(typeof metadata.version!=='string'||!metadata.hashes||typeof metadata.hashes!=='object'||!metadata.hashes['./index.html']||!metadata.hashes['./app.mjs'])throw Error('Invalid workshop build metadata');
 const assets=new Map();
 for(const [key,hash] of Object.entries(metadata.hashes)){
  const file=previewPath('/'+key.replace(/^\.\//,''));if(!file||!key.startsWith('./')||!/^[a-f0-9]{64}$/.test(hash))throw Error('Invalid build asset');
  const resolved=await realpath(path.join(base,file));if(!resolved.startsWith(base+path.sep)||!(await stat(resolved)).isFile())throw Error('Asset outside build');
  const bytes=await readFile(resolved);if(createHash('sha256').update(bytes).digest('hex')!==hash)throw Error('Build asset hash mismatch: '+file);
  assets.set(file,bytes);
 }
 for(const file of ['build-info.json','sw.js']){
  const resolved=await realpath(path.join(base,file));if(!resolved.startsWith(base+path.sep))throw Error('File outside build');assets.set(file,await readFile(resolved));
 }
 if(assets.has('download/N25x-Studio.html'))assets.set('download/Eliana-N25x-Studio.html',assets.get('download/N25x-Studio.html'));
 return createServer((req,res)=>{
  const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-cache'};
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{...headers,Allow:'GET, HEAD'});res.end();return;}
  const file=previewPath(req.url),bytes=assets.get(file);
  if(!bytes){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8',...headers});res.end(req.method==='HEAD'?undefined:'Not found');return;}
  res.writeHead(200,{'Content-Type':MIME[path.extname(file)]||'application/octet-stream','Content-Length':bytes.length,...headers});res.end(req.method==='HEAD'?undefined:bytes);
 });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const server=await createPreviewServer(fileURLToPath(new URL('./dist',import.meta.url)));
 const port=Number(process.env.PORT||8080);if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid port');
 server.listen(port,'0.0.0.0',()=>console.log('N25X review build available on port '+port));
}
