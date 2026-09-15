const normalize=value=>String(value??'').toLocaleLowerCase('tr-TR').replaceAll('ı','i').normalize('NFD').replace(/\p{M}/gu,'');
export function searchItems(items,query,limit=8){
 const tokens=normalize(query).slice(0,120).trim().split(/\s+/).filter(Boolean).slice(0,8);
 if(!tokens.length||!Array.isArray(items))return [];
 const take=Number.isFinite(Number(limit))?Math.min(20,Math.max(1,Math.floor(Number(limit)))):8;
 return items.map((item,index)=>{const title=normalize(item.title),category=normalize(item.category),summary=normalize(item.summary);let score=0;
  for(const token of tokens){if(title.includes(token))score+=title.startsWith(token)?8:5;else if(category.includes(token))score+=3;else if(summary.includes(token))score+=1;else return null;}
  return {item,index,score};
 }).filter(Boolean).sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,take).map(x=>x.item);
}
