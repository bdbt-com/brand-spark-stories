## Hero Polish + Premium "Browse Courses" CTA

### 1. Centre the hero text
In `src/pages/Home.tsx`, the left column currently left-aligns. Add `text-center` to the `<div className="animate-fade-in">` wrapper (and `mx-auto` on the paragraph) so the H1's two lines and the supporting paragraph all centre within their column — no line hugs the left margin.

### 2. Remove the Foundation Blueprint button
In the CTA section directly below the hero, delete the `Start With The Free Foundation Blueprint` button. Reasoning recorded by the user: visitors get the Blueprint automatically on waitlist signup, so it's redundant here.

### 3. Make "Browse Courses" the hero CTA (premium treatment)
Move the single remaining button up into the hero itself (centred under the supporting paragraph) so it is guaranteed visible above the fold on both mobile and desktop. Delete the now-empty CTA section.

Visual treatment — restrained, on-brand, no gimmicks:
- Gold gradient fill using existing tokens (`from-primary via-[hsl(35_45%_75%)] to-primary`) on solid black text for high contrast.
- Subtle inner highlight (top edge `bg-white/20` overlay) for a silky, polished surface.
- Soft outer glow that intensifies on hover (`shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_10px_40px_-10px_hsl(var(--primary)/0.45)]` → stronger on hover).
- A slow, looping shimmer sweep across the surface (one diagonal light bar, ~3.5s ease, low opacity ~25%) implemented with a Tailwind keyframe added to `tailwind.config.ts` — quiet, not flashy.
- Micro-interactions: `hover:-translate-y-0.5`, `active:translate-y-0`, `transition-all duration-300 ease-out`.
- Size: `h-14 md:h-16`, `px-10 md:px-12`, `text-lg md:text-xl`, `rounded-2xl`, `font-semibold tracking-tight`.
- Trailing `ArrowRight` icon that nudges `group-hover:translate-x-1`.
- Width: auto on desktop (content-hugging, centred), full-width on mobile so the tap target stays generous.

The chevron, carousel and rest of the page stay as-is.

### Technical notes
- File touched: `src/pages/Home.tsx` + a single `keyframes`/`animation` addition in `tailwind.config.ts` (`shimmer-sweep`).
- No new dependencies; no MagicUI import needed — the shimmer is a 20-line CSS keyframe so the bundle stays lean.
- Markup keeps `<Link to="/courses">` so routing/analytics are unchanged.
