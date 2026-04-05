import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import './popover.css';

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

/**
 * Which side the popover box appears on relative to the trigger.
 * Alignment (start / center / end) controls horizontal position.
 */
export type PopoverSide      = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign     = 'start' | 'center' | 'end';
export type PopoverPlacement = `${PopoverSide}-${PopoverAlign}` | PopoverSide;

/** What gesture opens/closes the popover */
export type PopoverTrigger = 'click' | 'hover' | 'context-menu' | 'manual';

// ─────────────────────────────────────────────────────────────
//  CONTEXT  (lets child helpers like PopoverClose read state)
// ─────────────────────────────────────────────────────────────

interface PopoverCtx {
  close: () => void;
  isOpen: boolean;
}
const PopoverContext = createContext<PopoverCtx>({ close: () => {}, isOpen: false });
export const usePopover = () => useContext(PopoverContext);

// ─────────────────────────────────────────────────────────────
//  MAIN POPOVER PROPS
// ─────────────────────────────────────────────────────────────

export interface PopoverProps {
  /**
   * The element that triggers the popover.
   * Must be a single React element (button, div, span, etc.)
   */
  children: React.ReactElement;

  /**
   * What to show inside the popover box.
   * Can be any JSX — use the pre-built sub-components below
   * (PopoverMenu, PopoverProfile, PopoverNotifications, etc.)
   * or just raw JSX.
   */
  content: React.ReactNode;

  /** Which side + alignment the popover appears. Default: 'bottom-start' */
  placement?: PopoverPlacement;

  /** What opens/closes the popover. Default: 'click' */
  trigger?: PopoverTrigger;

  /** Show the pointing arrow. Default: true */
  showArrow?: boolean;

  /** Gap between trigger and popover box in px. Default: 8 */
  offset?: number;

  /** Close when clicking outside. Default: true */
  closeOnOutsideClick?: boolean;

  /** Close when Escape is pressed. Default: true */
  closeOnEsc?: boolean;

  /** Close when clicking a menu item inside. Default: true */
  closeOnSelect?: boolean;

  /** Controlled open state. Use with onOpenChange for full control. */
  open?: boolean;

  /** Called when the popover wants to open or close */
  onOpenChange?: (open: boolean) => void;

  /** Extra CSS class on the popover box */
  popoverClassName?: string;

  /** Inline style overrides on the popover box */
  popoverStyle?: React.CSSProperties;

  /** Delay in ms before showing on hover. Default: 0 */
  hoverDelay?: number;

  /** Delay in ms before hiding on hover. Default: 100 */
  hoverCloseDelay?: number;

  /**
   * If true, renders a full-screen invisible overlay behind
   * the popover (useful for modal-style confirmation popovers).
   */
  withOverlay?: boolean;

