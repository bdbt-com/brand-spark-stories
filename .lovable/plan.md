

# Add Podcast 71 — "Drink Warm Lemon Water and Cayenne Pepper"

Spelling correction: "cayanne papper" → **Cayenne Pepper**.

P71 is odd → TikTok uses **Bg 28**. New indices: **TikTok = 89**, **YouTube = 75**.

## Changes

### 1. `src/components/TikTokTemplate.tsx`
- **Type**: Add `| 89`
- **Backgrounds array**: Append `tikTokBg28`
- **JSX title block**: Add `templateIndex === 89`:
  - Header: `BDBT PODCAST 71`
  - Line 1 (white): `DRINK WARM LEMON`
  - Line 2 (white): `WATER AND CAYENNE`
  - Line 3 (gold): `PEPPER`

### 2. `src/pages/ThumbnailTemplate.tsx`
- **TikTok metadata**: `{ id: 89, name: "Podcast 71 Drink Warm Lemon Water and Cayenne Pepper", ... }`
- **TikTok rendering**: Block for `currentTemplateIndex === 89 && mode === 'instagram'`
- **YouTube metadata**: `{ id: 75, name: "Drink Warm Lemon Water and Cayenne Pepper", subtitle: "Daily Wins Podcast 71", image: profile photo }`
- **YouTube rendering**: Block for `currentTemplateIndex === 75 && mode === 'youtube'` with white "Drink Warm Lemon Water" / gold "and Cayenne Pepper", subtitle "Daily Wins Podcast 71"

4 locations across 2 files.

