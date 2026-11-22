export const W=480,H=270;
const palettes={
 dawn:['#5d5281','#9574a4','#e599a8','#ffce9f','#a582a1','#cfa4a4'],
 street:['#79adc6','#adcadd','#e5d7d3','#fff0c1','#a89bad','#ddaf95'],
 cafeOut:['#83afc0','#b6cbd0','#efdbc6','#ffe3b7','#b7a5ae','#d9ac91'],
 sea:['#518db2','#86b8cc','#c9ddda','#fff0c7','#7199ab','#e5bd93'],
 sunset:['#47517d','#936b98','#e1859e','#ffbb88','#80698d','#bf8e97'],
 evening:['#332f54','#52466f','#816b8a','#d2979b','#615978','#8e7384']
};
const noise=n=>{const a=Math.sin(n*159.37+2.72)*43758.5453;return a-Math.floor(a)};
export function art(ctx){
 const box=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)};
 const poly=(pts,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(...pts[0].map(Math.round));for(const p of pts.slice(1))ctx.lineTo(...p.map(Math.round));ctx.closePath();ctx.fill()};
 const oval=(x,y,rx,ry,c)=>{for(let j=-ry;j<=ry;j++){const a=Math.floor(rx*Math.sqrt(1-(j/(ry+.3))**2));box(x-a,y+j,a*2+1,1,c)}};
 const texture=(n,x,y,w,h,cs,seed=0)=>{for(let i=0;i<n;i++){const k=i+seed;box(x+noise(k)*w,y+noise(k+800)*h,1+Math.floor(noise(k+44)*5),1,cs[i%cs.length])}};
 function glow(x,y,rx,ry,color){
  for(const layer of [1,.74,.51,.29])oval(x,y,Math.round(rx*layer),Math.round(ry*layer),color);
 }
 function cloud(x,y,s,c,d){
  const shape=[[0,5,12,2],[7,2,24,5],[14,-1,22,8],[22,-5,16,10],[29,-8,13,13],[38,-4,17,12],[50,0,17,7],[61,4,16,3],[13,7,51,3],[27,10,35,2]];
  for(const [a,b,w,h] of shape)box(x+a*s,y+b*s,Math.max(1,Math.round(w*s)),Math.max(1,Math.round(h*s)),c);
  for(const [a,b,w] of [[10,7,23],[29,10,34],[37,7,32],[50,5,23],[4,13,24],[62,11,19]])box(x+a*s,y+b*s,Math.round(w*s),Math.max(1,Math.round(s)),d);
 }
 function stars(x,y,w,h,t,n=38){
  for(let i=0;i<n;i++){const a=x+noise(i+72)*w,b=y+noise(i+144)*h;box(a,b,1+(i%7===0),1+(i%7===0),Math.sin(t*1.5+i)>.2?'#ffe0b2':'#a297bc');if(i%11===0){box(a-2,b+1,6,1,'#d7b5bc');box(a+1,b-2,1,6,'#d7b5bc')}}
 }
 function birds(t,cam,color){
  for(let i=0;i<5;i++){
   const x=(450-t*13+i*23+960)%520-cam*.17,y=71+i*4+Math.sin(t+i)*6;
   const wing=Math.sin(t*6+i)>0?1:-1;
   box(x,y,2,1,color);box(x-2,y-wing,2,1,color);box(x+2,y-wing,2,1,color);
   box(x-3,y-wing*2,1,1,color);box(x+4,y-wing*2,1,1,color);
  }
 }
 function sky(place,t,cam, dusk=0){
  const p=palettes[place];for(let y=0;y<160;y+=3){const ratio=y/159*(p.length-3), i=Math.min(2,Math.floor(ratio));const a=p[i],b=p[i+1],f=ratio-i;const rgb=[1,3,5].map(j=>Math.round(parseInt(a.slice(j,j+2),16)*(1-f)+parseInt(b.slice(j,j+2),16)*f));box(0,y,W,3,'rgb('+rgb.join(',')+')')}
  const night=place==='evening', sunset=place==='sunset';
  if(night||dusk>.18){ctx.save();ctx.globalAlpha*=night?1:dusk;stars(3,5,474,106,t);ctx.restore()}
  const x=sunset?317:night?372:place==='dawn'?152:385,y=sunset?111+dusk*29:night?42:place==='dawn'?66:38;
  glow(x,y,sunset?104:65,sunset?66:48,night?'#c5b7f209':'#ffce9420');
  oval(x,y,sunset?39:night?12:24,sunset?39:night?12:24,night?'#eee0d0':sunset?'#ffd59e':'#ffebbf');
  if(sunset)for(let i=0;i<6;i++)box(x-36+i*2,y+13+i*3,72-i*4,1,'#f59e7d55');
  if(night)oval(x+5,y-4,10,10,'#494164');
  for(let i=0;i<9;i++){const cx=((i*109+t*(1+i%2)-cam*.14)%680+680)%680-100;cloud(cx,24+(i*27)%95,.43+noise(i)*1.22,night?'#6d5c84':sunset?(i%2?'#b877a0':'#e29bad'):'#f9e4d8',night?'#877197':sunset?'#f6adaf':'#eec6c2')}
  if(sunset||place==='sea')for(let i=0;i<12;i++)box(i*47-cam*.06,121+(i*7)%14,14+i%4*8,1,sunset?'#ffce9a5c':'#fff2d57c');
 }
 function skyline(p,cam){
  for(let i=-2;i<27;i++){let x=i*26-Math.round(cam*.32),h=16+noise(i+38)*35,y=153-h;
   box(x,y,23,h+8,p[4]);poly([[x-2,y+2],[x+9,y-7],[x+24,y+2]],p[4]);
   for(let j=0;j<3;j++)box(x+4+j*6,y+9,2,4,p[3]);
  }
 }
 function flowers(x,y,w,seed,t){
  for(let i=0;i<w/4;i++){const a=x+i*4,b=y-3-Math.round(noise(i+seed)*10), dx=Math.round(Math.sin(t*2+i)*1.2);
   box(a,b,1,y-b,'#708376');box(a-2,b+3,3,1,'#9da279');box(a+dx-1,b-1,3,3,['#ec9aae','#ffcaac','#d382a5','#f3c7bf'][i%4]);box(a+dx,b,1,1,'#ffe3a7');
  }
 }
 function tree(x,y,seed,t){
  oval(x+4,y+1,24,4,'#714a5a36');
  poly([[x-11,y],[x-6,y-18],[x-5,y-50],[x-13,y-72],[x-8,y-86],[x+4,y-59],[x+10,y-84],[x+15,y-78],[x+7,y-46],[x+5,y-14],[x+13,y]],'#734f5b');
  poly([[x-3,y-4],[x-1,y-28],[x-3,y-49],[x-9,y-72],[x-4,y-70],[x+3,y-48],[x+3,y-15],[x+6,y-3]],'#a87772');
  box(x-3,y-30,1,16,'#c59583');
  poly([[x-28,y-79],[x-7,y-53],[x+2,y-52],[x-19,y-83]],'#93636c');
  const canopy=['#9d647e','#b97190','#d4859e','#e69baa','#f4b9bd','#ffd1c5'];
  for(let i=0;i<27;i++){
   const a=x+(noise(seed+i)-.5)*86,b=y-63-noise(seed+i+95)*62;
   oval(a,b,10+i%9,8+i%7,canopy[i%5]);
   oval(a-2,b-3,6+i%5,4+i%5,canopy[1+i%5]);
   for(let j=0;j<5;j++){const u=a+(noise(seed+i*4+j)-.5)*20,v=b+(noise(j+i*8)-.6)*13;box(u,v,j%2+1,1,canopy[3+j%3])}
  }
  for(let i=0;i<5;i++){let a=x+Math.sin(t*.55+i)*35,b=y-90+(t*5+i*13)%80;box(a,b,2,1,'#f2a8b7')}
 }
 function lamp(x,y,lit){
  if(lit){glow(x,y-94,36,38,'#ffb97818');oval(x,y-1,25,4,'#ffd89f37')}
  box(x-5,y-3,11,4,'#4d4355');box(x-2,y-90,4,90,'#514452');box(x,y-77,1,72,'#a07b7a');
  poly([[x-9,y-101],[x,y-110],[x+9,y-101]],'#4a3b50');box(x-7,y-101,15,13,'#56465a');box(x-5,y-99,11,9,lit?'#ffe0a1':'#f0c3a7');box(x,y-100,1,12,'#77565d');
 }
 function windowAt(x,y,w,h,night){
  box(x-3,y-3,w+6,h+7,'#775768');box(x,y,w,h,night?'#f6bd87':'#aec4c6');box(x+2,y+2,w-4,h-4,night?'#fbd8a0':'#bfd7d5');
  poly([[x+3,y+4],[x+10,y+4],[x+w-3,y+h-7],[x+w-3,y+h-3]],night?'#ffe6a8':'#e0e6da');
  box(x+w/2-1,y,2,h,'#906c76');box(x,y+h/2, w,2,'#906c76');box(x-5,y+h+1,w+10,3,'#e6b5a5');
 }
 function door(x,y,open=0){
  box(x-4,y-76,45,77,'#805d6e');box(x,y-72,37,72,'#4d384d');
  const w=37-Math.floor(open*32);
  box(x,y-72,w,72,'#a87c84');box(x+2,y-69,Math.max(1,w-4),66,'#bd9290');
  if(w>13){box(x+5,y-64,w-10,23,'#775969');box(x+7,y-62,w-14,19,'#edbc91');box(x+w-7,y-31,3,3,'#ffda9a')}
 }
 function facade(x,y,w,h,i,night,shop,open){
  const cs=['#cb9499','#e9c3a9','#bca4b6','#9eafa9','#dea894'];
  box(x,y,w,h,cs[i%cs.length]);box(x+w-5,y,5,h,'#9e7b8b');box(x-5,y-4,w+10,6,'#9f7280');box(x-3,y+2,w+6,3,'#f5c1ac');
  poly([[x-5,y-4],[x+w+4,y-4],[x+w-8,y-18-i*2],[x+9,y-18-i*2]],['#875b71','#9e6b77','#816880','#738785','#ac7581'][i]);
  for(let j=7;j<w-2;j+=9){box(x+j,y-13,6,1,'#eab4aa65');box(x+j+3,y-8,7,1,'#593c5850')}
  box(x+3,y+8,2,h-9,'#ffe0bc5e');box(x+3,y+h-5,w-11,4,'#78566542');
  for(let j=14;j<h-3;j+=13)box(x+2,y+j,w-9,1,'#fff3d22a');
  texture(29,x+4,y+8,w-12,h-12,['#9b657f42','#fff0c179','#7f596c30'],i*19);
  if(shop){
   windowAt(x+14,y+47,48,31,true);windowAt(x+w-68,y+48,49,31,true);
   glow(x+174,y+66,29,21,'#ffd59316');
   door(x+70,y+h,open);box(x+58,y+7,77,18,'#724e60');box(x+60,y+9,73,14,'#543b50');
   ctx.fillStyle='#ffe3bd';ctx.font='bold 9px monospace';ctx.fillText('PETIT CAFE',x+69,y+20);
   for(let k=0;k<Math.floor((w-10)/8);k++){
    const a=x+5+k*8;poly([[a+4,y+30],[a+11,y+30],[a+8,y+43],[a,y+43]],k%2?'#fae0c8':'#bd718c');
    box(a,y+43,8,4,k%2?'#e6af9f':'#a35c78');box(a+1,y+47,6,2,k%2?'#e6af9f':'#a35c78');
   }
   for(let j=0;j<5;j++){oval(x+155+j*9,y+72,3,2,'#ae765f');box(x+154+j*9,y+70,3,1,'#fff0bf')}
   box(x+137,y+56,4,8,'#6e4a62');box(x+134,y+57,10,5,'#94758c');
   flowers(x+13,y+83,46,7,0);box(x+11,y+82,50,5,'#947182');
  }else{
   for(let j=0;j<Math.floor(w/36);j++){windowAt(x+11+j*34,y+15,19,25,night);flowers(x+10+j*34,y+47,20,j+8,0);box(x+9+j*34,y+46,23,4,'#9a6f7a')}
   if(w>55)door(x+w/2-16,y+h,open);
  }
 }
 function bench(x,y,w=82){
  box(x-4,y-20,w+8,5,'#88596a');box(x-4,y-13,w+8,5,'#aa7072');box(x,y-25,3,30,'#644b5c');box(x+w-3,y-25,3,30,'#644b5c');box(x-6,y-4,w+12,5,'#cb937e');box(x-4,y+1,w+8,3,'#7f5966');box(x+2,y+4,4,12,'#604859');box(x+w-6,y+4,4,12,'#604859');
 }
 function street(place,t,cam,state){
  const p=palettes[place],night=place==='evening';sky(place,t,cam);skyline(p,cam);
  if(place==='street')birds(t,cam,'#7f8298');
  box(0,148,W,62,night?'#716178':'#c3a3a4');
  if(place!=='dawn'){
   if(place==='cafeOut'){facade(120-cam,90,216,102,1,night,true,state.door);facade(348-cam,109,103,83,3,night,false,0)}
   else for(let i=-1;i<9;i++){const x=i*95-55-cam;const house=night&&i===3;facade(x,103+(i%3)*8,house?112:88,89-(i%3)*8,((i+5)%5),night||house,false,house?state.door:0)}
  }
  box(0,192,W,9,night?'#93798c':'#e6c0ac');box(0,201,W,31,p[5]);box(0,232,W,3,night?'#635567':'#b89494');box(0,235,W,35,night?'#544d64':'#a78995');
  for(let y=206;y<232;y+=8)for(let x=-42;x<W;x+=36){const a=x-((cam+(y%3)*13)%36);box(a,y,29,1,'#f6d0b36b');box(a+28,y+1,1,5,'#7e596c35')}
  texture(134,0,202,W,29,['#efd0ac62','#a7777040','#fff1c552'],89);
  texture(135,0,237,W,32,night?['#695b70','#61556a']:['#b899a1','#9b818f'],8);
  box(0,235,W,2,'#4f3d5460');box(0,243,W,1,'#efc6bb38');
  if(place==='dawn'){tree(55-cam*.4,212,81,t);lamp(371-cam,217,true);bench(34-cam,207,64)}
  else{
   if(place==='street'){tree(51-cam,210,200,t);tree(360-cam,209,380,t);bench(340-cam,207);if(state.scene===3){for(let y=136;y<186;y+=12)flowers(292-cam,y,95,y,t)}}
   lamp((night?306:410)-cam,215,night);lamp(104-cam,217,night);
   for(let i=0;i<4;i++){const x=40+i*122-cam;flowers(x,199,27,i+8,t);box(x-2,198,32,5,'#956b77')}
  }
 }
 function shore(place,t,cam,state){
  const dusk=state.dusk||0,sunset=place==='sunset';sky(place,t,cam,dusk);
  if(!sunset)birds(t,cam,'#6a829a');
  box(0,137,W,3,sunset?'#ffc39e':'#e5e3c9');
  const bands=sunset?['#775b83','#926984','#ae7a89','#be8b92','#d09a9b']:['#4e84a1','#5895ad','#60a3b4','#6cb2ba','#83c1c1'];
  for(let i=0;i<bands.length;i++)box(0,140+i*12,W,12,bands[i]);
  if(!sunset)poly([[11,138],[22,134],[35,135],[54,130],[68,130],[82,135],[114,138]],'#8da9ad');
  for(let i=0;i<15;i++){
   const y=141+i*4;
   for(let j=0;j<15;j++){
    const a=((noise(i*15+j)*520+t*(j%2?5:-2)-cam*.25)%520+520)%520-20;
    const width=3+noise(i+j+18)*(12+i*.9);
    box(a,y+(j%3===1),width,1,sunset?(j%4?'#f7aea064':'#ffd3ab8a'):(j%4?'#caebe085':'#e1f0d3b6'));
    if(j%3===1)box(a+width*.3,y+2,width*.6,1,sunset?'#684f786f':'#508fa888');
   }
  }
  for(let i=0;i<40;i++){
   const y=140+i*1.22, center=sunset?318:385, a=center+(noise(i+54)-.5)*(i*2.1+12)+Math.sin(t*1.7+i)*6;
   const width=2+noise(i+26)*(9+i*.55);
   box(a-width/2,y,width,1,sunset?(i%3?'#f9ae91':'#ffdc9c'):(i%3?'#d6e5bb83':'#fff1c0b0'));
  }
  const wave=x=>188+Math.sin(t*1.35+x*.023)*2.7+Math.sin(x*.055-t*.85)*1.5;
  const shorePoints=Array.from({length:25},(_,i)=>[i*20,wave(i*20)]);
  poly([...shorePoints,[480,270],[0,270]],sunset?'#aa7e8e':'#c49a82');
  poly([...shorePoints.map(([x,y])=>[x,y+10]),[480,270],[0,270]],sunset?'#c3919b':'#e9bf97');
  for(let x=0;x<W;x+=4){
   const y=wave(x);
   box(x,y-1,4,2,sunset?'#eec0b3':'#edf0d0');
   if(Math.sin(x*.08+t*2)>.15)box(x,y+2,3,1,sunset?'#ffd8ba':'#fff0d4');
   if(Math.cos(x*.13-t*2)>.65)box(x,y+5,2,1,sunset?'#f6c8b2':'#f7dfb7');
  }
  texture(310,0,199,W,68,sunset?['#ae8090','#ca9aa0','#d3a4a2']:['#d3a982','#edcba6','#f4d6af'],90);
  if(state.scene===8){box(0,182,W,3,'#886c77');box(0,196,W,2,'#a88487');for(let x=-cam%57;x<W;x+=57)box(x,182,3,22,'#886c77')}
  for(let i=0;i<12;i++){
   const x=(i*83+40-cam)%540,y=207+noise(i+77)*50,scale=2+i%4;
   oval(x+2,y+1,scale+3,2,'#89677948');
   if(i%3===0){
    poly([[x-scale,y],[x-scale+2,y-4],[x+scale-1,y-5],[x+scale+2,y-1],[x+scale,y+1]],sunset?'#8c6e87':'#a78e90');
    box(x-scale+2,y-4,5,1,sunset?'#c9a5a7':'#e0b9a3');
   }else{
    oval(x,y,scale,2,'#b88a8a');box(x-2,y-2,4,1,'#ffe1bc');box(x-1,y-1,1,1,'#f7d2ad');box(x+1,y-1,1,1,'#f7d2ad');
   }
  }
  for(const x of [28,51,426,464]){
   const a=x-cam*.72,y=258+(x%7);
   for(let j=0;j<6;j++)poly([[a,y],[a+(j-3)*4+Math.sin(t*1.9+j)*2,y-12-j%3*4],[a+(j-3)*4+3,y-9-j%3*4],[a+3,y]],sunset?'#76677e':'#788479');
  }
  if(sunset){
   for(const p of state.people||[])poly([[p.x-cam-8,222],[p.x-cam+9,222],[p.x-cam-43,246],[p.x-cam-65,247]],'#68466545');
   bench(202-cam,214,68);
  }
 }
 function plant(x,y,t){
  box(x-9,y-11,17,11,'#a46777');box(x-10,y-13,19,3,'#dc9e8a');
  box(x-7,y-10,3,8,'#c18485');box(x+4,y-10,2,8,'#8f596d');
  for(let i=0;i<7;i++){
   const a=x+(i-3)*4+Math.sin(t*1.4+i)*1.4,b=y-22-noise(i+10)*17;
   poly([[x,y-10],[a-3,b+6],[a-2,b+1],[a,b],[a+4,b+3],[x+2,y-10]],['#637568','#829474','#a0a97e'][i%3]);
   box(a-1,b+3,4,1,'#c3b98b');
  }
 }
 function picture(x,y,w,h,kind){
  box(x+2,y+3,w,h,'#7650655a');box(x,y,w,h,'#94707c');box(x+2,y+2,w-4,h-4,'#e9c2af');
  box(x+4,y+4,w-8,h-8,kind?'#e4aca7':'#9d9bb6');
  if(kind){pixelHeart(x+w/2-4,y+h/2-3,1,'#b77a91')}
  else{
   oval(x+w-11,y+10,4,4,'#f7d4a6');
   poly([[x+4,y+h-5],[x+11,y+13],[x+20,y+h-6],[x+w-4,y+10],[x+w-4,y+h-4]],'#777993');
  }
 }
 function curtain(x,y,mirror,night){
  ctx.save();ctx.translate(x,y);ctx.scale(mirror,1);
  const base=night?'#9b7595':'#d69c92', highlight=night?'#c69db4':'#e9bab0';
  poly([[0,0],[24,0],[20,14],[13,32],[8,38],[13,46],[17,64],[19,78],[-3,78],[-3,3]],base);
  poly([[4,1],[9,1],[9,23],[6,39],[10,49],[13,74],[8,75],[3,50],[2,39]],highlight);
  box(-3,37,13,3,'#efc78f');box(8,40,2,5,'#bd8b77');
  ctx.restore();
 }
 function room(place,t,cam,state){
  const cafe=place==='cafe', bed=place==='bedroom', light=state.light??1;
  box(0,0,W,196,cafe?'#b98584':bed?'#c49bae':'#d09b95');
  box(0,0,W,16,'#875f7955');box(0,16,W,2,'#f6c8b1a8');box(0,19,W,3,'#905f7454');
  for(let x=-cam%26;x<W;x+=26){
   box(x,22,1,145,'#f8c5ae63');box(x+2,22,1,145,'#9e6d8750');
   for(let y=34;y<165;y+=24){box(x+13,y,1,4,'#ffe1ba40');box(x+12,y+1,3,2,'#ffe1ba40')}
  }
  box(0,165,W,29,cafe?'#805765':bed?'#98758c':'#a37281');box(0,164,W,3,'#ebbb9d');box(0,191,W,4,'#674d62');box(0,195,W,75,cafe?'#9d7173':'#a57882');
  for(let x=-cam%42;x<W;x+=42){box(x+4,171,34,15,'#653f573f');box(x+5,172,32,12,'#d5a09361')}
  for(let y=203;y<270;y+=12){box(0,y,W,1,'#684c5d');box(0,y+1,W,1,'#dfad9266');for(let x=-(y%20)*4;x<W;x+=60)box(x,y,1,12,'#7e596a')}
  texture(140,0,198,W,72,['#bd8e88','#c4948c','#9b727b'],69);
  const d=31-cam;door(d,193,state.door);
  const wx=(cafe?190:bed?309:137)-cam, wy=51;
  box(wx-7,wy-7,113,86,'#79576e');box(wx,wy,99,72,cafe?'#a6c5cf':'#514b77');
  if(cafe){
   cloud(wx+6+(t%8),wy+20,.7,'#ece1da','#e0c8bf');box(wx,wy+62,99,10,'#b7a3a5');
   for(let i=0;i<6;i++){const x=wx+3+i*16,y=wy+47+(i%3)*4;box(x,y,15,72+wy-y,'#9a889e');box(x+4,y+4,3,5,'#dec2aa')}
  }else{
   box(wx,wy+52,99,20,'#645780');glow(wx+69,wy+23,25,21,'#e9c5cd16');
   stars(wx+3,wy+4,93,64,t,24);oval(wx+68,wy+23,11,11,'#f7dcb5');oval(wx+72,wy+19,9,9,'#514b77');
  }
  box(wx+47,wy,4,72,'#9a7386');box(wx,wy+41,99,3,'#9a7386');box(wx-10,wy+73,119,4,'#e8b2a1');
  curtain(wx-4,wy-2,1,!cafe);curtain(wx+103,wy-2,-1,!cafe);
  box(wx-9,wy-4,118,2,'#f4caa1');
  if(!cafe){
   for(let i=0;i<27;i++){
    const x=88+i*12-cam,y=28+Math.sin(i*.36)*8;
    const nextY=28+Math.sin((i+1)*.36)*8;
    poly([[x,y],[x+12,nextY],[x+12,nextY+1],[x,y+1]],'#8c667e');
    const bright=Math.sin(t*1.8+i*.9)>.3;
    if(light>.4&&bright)oval(x,y+3,6,5,'#ffda9b38');
    oval(x,y+3,2,2,light>.46?['#ffdf9c','#ffe4b7','#f5c4ce'][i%3]:'#ae8199');
   }
  }
  oval(246-cam,225,109,20,'#62445865');oval(246-cam,224,104,18,cafe?'#794f65':'#ad7b91');oval(246-cam,224,97,16,cafe?'#b88381':'#e1acae');
  oval(246-cam,224,83,12,cafe?'#956675':'#ca8fa4');oval(246-cam,224,75,9,cafe?'#a8757b':'#d79cad');
  for(let i=0;i<18;i++){const x=160+i*10-cam,y=224+7*Math.sin(i*.7);box(x,y,3,1,'#f5ccb388');box(x+1,y-1,1,3,'#efd0bc75')}
  if(cafe){
   picture(90-cam,88,35,31,0);picture(130-cam,96,24,21,1);
   for(const x of [125,239,351]){
    box(x-cam,0,2,49,'#765565');
    poly([[x-14-cam,61],[x+15-cam,61],[x+64-cam,180],[x-60-cam,180]],'#ffd19b1f');
    glow(x-cam,65,31,24,'#ffd19b20');oval(x-cam,56,19,9,'#855862');
    box(x-11-cam,51,20,1,'#cf8d81');box(x-14-cam,58,29,3,'#ffd2a1');box(x-8-cam,60,16,2,'#fff0b4');
   }
   box(355-cam,143,85,46,'#795061');box(360-cam,123,75,24,'#bac5c5');box(363-cam,126,69,17,'#86768c');
   box(364-cam,140,67,2,'#c9947c');
   for(let i=0;i<7;i++){
    const x=368+i*9-cam;oval(x,138,4,3,i%2?'#ce806e':'#dba678');
    box(x-2,135,4,1,i%2?'#f8c5b3':'#f8d5a4');box(x,137,1,1,'#9f6265');
   }
   poly([[366-cam,127],[372-cam,127],[384-cam,140],[379-cam,140]],'#fff6d955');
   box(357-cam,147,81,3,'#bc8a80');
   for(let i=0;i<5;i++){box(361-cam+i*15,153,12,31,'#b17c7955');box(363-cam+i*15,154,1,28,'#d39a8655')}
   bench(166-cam,211,27);bench(281-cam,211,27);
  }else if(bed){
   picture(115-cam,70,29,29,1);picture(153-cam,62,39,35,0);
   box(98-cam,137,64,4,'#9d6b82');box(103-cam,141,2,7,'#79556f');box(154-cam,141,2,7,'#79556f');
   for(let i=0;i<5;i++){box(105+i*7-cam,121+(i%3)*2,5,16-(i%3)*2,['#b87f95','#e2ae99','#9a8daf'][i%3]);box(106+i*7-cam,124+(i%3)*2,3,1,'#f1c7aa')}
   box(177-cam,152,114,51,'#926d88');box(180-cam,155,108,46,'#a37b93');box(172-cam,186,144,39,'#875f77');box(175-cam,182,136,23,'#f2c5c6');box(175-cam,193,136,26,'#b98fad');
   box(173-cam,151,122,4,'#b1839a');box(178-cam,156,3,32,'#ba90a3');box(285-cam,156,3,30,'#825f7e');
   for(let y=197;y<220;y+=5)box(176-cam,y,135,1,'#cd9bb7');
   for(let x=185;x<300;x+=14)for(let y=198;y<218;y+=7){box(x-cam,y,2,2,'#e8bfd0');box(x-2-cam,y+2,1,1,'#e8bfd0');box(x+3-cam,y-1,1,1,'#f4cbd2')}
   box(176-cam,218,134,2,'#845f80');box(178-cam,222,5,6,'#704f70');box(305-cam,222,5,6,'#704f70');
   oval(199-cam,179,18,8,'#f6dad1');box(185-cam,182,25,2,'#d8a8ae');oval(234-cam,181,16,7,'#e4acc0');box(222-cam,184,24,2,'#bc839f');
   oval(273-cam,177,9,8,'#a88379');oval(269-cam,168,4,4,'#a88379');oval(278-cam,168,4,4,'#a88379');oval(273-cam,171,6,5,'#c39a87');box(272-cam,172,3,2,'#6a515e');
   box(270-cam,170,1,1,'#654957');box(276-cam,170,1,1,'#654957');
   if(light<.83)poly([[352-cam,126],[391-cam,126],[443-cam,250],[303-cam,243]],'#d4c6ec19');
  }else{
   picture(274-cam,77,34,33,1);picture(313-cam,61,39,37,0);
   box(179-cam,165,116,42,'#9b6f83');box(183-cam,162,108,34,'#ba8797');box(172-cam,183,130,34,'#875e75');box(184-cam,191,107,22,'#d4a0a7');box(176-cam,211,122,8,'#ab7a89');
   box(187-cam,164,98,2,'#dfabb0');box(230-cam,168,1,22,'#996d84');box(183-cam,203,109,1,'#a87489');
   for(const x of [204,221,246,263])box(x-cam,174,2,2,'#9d7088');
   oval(197-cam,182,12,11,'#e2b3a6');oval(275-cam,181,12,11,'#ca9eb5');
   for(let i=0;i<4;i++)box(189+i*4-cam,178+i*2,3,1,'#f0cfb0');
   box(175-cam,187,9,20,'#bc8898');box(291-cam,187,8,20,'#bc8898');
   box(181-cam,219,6,6,'#6c4c62');box(287-cam,219,6,6,'#6c4c62');
   box(341-cam,134,54,60,'#8b6170');for(let i=0;i<3;i++){box(345-cam,138+i*15,45,12,'#705065');for(let j=0;j<6;j++)box(349+j*6-cam,141+i*15,4,8,['#d4a296','#a186a4','#d1ae90'][j%3])}
  }
  if(!cafe){
   const lx=(bed?338:321)-cam;
   box(lx-12,193,28,27,'#8b616f');box(lx-11,193,25,4,'#cc978d');box(lx-8,202,19,9,'#a6757f');box(lx,206,3,1,'#e9b88c');
   box(lx-2,147,4,47,'#9b646d');box(lx-5,190,10,3,'#b68079');
   if(light>.38)glow(lx,156,48,39,'#ffd29c20');
   poly([[lx-10,142],[lx+10,142],[lx+16,158],[lx-16,158]],light>.5?'#ffdca5':'#be9299');
   box(lx-13,156,26,2,light>.5?'#fff1c0':'#d1a8ab');
  }
  plant(92-cam,201,t);plant(426-cam,206,t);
 }
 function cafeTable(cam,t){
  const x=238-cam;oval(x+2,222,20,3,'#69495b50');box(x-3,183,6,36,'#79545f');box(x-2,187,2,27,'#ba867e');box(x-15,217,30,3,'#694e61');box(x-31,180,62,6,'#9b626f');box(x-32,177,64,4,'#d8a48e');
  for(const a of [x-17,x+17]){
   oval(a,176,7,1,'#f0c9ac');box(a-3,169,7,6,'#ffe0c4');box(a-2,169,5,1,'#a46a65');box(a+4,170,2,3,'#f5ccb5');box(a-2,172,2,2,'#fff0d1');
   for(let i=0;i<4;i++)box(a+Math.sin(t*2.8+i*.7)*2,166-i*3-(t*4%3),1,2,'#fff2dc77');
  }
  oval(x,176,8,1,'#f3ccb3');oval(x,174,5,2,'#b87467');box(x-2,172,4,1,'#f3be8f');box(x+1,174,1,1,'#885664');
 }
 function pixelHeart(x,y,s=1,c='#f6a2bd'){
  for(const [a,b,w] of [[1,0,2],[4,0,2],[0,1,7],[0,2,7],[1,3,5],[2,4,3],[3,5,1]])box(x+a*s,y+b*s,w*s,s,c);
 }
 function world(place,t,cam,state){
  if(['cafe','living','bedroom'].includes(place))room(place,t,cam,state);
  else if(place==='sea'||place==='sunset')shore(place,t,cam,state);
  else street(place,t,cam,state);
  if(place==='dawn'||place==='street'||place==='sunset')for(let i=0;i<15;i++){const x=(noise(i+600)*500+t*(4+i%3))%500,y=(noise(i+710)*220+t*2)%215;if(i%7===0&&place==='dawn')pixelHeart(x,y,1,'#ffd3ce');else box(x,y,2,1,'#ffd4bc')}
  if(state.dusk)box(0,0,W,H,'rgba(53,36,84,'+state.dusk*.31+')');
  if((state.light??1)<.98&&['living','bedroom'].includes(place))box(0,0,W,H,'rgba(47,34,82,'+(1-state.light)*.63+')');
 }
 return {box,poly,oval,world,cafeTable,pixelHeart};
}
