# Component Architecture

To maintain 120 FPS, the React component tree is strictly segregated into DOM elements and Canvas elements. 

## `src/components/dom/`
HTML-based UI overlays that sit on top of the `<Canvas>`.
- `Loader.tsx`: The cinematic booting sequence using `@react-three/drei`'s `useProgress`.
- `HUD.tsx`: The heads-up display containing navigation, theme toggles, and the AI Chatbot interface.
- `Terminal.tsx`: The `xterm.js` implementation for "Hacker Mode".
- `PerformanceOverlay.tsx`: Displays live FPS and memory metrics (using `r3f-perf`).

## `src/components/canvas/`
React Three Fiber components executing within the WebGL context.
- `Scene.tsx`: The master `<Canvas>` provider, initializing lighting, post-processing, and Rapier Physics.
- `OrbitalSystem.tsx`: Manages the N-body gravitational physics for projects and certifications.
- `ProjectNode.tsx`: Represents a single project as a celestial body, handling video texture preloading on hover.
- `TechGraph.tsx`: The 3D force-directed graph visualizing the tech stack.
- `AdaptivePerformance.tsx`: The Drei `<PerformanceMonitor>` logic that degrades quality to save mobile battery.

## `src/api/`
Serverless endpoints handling backend logic.
- `chat.ts`: The RAG AI endpoint utilizing the Adapter Pattern for Cloudflare vs Standard API keys.

## `src/components/pdf/`
Strictly isolated components specifically for WASM PDF generation.
- **Rule:** Do NOT use Tailwind CSS or Astro styling here. Use `StyleSheet.create()` to satisfy the Yoga layout engine compiler requirements for `@react-pdf/renderer`.
- `ResumePDF.tsx`: The core PDF document structure.

## `src/store/`
- `useStore.ts`: Zustand store holding global state (active theme, camera position, selected project, AI chat history, `isFocusMode`). Crucial for communicating between `dom/` and `canvas/` without prop drilling.
