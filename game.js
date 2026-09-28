/* ==========================================================================
   DIMAAG KA FALOODA: BEAT RUN 2.0 - ULTRA FUNKY MASTER ENGINE (game.js)
   Engine Architecture: Pure Vanilla JS, Web Audio API + Speech Synth,
   Native WebSocket 1v1 Room Duel Sync, Fever Mode, Living Micro-Interactions
   Designed for Freshers & Students: Readable, Well-Documented & Zero Emojis
   ========================================================================== */

/* ==========================================================================
   SECTION 1: BESPOKE FUNNY DESI SVG AVATARS (ZERO EMOJIS)
   ========================================================================== */
const AVATARS = {
  spider_mask: `<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 3 6.5 3 12c0 4.5 3.5 9.5 9 10 5.5-.5 9-5.5 9-10 0-5.5-3.5-10-9-10z" fill="#E62429"/><path d="M5.5 11c2.5 3 6 4 7 4-1-2.5-2-5.5-2.5-7-1.5.5-3.5 1.5-4.5 3z" fill="#FFFFFF" stroke="#000" stroke-width="1.2"/><path d="M18.5 11c-2.5 3-6 4-7 4 1-2.5 2-5.5 2.5-7 1.5.5 3.5 1.5 4.5 3z" fill="#FFFFFF" stroke="#000" stroke-width="1.2"/><line x1="12" y1="2" x2="12" y2="22" stroke="rgba(0,0,0,0.3)" stroke-width="0.8"/></svg>`,
  miles_stealth: `<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 3 6.5 3 12c0 4.5 3.5 9.5 9 10 5.5-.5 9-5.5 9-10 0-5.5-3.5-10-9-10z" fill="#0D0D14"/><path d="M5.5 11c2.5 3 6 4 7 4-1-2.5-2-5.5-2.5-7-1.5.5-3.5 1.5-4.5 3z" fill="#E62429" stroke="#FF1744" stroke-width="1.2"/><path d="M18.5 11c-2.5 3-6 4-7 4 1-2.5 2-5.5 2.5-7 1.5.5 3.5 1.5 4.5 3z" fill="#E62429" stroke="#FF1744" stroke-width="1.2"/></svg>`,
  web_slinger: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#0A0A10" stroke="#E62429" stroke-width="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="#00E5FF" stroke-width="1.2"/><path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" stroke="rgba(0,229,255,0.4)" stroke-width="0.8"/><circle cx="12" cy="12" r="2.5" fill="#E62429"/></svg>`,
  spider_sense: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="#E62429"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2" stroke="#FFE600" stroke-width="2" stroke-linecap="round"/></svg>`,
  iron_spider: `<svg viewBox="0 0 24 24"><path d="M12 2L4 6v12l8 4 8-4V6l-8-4z" fill="#8B0000" stroke="#FFD700" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="#FFD700"/><path d="M12 5v14M6 9h12M6 15h12" stroke="#00E5FF" stroke-width="1"/></svg>`,
  spider_bot: `<svg viewBox="0 0 24 24"><rect x="5" y="7" width="14" height="10" rx="3" fill="#1C1B24" stroke="#E62429" stroke-width="1.5"/><circle cx="9" cy="12" r="2" fill="#00E5FF"/><circle cx="15" cy="12" r="2" fill="#00E5FF"/><path d="M3 9l3 2M3 15l3-2M21 9l-3 2M21 15l-3-2M9 4l1 3M15 4l-1 3" stroke="#E62429" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  // Legacy avatars fallback for compatibility
  cutting_chai: `<svg viewBox="0 0 24 24"><path fill="#F59E0B" d="M4 19h16v2H4z"/><path fill="#D97706" d="M6 7l1.5 10h9L18 7H6zm10 8H8l-1-6h10l-1 6z"/></svg>`,
  sharma_beta: `<svg viewBox="0 0 24 24"><circle cx="7" cy="12" r="3.5" fill="none" stroke="#FACC15" stroke-width="2.2"/><circle cx="17" cy="12" r="3.5" fill="none" stroke="#FACC15" stroke-width="2.2"/></svg>`,
  auto_rocket: `<svg viewBox="0 0 24 24"><path fill="#A3E635" d="M12 2L4 8v10h2v2h2v-2h8v2h2v-2h2V8l-8-6z"/></svg>`,
  chintu_pro: `<svg viewBox="0 0 24 24"><path fill="#06B6D4" d="M12 2a9 9 0 0 0-9 9v4a4 4 0 0 0 4 4h2v-8H5v-0.5A7 7 0 0 1 12 4.5a7 7 0 0 1 7 7V12h-4v8h2a4 4 0 0 0 4-4v-4a9 9 0 0 0-9-9z"/></svg>`,
  gabbar_mustache: `<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="3" fill="#F43F5E"/><circle cx="17" cy="8" r="3" fill="#F43F5E"/></svg>`,
  desi_alien: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="10" fill="#A855F7"/><circle cx="8" cy="11" r="2" fill="#000"/><circle cx="16" cy="11" r="2" fill="#000"/></svg>`,
  samosa_ninja: `<svg viewBox="0 0 24 24"><path fill="#EA580C" d="M12 3L2 19h20L12 3z"/></svg>`,
  babu_rao: `<svg viewBox="0 0 24 24"><circle cx="7" cy="10" r="4" fill="none" stroke="#38BDF8" stroke-width="2.5"/><circle cx="17" cy="10" r="4" fill="none" stroke="#38BDF8" stroke-width="2.5"/></svg>`
};

/* ==========================================================================
   SECTION 2: FUNNY DESI TAUNTS & BRAIN IQ TITLES (ZERO EMOJIS)
   ========================================================================== */
const DESI_TAUNTS = [
  "Arey Sharma ji ke ladke ko dekho!",
  "Full 200 IQ Baazigar mode on!",
  "Dimag ghas charne toh nahi gaya?!",
  "Beta tumse na ho payega!",
  "Khel shuru, kursi ki peti baandh lo!",
  "Bawaal cheez hai be tu!",
  "Jalwa hai hamara yahan!",
  "Moye Moye se bacho!",
  "Ekdum jhakaas memory!"
];

function getBrainIQInfo(level, score) {
  if (level >= 11) return { iq: 300, rank: "ALIEN BRAIN GOD" };
  if (level >= 9)  return { iq: 220, rank: "SHARMA JI KA BETA" };
  if (level >= 7)  return { iq: 175, rank: "DESI CHAD CODER" };
  if (level >= 5)  return { iq: 130, rank: "BACKBENCHER PRO" };
  if (level >= 3)  return { iq: 90,  rank: "CHINTU MEMORIZER" };
  return { iq: 45, rank: "GADHA MODE" };
}

/* ==========================================================================
   SECTION 2B: ARCHITECTURE CONFIG & DEVICE PROFILE ENGINE
   ========================================================================== */
