import React from 'react';
import '@/components/ui/styles/textarea.css';

export type TextareaSize    = 'sm' | 'md' | 'lg';
export type TextareaVariant = 'default' | 'filled' | 'flushed';
export type TextareaResize  = 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';

export interface TextareaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  hint?: string;
  size?: TextareaSize;
  variant?: TextareaVariant;
  resize?: TextareaResize;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

export function Textarea({
  value,
  defaultValue,
  onChange,
  placeholder,
  label,
  description,
  error,
  hint,
  size = 'md',
  variant = 'default',
  resize = 'vertical',
  rows = 3,
  maxLength,
  showCount = false,
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus,
  id,
  name,
  className = '',
}: TextareaProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? '');
  const controlled = value !== undefined;
  const current = controlled ? value! : internal;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (resize === 'auto' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [current, resize]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    if (!controlled) setInternal(val);
    onChange?.(val);
  }

  const hasError = !!error;
  const footerMsg = error || hint;

  const wrapCls = [
    'ta-wrap',
    `ta-size-${size}`,
    `ta-variant-${variant}`,
    hasError   ? 'ta-error'    : '',
    disabled   ? 'ta-disabled' : '',
    readOnly   ? 'ta-readonly' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapCls}>
      {label && (
        <label className="ta-label" htmlFor={id}>
          {label}
          {required && <span className="ta-required" aria-hidden="true"> *</span>}
        </label>
      )}
      {description && <p className="ta-description">{description}</p>}

      <div className="ta-field-wrap">
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          className="ta-field"
          value={current}
          placeholder={placeholder}
          rows={resize === 'auto' ? 1 : rows}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={footerMsg ? `${id}-msg` : undefined}
          style={{ resize: resize === 'auto' ? 'none' : resize }}
          onChange={handleChange}
        />
      </div>

      {(footerMsg || (showCount && maxLength)) && (
        <div className="ta-footer" id={`${id}-msg`}>
          {footerMsg && (
            <span className={hasError ? 'ta-error-msg' : 'ta-hint-msg'}>
              {footerMsg}
            </span>
          )}
          {showCount && maxLength && (
            <span className="ta-count">
              {current.length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function useTextarea(initial = '') {
  const [value, setValue] = React.useState(initial);
  return { value, onChange: (v: string) => setValue(v) };
}

export default Textarea;