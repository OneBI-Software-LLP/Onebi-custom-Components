import React, { useState, useEffect, useRef, useCallback, ReactNode, CSSProperties } from "react";
import { createPortal } from "react-dom";

// ─── Types ──────────────────────────────────────────────────────────────────
export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerVariant = "overlay" | "push" | "floating";
export type DrawerSize = "sm" | "md" | "lg" | "full" | number;
export type DrawerBackdrop = "dim" | "blur" | "none";

export interface DrawerHeaderProps {
  title?: ReactNode;
  description?: ReactNode;
  onClose?: () => void;
  showClose?: boolean;
  sticky?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface DrawerFooterProps {
  children?: ReactNode;
  sticky?: boolean;
  style?: CSSProperties;
  align?: "left" | "center" | "right" | "stretch";
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  variant?: DrawerVariant;
  size?: DrawerSize;
  backdrop?: DrawerBackdrop;
  borderRadius?: number;
  title?: ReactNode;
  description?: ReactNode;
  showClose?: boolean;
  showHandle?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  keepMounted?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  zIndex?: number;
  portalTarget?: HTMLElement | null;
  containerRef?: React.RefObject<any>;
  style?: CSSProperties;
  className?: string;
  onOpen?: () => void;
  onClosed?: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isVertical = (p: DrawerPlacement) => p === "top" || p === "bottom";

const SIZES: Record<string, string | number> = { sm: 240, md: 320, lg: 440, full: "100%" };

function getTranslate(placement: DrawerPlacement, open: boolean) {
  if (open) return "translate(0, 0)";
  return {
    right:  "translate(100%, 0)",
    left:   "translate(-100%, 0)",
    top:    "translate(0, -100%)",
    bottom: "translate(0, 100%)",
  }[placement];
}

function getDrawerPositionStyle(placement: DrawerPlacement, size: number | string, variant: DrawerVariant, borderRadius: number): CSSProperties {
  const vert = isVertical(placement);
  const base: CSSProperties = {
    position: "fixed",
    zIndex: 1300,
    background: "var(--drawer-bg, #fff)",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
    overflow: "hidden",
    willChange: "transform",
    transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
  };

  const isFloat = variant === "floating";
  const gap = isFloat ? 8 : 0;
  const px = typeof size === "number" ? size + "px" : size;

  if (isFloat) {
    return {
      ...base,
      borderRadius: borderRadius || 12,
      ...(vert
        ? { left: gap, right: gap, [placement]: gap, height: px }
        : { top: gap, bottom: gap, [placement]: gap, width: px }),
    };
  }

  const radMap = {
    right:  borderRadius ? `${borderRadius}px 0 0 ${borderRadius}px` : 0,
    left:   borderRadius ? `0 ${borderRadius}px ${borderRadius}px 0` : 0,
    top:    borderRadius ? `0 0 ${borderRadius}px ${borderRadius}px` : 0,
    bottom: borderRadius ? `${borderRadius}px ${borderRadius}px 0 0` : 0,
  };

  return {
    ...base,
    borderRadius: radMap[placement],
    ...(vert
      ? { left: 0, right: 0, [placement]: 0, height: px }
      : { top: 0, bottom: 0, [placement]: 0, width: px }),
  };
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Backdrop ─────────────────────────────────────────────────────────────────
function DrawerBackdrop({ open, backdrop, onClose, zIndex = 1299 }: { open: boolean, backdrop: DrawerBackdrop, onClose?: () => void, zIndex?: number }) {
  if (backdrop === "none") return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex,
        background: backdrop === "blur" ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.4)",
        backdropFilter: backdrop === "blur" ? "blur(6px)" : undefined,
        WebkitBackdropFilter: backdrop === "blur" ? "blur(6px)" : undefined,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity 0.28s ease",
      }}
      aria-hidden="true"
    />
  );
}

// ─── DrawerHandle ─────────────────────────────────────────────────────────────
function DrawerHandle() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px", cursor: "grab", flexShrink: 0 }}>
      <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--drawer-handle-color, #d3d1c7)" }} />
    </div>
  );
}

// ─── DrawerHeader ─────────────────────────────────────────────────────────────
export function DrawerHeader({ title, description, onClose, showClose = true, sticky = true, style = {}, children }: DrawerHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px 12px",
        borderBottom: "0.5px solid var(--drawer-border-color, #d3d1c7)",
        flexShrink: 0,
        background: "var(--drawer-bg, #fff)",
        ...(sticky ? { position: "sticky", top: 0, zIndex: 1 } : {}),
        ...style,
      }}
    >
      {children !== undefined ? children : (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {title && <span style={{ fontSize: 15, fontWeight: 500, color: "var(--drawer-title-color, inherit)" }}>{title}</span>}
          {description && <span style={{ fontSize: 12, color: "var(--drawer-desc-color, #888780)" }}>{description}</span>}
        </div>
      )}
      {showClose && onClose && (
        <button
          onClick={onClose}
          aria-label="Close drawer"
          style={{
            width: 28, height: 28, borderRadius: 6, border: "0.5px solid var(--drawer-border-color, #d3d1c7)",
            background: "transparent", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: "var(--drawer-desc-color, #888780)", flexShrink: 0,
            marginLeft: 8, transition: "background 0.15s",
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#f1efe8"}
          onMouseOut={(e)  => e.currentTarget.style.background = "transparent"}
        >
          <CloseIcon size={14} />
        </button>
      )}
    </div>
  );
}

