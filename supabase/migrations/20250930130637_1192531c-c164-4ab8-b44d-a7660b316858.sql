-- Fix RLS policies for email_subscriptions table to prevent public data exposure
-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can submit email for guide" ON public.email_subscriptions;

-- Recreate policies with proper security

-- Policy 1: Allow public INSERT only (for form submissions)
CREATE POLICY "Allow public form submissions"
ON public.email_subscriptions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Prevent all SELECT access from public
-- Only service role (backend) can read email data
CREATE POLICY "Only service role can read emails"
ON public.email_subscriptions
FOR SELECT
TO service_role
USING (true);

-- Policy 3: Prevent all UPDATE access from public
CREATE POLICY "Only service role can update records"
ON public.email_subscriptions
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Policy 4: Prevent all DELETE access from public
CREATE POLICY "Only service role can delete records"
ON public.email_subscriptions
FOR DELETE
TO service_role
USING (true);