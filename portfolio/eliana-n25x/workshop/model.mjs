export const SAVE_KEY='eliana-n25x.workshop.v1';
export const LANGUAGES=['de','en','ru','uk'];
export const COLORS={pearl:'#e9eef5',ocean:'#297fce',orchid:'#a48ae6',copper:'#df9b66',graphite:'#3c485c',mint:'#78c4b1'};
export const SHOP=[
 {id:'orchid',kind:'color',cost:60},{id:'copper',kind:'color',cost:90},
 {id:'graphite',kind:'color',cost:70},{id:'mint',kind:'color',cost:80},
 {id:'projector',kind:'module',cost:100},{id:'speaker',kind:'module',cost:110},{id:'orbit',kind:'module',cost:130}
];
export const ACTIONS=['wave','turn','step','glow','nod','rest'];
export function cleanName(value){return String(value??'').normalize('NFC').replace(/[<>\x00-\x1f]/g,'').trim().slice(0,24)||'Nova';}
export function fresh(){return {schema:SAVE_KEY,lang:'de',started:false,robot:{name:'Nova',color:'pearl',head:'arc',base:'feet',hands:'round',personality:'calm',interest:'space',style:'steps',module:'none'},grade:5,points:80,owned:['pearl','ocean'],earned:{},solved:[],projects:[],sound:true,volume:.35,visits:0};}
export function configure(state,key,value){
 const choices={color:Object.keys(COLORS).filter(v=>state.owned.includes(v)),head:['arc','visor','antenna'],base:['feet','wheels','hover'],hands:['round','clamp'],personality:['calm','cheerful','focused'],interest:['space','nature','music'],style:['steps','visual','challenge'],module:['none',...SHOP.filter(v=>v.kind==='module'&&state.owned.includes(v.id)).map(v=>v.id)]};
 if(key==='name')state.robot.name=cleanName(value);else if(choices[key]?.includes(value))state.robot[key]=value;else return false;return true;
}
export function reward(state,id,amount){if(typeof id!=='string'||id.length>100||!Number.isSafeInteger(amount)||amount<1||amount>100||state.earned[id])return 0;state.earned[id]=amount;state.points+=amount;return amount;}
export function buy(state,id){const item=SHOP.find(v=>v.id===id);if(!item)return 'invalid';if(state.owned.includes(id))return 'owned';if(state.points<item.cost)return 'funds';state.points-=item.cost;state.owned.push(id);configure(state,item.kind==='color'?'color':'module',id);return 'bought';}
export function projectSignature(kind,data){return kind==='melody'?data.steps.join(',')+':'+data.tempo:data.actions.join(',');}
export function addProject(state,kind,data,name){
 if(!['melody','routine'].includes(kind))return null;
 let content;
 if(kind==='melody'){if(!Array.isArray(data.steps)||data.steps.length!==8||!data.steps.every(v=>Number.isInteger(v)&&v>=0&&v<=5)||!data.steps.some(Boolean))return null;content={steps:[...data.steps],tempo:Math.max(70,Math.min(160,Math.round(Number(data.tempo)||110)))};}
 else{if(!Array.isArray(data.actions)||!data.actions.length||data.actions.length>12||!data.actions.every(v=>ACTIONS.includes(v)))return null;content={actions:[...data.actions]};}
 const signature=projectSignature(kind,content),existing=state.projects.find(p=>p.kind===kind&&projectSignature(kind,p.data)===signature);if(existing)return {project:existing,bonus:0,duplicate:true};
 const serial=Math.max(0,...state.projects.map(p=>p.id))+1,project={id:serial,kind,name:cleanName(name),data:content};state.projects.unshift(project);state.projects=state.projects.slice(0,24);
 const count=state.projects.filter(p=>p.kind===kind).length,bonus=count<=3?reward(state,'project:'+kind+':'+count,30):0;return {project,bonus,duplicate:false};
}
export function parseProfile(raw){
 try{if(typeof raw!=='string'||raw.length>100000)return null;const p=JSON.parse(raw);if(p.schema!==SAVE_KEY||!LANGUAGES.includes(p.lang)||!p.robot||!Array.isArray(p.owned)||!Array.isArray(p.projects)||!Array.isArray(p.solved)||typeof p.earned!=='object'||!p.earned)return null;
 const s=fresh();s.started=Boolean(p.started);s.lang=p.lang;s.grade=Number.isInteger(p.grade)&&p.grade>=1&&p.grade<=11?p.grade:5;
 s.owned=[...new Set(['pearl','ocean',...p.owned.filter(v=>SHOP.some(i=>i.id===v))])];for(const [key,value]of Object.entries(p.robot))configure(s,key,value);
 if(!Number.isSafeInteger(p.points)||p.points<0||p.points>100000)return null;s.points=p.points;s.earned=Object.fromEntries(Object.entries(p.earned).filter(([k,v])=>k.length<=100&&Number.isSafeInteger(v)&&v>0&&v<=100).slice(0,2000));s.solved=p.solved.filter(v=>typeof v==='string'&&v.length<100).slice(0,2000);
 s.projects=[];for(const item of p.projects.slice(0,24).reverse()){if(!item||!item.data)continue;const result=addProject(s,item.kind,item.data,item.name);if(result)result.project.id=Number.isSafeInteger(item.id)&&item.id>0?item.id:result.project.id;}
 s.points=p.points;s.earned=Object.fromEntries(Object.entries(p.earned).filter(([k,v])=>k.length<=100&&Number.isSafeInteger(v)&&v>0&&v<=100).slice(0,2000));
 s.sound=p.sound!==false;s.volume=Math.max(0,Math.min(1,Number.isFinite(p.volume)?p.volume:.35));s.visits=Math.max(0,Math.min(100000,Number(p.visits)||0));return s;
 }catch{return null;}
}
