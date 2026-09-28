// /api/submit-score.js - Vercel Serverless Function & Standalone Middleware
// Secure score verification and submission for Dimaag Ka Falooda: Beat Run 3.0
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const KNOWN_AVATARS = [
  'cutting_chai',
  'sharma_beta',
  'auto_rocket',
  'chintu_pro',
  'gabbar_mustache',
  'desi_alien',
  'samosa_ninja',
  'babu_rao'
];

// Sliding rate limiter per IP (5 submissions per 60 seconds)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

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

  if (!username || typeof username !== 'string' || !/^[A-Za-z0-9_]{3,20}$/.test(username)) {
    return { valid: false, error: 'Invalid username: must be 3-20 alphanumeric characters or underscores' };
  }

  if (!avatar || typeof avatar !== 'string' || !KNOWN_AVATARS.includes(avatar)) {
    return { valid: false, error: 'Invalid avatar identifier' };
  }

  if (!Number.isInteger(level) || level < 1 || level > 60) {
    return { valid: false, error: 'Invalid level: must be integer between 1 and 60' };
  }

  if (!Number.isInteger(score) || score < 0 || score > 150000) {
    return { valid: false, error: 'Invalid score: out of allowed bounds' };
  }

  const allowedModes = ['solo', 'duel'];
  if (!mode || !allowedModes.includes(mode)) {
    return { valid: false, error: 'Invalid mode: must be solo or duel' };
  }

  // Max score boundary check
  const maxAllowedScore = mode === 'duel' ? 25000 : level * 3500 + 5000;
  if (score > maxAllowedScore) {
    return { valid: false, error: 'Implausible score for level achieved' };
  }

  // Cryptographic action chain validation (Proof-of-Play)
  if (replayHash && Array.isArray(actionChain)) {
    try {
      const serialized = JSON.stringify(actionChain);
      const computedHash = crypto.createHash('sha256').update(serialized).digest('hex');
      if (computedHash !== replayHash) {
        return { valid: false, error: 'Action chain cryptographic checksum mismatch' };
      }

      // Motor reflex rate analysis
      for (let i = 1; i < actionChain.length; i++) {
        const prevTime = actionChain[i - 1][3];
        const currTime = actionChain[i][3];
        if (typeof prevTime === 'number' && typeof currTime === 'number') {
          if (currTime - prevTime < 35) {
            return { valid: false, error: 'Human motor reflex limit violation detected (<35ms)' };
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
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
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

  const { username, avatar, score, level, mode, replayHash } = req.body;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    console.error('[SECURITY AUDIT] SUPABASE_URL or secret key missing in environment.');
    return res.status(500).json({ error: 'Database service configuration unavailable' });
  }

  const supabase = createClient(supabaseUrl, supabaseSecretKey);

  try {
    // Check existing score: never downgrade
    const { data: existing, error: fetchErr } = await supabase
      .from('blind_matrix_leaderboard')
      .select('high_score, max_level')
      .eq('username', username)
      .maybeSingle();

    if (fetchErr) {
      console.error('[DB FETCH ERROR]', fetchErr.message);
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (existing && existing.high_score >= score) {
      return res.status(200).json({
        success: true,
        message: 'Current score does not exceed verified record',
        high_score: existing.high_score
      });
    }

    const { data: upsertData, error: upsertErr } = await supabase
      .from('blind_matrix_leaderboard')
      .upsert({
        username: username,
        avatar: avatar,
        high_score: score,
        max_level: Math.max(level, existing?.max_level || 1),
        mode: mode || 'solo',
        replay_hash: replayHash || null,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'username'
      })
      .select();

    if (upsertErr) {
      console.error('[DB UPSERT ERROR]', upsertErr.message);
      return res.status(500).json({ error: 'Database record upsert failed' });
    }

    return res.status(200).json({
      success: true,
      data: upsertData
    });
  } catch (err) {
    console.error('[HANDLER ERROR]', err);
    return res.status(500).json({ error: 'Internal processing error' });
  }
};
