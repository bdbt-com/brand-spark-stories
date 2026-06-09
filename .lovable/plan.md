## Why AdminList isn't loading

Your Supabase project status is **Unhealthy** with **155,481 DB requests in 24h** on nano compute (screenshot). Every edge function is returning Cloudflare 522 / 504 IDLE_TIMEOUT because the DB is saturated. This is what's blocking AdminList from loading — the page itself is fine, but every fetch it makes to the backend times out.

The culprit is `src/pages/AdminList.tsx`:

```
get-live-tick           → polled every 1000ms
get-activity-feed       → polled every 1000ms
get-page-analytics      → polled every 15000ms  (× 6 heavy functions)
get-page-stats          → polled every 15000ms
admin-email-stats       → polled every 15000ms
get-video-clicks        → polled every 15000ms
get-download-counts     → polled every 15000ms
get-daily-stats         → polled every 15000ms
```

Even one open tab fires ~190 requests/minute (>270k/day). When you also have `/admin-list` or other tabs left open in a browser somewhere, the nano DB collapses. Existing `visibilityState === "hidden"` early-returns in the two fast pollers still let the `setInterval` fire (and burn through the function gateway) and don't help the slow pollers at all.

## Fix

Reshape polling around tab visibility and slow it down — without changing any UI, layout, animation, or analytics logic.

### Behaviour

1. **Tab hidden → fully pause.** Clear every interval (live-tick, feed, slow loop). Backend keeps collecting data normally from real users via the existing `/track-*` endpoints; AdminList just doesn't ask for it.
2. **Tab visible → resume.** Re-fetch once immediately so the user sees fresh numbers, then restart the intervals.
3. **Cadence reduced** to safe values for nano compute:
   - `get-live-tick`: 1s → **5s**
   - `get-activity-feed` incremental: 1s → **4s** (queue still releases items one-by-one at 560ms, so visual feel is unchanged — just batched per fetch)
   - Slow loop (analytics/stats/subs/etc.): 15s → **60s**
4. **Top-down progressive load on (re-)entry.** The initial `fetchFeed()` already returns up to ~10k items sorted newest-first. Render the first 50 immediately so the page is interactive, then reveal the rest in 50-item chunks via `requestIdleCallback` / `setTimeout(…, 0)` until the cap of 500 is reached. No spinner blocking the page; live queue animation only kicks in for *new* items arriving after that.
5. **Stale-data badge (tiny, non-intrusive).** When hidden ≥ 30s, on resume show "Catching up…" next to the existing green pulse for ~1s while the first refetch lands. Pure cosmetic, no layout shift.

### Files touched

- `src/pages/AdminList.tsx` — only the polling `useEffect` (≈ lines 460-501), the two visibility-guard early returns (now redundant), and a small progressive-reveal helper inside `fetchFeed`. No JSX, no styling, no animation, no data shape changes.

### Out of scope

- No edge function changes.
- No DB / RPC / schema changes.
- No changes to feed queue animation, layout, country labels, counters, or graphs.
- Does **not** fix the Supabase project itself being currently "Unhealthy" — once requests drop, the DB will recover within a few minutes; if it doesn't, you'll need to restart the project or upgrade compute from `nano` in the Supabase dashboard.

### Expected impact

Per open AdminList tab, requests/minute drop from ~190 to ~**18** while visible and to **0** while hidden — roughly a **10–20× reduction**, well within nano's budget.