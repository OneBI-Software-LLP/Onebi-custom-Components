"use client"

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type DateSelectorMode = 'single' | 'range';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateSelectorProps {
  mode?: DateSelectorMode;
  singleValue?: Date | null;
  rangeValue?: DateRange;
  onChangeSingle?: (date: Date | null) => void;
  onChangeRange?: (range: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  // Compatibility with standard DatePicker
  date?: Date;
  setDate?: (date?: Date) => void;
}

export type DatePickerProps = DateSelectorProps;

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const isSameDay = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

const isAfter = (d1: Date, d2: Date) => d1.getTime() > d2.getTime();

const formatDate = (d: Date | null) => {
  if (!d) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const CustomDatePicker: React.FC<DateSelectorProps> = ({
  mode = 'single',
  singleValue,
  rangeValue = { start: null, end: null },
  onChangeSingle,
  onChangeRange,
  placeholder = "Select Date",
  disabled = false,
  date,
  setDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // If date/setDate provided, adapt to singleValue/onChangeSingle
  const effectiveSingleValue = singleValue !== undefined ? singleValue : (date ?? null);
  const handleSingleChange = (d: Date | null) => {
    if (onChangeSingle) onChangeSingle(d);
    if (setDate) setDate(d ?? undefined);
  };

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const daysGrid = useMemo(() => {
    const grid: (Date | null)[] = [];
    for (let i = 0; i < firstDayIndex; i++) grid.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      grid.push(new Date(currentYear, currentMonth, day));
    }
    return grid;
  }, [currentYear, currentMonth, daysInMonth, firstDayIndex]);

  const handleDayClick = (dayDate: Date) => {
    if (disabled) return;

    if (mode === 'single') {
      handleSingleChange(dayDate);
      setIsOpen(false);
    } else {
      if (!rangeValue.start || (rangeValue.start && rangeValue.end)) {
        onChangeRange?.({ start: dayDate, end: null });
      } else if (rangeValue.start && !rangeValue.end) {
        if (isAfter(rangeValue.start, dayDate)) {
          onChangeRange?.({ start: dayDate, end: null });
        } else {
          onChangeRange?.({ start: rangeValue.start, end: dayDate });
          setIsOpen(false);
        }
      }
    }
  };

  const isInRange = (dayDate: Date) => {
    if (mode !== 'range') return false;
    const { start, end } = rangeValue;
    if (start && end) {
      return dayDate > start && dayDate < end;
    }
    if (start && !end && hoverDate) {
      return dayDate > start && dayDate < hoverDate && !isAfter(start, hoverDate);
    }
    return false;
  };

  const isRangeStart = (dayDate: Date) => mode === 'range' && isSameDay(dayDate, rangeValue.start);
  const isRangeEnd = (dayDate: Date) => mode === 'range' && isSameDay(dayDate, rangeValue.end);

  const renderTriggerLabel = () => {
    if (mode === 'single') {
      return effectiveSingleValue ? formatDate(effectiveSingleValue) : placeholder;
    } else {
      if (rangeValue.start && rangeValue.end) {
        return `${formatDate(rangeValue.start)}  →  ${formatDate(rangeValue.end)}`;
      }
      if (rangeValue.start) {
        return `${formatDate(rangeValue.start)}  →  End Date`;
      }
      return placeholder;
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block w-full text-left font-sans">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-10 px-3.5 flex items-center justify-between bg-white border border-slate-200 rounded-xl shadow-sm text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",
          isOpen && "border-indigo-500 ring-2 ring-indigo-500/20",
          disabled && "bg-slate-50 cursor-not-allowed opacity-60"
        )}
      >
        <span className={cn("truncate", !effectiveSingleValue && !rangeValue.start && "text-slate-400")}>
          {renderTriggerLabel()}
        </span>
        <CalendarIcon className="w-4 h-4 text-slate-400 ml-2 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 w-72 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              ←
            </button>
            <span className="text-xs font-semibold text-slate-800">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAY_NAMES.map((day) => (
              <span key={day} className="text-[10px] font-bold text-slate-400">
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {daysGrid.map((dayDate, idx) => {
              if (!dayDate) return <div key={idx} className="h-8 w-8" />;

              const selectedSingle = mode === 'single' && isSameDay(dayDate, effectiveSingleValue);
              const start = isRangeStart(dayDate);
              const end = isRangeEnd(dayDate);
              const inRange = isInRange(dayDate);

              return (
                <div key={idx} className="flex items-center justify-center relative">
                  <button
                    type="button"
                    onClick={() => handleDayClick(dayDate)}
                    onMouseEnter={() => setHoverDate(dayDate)}
                    onMouseLeave={() => setHoverDate(null)}
                    className={cn(
                      "h-8 w-8 text-xs font-medium rounded-lg transition-all flex items-center justify-center z-10",
                      selectedSingle && "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200",
                      (start || end) && "bg-indigo-600 text-white font-bold shadow-sm",
                      inRange && "bg-indigo-50 text-indigo-700 rounded-none",
                      !selectedSingle && !start && !end && !inRange && "hover:bg-slate-100 text-slate-700"
                    )}
                  >
                    {dayDate.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const DatePicker = CustomDatePicker;
export default CustomDatePicker;

