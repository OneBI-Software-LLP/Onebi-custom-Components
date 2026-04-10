"use client";

import * as React from "react";
import "./toast.css";

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type ToastVariant = "default" | "success" | "danger" | "warning";
export type ToastPosition = 
  | "top-right" 
  | "top-left" 
  | "bottom-right" 
  | "bottom-left" 
  | "top-center" 
  | "bottom-center";

export interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  position?: ToastPosition;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────
//  COMPONENTS
// ─────────────────────────────────────────────────────────────

/**
 * Toast - Individual toast message component.
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, variant = "default", onClose, className = "", children, ...props }, ref) => {
    const [isClosing, setIsClosing] = React.useState(false);

    const handleClose = React.useCallback(() => {
      setIsClosing(true);
      setTimeout(() => {
        onClose?.();
      }, 200); // Match CSS transition/animation time
    }, [onClose]);

    return (
      <div
        ref={ref}
        className={`toast toast--${variant} ${isClosing ? "toast--closing" : ""} ${className}`.trim()}
        role="status"
        aria-live="polite"
        {...props}
      >
        <div className="toast-content">
          {title && <h3 className="toast-title">{title}</h3>}
          {description && <div className="toast-description">{description}</div>}
          {children}
        </div>
        <button
          type="button"
          className="toast-close"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    );
  }
);

Toast.displayName = "Toast";

/**
 * ToastViewport - Container for multiple toasts.
 */
export const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { position?: ToastPosition }>(
  ({ className = "", position = "bottom-right", style, ...props }, ref) => {
    // Positioning map for inline styles
    const positionStyles: Record<ToastPosition, React.CSSProperties> = {
      "top-left": { top: 0, left: 0 },
      "top-right": { top: 0, right: 0 },
      "bottom-left": { bottom: 0, left: 0 },
      "bottom-right": { bottom: 0, right: 0 },
      "top-center": { top: 0, left: "50%", transform: "translateX(-50%)" },
      "bottom-center": { bottom: 0, left: "50%", transform: "translateX(-50%)" },
    };

    return (
      <div
        ref={ref}
        className={`onebi-toast-viewport onebi-toast-viewport--${position} ${className}`.trim()}
        style={{ 
          ...positionStyles[position], 
          ...style 
        }}
        {...props}
      />
    );
  }
);

ToastViewport.displayName = "ToastViewport";
