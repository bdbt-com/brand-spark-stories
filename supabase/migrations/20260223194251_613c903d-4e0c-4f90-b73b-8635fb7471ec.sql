
ALTER TABLE public.email_subscriptions
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS guide_title text,
  ADD COLUMN IF NOT EXISTS guide_download_url text,
  ADD COLUMN IF NOT EXISTS email_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_sent_at timestamp with time zone;
