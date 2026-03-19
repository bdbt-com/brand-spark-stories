

# Fix broken trend percentage calculations

## Root Causes

### 1. Page Analytics: baselines break nested-window math
The trend function assumes `14d_total - 7d_total = clicks from days 8-14`. But baselines add fixed historical numbers (7d: +528, 14d: +1300), so the subtraction produces `772 + actual_difference` — a meaningless number.

### 2. Video/Bio/Auto-redirect 30d: wrong outer period
The 30d trend compares against `total / launchDays` where launchDays = 447. But tracking only started ~15 days ago, so `total` ≈ `30d`. The "prior" becomes near-zero over 400+ days, producing thousands-of-percent swings.

## Fix

### 1. Edge function: return live-only counts separately for Page Analytics
Add a `live` object alongside the existing combined totals so the frontend can use clean data for trend math while still displaying the combined number.

```ts
// In get-page-analytics response:
results[key] = {
  visitors: combinedVisitors,      // display number (with baseline)
  avg_duration: combinedAvg,
  live_visitors: liveVisitors,     // NEW — for trend calculations
};
```

### 2. Frontend: use live-only data for Page Analytics trends
`TrendBadge` for Page Analytics uses `live_visitors` instead of `visitors` for the trend math.

### 3. Frontend: fix 30d outer period for video/bio/auto-redirect
Replace `launchDays` (~447) with actual tracking age (~15 days from March 4, 2026). Since `total` only contains data since tracking started, `outerDays` should reflect that.

```ts
const TRACKING_START = new Date("2026-03-04");
const trackingDays = Math.max(1, Math.round((Date.now() - TRACKING_START.getTime()) / 86400000));
```

Use `trackingDays` instead of `launchDays` for all 30d trend comparisons on video clicks, bio button clicks, and auto-redirects. If `trackingDays <= 30`, hide the 30d trend badge (not enough data for a meaningful comparison).

### Files changed

| File | Change |
|------|--------|
| `supabase/functions/get-page-analytics/index.ts` | Add `live_visitors` field to response |
| `src/pages/AdminList.tsx` | Use `live_visitors` for Page Analytics trends; replace `launchDays` with `trackingDays` for video/bio/auto-redirect 30d; hide 30d badge when insufficient data |

