

## Plan: Bio Referrer Cards + Match Home Page Video Style on /bio

### 1. Admin Dashboard — Bio Referrer Section (AdminList.tsx)

Add a new section **underneath Page Analytics** called "Bio Link Clicks" with 3 cards in a row (same style as the Page Analytics cards):
- **Instagram** — shows `bioReferrers.instagram || 0`
- **TikTok** — shows `bioReferrers.tiktok || 0`  
- **YouTube** — shows `bioReferrers.youtube || 0`

Each card uses the same `<Card>` + `<CardContent>` layout as the Page Analytics cards (label on top, big number, "clicks" underneath). Remove the referrer breakdown text from the Visitors card since it now has its own section.

### 2. LinkInBio Videos — Exact Copy of Home Page Style (LinkInBio.tsx)

Replace the current video card styling with an exact copy of the Home page code:
- Card wrapper: `rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-card` (not `bg-black/40`)
- Play button color: `text-primary` (not `text-red-600`)
- Title: `text-foreground` (not `text-white`)
- Views: `text-muted-foreground` (not `text-white/40`)
- Title link area: `hover:bg-muted/50` (not `hover:bg-white/5`)
- Featured episode (Screen-time) gets `order-first md:order-none md:scale-110 md:z-10`
- Grid uses `gap-8 items-center` like Home

### Files Changed
- `src/pages/AdminList.tsx` — new Bio Link Clicks section after Page Analytics; remove inline referrer text from Visitors card
- `src/pages/LinkInBio.tsx` — replace video card classes with exact Home page styles

