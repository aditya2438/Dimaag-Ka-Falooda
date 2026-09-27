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
  cutting_chai: `<svg viewBox="0 0 24 24"><path fill="#F59E0B" d="M4 19h16v2H4z"/><path fill="#D97706" d="M6 7l1.5 10h9L18 7H6zm10 8H8l-1-6h10l-1 6z"/><path fill="#FCD34D" d="M9 3c0 1.5-1 2-1 3s1 1.5 1 3h2c0-1.5-1-2-1-3s1-1.5 1-3H9zm4 0c0 1.5-1 2-1 3s1 1.5 1 3h2c0-1.5-1-2-1-3s1-1.5 1-3h-2z"/></svg>`,
  sharma_beta: `<svg viewBox="0 0 24 24"><circle cx="7" cy="12" r="3.5" fill="none" stroke="#FACC15" stroke-width="2.2"/><circle cx="17" cy="12" r="3.5" fill="none" stroke="#FACC15" stroke-width="2.2"/><path fill="#FACC15" d="M10.5 12h3M7 7l5-4 5 4M12 16v3m-3 0h6"/></svg>`,
  auto_rocket: `<svg viewBox="0 0 24 24"><path fill="#A3E635" d="M12 2L4 8v10h2v2h2v-2h8v2h2v-2h2V8l-8-6zm-4 8h8v4H8v-4zm4-6l5 4H7l5-4z"/><circle cx="8" cy="16" r="1.5" fill="#000"/><circle cx="16" cy="16" r="1.5" fill="#000"/></svg>`,
  chintu_pro: `<svg viewBox="0 0 24 24"><path fill="#06B6D4" d="M12 2a9 9 0 0 0-9 9v4a4 4 0 0 0 4 4h2v-8H5v-0.5A7 7 0 0 1 12 4.5a7 7 0 0 1 7 7V12h-4v8h2a4 4 0 0 0 4-4v-4a9 9 0 0 0-9-9z"/><rect x="8" y="10" width="8" height="4" rx="2" fill="#FFFFFF"/></svg>`,
  gabbar_mustache: `<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="3" fill="#F43F5E"/><circle cx="17" cy="8" r="3" fill="#F43F5E"/><path fill="#FFFFFF" d="M10 8h4v1h-4z"/><path fill="#F43F5E" d="M12 14c-2.5-3-7-3-9 0 2.5 3 7 1 9 0zm0 0c2.5-3 7-3 9 0-2.5 3-7 1-9 0z"/></svg>`,
  desi_alien: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="10" fill="#A855F7"/><circle cx="8" cy="11" r="2" fill="#000"/><circle cx="16" cy="11" r="2" fill="#000"/><circle cx="12" cy="7" r="1.5" fill="#F43F5E"/><path fill="none" stroke="#FFFFFF" stroke-width="2" d="M9 16c1.5 1.5 4.5 1.5 6 0"/></svg>`,
  samosa_ninja: `<svg viewBox="0 0 24 24"><path fill="#EA580C" d="M12 3L2 19h20L12 3zm0 4.5L18.5 17H5.5L12 7.5z"/><rect x="6" y="11" width="12" height="3" fill="#1E293B"/><circle cx="9" cy="12.5" r="1" fill="#FFFFFF"/><circle cx="15" cy="12.5" r="1" fill="#FFFFFF"/></svg>`,
  babu_rao: `<svg viewBox="0 0 24 24"><circle cx="7" cy="10" r="4" fill="none" stroke="#38BDF8" stroke-width="2.5"/><circle cx="17" cy="10" r="4" fill="none" stroke="#38BDF8" stroke-width="2.5"/><path fill="#38BDF8" d="M11 10h2M12 14v4M9 19h6"/><path fill="#FFFFFF" d="M10 15h4v1.5h-4z"/></svg>`
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
   SECTION 3: DIFFICULTY PROGRESSION LADDER
   ========================================================================== */
function getLevelConfig(level) {
  let rows = 3;
  let cols = 3;
  let totalTiles = 9;
  let sequenceLength = 3;
  let hasDecoy = false;
  let isReverse = false;
  let isGhost = false;
  let timeLimitSec = 3.5;

  if (level >= 14) {
    // TIER 7: GOD MATRIX MODE (60 BLOCKS!)
    rows = 6;
    cols = 10;
    totalTiles = 60;
    sequenceLength = Math.min(12, 10 + Math.floor((level - 14) / 2));
    hasDecoy = true;
    isReverse = Math.random() < 0.5;
    isGhost = true;
    timeLimitSec = Math.max(1.1, 1.5 - (level - 14) * 0.05);
  } else if (level >= 11) {
    // TIER 6: ULTRA REFLEX ARENA (40 BLOCKS!)
    rows = 5;
    cols = 8;
    totalTiles = 40;
    sequenceLength = level === 11 ? 8 : (level === 12 ? 9 : 10);
    hasDecoy = true;
    isReverse = level >= 12;
    isGhost = level >= 13;
    timeLimitSec = Math.max(1.4, 1.8 - (level - 11) * 0.1);
  } else if (level >= 9) {
    // TIER 5: PRO MEMORIZER SECTOR (30 BLOCKS!)
    rows = 5;
    cols = 6;
    totalTiles = 30;
    sequenceLength = level === 9 ? 7 : 8;
    hasDecoy = true;
    isReverse = level >= 10;
    isGhost = level >= 10;
    timeLimitSec = 1.9;
  } else if (level >= 7) {
    // TIER 4: EXPANDED MATRIX (20 BLOCKS!)
    rows = 4;
    cols = 5;
    totalTiles = 20;
    sequenceLength = level === 7 ? 6 : 7;
    hasDecoy = true;
    isReverse = level >= 8;
    isGhost = level >= 8;
    timeLimitSec = 2.1;
  } else if (level >= 5) {
    // TIER 3: TACTICAL RECTANGLE (15 BLOCKS!)
    rows = 3;
    cols = 5;
    totalTiles = 15;
    sequenceLength = level === 5 ? 5 : 6;
    hasDecoy = true;
    isReverse = level >= 6;
    isGhost = level >= 6;
    timeLimitSec = 2.4;
  } else if (level >= 3) {
    // TIER 2: ADVANCED GRID (12 BLOCKS!)
    rows = 3;
    cols = 4;
    totalTiles = 12;
    sequenceLength = level === 3 ? 4 : 5;
    hasDecoy = true;
    isReverse = level >= 4;
    isGhost = false;
    timeLimitSec = 2.7;
  } else if (level === 2) {
    // TIER 1B: 9 BLOCKS
    rows = 3;
    cols = 3;
    totalTiles = 9;
    sequenceLength = 4;
    hasDecoy = false;
    isReverse = false;
    isGhost = false;
    timeLimitSec = 3.0;
  } else {
    // TIER 1A: 9 BLOCKS (LEVEL 1 INTRO)
    rows = 3;
    cols = 3;
    totalTiles = 9;
    sequenceLength = 3;
    hasDecoy = false;
    isReverse = false;
    isGhost = false;
    timeLimitSec = 3.5;
  }

  return { rows, cols, totalTiles, sequenceLength, hasDecoy, isReverse, isGhost, timeLimitSec };
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
        url: "https://archive.org/download/best-of-2022-bollywood-songs/Brahmastra%20%282022%29%20-%20Kesariya.mp3",
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
        url: "https://archive.org/download/best-of-2022-bollywood-songs/Bhediya%20%282022%29%20-%20Apna%20Bana%20Le.mp3",
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
        url: "https://archive.org/download/arijit-singh-tum-hi-ho-myfreemp-3.vip/Arijit%20Singh%20-%20Tum%20Hi%20Ho%20myfreemp3.vip%20.mp3",
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
        url: "https://archive.org/download/07-channa-mereya-arijit-singh-320-kbps/07%20Channa%20Mereya%20-%20Arijit%20Singh%20320Kbps.mp3",
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
        url: "https://archive.org/download/arijit-singh-tum-hi-ho-myfreemp-3.vip/Arijit%20Singh%20-%20Raabta%20myfreemp3.vip%20.mp3",
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
        url: "https://archive.org/download/sahiba-by-aditya-rikhari/SpotiDownloader.com%20-%20Dhundhala%20-%20Yashraj.mp3",
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
        url: "https://archive.org/download/sahiba-by-aditya-rikhari/SpotiDownloader.com%20-%20Haseen%20-%20Talwiinder.mp3",
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
        url: "https://archive.org/download/sahiba-by-aditya-rikhari/SpotiDownloader.com%20-%20Sahiba%20-%20Aditya%20Rikhari.mp3",
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
        url: "https://archive.org/download/aditya-rikhari-samjho-na-nasamajh-mp-3-160-k/Aditya%20Rikhari%20-%20SAMJHO%20NA%20%28%20NASAMAJH%20%29%28MP3_160K%29.mp3",
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
        url: "https://archive.org/download/aditya-rikhari-faasle/Aditya%20Rikhari%20-%20FAASLE.mp3",
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
    this.audioEl.crossOrigin = "anonymous";
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

      row.addEventListener('click', (e) => {
        if (e.target.classList.contains('track-play-btn') || e.target.closest('.track-play-btn')) {
          if (isPlay) {
            this.pauseTrack();
          } else {
            this.playTrack(i);
          }
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
          this.audioEl.load();
        }
        this.audioEl.volume = this.volume;
        const playPromise = this.audioEl.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(() => {
            // Stream is live! Switch off synth in AUTO mode
            if (this.mode === 'AUTO') {
              this.stopSynthPlayback();
            }
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

function triggerHaptic(pattern) {
  if (navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch (e) { }
  }
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
  playerHandle: localStorage.getItem('bm_player_handle') || 'CHINTU_' + Math.floor(100 + Math.random() * 900),
  playerAvatar: localStorage.getItem('bm_player_avatar') || 'cutting_chai',
  currentTheme: (function() {
    const saved = localStorage.getItem('bm_theme');
    const legacyMap = { 'mango': 'desi-gold', 'bubblegum': 'cyberpunk', 'carnival': 'matrix', 'arcade': 'sunset' };
    return legacyMap[saved] || saved || 'desi-gold';
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
    'mango': 'desi-gold',
    'bubblegum': 'cyberpunk',
    'carnival': 'matrix',
    'arcade': 'sunset'
  };
  if (legacyMap[themeName]) {
    themeName = legacyMap[themeName];
  }

  const allowed = ['desi-gold', 'cyberpunk', 'matrix', 'sunset', 'aurora'];
  if (!allowed.includes(themeName)) themeName = 'desi-gold';

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

function setupSinglePlayerGrid(rows, cols) {
  const container = document.getElementById('singleMatrixGrid');
  if (!container) return;
  const total = rows * cols;

  const currentTotal = parseInt(container.getAttribute('data-total-tiles') || '0', 10);
  if (currentTotal === total && container.children.length === total) {
    resetTilesUI(total);
    return;
  }

  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.setAttribute('data-total-tiles', total);

  container.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i++) {
    const tile = document.createElement('div');
    tile.id = `tile-${i}`;
    tile.className = 'glass-tile';
    tile.setAttribute('data-index', i);

    if (total === 9) {
      const hint = document.createElement('span');
      hint.className = 'numpad-hint';
      hint.textContent = i + 1;
      tile.appendChild(hint);
    }

    const badge = document.createElement('span');
    badge.className = 'order-badge';
    tile.appendChild(badge);

    tile.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      handleTileClick(i);
    });

    frag.appendChild(tile);
  }
  container.appendChild(frag);
}

function resetTilesUI(totalTiles = 9) {
  const container = document.getElementById('singleMatrixGrid');
  const count = container ? (container.children.length || totalTiles) : totalTiles;
  for (let i = 0; i < count; i++) {
    const tile = document.getElementById(`tile-${i}`);
    if (tile) {
      tile.className = 'glass-tile';
      tile.style.animationDelay = '';
      const badge = tile.querySelector('.order-badge');
      if (badge) badge.textContent = '';
    }
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

  flashTilesSequence(sp.targetSequence, config.hasDecoy, config.totalTiles, () => {
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
}

function flashTilesSequence(sequence, hasDecoy, totalTiles, onComplete) {
  let step = 0;
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
        setTimeout(showNext, 140);
      }, 430);
    } else {
      if (hasDecoy && Math.random() < 0.75) {
        triggerDecoyFlicker(sequence, totalTiles, onComplete);
      } else {
        setTimeout(onComplete, 180);
      }
    }
  }
  setTimeout(showNext, 300);
}

function triggerDecoyFlicker(targetSequence, totalTiles = 9, onComplete) {
  const allIndices = [];
  for (let i = 0; i < totalTiles; i++) allIndices.push(i);
  const nonTargets = allIndices.filter(i => !targetSequence.includes(i));
  if (nonTargets.length === 0) {
    onComplete();
    return;
  }

  const decoyIdx = nonTargets[Math.floor(Math.random() * nonTargets.length)];
  const decoyEl = document.getElementById(`tile-${decoyIdx}`);

  setTimeout(() => {
    if (decoyEl) {
      decoyEl.classList.add('decoy-flicker');
      setTimeout(() => {
        decoyEl.classList.remove('decoy-flicker');
        setTimeout(onComplete, 180);
      }, 200);
    } else {
      onComplete();
    }
  }, 100);
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

function handleTileClick(tileIndex) {
  const sp = APP_STATE.singlePlay;
  if (!sp.active || sp.isInputLocked || sp.phase !== 'RECALL') return;

  const targetSeq = sp.isReverse ? [...sp.targetSequence].reverse() : sp.targetSequence;
  const expectedTile = targetSeq[sp.playerTapIndex];
  const tileEl = document.getElementById(`tile-${tileIndex}`);

  if (tileIndex === expectedTile) {
    audioVoice.playPop();
    audioVoice.playDJTileBeat(sp.playerTapIndex);
    triggerHaptic([30]);
    sp.playerTapIndex++;

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

  try {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host || 'localhost:3000';
    const ws = new WebSocket(`${protocol}//${host}`);

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
      duel.playerNumber = msg.playerNumber;
      const statusText = document.getElementById('roomStatusText');
      if (msg.status === 'WAITING_FOR_OPPONENT') {
        if (statusText) statusText.textContent = "WAITING FOR OPPONENT TO JOIN...";
      } else if (msg.status === 'OPPONENT_CONNECTED') {
        if (statusText) statusText.textContent = `CONNECTED WITH ${msg.opponentHandle || 'OPPONENT'}!`;
        startOnlineDuelMatch(false);
      }
      break;
    }

    case 'opponent_joined': {
      const statusText = document.getElementById('roomStatusText');
      if (statusText) statusText.textContent = `OPPONENT ${msg.opponentHandle} JOINED!`;
      audioVoice.speakHindi(["Opponent connect ho gaya, duel shuru!"]);
      startOnlineDuelMatch(false);
      break;
    }

    case 'round_started': {
      if (duel.active && !duel.isVsBot) {
        duel.targetSequence = msg.targetSequence;
        startSynchronizedDuelRound();
      }
      break;
    }

    case 'opponent_progress': {
      if (duel.active) {
        duel.p2Progress = msg.progress;
        duel.p2Score = msg.score;
        updateDuelHUD();
      }
      break;
    }

    case 'opponent_stunned': {
      if (duel.active) {
        duel.p2StunnedUntil = performance.now() + 1500;
      }
      break;
    }

    case 'match_over': {
      if (duel.active) {
        if (msg.winner === duel.playerNumber) {
          audioVoice.playBhangraFanfare();
          audioVoice.speakHindi(["Bawaal macha diya! You won the duel!"]);
        } else {
          audioVoice.playMoyeMoyeTune();
          audioVoice.speakHindi(["Moye Moye! Opponent won the duel!"]);
        }
        setTimeout(() => switchView('view-menu'), 1500);
      }
      break;
    }

    case 'leaderboard_sync': {
      // Live leaderboard update from another player!
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
   SECTION 10B: SUPABASE REALTIME CROSS-DEVICE DUEL ENGINE
   Works across any two devices, anywhere in the world, over Supabase Broadcast
   ========================================================================== */
const DUEL_RT = {
  channel: null,
  isHost: false,
  opponentHandle: ''
};

function duelChannelName(code) {
  return 'duel-room-' + code.toUpperCase();
}

function closeDuelChannel() {
  if (DUEL_RT.channel && APP_STATE.supabaseClient) {
    try {
      APP_STATE.supabaseClient.removeChannel(DUEL_RT.channel);
    } catch (e) {}
    DUEL_RT.channel = null;
  }
}

function sendDuelEvent(event, payload) {
  // Prefer Supabase Realtime (cross-device), fall back to local WS (localhost)
  if (DUEL_RT.channel) {
    try {
      DUEL_RT.channel.send({
        type: 'broadcast',
        event: event,
        payload: payload
      });
      return;
    } catch (e) {}
  }
  if (APP_STATE.ws && APP_STATE.ws.readyState === WebSocket.OPEN) {
    try {
      APP_STATE.ws.send(JSON.stringify({ action: event, ...payload }));
    } catch (e) {}
  }
}

function hostRoomSupa(code) {
  if (!APP_STATE.supabaseClient) return;
  closeDuelChannel();
  DUEL_RT.isHost = true;

  const ch = APP_STATE.supabaseClient.channel(duelChannelName(code), {
    config: { broadcast: { self: false } }
  });

  ch.on('broadcast', { event: 'player_joined' }, ({ payload }) => {
    DUEL_RT.opponentHandle = payload.handle || 'OPPONENT';
    const statusEl = document.getElementById('roomStatusText');
    if (statusEl) statusEl.textContent = DUEL_RT.opponentHandle + ' JOINED // MATCH STARTING!';
    audioVoice.speakHindi(['Opponent aa gaya! Duel shuru!']);
    APP_STATE.duel.playerNumber = 1;
    // Tell the joiner they are P2
    ch.send({ type: 'broadcast', event: 'match_setup', payload: { playerNumber: 2, hostHandle: APP_STATE.playerHandle } });
    setTimeout(() => startOnlineDuelMatch(false), 900);
  });

  ch.on('broadcast', { event: 'tap_progress_rt' }, ({ payload }) => {
    if (APP_STATE.duel.active) {
      APP_STATE.duel.p2Progress = payload.progress;
      APP_STATE.duel.p2Score = payload.score;
      updateDuelHUD();
    }
  });

  ch.on('broadcast', { event: 'wrong_tap_rt' }, () => {
    if (APP_STATE.duel.active) {
      APP_STATE.duel.p2StunnedUntil = performance.now() + 1500;
    }
  });

  ch.on('broadcast', { event: 'round_done_rt' }, ({ payload }) => {
    if (APP_STATE.duel.active && payload.winner === 2) {
      APP_STATE.duel.p2Score = payload.score;
      updateDuelHUD();
      if (APP_STATE.duel.p2Score >= APP_STATE.duel.targetScore) {
        endDuelMatch(2);
      } else {
        setTimeout(() => {
          const seq = generatePattern(4);
          APP_STATE.duel.targetSequence = seq;
          sendDuelEvent('sync_round_rt', { sequence: seq });
          startSynchronizedDuelRound();
        }, 800);
      }
    }
  });

  ch.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log('Supabase duel room hosted:', code);
    }
  });

  DUEL_RT.channel = ch;

  // Also try local WS as secondary channel
  if (APP_STATE.ws && APP_STATE.ws.readyState === WebSocket.OPEN) {
    APP_STATE.ws.send(JSON.stringify({
      action: 'join_room',
      roomCode: code,
      handle: APP_STATE.playerHandle,
      avatar: APP_STATE.playerAvatar
    }));
  }
}