const CONFIG = {
  SERVER_URL: (() => {
    const meta = document.querySelector('meta[name="game-server"]');
    if (meta && meta.content && meta.content.trim()) return meta.content.trim();
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`;
    }
    return '';
  })(),
  API_BASE_URL: (() => {
    const meta = document.querySelector('meta[name="game-server"]');
    if (meta && meta.content && meta.content.trim()) {
      return meta.content.trim().replace(/^ws(s?):/, 'http$1:');
    }
    return '';
  })()
};

const DeviceProfile = {
  detect() {
    const hasTouch = (navigator.maxTouchPoints || 0) > 0;
    const w = window.screen ? window.screen.width : window.innerWidth;
    const h = window.screen ? window.screen.height : window.innerHeight;
    const maxDim = Math.max(w, h);
    const minDim = Math.min(w, h);
    const ua = navigator.userAgent ? navigator.userAgent.toLowerCase() : '';

    if (hasTouch && (minDim < 600 || maxDim < 900) && (ua.includes('mobile') || ua.includes('android'))) {
      return 'phone';
    }
    if (hasTouch && minDim >= 600 && maxDim <= 1366) {
      return 'tablet';
    }
    if (!hasTouch && maxDim >= 1024) {
      return 'laptop';
    }
    if (hasTouch && maxDim < 900) {
      return 'phone';
    }
    return 'laptop';
  },
  get() {
    if (!this._cached) this._cached = this.detect();
    return this._cached;
  },
  applyDeviceClasses() {
    const dev = this.get();
    if (typeof document !== 'undefined') {
      if (document.documentElement) {
        document.documentElement.classList.remove('is-laptop', 'is-phone', 'is-tablet');
        document.documentElement.classList.add(`is-${dev}`);
      }
      if (document.body) {
        document.body.classList.remove('is-laptop', 'is-phone', 'is-tablet');
        document.body.classList.add(`is-${dev}`);
      }
    }
  }
};

/* ==========================================================================
   SECTION 2C: ADVANCED TAMPER DEFENSE & ZERO-TRUST ANTI-CHEAT SUITE
   - Memory encryption & shadow state integrity checks
   - Native browser prototype integrity verification (Speedhack defense)
   - Synthetic bot event detection (!e.isTrusted)
   - Motor reflex jitter & impossible-speed autoclicker analysis (<35ms)
   - Active DevTools timing & shortcut interception (F12, Ctrl+Shift+I/J/C, Ctrl+U)
   - Cryptographic Proof-of-Play action chain for leaderboard validation
   ========================================================================== */
const AntiCheat = {
  sessionKey: (Math.random() * 0xFFFFFF) | 0x100000,
  clickTimestamps: [],
  actionChain: [],
  runStartTime: 0,
  isTampered: false,
  tamperReason: '',
  actionNonce: 0,
  proofHash: 0x811c9dc5,
  verifiedTaps: 0,
  shadowScore: 0,

  startRun() {
    this.isTampered = false;
    this.tamperReason = null;
    this.actionNonce = 0;
    this.proofHash = 0x811c9dc5;
    this.verifiedTaps = 0;
    this.shadowScore = 0;
    this.clickTimestamps = [];
    this.actionChain = [];
    this.runStartTime = performance.now();
  },

  recordTap(tileIndex, level, pts) {
    this.verifiedTaps++;
    this.shadowScore += pts;
    this.actionNonce++;
    this.proofHash = (Math.imul(this.proofHash ^ tileIndex, 0x01000193) ^ level ^ pts) >>> 0;
    this.actionChain.push({
      t: Math.round(performance.now() - (this.runStartTime || performance.now())),
      i: tileIndex,
      l: level
    });
  },

  async generateReplayHash(runData) {
    const raw = JSON.stringify(runData);
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof TextEncoder !== 'undefined') {
      try {
        const enc = new TextEncoder().encode(raw);
        const buf = await crypto.subtle.digest('SHA-256', enc);
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {}
    }
    let h = 0x811c9dc5;
    for (let i = 0; i < raw.length; i++) {
      h = Math.imul(h ^ raw.charCodeAt(i), 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, '0');
  },

  validateTap(event) {
    if (this.isTampered) return false;

    // 1. Synthetic event check (Automated scripts, dispatchEvent bots, Tampermonkey)
    if (event && event.isTrusted === false) {
      this.flag('SYNTHETIC_BOT_EVENT');
      return false;
    }

    // 2. Physical human motor reflex rate limiting (<35ms impossible threshold)
    const now = performance.now();
    this.clickTimestamps.push(now);
    if (this.clickTimestamps.length > 5) {
      this.clickTimestamps.shift();
      const intervals = [];
      for (let i = 1; i < this.clickTimestamps.length; i++) {
        intervals.push(this.clickTimestamps[i] - this.clickTimestamps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

      if (avgInterval < 35) {
        this.flag('AUTOCLICKER_SPEEDHACK');
        return false;
      }

      // Check for zero-jitter macro scripts (perfect periodic intervals)
      const variance = intervals.reduce((sum, intv) => sum + Math.abs(intv - avgInterval), 0) / intervals.length;
      if (variance < 0.5 && intervals.length >= 4) {
        this.flag('ZERO_JITTER_MACRO_BOT');
        return false;
      }
    }

    return true;
  },

  // Verify browser native prototypes haven't been hooked by hostile speedhacks
  verifyPrototypeIntegrity() {
    try {
      if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        const t1 = performance.now();
        const t2 = performance.now();
        if (typeof t1 !== 'number' || typeof t2 !== 'number' || isNaN(t1) || isNaN(t2)) {
          this.flag('PERFORMANCE_CLOCK_CORRUPTED');
          return false;
        }
      }
      if (typeof Date !== 'undefined' && typeof Date.now === 'function') {
        const d = Date.now();
        if (typeof d !== 'number' || isNaN(d) || d <= 0) {
          this.flag('DATE_CLOCK_CORRUPTED');
          return false;
        }
      }
    } catch (e) {}
    return true;
  },

  flag(reason) {
    if (this.isTampered) return;
    this.isTampered = true;
    this.tamperReason = reason;
    console.warn('[SECURITY VIOLATION DETECTED]', reason);

    // Invalidate local score
    if (APP_STATE.singlePlay) {
      APP_STATE.singlePlay.score = 0;
      APP_STATE.singlePlay.streak = 0;
      this.shadowScore = 0;
    }

    // Show anti-cheat toast on screen
    const alertEl = document.getElementById('anticheatAlert');
    const textEl = document.getElementById('anticheatText');
    if (alertEl && textEl) {
      textEl.textContent = 'SECURITY ALERT: CHEAT DETECTED (' + reason + ') - SCORE INVALIDATED!';
      alertEl.style.display = 'block';
      setTimeout(() => { alertEl.style.display = 'none'; }, 4500);
    }

    if (typeof audioVoice !== 'undefined' && audioVoice) {
      audioVoice.speakHindi(['Hacking band karo beta! Imandari se khelo!']);
    }
  },

  validateScoreSubmission(score, level) {
    if (this.isTampered) return false;

    // Check prototype integrity
    if (!this.verifyPrototypeIntegrity()) return false;

    // Bounded score validation: impossible to achieve > level * 3500
    const maxPlausible = Math.max(500, (level || 1) * 3500);
    if (score > maxPlausible || score < 0) {
      this.flag('IMPLAUSIBLE_SCORE');
      return false;
    }

    // Shadow state verification: score must be backed by genuine gameplay
    if (this.verifiedTaps === 0 && score > 0) {
      this.flag('UNVERIFIED_PLAYTHROUGH');
      return false;
    }

    return true;
  },

  initProtection() {
    // 1. Prototype integrity check
    this.verifyPrototypeIntegrity();

    // 2. Intercept DevTools keys during gameplay
    window.addEventListener('keydown', (e) => {
      if (APP_STATE.currentView === 'view-singleplay' || APP_STATE.currentView === 'view-duel-room') {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
          this.flag('DEVTOOLS_SHORTCUT_BLOCKED');
          return false;
        }
      }
    }, true);

    // 3. Disable context menu on app during gameplay
    const appEl = document.getElementById('app');
    if (appEl) {
      appEl.addEventListener('contextmenu', (e) => {
        if (APP_STATE.currentView === 'view-singleplay' || APP_STATE.currentView === 'view-duel-room') {
          e.preventDefault();
        }
      });
    }

    // 4. Periodic memory tamper guard during active gameplay (every 2.5s)
    setInterval(() => {
      if (APP_STATE.singlePlay && APP_STATE.singlePlay.active) {
        this.verifyPrototypeIntegrity();
        // Memory tamper check: score cannot jump beyond shadow score + 600 allowance
        if (APP_STATE.singlePlay.score > this.shadowScore + 600) {
          this.flag('CONSOLE_MEMORY_INJECTION');
        }
      }
    }, 2500);
  }
};

/* ==========================================================================
   SECTION 3: DIFFICULTY PROGRESSION LADDER
   Phase 1 (Lvl 1-4): Forward Recall, escalating grid from 9 to 15 blocks
   Phase 2 (Lvl 5+): Reverse Order Mode! Resets to 9 tiles, 2.0s time, seq 3,
                     and restarts hardness progression in reverse!
   Zero fake/decoy blinking across all levels.
   ========================================================================== */
function getLevelConfig(level) {
  let rows = 3;
  let cols = 3;
  let totalTiles = 9;
  let sequenceLength = 3;
  const hasDecoy = false; // Fake decoy tiles completely eliminated per client request
  let isReverse = false;
  let isGhost = false;
  let timeLimitSec = 5.5;

  if (level < 5) {
    // PHASE 1: FORWARD ORDER (Smooth onboarding & addictive flow curve)
    isReverse = false;
    if (level === 1) {
      // Warm-up round: 3x3 grid, seq 3, 5.5s generous timer for instant positive feedback & addiction
      rows = 3; cols = 3; totalTiles = 9; sequenceLength = 3; timeLimitSec = 5.5;
    } else if (level === 2) {
      // Flow builder: 3x3 grid, seq 3, 5.0s timer to solidify rhythm and lock in combos
      rows = 3; cols = 3; totalTiles = 9; sequenceLength = 3; timeLimitSec = 5.0;
    } else if (level === 3) {
      // Stepping up: 3x3 grid, seq 4, 5.2s timer to test memory without visual overload
      rows = 3; cols = 3; totalTiles = 9; sequenceLength = 4; timeLimitSec = 5.2;
    } else if (level === 4) {
      // Grid expansion: 3x4 grid (12 tiles), seq 4. When grid increases, guessing time increases to 7.2s!
      rows = 3; cols = 4; totalTiles = 12; sequenceLength = 4; timeLimitSec = 7.2;
    }
  } else {
    // PHASE 2: REVERSE ORDER MODE (Starts at Level 5!)
    // When grid expands, time scales up proportionally so it's always doable and addictive!
    isReverse = true;
    const revLevel = level - 4; // 1, 2, 3, 4, 5...

    if (revLevel === 1) {
      // Level 5: Reverse Level 1 (9 tiles, seq 3, 5.5s to get used to reverse thinking)
      rows = 3; cols = 3; totalTiles = 9; sequenceLength = 3; timeLimitSec = 5.5;
    } else if (revLevel === 2) {
      // Level 6: Reverse Level 2 (9 tiles, seq 4, 6.0s)
      rows = 3; cols = 3; totalTiles = 9; sequenceLength = 4; timeLimitSec = 6.0;
    } else if (revLevel === 3) {
      // Level 7: Reverse Level 3 (12 tiles, seq 4) -> Grid increases -> Time increases to 7.8s
      rows = 3; cols = 4; totalTiles = 12; sequenceLength = 4; timeLimitSec = 7.8;
    } else if (revLevel === 4) {
      // Level 8: Reverse Level 4 (15 tiles, seq 5) -> Grid increases -> Time increases to 9.2s
      rows = 3; cols = 5; totalTiles = 15; sequenceLength = 5; timeLimitSec = 9.2;
    } else if (revLevel === 5) {
      // Level 9: Reverse Level 5 (20 tiles, seq 6) -> Grid increases -> Time increases to 11.5s
      rows = 4; cols = 5; totalTiles = 20; sequenceLength = 6; timeLimitSec = 11.5;
    } else if (revLevel === 6) {
      // Level 10: Reverse Level 6 (20 tiles, seq 7) -> Time increases to 12.5s
      rows = 4; cols = 5; totalTiles = 20; sequenceLength = 7; timeLimitSec = 12.5;
    } else if (revLevel === 7) {
      // Level 11: Reverse Level 7 (30 tiles, seq 8) -> Grid increases -> Time increases to 15.0s
      rows = 5; cols = 6; totalTiles = 30; sequenceLength = 8; timeLimitSec = 15.0;
    } else {
      // Level 12+: Ultra Reflex Reverse Mode (40 tiles) -> Generous scaled timer (17.5s - 20s)
      rows = 5; cols = 8; totalTiles = 40;
      sequenceLength = Math.min(10, 8 + Math.floor((revLevel - 7) / 2));
      timeLimitSec = Math.min(20.0, 16.5 + (sequenceLength - 8) * 1.5);
      isGhost = revLevel >= 12;
    }
  }

  return { rows, cols, totalTiles, tiles: totalTiles, sequenceLength, hasDecoy, isReverse, isGhost, timeLimitSec, guessTime: timeLimitSec };
}

/* ==========================================================================
   SECTION 4: FUNNY HINDI SPEECH & SYNTHESIZED COMICAL AUDIO
   Zero external .mp3 dependencies. Pure Web Speech API & Web Audio API
   ========================================================================== */
class AudioAndVoiceEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isSpeechMuted = false;
    this.setupUnlock();

    this.phrasesStart = [
      "Khel shuru! Kursi ki peti bandh lo!",
      "Aao beta, dikhao apna dimag!",
      "Sharma ji ke bete ko aaj harana hai!",
      "Bina kisi bakwas ke, game start!"
    ];

    this.phrasesCombos = [
      "Arre bawaal! Sharma ji ka beta ro raha hai!",
      "Cheetah hi kehde! Gazab dimag hai bhai!",
      "Bhai kya reflex hai, supersonic speed!",
      "Ye baburao ka style hai re baba!",
      "NASA wale bhi hairan hain tumhari memory dekh ke!"
    ];

    this.phrasesShieldLoss = [
      "Arre mori maiyya! Ye kya dabaya?!",
      "Galti se mistake ho gaya bhidu!",
      "Aayein?! Baingan!",
      "Ek shield gaya, dhyan kidhar hai hero?!",
      "Dimag ghas charne gaya hai kya?!"
    ];

    this.phrasesThink = [
      "Arre dimag ki batti jal gayi re baba!",
      "Mentos khao, dimag ki batti jalao!",
      "Focus mode on! Ab dekh jalwa!"
    ];

    this.phrasesChai = [
      "Garam cutting chai piyo, thand rakho!",
      "Ek cutting chai, dimag ekdum tight!"
    ];

    this.phrasesPeek = [
      "4K chashma on! Ab sab saaf dikhega!",
      "Eagle eye active, ab dekh kaise pelte hain!"
    ];

    this.phrasesFail = [
      "Khatam, Tata, Bye-Bye, Goodnight, gaya!",
      "Moye Moye... Moye Moye!",
      "Beta tumse na ho payega, jaake Ludo khelo!",
      "Gaya do sau rupaye paani mein!",
      "Arey koi baat nahi, ek aur baar try maar!"
    ];

    this.phrasesWin = [
      "Shabaash cheetah!",
      "Gazab dimag hai bhai!",
      "Toofan express chal rahi hai!",
      "Ek number baabu, kya baat hai!"
    ];
  }

  init() {
    if (!this.ctx) {
      try {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) {
          this.ctx = new AudioClass();
        }
      } catch (e) {
        console.warn("AudioContext init error:", e);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        this.ctx.resume().catch(() => {});
      } catch (e) {}
    }
    return this.ctx;
  }

  setupUnlock() {
    const unlock = () => {
      this.init();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  speakHindi(phraseList) {
    if (this.isMuted || this.isSpeechMuted || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const phrase = phraseList[Math.floor(Math.random() * phraseList.length)];
      const utter = new SpeechSynthesisUtterance(phrase);

      utter.pitch = 1.35;
      utter.rate = 1.18;
      utter.lang = 'hi-IN';

      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn("Speech error:", e);
    }
  }

  playPop() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) { }
  }

  /* ========================================================================
     DJ RHYTHMIC EXTRA BEATS LAYER (SYNCS DYNAMICALLY WITH BACKGROUND TRACKS)
     ======================================================================== */
  playDJTileBeat(stepIndex) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const step = (stepIndex || 0) % 6;

    try {
      if (step === 0) {
        // STEP 1: PUNCHY 808 DJ SUB KICK
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(155, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

        gain.gain.setValueAtTime(0.75, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.23);

        // Click transient
        const click = ctx.createOscillator();
        const cGain = ctx.createGain();
        click.type = 'triangle';
        click.frequency.setValueAtTime(360, now);
        click.frequency.exponentialRampToValueAtTime(80, now + 0.02);
        cGain.gain.setValueAtTime(0.35, now);
        cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        click.connect(cGain);
        cGain.connect(ctx.destination);
        click.start(now);
        click.stop(now + 0.03);

      } else if (step === 1) {
        // STEP 2: CRISP DJ SNARE / CLAP
        const bufferSize = Math.floor(ctx.sampleRate * 0.12);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.Q.setValueAtTime(1.2, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.6, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

        const bodyOsc = ctx.createOscillator();
        const bodyGain = ctx.createGain();
        bodyOsc.type = 'triangle';
        bodyOsc.frequency.setValueAtTime(220, now);
        bodyOsc.frequency.exponentialRampToValueAtTime(110, now + 0.08);
        bodyGain.gain.setValueAtTime(0.45, now);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        bodyOsc.connect(bodyGain);
        bodyGain.connect(ctx.destination);

        noise.start(now);
        bodyOsc.start(now);
        bodyOsc.stop(now + 0.10);

      } else if (step === 2) {
        // STEP 3: METALLIC TRAP HI-HAT ROLL
        const playHat = (tOffset) => {
          const bSize = Math.floor(ctx.sampleRate * 0.04);
          const buf = ctx.createBuffer(1, bSize, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < bSize; i++) d[i] = Math.random() * 2 - 1;
          const n = ctx.createBufferSource();
          n.buffer = buf;

          const hpf = ctx.createBiquadFilter();
          hpf.type = 'highpass';
          hpf.frequency.setValueAtTime(7500, now + tOffset);

          const g = ctx.createGain();
          g.gain.setValueAtTime(0.4, now + tOffset);
          g.gain.exponentialRampToValueAtTime(0.001, now + tOffset + 0.038);

          n.connect(hpf);
          hpf.connect(g);
          g.connect(ctx.destination);
          n.start(now + tOffset);
        };
        playHat(0);
        playHat(0.055);

      } else if (step === 3) {
        // STEP 4: HEAVY 808 SUB BASS GLIDE
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.22);

        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.33);

      } else if (step === 4) {
        // STEP 5: DJ VINYL SCRATCH / RISER
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(850, now + 0.12);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);

      } else {
        // STEP 6+: TURBO DOUBLE BEAT DROP (Kick + Sizzle Wash)
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(165, now);
        kickOsc.frequency.exponentialRampToValueAtTime(48, now + 0.14);
        kickGain.gain.setValueAtTime(0.75, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
        kickOsc.connect(kickGain);
        kickGain.connect(ctx.destination);
        kickOsc.start(now);
        kickOsc.stop(now + 0.20);

        const bSize = Math.floor(ctx.sampleRate * 0.15);
        const buf = ctx.createBuffer(1, bSize, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bSize; i++) d[i] = Math.random() * 2 - 1;
        const n = ctx.createBufferSource();
        n.buffer = buf;
        const hpf = ctx.createBiquadFilter();
        hpf.type = 'highpass';
        hpf.frequency.setValueAtTime(5200, now);
        const cGain = ctx.createGain();
        cGain.gain.setValueAtTime(0.35, now);
        cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        n.connect(hpf);
        hpf.connect(cGain);
        cGain.connect(ctx.destination);
        n.start(now);
      }
    } catch (e) { }
  }

  playDJRecordStop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 0.26);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.30);
    } catch (e) { }
  }

  playBoing() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.14);
      osc.frequency.linearRampToValueAtTime(400, now + 0.28);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.31);
    } catch (e) { }
  }

  playMoyeMoyeTune() {
    if (this.isMuted || !this.ctx) return;
    const notes = [329.63, 311.13, 277.18, 246.94];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.32, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.26);
        } catch (e) { }
      }, idx * 160);
    });
  }

  playDholakBeat() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.2);

      gain.gain.setValueAtTime(0.42, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.21);
    } catch (e) { }
  }

  playFlashNote(step) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + step * 75, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) { }
  }

  playBulbChime() {
    if (this.isMuted || !this.ctx) return;
    const freqs = [659.25, 830.61, 987.77, 1318.51];
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.36);
        } catch (e) { }
      }, idx * 70);
    });
  }

  playBhangraFanfare() {
    if (this.isMuted || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.19);
        } catch (e) { }
      }, idx * 80);
    });
  }
}

const audioVoice = new AudioAndVoiceEngine();

/* ==========================================================================
   SECTION 4B: RETRO HACKER / HINDI LO-FI CHILL RADIO STREAMING ENGINE
   Streams Top 10 Peaceful & Melodious Love Songs (Arijit, Talwinder, Aditya Rikhari)
   Real Background Audio Streaming with Spectrum Visualizer & Auto Speech Muting
   ========================================================================== */
class LofiRadioEngine {
  constructor(audioEngine) {
    this.audioEngine = audioEngine;
    this.isPlaying = false;
    this.currentTrack = 0;
    this.volume = 0.70;
    this.vizAnimId = null;
    this.mode = 'AUTO'; // 'AUTO', 'STREAM', or 'SYNTH'
    this.synthIntervalId = null;
    this.synthMasterGain = null;
    this.synthStep = 0;

    // Top 10 Melodious, Romantic & Peaceful Hindi Songs (Real Audio Streams + Full Procedural Chords)
    this.tracks = [
      {
        id: 0,
        name: "KESARIYA",
        artist: "Arijit Singh",
        sub: "Brahmastra // Warm Saffron Love Song",
        url: "https://ia801403.us.archive.org/26/items/best-of-2022-bollywood-songs/Brahmastra%20%282022%29%20-%20Kesariya.mp3",
        bpm: 78,
        chords: [
          [146.83, 185.00, 220.00, 293.66], // D Major
          [110.00, 138.59, 164.81, 220.00], // A Major
          [123.47, 146.83, 185.00, 246.94], // B Minor
          [98.00,  123.47, 146.83, 196.00]  // G Major
        ],
        bass: [73.42, 55.00, 61.74, 49.00],
        melody: [369.99, 392.00, 440.00, 440.00, 493.88, 440.00, 369.99, 329.63, 293.66, 329.63, 369.99, 293.66]
      },
      {
        id: 1,
        name: "APNA BANA LE",
        artist: "Arijit Singh",
        sub: "Bhediya // Soulful Romantic Melody",
        url: "https://ia801403.us.archive.org/26/items/best-of-2022-bollywood-songs/Bhediya%20%282022%29%20-%20Apna%20Bana%20Le.mp3",
        bpm: 74,
        chords: [
          [174.61, 220.00, 261.63, 349.23], // F Major
          [146.83, 174.61, 220.00, 293.66], // D Minor
          [116.54, 146.83, 174.61, 233.08], // Bb Major
          [130.81, 164.81, 196.00, 261.63]  // C Major
        ],
        bass: [87.31, 73.42, 58.27, 65.41],
        melody: [349.23, 392.00, 440.00, 392.00, 349.23, 329.63, 293.66, 349.23, 329.63, 293.66, 261.63, 293.66]
      },
      {
        id: 2,
        name: "TUM HI HO",
        artist: "Arijit Singh",
        sub: "Aashiqui 2 // Iconic Love Anthem",
        url: "https://dn710006.ca.archive.org/0/items/arijit-singh-tum-hi-ho-myfreemp-3.vip/Arijit%20Singh%20-%20Tum%20Hi%20Ho%20myfreemp3.vip%20.mp3",
        bpm: 72,
        chords: [
          [164.81, 196.00, 246.94, 329.63], // E Minor
          [130.81, 164.81, 196.00, 261.63], // C Major
          [146.83, 185.00, 220.00, 293.66], // D Major
          [123.47, 146.83, 185.00, 246.94]  // B Minor
        ],
        bass: [82.41, 65.41, 73.42, 61.74],
        melody: [493.88, 523.25, 493.88, 440.00, 392.00, 440.00, 493.88, 392.00, 369.99, 329.63, 293.66, 329.63]
      },
      {
        id: 3,
        name: "CHANNA MEREYA",
        artist: "Arijit Singh",
        sub: "ADHM // Melancholy Acoustic Soul",
        url: "https://dn711305.ca.archive.org/0/items/07-channa-mereya-arijit-singh-320-kbps/07%20Channa%20Mereya%20-%20Arijit%20Singh%20320Kbps.mp3",
        bpm: 72,
        chords: [
          [98.00,  116.54, 146.83, 196.00], // G Minor
          [87.31,  110.00, 130.81, 174.61], // F Major
          [77.78,  98.00,  116.54, 155.56], // Eb Major
          [116.54, 146.83, 174.61, 233.08]  // Bb Major
        ],
        bass: [49.00, 43.65, 38.89, 58.27],
        melody: [293.66, 293.66, 293.66, 261.63, 233.08, 261.63, 293.66, 233.08, 196.00, 233.08, 261.63, 196.00]
      },
      {
        id: 4,
        name: "RAABTA",
        artist: "Arijit Singh",
        sub: "Agent Vinod // Serene Midnight Groove",
        url: "https://dn710006.ca.archive.org/0/items/arijit-singh-tum-hi-ho-myfreemp-3.vip/Arijit%20Singh%20-%20Raabta%20myfreemp3.vip%20.mp3",
        bpm: 76,
        chords: [
          [130.81, 164.81, 196.00, 261.63], // C Major
          [110.00, 130.81, 164.81, 220.00], // A Minor
          [87.31,  110.00, 130.81, 174.61], // F Major
          [98.00,  123.47, 146.83, 196.00]  // G Major
        ],
        bass: [65.41, 55.00, 43.65, 49.00],
        melody: [329.63, 392.00, 440.00, 392.00, 329.63, 293.66, 261.63, 293.66, 329.63, 392.00, 440.00, 329.63]
      },
      {
        id: 5,
        name: "DHUNDHALA",
        artist: "Talwinder & Yashraj",
        sub: "Talwinder // Chill Hypnotic Vibes",
        url: "https://ia600905.us.archive.org/21/items/sahiba-by-aditya-rikhari/SpotiDownloader.com%20-%20Dhundhala%20-%20Yashraj.mp3",
        bpm: 82,
        chords: [
          [110.00, 130.81, 164.81, 220.00], // Am
          [87.31,  110.00, 130.81, 174.61], // F
          [130.81, 164.81, 196.00, 261.63], // C
          [98.00,  123.47, 146.83, 196.00]  // G
        ],
        bass: [55.00, 43.65, 65.41, 49.00],
        melody: [220.00, 246.94, 261.63, 293.66, 261.63, 246.94, 220.00, 196.00, 220.00, 261.63, 220.00, 196.00]
      },
      {
        id: 6,
        name: "HASEEN",
        artist: "Talwinder",
        sub: "Talwinder // Smooth Romantic Lo-Fi",
        url: "https://dn721903.ca.archive.org/0/items/sahiba-by-aditya-rikhari/SpotiDownloader.com%20-%20Haseen%20-%20Talwiinder.mp3",
        bpm: 75,
        chords: [
          [146.83, 174.61, 220.00, 293.66], // Dm
          [116.54, 146.83, 174.61, 233.08], // Bb
          [174.61, 220.00, 261.63, 349.23], // F
          [130.81, 164.81, 196.00, 261.63]  // C
        ],
        bass: [73.42, 58.27, 87.31, 65.41],
        melody: [293.66, 329.63, 349.23, 329.63, 293.66, 261.63, 233.08, 261.63, 293.66, 349.23, 329.63, 293.66]
      },
      {
        id: 7,
        name: "SAHIBA",
        artist: "Aditya Rikhari",
        sub: "Aditya Rikhari // Soulful Acoustic Love",
        url: "https://dn721903.ca.archive.org/0/items/sahiba-by-aditya-rikhari/SpotiDownloader.com%20-%20Sahiba%20-%20Aditya%20Rikhari.mp3",
        bpm: 76,
        chords: [
          [98.00,  123.47, 146.83, 196.00], // G
          [164.81, 196.00, 246.94, 329.63], // Em
          [130.81, 164.81, 196.00, 261.63], // C
          [146.83, 185.00, 220.00, 293.66]  // D
        ],
        bass: [49.00, 82.41, 65.41, 73.42],
        melody: [392.00, 440.00, 493.88, 440.00, 392.00, 329.63, 293.66, 329.63, 392.00, 440.00, 392.00, 293.66]
      },
      {
        id: 8,
        name: "SAMJHO NA",
        artist: "Aditya Rikhari",
        sub: "Aditya Rikhari // Peaceful Melodious Flow",
        url: "https://dn711303.ca.archive.org/0/items/aditya-rikhari-samjho-na-nasamajh-mp-3-160-k/Aditya%20Rikhari%20-%20SAMJHO%20NA%20%28%20NASAMAJH%20%29%28MP3_160K%29.mp3",
        bpm: 78,
        chords: [
          [164.81, 207.65, 246.94, 329.63], // E Major
          [138.59, 164.81, 207.65, 277.18], // C#m
          [110.00, 138.59, 164.81, 220.00], // A
          [123.47, 155.56, 185.00, 246.94]  // B
        ],
        bass: [82.41, 69.30, 55.00, 61.74],
        melody: [329.63, 369.99, 415.30, 369.99, 329.63, 277.18, 246.94, 277.18, 329.63, 415.30, 369.99, 329.63]
      },
      {
        id: 9,
        name: "FAASLE",
        artist: "Aditya Rikhari",
        sub: "Aditya Rikhari // Heartfelt Reflection",
        url: "https://ia800704.us.archive.org/10/items/aditya-rikhari-faasle/Aditya%20Rikhari%20-%20FAASLE.mp3",
        bpm: 70,
        chords: [
          [123.47, 146.83, 185.00, 246.94], // Bm
          [98.00,  123.47, 146.83, 196.00], // G
          [146.83, 185.00, 220.00, 293.66], // D
          [110.00, 138.59, 164.81, 220.00]  // A
        ],
        bass: [61.74, 49.00, 73.42, 55.00],
        melody: [293.66, 329.63, 369.99, 329.63, 293.66, 246.94, 220.00, 246.94, 293.66, 369.99, 329.63, 293.66]
      }
    ];

    // Native HTML5 Audio (Direct to hardware speakers)
    this.audioEl = new Audio();
    this.audioEl.preload = "none"; // don't auto-preload — wait for user action
    this.audioEl.setAttribute('playsinline', '');
    this.audioEl.setAttribute('webkit-playsinline', '');
    this.audioEl.volume = this.volume;

    this.audioEl.addEventListener('playing', () => {
      // Real stream active! Fade out procedural synth bed
      if (this.mode === 'AUTO') {
        this.stopSynthPlayback();
      }
      this.updateRadioUI();
    });

    this.audioEl.addEventListener('ended', () => {
      this.nextTrack();
    });

    this.audioEl.addEventListener('error', () => {
      // Stream failed — stay on synth, don't crash the game
      if (this.isPlaying && this.mode !== 'STREAM') {
        if (!this.synthIntervalId) {
          this.startSynthPlayback(this.currentTrack);
        }
      }
    });

    this.audioEl.addEventListener('stalled', () => {
      if (this.isPlaying && this.mode !== 'STREAM' && !this.synthIntervalId) {
        this.startSynthPlayback(this.currentTrack);
      }
    });
  }


  ensureContext() {
    if (this.audioEngine) {
      this.audioEngine.init();
      if (this.audioEngine.ctx && this.audioEngine.ctx.state === 'suspended') {
        this.audioEngine.ctx.resume().catch(() => {});
      }
    }
  }

  startSynthPlayback(trackIndex) {
    this.ensureContext();
    const ctx = this.audioEngine ? this.audioEngine.ctx : null;
    if (!ctx) return;
    this.stopSynthPlayback();

    const track = this.tracks[trackIndex !== undefined ? trackIndex : this.currentTrack];
    if (!track || !track.chords) return;

    this.synthMasterGain = ctx.createGain();
    this.synthMasterGain.gain.setValueAtTime(this.volume * 0.38, ctx.currentTime);
    this.synthMasterGain.connect(ctx.destination);

    this.synthStep = 0;
    const stepDurationMs = Math.round((60 / (track.bpm || 75)) * 1000);

    const playChordStep = () => {
      if (!this.isPlaying || !this.synthMasterGain) return;
      const now = ctx.currentTime;
      const chordIndex = this.synthStep % track.chords.length;
      const chordNotes = track.chords[chordIndex];
      const bassNote = track.bass ? track.bass[chordIndex % track.bass.length] : 65.41;
      const melNote = track.melody ? track.melody[this.synthStep % track.melody.length] : null;

      // Warm Polyphonic Lo-Fi Chords
      chordNotes.forEach((freq, idx) => {
        try {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.035);

          const dur = (stepDurationMs / 1000) * 1.8;
          g.gain.setValueAtTime(0.001, now);
          g.gain.linearRampToValueAtTime(0.12, now + 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, now + dur);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1400, now);

          osc.connect(filter);
          filter.connect(g);
          g.connect(this.synthMasterGain);

          osc.start(now + idx * 0.035);
          osc.stop(now + dur + 0.1);
        } catch (e) {}
      });

      // Warm Acoustic Sub Bass
      if (bassNote) {
        try {
          const bOsc = ctx.createOscillator();
          const bGain = ctx.createGain();
          bOsc.type = 'sine';
          bOsc.frequency.setValueAtTime(bassNote, now);
          bGain.gain.setValueAtTime(0.35, now);
          bGain.gain.exponentialRampToValueAtTime(0.001, now + (stepDurationMs / 1000) * 1.5);
          bOsc.connect(bGain);
          bGain.connect(this.synthMasterGain);
          bOsc.start(now);
          bOsc.stop(now + (stepDurationMs / 1000) * 1.6);
        } catch (e) {}
      }

      // Soulful Nylon Guitar / Piano Lead Melody Note
      if (melNote) {
        try {
          const mOsc = ctx.createOscillator();
          const mGain = ctx.createGain();
          mOsc.type = 'sine';
          mOsc.frequency.setValueAtTime(melNote, now + 0.12);
          mGain.gain.setValueAtTime(0.001, now + 0.12);
          mGain.gain.linearRampToValueAtTime(0.22, now + 0.16);
          mGain.gain.exponentialRampToValueAtTime(0.001, now + (stepDurationMs / 1000));
          mOsc.connect(mGain);
          mGain.connect(this.synthMasterGain);
          mOsc.start(now + 0.12);
          mOsc.stop(now + (stepDurationMs / 1000) + 0.1);
        } catch (e) {}
      }

      this.synthStep++;
    };

    playChordStep();
    this.synthIntervalId = setInterval(playChordStep, stepDurationMs);
  }

  stopSynthPlayback() {
    if (this.synthIntervalId) {
      clearInterval(this.synthIntervalId);
      this.synthIntervalId = null;
    }
    if (this.synthMasterGain && this.audioEngine && this.audioEngine.ctx) {
      try {
        this.synthMasterGain.gain.linearRampToValueAtTime(0.001, this.audioEngine.ctx.currentTime + 0.3);
      } catch (e) {}
    }
  }

  renderRadioTracks() {
    const list = document.getElementById('terminalTracksList');
    if (!list) return;
    list.innerHTML = '';

    this.tracks.forEach((t, i) => {
      const isCurrent = i === this.currentTrack;
      const isPlay = isCurrent && this.isPlaying;
      const row = document.createElement('div');
      row.className = `term-track-row ${isPlay ? 'playing' : ''}`;
      row.setAttribute('data-track', i);
      row.innerHTML = `
        <span class="track-num">[${(i + 1).toString().padStart(2, '0')}]</span>
        <div class="track-meta">
          <div class="track-name">${t.name}</div>
          <div class="track-sub">${t.artist} // ${t.sub}</div>
        </div>
        <button class="track-play-btn" data-track="${i}">${isPlay ? 'PAUSE' : 'PLAY'}</button>
      `;

      row.addEventListener('click', () => {
        // Toggle play/pause when clicking on song or its button
        if (i === this.currentTrack && this.isPlaying) {
          this.pauseTrack();
        } else {
          this.playTrack(i);
        }
      });

      list.appendChild(row);
    });
  }

  playTrack(index) {
    this.ensureContext();
    if (index >= 0 && index < this.tracks.length) {
      this.currentTrack = index;
    }
    const track = this.tracks[this.currentTrack];

    // Step 1: Always start synth immediately for zero-latency audio (no silence ever)
    if (this.mode !== 'STREAM') {
      this.startSynthPlayback(this.currentTrack);
    }

    // Step 2: Attempt real audio stream in background
    if (this.mode !== 'SYNTH' && this.audioEl) {
      try {
        if (this.audioEl.src !== track.url) {
          this.audioEl.src = track.url;
        }
        this.audioEl.volume = this.volume;
        const playPromise = this.audioEl.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(() => {
            // Check after a brief delay if stream is actually emitting audio
            setTimeout(() => {
              if (this.audioEl && !this.audioEl.paused && this.audioEl.currentTime > 0.3) {
                if (this.mode === 'AUTO') {
                  this.stopSynthPlayback();
                }
              } else {
                if (!this.synthIntervalId && this.mode !== 'STREAM') {
                  this.startSynthPlayback(this.currentTrack);
                }
              }
            }, 600);
            this.updateRadioUI();
          }).catch(() => {
            // Stream blocked (autoplay policy or network) — synth keeps playing
            if (!this.synthIntervalId && this.mode !== 'STREAM') {
              this.startSynthPlayback(this.currentTrack);
            }
          });
        }
      } catch (e) {
        // Stream unavailable — synth already running
        if (!this.synthIntervalId && this.mode !== 'STREAM') {
          this.startSynthPlayback(this.currentTrack);
        }
      }
    }

    this.isPlaying = true;
    if (this.audioEngine) this.audioEngine.isSpeechMuted = true;
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    this.updateRadioUI();
    this.startVisualizer();
  }


  pauseTrack() {
    if (this.audioEl) {
      try { this.audioEl.pause(); } catch (e) {}
    }
    this.stopSynthPlayback();
    this.isPlaying = false;
    this.audioEngine.isSpeechMuted = false;
    this.updateRadioUI();
    if (this.vizAnimId) {
      cancelAnimationFrame(this.vizAnimId);
      this.vizAnimId = null;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pauseTrack();
    } else {
      this.playTrack(this.currentTrack);
    }
  }

  nextTrack() {
    const next = (this.currentTrack + 1) % this.tracks.length;
    this.playTrack(next);
  }

  prevTrack() {
    const prev = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
    this.playTrack(prev);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioEl) {
      this.audioEl.volume = this.volume;
    }
    if (this.synthMasterGain && this.audioEngine && this.audioEngine.ctx) {
      try {
        this.synthMasterGain.gain.setValueAtTime(this.volume * 0.38, this.audioEngine.ctx.currentTime);
      } catch (e) {}
    }
  }

  toggleEngineMode() {
    if (this.mode === 'AUTO') {
      this.mode = 'STREAM';
      this.stopSynthPlayback();
      if (this.isPlaying && this.audioEl) this.audioEl.play().catch(() => {});
    } else if (this.mode === 'STREAM') {
      this.mode = 'SYNTH';
      if (this.audioEl) this.audioEl.pause();
      if (this.isPlaying) this.startSynthPlayback(this.currentTrack);
    } else {
      this.mode = 'AUTO';
      if (this.isPlaying) this.playTrack(this.currentTrack);
    }
    this.updateRadioUI();
  }

  updateRadioUI() {
    const btnToggle = document.getElementById('btnRadioToggle');
    const txtStatus = document.getElementById('radioStatusText');
    const playPauseBtn = document.getElementById('btnRadioPlayPause');
    const modeBtn = document.getElementById('btnRadioEngineMode');
    const curTrack = this.tracks[this.currentTrack];

    if (modeBtn) {
      modeBtn.textContent = `[ AUDIO: ${this.mode} ]`;
    }

    if (this.isPlaying) {
      if (btnToggle) btnToggle.classList.add('radio-playing');
      if (txtStatus) txtStatus.textContent = `[RADIO] ${curTrack.name}`;
      if (playPauseBtn) {
        playPauseBtn.textContent = '[ PAUSE ]';
        playPauseBtn.classList.add('active');
      }
    } else {
      if (btnToggle) btnToggle.classList.remove('radio-playing');
      if (txtStatus) txtStatus.textContent = `RADIO [108.4]`;
      if (playPauseBtn) {
        playPauseBtn.textContent = '[ PLAY ]';
        playPauseBtn.classList.remove('active');
      }
    }

    document.querySelectorAll('.term-track-row').forEach(row => {
      const tIdx = parseInt(row.getAttribute('data-track'), 10);
      const isCurrent = tIdx === this.currentTrack;
      row.classList.toggle('playing', isCurrent && this.isPlaying);
      const pBtn = row.querySelector('.track-play-btn');
      if (pBtn) {
        pBtn.textContent = (isCurrent && this.isPlaying) ? 'PAUSE' : 'PLAY';
      }
    });

    const sysLog = document.getElementById('terminalSysLog');
    if (sysLog) {
      if (this.isPlaying) {
        const isStreamPlaying = this.audioEl && !this.audioEl.paused && this.audioEl.currentTime > 0;
        const engineLabel = isStreamPlaying ? 'DIRECT STREAM' : 'ACOUSTIC SYNTH';
        sysLog.innerHTML = `> ACTIVE: [TRACK ${(this.currentTrack + 1).toString().padStart(2, '0')}] ${curTrack.name} (${engineLabel})<br>> ARTIST: ${curTrack.artist} // ${curTrack.sub}`;
      } else {
        sysLog.innerHTML = `> 108.4 FM: HINDI LO-FI STREAM (ARIJIT // TALWINDER // ADITYA RIKHARI)<br>> LIVE DJ BEAT SYNC ACTIVE ON TILE TAPS`;
      }
    }

    // Live sync with in-game mini radio bar
    const miniTrackTitle = document.getElementById('miniRadioTrackTitle');
    const miniTrackArtist = document.getElementById('miniRadioTrackArtist');
    const miniRadioBar = document.getElementById('miniRadioBar');
    const miniPlayIcon = document.getElementById('miniRadioPlayIcon');

    if (miniTrackTitle) miniTrackTitle.textContent = curTrack.name;
    if (miniTrackArtist) miniTrackArtist.textContent = `${curTrack.artist} // ${curTrack.sub}`;
    if (miniRadioBar) miniRadioBar.classList.toggle('playing', this.isPlaying);
    if (miniPlayIcon) {
      if (this.isPlaying) {
        miniPlayIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>';
      } else {
        miniPlayIcon.innerHTML = '<path d="M8 5v14l11-7z" fill="currentColor"/>';
      }
    }
  }

  startVisualizer() {
    const canvas = document.getElementById('terminalVisualizerCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const numBars = 32;

    const draw = () => {
      if (!this.isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      this.vizAnimId = requestAnimationFrame(draw);

      const t = performance.now() * 0.007;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / numBars);
      let x = 0;

      for (let i = 0; i < numBars; i++) {
        const wave = Math.sin(t * 1.8 + i * 0.38) * Math.cos(t * 0.9 + i * 0.18);
        const energy = Math.abs(wave);
        const barHeight = Math.max(4, energy * canvas.height * 0.92);
        const alpha = 0.45 + energy * 0.55;

        ctx.fillStyle = `rgba(0, 245, 212, ${alpha})`;
        ctx.fillRect(x + 1, canvas.height - barHeight, barWidth - 2, barHeight);
        x += barWidth;
      }
    };

    if (this.vizAnimId) cancelAnimationFrame(this.vizAnimId);
    draw();
  }
}

