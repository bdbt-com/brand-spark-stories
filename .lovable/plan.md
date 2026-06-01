# Silky-smooth live feed on /admin-list

## Problem

Today the feed is fetched by `get-activity-feed`, which scans up to 10,000 `video_clicks` rows + 10,000 `email_subscriptions` rows from the last 24h on every call. That same call is on the 15-second `setInterval` alongside subscribers, analytics, video counts, and download counts — and even at 15s it ships the entire 24h list back, triggering a full re-render of every feed row. Polling that payload every 1s would melt the page.

To watch visitors arrive one-by-one, the feed needs:
1. Its own fast polling loop (1s), independent of the heavier dashboard fetches.
2. An incremental endpoint that returns only items newer than what the client already has.
3. Stable React keys + append-on-top so existing rows don't unmount on each tick.

## Changes

### 1. `supabase/functions/get-activity-feed/index.ts` — accept `since`

- Read `since` from JSON body (ISO timestamp). If absent, keep current behaviour (24h window, used for the initial load).
- When `since` is provided:
  - Use `since` instead of "24h ago" as the `gte` filter on `clicked_at` / `created_at` / `email_sent_at`.
  - Cap pagination to a single page of ~500 rows (we'll never get that many in 1s; this just protects against runaway loops).
- Always return `{ feed, server_time }` where `server_time = new Date().toISOString()` captured at the top of the handler. Client uses `server_time` as the next `since` to avoid clock skew.

### 2. `src/pages/AdminList.tsx` — split feed polling from the rest

- Add a ref `lastFeedSince` (ISO string) and a ref `feedItemKeys` (Set of stable IDs) used for dedupe.
- Build a stable key per feed item: `${type}:${timestamp}:${label}:${detail}`. Use it as the React `key` so unchanged rows are not re-mounted.
- New callback `fetchFeedIncremental()`:
  - Calls `get-activity-feed` with `{ since: lastFeedSince.current }`.
  - For each returned item, skip if key already in the Set; otherwise add to Set and collect.
  - If any new items, `setFeed(prev => [...newItems, ...prev].slice(0, 500))` (cap list length so the DOM stays small).
  - Update `lastFeedSince.current = data.server_time`.
- In the mount `useEffect`, do one initial `fetchFeed()` (full 24h, no `since`) to seed the list and `lastFeedSince`, then start a **separate** `setInterval(fetchFeedIncremental, 1000)`.
- The existing 15s interval keeps subscribers / analytics / video counts / download counts but drops `fetchFeed()` from its body.
- Pause the 1s loop when the tab is hidden (`document.visibilityState`) and immediately re-sync on `visibilitychange === 'visible'`.

### 3. Render-side smoothness

- Replace the current `key={\`${item.timestamp}-${i}\`}` with the stable key above (index-based keys cause every row to re-render whenever a new item is prepended).
- Add a light fade/slide-in for newly arrived items: track keys present in the previous render in a ref; for keys not seen before, apply a one-shot `animate-in fade-in slide-in-from-top-1` Tailwind class (already available via tailwindcss-animate). This is the "1-by-1" feel without any layout thrash.

## Notes

- No DB schema changes; no new indexes required — `video_clicks.clicked_at` and `email_subscriptions.created_at` are already the filter columns and the windows shrink from 24h to ~1s.
- Filter bar, counts, and mobile feed all read from the same `feed` state, so they benefit automatically.
- Realtime (Supabase channels on the two tables) would be even smoother, but it requires enabling replication on each table and reworking the activity-mapping logic that currently lives in `get-activity-feed`. Polling-with-`since` at 1s gives near-realtime feel with zero infra changes; we can upgrade to channels later if you want truly push-based updates.
