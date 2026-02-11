

## Add YouTube Thumbnail - Podcast 38: Find Free Local Events for Entertainment

New YouTube template at index 42 in the `templates` array, following the existing design pattern.

---

### Changes Required

#### 1. `src/pages/ThumbnailTemplate.tsx`

**Templates array** (after line 318, before the closing `];`): Add new entry:
```
{
  id: 42,
  name: "Find Free Local Events",
  title: "Find Free Local Events for Entertainment",
  subtitle: "Daily Wins Podcast 38",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

**Rendering block** (after the template 41 block, around line 2618): Add a new YouTube thumbnail block matching the standard 16:9 layout with:
- Gradient background
- Right-side 650x650 glassmorphism image box with BDBT logo
- Left-side text:
  - White: "Find Free Local Events"
  - Gold (`hsl(35, 45%, 75%)`): "for Entertainment"
  - Subtitle: "Daily Wins Podcast 38"

---

### Summary

| Location | Change |
|----------|--------|
| templates array | Add id 42 entry |
| Rendering section | Add `currentTemplateIndex === 42 && mode === 'youtube'` block |

