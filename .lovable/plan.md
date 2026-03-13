

# Add Podcast 68 — "Wait 30 Days Before Any Status Spend"

P68 is even → TikTok uses **Bg 24**. New indices: **TikTok = 86**, **YouTube = 72**.

## Changes

### 1. `src/components/TikTokTemplate.tsx`
- **Type**: Add `| 86` to the `templateIndex` union
- **Backgrounds array**: Append `tikTokBg24` (even podcast)
- **JSX title block**: Add `templateIndex === 86` block:
  - Header: `BDBT PODCAST 68`
  - Line 1 (white): `WAIT 30 DAYS BEFORE`
  - Line 2 (gold): `ANY STATUS SPEND`

### 2. `src/pages/ThumbnailTemplate.tsx`
- **TikTok metadata**: `{ id: 86, name: "Podcast 68 Wait 30 Days Before Any Status Spend", title: "Wait 30 Days Before Any Status Spend", subtitle: "", image: "" }`
- **TikTok rendering**: Block for `currentTemplateIndex === 86 && mode === 'instagram'` → `<TikTokTemplate templateIndex={86} />`
- **YouTube metadata**: `{ id: 72, name: "Wait 30 Days Before Any Status Spend", title: "Wait 30 Days Before Any Status Spend", subtitle: "Daily Wins Podcast 68", image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" }`
- **YouTube rendering**: Block for `currentTemplateIndex === 72 && mode === 'youtube'` with white "Wait 30 Days Before" / gold "Any Status Spend", subtitle "Daily Wins Podcast 68"

4 locations across 2 files.

