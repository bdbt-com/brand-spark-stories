

## Plan: YouTube Click-Through Behavior

### Changes to `src/pages/Home.tsx` and `src/pages/Blueprint.tsx`

**1. Title area click → open YouTube in new tab**
- Wrap the title/views `div` below thumbnails with an `<a>` tag linking to `https://www.youtube.com/watch?v=${episode.videoId}` with `target="_blank"`

**2. Play button click → embed starts, then redirect to YouTube after ~4 seconds**
- Keep existing click-to-embed behavior
- Add a `useEffect` that watches `playingVideo` state — when set, start a 4-second timeout
- After timeout: open YouTube link in new tab, pause the embed by setting `playingVideo` back to `null` (which swaps iframe back to thumbnail, effectively stopping playback)

### Files to edit
- `src/pages/Home.tsx`
- `src/pages/Blueprint.tsx`

