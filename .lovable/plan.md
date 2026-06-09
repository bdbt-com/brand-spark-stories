# Per-page stats on /admin-list

Add a new section to `/admin-list` showing a row of boxes — one per page on the site — each displaying **unique visitors** and **avg time on page**, with the same `Today / 7d / 14d / 30d / All time` toggle pattern used elsewhere on the dashboard.

## What you'll see

A new section above (or near) the existing analytics cards:

```text
┌─ Page stats ──────────── [Today] [7d] [14d] [30d] [All] ─┐
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│ │ /      │ │/podcast│ │/blueprt│ │ /tips  │ │/about  │  │
│ │ 1,240  │ │  812   │ │  430   │ │  205   │ │  178   │  │
│ │ 1m 42s │ │ 3m 10s │ │ 2m 04s │ │  58s   │ │ 1m 12s │  │
│ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │
│ ┌────────┐ ┌────────┐ ┌────────┐                        │
│ │/links  │ │/courses│ │/partner│  ...                    │
│ └────────┘ └────────┘ └────────┘                        │
└──────────────────────────────────────────────────────────┘
```

Pages are sorted by visitors (highest first) for the selected window. Trailing slashes are normalised so `/podcast` and `/podcast/` count as one. `/redirect` and `/admin-list` are excluded.

## Technical detail

1. **New Postgres RPC** `get_page_stats(since_ts timestamptz)` (security definer):
   - Groups `page_views` by `regexp_replace(page_path, '/+$', '')`.
   - Returns `page_path, unique_visitors (distinct session_id), avg_duration (avg duration_seconds), views (count)`.
   - Excludes paths starting with `/redirect` or `/admin-list`.

2. **New edge function** `get-page-stats`:
   - Calls the RPC in parallel for the five windows (`today`, `7d`, `14d`, `30d`, `since_launch`), same pattern as `get-page-analytics`.
   - Returns `{ pages: { today: [...], "7d": [...], ... } }`.

3. **AdminList UI** (`src/pages/AdminList.tsx`):
   - Add `pageStats` state + a fetch on mount and on the existing polling interval.
   - Add a `pageStatsRange` toggle (`'today' | '7d' | '14d' | '30d' | 'all'`, default `'all'`) styled like the existing graph range toggle.
   - Render a responsive grid of cards (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`) with page path, visitor count (animated counter), and formatted avg time (`Xm Ys` / `Ys`).
   - Keep brand styling (gold headers, white body, dark cards).

No schema changes beyond the new RPC. No new tables, no auth changes.