

# Add Podcast 67 — "Swap Butter for Peanut Butter"

P67 is odd → TikTok uses **Bg 28**. New indices: **TikTok = 85**, **YouTube = 71**.

## Changes

### 1. `src/components/TikTokTemplate.tsx`
- **Type**: Add `| 85`
- **Backgrounds array**: Append `tikTokBg28`
- **JSX title block**: Add `templateIndex === 85`:
  - Header: `BDBT PODCAST 67`
  - Line 1 (white): `SWAP BUTTER FOR`
  - Line 2 (gold): `PEANUT BUTTER`

### 2. `src/pages/ThumbnailTemplate.tsx`
- **TikTok metadata**: `{ id: 85, name: "Podcast 67 Swap Butter for Peanut Butter", title: "Swap Butter for Peanut Butter", subtitle: "", image: "" }`
- **TikTok rendering**: Block for `currentTemplateIndex === 85 && mode === 'instagram'` → `<TikTokTemplate templateIndex={85} />`
- **YouTube metadata**: `{ id: 71, name: "Swap Butter for Peanut Butter", title: "Swap Butter for Peanut Butter", subtitle: "Daily Wins Podcast 67", image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" }`
- **YouTube rendering**: Block for `currentTemplateIndex === 71 && mode === 'youtube'` with white "Swap Butter for" / gold "Peanut Butter", subtitle "Daily Wins Podcast 67"

4 locations across 2 files.

