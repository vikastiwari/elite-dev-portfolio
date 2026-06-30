# Communication Strategy

## DOM to Canvas Communication
A common pitfall in WebGL React applications is prop-drilling state changes from HTML UI overlays down into the 3D scene, which triggers expensive React reconciliations and drops frames.

To solve this, we rely on **Zustand** as a transient state manager.

### The Zustand Store
`useStore.ts` acts as the single source of truth.
- **DOM Components** (like a theme toggle button) call standard state setters (e.g., `setTheme('cyberpunk')`).
- **Canvas Components** do *not* subscribe to the reactive state directly if it causes re-renders. Instead, they use `useStore.getState()` inside the `useFrame` loop, or subscribe to transient updates, mutating object references directly.

### Example: Theme Switching
1. User clicks the "Matrix" theme button in the DOM `HUD.tsx`.
2. Zustand state `theme` updates.
3. A `useEffect` in the DOM updates CSS variables for HTML colors.
4. A subscriber in `Scene.tsx` detects the change and pushes the new hex colors to a WebGPU Shader Uniform, instantly updating the 3D lighting without re-mounting any geometries.

## Client to Edge AI Communication
- The AI chat interface connects to `/api/chat`.
- To mask Time-To-First-Token (TTFT) latency, the Edge function streams the LLM response back to the client using **Server-Sent Events (SSE)**.
- The UI handles the incoming stream chunk-by-chunk to create the typing effect.
