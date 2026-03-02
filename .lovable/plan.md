

## Add Podcast 57 Thumbnails -- "Learn This Word: Osteoporosis"

Both YouTube (16:9) and TikTok/Instagram (9:16) templates.

### 1. `src/pages/ThumbnailTemplate.tsx`

- **YouTube `templates` array**: Add after id 60:
  - `{ id: 61, name: "Learn This Word: Osteoporosis", title: "Learn This Word: Osteoporosis", subtitle: "Daily Wins Podcast 57", image: "..." }`

- **`tikTokTemplates` array**: Add after id 74:
  - `{ id: 75, name: "Podcast 57 Learn This Word: Osteoporosis", title: "Learn This Word: Osteoporosis", ... }`

- **YouTube rendering block** (after index 60 block):
  - Index 61, 1280x720 standard layout
  - White text: "Learn This Word:" / Gold text: "Osteoporosis"
  - Subtitle: "Daily Wins Podcast 57"

- **Instagram rendering block** (after index 74 block):
  - `currentTemplateIndex === 75 && mode === 'instagram'`
  - Renders `<TikTokTemplate templateIndex={75} />`

### 2. `src/components/TikTokTemplate.tsx`

- **Type union**: Add `| 75`
- **Backgrounds array**: Append `tikTokBg28` (odd podcast = tikTokBg28 per alternating pattern)
- **Title block** (after index 74 block):
  - Header: `BDBT PODCAST 57`
  - White line: `LEARN THIS WORD:`
  - Gold line: `OSTEOPOROSIS`