function joinRoomSupa(code) {
  if (!APP_STATE.supabaseClient) {
    // Fallback: local WS
    if (APP_STATE.ws && APP_STATE.ws.readyState === WebSocket.OPEN) {
      APP_STATE.ws.send(JSON.stringify({
        action: 'join_room',
        roomCode: code,
        handle: APP_STATE.playerHandle,
        avatar: APP_STATE.playerAvatar
      }));
    } else {
      startOnlineDuelMatch(true); // bot fallback
    }
    return;
  }
  closeDuelChannel();
  DUEL_RT.isHost = false;
  APP_STATE.duel.roomCode = code;
  APP_STATE.duel.playerNumber = 2;

  const ch = APP_STATE.supabaseClient.channel(duelChannelName(code), {
    config: { broadcast: { self: false } }
  });

  ch.on('broadcast', { event: 'match_setup' }, ({ payload }) => {
    DUEL_RT.opponentHandle = payload.hostHandle || 'HOST';
    APP_STATE.duel.playerNumber = payload.playerNumber || 2;
    startOnlineDuelMatch(false);
  });

  ch.on('broadcast', { event: 'sync_round_rt' }, ({ payload }) => {
    if (APP_STATE.duel.active) {
      APP_STATE.duel.targetSequence = payload.sequence;
      startSynchronizedDuelRound();
    }
  });

  ch.on('broadcast', { event: 'tap_progress_rt' }, ({ payload }) => {
    if (APP_STATE.duel.active) {
      APP_STATE.duel.p2Progress = payload.progress;
      APP_STATE.duel.p2Score = payload.score;
      updateDuelHUD();
    }
  });

  ch.on('broadcast', { event: 'wrong_tap_rt' }, () => {
    if (APP_STATE.duel.active) {
      APP_STATE.duel.p2StunnedUntil = performance.now() + 1500;
    }
  });

  ch.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      // Announce join to host
      ch.send({
        type: 'broadcast',
        event: 'player_joined',
        payload: { handle: APP_STATE.playerHandle, avatar: APP_STATE.playerAvatar }
      });
      const statusEl = document.getElementById('roomStatusText');
      if (statusEl) statusEl.textContent = 'CONNECTED // WAITING FOR HOST TO START...';
    }
  });

  DUEL_RT.channel = ch;
}

