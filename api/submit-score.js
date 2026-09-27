// /api/submit-score.js - Vercel Serverless Function
// Secure backend score submission endpoint for Dimaag Ka Falooda: Beat Run 2.0
const { createClient } = require('@supabase/supabase-js');

// Known avatar keys defined in the game
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

// In-memory sliding rate limiter per IP (max 10 submissions per minute)
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

// Cleanup stale rate limit entries every 5 minutes
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

module.exports = async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Extract client IP and enforce rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') ||
             req.socket?.remoteAddress ||
             'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many submissions. Please wait a minute.' });
  }

  // 3. Extract and sanitize payload
  const body = req.body || {};
  const { username, avatar, score, level } = body;

  // 4. Server-side validation
  if (!username || typeof username !== 'string' || !/^[A-Za-z0-9_]{3,20}$/.test(username)) {
    return res.status(400).json({ error: 'Invalid username: must be 3-20 alphanumeric characters or underscores.' });
  }

  if (!Number.isInteger(level) || level < 1 || level > 30) {
    return res.status(400).json({ error: 'Invalid level: must be an integer between 1 and 30.' });
  }

  const maxAllowedScore = level * 3500;
  if (!Number.isInteger(score) || score < 0 || score > maxAllowedScore) {
    return res.status(400).json({ error: 'Implausible score for level achieved.' });
  }

  if (!avatar || typeof avatar !== 'string' || !KNOWN_AVATARS.includes(avatar)) {
    return res.status(400).json({ error: 'Invalid avatar identifier.' });
  }

  // 5. Initialize Supabase client using server-only secret key
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    console.error('Server configuration error: SUPABASE_URL or SUPABASE_SECRET_KEY missing.');
    return res.status(500).json({ error: 'Database service unavailable' });
  }

  const supabase = createClient(supabaseUrl, supabaseSecretKey);

  try {
    // 6. Check existing score: never downgrade a higher score for the same username
    const { data: existing, error: fetchErr } = await supabase
      .from('blind_matrix_leaderboard')
      .select('high_score, max_level')
      .eq('username', username)
      .maybeSingle();

    if (fetchErr) {
      console.warn('Existing record check warning:', fetchErr.message);
    }

    if (existing && existing.high_score >= score) {
      return res.status(200).json({
        ok: true,
        updated: false,
        message: 'Existing high score is already equal or higher.'
      });
    }

    // 7. Write validated score to Supabase
    const { error: upsertErr } = await supabase
      .from('blind_matrix_leaderboard')
      .upsert({
        username,
        avatar,
        high_score: score,
        max_level: level,
        updated_at: new Date().toISOString()
      }, { onConflict: 'username' });

    if (upsertErr) {
      console.error('Database write error:', upsertErr.message);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.status(200).json({ ok: true, updated: true });
  } catch (err) {
    console.error('Internal submission error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
