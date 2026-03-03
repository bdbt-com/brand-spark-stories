

## Add Podcast 58 Thumbnails -- "Do One Extra Flight of Stairs Per Day"

YouTube (16:9) and TikTok/Instagram (9:16).

### 1. `src/pages/ThumbnailTemplate.tsx`

- **YouTube `templates` array**: Add `{ id: 62, name: "Do One Extra Flight of Stairs Per Day", title: "Do One Extra Flight of Stairs Per Day", subtitle: "Daily Wins Podcast 58", image: "..." }` after id 61.

- **`tikTokTemplates` array**: Add `{ id: 76, name: "Podcast 58 Do One Extra Flight of Stairs Per Day", title: "Do One Extra Flight of Stairs Per Day", ... }` after id 75.

- **YouTube rendering block** (after index 61 block): Index 62, 1280x720, White: "Do One Extra Flight of" / Gold: "Stairs Per Day", Subtitle: "Daily Wins Podcast 58".

- **Instagram rendering block** (after index 75 block): `currentTemplateIndex === 76 && mode === 'instagram'` renders `<TikTokTemplate templateIndex={76} />`.

### 2. `src/components/TikTokTemplate.tsx`

- **Type union**: Add `| 76`
- **Backgrounds array**: Append `tikTokBg24` (even podcast = tikTokBg24)
- **Title block** (after index 75 block): Header: `BDBT PODCAST 58`, White: `DO ONE EXTRA FLIGHT OF`, Gold: `STAIRS PER DAY`

