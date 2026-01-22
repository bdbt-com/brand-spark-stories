

## Fix URL Keyword Routing for boxjump and nospend

Both `/tips/boxjump` and `/tips/nospend` are not working because of misconfigurations in the keyword mapping system.

---

### Issue 1: boxjump Keyword Missing

**Problem**: No keyword entry exists for `boxjump` in `tipKeywords.ts`

**Solution**: Add the keyword mapping

**File**: `src/data/tipKeywords.ts`

Add the following entries (insert alphabetically after "Borrow"):

```typescript
// BoxJump -> Box Jumping (for Bone Health)
"BoxJump": "Box Jumping (for Bone Health)",
"boxjump": "Box Jumping (for Bone Health)",
"box-jump": "Box Jumping (for Bone Health)",
```

---

### Issue 2: nospend Keyword Points to Non-Existent Tip

**Problem**: The keyword `nospend` maps to `"Have a weekly no spend day"` but this tip does NOT exist in Tips.tsx. The actual tip is titled `"Do a spending freeze challenge for a week"`.

**Solution Options**:

**Option A (Recommended)**: Update the keyword mapping to point to the existing tip:

```typescript
// NoSpend -> Do a spending freeze challenge for a week
"NoSpend": "Do a spending freeze challenge for a week",
"nospend": "Do a spending freeze challenge for a week",
```

**Option B**: Add a new tip titled "Have a weekly no spend day" to Tips.tsx (more work, may create duplicate content)

---

### Summary of Changes

| File | Change |
|------|--------|
| `src/data/tipKeywords.ts` | Add `boxjump`, `BoxJump`, `box-jump` keywords mapping to "Box Jumping (for Bone Health)" |
| `src/data/tipKeywords.ts` | Update `nospend` and `NoSpend` to map to "Do a spending freeze challenge for a week" |

---

### After Implementation

- `/tips/boxjump` will scroll to and highlight "Box Jumping (for Bone Health)"
- `/tips/nospend` will scroll to and highlight "Do a spending freeze challenge for a week"

Both will have the blue glow animation effect for 3 seconds.

