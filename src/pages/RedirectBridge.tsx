import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { navigateToYouTube, youtubeWatchUrl } from "@/lib/youtube-redirect";

const SUPABASE_URL = "https://xvqhkjgowlwfdosxmvba.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko";

const RedirectBridge = () => {
  const [params] = useSearchParams();
  const hasRun = useRef(false);

  const videoId = params.get("video");
  const playlist = params.get("list") || undefined;
  const targetUrl = useMemo(
    () => (videoId ? youtubeWatchUrl(videoId, playlist) : null),
    [videoId, playlist]
  );

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const trackId = params.get("trackId") || videoId;

    if (!videoId) {
      window.location.replace("/podcast");
      return;
    }

    let navigated = false;
    const go = () => {
      if (navigated) return;
      navigated = true;
      navigateToYouTube(videoId, playlist);
    };

    // Tracking is fire-and-forget with keepalive so it completes even after we
    // navigate away — the redirect never waits on the network.
    try {
      fetch(`${SUPABASE_URL}/functions/v1/track-video-click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ videoId: trackId }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* ignore */
    }

    // Small delay so the request is actually dispatched, then leave.
    const primary = window.setTimeout(go, 120);
    // Hard backstop in case anything above is delayed.
    const safety = window.setTimeout(go, 1200);

    return () => {
      window.clearTimeout(primary);
      window.clearTimeout(safety);
    };
  }, [params, videoId, playlist]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      {targetUrl && (
        <a
          href={targetUrl}
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary underline underline-offset-4"
        >
          Taking you to YouTube — tap here if nothing happens
        </a>
      )}
    </div>
  );
};

export default RedirectBridge;
