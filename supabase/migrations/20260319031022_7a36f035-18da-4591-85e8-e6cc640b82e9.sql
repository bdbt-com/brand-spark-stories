CREATE OR REPLACE FUNCTION public.get_visitor_stats(since_ts timestamptz)
RETURNS TABLE(unique_visitors bigint, avg_duration numeric)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(DISTINCT session_id)::bigint,
    COALESCE(AVG(duration_seconds), 0)::numeric
  FROM page_views
  WHERE entered_at >= since_ts;
$$;