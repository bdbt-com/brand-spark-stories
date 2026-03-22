
CREATE OR REPLACE FUNCTION public.get_hourly_stats_today()
RETURNS TABLE(hour timestamptz, visitors bigint, bio_clicks bigint, auto_redirects bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT
    h.hour,
    COALESCE(v.cnt, 0)::bigint AS visitors,
    COALESCE(b.cnt, 0)::bigint AS bio_clicks,
    COALESCE(a.cnt, 0)::bigint AS auto_redirects
  FROM generate_series(
    date_trunc('day', now() AT TIME ZONE 'UTC'),
    date_trunc('hour', now() AT TIME ZONE 'UTC'),
    '1 hour'::interval
  ) AS h(hour)
  LEFT JOIN (
    SELECT date_trunc('hour', entered_at) AS hour, COUNT(DISTINCT session_id)::bigint AS cnt
    FROM page_views
    WHERE entered_at >= date_trunc('day', now() AT TIME ZONE 'UTC')
    GROUP BY 1
  ) v ON v.hour = h.hour
  LEFT JOIN (
    SELECT date_trunc('hour', entered_at) AS hour, COUNT(*)::bigint AS cnt
    FROM page_views
    WHERE entered_at >= date_trunc('day', now() AT TIME ZONE 'UTC')
      AND page_path IN ('/bio', '/links')
    GROUP BY 1
  ) b ON b.hour = h.hour
  LEFT JOIN (
    SELECT date_trunc('hour', clicked_at) AS hour, COUNT(*)::bigint AS cnt
    FROM video_clicks
    WHERE clicked_at >= date_trunc('day', now() AT TIME ZONE 'UTC')
      AND video_id LIKE 'auto-redirect:%'
    GROUP BY 1
  ) a ON a.hour = h.hour;
$$;