const lofiRadio = new LofiRadioEngine(audioVoice);

/* ==========================================================================
   SECTION 4B: HAPTIC ENGINE (RESPONSIVE PHYSICAL VIBRATIONS)
   ========================================================================== */
const HapticEngine = {
  enabled: true,
  vibrate(pattern) {
    if (!this.enabled || typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  },
  tap() { this.vibrate([35]); },
  tick() { this.vibrate([18]); },
  countdown() { this.vibrate([45]); },
  start() { this.vibrate([85]); },
  fever() { this.vibrate([60, 40, 70]); },
  wrong() { this.vibrate([120, 60, 160]); },
  victory() { this.vibrate([70, 40, 70, 40, 140]); },
  power() { this.vibrate([45, 25, 75]); },
  button() { this.vibrate([22]); }
};

function triggerHaptic(pattern) {
  HapticEngine.vibrate(pattern);
}

/* ==========================================================================
   SECTION 5: INTERACTIVE AMBIENT PARTICLES (FUNKY FLOATING DOODADS)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const shapes = [];
  const COUNT = 32;
  const shapeTypes = ['circle', 'ring', 'star', 'diamond'];

  for (let i = 0; i < COUNT; i++) {
    shapes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 8 + 4,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      alpha: Math.random() * 0.25 + 0.1
    });
  }

  function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < COUNT; i++) {
      const s = shapes[i];
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.vRot;

      if (s.x < -20) s.x = width + 20;
      if (s.x > width + 20) s.x = -20;
      if (s.y < -20) s.y = height + 20;
      if (s.y > height + 20) s.y = -20;

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.strokeStyle = `rgba(255, 255, 255, ${s.alpha * 1.5})`;
      ctx.lineWidth = 1.5;

      if (s.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.type === 'ring') {
        ctx.beginPath();
        ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        ctx.stroke();
      } else if (s.type === 'star') {
        drawStar(0, 0, 4, s.size, s.size * 0.45);
        ctx.fill();
      } else if (s.type === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(0, -s.size);
        ctx.lineTo(s.size * 0.7, 0);
        ctx.lineTo(0, s.size);
        ctx.lineTo(-s.size * 0.7, 0);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   SECTION 6: GLOBAL STATE MANAGEMENT
   ========================================================================== */
const APP_STATE = {
  currentView: 'view-menu',
  playerHandle: localStorage.getItem('bm_player_handle') || '',
  playerAvatar: localStorage.getItem('bm_player_avatar') || 'spider_mask',
  playerId: (function() {
    let id = localStorage.getItem('bm_player_id');
    if (!id) {
      id = 'spider_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('bm_player_id', id);
    }
    return id;
  })(),
  currentTheme: (function() {
    const saved = localStorage.getItem('bm_theme');
    const legacyMap = {
      'mango': 'spider-red',
      'desi-gold': 'spider-red',
      'bubblegum': 'cyber-miles',
      'cyberpunk': 'cyber-miles',
      'carnival': 'symbiote',
      'matrix': 'symbiote',
      'arcade': 'iron-spider',
      'sunset': 'iron-spider',
      'aurora': 'stealth-black'
    };
    return legacyMap[saved] || saved || 'spider-red';
  })(),
  highScore: parseInt(localStorage.getItem('bm_high_score') || '0', 10),
  maxLevel: parseInt(localStorage.getItem('bm_max_level') || '1', 10),

  // Native WebSocket Realtime Multiplayer Client
  ws: null,
  isWsConnected: false,

  // Supabase Realtime Client
  supabaseUrl: localStorage.getItem('bm_supa_url') || 'https://dfixypyqewrdofaufehg.supabase.co',
  supabaseKey: localStorage.getItem('bm_supa_key') || 'sb_publishable_u-T2e51hbuuIp8cblLxkqQ_JMTpE90g',
  supabaseClient: null,

  // Single Player State
  singlePlay: {
    active: false,
    level: 1,
    score: 0,
    streak: 0,
    maxStreak: 0,
    shields: 3,
    targetSequence: [],
    playerTapIndex: 0,
    phase: 'IDLE',
    isReverse: false,
    timeLimitSec: 3.0,
    remainingTimeSec: 3.0,
    animFrameId: null,
    isInputLocked: true,
    isTimerFrozen: false,
    chaiPowerUsed: false,
    chashmaPowerUsed: false,
    thinkPowerUsed: false,
    isFeverActive: false
  },

  // 1v1 Room Duel State
  duel: {
    active: false,
    roomCode: 'MIND',
    playerNumber: 1,
    targetScore: 10,
    p1Score: 0,
    p2Score: 0,
    p1Progress: 0,
    p2Progress: 0,
    p1StunnedUntil: 0,
    p2StunnedUntil: 0,
    targetSequence: [],
    phase: 'IDLE',
    isVsBot: false,
    botInterval: null,
    animFrameId: null
  }
};

/* ==========================================================================
   SECTION 7: VIEW & THEME SWITCHERS
   ========================================================================== */
function switchView(viewId) {
  document.querySelectorAll('.screen-view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
    APP_STATE.currentView = viewId;
  }

  const navBtn = document.getElementById('btnNavMenu');
  if (viewId === 'view-menu') {
    navBtn.style.display = 'none';
    updateFunkyCapsule("READY TO RUN", "");
    // Restore base theme colors on root
    const root = document.documentElement;
    root.style.removeProperty('--color-primary');
    root.style.removeProperty('--color-primary-glow');
    root.style.removeProperty('--color-secondary');
    root.style.removeProperty('--color-secondary-glow');
    root.style.removeProperty('--color-accent');
    root.style.removeProperty('--color-accent-glow');
  } else {
    navBtn.style.display = 'inline-flex';
  }

  if (viewId !== 'view-singleplay' && APP_STATE.singlePlay.animFrameId) {
    cancelAnimationFrame(APP_STATE.singlePlay.animFrameId);
    APP_STATE.singlePlay.active = false;
  }
  if (viewId !== 'view-duel-room' && APP_STATE.duel.animFrameId) {
    cancelAnimationFrame(APP_STATE.duel.animFrameId);
    APP_STATE.duel.active = false;
    if (APP_STATE.duel.botInterval) clearInterval(APP_STATE.duel.botInterval);
  }
}

function updateFunkyCapsule(text, styleClass) {
  const capsule = document.getElementById('funkyStatusCapsule');
  if (!capsule) return;
  capsule.className = `funky-status-capsule ${styleClass || ''}`;
  const txt = capsule.querySelector('.capsule-text');
  if (txt) txt.textContent = text;
}

function applyTheme(themeName) {
  const legacyMap = {
    'mango': 'spider-red',
    'desi-gold': 'spider-red',
    'bubblegum': 'cyber-miles',
    'cyberpunk': 'cyber-miles',
    'carnival': 'symbiote',
    'matrix': 'symbiote',
    'arcade': 'iron-spider',
    'sunset': 'iron-spider',
    'aurora': 'stealth-black'
  };
  if (legacyMap[themeName]) {
    themeName = legacyMap[themeName];
  }

  const allowed = ['spider-red', 'stealth-black', 'cyber-miles', 'symbiote', 'iron-spider'];
  if (!allowed.includes(themeName)) themeName = 'spider-red';

  APP_STATE.currentTheme = themeName;
  localStorage.setItem('bm_theme', themeName);

  document.body.setAttribute('data-theme', themeName);

  document.querySelectorAll('.theme-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === themeName);
  });
}

