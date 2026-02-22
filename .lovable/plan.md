

## Podcast 50 - "Learn This Word: Sarcopenia" Thumbnails

Adding YouTube thumbnail (ID 54) and TikTok thumbnail (ID 68).

Podcast 50 is even-numbered, so the TikTok thumbnail uses `tikTokBg24` (`tiktok-bg-template-25.png`) per the alternating background pattern.

**Note:** Podcasts 49 does not yet exist. If you want Podcast 49 added first, let me know -- otherwise this will skip straight to 50.

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

- Add `68` to the `templateIndex` union type
- Append `tikTokBg24` to the `backgrounds` array for index 68
- Add JSX title block for index 68:
  - "BDBT PODCAST 50" (white, smaller text)
  - "LEARN THIS WORD:" (white)
  - "SARCOPENIA" (gold accent `hsl(35, 45%, 75%)`)

#### 2. `src/pages/ThumbnailTemplate.tsx`

- Add YouTube metadata entry (ID 54): name "Learn This Word: Sarcopenia", title "Learn This Word: Sarcopenia", subtitle "Daily Wins Podcast 50", standard podcast image
- Add TikTok metadata entry (ID 68): name "Podcast 50 Learn This Word Sarcopenia"
- Add TikTok rendering block for `currentTemplateIndex === 68` (after the existing index 66 block)
- Add YouTube rendering block for `currentTemplateIndex === 54` (after the existing index 52 block), standard 16:9 gradient style with glassmorphism image box, title split as "Learn This Word:" (white) / "Sarcopenia" (gold)

