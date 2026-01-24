

## Fix Profile Photo - More Zoom and Repositioning

The current 10% zoom (`scale-110`) isn't enough to eliminate the gaps around the edges of the circle. Need to increase the zoom and adjust the positioning.

---

### Change Required

**File:** `src/pages/LinkInBio.tsx` (line 78)

**Current:**
```tsx
className="absolute inset-0 w-full h-full object-cover object-top scale-110 rounded-full"
```

**Updated:**
```tsx
className="absolute inset-0 w-full h-full object-cover object-[center_15%] scale-125 rounded-full"
```

**What this does:**
- `scale-125`: Increases zoom from 10% to 25% to ensure no edges are visible
- `object-[center_15%]`: Custom object position to center horizontally and position 15% from top vertically (better than `object-top` which was too high)

---

### Summary

| Item | Change |
|------|--------|
| Line 78 | Increase zoom to `scale-125` and reposition with `object-[center_15%]` |

