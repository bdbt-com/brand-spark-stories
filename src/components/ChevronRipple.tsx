import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface ChevronRippleProps {
  to: string;
  label: string;
  color?: "primary" | "accent" | "white";
  size?: "sm" | "md";
  showLabel?: boolean;
}

const colorClasses: Record<NonNullable<ChevronRippleProps["color"]>, {
  ring: string;
  inner: string;
  text: string;
}> = {
  primary: { ring: "border-primary/30", inner: "bg-primary/10 border-primary/30", text: "text-primary" },
  accent: { ring: "border-accent-light/40", inner: "bg-accent-light/10 border-accent-light/40", text: "text-accent-light" },
  white: { ring: "border-white/30", inner: "bg-white/10 border-white/30", text: "text-white" },
};

export default function ChevronRipple({ to, label, color = "primary", size = "md", showLabel = true }: ChevronRippleProps) {
  const c = colorClasses[color];
  const sizeClass = size === "sm" ? "w-12 h-12" : "w-14 h-14";
  const iconSizeClass = size === "sm" ? "w-4 h-4" : "w-6 h-6";
  return (
    <div className="flex flex-col items-center">
      <Link to={to} aria-label={label} className="group">
        <div className={`relative ${sizeClass}`}>
          <div className={`absolute inset-0 rounded-full ${c.ring} animate-ping`} style={{ animationDuration: "2s", animationIterationCount: "infinite" }} />
          <div className="absolute inset-0" style={{ margin: "2px" }}>
            <div className={`absolute inset-0 rounded-full ${c.ring} animate-ping`} style={{ animationDuration: "2s", animationDelay: "0.6s", animationIterationCount: "infinite" }} />
          </div>
          <div className="absolute inset-0" style={{ margin: "4px" }}>
            <div className={`absolute inset-0 rounded-full ${c.ring} animate-ping`} style={{ animationDuration: "2s", animationDelay: "1.2s", animationIterationCount: "infinite" }} />
          </div>
          <div className={`absolute inset-0 ${c.inner} rounded-full animate-pulse`} style={{ animationDuration: "3s" }} />
          <div className={`relative ${sizeClass} rounded-full backdrop-blur border ${c.inner.split(" ").pop()} flex items-center justify-center hover-scale`}>
            <ChevronDown className={`${iconSizeClass} ${c.text} transition-transform group-hover:translate-y-0.5`} />
          </div>
        </div>
      </Link>
      {showLabel && (
        <span className="mt-2 text-sm font-medium text-foreground/80 text-center">{label}</span>
      )}
    </div>
  );
}
