

## Add ads.txt for Google AdSense

Google AdSense requires an `ads.txt` file at your site root (`bigdaddysbigtips.com/ads.txt`) for verification.

---

### Changes Required

#### 1. Create `public/ads.txt`

Add the standard AdSense ads.txt entry using your publisher ID:

```
google.com, pub-8736580968690323, DIRECT, f08c47fec0942fa0
```

This file in the `public/` folder will be served at the root URL automatically by Vite.

---

### Files to Create

| File | Purpose |
|------|---------|
| `public/ads.txt` | AdSense publisher verification file |

After publishing, Google will find it at `bigdaddysbigtips.com/ads.txt` and the status should update within a few hours.

