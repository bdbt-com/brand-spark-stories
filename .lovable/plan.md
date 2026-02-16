

## Sync Tips with Updated Spreadsheet + Fix Broken Keyword Routes

---

### NEW TIP being added

| Tip Title | Keyword | Guide File ID |
|-----------|---------|---------------|
| "Wait 30 days before any status spend" | wait30 / Wait30 | 16wQerj9mRBpOIloTQ3mnMq1uj_JzkvPl |

This is the only tip in the spreadsheet that doesn't already exist on the website.

---

### NEW KEYWORDS being added (for existing tips)

| Keyword | Maps to existing tip |
|---------|---------------------|
| Complete / complete | "30 Ways to track your habit progress" |
| Noarms / noarms | "30 benefits of getting up and down from the floor without using your arms" |
| wait30 / Wait30 | "Wait 30 days before any status spend" (new tip above) |

---

### TYPO FIX

| File | Current | Fixed |
|------|---------|-------|
| Tips.tsx (line 1152) | "body compositions" | "body composition" |
| guideMapping.ts (line 94) | "body compositions" | "body composition" |
| tipKeywords.ts (lines 49-50) | "body compositions" | "body composition" |

Note: The spreadsheet actually says "body compositions" too, but your screenshot flagged it as a typo, so I'm fixing it to singular "body composition" across all 3 files.

---

### FILE ID UPDATE

| Tip | File | Current ID | New ID (from spreadsheet) |
|-----|------|-----------|--------------------------|
| "30 Ways to track your habit progress" | guideMapping.ts (line 81) | 1fSaWrfn_HqXEEr03NfFWkrdmhDpCyfxP | 1Si2Nxbz154HPQg5y6szGqteHNMR6TSsp |

---

### BROKEN KEYWORD ROUTES being fixed (title in tipKeywords.ts doesn't match Tips.tsx, so scroll-to-tip fails)

| Keyword | Current in tipKeywords.ts | Correct (matches Tips.tsx) | Issue |
|---------|--------------------------|---------------------------|-------|
| ChewSlow | "Chew food more slowly" | "Chew Food More slowly" | Casing: "food" should be "Food" |
| Borrow | "Borrow or Rent Items" | "Borrow Or Rent Items" | Casing: "or" should be "Or" |
| FarmersMarket | "Buy from farmers' markets" | "Buy from farmers markets" | Apostrophe: remove ' |
| Salternative | "Use spices instead of salt" | "Use Spices Instead Of Salt" | Casing: all lowercase should be title case |
| Saffron | "Use Saffron as an anti-depressant" | "Use Saffron as an AntiDeppresant" | Different word form |
| DayReview | "Review your day" | "Review Your day" | Casing: "your" should be "Your" |
| 5minmobility | "Add a 5-minute mobility routine to your day" | "Add a 5 - minute mobility routine to your day" | Spacing: "5-minute" should be "5 - minute" |
| Fatigue30 | "30 ways to reduce decision fatigue in everyday life" | "30 ways to reduce descision fatigue in everyday life" | Spelling: "decision" should match Tips.tsx "descision" |

---

### Detailed Changes by File

#### 1. `src/pages/Tips.tsx`
- Fix typo line 1152: "body compositions" to "body composition"
- Add new tip card "Wait 30 days before any status spend" (Finance category, with icon, description, and bullet items)

#### 2. `src/data/guideMapping.ts`
- Fix typo line 94: key "body compositions" to "body composition"
- Update Habit30 file ID on line 81: change to `1Si2Nxbz154HPQg5y6szGqteHNMR6TSsp`
- Add new entry: `"Wait 30 days before any status spend": "https://drive.google.com/uc?export=download&id=16wQerj9mRBpOIloTQ3mnMq1uj_JzkvPl"`

#### 3. `src/data/tipKeywords.ts`
- Fix typo lines 49-50: "body compositions" to "body composition"
- Fix 8 broken keyword routes listed above (match exact casing/spelling from Tips.tsx)
- Add 3 new keyword pairs: Complete, Noarms, wait30