  /** aria-label for the popover box */
  ariaLabel?: string;

  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────────
//  PLACEMENT  →  CSS position offsets + arrow position
// ─────────────────────────────────────────────────────────────

interface PositionStyles {
  popoverStyle : React.CSSProperties;
  arrowStyle   : React.CSSProperties;
  side         : PopoverSide;
}

function getPositionStyles(placement: PopoverPlacement, offset: number): PositionStyles {
  const parts     = placement.split('-');
  const side      = parts[0] as PopoverSide;
  const align     = (parts[1] ?? 'start') as PopoverAlign;

  const gap = `calc(100% + ${offset}px)`;

  // Horizontal alignment helpers
  const h: Record<PopoverAlign, React.CSSProperties> = {
    start : { left: 0 },
    center: { left: '50%', transform: 'translateX(-50%)' },
    end   : { right: 0 },
  };

  // Vertical alignment helpers (for left/right sides)
  const v: Record<PopoverAlign, React.CSSProperties> = {
    start : { top: 0 },
    center: { top: '50%', transform: 'translateY(-50%)' },
    end   : { bottom: 0 },
  };

  // Arrow horizontal positions
  const arrowH: Record<PopoverAlign, React.CSSProperties> = {
    start : { left: 16 },
    center: { left: '50%', marginLeft: -5 },
    end   : { right: 16 },
  };

  const arrowV: Record<PopoverAlign, React.CSSProperties> = {
    start : { top: 12 },
    center: { top: '50%', marginTop: -5 },
    end   : { bottom: 12 },
  };

  switch (side) {
    case 'bottom':
      return {
        side,
        popoverStyle: { top: gap, ...h[align] },
        arrowStyle  : { ...arrowH[align] },
      };
    case 'top':
      return {
        side,
        popoverStyle: { bottom: gap, ...h[align] },
        arrowStyle  : { ...arrowH[align] },
      };
    case 'right':
      return {
        side,
        popoverStyle: { left: gap, ...v[align] },
        arrowStyle  : { ...arrowV[align] },
      };
    case 'left':
      return {
        side,
        popoverStyle: { right: gap, ...v[align] },
        arrowStyle  : { ...arrowV[align] },
      };
  }
}

// ─────────────────────────────────────────────────────────────
//  CLOSE ICON
// ─────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
//  POPOVER  (main component)
// ─────────────────────────────────────────────────────────────

export function Popover({
  children,
  content,
  placement           = 'bottom-start',
  trigger             = 'click',
  showArrow           = true,
  offset              = 8,
  closeOnOutsideClick = true,
  closeOnEsc          = true,
  closeOnSelect       = true,
  open: controlledOpen,
  onOpenChange,
  popoverClassName    = '',
  popoverStyle: popoverStyleProp,
  hoverDelay          = 0,
  hoverCloseDelay     = 100,
  withOverlay         = false,
  ariaLabel,
  disabled            = false,
}: PopoverProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const wrapRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = useId();

  const setOpen = useCallback((val: boolean) => {
    if (!isControlled) setInternalOpen(val);
    onOpenChange?.(val);
  }, [isControlled, onOpenChange]);

  const open  = () => { if (!disabled) setOpen(true);  };
  const close = () => setOpen(false);
  const toggle= () => { if (isOpen) close(); else open(); };

  // Outside click
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, closeOnOutsideClick]);

  // Escape key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeOnEsc]);

  // Hover timers
  const handleMouseEnter = () => {
    if (trigger !== 'hover') return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(open, hoverDelay);
  };

  const handleMouseLeave = () => {
    if (trigger !== 'hover') return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(close, hoverCloseDelay);
  };

  // Context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    if (trigger !== 'context-menu') return;
    e.preventDefault();
    toggle();
  };

  // Build trigger props
  const triggerProps: React.HTMLAttributes<HTMLElement> = {};
  if (trigger === 'click')        triggerProps.onClick        = toggle;
  if (trigger === 'hover')        { triggerProps.onMouseEnter = handleMouseEnter; triggerProps.onMouseLeave = handleMouseLeave; }
  if (trigger === 'context-menu') triggerProps.onContextMenu  = handleContextMenu;

  // Position
  const { popoverStyle: posStyle, arrowStyle, side } = getPositionStyles(placement, offset);

  // Handle clicks inside the popover (closeOnSelect)
  const handlePopoverClick = () => {
    if (closeOnSelect) close();
  };

  const mergedPopClass = ['pop', popoverClassName].filter(Boolean).join(' ');
  const mergedPopStyle = { ...posStyle, ...popoverStyleProp };

  const ctx: PopoverCtx = { close, isOpen };

  return (
    <PopoverContext.Provider value={ctx}>
      <div
        ref={wrapRef}
        style={{ position: 'relative', display: 'inline-flex' }}
        onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
        onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
      >
        {/* TRIGGER */}
        {React.cloneElement(children, {
          ...triggerProps,
          'aria-expanded' : isOpen,
          'aria-haspopup' : 'true',
          'aria-controls' : uid,
          ...(children.props as object),
          onClick: trigger === 'click'
            ? (e: React.MouseEvent) => {
                toggle();
                (children.props as React.HTMLAttributes<HTMLElement>).onClick?.(e);
              }
            : (children.props as React.HTMLAttributes<HTMLElement>).onClick,
        })}

        {/* OVERLAY (optional backdrop) */}
        {isOpen && withOverlay && (
          <div className="pop-overlay" onClick={close} aria-hidden="true" />
        )}

        {/* POPOVER BOX */}
        {isOpen && (
          <div
            id={uid}
            className={mergedPopClass}
            data-side={side}
            style={mergedPopStyle}
            role="dialog"
            aria-label={ariaLabel}
            onClick={closeOnSelect ? handlePopoverClick : undefined}
          >
            {showArrow && (
              <div className="pop-arrow" style={arrowStyle} aria-hidden="true" />
            )}
            {content}
          </div>
        )}
      </div>
    </PopoverContext.Provider>
  );
}


// ─────────────────────────────────────────────────────────────
//  PopoverClose  — button that closes the nearest Popover
//  Use anywhere inside `content` prop
// ─────────────────────────────────────────────────────────────

