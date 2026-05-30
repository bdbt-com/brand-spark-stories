SELECT cron.unschedule('refresh-latest-video-gmt') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'refresh-latest-video-gmt');
SELECT cron.unschedule('refresh-latest-video-bst') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'refresh-latest-video-bst');

SELECT cron.schedule(
  'refresh-latest-video-gmt',
  '3 20 * * *',
  $$
  SELECT net.http_post(
    url := 'https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/refresh-latest-video',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);

SELECT cron.schedule(
  'refresh-latest-video-bst',
  '3 19 * * *',
  $$
  SELECT net.http_post(
    url := 'https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/refresh-latest-video',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);