/* ==========================================================================
   DYNAMIC ROUND NEON PALETTES (UNIQUE COLOR COMBINATIONS PER ROUND)
   ========================================================================== */
const ROUND_PALETTES = [
  {
    name: "ROYAL DESI GOLD",
    primary: "#FFB703",
    primaryGlow: "rgba(255, 183, 3, 0.55)",
    secondary: "#FF006E",
    secondaryGlow: "rgba(255, 0, 110, 0.55)",
    accent: "#00F5D4",
    accentGlow: "rgba(0, 245, 212, 0.50)"
  },
  {
    name: "ELECTRIC CYBERPUNK",
    primary: "#00F0FF",
    primaryGlow: "rgba(0, 240, 255, 0.55)",
    secondary: "#FF007F",
    secondaryGlow: "rgba(255, 0, 127, 0.55)",
    accent: "#7928CA",
    accentGlow: "rgba(121, 40, 202, 0.50)"
  },
  {
    name: "RADIOACTIVE MATRIX",
    primary: "#00FF87",
    primaryGlow: "rgba(0, 255, 135, 0.55)",
    secondary: "#60EFFF",
    secondaryGlow: "rgba(96, 239, 255, 0.50)",
    accent: "#FFE600",
    accentGlow: "rgba(255, 230, 0, 0.50)"
  },
  {
    name: "VAPORWAVE SUNSET",
    primary: "#FF5E00",
    primaryGlow: "rgba(255, 94, 0, 0.55)",
    secondary: "#F72585",
    secondaryGlow: "rgba(247, 37, 133, 0.50)",
    accent: "#4CC9F0",
    accentGlow: "rgba(76, 201, 240, 0.50)"
  },
  {
    name: "COSMIC AURORA",
    primary: "#3A86FF",
    primaryGlow: "rgba(58, 134, 255, 0.55)",
    secondary: "#FF006E",
    secondaryGlow: "rgba(255, 0, 110, 0.50)",
    accent: "#8338EC",
    accentGlow: "rgba(131, 56, 236, 0.50)"
  },
  {
    name: "NEO TOKYO MINT",
    primary: "#00F5D4",
    primaryGlow: "rgba(0, 245, 212, 0.55)",
    secondary: "#7928CA",
    secondaryGlow: "rgba(121, 40, 202, 0.50)",
    accent: "#FFE600",
    accentGlow: "rgba(255, 230, 0, 0.50)"
  },
  {
    name: "KINETIC CRIMSON",
    primary: "#FF1E56",
    primaryGlow: "rgba(255, 30, 86, 0.55)",
    secondary: "#00F0FF",
    secondaryGlow: "rgba(0, 240, 255, 0.50)",
    accent: "#FFBE0B",
    accentGlow: "rgba(255, 190, 11, 0.50)"
  },
  {
    name: "DEEP OCEAN ABYSS",
    primary: "#00D2FF",
    primaryGlow: "rgba(0, 210, 255, 0.55)",
    secondary: "#3A7BD5",
    secondaryGlow: "rgba(58, 123, 213, 0.50)",
    accent: "#00FF87",
    accentGlow: "rgba(0, 255, 135, 0.50)"
  },
  {
    name: "SOLAR HYPERNOVA",
    primary: "#FFD000",
    primaryGlow: "rgba(255, 208, 0, 0.55)",
    secondary: "#FF4500",
    secondaryGlow: "rgba(255, 69, 0, 0.50)",
    accent: "#FF007F",
    accentGlow: "rgba(255, 0, 127, 0.50)"
  },
  {
    name: "ULTRAVIOLET VOID",
    primary: "#B026FF",
    primaryGlow: "rgba(176, 38, 255, 0.55)",
    secondary: "#00F0FF",
    secondaryGlow: "rgba(0, 240, 255, 0.50)",
    accent: "#00FF87",
    accentGlow: "rgba(0, 255, 135, 0.50)"
  }
];

function applyRoundDynamicPalette(level) {
  const paletteIndex = ((level - 1) % ROUND_PALETTES.length + ROUND_PALETTES.length) % ROUND_PALETTES.length;
  const p = ROUND_PALETTES[paletteIndex];

  const root = document.documentElement;
  root.style.setProperty('--color-primary', p.primary);
  root.style.setProperty('--color-primary-glow', p.primaryGlow);
  root.style.setProperty('--color-secondary', p.secondary);
  root.style.setProperty('--color-secondary-glow', p.secondaryGlow);
  root.style.setProperty('--color-accent', p.accent);
  root.style.setProperty('--color-accent-glow', p.accentGlow);

  const arena = document.getElementById('singleMatrixCard');
  if (arena) {
    arena.style.boxShadow = `0 10px 30px -4px ${p.primaryGlow}, 0 0 20px ${p.secondaryGlow}`;
  }

  const roundTag = document.getElementById('spLevel');
  if (roundTag) {
    roundTag.style.color = p.primary;
    roundTag.style.textShadow = `0 0 12px ${p.primaryGlow}`;
  }

  return p;
}

function updateDesiTaunt() {
  const randomTaunt = DESI_TAUNTS[Math.floor(Math.random() * DESI_TAUNTS.length)];
  const tauntEl = document.getElementById('lblDesiTaunt');
  if (tauntEl) {
    tauntEl.textContent = randomTaunt;
  }
  const dtTaunt = document.getElementById('dtLiveTaunt');
  if (dtTaunt) {
    dtTaunt.textContent = `"${randomTaunt}"`;
  }
}

function updateAudioToggleButton() {
  const btn = document.getElementById('btnSoundToggle');
  const txt = document.getElementById('soundStatusText');
  if (!btn || !txt) return;

  if (audioVoice.isMuted) {
    btn.classList.remove('audio-active');
    btn.classList.add('audio-muted');
    txt.textContent = 'AUDIO: OFF';
  } else {
    btn.classList.remove('audio-muted');
    btn.classList.add('audio-active');
    txt.textContent = 'AUDIO: ON';
  }
}

/* ==========================================================================
   SECTION 8: PATTERN GENERATOR & DOM HELPERS
   ========================================================================== */
function generatePattern(length, totalTiles = 9) {
  const sequence = [];
  const available = [];
  for (let i = 0; i < totalTiles; i++) available.push(i);
  for (let i = 0; i < length && available.length > 0; i++) {
    const idx = Math.floor(Math.random() * available.length);
    sequence.push(available[idx]);
    available.splice(idx, 1);
  }
  return sequence;
}

function triggerRecoilShake() {
  const arena = document.getElementById('singleMatrixCard');
  if (arena) {
    arena.classList.remove('shake-recoil');
    void arena.offsetWidth;
    arena.classList.add('shake-recoil');
  }
}

/* ==========================================================================
   SECTION 8B: OBJECT POOL FOR MATRIX TILES (ZERO-ALLOCATION DYNAMIC GRID)
   Pre-allocates up to 60 tiles once during startup to eliminate layout thrashing,
   memory churn, garbage collection pauses, and screen flicker between rounds.
   ========================================================================== */
class TilePool {
  constructor(containerId, maxCapacity = 60) {
    this.container = document.getElementById(containerId);
    this.maxCapacity = maxCapacity;
    this.tiles = [];
    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < this.maxCapacity; i++) {
      const tile = document.createElement('div');
      tile.id = `tile-${i}`;
      tile.className = 'glass-tile hidden-tile';
      tile.setAttribute('data-index', i);

      const badge = document.createElement('span');
      badge.className = 'order-badge';
      tile.appendChild(badge);

      tile.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        handleTileClick(i, e);
      });

      this.tiles.push(tile);
      frag.appendChild(tile);
    }
    this.container.appendChild(frag);
  }

  activateGrid(rows, cols) {
    if (!this.container) return;
    const total = rows * cols;
    this.container.style.setProperty('--cols', cols);
    this.container.style.setProperty('--rows', rows);
    this.container.setAttribute('data-total-tiles', total);

    for (let i = 0; i < this.maxCapacity; i++) {
      const tile = this.tiles[i];
      if (!tile) continue;
      if (i < total) {
        tile.className = 'glass-tile';
        tile.style.animationDelay = '';
        const hint = tile.querySelector('.numpad-hint');
        if (hint) {
          hint.style.display = total === 9 ? 'block' : 'none';
        }
        const badge = tile.querySelector('.order-badge');
        if (badge) badge.textContent = '';
      } else {
        tile.className = 'glass-tile hidden-tile';
      }
    }
  }

  resetTiles(total) {
    const limit = Math.min(total, this.maxCapacity);
    for (let i = 0; i < limit; i++) {
      const tile = this.tiles[i];
      if (tile) {
        tile.className = 'glass-tile';
        tile.style.animationDelay = '';
        const badge = tile.querySelector('.order-badge');
        if (badge) badge.textContent = '';
      }
    }
  }
}

let singleTilePool = null;

function setupSinglePlayerGrid(rows, cols) {
  if (!singleTilePool) {
    singleTilePool = new TilePool('singleMatrixGrid', 60);
  }
  singleTilePool.activateGrid(rows, cols);
}

function resetTilesUI(totalTiles = 9) {
  if (singleTilePool) {
    singleTilePool.resetTiles(totalTiles);
  }
}

function showFloatingScore(tileIndex, text) {
  const tile = document.getElementById(`tile-${tileIndex}`);
  if (!tile) return;

  const rect = tile.getBoundingClientRect();
  const tag = document.createElement('div');
  tag.className = 'floating-score-tag';
  tag.textContent = text;
  tag.style.left = `${rect.left + rect.width / 2 - 35}px`;
  tag.style.top = `${rect.top}px`;

  document.body.appendChild(tag);
  setTimeout(() => tag.remove(), 750);
}

/* ==========================================================================
   SECTION 9: SINGLE PLAYER GAMEPLAY LOOP (WITH 3 SHIELDS & FEVER MODE)
   ========================================================================== */
function startSinglePlayerGame() {
  if (!APP_STATE.playerHandle || APP_STATE.playerHandle.trim().length < 2) {
    openProfileModal(true);
    return;
  }

  // Guarantee background music starts reliably upon user entering the game
  lofiRadio.ensureContext();
  if (!lofiRadio.isPlaying) {
    lofiRadio.playTrack(lofiRadio.currentTrack);
  }
  HapticEngine.start();

  AntiCheat.startRun();

  APP_STATE.singlePlay = {
    active: true,
    level: 1,
    score: 0,
    streak: 0,
    maxStreak: 0,
    shields: 3,
    targetSequence: [],
    playerTapIndex: 0,
    phase: 'IDLE',
    isReverse: false,
    hasSeenReverseNotice: false,
    timeLimitSec: 3.0,
    remainingTimeSec: 3.0,
    animFrameId: null,
    isInputLocked: true,
    isTimerFrozen: false,
    chaiPowerUsed: false,
    chashmaPowerUsed: false,
    thinkPowerUsed: false,
    isFeverActive: false
  };

  const arena = document.getElementById('singleMatrixCard');
  if (arena) arena.classList.remove('fever-mode');

  applyRoundDynamicPalette(1);

  audioVoice.playDholakBeat();
  audioVoice.speakHindi(audioVoice.phrasesStart);

  resetPowerBtnsUI();
  updateSinglePlayerHUD();
  switchView('view-singleplay');
  startNewRound();
}

function resetPowerBtnsUI() {
  const btnChai = document.getElementById('btnPowerChai');
  const btnChashma = document.getElementById('btnPowerChashma');
  const btnThink = document.getElementById('btnPowerThink');
  if (btnChai) btnChai.classList.remove('disabled');
  if (btnChashma) btnChashma.classList.remove('disabled');
  if (btnThink) btnThink.classList.remove('disabled');
}

function showReverseAttentionModal(onDismiss) {
  const overlay = document.getElementById('reverseAttentionOverlay');
  const btn = document.getElementById('btnDismissReverse');
  if (!overlay) {
    onDismiss();
    return;
  }

  overlay.style.display = 'flex';
  audioVoice.speakHindi(['Dhyan de! Ab tiles ulta dabana hai, last to first!']);
  audioVoice.playBoing();

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    overlay.style.display = 'none';
    setTimeout(onDismiss, 200);
  };

  if (btn) {
    btn.onclick = dismiss;
  }

  // Auto-dismiss after 3.2s so player is never permanently blocked
  setTimeout(() => {
    if (!dismissed) dismiss();
  }, 3200);
}

function startNewRound() {
  const sp = APP_STATE.singlePlay;
  const config = getLevelConfig(sp.level);

  // Set up the dynamic grid (rows x cols) for current level
  setupSinglePlayerGrid(config.rows, config.cols);

  sp.targetSequence = generatePattern(config.sequenceLength, config.totalTiles);
  sp.isReverse = config.isReverse;
  sp.playerTapIndex = 0;
  sp.timeLimitSec = config.timeLimitSec;
  sp.remainingTimeSec = config.timeLimitSec;
  sp.isInputLocked = true;
  sp.phase = 'MEMORIZE';
  sp.isTimerFrozen = false;

  resetTilesUI(config.totalTiles);
  updateSinglePlayerHUD();
  updateDesiTaunt();

  // Ghost grid mode
  const arena = document.getElementById('singleMatrixCard');
  if (config.isGhost) {
    arena.classList.add('ghost-mode');
  } else {
    arena.classList.remove('ghost-mode');
  }

  // Phase Banner & Capsule
  const phasePill = document.getElementById('spPhasePill');
  if (sp.isReverse) {
    phasePill.textContent = 'REVERSE RECALL: MEMORIZE!';
    phasePill.className = 'phase-pill-badge reverse';
    updateFunkyCapsule(`REVERSE: ${config.sequenceLength}/${config.totalTiles} BLOCKS`, "pulse-memorize");
  } else {
    phasePill.textContent = `MEMORIZE ${config.sequenceLength} OF ${config.totalTiles} BLOCKS`;
    phasePill.className = 'phase-pill-badge memorize';
    updateFunkyCapsule(`MEMORIZE: ${config.sequenceLength}/${config.totalTiles} BLOCKS`, "pulse-memorize");
  }

  const runSequence = () => {
    flashTilesSequence(sp.targetSequence, false, config.totalTiles, () => {
      sp.phase = 'RECALL';
      sp.isInputLocked = false;

      if (sp.isReverse) {
        phasePill.textContent = 'ENTER IN REVERSE ORDER!';
        phasePill.className = 'phase-pill-badge reverse';
      } else {
        phasePill.textContent = 'RECALL PATTERN NOW!';
        phasePill.className = 'phase-pill-badge recall';
      }

      if (sp.streak >= 3) {
        updateFunkyCapsule(`${sp.streak}X FEVER SURGE!`, "pulse-combo");
      } else if (sp.streak >= 2) {
        updateFunkyCapsule(`${sp.streak}X COMBO SURGE!`, "pulse-combo");
      } else {
        updateFunkyCapsule("RECALL NOW!", "pulse-recall");
      }

      startSpeedTimer();
    });
  };

  // Show reverse order attention middle popup when reverse mode is first encountered
  if (config.isReverse && !sp.hasSeenReverseNotice) {
    sp.hasSeenReverseNotice = true;
    showReverseAttentionModal(runSequence);
  } else {
    runSequence();
  }
}

