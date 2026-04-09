import React from 'react';
import '@/styles/ui/checkbox.css';

export type CheckboxSize    = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'filled' | 'card';
export type CheckboxColor   = 'primary' | 'success' | 'danger' | 'warning';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  color?: CheckboxColor;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface CheckboxGroupItemProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  value: string;
}

const GroupContext = React.createContext<{
  value: string[];
  onChange: (v: string, checked: boolean) => void;
  disabled?: boolean;
} | null>(null);

function CheckIcon({ size }: { size: CheckboxSize }) {
  const s = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
  return (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IndeterminateIcon({ size }: { size: CheckboxSize }) {
  const s = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
  return (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function Checkbox({
  checked,
  defaultChecked,
  indeterminate = false,
  onChange,
  label,
  description,
  size = 'md',
  variant = 'default',
  color = 'primary',
  disabled,
  required,
  id,
  className = '',
}: CheckboxProps) {
  const group = React.useContext(GroupContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isDisabled = disabled || group?.disabled;

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isChecked = checked !== undefined ? checked : undefined;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.checked);
  }

  const cls = [
    'cb-root',
    `cb-size-${size}`,
    `cb-variant-${variant}`,
    `cb-color-${color}`,
    isDisabled ? 'cb-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const isCheckedOrIndeterminate = (isChecked || indeterminate);

  return (
    <label className={cls} htmlFor={id}>
      <span className="cb-box-wrap">
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          checked={isChecked}
          defaultChecked={defaultChecked}
          disabled={!!isDisabled}
          required={required}
          aria-checked={indeterminate ? 'mixed' : isChecked}
          onChange={handleChange}
          className="cb-input"
        />
        <span className={['cb-box', isCheckedOrIndeterminate ? 'cb-checked' : ''].filter(Boolean).join(' ')}>
          {indeterminate
            ? <IndeterminateIcon size={size} />
            : isCheckedOrIndeterminate
              ? <CheckIcon size={size} />
              : null}
        </span>
      </span>
      {(label || description) && (
        <span className="cb-label-wrap">
          {label && <span className="cb-label">{label}{required && <span className="cb-required" aria-hidden="true"> *</span>}</span>}
          {description && <span className="cb-description">{description}</span>}
        </span>
      )}
    </label>
  );
}

export function CheckboxGroup({
  value,
  defaultValue = [],
  onChange,
  orientation = 'vertical',
  disabled,
  className = '',
  children,
}: CheckboxGroupProps) {
  const [internal, setInternal] = React.useState<string[]>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value! : internal;

  function handleChange(v: string, checked: boolean) {
    const next = checked ? [...current, v] : current.filter(i => i !== v);
    if (!controlled) setInternal(next);
    onChange?.(next);
  }

  return (
    <GroupContext.Provider value={{ value: current, onChange: handleChange, disabled }}>
      <div
        className={['cb-group', `cb-group-${orientation}`, className].filter(Boolean).join(' ')}
        role="group"
      >
        {children}
      </div>
    </GroupContext.Provider>
  );
}

export function CheckboxGroupItem({ value, checked, onChange, ...rest }: CheckboxGroupItemProps & { checked?: boolean; onChange?: (c: boolean) => void }) {
  const group = React.useContext(GroupContext);
  const isChecked = group ? group.value.includes(value) : checked;

  function handleChange(c: boolean) {
    group?.onChange(value, c);
    onChange?.(c);
  }

  return <Checkbox {...rest} checked={isChecked} onChange={handleChange} />;
}

export function useCheckbox(initial = false) {
  const [checked, setChecked] = React.useState(initial);
  return { checked, onChange: (c: boolean) => setChecked(c) };
}

export function useCheckboxGroup(initial: string[] = []) {
  const [value, setValue] = React.useState<string[]>(initial);
  return { value, onChange: (v: string[]) => setValue(v) };
}

export default Checkbox;