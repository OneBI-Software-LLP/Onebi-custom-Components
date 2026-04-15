import React from 'react';
import './styles/tabs.css';

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type TabsVariant   = 'pills' | 'line' | 'enclosed' | 'solid' | 'soft';
export type TabsColor     = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
export type TabsSize      = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabItem {
  /** Unique key used as the value */
  value: string;

  /** Label text shown in the trigger */
  label: React.ReactNode;

  /** Icon rendered before the label */
  icon?: React.ReactNode;

  /** Badge count / label shown on the trigger */
  badge?: string | number;

  /** Disable this specific tab */
  disabled?: boolean;

  /** Content panel for this tab */
  content?: React.ReactNode;
}

export interface TabsProps {
  /** Tab definitions */
  tabs: TabItem[];

  /** Controlled active value */
  value?: string;

  /** Default active value (uncontrolled) */
  defaultValue?: string;

  /** Called when the active tab changes */
  onChange?: (value: string) => void;

  /** Visual style. Default: 'pills' */
  variant?: TabsVariant;

  /** Accent color. Default: 'primary' */
  color?: TabsColor;

  /** Size preset. Default: 'md' */
  size?: TabsSize;

  /** Horizontal or vertical layout. Default: 'horizontal' */
  orientation?: TabsOrientation;

  /** Stretch the tab list to full width */
  fullWidth?: boolean;

  /** Extra classes for the root element */
  className?: string;

  /** Extra classes for the tab list */
  listClassName?: string;

  /** Extra classes for every content panel */
  contentClassName?: string;
}

// ─────────────────────────────────────────────────────────────
//  CLASS BUILDER
// ─────────────────────────────────────────────────────────────

function buildRootClass(props: TabsProps): string {
  const {
    variant     = 'pills',
    color       = 'primary',
    size        = 'md',
    orientation = 'horizontal',
    className   = '',
  } = props;

  const classes = [
    'tabs-root',
    `tabs-${size}`,
    `tabs-variant-${variant}`,
    `tabs-color-${color}`,
    orientation === 'vertical' ? 'tabs-vertical' : '',
    className,
  ];

  return classes.filter(Boolean).join(' ');
}

// ─────────────────────────────────────────────────────────────
//  TABS
// ─────────────────────────────────────────────────────────────

