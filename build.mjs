import { cp, mkdir } from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for (const file of ['.nojekyll','index.html','style.css','src','assets']) await cp(file,'dist/'+file,{recursive:true});
console.log('Static site built in dist/');

