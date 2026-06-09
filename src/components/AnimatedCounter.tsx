import { memo, useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  format?: (n: number) => string;
  /** Animation duration in ms (default 520) */
  duration?: number;
}

const DIGITS = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const Reel = ({
  digit,
  duration,
  delay,
}: {
  digit: number;
  duration: number;
  delay: number;
}) => {
  // Stepped, odometer-like roll. steps(20, end) chunks the linear translate
  // into 20 discrete frames so digits flick past mechanically instead of gliding.
  const easing = prefersReducedMotion ? "linear" : "steps(20, end)";
  const dur = prefersReducedMotion ? 0 : duration;
  return (
    <span
      style={{
        position: "relative",
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
          transition: `transform ${dur}ms ${easing} ${delay}ms`,
          willChange: "transform",
        }}
      >
        {DIGITS.map((d) => (
          <span
            key={d}
            style={{ display: "block", height: "1em", lineHeight: "1em" }}
          >
            {d}
          </span>
        ))}
      </span>
      {/* faint baseline divider — split-flap hint */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "50%",
          height: "1px",
          background: "hsl(var(--border) / 0.35)",
          pointerEvents: "none",
        }}
      />
    </span>
  );
};

const AnimatedCounterImpl = ({
  value,
  className,
  format,
  duration = 520,
}: AnimatedCounterProps) => {
  const safe = Number.isFinite(value) ? value : 0;
  const text = format ? format(safe) : Math.round(safe).toLocaleString();

  // Count digit positions so we can stagger the roll left → right
  let digitIndex = 0;
  const digitCount = (text.match(/\d/g) || []).length;

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "baseline", lineHeight: "1em" }}
    >
      {text.split("").map((ch, i) => {
        if (/\d/.test(ch)) {
          // Earlier (more significant) digits start slightly later so the roll
          // visually cascades from right to left like a tally counter settling.
          const delay = (digitCount - 1 - digitIndex) * 28;
          digitIndex += 1;
          return (
            <Reel
              key={i}
              digit={parseInt(ch, 10)}
              duration={duration}
              delay={delay}
            />
          );
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

export const AnimatedCounter = memo(
  AnimatedCounterImpl,
  (a, b) =>
    a.value === b.value &&
    a.className === b.className &&
    a.duration === b.duration &&
    a.format === b.format
);

export default AnimatedCounter;
