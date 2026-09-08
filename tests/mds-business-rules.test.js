'use strict';

const assert = require('assert');
const rules = require('../assets/js/mds-business-rules.js');

function record(id, missionId, date, locationId, age, sex, codes) {
  return {
    mdsRecordId: id,
    missionId,
    activityDate: date,
    activityLocationId: locationId,
    age,
    ageUnit: 'years',
    sex,
    pregnancyStatus: sex === 'FEMALE_PREGNANT' ? 'PREGNANT' : 'NOT_PREGNANT',
    mdsCodes: codes
  };
}

assert.strictEqual(rules.MDS_ITEMS.length, 50);
assert.strictEqual(rules.MDS_ITEMS[21].label, 'Item Tambahan 22');

[
  [{ age: 0, ageUnit: 'days' }, 'under1'],
  [{ age: 11, ageUnit: 'months' }, 'under1'],
  [{ age: 1, ageUnit: 'years' }, 'age1to4'],
  [{ age: 4, ageUnit: 'years' }, 'age1to4'],
  [{ age: 5, ageUnit: 'years' }, 'age5to17'],
  [{ age: 17, ageUnit: 'years' }, 'age5to17'],
  [{ age: 18, ageUnit: 'years' }, 'age18to64'],
  [{ age: 64, ageUnit: 'years' }, 'age18to64'],
  [{ age: 65, ageUnit: 'years' }, 'age65plus']
].forEach(([input, expected]) => assert.strictEqual(rules.ageGroup(input, '2026-09-07'), expected));

const sample = [
  record('A', 'M1', '2026-09-01', 'L1', 0, 'MALE', [1, 9, 9, 36, 44]),
  record('B', 'M1', '2026-09-01', 'L1', 3, 'FEMALE_NOT_PREGNANT', [2, 10, 37, 44]),
  record('C', 'M1', '2026-09-01', 'L1', 30, 'FEMALE_PREGNANT', [3, 27, 33, 39, 47]),
  record('D', 'M1', '2026-09-01', 'L1', 70, 'MALE', [1, 24, 40, 46]),
  record('E', 'M1', '2026-09-01', 'L2', 25, 'MALE', [1]),
  record('F', 'M1', '2026-09-02', 'L1', 25, 'MALE', [1]),
  record('G', 'M2', '2026-09-01', 'L1', 25, 'MALE', [1])
];

const eligible = rules.eligibleRecords(sample, {
  missionId: 'M1', activityDate: '2026-09-01', activityLocationId: 'L1'
});
assert.strictEqual(eligible.length, 5);
assert.strictEqual(rules.eligibleRecords(sample,{missionId:'M1',activityDate:'2026-09-02'}).length,1);
assert.strictEqual(rules.eligibleRecords(sample,{missionId:'M2',activityDate:'2026-09-01'}).length,1);
assert.strictEqual(rules.eligibleRecords(sample,{missionId:'M1',activityDate:'2026-08-31'}).length,0);

const tally = rules.calculateMdsTally(eligible.slice(0,4), '2026-09-01');
assert.strictEqual(tally.patientCount, 4);
assert.deepStrictEqual(tally.ageGroups, {
  under1: 1, age1to4: 1, age5to17: 0, age18to64: 1, age65plus: 1
});
assert.strictEqual(tally.items[1].total, 2);
assert.strictEqual(tally.items[9].total, 1);
assert.strictEqual(tally.items[33].total, 1);
assert.strictEqual(tally.items[44].total, 2);
assert.deepStrictEqual(tally.warnings, []);

const duplicate = rules.calculateMdsTally([
  record('DUP', 'M1', '2026-09-01', 'L1', 20, 'MALE', [1, 9, 9, 9, 39])
], '2026-09-01');
assert.strictEqual(duplicate.items[9].total, 1);
assert.strictEqual(duplicate.items[39].total, 1);

assert.strictEqual(
  rules.canonicalLocationId({ activityLocationId: 'LOC-STABLE', location: 'Nama Lama' }),
  rules.canonicalLocationId({ activityLocationId: 'LOC-STABLE', location: 'Nama Baharu' })
);
assert.strictEqual(
  rules.canonicalLocationId({ missionId: 'M1', location: 'Klinik Lapangan A', latitude: '', longitude: '' }),
  rules.canonicalLocationId({ missionId: 'M1', activityLocationName: '  klinik   lapangan a ' })
);
assert.ok(rules.canonicalLocationId({ missionId: 'M1', location: 'Klinik Lapangan A' }).startsWith('LEGACY-'));

console.log('Semua ujian peraturan MDS lulus.');
