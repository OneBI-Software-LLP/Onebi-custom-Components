"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = ({ children }: any) => {
  return <>{children}</>;
}

const TooltipContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

const Tooltip = ({ children, delayDuration = 200, ...props }: any) => {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const handleSetOpen = React.useCallback(
    (newOpen: boolean) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (newOpen) {
        timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
      } else {
        setOpen(false);
      }
    },
    [delayDuration]
  );
  
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, []);

  return (
    <TooltipContext.Provider value={{ open, setOpen: handleSetOpen }}>
      <div className="relative inline-block" {...props}>
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ className, onMouseEnter, onMouseLeave, onFocus, onBlur, asChild, ...props }, ref) => {
    const { setOpen } = React.useContext(TooltipContext);
    
    const handleMouseEnter = (e: any) => { setOpen(true); if (onMouseEnter) onMouseEnter(e); };
    const handleMouseLeave = (e: any) => { setOpen(false); if (onMouseLeave) onMouseLeave(e); };
    const handleFocus = (e: any) => { setOpen(true); if (onFocus) onFocus(e); };
    const handleBlur = (e: any) => { setOpen(false); if (onBlur) onBlur(e); };

    if (asChild) {
       const child = React.Children.only(props.children) as React.ReactElement;
       return React.cloneElement(child, {
         ref,
         onMouseEnter: handleMouseEnter,
         onMouseLeave: handleMouseLeave,
         onFocus: handleFocus,
         onBlur: handleBlur,
         className: cn(child.props.className, className)
       } as any);
    }

    return (
      <button 
        ref={ref} 
        type="button" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className} 
        {...props} 
      />
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { sideOffset?: number, side?: "top" | "bottom" | "left" | "right" }>(
  ({ className, sideOffset = 4, side = "top", ...props }, ref) => {
    const { open } = React.useContext(TooltipContext);
    
    if (!open) return null;
    
    let positionClass = "";
    const style: React.CSSProperties = {};

    if (side === "top") {
      positionClass = "bottom-full left-1/2 -translate-x-1/2";
      style.marginBottom = sideOffset;
    } else if (side === "bottom") {
      positionClass = "top-full left-1/2 -translate-x-1/2";
      style.marginTop = sideOffset;
    } else if (side === "left") {
      positionClass = "right-full top-1/2 -translate-y-1/2";
      style.marginRight = sideOffset;
    } else if (side === "right") {
      positionClass = "left-full top-1/2 -translate-y-1/2";
      style.marginLeft = sideOffset;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 pointer-events-none whitespace-nowrap",
          positionClass,
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
