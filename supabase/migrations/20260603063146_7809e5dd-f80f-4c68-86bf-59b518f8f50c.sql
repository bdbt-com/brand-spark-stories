CREATE OR REPLACE FUNCTION public.get_video_click_counts()
RETURNS TABLE(video_id text, total bigint, today bigint, d7 bigint, d14 bigint, d30 bigint)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  WITH bounds AS (
    SELECT (date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS utc_midnight
  )
  SELECT 
    vc.video_id,
    COUNT(*)::bigint AS total,
    COUNT(*) FILTER (WHERE vc.clicked_at >= bounds.utc_midnight)::bigint AS today,
    COUNT(*) FILTER (WHERE vc.clicked_at >= now() - interval '7 days')::bigint AS d7,
    COUNT(*) FILTER (WHERE vc.clicked_at >= now() - interval '14 days')::bigint AS d14,
    COUNT(*) FILTER (WHERE vc.clicked_at >= now() - interval '30 days')::bigint AS d30
  FROM public.video_clicks vc
  CROSS JOIN bounds
  GROUP BY vc.video_id;
$function$;

CREATE OR REPLACE FUNCTION public.get_daily_stats()
RETURNS TABLE(day date, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  WITH pv AS (
    SELECT (entered_at AT TIME ZONE 'UTC')::date AS day,
           session_id,
           page_path
    FROM public.page_views
    WHERE entered_at >= '2026-03-01T00:00:00Z'::timestamptz
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
    SELECT (clicked_at AT TIME ZONE 'UTC')::date AS day,
           COUNT(*) FILTER (WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect')::bigint AS bio_redirects,
           COUNT(*) FILTER (WHERE video_id LIKE 'latest-auto:%')::bigint AS podcast_redirects
    FROM public.video_clicks
    WHERE clicked_at >= '2026-03-01T00:00:00Z'::timestamptz
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

CREATE OR REPLACE FUNCTION public.get_today_live_tick()
RETURNS TABLE(visitors_today bigint, subscribers_today bigint, bio_clicks_today bigint, podcast_clicks_today bigint, bio_redirects_today bigint, podcast_redirects_today bigint, total_clicks_today bigint)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  WITH d AS (SELECT (date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS midnight)
  SELECT
    (SELECT COUNT(DISTINCT session_id)::bigint FROM public.page_views, d WHERE entered_at >= d.midnight),
    (SELECT COUNT(*)::bigint FROM public.email_subscriptions, d WHERE created_at >= d.midnight),
    (SELECT COUNT(DISTINCT session_id)::bigint FROM public.page_views, d WHERE entered_at >= d.midnight AND page_path IN ('/bio','/links')),
    (SELECT COUNT(DISTINCT session_id)::bigint FROM public.page_views, d WHERE entered_at >= d.midnight AND regexp_replace(page_path, '/+$', '') = '/podcast'),
    (SELECT COUNT(*)::bigint FROM public.video_clicks, d WHERE clicked_at >= d.midnight AND (video_id = 'auto-redirect' OR video_id LIKE 'auto-redirect:%')),
    (SELECT COUNT(*)::bigint FROM public.video_clicks, d WHERE clicked_at >= d.midnight AND video_id LIKE 'latest-auto:%'),
    (SELECT COUNT(*)::bigint FROM public.video_clicks, d WHERE clicked_at >= d.midnight);
$function$;

CREATE OR REPLACE FUNCTION public.get_hourly_stats_today()
RETURNS TABLE(hour timestamp with time zone, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  WITH bounds AS (
    SELECT (date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS midnight,
           (date_trunc('hour', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS current_hour
  ),
  pv AS (
    SELECT (date_trunc('hour', entered_at AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS hour,
           session_id,
           page_path
    FROM public.page_views, bounds
    WHERE entered_at >= bounds.midnight
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
    SELECT (date_trunc('hour', clicked_at AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS hour,
           COUNT(*) FILTER (WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect')::bigint AS bio_redirects,
           COUNT(*) FILTER (WHERE video_id LIKE 'latest-auto:%')::bigint AS podcast_redirects
    FROM public.video_clicks, bounds
    WHERE clicked_at >= bounds.midnight
    GROUP BY hour
  )
  SELECT h.hour,
         COALESCE(pv_agg.visitors, 0),
         COALESCE(pv_agg.bio_clicks, 0),
         COALESCE(pv_agg.podcast_clicks, 0),
         COALESCE(vc_agg.bio_redirects, 0),
         COALESCE(vc_agg.podcast_redirects, 0)
  FROM bounds,
       generate_series(bounds.midnight, bounds.current_hour, '1 hour'::interval) AS h(hour)
  LEFT JOIN pv_agg ON pv_agg.hour = h.hour
  LEFT JOIN vc_agg ON vc_agg.hour = h.hour;
$function$;