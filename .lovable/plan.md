

## Add Podcast 21 Thumbnail Template - Do 60 Seconds Deep Breathing, Twice a Day

This plan adds a new TikTok thumbnail template for **Podcast 21**, reusing the same background image as Podcast 19 (Amazon Subscribe and Save).

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 39 |
| Podcast Number | 21 |
| Title | "Do 60 Seconds Deep Breathing, Twice a Day" |
| Background | `tikTokBg22` (same as Podcast 19 - Amazon Subscribe and Save) |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (Line 33)

Add `| 39` to the union type:

```tsx
// Current
templateIndex: 0 | 1 | ... | 38;

// Updated
templateIndex: 0 | 1 | ... | 38 | 39;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array (Line 38)

Add `tikTokBg22` to position 39:

```tsx
// Current ends with:
..., tikTokBg29];

// Updated ends with:
..., tikTokBg29, tikTokBg22];
```

---

#### 3. TikTokTemplate.tsx - JSX Title Block (After Line 621)

Add the rendering block for template index 39:

```tsx
) : templateIndex === 39 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 21
    </span>
    <span className="block mt-3 text-white">
      DO 60 SECONDS DEEP BREATHING
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      TWICE A DAY
    </span>
  </>
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array

Add metadata for the new template:

```tsx
{ id: 39, name: "Podcast 21 Deep Breathing", title: "Do 60 Seconds Deep Breathing, Twice a Day", subtitle: "", image: "" }
```

---

#### 5. ThumbnailTemplate.tsx - Rendering Block

Add the display block for template 39:

```tsx
{/* Template 40 - Podcast 21 Deep Breathing */}
{currentTemplateIndex === 39 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={39} />
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Type definition, backgrounds array, JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Add template metadata + rendering block |

