

## Fix YouTube Videos on Podcast Page

The YouTube API key is stored in backend secrets, but the frontend code cannot access backend secrets directly. We need to create an Edge Function to securely fetch the YouTube videos.

---

### The Problem

| Location | Can Access Secrets? | Current Code |
|----------|---------------------|--------------|
| Frontend (React) | No | Trying to use `VITE_YOUTUBE_API_KEY` |
| Edge Functions | Yes | Not implemented |

Backend secrets can only be accessed from Edge Functions, not from frontend code.

---

### Solution

Create an Edge Function that:
1. Reads the YouTube API key from secrets
2. Fetches videos from the YouTube Data API
3. Returns the video data to the frontend

Then update the frontend to call this Edge Function instead of the YouTube API directly.

---

### Implementation Steps

#### 1. Add YouTube API Key Secret

Request the user to add their YouTube API key as a secret named `YOUTUBE_API_KEY`.

#### 2. Create Edge Function: `supabase/functions/youtube-videos/index.ts`

```text
Purpose: Fetch YouTube channel videos securely
- Read YOUTUBE_API_KEY from secrets
- Get channel ID from handle @bigdaddysbigtips
- Fetch latest videos with details (duration, view count)
- Return formatted video data
```

#### 3. Update Frontend Hook: `src/hooks/useYouTubeVideos.ts`

```text
Changes:
- Remove direct YouTube API calls
- Call Edge Function instead: /youtube-videos?maxResults=50
- Remove sessionStorage API key logic
- Simplify error handling
```

#### 4. Remove Unused Component: `src/components/YouTubeApiKeyInput.tsx`

No longer needed since we'll use backend secrets.

#### 5. Update Podcast Page: `src/pages/Podcast.tsx`

```text
Changes:
- Remove apiKey state
- Remove YouTubeApiKeyInput import and usage
- Remove handleApiKeySet function
```

---

### Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/youtube-videos/index.ts` | Create |
| `src/hooks/useYouTubeVideos.ts` | Modify |
| `src/components/YouTubeApiKeyInput.tsx` | Delete |
| `src/pages/Podcast.tsx` | Modify |

---

### Technical Details

**Edge Function Flow:**

```text
Frontend Request
      ↓
Edge Function (youtube-videos)
      ↓
Read YOUTUBE_API_KEY from Deno.env
      ↓
Fetch channel ID from YouTube API
      ↓
Fetch video list with details
      ↓
Return JSON response
```

**API Calls Made by Edge Function:**
1. Search for channel by handle
2. Get latest videos from channel
3. Get video details (duration, stats)

