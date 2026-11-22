import { anasProfile } from './anas-profile.js';
import { samaProfile } from './sama-profile.js';
import { anasBody } from './anas-body.js';
import { samaBody } from './sama-body.js';

const palettes = {
 Anas:{ink:'#231b20', skin:'#d79064', light:'#edaa79', blush:'#ba6a55', shadow:'#a96047', eyes:'#623d2c', top:'#342c2f', fold:'#272124', trim:'#504345', pants:'#45393c', seam:'#635156', shoe:'#e5d4c1'},
 Sama:{ink:'#30262c', skin:'#f2b18a', light:'#ffd1a7', blush:'#d98471', shadow:'#c58169', eyes:'#886540', top:'#f2dfc9', fold:'#bda28e', trim:'#fff0da', pants:'#8b7267', seam:'#ad9281', shoe:'#e9d6c1'}
};

export const necklace = [
 '  +   +  ',
 '   + +   ',
 '    +    ',
 '+   +  + ',
 ' ++ + ++ ',
 '  +++++  ',
 '++  +  ++',
 ' +++++++ ',
 '    +    ',
 '   +++   '
];

const walkFrames = [
 {foot:-9,lift:0,knee:-3,arm:6,rise:0},
 {foot:-5,lift:0,knee:0,arm:3,rise:-1},
 {foot:-1,lift:0,knee:2,arm:0,rise:0},
 {foot:5,lift:0,knee:4,arm:-3,rise:1},
 {foot:9,lift:0,knee:5,arm:-6,rise:0},
 {foot:4,lift:4,knee:8,arm:-3,rise:-1},
 {foot:-3,lift:8,knee:4,arm:0,rise:0},
 {foot:-8,lift:4,knee:-1,arm:3,rise:1}
];
function compileProfile(profile){
 return profile.matrix.map(row=>{
  const runs=[];
  for(let x=0;x<row.length/2;){
   const code=row.slice(x*2,x*2+2);
   let end=x+1;
   while(row.slice(end*2,end*2+2)===code)end++;
   if(code!=='..')runs.push([x,end-x,profile.colors[parseInt(code,36)]]);
   x=end;
  }
  return runs;
 });
}

const profiles={Anas:compileProfile(anasProfile),Sama:compileProfile(samaProfile)};
const bodies={Anas:compileProfile(anasBody),Sama:compileProfile(samaBody)};
function shadedRows(rows){
 return rows.map(row=>row.map(([x,width,color])=>{
  const channel=offset=>Math.round(parseInt(color.slice(offset,offset+2),16)*.78).toString(16).padStart(2,'0');
  return [x,width,'#'+channel(1)+channel(3)+channel(5)];
 }));
}
const shadowBodies={Anas:shadedRows(bodies.Anas),Sama:shadedRows(bodies.Sama)};
const mix=(a,b,t)=>a+(b-a)*t;
function gait(person,t){
 const run=person.pose==='run';
 const moving=run||person.pose==='walk';
 if(!moving)return {front:walkFrames[2],back:walkFrames[2],bob:0,scale:1,moving:false};
 const phase=person.stridePhase??(t*(run?2.6:1.75)+(person.phase||0)/8);
 const index=((Math.floor(phase*8)%8)+8)%8;
 return {front:walkFrames[index],back:walkFrames[(index+4)%8],bob:walkFrames[index].rise,scale:run?1.35:1,moving:true};
}

export function posture(person,t){
 const movement=gait(person,t);
 const sit=person.seat??(person.pose==='sit'?1:0);
 const breath=Math.sin(t*2.2+(person.name==='Sama'?1.4:0));
 const laugh=person.emotion==='laugh'?Math.abs(Math.sin(t*11))*1.6:0;
 const motion=movement.moving?-movement.bob:Math.max(0,breath)*1.2;
 const rise=Math.round(motion+laugh);
 const sama=person.name==='Sama';
 return {sit,movement,shoulder:(sama?-59:-64)+sit*23-rise,hip:-35+sit*16};
}

