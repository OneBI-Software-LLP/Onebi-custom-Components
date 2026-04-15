import React, { useState, useRef, useEffect, useCallback, createContext, useContext, ReactNode, HTMLAttributes } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionAccent = "teal" | "blue" | "purple" | "coral" | "amber" | "gray";
export type AccordionVariant = "default" | "flush" | "card" | "ghost" | "filled";
export type AccordionIconType = "chevron" | "plus" | "arrow" | "caret" | "none";
export type AccordionIconPosition = "left" | "right";

export interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (val: string) => void;
  variant: AccordionVariant;
  iconType: AccordionIconType;
  iconPosition: AccordionIconPosition;
  size: AccordionSize;
  accent: AccordionAccent;
  borderRadius: number;
  gap: number;
  allItems: string[];
  setRef: (val: string, el: HTMLDivElement | null) => void;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  children?: ReactNode;
  defaultOpen?: string | string[];
  value?: string | string[];
  onChange?: (value: string[]) => void;
  allowMultiple?: boolean;
  collapsible?: boolean;
  variant?: AccordionVariant;
  size?: AccordionSize;
  accent?: AccordionAccent;
  iconType?: AccordionIconType;
  iconPosition?: AccordionIconPosition;
  borderRadius?: number;
  gap?: number;
}

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onToggle"> {
  value: string;
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  badgeColor?: string;
  icon?: ReactNode;
  disabled?: boolean;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  onToggle?: (value: string, isOpen: boolean) => void;
}

// ─── Context ────────────────────────────────────────────────────────────────
const AccordionContext = createContext<AccordionContextType | null>(null);

// ─── CSS-in-JS styles ───────────────────────────────────────────────────────
const SIZE: Record<AccordionSize, any> = {
  sm: { header: "8px 12px", title: 13, subtitle: 11, body: 12, icon: 12 },
  md: { header: "12px 16px", title: 14, subtitle: 12, body: 13, icon: 14 },
  lg: { header: "16px 20px", title: 16, subtitle: 13, body: 14, icon: 16 },
};

const ACCENT: Record<AccordionAccent, any> = {
  teal:   { fill: "#E1F5EE", text: "#0F6E56", border: "#1D9E75" },
  blue:   { fill: "#E6F1FB", text: "#185FA5", border: "#378ADD" },
  purple: { fill: "#EEEDFE", text: "#534AB7", border: "#7F77DD" },
  coral:  { fill: "#FAECE7", text: "#993C1D", border: "#D85A30" },
  amber:  { fill: "#FAEEDA", text: "#854F0B", border: "#EF9F27" },
  gray:   { fill: "#F1EFE8", text: "#5F5E5A", border: "#888780" },
};

// ─── Icons ───────────────────────────────────────────────────────────────────
function ChevronIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PlusMinusIcon({ open, size = 14 }: { open: boolean; size?: number }) {
  return open ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CaretIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor">
      <polygon points="1,2 9,2 5,8" />
    </svg>
  );
}

function renderIcon(type: AccordionIconType, open: boolean, size: number) {
  switch (type) {
    case "chevron":  return <ChevronIcon size={size} />;
    case "plus":     return <PlusMinusIcon open={open} size={size} />;
    case "arrow":    return <ArrowIcon size={size} />;
    case "caret":    return <CaretIcon size={size} />;
    default:         return null;
  }
}

