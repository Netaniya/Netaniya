import {evaluate, validateInput} from './engine.mjs';
export function defaults(dataset){return {case_ids:dataset.cases.map(c=>c.id),outputs:{a:Object.fromEntries(dataset.cases.map(c=>[c.id,c.outputs.a])),b:Object.fromEntries(dataset.cases.map(c=>[c.id,c.outputs.b]))}};}
export function restoreState(raw,dataset){
  const fallback={...defaults(dataset),lang:'de',report:null};
  try {
    const saved=JSON.parse(raw);
    if(saved.version!==1 || !['de','en','ru','uk'].includes(saved.lang)) return fallback;
    if(!Array.isArray(saved.case_ids)) return fallback;
    validateInput({...saved,case_ids:dataset.cases.map(c=>c.id)},dataset);
    if(saved.case_ids.some(id=>!dataset.cases.some(c=>c.id===id)) || new Set(saved.case_ids).size!==saved.case_ids.length) return fallback;
    let report=null;
    if(saved.report && saved.case_ids.length){
      const fresh=evaluate(saved,dataset);
      if(JSON.stringify(fresh.results)===JSON.stringify(saved.report.results) && saved.report.dataset_id===dataset.id && saved.report.engine_version===fresh.engine_version && JSON.stringify(saved.report.outputs)===JSON.stringify(saved.outputs) && JSON.stringify(saved.report.case_ids)===JSON.stringify(saved.case_ids) && Number.isFinite(saved.report.validation_ms) && saved.report.validation_ms>=0 && typeof saved.report.created_at==='string' && Number.isFinite(Date.parse(saved.report.created_at))) report={...fresh,outputs:saved.outputs,case_ids:saved.case_ids,validation_ms:saved.report.validation_ms,elapsed_ms:Number.isFinite(saved.report.elapsed_ms)&&saved.report.elapsed_ms>=0?saved.report.elapsed_ms:null,created_at:saved.report.created_at,runtime:'javascript_worker',dataset_provenance:dataset.provenance};
    }
    return {case_ids:saved.case_ids,outputs:saved.outputs,lang:saved.lang,report};
  }catch{return fallback;}
}
