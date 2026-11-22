import { art, W, H } from './art.js';
import { sprite, flower, handAnchor } from '../assets/characters.js';

export const reactions = {
 hug:{gesture:'hug',effect:'heart',time:1.8}, shy:{gesture:'approach',a:'smile',s:'shy'},
 prank:{gesture:'prank',a:'surprised',s:'laugh',effect:'question'},
 walkHands:{gesture:'hands',walk:37}, glance:{walk:27,s:'smile',a:'smile',gesture:'glance'},
 race:{gesture:'race',a:'laugh',s:'laugh',effect:'dust'},
 selfie:{gesture:'selfie',a:'smile',s:'smile',effect:'photo',time:2.2},
 sendHeart:{gesture:'send',effect:'send',a:'surprised',s:'smile'},
 laugh:{a:'laugh',s:'laugh',effect:'spark'}, eyeContact:{gesture:'look',a:'shy',s:'blush'},
 tease:{a:'surprised',s:'laugh',effect:'spark'}, cup:{gesture:'look',a:'smile',s:'cup'},
 flower:{gesture:'flower',s:'smile',effect:'spark',time:1.8},
 flowerHug:{gesture:'flowerHug',s:'smile',effect:'heart',time:2.1},
 flowerTease:{gesture:'flower',s:'laugh',a:'surprised',effect:'question',time:1.8},
 jog:{gesture:'race',effect:'dust',s:'happy',a:'happy'},
 watch:{gesture:'watch',effect:'wind',time:1.6},
 longHug:{gesture:'hug',effect:'heart',time:2.7},
 sunHands:{gesture:'hands',pan:22,time:2}, walkLaugh:{walk:29,s:'wink',a:'laugh'},
 sitHands:{gesture:'hands',seated:true,effect:'heart'}, lean:{gesture:'lean',seated:true,time:1.6},
 sitLaugh:{gesture:'sit',seated:true,s:'laugh',a:'laugh',effect:'spark'},
 first:{gesture:'look',a:'shy',s:'smile',effect:'heart'}, bubble:{gesture:'watch',effect:'bubble',time:2.3},
 celebrate:{a:'happy',s:'happy',effect:'heart'}, bedHug:{gesture:'hug',seated:true,effect:'heart',time:2.3},
 stars:{gesture:'lean',seated:true,pan:28,time:2}, wave:{gesture:'wave',s:'laugh',a:'laugh',effect:'spark'}
};

const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>t*t*(3-2*t);
const persons=(a=255,s=214)=>[
 {name:'Anas',x:a,y:224,face:-1,pose:'idle',emotion:'smile'},
 {name:'Sama',x:s,y:224,face:1,pose:'idle',emotion:'smile',phase:3}
];
const indoor=['cafe','living','bedroom'];
const reducedTime=.34;