export function PopoverClose({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  const { close } = usePopover();
  return (
    <button className={`pop-close ${className}`} onClick={close} type="button" aria-label="Close">
      {children ?? <CloseIcon />}
    </button>
  );
}


// ─────────────────────────────────────────────────────────────
//  PopoverHeader
// ─────────────────────────────────────────────────────────────

export interface PopoverHeaderProps {
  title       : string;
  actionLabel?: string;
  onAction?   : () => void;
  showClose?  : boolean;
}

export function PopoverHeader({ title, actionLabel, onAction, showClose = false }: PopoverHeaderProps) {
  return (
    <div className="pop-header">
      <span className="pop-header-title">{title}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {actionLabel && (
          <button className="pop-header-action" onClick={onAction} type="button">
            {actionLabel}
          </button>
        )}
        {showClose && <PopoverClose />}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
//  PopoverBody  (generic padded content area)
// ─────────────────────────────────────────────────────────────

export function PopoverBody({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div className="pop-body" style={style}>{children}</div>;
}


// ─────────────────────────────────────────────────────────────
//  PopoverFooter
// ─────────────────────────────────────────────────────────────

export type PopoverFooterAlign = 'left' | 'center' | 'right';

export function PopoverFooter({ children, align = 'left' }: { children: React.ReactNode; align?: PopoverFooterAlign }) {
  const cls = ['pop-footer', align === 'center' ? 'pop-footer-center' : align === 'right' ? 'pop-footer-right' : ''].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}


// ─────────────────────────────────────────────────────────────
//  PopoverMenu  (dropdown / context menu)
// ─────────────────────────────────────────────────────────────

export interface MenuItem {
  id        : string;
  label     : string;
  icon?     : React.ReactNode;
  shortcut? : string;
  danger?   : boolean;
  disabled? : boolean;
  onClick?  : () => void;
  /** If set, renders a separator BEFORE this item */
  separator?: boolean;
}

export interface MenuGroup {
  label?: string;
  items : MenuItem[];
}

export interface PopoverMenuProps {
  /** Flat list of items, OR grouped list */
  items  : MenuItem[] | MenuGroup[];
  /** Min width of the menu. Default: 180px */
  minWidth?: number | string;
}

function isGrouped(items: MenuItem[] | MenuGroup[]): items is MenuGroup[] {
  return items.length > 0 && 'items' in items[0];
}

function renderMenuItems(items: MenuItem[], close: () => void) {
  return items.map(item => (
    <React.Fragment key={item.id}>
      {item.separator && <div className="pop-menu-sep" />}
      <button
        className={['pop-menu-item', item.danger ? 'pop-menu-item--danger' : ''].filter(Boolean).join(' ')}
        onClick={() => { item.onClick?.(); close(); }}
        disabled={item.disabled}
        aria-disabled={item.disabled}
        type="button"
      >
        {item.icon && item.icon}
        {item.label}
        {item.shortcut && <span className="pop-menu-item-shortcut">{item.shortcut}</span>}
      </button>
    </React.Fragment>
  ));
}

export function PopoverMenu({ items, minWidth = 180 }: PopoverMenuProps) {
  const { close } = usePopover();
  return (
    <div className="pop-menu" style={{ minWidth }}>
      {isGrouped(items)
        ? items.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div className="pop-menu-sep" />}
              {group.label && <div className="pop-menu-label">{group.label}</div>}
              {renderMenuItems(group.items, close)}
            </React.Fragment>
          ))
        : renderMenuItems(items as MenuItem[], close)
      }
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
//  PopoverProfile  (avatar + user info + menu)
// ─────────────────────────────────────────────────────────────

export interface PopoverProfileProps {
  name      : string;
  email     : string;
  /** Initials shown in the avatar circle (e.g. 'RK') */
  initials  : string;
  /** Optional badge label e.g. 'Pro plan' */
  planLabel?: string;
  /** Avatar background color. Default: #dbeafe */
  avatarBg? : string;
  /** Avatar text color. Default: #1d4ed8 */
  avatarColor?: string;
  /** Menu items below the profile header */
  menuItems?: MenuItem[];
  /** Min width. Default: 220px */
  minWidth? : number | string;
}

export function PopoverProfile({
  name,
  email,
  initials,
  planLabel,
  avatarBg    = '#dbeafe',
  avatarColor = '#1d4ed8',
  menuItems   = [],
  minWidth    = 220,
}: PopoverProfileProps) {
  return (
    <div style={{ minWidth }}>
      <div className="pop-profile-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="pop-avatar" style={{ background: avatarBg, color: avatarColor }}>
            {initials}
          </div>
          <div>
            <div className="pop-profile-name">{name}</div>
            <div className="pop-profile-email">{email}</div>
            {planLabel && <div className="pop-profile-badge">{planLabel}</div>}
          </div>
        </div>
      </div>
      {menuItems.length > 0 && <PopoverMenu items={menuItems} />}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
//  PopoverNotifications
// ─────────────────────────────────────────────────────────────

export interface NotificationItem {
  id      : string;
  text    : React.ReactNode;
  time    : string;
  read?   : boolean;
  icon?   : React.ReactNode;
  onClick?: () => void;
}

export interface PopoverNotificationsProps {
  items          : NotificationItem[];
  title?         : string;
  actionLabel?   : string;
  onAction?      : () => void;
  footerLabel?   : string;
  onFooterClick? : () => void;
  width?         : number | string;
}

export function PopoverNotifications({
  items,
  title          = 'Notifications',
  actionLabel    = 'Mark all read',
  onAction,
  footerLabel    = 'View all notifications',
  onFooterClick,
  width          = 300,
}: PopoverNotificationsProps) {
  const { close } = usePopover();
  return (
    <div style={{ width }}>
      <PopoverHeader title={title} actionLabel={actionLabel} onAction={onAction} />
      <div>
        {items.map(n => (
          <div
            key={n.id}
            className={['pop-notif-item', !n.read ? 'pop-notif-item--unread' : ''].filter(Boolean).join(' ')}
            onClick={() => { n.onClick?.(); close(); }}
          >
            <div className={['pop-notif-dot', n.read ? 'pop-notif-dot--read' : ''].filter(Boolean).join(' ')} />
            {n.icon && <div className="pop-notif-icon">{n.icon}</div>}
            <div>
              <div className="pop-notif-text">{n.text}</div>
              <div className="pop-notif-time">{n.time}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: 13, color: 'var(--pop-text-hint)' }}>
            No notifications
          </div>
        )}
      </div>
      {footerLabel && (
        <PopoverFooter align="center">
          <button className="pop-footer-link" onClick={() => { onFooterClick?.(); close(); }} type="button">
            {footerLabel}
          </button>
        </PopoverFooter>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
//  PopoverConfirm  (destructive action)
// ─────────────────────────────────────────────────────────────

export interface PopoverConfirmProps {
  title         : string;
  description?  : string;
  confirmLabel? : string;
  cancelLabel?  : string;
  onConfirm     : () => void;
  onCancel?     : () => void;
  danger?       : boolean;
}

export function PopoverConfirm({
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  onConfirm,
  onCancel,
  danger       = true,
}: PopoverConfirmProps) {
  const { close } = usePopover();
  return (
    <div className="pop-confirm">
      <div className="pop-confirm-title">{title}</div>
      {description && <p className="pop-confirm-desc">{description}</p>}
      <div className="pop-confirm-actions">
        <button
          className="pop-btn pop-btn--default"
          onClick={() => { onCancel?.(); close(); }}
          type="button"
        >
          {cancelLabel}
        </button>
        <button
          className={`pop-btn ${danger ? 'pop-btn--danger' : 'pop-btn--primary'}`}
          onClick={() => { onConfirm(); close(); }}
          type="button"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
//  PopoverRich  (card with image, description, actions)
// ─────────────────────────────────────────────────────────────

export interface PopoverRichProps {
  title       : string;
  description?: string;
  image?      : React.ReactNode;
  stats?      : Array<{ label: string; value: React.ReactNode }>;
  primaryAction?  : { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  width?      : number | string;
}

export function PopoverRich({
  title,
  description,
  image,
  stats,
  primaryAction,
  secondaryAction,
  width = 260,
}: PopoverRichProps) {
  const { close } = usePopover();
  return (
    <div style={{ width }}>
      {image && (
        <div style={{
          width: '100%', height: 80,
          background: '#dbeafe', borderRadius: '10px 10px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {image}
        </div>
      )}
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{title}</div>
        {description && (
          <div style={{ fontSize: 12, color: 'var(--pop-text-muted)', lineHeight: 1.5, marginBottom: 10 }}>
            {description}
          </div>
        )}
        {stats && stats.length > 0 && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 11, color: 'var(--pop-text-hint)' }}>{s.label}</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}
        {(primaryAction || secondaryAction) && (
          <div style={{ display: 'flex', gap: 6 }}>
            {primaryAction && (
              <button className="pop-btn pop-btn--primary" onClick={() => { primaryAction.onClick(); close(); }} type="button">
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button className="pop-btn pop-btn--outline" onClick={() => { secondaryAction.onClick(); close(); }} type="button">
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Popover;
