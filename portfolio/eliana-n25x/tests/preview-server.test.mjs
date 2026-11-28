import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,mkdir,rm,symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {request} from 'node:http';
import {createPreviewServer,previewPath} from '../workshop/preview-server.mjs';
test('Preview route allowlist rejects traversal, hidden paths, ambiguous URLs',()=>{
 for(const raw of ['/../README.md','/%2e%2e/README.md','/assets/../../.git/config','/.env','//example.org','/assets%5c..%5csecret','/%00','/%zz','/assets//file','/assets/','/foo%20bar','/%252e%252e/secret'])assert.equal(previewPath(raw),null,raw);
 assert.equal(previewPath('/'),'index.html');assert.equal(previewPath('/app.mjs?v=2'),'app.mjs');assert.equal(previewPath('/assets/icon-192.png'),'assets/icon-192.png');
});
test('Actual HTTP preview serves verified assets, blocks other files, HEAD and methods',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'n25x-preview-'));let server;
 try{
 const dist=path.join(root,'dist');await mkdir(dist);await mkdir(path.join(dist,'download'));
 const assets={'index.html':'<h1>N25X</h1>','app.mjs':'export const ready=true;','download/N25x-Studio.html':'standalone'};
 const hashes={};for(const [file,body]of Object.entries(assets)){await writeFile(path.join(dist,file),body);hashes['./'+file]=createHash('sha256').update(body).digest('hex');}
 await writeFile(path.join(dist,'build-info.json'),JSON.stringify({version:'test',hashes}));await writeFile(path.join(dist,'sw.js'),'// worker');await writeFile(path.join(dist,'.env'),'secret');await writeFile(path.join(dist,'private.txt'),'not an asset');await writeFile(path.join(root,'README.md'),'private');
 server=await createPreviewServer(dist);await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const port=server.address().port;const get=(url,method='GET')=>new Promise((resolve,reject)=>{const q=request({hostname:'127.0.0.1',port,path:url,method},r=>{let body='';r.setEncoding('utf8');r.on('data',c=>body+=c);r.on('end',()=>resolve({status:r.statusCode,headers:r.headers,body}));});q.on('error',reject);q.end();});
 assert.equal((await get('/')).body,assets['index.html']);const js=await get('/app.mjs?v=1');assert.equal(js.status,200);assert.match(js.headers['content-type'],/javascript/);assert.equal(js.headers['x-robots-tag'],'noindex, nofollow');assert.equal(js.headers['x-content-type-options'],'nosniff');
 const head=await get('/app.mjs','HEAD');assert.equal(head.body,'');assert.equal(Number(head.headers['content-length']),assets['app.mjs'].length);
 assert.equal((await get('/download/Eliana-N25x-Studio.html')).body,'standalone');assert.equal((await get('/sw.js')).status,200);assert.equal((await get('/build-info.json')).status,200);
 for(const url of ['/private.txt','/.env','/../README.md','/%2e%2e/README.md','/download/','/missing'])assert.equal((await get(url)).status,404,url);
 assert.equal((await get('/','POST')).status,405);
 await writeFile(path.join(dist,'app.mjs'),'modified');await assert.rejects(createPreviewServer(dist),/hash mismatch/);
 await rm(path.join(dist,'app.mjs'));await symlink(path.join(root,'README.md'),path.join(dist,'app.mjs'));await assert.rejects(createPreviewServer(dist),/outside build/);
 }finally{if(server)await new Promise(r=>server.close(r));await rm(root,{recursive:true,force:true});}
});
