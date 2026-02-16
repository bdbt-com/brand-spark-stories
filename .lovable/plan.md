
## Podcast 43 - "Have More Baths" Thumbnails

Adding YouTube thumbnail (ID 47) and TikTok thumbnail (ID 61) for Podcast 43, using the same TikTok background as Podcast 25 (`tikTokBg28` / `tiktok-bg-template-32.png`).

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

- Add `61` to the `templateIndex` union type
- Append `tikTokBg28` to the `backgrounds` array (same background as Podcast 25)
- Add JSX title block for index 61:
  - "BDBT PODCAST 43" (white, smaller)
  - "HAVE MORE" (white)
  - "BATHS" (gold accent)

#### 2. `src/pages/ThumbnailTemplate.tsx`

- Add YouTube metadata entry (ID 47): name "Have More Baths", title "Have More Baths", subtitle "Daily Wins Podcast 43", standard podcast image
- Add TikTok metadata entry (ID 61): name "Podcast 43 Have More Baths"
- Add YouTube rendering block for `currentTemplateIndex === 47` (standard 16:9 gradient style with glassmorphism image box, white/gold title)
- Add TikTok rendering block for `currentTemplateIndex === 61`
