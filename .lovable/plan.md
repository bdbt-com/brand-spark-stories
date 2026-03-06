

# Podcast 61 Thumbnails: "Hide Your Savings From Yourself"

YouTube template ID **65**, TikTok template ID **79**.

## Changes

### 1. `src/pages/ThumbnailTemplate.tsx`

- **YouTube templates array**: Add `{ id: 65, name: "Hide Your Savings From Yourself", ... subtitle: "Daily Wins Podcast 61" }`
- **TikTok templates array**: Add `{ id: 79, name: "Podcast 61 Hide Your Savings From Yourself" }`
- **YouTube rendering block** (after template 64): Standard podcast layout with title split — "Hide Your Savings" (white) / "From Yourself" (gold), subtitle "Daily Wins Podcast 61"
- **TikTok rendering block** (after template 78): Renders `<TikTokTemplate templateIndex={79} />`

### 2. `src/components/TikTokTemplate.tsx`

- **Type**: Extend union to include `79`
- **Backgrounds array**: Append `tikTokBg28` (odd podcast)
- **Title rendering**: Add case for `templateIndex === 79` — "BDBT PODCAST 61", "HIDE YOUR SAVINGS" (white), "FROM YOURSELF" (gold)

Same pattern as Podcast 60. Two files, ~4 insertion points each.

