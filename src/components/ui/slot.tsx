import * as React from "react";
import { cn } from "@/lib/utils";

export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ...children.props,
        style: {
          ...props.style,
          ...(children.props as any).style,
        },
        className: cn(props.className, (children.props as any).className),
        ref: (node: HTMLElement) => {
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
          
          const childRef = (children as any).ref;
          if (typeof childRef === "function") childRef(node);
          else if (childRef) childRef.current = node;
        }
      } as any);
    }
    if (React.Children.count(children) > 1) {
       React.Children.only(null);       
    }
    return null;
  }
);
Slot.displayName = "Slot";
