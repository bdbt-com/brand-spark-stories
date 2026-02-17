
## Podcast 44 - "Hang Tough for Grip Strength" Thumbnails

Adding YouTube thumbnail (ID 48) and TikTok thumbnail (ID 62).

Per the alternating background pattern, Podcast 44 uses `tikTokBg24` (`tiktok-bg-template-25.png`) -- the same background used by Podcasts 24, 26, 28, 30, 32, 34, 36, 38, 40, 42.

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

- Add `62` to the `templateIndex` union type (line 33)
- Append `tikTokBg24` to the `backgrounds` array (line 38)
- Add JSX title block for index 62:
  - "BDBT PODCAST 44" (white, smaller text)
  - "HANG TOUGH FOR" (white)
  - "GRIP STRENGTH" (gold accent `hsl(35, 45%, 75%)`)

#### 2. `src/pages/ThumbnailTemplate.tsx`

- Add YouTube metadata entry (ID 48): name "Hang Tough for Grip Strength", title "Hang Tough for Grip Strength", subtitle "Daily Wins Podcast 44", standard podcast image
- Add TikTok metadata entry (ID 62): name "Podcast 44 Hang Tough for Grip Strength"
- Add TikTok rendering block for `currentTemplateIndex === 62` (after the existing index 61 block)
- Add YouTube rendering block for `currentTemplateIndex === 48` (after the existing index 47 block), standard 16:9 gradient style with glassmorphism image box, title split as "Hang Tough for" (white) / "Grip Strength" (gold)
