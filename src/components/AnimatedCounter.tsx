import { memo } from "react";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  format?: (n: number) => string;
  /** Animation duration in ms (default 600) */
  duration?: number;
}

const DIGITS = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

const Reel = ({ digit, duration }: { digit: number; duration: number }) => (
  <span
    style={{
      display: "inline-block",
      height: "1em",
      lineHeight: "1em",
      overflow: "hidden",
      verticalAlign: "bottom",
    }}
  >
    <span
      style={{
        display: "block",
        transform: `translateY(-${9 - digit}em)`,
        transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "transform",
      }}
    >
      {DIGITS.map((d) => (
        <span key={d} style={{ display: "block", height: "1em", lineHeight: "1em" }}>
          {d}
        </span>
      ))}
    </span>
  </span>
);

const AnimatedCounterImpl = ({ value, className, format, duration = 600 }: AnimatedCounterProps) => {
  const safe = Number.isFinite(value) ? value : 0;
  const text = format ? format(safe) : Math.round(safe).toLocaleString();
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "baseline", lineHeight: "1em" }}>
      {text.split("").map((ch, i) => {
        if (/\d/.test(ch)) {
          return <Reel key={i} digit={parseInt(ch, 10)} duration={duration} />;
        }
        return (
          <span key={i} style={{ display: "inline-block" }}>
            {ch}
          </span>
        );
      })}
    </span>
  );
};

export const AnimatedCounter = memo(AnimatedCounterImpl, (a, b) =>
  a.value === b.value && a.className === b.className && a.duration === b.duration && a.format === b.format
);

export default AnimatedCounter;
