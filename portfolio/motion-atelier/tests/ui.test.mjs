import test from 'node:test';import assert from 'node:assert/strict';import {readFile,stat} from 'node:fs/promises';import vm from 'node:vm';import {webcrypto} from 'node:crypto';import {parseHTML} from 'linkedom';
import * as data from '../dist/data.mjs?v=7';import * as core from '../dist/core.mjs?v=7';import {translator,DICT} from '../dist/i18n.mjs?v=7';import {createExperience} from '../dist/experience.mjs?v=7';import {createRouteMap} from '../dist/route-map.mjs?v=7';
const source=(await readFile(new URL('../dist/app.mjs',import.meta.url),'utf8')).replace(/^import .*?;\n/gm,'');const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
function boot({path='/',search='',lang='de',theme=null,rawGarage=null,reduced=true,mobile=false,observe=false,rawLastConfig=null,rawComparison=null,seenIntro=false,playback='ok',audioPlayback='ok',now='2026-10-15T12:00:00Z',fetcher=async()=>({ok:false})}={}){const {window,document}=parseHTML(html);const memory=new Map([['motion-language',lang]]);if(theme!==null)memory.set('motion-theme',theme);if(rawGarage!==null)memory.set('motion-garage',rawGarage);if(seenIntro)memory.set('motion-arrival','seen');if(rawLastConfig!==null)memory.set('motion-last-config',rawLastConfig);if(rawComparison!==null)memory.set('motion-compare',rawComparison);const clock={now:Date.parse(now)};class ClockDate extends Date{constructor(...args){super(...(args.length?args:[clock.now]));}static now(){return clock.now;}}const sound={plays:0,pauses:0,mode:audioPlayback};const audio=document.querySelector('audio');audio.play=()=>{sound.plays++;return sound.mode==='ok'?Promise.resolve():Promise.reject(Object.assign(new Error('audio unavailable'),{name:sound.mode==='blocked'?'NotAllowedError':'NotSupportedError'}));};audio.pause=()=>{sound.pauses++;};const revealObservers=[];class Observer{constructor(fn){this.fn=fn;this.targets=new Set();revealObservers.push(this);}observe(el){this.targets.add(el);}unobserve(el){this.targets.delete(el);}disconnect(){this.targets.clear();}show(el){this.fn([{target:el,isIntersecting:true}]);}}const media={plays:0,pauses:0,loads:0,mode:playback};const video=document.querySelector('video');Object.defineProperty(video,'duration',{value:5.4,configurable:true});video.play=()=>{media.plays++;if(media.mode==='blocked')return Promise.reject(new Error('Autoplay unavailable'));video.dispatchEvent(new window.Event('playing'));return Promise.resolve();};video.pause=()=>{media.pauses++;};video.load=()=>{media.loads++;};const storage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v)};Object.defineProperty(window,'localStorage',{value:storage,configurable:true});Object.defineProperty(window,'sessionStorage',{value:storage,configurable:true});window.scrollTo=()=>{};let timerId=0;const timers=new Map();const navigations=[];const location={pathname:path,search,origin:'https://example.test',href:'https://example.test'+path+search,assign:url=>navigations.push(url)};const ctx={...data,...core,Date:ClockDate,translator,createRouteMap:opts=>createRouteMap({...opts,loadLibrary:async()=>{throw Error('map unavailable in DOM test');}}),createExperience:opts=>createExperience({...opts,win:{matchMedia:ctx.matchMedia,addEventListener:(...args)=>window.addEventListener(...args),setTimeout:ctx.setTimeout,clearTimeout:ctx.clearTimeout,location,...(observe?{IntersectionObserver:Observer}:{})}}),document,window,location,history:{replaceState(_s,_t,url){location.search=url.split('?')[1]||'';}},AbortController,fetchRoute:(a,b,opts)=>core.fetchRoute(a,b,{...opts,fetcher}),fetchWeather:(a,opts)=>core.fetchWeather(a,{...opts,fetcher}),navigator:{clipboard:{writeText:async()=>{}}},crypto:webcrypto,matchMedia:query=>({matches:query.includes('prefers-reduced-motion')?reduced:query.includes('max-width')?mobile:false,addEventListener(){}}),Image:class{set src(v){this.complete=true;this.onload?.();}},requestAnimationFrame:fn=>fn(),setTimeout:(fn,ms)=>{const id=++timerId;timers.set(id,{fn,ms});return id;},clearTimeout:id=>timers.delete(id),URL,URLSearchParams,Blob,Intl,fetch:fetcher,confirm:()=>true,FormData:class{constructor(form){this.map=new Map();for(const el of form.querySelectorAll('input[name],select[name]')){if(el.type==='radio'&&!el.hasAttribute('checked'))continue;this.map.set(el.name,el.value);}}get(k){return this.map.get(k);}}};
 vm.runInNewContext(source,ctx,{filename:'app.mjs'});return {window,document,ctx,memory,timers,media,video,sound,audio,clock,revealObservers,navigations,change(sel,value){const el=document.querySelector(sel);assert(el,sel);Object.defineProperty(el,'value',{value,configurable:true});el.dispatchEvent(new window.Event('change',{bubbles:true}));},click(sel){const el=document.querySelector(sel);assert(el,sel);el.dispatchEvent(new window.Event('click',{bubbles:true}));},submit(sel){const el=document.querySelector(sel);assert(el,sel);el.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));}};}
