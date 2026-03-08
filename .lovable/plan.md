

## New Bonus Episode Thumbnails — "The Choices We Make: Choosing Wins or Drifts"

This adds both a TikTok (index 80) and YouTube (index 66) thumbnail for a bonus episode.

### Changes across 3 files:

**1. `src/pages/ThumbnailTemplate.tsx`**
- Add YouTube template metadata at id 66: name "The Choices We Make: Choosing Wins or Drifts", subtitle "Daily Wins Podcast — Bonus Episode"
- Add TikTok template metadata at id 80: same title
- Add YouTube rendering block (index 66): standard layout with white "The Choices We Make" / gold "Choosing Wins or Drifts", subtitle "Daily Wins Podcast — Bonus Episode"
- Add TikTok rendering block (index 80, `mode === 'instagram'`): `<TikTokTemplate templateIndex={80} />`

**2. `src/components/TikTokTemplate.tsx`**
- Extend the `backgrounds` array with one more entry at index 80 (use `tikTokBg24` — even pattern)
- Add JSX title block for `templateIndex === 80`:
  - "BDBT PODCAST — BONUS" (small header)
  - "THE CHOICES WE MAKE" (white)
  - "CHOOSING WINS OR DRIFTS" (gold)

### No backend or data changes required.

