CREATE TABLE public.latest_video_cache (
  id integer PRIMARY KEY DEFAULT 1,
  video_id text NOT NULL,
  title text NOT NULL,
  thumbnail_url text NOT NULL,
  view_count_text text,
  published_text text,
  duration text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT singleton CHECK (id = 1)
);

GRANT SELECT ON public.latest_video_cache TO anon;
GRANT SELECT ON public.latest_video_cache TO authenticated;
GRANT ALL ON public.latest_video_cache TO service_role;

ALTER TABLE public.latest_video_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read latest video cache"
ON public.latest_video_cache
FOR SELECT
USING (true);