

## Add TikTok Thumbnail - Podcast 38: Find Free Local Events

New TikTok template at index 56 for "Find Free Local Events for Your Entertainment".

---

### Changes Required

#### 1. `src/components/TikTokTemplate.tsx`

**Type definition** (line 33): Add `56` to the `templateIndex` union type.

**Backgrounds array** (line 38): Append `tikTokBg24` (tiktok-bg-template-25.png) following the alternating pattern (index 55 used bg28, so 56 uses bg24).

**JSX title block** (after the `templateIndex === 55` block, around line 831): Add new conditional:
```
) : templateIndex === 56 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 38
    </span>
    <span className="block mt-3 text-white">
      FIND FREE LOCAL EVENTS
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      FOR YOUR ENTERTAINMENT
    </span>
  </>
)
```

#### 2. `src/pages/ThumbnailTemplate.tsx`

**TikTok templates array** (after line 391, the id 55 entry): Add:
```
{ id: 56, name: "Podcast 38 Free Local Events", title: "Find Free Local Events For Your Entertainment", subtitle: "", image: "" }
```

**Rendering block** (after the template 55 TikTok rendering block): Add a `currentTemplateIndex === 56` block using the standard TikTok thumbnail layout with the `TikTokTemplate` component at index 56.

---

### Summary

| File | Change |
|------|--------|
| TikTokTemplate.tsx | Add 56 to type, bg24 to backgrounds, JSX title block |
| ThumbnailTemplate.tsx | Add tikTok metadata entry + rendering block for index 56 |

