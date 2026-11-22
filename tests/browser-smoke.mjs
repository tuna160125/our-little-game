import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.DAY_PLAYWRIGHT||'playwright');
const browser=await chromium.launch({executablePath:process.env.DAY_EDGE});
let url=process.env.DAY_URL;
const shot=process.env.DAY_SHOTS;
const errors=[];
const server=process.env.DAY_URL?null:spawn(process.execPath,['serve.mjs'],{stdio:['ignore','pipe','inherit'],env:{...process.env,PORT:'0'}});
try{
 if(server)url=(await Promise.race([once(server.stdout,'data').then(([data])=>String(data).trim()),once(server,'exit').then(()=>{throw Error('Local server did not start')})]));
 if(process.env.DAY_PATH)url=new URL(process.env.DAY_PATH,url).href;
 const page=await browser.newPage({viewport:{width:844,height:390},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
 page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400)errors.push(response.status()+' '+response.url())});
 await page.goto(url);
 const start=page.getByRole('button',{name:'ابدئي حكايتنا ♡'});
 await start.waitFor();
 if(shot)await page.screenshot({path:shot+'/day-mobile.png'});
 await start.tap();
 const visited=new Set();
 let last=-1,options=0,resumed=false,ended=false;
 for(let i=0;i<260;i++){
  await page.waitForFunction(()=>document.querySelector('#hud button'));
  const state=await page.evaluate(()=>({
   ...JSON.parse(localStorage.getItem('our-day-together:v1')),
   choice:!!document.querySelector('.choices'),
   end:!!document.querySelector('#hud button')?.textContent.includes('نعيش')
  }));
  visited.add(state.scene);
  if(state.end){ended=true;break}
  if(last!==state.scene&&shot&&[1,5,10,13].includes(state.scene))await page.screenshot({path:shot+'/day-scene-'+state.scene+'.png'});
  last=state.scene;
  if(state.choice){
   const button=page.locator('.choices button').nth(options%2);
   options++;
   await button.tap();
   continue;
  }
  if(state.scene===1&&state.branch===0&&!resumed){
   await page.reload();
   await page.getByRole('button',{name:'كمّلي حكايتنا ♡'}).click();
   assert.match(await page.locator('#hud p').last().textContent(),/كده اليوم بدأ صح/);
   resumed=true;
  }
  await page.waitForTimeout(175);
  await page.getByRole('button',{name:'كمّلي ›'}).click();
 }
 assert(ended&&resumed);
 assert.equal(visited.size,15);
 assert.equal(options,12);
 await page.getByRole('button',{name:'ذكريات يومنا ✨'}).click();
 assert.equal(await page.locator('.gallery canvas').count(),8);
 await page.getByRole('button',{name:'اقفلي'}).click();
 await page.getByRole('button',{name:'نعيش اليوم من أول وجديد ♡'}).click();
 await start.waitFor();
 assert.deepEqual(errors,[]);
 for(const viewport of [{width:390,height:844},{width:768,height:1024},{width:1366,height:768}]){
  const screen=await browser.newPage({viewport,reducedMotion:'reduce'});
  await screen.goto(url);
  await screen.getByRole('button',{name:'ابدئي حكايتنا ♡'}).waitFor();
  assert.equal(await screen.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  if(viewport.width===1366){
   if(shot)await screen.screenshot({path:shot+'/day-desktop.png'});
   await screen.getByRole('button',{name:'ابدئي حكايتنا ♡'}).click();
   await screen.locator('canvas').click();
   await screen.keyboard.press('Enter');
   assert.match(await screen.locator('#hud p').textContent(),/بس لما/);
  }
  await screen.close();
 }
 console.log('Browser passed all 15 scenes, branch resume, 8 gallery cards, replay, keyboard and 4 viewport sizes.');
}finally{await browser.close();server?.kill()}


