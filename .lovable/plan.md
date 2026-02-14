

## Add YouTube and TikTok Thumbnails - Podcast 41: Spend Time in Zone 2 Every Day

Two new templates: YouTube at index 45, TikTok at index 59.

---

### Changes

#### 1. `src/pages/ThumbnailTemplate.tsx`

**YouTube templates array** (after line 339, the id 44 entry): Add new entry:
```js
{
  id: 45,
  name: "Spend Time in Zone 2",
  title: "Spend Time in Zone 2 Every Day",
  subtitle: "Daily Wins Podcast 41",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

**TikTok templates array** (after line 401, the id 58 entry): Add:
```js
{ id: 59, name: "Podcast 41 Zone 2", title: "Spend Time In Zone 2 Every Day", subtitle: "", image: "" }
```

**YouTube rendering block** (after the template 44 YouTube block): Add a `currentTemplateIndex === 45 && mode === 'youtube'` block using the standard podcast layout (1280x720, gradient background, right-side image box with glassmorphism, BDBT logo):
```
Title line 1 (white): "Spend Time in Zone 2"
Title line 2 (gold): "Every Day"
Subtitle: "Daily Wins Podcast 41"
```

**TikTok rendering block** (after the template 58 TikTok block): Add a `currentTemplateIndex === 59 && mode === 'instagram'` block with `TikTokTemplate` at index 59.

#### 2. `src/components/TikTokTemplate.tsx`

**Type definition** (line 33): Add `59` to the `templateIndex` union type.

**Backgrounds array** (line 38): Append `tikTokBg28` (alternating pattern: 58 used bg24, so 59 uses bg28).

**JSX title block** (after the templateIndex === 58 block): Add:
```tsx
) : templateIndex === 59 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 41
    </span>
    <span className="block mt-3 text-white">
      SPEND TIME IN ZONE 2
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      EVERY DAY
    </span>
  </>
)
```

---

### Summary

| File | Change |
|------|--------|
| TikTokTemplate.tsx | Add 59 to type, bg28 to backgrounds, JSX title block |
| ThumbnailTemplate.tsx | Add YouTube template id 45 (metadata + rendering), TikTok template id 59 (metadata + rendering) |

