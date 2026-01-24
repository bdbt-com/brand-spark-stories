

## Fix Thumbnail Images to Seamlessly Fit Within Button Cards

The thumbnail images in the link cards currently show sharp edges that don't match the rounded corners of the button cards. The card container has `rounded-xl` but the thumbnail images don't have matching rounded corners.

---

### Changes Required

**File:** `src/pages/LinkInBio.tsx` (lines 126-132)

**Current:**
```tsx
{link.thumbnail && (
  <div className="w-16 h-16 flex-shrink-0">
    <img 
      src={link.thumbnail} 
      alt={link.title}
      className="w-full h-full object-cover"
    />
  </div>
)}
```

**Updated:**
```tsx
{link.thumbnail && (
  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-l-xl">
    <img 
      src={link.thumbnail} 
      alt={link.title}
      className="w-full h-full object-cover"
    />
  </div>
)}
```

**What this does:**
- `overflow-hidden`: Ensures the image doesn't extend beyond the container
- `rounded-l-xl`: Applies matching rounded corners to the left side of the thumbnail container (same radius as the card's `rounded-xl`)

This will make the thumbnails seamlessly blend with the button card borders on the left side where they meet the card edge.

---

### Summary

| Item | Change |
|------|--------|
| Lines 126-132 | Add `overflow-hidden rounded-l-xl` to thumbnail container to match card's rounded corners |

