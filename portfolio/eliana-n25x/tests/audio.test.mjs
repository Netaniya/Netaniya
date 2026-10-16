import test from 'node:test';
import assert from 'node:assert/strict';
import {createGameAudio,SOUND_CUES} from '../audio.mjs';
import {AudioDouble} from './audio-double.mjs';
import {boot,solveUI} from './helpers.mjs';

test('audio starts only after explicit game interaction and degrades gracefully without support',()=>{
 let constructed=0;class Context extends AudioDouble{constructor(){super();constructed++;}}
 const audio=createGameAudio({getContext:()=>Context});audio.update({enabled:true,ambience:true});assert.equal(constructed,0);audio.play('scan');assert.equal(constructed,0);
 assert.equal(audio.start({enabled:true}),true);assert.equal(constructed,1);audio.start({enabled:true});assert.equal(constructed,1);
 assert.equal(createGameAudio({getContext:()=>undefined}).start({enabled:true}),false);
});
test('distinct cues schedule their notes and muted or hidden games produce no new effects',()=>{
 const audio=createGameAudio({getContext:()=>AudioDouble});audio.start({enabled:true,volume:.5});const context=AudioDouble.instances.at(-1);
 assert.equal(context.oscillators.length,3);
 const patterns=new Set();for(const [name,pattern]of Object.entries(SOUND_CUES)){patterns.add(JSON.stringify(pattern));const before=context.oscillators.length;audio.play(name);assert.equal(context.oscillators.length-before,pattern.length,name);for(const node of context.oscillators.slice(before)){assert(node.started);assert(node.stopped);node.onended();}}
 assert.equal(patterns.size,Object.keys(SOUND_CUES).length);
 const before=context.oscillators.length;audio.update({enabled:false});audio.play('scan');assert.equal(context.oscillators.length,before);assert(context.suspends>0);
 audio.update({enabled:true,hidden:true});audio.play('scan');assert.equal(context.oscillators.length,before);
 audio.update({hidden:false,volume:0});audio.play('collect');assert.equal(context.oscillators.length,before);
});
test('scene ambience changes pitch and pause or page hide stops active effects',()=>{
 const audio=createGameAudio({getContext:()=>AudioDouble});audio.start({enabled:true,ambience:true});const context=AudioDouble.instances.at(-1);
 audio.update({scene:3});assert.equal(context.oscillators[0].frequency.targets.at(-1),58.27);audio.play('finale');const effects=context.oscillators.slice(3);audio.suspend();assert(effects.every(node=>node.stopped));assert(context.suspends>0);
 audio.update({paused:true});assert.equal(context.gains[0].gain.targets.at(-1),0);
});
test('actual game controls play entry, puzzle and chapter-completion sounds, then mute',()=>{
 const b=boot({AudioContext:AudioDouble});b.click('[data-action="continue"]');b.route(b.ctx.location.hash);const context=AudioDouble.instances.at(-1);
 assert(context);assert(context.oscillators.some(node=>node.frequency.notes.includes(220)));
 solveUI(b,0);assert.equal(b.document.getElementById('modal').open,true);
 assert(context.oscillators.some(node=>node.frequency.notes.includes(110)),'door sound must also play with result dialog open');
 b.click('#modal [data-action="close"]');const before=context.oscillators.length;b.click('[data-action="sound"]');assert.equal(b.state.sound,false);b.click('[data-action="module"]');assert.equal(context.oscillators.length,before);
});
