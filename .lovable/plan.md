Fix the homepage carousel properly by changing only the photo centring/cropping behaviour.

Plan:
1. Revert the carousel image rendering from `object-contain` back to `object-cover` so there are no grey/letterbox edges.
2. Remove the added dark/grey inner background from the image frame.
3. Add a per-image focal-position map for the carousel images in `src/pages/Home.tsx`, so each image can use its own `object-position` instead of one global crop.
4. Apply those focal positions to the `<img>` class/style during the carousel `.map(...)`, covering both mobile and desktop because `object-position` works at both sizes.
5. Set the likely problem images to positions that keep the person visible, for example top/upper-centre for head/face shots, centre/lower-centre for full-body shots, and shifted left/right where the person is off-screen.

Technical detail:
- Use `object-cover`, not `object-contain`.
- Use inline `style={{ objectPosition: ... }}` or matching Tailwind arbitrary classes per image.
- Keep the existing carousel, image list, aspect ratios, autoplay, and surrounding homepage content unchanged.