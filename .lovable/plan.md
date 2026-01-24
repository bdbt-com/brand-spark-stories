

## Fix Handle Text to Use Brand Gold Color

The "BigDaddy's" text is incorrectly using `text-amber-400` (orange) instead of the brand gold color used across the entire website.

---

### Change Required

**File:** `src/pages/LinkInBio.tsx` (line 84)

**Current (wrong):**
```tsx
<span className="text-amber-400">BigDaddy's</span>
```

**Updated (correct):**
```tsx
<span className="text-[hsl(35_45%_75%)]">BigDaddy's</span>
```

This matches the exact gold color used on:
- Home page: "Big Life Changes."
- Tips page: "Big Tips"
- About page: "The System"
- Daily Wins page: "Wall"
- Podcast page: "Videos"

---

### Summary

| Item | Change |
|------|--------|
| Line 84 | Change `text-amber-400` to `text-[hsl(35_45%_75%)]` |

