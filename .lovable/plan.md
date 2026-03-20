

# Add All-Time Daily Line Graphs to Admin Dashboard

## Overview
Add three line graphs to the left side of the admin page (above the existing stat cards) showing daily counts since tracking began (March 4, 2026): **Page Analytics (visitors)**, **Bio Link Clicks**, and **Auto-Redirects**.

## Data Source

### New DB function: `get_daily_stats`
A single PostgreSQL function that returns three daily series in one query:

```sql
CREATE OR REPLACE FUNCTION public.get_daily_stats()
RETURNS TABLE(day date, visitors bigint, bio_clicks bigint, auto_redirects bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT 
    d.day,
    COALESCE(v.cnt, 0) AS visitors,
    COALESCE(b.cnt, 0) AS bio_clicks,
    COALESCE(a.cnt, 0) AS auto_redirects
  FROM generate_series(
    '2026-03-04'::date,
    (now() AT TIME ZONE 'UTC')::date,
    '1 day'
  ) AS d(day)
  LEFT JOIN (
    SELECT entered_at::date AS day, COUNT(DISTINCT session_id)::bigint AS cnt
    FROM page_views GROUP BY 1
  ) v ON v.day = d.day
  LEFT JOIN (
    SELECT entered_at::date AS day, COUNT(*)::bigint AS cnt
    FROM page_views WHERE page_path IN ('/bio', '/links') GROUP BY 1
  ) b ON b.day = d.day
  LEFT JOIN (
    SELECT clicked_at::date AS day, COUNT(*)::bigint AS cnt
    FROM video_clicks WHERE video_id = 'auto-redirect' GROUP BY 1
  ) a ON a.day = d.day;
$$;
```

### New edge function: `get-daily-stats`
Simple wrapper that calls the RPC and returns the array.

## Frontend Changes (`src/pages/AdminList.tsx`)

- Import `LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer` from recharts
- Add state `dailyStats` and fetch from `get-daily-stats` on mount (no polling — once per load is fine for historical graphs)
- Render 3 line charts in a vertical stack above the "Today — Live" section, each in a Card with a title
- X-axis: date (formatted as "Mar 5", "Mar 10", etc.)
- Y-axis: count
- Line color: primary theme color
- Charts are responsive and compact (~200px height each)

### Files changed

| File | Change |
|------|--------|
| Migration SQL | Create `get_daily_stats()` function |
| `supabase/functions/get-daily-stats/index.ts` | New edge function calling the RPC |
| `src/pages/AdminList.tsx` | Add recharts line graphs, new fetch + state |

