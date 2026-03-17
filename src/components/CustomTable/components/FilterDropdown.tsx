import React, { useState, useRef, useEffect } from "react";
import { ColumnDef, FilterCondition, FilterOperator, TableFilter } from "../types";
import styles from "../styles/table.module.css";

interface FilterDropdownProps<TData> {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filter: TableFilter) => void;
  columns: ColumnDef<TData>[];
  initialFilter?: TableFilter;
}

const OPERATORS: { label: string; value: FilterOperator; types: string[] }[] = [
  { label: "Equals", value: "equals", types: ["text", "number", "date", "select", "boolean"] },
  { label: "Not Equals", value: "notEquals", types: ["text", "number", "date", "select", "boolean"] },
  { label: "Contains", value: "contains", types: ["text"] },
  { label: "Not Contains", value: "notContains", types: ["text"] },
  { label: "Starts With", value: "startsWith", types: ["text"] },
  { label: "Ends With", value: "endsWith", types: ["text"] },
  { label: "Greater Than", value: "gt", types: ["number", "date"] },
  { label: "Less Than", value: "lt", types: ["number", "date"] },
  { label: "Greater Than or Equal", value: "gte", types: ["number", "date"] },
  { label: "Less Than or Equal", value: "lte", types: ["number", "date"] },
  { label: "Between", value: "between", types: ["number", "date"] },
  { label: "Is Empty", value: "isEmpty", types: ["text", "number", "date"] },
  { label: "Is Not Empty", value: "isNotEmpty", types: ["text", "number", "date"] },
];

import { ChevronDown } from "lucide-react";

interface SelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Select = ({ value, onChange, options, placeholder, className, style }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`${styles.selectTrigger} ${className}`} ref={ref} style={style}>
      <button 
        className={`${styles.filterSelect} ${isOpen ? styles.filterSelectActive : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: "100%", gap: "8px" }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={14} 
          style={{ 
            transition: "transform 0.2s", 
            transform: isOpen ? "rotate(180deg)" : "none",
            flexShrink: 0,
            color: "var(--ct-text-muted)"
          }} 
        />
      </button>
      {isOpen && (
        <div className={styles.dropdownPanel} style={{ top: "100%", left: 0, right: "auto", minWidth: "160px", boxShadow: "var(--ct-shadow-lg)" }}>
          <div className={styles.dropdownBody} style={{ padding: "4px" }}>
            {options.map(opt => (
              <div 
                key={opt.value} 
                className={`${styles.dropdownItem} ${opt.value === value ? styles.dropdownItemActive : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export function FilterDropdown<TData>({
  isOpen,
  onClose,
  columns,
  onApply,
  initialFilter
}: FilterDropdownProps<TData>) {
  const [conditions, setConditions] = useState<FilterCondition[]>(initialFilter?.conditions || []);
  const [logic, setLogic] = useState<"AND" | "OR">(initialFilter?.logic || "AND");

  useEffect(() => {
    if (isOpen && initialFilter) {
      setConditions(initialFilter.conditions);
      setLogic(initialFilter.logic);
    }
  }, [isOpen, initialFilter]);

  if (!isOpen) return null;

  const addCondition = () => {
    const col = columns.find(c => c.filterable !== false);
    if (!col) return;

    setConditions([...conditions, {
      id: Math.random().toString(36).substr(2, 9),
      columnId: col.id,
      operator: "contains",
      value: ""
    }]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    setConditions(conditions.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleApply = () => {
    onApply({ conditions, logic });
    onClose();
  };

  const filterableColumns = columns.filter(col => col.filterable !== false);

  return (
    <div className={`${styles.dropdownPanel} ${styles.filterPanel}`} onClick={(e) => e.stopPropagation()}>
      <div className={styles.dropdownHeader}>
        <h3>Advanced Filters</h3>
        <button className={styles.modalClose} onClick={onClose}>&times;</button>
      </div>
      
      <div className={styles.dropdownBody} style={{ padding: "16px" }}>
        <div className={styles.filterLogic}>
          <span>Match</span>
          <Select 
            value={logic} 
            onChange={(val) => setLogic(val as any)}
            options={[
              { value: "AND", label: "All" },
              { value: "OR", label: "Any" }
            ]}
            style={{ minWidth: "80px" }}
          />
          <span>conditions:</span>
        </div>

        <div className={styles.conditionList}>
          {conditions.map((condition) => {
            const col = columns.find(c => c.id === condition.columnId);
            const colType = col?.filterType || (col?.type as any) || "text";
            const allowedOperators = OPERATORS.filter(op => op.types.includes(colType));

            return (
              <div key={condition.id} className={styles.conditionRow}>
                <Select
                  value={condition.columnId}
                  onChange={(val) => updateCondition(condition.id, { columnId: val, value: "" })}
                  options={filterableColumns.map(c => ({ value: c.id, label: c.header }))}
                  style={{ flex: 1.2 }}
                />

                <Select
                  value={condition.operator}
                  onChange={(val) => updateCondition(condition.id, { operator: val as any })}
                  options={allowedOperators.map(op => ({ value: op.value, label: op.label }))}
                  style={{ flex: 1 }}
                />

                {condition.operator !== "isEmpty" && condition.operator !== "isNotEmpty" && (
                  <div className={styles.valueInputContainer}>
                    <input 
                      type={colType === "number" ? "number" : colType === "date" ? "date" : "text"}
                      value={condition.value}
                      onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                      className={styles.filterInput}
                      placeholder="Value..."
                    />
                    {condition.operator === "between" && (
                       <input 
                       type={colType === "number" ? "number" : colType === "date" ? "date" : "text"}
                       value={condition.valueTo}
                       onChange={(e) => updateCondition(condition.id, { valueTo: e.target.value })}
                       className={styles.filterInput}
                       placeholder="To..."
                     />
                    )}
                  </div>
                )}

                <button className={styles.removeCondition} onClick={() => removeCondition(condition.id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            );
          })}
        </div>

        <button className={styles.addConditionBtn} onClick={addCondition}>
          + Add Condition
        </button>
      </div>

      <div className={styles.dropdownFooter}>
        <button className={styles.secondaryBtn} onClick={() => { setConditions([]); onApply({ conditions: [], logic: "AND" }); onClose(); }}>Clear</button>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}
