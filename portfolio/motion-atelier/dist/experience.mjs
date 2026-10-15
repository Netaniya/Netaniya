// Progressive enhancement: content stays visible if motion APIs are missing or reduced.
export function createExperience({root,win,doc}){
 const seen=new Set();let observer,first=true,pendingNavigation;
 const reduced=()=>win.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const mobile=win.matchMedia('(max-width: 760px)');
 function syncMenu(open){
  const nav=root.querySelector('#main-nav'),button=root.querySelector('.menu-toggle');if(!nav||!button)return;
  nav.classList.toggle('open',open);nav.inert=Boolean(mobile.matches&&!open);
  button.setAttribute('aria-expanded',String(open));
 }
 function decorate(){
  observer?.disconnect();const main=root.querySelector('main');if(!main)return;
  if(first){if(!reduced())main.classList.add('page-enter');first=false;}
  if(reduced()||typeof win.IntersectionObserver!=='function')return;
  observer=new win.IntersectionObserver(entries=>{
   if(root.inert)return;
   for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');seen.add(entry.target.dataset.revealKey);observer.unobserve(entry.target);}
  },{threshold:.08,rootMargin:'0px 0px -24px 0px'});
  const selector='.hero-copy > *,.hero-photograph,.section-heading,.vehicle-card,.page-heading > *,.feature-inner > *,.journey-feature > *,.model-hero .wrap > *,.model-spec-grid > div,.about-visual,.about-text > section,.config-stage,.config-controls > *,.finder-layout > *,.journey-layout > *,.garage-item,.empty-garage > *,.editorial-band,.comparison > *';
  [...main.querySelectorAll(selector)].forEach((el,index)=>{
   if(el.parentElement?.closest('[data-reveal-key]'))return;
   const key=el.id||el.getAttribute('data-model')||el.tagName+':'+index;
   el.dataset.revealKey=key;el.classList.add('reveal-item');el.style.setProperty('--reveal-delay',(index%3)*65+'ms');
   if(seen.has(key))el.classList.add('is-visible');else observer.observe(el);
  });
 }
 function reset(){win.clearTimeout(pendingNavigation);doc.documentElement.classList.remove('page-leaving');}
 win.addEventListener('pageshow',reset);
 // Older browsers receive a short exit fade. Native cross-document transitions handle modern browsers.
 root.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button>0||link.hasAttribute('download')||(link.target&&link.target!=='_self')||reduced()||('onpageswap' in win))return;
  let url;try{url=new URL(link.getAttribute('href'),win.location.href);}catch{return;}
  if(url.origin!==win.location.origin||url.hash||(url.pathname===win.location.pathname&&url.search===win.location.search))return;
  event.preventDefault();doc.documentElement.classList.add('page-leaving');
  win.clearTimeout(pendingNavigation);pendingNavigation=win.setTimeout(()=>win.location.assign(url.href),140);win.setTimeout(reset,1800);
 });
 mobile.addEventListener?.('change',()=>syncMenu(root.querySelector('.menu-toggle')?.getAttribute('aria-expanded')==='true'));
 return {decorate,syncMenu,reduced};
}
