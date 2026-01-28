

## Add Podcast 23 Thumbnail Template - Box Jumping for Bone Health

This plan adds a new TikTok thumbnail template for **Podcast 23**, using `tikTokBg29` (tiktok-bg-template-33.png) as the background - different from the previous template which uses `tikTokBg22`.

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 41 |
| Podcast Number | 23 |
| Title | "Box Jumping for Bone Health" |
| Background | `tikTokBg29` (tiktok-bg-template-33.png) - same as Podcast 18 and 20 |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (Line 33)

Add `| 41` to the union type:

```tsx
templateIndex: 0 | 1 | ... | 40 | 41;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array (Line 38)

Add `tikTokBg29` to position 41:

```tsx
// Current ends with:
..., tikTokBg22, tikTokBg22];

// Updated ends with:
..., tikTokBg22, tikTokBg22, tikTokBg29];
```

---

#### 3. TikTokTemplate.tsx - JSX Title Block

Add the rendering block for template index 41 after template 40:

```tsx
) : templateIndex === 41 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 23
    </span>
    <span className="block mt-3 text-white">
      BOX JUMPING
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      FOR BONE HEALTH
    </span>
  </>
) : null
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array

Add metadata for the new template:

```tsx
{ id: 41, name: "Podcast 23 Box Jumping", title: "Box Jumping for Bone Health", subtitle: "", image: "" }
```

---

#### 5. ThumbnailTemplate.tsx - Rendering Block

Add the display block for template 41:

```tsx
{/* Template 42 - Podcast 23 Box Jumping */}
{currentTemplateIndex === 41 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={41} />
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Type definition, backgrounds array, JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Add template metadata + rendering block |

