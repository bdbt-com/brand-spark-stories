
DROP FUNCTION IF EXISTS public.get_daily_stats();

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
  IF NOT EXISTS (SELECT 1 FROM public.daily_stats_cache dsc WHERE dsc.day = yesterday_utc) THEN
    PERFORM public.refresh_daily_stats_cache(
      GREATEST('2026-03-01'::date, COALESCE((SELECT MAX(dsc2.day) FROM public.daily_stats_cache dsc2), '2026-03-01'::date) + 1),
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
    SELECT today_utc AS d,
           COUNT(*)::bigint AS v,
           COUNT(*) FILTER (WHERE page_path IN ('/bio','/links'))::bigint AS bc,
           COUNT(*) FILTER (WHERE regexp_replace(page_path, '/+$', '') = '/podcast')::bigint AS pc
    FROM today_pv
  ),
  today_vc AS (
    SELECT today_utc AS d,
           COUNT(*) FILTER (WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect')::bigint AS br,
           COUNT(*) FILTER (WHERE video_id LIKE 'latest-auto:%')::bigint AS pr
    FROM public.video_clicks
    WHERE clicked_at >= today_utc::timestamptz
  )
  SELECT c.day, c.visitors, c.bio_clicks, c.podcast_clicks, c.bio_redirects, c.podcast_redirects
  FROM public.daily_stats_cache c
  WHERE c.day < today_utc
  UNION ALL
  SELECT ta.d,
         COALESCE(ta.v,0),
         COALESCE(ta.bc,0),
         COALESCE(ta.pc,0),
         COALESCE(tv.br,0),
         COALESCE(tv.pr,0)
  FROM today_agg ta LEFT JOIN today_vc tv ON tv.d = ta.d
  ORDER BY 1;
END;
$$;
