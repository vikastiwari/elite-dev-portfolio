# Elite Developer Portfolio - Architecture

## Overview
The `elite-dev-portfolio` is built on a high-performance, hybrid rendering architecture designed to balance immersive WebGL experiences with maximum SEO and zero-latency accessibility for ATS (Applicant Tracking Systems).

## Core Technologies
- **Astro 5:** The underlying framework providing zero-JS static HTML generation by default.
- **React 19:** Used for interactive client-side components (Astro Islands).
- **React Three Fiber (R3F) & Drei:** Drives the WebGL 3D rendering pipeline for the "Wow Factor".
- **Zustand:** Provides lightweight, global state management across Astro islands.
- **Tailwind CSS 4:** Drives utility-first styling for the HTML fallback layer.
- **Web Audio API:** Procedural audio synthesis for UI feedback without asset payload overhead.

## Architecture Diagram

```mermaid
graph TD
    A[Astro Framework] --> B[Static HTML Layer Recruiter Mode]
    A --> C[React Islands Client-Side]
    
    B --> B1[RecruiterResume.astro]
    B1 --> B2[portfolio.config.ts Data Source]
    
    C --> C1[RecruiterToggle.tsx]
    C --> C2[Terminal.tsx Simulated AI]
    C --> C3[Scene.tsx WebGL]
    
    C1 --> Z[Zustand Store usePortfolioStore]
    Z --> |Dispatches Event| E[window 'portfolio-state-change']
    E -.-> |Toggles Visibility| B
    E -.-> |Toggles Visibility| C3
    
    C3 --> R3F[React Three Fiber / Three.js]
    C3 --> AU[AudioEngine Web Audio API]
    C3 --> B2
```

## The "Recruiter Mode" Fallback
By default, the architecture provides a toggleable mode. When active, it unmounts the WebGL canvas, triggering aggressive garbage collection, and reveals a perfectly semantically structured HTML layout that scores 100 on Lighthouse.

## Config-Driven Pattern
The entire UI is a dumb rendering engine. All personal data, projects, certifications, and theme definitions live in `src/config/portfolio.config.ts`.