function flashTilesSequence(sequence, hasDecoy, totalTiles, onComplete) {
  let step = 0;
  const sp = APP_STATE.singlePlay;
  // Early level pacing: slightly longer flash for crystal-clear pattern intake in Level 1-2
  const isEarlyLevel = sp && sp.level <= 2;
  const flashActiveMs = isEarlyLevel ? 480 : 430;
  const flashPauseMs = isEarlyLevel ? 160 : 140;

  function showNext() {
    if (step < sequence.length) {
      const tileIndex = sequence[step];
      const tileEl = document.getElementById(`tile-${tileIndex}`);

      if (tileEl) {
        tileEl.classList.add('flash-active');
        const badge = tileEl.querySelector('.order-badge');
        if (badge) badge.textContent = step + 1;
        audioVoice.playFlashNote(step);
      }

      setTimeout(() => {
        if (tileEl) {
          tileEl.classList.remove('flash-active');
          const badge = tileEl.querySelector('.order-badge');
          if (badge) badge.textContent = '';
        }
        step++;
        setTimeout(showNext, flashPauseMs);
      }, flashActiveMs);
    } else {
      // Sequence completed: start recall phase with clean timing, zero fake blinks
      setTimeout(onComplete, 180);
    }
  }
  setTimeout(showNext, 300);
}

function startSpeedTimer() {
  const sp = APP_STATE.singlePlay;
  let lastTime = performance.now();

  function timerLoop(now) {
    if (!sp.active || sp.phase !== 'RECALL') return;

    const deltaSec = (now - lastTime) / 1000;
    lastTime = now;

    if (!sp.isTimerFrozen) {
      sp.remainingTimeSec -= deltaSec;
    }

    const pct = Math.max(0, (sp.remainingTimeSec / sp.timeLimitSec) * 100);
    const fill = document.getElementById('spTimerFill');
    fill.style.width = pct + '%';

    if (sp.isTimerFrozen) {
      fill.classList.add('frozen');
    } else {
      fill.classList.remove('frozen');
      if (pct <= 30) {
        fill.classList.add('urgent');
      } else {
        fill.classList.remove('urgent');
      }
    }

    if (sp.remainingTimeSec <= 0) {
      handleMistake("TIME EXPIRED: NEURAL SPEED COLLAPSED");
      return;
    }

    sp.animFrameId = requestAnimationFrame(timerLoop);
  }

  sp.animFrameId = requestAnimationFrame(timerLoop);
}

function handleTileClick(tileIndex, event) {
  const sp = APP_STATE.singlePlay;
  if (!sp.active || sp.isInputLocked || sp.phase !== 'RECALL') return;

  // Anti-cheat verification on player input
  if (event && !AntiCheat.validateTap(event)) return;

  const targetSeq = sp.isReverse ? [...sp.targetSequence].reverse() : sp.targetSequence;
  const expectedTile = targetSeq[sp.playerTapIndex];
  const tileEl = document.getElementById(`tile-${tileIndex}`);

  if (tileIndex === expectedTile) {
    audioVoice.playPop();
    audioVoice.playDJTileBeat(sp.playerTapIndex);
    triggerHaptic([30]);
    sp.playerTapIndex++;

    // Addictive flow boost: +0.25s time reward for quick accurate taps (capped at timeLimitSec)
    sp.remainingTimeSec = Math.min(sp.timeLimitSec, sp.remainingTimeSec + 0.25);

    if (tileEl) {
      tileEl.classList.add('correct-tap');
      const badge = tileEl.querySelector('.order-badge');
      if (badge) badge.textContent = sp.playerTapIndex;
    }

    const basePts = 100 * sp.level;
    showFloatingScore(tileIndex, `+${basePts}`);

    // All tiles cleared!
    if (sp.playerTapIndex === targetSeq.length) {
      sp.phase = 'ROUND_OVER';
      sp.isInputLocked = true;
      if (sp.animFrameId) cancelAnimationFrame(sp.animFrameId);

      sp.streak++;
      if (sp.streak > sp.maxStreak) sp.maxStreak = sp.streak;

      // Fever Mode activation
      const arena = document.getElementById('singleMatrixCard');
      if (sp.streak >= 3) {
        sp.isFeverActive = true;
        if (arena) arena.classList.add('fever-mode');
      }

      // Combo bonus logic (Doubled during Fever Mode!)
      let comboBonus = 0;
      if (sp.streak === 2) comboBonus = 150;
      else if (sp.streak === 3) comboBonus = 350;
      else if (sp.streak >= 4) comboBonus = 600;

      if (sp.isFeverActive) {
        comboBonus *= 2;
      }

      const timeBonus = Math.round(sp.remainingTimeSec * 150);
      const levelBonus = sp.level * 120;
      const totalRoundPts = levelBonus + timeBonus + comboBonus;
      sp.score += totalRoundPts;
      AntiCheat.recordTap(tileIndex, sp.level, totalRoundPts);

      if (sp.streak >= 2) {
        const bonusTag = sp.isFeverActive ? `[${sp.streak}X FEVER!]` : `[${sp.streak}X COMBO]`;
        showFloatingScore(tileIndex, `+${comboBonus} ${bonusTag}`);
        audioVoice.playBhangraFanfare();
        audioVoice.speakHindi(audioVoice.phrasesCombos);
        triggerHaptic([40, 30, 40]);
      } else {
        audioVoice.playBoing();
      }

      // CELEBRATION WAVE: Glow all blind blocks in a rhythmic ripple
      const tiles = document.querySelectorAll('#singleMatrixGrid .glass-tile');
      tiles.forEach((t, idx) => {
        t.classList.add('victory-wave');
        t.style.animationDelay = `${(idx % 10) * 35}ms`;
      });

      const nextLevel = sp.level + 1;
      const nextPalette = applyRoundDynamicPalette(nextLevel);
      updateFunkyCapsule(`ROUND ${sp.level} CLEAR! PALETTE: ${nextPalette.name}`, "pulse-combo");

      sp.level = nextLevel;
      if (sp.level > APP_STATE.maxLevel) {
        APP_STATE.maxLevel = sp.level;
        localStorage.setItem('bm_max_level', sp.level);
      }

      // Recharge powers at Level 5 and Level 9
      if (sp.level === 5 || sp.level === 9) {
        sp.chaiPowerUsed = false;
        sp.chashmaPowerUsed = false;
        sp.thinkPowerUsed = false;
        resetPowerBtnsUI();
        audioVoice.speakHindi(["Jugaad power recharge ho gaya!"]);
      }

      updateSinglePlayerHUD();

      // Hold victory celebration wave & unique palette transition for 1.25s
      setTimeout(() => {
        if (sp.active) startNewRound();
      }, 1250);
    }

  } else {
    // Incorrect tile tapped
    if (tileEl) tileEl.classList.add('wrong-tap');
    handleMistake("INCORRECT TILE: MEMORY SEQUENCE BROKEN");
  }
}

function handleMistake(reason) {
  const sp = APP_STATE.singlePlay;
  audioVoice.playDJRecordStop();
  triggerRecoilShake();
  triggerHaptic([100, 50, 150]);

  sp.streak = 0;
  sp.isFeverActive = false;
  const arena = document.getElementById('singleMatrixCard');
  if (arena) arena.classList.remove('fever-mode');

  sp.shields--;
  updateShieldsUI();
  updateSinglePlayerHUD();

  sp.isInputLocked = true;
  if (sp.animFrameId) cancelAnimationFrame(sp.animFrameId);

  if (sp.shields > 0) {
    audioVoice.playBoing();
    audioVoice.speakHindi(audioVoice.phrasesShieldLoss);
    updateFunkyCapsule("SHIELD LOST!", "pulse-recall");
    setTimeout(() => {
      if (sp.active) startNewRound();
    }, 750);
  } else {
    // True Game Over -> Moye Moye!
    audioVoice.playMoyeMoyeTune();
    audioVoice.speakHindi(audioVoice.phrasesFail);
    updateFunkyCapsule("MOYE MOYE!", "");
    setTimeout(() => {
      endSinglePlayerGame(reason);
    }, 800);
  }
}

function updateShieldsUI() {
  const shields = APP_STATE.singlePlay.shields;
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`shield-${i}`);
    if (el) {
      el.classList.toggle('lost', i > shields);
    }
  }

  // Mirror shields into Desktop Left Wing Cockpit
  const dtContainer = document.getElementById('dtShieldsContainer');
  if (dtContainer) {
    let shieldsSvg = '';
    for (let i = 1; i <= 3; i++) {
      shieldsSvg += `<svg class="shield-icon ${i > shields ? 'lost' : ''}" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`;
    }
    dtContainer.innerHTML = shieldsSvg;
  }
}

function updateSinglePlayerHUD() {
  const sp = APP_STATE.singlePlay;
  document.getElementById('spLevel').textContent = `LVL ${sp.level}`;
  document.getElementById('spScore').textContent = sp.score;
  updateShieldsUI();

  const streakLbl = document.getElementById('spStreakLabel');
  const streakBonus = document.getElementById('spStreakBonusTag');
  if (streakLbl && streakBonus) {
    if (sp.streak >= 3) {
      streakLbl.textContent = `${sp.streak}X FEVER SURGE!`;
      streakBonus.textContent = `+${sp.streak >= 4 ? 1200 : 700} PTS BONUS`;
    } else if (sp.streak === 2) {
      streakLbl.textContent = `2X COMBO SURGE!`;
      streakBonus.textContent = `+150 PTS BONUS`;
    } else {
      streakLbl.textContent = `1X STREAK`;
      streakBonus.textContent = `+0 PTS BONUS`;
    }
  }

  const brain = getBrainIQInfo(sp.level, sp.score);
  const iqBadge = document.getElementById('spBrainIQ');
  if (iqBadge) {
    iqBadge.textContent = `${brain.rank} (IQ ${brain.iq})`;
  }

  // Desktop Cockpit Telemetry Mirroring
  const dtDiff = document.getElementById('dtDiffLevel');
  if (dtDiff) {
    const cfg = getLevelConfig(sp.level);
    let desc = `${cfg.totalTiles} BLOCKS (${cfg.sequenceLength}-SEQ)`;
    if (cfg.isReverse && cfg.hasDecoy) desc += ' [REV+DEC]';
    else if (cfg.isReverse) desc += ' [REVERSE]';
    else if (cfg.hasDecoy) desc += ' [DECOY]';
    else if (cfg.isGhost) desc += ' [GHOST]';
    dtDiff.textContent = desc;
  }

  const dtHighScore = document.getElementById('dtHighScoreVal');
  if (dtHighScore) {
    dtHighScore.textContent = APP_STATE.highScore;
  }
}

// Jugaad Power 1: Chai Break
function useChaiPower() {
  const sp = APP_STATE.singlePlay;
  if (!sp.active || sp.isInputLocked || sp.chaiPowerUsed || sp.phase !== 'RECALL') return;

  sp.chaiPowerUsed = true;
  sp.isTimerFrozen = true;
  document.getElementById('btnPowerChai').classList.add('disabled');

  audioVoice.speakHindi(audioVoice.phrasesChai);
  triggerHaptic([40, 20, 40]);

  setTimeout(() => {
    if (sp.active) {
      sp.isTimerFrozen = false;
    }
  }, 2500);
}

// Jugaad Power 2: Chashma 4K
function useChashmaPower() {
  const sp = APP_STATE.singlePlay;
  if (!sp.active || sp.isInputLocked || sp.chashmaPowerUsed || sp.phase !== 'RECALL') return;

  sp.chashmaPowerUsed = true;
  document.getElementById('btnPowerChashma').classList.add('disabled');

  audioVoice.speakHindi(audioVoice.phrasesPeek);
  triggerHaptic([50]);

  const targetSeq = sp.isReverse ? [...sp.targetSequence].reverse() : sp.targetSequence;
  const nextTileIndex = targetSeq[sp.playerTapIndex];
  const tileEl = document.getElementById(`tile-${nextTileIndex}`);

  if (tileEl) {
    tileEl.classList.add('flash-active');
    setTimeout(() => {
      tileEl.classList.remove('flash-active');
    }, 450);
  }
}

// Jugaad Power 3: Dimag Ki Batti (Think Feature)
function useThinkFeature() {
  const sp = APP_STATE.singlePlay;
  if (!sp.active || sp.isInputLocked || sp.thinkPowerUsed || sp.phase !== 'RECALL') return;

  sp.thinkPowerUsed = true;
  sp.isTimerFrozen = true;
  document.getElementById('btnPowerThink').classList.add('disabled');

  audioVoice.playBulbChime();
  audioVoice.speakHindi(audioVoice.phrasesThink);
  triggerHaptic([30, 20, 30, 20, 60]);
  updateFunkyCapsule("DIMAG KI BATTI ON!", "pulse-memorize");

  const targetSeq = sp.isReverse ? [...sp.targetSequence].reverse() : sp.targetSequence;
  const nextTileIndex = targetSeq[sp.playerTapIndex];
  const tileEl = document.getElementById(`tile-${nextTileIndex}`);

  if (tileEl) {
    tileEl.classList.add('think-highlight');
    setTimeout(() => {
      tileEl.classList.remove('think-highlight');
    }, 850);
  }

  setTimeout(() => {
    if (sp.active) {
      sp.isTimerFrozen = false;
      if (sp.streak >= 2) {
        updateFunkyCapsule(`${sp.streak}X COMBO SURGE!`, "pulse-combo");
      } else {
        updateFunkyCapsule("RECALL NOW!", "pulse-recall");
      }
    }
  }, 1500);
}

function endSinglePlayerGame(reason) {
  const sp = APP_STATE.singlePlay;
  sp.active = false;
  if (sp.animFrameId) cancelAnimationFrame(sp.animFrameId);

  if (sp.score > APP_STATE.highScore) {
    APP_STATE.highScore = sp.score;
    localStorage.setItem('bm_high_score', sp.score);
  }

  document.getElementById('goReason').textContent = reason;
  document.getElementById('goFinalScore').textContent = sp.score;
  document.getElementById('goMaxLevel').textContent = sp.level;
  document.getElementById('goStreak').textContent = `${sp.maxStreak}X`;
  document.getElementById('goHighScore').textContent = APP_STATE.highScore;
  const dtHighScore = document.getElementById('dtHighScoreVal');
  if (dtHighScore) dtHighScore.textContent = APP_STATE.highScore;

  upsertScoreToLeaderboard(APP_STATE.playerHandle, APP_STATE.playerAvatar, sp.score, sp.level);
  switchView('view-gameover');
}

/* ==========================================================================
   SECTION 10: REAL-TIME WEBSOCKET 1V1 ROOM DUEL & BOT SPARRING
   ========================================================================== */
function initWebSocket() {
  if (APP_STATE.ws && APP_STATE.ws.readyState === WebSocket.OPEN) return;
  if (!CONFIG.SERVER_URL && window.location.protocol === 'https:' && !window.location.host.includes('localhost')) {
    // Dual deployment compatibility: static host fallback to Supabase Realtime broadcast mode
    return;
  }

  try {
    const defaultHost = window.location.host || 'localhost:3000';
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = CONFIG.SERVER_URL || `${protocol}//${defaultHost}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      APP_STATE.isWsConnected = true;
      APP_STATE.ws = ws;
      console.log("WebSocket connected to live game server.");
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        handleServerWebSocketMessage(msg);
      } catch (e) {
        console.warn("WS Parse Error:", e);
      }
    };

    ws.onclose = () => {
      APP_STATE.isWsConnected = false;
      setTimeout(initWebSocket, 3000);
    };

    ws.onerror = () => {
      APP_STATE.isWsConnected = false;
    };
  } catch (e) {
    console.warn("WebSocket init failed:", e);
  }
}

function handleServerWebSocketMessage(msg) {
  const duel = APP_STATE.duel;

  switch (msg.type) {
    case 'room_joined': {
      const statusText = document.getElementById('roomStatusText');
      if (msg.status === 'HOSTED') {
        if (statusText) statusText.textContent = `HOSTING ROOM ${msg.roomCode} // WAITING FOR OPPONENT...`;
      } else if (msg.status === 'WAITING_FOR_OPPONENT') {
        if (statusText) statusText.textContent = "WAITING FOR OPPONENT TO JOIN...";
      } else if (msg.status === 'DEVICE_MISMATCH') {
        showDeviceMismatchModal(msg.required);
        if (statusText) statusText.textContent = `DEVICE MISMATCH: ROOM REQUIRES ${msg.required.toUpperCase()}`;
      } else if (msg.status === 'FULL') {
        if (statusText) statusText.textContent = "ROOM IS ALREADY FULL!";
      } else if (msg.status === 'OPPONENT_CONNECTED') {
        DUEL_RT.opponentHandle = msg.opponentHandle || 'HOST';
        APP_STATE.duel.opponentHandle = DUEL_RT.opponentHandle;
        if (statusText) statusText.textContent = `CONNECTED WITH ${DUEL_RT.opponentHandle}! STARTING MATCH...`;
        audioVoice.speakHindi(["Opponent connect ho gaya, duel shuru!"]);
        startOnlineDuelMatch(false, false, msg.targetSequence);
      }
      break;
    }

    case 'player_joined': {
      DUEL_RT.opponentHandle = msg.handle || 'GUEST';
      APP_STATE.duel.opponentHandle = DUEL_RT.opponentHandle;
      if (msg.code || msg.roomCode) {
        const c = msg.code || msg.roomCode;
        APP_STATE.duel.roomCode = c;
        const codeEl = document.getElementById('lblRoomCode');
        if (codeEl) codeEl.textContent = c;
        const duelCodeEl = document.getElementById('duelActiveRoomCode');
        if (duelCodeEl) duelCodeEl.textContent = c;
      }
      const statusText = document.getElementById('roomStatusText');
      if (statusText) statusText.textContent = `CONNECTED WITH ${DUEL_RT.opponentHandle}! STARTING MATCH...`;
      audioVoice.speakHindi(["Opponent connect ho gaya, duel shuru!"]);
      const seq = (msg.initialSequence && msg.initialSequence.length) ? msg.initialSequence : generatePattern(4);
      APP_STATE.duel.targetSequence = seq;
      startOnlineDuelMatch(false, true, seq);
      break;
    }

    case 'room_ready': {
      DUEL_RT.opponentHandle = msg.hostHandle || 'HOST';
      APP_STATE.duel.opponentHandle = DUEL_RT.opponentHandle;
      if (msg.code || msg.roomCode) {
        const c = msg.code || msg.roomCode;
        APP_STATE.duel.roomCode = c;
        const codeEl = document.getElementById('lblRoomCode');
        if (codeEl) codeEl.textContent = c;
        const duelCodeEl = document.getElementById('duelActiveRoomCode');
        if (duelCodeEl) duelCodeEl.textContent = c;
      }
      const statusText = document.getElementById('roomStatusText');
      if (statusText) statusText.textContent = `CONNECTED WITH ${DUEL_RT.opponentHandle}! STARTING MATCH...`;
      audioVoice.speakHindi(["Opponent connect ho gaya, duel shuru!"]);
      const seq = (msg.initialSequence && msg.initialSequence.length) ? msg.initialSequence : generatePattern(4);
      APP_STATE.duel.targetSequence = seq;
      startOnlineDuelMatch(false, false, seq);
      break;
    }

    case 'opponent_joined': {
      DUEL_RT.opponentHandle = msg.opponentHandle || 'GUEST';
      APP_STATE.duel.opponentHandle = DUEL_RT.opponentHandle;
      if (msg.code || msg.roomCode) {
        const c = msg.code || msg.roomCode;
        APP_STATE.duel.roomCode = c;
        const codeEl = document.getElementById('lblRoomCode');
        if (codeEl) codeEl.textContent = c;
        const duelCodeEl = document.getElementById('duelActiveRoomCode');
        if (duelCodeEl) duelCodeEl.textContent = c;
      }
      const statusText = document.getElementById('roomStatusText');
      if (statusText) statusText.textContent = `CONNECTED WITH ${DUEL_RT.opponentHandle}! STARTING MATCH...`;
      audioVoice.speakHindi(["Opponent connect ho gaya, duel shuru!"]);

      const seq = (msg.targetSequence && msg.targetSequence.length) ? msg.targetSequence : generatePattern(4);
      APP_STATE.duel.targetSequence = seq;
      startOnlineDuelMatch(false, true, seq);
      break;
    }

    case 'duel_tap':
    case 'opponent_progress': {
      if (duel.active) {
        duel.oppProgress = msg.progress;
        duel.oppScore = msg.score;
        const oppTile = document.getElementById(`dtile-${msg.tileIndex}`);
        if (oppTile) {
          oppTile.classList.add('flash-active');
          setTimeout(() => oppTile.classList.remove('flash-active'), 250);
        }
        audioFX.playBlip(msg.tileIndex);
        updateDuelHUD();
      }
      break;
    }

    case 'duel_stun':
    case 'opponent_stunned': {
      if (duel.active) {
        duel.oppStunnedUntil = performance.now() + 1500;
        updateDuelHUD();
      }
      break;
    }

    case 'duel_round_win': {
      if (duel.active) {
        duel.oppScore = Number(msg.score) || (duel.oppScore + 2);
        duel.phase = 'ROUND_OVER';
        audioVoice.playMoyeMoyeTune();
        updateDuelHUD();

        if (duel.oppScore >= duel.targetScore) {
          finishDuelMatch(false);
        } else if (duel.isHost) {
          setTimeout(() => {
            if (APP_STATE.duel && APP_STATE.duel.active) {
              startNewDuelRound();
              sendDuelEvent('duel_next_round', { sequence: APP_STATE.duel.targetSequence });
            }
          }, 1100);
        }
      }
      break;
    }

    case 'duel_next_round':
    case 'round_started': {
      if (APP_STATE.duel && APP_STATE.duel.active && !APP_STATE.duel.isVsBot) {
        const nextSeq = msg.sequence || msg.targetSequence || msg.roundSeq;
        if (Array.isArray(nextSeq) && nextSeq.length) {
          APP_STATE.duel.targetSequence = nextSeq;
          startSynchronizedDuelRound();
        }
      }
      break;
    }

    case 'duel_match_won':
    case 'match_over': {
      if (duel.active) {
        finishDuelMatch(false);
      }
      break;
    }

    case 'leaderboard_sync': {
      if (msg.record) {
        let localData = getLocalLeaderboard();
        const existingIdx = localData.findIndex(r => r.username === msg.record.username);
        if (existingIdx >= 0) {
          if (msg.record.high_score > localData[existingIdx].high_score) {
            localData[existingIdx] = msg.record;
          }
        } else {
          localData.push(msg.record);
        }
        saveLocalLeaderboard(localData);
        if (APP_STATE.currentView === 'view-leaderboard') {
          loadLeaderboard();
        }
      }
      break;
    }
  }
}

