"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (val: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  updateLabel?: (val: string, label: string) => void;
  getLabel?: (val: string) => string | undefined;
}>({
  open: false,
  setOpen: () => {},
});

const Select = ({ children, value, onValueChange, defaultValue }: any) => {
  const [open, setOpen] = React.useState(false);
  const [internalVal, setInternalVal] = React.useState(value ?? defaultValue ?? "");
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (value !== undefined) setInternalVal(value);
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleValueChange = (val: string) => {
    if (value === undefined) setInternalVal(val);
    if (onValueChange) onValueChange(val);
    setOpen(false);
  };
  
  const updateLabel = React.useCallback((val: string, label: string) => {
     setLabels(prev => ({ ...prev, [val]: label }));
  }, []);

  return (
    <SelectContext.Provider value={{
      value: internalVal, 
      onValueChange: handleValueChange, 
      open, 
      setOpen,
      updateLabel,
      getLabel: (v) => labels[v]
    }}>
      <div ref={containerRef} className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SelectContext)
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const { value, getLabel } = React.useContext(SelectContext);
  const display = (value && getLabel && getLabel(value)) || value || placeholder;
  return <span className="truncate">{display}</span>
}

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(SelectContext)
  if (!open) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full left-0 z-50 mt-1 max-h-96 min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
      {...props}
    >
      <div className="p-1 w-full overflow-y-auto max-h-80">
        {children}
      </div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(({ className, children, value, ...props }, ref) => {
  const { value: contextValue, onValueChange, updateLabel } = React.useContext(SelectContext)
  
  React.useEffect(() => {
     if (typeof children === 'string' && updateLabel) {
       updateLabel(value, children);
     }
  }, [value, children, updateLabel]);

  const selected = contextValue === value;
  return (
    <div
      ref={ref}
      onClick={() => onValueChange && onValueChange(value)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {selected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
      <span>{children}</span>
    </div>
  )
})
SelectItem.displayName = "SelectItem"

const SelectGroup = ({ children, className }: any) => <div className={className}>{children}</div>
const SelectLabel = ({ children, className }: any) => <div className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}>{children}</div>
const SelectSeparator = ({ className }: any) => <div className={cn("-mx-1 my-1 h-[1px] bg-muted", className)} />

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }
