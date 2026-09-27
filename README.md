# BLIND MATRIX: MEMORY RUN 2.0 (ULTRA FUNKY EDITION)
> **Top 1% Joyful, Multi-Device Responsive Glassmorphic Memory & Reflex Speed Run Engine**  
> *Crafted with Dynamic Escalating Blocks (9 to 60 Tiles), Retro-Terminal Hindi Lo-Fi Chill Radio (Station 108.4 FM), Adaptive Multi-Device Layout (PC Cockpit vs. Mobile Handheld), Kinetic Animated Typography, Living Micro-Interactions, Jelly Physics, Moving Canvas Doodads, Dimag Ki Batti (Think Feature), Combo Streak Multipliers, Viral "Moye Moye" Melodic Synthesizer, Comical Spoken Hindi Audio, Real-Time 1v1 Room Duel WebSocket Multiplayer, and Zero Emojis.*

---

## 1. Dynamic Escalating Block Scaling (9 -> 12 -> 15 -> 20 -> 30 -> 40 -> 60 Blocks)

As players progress through the campaign, the toughness level and spatial complexity escalate dynamically:

- **Level 1–2**: **9 Blocks** (3x3 grid) — 3–4 sequence recall. Standard intro & speed test.
- **Level 3–4**: **12 Blocks** (3x4 grid) — 4–5 sequence recall. Decoy flickers & reverse recall introduced.
- **Level 5–6**: **15 Blocks** (3x5 grid) — 5–6 sequence recall. Powers recharge milestone!
- **Level 7–8**: **20 Blocks** (4x5 grid) — 6–7 sequence recall. Ghost grid mode.
- **Level 9–10**: **30 Blocks** (5x6 grid) — 7–8 sequence recall. Powers recharge milestone!
- **Level 11–13**: **40 Blocks** (5x8 grid) — 8–10 sequence recall. Ultra reflex challenge.
- **Level 14+**: **60 Blocks** (6x10 grid) — 10–12 sequence recall. **God Matrix Mode**!

### Performance & Responsive Geometry:
- **Zero-Overflow Clamping**: Dynamically clamped with `max-width: min(380px, 46vh); max-height: min(380px, 46vh);` on desktop, and `max-width: min(320px, 36vh); max-height: min(320px, 36vh);` on mobile.
- **Dynamic Density Scaling**: Tile border radius, gap, and typography automatically scale based on total tiles (gap: 8px &rarr; 3px; radius: 16px &rarr; 5px; badge: 1.6rem &rarr; 0.70rem).
- **Zero Lag / Zero Memory Leaks**: GPU-accelerated CSS Grid layout with DOM reconciliation and no duplicate listeners.

---

## 2. Retro-Terminal Hindi Lo-Fi Chill Radio ("Station 108.4 FM")

A dedicated in-game chill radio station designed to induce a relaxing, peaceful, highly focused flow state:

- **Header Terminal Button (`#btnRadioToggle`)**:
  - Displays animated radio frequency pulse waves when music is active.
  - Clicking it opens the cyberpunk glassmorphic **Retro-Terminal Window** (`#modalRadioTerminal`).
- **Terminal Console Features**:
  - CRT scanline overlay, macOS/Linux dot title bar, monospace command log output.
  - Real-time ASCII/Canvas audio visualizer spectrum (`#terminalVisualizerCanvas`).
  - Full playback controls: `[ PREV ]`, `[ PLAY / PAUSE ]`, `[ NEXT ]`, Volume Slider, and `[ PLAY IN BACKGROUND & RESUME GAME ]`.
- **6 Peaceful, Soulful, Lovable Hindi Songs (Arijit Singh / Soulful Acoustic Style)**:
  1. **"TUM HI HO"** (*Aashiqui 2* - Arijit Singh) — Soulful Piano Lo-Fi in E Minor.
  2. **"KESARIYA"** (*Brahmāstra* - Arijit Singh) — Warm Saffron Sunrise Melodic Ambient.
  3. **"CHANNA MEREYA"** (*Ae Dil Hai Mushkil* - Arijit Singh) — Calming Acoustic Minor Harmony.
  4. **"RAABTA"** (*Agent Vinod* - Arijit Singh) — Serene Midnight Acoustic Lo-Fi Groove.
  5. **"KAL HO NAA HO"** (*Kal Ho Naa Ho* - Sonu Nigam) — Peaceful Heartfelt Reflection.
  6. **"APNA BANA LE"** (*Bhediya* - Arijit Singh) — Dreamy Romantic Ambient Chillwave.
