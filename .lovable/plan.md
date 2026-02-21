

## Podcast 48 - "Connect More with Animals" Thumbnails

Adding YouTube thumbnail (ID 52) and TikTok thumbnail (ID 66).

Per the alternating background pattern, even-numbered podcasts use `tikTokBg24` (`tiktok-bg-template-25.png`).

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

- Add `66` to the `templateIndex` union type
- Append `tikTokBg24` to the `backgrounds` array for index 66
- Add JSX title block for index 66:
  - "BDBT PODCAST 48" (white, smaller text)
  - "CONNECT MORE" (white)
  - "WITH ANIMALS" (gold accent `hsl(35, 45%, 75%)`)

#### 2. `src/pages/ThumbnailTemplate.tsx`

- Add YouTube metadata entry (ID 52): name "Connect More with Animals", title "Connect More with Animals", subtitle "Daily Wins Podcast 48", standard podcast image
- Add TikTok metadata entry (ID 66): name "Podcast 48 Connect More with Animals"
- Add TikTok rendering block for `currentTemplateIndex === 66` (after the existing index 65 block)
- Add YouTube rendering block for `currentTemplateIndex === 52` (after the existing index 51 block), standard 16:9 gradient style with glassmorphism image box, title split as "Connect More" (white) / "with Animals" (gold)

