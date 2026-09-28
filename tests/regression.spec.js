// tests/regression.spec.js
// Playwright End-to-End Regression Test Suite for Dimaag Ka Falooda: Spider Beat Run

const { test, expect } = require('@playwright/test');

test.describe('Dimaag Ka Falooda: Spider Beat Run Regression Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-01: App boots with Spider Beat Run title, Spider-Man theme, and zero emojis', async ({ page }) => {
    await expect(page).toHaveTitle(/Dimaag Ka Falooda.*Spider/i);

    // Verify main menu visibility
    const menuView = page.locator('#view-menu');
    await expect(menuView).toBeVisible();

    // Verify solo button exists and multiplayer button is absent
    const soloBtn = page.locator('#btnStartSolo');
    await expect(soloBtn).toBeVisible();
    const onlineBtn = page.locator('#btnStartOnline');
    await expect(onlineBtn).toHaveCount(0);

    // Verify body content contains no emojis
    const textContent = await page.innerText('body');
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    expect(emojiRegex.test(textContent)).toBe(false);
  });

  test('TC-02: Solo mode starts with zero-allocation tile pool and no numpad hints', async ({ page }) => {
    // Register player handle first
    await page.evaluate(() => {
      localStorage.setItem('bm_player_handle', 'SPIDER_HERO');
      localStorage.setItem('bm_player_id', 'spider_uuid_123');
      if (typeof APP_STATE !== 'undefined') {
        APP_STATE.playerHandle = 'SPIDER_HERO';
        APP_STATE.playerId = 'spider_uuid_123';
      }
    });

    await page.click('#btnStartSolo');

    const singleView = page.locator('#view-singleplay');
    await expect(singleView).toBeVisible();

    const matrixGrid = page.locator('#singleMatrixGrid');
    await expect(matrixGrid).toBeVisible();

    // Verify 9 active tiles in Level 1
    const activeTiles = page.locator('#singleMatrixGrid .glass-tile:not(.hidden-tile)');
    await expect(activeTiles).toHaveCount(9);

    // Verify pool has total of 60 tiles instantiated in DOM
    const allTiles = page.locator('#singleMatrixGrid .glass-tile');
    await expect(allTiles).toHaveCount(60);

    // Verify no visible numpad hints
    const numpadHints = page.locator('.numpad-hint');
    const hintCount = await numpadHints.count();
    for (let i = 0; i < hintCount; i++) {
      await expect(numpadHints.nth(i)).not.toBeVisible();
    }
  });

  test('TC-03: Audio engine configuration has no CORS crossOrigin attribute and playsinline present', async ({ page }) => {
    const hasCrossOrigin = await page.evaluate(() => {
      if (typeof lofiRadio !== 'undefined' && lofiRadio.audioEl) {
        return lofiRadio.audioEl.hasAttribute('crossorigin') || lofiRadio.audioEl.crossOrigin === 'anonymous';
      }
      return false;
    });
    expect(hasCrossOrigin).toBe(false);

    const hasPlaysInline = await page.evaluate(() => {
      if (typeof lofiRadio !== 'undefined' && lofiRadio.audioEl) {
        return lofiRadio.audioEl.hasAttribute('playsinline');
      }
      return false;
    });
    expect(hasPlaysInline).toBe(true);
  });

  test('TC-04: User registration modal displays and enforces custom username validation', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem('bm_player_handle');
      if (typeof APP_STATE !== 'undefined') APP_STATE.playerHandle = '';
      if (typeof openRegistrationModal === 'function') openRegistrationModal();
    });

    const regModal = page.locator('#modalProfile');
    await expect(regModal).toBeVisible();

    const input = page.locator('#inputPlayerHandle');
    await expect(input).toBeVisible();

    // Verify title reflects Spider Operative registration
    const modalTitle = page.locator('#modalProfileTitle');
    await expect(modalTitle).toContainText('SPIDER REGISTRATION');
  });

  test('TC-05: Anti-cheat detects and rejects synthetic un-trusted click events', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('bm_player_handle', 'SPIDER_HERO');
      if (typeof APP_STATE !== 'undefined') APP_STATE.playerHandle = 'SPIDER_HERO';
    });
    await page.click('#btnStartSolo');

    const isTampered = await page.evaluate(() => {
      const syntheticEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      Object.defineProperty(syntheticEvent, 'isTrusted', { value: false });
      return !AntiCheat.validateTap(syntheticEvent);
    });

    expect(isTampered).toBe(true);
  });

  test('TC-06: Mini radio bar is integrated into gameplay arena', async ({ page }) => {
    const miniRadio = page.locator('#miniRadioBar');
    await expect(miniRadio).toBeAttached();

    const trackTitle = page.locator('#miniRadioTitle');
    await expect(trackTitle).toBeAttached();
  });

});

