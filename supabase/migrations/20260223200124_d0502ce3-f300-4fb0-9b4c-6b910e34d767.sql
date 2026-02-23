
-- Remove old duplicate test entries from July 2025 that have no name/guide info
-- These are from before the schema was updated
DELETE FROM email_subscriptions
WHERE first_name IS NULL
  AND guide_title IS NULL
  AND email IN ('conningh@gmail.com', 'bdbt533@gmail.com');

-- Remove the test record
DELETE FROM email_subscriptions
WHERE email = 'test-lovable-check@example.com';
