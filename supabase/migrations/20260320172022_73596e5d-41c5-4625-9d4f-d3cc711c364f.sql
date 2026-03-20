CREATE OR REPLACE FUNCTION public.get_daily_stats()
RETURNS TABLE(day date, visitors bigint, bio_clicks bigint, auto_redirects bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT 
    d.day::date,
    COALESCE(v.cnt, 0)::bigint AS visitors,
    COALESCE(b.cnt, 0)::bigint AS bio_clicks,
    COALESCE(a.cnt, 0)::bigint AS auto_redirects
  FROM generate_series(
    '2024-12-28'::date,
    (now() AT TIME ZONE 'UTC')::date,
    '1 day'::interval
  ) AS d(day)
  LEFT JOIN (
    SELECT entered_at::date AS day, COUNT(DISTINCT session_id)::bigint AS cnt
    FROM page_views GROUP BY 1
  ) v ON v.day = d.day::date
  LEFT JOIN (
    SELECT entered_at::date AS day, COUNT(*)::bigint AS cnt
    FROM page_views WHERE page_path IN ('/bio', '/links') GROUP BY 1
  ) b ON b.day = d.day::date
  LEFT JOIN (
    SELECT clicked_at::date AS day, COUNT(*)::bigint AS cnt
    FROM video_clicks WHERE video_id = 'auto-redirect' GROUP BY 1
  ) a ON a.day = d.day::date;
$$;