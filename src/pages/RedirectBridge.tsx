import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { navigateToYouTube } from "@/lib/youtube-redirect";

const SUPABASE_URL = "https://xvqhkjgowlwfdosxmvba.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko";

const RedirectBridge = () => {
  const [params] = useSearchParams();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const videoId = params.get("video");
    const trackId = params.get("trackId") || videoId;

    if (!videoId) return;

    // Track with a normal fetch — we're still on our own site, so this reliably completes
    const track = fetch(`${SUPABASE_URL}/functions/v1/track-video-click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ videoId: trackId }),
    }).catch(() => {});

    // Wait for tracking to finish (or timeout after 1.5s), then navigate
    const timeout = new Promise((r) => setTimeout(r, 1500));
    Promise.race([track, timeout]).then(() => {
      navigateToYouTube(videoId);
    });
  }, [params]);

  return (
    <div className="min-h-screen bg-[#36455A] flex items-center justify-center">
      <p className="text-white text-lg animate-pulse">Opening YouTube…</p>
    </div>
  );
};

export default RedirectBridge;
