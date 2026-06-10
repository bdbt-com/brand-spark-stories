
CREATE OR REPLACE FUNCTION public.get_course_signup_counts()
RETURNS TABLE(total bigint, today bigint, d7 bigint, d14 bigint, d30 bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH dedup AS (
    SELECT email, MIN(created_at) AS first_at
    FROM public.course_waitlist
    GROUP BY email
  ), bounds AS (
    SELECT (date_trunc('day', now() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC') AS utc_midnight
  )
  SELECT
    COUNT(*)::bigint AS total,
    COUNT(*) FILTER (WHERE first_at >= bounds.utc_midnight)::bigint AS today,
    COUNT(*) FILTER (WHERE first_at >= now() - interval '7 days')::bigint AS d7,
    COUNT(*) FILTER (WHERE first_at >= now() - interval '14 days')::bigint AS d14,
    COUNT(*) FILTER (WHERE first_at >= now() - interval '30 days')::bigint AS d30
  FROM dedup CROSS JOIN bounds;
$$;

GRANT EXECUTE ON FUNCTION public.get_course_signup_counts() TO anon, authenticated, service_role;
