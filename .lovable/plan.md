

## Fix: Video Order on Mobile (Most Viewed First)

### Current state
- Desktop: middle card is scaled up — already shows the most viewed (12.8K) in the center. Correct.
- Mobile: videos stack top-to-bottom in array order: 8.4K → 12.8K → 5.7K. Wrong.

### Fix
Simply reorder the `podcastEpisodes` array so most viewed comes first (12.8K → 8.4K → 5.7K), then use CSS `order` to put the most viewed back in the middle on desktop.

In `src/pages/Blueprint.tsx`:

1. **Reorder the array** — most viewed first:
   - "The Dangers of Screen-time Before Bed" (12.8K)
   - "Why 70% of People Are Dehydrated..." (8.4K)  
   - "BDBT Explained" (5.7K)

2. **Add CSS order classes** — on `md:` screens, reorder so index 0 goes to the middle:
   - Index 0 (12.8K): `md:order-2` + scale effect
   - Index 1 (8.4K): `md:order-1`
   - Index 2 (5.7K): `md:order-3`

### Files changed
- `src/pages/Blueprint.tsx` — reorder array + add responsive CSS order

