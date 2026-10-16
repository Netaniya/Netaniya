// A deliberately small JavaScript interpreter. Learner programs cannot access
// the DOM, network, globals, properties, constructors or the host JS evaluator.
// The same interpreter runs lessons, the quiz editor and exported games.
export function createInterpreter() {
  const fail = code => { throw new Error(code); };
  function parse(source) {
    if (typeof source !== 'string' || source.length > 4000) fail('size');
    const tokens = []; let pos = 0;
    const pattern = /\s+|\/\/[^\n]*|(?:\d+(?:\.\d+)?)|(?:[A-Za-z_][A-Za-z_0-9]*)|===|!==|<=|>=|&&|\|\||\+\+|--|[{}(),;=+*/%<>!\-]/y;
    while (pos < source.length) {
      pattern.lastIndex = pos; const match = pattern.exec(source);
      if (!match) fail('syntax'); pos = pattern.lastIndex;
      if (!/^\s|^\/\//.test(match[0])) tokens.push(match[0]);
      if (tokens.length > 1400) fail('size');
    }
    let i = 0, depth = 0;
    const peek = () => tokens[i], take = () => tokens[i++];
    const eat = value => { if (take() !== value) fail('syntax'); };
    const identifier = () => { const value = take(); if (!/^[A-Za-z_]\w*$/.test(value || '') || ['function','return','let','if','else','for','true','false'].includes(value)) fail('syntax'); return value; };
    const precedence = {'||':1,'&&':2,'===':3,'!==':3,'<':4,'>':4,'<=':4,'>=':4,'+':5,'-':5,'*':6,'/':6,'%':6};
    function expression(min = 0) {
      if (++depth > 60) fail('depth');
      let node, value = take();
      if (value === '!' || value === '-') node = {type:'unary', op:value, value:expression(7)};
      else if (value === '(') { node = expression(); eat(')'); }
      else if (/^\d/.test(value || '')) node = {type:'literal', value:Number(value)};
      else if (value === 'true' || value === 'false') node = {type:'literal', value:value === 'true'};
      else if (/^[A-Za-z_]\w*$/.test(value || '')) {
        node = {type:'name', name:value};
        if (peek() === '(') { take(); const args = []; if (peek() !== ')') { do { args.push(expression()); if (peek() !== ',') break; take(); } while (true); } eat(')'); node = {type:'call', name:value, args}; }
      } else fail('syntax');
      while (precedence[peek()] >= min) { const op = take(), priority = precedence[op]; node = {type:'binary', op, left:node, right:expression(priority + 1)}; }
      depth--; return node;
    }
    function assignment(declare = false) {
      const name = identifier(); let value;
      if (peek() === '++' || peek() === '--') { const op = take() === '++' ? '+' : '-'; value = {type:'binary', op, left:{type:'name',name},right:{type:'literal',value:1}}; }
      else { eat('='); value = expression(); }
      return {type:declare?'let':'assign',name,value};
    }
    function block() {
      if (++depth > 60) fail('depth'); eat('{'); const body = [];
      while (peek() !== '}') { if (i >= tokens.length) fail('syntax'); body.push(statement()); }
      eat('}'); depth--; return body;
    }
    function statement() {
      if (peek() === 'let') { take(); const n = assignment(true); eat(';'); return n; }
      if (peek() === 'return') { take(); const value = expression(); eat(';'); return {type:'return',value}; }
      if (peek() === 'if') { take(); eat('('); const condition = expression(); eat(')'); const yes = block(); let no = []; if (peek() === 'else') { take(); no = block(); } return {type:'if',condition,yes,no}; }
      if (peek() === 'for') { take(); eat('('); eat('let'); const init = assignment(true); eat(';'); const condition = expression(); eat(';'); const update = assignment(); eat(')'); return {type:'for',init,condition,update,body:block()}; }
      const n = assignment(); eat(';'); return n;
    }
    const functions = new Map();
    while (i < tokens.length) {
      eat('function'); const name = identifier(); eat('('); const params = [];
      if (peek() !== ')') { do { params.push(identifier()); if (peek() !== ',') break; take(); } while (true); }
      eat(')'); if (functions.has(name) || new Set(params).size !== params.length || params.length > 8 || functions.size >= 8) fail('syntax');
      functions.set(name, {params,body:block()});
    }
    if (!functions.size) fail('syntax'); return functions;
  }
  function run(source, entry, args = []) {
    const functions = parse(source), trace = []; let budget = 3000, calls = 0;
    const tick = () => { if (--budget < 0) fail('budget'); };
    const primitive = value => { if (typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= 1e9 || typeof value === 'boolean') return value; fail('value'); };
    const record = (name,value) => { if (trace.length < 24) trace.push({name,value}); };
    function evaluate(node, env) {
      tick();
      if (node.type === 'literal') return node.value;
      if (node.type === 'name') { if (!env.has(node.name)) fail('name'); return env.get(node.name); }
      if (node.type === 'unary') { const v = evaluate(node.value,env); return primitive(node.op === '!' ? !v : -v); }
      if (node.type === 'call') return invoke(node.name,node.args.map(a=>evaluate(a,env)));
      const a = evaluate(node.left,env);
      if (node.op === '&&' && !a) return a;
      if (node.op === '||' && a) return a;
      const b = evaluate(node.right,env);
      const operators = {'+':()=>a+b,'-':()=>a-b,'*':()=>a*b,'/':()=>a/b,'%':()=>a%b,'===':()=>a===b,'!==':()=>a!==b,'<':()=>a<b,'>':()=>a>b,'<=':()=>a<=b,'>=':()=>a>=b,'&&':()=>b,'||':()=>b};
      return primitive(operators[node.op]());
    }
    function execute(body, env) {
      for (const s of body) {
        tick();
        if (s.type === 'let' || s.type === 'assign') {
          if (s.type === 'let' ? env.has(s.name) : !env.has(s.name)) fail('name');
          const value = evaluate(s.value,env); env.set(s.name,value); record(s.name,value);
        } else if (s.type === 'return') return {value:evaluate(s.value,env)};
        else if (s.type === 'if') { const result = execute(evaluate(s.condition,env)?s.yes:s.no,env); if (result) return result; }
        else if (s.type === 'for') {
          const local = new Map(env); execute([s.init],local);
          while (evaluate(s.condition,local)) { tick(); const result = execute(s.body,local); if (result) return result; execute([s.update],local); }
          for (const name of env.keys()) env.set(name,local.get(name));
        }
      }
    }
    function invoke(name, values) {
      tick(); const fn = functions.get(name); if (!fn || fn.params.length !== values.length) fail('name');
      if (++calls > 16) fail('depth');
      const env = new Map(fn.params.map((p,i)=>[p,primitive(values[i])])), result = execute(fn.body,env);
      calls--; if (!result) fail('return'); return primitive(result.value);
    }
    return {value:invoke(entry,args),trace,steps:3000-budget};
  }
  return {parse,run};
}

export function runProgram(source, entry, args) {
  try { return {ok:true,...createInterpreter().run(source,entry,args)}; }
  catch (e) { return {ok:false,error:['syntax','size','depth','budget','value','name','return'].includes(e.message)?e.message:'syntax',trace:[]}; }
}

export const SCORE_PROGRAM = 'function mark(score, correct, points) {\n  if (correct) {\n    return score + points;\n  }\n  return score;\n}';
export function validScoreProgram(source) {
  if (typeof source !== 'string') return false;
  return [[0,true,10],[0,false,10],[7,true,5],[7,false,5],[20,true,20]].every(args=>{
    const r = runProgram(source,'mark',args); return r.ok && r.value === args[0] + (args[1]?args[2]:0);
  });
}
