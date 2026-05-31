const SUPABASE_URL = "https://xvqhkjgowlwfdosxmvba.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko";

/**
 * Fire-and-forget click tracking for non-YouTube links (Spotify, Blueprint, etc.).
 * Uses sendBeacon when available so it survives navigation.
 */
export function trackClick(trackId: string) {
  try {
    const body = JSON.stringify({ videoId: trackId });
    const url = `${SUPABASE_URL}/functions/v1/track-video-click`;
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      return;
    }
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}

/**
 * Navigate to the internal redirect bridge page, which tracks the click
 * on our own domain first, then sends the user to YouTube.
 */
export function startTrackedRedirect(videoId: string, trackId?: string) {
  const params = new URLSearchParams({ video: videoId });
  if (trackId) params.set("trackId", trackId);
  window.location.href = `/redirect?${params.toString()}`;
}

/**
 * Open the YouTube app on mobile (with web fallback if not installed),
 * or open youtube.com directly on desktop. Called from the RedirectBridge
 * page after tracking has completed.
 */
export function navigateToYouTube(videoId: string) {
  const webUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const ua = navigator.userAgent || "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  if (!isMobile) {
    window.location.href = webUrl;
    return;
  }

  // Try the YouTube app deep link
  window.location.href = `vnd.youtube://www.youtube.com/watch?v=${videoId}`;

  // If the app didn't take over (page still visible after 1.5s), fall back to web
  setTimeout(() => {
    if (!document.hidden) {
      window.location.href = webUrl;
    }
  }, 1500);
}
