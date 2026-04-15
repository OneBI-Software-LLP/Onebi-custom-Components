import React, { useState, useRef, useCallback, useId, ReactNode } from 'react';

const SIZE_MAP = {
  sm: { height: 32, fontSize: 13, padding: '0 10px' },
  md: { height: 40, fontSize: 14, padding: '0 12px' },
  lg: { height: 48, fontSize: 16, padding: '0 16px' },
};

const DEFAULT_COLORS = {
  border: '#C8C7C0',
  focus: '#185FA5',
  error: '#E24B4A',
  success: '#1D9E75',
  warning: '#BA7517',
};

export type TextFieldSize = 'sm' | 'md' | 'lg';
export type TextFieldVariant = 'outline' | 'filled' | 'underline';
export type TextFieldStatus = 'default' | 'error' | 'success' | 'warning';

export interface TextFieldColors {
  border?: string;
  focus?: string;
  error?: string;
  success?: string;
  warning?: string;
}

export interface CustomTextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onBlur' | 'onFocus'> {
  label?: string;
  helperText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;

  optional?: boolean;
  clearable?: boolean;

  validateOn?: 'blur' | 'input' | 'submit' | 'none';
  validate?: (value: string) => true | string;
  errorMessage?: string;
  successMessage?: string;

  charCounter?: boolean;
  size?: TextFieldSize;
  variant?: TextFieldVariant;
  fullWidth?: boolean;
  status?: TextFieldStatus;

  inputStyle?: React.CSSProperties;
  colors?: TextFieldColors;
  borderRadius?: number | string;
  borderWidth?: number | string;
  fontSize?: number | string;

  /**
   * Standard React onChange — receives the native event.
   * Use this when you need `e.target.value` patterns:
   *   onChange={(e) => setState(e.target.value)}
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Convenience callback — receives the string value directly.
   * Useful for simple controlled state:
   *   onValueChange={(value) => setState(value)}
   */
  onValueChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onEnter?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onValidate?: (result: { valid: boolean; message: string; value: string }) => void;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  type = 'text',
  label,
  placeholder = '',
  helperText,
  leadingIcon,
  trailingIcon,
  value: controlledValue,
  defaultValue = '',
  name,
  id: idProp,

  required = false,
  optional = false,
  disabled = false,
  readOnly = false,
  clearable = false,
  autoFocus = false,
  autoComplete,
  tabIndex,

  validateOn = 'blur',
  validate,
  pattern,
  minLength,
  maxLength,
  min,
  max,
  step,
  errorMessage = 'This field is invalid.',
  successMessage = '',

  charCounter = false,
  size = 'md',
  variant = 'outline',
  fullWidth = true,
  status: forcedStatus,

  style: wrapperStyle,
  inputStyle: inputStyleOverride,
  colors: colorsProp = {},
  borderRadius,
  borderWidth,
  fontSize: fontSizeProp,

  onChange,
  onValueChange,
  onBlur,
  onFocus,
  onClear,
  onEnter,
  onValidate,
}) => {
  const autoId = useId();
  const inputId = idProp || autoId;

  const colors = { ...DEFAULT_COLORS, ...colorsProp };
  const sizeTokens = SIZE_MAP[size] || SIZE_MAP.md;
  const height = sizeTokens.height;
  const fontSize = fontSizeProp || sizeTokens.fontSize;
  const radius =
    borderRadius !== undefined
      ? typeof borderRadius === 'number'
        ? `${borderRadius}px`
        : borderRadius
      : '8px';
  const bWidth =
    borderWidth !== undefined
      ? typeof borderWidth === 'number'
        ? `${borderWidth}px`
        : borderWidth
      : '1px';

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [validationState, setValidationState] = useState<{ status: 'idle' | 'valid' | 'invalid'; message: string }>({
    status: 'idle',
    message: '',
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const runValidate = useCallback(
    (val: string | number | readonly string[] | undefined) => {
      let status: 'idle' | 'valid' | 'invalid' = 'idle';
      let message = '';
      const stringVal = val === undefined ? '' : String(val);

      if (required && !stringVal.trim()) {
        status = 'invalid';
        message = 'This field is required.';
      } else if (stringVal !== '') {
        if (type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(stringVal)) {
          status = 'invalid';
          message = errorMessage;
        } else if (type === 'url' && !/^https?:\/\/.+/.test(stringVal)) {
          status = 'invalid';
          message = errorMessage;
        } else if (type === 'number') {
          const num = parseFloat(stringVal);
          if (isNaN(num)) {
            status = 'invalid';
            message = 'Please enter a valid number.';
          } else if (min !== undefined && num < Number(min)) {
            status = 'invalid';
            message = `Minimum value is ${min}.`;
          } else if (max !== undefined && num > Number(max)) {
            status = 'invalid';
            message = `Maximum value is ${max}.`;
          }
        } else if (minLength && stringVal.length < minLength) {
          status = 'invalid';
          message = `Minimum ${minLength} characters required.`;
        }

        if (status === 'idle' && pattern) {
          try {
            const regex = new RegExp(`^(${pattern})$`);
            if (!regex.test(stringVal)) {
              status = 'invalid';
              message = errorMessage;
            }
          } catch {}
        }

        if (status === 'idle' && validate) {
          const result = validate(stringVal);
          if (result !== true) {
            status = 'invalid';
            message = typeof result === 'string' ? result : errorMessage;
          }
        }

        if (status === 'idle') {
          status = 'valid';
          message = successMessage;
        }
      }

      const next = { status, message };
      setValidationState(next);
      onValidate?.({ valid: status !== 'invalid', message, value: stringVal });
      return next;
    },
    [required, type, pattern, min, max, minLength, validate, errorMessage, successMessage, onValidate]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    // Standard React handler: onChange={(e) => setState(e.target.value)}
    onChange?.(e);
    // Convenience handler: onValueChange={(value) => setState(value)}
    onValueChange?.(val, e);
    if (validateOn === 'input' && touched) runValidate(val);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(String(value), e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    setTouched(true);
    onBlur?.(String(value), e);
    if (validateOn === 'blur') runValidate(String(value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onEnter?.(String(value), e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    const syntheticEvent = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
    onValueChange?.('', syntheticEvent);
    setValidationState({ status: 'idle', message: '' });
    onClear?.();
    inputRef.current?.focus();
  };

  const effectiveStatus = (() => {
    if (forcedStatus && forcedStatus !== 'default') return forcedStatus;
    if (validationState.status === 'invalid') return 'error';
    if (validationState.status === 'valid') return 'success';
    return 'default';
  })();

  const borderColor = (() => {
    if (focused && effectiveStatus === 'default') return colors.focus;
    if (effectiveStatus === 'error') return colors.error;
    if (effectiveStatus === 'success') return colors.success;
    if (effectiveStatus === 'warning') return colors.warning;
    return colors.border;
  })();

  const focusRing = (() => {
    const ringColor = (() => {
      if (effectiveStatus === 'error') return colors.error;
      if (effectiveStatus === 'success') return colors.success;
      if (effectiveStatus === 'warning') return colors.warning;
      return colors.focus;
    })();
    return focused ? `0 0 0 3px ${ringColor}28` : 'none';
  })();

  const charCount = String(value || '').length;
  const overLimit = maxLength && charCount > maxLength;
  const showClear = clearable && String(value || '') !== '' && !disabled && !readOnly;

  const paddingLeft = leadingIcon ? `${height * 0.7 + 6}px` : sizeTokens.padding.split(' ')[1];
  const paddingRight =
    showClear || trailingIcon
      ? `${(showClear ? 32 : 0) + (trailingIcon ? 28 : 0)}px`
      : sizeTokens.padding.split(' ')[1];

  const variantStyle = (() => {
    if (variant === 'filled') {
      return {
        background: focused
          ? 'var(--color-background-primary, #fff)'
          : 'var(--color-background-secondary, #f4f4f0)',
        border: `${bWidth} solid ${borderColor}`,
      };
    }
    if (variant === 'underline') {
      return {
        background: 'transparent',
        border: 'none',
        borderBottom: `${bWidth} solid ${borderColor}`,
        borderRadius: 0,
        boxShadow: 'none',
      };
    }
    return {
      background: disabled
        ? 'var(--color-background-secondary, #f4f4f0)'
        : 'var(--color-background-primary, #fff)',
      border: `${bWidth} solid ${borderColor}`,
    };
  })();

  const wrapStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'inherit',
    ...wrapperStyle,
  };

  const computedInputStyle: React.CSSProperties = {
    width: '100%',
    height: `${height}px`,
    fontSize: `${fontSize}px`,
    fontFamily: 'inherit',
    color: disabled
      ? 'var(--color-text-tertiary, #888)'
      : 'var(--color-text-primary, #1a1a18)',
    borderRadius: variant === 'underline' ? 0 : radius,
    paddingLeft,
    paddingRight,
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
    cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',
    opacity: disabled ? 0.6 : 1,
    boxShadow: variant === 'underline' ? 'none' : focusRing,
    boxSizing: 'border-box',
    ...variantStyle,
    ...inputStyleOverride,
  };

  const subColor = (() => {
    if (effectiveStatus === 'error') return colors.error;
    if (effectiveStatus === 'success') return colors.success;
    if (effectiveStatus === 'warning') return colors.warning;
    return 'var(--color-text-tertiary, #888)';
  })();

  const subMessage = (() => {
    if (effectiveStatus === 'error') return validationState.message || errorMessage;
    if (effectiveStatus === 'success' && successMessage) return validationState.message || successMessage;
    if (effectiveStatus === 'warning') return helperText;
    return helperText;
  })();

  const StatusIcon = () => {
    if (effectiveStatus === 'error')
      return (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="8" cy="8" r="7.5" stroke={colors.error} />
          <path d="M8 4.5v4" stroke={colors.error} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.75" fill={colors.error} />
        </svg>
      );
    if (effectiveStatus === 'success')
      return (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="8" cy="8" r="7.5" stroke={colors.success} />
          <path d="M5 8l2.2 2.2L11 5.5" stroke={colors.success} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    return null;
  };

  return (
    <div style={wrapStyles}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
          <label
            htmlFor={inputId}
            style={{
              fontSize: `${Math.max(Number(fontSize) - 1, 12)}px`,
              fontWeight: 500,
              color: disabled ? 'var(--color-text-tertiary, #aaa)' : 'var(--color-text-primary, #1a1a18)',
              cursor: disabled ? 'not-allowed' : 'default',
              userSelect: 'none',
            }}
          >
            {label}
            {required && (
              <span style={{ color: colors.error, marginLeft: 2, fontWeight: 500 }}>*</span>
            )}
          </label>
          {optional && !required && (
            <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #aaa)' }}>optional</span>
          )}
        </div>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leadingIcon && (
          <span
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${fontSize}px`,
              color: 'var(--color-text-tertiary, #888)',
              pointerEvents: 'none',
              width: height * 0.55,
              zIndex: 1,
            }}
          >
            {leadingIcon}
          </span>
        )}

        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type={type}
          value={value === undefined ? '' : value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          tabIndex={tabIndex}
          maxLength={maxLength}
          min={type === 'number' ? min : undefined}
          max={type === 'number' ? max : undefined}
          step={type === 'number' ? step : undefined}
          style={computedInputStyle}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-required={required}
          aria-invalid={effectiveStatus === 'error'}
          aria-describedby={`${inputId}-sub`}
        />

        {showClear && (
          <button
            type="button"
            onClick={handleClear}
            tabIndex={-1}
            aria-label="Clear input"
            style={{
              position: 'absolute',
              right: trailingIcon ? 34 : 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              borderRadius: '50%',
              color: 'var(--color-text-tertiary, #aaa)',
              fontSize: 12,
              padding: 0,
              transition: 'background 0.1s, color 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-background-secondary, #f0f0ec)';
              e.currentTarget.style.color = 'var(--color-text-primary, #1a1a18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = 'var(--color-text-tertiary, #aaa)';
            }}
          >
            ✕
          </button>
        )}

        {trailingIcon && (
          <span
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              fontSize: `${fontSize}px`,
              color: 'var(--color-text-tertiary, #888)',
              pointerEvents: 'none',
            }}
          >
            {trailingIcon}
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 4,
          minHeight: subMessage || (charCounter && maxLength) ? 18 : 0,
        }}
      >
        <div id={`${inputId}-sub`} style={{ display: 'flex', alignItems: 'flex-start', gap: 4, fontSize: 12, color: subColor, lineHeight: 1.4, flex: 1 }}>
          <StatusIcon />
          <span>{subMessage}</span>
        </div>

        {charCounter && maxLength && (
          <span
            style={{
              fontSize: 11,
              color: overLimit ? colors.error : 'var(--color-text-tertiary, #aaa)',
              marginLeft: 8,
              whiteSpace: 'nowrap',
              fontWeight: overLimit ? 500 : 400,
            }}
          >
            {charCount} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
