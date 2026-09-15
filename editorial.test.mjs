import assert from 'node:assert/strict';
import fs from 'node:fs';
import {selectedPosts,journal,perspectives,searchData,needs} from './human-editorial.mjs';
import {isPublished,routeList} from './render.mjs';
const D=JSON.parse(fs.readFileSync(new URL('data/boraden.json',import.meta.url)));
const today='2026-09-16';
const serviceStory=needs(D);
for(const g of D.groups)assert.ok(serviceStory.includes(`href="/hizmetler/alan/${g.id}/"`));
for(const id of ['sirket-kurulus-danismanligi','sirket-degerlemesi'])assert.ok(serviceStory.includes(`href="/hizmetler/${id}/"`));
assert.doesNotThrow(()=>needs({groups:[],services:[]}));
const escapedStory=needs({...D,groups:D.groups.map(g=>({...g,name:'<b>Test</b>'}))});
assert.ok(escapedStory.includes('&lt;b&gt;Test&lt;/b&gt;'));assert.ok(!escapedStory.includes('<b>Test</b>'));
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
const sequence=['id="people"','id="yaklasim"','id="ihtiyaciniz"','id="yazilar"','id="perspektifler"','id="tools-title"','id="dunyaya-bakis"'].map(x=>home.indexOf(x));
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

const index=searchData(D);
assert.equal(index.filter(x=>x.category==='Hizmet').length,47);
for(const item of index){
 const [path,anchor]=item.href.split('#');
 const file=new URL('dist'+path+(path.endsWith('/')?'index.html':''),import.meta.url);
 assert.ok(fs.existsSync(file),item.href);
 if(anchor)assert.ok(fs.readFileSync(file,'utf8').includes('id="'+anchor+'"'),item.href);
}
console.log('PASS: search index includes 47 services and every result has a real local destination');

assert.equal(fs.readFileSync(new URL('dist/index.html',import.meta.url),'utf8'),home);
for(const route of ['/hakkimizda/','/iletisim/','/kariyer/',...D.services.map(s=>'/hizmetler/'+s.id+'/'),...D.groups.map(g=>'/hizmetler/alan/'+g.id+'/')]){
 const html=fs.readFileSync(new URL('dist'+route+'index.html',import.meta.url),'utf8');
 assert.ok(!/class="(?:puzzle-svg|service-piece-svg|detail-puzzle|mini-piece)/.test(html),route);
}
const career=fs.readFileSync(new URL('dist/kariyer/index.html',import.meta.url),'utf8');
assert.ok(career.includes('<fieldset disabled>'));assert.ok(!career.slice(career.indexOf('<div class="career-form">'),career.indexOf('</main>')).includes('<form'));
console.log('PASS: current root matches new design, all service/brand routes have no puzzle, career preview collects no data');

for(const p of D.perspectives){
 const html=fs.readFileSync(new URL('dist/perspektifler/'+p.id+'/index.html',import.meta.url),'utf8');
 assert.ok(!html.includes('6 Eylül 2026'),p.id);assert.ok(!html.includes('DAKİKA OKUMA'),p.id);
 assert.ok(html.includes('reading-quote'));assert.ok(html.includes('reading-service'));
}
assert.ok(home.includes('Kaynak tarihi: 2 Mart 1990'));
assert.ok(!home.includes('6 Eylül 2026'));
assert.ok(journal({...D,publications:{...D.publications,blog:[{...post('verified','2026-09-16'),publicationDateVerified:true}]}},today).includes('16 Eylül 2026'));
console.log('PASS: fabricated perspective dates/read times hidden, verified source date distinct, verified future blog dates supported');
