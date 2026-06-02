## Goal

Make `/admin-list` feel professional and live — feed items pop in one-by-one with a subtle animation, every period stat ticks up in sync with Today, and reclaim the empty space next to Latest Video Redirects by relocating the Avg Time / New Subs cards.

All edits stay inside `src/pages/AdminList.tsx`. No backend changes.

### 1. Live feed — staggered, individual pop-in (replaces "all-at-once" refresh)

Today, `fetchFeedIncremental` (every 1 s) prepends 0–N new items in a single batch and the existing CSS animation runs on all of them simultaneously. Two changes:

- **Per-item animation-delay**: when feed state updates, give each newly-inserted item an `animationDelay` based on its index in the `fresh[]` batch (e.g. `i * 120ms`, capped at ~600 ms total). The existing `animate-in fade-in slide-in-from-top-1 duration-300` already runs — just add inline `style={{ animationDelay }}`. Result: a batch of 5 incoming events visibly waterfalls in over ~600 ms instead of slamming together.
- **Slightly richer animation**: bump duration from 300 ms → 450 ms, swap to `slide-in-from-top-2`, and add `ease-out` so each row glides in cleanly. Subtle, not overdone.

Apply the same change in both feed render sites (mobile compact list ~L434 and desktop sidebar ~L992).

### 2. All period stats tick in sync with Today

Today's number updates every 1 s from `liveTick`. The 7d / 14d / 30d / Since-Launch / Total numbers only refresh when `fetchAnalytics` runs (every 15 s), so they appear "frozen" while Today is climbing. Fix by tracking the delta since the last analytics fetch and adding it to every longer-period display until the next fetch overwrites everything.

Implementation:

- New ref `analyticsBaseline = useRef<{ visitors:number; bioClicks:number; podcastClicks:number; bioRedirects:number; podcastRedirects:number } | null>(null)`.
- After each successful `fetchAnalytics` / `fetchDailyStats` (the calls that populate `analytics`, `bioClicks`, `podcastClicks`), capture `liveTick` values into the ref as the new baseline (or 0 if `liveTick` is null).
- Compute `delta = currentLiveTick.X - baseline.X` (clamped ≥ 0).
- Every visible 7d / 14d / 30d / since-launch / Total number for visitors, /bio clicks, /podcast clicks, /bio redirects, /podcast redirects becomes `period.value + delta` instead of `period.value`. The `AnimatedCounter` then odometer-rolls every period card simultaneously.
- Same logic for the **video click** rows (`videoCounts`) keyed off the `total_clicks_today` delta is impractical because we'd need per-video deltas; instead, keep video totals as-is for now (fetched on the slow loop) — clarify at end of plan if user wants this too.

Also applies to:

- Subscribers: the "Total Subscribers" / period subscriber numbers (if shown) use `subscribers_today` delta vs baseline. (Today already animates.)
- Latest Video Redirects card: extend the same delta to its `7d / 14d / 30d / Total` (today number already ticks).

This is a pure UI projection — no extra DB load.

### 3. Layout — move Avg Time + New Subs into the empty space beside Latest Video Redirects

Currently:

- "Today — Live" section (~L489–520) sits near the top with two big cards (Avg Time, New Subs) that span the whole content column.
- Inside the Redirects section there is a "Row 2" with a `max-w-sm` Latest Video Redirects card (~L746) and ~2/3 empty space to its right.

Plan:

- **Delete** the standalone "Today — Live" `<section>` (L489–520).
- In the redirects "Row 2" wrapper (currently a single card) replace with a flex/grid row so the Latest Video Redirects card occupies ~1/3 (its current `max-w-sm`) and the remaining 2/3 holds two equally-sized cards: **Avg Time** and **New Subs**, styled identically to the other live cards (`border-primary/30 bg-primary/5`, same text sizes). They stay live (use `liveTick.subscribers_today` and `analytics.today.avg_duration`).
- On mobile (<lg) the row stacks naturally.

### 4. Verification

After the edit, in the preview:

- Watch the live feed during a burst — confirm rows appear one after another, not all at once.
- Click /redirect or /podcast in another tab and watch Today + 7d + 14d + 30d + Total all tick `+1` simultaneously.
- Confirm Avg Time and New Subs cards now sit beside Latest Video Redirects with consistent styling, and the top of the page is cleaner.

### Files

- edit: `src/pages/AdminList.tsx`