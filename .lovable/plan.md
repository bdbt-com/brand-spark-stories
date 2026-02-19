

## Podcast 45 - "Use Bike or Feet Wherever Possible" Thumbnails

Adding YouTube thumbnail (ID 49) and TikTok thumbnail (ID 63).

Per the alternating background pattern, odd-numbered podcasts use `tikTokBg28` (`tiktok-bg-template-32.png`).

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

- Add `63` to the `templateIndex` union type
- Append `tikTokBg28` to the `backgrounds` array
- Add JSX title block for index 63:
  - "BDBT PODCAST 45" (white, smaller text)
  - "USE BIKE OR FEET" (white)
  - "WHEREVER POSSIBLE" (gold accent `hsl(35, 45%, 75%)`)

#### 2. `src/pages/ThumbnailTemplate.tsx`

- Add YouTube metadata entry (ID 49): name "Use Bike or Feet Wherever Possible", title "Use Bike or Feet Wherever Possible", subtitle "Daily Wins Podcast 45", standard podcast image
- Add TikTok metadata entry (ID 63): name "Podcast 45 Use Bike or Feet Wherever Possible"
- Add TikTok rendering block for `currentTemplateIndex === 63` (after the existing index 62 block)
- Add YouTube rendering block for `currentTemplateIndex === 49` (after the existing index 48 block), standard 16:9 gradient style with glassmorphism image box, title split as "Use Bike or Feet" (white) / "Wherever Possible" (gold)

