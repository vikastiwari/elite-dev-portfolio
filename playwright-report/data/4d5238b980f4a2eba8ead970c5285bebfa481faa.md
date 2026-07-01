# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> Elite Dev Portfolio E2E >> should switch themes and verify DOM updates
- Location: tests/e2e/portfolio.spec.ts:39:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button.bg-white\\/10')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button.bg-white\\/10')

```

```yaml
- text: ORBITAL COMMAND 0% // INITIATING NEURAL LINK AI ASSISTANT
- navigation:
  - text: <vikas/>
  - link "About":
    - /url: "#about"
  - link "Experience":
    - /url: "#experience"
  - link "Projects":
    - /url: "#projects"
  - link "Let's Talk":
    - /url: "#contact"
  - button "Toggle Focus Mode":
    - img
  - button ""
  - button ""
  - button ""
- banner:
  - text: Available for new opportunities
  - heading "Crafting Digital Reality." [level=1]
  - paragraph: Senior Full Stack Engineer specializing in transforming complex problems into elegant, scalable, and high-performance web and AI solutions.
  - link "Explore Work ":
    - /url: "#projects"
  - link " View GitHub":
    - /url: https://github.com/vikas-elite
  - paragraph: "const developer = {"
  - paragraph: "name: 'Vikas Tiwari',"
  - paragraph: "role: 'Senior Full Stack Engineer',"
  - text: Scroll 
- heading "Engineering Excellence" [level=2]
- paragraph: Mastering the entire stack with a focus on architecture, performance, and clean code.
- text: 
- heading "AI & Swarm Architecture" [level=3]
- paragraph: Building state-of-the-art multi-agent swarms and RAG capabilities with Python and Java 21.
- text: 
- heading "Low-Latency Systems" [level=3]
- paragraph: Designing ultra-low-latency zero-copy execution engines for HFT using C++20 and Rust.
- text: 
- heading "Web3 & Cloud" [level=3]
- paragraph: Automating deployments and building intent-centric Smart Accounts with zkML.
- heading "Certifications & Experience" [level=2]
- paragraph: A relentless pursuit of knowledge with 37+ verified certifications.
- text: 2025-10-12
- heading "AWS Certified Machine Learning – Specialty" [level=3]
- paragraph: Amazon Web Services
- text: Cloud AI Infrastructure 2024-05-10
- heading "Algorithms, Part I & II" [level=3]
- paragraph: Princeton University
- text: Algorithms Data Structures 2023-11-20
- heading "Deep Learning Specialization" [level=3]
- paragraph: DeepLearning.AI
- text: AI Neural Networks 2023-08-15
- heading "Mathematics for Machine Learning" [level=3]
- paragraph: Imperial College London
- text: AI Math 2023-12-01
- heading "Meta Database Engineer" [level=3]
- paragraph: Meta
- text: Database Infrastructure 2024-02-15
- heading "MLOps Specialization" [level=3]
- paragraph: Duke University
- text: AI MLOps
- heading "Live Global Commits" [level=2]
- paragraph: Simulating a real-time stream of 1,000,000 parallel events computed entirely on the GPU via Three Shading Language (TSL).
- text: ">> ORBITAL_COMMAND_SYNC MODULE: LIVE_GITHUB_COMMITS RENDERER: WEBGPU SHADER: TSL_COMPUTE PARTICLES: 1,000,000 STATUS: COMPUTE_SHADER_ACTIVE"
- heading "Selected Works" [level=2]
- link "View full archive ":
  - /url: https://github.com/vikas-elite
- text: <DePIN-Agent-Economy /> 01 / Production
- heading "DePIN-Agent-Economy" [level=3]
- paragraph: Agentic DePIN powered by zkML and Intent-Centric Smart Accounts. Sub-150ms verification.
- list:
  - listitem: Rust
  - listitem: Solidity
  - listitem: Arbitrum Stylus
  - listitem: zkML
- link " Source":
  - /url: https://github.com/vikas-elite
- text: <ultra-low-latency-hft-engine /> 02 / Production
- heading "ultra-low-latency-hft-engine" [level=3]
- paragraph: Zero-copy High-Frequency Trading execution engine for microsecond-scale deep learning inference.
- list:
  - listitem: C++20
  - listitem: DPDK
  - listitem: TensorRT
  - listitem: Lock-free SPSC
- link " Source":
  - /url: https://github.com/vikas-elite
- text: <hybrid-ai-hft-engine & drl-stock-trading-app /> 03 / Production
- heading "hybrid-ai-hft-engine & drl-stock-trading-app" [level=3]
- paragraph: Ultra-low-latency DRL stock trading platform with Rust/Aeron backbone and Deep Q-Network.
- list:
  - listitem: Rust
  - listitem: Java 22
  - listitem: Python
  - listitem: Aeron IPC
- link " Source":
  - /url: https://github.com/vikas-elite
- text: <enterprise-agent-swarm /> 04 / Production
- heading "enterprise-agent-swarm" [level=3]
- paragraph: Production-grade multi-agent microservice featuring concurrent orchestration and RAG capabilities.
- list:
  - listitem: Java 21
  - listitem: Spring AI
  - listitem: Virtual Threads
