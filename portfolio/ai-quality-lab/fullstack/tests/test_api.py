import json
import httpx
import pytest
from fastapi.testclient import TestClient
from backend.app import CASES, Settings, create_app

TOKEN = "test-access-token-" + "x" * 32
CONFIG = Settings(True, "fake-provider-key-for-tests", "test-model", TOKEN, 2)
HEADERS = {"X-Generation-Token": TOKEN}


def response_data(text='{"id":"DEMO-104","total_eur":149}'):
    return {"id":"resp_test", "status":"completed", "output":[{"type":"message","content":[{"type":"output_text","text":text}]}],
            "usage":{"input_tokens":30,"output_tokens":12,"total_tokens":42,"secret_extra":"do-not-export"}}


def payload():
    return {"case_ids":list(CASES), "outputs":{v:{i:c["outputs"][v] for i,c in CASES.items()} for v in ("a","b")}}


def test_default_config_exposes_no_secrets_or_model_access():
    client = TestClient(create_app(Settings()))
    assert not client.get('/api/config').json()['live_available']
    assert client.post('/api/generate',json={"case_id":"T01","variant":"a"}).status_code == 503
    assert client.get('/api/config').headers['cache-control'] == 'no-store'


def test_demo_scores_and_export_replay():
    client = TestClient(create_app(Settings()))
    report = client.post('/api/evaluate',json=payload()).json()
    assert report['results']['a']['passed'] == 4
    assert report['results']['b']['passed'] == 7
    replay = client.post('/api/evaluate',json={k:report[k] for k in ('case_ids','outputs')}).json()
    assert report['results'] == replay['results']
    assert report['runtime'] == 'fastapi-python'


@pytest.mark.parametrize('bad',[
    {'case_ids':['T99'],'outputs':{'a':{},'b':{}}},
    {'case_ids':['T01','T01'],'outputs':{'a':{'T01':'x'},'b':{'T01':'x'}}},
    {'case_ids':['T01'],'outputs':{'a':{'T01':False},'b':{'T01':'x'}}},
    {'case_ids':['T01'],'outputs':{'a':{'T01':'😀'*10001},'b':{'T01':'x'}}},
])
def test_rejects_invalid_evaluation(bad):
    assert TestClient(create_app(Settings())).post('/api/evaluate',json=bad).status_code == 422


def test_live_access_is_required_before_provider_call():
    def never(request):
        raise AssertionError('Provider must not be called')
    client = TestClient(create_app(CONFIG,httpx.MockTransport(never)))
    assert client.post('/api/generate',json={'case_id':'T01','variant':'a'}).status_code == 401
    assert client.post('/api/generate',json={'case_id':'T01','variant':'a','prompt':'arbitrary paid prompt'},headers=HEADERS).status_code == 422
    assert client.post('/api/generate',json={'case_id':'T99','variant':'a'},headers=HEADERS).status_code == 422


def test_provider_contract_and_live_provenance():
    def provider(request):
        assert str(request.url) == 'https://api.openai.com/v1/responses'
        body = json.loads(request.content)
        assert body['store'] is False
        assert body['max_output_tokens'] == 512
        assert body['model'] == 'test-model'
        assert body['input'] == CASES['T01']['prompt']
        assert request.headers['authorization'] == 'Bearer fake-provider-key-for-tests'
        return httpx.Response(200,json=response_data())
    client = TestClient(create_app(CONFIG,httpx.MockTransport(provider)))
    response = client.post('/api/generate',json={'case_id':'T01','variant':'b'},headers=HEADERS)
    assert response.status_code == 200
    data = response.json()
    assert data['source'] == 'live_model'
    assert data['model'] == 'test-model'
    assert data['usage'] == {'input_tokens':30,'output_tokens':12,'total_tokens':42}
    assert data['generation_ms'] >= 0
    assert CONFIG.api_key not in response.text


@pytest.mark.parametrize('mode,code', [('timeout',504),('rate',502),('broken',502),('incomplete',502),('empty',502)])
def test_sanitized_provider_failures(mode,code):
    def provider(request):
        if mode == 'timeout':
            raise httpx.ReadTimeout('sensitive upstream error',request=request)
        if mode == 'rate': return httpx.Response(429,text='sensitive upstream error')
        if mode == 'broken': return httpx.Response(200,json={'output':None})
        if mode == 'incomplete': return httpx.Response(200,json={**response_data(),'status':'incomplete'})
        return httpx.Response(200,json=response_data(''))
    client = TestClient(create_app(CONFIG,httpx.MockTransport(provider)))
    response = client.post('/api/generate',json={'case_id':'T01','variant':'a'},headers=HEADERS)
    assert response.status_code == code
    assert 'sensitive' not in response.text
    assert CONFIG.api_key not in response.text


def test_budget_counts_failed_attempts_and_resets():
    now = [0.0]; attempts = []
    def provider(request):
        attempts.append(request)
        return httpx.Response(503,text='unavailable')
    client = TestClient(create_app(CONFIG,httpx.MockTransport(provider),clock=lambda:now[0]))
    for _ in range(2):
        assert client.post('/api/generate',json={'case_id':'T01','variant':'a'},headers=HEADERS).status_code == 502
    assert client.post('/api/generate',json={'case_id':'T01','variant':'a'},headers=HEADERS).status_code == 429
    assert len(attempts) == 2
    now[0] = 3600
    assert client.post('/api/generate',json={'case_id':'T01','variant':'a'},headers=HEADERS).status_code == 502
    assert len(attempts) == 3


def test_model_configuration_requires_explicit_enable_and_strong_access_token():
    assert not Settings(False,'fake-key','model',TOKEN).ready
    assert not Settings(True,'fake-key','model','short').ready
    assert not Settings(True,'','model',TOKEN).ready
    assert CONFIG.ready


def test_python_boolean_is_not_accepted_as_numeric_amount():
    data = payload();data['case_ids']=['T01'];data['outputs']['b']['T01']='{"id":"DEMO-104","total_eur":true}'
    report = TestClient(create_app(Settings())).post('/api/evaluate',json=data).json()
    assert report['results']['b']['passed'] == 0


def test_built_react_page_is_served():
    client = TestClient(create_app(Settings()))
    page = client.get('/')
    assert page.status_code == 200
    assert '<div id="root"></div>' in page.text
    assert '/assets/' in page.text
