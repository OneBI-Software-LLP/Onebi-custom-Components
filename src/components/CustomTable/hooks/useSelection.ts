import { useState, useCallback } from "react";

export const useSelection = (initialSelectedRows: string[] = [], onSelectionChange?: (ids: string[]) => void) => {
  const [selectedRows, setSelectedRows] = useState<string[]>(initialSelectedRows);

  const toggleRow = useCallback((rowId: string, multi: boolean = false) => {
    setSelectedRows(prev => {
      let next: string[];
      if (multi) {
        next = prev.includes(rowId) 
          ? prev.filter(id => id !== rowId) 
          : [...prev, rowId];
      } else {
        next = prev.includes(rowId) ? [] : [rowId];
      }
      onSelectionChange?.(next);
      return next;
    });
  }, [onSelectionChange]);

  const selectAll = useCallback((rowIds: string[]) => {
    setSelectedRows(prev => {
      const allSelected = rowIds.every(id => prev.includes(id));
      const next = allSelected 
        ? prev.filter(id => !rowIds.includes(id)) 
        : Array.from(new Set([...prev, ...rowIds]));
      onSelectionChange?.(next);
      return next;
    });
  }, [onSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  return {
    selectedRows,
    toggleRow,
    selectAll,
    clearSelection,
    setSelectedRows
  };
};
