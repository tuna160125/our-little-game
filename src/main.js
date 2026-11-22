import { scenes } from './story.js';
import { Director, thumbnail } from './director.js';
import { Audio } from './audio.js';
import { defaultPreferences, fresh, markComplete, memoryCards, optionsKey, read, remove, saveKey, validate, write } from './save.js';

const $=id=>document.getElementById(id);
const hud=$('hud'),title=$('title'),overlay=$('overlay'),content=$('modal-content');
let storage;
try{storage=window.localStorage}catch{/* Keep playing without persistence. */}
const storedOptions=read(storage,optionsKey);
const preferences={...defaultPreferences,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches};
for(const key of ['music','sound','reduced'])if(typeof storedOptions?.[key]==='boolean')preferences[key]=storedOptions[key];
if(typeof storedOptions?.volume==='number')preferences.volume=Math.min(1,Math.max(0,storedOptions.volume));
const audio=new Audio(preferences),director=new Director($('world'),audio);
director.reduced=preferences.reduced;
let progress=validate(read(storage,saveKey));
let mode='boot',lockedUntil=0,typing=null,last=0;
const chapterLabels=['المقابلة','الديت','ع البحر','في البيت'];
const select=(tag,txt='',cls='')=>{const node=document.createElement(tag);node.textContent=txt;node.className=cls;return node};
function button(text,click,cls=''){
 const result=select('button',text,cls);
 result.type='button';result.addEventListener('click',()=>{audio.unlock();click()});
 return result;
}
function actions(...buttons){
 const row=select('div','','actions');row.append(...buttons);return row;
}
function checkpoint(){
 progress.visual=director.snapshot();write(storage,saveKey,progress);
}
function setChapter(index){
 const chapter=scenes[index].chapter;
 $('chapter').textContent='الفصل '+['١','٢','٣','٤'][chapter-1]+' · '+chapterLabels[chapter-1];
}
function pauseWorld(enabled){
 audio.paused=enabled;
}
function open(label){
 $('overlay-title').textContent=label;
 content.replaceChildren();pauseWorld(true);overlay.showModal();
}
$('close').onclick=()=>overlay.close();
overlay.addEventListener('close',()=>pauseWorld(overlay.open));
$('settings').onclick=()=>{
 audio.unlock();open('الإعدادات');
 const list=select('div','','settings-list');
 for(const [key,label] of [['music','الموسيقى'],['sound','المؤثرات الصوتية'],['reduced','حركة أقل'],['volume','مستوى الصوت']]){
  const row=select('label',label),input=document.createElement('input');
  if(key==='volume'){input.type='range';input.min=0;input.max=1;input.step=.05;input.value=preferences[key]}
  else{input.type='checkbox';input.checked=preferences[key]}
  input.addEventListener('input',()=>{preferences[key]=key==='volume'?Number(input.value):input.checked;director.reduced=preferences.reduced;write(storage,optionsKey,preferences)});
  row.append(input);list.append(row);
 }
 if(progress?.memories.length)list.append(button('ذكريات يومنا ✨',()=>{overlay.close();queueMicrotask(gallery)}));
 if(['typing','ready','choice'].includes(mode))list.append(button('ارجعي للبداية',()=>{
  overlay.close();typing=null;director.setScene(0,'dawn');audio.place='dawn';menu();
 }));
 content.append(list);
};
function gallery(){
 open('ذكريات يومنا ✨');pauseWorld(true);
 const grid=select('div','','gallery');
 for(const [index,name,caption] of memoryCards){
  const card=select('article'), unlocked=progress?.memories.includes(index);
  if(unlocked){
   const canvas=document.createElement('canvas');canvas.width=480;canvas.height=270;
   canvas.setAttribute('role','img');canvas.setAttribute('aria-label',name);
   thumbnail(canvas,index,scenes[index].place);card.append(canvas);
  }
  card.append(select('h3',name),select('p',unlocked?caption:'لسه مقفولة'));grid.append(card);
 }
 content.append(grid);
}
function menu(){
 mode='menu';$('chapter').textContent='';title.hidden=false;
 const choices=progress?[button('كمّلي حكايتنا ♡',()=>start(false),'primary'),button('ابدئي من الأول',()=>start(true))]:[button('ابدئي حكايتنا ♡',()=>start(true),'primary')];
 if(progress?.memories.length)choices.push(button('ذكريات يومنا ✨',gallery));
 hud.replaceChildren(select('p','يوم صغير... وذكريات كتير مستنيانا ♡'),actions(...choices));
}
function start(restart){
 if(!['menu','ending'].includes(mode))return;
 mode='busy';title.hidden=true;audio.effect('click');
 if(restart){
  remove(storage,saveKey);progress=fresh();director.setScene(0,'dawn');
  director.effect={type:'heart',f:.2,x:344,y:148};
 }else{
  director.setScene(progress.scene,scenes[progress.scene].place);director.restore(progress.visual);
 }
 setChapter(progress.scene);audio.place=director.place;show();
}
function line(entry){
 mode='typing';
 const text=select('p');text.setAttribute('aria-label',entry.text);
 const speaker=entry.speaker?select('p',entry.speaker==='Anas'?'أنس':'سما','speaker '+(entry.speaker==='Sama'?'sama':'')):null;
 hud.replaceChildren(...(speaker?[speaker]:[]),text,actions(button('كمّلي ›',advance,'primary')));
 const chars=Array.from(entry.text);
 typing={text,chars,start:performance.now(),shown:0};
 if(director.reduced)finishTyping();
}
function finishTyping(){
 if(!typing)return;
 typing.text.textContent=typing.chars.join('');typing=null;mode='ready';
}
function ending(){
 markComplete(progress);checkpoint();
 mode='ending';title.hidden=false;title.querySelector('h1').innerHTML='Our Day<br>Together ♡';
 hud.replaceChildren(select('p','يمكن اليوم خلص...'),select('p','بس لسه عندنا حكايات كتير.'),select('p','شكرًا على أحلى يوم يا سما ♡'),
  actions(button('نعيش اليوم من أول وجديد ♡',()=>{
   mode='boot';progress=null;remove(storage,saveKey);hud.replaceChildren();title.hidden=true;
   title.querySelector('h1').innerHTML='Our Day<br>Together';audio.place='dawn';
   director.enter(0,'dawn',true).then(menu);
  },'primary'),button('ذكريات يومنا ✨',gallery)));
}
async function show(){
 if(progress.scene!==0)director.effect=director.effect?.type==='photo'?director.effect:null;
 const scene=scenes[progress.scene],step=scene.steps[progress.index];
 if(!step){
  mode='busy';hud.replaceChildren();
  if(progress.scene===scenes.length-1){
   if(!progress.completed.includes(progress.scene)){audio.place='ending';await director.cue('final')}
   ending();return;
  }
  markComplete(progress);checkpoint();
  const next=progress.scene+1;
  await director.enter(next,scenes[next].place);
  progress.scene=next;progress.index=0;progress.branch=-1;progress.chapter=scenes[next].chapter;
  audio.place=director.place;setChapter(next);checkpoint();show();return;
 }
 if(step.motion){
  mode='busy';hud.replaceChildren();await director.cue(step.motion);
  audio.place=director.place;progress.index++;checkpoint();show();return;
 }
 checkpoint();
 if(step.text){line(step);return}
 if(progress.branch>=0){
  const option=step.options.find(o=>o.id===progress.picks[step.id]);
  line(option.lines[progress.branch]);return;
 }
 mode='choice';
 const menu=actions(...step.options.map(o=>button(o.label,()=>choose(step,o))));
 menu.classList.add('choices');hud.replaceChildren(select('p',step.prompt,'speaker'),menu);
}
async function choose(step,option){
 if(mode!=='choice'||overlay.open)return;
 mode='busy';hud.replaceChildren();audio.effect('click');
 await director.cue(option.motion);
 progress.picks[step.id]=option.id;
 progress.branch=0;checkpoint();show();
}
function advance(){
 if(overlay.open||!['typing','ready'].includes(mode)||performance.now()<lockedUntil)return;
 audio.unlock();audio.effect('click');lockedUntil=performance.now()+170;
 if(mode==='typing'){finishTyping();return}
 const step=scenes[progress.scene].steps[progress.index];
 if(progress.branch>=0){
  const option=step.options.find(o=>o.id===progress.picks[step.id]);
  progress.branch++;
  if(progress.branch>=option.lines.length){progress.branch=-1;progress.index++}
 }else progress.index++;
 show();
}
hud.addEventListener('click',event=>{if(!event.target.closest('button')&&event.target.closest('p'))advance()});
document.addEventListener('keydown',event=>{
 if(event.repeat||overlay.open)return;
 if(event.key==='Escape'){$('settings').click();return}
 if(['Enter',' '].includes(event.key)&&!event.target.closest('button,input')&&['typing','ready'].includes(mode)){
  event.preventDefault();advance();
 }
 if(mode==='choice'&&/^[1-3]$/.test(event.key))hud.querySelectorAll('button')[Number(event.key)-1]?.click();
});
function frame(now){
 const delta=last?Math.min(.05,(now-last)/1000):0;last=now;
 if(!overlay.open&&!document.hidden){
  director.update(delta);
  if(typing){
   const n=Math.floor((now-typing.start)/31);
   if(n>=typing.chars.length)finishTyping();
   else if(n>typing.shown){
    typing.shown=n;typing.text.textContent=typing.chars.slice(0,n).join('');
    if(n%4===0)audio.effect('type');
   }
  }
  director.draw();
 }else if(typing)typing.start+=delta*1000;
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
director.enter(0,'dawn',true).then(menu);
