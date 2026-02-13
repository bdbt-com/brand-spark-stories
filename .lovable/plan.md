

## Add YouTube and TikTok Thumbnails - Podcast 40: Buy in Bulk and Save More

Two new templates: YouTube at index 44, TikTok at index 58.

---

### Changes

#### 1. `src/pages/ThumbnailTemplate.tsx`

**YouTube templates array** (after line 332, the id 43 entry): Add new entry:
```js
{
  id: 44,
  name: "Buy in Bulk and Save",
  title: "Buy in Bulk and Save More",
  subtitle: "Daily Wins Podcast 40",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

**TikTok templates array** (after line 393, the id 57 entry): Add:
```js
{ id: 58, name: "Podcast 40 Buy in Bulk", title: "Buy In Bulk And Save More", subtitle: "", image: "" }
```

**YouTube rendering block** (after the template 43 YouTube block, around line 2694): Add a `currentTemplateIndex === 44 && mode === 'youtube'` block using the standard podcast layout (1280x720, gradient background, right-side image box with glassmorphism, BDBT logo):
```
Title line 1 (white): "Buy in Bulk"
Title line 2 (gold): "and Save More"
Subtitle: "Daily Wins Podcast 40"
```

**TikTok rendering block** (after the template 57 TikTok block): Add a `currentTemplateIndex === 58 && mode === 'instagram'` block with `TikTokTemplate` at index 58.

#### 2. `src/components/TikTokTemplate.tsx`

**Type definition** (line 33): Add `58` to the `templateIndex` union type.

**Backgrounds array** (line 38): Append `tikTokBg24` (alternating pattern: 57 used bg28, so 58 uses bg24).

**JSX title block** (after the templateIndex === 57 block): Add:
```tsx
) : templateIndex === 58 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 40
    </span>
    <span className="block mt-3 text-white">
      BUY IN BULK
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      AND SAVE MORE
    </span>
  </>
)
```

---

### Summary

| File | Change |
|------|--------|
| TikTokTemplate.tsx | Add 58 to type, bg24 to backgrounds, JSX title block |
| ThumbnailTemplate.tsx | Add YouTube template id 44 (metadata + rendering), TikTok template id 58 (metadata + rendering) |