function initDuelRoomLobby(prefillCode) {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  APP_STATE.duel.roomCode = code;
  const codeEl = document.getElementById('lblRoomCode');
  if (codeEl) codeEl.textContent = code;

  const statusEl = document.getElementById('roomStatusText');
  if (statusEl) statusEl.textContent = 'HOSTING ROOM // WAITING FOR OPPONENT...';

  // Pre-fill join input if coming from URL ?room=CODE
  if (prefillCode && prefillCode.length === 4) {
    const joinInput = document.getElementById('inputJoinRoom');
    if (joinInput) joinInput.value = prefillCode.toUpperCase();
  }

  // Host the room via Supabase Realtime (cross-device)
  hostRoomSupa(code);

  switchView('view-online-lobby');
}

function startOnlineDuelMatch(isVsBot = false) {
  APP_STATE.duel = {
    active: true,
    roomCode: APP_STATE.duel.roomCode,
    playerNumber: APP_STATE.duel.playerNumber || 1,
    targetScore: 10,
    p1Score: 0,
    p2Score: 0,
    p1Progress: 0,
    p2Progress: 0,
    p1StunnedUntil: 0,
    p2StunnedUntil: 0,
    targetSequence: [],
    phase: 'IDLE',
    isVsBot: isVsBot,
    botInterval: null,
    animFrameId: null
  };

  updateDuelHUD();
  switchView('view-duel-room');

  if (isVsBot) {
    const p2lbl = document.getElementById('duelP2Label');
    if (p2lbl) p2lbl.textContent = 'SHARMA JI KA ROBOT';
    startNewDuelRound();
    startBotBehavior();
  } else {
    const p2lbl = document.getElementById('duelP2Label');
    if (p2lbl) p2lbl.textContent = DUEL_RT.opponentHandle || 'LIVE OPPONENT';
    // P1 (host) generates and syncs the pattern
    if (APP_STATE.duel.playerNumber === 1) {
      const seq = generatePattern(4);
      APP_STATE.duel.targetSequence = seq;
      sendDuelEvent('sync_round_rt', { sequence: seq });
      startSynchronizedDuelRound();
    }
    // P2 waits for sync_round_rt broadcast from host
  }

  function duelLoop(now) {
    if (!APP_STATE.duel.active) return;
    const duel = APP_STATE.duel;

    const p1Card = document.getElementById('duelP1Card');
    if (p1Card) p1Card.classList.toggle('is-stunned', now < duel.p1StunnedUntil);

    const p2Card = document.getElementById('duelP2Card');
    if (p2Card) p2Card.classList.toggle('is-stunned', now < duel.p2StunnedUntil);

    APP_STATE.duel.animFrameId = requestAnimationFrame(duelLoop);
  }
  APP_STATE.duel.animFrameId = requestAnimationFrame(duelLoop);
}


