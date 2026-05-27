## Replace hardcoded podcast trio with live top-3 most-viewed (scraper, no API key)

The existing `youtube-videos` edge function already scrapes the channel page — it parses `ytInitialData` but throws away the view-count text (hardcodes `viewCount: '0'`). The same `metadataRows` that we already iterate to find the "X ago" string also contain a "12K views" entry. We just need to extract it.

### 1. Enhance `supabase/functions/youtube-videos/index.ts`

- In `parseChannelHtml`, while iterating `metadataParts`, also capture the part whose text matches `/views?$/i` (e.g. "12K views", "1.2M views", "523 views").
- Add a helper `parseViewCount(text)` that converts "12.8K" → 12800, "1.2M" → 1200000, "523" → 523. Store both raw text (`viewCountText`) and numeric (`viewCountNumber`) on the returned `VideoItem`.
- Add support for `?sort=views&limit=3` query params: when `sort=views`, sort the parsed videos by `viewCountNumber` desc before slicing. `limit` caps the response length (default keeps existing 6).
- Keep existing behaviour (no params) unchanged for the homepage carousel.
- Cache key includes the sort/limit combo so the top-3 response doesn't collide with the default response.

### 2. New hook: `src/hooks/useTopVideos.ts`

Thin wrapper that calls the edge function with `?sort=views&limit=3&fresh=1` and returns `{ videos, loading, error }`. Same auth headers as `useYouTubeVideos`.

### 3. Update `src/pages/Blueprint.tsx`

- Delete the hardcoded `podcastEpisodes` array.
- Use `useTopVideos()` for the trio.
- While loading: 3 skeleton cards (same aspect ratio) so layout doesn't jump.
- On error or empty result: fall back to a small built-in 3-video constant so the section never looks broken.
- Keep existing layout (middle card highlighted), play-then-redirect after 4s, and click tracking — only the data source changes.
- Display the scraped view-count text under each title (e.g. "12K views").

### Out of scope

- Home page "Top Podcast Episodes" section — user only asked about Blueprint.
- No DB / schema changes. No new secrets.
