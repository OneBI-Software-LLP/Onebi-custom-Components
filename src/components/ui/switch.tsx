"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface CustomSwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'color' | 'size'> {
  /** The controlled checked state */
  checked?: boolean;
  /** The default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback fired when the state changes */
  onChange?: ((checked: boolean) => void) | React.ChangeEventHandler<HTMLInputElement> | any;
  /** Radix UI style change callback */
  onCheckedChange?: (checked: boolean) => void;
  /** The size of the switch */
  size?: 'sm' | 'md' | 'lg';
  /** The color when active */
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral' | string;
  /** Disables the switch */
  disabled?: boolean;
  /** Optional label text */
  label?: string;
  /** Where to position the label */
  labelPosition?: 'left' | 'right';
  /** Additional custom classes */
  className?: string;
}

export type SwitchProps = CustomSwitchProps;

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

const colorClasses: Record<string, string> = {
  primary: 'bg-blue-600 focus-visible:ring-blue-500',
  success: 'bg-green-500 focus-visible:ring-green-500',
  danger: 'bg-red-500 focus-visible:ring-red-500',
  warning: 'bg-yellow-500 focus-visible:ring-yellow-500',
  neutral: 'bg-gray-800 focus-visible:ring-gray-800',
};

export const CustomSwitch = React.forwardRef<HTMLButtonElement, CustomSwitchProps>(({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  onCheckedChange,
  size = 'md',
  color = 'primary',
  disabled = false,
  label,
  labelPosition = 'right',
  className = '',
  ...props
}, ref) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  useEffect(() => {
    if (controlledChecked !== undefined) {
      setInternalChecked(controlledChecked);
    }
  }, [controlledChecked]);

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggleSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const newValue = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(newValue);
    }
    onCheckedChange?.(newValue);
    if (onChange) {
      (onChange as any)(newValue);
    }
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;
  const activeColor = colorClasses[color] || (color.startsWith('bg-') ? color : 'bg-blue-600');

  return (
    <label 
      className={cn(
        "inline-flex items-center select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      {/* Label Left */}
      {label && labelPosition === 'left' && (
        <span className="mr-3 text-sm font-medium text-gray-700">
          {label}
        </span>
      )}

      {/* Switch Button */}
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggleSwitch}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
          currentSize.track,
          isChecked ? activeColor : "bg-gray-200"
        )}
        {...props}
      >
        <span className="sr-only">{label || 'Toggle switch'}</span>
        
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            currentSize.thumb,
            isChecked ? currentSize.translate : "translate-x-0"
          )}
        />
      </button>

      {/* Label Right */}
      {label && labelPosition === 'right' && (
        <span className="ml-3 text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
    </label>
  );
});

CustomSwitch.displayName = "CustomSwitch";

export const Switch = CustomSwitch;
export default CustomSwitch;

