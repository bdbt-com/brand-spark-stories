### Revert LinkInBio
- In `src/pages/LinkInBio.tsx`, restore the 3 original thumbnail strings on lines 63, 71, 80:
  - line 63 → `"/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"`
  - line 71 → `"/lovable-uploads/recording-setup-new.jpg"`
  - line 80 → `"/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png"`
- Remove the 3 `linkBlueprintAsset` / `linkYoutubeAsset` / `linkSpotifyAsset` imports added previously.
- Keep the CDN pointer files (`src/assets/link-blueprint.png.asset.json`, `link-youtube.png.asset.json`, `link-spotify.png.asset.json`) — they'll be reused on Home.

### Home carousel swap
In `src/pages/Home.tsx`, replace these 3 entries in the `images` array (same order, preserving carousel sequence):

1. `/lovable-uploads/recording-setup-new.jpg` (desk recording) → `linkBlueprintAsset.url` (clapper-board behind-the-scenes)
2. `/lovable-uploads/man-in-car.jpeg` (man in car) → `linkYoutubeAsset.url` (close-up speaking)
3. `/lovable-uploads/2f4d6184-a8de-43f0-a345-4ed910c90522.png` (man on couch / green wall — confirmed by latest screenshot) → `linkSpotifyAsset.url` (arms-wide speaking)

Add the 3 asset-pointer imports at the top of `src/pages/Home.tsx`. No other files touched.
