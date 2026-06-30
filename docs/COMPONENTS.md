# Component Dictionary & Lifecycle

A comprehensive breakdown of the core components driving the `elite-dev-portfolio`.

## 1. Astro Components (Static/Server)

### `Layout.astro`
- **Role:** The global HTML shell and routing wrapper.
- **Responsibilities:**
  - Injects critical `<meta>` tags for SEO and responsive viewports.
  - Imports the global Tailwind CSS stylesheet (`src/styles/global.css`).
  - Provides the `<slot />` mechanism for child pages.

### `RecruiterResume.astro`
- **Role:** The zero-JS fallback layer.
- **Responsibilities:**
  - Iterates over the immutable `PORTFOLIO_CONFIG` object during the build step to generate semantic, highly accessible HTML.
  - Applies Tailwind utility classes to ensure a pristine, print-friendly, ATS-optimized layout.
  - Remains hidden via CSS until triggered by the Event Bus.

## 2. React Components (Client/Islands)

### `RecruiterToggle.tsx`
- **Role:** The primary user control mechanism for the dual-layer architecture.
- **State:** Reads and mutates `isRecruiterMode` via Zustand.
- **Effects:** Dispatches `portfolio-state-change` window events on click.
- **Styling:** Fixed position, high `z-index` to ensure it is always accessible regardless of scroll or 3D camera position.

### `Terminal.tsx`
- **Role:** A simulated CLI interface overlay designed to highlight AI/Web3 credentials instantly.
- **State:** Manages internal `typingIndex` and `history` arrays to simulate a live console.
- **Lifecycle:** 
  - `useEffect` hooks trigger `setTimeout` loops to simulate character-by-character typing.
  - Automatically scrolls to the bottom of the container as new lines are added.
- **Future Integration:** Slated to be connected to a Cloudflare Worker WebSocket for live RAG AI (Phase 6).

### `Scene.tsx` (WebGL Core)
- **Role:** The core React Three Fiber canvas.
- **Dependencies:** `@react-three/fiber`, `@react-three/drei`.
- **Responsibilities:**
  - Initializes the WebGL context.
  - Maps over `PORTFOLIO_CONFIG.projects` to render individual `ProjectCard` 3D meshes.
  - Applies environment maps, ambient lighting, and floating physics (`<Float />`).
  - Manages `onPointerOver` and `onClick` raycasting events to trigger procedural audio.

## 3. Core Utilities

### `audio.ts`
- **Role:** A singleton class interacting directly with the browser's `AudioContext`.
- **Responsibilities:**
  - Generates procedural sine (`hover`) and square (`click`) waves.
  - Manages the `AudioContext` state, ensuring it resumes correctly after user interaction to bypass autoplay restrictions.
  - **Why Procedural?** Eliminates network requests for audio files, keeping the portfolio bundle incredibly small and fast.
