"use client"

import * as React from "react"
import { useState, useRef, useEffect, ReactNode, useId } from 'react';
import { cn } from "@/lib/utils"

export interface CustomTooltipProps {
  /** The element that triggers the tooltip (usually a button or icon) */
  children: React.ReactNode;
  /** The content displayed inside the tooltip */
  content?: ReactNode;
  /** Where the tooltip should appear relative to the trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** The visual theme */
  theme?: 'dark' | 'light';
  /** How the tooltip is triggered */
  trigger?: 'hover' | 'click';
  /** Delay in milliseconds before the tooltip appears (hover only) */
  delay?: number;
  /** Whether to show the directional arrow */
  showArrow?: boolean;
  /** Custom classes for the tooltip container */
  className?: string;
}

const placementStyles = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const themeStyles = {
  dark: 'bg-slate-900 text-slate-50',
  light: 'bg-white text-slate-900 border border-slate-200 shadow-xl',
};

const arrowPlacements = {
  top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b border-inherit',
  bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l border-inherit',
  left: 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r border-inherit',
  right: 'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l border-inherit',
};

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  content,
  placement = 'top',
  theme = 'dark',
  trigger = 'hover',
  delay = 200,
  showArrow = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  const handleShow = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const handleHide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (trigger === 'click') {
      e.stopPropagation();
      setIsVisible(!isVisible);
    }
  };

  // Close on outside click if trigger is 'click'
  useEffect(() => {
    if (trigger !== 'click') return;
    
    const handleOutsideClick = () => setIsVisible(false);
    if (isVisible) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isVisible, trigger]);

  return (
    <div
      className="relative w-fit inline-flex"
      onMouseEnter={trigger === 'hover' ? handleShow : undefined}
      onMouseLeave={trigger === 'hover' ? handleHide : undefined}
      onFocus={trigger === 'hover' ? handleShow : undefined}
      onBlur={trigger === 'hover' ? handleHide : undefined}
      onClick={handleClick}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}

      {isVisible && content && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shadow-lg animate-in fade-in zoom-in-95 duration-150 pointer-events-none",
            placementStyles[placement],
            themeStyles[theme],
            className
          )}
        >
          {content}
          
          {showArrow && (
            <div
              className={cn(
                "absolute w-2 h-2 rotate-45 z-[-1] bg-inherit",
                arrowPlacements[placement]
              )}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
};

const TooltipProvider = ({ children }: any) => {
  return <>{children}</>;
}

const TooltipContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

const Tooltip = ({ children, delayDuration = 200, content, placement, theme, trigger, delay, showArrow, ...props }: any) => {
  if (content !== undefined) {
    return (
      <CustomTooltip
        content={content}
        placement={placement}
        theme={theme}
        trigger={trigger}
        delay={delay || delayDuration}
        showArrow={showArrow}
        {...props}
      >
        {children}
      </CustomTooltip>
    );
  }

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
export default CustomTooltip;
