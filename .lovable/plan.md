# Add "Latest Video Redirects" stat box to /admin-list

## Goal
Show a stat box on `/admin-list` that tracks how many auto-redirects have gone to the **most recent YouTube upload** (i.e. the dynamic newest video that the `/bio` auto-redirect now sends visitors to). Keep the existing 6 video cards in the "Video Clicks" section exactly as they are. Mobile-friendly.

## Why this works with no extra plumbing
The `/bio` auto-redirect already tracks each redirect under the composite ID `auto-redirect:<videoId>`. The `get-video-clicks` edge function already aggregates that into both:
- the overall `auto-redirect` bucket (already shown), and
- the per-video bucket under `<videoId>` (already shown for the 6 featured videos).

So redirects to "the latest video" are already in `videoCounts[latestVideoId]` — we just need to know which `videoId` is currently latest. We get that from `useYouTubeVideos()` (same hook `/bio` uses) and read `videos[0]`.

## Changes

**`src/pages/AdminList.tsx`**

1. Import `useYouTubeVideos` and call it inside `AdminList`. Derive `latestVideo = ytVideos[0]` and `latestVideoId = latestVideo?.videoId`.
2. In the **Auto-Redirects** section (around lines 458–520), add a new highlighted stat card placed alongside the existing 5 cards (Today / 7d / 14d / 30d / Total):
   - Heading: "Latest Video"
   - Sub-line: the latest video title (truncated, 1–2 lines) so it's clear which video this is counting.
   - Optional small thumbnail (`https://img.youtube.com/vi/<id>/mqdefault.jpg`) above or beside the numbers.
   - Numbers: today + 7d + 14d + 30d + total redirects to that specific video, pulled from `videoCounts[latestVideoId]`. Use the same `TodayTrendBadge` / `TrendBadge` pattern the other cards use.
3. Layout: change the Auto-Redirects grid so the 5 existing stat cards stay in a row and the new "Latest Video" card sits to the **right** of them on desktop, and **stacks above** them on mobile.
   - Desktop (xl): wrap the right-side stat cards in a flex row — `[Latest Video card | 5-card grid]` — Latest Video card fixed width (~`xl:w-72`), 5-card grid `flex-1`.
   - Mobile / tablet: stack vertically — Latest Video card on top (full width), then the existing 5-card grid below in its current 2-col / md:5-col layout.
   - Inline graph behaviour stays as-is on the far left (xl) / top (mobile).
4. Styling: match existing cards (same `Card` / `CardContent` paddings, same primary-coloured numbers, same uppercase label). Highlight slightly with `border-primary/30 bg-primary/5` like the "Today — Live" cards so it stands out as the headline number.
5. If `useYouTubeVideos` is still loading or fails, render the card with a "Loading latest video…" placeholder instead of numbers — no crash, no layout shift on desktop because the card has a fixed width.

## What stays unchanged
- The existing 5 Auto-Redirect stat cards (Today / 7d / 14d / 30d / Total) — same numbers, same trends.
- The 6 video cards in the "Video Clicks" section — same layout, same data.
- `/bio` auto-redirect logic, tracking IDs, edge functions, and DB — no changes.

## Outcome
A single new stat tile on `/admin-list` shows redirects to whatever the channel's newest upload currently is, auto-updating each day after the 8pm UK upload — no schema, edge-function, or tracking changes required.
