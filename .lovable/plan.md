

## TikTok/Instagram Thumbnails for Podcasts 51-54

### Titles from your screenshot (confirm these)

| Podcast | Title |
|---|---|
| **51** | Start Your Day With Movement *(already exists -- index 69)* |
| **52** | Sell Unused Items |
| **53** | Use a Spike Mat |
| **54** | Take a Free Online Course |

### What needs to happen

P51 is already built (index 69). Three new templates needed for P52, P53, P54.

### Changes across 2 files

**1. `src/components/TikTokTemplate.tsx`**

- Extend the `templateIndex` type union to include `70 | 71 | 72`
- Add 3 entries to the `backgrounds` array (following alternating pattern: index 70 = even podcast = `tikTokBg24`, index 71 = odd = `tikTokBg28`, index 72 = even = `tikTokBg24`)
- Add 3 new title blocks before the `null` terminator:

| Index | Header | White line | Gold line |
|---|---|---|---|
| 70 | BDBT PODCAST 52 | SELL UNUSED | ITEMS |
| 71 | BDBT PODCAST 53 | USE A | SPIKE MAT |
| 72 | BDBT PODCAST 54 | TAKE A FREE | ONLINE COURSE |

**2. `src/pages/ThumbnailTemplate.tsx`**

- Add 3 entries to `tikTokTemplates` metadata array (ids 70-72)
- Add 3 rendering blocks (`currentTemplateIndex === 70/71/72 && mode === 'instagram'`) after the existing index 69 block

No new background images needed -- reuses the existing alternating pair.