export class Director {
 constructor(canvas,audio){
  this.canvas=canvas;this.ctx=canvas.getContext('2d');this.art=art(this.ctx);
  this.audio=audio;this.t=0;this.reduced=false;this.setScene(0,'dawn');
 }
 setScene(scene,place){
  this.scene=scene;this.place=place;this.cam=0;this.door=0;this.dusk=0;this.light=1;this.fade=0;this.zoom=1;
  this.people=persons();this.effect=null;this.flower=null;
  if(scene===0){this.people[0].x=344;this.people[1].hidden=true}
  if(scene===1){this.people[0].x=287;this.people[1].x=225}
  if(scene===4){this.people=persons(236,201)}
  if(scene===5||scene===6){this.people=persons(292,181);this.people[1].pose='sit';this.people[0].pose=scene===5?'sit':'idle'}
  if(scene===6)this.flower=0;
  if(scene===8||scene===9||scene===10)this.people=persons(248,215);
  if(scene===11)this.people=persons(252,218);
  if(scene===14){this.people=persons(249,222);this.people.forEach(p=>p.pose='sit');this.light=.58}
 }
 snapshot(){
  const {place,cam,dusk,light,zoom,people,flower}=this;
  return {place,cam,dusk,light,zoom,people:people.map(p=>({...p})),flower};
 }
 restore(value){if(value)Object.assign(this,value)}
 update(dt){
  this.t+=this.reduced?dt*.24:dt;
  if(!this.job)return;
  const job=this.job;
  job.elapsed+=dt;
  const f=clamp(job.elapsed/job.duration);
  job.step(f);
  if(f===1){this.job=null;job.done()}
 }
 tween(duration,step){
  return new Promise(done=>{this.job={duration:duration*(this.reduced?reducedTime:1),elapsed:0,step,done};step(0)});
 }
 async walk(targets,duration=1.15,{run=false,follow=false,hands=false,turn=true}={}){
  const from=this.people.map(p=>p.x);
  this.people.forEach((p,i)=>{
   if(targets[i]===null)return;
   p.pose=run?'run':'walk';delete p.seat;delete p.hand;delete p.farHand;p.arm=0;p.lean=0;
   if(turn)p.face=targets[i]>=p.x?1:-1;
  });
  const cam=this.cam;
  const tracking=clamp((targets.reduce((sum,x,i)=>sum+(x??from[i]),0))/2-250,-66,160);
  this.audio.effect('steps');
  await this.tween(duration,f=>{
   this.people.forEach((p,i)=>{
    if(targets[i]===null)return;
    p.x=lerp(from[i],targets[i],f*.58+ease(f)*.42);
    p.stridePhase=Math.abs(p.x-from[i])/(run?45:34)+(hands?0:i*.375);
   });
   if(follow)this.cam=lerp(cam,tracking,ease(f)*.86);
   if(hands)this.join(true);
  });
  this.people.forEach((p,i)=>{if(targets[i]!==null)p.pose='idle'});
 }
 faceEach(){
  this.people.forEach((p,i)=>p.face=p.x<=this.people[1-i].x?1:-1);
 }
 join(walking=false){
  if(!walking)this.faceEach();
  const mid=(this.people[0].x+this.people[1].x)/2;
  const y=(this.people[0].y+this.people[1].y)/2;
  const bothSeated=this.people.every(p=>p.pose==='sit');
  this.people.forEach((p,i)=>{
   const towards=Math.sign(this.people[1-i].x-p.x);
   p.hand={x:(mid-towards-p.x)*p.face,y:y-p.y-(bothSeated?19:28)};
  });
 }
 async sit(indices,duration=.44){
  await this.tween(duration,f=>{
   indices.forEach(i=>{const p=this.people[i];p.seat=ease(f);p.pose=f===1?'sit':'idle'});
  });
 }
 hug(f){
  this.people.forEach((p,i)=>{
   p.lean=-2*f;
   p.hand={x:lerp(3,24,f),y:lerp(-28,-39+i*4,f)};
   p.farHand={x:lerp(-4,17,f),y:lerp(-27,-46+i*3,f)};
  });
 }
 async doorMove(to){
  const entry=this.place==='cafeOut'?209:this.place==='evening'?268:51;
  this.people.forEach(p=>{p.arm=0;p.pose='idle'});
  await this.walk([entry-19,entry-43],.72);
  this.audio.effect('door');
  await this.tween(.36,f=>this.door=f);
  await this.walk([entry+16,entry+5],.63);
  await this.tween(.3,f=>this.fade=f);
  const scene=this.scene;
  this.setScene(scene,to);this.fade=1;this.door=1;
  const goal=to==='cafe'?[219,186]:to==='cafeOut'?[252,220]:to==='bedroom'?[206,174]:[216,185];
  this.people[0].x=to==='cafeOut'?211:53;
  this.people[1].x=to==='cafeOut'?202:23;
  if(to==='living'||to==='bedroom')this.light=.27;
  const crossing=this.walk(goal,1.32,{follow:false});
  const step=this.job.step;
  this.job.step=f=>{step(f);this.fade=Math.max(0,1-f*3);this.door=1-f};
  await crossing;this.faceEach();
  if(to==='living')await this.tween(.75,f=>this.light=lerp(.27,1,f));
 }
 async enter(scene,place,initial=false){
  const prior=this.place, old=this.people.map(p=>({...p})), cam=this.cam;
  if(initial){
   this.setScene(scene,place);this.fade=1;this.people[0].x=30;this.people[0].pose='walk';this.people[0].face=1;
   await this.tween(2.05,f=>{this.fade=Math.max(0,1-f*4);this.people[0].x=lerp(30,344,ease(f))});
   this.people[0].pose='idle';this.people[0].face=-1;return;
  }
  if(scene===12||scene===13){
   await this.doorMove(place);this.scene=scene;return;
  }
  if(scene===7){
   await this.doorMove('cafeOut');this.scene=scene;return;
  }
  if(scene===14){
   const previous=this.light;
   await this.tween(.95,f=>{this.light=lerp(previous,.57,f);this.fade=f});
   this.setScene(scene,place);this.fade=1;
   await this.tween(1.35,f=>{this.fade=1-f;this.cam=f*24});
   return;
  }
  if(prior===place&&scene===5){this.scene=scene;return}
  if(prior===place&&scene===6){
   this.scene=scene;this.people[0].pose='idle';await this.tween(.72,f=>{this.people[0].arm=8*Math.sin(f*Math.PI);if(f>.55)this.flower=0});return;
  }
  if(prior===place){
   this.scene=scene;const lead=this.people[0].x>this.people[1].x;
   const offset=scene===2||scene===3||scene===9?75:0;
   await this.walk(lead?[286+offset,251+offset]:[251+offset,286+offset],1.25,{follow:true});
   this.faceEach();return;
  }
  if(scene===1){
   this.setScene(scene,place);this.people[0].x=344;this.people[1].x=-24;this.cam=-24;this.fade=.75;
   const entering=this.walk([null,275],1.65);
   const step=this.job.step;
   this.job.step=f=>{step(f);this.fade=Math.max(0,.75-f*3);this.cam=lerp(-24,29,ease(f))};
   await entering;this.faceEach();return;
  }
  this.people.forEach(p=>{p.arm=0;p.lean=0});
  const lead=old[0].x>=old[1].x;
  await this.walk(lead?[W+cam-28,W+cam-63]:[W+cam-63,W+cam-28],1.36,{follow:true});
  if(scene===4){
   const starting=this.cam;
   const positions=this.people.map(p=>p.x-starting);
   this.people.forEach(p=>{p.pose='walk';p.face=1});
   await this.tween(.9,f=>{
    const slide=ease(f);
    this.slide={next:place,offset:slide*W};
    this.people.forEach((p,i)=>p.x=starting+positions[i]+(52-W)*slide);
   });
   this.slide=null;this.setScene(scene,place);
   this.people.forEach((p,i)=>p.x=positions[i]+52-W);
   await this.walk([236,201],1.35);this.faceEach();return;
  }
  await this.tween(.36,f=>this.fade=f);
  this.setScene(scene,place);this.fade=1;
  const goals=this.people.map(p=>p.x);
  this.people[0].x=lead?15:-18;this.people[1].x=lead?-18:15;
  const entering=this.walk(goals,scene===8?1.9:1.42,{follow:!indoor.includes(place)});
  const step=this.job.step;
  this.job.step=f=>{step(f);this.fade=Math.max(0,1-f*3)};
  await entering;this.faceEach();
 }
 async cue(id){
  if(id==='cafeDoor'){await this.doorMove('cafe');return}
  if(id==='cafeSit'){
   await this.walk([292,181],.9);this.faceEach();this.people[0].arm=9;
   await this.sit([1],.32);this.people[0].arm=0;await this.sit([0],.36);return;
  }
  if(id==='sofa'){await this.walk([245,209],.7);this.faceEach();await this.sit([0]);return}
  if(id==='bedSit'){await this.walk([248,218],.75);this.faceEach();await this.sit([0,1]);return}
  if(id==='bench'){
   await this.walk([248,218],.75);this.people.forEach(p=>p.face=1);await this.sit([0,1]);
   await this.tween(2.8,f=>{this.dusk=f*.82;this.cam=f*10});return;
  }
  if(id==='breeze'){
   this.audio.effect('wind');await this.tween(1.35,f=>this.people.forEach(p=>p.wind=Math.sin(f*12)*3));return;
  }
  if(id==='lights'){
   this.audio.effect('spark');await this.tween(1.2,f=>{this.light=.27+.73*ease(f);this.effect={type:'spark',f,x:290,y:100}});this.effect=null;return;
  }
  if(id==='houseReveal'){await this.tween(.9,f=>this.cam=23*ease(f));return}
  if(id==='final'){
   await this.tween(.46,f=>this.people.forEach(p=>{p.pose='idle';p.seat=1-ease(f)}));
   this.join();this.audio.effect('ending');
   await this.tween(2.0,f=>{this.zoom=1-.1*f;this.effect={type:'final',f,x:235,y:144}});return;
  }
  const r=reactions[id];
  if(!r)return;
  let [a,s]=this.people;
  this.people.forEach(p=>{p.arm=0;p.lean=0;delete p.hand;delete p.farHand});
  a.emotion=r.a||'smile';s.emotion=r.s||'smile';
  const order=a.x<s.x?-1:1;
  const middle=clamp((a.x+s.x)/2,100,363);
  const spaced=gap=>[middle+order*gap/2,middle-order*gap/2];
  if(['hug','hands','lean','selfie','flower','flowerHug','approach','sit'].includes(r.gesture)){
   const gap=r.gesture==='hands'?30:r.gesture==='lean'?27:r.gesture==='flower'?38:r.gesture==='selfie'?24:27;
   if(r.seated&&id!=='bedHug'){
    const target=spaced(gap), start=[a.x,s.x];
    const initial=this.people.map(p=>p.pose==='sit'?1:0);
    await this.tween(.43,f=>this.people.forEach((p,i)=>{p.x=lerp(start[i],target[i],ease(f));p.seat=lerp(initial[i],1,ease(f));p.pose=f===1?'sit':'idle'}));
   }else await this.walk(spaced(gap),id==='hug'?.42:.57);
  }
  if(r.gesture==='prank'){
   await this.walk([null,a.x+38],.93,{run:false});a.emotion='surprised';
  }
  if(r.gesture==='race'){
   await this.walk([null,s.x+62],.57,{run:true,follow:true});
   await this.walk([s.x-27,null],.7,{run:true,follow:true});
  }
  if(['flower','flowerHug'].includes(r.gesture)){
   this.faceEach();
   await this.tween(.67,f=>{
    const reach=ease(Math.min(1,f*1.7));
    const gap=Math.abs(a.x-s.x)/2;
    a.hand={x:lerp(4,gap-1,reach),y:lerp(-24,-34,reach)};
    s.hand={x:lerp(3,gap+1,reach),y:lerp(-26,-34,reach)};
    if(f>.68)this.flower=1;
   });
  }
  if(r.walk){
   const [na,ns]=r.gesture==='hands'?spaced(30):[a.x,s.x];
   a.x=na;s.x=ns;
   await this.walk([a.x+r.walk,s.x+r.walk],.88,{hands:r.gesture==='hands',follow:true});
  }
  this.faceEach();
  if(r.gesture==='watch')this.people.forEach(p=>p.face=1);
  if(r.effect==='wind')this.people.forEach(p=>p.wind=2);
  if(r.gesture==='hands')this.join();
  if(r.gesture==='selfie'){a.face=s.face=Math.sign(a.x-s.x)}
  if(r.gesture==='lean'){a.face=s.face=Math.sign(a.x-s.x)}
  const cam=this.cam;
  this.audio.effect(r.effect||'spark');
  await this.tween(r.time||1.12,f=>{
   if(r.effect)this.effect={type:r.effect,f,x:middle,y:Math.min(a.y,s.y)-72,from:s.x,to:a.x};
   if(r.gesture==='flower'){
    a.hand={x:lerp(a.hand.x,3,f*.18),y:lerp(-34,-27,f)};
    s.hand={x:lerp(s.hand.x,10,f*.12),y:lerp(-34,-31,f)};
   }
   if(r.gesture==='hug'||r.gesture==='flowerHug'){
    this.hug(ease(clamp(f*5))*ease(clamp((1-f)*5)));
    if(r.gesture==='flowerHug')s.hand={x:7,y:-31};
   }
   if(r.gesture==='lean'){s.lean=8*ease(Math.min(1,f*2.5));a.lean=1.5*ease(f)}
   if(r.gesture==='selfie'){a.hand={x:lerp(4,28,ease(Math.min(1,f*4))),y:lerp(-29,-52,ease(Math.min(1,f*4)))};s.lean=3}
   if(r.gesture==='wave')this.people.forEach(p=>p.arm=13+Math.sin(f*28)*5);
   if(r.gesture==='look')s.lean=Math.sin(f*Math.PI)*2;
   if(r.pan)this.cam=cam+r.pan*ease(f);
  });
  if(id==='bedHug')await this.sit([0,1],.42);
  if(r.effect==='wind')this.people.forEach(p=>p.wind=0);
  if(['selfie','wave','hug','flowerHug'].includes(r.gesture))this.people.forEach(p=>{p.arm=0;p.lean=0;delete p.hand;delete p.farHand});
  if(r.effect!=='photo')this.effect=null;
 }
 draw(){
  const {ctx,art:draw,cam,t}=this;
  ctx.save();ctx.imageSmoothingEnabled=false;
  if(this.zoom!==1){draw.box(0,0,W,H,'#392b42');ctx.translate(W/2,H/2);ctx.scale(this.zoom,this.zoom);ctx.translate(-W/2,-H/2)}
  if(this.slide){
   ctx.save();ctx.translate(-Math.round(this.slide.offset),0);
   for(const [place,camera] of [[this.place,cam],[this.slide.next,0]]){
    ctx.save();ctx.beginPath();ctx.rect(0,0,W,H);ctx.clip();
    draw.world(place,t,camera,this);
    ctx.restore();ctx.translate(W,0);
   }
   ctx.restore();
  }else draw.world(this.place,t,cam,this);
  const flowerForeground=this.scene===6&&this.people.every(p=>p.pose!=='sit');
  if(this.place==='cafe'&&flowerForeground)draw.cafeTable(cam,t);
  for(const p of this.people)if(!p.hidden)sprite(ctx,draw,{...p,x:p.x-cam},t);
  if(this.place==='cafe'&&!flowerForeground)draw.cafeTable(cam,t);
  if(this.flower!==null){
   const p=this.people[this.flower], hand=handAnchor(p,t);
   flower(draw,p.x-cam+p.face*hand.x,p.y+hand.y-9);
  }
  if(this.effect)this.drawEffect(this.effect);
  else if(this.scene===14&&this.zoom<1)this.drawEffect({type:'final',f:(Math.sin(t*.8)+1)/2,x:235,y:144});
  if(this.fade)draw.box(-70,-40,W+140,H+80,'rgba(29,21,41,'+this.fade+')');
  ctx.restore();
 }
 drawEffect(e){
  const {box,oval,pixelHeart}=this.art;
  const x=e.x-this.cam, y=e.y, f=e.f;
  if(e.type==='question'){this.ctx.font='bold 18px monospace';this.ctx.fillStyle='#ffe5ae';this.ctx.fillText('?',e.to-this.cam-3,y-10);return}
  if(e.type==='send'){pixelHeart(lerp(e.from,e.to,ease(f))-this.cam-4,y-13-Math.sin(f*Math.PI)*25,2);return}
  if(e.type==='photo'){
   if(f<.45){
    const p=this.people[0], hand=handAnchor(p,this.t), px=p.x-this.cam+p.face*hand.x,py=p.y+hand.y-8;
    box(px-4,py-3,8,12,'#38273d');box(px-3,py-2,6,9,'#a995ac');box(px-2,py-1,2,2,'#49364b');box(px+1,py,1,1,'#f4d8b4');return;
   }
   if(f<.54&&!this.reduced)box(0,0,W,H,'#ffe8bc32');
   box(x-28,47,56,63,'#fff0dc');box(x-24,51,48,45,'#d8a3ad');box(x-24,82,48,14,'#e2b994');oval(x-10,73,7,10,'#625366');oval(x+9,73,8,11,'#594359');box(x-12,75,8,5,'#e5b498');box(x+5,74,8,5,'#bc8067');pixelHeart(x-3,58);
   return;
  }
  if(e.type==='bubble'){
   oval(x,83,34,22,'#f5dad2');oval(x,83,31,19,'#a97b9b');oval(x+7,83,9,9,'#ffc39a');box(x-24,85,48,8,'#9e7f9b');box(x-19,89,37,1,'#f6bca4');return;
  }
  if(e.type==='wind'){
   for(let i=0;i<6;i++)box(x-63+f*96+i*10,y+10+(i%3)*12,5+i%3,1,'#fff1c990');
   return;
  }
  for(let i=0;i<7;i++){
   const px=x+(i-3)*10+Math.sin(f*4+i)*7,py=e.type==='dust'?224-f*10:y-9-f*42+(i%3)*10;
   if(e.type==='heart'||e.type==='final'){pixelHeart(px,py,1,i%2?'#ffbed1':'#ee91b1')}
   else{box(px-2,py,5,1,e.type==='dust'?'#e2b993':'#ffda9f');box(px,py-2,1,5,'#fff0cb')}
  }
  if(e.type==='final'){
   box(x-6,y-20,13,2,'#f9d895');box(x-1,y-25,3,12,'#f9d895');box(x-2,y-21,5,4,'#fff0c4');
  }
 }
}

export function thumbnail(canvas,scene,place){
 const director=new Director(canvas,{effect(){}});
 director.setScene(scene,place);director.t=1.8;
 if(scene===12||scene===13)director.people.forEach(p=>p.pose='sit');
 director.draw();
}
