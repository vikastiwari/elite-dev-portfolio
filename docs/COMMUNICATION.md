# Communication & Event Bus Architecture

## 1. The Challenge of Hybrid Architectures

Because the `elite-dev-portfolio` utilizes Astro to mix statically generated HTML (Server-Side) with highly dynamic React components (Client-Side Islands), we cannot rely purely on standard React Context providers. Wrapping the entire Astro application in a React Context would defeat the purpose of Astro's zero-JS Island architecture.

## 2. The Dual-Pronged Strategy

We employ a strict separation of concerns for inter-component communication:

### A. Zustand (`usePortfolioStore.ts`)
Used **exclusively** for React-to-React communication within and across isolated React Islands.
- **Mechanism:** Zustand provides a lightweight, global store outside the React tree. Components subscribe only to the specific slices of state they need.
- **Example Use Case:** The `RecruiterToggle.tsx` updates `isRecruiterMode` in the store. The `Terminal.tsx` (a completely separate island) listens to this store and unmounts itself when the mode is active.

### B. Custom Window Events (The Vanilla DOM Bus)
Used for React-to-Astro (Vanilla JS) communication.
- **Mechanism:** We leverage the browser's native EventTarget API. When a React component needs to trigger a change in the static HTML layer, it dispatches a `CustomEvent` to the global `window` object.
- **Performance Benefit:** This completely bypasses React's virtual DOM reconciliation cycle. Vanilla JS event listeners attached in Astro scripts manipulate the DOM (`display: none`, `opacity: 0`) with absolute zero latency.

## 3. Implementation Example

**Dispatching from React (`RecruiterToggle.tsx`):**
```typescript
const toggleMode = () => {
  const newMode = !isRecruiterMode;
  setRecruiterMode(newMode);
  
  // Dispatch native event for Astro static HTML layers to consume
  window.dispatchEvent(
    new CustomEvent('portfolio-state-change', {
      detail: { isRecruiterMode: newMode },
    })
  );
};
```

**Listening in Astro (`Layout.astro` or `index.astro`):**
```javascript
<script>
  window.addEventListener('portfolio-state-change', (e) => {
    const isRecruiterMode = e.detail.isRecruiterMode;
    const webglContainer = document.getElementById('webgl-container');
    const resumeContainer = document.getElementById('resume-container');
    
    if (isRecruiterMode) {
      webglContainer.style.display = 'none';
      resumeContainer.style.display = 'block';
    } else {
      webglContainer.style.display = 'block';
      resumeContainer.style.display = 'none';
    }
  });
</script>
```
