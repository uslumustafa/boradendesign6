import assert from 'node:assert/strict';
import { sourceDateLabel } from './editorial-meta.mjs';

// 1. Invalid date (2026-02-30)
assert.equal(
  sourceDateLabel({ sourceDateVerified: true, sourceDate: '2026-02-30' }),
  'Kaynak temelli okuma'
);

// 2. Unverified source dates
assert.equal(
  sourceDateLabel({ sourceDateVerified: false, sourceDate: '2024-05-10' }),
  'Kaynak temelli okuma'
);
assert.equal(
  sourceDateLabel({ sourceDate: '2024-05-10' }),
  'Kaynak temelli okuma'
);
assert.equal(
  sourceDateLabel({ sourceDateVerified: 'true', sourceDate: '2024-05-10' }),
  'Kaynak temelli okuma'
);

// 3. Verified valid date
assert.equal(
  sourceDateLabel({ sourceDateVerified: true, sourceDate: '2024-05-10' }),
  'Kaynak tarihi: 10 Mayıs 2024'
);

// 4. Verified year
assert.equal(
  sourceDateLabel({ sourceDateVerified: true, sourceYear: 1999 }),
  'Kaynak yılı: 1999'
);
assert.equal(
  sourceDateLabel({ sourceDateVerified: true, sourceYear: 1799 }),
  'Kaynak temelli okuma'
);
assert.equal(
  sourceDateLabel({ sourceDateVerified: true, sourceYear: 2101 }),
  'Kaynak temelli okuma'
);

// 5. Rejection of generic publication date and readMinutes
assert.equal(
  sourceDateLabel({ date: '2024-05-10', readMinutes: 5 }),
  'Kaynak temelli okuma'
);
assert.equal(
  sourceDateLabel({ sourceDateVerified: true, date: '2024-05-10', readMinutes: 5 }),
  'Kaynak temelli okuma'
);
