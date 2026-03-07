

# Shrink mobile videos 10% + add rotating carousel

## Changes in `src/pages/LinkInBio.tsx`

### 1. Shrink mobile cards and play buttons by 10%
- Card width: `w-[40vw]` → `w-[36vw]` (40 × 0.9 = 36)
- Play button circle: `w-7 h-7` → `w-6 h-6` (mobile only)
- Play icon: `w-3.5 h-3.5` → `w-3 h-3` (mobile only)
- Desktop sizes unchanged

### 2. Auto-rotating carousel (mobile only)
Add a `displayOrder` state that rotates the 3 episodes array every 4 seconds, shifting items clockwise (index 0→2, 1→0, 2→1). Use `setInterval` in a `useEffect`, paused when a video is playing.

The mobile container will render `podcastEpisodes` in the rotated order with a CSS transition for smooth movement. Desktop grid remains static and unchanged.

Implementation:
- New state: `const [rotationIndex, setRotationIndex] = useState(0)`
- New effect with 4s interval incrementing `rotationIndex`
- Derive display order: `episodes = [podcastEpisodes[(0+rot)%3], (1+rot)%3, (2+rot)%3]`
- Add `transition-all duration-700` for smooth reordering

