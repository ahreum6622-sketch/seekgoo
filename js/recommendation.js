export function getPlantMatch(p,space,profile){
 if(!space?.analysisConfirmed||!profile)return null;
 const distance=Math.min(...p.light.map(l=>Math.abs(l-space.analysis.light)));
 const light=[40,20,5,0][distance], experience=[[25,22,10,0],[25,22,10,0],[25,25,22,15]][profile.experience][p.difficulty],frequency=[[20,8,0],[20,20,8],[20,20,20]][profile.frequency][p.frequency],size=profile.size===3||p.sizes.includes(profile.size===4?3:profile.size)?15:0;
 const reasons=[],cautions=[];
 if(light===40)reasons.push('선택한 채광 조건과 맞아요');else cautions.push('선택한 채광 조건과 차이가 있어요');
 if(experience>=22&&p.difficulty<=1)reasons.push('초보자가 관리하기 쉬운 편이에요');
 if(frequency===20)reasons.push('선택한 관리 가능 빈도와 맞아요');else cautions.push('돌볼 수 있는 빈도보다 더 자주 관찰해야 해요');
 if(experience<=10)cautions.push('관리 경험이 조금 더 필요한 식물이에요');
 if(size&&profile.size!==3)reasons.push('선호한 식물 크기가 있어요');else if(!size)cautions.push('선호한 크기와 달라요');
 return {score:light+experience+frequency+size,light,experience,frequency,size,reasons:reasons.slice(0,3),cautions,excluded:light<=5||frequency===0};
}
export function rankPlants(plants,space,profile){return plants.map(p=>({...p,match:getPlantMatch(p,space,profile)})).filter(p=>p.match&&!p.match.excluded).sort((a,b)=>b.match.score-a.match.score||b.match.light-a.match.light||b.match.frequency-a.match.frequency||b.match.experience-a.match.experience||a.id.localeCompare(b.id));}
