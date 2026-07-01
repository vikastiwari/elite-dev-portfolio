# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Elite Dev Portfolio E2E >> should toggle the terminal via AI ASSISTANT button
- Location: tests/e2e/portfolio.spec.ts:20:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('AI ASSISTANT', { exact: true })
    - locator resolved to <div class="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-dark-700 text-brand-400 text-xs px-2 py-1 rounded font-mono border border-brand-500/30 group-hover:text-text-primary transition-colors">AI ASSISTANT</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-testid="cinematic-loader" class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono transition-opacity duration-500 opacity-100">…</div> from <astro-island ssr="" prefix="r5" uid="ZneHhg" client="load" await-children="" server-render-time="1" component-export="default" renderer-url="/@id/@astrojs/react/client.js" props="{"data-astro-cid-lcdefpme":[0,true]}" opts="{"name":"CinematicLoader","value":true}" before-hydration-url="/@id/astro:scripts/before-hydration.js" component-url="/home/vikas/Projects/elite-dev-portfolio/src/components/ui/CinematicLoader">…</astro-island> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-testid="cinematic-loader" class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono transition-opacity duration-500 opacity-100">…</div> from <astro-island ssr="" prefix="r5" uid="ZneHhg" client="load" await-children="" server-render-time="1" component-export="default" renderer-url="/@id/@astrojs/react/client.js" props="{"data-astro-cid-lcdefpme":[0,true]}" opts="{"name":"CinematicLoader","value":true}" before-hydration-url="/@id/astro:scripts/before-hydration.js" component-url="/home/vikas/Projects/elite-dev-portfolio/src/components/ui/CinematicLoader">…</astro-island> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    4 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-testid="cinematic-loader" class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono transition-opacity duration-500 opacity-100">…</div> from <astro-island ssr="" prefix="r5" uid="ZneHhg" client="load" await-children="" server-render-time="1" component-export="default" renderer-url="/@id/@astrojs/react/client.js" props="{"data-astro-cid-lcdefpme":[0,true]}" opts="{"name":"CinematicLoader","value":true}" before-hydration-url="/@id/astro:scripts/before-hydration.js" component-url="/home/vikas/Projects/elite-dev-portfolio/src/components/ui/CinematicLoader">…</astro-island> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
    - waiting for element to be visible, enabled and stable

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Elite Dev Portfolio E2E', () => {
  4  |   test('should load the homepage and display the hero section', async ({ page }) => {
  5  |     // Navigate to the local server
  6  |     await page.goto('/');
  7  |     
  8  |     // Check for the new exact title
  9  |     await expect(page).toHaveTitle(/Vikas \| AI-Augmented Systems Engineer/);
  10 |     
  11 |     // Check for the massive hero text (first name)
  12 |     const heroText = page.getByText('Vikas', { exact: true });
  13 |     await expect(heroText).toBeVisible();
  14 | 
  15 |     // Ensure the WebGL canvas wrapper exists
  16 |     const canvasContainer = page.locator('.bg-mesh');
  17 |     await expect(canvasContainer).toBeVisible();
  18 |   });
  19 | 
  20 |   test('should toggle the terminal via AI ASSISTANT button', async ({ page }) => {
  21 |     await page.goto('/');
  22 | 
  23 |     // Ensure the terminal is initially hidden
  24 |     const terminalWrapper = page.locator('#terminal-wrapper');
  25 |     await expect(terminalWrapper).toBeHidden();
  26 | 
  27 |     // Click the AI ASSISTANT button to toggle hacker mode
  28 |     const aiButton = page.getByText('AI ASSISTANT', { exact: true });
  29 |     await expect(aiButton).toBeVisible();
> 30 |     await aiButton.click();
     |                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  31 | 
  32 |     // Terminal should now be visible and the xterm class should be present
  33 |     await expect(terminalWrapper).toBeVisible();
  34 |     await expect(page.locator('.xterm')).toBeVisible();
  35 | 
  36 |     // Toggle off
  37 |     await page.keyboard.press('Control+~');
  38 |     await expect(terminalWrapper).toBeHidden();
  39 |   });
  40 | 
  41 |   test('should switch themes and verify DOM updates', async ({ page }) => {
  42 |     await page.goto('/');
  43 | 
  44 |     // Wait for hydration and SettingsMenu to load
  45 |     // The settings button has aria-label="Theme Settings"
  46 |     const settingsBtn = page.locator('button[aria-label="Theme Settings"]');
  47 |     await expect(settingsBtn).toBeVisible();
  48 |     await settingsBtn.click();
  49 | 
  50 |     // Click on the Matrix theme
  51 |     const matrixThemeBtn = page.locator('button:has-text("Matrix")');
  52 |     await expect(matrixThemeBtn).toBeVisible();
  53 |     await matrixThemeBtn.click();
  54 | 
  55 |     // Verify CSS variables are updated (Matrix theme accent is #00ff41)
  56 |     const body = page.locator('body');
  57 |     const accentVar = await body.evaluate((el) => {
  58 |       return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
  59 |     });
  60 |     
  61 |     // Check that accent color updated to Matrix's green
  62 |     expect(accentVar).toBe('#00ff41');
  63 |   });
  64 | });
  65 | 
```