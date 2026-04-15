import React, { useState, useCallback, ReactNode, CSSProperties } from "react";

// ── Color Palette ─────────────────────────────────────────────────

const COLOR_MAP: Record<string, any> = {
  default: {
    bg: "var(--color-background-secondary, #f4f4f0)",
    text: "var(--color-text-primary, #1a1a18)",
    border: "var(--color-border-secondary, rgba(0,0,0,0.2))",
    activeBg: "#1a1a18",
    activeText: "#ffffff",
    activeBorder: "#1a1a18",
    avatarBg: "#444",
    avatarText: "#fff",
  },
  blue: {
    bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB",
    activeBg: "#185FA5", activeText: "#fff", activeBorder: "#185FA5",
    avatarBg: "#185FA5", avatarText: "#fff",
  },
  teal: {
    bg: "#E1F5EE", text: "#085041", border: "#5DCAA5",
    activeBg: "#1D9E75", activeText: "#fff", activeBorder: "#1D9E75",
    avatarBg: "#1D9E75", avatarText: "#fff",
  },
  purple: {
    bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC",
    activeBg: "#534AB7", activeText: "#fff", activeBorder: "#534AB7",
    avatarBg: "#534AB7", avatarText: "#fff",
  },
  coral: {
    bg: "#FAECE7", text: "#712B13", border: "#F0997B",
    activeBg: "#D85A30", activeText: "#fff", activeBorder: "#D85A30",
    avatarBg: "#D85A30", avatarText: "#fff",
  },
  amber: {
    bg: "#FAEEDA", text: "#633806", border: "#EF9F27",
    activeBg: "#BA7517", activeText: "#fff", activeBorder: "#BA7517",
    avatarBg: "#BA7517", avatarText: "#fff",
  },
  green: {
    bg: "#EAF3DE", text: "#27500A", border: "#97C459",
    activeBg: "#3B6D11", activeText: "#fff", activeBorder: "#3B6D11",
    avatarBg: "#3B6D11", avatarText: "#fff",
  },
  red: {
    bg: "#FCEBEB", text: "#791F1F", border: "#F09595",
    activeBg: "#E24B4A", activeText: "#fff", activeBorder: "#E24B4A",
    avatarBg: "#E24B4A", avatarText: "#fff",
  },
  pink: {
    bg: "#FBEAF0", text: "#72243E", border: "#ED93B1",
    activeBg: "#993556", activeText: "#fff", activeBorder: "#993556",
    avatarBg: "#993556", avatarText: "#fff",
  },
};

// ── Size Tokens ───────────────────────────────────────────────────

const SIZE_MAP: Record<string, any> = {
  xs: { height: 20, fontSize: 10, px: 8,  gap: 4, iconSize: 9,  avatarSize: 14 },
  sm: { height: 24, fontSize: 11, px: 10, gap: 4, iconSize: 10, avatarSize: 18 },
  md: { height: 28, fontSize: 12, px: 12, gap: 5, iconSize: 11, avatarSize: 20 },
  lg: { height: 32, fontSize: 13, px: 14, gap: 6, iconSize: 12, avatarSize: 22 },
  xl: { height: 38, fontSize: 14, px: 16, gap: 7, iconSize: 14, avatarSize: 26 },
};

// ── Spinner ───────────────────────────────────────────────────────

