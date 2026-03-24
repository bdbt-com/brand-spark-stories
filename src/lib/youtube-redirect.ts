/**
 * Navigate to the internal redirect bridge page, which tracks the click
 * on our own domain first, then sends the user to YouTube.
 *
 * This is the ONLY function pages should call for tracked YouTube opens.
 */
export function startTrackedRedirect(videoId: string, trackId?: string) {
  const params = new URLSearchParams({ video: videoId });
  if (trackId) params.set("trackId", trackId);
  window.location.href = `/redirect?${params.toString()}`;
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
 * Navigate to YouTube using platform-appropriate method.
 * Called ONLY from the RedirectBridge page after tracking is already done.
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

  // TikTok: open in system browser to bypass sandbox
  if (isTikTok) {
    const opened = window.open(webUrl, '_blank');
    if (!opened) {
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
