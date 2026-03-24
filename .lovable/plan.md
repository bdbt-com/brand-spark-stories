

# Reorder Bio Carousel + Replace Dehydration Video on Home & Blueprint

## Changes

### 1. `src/pages/LinkInBio.tsx` — Reorder carousel
Move `cfLHVIIp4o0` ("Build a Life...") to position 1, `vPd9pieng58` ("Read For 20 Minutes...") to position 2, keep the remaining 4 in their current order after that.

Current order: Dehydrated, Screen-time, Invest, Read, Build a Life, Animals
New order: **Build a Life, Read, Dehydrated, Screen-time, Invest, Animals**

### 2. `src/pages/Home.tsx` — Replace Dehydrated with Build a Life
Swap `ERXXO8mG5IY` ("Why 70% of People Are Dehydrated") out of the 3-video array and replace with `cfLHVIIp4o0` ("Build a Life You Don't Need to Escape From").

New trio: Build a Life, Screen-time (featured), Invest

### 3. `src/pages/Blueprint.tsx` — Same swap
Replace `ERXXO8mG5IY` with `cfLHVIIp4o0` in the podcast episodes array.

New trio: Screen-time, Build a Life, Invest

### Files changed

| File | Change |
|------|--------|
| `src/pages/LinkInBio.tsx` | Reorder `podcastEpisodes` array: cfLHVIIp4o0 first, vPd9pieng58 second, then rest |
| `src/pages/Home.tsx` | Replace ERXXO8mG5IY entry with cfLHVIIp4o0 in `podcastEpisodes` |
| `src/pages/Blueprint.tsx` | Replace ERXXO8mG5IY entry with cfLHVIIp4o0 in `podcastEpisodes` |

