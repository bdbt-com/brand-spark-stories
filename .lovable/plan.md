

## Add Podcast 55 Thumbnails -- "Set a Daily Water Intake Goal"

Both YouTube (16:9) and TikTok/Instagram (9:16) templates needed.

### 1. `src/pages/ThumbnailTemplate.tsx`

- **YouTube `templates` array**: Add entry after id 58:
  - `{ id: 59, name: "Set a Daily Water Intake Goal", title: "Set a Daily Water Intake Goal", subtitle: "Daily Wins Podcast 55", image: "..." }`

- **`tikTokTemplates` array**: Add entry after id 72:
  - `{ id: 73, name: "Podcast 55 Set a Daily Water Intake Goal", title: "Set a Daily Water Intake Goal", ... }`

- **YouTube rendering block** (after index 58 block, before closing `</div>`):
  - Index 59, 1280x720 layout matching P54 pattern
  - White text: "Set a Daily Water" / Gold text: "Intake Goal"
  - Subtitle: "Daily Wins Podcast 55"

- **Instagram rendering block** (after index 72 block):
  - `currentTemplateIndex === 73 && mode === 'instagram'`
  - Renders `<TikTokTemplate templateIndex={73} />`

### 2. `src/components/TikTokTemplate.tsx`

- **Type union**: Add `| 73`
- **Backgrounds array**: Append `tikTokBg28` (odd podcast = tikTokBg28 per alternating pattern)
- **Title block** (after index 72 block):
  - Header: `BDBT PODCAST 55`
  - White line: `SET A DAILY WATER`
  - Gold line: `INTAKE GOAL`

