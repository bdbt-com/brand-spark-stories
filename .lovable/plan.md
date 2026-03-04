

## Fix: Make Chevron Button Scroll to Podcast Section

The chevron button at the bottom of the hero section currently scrolls to "How BDBT Works." The user wants it to scroll to the podcast episodes section instead.

### Changes

**`src/pages/Home.tsx`**:
1. Add a new ref: `const podcastRef = useRef<HTMLDivElement>(null);`
2. Attach it to the podcast `<section>` at line 220
3. Update the chevron button's `onClick` (line 210) to scroll to `podcastRef` instead of `handleScrollToHow`
4. Update the `aria-label` to "Scroll to Top Podcast Episodes"

One small change, two lines touched.