// ─── DrawerBody ───────────────────────────────────────────────────────────────
export function DrawerBody({ children, style = {} }: { children: ReactNode, style?: CSSProperties }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px", ...style }}>
      {children}
    </div>
  );
}

// ─── DrawerFooter ─────────────────────────────────────────────────────────────
export function DrawerFooter({ children, sticky = true, style = {}, align = "right" }: DrawerFooterProps) {
  const justifyMap = { left: "flex-start", center: "center", right: "flex-end", stretch: "stretch" };
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "12px 16px",
        borderTop: "0.5px solid var(--drawer-border-color, #d3d1c7)",
        background: "var(--drawer-bg, #fff)",
        flexShrink: 0,
        justifyContent: justifyMap[align] ?? "flex-end",
        ...(sticky ? { position: "sticky", bottom: 0, zIndex: 1 } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Drawer ───────────────────────────────────────────────────────────────────
export function CustomDrawer({
  open,
  onClose,
  placement      = "right",
  variant        = "overlay",
  size           = 320,
  backdrop       = "dim",
  borderRadius   = 0,
  title,
  description,
  showClose      = true,
  showHandle     = false,
  closeOnBackdrop= true,
  closeOnEsc     = true,
  keepMounted    = true,
  header,
  footer,
  children,
  zIndex         = 1300,
  portalTarget,
  containerRef,
  style          = {},
  className      = "",
  onOpen,
  onClosed,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const prevOpen  = useRef(false);

  // Resolve numeric size from named token
  const resolvedSize = typeof size === "string" && SIZES[size] !== undefined ? SIZES[size] : size;

  // Mount / unmount with animation timing
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => {
        if (!keepMounted) setMounted(false);
        onClosed?.();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open, keepMounted, onClosed]);

  // Emit onOpen after animation
  useEffect(() => {
    if (visible && !prevOpen.current) { setTimeout(() => onOpen?.(), 300); }
    prevOpen.current = visible;
  }, [visible, onOpen]);

  // Escape key
  useEffect(() => {
    if (!closeOnEsc) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeOnEsc, open, onClose]);

  // Body scroll lock (overlay / floating only)
  useEffect(() => {
    if (variant === "push") return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open, variant]);

  // Push variant — offset the container
  useEffect(() => {
    if (variant !== "push" || !containerRef?.current) return;
    const el = containerRef.current;
    if (!el) return;
    const vert = isVertical(placement);
    const px = typeof resolvedSize === "string" ? resolvedSize : resolvedSize + "px";
    el.style.transition = "margin 0.28s cubic-bezier(0.4,0,0.2,1)";
    if (open) {
      if (!vert) {
        el.style.marginLeft  = placement === "left"  ? px : "";
        el.style.marginRight = placement === "right" ? px : "";
      } else {
        el.style.marginTop    = placement === "top"    ? px : "";
        el.style.marginBottom = placement === "bottom" ? px : "";
      }
    } else {
      el.style.marginLeft = el.style.marginRight = el.style.marginTop = el.style.marginBottom = "";
    }
    return () => {
      el.style.marginLeft = el.style.marginRight = el.style.marginTop = el.style.marginBottom = "";
    };
  }, [variant, open, placement, resolvedSize, containerRef]);

  // Focus trap
  useEffect(() => {
    if (!visible || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) (focusable[0] as HTMLElement).focus();
  }, [visible]);

  if (!keepMounted && !mounted) return null;
  if (!mounted) return null;

  const posStyle = getDrawerPositionStyle(placement, resolvedSize, variant, borderRadius);

  const panel = (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === "string" ? title : "Drawer"}
      className={className}
      style={{
        ...posStyle,
        transform: getTranslate(placement, visible),
        visibility: mounted ? "visible" : "hidden",
        ...style,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {showHandle && (placement === "bottom" || isVertical(placement)) && <DrawerHandle />}

      {header !== undefined
        ? header
        : (title || showClose) && (
            <DrawerHeader
              title={title}
              description={description}
              onClose={onClose}
              showClose={showClose}
              sticky
            />
          )
      }

      <DrawerBody>{children}</DrawerBody>

      {footer}
    </div>
  );

  const content = (
    <>
      {variant !== "push" && (
        <DrawerBackdrop
          open={visible}
          backdrop={backdrop}
          onClose={closeOnBackdrop ? onClose : undefined}
          zIndex={zIndex - 1}
        />
      )}
      {panel}
    </>
  );

  const target = portalTarget ?? (typeof document !== "undefined" ? document.body : null);
  return target ? createPortal(content, target) : content;
}

// ─── useDrawer hook ───────────────────────────────────────────────────────────
export function useDrawer(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open    = useCallback(() => setIsOpen(true),  []);
  const close   = useCallback(() => setIsOpen(false), []);
  const toggle  = useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle, setIsOpen };
}

export default CustomDrawer;
