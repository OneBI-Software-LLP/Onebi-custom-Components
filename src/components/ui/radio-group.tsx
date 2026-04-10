import React from 'react';
import './styles/radio-group.css';

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type RadioGroupVariant     = 'default' | 'card' | 'button' | 'soft';
export type RadioGroupColor       = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
export type RadioGroupSize        = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioItem {
  /** Unique value for this option */
  value: string;

  /** Label text shown next to the radio */
  label: React.ReactNode;

  /** Optional description shown below the label */
  description?: React.ReactNode;

  /** Icon rendered inside card / button variants */
  icon?: React.ReactNode;

  /** Disable this specific option */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Radio option definitions */
  items: RadioItem[];

  /** Controlled selected value */
  value?: string;

  /** Default selected value (uncontrolled) */
  defaultValue?: string;

  /** Called when selection changes */
  onChange?: (value: string) => void;

  /** Visual style. Default: 'default' */
  variant?: RadioGroupVariant;

  /** Accent color. Default: 'primary' */
  color?: RadioGroupColor;

  /** Size preset. Default: 'md' */
  size?: RadioGroupSize;

  /** Horizontal or vertical layout. Default: 'vertical' */
  orientation?: RadioGroupOrientation;

  /** Group label / legend */
  label?: React.ReactNode;

  /** Extra classes for the root element */
  className?: string;
}

// ─────────────────────────────────────────────────────────────
//  RADIO GROUP
// ─────────────────────────────────────────────────────────────

function RadioGroup(props: RadioGroupProps) {
  const {
    items,
    value        : controlledValue,
    defaultValue,
    onChange,
    variant      = 'default',
    color        = 'primary',
    size         = 'md',
    orientation  = 'vertical',
    label,
    className    = '',
  } = props;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue ?? ''
  );

  const activeValue = isControlled ? controlledValue! : internalValue;

  function select(val: string) {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    const enabled = items.filter(i => !i.disabled);
    const ci      = enabled.findIndex(i => i.value === items[idx].value);
    const isHoriz = orientation === 'horizontal';

    const prevKey = isHoriz ? 'ArrowLeft'  : 'ArrowUp';
    const nextKey = isHoriz ? 'ArrowRight' : 'ArrowDown';

    if (e.key === prevKey) {
      e.preventDefault();
      select(enabled[(ci - 1 + enabled.length) % enabled.length].value);
    } else if (e.key === nextKey) {
      e.preventDefault();
      select(enabled[(ci + 1) % enabled.length].value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(enabled[0].value);
    } else if (e.key === 'End') {
      e.preventDefault();
      select(enabled[enabled.length - 1].value);
    }
  }

  const rootClass = [
    'rg-root',
    `rg-size-${size}`,
    `rg-variant-${variant}`,
    `rg-color-${color}`,
    `rg-${orientation}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <fieldset className={rootClass}>
      {label && <legend className="rg-legend">{label}</legend>}

      <div
        className="rg-list"
        role="radiogroup"
        aria-orientation={orientation}
      >
        {items.map((item, idx) => {
          const isChecked  = item.value === activeValue;
          const isDisabled = !!item.disabled;

          return (
            <label
              key={item.value}
              className={[
                'rg-item',
                isChecked  ? 'checked'  : '',
                isDisabled ? 'disabled' : '',
              ].filter(Boolean).join(' ')}
              data-state={isChecked ? 'checked' : 'unchecked'}
            >
              <input
                type="radio"
                className="rg-input"
                name={`rg-${label ?? 'group'}`}
                value={item.value}
                checked={isChecked}
                disabled={isDisabled}
                tabIndex={isChecked ? 0 : -1}
                onChange={() => !isDisabled && select(item.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              />

              {/* custom radio circle — hidden in card/button variants */}
              <span className="rg-circle" aria-hidden="true">
                <span className="rg-dot" />
              </span>

              {/* icon slot (card / button variants) */}
              {item.icon && (
                <span className="rg-icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}

              <span className="rg-text">
                <span className="rg-label">{item.label}</span>
                {item.description && (
                  <span className="rg-description">{item.description}</span>
                )}
              </span>

              {/* card-variant check mark */}
              <span className="rg-check" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─────────────────────────────────────────────────────────────
//  useRadio hook
// ─────────────────────────────────────────────────────────────

export function useRadio(initial = '') {
  const [value, setValue] = React.useState(initial);
  return {
    value,
    onChange: (v: string) => setValue(v),
  };
}

export { RadioGroup };
export default RadioGroup;