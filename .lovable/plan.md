

## Podcasts 49 and 51 - YouTube and TikTok Thumbnails

Podcast 50 ("Learn This Word: Sarcopenia") is already implemented. Adding the other two from the screenshot.

- **Podcast 49** - "Appreciate the Things Around You" (odd, uses `tikTokBg28`)
  - TikTok index: 67, YouTube index: 53
- **Podcast 51** - "Start Your Day With Movement" (odd, uses `tikTokBg28`)
  - TikTok index: 69, YouTube index: 55

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

- Add `67` and `69` to the `templateIndex` union type
- Add `tikTokBg28` entries in the `backgrounds` array for indices 67 and 69 (filling in between existing 66 and 68)
- Add JSX title block for index 67:
  - "BDBT PODCAST 49" (white, smaller)
  - "APPRECIATE THE THINGS" (white)
  - "AROUND YOU" (gold `hsl(35, 45%, 75%)`)
- Add JSX title block for index 69:
  - "BDBT PODCAST 51" (white, smaller)
  - "START YOUR DAY" (white)
  - "WITH MOVEMENT" (gold `hsl(35, 45%, 75%)`)

#### 2. `src/pages/ThumbnailTemplate.tsx`

- Add YouTube metadata (ID 53): name "Appreciate the Things Around You", subtitle "Daily Wins Podcast 49"
- Add YouTube metadata (ID 55): name "Start Your Day With Movement", subtitle "Daily Wins Podcast 51"
- Add TikTok metadata (ID 67): name "Podcast 49 Appreciate the Things Around You"
- Add TikTok metadata (ID 69): name "Podcast 51 Start Your Day With Movement"
- Add YouTube rendering block for ID 53: title split "Appreciate the Things" (white) / "Around You" (gold)
- Add YouTube rendering block for ID 55: title split "Start Your Day" (white) / "With Movement" (gold)
- Add TikTok rendering blocks for indices 67 and 69

### Technical Notes

- The backgrounds array currently jumps from index 66 to 68. Index 67 needs to be inserted between them, and index 69 appended after 68.
- Both podcasts 49 and 51 are odd-numbered, so both use `tikTokBg28` (`tiktok-bg-template-32.png`).
