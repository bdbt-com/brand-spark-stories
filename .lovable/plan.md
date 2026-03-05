

## Plan: Shrink video cards and add pulse animation on mobile /bio page

### Changes to `src/pages/LinkInBio.tsx`
- Reduce mobile card width from `min-w-[65%]` to `min-w-[45%]` so the full center card plus halves of the side cards are visible on screen
- Add a subtle pulsating animation to the middle card (index 1) on mobile only

### Changes to `src/index.css`
- Add `@keyframes gentle-pulse` animation: `scale(1) → scale(1.04) → scale(1)` over 2.5s, infinite, ease-in-out

The middle card will pulse gently to draw attention, and all three cards will be small enough that the center one (plus partial side cards) fits fully on the opening screen.

