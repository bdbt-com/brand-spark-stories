

## Add TikTok Thumbnail Template - Podcast 33: Wait for the Next Sale / Promo

This plan adds a new TikTok thumbnail template for **Podcast 33** with the title "Wait for the Next Sale / Promo".

---

### Overview

| Property | Value |
|----------|-------|
| Template ID | 51 |
| Podcast Number | 33 |
| Title | "WAIT FOR THE NEXT SALE / PROMO" |
| Background | tikTokBg28 (alternating pattern) |
| Format | TikTok/Instagram 9:16 (540x960) |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (line 33)

Update the templateIndex type union to include `51`:

```tsx
templateIndex: 0 | 1 | 2 | ... | 49 | 50 | 51;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array (line 38)

Add `tikTokBg28` to the backgrounds array for index 51:

```tsx
const backgrounds = [...existing, tikTokBg28];
```

---

#### 3. TikTokTemplate.tsx - Title JSX Block (after line 765)

Add the title rendering for templateIndex 51:

```tsx
) : templateIndex === 51 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 33
    </span>
    <span className="block mt-3 text-white">
      WAIT FOR THE NEXT
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      SALE / PROMO
    </span>
  </>
)
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array (after line 351)

Add metadata for template 51:

```tsx
{ id: 51, name: "Podcast 33 Sale Promo", title: "Wait For The Next Sale / Promo", subtitle: "", image: "" }
```

---

#### 5. ThumbnailTemplate.tsx - Rendering Block (after line 1011)

Add conditional rendering for template 51:

```tsx
{/* Template 52 - Podcast 33 Wait for Sale */}
{currentTemplateIndex === 51 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={51} />
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Update type, backgrounds array, add title JSX |
| `src/pages/ThumbnailTemplate.tsx` | Add metadata + rendering block |

---

### Design Notes

- Follows the established alternating background pattern (Bg 28 for odd podcasts in this range)
- Uses standard TikTok thumbnail styling with top-[55%] title positioning
- Last line "SALE / PROMO" styled in brand gold (hsl(35, 45%, 75%))
- Consistent with existing podcast thumbnail format

