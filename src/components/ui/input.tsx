import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export type CustomInputProps = InputProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, leftIcon, style, ...props }, ref) => {
    if (label || error || helperText || leftIcon) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          {label && <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{label}</label>}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {leftIcon && (
              <div style={{ position: 'absolute', left: '12px', color: '#94a3b8' }}>
                {leftIcon}
              </div>
            )}
            <input
              type={type}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-500",
                className
              )}
              style={{
                paddingLeft: leftIcon ? '40px' : undefined,
                ...style
              }}
              ref={ref}
              {...props}
            />
          </div>
          {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
          {!error && helperText && <span style={{ fontSize: '12px', color: '#64748b' }}>{helperText}</span>}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={style}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export const CustomInput = Input;

export { Input }
export default Input;

