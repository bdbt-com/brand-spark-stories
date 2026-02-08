

## Add YouTube Thumbnail - Podcast 36 + Update Episode Numbers

This plan adds a new YouTube thumbnail for **Podcast 36: Learn Something New** and updates the subtitle text on templates 38 and 39 to include episode numbers.

---

### Overview

| Task | Details |
|------|---------|
| New Template | ID 40 - Podcast 36: "Learn Something New" |
| Update Template 38 | Add "34" after "Daily Wins Podcast" |
| Update Template 39 | Add "35" after "Daily Wins Podcast" |
| New Template 40 | Subtitle: "Daily Wins Podcast 36" |

---

### Changes Required

#### 1. ThumbnailTemplate.tsx - Templates Array (after line 304)

Add metadata for template 40:

```tsx
{
  id: 40,
  name: "Learn Something New",
  title: "Learn Something New",
  subtitle: "Daily Wins Podcast 36",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

---

#### 2. ThumbnailTemplate.tsx - Update Template 38 Subtitle (line 2472-2474)

Change:
```tsx
<p className="text-white/80 text-3xl font-medium">
  Daily Wins Podcast
</p>
```

To:
```tsx
<p className="text-white/80 text-3xl font-medium">
  Daily Wins Podcast 34
</p>
```

---

#### 3. ThumbnailTemplate.tsx - Update Template 39 Subtitle (line 2512-2514)

Change:
```tsx
<p className="text-white/80 text-3xl font-medium">
  Daily Wins Podcast
</p>
```

To:
```tsx
<p className="text-white/80 text-3xl font-medium">
  Daily Wins Podcast 35
</p>
```

---

#### 4. ThumbnailTemplate.tsx - Add Rendering Block for Template 40 (after line 2519)

Add conditional rendering for template 40:

```tsx
{/* Template 40 - Podcast 36 Learn Something New */}
{currentTemplateIndex === 40 && mode === 'youtube' && (
  <div className="relative">
    <div id="thumbnail-40" key="template-40" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
      <div className="h-full flex items-center p-16 relative">
        <div className="absolute right-16 top-16 bottom-16 flex items-center">
          <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
            <img 
              src={templates[40].image} 
              alt="Podcast thumbnail"
              className="w-full h-full object-cover border-4 border-white/20"
            />
            <div className="absolute bottom-4 left-4">
              <img 
                src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                alt="BDBT Logo"
                className="h-16 opacity-90"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
          <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
            <span className="text-white block mb-2">
              Learn
            </span>
            <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
              Something New
            </span>
          </h1>
          <p className="text-white/80 text-3xl font-medium">
            Daily Wins Podcast 36
          </p>
        </div>
      </div>
    </div>
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/ThumbnailTemplate.tsx` | Add template 40 metadata, update subtitles on 38/39, add rendering block for 40 |

---

### Summary

- Template 38 (Podcast 34): Subtitle updated to "Daily Wins Podcast 34"
- Template 39 (Podcast 35): Subtitle updated to "Daily Wins Podcast 35"
- Template 40 (Podcast 36): New template with title "Learn Something New" and subtitle "Daily Wins Podcast 36"

