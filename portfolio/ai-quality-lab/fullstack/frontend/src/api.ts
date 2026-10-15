export type Variant = 'a' | 'b';
export type Outputs = Record<Variant, Record<string, string>>;
export type Rule = {op: string; field?: string; value?: unknown; pass?: boolean};
export type Case = {id: string; title: string; prompt: string; checks: Rule[]; outputs: Record<Variant,string>};
export type Dataset = {id: string; cases: Case[]};
export type Config = {live_available: boolean; model: string | null; calls_per_hour: number};
export type Result = {score: number; passed: number; total: number; rows: {case_id:string;score:number;passed:boolean;checks:Rule[]}[]};
export type Report = {results: Record<Variant, Result>; outputs: Outputs; case_ids:string[]; validation_ms:number; [key: string]:unknown};
export type Receipt = {case_id:string;variant:Variant;text:string;source:'live_model';model:string;response_id:string|null;usage:Record<string,number>;generation_ms:number};
export type Receipts = Record<string,Receipt>;
export async function request<T>(path: string, body?: unknown, token?:string, fetcher:typeof fetch = fetch): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 35000);
  try {
    const response = await fetcher(path, {
      method: body === undefined ? 'GET' : 'POST', signal: controller.signal,
      headers: { ...(body === undefined ? {} : {'Content-Type':'application/json'}), ...(token ? {'X-Generation-Token':token} : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(typeof data.detail === 'string' ? data.detail : `HTTP ${response.status}`);
    }
    return await response.json() as T;
  } finally { clearTimeout(timer); }
}
export function initialOutputs(data: Dataset): Outputs {
  return Object.fromEntries(['a','b'].map(k=>[k,Object.fromEntries(data.cases.map(c=>[c.id,c.outputs[k as Variant]]))])) as Outputs;
}
export function receiptKey(variant:Variant,id:string) {return `${variant}:${id}`;}
export function editOutput(outputs:Outputs, receipts:Receipts, variant:Variant, id:string, text:string) {
  const next = {...receipts}; delete next[receiptKey(variant,id)];
  return {outputs:{...outputs,[variant]:{...outputs[variant],[id]:text}},receipts:next};
}
export function reportDownload(report:Report,receipts:Receipts):string {
  const matching = Object.values(receipts).filter(r=>report.case_ids.includes(r.case_id) && report.outputs[r.variant][r.case_id]===r.text);
  return JSON.stringify({...report,generation_receipts:matching},null,2);
}
