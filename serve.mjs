import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute, extname } from 'node:path';

const root = process.cwd();
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json' };
const server=createServer(async (request,response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    const file = resolve(root,'.' + (pathname === '/' ? '/index.html' : pathname));
    const local = relative(root,file);
    if (local.startsWith('..') || isAbsolute(local)) throw new Error('Outside project');
    const type = types[extname(file)];
    if (!type) throw new Error('Unknown content type');
    const content = await readFile(file);
    response.writeHead(200,{'Content-Type': type + '; charset=utf-8'});
    response.end(content);
  } catch {
    response.writeHead(404).end('Not found');
  }
});
server.listen(Number(process.env.PORT ?? 4173),'127.0.0.1',() => console.log('http://127.0.0.1:' + server.address().port));

