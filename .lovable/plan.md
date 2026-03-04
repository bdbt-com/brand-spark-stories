

## Plan: Add time-period breakdown to Video Click cards

### Edge Function (`supabase/functions/get-video-clicks/index.ts`)

Update to return per-video counts broken down by time period. Instead of just `{ counts: { videoId: N } }`, return `{ counts: { videoId: { total: N, today: N, "7d": N, "14d": N, "30d": N } } }`.

- Calculate `today`, `7d`, `14d`, `30d` cutoff dates
- Select `video_id, clicked_at` from `video_clicks`
- Group by video_id, counting rows per time period

### Admin Dashboard (`src/pages/AdminList.tsx`)

- Update `videoCounts` state type from `Record<string, number>` to `Record<string, { total: number; today: number; "7d": number; "14d": number; "30d": number }>`
- In the Video Clicks cards (lines 211-226), replace the single big number + "clicks" with 4 smaller lines:
  ```
  Today: X
  7 Days: X
  14 Days: X
  30 Days: X
  ```
- Use smaller text (e.g. `text-sm font-semibold` for numbers) to fit under the title within the existing card space

### Files Changed
- `supabase/functions/get-video-clicks/index.ts`
- `src/pages/AdminList.tsx`

