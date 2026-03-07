

## Reorder Admin Dashboard Sections

Swap and rearrange three sections in `src/pages/AdminList.tsx`:

### Current order (lines 186-301):
1. Bio Link Clicks (lines 186-207)
2. Page Analytics (lines 209-241)
3. Video Clicks (lines 243-271)
4. Auto-Redirects (lines 273-301)

### New order:
1. **Page Analytics** (move up from position 2)
2. **Bio Link Clicks** (move down from position 1)
3. **Auto-Redirects** (move up from position 4, now above video clicks)
4. **Video Clicks** (move down from position 3)

### Change
Single file edit in `src/pages/AdminList.tsx` — cut and reorder the four `<section>` blocks (lines 186-301). No logic changes, purely reordering JSX sections.

