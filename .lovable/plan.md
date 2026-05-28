No API key needed — the `youtube-videos` edge function already scrapes view counts from the channel HTML and returns them as `viewCount` (e.g. "12K views", "1.4M views") on every video.

## The bug

In `src/pages/LinkInBio.tsx` line 92, the mapping hard-codes `views: ''`, throwing the scraped count away:

```ts
ytVideos.slice(0, 6).map(v => ({ videoId: v.videoId, title: v.title, views: '' }))
```

## Fix

Forward the real value:

```ts
ytVideos.slice(0, 6).map(v => ({ videoId: v.videoId, title: v.title, views: v.viewCount || '' }))
```

That's the only change — the carousel card already renders `episode.views` (the `INITIAL_EPISODES` fallback uses the same shape).

## "Update every 24 hours"

The hook calls the edge function with `?fresh=1` on every page load, which bypasses the 30s in-memory cache and re-scrapes YouTube live. So counts are already as fresh as possible per visit — no cron job needed, no API key needed.