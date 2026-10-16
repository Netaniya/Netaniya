// Original bounded composition format. MIDI follows Standard MIDI File format 1.
export const MAX_SCORE_NOTES=2048,INSTRUMENTS=['piano','bass','bell'];
export const midiFrequency=midi=>440*2**((midi-69)/12);
export function noteName(midi,solfege=false){const names=solfege?['До','До♯','Ре','Ре♯','Ми','Фа','Фа♯','Соль','Соль♯','Ля','Ля♯','Си']:['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];return names[midi%12]+(Math.floor(midi/12)-1);}
export function freshScore(){return {tempo:110,bars:16,tracks:[{name:'Piano 1',instrument:'piano',notes:[]}]};}
export function validateScore(raw){
 if(!raw||typeof raw!=='object'||!Number.isInteger(raw.tempo)||raw.tempo<40||raw.tempo>200||!Number.isInteger(raw.bars)||raw.bars<4||raw.bars>64||!Array.isArray(raw.tracks)||raw.tracks.length<1||raw.tracks.length>4)return null;
 let total=0;const tracks=[];
 for(const track of raw.tracks){if(!track||!INSTRUMENTS.includes(track.instrument)||!Array.isArray(track.notes)||(total+=track.notes.length)>MAX_SCORE_NOTES)return null;const notes=[];for(const n of track.notes){if(!n||!Number.isInteger(n.midi)||n.midi<21||n.midi>108||!Number.isFinite(n.beat)||n.beat<0||n.beat>=raw.bars*4||!Number.isFinite(n.duration)||n.duration<.0625||n.duration>32||n.beat+n.duration>raw.bars*4+.00001||!Number.isFinite(n.velocity)||n.velocity<.05||n.velocity>1)return null;notes.push({midi:n.midi,beat:Math.round(n.beat*10000)/10000,duration:Math.round(n.duration*10000)/10000,velocity:n.velocity});}tracks.push({name:String(track.name||'Track').replace(/[<>\x00-\x1f]/g,'').slice(0,24),instrument:track.instrument,notes});}
 const events=tracks.flatMap(t=>t.notes.flatMap(n=>[{at:n.beat,delta:1},{at:n.beat+n.duration,delta:-1}])).sort((a,b)=>a.at-b.at||a.delta-b.delta);let voices=0;for(const event of events){voices+=event.delta;if(voices>32)return null;}
 return {tempo:raw.tempo,bars:raw.bars,tracks};
}
export function freshPiano(){return {score:freshScore(),name:'',track:0,octave:4,snap:.25,editingID:0};}
export function parsePiano(raw){const p=freshPiano();if(!raw||typeof raw!=='object')return p;p.score=validateScore(raw.score)||freshScore();if(Number.isInteger(raw.track)&&raw.track>=0&&raw.track<p.score.tracks.length)p.track=raw.track;if(Number.isInteger(raw.octave)&&raw.octave>=0&&raw.octave<=7)p.octave=raw.octave;if([0,.25,.5,1].includes(raw.snap))p.snap=raw.snap;p.name=String(raw.name||'').replace(/[<>\x00-\x1f]/g,'').slice(0,24);if(Number.isSafeInteger(raw.editingID)&&raw.editingID>0)p.editingID=raw.editingID;return p;}
export function quantizeBeat(beat,snap){return snap?Math.round(beat/snap)*snap:Math.round(beat*10000)/10000;}
export function makeMidi(score){
 const valid=validateScore(score);if(!valid)throw Error('invalid_score');
 const bytes=[],put=(...v)=>bytes.push(...v),ascii=s=>[...s].map(c=>c.charCodeAt(0)),be=(n,k)=>Array.from({length:k},(_,i)=>(n>>>(8*(k-i-1)))&255),vlq=n=>{const a=[n&127];while(n>>>=7)a.unshift((n&127)|128);return a;},chunk=data=>{put(...ascii('MTrk'),...be(data.length,4),...data);};
 put(...ascii('MThd'),0,0,0,6,0,1,...be(valid.tracks.length+1,2),1,224);
 const micros=Math.round(60000000/valid.tempo);chunk([0,255,81,3,...be(micros,3),0,255,47,0]);
 valid.tracks.forEach((track,ch)=>{const label=ascii('N25x Track '+(ch+1)),events=[],program={piano:0,bass:32,bell:10}[track.instrument];for(const n of track.notes){events.push({tick:Math.round(n.beat*480),off:false,midi:n.midi,velocity:Math.round(n.velocity*127)});events.push({tick:Math.round((n.beat+n.duration)*480),off:true,midi:n.midi,velocity:0});}events.sort((a,b)=>a.tick-b.tick||Number(b.off)-Number(a.off)||a.midi-b.midi);const data=[0,255,3,label.length,...label,0,192+ch,program];let last=0;for(const e of events){data.push(...vlq(e.tick-last),(e.off?128:144)+ch,e.midi,e.velocity);last=e.tick;}data.push(0,255,47,0);chunk(data);});
 return new Uint8Array(bytes);
}
// Self-contained for a Web Worker and deterministic offline WAV tests. The
// sounds are synthesized; no acoustic-piano recordings or remote assets.
export function renderScoreWav(score){
 const rate=22050,beat=60/score.tempo,notes=score.tracks.flatMap(t=>t.notes.map(n=>({...n,instrument:t.instrument}))),end=Math.max(0,...notes.map(n=>(n.beat+n.duration)*beat))+.55,length=Math.max(1,Math.ceil(end*rate)),mix=new Float32Array(length);
 for(const n of notes){const start=Math.round(n.beat*beat*rate),duration=n.duration*beat,frames=Math.min(length-start,Math.ceil((duration+.35)*rate)),f=440*2**((n.midi-69)/12);for(let i=0;i<frames;i++){const t=i/rate,attack=Math.min(1,t/.007),release=t>duration?Math.exp(-(t-duration)*18):1,decay=Math.exp(-t*(n.instrument==='bass'?1.3:2)),phase=2*Math.PI*f*t;let wave=n.instrument==='bell'?Math.sin(phase)+(f*2.756<rate/2?.3*Math.sin(phase*2.756)*Math.exp(-t*2):0):n.instrument==='bass'?Math.sin(phase)+.17*Math.sin(phase*2):Math.sin(phase)+.32*Math.sin(phase*2)*Math.exp(-t*2)+(f*3<rate/2?.14*Math.sin(phase*3)*Math.exp(-t*4):0)+(f*4.01<rate/2?.06*Math.sin(phase*4.01)*Math.exp(-t*6):0);mix[start+i]+=wave*attack*release*decay*n.velocity*.18;}}
 let peak=1;for(const x of mix)peak=Math.max(peak,Math.abs(x));const buffer=new ArrayBuffer(44+length*2),v=new DataView(buffer),text=(at,s)=>{for(let i=0;i<s.length;i++)v.setUint8(at+i,s.charCodeAt(i));};text(0,'RIFF');v.setUint32(4,36+length*2,true);text(8,'WAVE');text(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);text(36,'data');v.setUint32(40,length*2,true);for(let i=0;i<length;i++)v.setInt16(44+i*2,Math.max(-32767,Math.min(32767,Math.round(mix[i]/peak*32767))),true);return buffer;
}
