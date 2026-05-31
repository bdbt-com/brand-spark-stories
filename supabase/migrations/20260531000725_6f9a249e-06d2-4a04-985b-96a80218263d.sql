SELECT cron.unschedule('refresh-youtube-videos-bst');
SELECT cron.unschedule('refresh-youtube-videos-gmt');
SELECT cron.unschedule('refresh-latest-video-gmt');
SELECT cron.unschedule('refresh-latest-video-bst');

SELECT cron.schedule(
  'refresh-youtube-videos-hourly',
  '5 * * * *',
  $$
  SELECT net.http_get(
    url := 'https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/youtube-videos?fresh=1&limit=12',
    headers := '{"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko"}'::jsonb
  );
  $$
);

SELECT cron.schedule(
  'refresh-latest-video-hourly',
  '10 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/refresh-latest-video',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);