export function handAnchor(person,t,far=false){
 const {sit,shoulder,movement}=posture(person,t);
 const custom=far?person.farHand:person.hand;
 if(custom)return {x:custom.x,y:custom.y};
 const arm=far?0:person.arm;
 if(arm)return {x:arm+2,y:sit>.5?-23:arm>17?-45:-32};
 const swing=movement.moving?(far?movement.back.arm:movement.front.arm)*movement.scale*.78:0;
 return {x:(far?-4:-2)+swing+sit*(far?12:16),y:shoulder+31-sit*13+(far?2:0)};
}

export function sprite(ctx,art,person,t) {
 const {x,y,face,emotion,lean=0}=person;
 const sama=person.name==='Sama';
 const p=palettes[person.name], {sit,movement,shoulder,hip}=posture(person,t);
 const body=bodies[person.name];
 const straight=!movement.moving&&!sit&&!person.hand&&!person.farHand&&!person.arm;
 const {box,poly,oval}=art;
 oval(x+1,y-1,17,3,'#37263b38');
 oval(x+2,y-1,11,2,'#37263b43');
 ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(face,1);

 function leg(far){
  const frame=far?movement.back:movement.front;
  const stride=movement.moving?frame.foot*movement.scale:0;
  const step=movement.moving?frame.lift*(movement.scale+.1):0;
  const root=far?-5:1;
  const knee=root+(movement.moving?frame.knee:1)+sit*14;
  const ankle=root+stride+sit*(far?8:11);
  const startY=Math.round(hip-2), bendY=Math.round(-18+sit*5-step*.55), soleY=Math.round(-step);
  const first=sama?28:34, middle=sama?40:47, cuff=sama?50:59, last=sama?54:63;
  const rows=far?shadowBodies[person.name]:body;
  if(sit>0){
   const thigh=Math.round(mix(root+3,knee,sit));
   const width=Math.round(7+sit*9);
   for(let i=0;i<5;i++){
    const color=far?p.fold:[p.ink,p.pants,p.seam,p.pants,p.ink][i];
    box(thigh-width+i/2,bendY-4+i,width+2-i/2,1,color);
   }
  }
  for(let y=startY;y<soleY;y++){
   const lower=y>=bendY;
   const shoe=y>=soleY-5;
   const t=lower?(y-bendY)/Math.max(1,soleY-5-bendY):(y-startY)/Math.max(1,bendY-startY);
   const sample=shoe?Math.round(mix(cuff,last,(y-soleY+5)/4)):Math.round(lower?mix(middle,cuff-1,t):mix(first,middle,t));
   const center=lower?mix(knee,ankle,Math.min(t,1)):mix(root,knee,t);
   const cropCenter=sama?16:14;
   const scale=shoe?.75:mix(.67,.57,sit);
   for(const [col,width,color] of rows[sample]){
    const left=Math.round(center+(col-cropCenter)*scale);
    const right=Math.round(center+(col+width-cropCenter)*scale);
    if(right>left)box(left,y,right-left,1,color);
   }
  }
 }

 function sleeve(far){
  const {x:hx,y:hy}=handAnchor(person,t,far);
  const sx=far?2:-5, sy=shoulder+5+(far?2:0);
  const ex=Math.round(mix(sx,hx,.36))-(far?0:2), ey=Math.round(mix(sy,hy,.57)+3);
  const lifting=hx>sx+6;
  const wx=hx-(lifting?3:0), wy=hy-(lifting?0:3);
  poly([[sx-3,sy],[sx-1,sy-2],[sx+3,sy-2],[sx+4,sy+1],[ex+3,ey-1],[wx+2,wy-3],[wx+3,wy],[wx+2,wy+2],[ex+1,ey+3],[ex-2,ey+3],[sx-3,sy+4]],p.ink);
  poly([[sx-2,sy+1],[sx-1,sy-1],[sx+2,sy-1],[ex+2,ey],[wx+2,wy-2],[wx+2,wy+1],[ex+1,ey+2],[ex-1,ey+2],[sx-2,sy+4]],far?p.fold:p.top);
  if(!far){
   box(sx-1,sy,2,4,p.trim);box(ex-1,ey,3,1,p.fold);
   if(lifting)box(wx-1,wy-2,2,5,p.fold);
   else box(wx-3,wy,6,2,p.fold);
  }
  box(hx-2,hy-1,5,3,p.shadow);
  box(hx-1,hy-1,3,2,p.skin);
  box(hx+1,hy-1,1,1,p.light);
 }
 if(!straight){leg(true);leg(false);sleeve(true)}
 const bodyLeft=-18;
 if(straight){
  for(let row=0;row<body.length;row++){
   for(const [col,width,color] of body[row])box(bodyLeft+col,row-body.length,width,1,color);
  }
 }else{
  // Retain the reference jacket and sweater folds when the joints move.
  const torsoRows=sama?24:29;
  const height=Math.round(hip-shoulder+4);
  for(let row=0;row<height;row++){
   const sample=Math.min(torsoRows-1,Math.floor(row*torsoRows/height));
   const offset=sit>0?Math.round(sit*2*row/height):0;
   for(const [col,width,color] of body[sample]){
    const pinch=sit>.5&&row>height*.67?1:0;
    const start=Math.max(col,7+pinch), end=Math.min(col+width,(sama?30:27)-pinch);
    if(end>start)box(bodyLeft+start+offset,shoulder+row,end-start,1,color);
   }
  }
 }
 const moodDrop=['shy','cup'].includes(emotion)?2:0;
 const clothSway=Math.round(Math.sin(t*(movement.moving?9:2.15))*1.4+(person.wind||0));
 const profile=profiles[person.name];
 const left=sama?-18:-19;
 const collar=straight?(sama?-54:-63):Math.round(shoulder)+(sama?3:1);
 const tilt=Math.round(lean);
 const top=collar-profile.length+(sama?5:4);
 if(sama){
  // The rear tail moves with the head. The lower fold stays on the jacket.
  const wrap=collar-2+moodDrop;
  poly([[-12+tilt,wrap-3],[-3+tilt,wrap-2],[5+tilt,wrap],[6,collar+3],[-2,collar+5],[-10,collar+3]],'#3c3136');
  poly([[-10+tilt,wrap-2],[-5+tilt,wrap],[4+tilt,wrap+1],[4,collar+2],[-2,collar+3],[-9,collar+2]],'#67585b');
 }else{
  const neck=collar-2+moodDrop;
  poly([[-9+tilt,neck-1],[tilt,neck],[1,collar+3],[-8,collar+3]],p.ink);
  poly([[-7+tilt,neck-1],[-1+tilt,neck],[-1,collar+1],[-6,collar+1]],p.shadow);
  box(-7,collar+2,7,1,p.fold);
 }
 ctx.save();ctx.translate(tilt,moodDrop);
 for(let row=0;row<profile.length;row++){
  const sway=sama&&row>28?Math.sign(clothSway):0;
  for(const [col,width,color] of profile[row])box(left+col+sway,top+row,width,1,color);
 }
 const blink=(t+(sama?.87:.19))%4.7<.12;
 if(blink||emotion==='laugh'||emotion==='wink'){
  const eyeY=top+(sama?14:15);
  box(left+22,eyeY,5,2,p.skin);box(left+22,eyeY,4,1,p.ink);
 }
 if(['shy','cup','blush'].includes(emotion)){
  box(left+21,top+19,3,1,p.blush);
 }
 if(emotion==='laugh'||emotion==='surprised'){
  const mx=left+(sama?25:27), my=top+21;
  box(mx,my,3,2,'#743d42');
  if(emotion==='laugh')box(mx,my,2,1,'#f5dacc');
 }
 ctx.restore();
 if(sama){
  for(let j=0;j<necklace.length;j++)for(let k=0;k<9;k++)if(necklace[j][k]==='+'){
   box(k-2,shoulder+7+j,1,1,j<3?'#d9cbd0':j%3?'#94939f':'#c1bcc4');
  }
 }
 if(!straight)sleeve(false);
 ctx.restore();
}

export function flower(art,x,y){
 art.box(x,y,1,11,'#4f705b');art.box(x-3,y+6,4,1,'#6e986f');art.box(x+1,y+4,3,1,'#a0ae79');
 art.oval(x,y,4,3,'#ad6585');art.box(x-3,y-2,6,4,'#e58fa9');art.box(x-2,y-3,2,2,'#ffd2c7');
 art.box(x+1,y-2,2,2,'#fbb4bf');art.box(x,y,1,1,'#ffe4a9');
}


