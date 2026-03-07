

# Fix centering + slow down carousel

## Changes in `src/pages/LinkInBio.tsx`

### 1. Center the paused card
Currently the first card sits at the left edge. Fix by calculating a base offset to center the active card in the viewport, then each slide shifts by one card width + gap.

- Remove `px-4` from inner flex div
- Use a calculated base offset: `calc(50vw - 18vw)` = `32vw` (half viewport minus half card width) to center the first card
- Slide offset: `calc(36vw + 0.5rem)` per step (card width + gap)
- Transform formula: `translateX(calc(32vw - ${currentSlide} * (36vw + 0.5rem)))` where `currentSlide` is 0 when paused, 1 when sliding

### 2. Double all timings (100% slower)
- Slide duration: 2s → 4s
- Pause duration: 2s → 4s
- Update both `setTimeout` values and the CSS `transition` duration

