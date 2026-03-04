

## Admin Dashboard: Video Click Counters + Top 10 Downloaded Tips

### Overview
Add two new sections to the AdminList page:
1. **Video Click Counters** - 3 cards side by side showing real-time click counts for each YouTube video
2. **Top 10 Downloaded Tips** - ranked list of the most downloaded guides with live counts

### Database Changes

**New table: `video_clicks`**
```sql
CREATE TABLE public.video_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id text NOT NULL,
  clicked_at timestamptz DEFAULT now()
);
ALTER TABLE public.video_clicks ENABLE ROW LEVEL SECURITY;
-- Allow anyone to insert (track clicks)
CREATE POLICY "allow_public_insert" ON public.video_clicks FOR INSERT WITH CHECK (true);
-- Allow select via service role only (admin reads)
```

### Edge Function Changes

**Fix `get-download-counts`** - Currently crashing with `Cannot read properties of null (reading 'trim')` because some `guide_title` values are null. Add a null check: `const title = record.guide_title?.trim()`.

**New edge function: `track-video-click`** - Inserts a row into `video_clicks` with the `video_id`. Called from the frontend when a user clicks a video title or play button.

**New edge function: `get-video-clicks`** - Queries `video_clicks`, groups by `video_id`, returns counts. Called by the AdminList page.

### Frontend Changes

**`src/pages/Home.tsx` and `src/pages/Blueprint.tsx`** - When a video title link is clicked or play button is pressed, fire a `supabase.functions.invoke("track-video-click", { body: { videoId } })` call (fire-and-forget, no await needed).

**`src/pages/AdminList.tsx`** - Add two new sections above the subscriber table:
1. **Video Clicks** - 3 cards in a row, each showing video title + total click count. Data from `get-video-clicks`. Auto-refresh via Supabase realtime subscription on `video_clicks` table.
2. **Top 10 Tips** - Ordered list of guide titles with download counts. Data from `get-download-counts`. Auto-refresh every 30 seconds.

### Technical Details

- Video click tracking is lightweight (just an insert, no auth required)
- Real-time updates on AdminList use Supabase Realtime channel subscription on `video_clicks` to increment counts without polling
- Top 10 tips uses the existing `get-download-counts` function (after fixing the null bug), sorted descending and sliced to 10

