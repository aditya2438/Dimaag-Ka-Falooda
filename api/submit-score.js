// /api/submit-score.js - Vercel Serverless Function & Standalone Middleware
// Secure score verification and submission for Dimaag Ka Falooda: Beat Run 3.0
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const KNOWN_AVATARS = [
  'hero_spiderman',
  'hero_cap',
  'hero_thor',
  'hero_loki',
  'hero_deadpool',
  'hero_ironman',
  'spider_mask',
  'miles_stealth',
  'web_slinger',
  'spider_sense',
  'iron_spider',
  'spider_bot',
  'cutting_chai',
  'sharma_beta',
  'auto_rocket',
  'chintu_pro',
  'gabbar_mustache',
  'desi_alien',
  'samosa_ninja',
  'babu_rao'
];

// Sliding rate limiter per IP (10 submissions per 60 seconds)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

// Memory cleanup every 5 minutes
setInterval(() => {
  const now = Date.now();
  const windowMs = 60 * 1000;
  for (const [ip, times] of rateLimitMap.entries()) {
    const valid = times.filter(t => now - t < windowMs);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 5 * 60 * 1000).unref();

function validatePayload(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid payload structure' };
  }

  const { username, avatar, score, level, mode, replayHash, actionChain } = body;

  if (!username || typeof username !== 'string' || !/^[A-Za-z0-9_]{2,25}$/.test(username)) {
    return { valid: false, error: 'Invalid username: must be 2-25 alphanumeric characters or underscores' };
  }

  if (!avatar || typeof avatar !== 'string' || !KNOWN_AVATARS.includes(avatar)) {
    return { valid: false, error: 'Invalid avatar identifier' };
  }

  if (!Number.isInteger(level) || level < 1 || level > 60) {
    return { valid: false, error: 'Invalid level: must be integer between 1 and 60' };
  }

  if (!Number.isInteger(score) || score < 0 || score > 200000) {
    return { valid: false, error: 'Invalid score: out of allowed bounds' };
  }

  const allowedModes = ['solo', 'duel'];
  if (mode && !allowedModes.includes(mode)) {
    return { valid: false, error: 'Invalid mode: must be solo or duel' };
  }

  // Max score boundary check
  const maxAllowedScore = mode === 'duel' ? 50000 : level * 5000 + 10000;
  if (score > maxAllowedScore) {
    return { valid: false, error: 'Implausible score for level achieved' };
  }

  // Cryptographic action chain validation (Proof-of-Play if provided)
  if (replayHash && Array.isArray(actionChain) && actionChain.length > 0) {
    try {
      const serialized = JSON.stringify(actionChain);
      const computedHash = crypto.createHash('sha256').update(serialized).digest('hex');
      if (computedHash !== replayHash) {
        return { valid: false, error: 'Action chain cryptographic checksum mismatch' };
      }

      // Motor reflex rate analysis
      for (let i = 1; i < actionChain.length; i++) {
        const prevTime = actionChain[i - 1].t;
        const currTime = actionChain[i].t;
        if (typeof prevTime === 'number' && typeof currTime === 'number') {
          if (currTime - prevTime < 25) {
            return { valid: false, error: 'Human motor reflex limit violation detected (<25ms)' };
          }
        }
      }
    } catch (e) {
      return { valid: false, error: 'Action chain verification failed' };
    }
  }

  return { valid: true };
}

module.exports = async function handler(req, res) {
  // Global CORS headers for Web + Mobile APK support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') ||
             req.socket?.remoteAddress ||
             'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please wait 60 seconds.' });
  }

  const validation = validatePayload(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { username, avatar, score, level } = req.body;

  const supabaseUrl = process.env.SUPABASE_URL || 'https://dfixypyqewrdofaufehg.supabase.co';
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    console.error('[SECURITY AUDIT] SUPABASE_URL or secret key missing in environment.');
    return res.status(500).json({ error: 'Database service configuration unavailable' });
  }

  const supabase = createClient(supabaseUrl, supabaseSecretKey);

  try {
    // Check existing score: never downgrade high score
    const { data: existing, error: fetchErr } = await supabase
      .from('blind_matrix_leaderboard')
      .select('high_score, max_level')
      .eq('username', username)
      .maybeSingle();

    if (fetchErr) {
      console.error('[DB FETCH ERROR]', fetchErr.message);
      return res.status(500).json({ error: 'Database query failed', details: fetchErr.message });
    }

    if (existing && existing.high_score >= score) {
      return res.status(200).json({
        success: true,
        message: 'Current score does not exceed verified record',
        high_score: existing.high_score
      });
    }

    // Only upsert verified columns that exist in the Postgres table schema
    const upsertPayload = {
      username: username,
      avatar: avatar,
      high_score: score,
      max_level: Math.max(level, existing?.max_level || 1),
      updated_at: new Date().toISOString()
    };

    const { data: upsertData, error: upsertErr } = await supabase
      .from('blind_matrix_leaderboard')
      .upsert(upsertPayload, {
        onConflict: 'username'
      })
      .select();

    if (upsertErr) {
      console.error('[DB UPSERT ERROR]', upsertErr.message);
      return res.status(500).json({
        error: 'Database record upsert failed',
        details: upsertErr.message,
        hint: upsertErr.hint
      });
    }

    return res.status(200).json({
      success: true,
      data: upsertData
    });
  } catch (err) {
    console.error('[HANDLER ERROR]', err);
    return res.status(500).json({ error: 'Internal processing error', details: err?.message });
  }
};
