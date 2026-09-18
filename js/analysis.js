export async function analyzeImage(imageDataUrl,spaceType,signal){
 if(location.protocol==='file:')throw new Error('사진 분석에 연결하지 못했어요. 직접 공간 정보를 입력하거나 웹에서 다시 시도해주세요.');
 const response=await fetch('/api/analyze-space',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({imageDataUrl,spaceType}),signal});
 let data;try{data=await response.json();}catch{throw new Error('분석 서비스에 연결하지 못했어요. 잠시 후 다시 시도해주세요.');}
 if(!response.ok)throw new Error(data.error||'사진을 분석하지 못했어요. 다시 시도해주세요.');
 if(!data.analysis||!Number.isInteger(data.analysis.light)||data.analysis.light<0||data.analysis.light>3)throw new Error('채광을 판단하기 어려워요. 다른 사진을 선택하거나 직접 입력해주세요.');
 return data.analysis;
}
