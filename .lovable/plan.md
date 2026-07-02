## Two fixes for /admin-list

### 1. All-time best "/min" resets after a day

**Cause:** the counter's "all-time best" is loaded from `interaction_rate_records`, but yesterday's peak of ~30 was never actually persisted — only 9 got saved for 2026-07-01. Today's row correctly shows 23. Root causes in `AdminList.tsx`:

- The upsert is fire-and-forget with no `keepalive`, so if the tab is closed shortly after a spike the write is dropped.
- We only persist when `current > bestPersistRef.current`; if the very first spike after mount fires *before* the initial DB load resolves, `bestPersistRef` is still 0, and once the async load overwrites state with the (lower) stored value we can end up not persisting a subsequent higher-but-not-highest value.
- Nothing separately tracks all-time best — it's derived only from what happens to be in the table.

**Fix in `src/pages/AdminList.tsx`:**
- Gate the "persist on new high" effect so it only runs *after* the initial load completes (add a `loadedRef` flag).
- When a new high is detected, `await` the upsert and if it errors, retry once; use `.select()` so we actually see failures in console.
- Also persist when `current === bestPersistRef.current` but the stored row is missing/older (defensive `upsert` on first high per session).
- Send the write with `{ count: 'exact' }` removed and add a `navigator.sendBeacon` fallback on `visibilitychange`/`pagehide` firing a POST to a tiny new edge function `save-interaction-rate` (uses service role) so in-flight highs survive tab close.
- Track `allTimeBest` as `Math.max(loadedAllTime, sessionPeak)` so the number the admin sees on-screen is always the ceiling of what's been observed, and re-query `MAX(best_per_min)` on each poll tick so a peak from another admin session is picked up.

**New edge function `supabase/functions/save-interaction-rate/index.ts`** — accepts `{ day, best_per_min }`, does a server-side upsert only if the incoming value is greater than the stored one (so beacon writes can't lower an existing high).

### 2. Exercise-course / Spotify / Courses-button click counters don't respond to time-range selector

**Cause:** in the page cards grid (`AdminList.tsx` ~lines 1053-1061), the extras always read `.total`:

```
{ count: videoCounts['podcast-exercise-course']?.total || 0, ... }
{ count: videoCounts['podcast-spotify']?.total || 0, ... }
{ count: videoCounts['button-courses']?.total || 0, ... }
```

So Today / 7d / 14d / 30d all show the same lifetime number.

**Fix:** map `rangeKey` to the right field on `videoCounts[key]`:
- `today` → `.today`
- `7d` → `["7d"]`
- `14d` → `["14d"]`
- `30d` → `["30d"]`
- `since_launch` → `.total`

Apply to all three extras (courses button, spotify, exercise course) in both the mobile and desktop card grids if they exist in both places.

### Files touched
- `src/pages/AdminList.tsx` (both fixes)
- `supabase/functions/save-interaction-rate/index.ts` (new)
- `supabase/config.toml` (register new function, public)

No schema changes needed — `interaction_rate_records` already has the right shape.