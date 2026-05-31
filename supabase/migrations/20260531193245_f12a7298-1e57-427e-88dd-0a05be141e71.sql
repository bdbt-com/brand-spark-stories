DROP FUNCTION IF EXISTS public.get_daily_stats();
DROP FUNCTION IF EXISTS public.get_hourly_stats_today();

CREATE FUNCTION public.get_daily_stats()
 RETURNS TABLE(day date, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    d.day::date,
    COALESCE(v.cnt, 0)::bigint,
    COALESCE(b.cnt, 0)::bigint,
    COALESCE(pc.cnt, 0)::bigint,
    COALESCE(br.cnt, 0)::bigint,
    COALESCE(pr.cnt, 0)::bigint
  FROM generate_series('2024-12-28'::date, (now() AT TIME ZONE 'UTC')::date, '1 day'::interval) AS d(day)
  LEFT JOIN (SELECT entered_at::date AS day, COUNT(DISTINCT session_id)::bigint AS cnt FROM page_views GROUP BY 1) v ON v.day = d.day::date
  LEFT JOIN (SELECT entered_at::date AS day, COUNT(DISTINCT session_id)::bigint AS cnt FROM page_views WHERE page_path IN ('/bio','/links') GROUP BY 1) b ON b.day = d.day::date
  LEFT JOIN (SELECT entered_at::date AS day, COUNT(DISTINCT session_id)::bigint AS cnt FROM page_views WHERE page_path = '/podcast' GROUP BY 1) pc ON pc.day = d.day::date
  LEFT JOIN (SELECT clicked_at::date AS day, COUNT(*)::bigint AS cnt FROM video_clicks WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect' GROUP BY 1) br ON br.day = d.day::date
  LEFT JOIN (SELECT clicked_at::date AS day, COUNT(*)::bigint AS cnt FROM video_clicks WHERE video_id LIKE 'latest-auto:%' GROUP BY 1) pr ON pr.day = d.day::date;
$function$;

CREATE FUNCTION public.get_hourly_stats_today()
 RETURNS TABLE(hour timestamp with time zone, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    h.hour,
    COALESCE(v.cnt, 0)::bigint,
    COALESCE(b.cnt, 0)::bigint,
    COALESCE(pc.cnt, 0)::bigint,
    COALESCE(br.cnt, 0)::bigint,
    COALESCE(pr.cnt, 0)::bigint
  FROM generate_series(date_trunc('day', now() AT TIME ZONE 'UTC'), date_trunc('hour', now() AT TIME ZONE 'UTC'), '1 hour'::interval) AS h(hour)
  LEFT JOIN (SELECT date_trunc('hour', entered_at) AS hour, COUNT(DISTINCT session_id)::bigint AS cnt FROM page_views WHERE entered_at >= date_trunc('day', now() AT TIME ZONE 'UTC') GROUP BY 1) v ON v.hour = h.hour
  LEFT JOIN (SELECT date_trunc('hour', entered_at) AS hour, COUNT(DISTINCT session_id)::bigint AS cnt FROM page_views WHERE entered_at >= date_trunc('day', now() AT TIME ZONE 'UTC') AND page_path IN ('/bio','/links') GROUP BY 1) b ON b.hour = h.hour
  LEFT JOIN (SELECT date_trunc('hour', entered_at) AS hour, COUNT(DISTINCT session_id)::bigint AS cnt FROM page_views WHERE entered_at >= date_trunc('day', now() AT TIME ZONE 'UTC') AND page_path = '/podcast' GROUP BY 1) pc ON pc.hour = h.hour
  LEFT JOIN (SELECT date_trunc('hour', clicked_at) AS hour, COUNT(*)::bigint AS cnt FROM video_clicks WHERE clicked_at >= date_trunc('day', now() AT TIME ZONE 'UTC') AND (video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect') GROUP BY 1) br ON br.hour = h.hour
  LEFT JOIN (SELECT date_trunc('hour', clicked_at) AS hour, COUNT(*)::bigint AS cnt FROM video_clicks WHERE clicked_at >= date_trunc('day', now() AT TIME ZONE 'UTC') AND video_id LIKE 'latest-auto:%' GROUP BY 1) pr ON pr.hour = h.hour;
$function$;