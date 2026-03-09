

## Sync Guide Data and Add "Blend" Keyword

After comparing the uploaded spreadsheet against `guideMapping.ts` and `tipKeywords.ts`, the guide URLs all match correctly. The one issue is that the **"Blend" keyword is missing** from `tipKeywords.ts`, so visiting `/tips/blend` or `/tips/Blend` won't route to the "30 Benefits of Blending Connection" tip.

### Changes

**`src/data/tipKeywords.ts`** -- Add "Blend" keyword mapping:
- Add `"blend": "30 Benefits of Blending Connection"`, `"Blend": "30 Benefits of Blending Connection"`, and `"BLEND": "30 Benefits of Blending Connection"` entries alongside the other March 2026 keywords.

No other file changes needed -- all guide download URLs in `guideMapping.ts` already match the spreadsheet File IDs, and all other keyword routes are already present.