- **Automatic Spoken Dialogue Muting**:
  - When any song starts playing, `audioVoice.isSpeechMuted = true` is set and `window.speechSynthesis.cancel()` is called.
  - Spoken comedy dialogues are paused so the player can relax in a tranquil flow state.
  - When the radio is paused or stopped, normal voice lines resume automatically.
- **100% Procedurally Synthesized**:
  - Zero external MP3 files, zero 404 errors, zero buffering delay. Everything is synthesized using the Web Audio API (polyphonic warm chords, sub-bass, vinyl crackle noise, and nylon guitar arpeggios).

---

## 3. Adaptive Multi-Device Architecture (PC / Laptop / Mac vs. Mobile)

### A. PC / Laptop / Mac (Widescreen Arcade Cockpit Mode `min-width: 769px`):
- **3-Column Command Station (`max-width: 1120px`)**:
  - **Left Wing**: Operative profile badge, 3 Neural Shields telemetry pod, Numpad reflex map diagram, and quick hotkey shortcuts for Jugaad powers (`[C]`, `[V]`, `[T]`).
  - **Center Stage**: Dynamic matrix grid (up to 60 blocks), Top HUD (Level, Kinetic Score, Shields), Combo Surge tag, 3 Jugaad Powers, Phase Directive Capsule, Depleting Speed Timer bar, and Brain Status IQ badge.
  - **Right Wing**: Cognitive Radar (live round difficulty & block count), Desi Commentary Feed, and Top Highest Score tracker.
- **2-Column Lobby**: Hero presentation on the left; game modes, theme switcher, and actions on the right.

### B. Mobile Handheld (Portrait Mode `< 768px`):
- Ergonomic single-column portrait layout clamped strictly to `100dvh`.
- Guaranteed zero overflow, zero clipping, and touch-safe interaction.

---

## 4. Kinetic Animated Typography & Google Fonts Pairing

- **Flowing Gradient Motion (`@keyframes textGradientFlow`)**: Multi-color animated gradient sweeping across headlines, scores, multipliers, and badges.
- **Google Fonts Pairing**:
  - **Outfit**: High-impact playful display typography for titles and major badges.
  - **Inter**: Crisp, modern UI font for labels and dialogues.
  - **JetBrains Mono**: High-tech tabular monospace font for telemetry and numeric readouts.
- **Neon Text Pulse (`@keyframes neonTextPulse`)**: Breathing radiant text shadow glows that amplify during combo streaks and Fever Mode.

---

## 5. 4 Refined Top-Tier Funky Themes

Instant switching via dedicated theme pills:
1. **Mango Sunset (Default)**: Deep Twilight Navy `#080E21`, Saffron Gold `#FFB703`, Neon Flamingo `#FF2A6D`, Tropical Aqua `#05D9E8`.
2. **Cyber Pop / Bubblegum Wave**: Cosmic Blackberry `#0D0221`, Acid Magenta `#FF007F`, Neon Seafoam `#00F5D4`, Electric Violet `#7B2CBF`.
3. **Acid Carnival**: Obsidian Plum `#0B001A`, Toxic Lime `#70E000`, Royal Purple `#9D4EDD`, Electric Azure `#00B4D8`.
4. **Arcade 1999**: Galactic Teal `#031B24`, Hyper Tangerine `#FF5400`, Cyber Cyan `#00F0FF`, Neon Mint `#38B000`.

---

## 6. Zero Emojis & Custom Vector Insignias

100% handcrafted bespoke SVG vector insignias:
- `cutting_chai`: Steaming glass of street cutting chai.
- `sharma_beta`: Gold medal & nerdy spectacles.
- `auto_rocket`: Supercharged cyber auto-rickshaw shield.
- `chintu_pro`: Headphones & gaming cyber visor.
- `gabbar_mustache`: Heavy Royal handlebar mustache & dark shades.
- `desi_alien`: Cyber alien with neon third eye.
- `samosa_ninja`: Samosa badge with ninja headband.
- `babu_rao`: Iconic circular spectacles & mustache outline.

---

## 7. Real-Time 1v1 Room Duel Multiplayer (WebSocket)

- **Native RFC 6455 WebSocket Engine (`server.js`)**:
  - Zero external npm dependencies (pure standard Node.js `http` and `crypto`).
  - Room code matchmaking with one-tap COPY button.
  - Real-time opponent tap mirroring and synchronized round patterns.
  - 1.5s stun penalty on incorrect taps with live **MOYE MOYE (1.5S)** visual badge.
  - Solo bot sparring mode available anytime.

---

## 8. How to Run

1. **Start Server**:
   ```powershell
   node server.js
   ```
2. **Open in Browser**:
   Visit `http://localhost:3000`
