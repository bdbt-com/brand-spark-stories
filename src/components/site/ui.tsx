import { forwardRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const goldClasses =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl min-h-14 py-3 px-6 md:px-8 text-center leading-tight text-base md:text-lg font-semibold tracking-tight text-black " +
  "bg-gradient-to-r from-primary via-[hsl(35_45%_78%)] to-primary bg-[length:200%_100%] bg-[position:0%_50%] " +
  "transition-[background-position,transform,box-shadow] duration-500 ease-out hover:bg-[position:100%_50%] hover:-translate-y-0.5 " +
  "shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_10px_30px_-12px_hsl(var(--primary)/0.45)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.5),0_18px_45px_-12px_hsl(var(--primary)/0.65)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60";

const outlineClasses =
  "group inline-flex items-center justify-center gap-2 rounded-2xl min-h-14 py-3 px-6 md:px-8 text-center leading-tight text-base md:text-lg font-semibold tracking-tight " +
  "border border-primary/60 text-primary hover:bg-primary/10 hover:border-primary transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  arrow?: boolean;
  children: ReactNode;
}

const make = (base: string, shine: boolean) =>
  forwardRef<HTMLButtonElement, BtnProps>(({ to, href, arrow, className, children, ...rest }, ref) => {
    const inner = (
      <>
        {shine && (
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent" />
        )}
        <span className="relative inline-flex items-center justify-center gap-2">{children}</span>
        {arrow && <ArrowRight className="relative w-5 h-5 transition-transform group-hover:translate-x-1" />}
      </>
    );
    if (to) return <Link to={to} className={cn(base, className)}>{inner}</Link>;
    if (href)
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, className)}>
          {inner}
        </a>
      );
    return (
      <button ref={ref} className={cn(base, className)} {...rest}>
        {inner}
      </button>
    );
  });

export const GoldButton = make(goldClasses, true);
export const OutlineButton = make(outlineClasses, false);

export const Section = ({ id, className, children, narrow }: { id?: string; className?: string; children: ReactNode; narrow?: boolean }) => (
  <section id={id} className={cn("py-16 md:py-24 scroll-mt-20", className)}>
    <div className={cn("mx-auto px-5 sm:px-6 lg:px-8", narrow ? "max-w-3xl" : "max-w-6xl")}>{children}</div>
  </section>
);

export const Title = ({ children, className, as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) => (
  <Tag className={cn("font-display italic font-extrabold text-primary text-3xl md:text-[2.75rem] leading-[1.08] tracking-[-0.02em] [text-wrap:balance]", className)}>{children}</Tag>
);

export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("flex items-center gap-3 text-[11px] md:text-xs uppercase tracking-[0.24em] text-primary font-semibold mb-4 before:content-[''] before:h-px before:w-8 before:bg-primary/60", className)}>{children}</p>
);

export const Prose = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("space-y-5 text-base md:text-lg text-white/85 leading-relaxed", className)}>{children}</div>
);

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("rounded-2xl border border-white/10 bg-[#121212] p-6 md:p-8", className)}>{children}</div>
);
