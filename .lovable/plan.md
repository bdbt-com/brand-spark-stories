## 1. Live-tick the redirect/click tiles from the activity feed

Today the redirect numbers (e.g. `Current /podcast Latest Video Redirects: 191`, plus per-video click tiles) only update when `get-video-clicks` polls. When activity feed pushes in a new redirect, the tile sits still until the next poll. Fix: optimistically bump the matching `videoCounts` entry the moment a feed item is released.

### Edge function change
`supabase/functions/get-activity-feed/index.ts` — include the raw `video_id` on each click/redirect item so the client knows which `videoCounts` key to bump:

```ts
items.push({ type, label, detail, timestamp: ts, country, rawId: vid });
```

Apply for every `click` and `redirect` push (latest-auto, latest-page, latest-grid, auto-redirect, bio-click, button labels, bare ids). Leave `signup` and `download` unchanged.

### Frontend change (`src/pages/AdminList.tsx`)

- Extend `FeedItem` with `rawId?: string`.
- In the feed pump's `release()` (around line 601), after `setFeed(...)`, call a new `bumpFromFeedItem(next)` that mutates `videoCounts`/`bioClicks`/`podcastClicks`/`liveTick` by +1 in the right buckets based on `rawId`:
  - `latest-auto:<id>` → `videoCounts["latest-auto:" + id]` (drives the Latest Video Redirects tile), AND `liveTick.podcast_redirects_today` += 1.
  - `auto-redirect:<id>` or bare `auto-redirect` → `videoCounts["redirect:" + id]` (or `auto-redirect`), AND `liveTick.bio_redirects_today` += 1.
  - `latest-page:<id>` / `latest-grid:<id>` / `bio-click:<id>` / bare `<id>` → bump `videoCounts[<id>]` (the bare-id click bucket the tiles read from), AND `liveTick.podcast_clicks_today` / `bio_clicks_today` accordingly.
  - Button keys (`button-blueprint`, `podcast-spotify`, etc.) → `videoCounts[<key>]`.
- For each bump, increment `total`, `today`, `7d`, `14d`, `30d` (a brand-new redirect counts in every recent window).
- Dedup using `feedKey(item)` so the same feed item never bumps twice (the existing `feedItemKeys` set already enforces this — we just piggyback on it).
- Result: every redirect that appears in the feed ticks the matching tile up by exactly 1 immediately, and `AnimatedCounter` will animate it. Next poll of `get-video-clicks` reconciles to the authoritative number.

No behaviour change for `signup`/`download` feed items — those tiles are already wired to their own counters.

## 2. Page Visitors graph (Today): show the line AND the signup dots together

Two bugs to fix in `src/pages/AdminList.tsx`:

### a) Today's visitor line is hidden behind the scatter dot
`emailMarkers` currently uses `Math.max(1, Math.round(nearest / 4))` as a fallback `y` value when the signup's hour bucket isn't present in `hourlyStats`. That fabricates a y around 700 and forces the chart's Y axis to scale to ~800, pushing the actual low visitor counts flat against the x-axis so the line looks missing.

Fix the `findY` helper (lines 333-339):

- If `visitorsByHour` has the exact hour, return that value.
- Otherwise, look up the **closest earlier hour** that exists in `hourlyStats` (interpolate-by-floor). If none earlier exists, fall back to `0`.
- Remove the `nearest/4` fabrication.

This pins each dot ON the visitor line at the matching hour, instead of floating in space.

### b) Make sure the line is drawn over the entire 24-hour today window

`get_hourly_stats_today` only returns midnight → current hour. That is fine for the line, but recharts won't draw a line through a single data point. To guarantee the line renders even when only one hour has data:

- In `fetchDailyStats`, after `setHourlyStats(data.hourly)`, pad `hourlyStats` client-side so it always contains every hour from midnight UTC through the current hour (zeros for missing hours). The RPC already does this, but defensively re-pad on the client in case any hour is missing.
- Render order in `InlineGraph`: keep `<Line>` **after** `<Scatter>` (already done) so the visitor stroke sits on top and visibly threads through the dots.

After these two changes, the Today visitor graph shows a continuous white line for the day so far, with gold/cyan dots sitting exactly on the line at each signup's hour.

## 3. ads.txt for AdSense

`public/ads.txt` already exists with the exact line you uploaded:

```
google.com, pub-8736580968690323, DIRECT, f08c47fec0942fa0
```

Vite serves `public/*` at the root, so `https://bigdaddysbigtips.com/ads.txt` already returns this content. No change needed — I'll verify it's present and reachable, and if AdSense is still unhappy I'll investigate further (likely a propagation delay on their side, not a code issue).

## Files touched

- `supabase/functions/get-activity-feed/index.ts` — add `rawId` to click/redirect items.
- `src/pages/AdminList.tsx` — extend `FeedItem`, add `bumpFromFeedItem`, fix `findY`, defensive 24h padding for `hourlyStats`.

No DB migrations, no other graph or tile behaviour changes.
