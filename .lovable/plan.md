

## /bio Page Redesign — MacBook Air Midnight Aesthetic

### Vision
Transform the /bio page from the current blue (#36455A) flat design into a dark, premium aesthetic inspired by the MacBook Air Midnight finish — deep charcoal greys, subtle gradients, ultra-refined button feel, and smooth carousel animations that start immediately on load.

### Design Direction
- **Background**: Replace #36455A with a deep charcoal gradient (#1a1a1e → #111114 → #0d0d0f) — the "Space Black/Midnight" look
- **Buttons**: Subtle raised surface with micro-border highlights, gentle press animation (scale 0.98 + darken on active), rounded-2xl, no harsh outlines — like MacBook keyboard keys
- **Cards**: Frosted glass with very low opacity borders (white/5%), subtle inner glow
- **Typography**: Slightly more letter-spacing on labels, thinner font weights where appropriate
- **Carousel**: Start cycling immediately on mount (remove 4s initial delay → begin after 1.5s), smoother easing curve, subtle opacity/scale transitions on non-active cards
- **Profile ring**: Subtle gradient border instead of flat white/20

### Technical Changes — `src/pages/LinkInBio.tsx` only

**1. Background & container (line 349)**
- Replace `bg-[#36455A]` with `bg-[#1a1a1e]`
- Replace gradient overlay from blue tones to `from-[#1a1a1e] via-[#141416] to-[#0d0d0f]`

**2. Profile photo ring (line 356)**
- Replace `border-2 border-white/20` with a gradient border using a wrapper div with `bg-gradient-to-br from-white/20 to-white/5 p-[1.5px] rounded-full`

**3. Link buttons (lines 401-426)**
- Replace `bg-black/40 border-white/10 hover:bg-black/50` with `bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.07]`
- Add `active:scale-[0.98] active:bg-white/[0.03]` for the keyboard-press feel
- Increase border radius to `rounded-2xl`
- Add subtle backdrop blur: `backdrop-blur-xl`

**4. Video cards — desktop & mobile (lines 470, 543)**
- Replace `bg-[#212121]` with `bg-white/[0.04] backdrop-blur-sm border border-white/[0.05]`
- Desktop play button: replace `bg-white/90` with `bg-white/10 backdrop-blur-md border border-white/10` and white icon

**5. Carousel animation improvements (lines 133, 149, 531)**
- Reduce initial autoplay delay from 4000ms to 1500ms for immediate feel
- Adjust auto-scroll transition from `4s ease-in-out` to `1.2s cubic-bezier(0.4, 0, 0.2, 1)` for smoother, faster cycling
- Add opacity/scale treatment: active card at full opacity+scale, adjacent cards at 0.7 opacity and scale-95

**6. "Picked For You" label (line 461)**
- Add more letter-spacing (`tracking-[0.2em]`) and use `text-white/30` for subtlety

**7. Social icons (line 388)**
- Refine hover: `hover:text-white/90` with a subtle glow effect via `hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]`

**8. Footer (line 584)**
- Lighten to `text-white/20` for minimal presence

### Files
- `src/pages/LinkInBio.tsx` — single file, styling + animation timing changes only. No logic or routing changes.

