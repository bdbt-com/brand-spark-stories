CREATE POLICY "Only service role can select email_subscriptions"
ON public.email_subscriptions
FOR SELECT
TO authenticated
USING (false);