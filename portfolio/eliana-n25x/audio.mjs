// Original procedural score and effects: no recordings, downloads or runtime APIs.
// Notes: frequency, delay, length, wave shape, relative level, optional end frequency.
export const SOUND_CUES={
 step:[[115,0,.055,'triangle',.18,63]],
 touch:[[570,0,.045,'sine',.35]],
 clue:[[659,0,.16,'sine',.7],[784,.10,.18,'sine',.65],[987,.20,.25,'sine',.5]],
 collect:[[1046,0,.22,'triangle',.55],[1318,.08,.26,'sine',.55],[1568,.17,.32,'sine',.4]],
 scan:[[440,0,.14,'sine',.6,1320],[1100,.16,.12,'sine',.4,700]],
 switch:[[330,0,.07,'triangle',.45],[660,.07,.11,'sine',.45]],
 arrival:[[220,0,.4,'sine',.5],[329,.12,.4,'sine',.45],[440,.24,.55,'sine',.4]],
 door:[[110,0,.3,'sine',.65,220],[440,.23,.17,'triangle',.4],[660,.33,.25,'sine',.45]],
 error:[[220,0,.15,'triangle',.45,147],[130,.16,.14,'sine',.4]],
 solved:[[523,0,.25,'triangle',.5],[659,.12,.27,'sine',.5],[784,.24,.30,'sine',.5],[1046,.38,.45,'sine',.45]],
 finale:[[523,0,.28,'triangle',.5],[659,.15,.28,'sine',.5],[784,.30,.32,'sine',.5],[1046,.48,.40,'sine',.5],[784,.74,.28,'sine',.4],[987,.90,.30,'sine',.4],[1046,1.08,.65,'sine',.5]]
};
const ROOTS=[55,49,65.41,58.27,61.74,73.42];
export function createGameAudio({getContext=()=>globalThis.AudioContext||globalThis.webkitAudioContext}={}){
 let context=null,ambient=null,voices=[],config={enabled:false,volume:.35,hidden:false,paused:false,ambience:false,scene:0};
 const effects=new Set();
 const silent=()=>!config.enabled||config.hidden||config.paused;
 function stopEffects(){for(const voice of effects){try{voice.oscillator.stop();voice.oscillator.disconnect();voice.gain.disconnect();}catch{}}effects.clear();}
 function update(next={}){
  Object.assign(config,next);config.volume=Math.max(0,Math.min(1,Number(config.volume)||0));
  if(!context)return;
  try{
   ambient.gain.setTargetAtTime(!silent()&&config.ambience?config.volume*.018:0,context.currentTime,.35);
   const root=ROOTS[config.scene]||55;
   voices.forEach((voice,i)=>voice.frequency.setTargetAtTime(root*[1,1.5,2][i],context.currentTime,.8));
   if(silent()){stopEffects();context.suspend?.().catch?.(()=>{});}else context.resume?.().catch?.(()=>{});
  }catch{}
 }
 function start(next={}){
  Object.assign(config,next);if(silent())return false;
  try{
   if(!context){const Context=getContext();if(!Context)return false;context=new Context();ambient=context.createGain();ambient.gain.value=0;ambient.connect(context.destination);
    voices=[1,1.5,2].map(ratio=>{const oscillator=context.createOscillator();oscillator.type='sine';oscillator.frequency.value=55*ratio;oscillator.connect(ambient);oscillator.start();return oscillator;});
   }
   update();return true;
  }catch{context=null;voices=[];return false;}
 }
 function play(kind){
  if(silent()||config.volume===0||!context||effects.size>48)return;
  const pattern=SOUND_CUES[kind];if(!pattern)return;
  try{
   context.resume?.().catch?.(()=>{});
   for(const [frequency,delay,length,wave,level,end]of pattern){
    const time=context.currentTime+delay,oscillator=context.createOscillator(),gain=context.createGain(),voice={oscillator,gain};
    oscillator.type=wave;oscillator.frequency.setValueAtTime(frequency,time);if(end)oscillator.frequency.exponentialRampToValueAtTime(end,time+length);
    gain.gain.setValueAtTime(.0001,time);gain.gain.linearRampToValueAtTime(config.volume*.12*level,time+.012);gain.gain.exponentialRampToValueAtTime(.0001,time+length);
    oscillator.connect(gain);gain.connect(context.destination);effects.add(voice);
    oscillator.onended=()=>{effects.delete(voice);oscillator.disconnect();gain.disconnect();};oscillator.start(time);oscillator.stop(time+length+.015);
   }
  }catch{}
 }
 function suspend(){stopEffects();try{context?.suspend?.().catch?.(()=>{});}catch{}}
 return {start,update,play,suspend};
}

