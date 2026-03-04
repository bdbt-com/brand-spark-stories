

## Plan: Fix Today's Counter with Correct Baseline

The `get-page-analytics` edge function currently shows "today" with no baseline (only live tracked data: 3 visitors). The real stats from Lovable analytics show 76 visitors and 2m 12s (132s) avg duration today.

### Change

**`supabase/functions/get-page-analytics/index.ts`** — Add a today baseline for March 4:
- Add `"today"` to the BASELINES object: `{ visitors: 76, avg_duration: 132 }`
- This means the "today" period will show 76 + live tracked visitors, and a weighted average duration
- Tomorrow (March 5+), the today baseline won't match the current date, so it resets to 0 automatically

To make the baseline date-aware, add a check: only apply today's baseline when the current UTC date is `"2026-03-04"`. On any other day, today starts from 0 (pure live data).

### Files
- `supabase/functions/get-page-analytics/index.ts` — add today baseline with date guard

