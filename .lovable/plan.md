

# Add YT & TT Thumbnails — Podcast 77: "Read for 20 Minutes Every Day"

## YouTube Template (ID 81)
- Add metadata: `{ id: 81, name: "Read for 20 Minutes Every Day", title: "Read for 20 Minutes Every Day", subtitle: "Daily Wins Podcast 77", image: standard podcast image }`
- Add rendering block for `currentTemplateIndex === 81`: "Read for 20 Minutes" (white) + "Every Day" (gold), standard layout

## TikTok Template (ID 95)
- Add metadata: `{ id: 95, name: "Podcast 77 Read for 20 Minutes Every Day", title: "Read for 20 Minutes Every Day" }`
- Add to `templateIndex` type (95)
- Map ID 95 → `tikTokBg28` (odd podcast)
- Add title rendering: "BDBT PODCAST 77", "READ FOR 20 MINUTES" (white), "EVERY DAY" (gold)

## Files changed

| File | Change |
|------|--------|
| `src/pages/ThumbnailTemplate.tsx` | Add YT template 81 metadata + rendering block; add TT template 95 metadata + rendering block |
| `src/components/TikTokTemplate.tsx` | Add type 95, background mapping, title JSX |

