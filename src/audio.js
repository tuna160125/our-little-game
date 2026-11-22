const themes={
 dawn:[60,64,67,72,69,67,64,62],street:[65,69,72,76,74,72,69,67],
 cafeOut:[60,64,67,71,69,67,64,62],cafe:[57,60,64,67,65,64,60,62],
 sea:[62,66,69,74,73,69,66,64],sunset:[57,60,64,69,67,64,62,60],
 evening:[55,59,62,67,66,62,59,57],living:[60,65,69,72,71,69,65,64],
 bedroom:[55,60,64,67,65,64,60,59],ending:[60,64,67,72,71,67,64,72]
};
const effects={
 click:[79], type:[69], steps:[43,40,43],door:[49,42,53],photo:[92,51],
 heart:[74,81,86],send:[69,76,83],spark:[81,86,90],question:[62,68,71],
 wind:[55,57],dust:[43,46],bubble:[65,72,77],ending:[60,64,67,72,76]
};
export class Audio {
 constructor(preferences){this.preferences=preferences;this.place='dawn';this.beat=0}
 unlock(){
  const Context=window.AudioContext||window.webkitAudioContext;
  if(!Context)return;
  if(!this.context){
   this.context=new Context();
   this.timer=setInterval(()=>this.music(),430);
  }
  if(this.context.state==='suspended')this.context.resume().catch(()=>{});
 }
 note(midi,delay,duration,volume,type='sine'){
  const context=this.context;
  if(!context||context.state!=='running'||!volume)return;
  const osc=context.createOscillator(),gain=context.createGain(),at=context.currentTime+delay;
  osc.type=type;osc.frequency.value=440*2**((midi-69)/12);
  gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(volume,at+.035);
  gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
  osc.connect(gain).connect(context.destination);osc.start(at);osc.stop(at+duration+.01);
 }
 noise(duration,frequency,volume){
  const context=this.context;
  if(!context||context.state!=='running'||!volume)return;
  const samples=context.createBuffer(1,Math.ceil(context.sampleRate*duration),context.sampleRate);
  const data=samples.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
  const source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain(),at=context.currentTime;
  source.buffer=samples;filter.type='lowpass';filter.frequency.value=frequency;gain.gain.setValueAtTime(.0001,at);
  gain.gain.exponentialRampToValueAtTime(volume,at+duration*.25);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
  source.connect(filter).connect(gain).connect(context.destination);source.start();
 }
 music(){
  if(this.paused||document.hidden)return;
  const {music,sound,volume}=this.preferences;
  const theme=themes[this.place]||themes.dawn,n=this.beat++%8;
  if(music){
   if(n%4===0)this.note(theme[0]-12,0,1.4,.045*volume);
   if(n%2===0||n===7)this.note(theme[n],.025,.76,.036*volume,'triangle');
  }
  if(sound&&(this.place==='sea'||this.place==='sunset')&&n%4===0)this.noise(1.5,650,.08*volume);
 }
 effect(name){
  if(!this.preferences.sound||this.paused)return;
  const volume=this.preferences.volume;
  if(name==='wind'||name==='steps'||name==='photo')this.noise(name==='wind'?.9:.16,name==='photo'?3100:420,volume*.12);
  for(const [i,n] of (effects[name]||[]).entries())this.note(n,i*.09,name==='type'?.045:.18,volume*(name==='type'?.009:.028),name==='steps'?'triangle':'sine');
 }
}
