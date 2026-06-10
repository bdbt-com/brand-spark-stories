## Plan

Replace the low-quality clapper board photo in the homepage hero carousel with the new high-resolution version the user just uploaded.

**Steps:**

1. Upload the new image (`/mnt/user-uploads/Screenshot_2026-06-10_at_13.15.41.png`) to the Lovable CDN via `lovable-assets create --filename clapperboard-shot.png`, writing the pointer to `src/assets/clapperboard-shot.png.asset.json`.

2. In `src/pages/Home.tsx`:
   - Import the new asset pointer near the other asset imports at the top.
   - Replace the carousel image entry at line 31 (`/lovable-uploads/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.png` — the clapper board slot) with the new asset's `url`.
   - Leave all other carousel images, ordering, and behaviour unchanged.

No other pages, components, or styles are touched.
