import { forwardRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Brand rules live in BRAND.md. Gold marks the Daily Win; headlines are condensed upper case.

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-md min-h-[3.25rem] px-6 py-3 text-center " +
  "font-display uppercase font-extrabold text-[1.05rem] leading-none tracking-[0.02em] " +
  "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60";

const goldClasses = btnBase + " bg-gold text-black hover:bg-[#d3b17c] active:bg-[#b48d55]";
const outlineClasses = btnBase + " border border-white/30 text-white hover:border-gold hover:text-gold";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  /** Kept so older call sites compile. Buttons no longer carry an arrow. */
  arrow?: boolean;
  children: ReactNode;
}

const make = (base: string) =>
  forwardRef<HTMLButtonElement, BtnProps>(({ to, href, arrow: _arrow, className, children, ...rest }, ref) => {
    if (to) return <Link to={to} className={cn(base, className)}>{children}</Link>;
    if (href)
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, className)}>
          {children}
        </a>
      );
    return (
      <button ref={ref} className={cn(base, className)} {...rest}>
        {children}
      </button>
    );
  });

export const GoldButton = make(goldClasses);
export const OutlineButton = make(outlineClasses);

export const Section = ({ id, className, children, narrow }: { id?: string; className?: string; children: ReactNode; narrow?: boolean }) => (
  <section id={id} className={cn("py-16 md:py-28 scroll-mt-20", className)}>
    <div className={cn("mx-auto px-5 sm:px-6 lg:px-8", narrow ? "max-w-3xl" : "max-w-6xl")}>{children}</div>
  </section>
);

export const Title = ({ children, className, as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) => (
  <Tag className={cn("font-display uppercase font-extrabold text-white text-[2.5rem] md:text-6xl leading-[0.95] tracking-[-0.005em] max-w-[18ch] [text-wrap:balance]", className)}>{children}</Tag>
);

/** One or two lines under a headline. */
export const Lead = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("mt-6 text-lg md:text-xl leading-relaxed text-white/75 max-w-[58ch]", className)}>{children}</p>
);

/** Small label. Sentence case, used only where a section needs naming. */
export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("text-sm font-semibold text-gold mb-3", className)}>{children}</p>
);

export const Prose = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("space-y-5 text-base md:text-lg text-white/80 leading-relaxed max-w-[62ch]", className)}>{children}</div>
);

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("rounded-lg border border-white/10 bg-coal p-6 md:p-8", className)}>{children}</div>
);

// Review notes mark drafts and missing content for Ben. They only show in preview builds
// (VITE_REVIEW_NOTES or VITE_HASH_ROUTER) and never on the live site.
export const SHOW_NOTES = Boolean(import.meta.env.VITE_REVIEW_NOTES || import.meta.env.VITE_HASH_ROUTER);
export const Note = ({ kind = "draft", children, className }: { kind?: "draft" | "needed"; children: ReactNode; className?: string }) =>
  SHOW_NOTES ? (
    <div className={cn("flex w-fit max-w-md items-start gap-2 rounded-md border-2 border-dashed px-3 py-2 my-3 text-left text-[13px] font-semibold not-italic normal-case tracking-normal leading-snug font-sans",
      kind === "draft" ? "border-[#38E1FF] bg-[#06242b] text-[#9BF0FF]" : "border-[#FF5DA2] bg-[#2b0718] text-[#FFB3D3]", className)}>
      <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-black", kind === "draft" ? "bg-[#38E1FF]" : "bg-[#FF5DA2]")}>{kind === "draft" ? "Draft" : "Needed"}</span>
      <span>{children}</span>
    </div>
  ) : null;
