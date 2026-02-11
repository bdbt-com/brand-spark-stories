

## Fix Missing Tip Keyword Mappings

Two tip keywords are missing from `src/data/tipKeywords.ts`, causing broken links when users navigate to `/tips/osteoperosis` or search for these terms.

---

### Changes

#### `src/data/tipKeywords.ts`

Add the following entries before the closing `};` (around line 498):

1. **Osteoporosis keywords** (currently zero entries exist):
   - `"Osteoperosis"` -> `"Learn One Word - Osteoperosis"`
   - `"osteoperosis"` -> `"Learn One Word - Osteoperosis"`
   - `"Osteoporosis"` -> `"Learn One Word - Osteoperosis"`
   - `"osteoporosis"` -> `"Learn One Word - Osteoperosis"`

2. **Habit Progress additional variants** (Habit30/habit30 exist but these don't):
   - `"habitprogress"` -> `"30 Ways to track your habit progress"`
   - `"HabitProgress"` -> `"30 Ways to track your habit progress"`

No other file changes are needed -- the routing and matching logic in `AITipFinder.tsx` and `Tips.tsx` already handles keyword lookups correctly. Only the keyword map entries were missing.

