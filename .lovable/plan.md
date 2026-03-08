

## Add Podcast 63 Thumbnails — "Review Your Tip Progress"

### Changes

**1. `src/pages/ThumbnailTemplate.tsx`**
- Add YouTube template metadata: `{ id: 67, name: "Review your Tip Progress", title: "Review your Tip Progress", subtitle: "Daily Wins Podcast 63", image: "..." }`
- Add TikTok template metadata: `{ id: 81, name: "Podcast 63 Review your Tip Progress", title: "Review your Tip Progress", subtitle: "", image: "" }`
- Add YouTube rendering block for `currentTemplateIndex === 67`: standard layout — "Review Your Tip" (white) / "Progress" (gold), subtitle "Daily Wins Podcast 63"
- Add TikTok rendering block for `currentTemplateIndex === 81 && mode === 'instagram'`: `<TikTokTemplate templateIndex={81} />`

**2. `src/components/TikTokTemplate.tsx`**
- Add `81` to the `templateIndex` type union
- Add entry at index 81 in `backgrounds` array using `tikTokBg28` (odd podcast = bg 28)
- Add JSX title block for `templateIndex === 81`: "BDBT PODCAST 63" header, "REVIEW YOUR TIP" (white), "PROGRESS" (gold)

