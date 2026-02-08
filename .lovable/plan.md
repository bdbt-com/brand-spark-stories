

## Fix YouTube Thumbnail - Podcast 36 Title

The current template 40 has the wrong title. It needs to be updated from "Learn Something New" to **"Learn These Words... Brown Fat"**.

---

### Overview

| Template | Podcast | Correct Title |
|----------|---------|---------------|
| 38 | 34 | Try Something New ✓ |
| 39 | 35 | Try Natural Anxiety Fixes ✓ |
| 40 | 36 | Learn These Words... Brown Fat (needs fix) |

---

### Changes Required

#### 1. ThumbnailTemplate.tsx - Templates Array Metadata (lines 305-311)

Update template 40 metadata:

**From:**
```tsx
{
  id: 40,
  name: "Learn Something New",
  title: "Learn Something New",
  subtitle: "Daily Wins Podcast 36",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

**To:**
```tsx
{
  id: 40,
  name: "Learn These Words Brown Fat",
  title: "Learn These Words... Brown Fat",
  subtitle: "Daily Wins Podcast 36",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

---

#### 2. ThumbnailTemplate.tsx - Rendering Block Title (lines 2551-2558)

Update the title in the rendering block:

**From:**
```tsx
<h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
  <span className="text-white block mb-2">
    Learn
  </span>
  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
    Something New
  </span>
</h1>
```

**To:**
```tsx
<h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
  <span className="text-white block mb-2">
    Learn These Words...
  </span>
  <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
    Brown Fat
  </span>
</h1>
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/ThumbnailTemplate.tsx` | Update metadata and rendering block title for template 40 |

---

### Summary

- Template 40 (Podcast 36) title corrected to "Learn These Words... Brown Fat"
- "Brown Fat" will be displayed in brand gold accent colour

