Replace the three card thumbnails on the `/links` page (`src/pages/LinkInBio.tsx`) in this order:

1. **Free Foundation Blueprint** (line 63) → clapper-board behind-the-scenes shot (`Screenshot_2026-06-10_at_12.52.15.png`)
2. **Daily Wins Podcast (YouTube)** (line 71) → close-up speaking shot (`Screenshot_2026-06-10_at_12.52.24.png`)
3. **Daily Wins Podcast (Spotify)** (line 80) → arms-wide speaking shot (`Screenshot_2026-06-10_at_12.51.55.png`)

### Technical steps
- Upload each user-provided image via `lovable-assets create` from `/mnt/user-uploads/...`, writing pointer files to `src/assets/link-blueprint.png.asset.json`, `src/assets/link-youtube.png.asset.json`, `src/assets/link-spotify.png.asset.json`.
- Import the pointer JSONs in `src/pages/LinkInBio.tsx` and replace the `thumbnail` strings on lines 63, 71, 80 with the imported `.url` values.
- No other files or pages touched.
