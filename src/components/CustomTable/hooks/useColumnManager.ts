import { useState, useCallback, useMemo } from "react";
import { ColumnDef } from "../types";

export interface ColumnManagerState {
  visibleColumns: string[];
  columnWidths: Record<string, number>;
}

export const useColumnManager = <TData,>(initialColumns: ColumnDef<TData>[]) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    initialColumns.filter(c => c.visible !== false).map(c => c.id)
  );

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    initialColumns.forEach(c => {
      if (c.width) widths[c.id] = c.width;
    });
    return widths;
  });

  const toggleVisibility = useCallback((columnId: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnId) 
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  }, []);

  const setWidth = useCallback((columnId: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: width
    }));
  }, []);

  const columns = useMemo(() => 
    initialColumns
      .filter(col => visibleColumns.includes(col.id))
      .map(col => ({
        ...col,
        width: columnWidths[col.id] || col.width
      })),
    [initialColumns, visibleColumns, columnWidths]
  );

  return {
    columns,
    visibleColumns,
    toggleVisibility,
    setWidth,
    columnWidths
  };
};
