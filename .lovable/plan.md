

## Add YouTube Thumbnail Template - Podcast 34: Try Something New

This plan adds a new YouTube thumbnail template for **Podcast 34** with the title "Try Something New".

---

### Overview

| Property | Value |
|----------|-------|
| Template ID | 38 |
| Podcast Number | 34 |
| Title | "Try Something New" |
| Format | YouTube 16:9 (1280x720) |

---

### Changes Required

#### 1. ThumbnailTemplate.tsx - templates Array (after line 290)

Add metadata for the new template after id 37:

```tsx
{
  id: 38,
  name: "Try Something New",
  title: "Try Something New",
  subtitle: "Daily Wins Podcast",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

---

#### 2. ThumbnailTemplate.tsx - YouTube Rendering Block

Add the display block for template 38 (using the standard YouTube layout pattern):

```tsx
{/* Template 39 - Podcast 34 Try Something New */}
{currentTemplateIndex === 38 && mode === 'youtube' && (
  <div className="relative">
    <div id="thumbnail-38" key="template-38" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
      <div className="h-full flex items-center p-16 relative">
        <div className="absolute right-16 top-16 bottom-16 flex items-center">
          <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
            <img 
              src={templates[38].image} 
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
              Try
            </span>
            <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>
              Something New
            </span>
          </h1>
          <p className="text-white/80 text-3xl font-medium">
            Daily Wins Podcast
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
| `src/pages/ThumbnailTemplate.tsx` | Add template metadata to `templates` array + YouTube rendering block |

---

### Design Notes

- Uses the standard YouTube thumbnail layout (16:9 at 1280x720)
- Right-side image box with glassmorphism effect
- BDBT logo positioned in bottom-left of image box
- Title split: "Try" in white, "Something New" in brand gold
- Uses the standard podcast image (`bc6fa209-b818-463e-aeb6-08d6c7b423c6.png`)

