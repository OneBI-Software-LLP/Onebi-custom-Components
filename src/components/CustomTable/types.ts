import React from "react";

// ─── Aggregation ────────────────────────────────────────────────────────────
export type AggregationFn = "sum" | "avg" | "min" | "max" | "count" | ((values: unknown[]) => unknown);

// ─── Sorting ─────────────────────────────────────────────────────────────────
export interface SortingState {
  id: string;
  desc: boolean;
}

export type FilterOperator = 
  | "equals" | "notEquals" 
  | "contains" | "notContains" 
  | "startsWith" | "endsWith" 
  | "gt" | "lt" 
  | "gte" | "lte"
  | "between" | "isEmpty" | "isNotEmpty"
  | "in" | "notIn";

export interface FilterCondition {
  id: string;
  columnId: string;
  operator: FilterOperator;
  value: any;
  valueTo?: any; // For 'between' operator
}

export interface TableFilter {
  conditions: FilterCondition[];
  logic: "OR" | "AND";
}

// ─── Menu ─────────────────────────────────────────────────────────────────────
export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

// ─── Column ───────────────────────────────────────────────────────────────────
export type ColumnType =
  | "text"
  | "number"
  | "date"
  | "datetime"
  | "boolean"
  | "badge"
  | "action"
  | "custom";

export type PinDirection = "left" | "right" | false;

export interface ColumnDef<TData = unknown> {
  /** Unique column id */
  id: string;
  /** Header label */
  header: string;
  /** Key to access on row data. Use dot notation for nested e.g. "address.city" */
  accessorKey?: string;
  /** Accessor function (overrides accessorKey) */
  accessorFn?: (row: TData) => any;
  accessorSubKey?: string; // Key for sub-text (e.g. email under name)
  accessorAvatarKey?: string; // Key for avatar URL
  /** Default width in px */
  width?: number | string;
  /** Column type (affects default renderer and filter type) */
  type?: ColumnType;
  /** Custom cell renderer */
  cell?: (value: unknown, row: TData, rowIndex: number) => React.ReactNode;
  /** Custom header renderer */
  headerCell?: (col: ColumnDef<TData>) => React.ReactNode;
  /** Footer aggregation */
  aggregation?: AggregationFn;
  /** Is this column sortable? default true */
  sortable?: boolean;
  /** Custom sort comparator */
  sortFn?: (a: TData, b: TData, desc: boolean) => number;
  /** Is this column filterable? default true */
  filterable?: boolean;
  /** Override filter type for the advanced filter modal */
  filterType?: "text" | "number" | "date" | "select" | "multiselect" | "boolean";
  /** Options for select/multiselect filter */
  filterOptions?: { label: string; value: unknown }[];
  /** Is this column editable? */
  editable?: boolean;
  /** Edit type when in edit mode */
  editType?: "text" | "number" | "select" | "date" | "textarea";
  /** Select options for editable select cells */
  editOptions?: { label: string; value: unknown }[];
  /** Validation function for editable cells */
  validate?: (value: unknown, row: TData) => string | null;
  /** Custom edit renderer */
  editCell?: (value: unknown, row: TData, onChange: (v: unknown) => void, onBlur: () => void) => React.ReactNode;
  /** Pin column to 'left' | 'right' | false */
  pin?: PinDirection;
  /** Column visibility (default true) */
  visible?: boolean;
  /** Min width in px */
  minWidth?: number;
  /** Max width in px */
  maxWidth?: number;
  /** Disable column resizing */
  disableResize?: boolean;
  /** Disable column reorder */
  disableReorder?: boolean;
  /** className for header cell */
  headerClassName?: string;
  /** className for data cell */
  cellClassName?: string;
  /** Align content */
  align?: "left" | "center" | "right";
  /** Badge color map (for type="badge") */
  badgeColorMap?: Record<string, string>;
  /** Max chips to display before +X (for arrays) */
  maxDisplayed?: number;
  /** Show full list on hover? */
  hoverToExpand?: boolean;
  /** Actions definition */
  actions?: TableAction<TData>[];
  /** Enable tooltip on cells */
  tooltip?: boolean | ((value: unknown, row: TData) => string);
}

export interface TableAction<TData = unknown> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (row: TData) => void;
  color?: string;
  disabled?: boolean | ((row: TData) => boolean);
  tooltip?: string;
}

// ─── Filtering ────────────────────────────────────────────────────────────────
// ─── Pagination ───────────────────────────────────────────────────────────────
export interface PaginationState {
  page: number;
  pageSize: number;
}

