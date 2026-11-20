import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Runs `fn` on scroll and resize, at most once per frame. */
const useScrollFrame = (fn: () => void) => {
  useEffect(() => {
    let raf = 0;
    const tick = () => { raf = 0; fn(); };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    fn();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const pageProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
};

const useInView = <T extends Element>(threshold = 0.35) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
};

/** Fixed backdrop that moves from a cool, flat tone at the top of the page to warm gold at the bottom. */
export const ScrollAtmosphere = () => {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFrame(() => ref.current?.style.setProperty("--p", pageProgress().toFixed(4)));
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ "--p": 0 } as CSSProperties}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(90% 60% at 12% 8%, rgba(72,98,135,0.26), transparent 70%)", opacity: "calc(1 - var(--p) * 1.5)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(110% 75% at 88% 92%, hsl(42 55% 62% / 0.24), transparent 70%)", opacity: "calc(var(--p) * 1.35)" }} />
      <div
        className="absolute -right-40 top-[-10vh] h-[46vh] w-[46vh] rounded-full blur-3xl motion-reduce:hidden"
        style={{ background: "hsl(42 55% 62% / 0.16)", transform: "translate3d(calc(var(--p) * -55vw), calc(var(--p) * 80vh), 0)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent)", WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent)" }}
      />
    </div>
  );
};

/** Gold line down the left edge that fills as you scroll, with a dot per section. Desktop only. */
export const LongGameLine = ({ sections }: { sections: { id: string; label: string }[] }) => {
  const fill = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  useScrollFrame(() => {
    if (fill.current) fill.current.style.transform = `scaleY(${pageProgress().toFixed(4)})`;
    const mid = window.innerHeight * 0.5;
    let idx = -1;
    sections.forEach((s, i) => { const el = document.getElementById(s.id); if (el && el.getBoundingClientRect().top < mid) idx = i; });
    setActive((a) => (a === idx ? a : idx));
  });
  return (
    <nav aria-label="Page sections" className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30 h-[56vh] w-4">
      <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-px bg-white/15" />
      <div ref={fill} className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-px bg-primary origin-top" style={{ transform: "scaleY(0)" }} />
      {sections.map((s, i) => (
        <button
          key={s.id}
          type="button"
          aria-label={`Go to ${s.label}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" })}
          className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center focus-visible:outline-none"
          style={{ top: `${(i / (sections.length - 1)) * 100}%` }}
        >
          <span className={cn("block rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white", i <= active ? "h-2.5 w-2.5 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.8)]" : "h-1.5 w-1.5 bg-white/35 group-hover:bg-white")} />
          <span className={cn("pointer-events-none absolute left-6 whitespace-nowrap text-xs font-semibold tracking-wide transition-opacity", i === active ? "text-primary opacity-100" : "text-white/80 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")}>{s.label}</span>
        </button>
      ))}
    </nav>
  );
};

/** Counts up to `value` the first time it scrolls into view. */
export const CountUp = ({ value, suffix = "", duration = 1300 }: { value: number; suffix?: string; duration?: number }) => {
  const [ref, inView] = useInView<HTMLSpanElement>(0.6);
  const [n, setN] = useState(() => (reducedMotion() ? value : 0));
  useEffect(() => {
    if (!inView || reducedMotion()) { if (inView) setN(value); return; }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
};

/** Dim until scrolled into view, then lights up. Stays readable while dim. */
export const LightUp = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.5);
  return (
    <div
      ref={ref}
      className={cn("transition-[opacity,transform,filter] duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0", inView ? "opacity-100 translate-y-0" : "opacity-35 translate-y-2", className)}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

/** Two lines that start together and pull apart as you scroll: Daily Wins rising, Daily Drifts falling. */
export const CompoundCurve = () => {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = reducedMotion() ? 1 : Math.min(1, Math.max(0, (vh * 0.92 - r.top) / (vh * 0.62)));
    el.style.setProperty("--draw", (1 - p).toFixed(4));
    el.style.setProperty("--end", p > 0.96 ? "1" : "0");
  });
  const line: CSSProperties = { strokeDasharray: 1, strokeDashoffset: "var(--draw)" as unknown as number };
  const end: CSSProperties = { opacity: "var(--end)" as unknown as number, transition: "opacity 400ms ease-out" };
  return (
    <div ref={ref} className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-4 md:p-6" style={{ "--draw": 1, "--end": 0 } as CSSProperties}>
      <svg viewBox="0 0 600 300" role="img" aria-label="Chart: Daily Wins and Daily Drifts start at the same point today and move further apart every year." className="w-full h-auto">
        {[75, 150, 225].map((y) => <line key={y} x1="40" x2="570" y1={y} y2={y} stroke="#ffffff" strokeOpacity={y === 150 ? 0.22 : 0.07} strokeDasharray={y === 150 ? "4 6" : undefined} />)}
        <path d="M40,150 C250,146 430,118 560,24" fill="none" stroke="hsl(42 55% 62%)" strokeWidth="4" strokeLinecap="round" pathLength={1} style={line} />
        <path d="M40,150 C250,154 430,182 560,276" fill="none" stroke="#8a8a8a" strokeWidth="4" strokeLinecap="round" pathLength={1} style={line} />
        <circle cx="40" cy="150" r="6" fill="#ffffff" />
        <g style={end}>
          <circle cx="560" cy="24" r="7" fill="hsl(42 55% 62%)" />
          <circle cx="560" cy="276" r="7" fill="#8a8a8a" />
          <text x="548" y="52" textAnchor="end" fill="hsl(42 55% 62%)" fontSize="19" fontWeight="700">Daily Wins</text>
          <text x="548" y="258" textAnchor="end" fill="#b5b5b5" fontSize="19" fontWeight="700">Daily Drifts</text>
        </g>
        <text x="40" y="180" fill="#ffffff" fillOpacity="0.7" fontSize="15" fontWeight="600">Today</text>
        <text x="570" y="296" textAnchor="end" fill="#ffffff" fillOpacity="0.5" fontSize="14">Years from now</text>
      </svg>
    </div>
  );
};

/** Keeps the lead lines visible and tucks the rest of Ben's copy behind a toggle. */
export const ReadMore = ({ children, label = "Read more" }: { children: ReactNode; label?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && children}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 text-primary text-base font-semibold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
      >
        {open ? "Show less" : label}
        <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </button>
    </>
  );
};

/** Phone-only bar that keeps the test one tap away once you've scrolled past the hero. */
export const StickyTestBar = () => {
  const [show, setShow] = useState(false);
  useScrollFrame(() => {
    const y = window.scrollY;
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 500;
    const next = y > 640 && !nearEnd;
    setShow((s) => (s === next ? s : next));
  });
  return (
    <div
      className={cn("md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-primary/30 bg-black/90 backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none", show ? "translate-y-0" : "translate-y-full")}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-hidden={!show}
    >
      <Link to="/test" tabIndex={show ? 0 : -1} className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm text-white/85 leading-tight"><span className="block font-semibold text-white">Free Daily Wins Test</span>28 questions. No pass or fail.</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-black">Start <ArrowRight className="w-4 h-4" /></span>
      </Link>
    </div>
  );
};
