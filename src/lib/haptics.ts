// Site-wide haptic feedback on tap.
// Works on Android browsers that support the Vibration API.
// iOS Safari does NOT support navigator.vibrate — no-op there.

let initialised = false;

function isInteractive(el: Element | null): boolean {
  if (!el) return false;
  const target = (el as HTMLElement).closest(
    'button, a, [role="button"], [data-haptic], input[type="button"], input[type="submit"], summary, label'
  );
  if (!target) return false;
  if (target.hasAttribute('disabled')) return false;
  if (target.getAttribute('aria-disabled') === 'true') return false;
  return true;
}

function buzz() {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(10);
    }
  } catch {
    // ignore
  }
}

export function initHaptics() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;

  const handler = (e: Event) => {
    if (isInteractive(e.target as Element)) buzz();
  };

  // pointerdown gives snappy feedback on touch + mouse + pen
  window.addEventListener('pointerdown', handler, { passive: true, capture: true });
}
