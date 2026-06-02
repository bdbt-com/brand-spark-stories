## Make the Podcast page show real view counts + "X ago" every load

### Why it's flaky today

- `latest_video_cache` is the data source for the hero (top card with "17h ago" and views). It's only written by `refresh-latest-video` (which uses the official YouTube Data API and is reliable). If that cron is stale (>1h old) or hasn't run yet for a brand-new upload, the page falls back to the live scraper (`youtube-videos`).
- The live scraper parses YouTube channel HTML's `metadataRows` and matches `/ago$/i` and `/views?$/i` substrings. YouTube routinely changes that markup (different layouts for Shorts, livestreams, members-only, freshly published clips), so the scrape returns blank/zero for views or no published text — that's exactly the "sometimes 0" symptom.
- The "More episodes" grid uses the same scraper and only shows `viewCountText`, never the "ago" date.

### Fix — make YouTube Data API the source of truth for every card

The `YOUTUBE_API_KEY` secret is already configured. The Data API `videos?part=statistics,snippet&id=…` endpoint accepts up to 50 IDs per call, so a single batched request enriches every video shown on the Podcast page reliably.

**1. `supabase/functions/youtube-videos/index.ts`** — after scraping the channel HTML for the video IDs/titles/thumbnails, enrich every video with one batched Data API call:

- Lift the `formatViews` and `formatRelativeTime` helpers from `refresh-latest-video` into a shared block at the top of this file.
- After `parseChannelHtml` returns the list, call `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=<comma-separated-ids>&key=…` once.
- Overwrite each video's `viewCount`, `viewCountText`, `viewCountNumber`, and `publishedAt` from the API response (use API values whenever present; only fall back to scraped values when the API call fails entirely). Convert ISO 8601 `contentDetails.duration` to a `M:SS` / `H:MM:SS` string and put it on `duration`.
- Sorting by views (`?sort=views`) becomes accurate because `viewCountNumber` is now from the API, not parsed from a "1.2K" string.
- Keep the existing 30s in-memory cache so we don't burn quota on every visit, and keep the stale-cache fallback when the channel scrape fails.

**2. `useLatestVideo`** — when the cached row in `latest_video_cache` is stale (>1h) or fails to load, the hook already calls the live function. With (1) in place that fallback is now reliable. Additionally:

- On every mount, fire-and-forget a call to `refresh-latest-video` so the cache catches up for the next load. Don't block render on it; just let it run in the background.
- Also kick the cache refresh whenever the live fallback returns a different `videoId` than the cache (means a brand-new upload landed).

**3. Surface "X ago" in the More episodes grid**

- Extend `GridEpisode` in `src/pages/Podcast.tsx` with `publishedText: string`.
- Populate it from `recentVideos[i].publishedAt` (and from `topVideos` once that's wired — see next bullet).
- Render it under the title alongside the existing view count: `views · X ago`.

**4. `useTopVideos`** currently maps only `viewCountText`. Extend it to also return `publishedText` from `v.publishedAt` so the top-views cards in the grid get the same "X ago" line.

### What the user will see after this

- Hero card: always shows real view count and "X hours/days ago" — no zero state, no need to refresh.
- More episodes grid (all 6 cards): each card now shows `12,345 views · 3 days ago` (or equivalent) on first paint, every time.

### Files

- `supabase/functions/youtube-videos/index.ts` — add Data API enrichment + duration parsing
- `src/hooks/useLatestVideo.ts` — background cache refresh on mount / on videoId change
- `src/hooks/useYouTubeVideos.ts` — already returns `publishedAt`; no change needed
- `src/hooks/useTopVideos.ts` — pass through `publishedText`
- `src/pages/Podcast.tsx` — add `publishedText` to `GridEpisode` and render it in the grid card meta line
