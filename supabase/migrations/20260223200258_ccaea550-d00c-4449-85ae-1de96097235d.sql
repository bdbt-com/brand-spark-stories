
-- Fix incorrect placeholder dates for the 4 entries
UPDATE email_subscriptions SET created_at = '2026-02-22T12:00:00Z' WHERE id = '43a08ec4-48c8-4eef-8868-0229ffd997b0';
UPDATE email_subscriptions SET created_at = '2026-02-21T12:00:00Z' WHERE id = 'd794eb51-5340-4d8d-a2f7-24885365755e';
UPDATE email_subscriptions SET created_at = '2026-02-20T12:00:00Z' WHERE id = '14968a5d-30f6-4194-a5ca-7cf55fa8ed8b';
UPDATE email_subscriptions SET created_at = '2026-02-18T12:00:00Z' WHERE id = '4a0bcfef-7b7a-41d3-8a19-a42617e02a34';

-- Add missing recent signups visible in Resend but not in the DB
-- conningh - Do 10 reverse lunges (3 days ago = Feb 20)
INSERT INTO email_subscriptions (email, first_name, guide_title, email_sent, created_at)
VALUES ('conningh@gmail.com', 'Harry', 'Do 10 reverse lunges while watching TV', true, '2026-02-20T12:00:00Z');

-- benraven - Get your lunges in while vacuuming (3 days ago = Feb 20)
INSERT INTO email_subscriptions (email, first_name, guide_title, email_sent, created_at)
VALUES ('benraven@me.com', 'Ben', 'Get your lunges in while vacuuming', true, '2026-02-20T12:00:00Z');

-- benraven - Prioritise finding time to unwind (11 days ago = Feb 12)
INSERT INTO email_subscriptions (email, first_name, guide_title, email_sent, created_at)
VALUES ('benraven@me.com', 'Ben', 'Prioritise finding time to unwind', true, '2026-02-12T12:00:00Z');

-- benraven - Hug Daily (11 days ago = Feb 12)
INSERT INTO email_subscriptions (email, first_name, guide_title, email_sent, created_at)
VALUES ('benraven@me.com', 'Ben', 'Hug Daily', true, '2026-02-12T12:00:00Z');
