

## Plan: Make video thumbnails smaller on mobile for /bio page

### Problem
On mobile, each video card takes up too much vertical space, so only ~1 card is visible. We need at least 1.5 thumbnails visible on the opening screen.

### Solution (`src/pages/LinkInBio.tsx`)

Change the podcast episodes section on mobile to a horizontal scrollable row instead of a vertical stack:

- Replace `grid grid-cols-1 md:grid-cols-3` with a horizontal scroll container on mobile
- On mobile: use `flex overflow-x-auto snap-x` with each card set to ~60-65% width (`min-w-[60%]`) so 1.5 cards are visible
- On desktop (md+): keep the existing 3-column grid layout unchanged
- Reduce the video thumbnail `aspect-video` slightly on mobile if needed
- Add `snap-center` to each card for nice scroll snapping

### Files Changed
- `src/pages/LinkInBio.tsx`

