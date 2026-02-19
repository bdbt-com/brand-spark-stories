

## Podcast 46 - "Drink More Green Tea" Thumbnails

Adding YouTube thumbnail (ID 50) and TikTok thumbnail (ID 64).

Per the alternating background pattern, even-numbered podcasts use `tikTokBg24` (`tiktok-bg-template-25.png`).

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

- Add `64` to the `templateIndex` union type
- Append `tikTokBg24` to the `backgrounds` array for index 64
- Add JSX title block for index 64:
  - "BDBT PODCAST 46" (white, smaller text)
  - "DRINK MORE" (white)
  - "GREEN TEA" (gold accent `hsl(35, 45%, 75%)`)

#### 2. `src/pages/ThumbnailTemplate.tsx`

- Add YouTube metadata entry (ID 50): name "Drink More Green Tea", title "Drink More Green Tea", subtitle "Daily Wins Podcast 46", standard podcast image
- Add TikTok metadata entry (ID 64): name "Podcast 46 Drink More Green Tea"
- Add TikTok rendering block for `currentTemplateIndex === 64` (after the existing index 63 block)
- Add YouTube rendering block for `currentTemplateIndex === 50` (after the existing index 49 block), standard 16:9 gradient style with glassmorphism image box, title split as "Drink More" (white) / "Green Tea" (gold)

