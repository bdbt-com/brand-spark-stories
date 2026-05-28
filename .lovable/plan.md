# Fix: bio clicks > visitors

## Root cause

In `supabase/functions/get-page-analytics/index.ts` (lines 86-92), the "bio clicks" metric is computed as a raw `count: exact` over `page_views` where `page_path` is `/bio` or `/links`. Every navigation, refresh, or SPA re-mount inserts a new `page_views` row, so a single visitor can produce many "bio clicks".

Meanwhile, "visitors" is a unique-session count from the `get_visitor_stats` RPC. So `bio_clicks > visitors` is expected with the current logic — it's an apples-to-oranges comparison.

The UI on `/admin-list` presents them side-by-side as if they're comparable ("VISITORS 5998 / bio clicks: 6017"), which is misleading.

## Fix

Change "bio clicks" to **unique sessions that viewed `/bio` or `/links`**, matching how visitors are counted. Two options — recommending Option A:

### Option A (recommended): unique sessions in the edge function

In `supabase/functions/get-page-analytics/index.ts`, replace the `count: "exact", head: true` query with a distinct-session count for each period. Two viable implementations:

1. Add a small SQL RPC `get_bio_click_sessions(since_ts timestamptz)` that returns `count(distinct session_id)` from `page_views` where `page_path in ('/bio','/links')` and `entered_at >= since_ts`. Call it in the same loop. (Cleanest, scales best.)
2. Or, page through `page_views` rows for the period selecting only `session_id`, dedupe in TS, return the size. (No migration, but heavier on row transfer — fine at current volume.)

Either way the returned `bio_clicks[key]` becomes "unique bio visitors in period", which is ≤ total visitors by construction.

### Option B: relabel only

Keep the raw count but rename the UI label on `AdminList.tsx` line 407 from `/bio clicks` to something like `/bio views` and add a tooltip explaining it counts every page load. Cheaper but doesn't fix the actual signal the user wants.

## Files touched (Option A.1)

- `supabase/functions/get-page-analytics/index.ts` — swap the bio loop to call the new RPC.
- New migration adding `public.get_bio_click_sessions(since_ts timestamptz)` (SECURITY DEFINER, returns bigint).
- No frontend changes needed; `AdminList.tsx` keeps reading `bio_clicks[key]`.

## Sanity check after deploy

On `/admin-list`, today's `bio clicks` should now be ≤ `visitors` for every period. If you also want the trend % to recalculate against the new unique-session baseline, the existing `TodayTrendBadge` already does this automatically since it reads the same field.

Let me know if you'd rather go with Option A.2 (no migration) or Option B (relabel).
