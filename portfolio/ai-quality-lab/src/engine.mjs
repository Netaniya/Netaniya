export const ENGINE_VERSION = '1.1.1';
export function datasetForLanguage(dataset,lang=dataset.language||'de') {
  if(!['de','en','ru','uk'].includes(lang))throw Error('invalid_language');
  if(dataset.language===lang&&!dataset.cases.some(c=>c.translations))return dataset;
  if(dataset.language!==lang&&!dataset.cases.every(c=>c.translations?.[lang]))throw Error('dataset_language');
  return {...dataset,id:dataset.id.replace(/-de-/,`-${lang}-`),language:lang,cases:dataset.cases.map(({translations,...c})=>({...c,...(translations?.[lang]||{})}))};
}
const plain = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const same = (a,b) => typeof a === typeof b && JSON.stringify(a) === JSON.stringify(b);
export function grade(item, output) {
  if (typeof output !== 'string' || output.length > 20000) throw new Error('invalid_output');
  let parsed = null, valid = false;
  try { parsed = JSON.parse(output); valid = plain(parsed); } catch {}
  const checks = item.checks.map(rule => {
    let pass = false;
    switch (rule.op) {
      case 'json_valid': pass = valid; break;
      case 'json_keys': pass = valid && same(Object.keys(parsed).sort(), [...rule.value].sort()); break;
      case 'json_field': pass = valid && Object.hasOwn(parsed,rule.field) && same(parsed[rule.field],rule.value); break;
      case 'exact_text': pass = output.trim() === rule.value; break;
      case 'excludes': pass = !output.includes(rule.value); break;
      default: throw new Error('unsupported_rule');
    }
    return {...rule, pass};
  });
  const passed = checks.filter(c=>c.pass).length;
  return {case_id:item.id,score:passed/checks.length,passed:passed===checks.length,checks};
}
export function validateInput(payload, dataset) {
  if (!plain(payload) || !Array.isArray(payload.case_ids) || !plain(payload.outputs)) throw new Error('invalid_input');
  const ids = payload.case_ids;
  if (!ids.length || ids.length > dataset.cases.length || new Set(ids).size!==ids.length || ids.some(id=>!dataset.cases.some(c=>c.id===id))) throw new Error('invalid_cases');
  for (const c of ['a','b']) {
    if (!plain(payload.outputs[c]) || ids.some(id=>typeof payload.outputs[c][id]!=='string' || payload.outputs[c][id].length>20000)) throw new Error('invalid_output');
  }
  return payload;
}
export function evaluate(payload, dataset) {
  dataset=datasetForLanguage(dataset,payload?.language||dataset.language||'de');
  validateInput(payload,dataset);
  const cases = dataset.cases.filter(c=>payload.case_ids.includes(c.id));
  const results = {};
  for (const candidate of ['a','b']) {
    const rows = cases.map(item=>({...grade(item,payload.outputs[candidate][item.id]),weight:item.weight}));
    const weight = rows.reduce((s,r)=>s+r.weight,0);
    results[candidate]={score:rows.reduce((s,r)=>s+r.score*r.weight,0)/weight,passed:rows.filter(r=>r.passed).length,total:rows.length,rows};
  }
  return {schema_version:1,engine_version:ENGINE_VERSION,dataset_id:dataset.id,language:dataset.language,source:'saved_outputs',model_calls:0,model_latency_ms:null,model_cost_eur:null,results};
}
