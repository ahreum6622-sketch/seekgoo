import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import handler from '../api/analyze-space.js';
const root=path.resolve(new URL('..',import.meta.url).pathname),port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.woff':'font/woff'};
http.createServer(async(req,res)=>{
 if(req.url?.split('?')[0]==='/api/analyze-space'){
  let size=0,chunks=[];for await(const chunk of req){size+=chunk.length;if(size>2300000){res.writeHead(413,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'사진이 너무 커요.'}));return;}chunks.push(chunk);}req.body=Buffer.concat(chunks).toString();res.status=code=>{res.statusCode=code;return res;};res.json=body=>res.end(JSON.stringify(body));return handler(req,res);
 }
 try{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name!=='/'&&name!=='/index.html'&&!/^\/(css|js|assets)\//.test(name))throw Error();const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root+path.sep))throw Error();const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}
}).listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`seekgoo local server ${port}`));
