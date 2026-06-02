import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const AnimatedCounter = ({
  value,
  duration = 600,
  className,
  format,
}: AnimatedCounterProps) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === display) return;
    const start = performance.now();
    const from = fromRef.current;
    const to = value;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(from + (to - from) * eased);
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = display;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span className={className}>{format ? format(display) : display.toLocaleString()}</span>;
};

export default AnimatedCounter;