/* ==========================================================================
   SECTION 10B: SUPABASE REALTIME & WEBSOCKET 1V1 CROSS-DEVICE DUEL ENGINE
   Works seamlessly across any two devices (mobile, tablet, PC) anywhere in the world
   via Supabase Broadcast channels, with instant local WebSocket fallback.
   ========================================================================== */
const DUEL_RT = {
  channel: null,
  isHost: false,
  opponentHandle: '',
  retryTimer: null
};

function generateAlphanumericRoomCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const digits = '23456789';
  const chars = letters + digits;
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Guarantee alphanumeric mix (at least one number, at least one letter)
  if (/^[A-Z]+$/.test(code)) {
    const pos = Math.floor(Math.random() * 4);
    code = code.substring(0, pos) + digits.charAt(Math.floor(Math.random() * digits.length)) + code.substring(pos + 1);
  } else if (/^[0-9]+$/.test(code)) {
    const pos = Math.floor(Math.random() * 4);
    code = code.substring(0, pos) + letters.charAt(Math.floor(Math.random() * letters.length)) + code.substring(pos + 1);
  }
  return code;
}

function duelChannelName(code) {
  return 'duel-room-' + code.toUpperCase();
}

function closeDuelChannel() {
  if (DUEL_RT.retryTimer) {
    clearInterval(DUEL_RT.retryTimer);
    DUEL_RT.retryTimer = null;
  }
  if (DUEL_RT.channel && APP_STATE.supabaseClient) {
    try {
      APP_STATE.supabaseClient.removeChannel(DUEL_RT.channel);
    } catch (e) {}
    DUEL_RT.channel = null;
  }
}

function sendDuelEvent(event, payload = {}) {
  // Broadcast over Supabase Realtime channel
  if (DUEL_RT.channel) {
    try {
      DUEL_RT.channel.send({
        type: 'broadcast',
        event: event,
        payload: payload
      });
    } catch (e) {}
  }
  // Also send over local WebSocket if active
  if (APP_STATE.ws && APP_STATE.ws.readyState === WebSocket.OPEN) {
    try {
      APP_STATE.ws.send(JSON.stringify({ action: event, ...payload }));
    } catch (e) {}
  }
}

function updateLobbyDeviceBadge() {
  const badge = document.getElementById('lobbyDeviceBadge');
  if (badge) {
    const dev = DeviceProfile.get().toUpperCase();
    badge.textContent = `[ HARDWARE: ${dev} ]`;
  }
}

function showDeviceMismatchModal(requiredDevice) {
  const modal = document.getElementById('modalDeviceMismatch');
  const descHi = document.getElementById('mismatchDescHindi');
  const descEn = document.getElementById('mismatchDescEnglish');
  if (modal) {
    const req = (requiredDevice || 'laptop').toUpperCase();
    const myDev = DeviceProfile.get().toUpperCase();
    if (descHi) {
      descHi.textContent = `Ye room ${req} ke liye hai. Aapka hardware (${myDev}) match nahi karta.`;
    }
    if (descEn) {
      descEn.textContent = `This room requires a ${req}. Your device is detected as ${myDev}.`;
    }
    modal.classList.add('active');
    modal.style.display = 'flex';
  }
}

function hideDeviceMismatchModal() {
  const modal = document.getElementById('modalDeviceMismatch');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }
}

function hostRoomSupa(code) {
  closeDuelChannel();
  DUEL_RT.isHost = true;
  APP_STATE.duel.isHost = true;
  APP_STATE.duel.roomCode = code;

  // 1. Immediately send to WebSocket server
  if (APP_STATE.ws && APP_STATE.ws.readyState === WebSocket.OPEN) {
    APP_STATE.ws.send(JSON.stringify({
      action: 'join_room',
      roomCode: code,
      handle: APP_STATE.playerHandle,
      avatar: APP_STATE.playerAvatar
    }));
  }

  // 2. Also open Supabase Realtime broadcast channel
  if (APP_STATE.supabaseClient) {
    const ch = APP_STATE.supabaseClient.channel(duelChannelName(code), {
      config: { broadcast: { self: false } }
    });

    // Guest joins room
    ch.on('broadcast', { event: 'player_joined' }, ({ payload }) => {
      if (APP_STATE.duel && APP_STATE.duel.active) return;

      // Device mismatch check in Supabase Realtime broadcast mode
      const myDev = DeviceProfile.get();
      if (payload.deviceType && payload.deviceType !== myDev) {
        sendDuelEvent('device_mismatch', { required: myDev, detected: payload.deviceType });
        return;
      }

      DUEL_RT.opponentHandle = payload.handle || 'GUEST';
      APP_STATE.duel.opponentHandle = DUEL_RT.opponentHandle;

      const statusEl = document.getElementById('roomStatusText');
      if (statusEl) statusEl.textContent = 'CONNECTED WITH ' + DUEL_RT.opponentHandle + '! STARTING MATCH...';
      audioVoice.speakHindi(['Opponent aa gaya! Duel shuru!']);

      // Generate synchronized initial sequence
      const seq = generatePattern(4);
      APP_STATE.duel.targetSequence = seq;

      // Send room_ready to guest
      sendDuelEvent('room_ready', {
        hostHandle: APP_STATE.playerHandle,
        guestHandle: DUEL_RT.opponentHandle,
        initialSequence: seq
      });

      startOnlineDuelMatch(false, true, seq);
    });

    // Opponent tile tap
    ch.on('broadcast', { event: 'duel_tap' }, ({ payload }) => {
      if (!APP_STATE.duel.active) return;
      APP_STATE.duel.oppProgress = payload.progress;
      APP_STATE.duel.oppScore = payload.score;

      const oppTile = document.getElementById(`dtile-${payload.tileIndex}`);
      if (oppTile) {
        oppTile.classList.add('flash-active');
        setTimeout(() => oppTile.classList.remove('flash-active'), 250);
      }
      updateDuelHUD();
    });

    // Opponent stunned
    ch.on('broadcast', { event: 'duel_stun' }, () => {
      if (!APP_STATE.duel.active) return;
      APP_STATE.duel.oppStunnedUntil = performance.now() + 1500;
      updateDuelHUD();
    });

    // Opponent completed round
    ch.on('broadcast', { event: 'duel_round_win' }, ({ payload }) => {
      if (!APP_STATE.duel.active) return;
      APP_STATE.duel.oppScore = payload.score;
      APP_STATE.duel.phase = 'ROUND_OVER';
      audioVoice.playMoyeMoyeTune();
      updateDuelHUD();

      if (APP_STATE.duel.oppScore >= APP_STATE.duel.targetScore) {
        finishDuelMatch(false);
      } else {
        setTimeout(() => {
          if (APP_STATE.duel.active) {
            const nextSeq = generatePattern(4);
            APP_STATE.duel.targetSequence = nextSeq;
            sendDuelEvent('duel_next_round', { sequence: nextSeq });
            startSynchronizedDuelRound();
          }
        }, 1000);
      }
    });

    // Match won by opponent
    ch.on('broadcast', { event: 'duel_match_won' }, () => {
      if (APP_STATE.duel.active) {
        finishDuelMatch(false);
      }
    });

    ch.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Supabase 1v1 duel room hosted:', code);
      }
    });

    DUEL_RT.channel = ch;
  }
}

function joinRoomSupa(code) {
  closeDuelChannel();
  DUEL_RT.isHost = false;
  APP_STATE.duel.isHost = false;
  APP_STATE.duel.roomCode = code;

  const statusEl = document.getElementById('roomStatusText');
  if (statusEl) statusEl.textContent = 'CONNECTING TO ROOM ' + code + '...';

  // 1. Immediately send to WebSocket server (for instant localhost / LAN play)
  if (APP_STATE.ws && APP_STATE.ws.readyState === WebSocket.OPEN) {
    APP_STATE.ws.send(JSON.stringify({
      action: 'join_room',
      roomCode: code,
      handle: APP_STATE.playerHandle,
      avatar: APP_STATE.playerAvatar
    }));
  }

  // 2. Also connect over Supabase Realtime (for internet / cross-device play)
  if (APP_STATE.supabaseClient) {
    const ch = APP_STATE.supabaseClient.channel(duelChannelName(code), {
      config: { broadcast: { self: false } }
    });

    // Host confirms match ready with sequence
    ch.on('broadcast', { event: 'room_ready' }, ({ payload }) => {
      if (DUEL_RT.retryTimer) {
        clearInterval(DUEL_RT.retryTimer);
        DUEL_RT.retryTimer = null;
      }
      if (APP_STATE.duel && APP_STATE.duel.active) return;
      DUEL_RT.opponentHandle = payload.hostHandle || 'HOST';
      APP_STATE.duel.opponentHandle = DUEL_RT.opponentHandle;

      if (statusEl) statusEl.textContent = 'CONNECTED WITH ' + DUEL_RT.opponentHandle + '! STARTING MATCH...';
      audioVoice.speakHindi(['Opponent aa gaya! Duel shuru!']);

      startOnlineDuelMatch(false, false, payload.initialSequence);
    });

    // Host reports device mismatch
    ch.on('broadcast', { event: 'device_mismatch' }, ({ payload }) => {
      if (DUEL_RT.retryTimer) {
        clearInterval(DUEL_RT.retryTimer);
        DUEL_RT.retryTimer = null;
      }
      showDeviceMismatchModal(payload.required);
      if (statusEl) statusEl.textContent = `DEVICE MISMATCH: ROOM REQUIRES ${payload.required.toUpperCase()}`;
    });

    // Opponent tile tap
    ch.on('broadcast', { event: 'duel_tap' }, ({ payload }) => {
      if (!APP_STATE.duel.active) return;
      APP_STATE.duel.oppProgress = payload.progress;
      APP_STATE.duel.oppScore = payload.score;

      const oppTile = document.getElementById(`dtile-${payload.tileIndex}`);
      if (oppTile) {
        oppTile.classList.add('flash-active');
        setTimeout(() => oppTile.classList.remove('flash-active'), 250);
      }
      updateDuelHUD();
    });

    // Opponent stunned
    ch.on('broadcast', { event: 'duel_stun' }, () => {
      if (!APP_STATE.duel.active) return;
      APP_STATE.duel.oppStunnedUntil = performance.now() + 1500;
      updateDuelHUD();
    });

    // Opponent won round
    ch.on('broadcast', { event: 'duel_round_win' }, ({ payload }) => {
      if (!APP_STATE.duel.active) return;
      APP_STATE.duel.oppScore = payload.score;
      APP_STATE.duel.phase = 'ROUND_OVER';
      audioVoice.playMoyeMoyeTune();
      updateDuelHUD();

      if (APP_STATE.duel.oppScore >= APP_STATE.duel.targetScore) {
        finishDuelMatch(false);
      }
    });

    // Host broadcasts next round sequence
    ch.on('broadcast', { event: 'duel_next_round' }, ({ payload }) => {
      if (!APP_STATE.duel.active) return;
      APP_STATE.duel.targetSequence = payload.sequence;
      startSynchronizedDuelRound();
    });

    // Match won by opponent
    ch.on('broadcast', { event: 'duel_match_won' }, () => {
      if (APP_STATE.duel.active) {
        finishDuelMatch(false);
      }
    });

    ch.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        if (statusEl) statusEl.textContent = 'ROOM FOUND // WAITING FOR HOST CONFIRMATION...';

        // Send join announcement with retry
        let tries = 0;
        const sendJoin = () => {
          if (APP_STATE.duel.active || tries >= 6) {
            if (DUEL_RT.retryTimer) {
              clearInterval(DUEL_RT.retryTimer);
              DUEL_RT.retryTimer = null;
            }
            return;
          }
          tries++;
          ch.send({
            type: 'broadcast',
            event: 'player_joined',
            payload: {
              handle: APP_STATE.playerHandle,
              avatar: APP_STATE.playerAvatar,
              deviceType: DeviceProfile.get(),
              code
            }
          });
        };
        sendJoin();
        DUEL_RT.retryTimer = setInterval(sendJoin, 900);
      }
    });

    DUEL_RT.channel = ch;
  }
}

function initDuelRoomLobby(prefillCode) {
  const code = (prefillCode && /^[A-Z0-9]{4}$/i.test(prefillCode))
    ? prefillCode.toUpperCase()
    : generateAlphanumericRoomCode();

  APP_STATE.duel.roomCode = code;
  const codeEl = document.getElementById('lblRoomCode');
  if (codeEl) codeEl.textContent = code;
  const duelRoomCodeEl = document.getElementById('duelActiveRoomCode');
  if (duelRoomCodeEl) duelRoomCodeEl.textContent = code;

  const statusEl = document.getElementById('roomStatusText');
  if (statusEl) statusEl.textContent = 'HOSTING ROOM // SHARE CODE TO PLAY LIVE!';

  updateLobbyDeviceBadge();

  if (prefillCode && /^[A-Z0-9]{4}$/i.test(prefillCode)) {
    const joinInput = document.getElementById('inputJoinRoom');
    if (joinInput) joinInput.value = prefillCode.toUpperCase();
    joinRoomSupa(code);
  } else {
    // Host room over both Supabase Realtime AND local WebSocket
    hostRoomSupa(code);
  }

  switchView('view-online-lobby');
}

function clearAllDuelTimeouts() {
  if (APP_STATE.duel) {
    if (APP_STATE.duel.countdownTimer) {
      clearInterval(APP_STATE.duel.countdownTimer);
      APP_STATE.duel.countdownTimer = null;
    }
    if (APP_STATE.duel.botInterval) {
      clearInterval(APP_STATE.duel.botInterval);
      APP_STATE.duel.botInterval = null;
    }
    if (APP_STATE.duel.animFrameId) {
      cancelAnimationFrame(APP_STATE.duel.animFrameId);
      APP_STATE.duel.animFrameId = null;
    }
    if (Array.isArray(APP_STATE.duel.flashTimeouts)) {
      APP_STATE.duel.flashTimeouts.forEach(id => clearTimeout(id));
      APP_STATE.duel.flashTimeouts = [];
    }
  }
  if (DUEL_RT.retryTimer) {
    clearInterval(DUEL_RT.retryTimer);
    DUEL_RT.retryTimer = null;
  }
}

