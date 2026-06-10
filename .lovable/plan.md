### 1. About page — remove "The Problem" section
Delete lines 258–331 of `src/pages/About.tsx` (the entire `{/* The Problem Section */}` block: "The Problem" heading + "We live in a world obsessed with doing more", "Why do traditional approaches…", "We're told to fix our lives…", "But nothing sticks.", "Meanwhile, modern life…", and all 4 inter-section chevrons). Leave the "Welcome to the World of Daily Wins" section untouched.

### 2. Courses page — remove the intent popup (desktop + mobile)
In `src/pages/Courses.tsx`:
- Remove `import CoursesIntentModal from "@/components/CoursesIntentModal";` (line 3).
- Remove `const [intentOpen, setIntentOpen] = useState(false);` (line 127).
- Remove the entire intent `useEffect` (lines 132–148), including the `setTimeout` that opens the modal and the `?intent=1` / sessionStorage handling.
- Remove the `<CoursesIntentModal ... />` JSX block (lines 157–163).
- Drop `useSearchParams` / `setSearchParams` usage if it becomes unused after the effect is removed.
- Leave `src/components/CoursesIntentModal.tsx` on disk (orphaned) to avoid breaking any other reference.

### 3. Podcast page — high-resolution thumbnails
In `src/pages/Podcast.tsx`, both `<img>` tags currently render `ep.thumbnail` / `video.thumbnail`, which the YouTube scraper falls back to `hqdefault.jpg` (480×360). Switch to YouTube's `maxresdefault.jpg` (1280×720) with a graceful fallback:

- Add small helpers at the top of the component:
  ```ts
  const hiResThumb = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumb = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  ```
- Replace `src={video.thumbnail}` (line 216) with `src={hiResThumb(video.videoId)}` and add `onError={(e) => { e.currentTarget.src = fallbackThumb(video.videoId); }}`.
- Replace `src={ep.thumbnail}` (line 326) with `src={hiResThumb(ep.videoId)}` and add the same `onError` fallback using `ep.videoId`.

This delivers YouTube's full-HD thumbnails (same quality shown on youtube.com) without redeploying the edge function. The `onError` handler protects the rare videos that lack a maxres asset.
