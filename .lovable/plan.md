## Goal

On `/admin-list`, when the **Today** range is selected, overlay markers on the Page Visitors line graph at the hour each new email signup or course waitlist signup happened, so you can visually see when signups occurred relative to traffic.

## Behaviour

- Only active when `graphRange === 'today'` (no change to 7d/14d/30d/all).
- Each signup gets a coloured dot plotted at its hour bucket on the visitors line:
  - Email signup → gold dot (brand primary).
  - Course waitlist signup → a second distinct colour (e.g. cyan/blue) so the two can be told apart.
- Multiple signups in the same hour stack as a single dot whose size scales with count, with tooltip showing the count and type breakdown.
- Hovering a dot shows: hour, visitor count for that hour, email signup count, course waitlist count, and the email addresses (truncated, max ~5).
- Existing visitors line, axes, and "Today / 3,118 / 11s avg" summary remain unchanged.

## Data source

Add a new edge function `get-today-signups` (service role) that returns:
- `email_signups`: `[{ created_at, email, first_name }]` from `email_subscriptions` where `created_at >= today midnight UTC`.
- `course_signups`: `[{ created_at, email, course_title }]` from `course_waitlist` where `created_at >= today midnight UTC`.

Why an edge function: both tables deny public `SELECT`, so the browser cannot read them with the anon key. `service_role` is required.

Frontend (`AdminList.tsx`):
- Fetch `get-today-signups` alongside the existing `get-daily-stats` poll, and refetch on the same interval so new signups appear live.
- Bucket signups into the same hour keys used by `hourlyStats` (`hour` field).
- Pass the bucketed data into `InlineGraph` only for the visitors graph in Today mode.

## Chart changes

- Extend `InlineGraph` with optional `markers?: { hour: string; emailCount: number; courseCount: number; emails: string[]; courses: string[] }[]`.
- Render markers using a recharts `Scatter` inside a `ComposedChart` (swap `LineChart` → `ComposedChart` only when markers are present, to keep other usages identical), plotted on the same XAxis. Y value = visitor count at that hour, so dots sit on the line.
- Two `Scatter` series — one per signup type — with custom shape sized by count.
- Custom tooltip when hovering a marker shows the breakdown described above.

## Files touched

- `supabase/functions/get-today-signups/index.ts` (new).
- `src/pages/AdminList.tsx` — fetch + state + pass `markers` to the visitors `InlineGraph`; extend `InlineGraph` to render markers.

No DB migrations, no schema changes, no changes to other graphs or ranges.
