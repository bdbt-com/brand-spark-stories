
CREATE OR REPLACE FUNCTION public.get_daily_stats()
RETURNS TABLE(day date, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  today_utc date := (now() AT TIME ZONE 'UTC')::date;
  yesterday_utc date := today_utc - 1;
BEGIN
  -- Self-heal: cache yesterday (and any earlier missing day back to March) once
  IF NOT EXISTS (SELECT 1 FROM public.daily_stats_cache WHERE day = yesterday_utc) THEN
    PERFORM public.refresh_daily_stats_cache(
      GREATEST('2026-03-01'::date, COALESCE((SELECT MAX(day) FROM public.daily_stats_cache), '2026-03-01'::date) + 1),
      yesterday_utc
    );
  END IF;

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