// ─── Export ───────────────────────────────────────────────────────────────────
export type ExportFormat = "csv" | "excel" | "pdf";

export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  columnIds?: string[]; // subset; if undefined export all visible
  exportAll?: boolean; // if true, export all data (not just current page)
}

// ─── Theme ────────────────────────────────────────────────────────────────────
export type TableTheme = "light" | "dark" | "minimal" | "striped";
export type DensityMode = "comfortable" | "standard" | "compact";

// ─── Main Table Props ─────────────────────────────────────────────────────────
export interface TableProps<TData = Record<string, unknown>> {
  // ── Data ────────────────────────
  data: TData[];
  columns: ColumnDef<TData>[];
  /** Unique row id accessor (default: uses row index) */
  getRowId?: (row: TData) => string;
  /** Sub-rows accessor for tree data */
  getSubRows?: (row: TData) => TData[] | undefined;
  loading?: boolean;
  error?: string;
  /** Custom empty state content */
  emptyContent?: React.ReactNode;

  // ── Server-Side ──────────────────
  /** Enable server-side mode (pagination/sort/filter fire callbacks instead of computing locally) */
  serverSide?: boolean;
  /** Total row count from server (for pagination display) */
  totalRows?: number;
  /** Controlled current page (1-based) */
  page?: number;
  /** Controlled page size */
  pageSize?: number;
  /** Page size options */
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  /** Fires when search query changes (debounced 300ms) */
  onSearchChange?: (query: string) => void;
  /** Fires when sorting changes */
  onSortChange?: (sort: SortingState[]) => void;
  /** Fires when column filters change (basic search) */
  onFilterChange?: (filters: FilterCondition[]) => void;
  /** Fires when advanced filters are applied via modal */
  onAdvancedFilterChange?: (filter: TableFilter) => void;

  // ── Client-Side Defaults ─────────
  defaultPageSize?: number;
  defaultSorting?: SortingState[];

  // ── Row Selection ─────────────────
  selectionMode?: "none" | "single" | "multi";
  selectedRows?: string[];
  onSelectionChange?: (ids: string[]) => void;
  /** Show checkbox/radio column */
  showSelectionColumn?: boolean;

  // ── Expansion ────────────────────
  expandable?: boolean;
  renderExpanded?: (row: TData, depth: number) => React.ReactNode;
  /** Default expanded row ids */
  defaultExpanded?: string[];

  // ── Grouping ─────────────────────
  groupBy?: string; // column id
  aggregations?: Record<string, AggregationFn>;

  // ── Editing ──────────────────────
  onCellEdit?: (rowId: string, colId: string, value: unknown, row: TData) => void;

  // ── Row Drag & Reorder ────────────
  draggableRows?: boolean;
  onRowReorder?: (newData: TData[]) => void;

  // ── Virtualization ───────────────
  virtualize?: boolean;
  virtualRowHeight?: number;
  virtualContainerHeight?: number;

  // ── Context Menu ─────────────────
  contextMenuItems?: (row: TData, rowId: string) => MenuItem[];

  // ── Column Features ──────────────
  /** Allow column reordering via drag */
  columnReorder?: boolean;
  /** Allow column resize via drag */
  columnResize?: boolean;

  // ── Layout ───────────────────────
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
  fullHeight?: boolean;
  maxHeight?: string | number;

  // ── Footer ───────────────────────
  showFooter?: boolean;

  // ── Toolbar ──────────────────────
  showToolbar?: boolean;
  toolbarContent?: React.ReactNode;
  /** Placeholder text for the global search input */
  searchPlaceholder?: string;
  /** Show column visibility toggle */
  showColumnVisibility?: boolean;
  /** Show density toggle */
  showDensityToggle?: boolean;
  /** Show export button */
  showExportButton?: boolean;
  /** Callback when export is triggered; if not provided, default export logic runs */
  onExport?: (format: ExportFormat, data: TData[]) => void;

  // ── Appearance ───────────────────
  theme?: TableTheme;
  /** Enable zebra stripes (alternate row backgrounds) */
  striped?: boolean;
  density?: DensityMode;
  className?: string;
  style?: React.CSSProperties;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: (row: TData, rowId: string) => string;
  cellClassName?: (row: TData, col: ColumnDef<TData>) => string;

  /** Called when a row is clicked */
  onRowClick?: (row: TData, rowId: string) => void;
  /** Called when a row is double-clicked */
  onRowDoubleClick?: (row: TData, rowId: string) => void;
}
