# UI / UX Design Principles

## 1. Philosophy: Maximum Impact, Zero Friction

The primary goal of the UI/UX is to immediately establish authority, technical competence, and aesthetic taste without impeding the user's ability to extract information (ATS scanning, recruiter evaluation).

### Instant Gratification via Astro
The user must never stare at a loading spinner. The critical path HTML (Recruiter Mode) must be served instantly as a pre-rendered static payload. WebGL chunks (`Scene.tsx`) are lazy-loaded silently in the background and only fade in once fully hydrated and compiled by the GPU.

### The "Bento Box" Spatial Layout
Traditional 3D portfolios utilize complex, nauseating camera paths tied to scroll events. We explicitly reject this pattern. Instead, we utilize a clean, floating grid layout (Bento Box style) in 3D space. Users can see the entire project matrix at a glance without being forced into a linear, time-consuming scroll narrative.

## 2. Multi-Theme Engine & Tokenization

To appeal to a wide variety of clients (e.g., Minimalist aesthetics for Enterprise SaaS, Cyberpunk for Web3/Crypto), the portfolio employs a dynamic CSS custom-property (variable) engine driven by `portfolio.config.ts`.

### Theme Tokens
Each theme defines specific color hexes and behaviors:
- `primary`: Used for main accents, terminal text, and primary buttons.
- `secondary`: Used for secondary accents and hover states.
- `background`: The core body background color (or base color for future GLSL shaders).
- `surface`: The background color for cards, terminals, and overlays (typically utilizing `backdrop-filter: blur()`).
- `text`: Primary typography color.

These tokens are injected into the DOM via Zustand and consumed by Tailwind CSS classes (e.g., `text-[var(--theme-primary)]`).

## 3. Micro-Interactions (Web Audio API)

Visuals alone are insufficient for an "elite" classification. We employ auditory feedback to create a tactile, native-app feel.
- Every hover event over an interactive WebGL element triggers a short, high-frequency procedural envelope (sine wave).
- Every click event triggers a deeper, confirming square wave.
- **Performance Benefit:** By synthesizing the audio mathematically in the browser via `AudioContext`, we eliminate the need to download multiple `.mp3` or `.wav` files, keeping the bundle size negligible.

## 4. Accessibility First (The Fallback)

The WebGL experience, while stunning, is entirely optional. We prioritize WCAG compliance:
- **High Contrast:** The `RecruiterResume.astro` layout is designed with strict contrast ratios.
- **Screen Readers:** All semantic HTML tags (`<article>`, `<section>`, `<nav>`) are utilized correctly, allowing screen readers to parse the document logically.
- **No Trap:** The toggle switch to disable WebGL is fixed to the viewport and accessible via standard keyboard navigation (Tab indexing).
