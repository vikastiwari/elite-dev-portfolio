# Elite Developer Portfolio: High-Performance Architecture

An advanced, WebGL-powered spatial portfolio engineered for an AI-Augmented Systems Architect and Top 1% C++ HFT Engineer. 

This is not a standard scrolling website. It is a live, 120 FPS physics simulation that proves elite engineering capability through action, not just words.

## 🚀 The Vision: HFT Orbital Command
We have abandoned the traditional grid layout. This portfolio operates on the **"HFT Orbital Command"** visual paradigm:
- A dark, high-contrast, neon-wireframe space environment.
- Projects and certifications are celestial bodies orbiting a central singularity, governed by N-body gravitational physics.
- The UI mimics a futuristic trading terminal crossed with a cyberpunk command center.

## ⚡ Tech Stack (Advanced Technologies)
- **Core Framework:** Astro 5+ (Hybrid Rendering & Zero-JS fallbacks)
- **Spatial UI:** React 19 + React Three Fiber (v9) + Three.js WebGPU Renderer
- **Physics Engine:** `@react-three/rapier` (WASM-based Rigid Body Dynamics)
- **AI Brain (Gemini-Lite):** Cloudflare Workers AI + Vectorize Edge RAG (with a fallback `.env` adapter for open-source forkability).
- **State Management:** Zustand (decoupling DOM from Canvas rendering).
- **Testing & CI/CD:** 100% Test-Driven Development (TDD) via Vitest, Playwright E2E automation, and GitHub Actions global edge deployment to Cloudflare Pages.

## 🛠️ Elite Features
1. **Zero-Knowledge VIP Vault:** Pure client-side `snarkjs` and Circom cryptography verifies VIP recruiters without sending secret access codes over the network.
2. **Forkable AI Adapter:** Drop in your `GEMINI_API_KEY` to instantly have your own AI clone powered by RAG over your resume.
3. **Hacker Mode (CLI):** Press `CTRL + ~` to drop the WebGL and open a fully functional `xterm.js` Linux terminal.
4. **Dynamic Thermal Throttling:** Built-in `<PerformanceMonitor>` that automatically degrades graphics on mobile to prevent battery drain.
5. **Cinematic Loading & Themes:** A booting terminal loader, 4-6 instant WebGPU themes, and Web Audio API procedural UI sounds.

## 📚 Documentation
Dive deep into our architecture and development guides to understand how this portfolio was engineered and how you can extend it:
- [Architecture Blueprint](docs/ARCHITECTURE.md): Core system design, hybrid-rendering, and Edge AI patterns.
- [Component Specifications](docs/COMPONENTS.md): Detailed breakdown of WebGL components and UI integration.
- [Detailed Roadmap](docs/DETAILED_ROADMAP.md): Our phased approach to building out this God-Tier portfolio.
- [Bug Tracker](docs/Bugs.md): Known issues and high-priority fixes.
- [Communication Guidelines](docs/COMMUNICATION.md): How the AI agent is instructed to communicate.
- [Astro Development Guide](docs/ASTRO_GUIDE.md): Basic commands and resources for working with Astro.

## 🏃 Getting Started
```bash
# Install dependencies
npm install

# Run the test suite (Strict TDD)
npm run test

# Start the dev server
npm run dev
```

## ⚙️ How to Personalize (Make it Yours)
This portfolio is 100% config-driven. You do not need to hunt through dozens of React components to change your name or projects. Everything is managed from a single central brain.

1. **Update Your Core Details:**
   Open `src/config/portfolio.config.ts`. Here you will find the `PORTFOLIO_CONFIG` object. Update the `personalProfile` section with your own Name, Titles, and Social Links.
2. **Update Layout and Hardcoded Text:**
   We recently modularized the architecture! If you want to change the massive headlines (e.g., "Crafting Digital Reality") or section descriptions, open the files inside the `src/components/sections/` directory (e.g., `HeroSection.astro`, `ExpertiseSection.astro`). This makes updating text highly intuitive.
3. **Add Your Projects & Certifications:**
   In `portfolio.config.ts`, replace the placeholder items in the `projectMatrix` array. To add a live video or WebP animation to your project, simply drop the file into `public/assets/projects/` and update the `media.fallback` string in the config. The custom `ProjectVideoPlayer` component handles the rest.
4. **Activate the AI Brain:**
   - Create a `.env` file at the root of the project.
   - Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Add `GEMINI_API_KEY=your_actual_api_key` to the `.env` file.
   - Your AI Clone (the Hacker Terminal) will automatically read your config file and start answering questions as YOU!

## 📜 Open Source
This repository is 100% config-driven. By editing the `src/config/portfolio.config.ts` and dropping in your API keys, any developer can fork this and instantly deploy their own high-performance portfolio.
