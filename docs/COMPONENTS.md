# Component Architecture

To maintain 120 FPS, the React component tree is strictly segregated into DOM elements and Canvas elements. 

## `src/components/dom/`
HTML-based UI overlays that sit on top of the `<Canvas>`.
- `Loader.tsx`: The cinematic booting sequence using `@react-three/drei`'s `useProgress`.
- `HUD.tsx`: The heads-up display containing navigation, theme toggles, and the AI Chatbot interface.
- `Terminal.tsx`: The `xterm.js` implementation for "Hacker Mode".
- `PerformanceOverlay.tsx`: Displays live FPS and memory metrics (using `r3f-perf`).
- `ZKVault.tsx`: A secure cryptographic component that validates VIP access codes entirely in-browser using `snarkjs`.

## `src/components/sections/`
Astro components responsible for the core content layout (Phase 7 Modularization).
- `Navigation.astro`: Main navbar.
- `HeroSection.astro`: Top header and 3D typing card.
- `ExpertiseSection.astro`: Skills grid.
- `ExperienceSection.astro`: Certifications loop.
- `GitHubSection.astro`: Dedicated section housing the isolated WebGPU rendering context.
- `ProjectsSection.astro`: Project map loop utilizing `ProjectVideoPlayer`.
- `ContactSection.astro` & `Footer.astro`.

## `src/components/canvas/`
React Three Fiber components executing within the WebGL context.
- `Scene.tsx`: The master `<Canvas>` provider, initializing lighting, post-processing, and Rapier Physics.
- `OrbitalSystem.tsx`: Manages the N-body gravitational physics for projects and certifications.
- `ProjectNode.tsx`: Represents a single project as a celestial body, handling video texture preloading on hover.
- `TechGraph.tsx`: The 3D force-directed graph visualizing the tech stack.
- `AdaptivePerformance.tsx`: The Drei `<PerformanceMonitor>` logic that degrades quality to save mobile battery.
- `GitHubGlobe.tsx`: A completely isolated vanilla Three.js WebGPU component executing a TSL Compute Shader for 1,000,000 particles.

## `src/api/`
Serverless endpoints handling backend logic.
- `chat.ts`: The RAG AI endpoint utilizing the Adapter Pattern for Cloudflare vs Standard API keys.

## `src/components/pdf/`
Strictly isolated components specifically for WASM PDF generation.
- **Rule:** Do NOT use Tailwind CSS or Astro styling here. Use `StyleSheet.create()` to satisfy the Yoga layout engine compiler requirements for `@react-pdf/renderer`.
- `ResumePDF.tsx`: The core PDF document structure.

## `src/store/`
- `useStore.ts`: Zustand store holding global state (active theme, camera position, selected project, AI chat history, `isFocusMode`). Crucial for communicating between `dom/` and `canvas/` without prop drilling.


---
## Phase 9 God-Tier Upgrades (Latest Updates)
- **3D Rigged Abstract Avatar**: Built a robotic digital twin using Three.js primitives (`Box`, `Sphere`). Implemented `Quaternion.slerp` for smooth 3D cursor tracking and Web Audio API integration for dynamic jaw lip-syncing.
- **WebGPU GitHub Globe Enhancements**: Replaced `PlaneGeometry` with 3D `TetrahedronGeometry` to prevent particles from disappearing during edge-on rotations. Rewrote the TSL compute shader to use an immutable base buffer for flawless, continuous oscillation without math locking.
- **Dynamic CSS Theme Sync for WebGL**: Implemented a `MutationObserver` inside the WebGPU initialization to dynamically read DOM CSS variables (like `--color-primary`), updating the Globe's color and swapping `AdditiveBlending` for `NormalBlending` in Light Mode to preserve visibility.
- **Interactive Terminal & Hidden Minigame**: Transformed the Gemini-Lite Terminal into an interactive input CLI. Typing `sudo play` mounts a hidden WebGL Physics Gravity Well Sandbox powered by `@react-three/rapier`, generating 150 blocks magnetically attracted to the user's cursor.
- **ZK-Vault Refinements**: Fixed JSX ternary logic errors, migrated all hardcoded color classes to CSS theme variables, and added native keyboard `Enter` key support.
