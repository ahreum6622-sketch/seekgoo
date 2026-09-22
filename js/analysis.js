// Whole-photo pixel estimate; thresholds are not lux or sunshine duration.
export function analyzePixels(data){
    const histogram=new Uint32Array(256);
    let count=0,bright=0,dark=0,clipped=0;
    for(let i=0;i+3<data.length;i+=4){
        if(data[i+3]<128)continue;
        const value=Math.round(.2126*data[i]+.7152*data[i+1]+.0722*data[i+2]);
        histogram[value]++;count++;
        if(value>=190)bright++;
        if(value<65)dark++;
        if(value<=5||value>=250)clipped++;
    }
    if(!count)throw new Error('사진의 밝기를 읽지 못했어요. 다른 사진을 선택하거나 직접 입력해주세요.');
    const percentile=q=>{
        let total=0;
        for(let i=0;i<256;i++){total+=histogram[i];if(total>=Math.max(1,Math.ceil(count*q)))return i;}
        return 255;
    };
    // A small window or black object alone should not set the whole-room category.
    const trim=Math.floor(count*.05);
    let seen=0,sum=0,used=0;
    for(let i=0;i<256;i++){
        const start=seen,end=seen+histogram[i];seen=end;
        const weight=Math.max(0,Math.min(end,count-trim)-Math.max(start,trim));
        sum+=i*weight;used+=weight;
    }
    const median=percentile(.5),score=.65*(sum/used)+.35*median;
    const brightRatio=bright/count,darkRatio=dark/count;
    const light=score>=180&&brightRatio>=.25?0:score>=125?1:score>=75?2:3;
    const uncertain=clipped/count>.3||(brightRatio>.2&&darkRatio>.2)||
        [75,125,180].some(boundary=>Math.abs(score-boundary)<8);
    const label=['양지','반양지','반음지','음지'][light];
    const evidence=[
        `사진 전체에서 밝게 보이는 부분은 약 ${Math.round(brightRatio*100)}%예요.`,
        `어둡게 보이는 부분은 약 ${Math.round(darkRatio*100)}%예요.`
    ];
    if(clipped/count>.3)evidence.push('아주 밝거나 어두운 부분이 많아 촬영 노출의 영향을 받을 수 있어요.');
    else if(brightRatio>.2&&darkRatio>.2)evidence.push('밝고 어두운 부분이 함께 있어 자리마다 빛이 다를 수 있어요.');
    return {
        light,source:'local-brightness',confidence:uncertain?'low':'medium',
        summary:`사진 전체의 밝기를 기준으로 ${label}에 가까운 모습으로 추정했어요.`,
        evidence,analyzedAt:new Date().toISOString(),
        brightness:{score:Math.round(score),brightRatio,darkRatio,method:'whole-photo-v1'}
    };
}

export async function analyzeImage(imageDataUrl,spaceType,signal){
    if(signal?.aborted)throw new DOMException('분석을 취소했어요.','AbortError');
    const img=new Image();
    await new Promise((resolve,reject)=>{
        let timer;
        const clean=()=>{clearTimeout(timer);img.onload=null;img.onerror=null;signal?.removeEventListener('abort',abort);};
        const abort=()=>{clean();img.src='';reject(new DOMException('분석을 취소했어요.','AbortError'));};
        const fail=()=>{clean();reject(new Error('사진을 읽지 못했어요. 다른 사진을 선택하거나 직접 입력해주세요.'));};
        img.onload=()=>{clean();resolve();};
        img.onerror=fail;
        signal?.addEventListener('abort',abort,{once:true});
        timer=setTimeout(fail,10000);
        img.src=imageDataUrl;
    });
    if(signal?.aborted)throw new DOMException('분석을 취소했어요.','AbortError');
    if(!img.naturalWidth||!img.naturalHeight)throw new Error('사진 크기를 확인하지 못했어요. 다른 사진을 선택해주세요.');
    try{
        const ratio=Math.min(1,256/Math.max(img.naturalWidth,img.naturalHeight));
        const canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.round(img.naturalWidth*ratio));
        canvas.height=Math.max(1,Math.round(img.naturalHeight*ratio));
        const context=canvas.getContext('2d',{willReadFrequently:true});
        context.drawImage(img,0,0,canvas.width,canvas.height);
        return analyzePixels(context.getImageData(0,0,canvas.width,canvas.height).data);
    }catch{
        throw new Error('사진의 밝기를 읽지 못했어요. 다른 사진을 선택하거나 직접 입력해주세요.');
    }
}
