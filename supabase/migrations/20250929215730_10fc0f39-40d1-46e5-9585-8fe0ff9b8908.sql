-- Create email_subscriptions table to track all guide downloads
CREATE TABLE IF NOT EXISTS public.email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  guide_title TEXT NOT NULL,
  guide_download_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can submit their email)
CREATE POLICY "Anyone can submit email for guide"
  ON public.email_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_email_subscriptions_email ON public.email_subscriptions(email);
CREATE INDEX idx_email_subscriptions_created_at ON public.email_subscriptions(created_at DESC);