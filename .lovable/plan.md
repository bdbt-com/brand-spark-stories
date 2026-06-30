## Plan: Move Spotify into the social icon row

**File:** `src/pages/Podcast.tsx`

1. Remove the standalone Spotify card block (the `<div className="flex items-center justify-center mt-3 sm:mt-4">` containing the Spotify `<a>`).
2. In the social icons row (currently Instagram + TikTok above the thumbnail), add a third `<a>` for Spotify after TikTok:
   - Same greyed style as IG/TT: `text-foreground/40 hover:text-foreground/80 transition-colors`
   - Same size: `w-6 h-6 sm:w-7 sm:h-7`
   - Uses `currentColor` Spotify SVG (so it's grey, not green)
   - href = existing `SPOTIFY_URL`, target=_blank, rel=noopener, aria-label="Spotify"
   - onClick still calls `trackClick("podcast-spotify")` and `setRedirected(true)`

No other changes.