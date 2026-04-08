import React, { useState, useEffect } from 'react';

export interface SwitchProps {
  /** The controlled checked state */
  checked?: boolean;
  /** The default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback fired when the state changes */
  onChange?: (checked: boolean) => void;
  /** The size of the switch */
  size?: 'sm' | 'md' | 'lg';
  /** The color when active */
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral';
  /** Disables the switch */
  disabled?: boolean;
  /** Optional label text */
  label?: string;
  /** Where to position the label */
  labelPosition?: 'left' | 'right';
  /** Additional custom classes */
  className?: string;
}

// Maps track dimensions, thumb dimensions, and translation distances
const sizeConfig = {
  sm: {
    track: 'w-8 h-4',
    thumb: 'w-3 h-3',
    translate: 'translate-x-4',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    translate: 'translate-x-5',
  },
  lg: {
    track: 'w-14 h-8',
    thumb: 'w-7 h-7',
    translate: 'translate-x-6',
  },
};

// Maps active background colors
const colorClasses = {
  primary: 'bg-blue-600',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  neutral: 'bg-gray-800',
};

export const CustomSwitch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  size = 'md',
  color = 'primary',
  disabled = false,
  label,
  labelPosition = 'right',
  className = '',
}) => {
  // Handle both controlled and uncontrolled states
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  useEffect(() => {
    if (controlledChecked !== undefined) {
      setInternalChecked(controlledChecked);
    }
  }, [controlledChecked]);

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggleSwitch = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setInternalChecked(newValue);
    onChange?.(newValue);
  };

  const currentSize = sizeConfig[size];
  const activeColor = colorClasses[color];

  return (
    <label 
      className={`inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {/* Label Left */}
      {label && labelPosition === 'left' && (
        <span className="mr-3 text-sm font-medium text-gray-700 select-none">
          {label}
        </span>
      )}

      {/* Switch Button */}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggleSwitch}
        className={`
          relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-${color}-500
          ${currentSize.track} 
          ${isChecked ? activeColor : 'bg-gray-200'}
        `}
      >
        <span className="sr-only">{label || 'Toggle switch'}</span>
        
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${currentSize.thumb}
            ${isChecked ? currentSize.translate : 'translate-x-0'}
          `}
        />
      </button>

      {/* Label Right */}
      {label && labelPosition === 'right' && (
        <span className="ml-3 text-sm font-medium text-gray-700 select-none">
          {label}
        </span>
      )}
    </label>
  );
};
