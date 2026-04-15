import React from 'react';
import '@/components/ui/styles/table.css';

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

export type EmployeeStatus = 'Active' | 'Invited' | 'Inactive' | 'Suspended';

export interface Employee {
  id          : string;
  name        : string;
  email       : string;
  dept        : string;
  grade       : string;
  designation : string;
  status      : EmployeeStatus;
}

/**
 * A single toolbar action button.
 * Pass an optional `icon` (any ReactNode) — it renders left of the label.
 * Set `variant: "primary"` for the filled indigo button (e.g. Onboard).
 */
export interface ActionItem {
  /** Button label */
  label    : string;
  /** Icon rendered before the label — any ReactNode (SVG, img, lucide, etc.) */
  icon?    : React.ReactNode;
  /** "primary" → filled indigo button. Default: outlined gray */
  variant? : 'default' | 'primary';
  /** Click handler */
  onClick? : () => void;
  /** Disable the button */
  disabled?: boolean;
}

export interface DataTableProps {
  /** Employee rows */
  data?             : Employee[];
  /** Total record count (for display badge) */
  totalCount?       : number;
  /** Controlled selected IDs */
  selectedIds?      : Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  onApprove?        : (emp: Employee) => void;
  onRemove?         : (emp: Employee) => void;
  /**
   * Toolbar action buttons — each item accepts an `icon` prop.
   *
   * @example
   * actions={[
   *   { label: 'Export',        icon: <ExportIcon />,  onClick: handleExport },
   *   { label: 'Upload',        icon: <UploadIcon />,  onClick: handleUpload },
   *   { label: 'Add Employees', icon: <PlusIcon />,    onClick: handleAdd    },
   *   { label: 'Onboard',       icon: <OnboardIcon />, onClick: handleOnboard, variant: 'primary' },
   * ]}
   *
   * Omit icons for text-only buttons:
   * actions={[{ label: 'Export' }, { label: 'Upload' }]}
   */
  actions?          : ActionItem[];
  /** Rows per page (default 50) */
  pageSize?         : number;
  /** Controlled page (1-based) */
  page?             : number;
  totalPages?       : number;
  onPageChange?     : (page: number) => void;
  className?        : string;
}

// composable sub-component prop shapes
export interface TableRootProps     { children: React.ReactNode; className?: string; }
export interface TableToolbarProps  {
  title       : string;
  totalCount? : number;
  onSearch?   : (q: string) => void;
  children?   : React.ReactNode;
  className?  : string;
}
export interface TableActionsProps  {
  /**
   * Declarative: pass ActionItem[] — icons render automatically.
   * Manual: pass ReactNode children for full control.
   */
  items?      : ActionItem[];
  children?   : React.ReactNode;
  /** Replace or hide the built-in filter icon. Pass null to hide it. */
  filterSlot? : React.ReactNode;
  className?  : string;
}
export interface TableBodyProps {
  data         : Employee[];
  selectedIds  : Set<string>;
  onToggleRow  : (id: string) => void;
  onApprove?   : (emp: Employee) => void;
  onRemove?    : (emp: Employee) => void;
  /** Override the approve (✓) icon */
  approveIcon? : React.ReactNode;
  /** Override the remove (✕) icon */
  removeIcon?  : React.ReactNode;
  className?   : string;
}
export interface TableFooterProps {
  page        : number;
  totalPages  : number;
  pageSize?   : number;
  onPageChange: (p: number) => void;
  className?  : string;
}

// ─────────────────────────────────────────────────────────────
//  BUILT-IN ICONS  (exported so consumers can re-use them)
// ─────────────────────────────────────────────────────────────

export const SearchIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
export const ExportIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
export const UploadIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
export const PlusIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
export const OnboardIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>;
export const FilterIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;

// internal
const MailIcon     = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>;
const DefaultCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
const DefaultX     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const ChevronDown  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>;
const ChevronLeft  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;

// ─────────────────────────────────────────────────────────────
//  INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: EmployeeStatus }) {
  return <span className={`tb-badge tb-badge-${status.toLowerCase()}`}>{status}</span>;
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
  if (page <= 3)         return [1, 2, 3, '...', total];
  if (page >= total - 2) return [1, '...', total - 2, total - 1, total];
  return [1, '...', page - 1, page, page + 1, '...', total];
}

// ─────────────────────────────────────────────────────────────
//  ActionButton — renders a single ActionItem
// ─────────────────────────────────────────────────────────────

