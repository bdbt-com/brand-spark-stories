-- Add unique constraint on email column to prevent duplicate signups
ALTER TABLE email_subscriptions ADD CONSTRAINT email_subscriptions_email_unique UNIQUE (email);