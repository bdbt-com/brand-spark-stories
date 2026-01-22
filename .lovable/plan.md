

## Add "Have a weekly no spend day" Tip

This plan adds a new tip and fixes the keyword routing for `nospend`.

---

### Changes Required

**1. Add Guide Mapping** - `src/data/guideMapping.ts`

Add the new guide URL:
```typescript
"Have a weekly no spend day": "https://drive.google.com/uc?export=download&id=1C_Lht6zRd9-iMpdLD-A5DJSjw6RnNpke",
```

---

**2. Add New Tip** - `src/pages/Tips.tsx`

Add to the `tipCategories` array (finance category):
```typescript
{
  icon: Wallet, // or PiggyBank
  title: "Have a weekly no spend day",
  description: "Designate one day per week with zero spending.",
  items: [
    "Health: Reduces stress from constant purchasing decisions",
    "Wealth: Guaranteed savings one day per week",
    "Happiness: Builds mindful spending habits"
  ],
  level: "Easy",
  duration: "2 min read",
  category: "finance",
  popularity: 40,
  views: 0,
  dateAdded: "2025-01-22"
},
```

---

**3. Revert Keyword Mapping** - `src/data/tipKeywords.ts`

Change the `nospend` mapping back to the correct tip:
```typescript
// NoSpend -> Have a weekly no spend day
"NoSpend": "Have a weekly no spend day",
"nospend": "Have a weekly no spend day",
```

---

### Result

| URL | Goes To |
|-----|---------|
| `/tips/nospend` | "Have a weekly no spend day" (with scroll + highlight animation) |
| Download button on that tip | Downloads guide ID `1C_Lht6zRd9-iMpdLD-A5DJSjw6RnNpke` |

The "Do a spending freeze challenge for a week" tip remains unchanged as a separate tip.

