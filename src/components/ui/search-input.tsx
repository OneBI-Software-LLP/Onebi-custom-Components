import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import './styles/search-input.css';

// ─────────────────────────────────────────────────────────────
//  SHARED TYPES
// ─────────────────────────────────────────────────────────────

export type SearchInputSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SearchInputVariant = 'outlined' | 'filled' | 'underline' | 'ghost';
export type SearchInputShape   = 'default' | 'pill' | 'square';
export type SearchInputStatus  = 'default' | 'error' | 'success' | 'warning';


// ─────────────────────────────────────────────────────────────
//  SEARCH INPUT  (basic, with clear, with kbd hint, loading)
// ─────────────────────────────────────────────────────────────

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /** Visual style family. Default: 'outlined' */
  variant?: SearchInputVariant;

  /** Size preset. Default: 'md' */
  size?: SearchInputSize;

  /** Border-radius shape. Default: 'default' (8px) */
  shape?: SearchInputShape;

  /** Validation status color. Default: 'default' */
  status?: SearchInputStatus;

  /** Show the magnifying glass icon on the left */
  showIcon?: boolean;

  /**
   * Show an animated × clear button in the right slot when the
   * input has a value. Calls `onChange('')` when clicked.
   */
  clearable?: boolean;

  /**
   * Keyboard shortcut hint shown in the right slot (e.g. "⌘K").
   * Hidden once the user starts typing.
   */
  shortcutHint?: string;

  /**
   * Show a loading spinner and bottom-bar animation.
   * Replaces the clear button while active.
   */
  loading?: boolean;

  /**
   * Autocomplete suggestion shown as ghost text after the cursor.
   * The component accepts the suggestion when the user presses Tab.
   */
  suggestion?: string;

  /** Controlled value */
  value?: string;

  /** Called on every change, receives the raw string value */
  onChange?: (value: string) => void;

  /** Extra class names added to the wrapper div */
  wrapperClassName?: string;

  /** Extra class names added to the <input> element */
  className?: string;
}

// Internal icon components
const SearchIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ICON_SIZES: Record<SearchInputSize, number> = {
  xs: 12, sm: 13, md: 15, lg: 16, xl: 18,
};

const VARIANT_CLASS: Record<SearchInputVariant, string> = {
  outlined : '',
  filled   : 'si-filled',
  underline: 'si-underline',
  ghost    : 'si-ghost-input',
};

