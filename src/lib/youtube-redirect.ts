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
