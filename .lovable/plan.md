

# Add 2 new videos + infinite loop + touch drag/swipe

## 1. Add new videos to `podcastEpisodes` array (lines 6-10)

Add 2 unique videos (the first and third URLs are identical):
- `zz2rVKKt1l0` — need title/views (will use placeholder)
- `-a4NbW5Y718` — need title/views (will use placeholder)

Total episodes: 5 (from 3).

## 2. Fix infinite looping

The current clone-based track (`[lastClone, ...episodes, firstClone]`) already supports looping. With 5 episodes, the cloned array becomes 7 items. The `handleTransitionEnd` snap logic needs to correctly restart autoplay after snapping from clone boundaries back to real indices so the carousel never stops.

## 3. Add touch drag/swipe

Add `onTouchStart`, `onTouchMove`, `onTouchEnd` handlers to the track:
- Record start X and current translateX on touch start; pause autoplay
- On move: apply delta directly to transform (no CSS transition)
- On end: if delta > 50px threshold, advance/retreat one slide with transition; else snap back
- Resume autoplay after release
- Handle clone boundary snaps after swipe-triggered transitions

## Files changed
- `src/pages/LinkInBio.tsx` only

