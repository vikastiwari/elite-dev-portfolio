# Known Bugs & Mitigations

As an advanced WebGL/Edge application, there are specific platform quirks we must actively mitigate.

## 1. Safari 18 View Transitions DOM Detachment
**Issue:** Safari 18 has a critical bug with the View Transitions API. When swapping the `<body>` tag, Safari briefly detaches elements. If a WebGL `<canvas>` is detached, Safari permanently loses the WebGL context, causing a silent crash.
**Mitigation:** We have rejected the brittle programmatic DOM hacking proposed in early research. Instead, we completely decouple the WebGL `<Canvas>` from Astro's View Transitions. The canvas lives in a persistent layout shell that is never swapped, ensuring 100% stability.

## 2. Mobile Thermal Throttling
**Issue:** Running N-body physics and post-processing bloom at 120 FPS will overheat mobile processors (like iPhones) rapidly, causing frame drops and battery drain.
**Mitigation:** Drei's `<PerformanceMonitor>` is integrated into the core `<Scene>`. If the client averages below 60 FPS for more than 2 seconds, the system automatically:
- Reduces the Device Pixel Ratio (dpr) to 1.
- Disables expensive post-processing (bloom/ambient occlusion).
- Limits the background particle count.

## 3. Web Audio Autoplay Policies
**Issue:** Browsers block programmatic audio from playing until the user interacts with the document. Furthermore, creating an `AudioContext` automatically triggers a suspended state.
**Mitigation:** The "Cinematic Loader" (or a subsequent interaction gate) serves as our interaction gateway. The user must explicitly click to dismiss the loader or engage the AI, which simultaneously unlocks the Web Audio API context for both procedural hover sounds and TSL compute shader FFT extraction.

## 4. Edge AI WASM Compilation
**Issue:** Cloudflare Workers prohibit dynamic WASM compilation at runtime (`WebAssembly.instantiate`), breaking many PDF/Image generation libraries.
**Mitigation:** We explicitly avoid Edge-side PDF generation. Instead, we use `@react-pdf/renderer` purely on the client side, allowing WASM to execute in the user's browser, resulting in 0 latency and 0 server cost.

## 5. Background WebGPU Battery Drain
**Issue:** Hiding the R3F `<Canvas>` using CSS (e.g., `opacity: 0`) during Focus Mode still allows the `requestAnimationFrame` loop to fire at 120 FPS, silently draining the user's battery.
**Mitigation:** We utilize R3F's `frameloop` prop bound to a Zustand state. When Focus Mode is active, `frameloop="never"` completely pauses WebGPU execution without destroying the VRAM context, guaranteeing 0% GPU usage.
