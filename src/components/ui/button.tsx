import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold tracking-tight ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-200 ease-smooth active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-glow shadow-sm hover:shadow-medium border border-primary/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-medium border border-destructive/20",
        outline: "border-2 border-border bg-background hover:bg-secondary hover:border-primary/30 text-foreground hover:text-primary shadow-xs hover:shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs hover:shadow-sm border border-secondary/50",
        ghost: "hover:bg-secondary hover:text-foreground text-muted-foreground hover:shadow-xs",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        hero: "bg-gradient-primary text-primary-foreground hover:shadow-accent transform hover:scale-[1.02] border border-primary/30 shadow-soft",
        accent: "bg-gradient-accent text-accent-foreground hover:shadow-glow transform hover:scale-[1.02] border border-accent/30 shadow-soft",
        premium: "bg-gradient-card text-foreground border-2 border-primary/20 hover:border-primary/40 hover:shadow-medium transform hover:scale-[1.02] shadow-xs",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-sm hover:shadow-medium border border-success/20",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm hover:shadow-medium border border-warning/20",
      },
      size: {
        xs: "h-8 px-3 text-xs rounded-md",
        sm: "h-9 px-4 text-sm rounded-lg",
        default: "h-10 px-6 py-2 rounded-lg",
        lg: "h-12 px-8 text-base rounded-xl",
        xl: "h-14 px-10 text-lg rounded-xl",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
