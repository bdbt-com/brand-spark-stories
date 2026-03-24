const SUPABASE_URL = "https://xvqhkjgowlwfdosxmvba.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cWhramdvd2x3ZmRvc3htdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDUxNDIsImV4cCI6MjA2ODcyMTE0Mn0.J4KIuQ5m-F2MOYEpiMNWxQrfyUWqUF1JrzObQZBVTko";

/**
 * Fire-and-forget tracking via sendBeacon (survives page unload).
 * Falls back to fetch with keepalive.
 */
export function trackVideoClick(videoId: string) {
  const url = `${SUPABASE_URL}/functions/v1/track-video-click`;
  const body = JSON.stringify({ videoId });

  // sendBeacon is the most reliable for pre-navigation tracking
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    const sent = navigator.sendBeacon(url, blob);
    if (sent) return;
  }

  // Fallback: fetch with keepalive
  try {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
      },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Silently fail — best effort
  }
}

/**
 * Platform detection helpers
 */
function getPlatform() {
  const ua = navigator.userAgent || "";
  return {
    isInstagram: /Instagram|FBAN|FBAV/i.test(ua),
    isTikTok: /TikTok|Bytedance|musical_ly/i.test(ua),
    isAndroid: /Android/i.test(ua),
  };
}

/**
 * Track a video click then navigate to YouTube.
 * Uses sendBeacon for reliable pre-unload tracking.
 *
 * @param videoId  - YouTube video ID
 * @param trackId  - ID to store in video_clicks (e.g. "auto-redirect:VIDEO_ID" or plain video ID)
 */
export function trackAndRedirect(videoId: string, trackId?: string) {
  const id = trackId || videoId;

  // Track FIRST, then navigate
  trackVideoClick(id);

  // Navigate
  navigateToYouTube(videoId);
}

/**
 * Navigate to YouTube using platform-appropriate method.
 * Does NOT track — use trackAndRedirect() or trackVideoClick() separately.
 */
export function navigateToYouTube(videoId: string) {
  const webUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const appUrl = `vnd.youtube://www.youtube.com/watch?v=${videoId}`;
  const altAppUrl = `youtube://www.youtube.com/watch?v=${videoId}`;
  const intentUrl = `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;

  const { isInstagram, isTikTok, isAndroid } = getPlatform();

  // Instagram: deep link only (their browser blocks window.open)
  if (isInstagram) {
    window.location.href = appUrl;
    return;
  }

  // TikTok: open in system browser (their in-app browser blocks location.href to external sites)
  if (isTikTok) {
    const opened = window.open(webUrl, '_blank');
    if (!opened) {
      // Fallback: try location.href if popup blocked
      window.location.href = webUrl;
    }
    return;
  }

  // Standard browsers: try app deep link with web fallback
  const a = document.createElement("a");
  a.href = isAndroid ? intentUrl : appUrl;
  a.target = "_self";
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => {
    window.location.href = altAppUrl;
  }, 450);

  setTimeout(() => {
    window.location.href = webUrl;
  }, 1500);
}
