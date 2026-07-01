import { test, expect } from '@playwright/test';

test.describe('Elite Dev Portfolio E2E', () => {
  test('should load the homepage and display the hero section', async ({ page }) => {
    // Navigate to the local server
    await page.goto('/');
    
    // Check for the title
    await expect(page).toHaveTitle(/Portfolio/);
    
    // Check for the massive hero text
    const heroText = page.getByText(/Crafting Digital Reality/i);
    await expect(heroText).toBeVisible();

    // Ensure the WebGL canvas wrapper exists
    const canvasContainer = page.locator('.bg-mesh');
    await expect(canvasContainer).toBeVisible();
  });

  test('should toggle the terminal on CTRL+~', async ({ page }) => {
    await page.goto('/');

    // Ensure the terminal is initially hidden
    const terminalWrapper = page.locator('#terminal-wrapper');
    await expect(terminalWrapper).toBeHidden();

    // Simulate the keyboard shortcut
    await page.keyboard.press('Control+~');

    // Terminal should now be visible and the xterm class should be present
    await expect(terminalWrapper).toBeVisible();
    await expect(page.locator('.xterm')).toBeVisible();

    // Toggle off
    await page.keyboard.press('Control+~');
    await expect(terminalWrapper).toBeHidden();
  });

  test('should switch themes and verify DOM updates', async ({ page }) => {
    await page.goto('/');

    // Wait for hydration and SettingsMenu to load
    const settingsBtn = page.locator('button.bg-white\\/10'); // The cog icon button
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click();

    // Click on the Matrix theme
    const matrixThemeBtn = page.locator('button:has-text("Matrix")');
    await expect(matrixThemeBtn).toBeVisible();
    await matrixThemeBtn.click();

    // Verify CSS variables are updated (Matrix theme accent is #00ff41)
    const body = page.locator('body');
    const accentVar = await body.evaluate((el) => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    });
    
    // Check that accent color updated to Matrix's green
    expect(accentVar).toBe('#00ff41');
  });
});
