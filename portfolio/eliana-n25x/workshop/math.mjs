// A bounded arithmetic/polynomial parser. User input is never executed as code.
const EPS=1e-9;
const trim=p=>{while(p.length>1&&Math.abs(p.at(-1))<EPS)p.pop();return p;};
const add=(a,b,sign=1)=>trim(Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]||0)+sign*(b[i]||0)));
function mul(a,b){if(a.length+b.length>10)throw Error('degree');const c=Array(a.length+b.length-1).fill(0);a.forEach((v,i)=>b.forEach((w,j)=>c[i+j]+=v*w));return trim(c);}
export function number(v){return Math.abs(v)<EPS?'0':String(Math.round(v*1e8)/1e8);}
export function polynomial(p){let s='';for(let i=p.length-1;i>=0;i--){const v=p[i];if(Math.abs(v)<EPS)continue;const a=Math.abs(v);s+=(v<0?'-':s?'+':'')+(i&&Math.abs(a-1)<EPS?'':number(a))+(i?'x'+(i>1?'^'+i:''):'');}return s||'0';}
export function parseExpression(source){
 if(typeof source!=='string'||source.length>140)throw Error('format');source=source.toLowerCase().replaceAll('−','-').replaceAll('×','*').replaceAll('÷','/').replaceAll(',','.').replace(/\s+/g,'');
 if(!source||/[^0-9.x+*/^()%-]/.test(source))throw Error('format');
 let tokens=source.match(/(?:\d*\.\d+|\d+\.?\d*)|x|[+*/^()%-]/g)||[];if(tokens.join('')!==source||tokens.length>100)throw Error('format');
 // Implicit multiplication supports 2x, 2(x+1), and (x+1)(x-1).
 const expanded=[];for(const t of tokens){const prev=expanded.at(-1);if(prev&&(/^(?:[\d.]|x|\))/.test(prev)||prev==='%')&&(/^(?:x|\(|[\d.])/.test(t))&&!(prev.match(/^[\d.]+$/)&&t.match(/^[\d.]+$/)))expanded.push('*');expanded.push(t);}tokens=expanded;
 let at=0,depth=0;const peek=()=>tokens[at],take=()=>tokens[at++];
 function primary(){if(++depth>20)throw Error('depth');const t=take();let p;if(t==='('){p=sum();if(take()!==')')throw Error('format');}else if(t==='x')p=[0,1];else if(t&&/^\d*\.?\d+$/.test(t)){const value=Number(t);if(!Number.isFinite(value)||value>1e12)throw Error('range');p=[value];}else throw Error('format');depth--;return p;}
 function power(){let p=primary();if(peek()==='^'){take();const sign=peek()==='-'?(take(),-1):1,n=Number(take())*sign;if(!Number.isInteger(n)||n<0||n>6)throw Error('power');let c=[1];for(let i=0;i<n;i++)c=mul(c,p);p=c;}while(peek()==='%'){take();p=p.map(v=>v/100);}return p;}
 function unary(){if(peek()==='+'){take();return unary();}if(peek()==='-'){take();return unary().map(v=>-v);}return power();}
 function product(){let p=unary();while(peek()==='*'||peek()==='/'){const op=take(),q=unary();if(op==='*')p=mul(p,q);else{if(q.length!==1||Math.abs(q[0])<EPS)throw Error('division');p=p.map(v=>v/q[0]);}}return p;}
 function sum(){let p=product();while(peek()==='+'||peek()==='-'){const op=take();p=add(p,product(),op==='+'?1:-1);}return p;}
 const p=trim(sum());if(at!==tokens.length||p.some(v=>!Number.isFinite(v)||Math.abs(v)>1e14))throw Error('format');return p;
}
export function solve(source){
 try{let s=String(source).trim();if(/^d\/dx\s+/i.test(s)){s=s.replace(/^d\/dx\s+/i,'');const p=parseExpression(s),q=p.slice(1).map((v,i)=>v*(i+1));return {kind:'derivative',answer:polynomial(q.length?q:[0]),steps:[polynomial(p),polynomial(q.length?q:[0])]};}
 const sides=s.split('=');if(sides.length>2)throw Error('format');
 if(sides.length===1){const p=parseExpression(s);return {kind:p.length===1?'value':'simplify',answer:polynomial(p),value:p.length===1?p[0]:null,steps:[s,polynomial(p)]};}
 const p=add(parseExpression(sides[0]),parseExpression(sides[1]),-1),normal=polynomial(p)+'=0';
 if(p.length===1)return {kind:Math.abs(p[0])<EPS?'identity':'none',answer:'',steps:[normal]};
 if(p.length===2){const value=-p[0]/p[1];return {kind:'linear',answer:'x = '+number(value),value,steps:[normal,number(p[1])+'x = '+number(-p[0]),'x = '+number(value)]};}
 if(p.length===3){const [c,b,a]=p,d=b*b-4*a*c;if(d<-EPS)return {kind:'noReal',answer:'',steps:[normal,'D = '+number(d)]};const roots=[(-b-Math.sqrt(Math.max(0,d)))/(2*a),(-b+Math.sqrt(Math.max(0,d)))/(2*a)].sort((x,y)=>x-y);return {kind:'quadratic',answer:'x = '+[...new Set(roots.map(number))].join('; '),roots,steps:[normal,'D = '+number(d),'x = (-b ± √D) / (2a)']};}
 throw Error('degree');
 }catch(error){return {kind:'error',error:error.message};}
}
// Original practice examples. Grade is a difficulty guide, not a national syllabus.
export const MATH=[
 {topic:'addition',tasks:[['7 + 5',12,'7 + 3 + 2 = 12'],['14 - 6',8,'14 - 4 - 2 = 8'],['9 + 8',17,'9 + 1 + 7 = 17']]},
 {topic:'multiply',tasks:[['6 × 4',24,'6 + 6 + 6 + 6 = 24'],['7 × 3',21,'7 + 7 + 7 = 21'],['8 × 5',40,'8 × 10 ÷ 2 = 40']]},
 {topic:'divide',tasks:[['36 ÷ 6',6,'6 × 6 = 36'],['56 ÷ 7',8,'7 × 8 = 56'],['45 ÷ 5',9,'5 × 9 = 45']]},
 {topic:'fractions',tasks:[['1/2 + 1/4',.75,'2/4 + 1/4 = 3/4'],['3/4 - 1/2',.25,'3/4 - 2/4 = 1/4'],['2/3 × 3',2,'(2 × 3)/3 = 2']]},
 {topic:'decimals',tasks:[['2.4 + 1.8',4.2,'2 + 1 + 0.4 + 0.8 = 4.2'],['7.5 - 2.75',4.75,'7.50 - 2.75 = 4.75'],['1.2 × 5',6,'12 × 5 ÷ 10 = 6']]},
 {topic:'percent',tasks:[['20% × 150',30,'150 × 20 ÷ 100 = 30'],['15% × 80',12,'80 × 15 ÷ 100 = 12'],['25% × 240',60,'240 ÷ 4 = 60']]},
 {topic:'negative',tasks:[['-8 + 13',5,'13 - 8 = 5'],['-4 × -6',24,'(-) × (-) = (+)'],['-15 - 7',-22,'-(15 + 7) = -22']]},
 {topic:'linear',tasks:[['2x + 3 = 11',4,'2x = 8 → x = 4'],['3x - 6 = 15',7,'3x = 21 → x = 7'],['5x + 4 = 19',3,'5x = 15 → x = 3']]},
 {topic:'powers',tasks:[['3^3 - 2^3',19,'27 - 8 = 19'],['2^5 + 4',36,'32 + 4 = 36'],['5^2 - 3^2',16,'25 - 9 = 16']]},
 {topic:'quadratic',tasks:[['x^2 = 49; x > 0',7,'x = √49 = 7'],['x^2 - 9 = 0; x > 0',3,'x^2 = 9 → x = 3'],['x^2 = 144; x > 0',12,'x = √144 = 12']]},
 {topic:'derivative',tasks:[['f(x)=x^3; f′(2)',12,'f′(x)=3x^2 → f′(2)=12'],['f(x)=x^2+2x; f′(3)',8,'f′(x)=2x+2 → f′(3)=8'],['f(x)=4x^2; f′(2)',16,'f′(x)=8x → f′(2)=16']]}
];
export function matchesAnswer(input,expected){const r=solve(String(input));return r.kind==='value'&&Math.abs(r.value-expected)<1e-7;}
// A reproducible three-exercise daily set. Everything is generated locally.
export function dailyTasks(grade,date){
 let seed=[...String(date)+':'+grade].reduce((s,c)=>(Math.imul(s,31)+c.charCodeAt(0))>>>0,17);
 const rand=(lo,hi)=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return lo+seed%(hi-lo+1);};
 return Array.from({length:3},(_,i)=>{
  const a=rand(2,8),b=rand(2,7),x=rand(2,8)+i;
  switch(grade){
   case 1:return [a+' + '+(b+i),a+b+i,a+' + '+(b+i)+' = '+(a+b+i)];
   case 2:return [a+' × '+x,a*x,Array.from({length:a},()=>x).join(' + ')+' = '+a*x];
   case 3:return [a*x+' ÷ '+a,x,a+' × '+x+' = '+a*x];
   case 4:return [a+'/4 + '+(i+1)+'/4',(a+i+1)/4,'('+a+' + '+(i+1)+')/4 = '+(a+i+1)+'/4'];
   case 5:{const n=(a*10+b)/10,m=(x*10+i+1)/10;return [number(n)+' + '+number(m),n+m,number(n)+' + '+number(m)+' = '+number(n+m)];}
   case 6:{const p=5*(i+1),n=a*20;return [p+'% × '+n,p*n/100,n+' × '+p+' ÷ 100 = '+number(p*n/100)];}
   case 7:return ['-'+a+' + '+x,x-a,x+' - '+a+' = '+(x-a)];
   case 8:return [a+'x + '+b+' = '+(a*x+b),x,a+'x = '+a*x+' → x = '+x];
   case 9:return [a+'^2 + '+x,a*a+x,a*a+' + '+x+' = '+(a*a+x)];
   case 10:return ['x^2 = '+x*x+'; x > 0',x,'x = √'+x*x+' = '+x];
   default:return ['f(x)='+a+'x^2+'+b+'x; f′('+x+')',2*a*x+b,'f′(x)='+2*a+'x+'+b+' → f′('+x+')='+(2*a*x+b)];
  }
 });
}
export const WORDS=[['hello','hello'],['thanks','thank you'],['school','school'],['friend','friend'],['left','left'],['right','right'],['tomorrow','tomorrow'],['water','water'],['create','create'],['question','question'],['together','together'],['understand','understand']];
