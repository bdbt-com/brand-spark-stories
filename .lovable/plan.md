

## Add 14 New Tips from Updated Master Spreadsheet

After comparing the spreadsheet against existing tips, I identified **14 new guides** not yet on the Tips page. All others are already present or are keyword variants of existing tips.

### New Tips to Add

| # | Title | Category | Icon | Keyword |
|---|-------|----------|------|---------|
| 1 | Appreciate the things around you | mindfulness | Heart | appreciate |
| 2 | Walk Backwards | fitness | Footprints | BACKWARDS |
| 3 | Why Implement a 30-Day Rule for Big Purchases? | finance | Clock | THIRTY |
| 4 | Write Down 3 Things You Accomplished at the End of Each Day | productivity | CheckCircle | ACCOMPLISH |
| 5 | 25 Ways to Introduce More Gardening | wellness | Trees | GARDEN |
| 6 | 30 Benefits of Blending Connection | social | Users | (none in sheet) |
| 7 | 30 Foods to Fight Inflammation & Bloating | health | Apple | inflame |
| 8 | 30 Reasons to Eat Natto Beans | health | Utensils | natto |
| 9 | 30 Reasons to Sprinkle Seeds onto Your Meals | health | Leaf | seeds |
| 10 | 30 Reasons to Swap Your Existing Bread | health | Utensils | SOURDOUGH |
| 11 | Learn to Do the Splits | fitness | Activity | splits |
| 12 | Your Daily Greens | health | Leaf | greens |
| 13 | Add Legumes to a Meal Once a Week | health | Utensils | Legumes |
| 14 | Audit Your Insurance Policies Annually | finance | Shield | INSURANCE |

### Files to Change

**1. `src/pages/Tips.tsx`** -- Add 14 new tip objects to the `tipCategories` array, each with icon, title, description, 3 Health/Wealth/Happiness items, level, duration, category, popularity, views, and dateAdded. Placed at the end of the array with March 2026 dates.

**2. `src/data/guideMapping.ts`** -- Add 14 new entries mapping exact tip titles to their Google Drive `export=download` URLs extracted from the spreadsheet's File_ID column.

**3. `src/data/tipKeywords.ts`** -- Add keyword mappings for the 14 new tips so URL-based routing (e.g., `/tips/appreciate`, `/tips/natto`) works correctly. Also add the alternate keyword routes from the spreadsheet for existing tips that have new aliases (e.g., `Noarms` -> existing floor tip, `updown` -> existing stair tip, `bikefeet` -> existing bike tip, `buffer` -> existing buffer fund tip, `hide` -> existing savings tip, `BACKWARDS`, etc.).

### Notes
- All icons referenced already exist in the lucide-react imports at the top of Tips.tsx
- The spreadsheet also contains alternate keyword aliases for existing tips (lines 125-135) which will be added to tipKeywords.ts only
- Line 140 ("30 Benefits of Blending Connection") has no keyword code in the sheet but will still get a tip entry and guideMapping entry

