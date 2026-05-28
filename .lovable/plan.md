## Issue

I picked the wrong "most viewed" trio on `/bio`. The screenshot shows "Build a Life You Don't Need to Escape From" — that's from the old INITIAL_EPISODES list, not the trio you set on the Blueprint page.

## The correct pinned trio (from `src/pages/Blueprint.tsx` lines 13-15)

1. `SioUIPf4Sls` — "Which Comfort Are You Choosing? - Daily Wins Podcast 118" — 111K views
2. `L6cqky7TLpE` — "Do This And Turn £10 Into £100,000 - Daily Wins Podcast 115" — 108K views
3. `zUGM3gZbNY8` — "Most People Stop here. Are You Most People? Daily Wins Podcast 116" — 92K views

## Fix (single file: `src/pages/LinkInBio.tsx`)

Replace the `PINNED_TOP` constant with the Blueprint trio above (same shape: `{ videoId, title, views }`). The 3 most-recent slots (pulled live from `ytVideos`) and the `[new, top, new, top, new, top]` interleave stay exactly as they are.

To stay in sync going forward, I'll import the trio from Blueprint (or extract it to a shared module like `src/data/topVideos.ts`) so updating one updates both — let me know which you prefer; otherwise I'll just hardcode the same 3 in LinkInBio for now.
