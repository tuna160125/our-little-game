import { scenes } from './story.js';

export const memoryCards=[
 [1,'أول مقابلة','وأخيرًا شوفنا بعض ♡'],
 [2,'مشينا سوا','أحلى مشوار هو اللي بنمشيه سوا.'],
 [3,'ذكرى صغيرة','ضحكة وصورة وذكرى.'],
 [5,'الديت في الكافيه','قعدة صغيرة وكلام كتير.'],
 [6,'وردة','وردة ليكي.'],
 [9,'مشية ع البحر','خطواتنا جنب البحر.'],
 [10,'الغروب','غروب مش هيتنسي.'],
 [12,'ركننا الهادي','آخر اليوم... وأحلى هدوء.']
];
export const saveKey='our-day-together:v1';
export const optionsKey='our-day-together:options';
export const defaultPreferences={music:true,sound:true,volume:.45,reduced:false};
export const fresh=()=>({version:1,scene:0,index:0,branch:-1,picks:{},completed:[],memories:[],chapter:1,visual:null});
export function read(storage,key){
 try{return JSON.parse(storage.getItem(key))}catch{return null}
}
export function write(storage,key,value){
 try{storage.setItem(key,JSON.stringify(value))}catch{/* Storage may be unavailable. */}
}
export function remove(storage,key){
 try{storage.removeItem(key)}catch{/* Storage may be unavailable. */}
}
export function validate(value){
 if(!value||value.version!==1||!Number.isInteger(value.scene)||!Number.isInteger(value.index)||!Number.isInteger(value.branch))return null;
 const s=scenes[value.scene],step=s?.steps[value.index];
 if(!s||value.index<0||value.index>s.steps.length||value.branch< -1)return null;
 if(!value.picks||typeof value.picks!=='object'||Array.isArray(value.picks)||!Array.isArray(value.completed)||!Array.isArray(value.memories))return null;
 const picks={};
 for(const c of scenes.flatMap(s=>s.steps.filter(x=>x.options))){
  if(c.options.some(o=>o.id===value.picks[c.id]))picks[c.id]=value.picks[c.id];
 }
 if(value.branch>=0&&!step?.options?.find(o=>o.id===picks[step.id])?.lines[value.branch])return null;
 const v=value.visual;
 if(v&&(!['dawn','street','cafeOut','cafe','sea','sunset','evening','living','bedroom'].includes(v.place)
  || !Array.isArray(v.people)||v.people.length!==2
  || v.people.some((p,i)=>!p||p.name!==['Anas','Sama'][i]||!Number.isFinite(p.x)||!Number.isFinite(p.y)||![1,-1].includes(p.face))
  || ![v.cam,v.dusk,v.light,v.zoom].every(Number.isFinite) || ![null,0,1].includes(v.flower)))return null;
 const completed=[...new Set(value.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<=value.scene))];
 return {...fresh(),...value,visual:v||null,chapter:s.chapter,picks,completed,memories:memoryCards.map(c=>c[0]).filter(n=>completed.includes(n))};
}
export function markComplete(progress){
 if(!progress.completed.includes(progress.scene))progress.completed.push(progress.scene);
 progress.memories=memoryCards.map(c=>c[0]).filter(n=>progress.completed.includes(n));
}
