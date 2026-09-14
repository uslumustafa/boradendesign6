import assert from 'node:assert/strict';
import {vehicleSchedule} from './public/insan/vehicle.js';
const sum=(rows,key)=>Math.round(rows.reduce((n,r)=>n+r[key],0)*100)/100;
const gross=vehicleSchedule({cost:3000000,month:6,kind:'new-gross'});
assert.equal(gross.limit,2600000);assert.equal(gross.rows[0].deductible,303333.33);assert.equal(gross.rows[4].deductible,736666.67);
assert.equal(sum(gross.rows,'book'),3000000);assert.equal(sum(gross.rows,'deductible'),2600000);assert.equal(sum(gross.rows,'disallowed'),400000);
const net=vehicleSchedule({cost:2000000,month:6,kind:'new-net'});assert.equal(net.limit,1380000);assert.equal(net.rows[0].deductible,161000);
for(const month of [1,12])for(const kind of ['new-net','new-gross','used']){
 const plan=vehicleSchedule({cost:1234567.89,month,kind});assert.equal(sum(plan.rows,'book'),1234567.89);assert.equal(sum(plan.rows,'deductible'),1234567.89);
 assert.ok(plan.rows.every(r=>r.book>=r.deductible));assert.equal(plan.rows[4].year,2030);
}
for(const patch of [{cost:-1},{cost:Infinity},{month:0},{month:2.5},{kind:'invalid'},{year:2027},{year:'__proto__'}])assert.throws(()=>vehicleSchedule({cost:1000000,month:1,kind:'used',...patch}));
console.log('PASS: verified 2026 caps, first/last-year apportionment, cent totals, all purchase modes, invalid inputs and unsupported years');
