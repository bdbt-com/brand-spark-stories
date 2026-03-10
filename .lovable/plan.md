

# Add Podcast 65 — "Use a Handbasket Instead of a Trolley"

P65 is odd-numbered → TikTok uses **Bg 28** (`tikTokBg28`). New indices: **TikTok = 83**, **YouTube = 69**.

## Changes

### 1. `src/components/TikTokTemplate.tsx`
- **Type**: Add `| 83` to the `templateIndex` union
- **Backgrounds array**: Append `tikTokBg28` (odd podcast)
- **JSX title block**: Add `templateIndex === 83` block:
  - Header: `BDBT PODCAST 65`
  - Line 1 (white): `USE A HANDBASKET`
  - Line 2 (gold): `INSTEAD OF A TROLLEY`

### 2. `src/pages/ThumbnailTemplate.tsx`
- **TikTok metadata**: Add `{ id: 83, name: "Podcast 65 Use a Handbasket Instead of a Trolley", title: "Use a Handbasket Instead of a Trolley", subtitle: "", image: "" }`
- **TikTok rendering**: Add `currentTemplateIndex === 83 && mode === 'instagram'` block rendering `<TikTokTemplate templateIndex={83} />`
- **YouTube metadata**: Add `{ id: 69, name: "Use a Handbasket Instead of a Trolley", title: "Use a Handbasket Instead of a Trolley", subtitle: "Daily Wins Podcast 65", image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" }`
- **YouTube rendering**: Add `currentTemplateIndex === 69 && mode === 'youtube'` block with white "Use a Handbasket" / gold "Instead of a Trolley", subtitle "Daily Wins Podcast 65"

4 locations across 2 files.

