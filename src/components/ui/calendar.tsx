"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export interface CalendarProps {
  className?: string
  selected?: Date
  onSelect?: (date: Date) => void
}

function Calendar({ className, selected, onSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1
    if (day > 0 && day <= daysInMonth) {
      return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    }
    return null
  })

  // Basic check to see if we should render the 6th row
  const has6thRow = days.slice(35).some(d => d !== null)

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-between pt-1 relative items-center mb-4">
        <button type="button" onClick={handlePreviousMonth} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1")}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium w-full text-center">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button type="button" onClick={handleNextMonth} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1")}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="w-full border-collapse space-y-1">
        <div className="grid grid-cols-7 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2">
          {(has6thRow ? days : days.slice(0, 35)).map((date, i) => {
            if (!date) return <div key={i} className="h-9 w-9 p-0" />
            const isSelected = selected && date.toDateString() === selected.toDateString()
            const isToday = date.toDateString() === new Date().toDateString()
            
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelect && onSelect(date)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  !isSelected && isToday && "bg-accent text-accent-foreground",
                  !isSelected && !isToday && "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
