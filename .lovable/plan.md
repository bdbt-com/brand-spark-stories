

# Add Podcast 64 — "Create an Accountability Group Chat"

P64 is even-numbered, so TikTok uses Bg 24 (`tikTokBg24`). New indices: TikTok = 82, YouTube = 68.

## Changes

### 1. `src/components/TikTokTemplate.tsx`
- **Type** (line 33): Add `| 82` to the union
- **Backgrounds array** (line 38): Append `tikTokBg24` (even podcast = Bg 24)
- **JSX title block** (after line 1143): Add `templateIndex === 82` block with:
  - Header: `BDBT PODCAST 64`
  - Line 1 (white): `CREATE AN ACCOUNTABILITY`
  - Line 2 (gold): `GROUP CHAT`

### 2. `src/pages/ThumbnailTemplate.tsx`
- **TikTok `tikTokTemplates` array** (after line 585): Add `{ id: 82, name: "Podcast 64 Create an Accountability Group Chat", title: "Create an Accountability Group Chat", subtitle: "", image: "" }`
- **TikTok rendering block** (after line 1431): Add `currentTemplateIndex === 82 && mode === 'instagram'` block rendering `<TikTokTemplate templateIndex={82} />`
- **YouTube `templates` array** (after id 67, line ~499): Add `{ id: 68, name: "Create an Accountability Group Chat", title: "Create an Accountability Group Chat", subtitle: "Daily Wins Podcast 64", image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png" }`
- **YouTube rendering block** (after line 3606): Add `currentTemplateIndex === 68 && mode === 'youtube'` block with standard layout, title split: white "Create an Accountability" / gold "Group Chat", subtitle "Daily Wins Podcast 64"

4 locations across 2 files.

