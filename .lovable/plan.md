## Goal

Make every physical click on `/podcast` count toward the existing dashboard tiles, so the Podcast page stops being a "second silo".

Two small changes — one frontend, one edge function.

### 1. Podcast page → Bio Button Clicks

`src/pages/Podcast.tsx` currently fires:

- Spotify  → `trackClick("podcast-spotify")`
- Blueprint → `trackClick("podcast-blueprint")`

Those IDs aren't aggregated anywhere on `/admin-list`. Change them to the same IDs the `/bio` page uses so they land in the existing **Bio Button Clicks** cards:

- Spotify  → `trackClick("button-spotify")`
- Blueprint → `trackClick("button-blueprint")`

(YouTube on `/podcast` is the main hero thumbnail/CTA — that is a video click, not a button click, so we leave it on the video-click path.)

The "Bio Button Clicks" section heading on `/admin-list` becomes a slight misnomer, but the user asked specifically for "blueprint and spotify buttons on podcast page should record to these data points", so we keep the existing tiles intact and just feed them.

### 2. Podcast page video clicks → Video Clicks tiles

`/podcast` records video clicks with prefixed IDs:

- Hero CTA / thumbnail → `latest-page:${videoId}`
- 8s / 45s idle auto → `latest-auto:${videoId}`
- "More episodes" grid → `latest-grid:${videoId}`

The Video Clicks tiles on `/admin-list` look up `videoCounts[videoId]` (raw videoId), so none of those clicks are counted today.

`supabase/functions/get-video-clicks/index.ts` already de-prefixes `auto-redirect:` and folds counts back onto the bare `videoId`. Extend the same logic to also strip and fold these three prefixes:

- `latest-page:` → bare videoId
- `latest-auto:`  → bare videoId
- `latest-grid:` → bare videoId

Implementation: replace the single `if (vid.startsWith("auto-redirect:"))` branch with a small list of known prefixes (`auto-redirect:`, `latest-page:`, `latest-auto:`, `latest-grid:`). For each match, add the row's stats both to the bare videoId and to the existing aggregate bucket (`auto-redirect` keeps working for the redirect tiles; we don't need new aggregate buckets for the others). No DB / RPC change needed — `get_video_click_counts` already returns the full keyspace.

### 3. Verification

- Click Spotify and Blueprint on `/podcast` → numbers tick up in Bio Button Clicks (Spotify / Blueprint cards) on `/admin-list`.
- Click a "More episodes" thumbnail and the hero CTA on `/podcast` → that video's tile in the Video Clicks grid increments.
- Existing `/podcast` redirect and `/bio` button counters keep working unchanged.

### Files

- edit: `src/pages/Podcast.tsx` (2 string changes)
- edit: `supabase/functions/get-video-clicks/index.ts` (extend prefix-folding)
