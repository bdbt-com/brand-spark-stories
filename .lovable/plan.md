

## Fix `/tips/review` Link for "30 Ways to track your habit progress"

### Problem

The URL `/tips/review` has no keyword mapping in `tipKeywords.ts`. The keyword `"review"` simply doesn't exist in the map, so navigating to that URL shows no tip match.

Additionally, there's a minor case inconsistency: the `Habit30` entries use `"30 ways to track..."` (lowercase w) while the actual tip title in Tips.tsx is `"30 Ways to track..."` (uppercase W). The `HabitProgress` entries already use the correct casing.

### Changes

#### `src/data/tipKeywords.ts`

1. **Add `review` / `Review` keyword mappings** pointing to `"30 Ways to track your habit progress"`
2. **Fix case on existing `Habit30` / `habit30` entries** from `"30 ways..."` to `"30 Ways..."` to match the actual tip title

| Keyword | Maps To |
|---------|---------|
| `"review"` (new) | `"30 Ways to track your habit progress"` |
| `"Review"` (new) | `"30 Ways to track your habit progress"` |
| `"Habit30"` (fix case) | `"30 Ways to track your habit progress"` |
| `"habit30"` (fix case) | `"30 Ways to track your habit progress"` |

No other files need changes.
