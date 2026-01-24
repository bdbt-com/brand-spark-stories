
## Fix Profile Photo Cropping and Style Handle Text

Two changes to make on the Link in Bio page.

---

### 1. Fix Profile Photo Cropping

**File:** `src/pages/LinkInBio.tsx` (line 78)

The profile photo is cropping to the center of the image, cutting off the person. Adding `object-top` will focus on the upper portion where the person is sitting.

**Change:**
```tsx
// From
className="w-full h-full object-cover"

// To
className="w-full h-full object-cover object-top"
```

---

### 2. Style Handle Text - Gold "BigDaddy" + White "BigTips"

**File:** `src/pages/LinkInBio.tsx` (lines 83-85)

Split the handle into two styled spans with different colors.

**Current:**
```tsx
<h1 className="text-white text-xl font-semibold mb-3">
  BigDaddysBigTips
</h1>
```

**Updated:**
```tsx
<h1 className="text-xl font-semibold mb-3">
  <span className="text-amber-400">BigDaddy's</span>
  <span className="text-white">BigTips</span>
</h1>
```

---

### Summary

| Item | Change |
|------|--------|
| Line 78 | Add `object-top` for proper photo cropping |
| Lines 83-85 | Split handle text: gold "BigDaddy's" + white "BigTips" |
