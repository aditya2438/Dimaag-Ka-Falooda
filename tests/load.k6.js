// tests/load.k6.js
// k6 High-Concurrency Load Testing Script for Dimaag Ka Falooda 3.0 Fortress Edition

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 20 },
    { duration: '30s', target: 50 },
    { duration: '15s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<250'],
    http_req_failed: ['rate<0.05']
  }
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';

export default function () {
  const username = `LOAD_TESTER_${__VU}_${__ITER}`;
  const now = Date.now();

  const payload = JSON.stringify({
    username: username,
    avatar: 'cutting_chai',
    score: 1200,
    level: 4,
    mode: 'solo',
    deviceType: 'laptop',
    replayHash: 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890',
    actionChain: [
      { t: 100, i: 0, l: 1 },
      { t: 350, i: 4, l: 1 },
      { t: 620, i: 8, l: 1 }
    ]
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'k6-load-runner/1.0 (Test Environment)'
    }
  };

  const res = http.post(`${BASE_URL}/api/submit-score`, payload, params);

  check(res, {
    'submission handled cleanly (200, 201, 400, or 429)': (r) =>
      r.status === 200 || r.status === 201 || r.status === 400 || r.status === 429,
    'no unhandled internal server error (500)': (r) => r.status !== 500
  });

  sleep(1);
}
