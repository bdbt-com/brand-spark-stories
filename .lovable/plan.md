Add `/podcast` page visits as a second series alongside `/bio` in the existing **Bio Link Clicks** card on `/admin-list`. Mirrors how bio clicks already work (distinct sessions on `/podcast`).

### 1. Database migration

- Replace `public.get_daily_stats()` to return an extra `podcast_clicks bigint` column: `COUNT(*) FROM page_views WHERE page_path = '/podcast'` per day, joined like the existing `bio_clicks` series.
- Replace `public.get_hourly_stats_today()` to return an extra `podcast_clicks bigint` column with the same logic per hour.
- Add `public.get_podcast_click_sessions(since_ts timestamptz)` mirroring `get_bio_click_sessions` (distinct `session_id` on `page_path = '/podcast'`).

### 2. Edge function `get-page-analytics`

- After computing `bioClicks`, compute a parallel `podcastClicks` map for `today / 7d / 14d / 30d / since_launch` using `get_podcast_click_sessions`.
- Return `{ analytics, bio_clicks, podcast_clicks }`.

### 3. `src/pages/AdminList.tsx`

- Extend `dailyStats`/`hourlyStats` state types with `podcast_clicks: number`.
- Add `podcastClicks` state; populate from `data.podcast_clicks` in `fetchAnalytics`.
- Extend `InlineGraph` to accept an optional second series prop (`dataKey2`, `color2`, `label2`) and render a second `<Line>`. Update the card heading label to reflect both series.
- In the **Bio Link Clicks** section:
  - Rename heading to `Bio & Podcast Link Clicks`.
  - Pass the second series (`podcast_clicks`, distinct gold/blue colour, e.g. `hsl(210, 90%, 60%)`) to `InlineGraph`.
  - For each of the 5 tiles (Today / 7d / 14d / 30d / Total): keep the bio number on top (unchanged), add a thin divider, then render the corresponding podcast number underneath with a small coloured dot and `podcast` sublabel. Today tile keeps the existing `TodayTrendBadge` for bio on top and adds one for podcast on the bottom row.

No other sections change. The existing `/podcast redirects` and `/podcast clicks` tiles under Auto-Redirects stay as-is (those track outbound clicks, not page visits).