// ─── AccordionItem ───────────────────────────────────────────────────────────
export function AccordionItem({
  value,
  title,
  subtitle,
  badge,
  badgeColor,
  icon: leftIcon,
  disabled = false,
  children,
  className = "",
  style = {},
  headerStyle = {},
  bodyStyle = {},
  onToggle,
  ...rest
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be inside an Accordion");

  const {
    openItems, toggleItem,
    variant, iconType, iconPosition,
    size, accent, borderRadius, gap,
    allItems, setRef,
  } = ctx;

  const isOpen    = openItems.has(value);
  const ac        = ACCENT[accent] || ACCENT.teal;
  const sz        = SIZE[size]     || SIZE.md;
  const isCard    = variant === "card";
  const isFlush   = variant === "flush";
  const isGhost   = variant === "ghost";
  const isFilled  = variant === "filled";
  const isFirst   = allItems[0] === value;
  const isLast    = allItems[allItems.length - 1] === value;

  // body height animation
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.style.maxHeight = isOpen
      ? bodyRef.current.scrollHeight + "px"
      : "0px";
  }, [isOpen, children]);

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOpen;
    toggleItem(value);
    onToggle?.(value, next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleToggle(); }
  };

  // item border / radius
  const radiusCss = gap > 0
    ? `${borderRadius}px` :
        isFirst && isLast ? `${borderRadius}px` :
        isFirst ? `${borderRadius}px ${borderRadius}px 0 0` :
        isLast ? `0 0 ${borderRadius}px ${borderRadius}px` : "0";

  const itemBorderBottom = !isGhost && !isFlush && gap === 0 && !isLast
    ? "1px solid #d3d1c7"
    : isLast && gap === 0 ? "none"
    : "";

  const itemStyle: React.CSSProperties = {
    overflow: "hidden",
    borderRadius: radiusCss,
    border: gap > 0 ? "1px solid #d3d1c7" : undefined,
    borderBottom: itemBorderBottom || undefined,
    opacity: disabled ? 0.45 : 1,
    pointerEvents: disabled ? "none" : undefined,
    background: isCard ? "#fff" : undefined,
    transition: "border-color 0.15s",
    ...style,
  };

  // header
  const headerBg =
    isFilled && isOpen ? ac.fill :
    isFilled           ? "#f5f5f3" :
    isOpen             ? "#f5f5f3" : "transparent";

  const borderLeft = isOpen && !isFlush && !isGhost
    ? `3px solid ${ac.border}`
    : "3px solid transparent";

  const titleColor = isOpen ? ac.text : "inherit";

  const hStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: sz.header,
    cursor: disabled ? "not-allowed" : "pointer",
    background: headerBg,
    border: "none",
    borderLeft,
    textAlign: "left",
    fontFamily: "inherit",
    transition: "background 0.15s, border-left-color 0.2s",
    outline: "none",
    ...headerStyle,
  };

  const iconNode = iconType !== "none"
    ? renderIcon(iconType, isOpen, sz.icon)
    : null;

  const rotateChevron =
    isOpen && (iconType === "chevron" || iconType === "arrow" || iconType === "caret");

  const iconEl = iconNode && (
    <span
      style={{
        display: "flex", alignItems: "center",
        color: isOpen ? ac.text : "#888780",
        transition: "transform 0.25s, color 0.2s",
        transform: rotateChevron ? "rotate(180deg)" : "rotate(0deg)",
        flexShrink: 0,
      }}
    >
      {iconNode}
    </span>
  );

  const badgeEl = badge && (
    <span
      style={{
        fontSize: sz.subtitle,
        padding: "2px 8px",
        borderRadius: 99,
        background: (badgeColor || ac.border) + "22",
        color: badgeColor || ac.border,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {badge}
    </span>
  );

  const bodyPad = size === "sm"
    ? "0 12px 10px 12px"
    : size === "lg"
    ? "0 20px 16px 20px"
    : "0 16px 14px 16px";

  const bodyPadLeft = iconPosition === "left" && iconType !== "none" ? "36px" : undefined;

  return (
    <div style={itemStyle} className={className} ref={(el) => setRef(value, el)} {...rest}>
      <button
        style={hStyle}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        disabled={disabled}
        type="button"
        onMouseOver={(e) => { if (!disabled) e.currentTarget.style.background = isFilled && isOpen ? ac.fill : "#f1efe8"; }}
        onMouseOut={(e)  => { e.currentTarget.style.background = headerBg; }}
      >
        {iconPosition === "left"  && iconEl}
        {leftIcon && (
          <span style={{ display: "flex", alignItems: "center", color: ac.text, flexShrink: 0 }}>
            {leftIcon}
          </span>
        )}
        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: sz.title, fontWeight: 500, color: titleColor, transition: "color 0.15s" }}>
            {title}
          </span>
          {subtitle && (
            <span style={{ fontSize: sz.subtitle, color: "#888780", fontWeight: 400 }}>
              {subtitle}
            </span>
          )}
        </span>
        {badgeEl}
        {iconPosition === "right" && iconEl}
      </button>

      <div
        ref={bodyRef}
        style={{
          maxHeight: 0,
          overflow: "hidden",
          transition: "max-height 0.28s ease",
        }}
      >
        <div
          style={{
            fontSize: sz.body,
            color: "#5f5e5a",
            lineHeight: 1.65,
            padding: bodyPad,
            paddingLeft: bodyPadLeft,
            ...bodyStyle,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Accordion ───────────────────────────────────────────────────────────────
export function CustomAccordion({
  children,
  defaultOpen,
  value: controlledValue,
  onChange,
  allowMultiple = true,
  collapsible   = true,
  variant       = "default",
  size          = "md",
  accent        = "teal",
  iconType      = "chevron",
  iconPosition  = "right",
  borderRadius  = 8,
  gap           = 0,
  className     = "",
  style         = {},
  ...rest
}: AccordionProps) {
  const initOpen = () => {
    if (controlledValue !== undefined) return new Set([controlledValue].flat());
    if (defaultOpen     !== undefined) return new Set([defaultOpen].flat());
    return new Set<string>();
  };

  const [openItems, setOpenItems] = useState<Set<string>>(initOpen);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Sync when controlled
  useEffect(() => {
    if (controlledValue !== undefined) {
      setOpenItems(new Set([controlledValue].flat()));
    }
  }, [controlledValue]);

  // Collect child values
  const allItems: string[] = [];
  const collectValues = (node: ReactNode) => {
    if (!node) return;
    if (Array.isArray(node)) { node.forEach(collectValues); return; }
    if (React.isValidElement(node)) {
      if (node.props && "value" in node.props) {
        allItems.push(node.props.value as string);
      }
      if (node.props?.children) collectValues(node.props.children);
    }
  };
  collectValues(children);

  const toggleItem = useCallback((val: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(val)) {
        if (!collapsible && next.size === 1) return prev;
        next.delete(val);
      } else {
        if (!allowMultiple) next.clear();
        next.add(val);
      }
      onChange?.([...next]);
      return next;
    });
  }, [allowMultiple, collapsible, onChange]);

  const setRef = useCallback((val: string, el: HTMLDivElement | null) => { itemRefs.current[val] = el; }, []);

  // Container styles
  const isCard  = variant === "card";
  const isFlush = variant === "flush";
  const isGhost = variant === "ghost";

  const wrapStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap,
    borderRadius,
    border: !isFlush && !isGhost && gap === 0 ? "1px solid #d3d1c7" : undefined,
    boxShadow: isCard ? "0 1px 4px rgba(0,0,0,0.08)" : undefined,
    background: isCard ? "#fff" : undefined,
    fontFamily: "system-ui, -apple-system, sans-serif",
    overflow: "hidden",
    ...style,
  };

  const ctx: AccordionContextType = {
    openItems, toggleItem,
    variant, iconType, iconPosition,
    size, accent, borderRadius, gap,
    allItems, setRef,
  };

  return (
    <AccordionContext.Provider value={ctx}>
      <div style={wrapStyle} className={className} role="presentation" {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ─── Convenience: expandAll / collapseAll imperative handle ──────────────────
export function useAccordion(items: string[] = [], initial: string[] = []) {
  const [open, setOpen] = useState<string[]>(initial);
  const expandAll  = () => setOpen([...items]);
  const collapseAll = () => setOpen([]);
  return { open, setOpen, expandAll, collapseAll };
}

export default CustomAccordion;
