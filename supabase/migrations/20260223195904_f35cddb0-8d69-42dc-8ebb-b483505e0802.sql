
-- Insert recovered subscribers from screenshots (deduplicated)
-- Existing emails: conningh@gmail.com, bdbt533@gmail.com, test-lovable-check@example.com
-- We insert new rows even for existing emails if the guide_title differs

INSERT INTO email_subscriptions (email, first_name, guide_title, email_sent, created_at)
VALUES
  ('conningh@gmail.com', 'Harry', 'Wait 24 Hours before Clicking Buy', true, '2025-09-30T12:00:00Z'),
  ('jtconning@gmail.com', 'James', 'Top of the Stairs', true, '2025-09-30T12:00:00Z'),
  ('conningjt@gmail.com', 'James', 'Wait 30 Days Before Any Status Spend', true, '2025-10-22T12:00:00Z'),
  ('benraven@me.com', 'Ben', 'Park further away', true, '2025-10-29T12:00:00Z'),
  ('email@jamieraven.co.uk', 'Jamie', 'BDBT Foundation Blueprint', true, '2025-12-29T12:00:00Z'),
  ('steven.mcgregor@rocketmail.com', 'Steven', 'Smile at yourself in the mirror', true, '2025-12-29T12:00:00Z'),
  ('katywickings@hotmail.co.uk', 'Katy', 'BDBT Foundation Blueprint', true, '2025-12-29T12:00:00Z'),
  ('jwickings@gmail.com', 'John Wickings', 'BDBT Foundation Blueprint', true, '2025-12-30T12:00:00Z'),
  ('scarlettrj@hotmail.com', 'Scarlett', 'BDBT Foundation Blueprint', true, '2025-12-31T12:00:00Z'),
  ('isthisrichard@hotmail.com', 'Rich', 'BDBT Foundation Blueprint', true, '2026-01-02T12:00:00Z'),
  ('zhuddart@gmail.com', 'Zac', 'BDBT Foundation Blueprint', true, '2026-01-02T12:00:00Z'),
  ('scott28381@gmail.com', 'Scott', 'BDBT Foundation Blueprint', true, '2026-01-02T12:00:00Z'),
  ('clamc@hotmail.co.uk', 'Chloe', 'BDBT Foundation Blueprint', true, '2026-01-03T12:00:00Z'),
  ('seth-mayiza@hotmail.co.uk', 'Seth', 'BDBT Foundation Blueprint', true, '2026-01-03T12:00:00Z'),
  ('zhomoky@gmail.com', 'Alexander', 'BDBT Foundation Blueprint', true, '2026-01-04T12:00:00Z'),
  ('richienisbet80@gmail.com', 'Micro Dawg', 'BDBT Foundation Blueprint', true, '2026-01-06T12:00:00Z'),
  ('steven.mcgregor@rocketmail.com', 'Steven McGregor', 'Wait 24 Hours before Clicking Buy', true, '2026-01-06T12:00:00Z'),
  ('steven.mcgregor@rocketmail.com', 'Steve McGregor', 'Do calf raises while brushing your teeth', true, '2026-01-06T12:00:00Z'),
  ('anandgbrl@gmail.com', NULL, 'BDBT Foundation Blueprint', true, '2026-01-15T12:00:00Z'),
  ('krish8arora@gmail.com', NULL, 'BDBT Foundation Blueprint', true, '2026-01-15T12:00:00Z'),
  ('prabhukalyan001@gmail.com', NULL, 'BDBT Foundation Blueprint', true, '2026-01-15T12:00:00Z'),
  ('joan.wilmot@sky.com', NULL, 'BDBT Foundation Blueprint', true, '2026-01-15T12:00:00Z');
