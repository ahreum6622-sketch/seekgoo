import assert from 'node:assert/strict';
import {plants} from '../js/data.js';
import {getPlantMatch,rankPlants} from '../js/recommendation.js';
const profile={experience:0,frequency:0,concern:0,size:1},space={analysis:{light:1},analysisConfirmed:true};
const p=plants.find(p=>p.name==='스킨답서스');assert.equal(getPlantMatch(p,space,profile).score,97);
assert.equal(getPlantMatch(p,space,{...profile,experience:1}).score,97);
assert.equal(getPlantMatch(p,{...space,analysisConfirmed:false},profile),null);
const difficult={...p,light:[0],difficulty:3,frequency:2,sizes:[2]};
const m=getPlantMatch(difficult,{...space,analysis:{light:3}},profile);assert.equal(m.score,0);assert.equal(m.excluded,true);assert.equal(m.cautions.length,4);
for(let light=0;light<4;light++)for(let experience=0;experience<3;experience++)for(let frequency=0;frequency<3;frequency++)for(let size=0;size<4;size++){
 const s={...space,analysis:{light}},pr={experience,frequency,size,concern:0};const a=rankPlants(plants,s,pr);assert.deepEqual(a,rankPlants([...plants].reverse(),s,pr));assert.ok(a.every(p=>!p.match.excluded&&p.match.score>=0&&p.match.score<=100));assert.deepEqual(a,rankPlants(plants,s,{...pr,concern:3}));
}
console.log('PASS: exact scoring, exclusions, stable ties, all 144 input combinations, concern invariance');
