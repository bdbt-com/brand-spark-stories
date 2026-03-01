

## Add Podcast 56 Thumbnails -- "Limit Your Screentime Before Bed"

Both YouTube (16:9) and TikTok/Instagram (9:16) templates.

### 1. `src/pages/ThumbnailTemplate.tsx`

- **YouTube `templates` array**: Add after id 59:
  - `{ id: 60, name: "Limit Your Screentime Before Bed", title: "Limit Your Screentime Before Bed", subtitle: "Daily Wins Podcast 56", image: "..." }`

- **`tikTokTemplates` array**: Add after id 73:
  - `{ id: 74, name: "Podcast 56 Limit Your Screentime Before Bed", title: "Limit Your Screentime Before Bed", ... }`

- **YouTube rendering block** (after index 59 block):
  - Index 60, 1280x720 standard layout
  - White text: "Limit Your Screentime" / Gold text: "Before Bed"
  - Subtitle: "Daily Wins Podcast 56"

- **Instagram rendering block** (after index 73 block):
  - `currentTemplateIndex === 74 && mode === 'instagram'`
  - Renders `<TikTokTemplate templateIndex={74} />`

### 2. `src/components/TikTokTemplate.tsx`

- **Type union**: Add `| 74`
- **Backgrounds array**: Append `tikTokBg24` (even podcast = tikTokBg24 per alternating pattern)
- **Title block** (after index 73 block):
  - Header: `BDBT PODCAST 56`
  - White line: `LIMIT YOUR SCREENTIME`
  - Gold line: `BEFORE BED`

