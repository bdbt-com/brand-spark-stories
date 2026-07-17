
-- 1. Schema additions
ALTER TABLE public.page_views
  ADD COLUMN IF NOT EXISTS user_agent text,
  ADD COLUMN IF NOT EXISTS is_bot boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS page_views_is_bot_entered_at_idx
  ON public.page_views (is_bot, entered_at);

-- 2. Reconcile log
CREATE TABLE IF NOT EXISTS public.stats_reconcile_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ran_at timestamptz NOT NULL DEFAULT now(),
  start_day date NOT NULL,
  end_day date NOT NULL,
  days_refreshed int NOT NULL,
  notes text
);
GRANT SELECT ON public.stats_reconcile_log TO authenticated;
GRANT ALL ON public.stats_reconcile_log TO service_role;
ALTER TABLE public.stats_reconcile_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reconcile log readable by authenticated" ON public.stats_reconcile_log
  FOR SELECT TO authenticated USING (true);

-- 3. Historical heuristic backfill: single-hit /podcast sessions with no meaningful duration.
WITH bot_sessions AS (
  SELECT session_id
  FROM public.page_views
  WHERE page_path = '/podcast'
  GROUP BY session_id
  HAVING COUNT(*) = 1
     AND COALESCE(MAX(duration_seconds), 0) = 0
)
UPDATE public.page_views pv
   SET is_bot = true
  FROM bot_sessions bs
 WHERE pv.session_id = bs.session_id
   AND pv.page_path = '/podcast'
   AND pv.is_bot = false;

-- 4. RPC rewrites — every page_views read now filters is_bot = false.

