# Detailed Roadmap (Post-MVP)

The initial 48-hour sprint (Phase 1-5) has successfully delivered the MVP core architecture. This roadmap outlines the strategic phases to evolve the portfolio into a God-Tier Web3/AI showcase.

## Phase 6: Cloudflare Edge-Based RAG AI
- Replace the mocked `QA_PAIRS` in the Terminal with a real WebSocket connection to a Cloudflare Worker.
- Implement a lightweight vector embedding search (using Cloudflare Vectorize) to answer complex queries about the portfolio owner's past projects.

## Phase 7: 3D Force-Directed Certification Graph
- Transition the static HTML certification list in the WebGL view to an interactive `react-force-graph-3d`.
- Nodes will represent skills/certs, and links will represent prerequisites or tech stacks.

## Phase 8: GLSL Shader Backgrounds
- Replace the static CSS background colors and `<Stars />` component with custom GLSL fragments shaders.
- Map the `themeEngine` tokens to uniform variables to dynamically transition between shader palettes (e.g., Cyberpunk Grid, Matrix Rain).

## Phase 9: Automated CD Pipeline
- Set up GitHub Actions to automatically trigger `npm run build` and deploy the static `dist/` directory to Vercel or Cloudflare Pages on every push to the `main` branch.
