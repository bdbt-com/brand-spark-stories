

# Fix Bio Click Undercounting + Redirect Inflation

## Problem
1. `/BIO` (uppercase) visits aren't counted as bio clicks — 62 missed in 30 days
2. `/redirect` page views inflate total visitor count (171 extra "visitors" in 7 days)

## Changes

### 1. `src/components/PageViewTracker.tsx` — Normalise path to lowercase
Before tracking, convert `location.pathname` to lowercase so `/BIO` is recorded as `/bio`.

### 2. `src/components/PageViewTracker.tsx` — Skip `/redirect` path
Don't track the redirect bridge page as a page view (same as `/admin-list` is already skipped). This stops auto-redirects from inflating visitor counts.

### 3. `supabase/functions/get-page-analytics/index.ts` — Case-insensitive bio query
Use `ilike` or `.in()` with lowercase + uppercase variants, or use `.or()` with `ilike` to catch any future case variations in historical data.

### Files changed

| File | Change |
|------|--------|
| `src/components/PageViewTracker.tsx` | Lowercase path before tracking; skip `/redirect` |
| `supabase/functions/get-page-analytics/index.ts` | Case-insensitive bio click counting |

