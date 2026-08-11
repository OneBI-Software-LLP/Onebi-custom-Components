import React from "react";
import "./styles/table.css";

// ─────────────────────────────────────────────────────────────
//  PRIMITIVE UI TABLE COMPONENTS
// ─────────────────────────────────────────────────────────────

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className = "", ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={["w-full caption-bottom text-sm tb-table", className].filter(Boolean).join(" ")}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = "", ...props }, ref) => (
  <thead ref={ref} className={["[&_tr]:border-b", className].filter(Boolean).join(" ")} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBodyPrimitive = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = "", ...props }, ref) => (
  <tbody
    ref={ref}
    className={["[&_tr:last-child]:border-0", className].filter(Boolean).join(" ")}
    {...props}
  />
));
TableBodyPrimitive.displayName = "TableBodyPrimitive";

const TableFooterPrimitive = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = "", ...props }, ref) => (
  <tfoot
    ref={ref}
    className={[
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    ].filter(Boolean).join(" ")}
    {...props}
  />
));
TableFooterPrimitive.displayName = "TableFooterPrimitive";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className = "", ...props }, ref) => (
  <tr
    ref={ref}
    className={[
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted tb-row",
      className,
    ].filter(Boolean).join(" ")}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className = "", ...props }, ref) => (
  <th
    ref={ref}
    className={[
      "h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 tb-th",
      className,
    ].filter(Boolean).join(" ")}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className = "", ...props }, ref) => (
  <td
    ref={ref}
    className={["p-4 align-middle [&:has([role=checkbox])]:pr-0 tb-td", className].filter(Boolean).join(" ")}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className = "", ...props }, ref) => (
  <caption
    ref={ref}
    className={["mt-4 text-sm text-muted-foreground", className].filter(Boolean).join(" ")}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// ─────────────────────────────────────────────────────────────
//  TYPES FOR COMPOUND TABLE
// ─────────────────────────────────────────────────────────────

export type EmployeeStatus = 'Active' | 'Invited' | 'Inactive' | 'Suspended' | (string & {});

export interface Employee {
  id: string;
  name: string;
  email: string;
  dept: string;
  grade: string;
  designation: string;
  status: EmployeeStatus;
  [key: string]: any;
}

export interface ColumnDef<T = any> {
  id?: string;
  header?: React.ReactNode | ((column: ColumnDef<T>) => React.ReactNode);
  accessorKey?: keyof T | string;
  cell?: (info: { row: T; value: any; index: number }) => React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary';
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: any;
}

export interface TableRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableToolbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  totalCount?: number;
  onSearch?: (q: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ActionItem[];
  children?: React.ReactNode;
  filterSlot?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableBodyProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'data'> {
  data?: T[];
  columns?: ColumnDef<T>[];
  selectedIds?: Set<string>;
  onToggleRow?: (id: string) => void;
  onApprove?: (row: T) => void;
  onRemove?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  approveIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  editIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  rowKey?: keyof T | ((row: T, index: number) => string);
  emptyState?: React.ReactNode;
  hideSelection?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  page?: number;
  totalPages?: number;
  pageSize?: number;
  onPageChange?: (p: number) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface DataTableProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'data'> {
  data?: T[];
  columns?: ColumnDef<T>[];
  title?: React.ReactNode;
  totalCount?: number;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  onApprove?: (row: T) => void;
  onRemove?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  actions?: ActionItem[];
  pageSize?: number;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSearch?: (q: string) => void;
  searchPlaceholder?: string;
  filterSlot?: React.ReactNode;
  rowKey?: keyof T | ((row: T, index: number) => string);
  emptyState?: React.ReactNode;
  hideToolbar?: boolean;
  hideActions?: boolean;
  hideFooter?: boolean;
  hideSelection?: boolean;
  approveIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  editIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ─────────────────────────────────────────────────────────────
//  BUILT-IN ICONS
// ─────────────────────────────────────────────────────────────

export const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
export const ExportIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
export const UploadIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
export const PlusIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" /><line x1="8" y1="12" x2="16" y2="12" /></svg>;
export const EditIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
export const DeleteIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>;
export const OnboardIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>;
export const FilterIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;

const MailIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" /></svg>;
const ChevronDown = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>;
const ChevronLeft = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevronRight = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>;

// ─────────────────────────────────────────────────────────────
//  INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  return <span className={`tb-badge tb-badge-${(status || 'active').toLowerCase()}`}>{status}</span>;
}

function SelectAllCheckbox({
  checked, indeterminate, onChange,
}: { checked: boolean; indeterminate: boolean; onChange: (v: boolean) => void }) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <input ref={ref} type="checkbox" className="tb-checkbox"
      checked={checked} onChange={e => onChange(e.target.checked)} />
  );
}

function buildPageList(page: number, total: number): (number | '...')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, '...', total];
  if (page >= total - 2) return [1, '...', total - 2, total - 1, total];
  return [1, '...', page - 1, page, page + 1, '...', total];
}

