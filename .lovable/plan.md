

## Fix Google Search Appearance & Brand Image

### Problem
Google shows "Big Daddy's Big Tips Logo" because:
- The OG (Open Graph) image points to a generic Lovable placeholder
- The `twitter:site` references `@lovable_dev`
- There's no proper branded social sharing image

### Changes — `index.html`

**1. Update `og:image` and `twitter:image`** to use your actual logo (`/lovable-uploads/bdbt-logo-transparent.png`) with a full absolute URL pointing to your published domain:
```html
<meta property="og:image" content="https://bdbt.lovable.app/lovable-uploads/bdbt-logo-transparent.png" />
<meta name="twitter:image" content="https://bdbt.lovable.app/lovable-uploads/bdbt-logo-transparent.png" />
```

**2. Update `twitter:site`** from `@lovable_dev` to your brand handle (or remove it if you don't have a Twitter/X account).

**3. Add `og:url`** so Google knows the canonical URL:
```html
<meta property="og:url" content="https://bdbt.lovable.app" />
```

**4. Add structured data (JSON-LD)** so Google explicitly shows your site name and logo:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "BigDaddy'sBigTips",
  "url": "https://bdbt.lovable.app",
  "image": "https://bdbt.lovable.app/lovable-uploads/bdbt-logo-transparent.png"
}
</script>
```

### Important note
Google takes days/weeks to re-crawl and update search results. These changes will fix the underlying issue, but the Google listing won't update instantly. You can speed it up by submitting your URL in [Google Search Console](https://search.google.com/search-console).

### Files
- `index.html` — one file, meta tag updates + JSON-LD block

