

# Show Hourly Data for "Today" Graph Range

## Problem
When "Today" is selected, the graph shows a single data point (one dot) because `get_daily_stats` returns daily granularity. The user wants an hourly line graph for the current day.

## Solution

### 1. New DB function: `get_hourly_stats_today`
Returns hourly buckets (0-23) for today's date with visitors, bio clicks, and auto-redirects per hour.

```sql
CREATE OR REPLACE FUNCTION public.get_hourly_stats_today()
RETURNS TABLE(hour timestamptz, visitors bigint, bio_clicks bigint, auto_redirects bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT
    h.hour,
    COALESCE(v.cnt, 0),
    COALESCE(b.cnt, 0),
    COALESCE(a.cnt, 0)
  FROM generate_series(
    date_trunc('day', now() AT TIME ZONE 'UTC'),
    date_trunc('hour', now() AT TIME ZONE 'UTC'),
    '1 hour'
  ) AS h(hour)
  LEFT JOIN (...) -- same pattern as get_daily_stats but grouped by hour
$$;
```

### 2. Update edge function: `get-daily-stats`
Also call `get_hourly_stats_today` RPC and return both `daily` and `hourly` arrays in the response.

### 3. Frontend: `src/pages/AdminList.tsx`
- Add `hourlyStats` state, populated from the edge function response
- When `graphRange === 'today'`, pass `hourlyStats` to `InlineGraph` instead of `filteredDailyStats`
- Update `InlineGraph` to accept an optional `xFormatter` prop — for hourly data, format as "6am", "2pm" etc. instead of "22 Mar"
- The hourly data will have multiple points throughout the day, producing a proper line graph

### Files changed

| File | Change |
|------|--------|
| Migration SQL | Create `get_hourly_stats_today()` function |
| `supabase/functions/get-daily-stats/index.ts` | Call both RPCs, return `{ daily, hourly }` |
| `src/pages/AdminList.tsx` | Add hourly state; swap data source when "Today" selected; update `InlineGraph` x-axis formatting |