const tick=async()=>{for(let i=0;i<8;i++)await Promise.resolve();};
test('all ten pages render in all four languages with one h1 and working internal links',async()=>{for(const lang of data.LANGS)for(const path of data.ROUTES){const b=boot({lang,path});assert.equal(b.document.documentElement.lang,lang);assert.equal(b.document.querySelectorAll('main h1').length,1,lang+path);assert.equal(b.document.querySelector('.project-meta strong').textContent,'Natalie (Netaniya) Ragulina');assert(b.document.querySelector('[data-munich-clock]').textContent.includes('14:00:00'));const text=b.document.querySelector('main').textContent;assert(!/undefined|NaN/.test(text),lang+path);if(lang==='de'||lang==='en')assert(!/[А-Яа-яЁёІіЇїЄє]/.test(text),lang+path);for(const a of b.document.querySelectorAll('a[href^="/"]')){const href=a.getAttribute('href').split(/[?#]/)[0];if(href.startsWith('/assets/'))assert((await stat(new URL('../dist'+href,import.meta.url))).isFile(),href);else assert(data.ROUTES.includes(href),href);}}});
test('language switch translates built-in content, vehicle labels, units and title',()=>{const b=boot({path:'/configure/'});b.change('#language','uk');assert.equal(b.document.documentElement.lang,'uk');assert(b.document.querySelector('main').textContent.includes('Колеса'));assert(b.document.title.includes('Конфігуратор'));assert.equal(b.memory.get('motion-language'),'uk');b.change('#language','ru');assert(b.document.querySelector('main').textContent.includes('Итог')||b.document.querySelector('main').textContent.includes('итоговая'));});
test('filter hides unselected body styles and comparison follows selected models',()=>{const b=boot({path:'/collection/'});b.change('#vehicle-filter','crossover');assert.equal(b.document.querySelectorAll('.vehicle-card').length,1);assert.match(b.document.querySelector('.vehicle-card h3').textContent,/Tesla Model Y/);b.change('#vehicle-filter','pickup');assert.equal(b.document.querySelectorAll('.vehicle-card').length,1);assert.match(b.document.querySelector('.vehicle-card h3').textContent,/Tesla Cybertruck/);b.change('#vehicle-filter','all');for(const id of ['gt-01','cross-02']){const el=b.document.querySelector(`input[name="compare"][value="${id}"]`);el.checked=true;el.dispatchEvent(new b.window.Event('change',{bubbles:true}));}assert.equal(b.document.querySelectorAll('table thead th').length,3);});
test('configuration changes price and range; saving round-trips through garage storage',()=>{const b=boot({path:'/configure/'}),before=b.document.querySelector('.total strong').textContent;b.change('input[name="wheels"][value="sport"]','sport');assert.notEqual(b.document.querySelector('.total strong').textContent,before);b.click('[data-action="save"]');const raw=JSON.parse(b.memory.get('motion-garage'));assert.equal(raw.length,1);assert.equal(raw[0].config.wheels,'sport');b.click('[data-action="save"]');assert.equal(JSON.parse(b.memory.get('motion-garage')).length,1);const g=boot({path:'/garage/',rawGarage:JSON.stringify(raw),lang:'de'});assert.equal(g.document.querySelectorAll('.garage-item').length,1);assert(g.document.querySelector('.garage-item').textContent.includes('Sport 21'));g.click('[data-action="remove"]');assert.equal(JSON.parse(g.memory.get('motion-garage')).length,0);});
test('corrupt storage remains untouched when saving temporary configuration',()=>{const b=boot({path:'/configure/',rawGarage:'{broken'});b.click('[data-action="save"]');assert.equal(b.memory.get('motion-garage'),'{broken');assert(b.document.querySelector('.storage-banner'));});
test('finder gives an explained recommendation and flags impossible requirements',()=>{const b=boot({path:'/finder/'});b.submit('#finder-form');assert(b.document.querySelector('#finder-result .vehicle-card'));assert(b.document.querySelector('.why li'));b.change('input[name="budget"]','20000');b.submit('#finder-form');assert(b.document.querySelector('#finder-result .alert'));});
test('route service failure exposes explicit estimate; no fake live route appears',async()=>{const b=boot({path:'/journey/'});b.submit('#trip-form');await tick();assert(b.document.querySelector('[data-action="estimate"]'));assert(!b.document.querySelector('.trip-metrics'));b.click('[data-action="estimate"]');await tick();assert(b.document.querySelector('.estimated'));assert(b.document.querySelector('.trip-metrics'));assert(b.document.querySelector('.route-line.dashed'));});
test('successful route and weather populate validated external results',async()=>{let calls=[];const b=boot({path:'/journey/',fetcher:async url=>{calls.push(url);return {ok:true,json:async()=>url.includes('open-meteo')?{current:{temperature_2m:12,wind_speed_10m:8,time:'2026-10-15T10:00'}}:{code:'Ok',routes:[{distance:145000,duration:7200,geometry:{type:'LineString',coordinates:[[11,48],[13,47]]}}]}};}});assert.equal(calls.length,0);b.submit('#trip-form');await tick();assert(b.document.querySelector('.trip-metrics'));assert.equal(calls.length,1);b.click('[data-action="weather"]');await tick();assert(b.document.querySelector('.weather-values').textContent.includes('12'));assert.equal(calls.length,2);b.change('#language','ru');assert(b.document.querySelector('.route-result').textContent.includes('Мюнхен'));assert(!b.document.querySelector('.route-result').textContent.includes('München'));assert(b.document.querySelector('.weather-values').textContent.includes('км/ч'));assert(!b.document.querySelector('.weather-values').textContent.includes('km/h'));});
test('changing trip input invalidates report and late route result cannot restore it',async()=>{let resolve;const pending=new Promise(r=>resolve=r);const b=boot({path:'/journey/',fetcher:()=>pending});b.submit('#trip-form');await tick();b.change('select[name="to"]','berlin');assert.equal(b.document.querySelector('#trip-form button[type="submit"]').disabled,false);resolve({ok:true,json:async()=>({code:'Ok',routes:[{distance:145000,duration:7200,geometry:{type:'LineString',coordinates:[[11,48],[13,47]]}}]})});await tick();assert(!b.document.querySelector('.trip-metrics'));assert(b.document.querySelector('.trip-placeholder'));});
test('garage save reads latest state even before a storage event',()=>{const b=boot({path:'/configure/'});b.memory.set('motion-garage',JSON.stringify([{id:'other',savedAt:'2026-10-15T09:00:00Z',config:core.defaultConfig('cross-02')}]));b.click('[data-action="save"]');assert.equal(JSON.parse(b.memory.get('motion-garage')).length,2);});
test('real driving film is muted, skippable and respects reduced-motion',()=>{const normal=boot({reduced:false});assert(normal.document.body.classList.contains('intro-playing'));assert(normal.document.getElementById('arrival').classList.contains('playing'));assert.equal(normal.video.muted,true);assert.equal(normal.video.playsInline,true);assert.equal(normal.media.plays,1);assert([...normal.timers.values()].some(x=>x.ms===5900));normal.click('[data-intro-skip]');assert(!normal.document.body.classList.contains('intro-playing'));assert.equal(normal.document.getElementById('app').inert,false);const reduced=boot({reduced:true});assert.equal(reduced.document.getElementById('arrival').hidden,true);assert(!reduced.document.body.classList.contains('intro-playing'));});

test('dark is the default on all pages; theme toggle persists and restores independently of language',()=>{for(const path of data.ROUTES){const b=boot({path});assert.equal(b.document.documentElement.dataset.theme,'dark',path);assert(b.document.querySelector('[data-action="theme"]'));b.click('[data-action="theme"]');assert.equal(b.document.documentElement.dataset.theme,'light');assert.equal(b.memory.get('motion-theme'),'light');assert.equal(b.document.querySelector('meta[name="theme-color"]').getAttribute('content'),'#fbfcfc');const reopened=boot({path,theme:b.memory.get('motion-theme'),lang:'uk'});assert.equal(reopened.document.documentElement.dataset.theme,'light');reopened.change('#language','ru');assert.equal(reopened.document.documentElement.dataset.theme,'light');reopened.click('[data-action="theme"]');assert.equal(reopened.document.documentElement.dataset.theme,'dark');assert.equal(reopened.memory.get('motion-theme'),'dark');}});
test('headings on all pages and languages have no sentence dots or trailing punctuation',()=>{for(const lang of data.LANGS)for(const path of data.ROUTES){const b=boot({path,lang});for(const h of b.document.querySelectorAll('main h1,main h2,main h3')){assert(!h.textContent.includes('.'),lang+path+':'+h.textContent);assert(!/[.!?]$/.test(h.textContent.trim()),h.textContent);}}});
test('mobile language control shows only a readable short code and keeps native full-language options',()=>{for(const lang of data.LANGS){const b=boot({lang});assert.match(b.document.querySelector('.language-code').textContent,/^(DE|EN|RU|UA)/);assert.equal(b.document.querySelectorAll('#language option').length,4);assert(b.document.querySelector('#language option[value="uk"]').textContent.includes('Українська'));}});
test('theme storage events update another open page without changing current language',()=>{const b=boot({lang:'ru'});b.memory.set('motion-theme','light');const ev=new b.window.Event('storage');Object.defineProperty(ev,'key',{value:'motion-theme'});b.window.dispatchEvent(ev);assert.equal(b.document.documentElement.dataset.theme,'light');assert.equal(b.document.documentElement.lang,'ru');});

test('replaying driving film from below the hero scrolls back before opening',()=>{const b=boot({reduced:false});b.click('[data-intro-skip]');let scrolled=false;b.window.scrollTo=()=>{scrolled=true;};b.click('[data-action="replay"]');assert(scrolled);assert(b.document.body.classList.contains('intro-playing'));assert.equal(b.document.getElementById('app').inert,true);});

test('paired headings use separate text lines without a leading dash in every language',()=>{for(const lang of data.LANGS){const b=boot({path:'/collection/',lang});const title=b.document.querySelector('main h1');const lines=[...title.querySelectorAll('.heading-line')].map(x=>x.textContent);assert.equal(lines.length,2,lang);assert(!/[—–]/.test(title.textContent),lang);assert(lines.every(line=>line.trim().length>0),lang);if(lang==='ru')assert.deepEqual(lines,['Три характера','Твой выбор']);for(const path of data.ROUTES){for(const h of boot({path,lang}).document.querySelectorAll('main .balanced-heading'))assert(!/[—–]/.test(h.textContent),lang+path);}}});

test('all published photos remain original and have credit links',()=>{for(const lang of data.LANGS)for(const path of data.ROUTES){const b=boot({path,lang});for(const photo of b.document.querySelectorAll('main img')){assert.match(photo.getAttribute('src'),/^\/assets\/real-[a-z-]+\.webp$/);assert(!photo.getAttribute('style'));assert(Number(photo.getAttribute('width'))>0);assert(Number(photo.getAttribute('height'))>0);}}const b=boot({path:'/configure/'});assert(!b.document.querySelector('.paint-options'));assert(!b.document.querySelector('input[name="paint"]'));assert(!b.document.querySelector('.config-car').getAttribute('style'));const about=boot({path:'/about/'});const credits=about.document.querySelectorAll('.photo-credit-list>div');assert.equal(credits.length,4);for(const credit of credits)assert.equal(credit.querySelectorAll('a[href^="https://"]').length,2);});


test('returning visitors still see the film and mobile viewport changes do not close it',()=>{
 const b=boot({reduced:false,seenIntro:true});
 assert(b.document.body.classList.contains('intro-playing'));
 b.window.dispatchEvent(new b.window.Event('resize'));
 assert(b.document.body.classList.contains('intro-playing'));
 assert.equal(b.document.getElementById('app').inert,true);
 b.video.dispatchEvent(new b.window.Event('ended'));
 assert(!b.document.body.classList.contains('intro-playing'));
 assert.equal(b.document.getElementById('app').inert,false);
});

test('autoplay rejection offers an explicit film play control and can recover',async()=>{
 const b=boot({reduced:false,playback:'blocked'});await tick();
 assert.equal(b.document.querySelector('[data-intro-play]').hidden,false);
 assert(b.document.getElementById('arrival').classList.contains('needs-play'));
 b.media.mode='ok';b.click('[data-intro-play]');await tick();
 assert.equal(b.document.querySelector('[data-intro-play]').hidden,true);
 assert(b.document.getElementById('arrival').classList.contains('playing'));
 b.click('[data-intro-skip]');
 assert.equal(b.document.getElementById('app').inert,false);
});

test('replaying immediately cancels stale close timers and media errors release the page',()=>{
 const b=boot({reduced:false});b.click('[data-intro-skip]');
 const pending=[...b.timers].filter(([,x])=>x.ms===850);assert.equal(pending.length,1);
 b.click('[data-action="replay"]');
 for(const [id]of pending)assert(!b.timers.has(id));
 assert.equal(b.document.getElementById('arrival').hidden,false);
 b.video.dispatchEvent(new b.window.Event('error'));
 assert.equal(b.document.getElementById('app').inert,false);
 assert(!b.document.body.classList.contains('intro-playing'));
 assert(b.document.querySelector('#toast').textContent.length>0);
});

test('inner pages and reduced-motion never request film playback',()=>{
 for(const path of data.ROUTES.filter(x=>x!=='/')){
  const b=boot({path,reduced:false});assert.equal(b.media.plays,0);assert.equal(b.video.getAttribute('src'),null);assert(b.document.getElementById('arrival').hidden);
 }
 const b=boot({reduced:true});assert.equal(b.media.plays,0);assert.equal(b.video.getAttribute('src'),null);
});


test('comparison tray reflects selected models, survives filtering and clears persisted choices',()=>{
 const b=boot({path:'/collection/'});
 for(const id of ['gt-01','cross-02']){const checkbox=b.document.querySelector(`input[name="compare"][value="${id}"]`);checkbox.checked=true;checkbox.dispatchEvent(new b.window.Event('change',{bubbles:true}));}
 assert.equal(b.document.querySelector('[data-action="compare-jump"]').disabled,false);
 assert.equal(b.document.querySelectorAll('.vehicle-card.selected').length,2);
 b.change('#vehicle-filter','pickup');assert(b.document.querySelector('.compare-tray').textContent.includes('Tesla Model S'));
 const restored=boot({path:'/collection/',rawComparison:b.memory.get('motion-compare')});
 assert.equal(restored.document.querySelectorAll('.vehicle-card.selected').length,2);
 restored.click('[data-action="clear-compare"]');assert(!restored.document.querySelector('.compare-tray'));assert.equal(restored.memory.get('motion-compare'),'[]');
});

test('last configuration returns on a fresh visit and an explicit configuration link takes priority',()=>{
 const b=boot({path:'/configure/'});b.change('input[name="interior"][value="dark"]','dark');b.change('input[name="wheels"][value="sport"]','sport');
 const raw=b.memory.get('motion-last-config');const returned=boot({path:'/configure/',rawLastConfig:raw});
 assert(returned.document.querySelector('input[name="interior"][value="dark"][checked]'));
 assert(returned.document.querySelector('input[name="wheels"][value="sport"][checked]'));
 const linked=boot({path:'/configure/',search:'?model=cross-02&paint=silver&wheels=aero&interior=dark',rawLastConfig:raw});
 assert.equal(linked.document.querySelector('select[name="model"]').value,'cross-02');
 linked.click('[data-action="reset-choice"]');assert(linked.document.querySelector('input[name="wheels"][value="aero"][checked]'));
});

test('mobile menu changes in place, exposes links only while open and closes on Escape',()=>{
 const b=boot({path:'/collection/',mobile:true});const main=b.document.querySelector('main');const nav=b.document.querySelector('#main-nav');assert.equal(nav.inert,true);
 b.click('[data-action="menu"]');assert.equal(b.document.querySelector('main'),main);assert.equal(nav.inert,false);assert.equal(b.document.querySelector('.menu-toggle').getAttribute('aria-expanded'),'true');
 const escape=new b.window.Event('keydown');Object.defineProperty(escape,'key',{value:'Escape'});b.window.dispatchEvent(escape);
 assert.equal(nav.inert,true);assert.equal(b.document.querySelector('.menu-toggle').getAttribute('aria-expanded'),'false');
});

test('music is attempted automatically and the mute control stops it',()=>{
 const b=boot({reduced:false});assert.equal(b.sound.plays,1);assert.equal(b.document.querySelector('[data-intro-sound]').getAttribute('aria-pressed'),'true');
 const before=b.sound.pauses;b.click('[data-intro-sound]');
 for(const timer of [...b.timers.values()].filter(x=>x.ms<=280))timer.fn();
 assert(b.sound.pauses>before);assert.equal(b.document.querySelector('[data-intro-sound]').getAttribute('aria-pressed'),'false');
 b.video.dispatchEvent(new b.window.Event('playing'));assert.equal(b.sound.plays,1);
 b.click('[data-intro-skip]');assert.equal(b.document.getElementById('app').inert,false);
});

test('audio failure keeps the film usable and resets the sound control',async()=>{
 const b=boot({reduced:false,audioPlayback:'error'});await tick();
 assert.equal(b.document.querySelector('[data-intro-sound]').getAttribute('aria-pressed'),'false');assert(b.document.getElementById('arrival').classList.contains('playing'));assert(b.document.querySelector('#toast').textContent.length>0);
});

test('reveals are observed once, remain visible after UI updates and disappear entirely for reduced motion',()=>{
 const b=boot({path:'/collection/',reduced:false,observe:true});const h=b.document.querySelector('main h1');assert(h.classList.contains('reveal-item'));
 b.revealObservers.at(-1).show(h);assert(h.classList.contains('is-visible'));
 b.change('#language','en');assert(b.document.querySelector('main h1').classList.contains('is-visible'));
 const reduced=boot({path:'/collection/',reduced:true,observe:true});assert.equal(reduced.document.querySelectorAll('.reveal-item').length,0);assert.equal(reduced.revealObservers.length,0);
});

test('fallback page transitions preserve modified clicks and navigate after only a short fade',()=>{
 const b=boot({path:'/collection/',reduced:false});const link=b.document.querySelector('a[href="/finder/"]');
 const modified=new b.window.Event('click',{bubbles:true,cancelable:true});Object.defineProperty(modified,'ctrlKey',{value:true});link.dispatchEvent(modified);assert.equal(modified.defaultPrevented,false);
 const normal=new b.window.Event('click',{bubbles:true,cancelable:true});link.dispatchEvent(normal);assert.equal(normal.defaultPrevented,true);assert(b.document.documentElement.classList.contains('page-leaving'));
 const timer=[...b.timers.values()].find(x=>x.ms===140);assert(timer);timer.fn();assert.equal(b.navigations[0],'https://example.test/finder/');b.window.dispatchEvent(new b.window.Event('pageshow'));assert(!b.document.documentElement.classList.contains('page-leaving'));
});


test('starting music late grants the restarted film its full playback time even without a second playing event',()=>{
 const b=boot({reduced:false});const previous=[...b.timers].find(([,x])=>x.ms===5900);assert(previous);
 b.click('[data-intro-sound]');b.video.currentTime=4;b.video.play=()=>Promise.resolve();b.click('[data-intro-sound]');
 assert.equal(b.video.currentTime,0);assert(!b.timers.has(previous[0]));assert([...b.timers.values()].some(x=>x.ms===5900));
});

test('quick sound toggles cancel previous fade timers and leaving the page silences audio',()=>{
 const b=boot({reduced:false});b.click('[data-intro-sound]');
 const fades=[...b.timers].filter(([,x])=>x.ms>=35&&x.ms<=280);assert.equal(fades.length,8);
 b.click('[data-intro-sound]');for(const [id]of fades)assert(!b.timers.has(id));
 const before=b.sound.pauses;b.window.dispatchEvent(new b.window.Event('pagehide'));assert(b.sound.pauses>before);assert.equal(b.document.querySelector('[data-intro-sound]').getAttribute('aria-pressed'),'false');
});


test('autoplay denial offers a truthful enable control and can resume through a gesture',async()=>{
 const b=boot({reduced:false,audioPlayback:'blocked'});await tick();
 assert.equal(b.document.querySelector('[data-intro-sound]').getAttribute('aria-pressed'),'false');assert.equal(b.document.querySelector('[data-sound-hint]').hidden,false);assert(b.document.getElementById('arrival').classList.contains('playing'));
 b.sound.mode='ok';b.click('[data-intro-sound]');await tick();assert.equal(b.document.querySelector('[data-intro-sound]').getAttribute('aria-pressed'),'true');assert.equal(b.document.querySelector('[data-sound-hint]').hidden,true);
});

test('Munich clock ticks without replacing the page and follows daylight-saving timezone rules',()=>{
 const b=boot({path:'/configure/',lang:'de'});const main=b.document.querySelector('main');assert(b.document.querySelector('[data-munich-clock]').textContent.includes('14:00:00'));
 b.clock.now+=1000;[...b.timers.values()].find(x=>x.ms===1000).fn();assert(b.document.querySelector('[data-munich-clock]').textContent.includes('14:00:01'));assert.equal(b.document.querySelector('main'),main);
 b.clock.now=Date.parse('2026-12-15T12:00:00Z');[...b.timers.values()].find(x=>x.ms===1000).fn();assert(b.document.querySelector('[data-munich-clock]').textContent.includes('13:00:00'));assert(b.document.querySelector('[data-munich-clock]').textContent.includes('15.12.2026'));
});

test('removed paint controls cannot leave a hidden surcharge in links, remembered choices or garage totals',()=>{
 for(const lang of data.LANGS)for(const v of data.VEHICLES){
  const legacy={model:v.id,paint:'ruby',wheels:'sport',interior:'dark'};
  const expected=core.money(v.price+data.WHEELS.find(x=>x.id==='sport').price+data.INTERIORS.find(x=>x.id==='dark').price,lang);
  for(const source of [{search:'?'+core.encodeConfig(legacy)},{rawLastConfig:JSON.stringify(legacy)}]){
   const b=boot({path:'/configure/',lang,...source});
   assert.equal(b.document.querySelectorAll('input[name="paint"],.paint-options,.paint-choice').length,0);
   assert.equal(b.document.querySelector('.config-car').getAttribute('src'),'/assets/'+v.image);
   assert.equal(b.document.querySelector('.total strong').textContent,expected);
   b.click('[data-action="save"]');
   assert.equal(JSON.parse(b.memory.get('motion-garage'))[0].config.paint,'ocean');
  }
  const stored=JSON.stringify([{id:'legacy',savedAt:'2026-10-15T10:00:00Z',config:legacy}]);
  const g=boot({path:'/garage/',lang,rawGarage:stored});
  assert.equal(g.document.querySelector('.garage-price').textContent,expected);
  assert(!g.document.querySelector('.garage-body').textContent.includes(translator(lang)('ruby')));
  assert.equal(g.memory.get('motion-garage'),stored);
 }
});
