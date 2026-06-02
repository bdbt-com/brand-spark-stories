CREATE OR REPLACE FUNCTION public.get_today_live_tick()
RETURNS TABLE (
  visitors_today bigint,
  subscribers_today bigint,
  bio_clicks_today bigint,
  podcast_clicks_today bigint,
  bio_redirects_today bigint,
  podcast_redirects_today bigint,
  total_clicks_today bigint
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  WITH d AS (SELECT date_trunc('day', now() AT TIME ZONE 'UTC') AS midnight)
  SELECT
    (SELECT COUNT(DISTINCT session_id)::bigint FROM page_views, d WHERE entered_at >= d.midnight),
    (SELECT COUNT(*)::bigint FROM email_subscriptions, d WHERE created_at >= d.midnight),
    (SELECT COUNT(DISTINCT session_id)::bigint FROM page_views, d WHERE entered_at >= d.midnight AND page_path IN ('/bio','/links')),
    (SELECT COUNT(DISTINCT session_id)::bigint FROM page_views, d WHERE entered_at >= d.midnight AND page_path = '/podcast'),
    (SELECT COUNT(*)::bigint FROM video_clicks, d WHERE clicked_at >= d.midnight AND (video_id = 'auto-redirect' OR video_id LIKE 'auto-redirect:%')),
    (SELECT COUNT(*)::bigint FROM video_clicks, d WHERE clicked_at >= d.midnight AND video_id LIKE 'latest-auto:%'),
    (SELECT COUNT(*)::bigint FROM video_clicks, d WHERE clicked_at >= d.midnight);
$$;

GRANT EXECUTE ON FUNCTION public.get_today_live_tick() TO anon, authenticated, service_role;