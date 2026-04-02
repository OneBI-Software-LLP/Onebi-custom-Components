"use client"

import * as React from "react"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}>({});

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    name?: string;
  }
>(({ className, value, defaultValue, onValueChange, name, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? "");

  React.useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    if (value === undefined) setInternalValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  const generatedName = React.useId();

  return (
    <RadioGroupContext.Provider value={{ name: name || generatedName, value: internalValue, onChange: handleChange }}>
      <div className={cn("grid gap-2", className)} {...props} ref={ref} />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const { value: contextValue, onChange } = React.useContext(RadioGroupContext);
  const checked = contextValue === value;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onChange?.(value)}
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      {checked && (
        <span className="flex items-center justify-center">
          <Circle className="h-2.5 w-2.5 fill-current text-current" />
        </span>
      )}
    </button>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
