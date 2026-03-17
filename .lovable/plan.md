

# Add "Unsubscribe from paid streaming services" tip

The new guide from the spreadsheet is **"Unsubscribe for paid streaming services"** (keyword: `unsubscribe`, file ID: `1W_vFiEDC6mFMyqoNo3dqFQ6IjNuPIUt-`).

## Changes needed across 3 files:

### 1. `src/data/guideMapping.ts`
Add entry:
```
"Unsubscribe from paid streaming services": "https://drive.google.com/uc?export=download&id=1W_vFiEDC6mFMyqoNo3dqFQ6IjNuPIUt-"
```

### 2. `src/pages/Tips.tsx`
Add new tip object before the closing `];` (after "Audit Your Insurance Policies Annually"), using `XCircle` icon (already imported), category `finance`, with relevant H/W/H bullet points.

### 3. `src/data/tipKeywords.ts`
Add keyword mappings:
- `"unsubscribe"` / `"Unsubscribe"` / `"UNSUBSCRIBE"` → tip title

