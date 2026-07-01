# UI / UX Design System

## The Paradigm: HFT Orbital Command
Moving away from flat web design, this portfolio utilizes spatial computing. The design language is inspired by High-Frequency Trading terminals, cyberpunk aesthetics, and deep-space orbital mechanics.

### Key Visual Elements
- **Color Palette:** Deep blacks, neon greens, cyber blues, and high-contrast stark whites (theme dependent).
- **Typography:** Swiss/Brutalist monospace fonts for UI data (e.g., Fira Code, JetBrains Mono, or Inter for legibility).
- **Materials:** Additive blending, neon wireframes, and refractive glass (glassmorphism overlays on the DOM layer).

## The 6 Core Experiences

### 1. The Cinematic Loader
Instead of a standard spinner, users are greeted with a "Boot Sequence". As WebGL assets load in the background, a simulated Linux terminal types out system checks and connects to the "Orbital Command", building anticipation.

### 2. Spatial Navigation
Projects and Certifications are not scrolled through. They orbit a central AI singularity. 
- **Hovering** over a planet reveals a holographic order-book style HUD with project telemetry.
- **Clicking** a planet smoothly interpolates the camera (via GSAP) to zoom into the project, revealing video textures and full case studies.

### 3. Hacker Mode Override (CTRL + ~)
For technical users. Hitting `CTRL + ~` shatters the WebGL canvas and drops down a raw, beautifully styled `xterm.js` Linux terminal. Users can navigate the portfolio using pseudo-commands (`cd projects`, `cat resume.md`).

### 4. VIP ZK-Proof Vault
At the base of the portfolio sits a mathematically locked VIP vault. It utilizes brutalist UI and glowing cryptograph status indicators. When a VIP enters their access code (e.g., `777777`), the component mathematically generates a ZK-Proof via Groth16. On verification, the vault shatters to reveal highly exclusive contact methods and classified case studies.

### 5. Live GitHub Commits Globe
A visually striking, highly optimized WebGPU instance visualizing global open-source contributions. 1,000,000 glowing particles pulse across a 3D sphere, entirely calculated via TSL Compute Shaders to prevent CPU bottlenecking. It features an "Orbital Command Sync" HUD tracking the shader status.

### 6. Dynamic Theme Engine
4-6 themes (Cyberpunk, Matrix, Deep Space, Synthwave) can be toggled. This state change updates CSS variables on the DOM layer and simultaneously updates Shader Uniforms on the Canvas layer to instantly swap lighting and wireframe colors without a reload.

## Immersive Audio
Using the Web Audio API, we generate procedural sounds (OscillatorNodes with ADSR envelopes):
- Sharp, synthetic clicks on hover/interaction.
- Toggleable atmospheric, deep-space background drones.
