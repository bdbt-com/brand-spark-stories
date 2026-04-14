

## /bio Page: Replace Video Carousel and Redirect Sequence

### Summary

Replace 5 of the 6 videos in the /bio page carousel and update the idle auto-redirect sequence. Keep "Build a Life You Don't Need to Escape From" as #1 and bring back "The Dangers of Screen-time Before Bed" as #6.

### New video lineup (carousel order and redirect priority)

| # | Video ID | Title |
|---|----------|-------|
| 1 | `cfLHVIIp4o0` | Build a Life You Don't Need to Escape From (unchanged) |
| 2 | `-3_zj_Q_1kI` | Reduce Decision Fatigue Wherever Possible |
| 3 | `TJTe4wtW158` | Skip for 5 Minutes Daily |
| 4 | `WNf06ZLUIJw` | Expose Yourself to Sunlight Daily |
| 5 | `pRRSGS7eLJM` | Capitalise on Benefits Offered by Your Employer |
| 6 | `OjwSKAXveN8` | The Dangers of Screen-time Before Bed |

### Removed videos
- `vPd9pieng58` — Read For 20 Minutes Every Day
- `ERXXO8mG5IY` — Why 70% of People Are Dehydrated
- `bv27Bn6qWIo` — Why Most People Invest Completely Wrong
- `Irm5oIb5ySo` — Connect with More Animals

### File change: `src/pages/LinkInBio.tsx`

**1. Update `podcastEpisodes` array (lines 7-14):**
```ts
const podcastEpisodes = [
  { videoId: "cfLHVIIp4o0", title: "Build a Life You Don't Need to Escape From", views: "3.2K views" },
  { videoId: "-3_zj_Q_1kI", title: "Reduce Decision Fatigue Wherever Possible", views: "New" },
  { videoId: "TJTe4wtW158", title: "Skip for 5 Minutes Daily", views: "New" },
  { videoId: "WNf06ZLUIJw", title: "Expose Yourself to Sunlight Daily", views: "New" },
  { videoId: "pRRSGS7eLJM", title: "Capitalise on Benefits Offered by Your Employer", views: "New" },
  { videoId: "OjwSKAXveN8", title: "The Dangers of Screen-time Before Bed", views: "12.8K views" },
];
```

**2. Update `REDIRECT_SEQUENCE` array (lines 279-286):**
```ts
const REDIRECT_SEQUENCE = [
  'cfLHVIIp4o0',  // 1st: "Build a Life You Don't Need to Escape From"
  '-3_zj_Q_1kI',  // 2nd: "Reduce Decision Fatigue Wherever Possible"
  'TJTe4wtW158',  // 3rd+: cycle starts
  'WNf06ZLUIJw',
  'pRRSGS7eLJM',
  'OjwSKAXveN8',
];
```

**3. Update storage key** from `bdbt-auto-redirects-v7` to `bdbt-auto-redirects-v8` (line 277) so returning visitors get the new sequence fresh.

**4. Update comments** (lines 271-274) to reflect the new video names.

One file, three edits. No other pages affected.

