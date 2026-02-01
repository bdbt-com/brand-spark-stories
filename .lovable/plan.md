
## Add Podcast 27 Thumbnail Template - Use Public Transport To Get Your Steps In

This plan adds a new TikTok thumbnail template for **Podcast 27**, using `tikTokBg28` (same as template 43) as the background to maintain consistency with recent templates.

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 45 |
| Podcast Number | 27 |
| Title | "Use Public Transport To Get Your Steps In" |
| Background | `tikTokBg28` (tiktok-bg-template-32.png) - same as template 43 |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (Line 33)

Add `| 45` to the union type:

```tsx
templateIndex: 0 | 1 | ... | 44 | 45;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array (Line 38)

Add `tikTokBg28` to position 45:

```text
Current ends with:
..., tikTokBg24, tikTokBg28, tikTokBg24];

Updated ends with:
..., tikTokBg24, tikTokBg28, tikTokBg24, tikTokBg28];
```

---

#### 3. TikTokTemplate.tsx - JSX Title Block (after line 693)

Add the rendering block for template index 45 after template 44:

```tsx
) : templateIndex === 45 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 27
    </span>
    <span className="block mt-3 text-white">
      USE PUBLIC TRANSPORT
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      TO GET YOUR STEPS IN
    </span>
  </>
) : null
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array (Line 338)

Add metadata for the new template after id 44:

```tsx
{ id: 45, name: "Podcast 27 Public Transport", title: "Use Public Transport To Get Your Steps In", subtitle: "", image: "" }
```

---

#### 5. ThumbnailTemplate.tsx - Rendering Block (after line 962)

Add the display block for template 45 after the template 44 block:

```tsx
{/* Template 46 - Podcast 27 Public Transport */}
{currentTemplateIndex === 45 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={45} />
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
- Template 44: `tikTokBg24` (tiktok-bg-template-25.png)
- Template 43: `tikTokBg28` (tiktok-bg-template-32.png)
- Template 42: `tikTokBg24` (tiktok-bg-template-25.png)

Selected: `tikTokBg28` (tiktok-bg-template-32.png) - alternating with template 44 for variety
