import {describe,it,expect,vi} from 'vitest';
import {initialOutputs,editOutput,reportDownload,request} from './api';
import type {Dataset,Outputs,Receipt,Report} from './api';
const receipt:Receipt={case_id:'T01',variant:'a',text:'generated',source:'live_model',model:'model',response_id:'resp_1',usage:{total_tokens:40},generation_ms:50};
const outputs:Outputs={a:{T01:'generated'},b:{T01:'example'}};
describe('model provenance and reports',()=>{
  it('clears model attribution when an answer is edited',()=>{
    const next=editOutput(outputs,{'a:T01':receipt},'a','T01','human edit');
    expect(next.receipts).toEqual({});expect(next.outputs.a.T01).toBe('human edit');
    expect(outputs.a.T01).toBe('generated');
  });
  it('preserves attribution for an untouched other variant',()=>{
    expect(editOutput(outputs,{'a:T01':receipt},'b','T01','edited').receipts['a:T01']).toEqual(receipt);
  });
  it('exports only receipts matching the selected actual text',()=>{
    const report={case_ids:['T01'],outputs,results:{},validation_ms:1} as Report;
    expect(JSON.parse(reportDownload(report,{'a:T01':receipt})).generation_receipts).toHaveLength(1);
    expect(JSON.parse(reportDownload({...report,outputs:{...outputs,a:{T01:'edited'}}},{'a:T01':receipt})).generation_receipts).toEqual([]);
    expect(JSON.parse(reportDownload({...report,case_ids:['T02']},{'a:T01':receipt})).generation_receipts).toEqual([]);
  });
  it('copies fixtures without mutating the dataset',()=>{
    const data={id:'test',cases:[{id:'T01',outputs:{a:'a',b:'b'}}]} as Dataset;
    const initial=initialOutputs(data);initial.a.T01='edited';expect(data.cases[0].outputs.a).toBe('a');
  });
});
describe('API transport',()=>{
  it('keeps the access token in a request header only',async()=>{
    const fetcher=vi.fn().mockResolvedValue(new Response('{"ok":true}'));
    await request('/api/generate',{case_id:'T01',variant:'a'},'access-code',fetcher);
    expect(fetcher.mock.calls[0][0]).toBe('/api/generate');
    const options=fetcher.mock.calls[0][1];expect(options.headers['X-Generation-Token']).toBe('access-code');
    expect(options.body).not.toContain('access-code');
  });
  it('returns a safe server error for rejected calls',async()=>{
    await expect(request('/api/generate',{},undefined,vi.fn().mockResolvedValue(new Response('{"detail":"live_not_configured"}',{status:503})))).rejects.toThrow('live_not_configured');
  });
  it('handles a non-JSON proxy error',async()=>{
    await expect(request('/api/cases',undefined,undefined,vi.fn().mockResolvedValue(new Response('bad gateway',{status:502})))).rejects.toThrow('HTTP 502');
  });
  it('aborts an unanswered request',async()=>{
    vi.useFakeTimers();
    const fetcher=vi.fn((_url,options)=>new Promise((_resolve,reject)=>{options?.signal?.addEventListener('abort',()=>reject(new Error('timeout')));}));
    const pending=expect(request('/api/cases',undefined,undefined,fetcher as typeof fetch)).rejects.toThrow('timeout');
    await vi.advanceTimersByTimeAsync(35000);await pending;vi.useRealTimers();
  });
});
