-- Drop the email-only unique constraint
ALTER TABLE email_subscriptions DROP CONSTRAINT IF EXISTS email_subscriptions_email_unique;

-- Add unique constraint on first_name + email combination to prevent exact duplicates
ALTER TABLE email_subscriptions ADD CONSTRAINT email_subscriptions_name_email_unique UNIQUE (first_name, email);