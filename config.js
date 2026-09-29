/* ==========================================================================
   DIMAAG KA FALOODA: BEAT RUN 3.0 FORTRESS EDITION
   Client-Side Environment & Architecture Configuration (config.js)
   ========================================================================== */

const APP_CONFIG = {
  VERSION: '3.0.0-fortress',
  ENV: typeof process !== 'undefined' && process.env && process.env.NODE_ENV ? process.env.NODE_ENV : 'production',

  // WebSocket Server URL: Auto-discovered or overridden
  SERVER_URL: (() => {
    if (typeof document !== 'undefined') {
      const meta = document.querySelector('meta[name="game-server"]');
      if (meta && meta.content && meta.content.trim()) return meta.content.trim();
    }
    if (typeof window !== 'undefined') {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`;
      }
    }
    return '';
  })(),

  // Backend API Base URL (Supports Web & Mobile APK)
  API_BASE_URL: (() => {
    if (typeof document !== 'undefined') {
      const meta = document.querySelector('meta[name="game-server"]');
      if (meta && meta.content && meta.content.trim()) {
        return meta.content.trim().replace(/^ws(s?):/, 'http$1:');
      }
    }
    if (typeof window !== 'undefined') {
      // In Android Capacitor App or external origin: route to live Vercel backend
      if (window.Capacitor || window.location.hostname === 'localhost' || window.location.protocol === 'capacitor:') {
        return 'https://dimaag-ka-falooda.vercel.app';
      }
      if (window.location.origin && window.location.origin.includes('vercel.app')) {
        return window.location.origin;
      }
    }
    return 'https://dimaag-ka-falooda.vercel.app';
  })(),

  // Default Supabase Config for Realtime Cloud Leaderboard
  SUPABASE_URL: 'https://dfixypyqewrdofaufehg.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_u-T2e51hbuuIp8cblLxkqQ_JMTpE90g',

  // Security thresholds
  ANTI_CHEAT: {
    MIN_MOTOR_REFLEX_MS: 25,
    MAX_PLAUSIBLE_SCORE_PER_LEVEL: 5000,
    MAX_WS_PAYLOAD_BYTES: 16384
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}