function extractRowId<T>(row: T, index: number, rowKey?: keyof T | ((r: T, i: number) => string)): string {
  if (typeof rowKey === 'function') return rowKey(row, index);
  if (rowKey && row && typeof row === 'object' && rowKey in row) return String((row as any)[rowKey]);
  if (row && typeof row === 'object') {
    if ('id' in row && (row as any).id !== undefined) return String((row as any).id);
    if ('_id' in row && (row as any)._id !== undefined) return String((row as any)._id);
    if ('key' in row && (row as any).key !== undefined) return String((row as any).key);
  }
  return String(index);
}

function capitalizeHeader(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .trim()
    .replace(/^\w/, c => c.toUpperCase());
}

function isEmployeeLike(obj: any): boolean {
  if (!obj || typeof obj !== 'object') return false;
  return 'name' in obj && ('dept' in obj || 'email' in obj || 'designation' in obj);
}

export function ActionButton({ item }: { item: ActionItem }) {
  const { label, icon, variant, onClick, disabled, className = '', style, ...rest } = item;
  return (
    <button
      className={['tb-btn', variant === 'primary' ? 'tb-btn-primary' : '', className].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={disabled}
      type="button"
      style={style}
      {...rest}
    >
      {icon && <span className="tb-btn-icon">{icon}</span>}
      {label}
    </button>
  );
}

export function TableRoot({ children, className = '', style, ...props }: TableRootProps) {
  return (
    <div
      className={['tb-root', className].filter(Boolean).join(' ')}
      role="region"
      aria-label="Data table"
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export function TableToolbar({
  title = 'All Employees',
  totalCount,
  onSearch,
  searchPlaceholder,
  children,
  className = '',
  style,
  ...props
}: TableToolbarProps) {
  const placeholder = searchPlaceholder ?? (typeof title === 'string' && title.toLowerCase().includes('employee') ? 'Search Employee Name/ID' : 'Search...');

  return (
    <div className={['tb-toolbar', className].filter(Boolean).join(' ')} style={style} {...props}>
      <div className="tb-toolbar-left">
        {title && <span className="tb-title">{title}</span>}
        {totalCount !== undefined && (
          <span className="tb-count-badge">Total: {totalCount.toLocaleString()}</span>
        )}
      </div>
      <div className="tb-toolbar-right">
        {children}
        {onSearch && (
          <label className="tb-search" aria-label="Search items">
            <span className="tb-search-icon"><SearchIcon /></span>
            <input
              type="text"
              placeholder={placeholder}
              onChange={e => onSearch(e.target.value)}
            />
          </label>
        )}
      </div>
    </div>
  );
}

export function TableActions({ items, children, filterSlot, className = '', style, ...props }: TableActionsProps) {
  return (
    <div className={['tb-actions-bar', className].filter(Boolean).join(' ')} style={style} {...props}>
      <div className="tb-actions-left">
        {items ? items.map((item, i) => <ActionButton key={i} item={item} />) : children}
      </div>
      {filterSlot !== undefined ? filterSlot : (
        <button className="tb-filter-btn" type="button" aria-label="Filter items">
          <FilterIcon />
        </button>
      )}
    </div>
  );
}

export function TableBody<T = any>({
  data = [],
  columns,
  selectedIds = new Set(),
  onToggleRow,
  onApprove,
  onRemove,
  onEdit,
  onDelete,
  approveIcon,
  removeIcon,
  editIcon,
  deleteIcon,
  rowKey,
  emptyState,
  hideSelection = false,
  className = '',
  style,
  ...props
}: TableBodyProps<T>) {
  const ids = data.map((item, idx) => extractRowId(item, idx, rowKey));
  const allSelected = ids.length > 0 && ids.every(id => selectedIds.has(id));
  const someSelected = ids.some(id => selectedIds.has(id)) && !allSelected;

  function toggleAll(checked: boolean) {
    if (!onToggleRow) return;
    ids.forEach(id => {
      const has = selectedIds.has(id);
      if (checked && !has) onToggleRow(id);
      if (!checked && has) onToggleRow(id);
    });
  }

  const effectiveCols: ColumnDef<T>[] = React.useMemo(() => {
    if (columns && columns.length > 0) return columns;
    if (data.length === 0) return [];
    
    if (isEmployeeLike(data[0])) {
      return [
        {
          id: 'name',
          header: 'Name',
          cell: ({ row }: { row: any }) => (
            <div className="tb-name-wrap">
              <span className="tb-name" title={row.name}>{row.name}</span>
              {row.email && (
                <span className="tb-email"><MailIcon /><span title={row.email}>{row.email}</span></span>
              )}
            </div>
          ),
        },
        { id: 'id', header: 'ID', accessorKey: 'id', className: 'tb-td-muted' },
        { id: 'dept', header: 'Dept.', accessorKey: 'dept' },
        { id: 'grade', header: 'Grade', accessorKey: 'grade' },
        { id: 'designation', header: 'Designa...', accessorKey: 'designation' },
        {
          id: 'status',
          header: 'Status',
          cell: ({ row }: { row: any }) => <StatusBadge status={row.status} />,
        },
      ];
    }

    const first = data[0] as any;
    const keys = Object.keys(first).filter(k => typeof first[k] !== 'function');
    return keys.map(k => ({
      id: k,
      header: capitalizeHeader(k),
      accessorKey: k,
    }));
  }, [columns, data]);

  const hasActions = Boolean(onEdit || onApprove || onDelete || onRemove);
  const totalColCount = effectiveCols.length + (hideSelection ? 0 : 1) + (hasActions ? 1 : 0);

  return (
    <div className={['tb-table-wrap', className].filter(Boolean).join(' ')} style={style} {...props}>
      <Table className="tb-table">
        <TableHeader>
          <TableRow>
            {!hideSelection && (
              <TableHead className="tb-th tb-th-check tb-th-sticky-left">
                <SelectAllCheckbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                />
              </TableHead>
            )}
            {effectiveCols.map((col, i) => (
              <TableHead
                key={col.id || String(col.accessorKey) || i}
                className={['tb-th', col.className].filter(Boolean).join(' ')}
                style={{ width: col.width, textAlign: col.align, ...col.style }}
              >
                {typeof col.header === 'function' ? col.header(col) : col.header}
              </TableHead>
            ))}
            {hasActions && <TableHead className="tb-th tb-th-sticky-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBodyPrimitive>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={totalColCount || 1} className="tb-empty">
                {emptyState ?? 'No data found.'}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => {
              const rowId = extractRowId(row, index, rowKey);
              const isSel = selectedIds.has(rowId);
              return (
                <TableRow
                  key={rowId}
                  className={['tb-row', isSel ? 'tb-row-selected' : ''].filter(Boolean).join(' ')}
                  role="row"
                  aria-selected={isSel}
                >
                  {!hideSelection && (
                    <TableCell className="tb-td tb-td-sticky-left">
                      <div className="tb-check-cell">
                        <input
                          type="checkbox"
                          className="tb-checkbox"
                          checked={isSel}
                          onChange={() => onToggleRow?.(rowId)}
                          aria-label={`Select row ${rowId}`}
                        />
                      </div>
                    </TableCell>
                  )}
                  {effectiveCols.map((col, i) => {
                    const key = col.accessorKey || col.id;
                    const val = key ? (row as any)[key] : undefined;
                    let content: React.ReactNode = null;
                    if (col.cell) {
                      const info = { row, value: val, index };
                      content = (col.cell as any)(info, val, row, index);
                    } else if (col.render) {
                      content = col.render(row, index);
                    } else if (val !== undefined && val !== null) {
                      content = String(val);
                    }
                    return (
                      <TableCell
                        key={col.id || String(col.accessorKey) || i}
                        className={['tb-td', col.className].filter(Boolean).join(' ')}
                        style={{ textAlign: col.align, ...col.style }}
                      >
                        {content}
                      </TableCell>
                    );
                  })}
                  {hasActions && (
                    <TableCell className="tb-td tb-td-sticky-right">
                      <div className="tb-actions-cell">
                        {onApprove && (
                          <button
                            type="button"
                            className="tb-action-btn"
                            title="Approve"
                            onClick={() => onApprove(row)}
                          >
                            {approveIcon ?? '✓'}
                          </button>
                        )}
                        {onRemove && (
                          <button
                            type="button"
                            className="tb-action-btn tb-action-danger"
                            title="Remove"
                            onClick={() => onRemove(row)}
                          >
                            {removeIcon ?? '✕'}
                          </button>
                        )}
                        {onEdit && (
                          <button
                            type="button"
                            className="tb-action-btn"
                            title="Edit"
                            onClick={() => onEdit(row)}
                          >
                            {editIcon ?? <EditIcon />}
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            className="tb-action-btn tb-action-danger"
                            title="Delete"
                            onClick={() => onDelete(row)}
                          >
                            {deleteIcon ?? <DeleteIcon />}
                          </button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBodyPrimitive>
      </Table>
    </div>
  );
}

export function TableFooter({
  page = 1,
  totalPages = 1,
  pageSize = 50,
  onPageChange,
  children,
  className = '',
  style,
  ...props
}: TableFooterProps) {
  return (
    <div className={['tb-footer', className].filter(Boolean).join(' ')} style={style} {...props}>
      {children ? children : (
        <>
          <button className="tb-per-page" type="button">
            {pageSize} / Page <ChevronDown />
          </button>
          <div className="tb-pagination">
            <button
              className="tb-pg-btn"
              onClick={() => onPageChange?.(page - 1)}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft />
            </button>
            {buildPageList(page, totalPages).map((p, i) =>
              p === '...'
                ? <span key={`d${i}`} className="tb-pg-dots">...</span>
                : <button
                    key={p}
                    className={['tb-pg-btn', page === p ? 'tb-pg-active' : ''].filter(Boolean).join(' ')}
                    onClick={() => onPageChange?.(p as number)}
                    aria-label={`Page ${p}`}
                    aria-current={page === p ? 'page' : undefined}
                  >
                    {p}
                  </button>
            )}
            <button
              className="tb-pg-btn"
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const DEFAULT_ACTIONS: ActionItem[] = [
  { label: 'Export', icon: <ExportIcon />, variant: 'default' },
  { label: 'Upload', icon: <UploadIcon />, variant: 'default' },
  { label: 'Add Employees', icon: <PlusIcon />, variant: 'default' },
  { label: 'Onboard', icon: <OnboardIcon />, variant: 'primary' },
];

export function DataTable<T = any>({
  data = [],
  columns,
  title = 'All Employees',
  totalCount,
  selectedIds: controlledIds,
  onSelectionChange,
  onApprove,
  onRemove,
  onEdit,
  onDelete,
  actions = DEFAULT_ACTIONS,
  pageSize = 50,
  page: controlledPage,
  totalPages: controlledTotalPages,
  onPageChange,
  onSearch: externalOnSearch,
  searchPlaceholder,
  filterSlot,
  rowKey,
  emptyState,
  hideToolbar = false,
  hideActions = false,
  hideFooter = false,
  hideSelection = false,
  approveIcon,
  removeIcon,
  editIcon,
  deleteIcon,
  className = '',
  style,
  ...props
}: DataTableProps<T>) {
  const [internalIds, setInternalIds] = React.useState<Set<string>>(new Set());
  const [internalPage, setInternalPage] = React.useState(1);
  const [search, setSearch] = React.useState('');

  const isCtrlSel = controlledIds !== undefined;
  const isCtrlPage = controlledPage !== undefined;

  const selectedIds = isCtrlSel ? controlledIds : internalIds;
  const page = isCtrlPage ? controlledPage : internalPage;

  const filtered = React.useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((item: any) => {
      if (!item || typeof item !== 'object') return String(item).toLowerCase().includes(q);
      return Object.values(item).some(val =>
        val !== null && val !== undefined && String(val).toLowerCase().includes(q)
      );
    });
  }, [data, search]);

  const totalPages = controlledTotalPages ?? Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = isCtrlPage ? filtered : filtered.slice((page - 1) * pageSize, page * pageSize);

  function updateIds(next: Set<string>) {
    if (!isCtrlSel) setInternalIds(next);
    onSelectionChange?.(next);
  }
  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    updateIds(next);
  }
  function handlePage(p: number) {
    if (!isCtrlPage) setInternalPage(p);
    onPageChange?.(p);
  }

  function handleSearch(q: string) {
    setSearch(q);
    if (!isCtrlPage) setInternalPage(1);
    externalOnSearch?.(q);
  }

  return (
    <TableRoot className={className} style={style} {...props}>
      {!hideToolbar && (
        <TableToolbar
          title={title}
          totalCount={totalCount ?? filtered.length}
          onSearch={handleSearch}
          searchPlaceholder={searchPlaceholder}
        />
      )}
      {!hideActions && (
        <TableActions items={actions} filterSlot={filterSlot} />
      )}
      <TableBody
        data={pageData}
        columns={columns}
        selectedIds={selectedIds}
        onToggleRow={toggleRow}
        onApprove={onApprove}
        onRemove={onRemove}
        onEdit={onEdit}
        onDelete={onDelete}
        approveIcon={approveIcon}
        removeIcon={removeIcon}
        editIcon={editIcon}
        deleteIcon={deleteIcon}
        rowKey={rowKey}
        emptyState={emptyState}
        hideSelection={hideSelection}
      />
      {!hideFooter && (
        <TableFooter
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePage}
        />
      )}
    </TableRoot>
  );
}

export {
  Table,
  TableHeader,
  TableBodyPrimitive,
  TableFooterPrimitive,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
