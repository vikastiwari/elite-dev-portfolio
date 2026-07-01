import { test, expect } from '@playwright/test';

test.describe('Elite Dev Portfolio E2E', () => {
  // Helper function to bypass the cinematic loader
  const bypassLoader = async (page) => {
    await page.goto('/');
    // Check if the loader exists. It might not if we are running in an environment where active/progress bypasses it.
    const initBtn = page.getByRole('button', { name: /Initialize System/i });
    try {
      await initBtn.waitFor({ state: 'visible', timeout: 5000 });
      await initBtn.click();
      // Wait for the loader to disappear
      await expect(page.getByTestId('cinematic-loader')).toBeHidden();
    } catch (e) {
      // If it doesn't appear within 5s, maybe it bypassed or we are in a different state. Proceed.
    }
  };

  test('should load the homepage and display the hero section', async ({ page }) => {
    await bypassLoader(page);
    
    // Check for the title
    await expect(page).toHaveTitle(/Vikas \| AI-Augmented Systems Engineer/);
    
    // Check for the massive hero text
    const heroText = page.getByText(/Crafting Digital Reality/i);
    await expect(heroText).toBeVisible();

    // Ensure the WebGL canvas wrapper exists
    const canvasContainer = page.locator('.bg-mesh');
    await expect(canvasContainer).toBeVisible();
  });

  test('should toggle the terminal via AI ASSISTANT button', async ({ page }) => {
    await bypassLoader(page);

    // Ensure the terminal is initially hidden
    const terminalWrapper = page.locator('#terminal-wrapper');
    await expect(terminalWrapper).toBeHidden();

    // Click the AI ASSISTANT button to toggle hacker mode
    const aiButton = page.getByText('AI ASSISTANT', { exact: true });
    await expect(aiButton).toBeVisible();
    await aiButton.click();

    // Terminal should now be visible and the xterm class should be present
    await expect(terminalWrapper).toBeVisible();
    await expect(page.locator('.xterm')).toBeVisible();

    // Toggle off
    await page.keyboard.press('Control+~');
    await expect(terminalWrapper).toBeHidden();
  });

  test('should switch themes and verify DOM updates', async ({ page }) => {
    await bypassLoader(page);

    // Wait for hydration and SettingsMenu to load
    // The settings button has aria-label="Theme Settings"
    const settingsBtn = page.locator('button[aria-label="Theme Settings"]');
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
