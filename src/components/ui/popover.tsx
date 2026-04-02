"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const PopoverContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

const Popover = ({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: any) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      if (onOpenChange) {
        onOpenChange(newOpen);
      }
    },
    [isControlled, onOpenChange]
  );
  
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ className, onClick, asChild, ...props }, ref) => {
    const { open, setOpen } = React.useContext(PopoverContext);
    
    const handleClick = (e: any) => {
      setOpen(!open);
      if (onClick) onClick(e);
    };

    if (asChild) {
       const child = React.Children.only(props.children) as React.ReactElement;
       return React.cloneElement(child, {
         ref,
         onClick: (e: any) => {
           handleClick(e);
           if (child.props.onClick) child.props.onClick(e);
         },
         className: cn(child.props.className, className)
       } as any);
    }

    return (
      <button ref={ref} type="button" onClick={handleClick} className={className} {...props} />
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end", sideOffset?: number }>(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    const { open } = React.useContext(PopoverContext);
    
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-80",
          align === "center" ? "left-1/2 -translate-x-1/2" : align === "end" ? "right-0" : "left-0",
          "top-full",
          className
        )}
        style={{ marginTop: sideOffset }}
        {...props}
      />
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