CREATE OR REPLACE FUNCTION public.refresh_daily_stats_cache(start_day date, end_day date)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.daily_stats_cache (day, visitors, bio_clicks, podcast_clicks, bio_redirects, podcast_redirects, sum_duration_seconds, pv_rows)
  WITH pv_sessions AS (
    SELECT (entered_at AT TIME ZONE 'UTC')::date AS day,
           session_id,
           page_path,
           duration_seconds
    FROM public.page_views
    WHERE entered_at >= start_day::timestamptz
      AND entered_at <  (end_day + 1)::timestamptz
      AND is_bot = false
  ),
  pv_unique AS (
    SELECT DISTINCT day, session_id, page_path FROM pv_sessions
  ),
  pv_agg AS (
    SELECT day,
           COUNT(DISTINCT session_id)::bigint AS visitors,
           COUNT(DISTINCT session_id) FILTER (WHERE page_path IN ('/bio','/links'))::bigint AS bio_clicks,
           COUNT(DISTINCT session_id) FILTER (WHERE regexp_replace(page_path, '/+$', '') = '/podcast')::bigint AS podcast_clicks
    FROM pv_unique GROUP BY day
  ),
  dur_agg AS (
    SELECT day,
           COALESCE(SUM(duration_seconds),0)::numeric AS sum_dur,
           COUNT(*)::bigint AS pv_rows
    FROM pv_sessions GROUP BY day
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
         COALESCE(vc_agg.podcast_redirects,0),
         COALESCE(dur_agg.sum_dur,0),
         COALESCE(dur_agg.pv_rows,0)
  FROM generate_series(start_day, end_day, '1 day'::interval) AS d(day)
  LEFT JOIN pv_agg ON pv_agg.day = d.day
  LEFT JOIN vc_agg ON vc_agg.day = d.day
  LEFT JOIN dur_agg ON dur_agg.day = d.day
  ON CONFLICT (day) DO UPDATE SET
    visitors = EXCLUDED.visitors,
    bio_clicks = EXCLUDED.bio_clicks,
    podcast_clicks = EXCLUDED.podcast_clicks,
    bio_redirects = EXCLUDED.bio_redirects,
    podcast_redirects = EXCLUDED.podcast_redirects,
    sum_duration_seconds = EXCLUDED.sum_duration_seconds,
    pv_rows = EXCLUDED.pv_rows;

  DELETE FROM public.page_daily_stats_cache WHERE day BETWEEN start_day AND end_day;

  INSERT INTO public.page_daily_stats_cache (day, page_path, visitors, views, sum_duration_seconds)
  SELECT (entered_at AT TIME ZONE 'UTC')::date AS day,
         regexp_replace(page_path, '/+$', '') AS page_path,
         COUNT(DISTINCT session_id)::bigint,
         COUNT(*)::bigint,
         COALESCE(SUM(duration_seconds),0)::numeric
  FROM public.page_views
  WHERE entered_at >= start_day::timestamptz
    AND entered_at <  (end_day + 1)::timestamptz
    AND is_bot = false
    AND page_path NOT LIKE '/redirect%'
    AND page_path NOT LIKE '/admin-list%'
  GROUP BY 1, 2;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_daily_stats()
 RETURNS TABLE(day date, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
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
    WHERE entered_at >= today_utc::timestamptz AND is_bot = false
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
    FROM public.video_clicks WHERE clicked_at >= today_utc::timestamptz
  )
  SELECT c.day, c.visitors, c.bio_clicks, c.podcast_clicks, c.bio_redirects, c.podcast_redirects
  FROM public.daily_stats_cache c WHERE c.day < today_utc
  UNION ALL
  SELECT ta.d, COALESCE(ta.v,0), COALESCE(ta.bc,0), COALESCE(ta.pc,0), COALESCE(tv.br,0), COALESCE(tv.pr,0)
  FROM today_agg ta LEFT JOIN today_vc tv ON tv.d = ta.d
  ORDER BY 1;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_hourly_stats_today()
 RETURNS TABLE(hour timestamp with time zone, visitors bigint, bio_clicks bigint, podcast_clicks bigint, bio_redirects bigint, podcast_redirects bigint)
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  WITH bounds AS (
    SELECT (date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS midnight,
           (date_trunc('hour', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS current_hour
  ),
  pv AS (
    SELECT (date_trunc('hour', entered_at AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS hour,
           session_id, page_path
    FROM public.page_views, bounds
    WHERE entered_at >= bounds.midnight AND is_bot = false
  ),
  pv_agg AS (
    SELECT hour,
           COUNT(DISTINCT session_id)::bigint AS visitors,
           COUNT(DISTINCT session_id) FILTER (WHERE page_path IN ('/bio','/links'))::bigint AS bio_clicks,
           COUNT(DISTINCT session_id) FILTER (WHERE regexp_replace(page_path, '/+$', '') = '/podcast')::bigint AS podcast_clicks
    FROM pv GROUP BY hour
  ),
  vc_agg AS (
    SELECT (date_trunc('hour', clicked_at AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS hour,
           COUNT(*) FILTER (WHERE video_id LIKE 'auto-redirect:%' OR video_id = 'auto-redirect')::bigint AS bio_redirects,
           COUNT(*) FILTER (WHERE video_id LIKE 'latest-auto:%')::bigint AS podcast_redirects
    FROM public.video_clicks, bounds WHERE clicked_at >= bounds.midnight GROUP BY hour
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

CREATE OR REPLACE FUNCTION public.get_visitor_stats(since_ts timestamp with time zone)
 RETURNS TABLE(unique_visitors bigint, avg_duration numeric)
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  today_utc date := (now() AT TIME ZONE 'UTC')::date;
  since_date date := (since_ts AT TIME ZONE 'UTC')::date;
BEGIN
  RETURN QUERY
  WITH cached AS (
    SELECT COALESCE(SUM(c.visitors),0)::bigint AS visitors,
           COALESCE(SUM(c.sum_duration_seconds),0)::numeric AS sum_dur,
           COALESCE(SUM(c.pv_rows),0)::bigint AS rows
    FROM public.daily_stats_cache c
    WHERE c.day >= since_date AND c.day < today_utc
  ),
  live AS (
    SELECT COUNT(DISTINCT pv.session_id)::bigint AS visitors,
           COALESCE(SUM(pv.duration_seconds),0)::numeric AS sum_dur,
           COUNT(*)::bigint AS rows
    FROM public.page_views pv
    WHERE pv.entered_at >= GREATEST(since_ts, today_utc::timestamptz) AND pv.is_bot = false
  )
  SELECT (cached.visitors + live.visitors)::bigint,
         CASE WHEN (cached.rows + live.rows) > 0
              THEN ((cached.sum_dur + live.sum_dur) / (cached.rows + live.rows))::numeric
              ELSE 0::numeric END
  FROM cached, live;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_page_stats(since_ts timestamp with time zone)
 RETURNS TABLE(page_path text, unique_visitors bigint, avg_duration numeric, views bigint)
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  today_utc date := (now() AT TIME ZONE 'UTC')::date;
  since_date date := (since_ts AT TIME ZONE 'UTC')::date;
BEGIN
  RETURN QUERY
  WITH cached AS (
    SELECT c.page_path,
           SUM(c.visitors)::bigint AS visitors,
           SUM(c.views)::bigint AS views,
           SUM(c.sum_duration_seconds)::numeric AS sum_dur
    FROM public.page_daily_stats_cache c
    WHERE c.day >= since_date AND c.day < today_utc
    GROUP BY c.page_path
  ),
  live AS (
    SELECT regexp_replace(pv.page_path, '/+$', '') AS page_path,
           COUNT(DISTINCT pv.session_id)::bigint AS visitors,
           COUNT(*)::bigint AS views,
           COALESCE(SUM(pv.duration_seconds),0)::numeric AS sum_dur
    FROM public.page_views pv
    WHERE pv.entered_at >= GREATEST(since_ts, today_utc::timestamptz)
      AND pv.is_bot = false
      AND pv.page_path NOT LIKE '/redirect%'
      AND pv.page_path NOT LIKE '/admin-list%'
    GROUP BY 1
  ),
  merged AS (
    SELECT COALESCE(c.page_path, l.page_path) AS page_path,
           COALESCE(c.visitors,0) + COALESCE(l.visitors,0) AS visitors,
           COALESCE(c.views,0) + COALESCE(l.views,0) AS views,
           COALESCE(c.sum_dur,0) + COALESCE(l.sum_dur,0) AS sum_dur
    FROM cached c FULL OUTER JOIN live l ON l.page_path = c.page_path
  )
  SELECT m.page_path, m.visitors,
         CASE WHEN m.views > 0 THEN (m.sum_dur / m.views)::numeric ELSE 0::numeric END,
         m.views
  FROM merged m WHERE m.page_path IS NOT NULL ORDER BY m.visitors DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_bio_click_sessions(since_ts timestamp with time zone)
 RETURNS bigint
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  today_utc date := (now() AT TIME ZONE 'UTC')::date;
  since_date date := (since_ts AT TIME ZONE 'UTC')::date;
  cached_val bigint;
  live_val bigint;
BEGIN
  SELECT COALESCE(SUM(bio_clicks),0) INTO cached_val
    FROM public.daily_stats_cache
   WHERE day >= since_date AND day < today_utc;
  SELECT COUNT(DISTINCT session_id) INTO live_val
    FROM public.page_views
   WHERE entered_at >= GREATEST(since_ts, today_utc::timestamptz)
     AND is_bot = false
     AND page_path IN ('/bio','/links');
  RETURN cached_val + live_val;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_podcast_click_sessions(since_ts timestamp with time zone)
 RETURNS bigint
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  today_utc date := (now() AT TIME ZONE 'UTC')::date;
  since_date date := (since_ts AT TIME ZONE 'UTC')::date;
  cached_val bigint;
  live_val bigint;
BEGIN
  SELECT COALESCE(SUM(podcast_clicks),0) INTO cached_val
    FROM public.daily_stats_cache
   WHERE day >= since_date AND day < today_utc;
  SELECT COUNT(DISTINCT session_id) INTO live_val
    FROM public.page_views
   WHERE entered_at >= GREATEST(since_ts, today_utc::timestamptz)
     AND is_bot = false
     AND regexp_replace(page_path, '/+$', '') = '/podcast';
  RETURN cached_val + live_val;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_today_live_tick()
 RETURNS TABLE(visitors_today bigint, subscribers_today bigint, bio_clicks_today bigint, podcast_clicks_today bigint, bio_redirects_today bigint, podcast_redirects_today bigint, total_clicks_today bigint)
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  WITH d AS (SELECT (date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS midnight)
  SELECT
    (SELECT COUNT(DISTINCT session_id)::bigint FROM public.page_views, d WHERE entered_at >= d.midnight AND is_bot = false),
    (SELECT COUNT(DISTINCT lower(email))::bigint FROM public.email_subscriptions, d WHERE created_at >= d.midnight),
    (SELECT COUNT(DISTINCT session_id)::bigint FROM public.page_views, d WHERE entered_at >= d.midnight AND is_bot = false AND page_path IN ('/bio','/links')),
    (SELECT COUNT(DISTINCT session_id)::bigint FROM public.page_views, d WHERE entered_at >= d.midnight AND is_bot = false AND regexp_replace(page_path, '/+$', '') = '/podcast'),
    (SELECT COUNT(*)::bigint FROM public.video_clicks, d WHERE clicked_at >= d.midnight AND (video_id = 'auto-redirect' OR video_id LIKE 'auto-redirect:%')),
    (SELECT COUNT(*)::bigint FROM public.video_clicks, d WHERE clicked_at >= d.midnight AND video_id LIKE 'latest-auto:%'),
    (SELECT COUNT(*)::bigint FROM public.video_clicks, d WHERE clicked_at >= d.midnight);
$function$;

-- 5. Weekly auto-reconcile function (invoked by pg_cron insert)
CREATE OR REPLACE FUNCTION public.weekly_stats_reconcile()
 RETURNS void
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  today_utc date := (now() AT TIME ZONE 'UTC')::date;
  start_d date := today_utc - 14;
  end_d date := today_utc - 1;
BEGIN
  PERFORM public.refresh_daily_stats_cache(start_d, end_d);
  INSERT INTO public.stats_reconcile_log (start_day, end_day, days_refreshed, notes)
  VALUES (start_d, end_d, (end_d - start_d) + 1, 'weekly auto-reconcile');
END;
$function$;

-- 6. Rebuild the entire historical cache with bot filtering applied
SELECT public.refresh_daily_stats_cache('2026-03-01'::date, ((now() AT TIME ZONE 'UTC')::date - 1));
