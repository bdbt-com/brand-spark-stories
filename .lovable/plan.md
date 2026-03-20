

# Fix Auto-Redirects Graph + Add Missing TikTok Thumbnail

## Issue 1: Auto-Redirects graph shows no/wrong data

The `get_daily_stats()` SQL function filters with `WHERE video_id = 'auto-redirect'` (exact match), but auto-redirects are stored as `'auto-redirect:VIDEO_ID'` (e.g. `auto-redirect:capable-of-more`). No rows ever match, so the graph is always zero.

**Fix**: Update the SQL function to use `WHERE video_id LIKE 'auto-redirect:%'`.

| File | Change |
|------|--------|
| Migration SQL | `CREATE OR REPLACE FUNCTION get_daily_stats()` — change `= 'auto-redirect'` to `LIKE 'auto-redirect:%'` |

## Issue 2: Missing TikTok thumbnail for Podcast 75

Only the YouTube template (id 79) was created for "Do a Spending Freeze". The TikTok version was never added.

**Fix**: Add TikTok template entry and rendering block:
- Add `{ id: 93, name: "Podcast 75 Do a Spending Freeze", title: "DO A / SPENDING FREEZE", subtitle: "" }` to `tikTokTemplates` array
- Add `TikTokTemplate` background entry (Podcast 75 is odd → uses Bg 28 / `tiktok-bg-template-32.png`)
- Add conditional rendering block for `currentTemplateIndex === 93` in TikTok mode with the standard layout: white top line "DO A", gold bottom line "SPENDING FREEZE"

| File | Change |
|------|--------|
| `src/pages/ThumbnailTemplate.tsx` | Add tikTok template metadata (id 93), TikTokTemplate background, and rendering block |
| `src/components/TikTokTemplate.tsx` | Add title entry for index 93 |

