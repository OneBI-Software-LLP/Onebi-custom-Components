import React, { useState, useRef, useEffect, useMemo } from 'react';

// --- TYPES ---
export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: any; // string | number | array
  onChange: (value: any) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  error?: string;
  // Render Prop for total custom control over how options look
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode; 
}

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
export const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  multiple = false,
  searchable = false,
  disabled = false,
  loading = false,
  clearable = false,
  error,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  // Handle derived state
  const isArrayValue = Array.isArray(value);
  const selectedOptions = useMemo(() => {
    if (multiple && isArrayValue) {
      return options.filter((opt) => value.includes(opt.value));
    }
    return options.filter((opt) => opt.value === value);
  }, [value, options, multiple, isArrayValue]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Handlers
  const handleToggle = () => !disabled && setIsOpen((prev) => !prev);
  
  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;

    if (multiple) {
      const currentValues = isArrayValue ? [...value] : [];
      const newValue = currentValues.includes(option.value)
        ? currentValues.filter((v: any) => v !== option.value) // Remove
        : [...currentValues, option.value]; // Add
      onChange(newValue);
    } else {
      onChange(option.value);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiple ? [] : undefined);
    setSearchTerm('');
  };

  const handleRemoveTag = (e: React.MouseEvent, valToRemove: string | number) => {
    e.stopPropagation();
    if (multiple && isArrayValue) {
      onChange(value.filter((v: string | number) => v !== valToRemove));
    }
  };

  return (
    <div className="relative w-full text-sm font-sans" ref={dropdownRef}>
      {/* TRIGGER BUTTON / INPUT */}
      <div
        onClick={handleToggle}
        className={`flex min-h-[40px] items-center justify-between rounded-md border bg-white px-3 py-2 transition-all 
          ${disabled ? 'cursor-not-allowed bg-gray-100 opacity-70' : 'cursor-pointer hover:border-blue-400'}
          ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500'}
        `}
        role="combobox"
        aria-expanded={isOpen}
      >
        <div className="flex flex-wrap gap-1 flex-1 overflow-hidden">
          {/* Multi-select Tags */}
          {multiple && selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span key={opt.value} className="flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-blue-800">
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => handleRemoveTag(e, opt.value)}
                  className="text-blue-500 hover:text-blue-900 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            ))
          ) : /* Single Select Label or Search Input */
          !multiple && selectedOptions.length > 0 && !isOpen ? (
            <span className="truncate">{selectedOptions[0].label}</span>
          ) : (
            isOpen && searchable ? (
              <input
                type="text"
                className="w-full bg-transparent outline-none placeholder-gray-400"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            ) : (
              <span className="text-gray-400 truncate">{placeholder}</span>
            )
          )}
        </div>

        {/* Action Icons (Clear / Loading / Chevron) */}
        <div className="flex items-center gap-2 ml-2 shrink-0 text-gray-400">
          {loading && <span className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />}
          {clearable && (value !== undefined && value?.length !== 0) && !disabled && (
            <button type="button" onClick={handleClear} className="hover:text-gray-700">&times;</button>
          )}
          <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg py-1">
          {filteredOptions.length === 0 ? (
            <li className="px-4 py-2 text-gray-500 text-center">No options found</li>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = multiple 
                ? (isArrayValue && value.includes(option.value)) 
                : value === option.value;

              return (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-blue-50 
                    ${option.disabled ? 'cursor-not-allowed text-gray-400 hover:bg-white' : 'text-gray-800'}
                    ${isSelected ? 'bg-blue-50 font-medium text-blue-700' : ''}
                  `}
                  role="option"
                  aria-selected={isSelected}
                >
                  {/* Custom Render OR Default Render */}
                  {renderOption ? (
                    renderOption(option, isSelected)
                  ) : (
                    <div className="flex items-center gap-2">
                      {option.icon && <span>{option.icon}</span>}
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        {option.description && <span className="text-xs text-gray-500">{option.description}</span>}
                      </div>
                    </div>
                  )}
                  
                  {/* Checkmark for selected items */}
                  {isSelected && (
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
      
      {/* Error Message */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
