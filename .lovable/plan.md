

## Fix: page_views RLS Policies Are Blocking All Inserts

### Root cause
The `page_views` table is completely empty (0 rows). The `PageViewTracker` component inserts data using the anon key, but the RLS policies `allow_public_insert` and `allow_public_update_own_session` were created as **RESTRICTIVE** (not PERMISSIVE). In Postgres, restrictive policies act as additional filters on top of permissive policies — but if there are **no permissive policies**, all access is denied. So every insert and update has been silently rejected.

### Fix
Drop the two restrictive policies and recreate them as **PERMISSIVE** policies:

```sql
-- Drop the broken restrictive policies
DROP POLICY IF EXISTS "allow_public_insert" ON public.page_views;
DROP POLICY IF EXISTS "allow_public_update_own_session" ON public.page_views;

-- Recreate as PERMISSIVE
CREATE POLICY "allow_public_insert"
  ON public.page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "allow_public_update_own_session"
  ON public.page_views
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
```

### No code changes needed
The edge function and AdminList UI are correct. Once the policies are fixed, data will start flowing in and the "Today — Live" stats will show real numbers.

### Files changed
- Database migration only (RLS policy fix)

