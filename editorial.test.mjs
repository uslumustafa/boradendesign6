import assert from 'node:assert/strict';
import fs from 'node:fs';
import {selectedPosts,journal,perspectives} from './human-editorial.mjs';
import {isPublished,routeList} from './render.mjs';
const D=JSON.parse(fs.readFileSync(new URL('data/boraden.json',import.meta.url)));
const today='2026-09-16';
const post=(id,date,status='published')=>({id,date,status,title:id,summary:'Test'});
const candidates=[post('old','2026-09-06'),post('new','2026-09-16'),post('draft','2026-09-15','draft'),post('future','2026-09-17'),post('invalid','2026-02-30'),post('bad','not-a-date')];
assert.deepEqual(selectedPosts(candidates,today).map(p=>p.id),['new','old']);
assert.equal(isPublished(candidates[3],today),false);
const copy=structuredClone(D);copy.publications.blog=candidates;
assert.ok(journal(copy,today).includes('/blog/new/'));assert.ok(!journal(copy,today).includes('/blog/draft/'));assert.ok(!journal(copy,today).includes('/blog/future/'));
copy.publications.blog=[];assert.ok(journal(copy,today).includes('Yeni yazılar'));
copy.publications.blog=Array.from({length:10},(_,i)=>post('post-'+i,'2026-09-'+String(i+1).padStart(2,'0')));
assert.equal((journal(copy,today).match(/data-journal-story/g)||[]).length,6);
// A newly published post gets a real article route, not merely a homepage link.
copy.publications.blog=[post('weekly-test','2026-09-09')];assert.ok(routeList(copy).includes('/blog/weekly-test/'));
assert.equal((perspectives(D).match(/data-perspective aria-label/g)||[]).length,14);
const home=fs.readFileSync(new URL('dist/insan/index.html',import.meta.url),'utf8');
const tools=fs.readFileSync(new URL('dist/insan/araclar/index.html',import.meta.url),'utf8');
assert.ok(!home.includes('id="vehicle-form"'));assert.ok(tools.includes('id="vehicle-form"'));
const sequence=['id="people"','id="yaklasim"','id="yazilar"','id="perspektifler"','id="uzmanlik"','id="tools-title"','id="dunyaya-bakis"'].map(x=>home.indexOf(x));
assert.ok(sequence.every((x,i)=>x>=0&&(!i||x>sequence[i-1])));
assert.equal((home.match(/<h1\b/g)||[]).length,1);
for(const html of [home,tools])for(const [,url]of html.matchAll(/(?:href|src)="(\/[^" ]*)"/g)){
 const [path,anchor]=url.split('#');const file=new URL('dist'+path+(path.endsWith('/')?'index.html':''),import.meta.url);assert.ok(fs.existsSync(file),url);
 if(anchor&&file.pathname.endsWith('.html'))assert.ok(fs.readFileSync(file,'utf8').includes('id="'+anchor+'"'),url);
}
console.log('PASS: published/date filtering, weekly routes, empty/single/growing publications, 14 perspectives, home order and local targets');
// Recheck the actual shipped calculator module against the official 2026 examples.
const {default:vm}=await import('node:vm');const context=vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('public/calculator-core.js',import.meta.url),'utf8'),context);const C=context.BoradenCalc;
assert.equal(C.income(400000).tax,70500);assert.equal(C.income(1500000,true).tax,367500);
assert.equal(C.vat(110,10,true).net,100);assert.equal(C.salary(400000).insured,297270);
let previous=0;for(let month=1;month<=12;month++){const result=C.salary(33030,month,previous);assert.equal(result.net,28075.50);previous=result.cumulative;}
console.log('PASS: shipped income/VAT/payroll examples and 2026 minimum wage for all 12 months');
