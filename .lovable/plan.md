

# Fix carousel: add missing video, correct titles, pause on scroll, widen track

## Summary of all requested changes

1. **Add the 3rd video** — you gave 3 links but only 2 unique IDs were added (`zz2rVKKt1l0` appears twice in your list). I will add it as a duplicate entry so 3 new items appear (total 6 episodes).

2. **Fix all titles and views**:
   - `zz2rVKKt1l0` (1st instance) → "Go Exploring" / "9.9K views"
   - `-a4NbW5Y718` → "If You Know You're Capable of More, This is for You" / "4.4K views"
   - `zz2rVKKt1l0` (2nd instance) → "Connect with More Animals" / "6.7K views"

3. **Pause carousel on user scroll** — add a `window` scroll listener that clears autoplay on scroll, and only resumes 200ms after scrolling stops (debounced).

4. **Widen carousel by ~0.5 thumbnail widths** — currently the container is `overflow-hidden` at page width. I will add negative margins (`-mx-[18vw]`) and matching padding (`px-[18vw]`) to the carousel container so the visible track extends ~half a card past each screen edge, pushing the gradient masks further out.

## File changed
- `src/pages/LinkInBio.tsx`

## Technical details

### Episodes array (line 6-12)
```ts
const podcastEpisodes = [
  { videoId: "ERXXO8mG5IY", title: "Why 70% of People Are Dehydrated", views: "8.4K views" },
  { videoId: "OjwSKAXveN8", title: "The Dangers of Screen-time Before Bed", views: "12.8K views" },
  { videoId: "bv27Bn6qWIo", title: "Why Most People Invest Completely Wrong", views: "5.7K views" },
  { videoId: "zz2rVKKt1l0", title: "Go Exploring", views: "9.9K views" },
  { videoId: "-a4NbW5Y718", title: "If You Know You're Capable of More, This is for You", views: "4.4K views" },
  { videoId: "zz2rVKKt1l0", title: "Connect with More Animals", views: "6.7K views" },
];
```

### Scroll-pause logic
- Add `useEffect` with a `window` `scroll` listener
- On scroll: `clearAutoplay()` + clear any pending resume timer
- On scroll stop (200ms debounce): `scheduleAutoplay(4000)` to resume

### Wider carousel container (line ~425)
- Change the container div from `overflow-hidden` to `overflow-hidden -mx-[18vw] px-[18vw]`
- Move gradient masks inward to match the new padding so they sit at the actual screen edges, now further from the visible cards

