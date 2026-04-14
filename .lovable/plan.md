

## Home Page Video Swap

### Current layout (left → center → right)
1. **Left:** "Build a Life You Don't Need to Escape From" (`cfLHVIIp4o0`)
2. **Center (featured):** "The Dangers of Screen-time Before Bed" (`OjwSKAXveN8`)
3. **Right:** "Why Most People Invest Completely Wrong" (`bv27Bn6qWIo`)

### New layout
1. **Left:** "Build a Life You Don't Need to Escape From" (`cfLHVIIp4o0`) — stays
2. **Center (featured):** "Reduce Decision Fatigue Wherever Possible" (`-3_zj_Q_1kI`) — NEW
3. **Right:** "The Dangers of Screen-time Before Bed" (`OjwSKAXveN8`) — moved from center

"Why Most People Invest Completely Wrong" is removed entirely from the home page.

### File change
**`src/pages/Home.tsx`** — Update the `podcastEpisodes` array (lines 15-19):
```ts
const podcastEpisodes = [
  { videoId: "cfLHVIIp4o0", title: "Build a Life You Don't Need to Escape From", views: "3.2K views" },
  { videoId: "-3_zj_Q_1kI", title: "Reduce Decision Fatigue Wherever Possible", views: "New", featured: true },
  { videoId: "OjwSKAXveN8", title: "The Dangers of Screen-time Before Bed", views: "12.8K views" },
];
```

One file, one array edit. No other pages affected (Blueprint page keeps its own trio).

