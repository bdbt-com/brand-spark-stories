

## Fix: Admin List Analytics by Bypassing RLS with Edge Functions

### Problem
The `page_views` RLS INSERT policy is still **RESTRICTIVE** despite two migration attempts. This means the `PageViewTracker` component (which uses the anon key client-side) silently fails on every insert. Zero data ever reaches the table, so the admin dashboard always shows 0.

### Root Cause
The migrations to recreate the policies as permissive have not taken effect. The RLS info still shows `Permissive: No` on both INSERT and UPDATE policies.

### Solution: Bypass RLS entirely with edge functions

Instead of fighting the RLS policies, route all page view tracking through an edge function that uses the **service role key** (which bypasses RLS).

**1. Create `track-page-view` edge function**
- Accepts `{ page_path, session_id }` for inserts and `{ id, duration_seconds }` for updates
- Uses `SUPABASE_SERVICE_ROLE_KEY` to insert/update `page_views`, bypassing RLS completely
- Returns the inserted row ID

**2. Update `PageViewTracker.tsx`**
- Replace direct `supabase.from("page_views").insert(...)` with `supabase.functions.invoke("track-page-view", ...)`
- Replace the raw `fetch` PATCH call for duration updates with the same edge function (passing update mode)
- Keep the same session ID and duration tracking logic

**3. No changes needed to:**
- `get-page-analytics` edge function (already uses service role key for reads)
- `AdminList.tsx` (already displays the data correctly)
- Database schema or RLS policies

### Files changed
- `supabase/functions/track-page-view/index.ts` (new)
- `src/components/PageViewTracker.tsx` (modified)

