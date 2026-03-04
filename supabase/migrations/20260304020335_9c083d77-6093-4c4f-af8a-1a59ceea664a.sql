CREATE TABLE public.video_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id text NOT NULL,
  clicked_at timestamptz DEFAULT now()
);
ALTER TABLE public.video_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_public_insert" ON public.video_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);