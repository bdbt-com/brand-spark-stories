

## Add Podcast 25 Thumbnail Template - Try One New Food Each Week

This plan adds a new TikTok thumbnail template for **Podcast 25**, using `tikTokBg28` (tiktok-bg-template-32.png) as the background - different from the last 6 templates which used `tikTokBg22`, `tikTokBg29`, and `tikTokBg24`.

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 43 |
| Podcast Number | 25 |
| Title | "Try One New Food Each Week" |
| Background | `tikTokBg28` (tiktok-bg-template-32.png) - last used at index 32 |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (Line 33)

Add `| 43` to the union type:

```tsx
templateIndex: 0 | 1 | ... | 42 | 43;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array (Line 38)

Add `tikTokBg28` to position 43:

```tsx
// Current ends with:
..., tikTokBg29, tikTokBg24];

// Updated ends with:
..., tikTokBg29, tikTokBg24, tikTokBg28];
```

---

#### 3. TikTokTemplate.tsx - JSX Title Block

Add the rendering block for template index 43 after template 42:

```tsx
) : templateIndex === 43 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 25
    </span>
    <span className="block mt-3 text-white">
      TRY ONE NEW FOOD
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      EACH WEEK
    </span>
  </>
) : null
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array

Add metadata for the new template:

```tsx
{ id: 43, name: "Podcast 25 New Food", title: "Try One New Food Each Week", subtitle: "", image: "" }
```

---

#### 5. ThumbnailTemplate.tsx - Rendering Block

Add the display block for template 43:

```tsx
{/* Template 44 - Podcast 25 New Food */}
{currentTemplateIndex === 43 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={43} />
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Type definition, backgrounds array, JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Add template metadata + rendering block |