const STATUS_CLASS: Record<SearchInputStatus, string> = {
  default: '',
  error  : 'si-status-error',
  success: 'si-status-success',
  warning: 'si-status-warning',
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const {
      variant         = 'outlined',
      size            = 'md',
      shape           = 'default',
      status          = 'default',
      showIcon        = true,
      clearable       = false,
      shortcutHint,
      loading         = false,
      suggestion      = '',
      value: valueProp,
      onChange,
      wrapperClassName = '',
      className        = '',
      placeholder      = 'Search…',
      disabled,
      onKeyDown,
      ...rest
    } = props;

    // Controlled / uncontrolled value
    const [internalValue, setInternalValue] = useState(valueProp ?? '');
    const value = valueProp !== undefined ? valueProp : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      if (valueProp === undefined) setInternalValue(v);
      onChange?.(v);
    };

    const handleClear = () => {
      if (valueProp === undefined) setInternalValue('');
      onChange?.('');
    };

    // Tab to accept suggestion
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab' && suggestion && suggestion.startsWith(value)) {
        e.preventDefault();
        const accepted = suggestion;
        if (valueProp === undefined) setInternalValue(accepted);
        onChange?.(accepted);
      }
      onKeyDown?.(e);
    };

    // Wrapper classes
    const showClear     = clearable && !loading && value.length > 0;
    const showKbd       = shortcutHint && !value && !loading;
    const hasRight      = loading || showClear || !!showKbd;
    const hasRightWide  = !!showKbd && !loading && !showClear;

    const wrapClasses = [
      'si-wrap',
      showIcon  ? 'has-left'       : '',
      hasRight  ? (hasRightWide ? 'has-right-wide' : 'has-right') : '',
      loading   ? 'is-loading'     : '',
      wrapperClassName,
    ].filter(Boolean).join(' ');

    const inputClasses = [
      'si',
      `si-${size}`,
      VARIANT_CLASS[variant],
      shape !== 'default' ? `si-${shape}` : '',
      STATUS_CLASS[status],
      className,
    ].filter(Boolean).join(' ');

    const iconStatusClass =
      status === 'error'   ? 'si-icon-error'   :
      status === 'success' ? 'si-icon-success'  :
      status === 'warning' ? 'si-icon-warning'  : '';

    // Suggestion ghost text
    const ghostText = suggestion && value && suggestion.startsWith(value)
      ? suggestion.slice(value.length)
      : '';

    return (
      <div className={wrapClasses}>
        <input
          ref={ref}
          type="search"
          className={inputClasses}
          value={value}
          placeholder={placeholder}
          disabled={disabled || loading}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-busy={loading}
          {...rest}
        />

        {/* Left icon */}
        {showIcon && (
          <span className={`si-icon-left ${iconStatusClass}`} aria-hidden="true">
            <SearchIcon size={ICON_SIZES[size]} />
          </span>
        )}

        {/* Autocomplete ghost */}
        {ghostText && (
          <span className="si-suggestion" aria-hidden="true">
            <span style={{ opacity: 0 }}>{value}</span>
            <span className="si-suggestion-ghost">{ghostText}</span>
          </span>
        )}

        {/* Right slot */}
        {hasRight && (
          <span className="si-right">
            {loading && (
              <span className="si-spinner" role="status" aria-label="Loading" />
            )}
            {showClear && (
              <button
                type="button"
                className="si-clear"
                onClick={handleClear}
                aria-label="Clear search"
                tabIndex={-1}
              >
                <ClearIcon />
              </button>
            )}
            {showKbd && (
              <span className="si-kbd" aria-hidden="true">{shortcutHint}</span>
            )}
          </span>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';


// ─────────────────────────────────────────────────────────────
//  COMMAND PALETTE TYPES
// ─────────────────────────────────────────────────────────────

export interface CommandItem {
  id       : string;
  name     : string;
  /** Secondary descriptor shown below the name */
  subtitle?: string;
  /** Optional keyboard shortcut label shown on the right */
  shortcut?: string;
  /** Icon element rendered in the item icon box */
  icon?    : React.ReactNode;
  /** Called when the user selects this item */
  onSelect?: () => void;
}

export interface CommandGroup {
  /** Group heading label */
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  /** Whether the palette is visible */
  open: boolean;
  /** Called when the user presses Esc or clicks the backdrop */
  onClose: () => void;
  /** Data to display, organised into groups */
  groups: CommandGroup[];
  /** Input placeholder text */
  placeholder?: string;
  /**
   * Custom filter function. Receives the query string and the full groups array.
   * Return the filtered groups. Defaults to case-insensitive substring match
   * on item name + subtitle.
   */
  filterFn?: (query: string, groups: CommandGroup[]) => CommandGroup[];
  /** Called when the user selects an item (after onSelect on the item fires) */
  onSelect?: (item: CommandItem) => void;
}

// ─────────────────────────────────────────────────────────────
//  DEFAULT FILTER
// ─────────────────────────────────────────────────────────────

function defaultFilter(query: string, groups: CommandGroup[]): CommandGroup[] {
  if (!query.trim()) return groups;
  const q = query.toLowerCase();
  return groups
    .map(g => ({
      ...g,
      items: g.items.filter(it =>
        it.name.toLowerCase().includes(q) ||
        (it.subtitle ?? '').toLowerCase().includes(q)
      ),
    }))
    .filter(g => g.items.length > 0);
}

// Highlight matching substring
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="si-match-hl">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}


// ─────────────────────────────────────────────────────────────
//  COMMAND PALETTE COMPONENT
// ─────────────────────────────────────────────────────────────

/**
 * CommandPalette
 *
 * Renders a floating search-driven command palette.
 * Manages its own internal query state and keyboard navigation.
 *
 * @example
 * const [open, setOpen] = useState(false);
 *
 * // Open with ⌘K
 * useEffect(() => {
 *   const handler = (e: KeyboardEvent) => {
 *     if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
 *       e.preventDefault();
 *       setOpen(v => !v);
 *     }
 *   };
 *   window.addEventListener('keydown', handler);
 *   return () => window.removeEventListener('keydown', handler);
 * }, []);
 *
 * <CommandPalette
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   groups={myGroups}
 *   onSelect={(item) => console.log('selected', item)}
 * />
 */
export function CommandPalette({
  open,
  onClose,
  groups,
  placeholder = 'Search commands, pages, actions…',
  filterFn    = defaultFilter,
  onSelect,
}: CommandPaletteProps) {
  const [query,     setQuery]     = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);
  const id = useId();

  // Focus input when palette opens; reset on close
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Flatten filtered items for keyboard navigation
  const filteredGroups = filterFn(query, groups);
  const flatItems      = filteredGroups.flatMap(g => g.items);

  const select = useCallback(
    (item: CommandItem) => {
      item.onSelect?.();
      onSelect?.(item);
      onClose();
    },
    [onSelect, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, flatItems.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && flatItems[activeIdx]) {
      e.preventDefault();
      select(flatItems[activeIdx]);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLDivElement>('.si-cmd-item.is-active');
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  if (!open) return null;

  let globalIdx = 0;

  return (
    <div
      className="si-cmd-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="si-cmd-box" onKeyDown={handleKeyDown}>
        {/* Input row */}
        <div className="si-cmd-input-row">
          <SearchIcon size={16} />
          <input
            ref={inputRef}
            className="si-cmd-input"
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
            autoComplete="off"
            spellCheck={false}
            aria-autocomplete="list"
            aria-controls={`${id}-results`}
            aria-activedescendant={
              flatItems[activeIdx] ? `${id}-item-${flatItems[activeIdx].id}` : undefined
            }
          />
          {query && (
            <button
              type="button"
              className="si-cmd-clear"
              onClick={() => { setQuery(''); setActiveIdx(0); inputRef.current?.focus(); }}
              aria-label="Clear query"
            >
              <ClearIcon />
            </button>
          )}
          <span className="si-kbd" aria-label="Press Escape to close">esc</span>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="si-cmd-results"
          id={`${id}-results`}
          role="listbox"
        >
          {flatItems.length === 0 ? (
            <div className="si-cmd-empty">
              {query ? `No results for "${query}"` : 'No commands available'}
            </div>
          ) : (
            filteredGroups.map(group => (
              <div key={group.label}>
                <div className="si-cmd-group" role="presentation">{group.label}</div>
                {group.items.map(item => {
                  const idx       = globalIdx++;
                  const isActive  = idx === activeIdx;
                  return (
                    <div
                      key={item.id}
                      id={`${id}-item-${item.id}`}
                      className={`si-cmd-item${isActive ? ' is-active' : ''}`}
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => select(item)}
                    >
                      {item.icon && (
                        <div className="si-cmd-item-icon">{item.icon}</div>
                      )}
                      <div className="si-cmd-item-body">
                        <div className="si-cmd-item-name">
                          <HighlightMatch text={item.name} query={query} />
                        </div>
                        {item.subtitle && (
                          <div className="si-cmd-item-sub">
                            <HighlightMatch text={item.subtitle} query={query} />
                          </div>
                        )}
                      </div>
                      {item.shortcut && (
                        <span className="si-cmd-item-kbd">{item.shortcut}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="si-cmd-footer" aria-hidden="true">
          <div className="si-cmd-hint">
            <span className="si-kbd">↑↓</span> navigate
          </div>
          <div className="si-cmd-sep" />
          <div className="si-cmd-hint">
            <span className="si-kbd">↵</span> select
          </div>
          <div className="si-cmd-sep" />
          <div className="si-cmd-hint">
            <span className="si-kbd">esc</span> close
          </div>
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
//  useCommandPalette  — convenience hook
//
//  Handles the ⌘K / Ctrl+K toggle shortcut for you.
//
//  @example
//  const { open, setOpen, toggle } = useCommandPalette();
//  <CommandPalette open={open} onClose={() => setOpen(false)} groups={...} />
// ─────────────────────────────────────────────────────────────
export function useCommandPalette(shortcut = 'k') {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcut) {
        e.preventDefault();
        setOpen(v => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcut]);

  return { open, setOpen, toggle: () => setOpen(v => !v) };
}

export default SearchInput;