function startNewDuelRound() {
  const duel = APP_STATE.duel;
  duel.targetSequence = generatePattern(4);
  startSynchronizedDuelRound();
}

function startSynchronizedDuelRound() {
  const duel = APP_STATE.duel;
  duel.p1Progress = 0;
  duel.p2Progress = 0;
  duel.phase = 'MEMORIZE';

  resetDuelTilesUI();
  updateDuelHUD();

  flashDuelSequence(duel.targetSequence, () => {
    duel.phase = 'RECALL';
    document.getElementById('duelPhaseStatus').textContent = 'FASTEST RECALL WINS ROUND!';
  });
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

function flashDuelSequence(sequence, onComplete) {
  let step = 0;
  document.getElementById('duelPhaseStatus').textContent = 'MEMORIZE DUEL PATTERN';

  function stepFlash() {
    if (step < sequence.length) {
      const tileIndex = sequence[step];
      const tileEl = document.getElementById(`dtile-${tileIndex}`);
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
        setTimeout(stepFlash, 150);
      }, 450);
    } else {
      setTimeout(onComplete, 200);
    }
  }
  setTimeout(stepFlash, 300);
}

function handleDuelTileClick(playerNum, tileIndex) {
  const duel = APP_STATE.duel;
  if (!duel.active || duel.phase !== 'RECALL') return;
  const now = performance.now();

  if (playerNum === 1 && now < duel.p1StunnedUntil) return;
  if (playerNum === 2 && now < duel.p2StunnedUntil) return;

  const currentProgress = playerNum === 1 ? duel.p1Progress : duel.p2Progress;
  const expectedTile = duel.targetSequence[currentProgress];
  const tileEl = document.getElementById(`dtile-${tileIndex}`);

  if (tileIndex === expectedTile) {
    audioVoice.playPop();
    audioVoice.playDJTileBeat(currentProgress);
    triggerHaptic([30]);

    if (playerNum === 1) {
      duel.p1Progress++;
      if (tileEl) tileEl.classList.add('correct-tap');

      // Broadcast progress via Supabase Realtime (cross-device)
      if (!duel.isVsBot) {
        sendDuelEvent('tap_progress_rt', {
          tileIndex,
          progress: duel.p1Progress,
          score: duel.p1Score
        });
      }
    } else {
      duel.p2Progress++;
    }

    updateDuelHUD();

    if (playerNum === 1 && duel.p1Progress === duel.targetSequence.length) {
      duel.p1Score += 2;
      audioVoice.playBoing();
      audioVoice.speakHindi(audioVoice.phrasesWin);
      checkDuelVictory();
    } else if (playerNum === 2 && duel.p2Progress === duel.targetSequence.length) {
      duel.p2Score += 2;
      audioVoice.playBoing();
      checkDuelVictory();
    }

  } else {
    // 1.5s freeze penalty
    audioVoice.playDJRecordStop();
    audioVoice.playMoyeMoyeTune();
    triggerHaptic([100, 50, 100]);
    if (playerNum === 1) {
      duel.p1StunnedUntil = now + 1500;
      if (!duel.isVsBot) {
        sendDuelEvent('wrong_tap_rt', {});
      }
    } else {
      duel.p2StunnedUntil = now + 1500;
    }
  }
}

