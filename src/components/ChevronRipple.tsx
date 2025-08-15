import { Link } from "react-router-dom";
import { ChevronDown, ArrowDown } from "lucide-react";

interface ChevronRippleProps {
  to: string;
  label: string;
  color?: "primary" | "accent" | "white";
  size?: "sm" | "md";
  showLabel?: boolean;
  variant?: "ripple" | "minimal";
  onClick?: () => void;
}

const colorClasses: Record<NonNullable<ChevronRippleProps["color"]>, {
  ring: string;
  inner: string;
  text: string;
}> = {
  primary: { ring: "border-primary/30", inner: "bg-primary/10 border-primary/30", text: "text-primary" },
  accent: { ring: "border-accent-light/40", inner: "bg-accent-light/10 border-accent-light/40", text: "text-accent-light" },
  white: { ring: "border-white/30", inner: "bg-slate-200/40 border-white/30", text: "text-white" },
};

export default function ChevronRipple({ to, label, color = "primary", size = "md", showLabel = true, variant = "ripple", onClick }: ChevronRippleProps) {
  const c = colorClasses[color];
  const sizeClass = size === "sm" ? "w-14 h-14" : "w-16 h-16";
  const iconSizeClass = size === "sm" ? "w-5 h-5" : "w-7 h-7";
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior - navigate to the link
      window.location.href = to;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div onClick={handleClick} className="group cursor-pointer">
        <div className={`relative ${sizeClass}`}>
          {variant !== "minimal" && (
            <>
              <div className={`absolute inset-0 rounded-full ${c.ring} animate-ping`} style={{ animationDuration: "2s", animationIterationCount: "infinite" }} />
              <div className="absolute inset-0" style={{ margin: "2px" }}>
                <div className={`absolute inset-0 rounded-full ${c.ring} animate-ping`} style={{ animationDuration: "2s", animationDelay: "0.6s", animationIterationCount: "infinite" }} />
              </div>
              <div className="absolute inset-0" style={{ margin: "4px" }}>
                <div className={`absolute inset-0 rounded-full ${c.ring} animate-ping`} style={{ animationDuration: "2s", animationDelay: "1.2s", animationIterationCount: "infinite" }} />
              </div>
            </>
          )}
          {variant === "minimal" ? (
            <div className="absolute inset-0 bg-muted rounded-full shadow-soft" />
          ) : (
            <div className={`absolute inset-0 ${c.inner} rounded-full animate-pulse`} style={{ animationDuration: "3s" }} />
          )}
          <div className={(variant === "minimal" ? `relative ${sizeClass} rounded-full bg-muted border border-border shadow-soft` : `relative ${sizeClass} rounded-full backdrop-blur border ${c.inner.split(" ").pop()}`) + " flex items-center justify-center hover-scale"}>
            {variant === "minimal" ? (
              <ArrowDown className={`${iconSizeClass} text-foreground/80 transition-transform group-hover:translate-y-0.5`} />
            ) : (
              <ChevronDown className={`${iconSizeClass} ${c.text} transition-transform group-hover:translate-y-0.5`} />
            )}
          </div>
        </div>
      </div>
      {showLabel && (
        <span className={`mt-3 text-base font-semibold text-center max-w-32 min-h-[3rem] flex items-center justify-center ${
          color === "white" ? "text-white text-shadow-sm" : "text-foreground/80"
        }`} style={color === "white" ? { textShadow: "0 1px 3px rgba(0,0,0,0.5)" } : {}}>
          {label}
        </span>
      )}
    </div>
  );
}
