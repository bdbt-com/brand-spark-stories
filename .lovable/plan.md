

## Add YouTube Thumbnails for Podcasts 52, 53, 54

You're right -- I only added TikTok/Instagram templates. You need YouTube (16:9) thumbnails too. Here's the fix:

### Changes to `src/pages/ThumbnailTemplate.tsx`

**1. Add 3 entries to the `templates` array (YouTube metadata, after id 55):**

| id | name | title | subtitle |
|---|---|---|---|
| 56 | Sell Unused Items | Sell Unused Items | Daily Wins Podcast 52 |
| 57 | Use a Spike Mat | Use a Spike Mat | Daily Wins Podcast 53 |
| 58 | Take a Free Online Course | Take a Free Online Course | Daily Wins Podcast 54 |

**2. Add 3 YouTube rendering blocks (after the `currentTemplateIndex === 55` block, before the closing `</div>`):**

Each block follows the same 1280x720 layout as P51 (index 55):
- Gradient background, right-side image box with glassmorphism
- BDBT logo in bottom-left of image box
- Title text split: white line + gold accent line

| Index | White text | Gold text | Subtitle |
|---|---|---|---|
| 56 | Sell Unused | Items | Daily Wins Podcast 52 |
| 57 | Use a | Spike Mat | Daily Wins Podcast 53 |
| 58 | Take a Free | Online Course | Daily Wins Podcast 54 |

