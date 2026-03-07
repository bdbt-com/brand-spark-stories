
I’ll fix the mobile carousel in `src/pages/LinkInBio.tsx` by replacing the current step-transition/reset logic with a true continuous loop engine.

## What’s causing the bugs now
- Current motion is `ease-in-out` + pause timers + transition on/off snapping, which creates visible speed changes and jump artifacts.
- Looping depends on clone-boundary index resets, so one bad timing/event can cause “runs out after 1 cycle”.
- Edge seams are visible because cards enter/exit too close to the viewport clipping boundary.

## Implementation plan

1. Rebuild mobile carousel animation to continuous linear motion
- Remove `setTimeout` autoplay cycle, `transitionEnabled`, `handleTransitionEnd`, and clone-snap index normalization.
- Use `requestAnimationFrame` with elapsed time (`dt`) and a single `offsetPx` ref.
- Move track at constant `px/sec` speed (`linear`, no easing, no pauses), so speed never changes mid-flow.

2. Make the loop truly infinite (no reset jumps)
- Keep a repeated track dataset (multi-repeat of episodes, not just one clone pair).
- Use modulo arithmetic on `offsetPx` against one full pattern width:
  - `offsetPx = (offsetPx + speed*dt) % patternWidth`
- This gives infinite wrap with zero teleport/glitch.

3. Lock true centering
- Measure exact card width + gap from DOM (`ResizeObserver` + refs).
- Compute transform from container center:
  - `translateX = centerOffset - offsetPx`
- Remove vw-guess formulas that drift off-center on some screens.

4. Hide edges fully off-screen
- Add left/right buffer area at least one full card-width beyond visible viewport.
- Render extra repeated cards on both sides so entry/exit happens outside the visible region.
- Keep `overflow-hidden`; retain subtle masks only as a safety layer, not primary fix.

5. Preserve requested pacing but continuous
- Keep “100% slower” feel by setting a lower constant speed (equivalent to current slow average pace), but without stop/start behavior.
- Expose speed as a single constant for easy tuning.

6. Keep existing visual/content behavior
- Desktop grid unchanged.
- Mobile card size and BDBT label unchanged.
- Video click/open behavior unchanged.

## Validation checklist
- Motion is constant (no acceleration/deceleration, no pauses unless explicitly reintroduced).
- Carousel never ends after one cycle (runs indefinitely).
- No visible seams or duplicate-edge artifacts in viewport.
- Active visual alignment remains centered on common mobile widths (375/390/414).
