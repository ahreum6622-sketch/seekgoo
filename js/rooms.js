const descriptions=[
 ['거실','햇살 드는 거실','interiors',0],['작업실','창가의 작업실','interiors',1],['베란다','햇살 드는 베란다','interiors',2],['침실','차분한 침실','interiors',3],
 ['거실','안쪽 거실','interiors',4],['작업실','아늑한 작업실','interiors',5],['베란다','그늘진 베란다','interiors',6],['침실','밝은 침실','interiors',7],
 ['기타','마당','outdoors',0],['기타','정원','outdoors',1],['기타','테라스','outdoors',2],['기타','현관 앞','outdoors',3]
];
export const rooms=descriptions.map(([type,name,sheet,index],i)=>({id:`room-${i+1}`,type,name,image:`assets/rooms/${sheet}.png`,index,columns:sheet==='interiors'?4:2,rows:2}));
export function chooseRoom(type,previousId,random=Math.random){const choices=rooms.filter(r=>r.type===type&&r.id!==previousId);return choices[Math.min(choices.length-1,Math.floor(random()*choices.length))];}
export async function roomImageData(room){
 const image=new Image();image.src=room.image;await image.decode();const canvas=document.createElement('canvas');const sw=image.naturalWidth/room.columns,sh=image.naturalHeight/room.rows;
 canvas.width=512;canvas.height=768;canvas.getContext('2d').drawImage(image,(room.index%room.columns)*sw,Math.floor(room.index/room.columns)*sh,sw,sh,0,0,512,768);return canvas.toDataURL('image/jpeg',.85);
}
