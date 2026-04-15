import React, { useState, useRef, useEffect, useMemo } from 'react';

export interface ComboBoxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface ComboBoxProps {
  options: ComboBoxOption[];
  value?: string | string[];
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const CustomComboBox: React.FC<ComboBoxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  multiple = false,
  disabled = false,
  error,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    return query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );
  }, [query, options]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: ComboBoxOption) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(option.value)
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];
      onChange(newValue);
    } else {
      onChange(option.value);
      setQuery(option.label);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filteredOptions[activeIndex]) {
          handleSelect(filteredOptions[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          className={`w-full px-4 py-2 text-sm border rounded-md shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            ${error ? "border-red-500" : "border-gray-300"}
          `}
          placeholder={placeholder}
          value={isOpen ? query : (options.find(o => o.value === value)?.label || query)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        
        {/* Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {/* Options List */}
      {isOpen && !disabled && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto py-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = multiple 
                ? (Array.isArray(value) && value.includes(option.value))
                : value === option.value;
              
              return (
                <li
                  key={option.value}
                  className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between
                    ${index === activeIndex ? "bg-blue-50 text-blue-700" : "text-gray-900"}
                    ${isSelected ? "font-semibold bg-blue-100" : "hover:bg-gray-50"}
                  `}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex items-center gap-3">
                    {option.icon && <span>{option.icon}</span>}
                    <div>
                      <p>{option.label}</p>
                      {option.description && <p className="text-xs text-gray-500 font-normal">{option.description}</p>}
                    </div>
                  </div>
                  {isSelected && (
                    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </li>
              );
            })
          ) : (
            <li className="px-4 py-3 text-sm text-gray-500 italic">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};