function Tabs(props: TabsProps) {
  const {
    tabs,
    value        : controlledValue,
    defaultValue,
    onChange,
    variant      = 'pills',
    color        = 'primary',
    size         = 'md',
    orientation  = 'horizontal',
    fullWidth    = false,
    listClassName  = '',
    contentClassName = '',
  } = props;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue ?? tabs.find(t => !t.disabled)?.value ?? ''
  );

  const activeValue = isControlled ? controlledValue! : internalValue;

  function activate(val: string) {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent, currentIndex: number) {
    const enabled = tabs.filter(t => !t.disabled);
    const ci      = enabled.findIndex(t => t.value === tabs[currentIndex].value);
    const isVert  = orientation === 'vertical';

    const prevKey = isVert ? 'ArrowUp'   : 'ArrowLeft';
    const nextKey = isVert ? 'ArrowDown' : 'ArrowRight';

    if (e.key === prevKey) {
      e.preventDefault();
      const prev = enabled[(ci - 1 + enabled.length) % enabled.length];
      activate(prev.value);
    } else if (e.key === nextKey) {
      e.preventDefault();
      const next = enabled[(ci + 1) % enabled.length];
      activate(next.value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      activate(enabled[0].value);
    } else if (e.key === 'End') {
      e.preventDefault();
      activate(enabled[enabled.length - 1].value);
    }
  }

  const rootClass = buildRootClass(props);
  const listClass = [
    'tabs-list',
    fullWidth ? 'tabs-list-full' : '',
    listClassName,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      {/* ── Tab list ── */}
      <div
        className={listClass}
        role="tablist"
        aria-orientation={orientation}
      >
        {tabs.map((tab, idx) => {
          const isActive   = tab.value === activeValue;
          const isDisabled = !!tab.disabled;

          return (
            <button
              key={tab.value}
              role="tab"
              type="button"
              id={`tab-trigger-${tab.value}`}
              aria-controls={`tab-panel-${tab.value}`}
              aria-selected={isActive}
              aria-disabled={isDisabled || undefined}
              data-state={isActive ? 'active' : 'inactive'}
              data-disabled={isDisabled || undefined}
              disabled={isDisabled}
              className="tabs-trigger"
              tabIndex={isActive ? 0 : -1}
              onClick={() => !isDisabled && activate(tab.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {tab.icon && (
                <span className="tabs-trigger-icon" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              {tab.label}
              {tab.badge !== undefined && (
                <span className="tabs-trigger-badge">{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Content panels ── */}
      {tabs.map(tab => (
        <div
          key={tab.value}
          role="tabpanel"
          id={`tab-panel-${tab.value}`}
          aria-labelledby={`tab-trigger-${tab.value}`}
          data-state={tab.value === activeValue ? 'active' : 'inactive'}
          tabIndex={0}
          className={['tabs-content', contentClassName].filter(Boolean).join(' ')}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  COMPOSABLE SUB-COMPONENTS (for manual composition)
// ─────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeValue : string;
  activate    : (v: string) => void;
  orientation : TabsOrientation;
}

const TabsContext = React.createContext<TabsContextValue>({
  activeValue : '',
  activate    : () => {},
  orientation : 'horizontal',
});

export interface TabsRootProps {
  value?        : string;
  defaultValue? : string;
  onChange?     : (value: string) => void;
  variant?      : TabsVariant;
  color?        : TabsColor;
  size?         : TabsSize;
  orientation?  : TabsOrientation;
  fullWidth?    : boolean;
  className?    : string;
  children      : React.ReactNode;
}

function TabsRoot({
  value        : controlledValue,
  defaultValue = '',
  onChange,
  variant      = 'pills',
  color        = 'primary',
  size         = 'md',
  orientation  = 'horizontal',
  fullWidth    = false,
  className    = '',
  children,
}: TabsRootProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeValue = isControlled ? controlledValue! : internalValue;

  function activate(val: string) {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }

  const rootClass = [
    'tabs-root',
    `tabs-${size}`,
    `tabs-variant-${variant}`,
    `tabs-color-${color}`,
    orientation === 'vertical' ? 'tabs-vertical' : '',
    fullWidth ? 'tabs-list-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <TabsContext.Provider value={{ activeValue, activate, orientation }}>
      <div className={rootClass}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps {
  fullWidth?  : boolean;
  className?  : string;
  children    : React.ReactNode;
}

function TabsList({ fullWidth = false, className = '', children }: TabsListProps) {
  const { orientation } = React.useContext(TabsContext);
  const cls = ['tabs-list', fullWidth ? 'tabs-list-full' : '', className]
    .filter(Boolean).join(' ');
  return (
    <div className={cls} role="tablist" aria-orientation={orientation}>
      {children}
    </div>
  );
}

export interface TabsTriggerProps {
  value       : string;
  disabled?   : boolean;
  icon?       : React.ReactNode;
  badge?      : string | number;
  className?  : string;
  children    : React.ReactNode;
}

function TabsTrigger({
  value,
  disabled   = false,
  icon,
  badge,
  className  = '',
  children,
}: TabsTriggerProps) {
  const { activeValue, activate } = React.useContext(TabsContext);
  const isActive = value === activeValue;

  return (
    <button
      role="tab"
      type="button"
      id={`tab-trigger-${value}`}
      aria-controls={`tab-panel-${value}`}
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      data-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={['tabs-trigger', className].filter(Boolean).join(' ')}
      onClick={() => !disabled && activate(value)}
    >
      {icon && <span className="tabs-trigger-icon" aria-hidden="true">{icon}</span>}
      {children}
      {badge !== undefined && <span className="tabs-trigger-badge">{badge}</span>}
    </button>
  );
}

export interface TabsContentProps {
  value      : string;
  className? : string;
  children   : React.ReactNode;
}

function TabsContent({ value, className = '', children }: TabsContentProps) {
  const { activeValue } = React.useContext(TabsContext);
  return (
    <div
      role="tabpanel"
      id={`tab-panel-${value}`}
      aria-labelledby={`tab-trigger-${value}`}
      data-state={value === activeValue ? 'active' : 'inactive'}
      tabIndex={0}
      className={['tabs-content', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  useTab hook
// ─────────────────────────────────────────────────────────────

export function useTab(initial = '') {
  const [value, setValue] = React.useState(initial);
  return {
    value,
    onChange: (v: string) => setValue(v),
  };
}

export { Tabs, TabsRoot, TabsList, TabsTrigger, TabsContent };
export default Tabs;