# Known Bugs & Issues Tracker

This document tracks known issues, edge cases, and limitations of the MVP architecture.

## Active Bugs
- **WebGL Context Loss on Mobile Safari:** If the user toggles between Recruiter Mode and WebGL mode rapidly on older iOS devices, the WebGL context might fail to restore. 
  - *Fix Strategy:* Implement robust `dispose()` routines on `unmount` within `Scene.tsx`.
- **Procedural Audio Glitch on First Click:** Chrome's autoplay policies occasionally block the very first procedural audio click if the user hasn't sufficiently interacted with the DOM.
  - *Fix Strategy:* Attach a global `touchstart`/`click` listener that explicitly calls `audioCtx.resume()`.

## Resolved Bugs
- *None in MVP Phase.*

## Limitations
- **No SSR for 3D Assets:** The R3F Canvas is strictly `client:only="react"`. This means there is a brief hydration delay before the 3D scene appears. We mitigate this by keeping the background color matched to the theme immediately.