function endDuelMatch(winnerNum) {
  const duel = APP_STATE.duel;
  duel.active = false;
  if (winnerNum === 1) {
    audioVoice.playBhangraFanfare();
    audioVoice.speakHindi(['Bawaal macha diya! You won the duel!']);
  } else {
    audioVoice.playMoyeMoyeTune();
    audioVoice.speakHindi(['Moye Moye! Opponent won the duel!']);
  }
  setTimeout(() => switchView('view-menu'), 1800);
}

function checkDuelVictory() {
  const duel = APP_STATE.duel;
  updateDuelHUD();

  if (duel.p1Score >= duel.targetScore) {
    endDuelMatch(1);
    return;
  } else if (duel.p2Score >= duel.targetScore) {
    endDuelMatch(2);
    return;
  }

  setTimeout(() => {
    if (duel.active) {
      if (duel.isVsBot) {
        startNewDuelRound();
      } else if (duel.playerNumber === 1) {
        // Host generates next round and broadcasts via Supabase
        const seq = generatePattern(4);
        duel.targetSequence = seq;
        sendDuelEvent('sync_round_rt', { sequence: seq });
        startSynchronizedDuelRound();
      }
      // P2 waits for sync_round_rt
    }
  }, 700);
}

function updateDuelHUD() {
  const duel = APP_STATE.duel;
  document.getElementById('duelP1Score').textContent = `${duel.p1Score} / ${duel.targetScore}`;
  document.getElementById('duelP2Score').textContent = `${duel.p2Score} / ${duel.targetScore}`;
}

