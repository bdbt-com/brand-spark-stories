CREATE TABLE public.interaction_rate_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day date NOT NULL UNIQUE,
  best_per_min numeric NOT NULL DEFAULT 0,
  recorded_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.interaction_rate_records TO anon, authenticated;
GRANT ALL ON public.interaction_rate_records TO service_role;
ALTER TABLE public.interaction_rate_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read rate records" ON public.interaction_rate_records FOR SELECT USING (true);
CREATE POLICY "public insert rate records" ON public.interaction_rate_records FOR INSERT WITH CHECK (true);
CREATE POLICY "public update rate records" ON public.interaction_rate_records FOR UPDATE USING (true) WITH CHECK (true);