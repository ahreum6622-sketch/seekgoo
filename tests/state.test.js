import assert from 'node:assert/strict';
import {fresh,migrate,read,write} from '../js/storage.js';
import {rooms,chooseRoom} from '../js/rooms.js';
const legacy={version:3,space:{id:'space-1',imageDataUrl:'photo',analysis:{light:2},analysisConfirmed:true},careProfile:{experience:0,frequency:1,concern:2,size:1},savedPlantIds:['p03'],comparePlantIds:['p03'],savedCombinations:[{id:'c1',spaceId:'space-1'}]};
const v=migrate(legacy);assert.equal(v.spaces.length,1);assert.equal(v.activeSpaceId,'space-1');assert.deepEqual(v.savedCombinations,legacy.savedCombinations);assert.equal(v.onboardingSeen,true);assert.equal(fresh().onboardingSeen,false);
const values=new Map([['seekgoo-v03',JSON.stringify(legacy)]]);globalThis.localStorage={getItem:k=>values.get(k)||null,setItem:(k,val)=>values.set(k,val),removeItem:k=>values.delete(k)};
assert.equal(read().spaces[0].imageDataUrl,'photo');write(v);assert.ok(values.has('seekgoo-v04'));assert.ok(!values.has('seekgoo-v03'));assert.deepEqual(read().savedPlantIds,['p03']);
for(const type of ['거실','작업실','베란다','침실','기타']){let previous=null;for(let i=0;i<30;i++){const r=chooseRoom(type,previous,()=>i/30);assert.equal(r.type,type);assert.notEqual(r.id,previous);previous=r.id;}}
assert.equal(rooms.length,12);assert.equal(migrate({...fresh(),spaces:[1,2,3,4,5].map(id=>({id}))}).spaces.length,4);
console.log('PASS: v3→v4 migration, write/read, one-time onboarding state, four-space cap, 12 scene categories and nonrepeat capture');
