(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DeskEngine=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const LANGS=['en','de','ru','uk'];
  const INVOICES=[{id:'DEMO-104',amount:14900,currency:'EUR',description:'Website maintenance · April',customer:'Alex Example'},{id:'DEMO-205',amount:8900,currency:'EUR',description:'Automation support · April',customer:'Sam Example'}];
  const wording={
    de:{missing:'Die Rechnungsnummer fehlt.',unknown:'Diese Rechnung ist nicht im Demo-Verzeichnis.',noamount:'Im Anliegen ist kein eindeutiger Betrag angegeben.',match:'Der genannte Betrag stimmt mit der Demo-Rechnung überein. Die Beanstandung ist damit noch nicht geklärt.',mismatch:'Der genannte Betrag weicht von der Demo-Rechnung ab. Das bestätigt eine Differenz, aber noch keinen Rechnungsfehler.',general:'Allgemeine Anfrage; keine automatische Entscheidung.',intro:'Vielen Dank für Ihre Nachricht.',need:'Bitte teilen Sie uns die Rechnungsnummer mit, damit wir Ihr Anliegen prüfen können.',lookup:'Wir konnten die angegebene Rechnung in unseren Unterlagen noch nicht zuordnen. Bitte prüfen Sie die Rechnungsnummer.',review:'Wir haben Ihr Anliegen zur Rechnung {id} zur Prüfung aufgenommen. Wir klären die Angaben und melden uns mit dem Ergebnis.',normal:'Wir haben Ihre Anfrage zur Prüfung aufgenommen und melden uns mit den nächsten Schritten.'},
    en:{missing:'Invoice number is missing.',unknown:'This invoice is not in the demo directory.',noamount:'No unambiguous amount was provided.',match:'The stated amount matches the demo invoice. This does not resolve the complaint.',mismatch:'The stated amount differs from the demo invoice. A difference is confirmed, not an invoice error.',general:'General request; no automatic decision.',intro:'Thank you for your message.',need:'Please provide the invoice number so we can review your request.',lookup:'We could not match the invoice to our records yet. Please check the invoice number.',review:'We have received your request about invoice {id} for review. We will check the details and get back to you with the outcome.',normal:'We have received your request for review and will get back to you with the next steps.'},
    ru:{missing:'Не указан номер счёта.',unknown:'Счёт не найден в демонстрационном справочнике.',noamount:'В обращении не указана однозначная сумма.',match:'Указанная сумма совпадает с учебным счётом. Это ещё не решает вопрос клиента.',mismatch:'Сумма из обращения отличается от учебного счёта. Подтверждено расхождение, а не ошибка счёта.',general:'Общее обращение; автоматическое решение не принимается.',intro:'Спасибо за ваше сообщение.',need:'Пожалуйста, укажите номер счёта, чтобы мы могли проверить обращение.',lookup:'Мы пока не смогли найти указанный счёт. Пожалуйста, проверьте его номер.',review:'Ваше обращение по счёту {id} принято на проверку. Мы уточним данные и сообщим результат.',normal:'Ваше обращение принято на проверку. Мы сообщим о следующих шагах.'},
    uk:{missing:'Не вказано номер рахунку.',unknown:'Рахунок не знайдено в демонстраційному довіднику.',noamount:'У зверненні не вказано однозначну суму.',match:'Зазначена сума збігається з навчальним рахунком. Це ще не вирішує питання клієнта.',mismatch:'Сума зі звернення відрізняється від навчального рахунку. Підтверджено розбіжність, а не помилку рахунку.',general:'Загальне звернення; автоматичне рішення не приймається.',intro:'Дякуємо за ваше повідомлення.',need:'Будь ласка, вкажіть номер рахунку, щоб ми могли перевірити звернення.',lookup:'Ми поки не змогли знайти зазначений рахунок. Будь ласка, перевірте його номер.',review:'Ваше звернення щодо рахунку {id} прийнято на перевірку. Ми уточнимо дані та повідомимо результат.',normal:'Ваше звернення прийнято на перевірку. Ми повідомимо про наступні кроки.'}
  };
  function language(x){if(!LANGS.includes(x))throw Error('language');return x;}
  function validText(x,max){return typeof x==='string'&&x.trim().length>0&&x.length<=max;}
  function log(r,action,detail=''){r.events.push({action,detail,at:new Date().toISOString()});}
  function create(subject,body,replyLang='de',id){if(!validText(subject,200)||!validText(body,10000))throw Error('input');language(replyLang);const r={id:id||globalThis.crypto.randomUUID(),subject:subject.trim(),body:body.trim(),replyLang,status:'new',analysis:null,draft:'',revision:0,created:new Date().toISOString(),events:[]};log(r,'created');return r;}
  function invoiceCheck(text){
    const ids=[...new Set((text.match(/DEMO-\d+/gi)||[]).map(x=>x.toUpperCase()))];
    if(ids.length>1)return {kind:'ambiguous',invoiceId:null,amount:null,record:null};
    if(!ids.length)return {kind:'missing',invoiceId:null,amount:null,record:null};
    const record=INVOICES.find(x=>x.id===ids[0])||null;
    const amountText=text.replace(/DEMO-\d+/gi,'');
    const matches=[...amountText.matchAll(/(?:€\s*([0-9][0-9.,]*)|(?<![\d.,])([0-9][0-9.,]*)\s*(?:EUR\b|Euro\b|€))/gi)];
    // Reject unsupported number formats rather than interpreting only a suffix.
    const raw=matches.map(x=>x[1]||x[2]);
    const valid=raw.every(x=>/^\d{1,6}(?:[.,]\d{1,2})?$/.test(x));
    const values=valid?[...new Set(raw.map(x=>Math.round(Number(x.replace(',','.'))*100)))]:[];
    const amount=values.length===1?values[0]:null;
    return {kind:!record?'unknown':values.length>1?'ambiguous':amount===null?'noamount':amount===record.amount?'match':'mismatch',invoiceId:ids[0],amount,record:record?{...record}:null};
  }
  function process(r,{fail=false}={}){
    if(!['new','error','review','deferred'].includes(r.status))throw Error('transition');
    if(fail){r.status='error';r.analysis=null;r.draft='';r.revision++;log(r,'analysis_failed');return r;}
    const text=r.subject+'\n'+r.body;const check=invoiceCheck(text);
    const billing=!!check.invoiceId||/rechnung|invoice|сч[её]т|рахунк|рахунок|zahlung|payment/i.test(text);
    const category=billing?'billing':/login|error|fehler|ошиб|помилк/i.test(text)?'technical':'general';
    r.analysis={category,check:billing?check:{kind:'general',invoiceId:null,amount:null,record:null},provider:'deterministic-demo',mode:'rules',originalDraft:''};
    r.status='review';r.revision++;r.draft=makeDraft(r,r.replyLang);r.analysis.originalDraft=r.draft;log(r,'analysis_ready',check.kind);return r;
  }
  function makeDraft(r,lang){language(lang);const w=wording[lang];let kind=r.analysis?.check.kind;if(!r.analysis)return '';return w.intro+'\n\n'+(kind==='missing'?w.need:kind==='unknown'?w.lookup:kind==='general'?w.normal:w.review.replace('{id}',r.analysis.check.invoiceId||'—'));}
  function resultText(r,lang){language(lang);const kind=r.analysis?.check.kind;return kind==='ambiguous'?{de:'Mehrere Nummern oder Beträge gefunden. Bitte manuell prüfen.',en:'Multiple numbers or amounts found. Please review manually.',ru:'Найдено несколько номеров или сумм. Нужна ручная проверка.',uk:'Знайдено кілька номерів або сум. Потрібна ручна перевірка.'}[lang]:wording[lang][kind]||'';}
  function setDraft(r,text){if(r.status!=='review')throw Error('transition');if(!validText(text,3000))throw Error('draft');r.draft=text.trim();r.revision++;log(r,'draft_edited');return r;}
  function setReplyLanguage(r,lang){language(lang);if(r.status!=='review'&&r.status!=='new')throw Error('transition');r.replyLang=lang;if(r.analysis){r.draft=makeDraft(r,lang);r.analysis.originalDraft=r.draft;}r.revision++;log(r,'reply_language',lang);return r;}
  function approve(r,{reviewed=false,reviewer='Natalie Ragulina',draft,expectedRevision}={}){if(r.status!=='review')throw Error('transition');if(!reviewed)throw Error('review');if(expectedRevision!==undefined&&expectedRevision!==r.revision)throw Error('stale');if(!validText(draft,3000))throw Error('draft');if(!validText(reviewer,100))throw Error('reviewer');r.draft=draft.trim();r.status='approved';r.revision++;r.approvedBy=reviewer;log(r,'human_approved',reviewer);return r;}
  function defer(r){if(r.status!=='review')throw Error('transition');r.status='deferred';r.revision++;log(r,'deferred');return r;}
  function validStored(r){return r&&typeof r.id==='string'&&validText(r.subject,200)&&validText(r.body,10000)&&LANGS.includes(r.replyLang)&&['new','review','approved','error','deferred'].includes(r.status)&&Number.isInteger(r.revision)&&Array.isArray(r.events)&&typeof r.draft==='string'&&r.events.every(e=>typeof e.action==='string'&&typeof e.at==='string')&&(!r.analysis||r.analysis.provider==='deterministic-demo'&&r.analysis.check&&typeof r.analysis.check.kind==='string');}
  function serialize(rows){if(!Array.isArray(rows)||!rows.every(validStored))throw Error('storage');return JSON.stringify({version:2,rows});}
  function restore(text){const x=JSON.parse(text);if(x.version!==2||!Array.isArray(x.rows)||x.rows.length>500||!x.rows.every(validStored))throw Error('storage');return x.rows;}
  const samples={
    de:[['Betrag prüfen · DEMO-104','Guten Tag, auf Rechnung DEMO-104 stehen 179 EUR. Bitte prüfen Sie den Betrag.'],['Rückfrage · DEMO-205','Auf Rechnung DEMO-205 stehen 89 EUR. Ich habe eine Frage zur Leistung.'],['Rechnung ohne Nummer','Der Betrag meiner Rechnung erscheint mir falsch. Können Sie ihn prüfen?']],
    en:[['Check amount · DEMO-104','Hello, invoice DEMO-104 shows 179 EUR. Please check the amount.'],['Question · DEMO-205','Invoice DEMO-205 shows 89 EUR. I have a question about the service.'],['Invoice without number','The amount on my invoice seems wrong. Could you check it?']],
    ru:[['Проверка суммы · DEMO-104','Здравствуйте, в счёте DEMO-104 указано 179 EUR. Пожалуйста, проверьте сумму.'],['Вопрос · DEMO-205','В счёте DEMO-205 указано 89 EUR. У меня вопрос об услуге.'],['Счёт без номера','Сумма в моём счёте кажется неправильной. Можете проверить?']],
    uk:[['Перевірка суми · DEMO-104','Добрий день, у рахунку DEMO-104 зазначено 179 EUR. Будь ласка, перевірте суму.'],['Питання · DEMO-205','У рахунку DEMO-205 зазначено 89 EUR. У мене питання щодо послуги.'],['Рахунок без номера','Сума в моєму рахунку здається неправильною. Можете перевірити?']]
  };
  function seed(lang='de'){language(lang);return samples[lang].map(([s,b],i)=>create(s,b,'de','sample-'+i));}
  return {LANGS,INVOICES,create,invoiceCheck,process,makeDraft,resultText,setDraft,setReplyLanguage,approve,defer,serialize,restore,seed};
});
