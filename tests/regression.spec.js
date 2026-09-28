// tests/regression.spec.js
// Playwright End-to-End Regression Test Suite for Dimaag Ka Falooda 3.0 Fortress Edition

const { test, expect } = require('@playwright/test');

test.describe('Dimaag Ka Falooda 3.0 Fortress Regression Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-01: App boots with correct title, avatars, and zero emojis', async ({ page }) => {
    await expect(page).toHaveTitle(/Dimaag Ka Falooda/i);

    // Verify main menu visibility
    const menuView = page.locator('#view-menu');
    await expect(menuView).toBeVisible();

    // Verify solo and duel buttons exist
    const soloBtn = page.locator('#btnStartSolo');
    const onlineBtn = page.locator('#btnStartOnline');
    await expect(soloBtn).toBeVisible();
    await expect(onlineBtn).toBeVisible();

    // Verify body content contains no emojis (Unicode ranges)
    const textContent = await page.innerText('body');
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    expect(emojiRegex.test(textContent)).toBe(false);
  });

  test('TC-02: Solo mode starts with zero-allocation tile pool without layout flicker', async ({ page }) => {
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
  });

  test('TC-03: Mobile audio engine configuration has no CORS crossOrigin attribute', async ({ page }) => {
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

  test('TC-04: 1v1 Room Duel Lobby displays 4-character room code and hardware badge', async ({ page }) => {
    await page.click('#btnStartOnline');

    const lobbyView = page.locator('#view-online-lobby');
    await expect(lobbyView).toBeVisible();

    const codeTag = page.locator('#lblRoomCode');
    await expect(codeTag).toBeVisible();
    const codeText = await codeTag.innerText();
    expect(codeText).toMatch(/^[A-Z0-9]{4}$/);

    const deviceBadge = page.locator('#lobbyDeviceBadge');
    await expect(deviceBadge).toBeVisible();
    const badgeText = await deviceBadge.innerText();
    expect(badgeText).toContain('HARDWARE:');
  });

  test('TC-05: Anti-cheat detects and rejects synthetic un-trusted click events', async ({ page }) => {
    await page.click('#btnStartSolo');

    const isTampered = await page.evaluate(() => {
      const syntheticEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      Object.defineProperty(syntheticEvent, 'isTrusted', { value: false });
      return !AntiCheat.validateTap(syntheticEvent);
    });

    expect(isTampered).toBe(true);
  });

  test('TC-06: Device mismatch modal can be shown and dismissed cleanly', async ({ page }) => {
    await page.evaluate(() => {
      showDeviceMismatchModal('phone');
    });

    const mismatchModal = page.locator('#modalDeviceMismatch');
    await expect(mismatchModal).toBeVisible();

    await page.click('#btnCloseMismatch');
    await expect(mismatchModal).not.toBeVisible();
  });

});
