import React, { useState, useEffect } from 'react';

// --- TYPES ---
export type FilterType = 'text' | 'select' | 'boolean' | 'range';

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterDefinition {
  id: string;
  label: string;
  type: FilterType;
  placeholder?: string;
  options?: FilterOption[]; // Required if type is 'select'
}

export type FilterState = Record<string, any>;

export interface FilterPanelProps {
  filters: FilterDefinition[];
  initialValues?: FilterState;
  onChange: (values: FilterState) => void;
  className?: string;
}

// --- MAIN COMPONENT ---
export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  initialValues = {},
  onChange,
  className = '',
}) => {
  const [activeFilters, setActiveFilters] = useState<FilterState>(initialValues);

  // Trigger the parent callback whenever filters change
  useEffect(() => {
    // Clean up empty values before sending to parent
    const cleanedFilters = Object.fromEntries(
      Object.entries(activeFilters).filter(([_, v]) => {
        if (v === '' || v === null || v === undefined) return false;
        if (typeof v === 'object' && v.min === '' && v.max === '') return false;
        return true;
      })
    );
    onChange(cleanedFilters);
  }, [activeFilters, onChange]);

  // --- HANDLERS ---
  const handleFilterChange = (id: string, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRangeChange = (id: string, field: 'min' | 'max', value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { min: '', max: '' }), [field]: value },
    }));
  };

  const clearFilter = (id: string) => {
    setActiveFilters((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const clearAll = () => setActiveFilters({});

  // --- RENDER HELPERS ---
  const renderInput = (filter: FilterDefinition) => {
    const value = activeFilters[filter.id] ?? '';

    switch (filter.type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={filter.placeholder || `Search ${filter.label}...`}
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
          />
        );

      case 'select':
        return (
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
          >
            <option value="">{filter.placeholder || 'All'}</option>
            {filter.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'boolean':
        return (
          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={!!value}
              onChange={(e) => handleFilterChange(filter.id, e.target.checked)}
            />
            <span className="text-sm text-gray-700">Yes / Active</span>
          </label>
        );

      case 'range':
        const rangeValue = activeFilters[filter.id] || { min: '', max: '' };
        return (
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Min"
              value={rangeValue.min}
              onChange={(e) => handleRangeChange(filter.id, 'min', e.target.value)}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Max"
              value={rangeValue.max}
              onChange={(e) => handleRangeChange(filter.id, 'max', e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Extract active filter labels for the badges
  const activeKeys = Object.keys(activeFilters).filter((k) => {
    const v = activeFilters[k];
    if (v === '' || v === false || v === undefined) return false;
    if (typeof v === 'object' && !v.min && !v.max) return false;
    return true;
  });

  return (
    <div className={`flex flex-col gap-4 font-sans ${className}`}>
      
      {/* 1. ACTIVE FILTERS BADGES */}
      {activeKeys.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-md bg-gray-50 p-3 border border-gray-200">
          <span className="text-sm font-medium text-gray-600 mr-2">Active Filters:</span>
          {activeKeys.map((key) => {
            const filterDef = filters.find((f) => f.id === key);
            if (!filterDef) return null;

            let displayValue = activeFilters[key];
            if (filterDef.type === 'select') {
              displayValue = filterDef.options?.find((o) => o.value === displayValue)?.label || displayValue;
            } else if (filterDef.type === 'range') {
              displayValue = `${displayValue.min || '0'} to ${displayValue.max || '∞'}`;
            } else if (filterDef.type === 'boolean') {
              displayValue = 'Yes';
            }

            return (
              <span key={key} className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 border border-blue-200">
                <span className="font-semibold">{filterDef.label}:</span> {displayValue}
                <button
                  onClick={() => clearFilter(key)}
                  className="ml-1 rounded-full p-0.5 hover:bg-blue-200 focus:outline-none"
                >
                  &times;
                </button>
              </span>
            );
          })}
          <button
            onClick={clearAll}
            className="ml-auto text-sm text-gray-500 hover:text-red-600 underline decoration-dotted underline-offset-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* 2. FILTER INPUTS GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filters.map((filter) => (
          <div key={filter.id} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {filter.label}
            </label>
            {renderInput(filter)}
          </div>
        ))}
      </div>
    </div>
  );
};
