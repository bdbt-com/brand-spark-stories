
-- 1. Extend daily_stats_cache
ALTER TABLE public.daily_stats_cache
  ADD COLUMN IF NOT EXISTS sum_duration_seconds numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS pv_rows bigint NOT NULL DEFAULT 0;

-- 2. Per-page daily cache
CREATE TABLE IF NOT EXISTS public.page_daily_stats_cache (
  day date NOT NULL,
  page_path text NOT NULL,
  visitors bigint NOT NULL DEFAULT 0,
  views bigint NOT NULL DEFAULT 0,
  sum_duration_seconds numeric NOT NULL DEFAULT 0,
  PRIMARY KEY (day, page_path)
);

GRANT ALL ON public.page_daily_stats_cache TO service_role;
ALTER TABLE public.page_daily_stats_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cache read service" ON public.page_daily_stats_cache FOR SELECT TO service_role USING (true);

CREATE INDEX IF NOT EXISTS idx_page_daily_stats_cache_day ON public.page_daily_stats_cache(day);
CREATE INDEX IF NOT EXISTS idx_page_daily_stats_cache_path ON public.page_daily_stats_cache(page_path);

-- 3. Rewrite refresh to also populate duration + per-page cache
CREATE OR REPLACE FUNCTION public.refresh_daily_stats_cache(start_day date, end_day date)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Daily overall cache (with durations + view count)
  INSERT INTO public.daily_stats_cache (day, visitors, bio_clicks, podcast_clicks, bio_redirects, podcast_redirects, sum_duration_seconds, pv_rows)
  WITH pv_sessions AS (
    SELECT (entered_at AT TIME ZONE 'UTC')::date AS day,
           session_id,
           page_path,
           duration_seconds
    FROM public.page_views
    WHERE entered_at >= start_day::timestamptz
      AND entered_at <  (end_day + 1)::timestamptz
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

  -- Per-page daily cache
  DELETE FROM public.page_daily_stats_cache
   WHERE day BETWEEN start_day AND end_day;

  INSERT INTO public.page_daily_stats_cache (day, page_path, visitors, views, sum_duration_seconds)
  SELECT (entered_at AT TIME ZONE 'UTC')::date AS day,
         regexp_replace(page_path, '/+$', '') AS page_path,
         COUNT(DISTINCT session_id)::bigint,
         COUNT(*)::bigint,
         COALESCE(SUM(duration_seconds),0)::numeric
  FROM public.page_views
  WHERE entered_at >= start_day::timestamptz
    AND entered_at <  (end_day + 1)::timestamptz
    AND page_path NOT LIKE '/redirect%'
    AND page_path NOT LIKE '/admin-list%'
  GROUP BY 1, 2;
END;
$function$;

-- 4. Rewrite get_page_stats to use cache + live today
CREATE OR REPLACE FUNCTION public.get_page_stats(since_ts timestamp with time zone)
RETURNS TABLE(page_path text, unique_visitors bigint, avg_duration numeric, views bigint)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
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
      AND pv.page_path NOT LIKE '/redirect%'
      AND pv.page_path NOT LIKE '/admin-list%'
    GROUP BY 1
  ),
  merged AS (
    SELECT COALESCE(c.page_path, l.page_path) AS page_path,
           COALESCE(c.visitors,0) + COALESCE(l.visitors,0) AS visitors,
           COALESCE(c.views,0) + COALESCE(l.views,0) AS views,
           COALESCE(c.sum_dur,0) + COALESCE(l.sum_dur,0) AS sum_dur
    FROM cached c
    FULL OUTER JOIN live l ON l.page_path = c.page_path
  )
  SELECT m.page_path,
         m.visitors,
         CASE WHEN m.views > 0 THEN (m.sum_dur / m.views)::numeric ELSE 0::numeric END AS avg_duration,
         m.views
  FROM merged m
  WHERE m.page_path IS NOT NULL
  ORDER BY m.visitors DESC;
END;
$function$;

-- 5. Rewrite get_visitor_stats to use cache + live today
CREATE OR REPLACE FUNCTION public.get_visitor_stats(since_ts timestamp with time zone)
RETURNS TABLE(unique_visitors bigint, avg_duration numeric)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
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
    WHERE pv.entered_at >= GREATEST(since_ts, today_utc::timestamptz)
  )
  SELECT (cached.visitors + live.visitors)::bigint,
         CASE WHEN (cached.rows + live.rows) > 0
              THEN ((cached.sum_dur + live.sum_dur) / (cached.rows + live.rows))::numeric
              ELSE 0::numeric END
  FROM cached, live;
END;
$function$;

-- 6. Rewrite bio/podcast session counters using cache
CREATE OR REPLACE FUNCTION public.get_bio_click_sessions(since_ts timestamp with time zone)
RETURNS bigint
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
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
     AND page_path IN ('/bio','/links');
  RETURN cached_val + live_val;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_podcast_click_sessions(since_ts timestamp with time zone)
RETURNS bigint
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
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
     AND regexp_replace(page_path, '/+$', '') = '/podcast';
  RETURN cached_val + live_val;
END;
$function$;

-- 7. Backfill everything from launch to yesterday in chunks
DO $$
DECLARE
  s date := '2026-03-01'::date;
  e date := ((now() AT TIME ZONE 'UTC')::date - 1);
  chunk_start date;
  chunk_end date;
BEGIN
  chunk_start := s;
  WHILE chunk_start <= e LOOP
    chunk_end := LEAST(chunk_start + 6, e);
    PERFORM public.refresh_daily_stats_cache(chunk_start, chunk_end);
    chunk_start := chunk_end + 1;
  END LOOP;
END $$;
