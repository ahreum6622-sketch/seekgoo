export const emptyFilters=()=>({query:'',light:[],difficulty:[],size:[],features:[],types:[]});
const KEY='seekgoo-v04', LEGACY_KEY='seekgoo-v03';
export const fresh=()=>({version:4,introSeen:false,account:null,signedIn:false,signupDraft:null,spaces:[],activeSpaceId:null,careProfile:null,careDraft:{},onboardingSeen:false,savedPlantIds:[],comparePlantIds:[],savedCombinations:[],exploreFilters:emptyFilters(),visualizerFilters:emptyFilters()});
export function migrate(value){
 if(!value||typeof value!=='object')return fresh();
 if(value.version===3){const s=value.space;return migrate({...fresh(),careProfile:value.careProfile,spaces:s?[s]:[],activeSpaceId:s?.id||null,onboardingSeen:!!value.careProfile,savedPlantIds:value.savedPlantIds||[],comparePlantIds:value.comparePlantIds||[],savedCombinations:value.savedCombinations||[],exploreFilters:value.exploreFilters||fresh().exploreFilters});}
 if(value.version!==4)return fresh();
 const result={...fresh(),...value};for(const key of ['exploreFilters','visualizerFilters']){const raw=value[key]||{};result[key]=emptyFilters();result[key].query=typeof raw.query==='string'?raw.query:'';for(const field of ['light','difficulty','size','features','types'])result[key][field]=Array.isArray(raw[field])?raw[field]:[];}result.spaces=Array.isArray(value.spaces)?value.spaces.slice(0,4):[];
 if(!result.spaces.some(s=>s.id===result.activeSpaceId))result.activeSpaceId=result.spaces[0]?.id||null;
 return result;
}
export function read(){try{const current=localStorage.getItem(KEY);return migrate(JSON.parse(current||localStorage.getItem(LEGACY_KEY)||'null'));}catch{return fresh();}}
export function write(state){localStorage.setItem(KEY,JSON.stringify({...state,version:4}));/* Retain legacy until a successful v4 write. */try{localStorage.removeItem(LEGACY_KEY);}catch{}}
