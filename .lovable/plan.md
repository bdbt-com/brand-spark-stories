

## Add TikTok Thumbnail - Podcast 39: Use a Standing Desk at Home

New TikTok template at index 57 for "Use a Standing Desk at Home".

---

### Changes

#### 1. `src/components/TikTokTemplate.tsx`

**Type definition** (line 33): Add `57` to the `templateIndex` union type.

**Backgrounds array** (line 38): Append `tikTokBg28` (tiktok-bg-template-32.png) following the alternating pattern (index 56 used bg24, so 57 uses bg28).

**JSX title block** (after the `templateIndex === 56` block, line ~843): Add new conditional:
```
) : templateIndex === 57 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 39
    </span>
    <span className="block mt-3 text-white">
      USE A STANDING DESK
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      AT HOME
    </span>
  </>
)
```

#### 2. `src/pages/ThumbnailTemplate.tsx`

**TikTok templates array** (line 392, after the id 56 entry): Add:
```
{ id: 57, name: "Podcast 39 Standing Desk", title: "Use A Standing Desk At Home", subtitle: "", image: "" }
```

**Rendering block** (after the template 56 rendering block): Add a `currentTemplateIndex === 57` block using the standard TikTok thumbnail layout with `TikTokTemplate` at index 57.

---

### Summary

| File | Change |
|------|--------|
| TikTokTemplate.tsx | Add 57 to type, bg28 to backgrounds, JSX title block |
| ThumbnailTemplate.tsx | Add tikTok metadata entry + rendering block for index 57 |

