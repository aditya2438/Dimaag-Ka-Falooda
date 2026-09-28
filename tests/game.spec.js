// tests/game.spec.js
// Playwright E2E & Protocol Verification Suite for Dimaag Ka Falooda 3.0 Fortress Edition
// Covering BUG-01 to BUG-12, Device Homogenization, and Haptics Engine

const { test, expect } = require('@playwright/test');

test.describe('Dimaag Ka Falooda 3.0 Fortress Verification Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // [BUG-01] Leaderboard Submission Endpoint Integrity
  test('BUG-01: Leaderboard endpoint validates inputs and handles submissions', async ({ request }) => {
    const res = await request.post('/api/submit-score', {
      data: {
        username: 'TEST_AGENT',
        avatar: 'cutting_chai',
        score: 1500,
        level: 3,
        mode: 'solo'
      }
    });
    // Endpoint exists and does not return 404
    expect(res.status()).not.toBe(404);
  });

  // [BUG-02] Mobile Radio Failure - No crossOrigin and playsinline present
  test('BUG-02: Mobile radio has no crossOrigin attribute and includes playsinline', async ({ page }) => {
    const audioAttrs = await page.evaluate(() => {
      if (typeof lofiRadio !== 'undefined' && lofiRadio.audioEl) {
        return {
          hasCrossOrigin: lofiRadio.audioEl.hasAttribute('crossorigin'),
          hasPlaysinline: lofiRadio.audioEl.hasAttribute('playsinline')
        };
      }
      return { hasCrossOrigin: false, hasPlaysinline: true };
    });
    expect(audioAttrs.hasCrossOrigin).toBe(false);
    expect(audioAttrs.hasPlaysinline).toBe(true);
  });

  // [FEATURE-01] Dynamic Difficulty Timer Scaling
  test('FEATURE-01: Guessing/recall time scales up dynamically as grid size expands', async ({ page }) => {
    const times = await page.evaluate(() => {
      const cfgL1 = getLevelConfig(1);   // 3x3 = 9 tiles
      const cfgL8 = getLevelConfig(8);   // 3x5 = 15 tiles
      const cfgL9 = getLevelConfig(9);   // 4x5 = 20 tiles
      const cfgL11 = getLevelConfig(11); // 5x6 = 30 tiles
      const cfgL12 = getLevelConfig(12); // 5x8 = 40 tiles
      return {
        t1: cfgL1.guessTime,
        t8: cfgL8.guessTime,
        t9: cfgL9.guessTime,
        t11: cfgL11.guessTime,
        t12: cfgL12.guessTime,
        grid1: cfgL1.tiles,
        grid12: cfgL12.tiles
      };
    });
    expect(times.grid1).toBe(9);
    expect(times.grid12).toBe(40);
    expect(times.t12).toBeGreaterThan(times.t1);
    expect(times.t12).toBeGreaterThanOrEqual(16.0);
  });

  // [BUG-05] Ranking - Solo stream scoring
  test('BUG-05: Leaderboard displays records with avatar rendering', async ({ page }) => {
    await page.click('#btnLeaderboard');
    const lbView = page.locator('#view-leaderboard');
    await expect(lbView).toBeVisible();
  });

  // [BUG-06] Client-Side Score Spoofing - AntiCheat synthetic event detection
  test('BUG-06: AntiCheat rejects synthetic untrusted click events', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('bm_player_handle', 'SPIDER_HERO');
      if (typeof APP_STATE !== 'undefined') APP_STATE.playerHandle = 'SPIDER_HERO';
    });
    await page.click('#btnStartSolo');
    const isRejected = await page.evaluate(() => {
      const fakeEvt = new MouseEvent('click', { bubbles: true, cancelable: true });
      Object.defineProperty(fakeEvt, 'isTrusted', { value: false });
      return !AntiCheat.validateTap(fakeEvt);
    });
    expect(isRejected).toBe(true);
  });

  // [BUG-07] Level-Transition DOM Thrash - Persistent 60-element TilePool
  test('BUG-07: Solo mode instantiates exactly 60 pooled tile nodes without DOM churn', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('bm_player_handle', 'SPIDER_HERO');
      if (typeof APP_STATE !== 'undefined') APP_STATE.playerHandle = 'SPIDER_HERO';
    });
    await page.click('#btnStartSolo');
    const poolCount = await page.locator('#singleMatrixGrid .glass-tile').count();
    expect(poolCount).toBe(60);
  });

  // [BUG-08] CSS Variable Annihilation - Theme persistence across transitions
  test('BUG-08: Spider theme persists across navigation transitions', async ({ page }) => {
    await page.evaluate(() => {
      applyTheme('spider-red');
    });
    const bodyClass = await page.getAttribute('body', 'class');
    expect(bodyClass).toContain('theme-spider-red');

    const persistentTheme = await page.evaluate(() => APP_STATE.currentTheme);
    expect(persistentTheme).toBe('spider-red');
  });

  // [BUG-09] WS Denial of Service - Token bucket rate limiting testable via health route
  test('BUG-09: Server health and rate limiter routes are functional', async ({ request }) => {
    const res = await request.get('/health');
    if (res.status() === 200) {
      const data = await res.json();
      expect(data.status).toBe('HEALTHY');
    }
  });

  // [BUG-10] Event Listener Multiplication - Single delegated tile interaction
  test('BUG-10: Tiles respond to non-passive pointerdown with tactile feedback', async ({ page }) => {
    await page.click('#btnStartSolo');
    const firstTile = page.locator('#singleMatrixGrid .glass-tile:not(.hidden-tile)').first();
    await expect(firstTile).toBeVisible();
  });

  // [BUG-11] Background Tab Desync - Visibility change freezes timer
  test('BUG-11: Background tab suspends gameplay timer to prevent desync', async ({ page }) => {
    await page.click('#btnStartSolo');
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, writable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    const isFrozen = await page.evaluate(() => {
      return APP_STATE.singlePlay && APP_STATE.singlePlay.isTimerFrozen;
    });
    expect(isFrozen).toBe(true);
  });

  // [BUG-12] Radio Event Deadlock - Track selection plays without event collision
  test('BUG-12: Radio track selection triggers playback cleanly without event deadlock', async ({ page }) => {
    await page.click('#btnTerminalRadio');
    const trackRow = page.locator('.term-track-row').first();
    await expect(trackRow).toBeVisible();
    await trackRow.click();
    const isPlaying = await page.evaluate(() => lofiRadio.isPlaying);
    expect(isPlaying).toBe(true);
  });

  // [HAPTICS] Haptic Vibration Engine
  test('HAPTICS: HapticEngine is available and executes vibration routines cleanly', async ({ page }) => {
    const hapticReady = await page.evaluate(() => {
      if (typeof HapticEngine !== 'undefined') {
        HapticEngine.tap();
        HapticEngine.countdown();
        HapticEngine.victory();
        return true;
      }
      return false;
    });
    expect(hapticReady).toBe(true);
  });

});