const spinKeyframes = `@keyframes __chip_spin { to { transform: rotate(360deg); } }`;
let _spinInjected = false;
function injectSpinKeyframes() {
  if (_spinInjected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.textContent = spinKeyframes;
  document.head.appendChild(s);
  _spinInjected = true;
}

function Spinner({ size, color }: { size: number; color: string }) {
  injectSpinKeyframes();
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        border: `1.5px solid ${color}44`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "__chip_spin 0.6s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

// ── CheckIcon ─────────────────────────────────────────────────────

function CheckIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M2 6l3 3 5-5"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── CloseIcon ─────────────────────────────────────────────────────

function CloseIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2l6 6M8 2l-6 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Chip ──────────────────────────────────────────────────────────

export type ChipVariant = "filled" | "outlined" | "soft" | "ghost";
export type ChipColor = "default" | "blue" | "teal" | "purple" | "coral" | "amber" | "green" | "red" | "pink" | { bg: string; text: string; border: string; activeBg: string; activeText: string; activeBorder: string; avatarBg?: string; avatarText?: string; };
export type ChipSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ChipProps {
  label?: string | ReactNode;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  avatar?: string;
  count?: number;

  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  borderRadius?: number | string;
  borderWidth?: number;
  fontWeight?: number;
  maxWidth?: number | string;
  fullWidth?: boolean;

  active?: boolean;
  defaultActive?: boolean;
  deletable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  clickable?: boolean;
  tabIndex?: number;

  onClick?: (active: boolean, e: React.MouseEvent | React.KeyboardEvent) => void;
  onDelete?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onChange?: (active: boolean) => void;

  style?: CSSProperties;
  className?: string;
}

export function Chip({
  label,
  leadingIcon,
  trailingIcon,
  avatar,
  count,

  variant = "filled",
  color = "default",
  size = "md",
  borderRadius,
  borderWidth = 1,
  fontWeight = 500,
  maxWidth,
  fullWidth = false,

  active: controlledActive,
  defaultActive = false,
  deletable = false,
  disabled = false,
  loading = false,
  clickable,
  tabIndex = 0,

  onClick,
  onDelete,
  onChange,

  style: styleProp,
  className = "",
}: ChipProps) {
  const isControlled = controlledActive !== undefined;
  const [internalActive, setInternalActive] = useState(defaultActive);
  const active = isControlled ? controlledActive : internalActive;

  const isClickable =
    clickable !== undefined ? clickable : !!(onClick || onChange);
  const isInteractive = isClickable && !disabled && !loading;

  const col =
    typeof color === "object"
      ? color
      : COLOR_MAP[color as string] || COLOR_MAP.default;

  const sz = SIZE_MAP[size] || SIZE_MAP.md;
  const radius =
    borderRadius !== undefined
      ? typeof borderRadius === "number"
        ? `${borderRadius}px`
        : borderRadius
      : `${sz.height / 2}px`;

  let bg, text, border;
  if (variant === "filled") {
    bg = active ? col.activeBg : col.bg;
    text = active ? col.activeText : col.text;
    border = active ? col.activeBorder : col.border;
  } else if (variant === "outlined") {
    bg = active ? col.activeBg + "18" : "transparent";
    text = col.text;
    border = active ? col.activeBorder : col.border;
  } else if (variant === "soft") {
    bg = active ? col.activeBg + "28" : col.bg;
    text = col.text;
    border = "transparent";
  } else if (variant === "ghost") {
    bg = active ? col.bg : "transparent";
    text = col.text;
    border = "transparent";
  } else {
    bg = col.bg; text = col.text; border = col.border;
  }

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (!isInteractive) return;
    const next = !active;
    if (!isControlled) setInternalActive(next);
    onClick?.(next, e);
    onChange?.(next);
  };

  const handleDelete = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (!disabled && !loading) onDelete?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick(e);
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      if (deletable) handleDelete(e);
    }
  };

  const chipStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: sz.gap,
    height: sz.height,
    padding: `0 ${sz.px}px`,
    fontSize: sz.fontSize,
    fontWeight,
    fontFamily: "inherit",
    borderRadius: radius,
    border: `${borderWidth}px solid ${border}`,
    background: bg,
    color: text,
    cursor: loading
      ? "wait"
      : disabled
      ? "not-allowed"
      : isInteractive
      ? "pointer"
      : "default",
    opacity: disabled ? 0.45 : 1,
    outline: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: maxWidth
      ? typeof maxWidth === "number"
        ? `${maxWidth}px`
        : maxWidth
      : "none",
    width: fullWidth ? "100%" : undefined,
    transition: "background 0.14s, border-color 0.14s, color 0.14s, box-shadow 0.14s",
    boxSizing: "border-box",
    lineHeight: 1,
    ...styleProp,
  };

  const renderLeading = () => {
    if (loading) return <Spinner size={sz.iconSize} color={text} />;
    if (avatar) {
      return (
        <span
          aria-hidden="true"
          style={{
            width: sz.avatarSize,
            height: sz.avatarSize,
            borderRadius: "50%",
            background: col.avatarBg || col.activeBg,
            color: col.avatarText || col.activeText,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: sz.iconSize - 1,
            fontWeight: 600,
            flexShrink: 0,
            marginLeft: -(sz.px - 4),
          }}
        >
          {avatar.substring(0, 2).toUpperCase()}
        </span>
      );
    }
    if (leadingIcon) {
      return (
        <span
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: sz.iconSize,
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          {leadingIcon}
        </span>
      );
    }
    return null;
  };

  const renderCheckmark = () => {
    if (!active || loading || avatar || leadingIcon) return null;
    return <CheckIcon size={sz.iconSize} color={text} />;
  };

  const renderCount = () => {
    if (count === undefined || count === null) return null;
    return (
      <span
        style={{
          background: active ? "rgba(255,255,255,0.25)" : col.activeBg + "28",
          color: active ? "rgba(255,255,255,0.9)" : col.text,
          fontSize: sz.iconSize - 1,
          fontWeight: 600,
          padding: "1px 5px",
          borderRadius: sz.height / 2,
          lineHeight: 1.4,
          flexShrink: 0,
        }}
      >
        {count}
      </span>
    );
  };

  const renderDelete = () => {
    if (!deletable) return null;
    return (
      <button
        type="button"
        aria-label={`Remove ${typeof label === "string" ? label : "chip"}`}
        onClick={handleDelete}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: sz.height - 10,
          height: sz.height - 10,
          borderRadius: "50%",
          background: "none",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          color: text,
          padding: 0,
          opacity: 0.6,
          flexShrink: 0,
          transition: "opacity 0.12s, background 0.12s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.background = "rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.6";
          e.currentTarget.style.background = "none";
        }}
      >
        <CloseIcon size={sz.iconSize} color={text} />
      </button>
    );
  };

  return (
    <div
      role={isInteractive ? "checkbox" : deletable ? "option" : undefined}
      aria-checked={isInteractive ? active : undefined}
      aria-disabled={disabled}
      aria-busy={loading}
      tabIndex={disabled || loading ? -1 : isInteractive || deletable ? tabIndex : -1}
      className={`chip ${className}`}
      style={chipStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={(e) => {
        if (!disabled && !loading)
          e.currentTarget.style.boxShadow = `0 0 0 3px ${col.activeBg}44`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseEnter={(e) => {
        if (!isInteractive || disabled || loading) return;
        e.currentTarget.style.filter = `brightness(0.96)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
      }}
      onMouseDown={(e) => {
        if (!isInteractive || disabled || loading) return;
        e.currentTarget.style.transform = "scale(0.97)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {renderLeading()}
      {renderCheckmark()}

      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {trailingIcon && !deletable && (
        <span
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: sz.iconSize,
            flexShrink: 0,
          }}
        >
          {trailingIcon}
        </span>
      )}

      {renderCount()}
      {renderDelete()}
    </div>
  );
}

// ── ChipGroup ─────────────────────────────────────────────────────

export interface ChipGroupItem extends ChipProps {
  id: string;
}

export interface ChipGroupProps {
  items?: ChipGroupItem[];
  mode?: "filter" | "choice" | "input" | "status" | "suggestion";
  value?: string[];
  defaultValue?: string[];
  onChange?: (selectedIds: string[], items: ChipGroupItem[]) => void;
  onDelete?: (id: string, remainingItems: ChipGroupItem[]) => void;
  onSuggest?: (id: string) => void;
  gap?: number;
  wrap?: boolean;
  align?: "start" | "center" | "end";

  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  borderRadius?: number | string;
  borderWidth?: number;
  fontWeight?: number;
  maxWidth?: number | string;
  deletable?: boolean;
}

export function ChipGroup({
  items = [],
  mode = "filter",
  value: controlledValue,
  defaultValue = [],
  onChange,
  onDelete,
  onSuggest,
  gap = 8,
  wrap = true,
  align = "start",

  variant,
  color,
  size,
  borderRadius,
  borderWidth,
  fontWeight,
  maxWidth,
  deletable: groupDeletable,
}: ChipGroupProps) {
  const isControlled = controlledValue !== undefined;
  const [internalSelected, setInternalSelected] = useState(
    new Set(defaultValue)
  );
  const selected = isControlled ? new Set(controlledValue) : internalSelected;

  const [internalItems, setInternalItems] = useState(items);
  const chipItems = mode === "input" ? internalItems : items;

  const handleChipClick = useCallback(
    (itemId: string, active: boolean, e?: React.MouseEvent | React.KeyboardEvent) => {
      if (mode === "status") return;
      if (mode === "suggestion") {
        onSuggest?.(itemId);
        return;
      }

      let next: Set<string>;
      if (mode === "choice") {
        next = new Set([itemId]);
      } else {
        next = new Set(selected);
        if (active) next.add(itemId);
        else next.delete(itemId);
      }

      if (!isControlled) setInternalSelected(next);
      onChange?.([...next], chipItems.filter((i) => next.has(i.id)));
    },
    [mode, selected, isControlled, onChange, onSuggest, chipItems]
  );

  const handleDelete = useCallback(
    (itemId: string) => {
      const remaining = internalItems.filter((i) => i.id !== itemId);
      setInternalItems(remaining);
      onDelete?.(itemId, remaining);
    },
    [internalItems, onDelete]
  );

  const isDeletable = (item: ChipGroupItem) => {
    if (item.deletable !== undefined) return item.deletable;
    if (groupDeletable !== undefined) return groupDeletable;
    return mode === "input";
  };

  const isActive = (item: ChipGroupItem) => {
    if (mode === "status" || mode === "suggestion" || mode === "input")
      return false;
    return selected.has(item.id);
  };

  return (
    <div
      role={mode === "filter" ? "group" : mode === "choice" ? "radiogroup" : undefined}
      style={{
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        gap,
        alignItems: align === "center" ? "center" : align === "end" ? "flex-end" : "flex-start",
        overflowX: wrap ? undefined : "auto",
      }}
    >
      {chipItems.map((item) => {
        const {
          id,
          label,
          leadingIcon,
          trailingIcon,
          avatar,
          count,
          color: itemColor,
          variant: itemVariant,
          size: itemSize,
          disabled: itemDisabled,
          loading: itemLoading,
          style: itemStyle,
          className: itemClass,
          ...rest
        } = item;

        return (
          <Chip
            key={id}
            label={label}
            leadingIcon={leadingIcon}
            trailingIcon={trailingIcon}
            avatar={avatar}
            count={count}
            variant={itemVariant || variant || "filled"}
            color={itemColor || color || "default"}
            size={itemSize || size || "md"}
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            fontWeight={fontWeight}
            maxWidth={maxWidth}
            active={isActive(item)}
            deletable={isDeletable(item)}
            disabled={itemDisabled}
            loading={itemLoading}
            clickable={mode !== "status"}
            style={itemStyle}
            className={itemClass}
            onClick={(active, e) => handleChipClick(id, active, e)}
            onDelete={() => handleDelete(id)}
          />
        );
      })}
    </div>
  );
}