function startBotBehavior() {
  const duel = APP_STATE.duel;
  duel.botInterval = setInterval(() => {
    if (!duel.active || duel.phase !== 'RECALL') return;
    const now = performance.now();
    if (now < duel.p2StunnedUntil) return;

    const isCorrect = Math.random() < 0.80;
    const choice = isCorrect 
      ? duel.targetSequence[duel.p2Progress] 
      : Math.floor(Math.random() * 9);

    handleDuelTileClick(2, choice);
  }, 750 + Math.random() * 400);
}

/* ==========================================================================
   SECTION 11: LEADERBOARD & REALTIME BROADCAST
   ========================================================================== */
const DEFAULT_LEADERBOARD = [
  { username: 'SHARMA_PRO',   avatar: 'sharma_beta',    high_score: 3600, max_level: 12 },
  { username: 'CHAI_WALA',    avatar: 'cutting_chai',   high_score: 3100, max_level: 10 },
  { username: 'GABBAR_SINGH', avatar: 'gabbar_mustache',high_score: 2600, max_level: 8 },
  { username: 'BABU_RAO',     avatar: 'babu_rao',       high_score: 2150, max_level: 7 },
  { username: 'SAMOSA_BOY',   avatar: 'samosa_ninja',   high_score: 1800, max_level: 6 }
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
    const avatarSvg = AVATARS[row.avatar] || AVATARS.cutting_chai;

    const li = document.createElement('li');
    li.className = `lb-row-item rank-${index + 1} ${isMe ? 'current-player' : ''}`;
    li.innerHTML = `
      <span class="lb-rank-badge">#${index + 1}</span>
      <div class="lb-user-block">
        <div class="lb-avatar-box">${avatarSvg}</div>
        <span style="font-weight: 800;">${row.username}</span>
      </div>
      <div style="text-align: right;">
        <div class="lb-score-val">${row.high_score} PTS</div>
        <div style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">LVL ${row.max_level || 1}</div>
      </div>
    `;
    listEl.appendChild(li);
  });
}

