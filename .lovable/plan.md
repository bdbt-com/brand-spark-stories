## Add social row + platform buttons to /podcast

### 1. Above the hero thumbnail
Add a small centered row with two greyed-out brand icons (Instagram, TikTok), non-clickable, `opacity-40`, ~`w-6 h-6` (slightly larger on sm). Purely decorative — signals other channels without distracting from the YouTube CTA.

```
[ IG ]   [ TT ]
[ thumbnail ]
title / meta
[ Watch on YouTube ] (full-width, unchanged)
[ Spotify ]  [ Blueprint ]   ← new row
```

### 2. New button row under "Watch on YouTube"
A 2-column grid (`grid-cols-2 gap-2.5 sm:gap-4`), each a square-ish rounded card (`aspect-square` on mobile capped via `max-h-20 sm:max-h-24`, or `h-16 sm:h-20` rectangular — use rectangular for nicer mobile fit, `rounded-xl`, border + bg-card).

- **Left — Spotify**: Spotify SVG (reuse the path from `LinkInBio.tsx` socialLinks) in Spotify green (`#1DB954`), label "Spotify" beside it. Clicking calls `startTrackedRedirect`-style tracking but it's NOT a YouTube link — use a direct `window.open` (or plain anchor `target="_blank"`) to the Spotify show URL. Also fire a tracking ping to `track-video-click` with `trackId="podcast-spotify"` so it shows up in AdminList.
- **Right — Blueprint**: Lucide `BookOpen` (or `Map`) icon in `text-primary` (gold), label "Blueprint". Internal `Link` to `/blueprint`. Tracking ping with `trackId="podcast-blueprint"`.

Both buttons also call `setRedirected(true)` so the 10s idle auto-redirect is cancelled when the user interacts with them.

### 3. Activity feed labels
Extend `supabase/functions/get-activity-feed/index.ts` parser:
- `podcast-spotify` → "Click from /podcast (Spotify)"
- `podcast-blueprint` → "Click from /podcast (Blueprint)"

### 4. Tracking helper
Add a tiny helper in `src/lib/youtube-redirect.ts` (or inline) `trackClick(trackId: string)` that POSTs to `track-video-click` without navigating, so we can log Spotify/Blueprint clicks without going through the `/redirect` bridge (which is YouTube-specific).

### Files changed
- `src/pages/Podcast.tsx` — add greyed social row + new 2-button row, cancel idle timer on click.
- `src/lib/youtube-redirect.ts` — add `trackClick(trackId)` helper.
- `supabase/functions/get-activity-feed/index.ts` — recognise new trackIds.

### Out of scope
- No changes to `/bio`, the hero card, or the More Episodes grid.
- No DB migration; new trackIds reuse `video_clicks` table (the `video_id` column stores the trackId string, same pattern as existing `button-*` ids).
