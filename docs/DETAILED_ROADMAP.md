# Detailed Roadmap

The execution of this high-performance portfolio follows a strict Phased Implementation Plan driven by Test-Driven Development (TDD).

## Phase 1: Foundation & TDD (Weeks 1-2)
- Initialize Astro 5 + React 19 + Tailwind 4 monorepo.
- Define `portfolio.config.ts` data structures.
- **TDD:** Write Vitest suites for config validation and data parsing.
- Build the Zero-JS ATS Fallback HTML layer (`/fallback`).
- Set up Zustand state management and write tests for theme toggling and UI states.

## Phase 2: The Orbital Command WebGL Engine (Weeks 3-4)
- Initialize React Three Fiber v9 and WebGPU Renderer.
- Implement `@react-three/rapier` N-body physics engine.
- Create `InstancedMesh` spheres for projects and certifications orbiting the center.
- Integrate GSAP for smooth camera interpolation on click events.
- Implement `r3f-forcegraph` for the tech stack visualization.

## Phase 3: AI Adapter & Terminal (Weeks 5-6)
- Build the `api/chat` endpoint supporting the AI Adapter Pattern (Cloudflare Vectorize vs Standard `.env` Gemini fallback).
- **TDD:** Mock and test the AI endpoints for proper context injection and streaming responses.
- Implement `xterm.js` for the "Hacker Mode" (`CTRL + ~`).
- Build the floating Gemini-Lite AI avatar UI overlay that connects to the chat API.

## Phase 4: Polish, Performance, & Audio (Week 7)
- Integrate Drei's `<PerformanceMonitor>` for mobile thermal throttling (dynamic DPR and bloom reduction).
- Implement the Cinematic Booting Loader (`useProgress`).
- Build the Web Audio API procedural sound engine for hovers/clicks and background atmosphere.
- Finalize the 4-6 Theme configurations and wire them to shader uniforms.
- Run Lighthouse and WebGL profiling (targeting 120 FPS desktop, 60 FPS mobile).

## Phase 5: Testing & CI/CD (Week 8)
- Implement Playwright E2E tests for WebGL interactions.
- Set up GitHub Actions for automated deployment to Cloudflare Pages.

## Phase 6: God-Tier MVP (Completed)
- **Executive Override (Focus Mode):** Implement `frameloop="never"` suspension to gracefully toggle to a 2D high-contrast resume, preventing background WebGPU battery drain.
- **Audio-Reactive AI Core:** Build a TSL Compute Shader bound to the WebAudio API AnalyserNode, mutated safely outside the React render lifecycle.
- **Instant WASM PDF Resume:** Isolate a `src/components/pdf/` architecture and utilize `@react-pdf/renderer` for instantaneous client-side PDF downloads.

## Phase 7: Component Modularity & Custom Content (Current Phase)
- **Architectural Extraction:** Break monolithic Astro pages into highly reusable components (`src/components/sections/`).
- **Dynamic Video Logic:** Create robust mappings for project video WebP/MP4 animations using `ProjectVideoPlayer`.
- **Content Population:** Final user content rewrite of headers, expertise, and projects.

## Phase 8: Future Expansions
- **In-Browser ZK-Proof Vault:** Implement Circom circuits + `snarkjs` for recruiter verification.
- **Live GitHub Commits Globe:** Shift to a massively parallel TSL compute shader supporting 1,000,000+ particles and bezier curves.
