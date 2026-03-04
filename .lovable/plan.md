

## Plan: Add Podcast 59 thumbnails — "Time in the Market Beats Timing the Market"

Podcast 59 = odd-numbered, so the TikTok/IG background uses **tikTokBg28** (tiktok-bg-template-32.png) per the alternating pattern.

### Files Changed

**1. `src/components/TikTokTemplate.tsx`**
- Update `templateIndex` type union to include `77`
- Add index 77 to `backgrounds` array with `tikTokBg28`
- Add title rendering block for `templateIndex === 77`:
  - "BDBT PODCAST 59"
  - "TIME IN THE MARKET BEATS"
  - "TIMING THE MARKET" (gold accent)

**2. `src/pages/ThumbnailTemplate.tsx`**
- Add YouTube `templates` entry: `{ id: 63, name: "Time in the Market Beats Timing the Market", title: "Time in the Market Beats Timing the Market", subtitle: "Daily Wins Podcast 59", image: "..." }`
- Add `tikTokTemplates` entry: `{ id: 77, name: "Podcast 59 Time in the Market Beats Timing the Market", title: "Time in the Market Beats Timing the Market", ... }`
- Add Instagram rendering block: `currentTemplateIndex === 77 && mode === 'instagram'` → `<TikTokTemplate templateIndex={77} />`
- Add YouTube rendering block: `currentTemplateIndex === 63 && mode === 'youtube'` with title split:
  - White: "Time in the Market Beats"
  - Gold: "Timing the Market"
  - Subtitle: "Daily Wins Podcast 59"