async function upsertScoreToLeaderboard(username, avatar, score, level) {
  let localData = getLocalLeaderboard();
  const existingIdx = localData.findIndex(r => r.username === username);
  const record = { username, avatar, high_score: score, max_level: level };

  if (existingIdx >= 0) {
    if (score > localData[existingIdx].high_score) {
      localData[existingIdx].high_score = score;
      localData[existingIdx].max_level = level;
      localData[existingIdx].avatar = avatar;
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

  if (APP_STATE.supabaseClient) {
    try {
      await APP_STATE.supabaseClient
        .from('blind_matrix_leaderboard')
        .upsert({
          username: username,
          avatar: avatar,
          high_score: score,
          max_level: level,
          updated_at: new Date().toISOString()
        }, { onConflict: 'username' });
    } catch (e) {
      console.warn("Supabase upsert error:", e);
    }
  }
}

/* ==========================================================================
   SECTION 12: EVENT LISTENERS & SETUP
   ========================================================================== */
function setupEventListeners() {
  document.getElementById('btnNavMenu').addEventListener('click', () => switchView('view-menu'));
  document.getElementById('btnStartSolo').addEventListener('click', startSinglePlayerGame);
  document.getElementById('btnStartOnline').addEventListener('click', initDuelRoomLobby);
  document.getElementById('btnRestartGame').addEventListener('click', startSinglePlayerGame);
  document.getElementById('btnGameOverMenu').addEventListener('click', () => switchView('view-menu'));

  document.getElementById('btnOpenLeaderboard').addEventListener('click', () => {
    loadLeaderboard();
    switchView('view-leaderboard');
  });
  document.getElementById('btnLeaderboardBack').addEventListener('click', () => switchView('view-menu'));

  // Animated Motion-Based Audio Toggle
  document.getElementById('btnSoundToggle').addEventListener('click', () => {
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
      modalRadio.classList.add('open');
      lofiRadio.ensureContext();
      if (!lofiRadio.isPlaying) {
        lofiRadio.playTrack(lofiRadio.currentTrack);
      }
    });
  }

  if (btnCloseRadio && modalRadio) {
    btnCloseRadio.addEventListener('click', () => {
      modalRadio.classList.remove('open');
    });
  }

  if (btnMinimizeRadio && modalRadio) {
    btnMinimizeRadio.addEventListener('click', () => {
      modalRadio.classList.remove('open');
      if (!lofiRadio.isPlaying) {
        lofiRadio.playTrack(lofiRadio.currentTrack);
      }
    });
  }

  const btnPlayPause = document.getElementById('btnRadioPlayPause');
  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', () => {
      lofiRadio.togglePlay();
    });
  }

  const btnRadioNext = document.getElementById('btnRadioNext');
  if (btnRadioNext) {
    btnRadioNext.addEventListener('click', () => {
      lofiRadio.nextTrack();
    });
  }

  const btnRadioPrev = document.getElementById('btnRadioPrev');
  if (btnRadioPrev) {
    btnRadioPrev.addEventListener('click', () => {
      lofiRadio.prevTrack();
    });
  }

  const btnRadioEngineMode = document.getElementById('btnRadioEngineMode');
  if (btnRadioEngineMode) {
    btnRadioEngineMode.addEventListener('click', () => {
      lofiRadio.toggleEngineMode();
    });
  }

  const volSlider = document.getElementById('radioVolumeSlider');
  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      lofiRadio.setVolume(parseFloat(e.target.value) / 100);
    });
  }

  // Render 10 real Hindi Lo-Fi audio tracks into terminal
  lofiRadio.renderRadioTracks();

  // Duel Tile Clicks
  for (let i = 0; i < 9; i++) {
    const tile = document.getElementById(`dtile-${i}`);
    if (tile) {
      tile.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        handleDuelTileClick(1, i);
      });
    }
  }

  // 3 Jugaad Power-Up Buttons
  const btnChai = document.getElementById('btnPowerChai');
  if (btnChai) btnChai.addEventListener('click', useChaiPower);

  const btnChashma = document.getElementById('btnPowerChashma');
  if (btnChashma) btnChashma.addEventListener('click', useChashmaPower);

  const btnThink = document.getElementById('btnPowerThink');
  if (btnThink) btnThink.addEventListener('click', useThinkFeature);

  // Copy Room Code Button
  const btnCopy = document.getElementById('btnCopyRoomCode');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(APP_STATE.duel.roomCode).catch(() => {});
      btnCopy.textContent = 'COPIED!';
      setTimeout(() => btnCopy.textContent = 'COPY CODE', 1500);
    });
  }

  // Share Invite Link Button — sends URL with ?room=CODE so friend auto-joins
  const btnInviteLink = document.getElementById('btnCopyInviteLink');
  if (btnInviteLink) {
    btnInviteLink.addEventListener('click', () => {
      const url = `${window.location.origin}${window.location.pathname}?room=${APP_STATE.duel.roomCode}`;
      if (navigator.share) {
        navigator.share({ title: 'DIMAAG KA FALOODA: 1v1 DUEL', url }).catch(() => {
          navigator.clipboard.writeText(url).catch(() => {});
        });
      } else {
        navigator.clipboard.writeText(url).catch(() => {});
        btnInviteLink.textContent = 'LINK COPIED!';
        setTimeout(() => btnInviteLink.textContent = 'SHARE LINK', 2000);
      }
    });
  }

  // Duel Helpers
  document.getElementById('btnPlayBot').addEventListener('click', () => startOnlineDuelMatch(true));
  document.getElementById('btnJoinRoomSubmit').addEventListener('click', () => {
    const code = document.getElementById('inputJoinRoom').value.trim().toUpperCase();
    if (code.length === 4) {
      APP_STATE.duel.roomCode = code;
      const statusEl = document.getElementById('roomStatusText');
      if (statusEl) statusEl.textContent = 'CONNECTING TO ROOM ' + code + '...';
      // Use Supabase Realtime for cross-device join
      joinRoomSupa(code);
    } else {
      const joinInput = document.getElementById('inputJoinRoom');
      if (joinInput) joinInput.focus();
    }
  });

  // Theme Switcher Pills
  document.querySelectorAll('.theme-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      applyTheme(theme);
    });
  });

  // Profile Modal
  renderAvatarOptions();
  updateProfileUI();

  document.getElementById('btnEditProfile').addEventListener('click', () => {
    document.getElementById('inputPlayerHandle').value = APP_STATE.playerHandle;
    document.getElementById('modalProfile').classList.add('open');
  });

  document.getElementById('btnSaveProfile').addEventListener('click', () => {
    const val = document.getElementById('inputPlayerHandle').value.trim().toUpperCase();
    if (val.length >= 3) {
      APP_STATE.playerHandle = val;
      localStorage.setItem('bm_player_handle', val);
      localStorage.setItem('bm_player_avatar', APP_STATE.playerAvatar);
      updateProfileUI();
      document.getElementById('modalProfile').classList.remove('open');
    }
  });

  // Cloud Settings Modal
  document.getElementById('btnOpenSettings').addEventListener('click', () => {
    document.getElementById('inputSupaUrl').value = APP_STATE.supabaseUrl;
    document.getElementById('inputSupaKey').value = APP_STATE.supabaseKey;
    document.getElementById('modalSettings').classList.add('open');
  });
  document.getElementById('btnCloseSettings').addEventListener('click', () => {
    document.getElementById('modalSettings').classList.remove('open');
  });
  document.getElementById('btnSaveSettings').addEventListener('click', () => {
    const url = document.getElementById('inputSupaUrl').value.trim();
    const key = document.getElementById('inputSupaKey').value.trim();
    APP_STATE.supabaseUrl = url;
    APP_STATE.supabaseKey = key;
    localStorage.setItem('bm_supa_url', url);
    localStorage.setItem('bm_supa_key', key);
    initSupabase();
    document.getElementById('modalSettings').classList.remove('open');
  });

  // Keyboard Numpad & Digits (1-9) + Powers (C, V, T)
  window.addEventListener('keydown', (e) => {
    if (APP_STATE.currentView === 'view-singleplay' && APP_STATE.singlePlay.active) {
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

      if (numpadCodeMap[e.code] !== undefined) {
        handleTileClick(numpadCodeMap[e.code]);
      } else if (digitKeyMap[e.key] !== undefined) {
        handleTileClick(digitKeyMap[e.key]);
      } else if (e.key.toUpperCase() === 'C') {
        useChaiPower();
      } else if (e.key.toUpperCase() === 'V') {
        useChashmaPower();
      } else if (e.key.toUpperCase() === 'T') {
        useThinkFeature();
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
  if (handleEl) handleEl.textContent = APP_STATE.playerHandle;
  const dtHandle = document.getElementById('dtPlayerHandle');
  if (dtHandle) dtHandle.textContent = APP_STATE.playerHandle;

  const svgContent = AVATARS[APP_STATE.playerAvatar] || AVATARS.cutting_chai;
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
  initAmbientCanvas();
  applyTheme(APP_STATE.currentTheme);
  updateDesiTaunt();
  updateAudioToggleButton();
  setupEventListeners();
  initWebSocket();
  initSupabase();

  // URL deep-link: ?room=CODE — auto-open lobby and pre-fill join code
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam && /^[A-Z0-9]{4}$/i.test(roomParam)) {
    // Open lobby after Supabase has a moment to initialize
    setTimeout(() => {
      initDuelRoomLobby();
      const joinInput = document.getElementById('inputJoinRoom');
      if (joinInput) {
        joinInput.value = roomParam.toUpperCase();
        // Auto-submit join so friend connects immediately
        const statusEl = document.getElementById('roomStatusText');
        if (statusEl) statusEl.textContent = 'FOUND INVITE LINK // TAP CONNECT ROOM';
      }
    }, 800);
  }

  console.log("DIMAAG KA FALOODA: BEAT RUN 2.0 (Ultra Funky Live Edition) Bootstrapped.");
});

