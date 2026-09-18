import assert from 'node:assert/strict';
import {plants,pots,plantTypes,filterPlants,plantGeometry,sizePreferenceValues} from '../js/data.js';
import {fresh,migrate,write,read} from '../js/storage.js';
import {getPlantMatch} from '../js/recommendation.js';
const by=id=>plants.find(p=>p.id===id),fish=by('p18'),rubber=by('p08');
assert.ok(fish.sizes.includes(3));assert.ok(plantGeometry(fish).width*fish.sceneScale < plantGeometry(rubber).width*rubber.sceneScale/4);
for(const p of plants){assert.ok(p.types.length&&p.types.every(t=>plantTypes.includes(t)));const g=plantGeometry(p),root=p.root??[.93,.945,.942,.965,.91,.55,.952,.952,.90,.93,.957,.965][p.atlas];assert.ok(Math.abs(g.top/100*1.37+root*g.width/100-1.012)<1e-9,'stem stays at soil plane');}
const f=fresh().exploreFilters;
assert.deepEqual(filterPlants(plants,{...f,types:['식충식물']}).map(p=>p.id),['p36','p38']);
assert.deepEqual(filterPlants(plants,{...f,types:['식충식물'],size:[3]}).map(p=>p.id),['p38']);
assert.deepEqual(filterPlants(plants,{...f,types:['식충식물'],size:[3],light:[3]}),[]);
assert.ok(filterPlants(plants,{...f,types:['꽃식물','열매식물']}).some(p=>p.id==='p16'));
assert.deepEqual(filterPlants(plants,{...f,query:'  fishbone  '}).map(p=>p.id),['p18']);
const old={...fresh(),careProfile:{experience:1,frequency:2,concern:1,size:3},careDraft:{size:0},exploreFilters:{query:'고무',size:[2],light:[],difficulty:[],features:[]}};delete old.visualizerFilters;const moved=migrate(old);assert.equal(moved.careProfile.size,3);assert.equal(moved.careDraft.size,0);assert.deepEqual(moved.exploreFilters.size,[2]);assert.deepEqual(moved.exploreFilters.types,[]);assert.deepEqual(moved.visualizerFilters,f);
const store=new Map();globalThis.localStorage={setItem:(k,v)=>store.set(k,v),getItem:k=>store.get(k),removeItem:k=>store.delete(k)};
moved.visualizerFilters.types=['식충식물'];write(moved);assert.deepEqual(read().visualizerFilters.types,['식충식물']);assert.equal(read().exploreFilters.query,'고무');
const space={analysisConfirmed:true,analysis:{light:1}},profile={experience:1,frequency:2,size:4};assert.equal(getPlantMatch(fish,space,profile).size,15);assert.equal(getPlantMatch(rubber,space,profile).size,0);assert.equal(getPlantMatch(rubber,space,{...profile,size:3}).size,15);assert.deepEqual(sizePreferenceValues,[4,0,1,2,3]);
console.log('PASS: category/size/search intersections, stable size preferences, legacy filter hydration, independent persisted filters, tiny proportions and anchored roots');
