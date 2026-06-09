ALTER TABLE public.video_clicks ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS country text;
CREATE INDEX IF NOT EXISTS idx_video_clicks_country ON public.video_clicks (country);