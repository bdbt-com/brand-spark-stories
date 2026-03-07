
Goal: make the mobile “Picked For You” carousel truly centered, smooth (no teleport/glitch), and start with a subtle “already 80% complete” movement on first page load.

What I will change

1) Rebuild only the mobile carousel logic in `src/pages/LinkInBio.tsx` (desktop untouched)
- Stop reordering the array each cycle (this is causing visual popping).
- Render a stable track with clones at both ends (e.g. `[lastClone, ep1, ep2, ep3, firstClone]`) so looping is seamless.
- Keep card DOM nodes stable with fixed keys (no remount flicker).

2) Fix centering properly (device-accurate, not brittle vw math)
- Use refs + measured dimensions (`cardWidth`, `gap`, `containerWidth`) to compute exact translate offset.
- Center formula will always place active card midpoint at container midpoint.
- Remove the current calc-based guesswork that is drifting off-center.

3) Replace timeout-based “toggle + reorder” with deterministic slide phases
- Keep a `currentIndex` and `isAnimating` state.
- Animate one card-step left, then pause, repeat.
- Keep “100% slower” pacing by default at:
  - move: 4s
  - pause: 4s
- Use `transitionend` (not only timers) to finalize each step cleanly, then normalize index at clone boundaries without visible jump (transition off for one frame, then on again).

4) Implement your requested first-impression behavior (“80% done on open”)
- On first mount, start at 80% progress of the incoming slide (right card moving into center), then finish the remaining 20% quickly and pause.
- After this first finish, continue normal 4s move / 4s pause loop.

5) Remove edge artifacts (“lines” / disappear-reappear seams)
- Add GPU transform optimizations to the moving track (`transform-gpu`, `will-change: transform`).
- Ensure thumbnails are block-level and clipped cleanly (`img.block`, `overflow-hidden`).
- Add subtle left/right gradient edge masks matching page background to hide hard clipping at viewport edges.
- Keep clone reset fully offscreen so no teleport is visible.

Technical implementation details

- States:
  - `currentIndex` (real track index, starts at centered middle card)
  - `isAnimating`
  - `isFirstCycle`
  - measured layout state (`cardWidthPx`, `gapPx`, `containerWidthPx`)
- Derived transform:
  - `translateX = centerOffset - currentVisualIndex * stepPx`
  - `stepPx = cardWidthPx + gapPx`
- Loop boundary handling:
  - If on clone index after transition, instant-snap to equivalent real index with transition disabled for one frame.
- Interaction safety:
  - Pause autoplay while a video is being played/opened.
- Keep your existing mobile card size (36vw) and BDBT label styling unchanged unless needed for centering precision.

Acceptance checks I will use
- Paused card is visually dead-center on mobile widths.
- No visible jump at loop boundary.
- No edge “line” artifacts during slide.
- First load shows movement already near completion, then settles.
- Movement/pause cadence feels slower and stable (4s move / 4s pause).
