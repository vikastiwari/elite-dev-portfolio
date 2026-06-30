# Known Bugs & Mitigations

As a bleeding-edge WebGL/Edge application, there are specific platform quirks we must actively mitigate.

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
**Issue:** Browsers block programmatic audio from playing until the user interacts with the document.
**Mitigation:** The "Cinematic Loader" serves as our interaction gateway. The user must click an "Initialize System" button to dismiss the loader, which simultaneously unlocks the Web Audio API context for procedural hover sounds and background music.

## 4. Edge AI WASM Compilation
**Issue:** Cloudflare Workers prohibit dynamic WASM compilation at runtime (`WebAssembly.instantiate`), breaking many PDF/Image generation libraries.
**Mitigation:** Our AI Adapter pattern ensures that if heavy generation is required, it relies on external REST APIs or pre-compiled static WASM imports rather than dynamic evaluation.
