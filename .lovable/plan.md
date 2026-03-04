

## Blueprint Page Layout Restructure + YouTube Podcast Section

### Changes to `src/pages/Blueprint.tsx`

**1. Side-by-side layout for email form + blueprint info card**
- Change the container from `max-w-2xl` to `max-w-5xl`
- Place the email capture card (left) and the blueprint info card (right) in a 2-column grid (`grid md:grid-cols-2 gap-8`)
- Remove the `mb-16` spacing between them since they'll be side-by-side
- On mobile, they stack vertically

**2. Add YouTube podcast episodes section below the two cards**
- Copy the exact podcast episodes section from `Home.tsx` (the 3-video grid with play button overlays, titles, view counts, and the middle card at `scale-110`)
- Add `useState` for `playingVideo` state
- Import `Play` from lucide-react
- Place it between the two-card row and the CTA section
- Include the same `podcastEpisodes` array data

### File: `src/pages/Blueprint.tsx`
- Add imports: `Play` from lucide-react, `useState` already exists
- Add `podcastEpisodes` array (same 3 videos)
- Add `playingVideo` state
- Restructure layout: widen container, put email card + info card in 2-col grid
- Insert YouTube section below the grid, above CTA