- link " Source":
  - /url: https://github.com/vikas-elite
- text: <multi-agent-job-apply-eu /> 05 / Production
- heading "multi-agent-job-apply-eu" [level=3]
- paragraph: Autonomous AI swarm optimized for European ATS bypassing and immigration compliance.
- list:
  - listitem: Python
  - listitem: CrewAI
  - listitem: Selenium
- link " Source":
  - /url: https://github.com/vikas-elite
- text: <ai-studio-dashboard /> 06 / Production
- heading "ai-studio-dashboard" [level=3]
- paragraph: A 'God-Tier' AI Agent Dashboard with interactive LangGraph canvas visualizations.
- list:
  - listitem: React
  - listitem: Vite
  - listitem: Zustand
  - listitem: LangGraph
- link " Source":
  - /url: https://github.com/vikas-elite
- text: <Youtube_Final /> 07 / WIP
- heading "Youtube_Final" [level=3]
- paragraph: The Crown Jewel of content creation automation.
- list:
  - listitem: React
  - listitem: AI Video Processing
- link " Source":
  - /url: https://github.com/vikas-elite
- text: <Humanoid Parkour- apex /> 08 / WIP
- heading "Humanoid Parkour- apex" [level=3]
- paragraph: Training humanoid agents to perform complex parkour maneuvers using DRL.
- list:
  - listitem: C++
  - listitem: Reinforcement Learning
  - listitem: Physics Engine
- link " Source":
  - /url: https://github.com/vikas-elite
- img "elite-dev-portfolio"
- button ""
- slider: "0"
- text: LIVE DEMO 09 / Production
- heading "elite-dev-portfolio" [level=3]
- paragraph: This very website. A config-driven, WebGL-powered portfolio architecture featuring audio-reactive AI Core geometries.
- list:
  - listitem: Astro
  - listitem: React Three Fiber
  - listitem: Tailwind
- link " Source":
  - /url: https://github.com/vikas-elite
- heading "Let's Collaborate" [level=2]
- paragraph: I'm actively looking for new opportunities. If you have an exciting project or want to build something incredible, my inbox is always open.
- link " Say Hello":
  - /url: mailto:vikas@example.com
- link "":
  - /url: https://github.com/vikas-elite
- link "":
  - /url: https://linkedin.com/in/vikas-elite
- contentinfo:
  - paragraph: © 2026 Vikas Tiwari. Designed & Engineered with precision.
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
  8  |     // Check for the title
  9  |     await expect(page).toHaveTitle(/Portfolio/);
  10 |     
  11 |     // Check for the massive hero text
  12 |     const heroText = page.getByText(/Crafting Digital Reality/i);
  13 |     await expect(heroText).toBeVisible();
  14 | 
  15 |     // Ensure the WebGL canvas wrapper exists
  16 |     const canvasContainer = page.locator('.bg-mesh');
  17 |     await expect(canvasContainer).toBeVisible();
  18 |   });
  19 | 
  20 |   test('should toggle the terminal on CTRL+~', async ({ page }) => {
  21 |     await page.goto('/');
  22 | 
  23 |     // Ensure the terminal is initially hidden
  24 |     const terminalWrapper = page.locator('#terminal-wrapper');
  25 |     await expect(terminalWrapper).toBeHidden();
  26 | 
  27 |     // Simulate the keyboard shortcut
  28 |     await page.keyboard.press('Control+~');
  29 | 
  30 |     // Terminal should now be visible and the xterm class should be present
  31 |     await expect(terminalWrapper).toBeVisible();
  32 |     await expect(page.locator('.xterm')).toBeVisible();
  33 | 
  34 |     // Toggle off
  35 |     await page.keyboard.press('Control+~');
  36 |     await expect(terminalWrapper).toBeHidden();
  37 |   });
  38 | 
  39 |   test('should switch themes and verify DOM updates', async ({ page }) => {
  40 |     await page.goto('/');
  41 | 
  42 |     // Wait for hydration and SettingsMenu to load
  43 |     const settingsBtn = page.locator('button.bg-white\\/10'); // The cog icon button
> 44 |     await expect(settingsBtn).toBeVisible();
     |                               ^ Error: expect(locator).toBeVisible() failed
  45 |     await settingsBtn.click();
  46 | 
  47 |     // Click on the Matrix theme
  48 |     const matrixThemeBtn = page.locator('button:has-text("Matrix")');
  49 |     await expect(matrixThemeBtn).toBeVisible();
  50 |     await matrixThemeBtn.click();
  51 | 
  52 |     // Verify CSS variables are updated (Matrix theme accent is #00ff41)
  53 |     const body = page.locator('body');
  54 |     const accentVar = await body.evaluate((el) => {
  55 |       return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
  56 |     });
  57 |     
  58 |     // Check that accent color updated to Matrix's green
  59 |     expect(accentVar).toBe('#00ff41');
  60 |   });
  61 | });
  62 | 
```