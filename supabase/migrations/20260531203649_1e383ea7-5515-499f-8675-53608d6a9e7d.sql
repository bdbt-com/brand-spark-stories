create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.unschedule('refresh-latest-video-15min') where exists (select 1 from cron.job where jobname='refresh-latest-video-15min');

select cron.schedule(
  'refresh-latest-video-15min',
  '*/15 * * * *',
  $$
  select net.http_post(
    url:='https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/refresh-latest-video',
    headers:='{"Content-Type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko"}'::jsonb,
    body:='{}'::jsonb
  ) as request_id;
  $$
);