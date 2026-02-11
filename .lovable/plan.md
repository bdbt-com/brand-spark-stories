

## Add YouTube Thumbnail - Podcast 39: Use a Standing Desk at Home

New YouTube template at index 43 in the `templates` array.

---

### Changes Required

#### 1. `src/pages/ThumbnailTemplate.tsx`

**Templates array** (after line 325, before the closing `];`): Add new entry:
```
{
  id: 43,
  name: "Use a Standing Desk",
  title: "Use a Standing Desk at Home",
  subtitle: "Daily Wins Podcast 39",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

**Rendering block** (after the template 42 block, around line 2653): Add a new YouTube thumbnail block matching the standard 16:9 layout with:
- Gradient background
- Right-side 650x650 glassmorphism image box with BDBT logo
- Left-side text:
  - White: "Use a Standing Desk"
  - Gold (`hsl(35, 45%, 75%)`): "at Home"
  - Subtitle: "Daily Wins Podcast 39"

---

### Summary

| Location | Change |
|----------|--------|
| templates array | Add id 43 entry |
| Rendering section | Add `currentTemplateIndex === 43 && mode === 'youtube'` block |

