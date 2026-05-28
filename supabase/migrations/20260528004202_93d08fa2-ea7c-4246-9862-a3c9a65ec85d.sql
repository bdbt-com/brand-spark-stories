
DO $$
BEGIN
  PERFORM cron.unschedule('refresh-youtube-videos-daily');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
DO $$
BEGIN
  PERFORM cron.unschedule('refresh-youtube-videos-bst');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
DO $$
BEGIN
  PERFORM cron.unschedule('refresh-youtube-videos-gmt');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'refresh-youtube-videos-bst',
  '5 19 * * *',
  $$
  SELECT net.http_get(
    url := 'https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/youtube-videos?fresh=1&limit=12',
    headers := '{"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko"}'::jsonb
  );
  $$
);

SELECT cron.schedule(
  'refresh-youtube-videos-gmt',
  '5 20 * * *',
  $$
  SELECT net.http_get(
    url := 'https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/youtube-videos?fresh=1&limit=12',
    headers := '{"apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko"}'::jsonb
  );
  $$
);
