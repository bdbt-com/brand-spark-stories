

# Smooth rolling carousel + BDBT branding on video cards

## 1. Smooth rolling carousel animation (mobile only)

Replace the current instant-swap rotation with a CSS `translateX` sliding approach:

- Render 4 cards (3 episodes + clone of first) in an inner wrapper div
- Use `overflow: hidden` on the outer container (mobile only)
- Animate `translateX` over 2 seconds with `ease-in-out`, then pause 2 seconds
- Two-phase cycle via `useEffect` with timeouts:
  - Set `isSliding = true` → CSS transition kicks in for 2s
  - After transition ends: increment `rotationIndex`, set `isSliding = false` instantly (no transition)
  - Wait 2s pause, repeat
- When reaching the clone card, instantly reset to index 0 without transition
- Desktop grid remains static/unchanged
- Remove old scroll-centering `useEffect`

### In `src/pages/LinkInBio.tsx`:
- New states: `isSliding` (boolean)
- Replace interval with setTimeout chain
- Inner wrapper: `style={{ transform: translateX(-${offset}%), transition: isSliding ? 'transform 2s ease-in-out' : 'none' }}`
- Each card width: still `36vw` on mobile

## 2. Add "BDBT" text to bottom-right of each video card

In the info area below each video (the `<a>` block, lines 281-294), add "BDBT" text aligned to the right, on the same line as the views count.

- Wrap the views `<p>` and new "BDBT" text in a `flex justify-between` container
- "BDBT" uses same classes as views: `text-[10px] md:text-xs text-muted-foreground`
- This places views on the left and "BDBT" on the right, same line

