

## Simplify Admin List to One Entry Per Email

### What changes

The admin page will show a **simple email list** -- one row per unique email, showing just their name, email, and the date they first signed up. No guide columns, no duplicates.

### Technical steps

#### 1. Update the edge function (`supabase/functions/admin-email-stats/index.ts`)
- After fetching all rows, deduplicate by email -- keep only the **earliest** entry per email (their first signup)
- Remove the guide_title from the returned data since it's not needed
- Return a clean list of unique subscribers sorted by signup date (newest first)

#### 2. Simplify the AdminList page (`src/pages/AdminList.tsx`)
- Remove the "Guide" column entirely
- Change the grid from 4 columns to 3: **Name | Email | Date**
- Update the header to just show total unique subscribers (no "total entries" vs "unique" distinction since they'll be the same)
- Cleaner, simpler layout

### Result
- One row per email address
- Shows: name, email, date of first signup
- No duplicates, no guide info cluttering it up
- New signups automatically appear (deduplicated on load)

