

## Replace TikTok Reels with YouTube Podcast Episodes

Yes — the plan is to **replace** the current TikTok reels section entirely with 3 YouTube podcast episodes.

### What changes

**File: `src/pages/Home.tsx`** (lines 200-240)

Replace the entire "Pinned Reels Section" with a new "Top Podcast Episodes" section:

- **Left card**: "Why 70% of People Are Dehydrated..." (`ERXXO8mG5IY`) — ~8.4K views
- **Middle card (10% bigger)**: "The Dangers of Screen-time Before Bed" (`OjwSKAXveN8`) — ~12.8K views, styled with `scale-110` and `z-10`
- **Right card**: "BDBT Explained" (`TY1nkJsQtyw`) — ~5.7K views

Each card shows:
- YouTube thumbnail (`img.youtube.com/vi/{id}/maxresdefault.jpg`)
- Play button overlay → clicks open inline YouTube iframe embed
- Video title below thumbnail
- Small grey view counter (e.g., "12.8K views") in `text-xs text-muted-foreground`

Layout: 3-column grid on desktop, stacked on mobile. Middle card uses `scale-110` for the 10% size bump. Cards use rounded corners + shadow styling consistent with existing design. Remove all TikTok-related code (`tiktokVideos` array, TikTok iframe embeds).

