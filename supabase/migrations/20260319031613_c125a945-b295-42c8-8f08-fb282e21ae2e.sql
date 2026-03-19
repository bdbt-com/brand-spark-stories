
CREATE OR REPLACE FUNCTION public.get_video_click_counts()
RETURNS TABLE(video_id text, total bigint, today bigint, d7 bigint, d14 bigint, d30 bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT 
    video_id,
    COUNT(*)::bigint AS total,
    COUNT(*) FILTER (WHERE clicked_at >= date_trunc('day', now() AT TIME ZONE 'UTC'))::bigint AS today,
    COUNT(*) FILTER (WHERE clicked_at >= now() - interval '7 days')::bigint AS d7,
    COUNT(*) FILTER (WHERE clicked_at >= now() - interval '14 days')::bigint AS d14,
    COUNT(*) FILTER (WHERE clicked_at >= now() - interval '30 days')::bigint AS d30
  FROM video_clicks
  GROUP BY video_id;
$$;

CREATE OR REPLACE FUNCTION public.get_download_counts_by_guide()
RETURNS TABLE(guide_title text, download_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT guide_title, COUNT(*)::bigint
  FROM email_subscriptions
  WHERE email_sent = true AND guide_title IS NOT NULL
  GROUP BY guide_title;
$$;
