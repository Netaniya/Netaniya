export class AudioDouble{
 static instances=[];
 constructor(){this.currentTime=0;this.destination={};this.oscillators=[];this.gains=[];this.resumes=0;this.suspends=0;AudioDouble.instances.push(this);}
 createGain(){const param={value:0,targets:[],setTargetAtTime(value){this.targets.push(value);},setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}};const node={gain:param,connect(){},disconnect(){}};this.gains.push(node);return node;}
 createOscillator(){const frequency={value:0,notes:[],targets:[],setValueAtTime(value){this.notes.push(value);},setTargetAtTime(value){this.targets.push(value);},exponentialRampToValueAtTime(){}};const node={frequency,started:false,stopped:false,connect(){},disconnect(){},start(){this.started=true;},stop(){this.stopped=true;}};this.oscillators.push(node);return node;}
 resume(){this.resumes++;return Promise.resolve();}
 suspend(){this.suspends++;return Promise.resolve();}
}
