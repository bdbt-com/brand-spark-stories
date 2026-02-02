

## Add Podcast 29 Thumbnail Template - Keep A Notebook By Your Bed For Random Thoughts

This plan adds a new TikTok thumbnail template for **Podcast 29**, using `tikTokBg28` as the background (alternating with template 46).

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 47 |
| Podcast Number | 29 |
| Title | "Keep A Notebook By Your Bed For Random Thoughts" |
| Background | `tikTokBg28` (alternating pattern with template 46) |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition

Add `| 47` to the union type:

```tsx
templateIndex: 0 | 1 | ... | 46 | 47;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array

Add `tikTokBg28` to position 47:

```text
Current ends with:
..., tikTokBg28, tikTokBg24];

Updated ends with:
..., tikTokBg28, tikTokBg24, tikTokBg28];
```

---

#### 3. TikTokTemplate.tsx - JSX Title Block

Add the rendering block for template index 47 after template 46:

```tsx
) : templateIndex === 47 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 29
    </span>
    <span className="block mt-3 text-white">
      KEEP A NOTEBOOK BY YOUR BED
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      FOR RANDOM THOUGHTS
    </span>
  </>
) : null
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array

Add metadata for the new template after id 46:

```tsx
{ id: 47, name: "Podcast 29 Notebook", title: "Keep A Notebook By Your Bed For Random Thoughts", subtitle: "", image: "" }
```

---

#### 5. ThumbnailTemplate.tsx - Rendering Block

Add the display block for template 47 after the template 46 block:

```tsx
{/* Template 48 - Podcast 29 Notebook */}
{currentTemplateIndex === 47 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={47} />
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Type definition, backgrounds array, JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Add template metadata + rendering block |

---

### Background Selection

Recent templates used:
- Template 46: `tikTokBg24`
- Template 45: `tikTokBg28`
- Template 44: `tikTokBg24`

Selected: `tikTokBg28` - continuing the alternating pattern

