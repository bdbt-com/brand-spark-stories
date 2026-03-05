

## Plan: Tighten spacing + equalize link buttons + shift video row up

### 1. Shrink gap between tagline and social icons (make it equal to gap between icons and first button)
- `src/pages/LinkInBio.tsx` line 138: Change tagline `mb-5` to `mb-3`
- Social icons (line 148) already have `mb-5` on mobile — change to `mb-3` so both gaps match

### 2. Make all 3 link buttons the same size
- Currently each button auto-sizes based on content. Add a fixed height to the card wrapper (e.g. `h-16`) so all 3 buttons are identical height matching the Foundation Blueprint button.

### 3. Shift video thumbnails row up
- Line 225: Reduce `mt-5` to `mt-3` on the "Picked For You" section
- Line 226: Reduce `mb-3` to `mb-2` on the header text
- This shifts the entire video row upward so title + views are visible on first load

### Files changed
- `src/pages/LinkInBio.tsx` — spacing adjustments only (4 line changes)

