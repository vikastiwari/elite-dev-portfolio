# Component Dictionary

A breakdown of the core components driving the portfolio.

## Astro Components (Static/Server)
- **`Layout.astro`**
  - The global HTML shell. Injects meta tags, viewport settings, and the global Tailwind CSS stylesheet.
- **`RecruiterResume.astro`**
  - Iterates over `PORTFOLIO_CONFIG` to generate semantic, highly accessible HTML. This is the zero-JS fallback layer.

## React Components (Client/Islands)
- **`RecruiterToggle.tsx`**
  - A fixed UI element allowing the user to switch between WebGL and ATS-optimized modes. Connects to Zustand and the global Window event bus.
- **`Terminal.tsx`**
  - A simulated CLI interface overlay. Uses `useState` and `useEffect` to simulate typing animations for a predefined set of Q&A pairs (acting as a lightweight AI simulation).
- **`Scene.tsx` (WebGL)**
  - The core React Three Fiber canvas. Maps over `projectMatrix` to render `ProjectCard` meshes. Uses `@react-three/drei` for lighting, environments, and floating physics.

## Utilities
- **`audio.ts`**
  - A singleton class interacting directly with the browser's `AudioContext`. Generates procedural sine and square waves for hover and click events.
