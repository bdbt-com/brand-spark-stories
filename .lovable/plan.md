

# Fix all edge functions hitting the 1000-row Supabase limit

## Vulnerable Functions

Three more edge functions fetch ALL rows without pagination, meaning they'll break once any table exceeds 1000 rows:

1. **`get-video-clicks`** — `.select("video_id, clicked_at")` with no limit on `video_clicks` table. Fetches all rows client-side to bucket them by period. Will cap at 1000 rows.

2. **`get-download-counts`** — `.select("guide_title").eq("email_sent", true)` on `email_subscriptions`. Counts downloads client-side. Will cap at 1000 rows.

3. **`admin-email-stats`** — `.select("email, first_name, created_at")` on `email_subscriptions`. Deduplicates and counts client-side. Will cap at 1000 rows.

**Already safe:**
- `get-page-analytics` — just fixed with `get_visitor_stats` RPC
- Bio clicks — uses `count: "exact", head: true` (server-side count, no row limit)
- `get-activity-feed` — uses `.limit(200)` with time filter (intentionally capped)

## Fix Strategy

### 1. `get-video-clicks` → Server-side DB function

Create `get_video_click_counts()` that returns per-video counts for each time period directly in SQL:

```sql
CREATE OR REPLACE FUNCTION public.get_video_click_counts()
RETURNS TABLE(video_id text, total bigint, today bigint, d7 bigint, d14 bigint, d30 bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT 
    video_id,
    COUNT(*)::bigint AS total,
    COUNT(*) FILTER (WHERE clicked_at >= date_trunc('day', now() AT TIME ZONE 'UTC'))::bigint AS today,
    COUNT(*) FILTER (WHERE clicked_at >= now() - interval '7 days')::bigint AS d7,
    COUNT(*) FILTER (WHERE clicked_at >= now() - interval '14 days')::bigint AS d14,
    COUNT(*) FILTER (WHERE clicked_at >= now() - interval '30 days')::bigint AS d30
  FROM video_clicks
  GROUP BY video_id;
$$;
```

Then update the edge function to call this RPC and reassemble the `counts` object (handling auto-redirect composite IDs in JS from the already-aggregated rows).

### 2. `get-download-counts` → Server-side count

Create `get_download_counts_by_guide()`:

```sql
CREATE OR REPLACE FUNCTION public.get_download_counts_by_guide()
RETURNS TABLE(guide_title text, download_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT guide_title, COUNT(*)::bigint
  FROM email_subscriptions
  WHERE email_sent = true AND guide_title IS NOT NULL
  GROUP BY guide_title;
$$;
```

### 3. `admin-email-stats` → Paginated fetch

This one needs all rows for deduplication and listing. Fix by paginating with `.range()` to fetch beyond 1000 rows:

```ts
let allData = [];
let from = 0;
const PAGE = 1000;
while (true) {
  const { data } = await supabase.from("email_subscriptions")
    .select("email, first_name, created_at")
    .order("created_at", { ascending: true })
    .range(from, from + PAGE - 1);
  if (!data || data.length === 0) break;
  allData.push(...data);
  if (data.length < PAGE) break;
  from += PAGE;
}
```

### Files Changed

| File | Change |
|------|--------|
| Migration SQL | Create `get_video_click_counts()` and `get_download_counts_by_guide()` functions |
| `supabase/functions/get-video-clicks/index.ts` | Replace full-table select with RPC call |
| `supabase/functions/get-download-counts/index.ts` | Replace full-table select with RPC call |
| `supabase/functions/admin-email-stats/index.ts` | Add pagination loop for full data fetch |

