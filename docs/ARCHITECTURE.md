# Architectural Blueprint

This document outlines the core architecture for the High-Performance WebGL Portfolio, employing an **HFT Orbital Command** paradigm.

## System Architecture

We utilize a hybrid-rendering approach optimized for spatial computing and edge AI.

```mermaid
graph TD
    A[Astro 5+ Shell] -->|SSR / Static HTML| B(Glassmorphism UI Fallback)
    A -->|Client Hydration| C[Zustand Store]
    
    C -->|State Updates| D[DOM Components]
    C -->|Uniform Updates| E[Canvas Components R3F]
    
    D --> F[Terminal / HUD / Loader]
    E --> G[Three.js WebGPU Renderer]
    
    G --> H[Rapier Physics Engine N-Body]
    G --> H2[TSL WebGPU Compute Shaders]
    
    I[User Query] -->|POST /api/chat| J[Cloudflare Worker / API Route]
    J -->|AI Adapter Pattern| K{API Key Exists?}
    K -->|Cloudflare| L[Vectorize + Workers AI]
    K -->|Standard ENV| M[Gemini API direct]
    
    N[Resume Download] -->|Client Side WASM| O[@react-pdf/renderer]

## Core Pillars

1. **Astro 5+ Hybrid Routing:**
   - Astro handles the overall document structure. The `/fallback` route provides a perfect, zero-JS HTML/CSS resume for ATS scanners and users with disabled WebGL.
   - The main `/` route hydrates the React 19 application.

2. **React Three Fiber (v9) & WebGPU:**
   - R3F manages the 3D scene graph. We strictly decouple the DOM from the Canvas to prevent React reconciliation from dropping frames.
   - We use the experimental Three.js WebGPU backend and TSL (Three Shading Language) for maximum performance.

3. **Physics (Rapier):**
   - `@react-three/rapier` governs the N-body gravitational simulation for the Orbital Command paradigm. 

4. **Edge AI Adapter Pattern:**
   - For production deployments, Cloudflare Workers handles embeddings and RAG via Vectorize and D1 to achieve sub-50ms TTFT (Time To First Token).
   - For open-source forkability, an adapter gracefully degrades to calling the Gemini REST API if standard `.env` keys are used instead of Cloudflare bindings.

5. **Phase 6 God-Tier Upgrades:**
   - **TSL WebGPU Shaders:** We explicitly avoid R3F main-thread bottlenecks by utilizing Three Shading Language (TSL) uniforms modified inside `useFrame` for Audio-Reactive WebGPU physics.
   - **Client-Side WASM PDFs:** We utilize `@react-pdf/renderer` for zero-latency, edge-free PDF generation.
   - **Focus Mode Frameloop Control:** The WebGPU canvas gracefully suspends via `frameloop="never"` bound to Zustand, preventing background battery drain.

6. **Test-Driven Development (TDD):**
   - All core logic, config parsing, and AI endpoints are tested using Vitest before integration into the UI.
