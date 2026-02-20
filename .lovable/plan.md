

## Podcast 47 - "Get Deliveroo+ for Free with Amazon Prime" Thumbnails

Adding YouTube thumbnail (ID 51) and TikTok thumbnail (ID 65).

Per the alternating background pattern, odd-numbered podcasts use `tikTokBg28` (`tiktok-bg-template-32.png`).

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

- Add `65` to the `templateIndex` union type
- Append `tikTokBg28` to the `backgrounds` array for index 65
- Add JSX title block for index 65:
  - "BDBT PODCAST 47" (white, smaller text)
  - "GET DELIVEROO+ FOR FREE" (white)
  - "WITH AMAZON PRIME" (gold accent `hsl(35, 45%, 75%)`)

#### 2. `src/pages/ThumbnailTemplate.tsx`

- Add YouTube metadata entry (ID 51): name "Get Deliveroo+ for Free with Amazon Prime", title "Get Deliveroo+ for Free with Amazon Prime", subtitle "Daily Wins Podcast 47", standard podcast image
- Add TikTok metadata entry (ID 65): name "Podcast 47 Get Deliveroo+ for Free with Amazon Prime"
- Add TikTok rendering block for `currentTemplateIndex === 65` (after the existing index 64 block)
- Add YouTube rendering block for `currentTemplateIndex === 51` (after the existing index 50 block), standard 16:9 gradient style with glassmorphism image box, title split as "Get Deliveroo+ for Free" (white) / "with Amazon Prime" (gold)

