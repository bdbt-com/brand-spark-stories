

## Add Profile Photo to Link in Bio Page

Copy your uploaded photo into the project and update the Link in Bio page to use it.

---

### Steps

1. **Copy the uploaded image into the project**
   - Source: `user-uploads://Screenshot_2026-01-24_at_11.09.58.png`
   - Destination: `public/lovable-uploads/profile-photo.png`

2. **Update `src/pages/LinkInBio.tsx` (line 76)**
   - Change from: `src="/lovable-uploads/recording-setup-new.jpg"`
   - Change to: `src="/lovable-uploads/profile-photo.png"`

---

### Summary

| Item | Change |
|------|--------|
| New file | Copy uploaded image to `public/lovable-uploads/profile-photo.png` |
| Update profile src | Change to use the new `profile-photo.png` file |

