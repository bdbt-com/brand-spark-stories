

## Plan: Replace per-platform bio cards with Direct clicks by time period

### Edge Function (`supabase/functions/get-page-analytics/index.ts`)

Replace the current referrer-breakdown logic (lines 88-106) with queries that count `/bio` + `/links` page views (all referrers, i.e. "direct" = total clicks) for each time period:

- Query `/bio` + `/links` views for: today, 7d, 14d, 30d
- Return as `bio_clicks: { today: N, "7d": N, "14d": N, "30d": N }`
- Remove `bio_referrers` from response

### Admin Dashboard (`src/pages/AdminList.tsx`)

Replace the "Bio Link Clicks" section (currently 4 cards: Instagram, TikTok, YouTube, Direct) with 4 time-period cards:

- Today, Last 7 Days, Last 14 Days, Last 30 Days
- Each shows the total `/bio` click count for that period
- Keep the `grid-cols-2 md:grid-cols-4` layout
- Remove `bioReferrers` state; update `bioClicks` state to hold the new object shape `{ today, "7d", "14d", "30d" }`

### Files Changed
- `supabase/functions/get-page-analytics/index.ts`
- `src/pages/AdminList.tsx`

