

## Adding Analytics to Admin Dashboard

### The Challenge

Lovable's built-in analytics are only available as an internal tool -- there is no public API endpoint that your admin page can call from the browser. This means we cannot poll Lovable analytics every 15 seconds from the client side.

### Options

**Option A: Build custom page-view tracking in Supabase (recommended)**
- Create a `page_views` table in Supabase to log every visit (page path, timestamp, session duration)
- Add a lightweight tracking snippet to your app that records each page load and time-on-page
- Create an edge function to aggregate stats (visitors, avg session) for given date ranges
- The admin dashboard polls this edge function every 15 seconds, just like the other sections
- You get full control over the data and it works on the published site

**Option B: Integrate a third-party analytics provider**
- Use something like Plausible, Umami, or Google Analytics
- Would require embedding their script and using their API to pull data into your admin page
- More complex setup, external dependency, and most free tiers don't offer a real-time API

### Recommended Plan (Option A)

**1. Create `page_views` table**
```sql
create table public.page_views (
  id uuid primary key default gen_random_uuid(),
  page_path text not null,
  session_id text not null,
  entered_at timestamptz default now(),
  duration_seconds integer default 0
);
alter table public.page_views enable row level security;
-- Allow anonymous inserts
create policy "allow_public_insert" on public.page_views for insert with check (true);
```

**2. Add a page-view tracker component**
- A small React component included in the app layout that:
  - On each route change, inserts a row into `page_views` with the current path and a random session ID
  - On page unload (or route change), updates the row with `duration_seconds`
  - Uses `navigator.sendBeacon` or a quick update call for reliability

**3. Create `get-page-analytics` edge function**
- Accepts no params, returns aggregated stats for 7d, 14d, 30d, and since launch (Dec 28)
- For each period: total unique sessions (visitors), average duration
- Uses the service role key to SELECT from `page_views`

**4. Add analytics card to AdminList.tsx**
- New section at the top showing 4 time-period cards (7d, 14d, 30d, since launch)
- Each card shows visitor count and average stay
- Polled every 15 seconds alongside the existing data

### Important Note
Since this is custom tracking, data collection starts from the moment we deploy this change. Historical data from before deployment won't be available. The "since launch" period will only show data from when tracking begins.

### Files Changed
- New migration: `page_views` table
- New file: `src/components/PageViewTracker.tsx`
- Edit: `src/App.tsx` -- include the tracker
- New edge function: `supabase/functions/get-page-analytics/index.ts`
- Edit: `supabase/config.toml` -- add function config
- Edit: `src/pages/AdminList.tsx` -- add analytics section + poll it

