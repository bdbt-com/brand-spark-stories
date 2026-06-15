# Fix podcast videos not displaying on mobile

## Problem
On the homepage "Learn For Free Every Day" section (and the matching section on `/blueprint`), each of the 3 podcast episodes is rendered as a lazy-loaded YouTube `<iframe>`. On mobile (especially iOS Safari and in-app browsers like the Lovable preview app), these iframes frequently fail to paint — the card shows only the title/views, with a blank or grass-only area where the video should be. That's what the screenshot shows.

## Fix
Switch the cards from "always-embedded iframe" to a "thumbnail poster, then iframe on tap" pattern. The thumbnail is a plain `<img>` from YouTube's CDN (`https://img.youtube.com/vi/{videoId}/hqdefault.jpg`), which renders reliably on every mobile browser. Tapping the card swaps in the iframe with `autoplay=1` so playback behaviour is unchanged for users who actually want to watch.

### Files to change
1. `src/pages/Home.tsx` — replace the iframe block inside the `PODCAST_EPISODES.map(...)` (lines ~461–478) with a click-to-play thumbnail card. Add a small `EpisodeCard` component (local to the file) that tracks a `playing` state and renders either the `<img>` poster (with a gold play-button overlay matching the brand) or the `<iframe>` after the user taps.
2. `src/pages/Blueprint.tsx` — apply the same EpisodeCard pattern to its `podcastEpisodes` trio for consistency.

### Behaviour details
- Poster image uses `hqdefault.jpg` (480×360, available for every video) with `loading="lazy"` and `decoding="async"`, `object-cover` over the existing `aspect-video` container.
- Overlay: centred circular button using `bg-primary text-primary-foreground` (brand gold) with a `Play` lucide icon.
- On tap, set `playing=true` and render the iframe with `?autoplay=1&playsinline=1` so it starts immediately on mobile.
- Keep the outer card styling, title, and views text exactly as they are.
- No backend, data, routing, or analytics changes.

## Out of scope
- No change to which 3 episodes are shown.
- No change to the hero image or any other section.
- No change to `pinnedTopVideos.ts`.
