Replace the 3 carousel-leading assets I uploaded earlier with the clean source versions just provided.

## Steps

1. Delete the 3 existing placeholder assets (the screenshot-framed versions):
   - `src/assets/bd-clapper-set.png.asset.json`
   - `src/assets/bd-talking-1.png.asset.json`
   - `src/assets/bd-talking-2.png.asset.json`

2. Re-upload via `lovable-assets create` using the three new clean uploads, keeping the **same filenames** so no code changes are needed in `src/pages/Home.tsx`:
   - `Screenshot_2026-06-10_at_13.15.41-2.png` → `bd-clapper-set.png`
   - `Screenshot_2026-06-10_at_12.51.55-2.png` → `bd-talking-1.png` (arms-wide speaking shot)
   - `Screenshot_2026-06-10_at_12.52.24-2.png` → `bd-talking-2.png` (close-up profile speaking shot)

3. No edits to `Home.tsx` — imports and carousel order stay exactly as they are; the new CDN URLs just take over.