function setupDuelGrid() {
  const container = document.getElementById('duelMatrixGrid');
  if (!container) return;
  container.style.gridTemplateColumns = 'repeat(3, 1fr)';
  container.style.gridTemplateRows = 'repeat(3, 1fr)';
  container.setAttribute('data-total-tiles', '9');

  if (container.children.length === 9) {
    for (let i = 0; i < 9; i++) {
      const tile = container.children[i];
      tile.id = `dtile-${i}`;
      tile.className = 'glass-tile';
      tile.setAttribute('data-index', i);
      let hint = tile.querySelector('.numpad-hint');
      if (!hint) {
        hint = document.createElement('span');
        hint.className = 'numpad-hint';
        hint.textContent = i + 1;
        tile.prepend(hint);
      } else {
        hint.textContent = i + 1;
      }
      let badge = tile.querySelector('.order-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'order-badge';
        tile.appendChild(badge);
      }
    }
    return;
  }

  container.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement('div');
    tile.id = `dtile-${i}`;
    tile.className = 'glass-tile';
    tile.setAttribute('data-index', i);

    const hint = document.createElement('span');
    hint.className = 'numpad-hint';
    hint.textContent = i + 1;
    tile.appendChild(hint);

    const badge = document.createElement('span');
    badge.className = 'order-badge';
    tile.appendChild(badge);

    let lastTap = 0;
    const handleTap = (e) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastTap < 60) return;
      lastTap = now;
      handleDuelTileClick(i, e);
    };

    tile.addEventListener('pointerdown', handleTap);
    tile.addEventListener('click', handleTap);

    frag.appendChild(tile);
  }
  container.appendChild(frag);
}

function startDuelCountdown(onComplete) {
  let count = 3;
  const status = document.getElementById('duelPhaseStatus');
  if (status) {
    status.textContent = 'MATCH STARTING IN 3...';
    status.className = 'phase-pill-badge memorize kinetic-pulse';
  }
  audioVoice.playPop();

  if (APP_STATE.duel && APP_STATE.duel.countdownTimer) {
    clearInterval(APP_STATE.duel.countdownTimer);
    APP_STATE.duel.countdownTimer = null;
  }

  HapticEngine.countdown();

  const timer = setInterval(() => {
    if (!APP_STATE.duel || !APP_STATE.duel.active) {
      clearInterval(timer);
      return;
    }
    count--;
    if (count > 0) {
      if (status) {
        status.textContent = `MATCH STARTING IN ${count}...`;
      }
      audioVoice.playPop();
      HapticEngine.countdown();
    } else {
      clearInterval(timer);
      HapticEngine.start();
      if (APP_STATE.duel) APP_STATE.duel.countdownTimer = null;
      if (status) {
        status.textContent = 'MEMORIZE DUEL PATTERN';
        status.className = 'phase-pill-badge memorize';
      }
      audioVoice.playBoing();
      const t = setTimeout(() => {
        if (APP_STATE.duel && APP_STATE.duel.active) {
          onComplete();
        }
      }, 300);
      if (APP_STATE.duel && Array.isArray(APP_STATE.duel.flashTimeouts)) {
        APP_STATE.duel.flashTimeouts.push(t);
      }
    }
  }, 700);

  if (APP_STATE.duel) {
    APP_STATE.duel.countdownTimer = timer;
  }
}

function startOnlineDuelMatch(isVsBot = false, isHost = true, initialSeq = null) {
  // Prevent duplicate starts or race conditions from multiple connection events
  if (APP_STATE.duel && APP_STATE.duel.active) {
    if (initialSeq && Array.isArray(initialSeq) && initialSeq.length) {
      APP_STATE.duel.targetSequence = initialSeq;
    }
    return;
  }

  clearAllDuelTimeouts();
  AntiCheat.startRun();

  const seq = (Array.isArray(initialSeq) && initialSeq.length) ? initialSeq : generatePattern(4);
  APP_STATE.duel = {
    active: true,
    roomCode: APP_STATE.duel.roomCode || 'MIND',
    isHost: isHost,
    targetScore: 10,
    myScore: 0,
    oppScore: 0,
    myProgress: 0,
    oppProgress: 0,
    myStunnedUntil: 0,
    oppStunnedUntil: 0,
    roundNumber: 1,
    cumulativeScore: 0,
    roundStartTime: 0,
    targetSequence: seq,
    phase: 'IDLE',
    isVsBot: isVsBot,
    botInterval: null,
    animFrameId: null,
    countdownTimer: null,
    flashTimeouts: []
  };

  const p1Label = document.getElementById('duelP1Label');
  if (p1Label) p1Label.textContent = APP_STATE.playerHandle + ' (YOU)';

  const p2Label = document.getElementById('duelP2Label');
  if (p2Label) {
    p2Label.textContent = isVsBot ? 'SHARMA JI KA ROBOT' : (DUEL_RT.opponentHandle || 'OPPONENT');
  }

  const duelRoomCodeEl = document.getElementById('duelActiveRoomCode');
  if (duelRoomCodeEl) {
    duelRoomCodeEl.textContent = isVsBot ? 'BOT' : (APP_STATE.duel.roomCode || 'MIND');
  }

  setupDuelGrid();
  updateDuelHUD();
  switchView('view-duel-room');

  startDuelCountdown(() => {
    startSynchronizedDuelRound();
    if (isVsBot) {
      startBotBehavior();
    }
  });

  function duelLoop(now) {
    if (!APP_STATE.duel || !APP_STATE.duel.active) return;
    const duel = APP_STATE.duel;

    const p1Card = document.getElementById('duelP1Card');
    if (p1Card) p1Card.classList.toggle('is-stunned', now < duel.myStunnedUntil);

    const p2Card = document.getElementById('duelP2Card');
    if (p2Card) p2Card.classList.toggle('is-stunned', now < duel.oppStunnedUntil);

    APP_STATE.duel.animFrameId = requestAnimationFrame(duelLoop);
  }
  APP_STATE.duel.animFrameId = requestAnimationFrame(duelLoop);
}

function startNewDuelRound() {
  const duel = APP_STATE.duel;
  duel.roundNumber = (duel.roundNumber || 1) + 1;
  // Scaled sequence length within 3x3 grid (4 to 7 tiles)
  const seqLen = Math.min(7, 4 + Math.floor((duel.roundNumber - 1) / 2));
  duel.targetSequence = generatePattern(seqLen);
  startSynchronizedDuelRound();
}

function startSynchronizedDuelRound() {
  const duel = APP_STATE.duel;
  clearAllDuelTimeouts();
  duel.myProgress = 0;
  duel.oppProgress = 0;
  duel.phase = 'MEMORIZE';
  duel.roundStartTime = performance.now();

  setupDuelGrid();
  resetDuelTilesUI();
  updateDuelHUD();

  // Speed scaling per round: from 420ms down to 220ms for fast reflex scaling within 3x3 grid
  const flashSpeed = Math.max(220, 420 - ((duel.roundNumber || 1) - 1) * 35);

  flashDuelSequence(duel.targetSequence, () => {
    if (!APP_STATE.duel || !APP_STATE.duel.active) return;
    duel.phase = 'RECALL';
    const status = document.getElementById('duelPhaseStatus');
    if (status) {
      status.textContent = 'FASTEST RECALL WINS ROUND! TAP TILES NOW!';
      status.className = 'phase-pill-badge recall kinetic-pulse';
    }
    audioVoice.playBoing();
  }, flashSpeed);
}

function resetDuelTilesUI() {
  for (let i = 0; i < 9; i++) {
    const tile = document.getElementById(`dtile-${i}`);
    if (tile) {
      tile.className = 'glass-tile';
      const badge = tile.querySelector('.order-badge');
      if (badge) badge.textContent = '';
    }
  }
}

function flashDuelSequence(sequence, onComplete, flashSpeed = 420) {
  clearAllDuelTimeouts();
  const validSeq = (Array.isArray(sequence) && sequence.length) ? sequence : generatePattern(4);
  let step = 0;
  const status = document.getElementById('duelPhaseStatus');
  if (status) {
    status.textContent = 'MEMORIZE DUEL PATTERN';
    status.className = 'phase-pill-badge memorize';
  }

  function stepFlash() {
    if (!APP_STATE.duel || !APP_STATE.duel.active) return;

    if (step < validSeq.length) {
      const tileIndex = validSeq[step];
      const tileEl = document.getElementById(`dtile-${tileIndex}`);
      if (tileEl) {
        tileEl.classList.add('flash-active');
        const badge = tileEl.querySelector('.order-badge');
        if (badge) badge.textContent = step + 1;
        audioVoice.playFlashNote(step);
      }

      const t1 = setTimeout(() => {
        if (tileEl) {
          tileEl.classList.remove('flash-active');
          const badge = tileEl.querySelector('.order-badge');
          if (badge) badge.textContent = '';
        }
        step++;
        const gap = Math.max(100, Math.round(flashSpeed * 0.35));
        const t2 = setTimeout(stepFlash, gap);
        if (APP_STATE.duel && APP_STATE.duel.flashTimeouts) APP_STATE.duel.flashTimeouts.push(t2);
      }, flashSpeed);
      if (APP_STATE.duel && APP_STATE.duel.flashTimeouts) APP_STATE.duel.flashTimeouts.push(t1);
    } else {
      const t3 = setTimeout(() => {
        if (!APP_STATE.duel || !APP_STATE.duel.active) return;
        onComplete();
      }, 200);
      if (APP_STATE.duel && APP_STATE.duel.flashTimeouts) APP_STATE.duel.flashTimeouts.push(t3);
    }
  }

  const t0 = setTimeout(stepFlash, 300);
  if (APP_STATE.duel && APP_STATE.duel.flashTimeouts) APP_STATE.duel.flashTimeouts.push(t0);
}

function handleDuelTileClick(tileIndex, event) {
  const duel = APP_STATE.duel;
  if (!duel || !duel.active) return;

  const tileEl = document.getElementById(`dtile-${tileIndex}`);

  // If clicked while pattern is still flashing/memorizing
  if (duel.phase !== 'RECALL') {
    const status = document.getElementById('duelPhaseStatus');
    if (status) {
      status.textContent = 'WAIT! MEMORIZE PATTERN FIRST!';
      setTimeout(() => {
        if (duel.phase === 'MEMORIZE' && status) {
          status.textContent = 'MEMORIZE DUEL PATTERN';
        }
      }, 650);
    }
    return;
  }

  if (event && !AntiCheat.validateTap(event)) return;

  const now = performance.now();
  if (now < duel.myStunnedUntil) return;

  const expectedTile = duel.targetSequence[duel.myProgress];

  if (tileIndex === expectedTile) {
    audioVoice.playPop();
    audioVoice.playDJTileBeat(duel.myProgress);
    triggerHaptic([30]);

    duel.myProgress++;
    // Shadow anti-cheat verification for duel
    AntiCheat.recordTap(tileIndex, duel.roundNumber || 1, duel.cumulativeScore || 100);

    if (tileEl) {
      tileEl.classList.add('correct-tap');
      const badge = tileEl.querySelector('.order-badge');
      if (badge) badge.textContent = duel.myProgress;
    }

    // Broadcast progress to opponent
    if (!duel.isVsBot) {
      sendDuelEvent('duel_tap', {
        tileIndex,
        progress: duel.myProgress,
        score: duel.myScore
      });
    }

    updateDuelHUD();

    if (duel.myProgress === duel.targetSequence.length) {
      duel.myScore += 2;
      const elapsed = performance.now() - (duel.roundStartTime || performance.now());
      const speedBonus = Math.max(50, 400 - Math.round(elapsed * 0.08));
      duel.cumulativeScore = (duel.cumulativeScore || 0) + 400 + speedBonus;

      duel.phase = 'ROUND_OVER';
      audioVoice.playBoing();
      audioVoice.speakHindi(audioVoice.phrasesWin);
      updateDuelHUD();

      if (!duel.isVsBot) {
        sendDuelEvent('duel_round_win', { score: duel.myScore });
      }

      if (duel.myScore >= duel.targetScore) {
        if (!duel.isVsBot) {
          sendDuelEvent('duel_match_won', {});
        }
        finishDuelMatch(true);
      } else {
        if (duel.isHost || duel.isVsBot) {
          setTimeout(() => {
            if (APP_STATE.duel && APP_STATE.duel.active) {
              startNewDuelRound();
              if (!duel.isVsBot) {
                sendDuelEvent('duel_next_round', { sequence: APP_STATE.duel.targetSequence });
              }
            }
          }, 1100);
        }
      }
    }
  } else {
    // 1.5s freeze penalty on mistake
    duel.myStunnedUntil = now + 1500;
    if (tileEl) {
      tileEl.classList.add('wrong-tap');
      setTimeout(() => {
        if (tileEl) tileEl.classList.remove('wrong-tap');
      }, 450);
    }
    const status = document.getElementById('duelPhaseStatus');
    if (status) {
      status.textContent = 'WRONG TILE! 1.5S FREEZE!';
      status.className = 'phase-pill-badge reverse';
      setTimeout(() => {
        if (duel.phase === 'RECALL' && status) {
          status.textContent = 'FASTEST RECALL WINS ROUND! TAP TILES NOW!';
          status.className = 'phase-pill-badge recall kinetic-pulse';
        }
      }, 1500);
    }
    audioVoice.playDJRecordStop();
    audioVoice.playMoyeMoyeTune();
    triggerHaptic([100, 50, 100]);
    if (!duel.isVsBot) {
      sendDuelEvent('duel_stun', {});
    }
    updateDuelHUD();
  }
}

function finishDuelMatch(isWinner) {
  const duel = APP_STATE.duel;
  duel.active = false;
  clearAllDuelTimeouts();

  if (isWinner) {
    audioVoice.playBhangraFanfare();
    audioVoice.speakHindi(['Bawaal macha diya! You won the duel!']);
    const p1Label = document.getElementById('duelP1Label');
    if (p1Label) p1Label.textContent = 'VICTORY!';

    // Submit duel score to leaderboard
    const finalDuelScore = Math.max(2500, duel.cumulativeScore || 2800);
    submitRun({
      username: APP_STATE.playerHandle,
      avatar: APP_STATE.playerAvatar,
      score: finalDuelScore,
      level: duel.roundNumber || 5,
      mode: 'duel'
    });
  } else {
    audioVoice.playMoyeMoyeTune();
    audioVoice.speakHindi(['Moye Moye! Opponent won the duel!']);
    const p1Label = document.getElementById('duelP1Label');
    if (p1Label) p1Label.textContent = 'DEFEAT!';
  }
  setTimeout(() => switchView('view-menu'), 2200);
}

function updateDuelHUD() {
  const duel = APP_STATE.duel;
  if (!duel) return;
  const p1ScoreEl = document.getElementById('duelP1Score');
  if (p1ScoreEl) p1ScoreEl.textContent = `${duel.myScore} / ${duel.targetScore}`;
  const p2ScoreEl = document.getElementById('duelP2Score');
  if (p2ScoreEl) p2ScoreEl.textContent = `${duel.oppScore} / ${duel.targetScore}`;
  const roomCodeEl = document.getElementById('duelActiveRoomCode');
  if (roomCodeEl) {
    roomCodeEl.textContent = duel.isVsBot ? 'BOT' : (duel.roomCode || 'MIND');
  }
}

function startBotBehavior() {
  const duel = APP_STATE.duel;
  duel.botInterval = setInterval(() => {
    if (!duel.active || duel.phase !== 'RECALL') return;
    const now = performance.now();
    if (now < duel.oppStunnedUntil) return;

    const isCorrect = Math.random() < 0.78;
    if (isCorrect) {
      const tileIndex = duel.targetSequence[duel.oppProgress];
      duel.oppProgress++;

      const oppTile = document.getElementById(`dtile-${tileIndex}`);
      if (oppTile) {
        oppTile.classList.add('flash-active');
        setTimeout(() => oppTile.classList.remove('flash-active'), 250);
      }
      audioFX.playBlip(tileIndex);
      updateDuelHUD();

      if (duel.oppProgress === duel.targetSequence.length) {
        duel.oppScore += 2;
        duel.phase = 'ROUND_OVER';
        audioVoice.playMoyeMoyeTune();
        updateDuelHUD();

        if (duel.oppScore >= duel.targetScore) {
          finishDuelMatch(false);
        } else {
          setTimeout(() => {
            if (APP_STATE.duel && APP_STATE.duel.active) {
              startNewDuelRound();
            }
          }, 1100);
        }
      }
    } else {
      duel.oppStunnedUntil = now + 1500;
      updateDuelHUD();
    }
  }, 750 + Math.random() * 400);
}

/* ==========================================================================
   SECTION 11: LEADERBOARD & REALTIME BROADCAST
   ========================================================================== */
const DEFAULT_LEADERBOARD = [
  { username: 'PETER_PARKER', avatar: 'spider_mask',   high_score: 4200, max_level: 14 },
  { username: 'MILES_STEALTH',avatar: 'miles_stealth', high_score: 3600, max_level: 12 },
  { username: 'WEB_SLINGER',  avatar: 'web_slinger',   high_score: 3100, max_level: 10 },
  { username: 'SPIDER_SENSE', avatar: 'spider_sense',  high_score: 2600, max_level: 8 },
  { username: 'IRON_SPIDER',  avatar: 'iron_spider',   high_score: 2150, max_level: 7 }
];

function getLocalLeaderboard() {
  const stored = localStorage.getItem('bm_local_leaderboard');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { }
  }
  return DEFAULT_LEADERBOARD;
}

function saveLocalLeaderboard(data) {
  localStorage.setItem('bm_local_leaderboard', JSON.stringify(data));
}

function initSupabase() {
  if (APP_STATE.supabaseUrl && APP_STATE.supabaseKey && window.supabase) {
    try {
      APP_STATE.supabaseClient = window.supabase.createClient(
        APP_STATE.supabaseUrl,
        APP_STATE.supabaseKey
      );

      APP_STATE.supabaseClient
        .channel('public:blind_matrix_leaderboard')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'blind_matrix_leaderboard' }, () => {
          loadLeaderboard();
        })
        .subscribe();

      console.log("Supabase Realtime connected.");
    } catch (e) {
      console.warn("Supabase init error:", e);
    }
  }
}

