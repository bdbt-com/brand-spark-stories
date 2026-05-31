The data layer already scrapes fresh view counts and "X ago" text from YouTube (`youtube-videos` edge function returns `viewCountText` + `publishedAt` like "23 views" / "1 hour ago"). Today it's only refreshed once per day via two cron jobs. We'll bump it to hourly.

### 1. Database migration — replace daily cron with hourly
Drop the existing 4 daily jobs and create 2 hourly jobs:

- `refresh-youtube-videos-hourly` — runs `5 * * * *`, GETs `youtube-videos?fresh=1&limit=12` (warms in-memory cache and the recents/top lists).
- `refresh-latest-video-hourly` — runs `10 * * * *`, POSTs `refresh-latest-video` (updates `latest_video_cache` row → drives the hero card on `/podcast`).

(Staggered 5 min apart so the latest-video refresh reuses warmed scrape data.)

### 2. `src/hooks/useLatestVideo.ts`
Change the freshness window from `24 * 60 * 60 * 1000` to `60 * 60 * 1000` (1 hour) so the hook also falls back to live scrape if the cached row is older than an hour (defensive in case cron misses a run).

### Notes
- No frontend display changes — `viewCountText` and `publishedText` already render exactly the strings YouTube returns ("23 views", "1 hour ago"), so the UI auto-updates whenever the underlying data refreshes.
- Grid / Top videos hooks already pass `fresh=1` so they get up-to-the-minute numbers on each page load; the cron mainly keeps the DB-backed hero card current and the in-memory edge cache warm.