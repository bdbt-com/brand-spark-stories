

## Add 5 New Guides + Update 2 Existing Guides Across Website

Based on the updated spreadsheet, 5 new guides need to be added and 2 existing guide download links need updating.

---

### New Guides to Add

| # | Title | Keyword | Category |
|---|-------|---------|----------|
| 1 | Do a financial health check every 3 months | FinancialHealth | finance |
| 2 | Be more japanese, find your strong sense of life purpose | LifePurpose | mindfulness |
| 3 | Get your lunges in while vacuuming | Lunges | fitness |
| 4 | Take up meditation | Meditate | mindfulness |
| 5 | Say goodbye to netflix, prime & binge watching | Binge | wellness |

### Updated Guide Download Links

| Title | Old File ID | New File ID |
|-------|------------|-------------|
| Learn One Word - Osteoperosis | 1hmfCpKxkMg8JML4gcumoo21jajErY3rW | 1V5HzMaA3pZelMuKT9umoWFoadXEgdlU6 |
| 30 Ways to track your habit progress | 1Si2Nxbz154HPQg5y6szGqteHNMR6TSsp | 1fSaWrfn_HqXEEr03NfFWkrdmhDpCyfxP |

---

### Files to Modify

#### 1. `src/data/guideMapping.ts`
- Add 5 new guide title-to-URL entries
- Update 2 existing download URLs with new file IDs

#### 2. `src/pages/Tips.tsx`
- Add 5 new tip cards with icon, title, description, bullet points, level, category, and date

#### 3. `src/data/tipKeywords.ts`
- Add keyword routing entries for FinancialHealth (already partially exists, will verify)
- Entries for Binge, LifePurpose, Lunges, Meditate already exist in tipKeywords -- will verify they match the exact titles used in the new tip cards

---

### Technical Details

Each new tip card follows the existing pattern with:
- Lucide icon selection
- 3 bullet points (Health / Wealth / Happiness)
- Level, duration, category, popularity, views, dateAdded fields
- Title must exactly match the guideMapping.ts key for the Download Guide button to work

