CREATE OR REPLACE FUNCTION public.get_bio_click_sessions(since_ts timestamp with time zone)
RETURNS bigint
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT COUNT(DISTINCT session_id)::bigint
  FROM page_views
  WHERE entered_at >= since_ts
    AND page_path IN ('/bio', '/links');
$$;

GRANT EXECUTE ON FUNCTION public.get_bio_click_sessions(timestamp with time zone) TO anon, authenticated, service_role;