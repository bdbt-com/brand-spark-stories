
-- Drop the broken restrictive policies
DROP POLICY IF EXISTS "allow_public_insert" ON public.page_views;
DROP POLICY IF EXISTS "allow_public_update_own_session" ON public.page_views;

-- Recreate as PERMISSIVE
CREATE POLICY "allow_public_insert"
  ON public.page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "allow_public_update_own_session"
  ON public.page_views
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
