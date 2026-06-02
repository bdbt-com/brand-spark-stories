## Verification: redirects ARE being recorded

I checked the database directly. In the last hour: **460 podcast redirects** (`latest-auto:*`) and **1 bio redirect** (`auto-redirect:*`), plus 60 podcast-page clicks. Today's totals: 1,162 podcast redirects, 4 bio redirects. So tracking is healthy — the issue is purely that the stat boxes only re-fetch every 15 s, so the numbers feel frozen even while the live feed is moving.

Two contributing bugs I'd fix at the same time:
1. `fetchDailyStats` runs once on mount and is NOT in the 15 s loop, so graphs never refresh.
2. None of the "Today — Live" boxes refresh faster than 15 s.

## Plan

### 1. New lightweight tick endpoint — `get-live-tick`

`supabase/functions/get-live-tick/index.ts` returning a small JSON payload (under ~200 bytes):

```ts
{
  visitors_today: number,        // distinct sessions since UTC midnight
  subscribers_today: number,
  bio_clicks_today: number,      // distinct sessions hitting /bio or /links
  podcast_clicks_today: number,  // distinct sessions hitting /podcast
  bio_redirects_today: number,   // video_clicks: auto-redirect / auto-redirect:%
  podcast_redirects_today: number, // video_clicks: latest-auto:%
  total_clicks_today: number,    // all video_clicks today
  server_time: string
}
```

Backed by a single new SQL function `get_today_live_tick()` (security definer) that runs all six counts in one round-trip from the existing tables/indexes — no schema changes, no new tables. Registered in `config.toml` with `verify_jwt = false`.

### 2. Wire it to `AdminList.tsx`

- Add `liveTick` state.
- Add a separate `setInterval(fetchLiveTick, 2000)` (2 s — smooth without hammering). Pause when `document.visibilityState === 'hidden'`, resume on `visibilitychange`.
- Add `fetchDailyStats` + `fetchAnalytics` to the existing 15 s loop so graphs/period stats actually refresh (right now only feed + subs/videos/downloads do).
- For the "Today — Live" cards (Visitors, New Subs) and the inline "/bio clicks" line, prefer `liveTick` values with `analytics["today"]` as fallback so the numbers tick every 2 s instead of every 15 s.

### 3. Smooth count-up animation — `<AnimatedCounter />`

A tiny component (`src/components/AnimatedCounter.tsx`, ~30 lines) that tweens from the previous value to the new value over 600 ms using `requestAnimationFrame` and `easeOutCubic`. Used everywhere a live number is shown: the three Today cards, /bio clicks line, today columns of video tables, today subs counter. So when the tick endpoint reports +3 visitors, the digit smoothly rolls up 1→2→3 instead of jumping.

### 4. Performance / lag answer

- **Network:** 1 request every 2 s, ~200 byte response. ~30 req/min. Negligible.
- **DB:** six indexed `COUNT` queries in one RPC; `clicked_at` and `entered_at` are already used as filter columns. Each query is millisecond-scale.
- **Browser:** `AnimatedCounter` uses `requestAnimationFrame`, runs only when a value changes, and unmounts cleanly. No layout thrash because we only animate text content, not size.
- **Tab background:** polling pauses entirely when the tab is hidden so it won't drain battery or quota.
- **Why 2 s and not 1 s for stats:** at 1 s the UI flickers between identical values most ticks (counts rarely change every single second), and `AnimatedCounter`'s 600 ms tween blends 2 s gaps perfectly into a constantly-moving feel. The live feed itself stays at 1 s — that's where the eye-candy lives.

### Files touched

- new: `supabase/functions/get-live-tick/index.ts`
- new: `src/components/AnimatedCounter.tsx`
- edit: `supabase/config.toml` (register function)
- edit: `src/pages/AdminList.tsx` (new poll, mount fetchDailyStats into 15 s loop, swap numeric `<p>` for `<AnimatedCounter />`)
- migration: add `get_today_live_tick()` SQL function

No table/schema changes, no RLS changes.