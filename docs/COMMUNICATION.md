# Communication Strategy

## DOM to Canvas Communication
A common pitfall in WebGL React applications is prop-drilling state changes from HTML UI overlays down into the 3D scene, which triggers expensive React reconciliations and drops frames.

To solve this, we rely on **Zustand** as a transient state manager.

### The Zustand Store
`useStore.ts` acts as the single source of truth.
- **DOM Components** (like a theme toggle button) call standard state setters (e.g., `setTheme('cyberpunk')`).
- **Canvas Components** do *not* subscribe to the reactive state directly if it causes re-renders. Instead, they use `useStore.getState()` inside the `useFrame` loop, or subscribe to transient updates, mutating object references directly.

### Example 1: Theme Switching
1. User clicks the "Matrix" theme button in the DOM `HUD.tsx`.
2. Zustand state `theme` updates.
3. A `useEffect` in the DOM updates CSS variables for HTML colors.
4. A subscriber in `Scene.tsx` detects the change and pushes the new hex colors to a WebGPU Shader Uniform, instantly updating the 3D lighting without re-mounting any geometries.

### Example 2: Audio-Reactive & Massive Compute Shaders (TSL)
1. Whether extracting Web Audio FFT data or animating 1,000,000 particles in the `GitHubGlobe`...
2. We *never* set this positional/audio data to a React state.
3. Instead, we directly mutate the persistent TSL Uniform (`myAudioUniform.value = fftAvg`) or use WebGPU Storage Buffers.
4. This completely bypasses React reconciliation and directly uploads the new data to the WebGPU compute shader, preventing garbage collection micro-stutters and preserving perfect 120 FPS.

## Client to Edge AI Communication
- The AI chat interface connects to `/api/chat`.
- To mask Time-To-First-Token (TTFT) latency, the Edge function streams the LLM response back to the client using **Server-Sent Events (SSE)**.
- The UI handles the incoming stream chunk-by-chunk to create the typing effect.

## ZK-Vault Cryptographic Communication
- The vault executes mathematically isolated.
- The `secretCode` input is strictly bounded to the React component scope. It is never passed to a Zustand store, preventing memory leaks, and is instantly pushed to the `snarkjs.groth16.fullProve` WASM worker.
- The result is a mathematically pure validation without external API dependency.
