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
    // Note: sendBeacon can't set the `apikey` header Supabase's gateway requires,
    // so we always use fetch with keepalive. Works for new-tab opens (current page
    // stays alive) and normal navigations.
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}

/**
 * Uploads playlist ID for the Daily Wins YouTube channel
 * (channel UCUjFNTMKnaeP5TyN-cOF5bw → uploads playlist UULF...).
 * Passing this as `&list=` to a YouTube watch URL causes the next upload
 * to autoplay after the current video finishes.
 */
export const UPLOADS_PLAYLIST_ID = "UULFUjFNTMKnaeP5TyN-cOF5bw";

/**
 * Navigate to the internal redirect bridge page, which tracks the click
 * on our own domain first, then sends the user to YouTube.
 */
export function startTrackedRedirect(videoId: string, trackId?: string, playlist?: string) {
  const params = new URLSearchParams({ video: videoId });
  if (trackId) params.set("trackId", trackId);
  if (playlist) params.set("list", playlist);
  window.location.href = `/redirect?${params.toString()}`;
}

/**
 * Open the YouTube app on mobile (with web fallback if not installed),
 * or open youtube.com directly on desktop. Called from the RedirectBridge
 * page after tracking has completed.
 */
export function navigateToYouTube(videoId: string, playlist?: string) {
  const listSuffix = playlist ? `&list=${playlist}` : "";
  const webUrl = `https://www.youtube.com/watch?v=${videoId}${listSuffix}`;
  const ua = navigator.userAgent || "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  if (!isMobile) {
    window.location.href = webUrl;
    return;
  }

  // Try the YouTube app deep link (the app honours &list= too)
  window.location.href = `vnd.youtube://www.youtube.com/watch?v=${videoId}${listSuffix}`;

  // If the app didn't take over (page still visible after 1.5s), fall back to web
  setTimeout(() => {
    if (!document.hidden) {
      window.location.href = webUrl;
    }
  }, 1500);
}
