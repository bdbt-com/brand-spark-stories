
-- Enable RLS on guides table
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

-- Public read access (guides are publicly displayed)
CREATE POLICY "Anyone can read guides"
  ON public.guides FOR SELECT
  USING (true);

-- Enable RLS on guide_pdf_mapping table
ALTER TABLE public.guide_pdf_mapping ENABLE ROW LEVEL SECURITY;

-- Public read access (used to resolve guide PDFs)
CREATE POLICY "Anyone can read guide_pdf_mapping"
  ON public.guide_pdf_mapping FOR SELECT
  USING (true);
