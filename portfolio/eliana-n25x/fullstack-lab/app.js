/*! © 2026 Natalie Ragulina (Netaniya). All rights reserved. */
const $=id=>document.getElementById(id);
let busy=false;
async function call(method,path,data){
 const headers={'X-N25X-Lab':'1'};if(data!==undefined)headers['Content-Type']='application/json';
 const response=await fetch(path,{method,headers,body:data===undefined?undefined:JSON.stringify(data),cache:'no-store'});
 const body=response.status===204?null:await response.json();
 $('response').textContent=method+' '+path+'\nHTTP '+response.status+'\n'+JSON.stringify(body,null,2);
 if(!response.ok)throw Error(body?.error||'request_failed');
 return body;
}
async function refresh(){
 const records=await call('GET','/api/projects'),stats=await call('GET','/api/stats');
 $('stats').textContent=stats.total+' total · '+stats.done+' done · '+stats.open+' open';
 $('records').replaceChildren();
 for(const r of records){
  const li=document.createElement('li'),title=document.createElement('span'),toggle=document.createElement('button'),remove=document.createElement('button');
  title.textContent=r.title;toggle.textContent=r.done?'PATCH · Reopen':'PATCH · Complete';remove.textContent='DELETE';
  toggle.addEventListener('click',()=>work(async()=>{await call('PATCH','/api/projects/'+r.id,{done:!r.done});await refresh();}));
  remove.addEventListener('click',()=>work(async()=>{await call('DELETE','/api/projects/'+r.id);await refresh();}));
  li.append(title,toggle,remove);$('records').append(li);
 }
}
async function work(fn){if(busy)return;busy=true;$('status').textContent='Working…';try{await fn();$('status').textContent='Success';}catch(e){$('status').textContent='Error: '+e.message;}finally{busy=false;}}
$('create').addEventListener('submit',e=>{e.preventDefault();work(async()=>{await call('POST','/api/projects',{title:$('title').value});$('title').value='';await refresh();});});
$('refresh').addEventListener('click',()=>work(refresh));
work(refresh);
