

## Plan: Restyle /bio Podcast Section to Match Home Page + Modern Link Icons

### 1. Podcast Episodes — Match Home Page Layout

Replace the current small horizontal list items in the "Top Episodes" section with the same card grid layout from the Home page:
- Large YouTube thumbnails (aspect-video, `hqdefault.jpg` instead of `mqdefault.jpg`)
- Rounded play button overlay (white circle with play icon)
- Title and view count below each thumbnail as a clickable link
- On mobile: single column stack. On desktop (if space allows within max-w-md): still single column but with the larger card style
- Keep inline iframe playback and video click tracking

### 2. Link Buttons — Modern Icons

Replace the thumbnail images on the 3 link buttons with clean Lucide icons for a more modern look:
- **Free Foundation Blueprint** — `FileText` or `BookOpen` icon
- **BDBT Daily Podcast (YouTube)** — YouTube SVG icon (keep existing)
- **BDBT Daily Podcast (Spotify)** — Spotify SVG icon (keep existing)

Actually, since the links already have thumbnail images, I'll replace them with styled icon containers using the brand SVGs (YouTube, Spotify) and a Lucide icon for Blueprint, displayed as clean rounded squares with brand colors instead of photo thumbnails.

### Files Changed
- `src/pages/LinkInBio.tsx` — restyle podcast cards to match Home page grid layout; replace link thumbnail images with modern icon containers

