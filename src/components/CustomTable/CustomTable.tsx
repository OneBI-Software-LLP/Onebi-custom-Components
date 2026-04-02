import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { TableProps, ColumnDef, SortingState, FilterCondition, TableFilter } from "./types";
import { FilterDropdown } from "./components/FilterDropdown";
import { useColumnManager } from "./hooks/useColumnManager";
import { useSelection } from "./hooks/useSelection";
import { Layers, RefreshCw, UploadCloud, FileDown, FileUp, Download, Plus } from "lucide-react";
import styles from "./styles/table.module.css";
import "./styles/variables.css";

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const CustomTable = <TData extends Record<string, any>>({
  data,
  columns: initialColumns,
  getRowId,
  loading = false,
  error,
  emptyContent,
  serverSide = false,
  totalRows,
  page: controlledPage,
  pageSize: controlledPageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  onSortChange,
  onFilterChange,
  onAdvancedFilterChange,
  defaultPageSize = 10,
  defaultSorting = [],
  selectionMode = "none",
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  onExport,
  theme = "light",
  striped = false,
  density = "standard",
  stickyHeader = true,
  showToolbar = true,
  showColumnVisibility = true,
  showExportButton = false,
  searchPlaceholder,
  className,
  style,
  // NEW PROPS
  isAllPagesSelected,
  onSelectAllStateChange,
  bulkActions = [],
  onBulkAction,
  onRefresh,
  isRefreshing,
  showAddButton,
  addButtonLabel = "Add New",
  addButtonId,
  onAddClick,
  showBulkImport,
  onDownloadTemplate,
  onBulkImport,
  onBulkExport,
}: TableProps<TData>) => {
  // ── Hooks ────────────────────────────────────────────────────────
  const { 
    columns, 
    visibleColumns, 
    toggleVisibility, 
    setWidth, 
    columnWidths,
    reorderColumn,
    columnOrder
  } = useColumnManager(initialColumns);

  const {
    selectedRows,
    toggleRow,
    selectAll,
  } = useSelection(controlledSelectedRows, onSelectionChange);

  // ── States ────────────────────────────────────────────────────────
  const [page, setPage] = useState(controlledPage || 1);
  const [pageSize, setPageSize] = useState(controlledPageSize || defaultPageSize);
  const [sorting, setSorting] = useState<SortingState[]>(defaultSorting);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [advancedFilter, setAdvancedFilter] = useState<TableFilter>({ conditions: [], logic: "AND" });

  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);
  const [draggedCol, setDraggedCol] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  // ── Ref for Resizing ──────────────────────────────────────────────
  const resizingRef = useRef<{ id: string; startX: number; startWidth: number } | null>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const bulkImportRef = useRef<HTMLDivElement>(null);
  const bulkActionsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Click Outside Handlers ────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (visibilityRef.current && !visibilityRef.current.contains(event.target as Node)) {
        setIsVisibilityOpen(false);
      }
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (bulkImportRef.current && !bulkImportRef.current.contains(event.target as Node)) {
        setIsBulkImportOpen(false);
      }
      if (bulkActionsRef.current && !bulkActionsRef.current.contains(event.target as Node)) {
        setIsBulkActionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync with controlled props
  useEffect(() => {
    if (controlledPage !== undefined) setPage(controlledPage);
  }, [controlledPage]);

  useEffect(() => {
    if (controlledPageSize !== undefined) setPageSize(controlledPageSize);
  }, [controlledPageSize]);

  // ── Handlers ──────────────────────────────────────────────────────
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage);
  }, [onPageChange]);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPage(1);
    onPageSizeChange?.(newSize);
    onPageChange?.(1);
  }, [onPageSizeChange, onPageChange]);

  const handleSort = useCallback((columnId: string) => {
    setSorting(prev => {
      const existing = prev.find(s => s.id === columnId);
      let next: SortingState[];
      if (!existing) next = [{ id: columnId, desc: false }];
      else if (!existing.desc) next = [{ id: columnId, desc: true }];
      else next = [];
      onSortChange?.(next);
      return next;
    });
  }, [onSortChange]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    onSearchChange?.(query);
    setPage(1);
    onPageChange?.(1);
  }, [onSearchChange, onPageChange]);

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onBulkImport) onBulkImport(file);
    if (event.target.value) event.target.value = "";
    setIsBulkImportOpen(false);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    const colDef = initialColumns.find(c => c.id === id);
    if(colDef?.disableReorder) {
       e.preventDefault();
       return;
    }
    setDraggedCol(id);
    e.dataTransfer.effectAllowed = "move";
  };
  
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedCol === id) return;
    setDragOverCol(id);
  };
  
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverCol(null);
    if (!draggedCol || draggedCol === targetId) return;
    reorderColumn(draggedCol, targetId);
    setDraggedCol(null);
  };

  // ── Resizing Handlers ─────────────────────────────────────────────
  const onResizeStart = (e: React.MouseEvent, id: string, currentWidth: number) => {
    e.stopPropagation();
    resizingRef.current = { id, startX: e.clientX, startWidth: currentWidth || 150 };
    document.addEventListener("mousemove", onResizing);
    document.addEventListener("mouseup", onResizeEnd);
  };

  const onResizing = (e: MouseEvent) => {
    if (!resizingRef.current) return;
    const { id, startX, startWidth } = resizingRef.current;
    const delta = e.clientX - startX;
    const newWidth = Math.max(50, startWidth + delta);
    setWidth(id, newWidth);
  };

  const onResizeEnd = () => {
    resizingRef.current = null;
    document.removeEventListener("mousemove", onResizing);
    document.removeEventListener("mouseup", onResizeEnd);
  };

  const onDoubleClickResize = (colId: string) => {
    const col = initialColumns.find(c => c.id === colId);
    if (!col) return;
    
    // Simple heuristic for auto-fit: 
    // Find longest string in data for this column + header
    let maxLength = col.header.length;
    data.forEach(row => {
      const val = col.accessorFn ? col.accessorFn(row) : (col.accessorKey ? getNestedValue(row, col.accessorKey) : "");
      const strLen = String(val ?? "").length;
      if (strLen > maxLength) maxLength = strLen;
    });

    const estimatedWidth = Math.min(Math.max(maxLength * 9 + 40, 80), 400); 
    setWidth(colId, estimatedWidth);
  };

  // ── Render Helpers ────────────────────────────────────────────────
  const renderCell = (row: TData, col: ColumnDef<TData>, rowIndex: number) => {
    const value = col.accessorFn ? col.accessorFn(row) : (col.accessorKey ? getNestedValue(row, col.accessorKey) : undefined);
    
    const subValue = col.accessorSubKey ? getNestedValue(row, col.accessorSubKey) : undefined;
    const avatarUrl = col.accessorAvatarKey ? getNestedValue(row, col.accessorAvatarKey) : undefined;

    const renderMainContent = () => {
      if (col.cell) return col.cell(value, row, rowIndex);
      
      // Handle Action Type
      if (col.type === "action" && col.actions) {
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            {col.actions.map(action => {
              const icon = action.icon || (
                action.id === "edit" || action.label === "Edit" ? <IconEdit /> :
                action.id === "delete" || action.label === "Delete" ? <IconDelete /> : 
                null
              );
              return (
                <button 
                  key={action.id} 
                  className={styles.actionBtn} 
                  onClick={(e) => { e.stopPropagation(); action.onClick(row); }}
                  title={action.tooltip || action.label}
                  style={{ color: action.color }}
                >
                  {icon || action.label}
                </button>
              );
            })}
          </div>
        );
      }

      // Handle Array (Chips) with Expandable logic
      if (Array.isArray(value)) {
        const max = col.maxDisplayed || 2;
        const displayed = value.slice(0, max);
        const remaining = value.length - max;
        
        return (
          <div className={styles.chipContainer}>
            {displayed.map((item, i) => (
              <span key={i} className={styles.chip} style={{ backgroundColor: col.badgeColorMap?.[item] }}>{String(item)}</span>
            ))}
            {remaining > 0 && (
              <div className={styles.chipMore}>
                +{remaining}
                {col.hoverToExpand && (
                  <div className={styles.chipTooltip}>
                    {value.join(", ")}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      switch (col.type) {
        case "boolean": return value ? "Yes" : "No";
        case "date": return value ? new Date(value as string).toLocaleDateString() : "-";
        case "number": return typeof value === "number" ? value.toLocaleString() : value;
        case "badge":
          const color = col.badgeColorMap?.[value as string] || "var(--ct-text-muted)";
          return <span style={{ padding: "2px 8px", borderRadius: "12px", backgroundColor: color, color: "#fff", fontSize: "12px", fontWeight: 500 }}>{String(value)}</span>;
        default: return String(value ?? "");
      }
    };

    if (avatarUrl || subValue) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {avatarUrl && (
            <img 
              src={String(avatarUrl)} 
              alt="avatar" 
              style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", background: "var(--ct-bg-header)" }} 
              onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${value || 'U'}&background=random`; }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ fontWeight: 500, color: "var(--ct-text-main)", overflow: "hidden", textOverflow: "ellipsis" }}>{renderMainContent()}</div>
            {subValue && <div style={{ fontSize: "12px", color: "var(--ct-text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>{String(subValue)}</div>}
          </div>
        </div>
      );
    }

    return renderMainContent();
  };

  const rowIds = useMemo(() => data.map((row, i) => getRowId ? getRowId(row) : String(i)), [data, getRowId]);

  // ── Client-Side Filtering Logic ───────────────────────────────────
  const filteredData = useMemo(() => {
    if (serverSide) return data;

    let result = [...data];

    // 1. Global Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(row => {
        return initialColumns.some(col => {
          const val = col.accessorFn ? col.accessorFn(row) : (col.accessorKey ? getNestedValue(row, col.accessorKey) : "");
          return String(val ?? "").toLowerCase().includes(q);
        });
      });
    }

    // 2. Advanced Filters
    if (advancedFilter.conditions.length > 0) {
      result = result.filter(row => {
        const matches = advancedFilter.conditions.map(condition => {
          const col = initialColumns.find(c => c.id === condition.columnId);
          if (!col) return true;
          const val = col.accessorFn ? col.accessorFn(row) : (col.accessorKey ? getNestedValue(row, col.accessorKey) : "");
          
          const target = condition.value;
          const targetTo = condition.valueTo;

          switch (condition.operator) {
            case "equals": return String(val) === String(target);
            case "notEquals": return String(val) !== String(target);
            case "contains": return String(val ?? "").toLowerCase().includes(String(target).toLowerCase());
            case "notContains": return !String(val ?? "").toLowerCase().includes(String(target).toLowerCase());
            case "startsWith": return String(val ?? "").toLowerCase().startsWith(String(target).toLowerCase());
            case "endsWith": return String(val ?? "").toLowerCase().endsWith(String(target).toLowerCase());
            case "gt": return Number(val) > Number(target);
            case "lt": return Number(val) < Number(target);
            case "gte": return Number(val) >= Number(target);
            case "lte": return Number(val) <= Number(target);
            case "between": return Number(val) >= Number(target) && Number(val) <= Number(targetTo);
            case "isEmpty": return val === null || val === undefined || val === "";
            case "isNotEmpty": return val !== null && val !== undefined && val !== "";
            default: return true;
          }
        });

        return advancedFilter.logic === "AND" 
          ? matches.every(m => m) 
          : matches.some(m => m);
      });
    }

    return result;
  }, [data, searchQuery, advancedFilter, initialColumns, serverSide]);

  const pagedData = useMemo(() => {
    if (serverSide) return data;
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize, serverSide, data]);

  // ── Icons ────────────────────────────────────────────────────────
  const IconSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
  const IconChevronLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
  const IconChevronRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
  const IconColumns = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>;
  const IconDownload = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
  const IconFilter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
  const IconSort = ({ desc, active }: { desc?: boolean, active: boolean }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: active ? 1 : 0.2 }}>
      {desc ? <path d="m7 15 5 5 5-5M12 20V4" /> : <path d="m7 9 5-5 5 5M12 4v16" />}
    </svg>
  );

  const IconEdit = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
  const IconDelete = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

  return (
    <div className={`${styles.container} ${className}`} style={style} data-theme={theme} data-density={density}>
      {showToolbar && (
        <div className={styles.toolbar}>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: "none" }} 
            accept=".xlsx, .xls, .csv" 
            onChange={handleFileChange} 
          />
          <div style={{ display: "flex", gap: "10px", position: "relative", alignItems: "center" }}>
            <span style={{ position: "absolute", left: "12px", color: "var(--ct-text-muted)" }}><IconSearch /></span>
            <input 
              type="text" 
              className={styles.searchInput} 
              style={{ paddingLeft: "36px" }}
              placeholder={searchPlaceholder || "Search..."} 
              value={searchQuery} 
              onChange={(e) => handleSearch(e.target.value)} 
            />
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            
            {selectionMode === "multi" && (selectedRows.length > 0 || isAllPagesSelected) && bulkActions.length > 0 && (
              <div className={styles.dropdown} ref={bulkActionsRef}>
                <button 
                  className={styles.toolbarBtn} 
                  style={{ backgroundColor: "#1e293b", color: "#fff", borderColor: "#1e293b", padding: "0 12px", gap: "8px" }}
                  onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}
                >
                  <Layers size={14} />
                  <span>{isAllPagesSelected ? (totalRows || data.length) : selectedRows.length} Selected</span>
                </button>
                {isBulkActionsOpen && (
                  <div className={styles.dropdownPanel} style={{ minWidth: "180px" }}>
                    <div className={styles.dropdownBody}>
                      {bulkActions.map((action) => (
                        <div key={action.value} className={`${styles.dropdownItem} ${action.className || ""}`} onClick={() => { onBulkAction?.(action.value, selectedRows); setIsBulkActionsOpen(false); }}>
                          {action.icon && <span style={{ marginRight: "8px" }}>{action.icon}</span>}
                          {action.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className={styles.dropdown} ref={filterRef}>
              <button 
                className={`${styles.toolbarBtn} ${advancedFilter.conditions.length > 0 ? styles.toolbarBtnActive : ""}`} 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <IconFilter />
                Filter
                {advancedFilter.conditions.length > 0 && <span className={styles.badge}>{advancedFilter.conditions.length}</span>}
              </button>
              <FilterDropdown 
                isOpen={isFilterOpen} 
                onClose={() => setIsFilterOpen(false)} 
                columns={initialColumns}
                initialFilter={advancedFilter}
                onApply={(filter) => {
                  setAdvancedFilter(filter);
                  setPage(1);
                  onAdvancedFilterChange?.(filter);
                }}
              />
            </div>

            {onRefresh && (
              <button 
                className={styles.toolbarBtn} 
                onClick={onRefresh}
                style={{ padding: "0 8px" }}
              >
                <RefreshCw size={14} className={isRefreshing ? styles.spin : ""} />
              </button>
            )}

            {showColumnVisibility && (
              <div className={styles.dropdown} ref={visibilityRef}>
                <button className={styles.toolbarBtn} onClick={() => setIsVisibilityOpen(!isVisibilityOpen)} style={{ padding: "0 8px" }}>
                  <IconColumns />
                </button>
                {isVisibilityOpen && (
                  <div className={styles.dropdownPanel}>
                    <div className={styles.dropdownBody}>
                      {initialColumns.map(col => (
                        <div key={col.id} className={styles.dropdownItem} onClick={() => toggleVisibility(col.id)}>
                          <input type="checkbox" checked={visibleColumns.includes(col.id)} readOnly />
                          {col.header}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {showExportButton && onExport && (
              <div className={styles.dropdown} ref={exportRef}>
                <button className={styles.toolbarBtn} onClick={() => setIsExportOpen(!isExportOpen)} style={{ padding: "0 8px" }}>
                  <IconDownload />
                </button>
                {isExportOpen && (
                  <div className={styles.dropdownPanel} style={{ minWidth: "120px" }}>
                    <div className={styles.dropdownBody}>
                      <div className={styles.dropdownItem} onClick={() => { onExport("csv", data); setIsExportOpen(false); }}>CSV</div>
                      <div className={styles.dropdownItem} onClick={() => { onExport("excel", data); setIsExportOpen(false); }}>Excel</div>
                      <div className={styles.dropdownItem} onClick={() => { onExport("pdf", data); setIsExportOpen(false); }}>PDF</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {showBulkImport && (
              <div className={styles.dropdown} ref={bulkImportRef}>
                <button className={styles.toolbarBtn} onClick={() => setIsBulkImportOpen(!isBulkImportOpen)} style={{ padding: "0 8px" }}>
                  <UploadCloud size={14} />
                </button>
                {isBulkImportOpen && (
                  <div className={styles.dropdownPanel} style={{ minWidth: "200px" }}>
                    <div className={styles.dropdownBody}>
                       {onDownloadTemplate && (
                        <div className={styles.dropdownItem} onClick={() => { onDownloadTemplate(); setIsBulkImportOpen(false); }}>
                          <FileDown size={14} style={{ marginRight: 8, color: "#3b82f6" }} /> Download Template
                        </div>
                       )}
                       {onBulkImport && (
                        <div className={styles.dropdownItem} onClick={handleFileClick}>
                          <FileUp size={14} style={{ marginRight: 8, color: "#10b981" }} /> Bulk Import
                        </div>
                       )}
                       {onBulkExport && (
                        <div className={styles.dropdownItem} onClick={() => { onBulkExport(); setIsBulkImportOpen(false); }}>
                          <Download size={14} style={{ marginRight: 8, color: "#f97316" }} /> Bulk Export
                        </div>
                       )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {showAddButton && (
              <button 
                id={addButtonId}
                className={styles.primaryBtn}
                onClick={onAddClick}
                style={{ padding: "0 12px", height: "36px", gap: "8px", border: "none" }}
              >
                <Plus size={14} /> 
                <span style={{ fontSize: "12px" }}>{addButtonLabel}</span>
              </button>
            )}
          </div>
        </div>
      )}

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.thead} style={{ position: stickyHeader ? "sticky" : "static" }}>
            <tr className={styles.tr}>
              {selectionMode === "multi" && (
                <th className={`${styles.th} ${styles.stickyLeft}`} style={{ width: "40px" }}>
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (onSelectAllStateChange) onSelectAllStateChange(checked);
                      if (checked) selectAll(rowIds); else selectAll([]);
                    }} 
                    checked={isAllPagesSelected || (rowIds.length > 0 && rowIds.every(id => selectedRows.includes(id)))} 
                  />
                </th>
              )}
              {columns.map(col => {
                const isDraggable = !col.disableReorder;
                return (
                  <th 
                    key={col.id} 
                    draggable={isDraggable}
                    onDragStart={isDraggable ? (e) => handleDragStart(e, col.id) : undefined}
                    onDragOver={isDraggable ? (e) => handleDragOver(e, col.id) : undefined}
                    onDrop={isDraggable ? (e) => handleDrop(e, col.id) : undefined}
                    className={`${styles.th} ${col.pin === "left" ? styles.stickyLeft : ""} ${col.pin === "right" ? styles.stickyRight : ""} ${dragOverCol === col.id ? styles.thDragOver : ""} ${isDraggable ? styles.thDraggable : ""}`}
                    style={{ 
                      width: columnWidths[col.id] || col.width, 
                      minWidth: col.minWidth, 
                      textAlign: col.align || "left",
                      opacity: draggedCol === col.id ? 0.5 : 1
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div onClick={() => col.sortable !== false && handleSort(col.id)} style={{ cursor: col.sortable !== false ? "pointer" : "default", display: "flex", alignItems: "center", gap: "8px", userSelect: "none" }}>
                        {col.header}
                        {col.sortable !== false && (
                          <IconSort active={!!sorting.find(s => s.id === col.id)} desc={sorting.find(s => s.id === col.id)?.desc} />
                        )}
                      </div>
                      {col.disableResize !== true && (
                        <div 
                          className={styles.resizer} 
                          onMouseDown={(e) => onResizeStart(e, col.id, Number(columnWidths[col.id] || col.width || 150))}
                          onDoubleClick={() => onDoubleClickResize(col.id)}
                          draggable={false}
                          onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={`${styles.tbody} ${striped ? styles.tbodyStriped : ""}`}>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i} className={styles.tr}>
                  {selectionMode === "multi" && <td className={styles.td}><div className={styles.skeleton} /></td>}
                  {columns.map(col => <td key={col.id} className={styles.td}><div className={styles.skeleton} /></td>)}
                </tr>
              ))
            ) : pagedData.length === 0 ? (
              <tr><td colSpan={columns.length + (selectionMode === "multi" ? 1 : 0)} className={styles.emptyState}>{emptyContent || "No data found"}</td></tr>
            ) : (
              pagedData.map((row, rowIndex) => {
                const rowId = rowIds[rowIndex];
                const isSelected = selectedRows.includes(rowId) || !!isAllPagesSelected;
                return (
                  <tr key={rowId} className={`${styles.tr} ${isSelected ? styles.trSelected : ""}`}>
                    {selectionMode === "multi" && (
                      <td className={`${styles.td} ${styles.stickyLeft}`} style={{ width: "40px" }}>
                        <input type="checkbox" checked={isSelected} onChange={(e) => {
                            if (isAllPagesSelected && onSelectAllStateChange && !e.target.checked) onSelectAllStateChange(false);
                            toggleRow(rowId, e.target.checked);
                        }} />
                      </td>
                    )}
                    {columns.map(col => {
                      const value = col.accessorFn ? col.accessorFn(row) : (col.accessorKey ? getNestedValue(row, col.accessorKey) : undefined);
                      const hasTooltip = (Array.isArray(value) && value.length > (col.maxDisplayed || 2) && col.hoverToExpand);

                      return (
                        <td 
                          key={col.id} 
                          className={`${styles.td} ${col.pin === "left" ? styles.stickyLeft : ""} ${col.pin === "right" ? styles.stickyRight : ""} ${hasTooltip ? styles.hasTooltip : ""}`} 
                          style={{ textAlign: col.align || "left", width: columnWidths[col.id] || col.width }}
                        >
                          {renderCell(row, col, rowIndex)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationLeft}>
          <span>Showing <strong>{((page - 1) * pageSize) + 1}</strong> to <strong>{Math.min(page * pageSize, serverSide ? (totalRows || data.length) : filteredData.length)}</strong> of {serverSide ? (totalRows || data.length) : filteredData.length}</span>
        </div>
        <div className={styles.paginationRight}>
          <button className={styles.pageBtn} disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
            <IconChevronLeft />
          </button>
          <span className={styles.pageInfo}>Page <strong>{page}</strong></span>
          <button className={styles.pageBtn} disabled={serverSide ? page * pageSize >= (totalRows || 0) : page * pageSize >= filteredData.length} onClick={() => handlePageChange(page + 1)}>
            <IconChevronRight />
          </button>
          <select className={styles.pageSelect} value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
            {pageSizeOptions.map(opt => <option key={opt} value={opt}>{opt} / page</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};
