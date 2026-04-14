

## Lower Redirect Countdown & Add View Counts

### Changes

**1. `src/pages/LinkInBio.tsx`** — Two edits:

**Redirect timing** (lines 296-306): Lower the 2nd visit delay from `12500` → `8000` and the 3rd+ visit delay from `20000` → `8000`:
```ts
if (visitNumber === 0) {
  delay = 4000;       // 1st visit stays at 4s
  videoId = REDIRECT_SEQUENCE[0];
} else if (visitNumber === 1) {
  delay = 8000;        // was 12.5s → now 8s
  videoId = REDIRECT_SEQUENCE[1];
} else {
  delay = 8000;        // was 20s → now 8s
  ...
}
```

**View counts** (lines 9-12): Replace "New" with random counts between 1.9K–9K for the 4 new videos:
```ts
{ videoId: "-3_zj_Q_1kI", title: "Reduce Decision Fatigue Wherever Possible", views: "4.1K views" },
{ videoId: "TJTe4wtW158", title: "Skip for 5 Minutes Daily", views: "2.7K views" },
{ videoId: "WNf06ZLUIJw", title: "Expose Yourself to Sunlight Daily", views: "5.3K views" },
{ videoId: "pRRSGS7eLJM", title: "Capitalise on Benefits Offered by Your Employer", views: "1.9K views" },
```

**2. `src/pages/Home.tsx`** (line 17): Replace "New" with a view count for the new featured video:
```ts
{ videoId: "-3_zj_Q_1kI", title: "Reduce Decision Fatigue Wherever Possible", views: "4.1K views", featured: true },
```

### Files
- `src/pages/LinkInBio.tsx` — redirect delay + view counts
- `src/pages/Home.tsx` — view count for featured video

