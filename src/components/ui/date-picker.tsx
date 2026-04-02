"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export interface DatePickerProps {
  date?: Date
  setDate: (date?: Date) => void
  placeholder?: string
}

export function DatePicker({ date, setDate, placeholder = "Pick a date" }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative inline-block w-full text-left">
      <Button
        type="button"
        variant={"outline"}
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? date.toLocaleDateString() : <span>{placeholder}</span>}
      </Button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
          <Calendar
            selected={date}
            onSelect={(d) => { setDate(d); setOpen(false); }}
          />
        </div>
      )}
    </div>
  )
}
