
CREATE INDEX IF NOT EXISTS idx_page_views_entered_at ON public.page_views (entered_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path_entered ON public.page_views (page_path, entered_at);
CREATE INDEX IF NOT EXISTS idx_video_clicks_clicked_at ON public.video_clicks (clicked_at);
CREATE INDEX IF NOT EXISTS idx_video_clicks_video_id_clicked ON public.video_clicks (video_id, clicked_at);

CREATE OR REPLACE FUNCTION public.get_daily_stats()
 RETURNS TABLE(day date, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH pv AS (
    SELECT entered_at::date AS day,
           session_id,
           page_path
    FROM page_views
    WHERE entered_at >= '2026-03-01'::date
  ),
  pv_agg AS (
    SELECT day,
           COUNT(DISTINCT session_id)::bigint AS visitors,
           COUNT(DISTINCT session_id) FILTER (WHERE page_path IN ('/bio','/links'))::bigint AS bio_clicks,
           COUNT(DISTINCT session_id) FILTER (WHERE regexp_replace(page_path, '/+$', '') = '/podcast')::bigint AS podcast_clicks
    FROM pv
    GROUP BY day
  ),
  vc_agg AS (
    SELECT clicked_at::date AS day,
           COUNT(*) FILTER (WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect')::bigint AS bio_redirects,
           COUNT(*) FILTER (WHERE video_id LIKE 'latest-auto:%')::bigint AS podcast_redirects
    FROM video_clicks
    WHERE clicked_at >= '2026-03-01'::date
    GROUP BY day
  )
  SELECT d.day::date,
         COALESCE(pv_agg.visitors, 0),
         COALESCE(pv_agg.bio_clicks, 0),
         COALESCE(pv_agg.podcast_clicks, 0),
         COALESCE(vc_agg.bio_redirects, 0),
         COALESCE(vc_agg.podcast_redirects, 0)
  FROM generate_series('2026-03-01'::date, (now() AT TIME ZONE 'UTC')::date, '1 day'::interval) AS d(day)
  LEFT JOIN pv_agg ON pv_agg.day = d.day::date
  LEFT JOIN vc_agg ON vc_agg.day = d.day::date;
$function$;

CREATE OR REPLACE FUNCTION public.get_hourly_stats_today()
 RETURNS TABLE(hour timestamp with time zone, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH pv AS (
    SELECT date_trunc('hour', entered_at) AS hour,
           session_id,
           page_path
    FROM page_views
    WHERE entered_at >= date_trunc('day', now() AT TIME ZONE 'UTC')
  ),
  pv_agg AS (
    SELECT hour,
           COUNT(DISTINCT session_id)::bigint AS visitors,
           COUNT(DISTINCT session_id) FILTER (WHERE page_path IN ('/bio','/links'))::bigint AS bio_clicks,
           COUNT(DISTINCT session_id) FILTER (WHERE regexp_replace(page_path, '/+$', '') = '/podcast')::bigint AS podcast_clicks
    FROM pv
    GROUP BY hour
  ),
  vc_agg AS (
    SELECT date_trunc('hour', clicked_at) AS hour,
           COUNT(*) FILTER (WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect')::bigint AS bio_redirects,
           COUNT(*) FILTER (WHERE video_id LIKE 'latest-auto:%')::bigint AS podcast_redirects
    FROM video_clicks
    WHERE clicked_at >= date_trunc('day', now() AT TIME ZONE 'UTC')
    GROUP BY hour
  )
  SELECT h.hour,
         COALESCE(pv_agg.visitors, 0),
         COALESCE(pv_agg.bio_clicks, 0),
         COALESCE(pv_agg.podcast_clicks, 0),
         COALESCE(vc_agg.bio_redirects, 0),
         COALESCE(vc_agg.podcast_redirects, 0)
  FROM generate_series(date_trunc('day', now() AT TIME ZONE 'UTC'), date_trunc('hour', now() AT TIME ZONE 'UTC'), '1 hour'::interval) AS h(hour)
  LEFT JOIN pv_agg ON pv_agg.hour = h.hour
  LEFT JOIN vc_agg ON vc_agg.hour = h.hour;
$function$;
