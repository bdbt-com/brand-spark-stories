create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Remove any prior version of this job, then re-create at 20:00 UTC daily
do $$
begin
  perform cron.unschedule('refresh-latest-video-2000');
exception when others then null;
end $$;

select cron.schedule(
  'refresh-latest-video-2000',
  '0 20 * * *',
  $$
  select net.http_post(
    url := 'https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/youtube-videos?limit=1&fresh=1&refresh=1',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'apikey','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko'
    )
  );
  $$
);