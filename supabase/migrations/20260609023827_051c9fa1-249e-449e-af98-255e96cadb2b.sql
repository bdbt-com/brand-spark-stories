CREATE OR REPLACE FUNCTION public.get_page_stats(since_ts timestamptz)
RETURNS TABLE(page_path text, unique_visitors bigint, avg_duration numeric, views bigint)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    regexp_replace(pv.page_path, '/+$', '') AS page_path,
    COUNT(DISTINCT pv.session_id)::bigint AS unique_visitors,
    COALESCE(AVG(pv.duration_seconds), 0)::numeric AS avg_duration,
    COUNT(*)::bigint AS views
  FROM public.page_views pv
  WHERE pv.entered_at >= since_ts
    AND pv.page_path NOT LIKE '/redirect%'
    AND pv.page_path NOT LIKE '/admin-list%'
  GROUP BY regexp_replace(pv.page_path, '/+$', '')
  ORDER BY unique_visitors DESC;
$$;