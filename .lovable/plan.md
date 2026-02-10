

## Add Google AdSense Script

Adding the Google AdSense verification script to the site's `<head>` section for site ownership verification.

---

### Changes Required

#### 1. index.html - Add AdSense Script

Add the following script tag inside the `<head>` section:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8736580968690323"
     crossorigin="anonymous"></script>
```

This is a public client ID (not a secret), so it's safe to include directly in the HTML.

---

### Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add AdSense script tag in `<head>` |

