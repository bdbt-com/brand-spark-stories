

## New TikTok Thumbnail - Podcast 36

Adding TikTok thumbnail for Podcast 36 with title "Learn These Two Words - Brown Fat".

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 54 |
| Podcast Number | 36 |
| Title | LEARN THESE TWO WORDS - BROWN FAT |
| Background | tikTokBg24 (tiktok-bg-template-25.png) |

Even-indexed templates (50, 52, 54) use tikTokBg24 per the alternating pattern.

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition

Update `templateIndex` type: add `| 54`

#### 2. TikTokTemplate.tsx - Backgrounds Array

Add `tikTokBg24` at the end of the array for template 54.

#### 3. TikTokTemplate.tsx - JSX Title Block

Add after the template 53 block:

```tsx
) : templateIndex === 54 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 36
    </span>
    <span className="block mt-3 text-white">
      LEARN THESE
    </span>
    <span className="block mt-1 text-white">
      TWO WORDS
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      BROWN FAT
    </span>
  </>
```

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array

Add metadata entry:

```tsx
{ id: 54, name: "Podcast 36 Brown Fat", title: "Learn These Two Words Brown Fat", subtitle: "", image: "" }
```

#### 5. ThumbnailTemplate.tsx - Rendering Block

Add explicit rendering conditional (the commonly missed step):

```tsx
{currentTemplateIndex === 54 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={54} />
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Type, background, JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Metadata entry + rendering block |

---

### Style Details

- Line 1: "LEARN THESE" (white)
- Line 2: "TWO WORDS" (white)
- Line 3: "BROWN FAT" (brand gold - hsl(35, 45%, 75%))
- Standard top-[55%] positioning, BDBT Podcast 36 subtitle

