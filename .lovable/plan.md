# Site-wide haptic feedback on button taps

## New file: `src/lib/haptics.ts`
Registers one global `pointerdown` listener. Fires `navigator.vibrate(10)` whenever the user taps anything that resolves to a `<button>`, `<a>`, `[role="button"]`, or `[data-haptic]` and isn't disabled. Silently no-ops where the Vibration API is unsupported.

## `src/main.tsx`
Import and call `initHaptics()` once at startup.

## Compatibility caveat
- **Works:** Android Chrome / Edge / Samsung Internet / Firefox.
- **Does NOT work:** iOS Safari and all iOS browsers — Apple has never shipped the Vibration API on the web. There is no JS-only workaround.
- To get real haptics on iPhone you'd need to wrap the site in Capacitor and use `@capacitor/haptics`. Out of scope for this change.
