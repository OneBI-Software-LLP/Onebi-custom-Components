import React, { useState, useRef, useEffect, useMemo } from 'react';

// --- TYPES ---
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
}

// --- UTILS ---
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

// --- HOOK: Click Outside ---
function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// --- MAIN COMPONENT ---
export const CustomDatePicker: React.FC<DateSelectorProps> = ({
  mode = 'single',
  singleValue = null,
  rangeValue = { start: null, end: null },
  onChangeSingle,
  onChangeRange,
  placeholder = 'Select date...',
  disabled = false,
}) => {
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calendar View State (What month/year is currently visible)
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Internal Selection State
  const [internalSingle, setInternalSingle] = useState<Date | null>(singleValue);
  const [internalRange, setInternalRange] = useState<DateRange>(rangeValue);
  
  // Which input is active in Range Mode ('start' or 'end')
  const [activeRangeInput, setActiveRangeInput] = useState<'start' | 'end'>('start');

  useOnClickOutside(containerRef, () => setIsOpen(false));

  // Sync props to internal state
  useEffect(() => { setInternalSingle(singleValue); }, [singleValue]);
  useEffect(() => { setInternalRange(rangeValue); }, [rangeValue]);

  // --- HANDLERS ---
  const handleInputClick = (inputType: 'single' | 'start' | 'end') => {
    if (disabled) return;
    if (mode === 'range' && (inputType === 'start' || inputType === 'end')) {
      setActiveRangeInput(inputType);
      
      // Navigate calendar to the date of the clicked input if it exists
      const targetDate = inputType === 'start' ? internalRange.start : internalRange.end;
      if (targetDate) {
        setViewYear(targetDate.getFullYear());
        setViewMonth(targetDate.getMonth());
      }
    } else if (mode === 'single' && internalSingle) {
      setViewYear(internalSingle.getFullYear());
      setViewMonth(internalSingle.getMonth());
    }
    setIsOpen(true);
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(viewYear, viewMonth, day);

    if (mode === 'single') {
      setInternalSingle(selectedDate);
      if (onChangeSingle) onChangeSingle(selectedDate);
      setIsOpen(false);
    } 
    
    else if (mode === 'range') {
      let newRange = { ...internalRange };

      if (activeRangeInput === 'start') {
        newRange.start = selectedDate;
        // If start is now after end, clear the end date
        if (newRange.end && isAfter(selectedDate, newRange.end)) {
          newRange.end = null;
        }
        setActiveRangeInput('end'); // Auto-focus the end date next
      } else {
        newRange.end = selectedDate;
        // If end is before start, swap them
        if (newRange.start && isAfter(newRange.start, selectedDate)) {
          newRange.end = newRange.start;
          newRange.start = selectedDate;
        }
        // If both are filled, close the calendar
        if (newRange.start && newRange.end) {
          setIsOpen(false);
        }
      }
      
      setInternalRange(newRange);
      if (onChangeRange) onChangeRange(newRange);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } 
    else { setViewMonth(m => m + 1); }
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } 
    else { setViewMonth(m => m - 1); }
  };

  // --- CALENDAR GRID GENERATION ---
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  
  const gridDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null); // Empty slots
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [daysInMonth, firstDay]);

  // --- RENDER HELPERS ---
  const getDayClasses = (day: number) => {
    if (!day) return ''; // Empty cell

    const date = new Date(viewYear, viewMonth, day);
    let classes = "h-8 w-8 flex items-center justify-center text-sm rounded-full cursor-pointer hover:bg-gray-100 transition-colors z-10 relative ";

    if (mode === 'single') {
      if (isSameDay(date, internalSingle)) {
        classes += "bg-blue-600 text-white font-medium hover:bg-blue-700";
      } else {
        classes += "text-gray-700";
      }
    } 
    
    else if (mode === 'range') {
      const isStart = isSameDay(date, internalRange.start);
      const isEnd = isSameDay(date, internalRange.end);
      const isBetween = internalRange.start && internalRange.end && 
                        date.getTime() > internalRange.start.getTime() && 
                        date.getTime() < internalRange.end.getTime();

      if (isStart || isEnd) {
        classes += "bg-blue-600 text-white font-medium hover:bg-blue-700 ";
      } else if (isBetween) {
        classes += "bg-blue-50 text-blue-800 rounded-none hover:bg-blue-100 ";
      } else {
        classes += "text-gray-700";
      }
    }
    return classes;
  };

  // Helper to draw the light blue background connecting the range
  const getRangeBackground = (day: number) => {
    if (mode !== 'range' || !day || !internalRange.start || !internalRange.end) return null;
    
    const date = new Date(viewYear, viewMonth, day);
    const isStart = isSameDay(date, internalRange.start);
    const isEnd = isSameDay(date, internalRange.end);
    
    // Don't draw background if start and end are the same day
    if (isStart && isEnd) return null;

    if (isStart) return <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-50" />;
    if (isEnd) return <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-50" />;
    return null;
  };

  return (
    <div className="relative w-full text-sm font-sans" ref={containerRef}>
      
      {/* INPUT FIELDS */}
      <div className={`flex items-center gap-2 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
        
        {mode === 'single' ? (
          <div className="relative w-full">
            <input
              type="text"
              readOnly
              value={formatDate(internalSingle)}
              placeholder={placeholder}
              onClick={() => handleInputClick('single')}
              className={`w-full rounded-md border bg-white px-3 py-2 cursor-pointer focus:outline-none focus:border-blue-500
                ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
            />
          </div>
        ) : (
          <div className="flex w-full items-center gap-2">
            <input
              type="text"
              readOnly
              value={formatDate(internalRange.start)}
              placeholder="Start Date"
              onClick={() => handleInputClick('start')}
              className={`w-1/2 rounded-md border bg-white px-3 py-2 cursor-pointer focus:outline-none focus:border-blue-500
                ${isOpen && activeRangeInput === 'start' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
            />
            <span className="text-gray-400">→</span>
            <input
              type="text"
              readOnly
              value={formatDate(internalRange.end)}
              placeholder="End Date"
              onClick={() => handleInputClick('end')}
              className={`w-1/2 rounded-md border bg-white px-3 py-2 cursor-pointer focus:outline-none focus:border-blue-500
                ${isOpen && activeRangeInput === 'end' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
            />
          </div>
        )}
      </div>

      {/* CALENDAR POPOVER */}
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 p-4 w-[280px] rounded-lg border border-gray-200 bg-white shadow-xl">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="font-semibold text-gray-800">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </div>
            <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {gridDays.map((day, index) => (
              <div key={index} className="relative flex justify-center py-0.5">
                {/* Visual Connector for Ranges */}
                {getRangeBackground(day as number)}
                
                {/* The actual day number */}
                {day ? (
                  <button
                    onClick={() => handleDateClick(day)}
                    className={getDayClasses(day)}
                  >
                    {day}
                  </button>
                ) : (
                  <div className="h-8 w-8" /> // Placeholder for empty days
                )}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};
