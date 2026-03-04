

## Plan: Add Podcast Videos to /bio Page + Track /bio Clicks Separately

### 1. Add Podcast Video Cards to LinkInBio Page

**`src/pages/LinkInBio.tsx`** — Add the 3 podcast episode cards (same data as Home page) below the existing link buttons, styled to fit the dark theme. Cards will show YouTube thumbnails with play buttons, titles, and simulated view counts. Clicking plays inline or opens YouTube. The section will be compact enough to be visible on the initial viewport on both mobile and desktop (smaller thumbnails, tighter spacing).

### 2. Track /bio Clicks as Separate Metric in Admin Dashboard

The `PageViewTracker` already records `page_path` for every visit (e.g., `/bio`, `/links`, `/`). The tracking is already happening — we just need to surface it.

**`supabase/functions/get-page-analytics/index.ts`** — Add a new field to the response: query `page_views` where `page_path IN ('/bio', '/links')` for today, and return a `bio_clicks` count alongside the existing analytics.

**`src/pages/AdminList.tsx`** — In the "Today — Live" section, keep the Visitors card as the total, but add a small grey sub-line underneath showing "/bio clicks: X" as a separate number.

### Files Changed
- `src/pages/LinkInBio.tsx` — add podcast episodes section
- `supabase/functions/get-page-analytics/index.ts` — add bio_clicks count to response
- `src/pages/AdminList.tsx` — show /bio clicks beneath the visitor count

