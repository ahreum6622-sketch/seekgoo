import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHandler} from '../api/analyze-space.js';
const imageDataUrl='data:image/png;base64,'+(await readFile(new URL('../assets/brand/logo-source.png',import.meta.url))).toString('base64');
async function run(handler,body={imageDataUrl},method='POST',headers={host:'localhost:4173',origin:'http://localhost:4173'}){const res={statusCode:0,setHeader(){},status(n){this.statusCode=n;return this;},json(body){this.body=body;return this;}};await handler({body,method,headers},res);return res;}
assert.equal((await run(createHandler({env:{}}))).statusCode,503);
assert.equal((await run(createHandler({env:{}}),{},'GET')).statusCode,405);
assert.equal((await run(createHandler({env:{}}),{imageDataUrl:'https://internal/private'})).statusCode,400);
assert.equal((await run(createHandler({env:{}}),{imageDataUrl:'a'.repeat(2200001)})).statusCode,413);
assert.equal((await run(createHandler({env:{}}),{imageDataUrl},'POST',{host:'local',origin:'https://evil.test'})).statusCode,403);
const env={GEMINI_API_KEY:'test-only'};
const output=(light=0)=>({light,isSpace:true,summary:'창가에 밝은 빛이 보여요.',evidence:['바닥에 직접 햇빛이 보여요.'],confidence:'medium'});
const response=(out=output(),finishReason='STOP')=>({candidates:[{finishReason,content:{parts:[{thought:true,text:'excluded reasoning'},{text:JSON.stringify(out)}]}}]});
const stub=data=>async()=>({ok:true,json:async()=>data});
let sent,urlSent,headersSent,calls=0;
for(let light=0;light<4;light++){
 const result=await run(createHandler({env,fetchImpl:async(url,opts)=>{calls++;urlSent=url;headersSent=opts.headers;sent=JSON.parse(opts.body);return {ok:true,json:async()=>response(output(light))};}}));
 assert.equal(result.statusCode,200);assert.equal(result.body.analysis.light,light);assert.equal(result.body.analysis.source,'vision');
 assert.equal(urlSent,'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent');
 assert.equal(headersSent['x-goog-api-key'],'test-only');assert.ok(!urlSent.includes('test-only'));
 assert.deepEqual(sent.contents[0].parts[1].inlineData,{mimeType:'image/png',data:imageDataUrl.split(',')[1]});
 assert.equal(sent.generationConfig.responseMimeType,'application/json');assert.ok(sent.generationConfig.responseJsonSchema);assert.equal(sent.tools,undefined);
}
assert.equal(calls,4);
for(const out of [output(null),{...output(),isSpace:false}])assert.equal((await run(createHandler({env,fetchImpl:stub(response(out))}))).statusCode,422);
for(const out of [{...output(),light:5},{...output(),isSpace:'true'},{...output(),evidence:[42]},null])assert.equal((await run(createHandler({env,fetchImpl:stub(response(out))}))).statusCode,502);
for(const reason of ['MAX_TOKENS','SAFETY','RECITATION'])assert.equal((await run(createHandler({env,fetchImpl:stub(response(output(),reason))}))).statusCode,502);
assert.equal((await run(createHandler({env,fetchImpl:stub({promptFeedback:{blockReason:'SAFETY'}})}))).statusCode,502);
assert.equal((await run(createHandler({env,fetchImpl:stub({candidates:[{finishReason:'STOP',content:{parts:[{text:'garbage'}]}}]})}))).statusCode,502);
assert.equal((await run(createHandler({env,fetchImpl:async()=>{throw Error('offline');}}))).statusCode,502);
assert.equal((await run(createHandler({env,fetchImpl:async()=>{throw new DOMException('timeout','TimeoutError');}}))).statusCode,504);
let limitedCalls=0;
const limited=await run(createHandler({env:{...env,OPENAI_API_KEY:'legacy-key'},fetchImpl:async()=>{limitedCalls++;return {ok:false,status:429};}}));
assert.equal(limited.statusCode,429);assert.match(limited.body.error,/직접 입력/);assert.equal(limitedCalls,1);
assert.equal((await run(createHandler({env:{OPENAI_API_KEY:'legacy-key'},fetchImpl:async()=>{throw Error('must not call');}}))).statusCode,503);
const budget=createHandler({env,fetchImpl:stub(response())});
for(let i=0;i<12;i++)assert.equal((await run(budget)).statusCode,200);
assert.equal((await run(budget)).statusCode,429);
console.log('PASS: Gemini image/header/schema contract, four light classes, quota without fallback, incomplete/blocked/malformed responses, input validation, missing key and network errors (provider mocked)');
