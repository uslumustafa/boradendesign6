import assert from 'node:assert/strict';
import {searchItems} from './public/insan/search-core.js';
const items=[{title:'Genel yaklaşım',summary:'Şirket bağımsız denetim ihtiyaçları',category:'Görüş',href:'/a/'},{title:'Bağımsız Denetim',summary:'Şirket raporlama',category:'Hizmet',href:'/b/'},{title:'Şirket Değerlemesi',summary:'İşletmenin değeri',category:'Hizmet',href:'/c/'}];const snapshot=JSON.stringify(items);
assert.equal(searchItems(items,'bagimsiz')[0].href,'/b/');assert.equal(searchItems(items,'BAĞIMSIZ')[0].href,'/b/');assert.equal(searchItems(items,'sirket deger')[0].href,'/c/');assert.equal(searchItems(items,'şirket denetim').length,2);assert.deepEqual(searchItems(items,'  '),[]);assert.deepEqual(searchItems(items,'[.*'),[]);assert.equal(searchItems(items,'sirket',1).length,1);assert.equal(JSON.stringify(items),snapshot);
console.log('PASS: Turkish/ASCII search, all-token matching, ranking, bounded results, empty query and immutable input');
