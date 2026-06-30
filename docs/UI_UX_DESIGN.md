# UI / UX Design Principles

## Philosophy: Maximum Impact, Zero Friction

1. **Instant Gratification via Astro**
   The user should never stare at a loading spinner. The critical path HTML (Recruiter Mode) must be served instantly as a static payload. WebGL chunks are lazy-loaded silently in the background.

2. **The "Bento Box" Spatial Layout**
   The 3D gallery avoids complex, nauseating camera paths. Instead, it utilizes a clean grid layout floating in 3D space. Users can see everything at a glance without being forced into a linear scroll narrative.

3. **Multi-Theme Engine**
   We utilize a predefined set of design tokens mapped to specific aesthetics (Cyberpunk, Matrix, Minimalist). This allows the portfolio to appeal to a wide variety of clients (e.g., Minimalist for Enterprise, Cyberpunk for Web3).

4. **Micro-Interactions (Web Audio API)**
   Every hover and click on a WebGL element provides immediate, tactile auditory feedback. By synthesizing the waves procedurally in the browser, we save hundreds of kilobytes that would otherwise be spent on static `.wav` or `.mp3` files, keeping the Lighthouse score pristine.

5. **Accessibility First (The Fallback)**
   The WebGL experience is entirely optional. By pressing the top-right toggle, users are presented with a high-contrast, text-selectable, screen-reader-friendly HTML resume.