export function ActionButton({ item }: { item: ActionItem }) {
  return (
    <button
      className={['tb-btn', item.variant === 'primary' ? 'tb-btn-primary' : ''].filter(Boolean).join(' ')}
      onClick={item.onClick}
      disabled={item.disabled}
      type="button"
    >
      {item.icon && <span className="tb-btn-icon">{item.icon}</span>}
      {item.label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
//  COMPOSABLE SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

/** Root wrapper */
function TableRoot({ children, className = '' }: TableRootProps) {
  return (
    <div className={['tb-root', className].filter(Boolean).join(' ')} role="region" aria-label="Employee table">
      {children}
    </div>
  );
}

/** Toolbar: title · count badge · (optional extra children) · search */
function TableToolbar({ title, totalCount, onSearch, children, className = '' }: TableToolbarProps) {
  return (
    <div className={['tb-toolbar', className].filter(Boolean).join(' ')}>
      <div className="tb-toolbar-left">
        <span className="tb-title">{title}</span>
        {totalCount !== undefined && (
          <span className="tb-count-badge">Total: {totalCount.toLocaleString()}</span>
        )}
      </div>
      <div className="tb-toolbar-right">
        {children}
        {onSearch && (
          <label className="tb-search" aria-label="Search employees">
            <span className="tb-search-icon"><SearchIcon /></span>
            <input type="text" placeholder="Search Employee Name/ID"
              onChange={e => onSearch(e.target.value)} />
          </label>
        )}
      </div>
    </div>
  );
}

/**
 * Actions bar — two ways to use:
 *
 * 1. Declarative via `items`:
 *    <TableActions items={[{ label: 'Export', icon: <ExportIcon /> }]} />
 *
 * 2. Manual via `children`:
 *    <TableActions>
 *      <button className="tb-btn"><ExportIcon /> Export</button>
 *    </TableActions>
 */
function TableActions({ items, children, filterSlot, className = '' }: TableActionsProps) {
  return (
    <div className={['tb-actions-bar', className].filter(Boolean).join(' ')}>
      <div className="tb-actions-left">
        {items ? items.map((item, i) => <ActionButton key={i} item={item} />) : children}
      </div>
      {filterSlot !== undefined
        ? filterSlot
        : <button className="tb-filter-btn" type="button" aria-label="Filter"><FilterIcon /></button>
      }
    </div>
  );
}

/** Table rows — pass `approveIcon` / `removeIcon` to swap row action icons */
function TableBody({
  data, selectedIds, onToggleRow, onApprove, onRemove,
  approveIcon, removeIcon, className = '',
}: TableBodyProps) {
  const allSelected  = data.length > 0 && data.every(e => selectedIds.has(e.id));
  const someSelected = data.some(e => selectedIds.has(e.id)) && !allSelected;

  function toggleAll(checked: boolean) {
    data.forEach(e => {
      const has = selectedIds.has(e.id);
      if (checked && !has) onToggleRow(e.id);
      if (!checked && has) onToggleRow(e.id);
    });
  }

  return (
    <div className={['tb-table-wrap', className].filter(Boolean).join(' ')}>
      <table className="tb-table" role="table">
        <thead>
          <tr role="row">
            <th className="tb-th tb-th-check">
              <div className="tb-check-cell">
                <SelectAllCheckbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
              </div>
            </th>
            <th className="tb-th">Name</th>
            <th className="tb-th">ID</th>
            <th className="tb-th">Dept.</th>
            <th className="tb-th">Grade</th>
            <th className="tb-th">Designa...</th>
            <th className="tb-th">Status</th>
            <th className="tb-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={8} className="tb-empty">No employees found.</td></tr>
          ) : (
            data.map(emp => {
              const isSel = selectedIds.has(emp.id);
              return (
                <tr key={emp.id}
                  className={['tb-row', isSel ? 'tb-row-selected' : ''].filter(Boolean).join(' ')}
                  role="row" aria-selected={isSel}>
                  <td className="tb-td">
                    <div className="tb-check-cell">
                      <input type="checkbox" className="tb-checkbox" checked={isSel}
                        onChange={() => onToggleRow(emp.id)} aria-label={`Select ${emp.name}`} />
                    </div>
                  </td>
                  <td className="tb-td">
                    <div className="tb-name-wrap">
                      <span className="tb-name" title={emp.name}>{emp.name}</span>
                      <span className="tb-email"><MailIcon /><span title={emp.email}>{emp.email}</span></span>
                    </div>
                  </td>
                  <td className="tb-td tb-td-muted">{emp.id}</td>
                  <td className="tb-td">{emp.dept}</td>
                  <td className="tb-td">{emp.grade}</td>
                  <td className="tb-td">{emp.designation}</td>
                  <td className="tb-td"><StatusBadge status={emp.status} /></td>
                  <td className="tb-td">
                    <div className="tb-actions-cell">
                      <button className="tb-action-btn" onClick={() => onApprove?.(emp)}
                        type="button" title="Approve" aria-label={`Approve ${emp.name}`}>
                        {approveIcon ?? <DefaultCheck />}
                      </button>
                      <button className="tb-action-btn tb-action-danger" onClick={() => onRemove?.(emp)}
                        type="button" title="Remove" aria-label={`Remove ${emp.name}`}>
                        {removeIcon ?? <DefaultX />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

/** Footer: per-page selector + smart pagination */
function TableFooter({ page, totalPages, pageSize = 50, onPageChange, className = '' }: TableFooterProps) {
  return (
    <div className={['tb-footer', className].filter(Boolean).join(' ')}>
      <button className="tb-per-page" type="button">
        {pageSize} / Page <ChevronDown />
      </button>
      <div className="tb-pagination">
        <button className="tb-pg-btn" onClick={() => onPageChange(page - 1)}
          disabled={page <= 1} aria-label="Previous page"><ChevronLeft /></button>
        {buildPageList(page, totalPages).map((p, i) =>
          p === '...'
            ? <span key={`d${i}`} className="tb-pg-dots">...</span>
            : <button key={p}
                className={['tb-pg-btn', page === p ? 'tb-pg-active' : ''].filter(Boolean).join(' ')}
                onClick={() => onPageChange(p as number)} aria-label={`Page ${p}`}
                aria-current={page === p ? 'page' : undefined}>{p}</button>
        )}
        <button className="tb-pg-btn" onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages} aria-label="Next page"><ChevronRight /></button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  COMPOUND  DataTable
// ─────────────────────────────────────────────────────────────

const DEFAULT_ACTIONS: ActionItem[] = [
  { label: 'Export',        icon: <ExportIcon />,  variant: 'default' },
  { label: 'Upload',        icon: <UploadIcon />,  variant: 'default' },
  { label: 'Add Employees', icon: <PlusIcon />,    variant: 'default' },
  { label: 'Onboard',       icon: <OnboardIcon />, variant: 'primary' },
];

function DataTable({
  data = [],
  totalCount,
  selectedIds: controlledIds,
  onSelectionChange,
  onApprove,
  onRemove,
  actions,
  pageSize = 50,
  page: controlledPage,
  totalPages: controlledTotalPages,
  onPageChange,
  className = '',
}: DataTableProps) {
  const [internalIds,  setInternalIds]  = React.useState<Set<string>>(new Set());
  const [internalPage, setInternalPage] = React.useState(1);
  const [search,       setSearch]       = React.useState('');

  const isCtrlSel  = controlledIds  !== undefined;
  const isCtrlPage = controlledPage !== undefined;

  const selectedIds = isCtrlSel  ? controlledIds  : internalIds;
  const page        = isCtrlPage ? controlledPage : internalPage;

  const filtered = React.useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)   ||
      e.designation.toLowerCase().includes(q)
    );
  }, [data, search]);

  const totalPages = controlledTotalPages ?? Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData   = isCtrlPage ? filtered : filtered.slice((page - 1) * pageSize, page * pageSize);

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

  return (
    <TableRoot className={className}>
      <TableToolbar title="All Employees" totalCount={totalCount ?? filtered.length}
        onSearch={q => { setSearch(q); if (!isCtrlPage) setInternalPage(1); }} />
      <TableActions items={actions ?? DEFAULT_ACTIONS} />
      <TableBody data={pageData} selectedIds={selectedIds} onToggleRow={toggleRow}
        onApprove={onApprove} onRemove={onRemove} />
      <TableFooter page={page} totalPages={totalPages} pageSize={pageSize} onPageChange={handlePage} />
    </TableRoot>
  );
}

// ─────────────────────────────────────────────────────────────
//  useDataTable hook
// ─────────────────────────────────────────────────────────────

export function useDataTable(initialSelected: string[] = [], initialPage = 1) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set(initialSelected));
  const [page,        setPage]        = React.useState(initialPage);
  return {
    selectedIds,
    onSelectionChange : (ids: Set<string>) => setSelectedIds(ids),
    page,
    onPageChange      : (p: number) => setPage(p),
  };
}

// ─────────────────────────────────────────────────────────────
//  EXPORTS
// ─────────────────────────────────────────────────────────────

export {
  DataTable,
  TableRoot, TableToolbar, TableActions, TableBody, TableFooter,
};
export default DataTable;