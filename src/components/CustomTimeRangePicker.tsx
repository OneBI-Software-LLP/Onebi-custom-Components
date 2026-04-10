import React, { useState, useRef, useEffect } from 'react';

// --- TYPES ---
export interface TimeRange {
  start: string; // Stored as "HH:mm" (24-hour)
  end: string;   // Stored as "HH:mm" (24-hour)
}

export interface TimePreset {
  label: string;
  range: TimeRange;
}

export interface TimeRangePickerProps {
  value?: TimeRange;
  onChange: (range: TimeRange) => void;
  presets?: TimePreset[];
  placeholder?: string;
  disabled?: boolean;
}

// --- UTILS: 12-Hour Conversion ---
const parse24To12 = (time24: string) => {
  if (!time24) return { h: '12', m: '00', p: 'AM' };
  let [hours, minutes] = time24.split(':');
  let h = parseInt(hours, 10);
  const p = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12; // Convert 0 or 12+ to 1-12
  return { 
    h: h.toString().padStart(2, '0'), 
    m: minutes, 
    p 
  };
};

const format12To24 = (h: string, m: string, p: string) => {
  let hours = parseInt(h, 10);
  if (p === 'AM' && hours === 12) hours = 0;
  if (p === 'PM' && hours < 12) hours += 12;
  return `${hours.toString().padStart(2, '0')}:${m}`;
};

const formatDisplay = (time24: string) => {
  if (!time24) return '';
  const { h, m, p } = parse24To12(time24);
  return `${h}:${m} ${p}`;
};

// --- ARRAYS FOR DROPDOWNS ---
const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45']; // Step by 15 for cleaner UI, or use 0-59

// --- MAIN COMPONENT ---
export const CustomTimeRangePicker: React.FC<TimeRangePickerProps> = ({
  value,
  onChange,
  presets = [],
  placeholder = 'Select time range...',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<TimeRange>(value || { start: '09:00', end: '17:00' });
  const containerRef = useRef<HTMLDivElement>(null);

  // Click Outside Hook (Inline for brevity)
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  useEffect(() => {
    if (value) setTempRange(value);
  }, [value]);

  const handleApply = () => {
    onChange(tempRange);
    setIsOpen(false);
  };

  const handleTimeChange = (type: 'start' | 'end', field: 'h' | 'm' | 'p', val: string) => {
    const current = parse24To12(tempRange[type]);
    const updated = { ...current, [field]: val };
    const new24 = format12To24(updated.h, updated.m, updated.p);
    setTempRange({ ...tempRange, [type]: new24 });
  };

  const isComplete = value?.start && value?.end;

  // Custom Select Sub-Component for a cleaner look
  const TimeSelect = ({ val, options, onChange }: { val: string, options: string[], onChange: (v: string) => void }) => (
    <select 
      value={val} 
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none rounded border border-gray-300 bg-white px-2 py-1.5 text-sm text-center focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer hover:bg-gray-50"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );

  return (
    <div className="relative w-full text-sm font-sans" ref={containerRef}>
      
      {/* TRIGGER BUTTON */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex min-h-[40px] w-full items-center justify-between rounded-md border bg-white px-3 py-2 cursor-pointer hover:border-blue-400`}
      >
        <div className="flex items-center gap-2 text-gray-700">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isComplete ? (
            <span className="font-medium">
              {formatDisplay(value.start)} <span className="text-gray-400 mx-1">→</span> {formatDisplay(value.end)}
            </span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
      </div>

      {/* POPOVER MENU */}
      {isOpen && (
        <div className="absolute z-50 mt-1 flex flex-col sm:flex-row overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl max-w-[calc(100vw-2rem)] sm:max-w-none left-0">
          
          {/* Presets Panel */}
          {presets.length > 0 && (
            <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-gray-100 bg-gray-50 p-2 sm:w-48 shrink-0">
              <span className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Presets</span>
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTempRange(preset.range);
                    onChange(preset.range);
                    setIsOpen(false);
                  }}
                  className="rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Custom Selection Panel */}
          <div className="flex flex-col p-5 w-max">
            <span className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Custom Range</span>
            
            <div className="flex flex-col gap-5">
              {/* Start Time Selectors */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600 font-medium">Start Time</label>
                <div className="flex items-center gap-1 bg-gray-50 p-1 rounded border border-gray-200">
                  <TimeSelect val={parse24To12(tempRange.start).h} options={HOURS} onChange={v => handleTimeChange('start', 'h', v)} />
                  <span className="text-gray-400 font-bold">:</span>
                  <TimeSelect val={parse24To12(tempRange.start).m} options={MINUTES} onChange={v => handleTimeChange('start', 'm', v)} />
                  <div className="w-2" /> {/* Spacer */}
                  <TimeSelect val={parse24To12(tempRange.start).p} options={['AM', 'PM']} onChange={v => handleTimeChange('start', 'p', v)} />
                </div>
              </div>

              {/* End Time Selectors */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-600 font-medium">End Time</label>
                <div className="flex items-center gap-1 bg-gray-50 p-1 rounded border border-gray-200">
                  <TimeSelect val={parse24To12(tempRange.end).h} options={HOURS} onChange={v => handleTimeChange('end', 'h', v)} />
                  <span className="text-gray-400 font-bold">:</span>
                  <TimeSelect val={parse24To12(tempRange.end).m} options={MINUTES} onChange={v => handleTimeChange('end', 'm', v)} />
                  <div className="w-2" /> {/* Spacer */}
                  <TimeSelect val={parse24To12(tempRange.end).p} options={['AM', 'PM']} onChange={v => handleTimeChange('end', 'p', v)} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-gray-100">
              <button onClick={() => setIsOpen(false)} className="rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleApply} className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
