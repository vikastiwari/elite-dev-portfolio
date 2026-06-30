# Detailed Roadmap & Execution Plan

This roadmap outlines the complete lifecycle of the `elite-dev-portfolio`, from the initial 48-hour sprint (MVP) to the strategic phases that will evolve the portfolio into a God-Tier Web3/AI showcase.

## ✅ Phase 1-5: The 48-Hour MVP Sprint (Completed)

The MVP sprint focused on establishing a dual-layer, highly performant architecture that balances visual flair with ATS-friendly accessibility.

### ✅ Phase 1: Core Architecture & Setup
- Initialized **Astro 5** framework with React 19 and Tailwind CSS 4.
- Implemented absolute-positioned rendering layers to decouple the heavy 3D canvas from the static semantic HTML.

### ✅ Phase 2: The Config-Driven Engine
- Built `portfolio.config.ts` to act as the single source of truth for the entire application (projects, certs, social links, and theme palettes).
- Established the **Zustand** global store (`usePortfolioStore.ts`) to manage dynamic application states.

### ✅ Phase 3: "Recruiter Mode" (The Foundation)
- Developed `RecruiterToggle.tsx` to seamlessly unmount the WebGL canvas and trigger aggressive garbage collection.
- Built `RecruiterResume.astro`, a perfectly semantic, zero-JS HTML fallback layer guaranteeing a Lighthouse score of 100.

### ✅ Phase 4: The Interactive WebGL Layer
- Scaffolded the `Scene.tsx` component using `@react-three/fiber` and `@react-three/drei`.
- Rendered a dynamic 3D Project Gallery mapping data directly from the configuration file.
- Implemented a low-level, procedural Web Audio API engine (`audio.ts`) for zero-bandwidth auditory feedback on hover and click events.

### ✅ Phase 5: The "Simulated AI" Terminal
- Built `Terminal.tsx`, an overlay component simulating a command-line interface.
- Programmed typing animations and pre-defined Q&A logic to immediately hook visitors with the developer's Web3 and AI credentials.

---

## 🚀 Post-MVP: Evolution to God-Tier

The following phases outline the strategic roadmap to implement bleeding-edge AI and advanced visual capabilities.

### Phase 6: Cloudflare Edge-Based RAG AI
- **Goal:** Replace the mocked `QA_PAIRS` in the Terminal with a real WebSocket connection to a Cloudflare Worker.
- **Implementation:** 
  - Deploy a lightweight serverless worker using Cloudflare Workers.
  - Implement a vector embedding search (using Cloudflare Vectorize) to store context about the developer's past projects, GitHub commits, and whitepapers.
  - Enable recruiters to ask the terminal open-ended questions and receive highly accurate, context-aware responses in milliseconds.

### Phase 7: 3D Force-Directed Certification Graph
- **Goal:** Gamify the certification and skills presentation.
- **Implementation:**
  - Transition the static HTML certification list in the WebGL view to an interactive `react-force-graph-3d` component.
  - Nodes will represent individual skills/certifications (e.g., Coursera Deep Learning, AWS).
  - Links will represent prerequisites, tech stacks, or project associations.
  - Users can interact, rotate, and pull nodes to explore the developer's tech tree.

### Phase 8: GLSL Shader Backgrounds
- **Goal:** Elevate the visual aesthetic far beyond standard CSS.
- **Implementation:**
  - Replace the static CSS background colors and Drei `<Stars />` component with custom GLSL fragments shaders.
  - Map the Zustand `themeEngine` tokens to shader uniform variables.
  - Dynamically transition between shader palettes based on user selection (e.g., Cyberpunk Grid, Matrix Rain, Minimalist Gradient).

### Phase 9: Automated CI/CD Pipeline
- **Goal:** Zero-friction deployments.
- **Implementation:**
  - Set up strict GitHub Actions workflows to enforce the 100% TDD coverage requirement.
  - Automatically trigger `npm run build` on every push to the `main` branch.
  - Deploy the static `dist/` directory to Vercel or Cloudflare Pages via edge networks, ensuring global sub-50ms Time-To-First-Byte (TTFB).
