

## Add Podcast 24 Thumbnail Template - Have a Weekly No Spend Day

This plan adds a new TikTok thumbnail template for **Podcast 24**, using `tikTokBg24` (tiktok-bg-template-25.png) as the background - different from the last 6 templates which alternate between `tikTokBg22` and `tikTokBg29`.

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 42 |
| Podcast Number | 24 |
| Title | "Have a Weekly No Spend Day" |
| Background | `tikTokBg24` (tiktok-bg-template-25.png) - last used at index 35 |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (Line 33)

Add `| 42` to the union type:

```tsx
templateIndex: 0 | 1 | ... | 41 | 42;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array (Line 38)

Add `tikTokBg24` to position 42:

```tsx
// Current ends with:
..., tikTokBg22, tikTokBg29];

// Updated ends with:
..., tikTokBg22, tikTokBg29, tikTokBg24];
```

---

#### 3. TikTokTemplate.tsx - JSX Title Block

Add the rendering block for template index 42 after template 41:

```tsx
) : templateIndex === 42 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 24
    </span>
    <span className="block mt-3 text-white">
      HAVE A WEEKLY
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      NO SPEND DAY
    </span>
  </>
) : null
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array

Add metadata for the new template:

```tsx
{ id: 42, name: "Podcast 24 No Spend Day", title: "Have a Weekly No Spend Day", subtitle: "", image: "" }
```

---

#### 5. ThumbnailTemplate.tsx - Rendering Block

Add the display block for template 42:

```tsx
{/* Template 43 - Podcast 24 No Spend Day */}
{currentTemplateIndex === 42 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={42} />
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Type definition, backgrounds array, JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Add template metadata + rendering block |

