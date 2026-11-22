import test from 'node:test';
import assert from 'node:assert/strict';
import { scenes } from '../src/story.js';
import { Director, reactions } from '../src/director.js';
import { fresh, markComplete, read, write, remove, validate, saveKey } from '../src/save.js';

const canvas={getContext:()=>({})};
function director(){
 const world=new Director(canvas,{effect(){}});
 world.reduced=true;
 return world;
}
async function finish(world,promise,visit=()=>{}){
 let ended=false;
 promise.then(()=>{ended=true});
 for(let i=0;!ended&&i<500;i++){
  world.update(.03);
  visit(world);
  await Promise.resolve();
 }
 assert(ended,'animation must resolve');
 await promise;
}

test('canonical scene order, dialogue and branches',()=>{
 assert.deepEqual(scenes.map(s=>s.id),[
  'scene_01_intro','scene_02_meeting','scene_03_street_walk','scene_04_street_memory',
  'scene_05_cafe_arrival','scene_06_cafe_talk','scene_07_flower','scene_08_leave_cafe',
  'scene_09_beach_arrival','scene_10_beach_walk','scene_11_sunset','scene_12_return_home',
  'scene_13_living_room','scene_14_bedroom','scene_15_ending'
 ]);
 assert.deepEqual(scenes.map(s=>s.steps.filter(x=>x.text).length),[4,9,9,7,9,9,11,9,8,9,16,10,10,16,7]);
 const choices=scenes.flatMap(s=>s.steps.filter(x=>x.options));
 assert.equal(choices.length,12);
 assert.equal(new Set(choices.flatMap(c=>c.options.map(o=>o.id))).size,34);
 for(const c of choices){
  assert.match(c.prompt,/\p{Script=Arabic}/u);
  assert.equal(c.options.length,new Set(c.options.map(o=>o.motion)).size);
  for(const o of c.options){
   assert.ok(reactions[o.motion]);
   assert.ok(o.lines.length);
   o.lines.forEach(l=>assert.match(l.text,/\p{Script=Arabic}/u));
  }
 }
});

test('all choice timelines finish with visible movement, expression or effect',async()=>{
 for(const [index,scene] of scenes.entries()){
  for(const option of scene.steps.flatMap(s=>s.options||[])){
   const world=director();world.setScene(index,scene.place);
   let changes=false;const initial=JSON.stringify(world.people);
   await finish(world,world.cue(option.motion),w=>{changes ||= JSON.stringify(w.people)!==initial||!!w.effect});
   assert.ok(changes,option.id);
   assert.ok(world.people.every(p=>Number.isFinite(p.x)&&p.pose!=='walk'&&p.pose!=='run'));
  }
 }
});

test('walk-out precedes a different location and follow camera stays bounded',async()=>{
 const world=director();world.setScene(3,'street');
 let exited=false,entered=false;
 await finish(world,world.enter(4,'cafeOut'),w=>{
  if(w.place==='street'&&w.people[0].x>380)exited=true;
  if(w.place==='cafeOut'&&w.people[0].x<55){assert(exited);entered=true}
  assert(w.cam>=-66&&w.cam<=160);
 });
 assert(entered);assert.equal(world.fade,0);
 await finish(world,world.cue('cafeDoor'),w=>assert.ok(w.door>=0&&w.door<=1));
 assert.equal(world.place,'cafe');
 await finish(world,world.cue('cafeSit'));
 assert(world.people.every(p=>p.pose==='sit'));
 const people=world.people;
 await finish(world,world.enter(5,'cafe'));
 assert.equal(world.people,people);
 assert.equal(world.fade,0);
});

test('checkpoint can round trip during a branch and unlocks follow finished scenes',()=>{
 const slots=new Map();
 const storage={getItem:k=>slots.get(k)||null,setItem:(k,v)=>slots.set(k,v),removeItem:k=>slots.delete(k)};
 const value=fresh();value.scene=1;markComplete(value);
 value.index=scenes[1].steps.findIndex(s=>s.options);
 const choice=scenes[1].steps[value.index];
 value.picks[choice.id]=choice.options[2].id;value.branch=1;
 value.visual=director().snapshot();
 write(storage,saveKey,value);
 assert.deepEqual(validate(read(storage,saveKey)),value);
 remove(storage,saveKey);assert.equal(read(storage,saveKey),null);
 for(const invalid of ['!', JSON.stringify({...value,branch:100}),JSON.stringify({...value,visual:{people:[null,null]}})]){
  slots.set(saveKey,invalid);assert.equal(validate(read(storage,saveKey)),null);
 }
});

