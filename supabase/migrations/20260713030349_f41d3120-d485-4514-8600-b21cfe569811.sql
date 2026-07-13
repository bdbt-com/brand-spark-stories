
-- Cache table for daily stats (past days are immutable, so cache them)
CREATE TABLE IF NOT EXISTS public.daily_stats_cache (
  day date PRIMARY KEY,
  visitors bigint NOT NULL DEFAULT 0,
  bio_clicks bigint NOT NULL DEFAULT 0,
  podcast_clicks bigint NOT NULL DEFAULT 0,
  bio_redirects bigint NOT NULL DEFAULT 0,
  podcast_redirects bigint NOT NULL DEFAULT 0
);

GRANT SELECT ON public.daily_stats_cache TO anon, authenticated;
GRANT ALL ON public.daily_stats_cache TO service_role;
ALTER TABLE public.daily_stats_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read daily_stats_cache" ON public.daily_stats_cache FOR SELECT USING (true);

-- Backfill helper: compute stats for a specific date range and upsert into cache
CREATE OR REPLACE FUNCTION public.refresh_daily_stats_cache(start_day date, end_day date)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.daily_stats_cache (day, visitors, bio_clicks, podcast_clicks, bio_redirects, podcast_redirects)
  WITH pv AS (
    SELECT DISTINCT (entered_at AT TIME ZONE 'UTC')::date AS day, session_id, page_path
    FROM public.page_views
    WHERE entered_at >= start_day::timestamptz
      AND entered_at <  (end_day + 1)::timestamptz
  ),
  pv_agg AS (
    SELECT day,
           COUNT(*)::bigint AS visitors,
           COUNT(*) FILTER (WHERE page_path IN ('/bio','/links'))::bigint AS bio_clicks,
           COUNT(*) FILTER (WHERE regexp_replace(page_path, '/+$', '') = '/podcast')::bigint AS podcast_clicks
    FROM pv GROUP BY day
  ),
  vc_agg AS (
    SELECT (clicked_at AT TIME ZONE 'UTC')::date AS day,
           COUNT(*) FILTER (WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect')::bigint AS bio_redirects,
           COUNT(*) FILTER (WHERE video_id LIKE 'latest-auto:%')::bigint AS podcast_redirects
    FROM public.video_clicks
    WHERE clicked_at >= start_day::timestamptz
      AND clicked_at <  (end_day + 1)::timestamptz
    GROUP BY day
  )
  SELECT d.day,
         COALESCE(pv_agg.visitors,0),
         COALESCE(pv_agg.bio_clicks,0),
         COALESCE(pv_agg.podcast_clicks,0),
         COALESCE(vc_agg.bio_redirects,0),
         COALESCE(vc_agg.podcast_redirects,0)
  FROM generate_series(start_day, end_day, '1 day'::interval) AS d(day)
  LEFT JOIN pv_agg ON pv_agg.day = d.day
  LEFT JOIN vc_agg ON vc_agg.day = d.day
  ON CONFLICT (day) DO UPDATE SET
    visitors = EXCLUDED.visitors,
    bio_clicks = EXCLUDED.bio_clicks,
    podcast_clicks = EXCLUDED.podcast_clicks,
    bio_redirects = EXCLUDED.bio_redirects,
    podcast_redirects = EXCLUDED.podcast_redirects;
END;
$$;

-- Rewrite get_daily_stats to read from cache for past days + compute today live
CREATE OR REPLACE FUNCTION public.get_daily_stats()
RETURNS TABLE(day date, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  today_utc date := (now() AT TIME ZONE 'UTC')::date;
BEGIN
  RETURN QUERY
  WITH today_pv AS (
    SELECT DISTINCT session_id, page_path
    FROM public.page_views
    WHERE entered_at >= today_utc::timestamptz
  ),
  today_agg AS (
    SELECT today_utc AS day,
           COUNT(*)::bigint AS visitors,
           COUNT(*) FILTER (WHERE page_path IN ('/bio','/links'))::bigint AS bio_clicks,
           COUNT(*) FILTER (WHERE regexp_replace(page_path, '/+$', '') = '/podcast')::bigint AS podcast_clicks
    FROM today_pv
  ),
  today_vc AS (
    SELECT today_utc AS day,
           COUNT(*) FILTER (WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect')::bigint AS bio_redirects,
           COUNT(*) FILTER (WHERE video_id LIKE 'latest-auto:%')::bigint AS podcast_redirects
    FROM public.video_clicks
    WHERE clicked_at >= today_utc::timestamptz
  )
  SELECT c.day, c.visitors, c.bio_clicks, c.podcast_clicks, c.bio_redirects, c.podcast_redirects
  FROM public.daily_stats_cache c
  WHERE c.day < today_utc
  UNION ALL
  SELECT ta.day,
         COALESCE(ta.visitors,0),
         COALESCE(ta.bio_clicks,0),
         COALESCE(ta.podcast_clicks,0),
         COALESCE(tv.bio_redirects,0),
         COALESCE(tv.podcast_redirects,0)
  FROM today_agg ta LEFT JOIN today_vc tv ON tv.day = ta.day
  ORDER BY 1;
END;
$$;
