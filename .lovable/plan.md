

# Shrink mobile video cards by 15% on /bio page

## Change

### `src/pages/LinkInBio.tsx` (line 234)

Change the mobile card width from `w-[52vw] min-w-[52vw] max-w-[52vw]` to `w-[44vw] min-w-[44vw] max-w-[44vw]` (52 × 0.85 ≈ 44vw). Desktop sizes remain unchanged.

Also remove the gentle-pulse animation from the center card (line 237) since the user wants no animation.

One file, two small edits.