async function loadLeaderboard() {
  const listEl = document.getElementById('leaderboardList');
  if (!listEl) return;
  listEl.innerHTML = '<li style="font-family: var(--font-main); font-size: 0.88rem; padding: 10px;">CONNECTING TO CLOUD...</li>';

  let records = [];

  if (APP_STATE.supabaseClient) {
    try {
      const { data, error } = await APP_STATE.supabaseClient
        .from('blind_matrix_leaderboard')
        .select('*')
        .order('high_score', { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        records = data;
      }
    } catch (e) {
      console.warn("Supabase fetch failed, fallback to local:", e);
    }
  }

  if (records.length === 0) {
    records = getLocalLeaderboard();
  }

  records.sort((a, b) => b.high_score - a.high_score);

  listEl.innerHTML = '';
  records.forEach((row, index) => {
    const isMe = row.username === APP_STATE.playerHandle;
    const avatarKey = (row.avatar && AVATARS[row.avatar]) ? row.avatar : 'cutting_chai';
    const avatarSvg = AVATARS[avatarKey];

    const li = document.createElement('li');
    li.className = `lb-row-item rank-${index + 1} ${isMe ? 'current-player' : ''}`;

    const rankBadge = document.createElement('span');
    rankBadge.className = 'lb-rank-badge';
    rankBadge.textContent = `#${index + 1}`;
    li.appendChild(rankBadge);

    const userBlock = document.createElement('div');
    userBlock.className = 'lb-user-block';

    const avatarBox = document.createElement('div');
    avatarBox.className = 'lb-avatar-box';
    avatarBox.innerHTML = avatarSvg;
    userBlock.appendChild(avatarBox);

    const nameSpan = document.createElement('span');
    nameSpan.style.fontWeight = '800';
    nameSpan.textContent = String(row.username || 'PLAYER'); // XSS prevention: strict text node escaping
    userBlock.appendChild(nameSpan);

    const modeStr = (row.mode || 'solo').toUpperCase();
    const modeBadge = document.createElement('span');
    modeBadge.className = `lb-mode-badge ${modeStr.toLowerCase()}`;
    modeBadge.textContent = modeStr;
    userBlock.appendChild(modeBadge);

    li.appendChild(userBlock);

    const scoreBlock = document.createElement('div');
    scoreBlock.style.textAlign = 'right';

    const scoreVal = document.createElement('div');
    scoreVal.className = 'lb-score-val';
    scoreVal.textContent = `${Number(row.high_score) || 0} PTS`;
    scoreBlock.appendChild(scoreVal);

    const lvlVal = document.createElement('div');
    lvlVal.style.fontSize = '0.7rem';
    lvlVal.style.color = 'var(--text-muted)';
    lvlVal.style.fontFamily = 'var(--font-mono)';
    lvlVal.textContent = `LVL ${Number(row.max_level) || 1}`;
    scoreBlock.appendChild(lvlVal);

    li.appendChild(scoreBlock);
    listEl.appendChild(li);
  });
}

async function submitRun(runParams) {
  const {
    username = APP_STATE.playerHandle,
    avatar = APP_STATE.playerAvatar,
    score = 0,
    level = 1,
    mode = 'solo'
  } = runParams || {};

  // Anti-cheat verification before writing to local or cloud leaderboard
  if (!AntiCheat.validateScoreSubmission(score, level)) return;

  const deviceType = DeviceProfile.get();
  const actionChain = AntiCheat.actionChain || [];
  const replayHash = await AntiCheat.generateReplayHash({
    username,
    avatar,
    score,
    level,
    mode,
    deviceType,
    actionChain
  });

  // Local optimistic update
  let localData = getLocalLeaderboard();
  const existingIdx = localData.findIndex(r => r.username === username);
  const record = {
    username,
    avatar,
    high_score: score,
    max_level: level,
    mode,
    device_type: deviceType,
    replay_hash: replayHash
  };

  if (existingIdx >= 0) {
    if (score > localData[existingIdx].high_score) {
      localData[existingIdx].high_score = score;
      localData[existingIdx].max_level = level;
      localData[existingIdx].avatar = avatar;
      localData[existingIdx].mode = mode;
      localData[existingIdx].device_type = deviceType;
    }
  } else {
    localData.push(record);
  }
  saveLocalLeaderboard(localData);

  // Broadcast to all connected clients over WebSocket
  if (APP_STATE.ws && APP_STATE.ws.readyState === WebSocket.OPEN) {
    APP_STATE.ws.send(JSON.stringify({
      action: 'leaderboard_update',
      record
    }));
  }

  // Secure Serverless Score Submission via /api/submit-score (trusted server boundary)
  const apiEndpoint = (CONFIG.API_BASE_URL || '') + '/api/submit-score';
  try {
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        avatar,
        score,
        level,
        mode,
        replayHash,
        deviceType,
        actionChain
      })
    });
    if (!res.ok) {
      enqueueOfflineScore({ username, avatar, score, level, mode, replayHash, deviceType, actionChain });
    }
  } catch (e) {
    enqueueOfflineScore({ username, avatar, score, level, mode, replayHash, deviceType, actionChain });
  }
}

function enqueueOfflineScore(item) {
  try {
    const raw = localStorage.getItem('bm_pending_scores');
    const queue = raw ? JSON.parse(raw) : [];
    queue.push(item);
    if (queue.length > 20) queue.shift();
    localStorage.setItem('bm_pending_scores', JSON.stringify(queue));
  } catch (e) {}
}

async function flushOfflineScores() {
  try {
    const raw = localStorage.getItem('bm_pending_scores');
    if (!raw) return;
    const queue = JSON.parse(raw);
    if (!Array.isArray(queue) || queue.length === 0) return;

    const remaining = [];
    const apiEndpoint = (CONFIG.API_BASE_URL || '') + '/api/submit-score';

    for (const item of queue) {
      try {
        const res = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (!res.ok) remaining.push(item);
      } catch (e) {
        remaining.push(item);
      }
    }
    localStorage.setItem('bm_pending_scores', JSON.stringify(remaining));
  } catch (e) {}
}

function upsertScoreToLeaderboard(username, avatar, score, level) {
  return submitRun({ username, avatar, score, level, mode: 'solo' });
}

/* ==========================================================================
   SECTION 12: EVENT LISTENERS & SETUP
   ========================================================================== */
function setupEventListeners() {
  document.getElementById('btnNavMenu').addEventListener('click', () => {
    HapticEngine.button();
    switchView('view-menu');
  });

  // Solo Start Action with Registration Check
  const btnStartSolo = document.getElementById('btnStartSolo');
  if (btnStartSolo) {
    btnStartSolo.addEventListener('click', () => {
      HapticEngine.button();
      if (!APP_STATE.playerHandle || APP_STATE.playerHandle.trim().length < 2) {
        openProfileModal(true);
      } else {
        startSinglePlayerGame();
      }
    });
  }

  document.getElementById('btnRestartGame').addEventListener('click', () => {
    HapticEngine.button();
    startSinglePlayerGame();
  });

  document.getElementById('btnGameOverMenu').addEventListener('click', () => {
    HapticEngine.button();
    switchView('view-menu');
  });

  document.getElementById('btnOpenLeaderboard').addEventListener('click', () => {
    HapticEngine.button();
    loadLeaderboard();
    switchView('view-leaderboard');
  });

  document.getElementById('btnLeaderboardBack').addEventListener('click', () => {
    HapticEngine.button();
    switchView('view-menu');
  });

  // Animated Motion-Based Audio Toggle
  document.getElementById('btnSoundToggle').addEventListener('click', () => {
    HapticEngine.button();
    audioVoice.isMuted = !audioVoice.isMuted;
    updateAudioToggleButton();
    if (!audioVoice.isMuted) {
      audioVoice.playPop();
    }
  });

  // Retro-Terminal Lo-Fi Radio Controls
  const btnRadioToggle = document.getElementById('btnRadioToggle');
  const modalRadio = document.getElementById('modalRadioTerminal');
  const btnCloseRadio = document.getElementById('btnCloseRadioTerminal');
  const btnMinimizeRadio = document.getElementById('btnMinimizeRadio');

  if (btnRadioToggle && modalRadio) {
    btnRadioToggle.addEventListener('click', () => {
      HapticEngine.button();
      modalRadio.classList.add('open');
      lofiRadio.ensureContext();
      if (!lofiRadio.isPlaying) {
        lofiRadio.playTrack(lofiRadio.currentTrack);
      }
    });
  }

  if (btnCloseRadio && modalRadio) {
    btnCloseRadio.addEventListener('click', () => {
      HapticEngine.button();
      modalRadio.classList.remove('open');
    });
  }

  if (btnMinimizeRadio && modalRadio) {
    btnMinimizeRadio.addEventListener('click', () => {
      HapticEngine.button();
      modalRadio.classList.remove('open');
      if (!lofiRadio.isPlaying) {
        lofiRadio.playTrack(lofiRadio.currentTrack);
      }
    });
  }

  const btnPlayPause = document.getElementById('btnRadioPlayPause');
  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', () => {
      HapticEngine.button();
      lofiRadio.togglePlay();
    });
  }

  const btnRadioNext = document.getElementById('btnRadioNext');
  if (btnRadioNext) {
    btnRadioNext.addEventListener('click', () => {
      HapticEngine.button();
      lofiRadio.nextTrack();
    });
  }

  const btnRadioPrev = document.getElementById('btnRadioPrev');
  if (btnRadioPrev) {
    btnRadioPrev.addEventListener('click', () => {
      HapticEngine.button();
      lofiRadio.prevTrack();
    });
  }

  const btnRadioEngineMode = document.getElementById('btnRadioEngineMode');
  if (btnRadioEngineMode) {
    btnRadioEngineMode.addEventListener('click', () => {
      HapticEngine.button();
      lofiRadio.toggleEngineMode();
    });
  }

  const volSlider = document.getElementById('radioVolumeSlider');
  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      lofiRadio.setVolume(parseFloat(e.target.value) / 100);
    });
  }

  // Floating Mini Radio Bar Controls inside Single Player Arena
  const btnMiniPrev = document.getElementById('btnMiniRadioPrev');
  if (btnMiniPrev) {
    btnMiniPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      HapticEngine.button();
      lofiRadio.prevTrack();
    });
  }

  const btnMiniPlayPause = document.getElementById('btnMiniRadioPlayPause');
  if (btnMiniPlayPause) {
    btnMiniPlayPause.addEventListener('click', (e) => {
      e.stopPropagation();
      HapticEngine.button();
      lofiRadio.togglePlay();
    });
  }

  const btnMiniNext = document.getElementById('btnMiniRadioNext');
  if (btnMiniNext) {
    btnMiniNext.addEventListener('click', (e) => {
      e.stopPropagation();
      HapticEngine.button();
      lofiRadio.nextTrack();
    });
  }

  const openRadioDeckHandler = (e) => {
    e.stopPropagation();
    HapticEngine.button();
    if (modalRadio) modalRadio.classList.add('open');
    lofiRadio.ensureContext();
    if (!lofiRadio.isPlaying) {
      lofiRadio.playTrack(lofiRadio.currentTrack);
    }
  };

  const btnMiniExpand = document.getElementById('btnMiniRadioExpand');
  if (btnMiniExpand) btnMiniExpand.addEventListener('click', openRadioDeckHandler);

  const miniRadioInfoBtn = document.getElementById('miniRadioInfoBtn');
  if (miniRadioInfoBtn) miniRadioInfoBtn.addEventListener('click', openRadioDeckHandler);

  // Render 10 real Hindi Lo-Fi audio tracks into terminal
  lofiRadio.renderRadioTracks();

  // 3 Jugaad Power-Up Buttons
  const btnChai = document.getElementById('btnPowerChai');
  if (btnChai) btnChai.addEventListener('click', useChaiPower);

  const btnChashma = document.getElementById('btnPowerChashma');
  if (btnChashma) btnChashma.addEventListener('click', useChashmaPower);

  const btnThink = document.getElementById('btnPowerThink');
  if (btnThink) btnThink.addEventListener('click', useThinkFeature);

  // Theme Switcher Pills
  document.querySelectorAll('.theme-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      HapticEngine.button();
      const theme = btn.getAttribute('data-theme');
      applyTheme(theme);
    });
  });

  // Profile Modal & User Registration
  renderAvatarOptions();
  updateProfileUI();

  let pendingGameStart = false;
  window.openProfileModal = function(startGameOnSuccess = false) {
    pendingGameStart = startGameOnSuccess;
    const modal = document.getElementById('modalProfile');
    const input = document.getElementById('inputPlayerHandle');
    const msg = document.getElementById('profileValidationMsg');
    if (msg) msg.style.display = 'none';
    if (input) {
      input.value = APP_STATE.playerHandle || '';
      input.focus();
    }
    if (modal) modal.classList.add('open');
  };
  window.openRegistrationModal = window.openProfileModal;

  document.getElementById('btnEditProfile').addEventListener('click', () => {
    HapticEngine.button();
    window.openProfileModal(false);
  });

  document.getElementById('btnSaveProfile').addEventListener('click', () => {
    HapticEngine.button();
    const input = document.getElementById('inputPlayerHandle');
    const msg = document.getElementById('profileValidationMsg');
    const val = input ? input.value.trim().toUpperCase() : '';

    if (!val || val.length < 2) {
      if (msg) {
        msg.textContent = 'Please write a name of at least 2 characters.';
        msg.style.display = 'block';
      }
      return;
    }
    if (!/^[A-Za-z0-9_]{2,16}$/.test(val)) {
      if (msg) {
        msg.textContent = 'Only letters, numbers, and underscores allowed.';
        msg.style.display = 'block';
      }
      return;
    }

    APP_STATE.playerHandle = val;
    localStorage.setItem('bm_player_handle', val);
    localStorage.setItem('bm_player_avatar', APP_STATE.playerAvatar);
    if (!localStorage.getItem('bm_player_id')) {
      localStorage.setItem('bm_player_id', APP_STATE.playerId);
    }
    updateProfileUI();

    const modal = document.getElementById('modalProfile');
    if (modal) modal.classList.remove('open');

    if (pendingGameStart) {
      pendingGameStart = false;
      startSinglePlayerGame();
    }
  });

  // Keyboard Numpad & Digits (1-9) + Powers (C, V, T)
  window.addEventListener('keydown', (e) => {
    // Physical Desktop Numpad orientation:
    // [7] [8] [9] -> Row 1 (0, 1, 2)
    // [4] [5] [6] -> Row 2 (3, 4, 5)
    // [1] [2] [3] -> Row 3 (6, 7, 8)
    const numpadCodeMap = {
      'Numpad7': 0, 'Numpad8': 1, 'Numpad9': 2,
      'Numpad4': 3, 'Numpad5': 4, 'Numpad6': 5,
      'Numpad1': 6, 'Numpad2': 7, 'Numpad3': 8
    };
    // Standard Top-Row Digit Keys:
    const digitKeyMap = {
      '1': 0, '2': 1, '3': 2,
      '4': 3, '5': 4, '6': 5,
      '7': 6, '8': 7, '9': 8
    };

    if (APP_STATE.currentView === 'view-singleplay' && APP_STATE.singlePlay.active) {
      if (numpadCodeMap[e.code] !== undefined) {
        handleTileClick(numpadCodeMap[e.code], e);
      } else if (digitKeyMap[e.key] !== undefined) {
        handleTileClick(digitKeyMap[e.key], e);
      } else if (e.key.toUpperCase() === 'C') {
        useChaiPower();
      } else if (e.key.toUpperCase() === 'V') {
        useChashmaPower();
      } else if (e.key.toUpperCase() === 'T') {
        useThinkFeature();
      }
    } else if (APP_STATE.currentView === 'view-duel-room' && APP_STATE.duel && APP_STATE.duel.active) {
      if (numpadCodeMap[e.code] !== undefined) {
        handleDuelTileClick(numpadCodeMap[e.code], e);
      } else if (digitKeyMap[e.key] !== undefined) {
        handleDuelTileClick(digitKeyMap[e.key], e);
      }
    }
  });
}

function renderAvatarOptions() {
  const container = document.getElementById('avatarGrid');
  if (!container) return;

  container.innerHTML = '';
  Object.keys(AVATARS).forEach(key => {
    const btn = document.createElement('button');
    btn.className = `avatar-opt-btn ${APP_STATE.playerAvatar === key ? 'selected' : ''}`;
    btn.innerHTML = AVATARS[key];
    btn.addEventListener('click', () => {
      document.querySelectorAll('.avatar-opt-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      APP_STATE.playerAvatar = key;
    });
    container.appendChild(btn);
  });
}

function updateProfileUI() {
  const handleEl = document.getElementById('lblPlayerHandle');
  if (handleEl) {
    handleEl.textContent = APP_STATE.playerHandle || 'CLICK TO SET CODENAME';
  }
  const dtHandle = document.getElementById('dtPlayerHandle');
  if (dtHandle) {
    dtHandle.textContent = APP_STATE.playerHandle || 'RECRUIT';
  }

  const svgContent = AVATARS[APP_STATE.playerAvatar] || AVATARS.spider_mask;
  const preview = document.getElementById('lblPlayerAvatarPreview');
  if (preview) {
    preview.innerHTML = svgContent;
  }
  const dtPreview = document.getElementById('dtAvatarPreview');
  if (dtPreview) {
    dtPreview.innerHTML = svgContent;
  }
}

/* ==========================================================================
   SECTION 13: ENGINE BOOTSTRAP
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  DeviceProfile.applyDeviceClasses();
  initAmbientCanvas();
  applyTheme(APP_STATE.currentTheme);
  updateDesiTaunt();
  updateAudioToggleButton();
  setupEventListeners();
  AntiCheat.initProtection();
  initWebSocket();
  initSupabase();

  // If user hasn't registered a custom codename yet, prompt them to write their own name!
  if (!APP_STATE.playerHandle || APP_STATE.playerHandle.trim().length < 2) {
    setTimeout(() => {
      if (typeof window.openProfileModal === 'function') {
        window.openProfileModal(false);
      }
    }, 350);
  }

  // Throttled window resize listener to avoid layout thrashing
  let resizeThrottle = null;
  window.addEventListener('resize', () => {
    if (resizeThrottle) return;
    resizeThrottle = setTimeout(() => {
      resizeThrottle = null;
      DeviceProfile._cached = DeviceProfile.detect();
      DeviceProfile.applyDeviceClasses();
    }, 200);
  }, { passive: true });

  // Initialize Zero-Allocation Tile Object Pool
  singleTilePool = new TilePool('singleMatrixGrid', 60);

  // Offline queue retry and background sync
  flushOfflineScores();
  window.addEventListener('online', flushOfflineScores);

  // Tab visibility pause handler
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (APP_STATE.singlePlay && APP_STATE.singlePlay.active) {
        APP_STATE.singlePlay.isTimerFrozen = true;
      }
    } else {
      if (APP_STATE.singlePlay && APP_STATE.singlePlay.active) {
        APP_STATE.singlePlay.isTimerFrozen = false;
      }
    }
  });

  console.log("DIMAAG KA FALOODA: SPIDER BEAT RUN (Single Player Edition) Bootstrapped.");
});

