# Communication & Event Bus

## Overview
Because the architecture utilizes Astro to mix statically generated HTML and highly dynamic React components (Islands), we cannot rely purely on React Context for cross-boundary communication.

## Global State vs. DOM Events
We employ a dual-pronged approach:

1. **Zustand (`usePortfolioStore.ts`)**
   - Used *exclusively* for React-to-React communication.
   - Example: The `RecruiterToggle.tsx` updates `isRecruiterMode` in the store, which `Terminal.tsx` listens to.

2. **Custom Window Events**
   - Used for React-to-Astro (Vanilla JS) communication.
   - Example: When `RecruiterToggle.tsx` updates the state, it simultaneously dispatches a `portfolio-state-change` event to the `window`.
   - The vanilla JavaScript script tag inside `index.astro` and `RecruiterResume.astro` listens for this event to execute ultra-fast DOM manipulations (toggling CSS `display` and `opacity`), completely bypassing React's reconciliation cycle for the static layers.

### Event Definition
```javascript
window.dispatchEvent(new CustomEvent('portfolio-state-change', { 
  detail: { isRecruiterMode: boolean } 
}));
```
