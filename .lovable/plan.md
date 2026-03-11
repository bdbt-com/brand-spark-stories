

# Add Podcast 66 — "Build a 6-Month Emergency Buffer"

P66 is even-numbered → TikTok uses **Bg 24**. New indices: **TikTok = 84**, **YouTube = 70**.

## Changes

### 1. `src/components/TikTokTemplate.tsx`
- **Type**: Add `| 84` to the `templateIndex` union
- **Backgrounds array**: Append `tikTokBg24` (even podcast)
- **JSX title block**: Add `templateIndex === 84` block:
  - Header: `BDBT PODCAST 66`
  - Line 1 (white): `BUILD A 6-MONTH`
  - Line 2 (gold): `EMERGENCY BUFFER`

### 2. `src/pages/ThumbnailTemplate.tsx`
- **TikTok metadata**: Add `{ id: 84, name: "Podcast 66 Build a 6-Month Emergency Buffer", title: "Build a 6-Month Emergency Buffer", subtitle: "", image: "" }`
- **TikTok rendering**: Add block for `currentTemplateIndex === 84 && mode === 'instagram'` rendering `<TikTokTemplate templateIndex={84} />`
- **YouTube metadata**: Add `{ id: 70, name: "Build a 6-Month Emergency Buffer", title: "Build a 6-Month Emergency Buffer", subtitle: "Daily Wins Podcast 66", image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" }`
- **YouTube rendering**: Add block for `currentTemplateIndex === 70 && mode === 'youtube'` with white "Build a 6-Month" / gold "Emergency Buffer", subtitle "Daily Wins Podcast 66"

4 locations across 2 files.

