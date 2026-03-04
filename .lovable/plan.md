

## Fix: Center the Featured Podcast Video

The featured video is the **first item** in the `podcastEpisodes` array, so on desktop's 3-column grid it renders in the **left** column instead of the center.

### Fix

**`src/pages/Home.tsx`** -- Reorder the `podcastEpisodes` array so the featured video is the **second** (middle) item:

```ts
const podcastEpisodes = [
  { videoId: "ERXXO8mG5IY", title: "Why 70% of People Are Dehydrated & Don't Know It", views: "8.4K views" },
  { videoId: "OjwSKAXveN8", title: "The Dangers of Screen-time Before Bed", views: "12.8K views", featured: true },
  { videoId: "THIRD_ID", title: "...", views: "..." },
];
```

On **mobile** (single column) the featured video will appear second, which is fine -- or we can add an `order-first` class on mobile so it always appears at the top. On **tablet** at `md` breakpoint, the 3-column grid kicks in and the featured item sits in the center with `scale-110`.

### Recommendation for mobile ordering

Add `order-first md:order-none` to the featured video's wrapper so it appears first on mobile but stays in the natural (center) position on desktop/tablet.

### Files changed
- `src/pages/Home.tsx` -- reorder array + add mobile ordering class

