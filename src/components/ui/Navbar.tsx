import React from 'react';
import '@/styles/ui/navbar.css';

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type NavbarVariant   = 'default' | 'bordered' | 'filled' | 'floating' | 'transparent';
export type NavbarColor     = 'white' | 'dark' | 'primary' | 'blur';
export type NavbarSize      = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type NavbarPosition  = 'static' | 'sticky' | 'fixed';

export interface NavItem {
  /** Unique key / href */
  key: string;

  /** Label shown in the nav link */
  label: React.ReactNode;

  /** Optional icon before the label */
  icon?: React.ReactNode;

  /** Badge count / text */
  badge?: string | number;

  /** Mark this item as the active route */
  active?: boolean;

  /** Disable this link */
  disabled?: boolean;

  /** Dropdown children */
  children?: NavItem[];

  /** Click handler (if not using href routing) */
  onClick?: () => void;
}

export interface NavbarProps {
  /** Brand / logo area */
  brand?: React.ReactNode;

  /** Navigation items (left-aligned after brand) */
  items?: NavItem[];

  /** Items pinned to the right end */
  endItems?: React.ReactNode;

  /** Visual style. Default: 'default' */
  variant?: NavbarVariant;

  /** Background color scheme. Default: 'white' */
  color?: NavbarColor;

  /** Height preset. Default: 'md' */
  size?: NavbarSize;

  /** CSS position. Default: 'static' */
  position?: NavbarPosition;

  /** Show a bottom border. Default: true for 'default' variant */
  bordered?: boolean;

  /** Extra classes on the root <nav> */
  className?: string;

  /** Active item key (controlled) */
  activeKey?: string;

  /** Called when a nav item is clicked */
  onSelect?: (key: string) => void;
}

// ─────────────────────────────────────────────────────────────
//  NAV ITEM (recursive — supports dropdowns)
// ─────────────────────────────────────────────────────────────

function NavLink({
  item,
  activeKey,
  onSelect,
}: {
  item: NavItem;
  activeKey?: string;
  onSelect?: (key: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isActive   = item.active || item.key === activeKey;
  const hasDropdown = !!item.children?.length;

  function handleClick() {
    if (item.disabled) return;
    if (hasDropdown) { setOpen(o => !o); return; }
    item.onClick?.();
    onSelect?.(item.key);
  }

  return (
    <div className={['nb-item', hasDropdown ? 'nb-item-dropdown' : ''].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={[
          'nb-link',
          isActive   ? 'active'   : '',
          item.disabled ? 'disabled' : '',
        ].filter(Boolean).join(' ')}
        aria-current={isActive ? 'page' : undefined}
        disabled={!!item.disabled}
        onClick={handleClick}
        aria-haspopup={hasDropdown ? 'true' : undefined}
        aria-expanded={hasDropdown ? open : undefined}
      >
        {item.icon && <span className="nb-link-icon" aria-hidden="true">{item.icon}</span>}
        {item.label}
        {item.badge !== undefined && (
          <span className="nb-badge">{item.badge}</span>
        )}
        {hasDropdown && (
          <span className={['nb-chevron', open ? 'open' : ''].filter(Boolean).join(' ')} aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </button>

      {hasDropdown && open && (
        <div className="nb-dropdown">
          {item.children!.map(child => (
            <button
              key={child.key}
              type="button"
              className={[
                'nb-dropdown-item',
                child.active || child.key === activeKey ? 'active' : '',
                child.disabled ? 'disabled' : '',
              ].filter(Boolean).join(' ')}
              disabled={!!child.disabled}
              onClick={() => {
                if (child.disabled) return;
                setOpen(false);
                child.onClick?.();
                onSelect?.(child.key);
              }}
            >
              {child.icon && <span className="nb-link-icon" aria-hidden="true">{child.icon}</span>}
              {child.label}
              {child.badge !== undefined && <span className="nb-badge">{child.badge}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  NAVBAR
// ─────────────────────────────────────────────────────────────

function Navbar(props: NavbarProps) {
  const {
    brand,
    items       = [],
    endItems,
    variant     = 'default',
    color       = 'white',
    size        = 'md',
    position    = 'static',
    bordered,
    className   = '',
    activeKey,
    onSelect,
  } = props;

  const showBorder = bordered ?? (variant === 'default' || variant === 'bordered');

  const rootClass = [
    'nb-root',
    `nb-variant-${variant}`,
    `nb-color-${color}`,
    `nb-size-${size}`,
    `nb-pos-${position}`,
    showBorder ? 'nb-bordered' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={rootClass} aria-label="Main navigation">
      <div className="nb-inner">
        {/* Brand */}
        {brand && <div className="nb-brand">{brand}</div>}

        {/* Main nav links */}
        {items.length > 0 && (
          <div className="nb-links" role="menubar">
            {items.map(item => (
              <NavLink key={item.key} item={item} activeKey={activeKey} onSelect={onSelect} />
            ))}
          </div>
        )}

        {/* End slot */}
        {endItems && <div className="nb-end">{endItems}</div>}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
//  COMPOSABLE SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

export interface NavbarRootProps {
  variant?  : NavbarVariant;
  color?    : NavbarColor;
  size?     : NavbarSize;
  position? : NavbarPosition;
  bordered? : boolean;
  className?: string;
  children  : React.ReactNode;
}

function NavbarRoot({
  variant   = 'default',
  color     = 'white',
  size      = 'md',
  position  = 'static',
  bordered,
  className = '',
  children,
}: NavbarRootProps) {
  const showBorder = bordered ?? (variant === 'default' || variant === 'bordered');
  const cls = [
    'nb-root',
    `nb-variant-${variant}`,
    `nb-color-${color}`,
    `nb-size-${size}`,
    `nb-pos-${position}`,
    showBorder ? 'nb-bordered' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={cls} aria-label="Main navigation">
      <div className="nb-inner">{children}</div>
    </nav>
  );
}

function NavbarBrand({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={['nb-brand', className].filter(Boolean).join(' ')}>{children}</div>;
}

function NavbarLinks({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={['nb-links', className].filter(Boolean).join(' ')} role="menubar">
      {children}
    </div>
  );
}

function NavbarLink({
  active,
  disabled,
  icon,
  badge,
  onClick,
  children,
  className = '',
}: {
  active?   : boolean;
  disabled? : boolean;
  icon?     : React.ReactNode;
  badge?    : string | number;
  onClick?  : () => void;
  children  : React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={['nb-link', active ? 'active' : '', disabled ? 'disabled' : '', className].filter(Boolean).join(' ')}
      aria-current={active ? 'page' : undefined}
      disabled={!!disabled}
      onClick={onClick}
    >
      {icon && <span className="nb-link-icon" aria-hidden="true">{icon}</span>}
      {children}
      {badge !== undefined && <span className="nb-badge">{badge}</span>}
    </button>
  );
}

function NavbarEnd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={['nb-end', className].filter(Boolean).join(' ')}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────
//  useNavbar hook
// ─────────────────────────────────────────────────────────────

export function useNavbar(initial = '') {
  const [activeKey, setActiveKey] = React.useState(initial);
  return { activeKey, onSelect: (k: string) => setActiveKey(k) };
}

export { Navbar, NavbarRoot, NavbarBrand, NavbarLinks, NavbarLink, NavbarEnd };
export default Navbar;