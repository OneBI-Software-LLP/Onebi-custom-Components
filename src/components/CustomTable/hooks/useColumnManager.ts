import { useState, useCallback, useMemo } from "react";
import { ColumnDef } from "../types";

export interface ColumnManagerState {
  visibleColumns: string[];
  columnWidths: Record<string, number>;
}

export const useColumnManager = <TData,>(initialColumns: ColumnDef<TData>[]) => {
  const [columnOrder, setColumnOrder] = useState<string[]>(initialColumns.map(c => c.id));
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    initialColumns.filter(c => c.visible !== false).map(c => c.id)
  );

  const [columnWidths, setColumnWidths] = useState<Record<string, number | string>>(() => {
    const widths: Record<string, number | string> = {};
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

  const setWidth = useCallback((columnId: string, width: number | string) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: width
    }));
  }, []);

  const reorderColumn = useCallback((draggedId: string, targetId: string) => {
    setColumnOrder(prev => {
      const newOrder = [...prev];
      const draggedIdx = newOrder.indexOf(draggedId);
      const targetIdx = newOrder.indexOf(targetId);
      if (draggedIdx > -1 && targetIdx > -1) {
        newOrder.splice(draggedIdx, 1);
        newOrder.splice(targetIdx, 0, draggedId);
      }
      return newOrder;
    });
  }, []);

  const columns = useMemo(() => 
    columnOrder
      .map(id => initialColumns.find(col => col.id === id)!)
      .filter(Boolean)
      .filter(col => visibleColumns.includes(col.id))
      .map(col => ({
        ...col,
        width: columnWidths[col.id] || col.width
      })),
    [initialColumns, columnOrder, visibleColumns, columnWidths]
  );

  return {
    columns,
    visibleColumns,
    toggleVisibility,
    setWidth,
    columnWidths,
    reorderColumn,
    columnOrder
  };
};
