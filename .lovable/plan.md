

# Fix stuck visitor counts — server-side aggregation

## Problem
The edge function fetches rows with `.select("session_id, duration_seconds")` which is capped at 1,000 rows by Supabase. With 2,313 rows in the table, longer periods (30d, since_launch) only see the first 1,000 rows, producing an artificially low unique session count that appears frozen.

## Current actual data (recoverable — nothing is lost)
All 2,136 unique sessions since March 4 are stored in `page_views`. The data isn't missing, it's just not being counted because of the 1,000-row query limit.

## Solution

### 1. Database migration — create `get_visitor_stats` function
A PostgreSQL function that does `COUNT(DISTINCT session_id)` and `AVG(duration_seconds)` directly in the database, bypassing the row limit entirely.

```sql
CREATE OR REPLACE FUNCTION public.get_visitor_stats(since_ts timestamptz)
RETURNS TABLE(unique_visitors bigint, avg_duration numeric)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(DISTINCT session_id)::bigint,
    COALESCE(AVG(duration_seconds), 0)::numeric
  FROM page_views
  WHERE entered_at >= since_ts;
$$;
```

### 2. Update `get-page-analytics` edge function
Replace the per-period `.select().gte()` block with an RPC call:

```ts
const { data } = await supabase.rpc("get_visitor_stats", { since_ts: since });
const liveVisitors = Number(data?.[0]?.unique_visitors || 0);
const liveAvg = Number(data?.[0]?.avg_duration || 0);
```

The baseline addition logic stays exactly the same. Bio click counts already use `head: true` with `count: "exact"` so they're unaffected.

### 3. Deploy and verify
Deploy the updated edge function and test it returns the correct totals. Expected "Since Launch" total should jump from ~5,597 to ~6,820 (4,684 baseline + 2,136 live sessions).

## Impact
- One new DB function (migration)
- ~15 lines changed in the edge function
- All period counts immediately show correct numbers
- No data recovery needed — the data was always there

