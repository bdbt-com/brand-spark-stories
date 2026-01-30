

## Update Link In Bio Spotify Link and Add New Tips/Keywords

This plan addresses two requests:
1. Fix the Spotify link on the Link In Bio page
2. Add new tips and keywords from the updated spreadsheet

---

### Part 1: Fix Spotify Link in LinkInBio.tsx

**Current Spotify link (incorrect):**
```
https://open.spotify.com/show/4PO4P4X6dF3FJasqf3dR5L
```

**New Spotify link (correct):**
```
https://open.spotify.com/show/7AryqWOzeVCOC7WQ9wcBlk?si=2ede4b3121ea46c1&nd=1&dlsi=f03fd58680794b34
```

**Files to modify:**
- `src/pages/LinkInBio.tsx` - Update both occurrences (social icon and podcast link)

---

### Part 2: Add New Tips from Spreadsheet

Based on analysis of the spreadsheet, I identified the following changes needed:

#### A. New Tip to Add (Does Not Exist Yet)

| Keyword | Title | Description |
|---------|-------|-------------|
| `Efficient` | Use energy efficient devices at home | Save money and reduce environmental impact with efficient appliances |

This tip needs to be added to:
- `src/pages/Tips.tsx` - Add to tipCategories array
- `src/data/tipKeywords.ts` - Add keyword mapping
- `src/data/guideMapping.ts` - Add guide download link

**Guide link from spreadsheet:**
`https://drive.google.com/file/d/1tfeMQSIfrkkjwJudA6UAP4AWFQRCCyoj/view?usp=sharing`
→ Convert to direct download: `https://drive.google.com/uc?export=download&id=1tfeMQSIfrkkjwJudA6UAP4AWFQRCCyoj`

---

#### B. New Keywords for Existing Tips

These tips already exist but need new keyword mappings added to `src/data/tipKeywords.ts`:

| Keyword | Maps To (Existing Tip) |
|---------|------------------------|
| `NEWFOOD`, `newfood`, `newfoods` | "Expand your diet & improve your health" |
| `Library`, `library` | "Stop Buying Books and go to the Library" |
| `Sales`, `sales` | "Wait for the Next Sale/Promo" |
| `Sitstand`, `sitstand` | "30 benefits of getting up and down from the floor without using your arms" |
| `Local`, `local` | "Free Local Events for Entertainment" |

---

### Summary of File Changes

| File | Changes |
|------|---------|
| `src/pages/LinkInBio.tsx` | Update Spotify links (2 locations) |
| `src/pages/Tips.tsx` | Add 1 new tip: "Use energy efficient devices at home" |
| `src/data/tipKeywords.ts` | Add 10+ new keyword mappings |
| `src/data/guideMapping.ts` | Add 1 new guide URL |

---

### Technical Details

#### New Tip Entry for Tips.tsx

```tsx
{
  icon: Zap,
  title: "Use energy efficient devices at home",
  description: "Save money and reduce environmental impact with efficient appliances.",
  items: [
    "Health: Better air quality and reduced noise from efficient appliances",
    "Wealth: Lower electricity bills and longer-lasting devices",
    "Happiness: Eco-friendly choices create peace of mind"
  ],
  level: "Easy",
  duration: "3 min read",
  category: "finance",
  popularity: 40,
  views: 0,
  dateAdded: "2026-01-30"
}
```

#### New Keyword Entries for tipKeywords.ts

```tsx
// NEWFOOD -> Expand your diet & improve your health
"NEWFOOD": "Expand your diet & improve your health",
"newfood": "Expand your diet & improve your health",
"newfoods": "Expand your diet & improve your health",

// Library -> Stop Buying Books and go to the Library
"Library": "Stop Buying Books and go to the Library",
"library": "Stop Buying Books and go to the Library",

// Sales -> Wait for the Next Sale/Promo
"Sales": "Wait for the Next Sale/Promo",
"sales": "Wait for the Next Sale/Promo",

// Sitstand -> 30 benefits of getting up and down...
"Sitstand": "30 benefits of getting up and down from the floor without using your arms",
"sitstand": "30 benefits of getting up and down from the floor without using your arms",

// Local -> Free Local Events for Entertainment
"Local": "Free Local Events for Entertainment",
"local": "Free Local Events for Entertainment",

// Efficient -> Use energy efficient devices at home
"Efficient": "Use energy efficient devices at home",
"efficient": "Use energy efficient devices at home",
```

#### New Guide Mapping Entry

```tsx
"Use energy efficient devices at home": "https://drive.google.com/uc?export=download&id=1tfeMQSIfrkkjwJudA6UAP4AWFQRCCyoj",
```

