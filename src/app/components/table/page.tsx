"use client";

import React from "react";
import {
  DataTable,
  TableRoot,
  TableToolbar,
  TableActions,
  TableBody,
  TableFooter,
  useDataTable,
  ExportIcon,
  UploadIcon,
  PlusIcon,
  OnboardIcon,
  FilterIcon,
} from "@/components/CustomTable";
import type { Employee, ActionItem } from "@/components/CustomTable";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// ── Copy/Code block ────────────────────────────────────────────────────────

const CopyIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const CheckMark = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>;

function SectionCodeBlock({ ts, js }: { ts: string; js: string }) {
  const [lang, setLang] = React.useState<"ts" | "js">("ts");
  const [copied, setCopied] = React.useState(false);
  const code = lang === "ts" ? ts : js;

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 bg-[#0F172A] mt-5">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/70"
        style={{ background: "rgba(255,255,255,0.04)" }}>
        <div style={{ display:"flex", gap:"2px", background:"rgba(255,255,255,0.08)", borderRadius:"8px", padding:"3px" }}>
          {(["ts","js"] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding:"3px 12px", borderRadius:"6px", border:"none", cursor:"pointer",
              fontSize:"12px", fontWeight:600, fontFamily:"monospace",
              transition:"background 140ms, color 140ms",
              background: lang === l ? "rgba(255,255,255,0.18)" : "transparent",
              color: lang === l ? "#f8fafc" : "#94a3b8",
            }}>{l === "ts" ? "Ts" : "Js"}</button>
          ))}
        </div>
        <button onClick={copy} style={{
          display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"12px",
          color: copied ? "#4ade80" : "#94a3b8",
          background:"rgba(255,255,255,0.07)", border:"none",
          padding:"4px 10px", borderRadius:"8px", cursor:"pointer",
          transition:"color 150ms, background 150ms",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          {copied ? <CheckMark /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{
        padding:"1.25rem 1.5rem", overflowX:"auto", fontSize:"13px",
        fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",
        color:"#e2e8f0", lineHeight:"1.7", margin:0,
      }}><code>{code}</code></pre>
    </div>
  );
}

function Section({ label, ts, js, children }: {
  label: string; ts: string; js: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">{label}</Label>
      <div className="flex flex-col gap-4">{children}</div>
      <SectionCodeBlock ts={ts} js={js} />
    </div>
  );
}

// ── Sample data ────────────────────────────────────────────────────────────

const EMPLOYEES: Employee[] = [
  { id:"EMP-ABC/001", name:"Rajesh Kumar S.",   email:"rajesh@techno.in",     dept:"Regularization", grade:"Default", designation:"CEO",                status:"Invited" },
  { id:"EMP-RKJ/002", name:"Hariprasad Sarm.",  email:"hariprasad@techno.in", dept:"Regularization", grade:"Default", designation:"System Architect",   status:"Active"  },
  { id:"EMP-XY/023",  name:"Amit Kumar Satp.",  email:"amit@techno.in",       dept:"Regularization", grade:"Default", designation:"Full Stack Developer",status:"Invited" },
  { id:"EMP-OO/045",  name:"Nisha Yadav",        email:"nisha@techno.in",      dept:"Regularization", grade:"Default", designation:"QA Test",            status:"Active"  },
  { id:"EMP-RKJ/067", name:"Deverakonda Ra.",    email:"devera@techno.in",     dept:"Regularization", grade:"Default", designation:"Frontend Developer",  status:"Active"  },
];
const FEW = EMPLOYEES.slice(0, 3);

// ══════════════════════════════════════════════════════════════
//  SECTION BLOCKS
// ══════════════════════════════════════════════════════════════

/* ── 1. Built-in icons (default) ── */
function BuiltInIconsBlock() {
  const ctrl = useDataTable(["EMP-XY/023", "EMP-OO/045"]);
  return (
    <Section label="Built-in icons (default)"
      ts={`import { DataTable, useDataTable } from "onebi-ui";
// No extra setup — icons are included out of the box.

export default function Demo() {
  const ctrl = useDataTable(["EMP-XY/023"]);

  return (
    <DataTable
      data={employees}
      totalCount={356}
      {...ctrl}
    />
  );
}`}
      js={`import { DataTable, useDataTable } from "onebi-ui";

export default function Demo() {
  const ctrl = useDataTable(["EMP-XY/023"]);
  return <DataTable data={employees} totalCount={356} {...ctrl} />;
}`}
    >
      <DataTable data={EMPLOYEES} totalCount={356} {...ctrl} totalPages={15} />
    </Section>
  );
}

/* ── 2. Custom icons via actions prop ── */
function CustomIconsBlock() {
  const ctrl = useDataTable();

  // ── Lucide-style custom icons (swap for any icon library) ──
  const RefreshIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  );
  const DownloadIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
  const UserPlusIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="8.5" cy="7" r="4"/>
      <line x1="20" y1="8" x2="20" y2="14"/>
      <line x1="23" y1="11" x2="17" y2="11"/>
    </svg>
  );
  const SendIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );

  const customActions: ActionItem[] = [
    { label: "Refresh",    icon: <RefreshIcon />,  onClick: () => console.log("refresh")  },
    { label: "Download",   icon: <DownloadIcon />, onClick: () => console.log("download") },
    { label: "Add Member", icon: <UserPlusIcon />, onClick: () => console.log("add")      },
    { label: "Send",       icon: <SendIcon />,     onClick: () => console.log("send"), variant: "primary" },
  ];

  return (
    <Section label="Custom icons via actions prop"
      ts={`import { DataTable, useDataTable } from "onebi-ui";
import type { ActionItem } from "onebi-ui";
// Use any icon library — lucide-react, heroicons, react-icons, etc.
import { RefreshCw, Download, UserPlus, Send } from "lucide-react";

export default function CustomIconsDemo() {
  const ctrl = useDataTable();

  const actions: ActionItem[] = [
    { label: "Refresh",    icon: <RefreshCw size={13} />, onClick: handleRefresh  },
    { label: "Download",   icon: <Download  size={13} />, onClick: handleDownload },
    { label: "Add Member", icon: <UserPlus  size={13} />, onClick: handleAdd      },
    { label: "Send",       icon: <Send      size={13} />, onClick: handleSend, variant: "primary" },
  ];

  return <DataTable data={employees} actions={actions} {...ctrl} />;
}`}
      js={`import { DataTable, useDataTable } from "onebi-ui";
import { RefreshCw, Download, UserPlus, Send } from "lucide-react";

export default function CustomIconsDemo() {
  const ctrl = useDataTable();

  const actions = [
    { label: "Refresh",    icon: <RefreshCw size={13} />, onClick: handleRefresh  },
    { label: "Download",   icon: <Download  size={13} />, onClick: handleDownload },
    { label: "Add Member", icon: <UserPlus  size={13} />, onClick: handleAdd      },
    { label: "Send",       icon: <Send      size={13} />, onClick: handleSend, variant: "primary" },
  ];

  return <DataTable data={employees} actions={actions} {...ctrl} />;
}`}
    >
      <DataTable data={FEW} totalCount={FEW.length} actions={customActions} {...ctrl} totalPages={1} />
    </Section>
  );
}

/* ── 3. Text-only buttons (no icons) ── */
function TextOnlyBlock() {
  const ctrl = useDataTable();
  const textActions: ActionItem[] = [
    { label: "Export",   onClick: () => console.log("export")  },
    { label: "Upload",   onClick: () => console.log("upload")  },
    { label: "Add",      onClick: () => console.log("add")     },
    { label: "Onboard",  onClick: () => console.log("onboard"), variant: "primary" },
  ];
  return (
    <Section label="Text-only buttons (no icons)"
      ts={`import { DataTable, useDataTable } from "onebi-ui";
import type { ActionItem } from "onebi-ui";

export default function TextOnlyDemo() {
  const ctrl = useDataTable();

  // Just omit the icon field entirely
  const actions: ActionItem[] = [
    { label: "Export"  },
    { label: "Upload"  },
    { label: "Add"     },
    { label: "Onboard", variant: "primary" },
  ];

  return <DataTable data={employees} actions={actions} {...ctrl} />;
}`}
      js={`import { DataTable, useDataTable } from "onebi-ui";

export default function TextOnlyDemo() {
  const ctrl = useDataTable();

  const actions = [
    { label: "Export"  },
    { label: "Upload"  },
    { label: "Add"     },
    { label: "Onboard", variant: "primary" },
  ];

  return <DataTable data={employees} actions={actions} {...ctrl} />;
}`}
    >
      <DataTable data={FEW} totalCount={FEW.length} actions={textActions} {...ctrl} totalPages={1} />
    </Section>
  );
}

/* ── 4. Re-use built-in exported icons ── */
function ReUseBuiltInBlock() {
  const ctrl = useDataTable();
  const actions: ActionItem[] = [
    { label: "Export",        icon: <ExportIcon />,  onClick: () => {} },
    { label: "Upload",        icon: <UploadIcon />,  onClick: () => {} },
    { label: "Add Employees", icon: <PlusIcon />,    onClick: () => {} },
    { label: "Onboard",       icon: <OnboardIcon />, onClick: () => {}, variant: "primary" },
  ];
  return (
    <Section label="Re-use built-in exported icons"
      ts={`// All built-in icons are exported — import and re-use or mix with your own.
import {
  DataTable,
  useDataTable,
  ExportIcon,
  UploadIcon,
  PlusIcon,
  OnboardIcon,
} from "onebi-ui";
import type { ActionItem } from "onebi-ui";

export default function ReuseIconsDemo() {
  const ctrl = useDataTable();

  const actions: ActionItem[] = [
    { label: "Export",        icon: <ExportIcon />,  onClick: handleExport  },
    { label: "Upload",        icon: <UploadIcon />,  onClick: handleUpload  },
    { label: "Add Employees", icon: <PlusIcon />,    onClick: handleAdd     },
    { label: "Onboard",       icon: <OnboardIcon />, onClick: handleOnboard, variant: "primary" },
  ];

  return <DataTable data={employees} actions={actions} {...ctrl} />;
}`}
      js={`import { DataTable, useDataTable, ExportIcon, UploadIcon, PlusIcon, OnboardIcon } from "onebi-ui";

export default function ReuseIconsDemo() {
  const ctrl = useDataTable();

  const actions = [
    { label: "Export",        icon: <ExportIcon />,  onClick: handleExport  },
    { label: "Upload",        icon: <UploadIcon />,  onClick: handleUpload  },
    { label: "Add Employees", icon: <PlusIcon />,    onClick: handleAdd     },
    { label: "Onboard",       icon: <OnboardIcon />, onClick: handleOnboard, variant: "primary" },
  ];

  return <DataTable data={employees} actions={actions} {...ctrl} />;
}`}
    >
      <DataTable data={FEW} totalCount={FEW.length} actions={actions} {...ctrl} totalPages={1} />
    </Section>
  );
}

/* ── 5. Disabled actions ── */
function DisabledActionsBlock() {
  const ctrl = useDataTable();
  const actions: ActionItem[] = [
    { label: "Export",   icon: <ExportIcon />,  onClick: () => {} },
    { label: "Upload",   icon: <UploadIcon />,  onClick: () => {}, disabled: true },
    { label: "Add",      icon: <PlusIcon />,    onClick: () => {}, disabled: true },
    { label: "Onboard",  icon: <OnboardIcon />, onClick: () => {}, variant: "primary" },
  ];
  return (
    <Section label="Disabled action buttons"
      ts={`const actions: ActionItem[] = [
  { label: "Export",  icon: <ExportIcon /> },
  { label: "Upload",  icon: <UploadIcon />,  disabled: true },  // greyed out
  { label: "Add",     icon: <PlusIcon />,    disabled: true },
  { label: "Onboard", icon: <OnboardIcon />, variant: "primary" },
];

<DataTable actions={actions} data={employees} {...ctrl} />`}
      js={`const actions = [
  { label: "Export",  icon: <ExportIcon /> },
  { label: "Upload",  icon: <UploadIcon />,  disabled: true },
  { label: "Add",     icon: <PlusIcon />,    disabled: true },
  { label: "Onboard", icon: <OnboardIcon />, variant: "primary" },
];

<DataTable actions={actions} data={employees} {...ctrl} />`}
    >
      <DataTable data={FEW} totalCount={FEW.length} actions={actions} {...ctrl} totalPages={1} />
    </Section>
  );
}

/* ── 6. Composable API with manual icons ── */
function ComposableIconsBlock() {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);

  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  }

  // Custom row-level approve / remove icons
  const ThumbUpIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
  );
  const TrashIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6m4-6v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );

  return (
    <Section label="Composable API — manual icon control + custom row icons"
      ts={`import React from "react";
import {
  TableRoot, TableToolbar, TableActions,
  TableBody, TableFooter,
  ExportIcon, UploadIcon, OnboardIcon,
} from "onebi-ui";
import { ThumbsUp, Trash2 } from "lucide-react"; // custom row icons

export default function ComposableIconsDemo() {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);

  function toggleRow(id: string) {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  }

  return (
    <TableRoot>
      <TableToolbar title="All Employees" totalCount={356} onSearch={console.log} />

      {/* Manual children: full icon control */}
      <TableActions>
        <button className="tb-btn"><ExportIcon />  Export</button>
        <button className="tb-btn"><UploadIcon />  Upload</button>
        <button className="tb-btn tb-btn-primary"><OnboardIcon /> Onboard</button>
      </TableActions>

      {/* approveIcon / removeIcon swap the per-row action icons */}
      <TableBody
        data={employees}
        selectedIds={selectedIds}
        onToggleRow={toggleRow}
        approveIcon={<ThumbsUp size={13} />}
        removeIcon={<Trash2   size={13} />}
      />

      <TableFooter page={page} totalPages={8} onPageChange={setPage} />
    </TableRoot>
  );
}`}
      js={`import React from "react";
import { TableRoot, TableToolbar, TableActions, TableBody, TableFooter,
         ExportIcon, UploadIcon, OnboardIcon } from "onebi-ui";
import { ThumbsUp, Trash2 } from "lucide-react";

export default function ComposableIconsDemo() {
  const [selectedIds, setSelectedIds] = React.useState(new Set());
  const [page, setPage] = React.useState(1);

  function toggleRow(id) {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
  }

  return (
    <TableRoot>
      <TableToolbar title="All Employees" totalCount={356} onSearch={console.log} />
      <TableActions>
        <button className="tb-btn"><ExportIcon />  Export</button>
        <button className="tb-btn"><UploadIcon />  Upload</button>
        <button className="tb-btn tb-btn-primary"><OnboardIcon /> Onboard</button>
      </TableActions>
      <TableBody
        data={employees}
        selectedIds={selectedIds}
        onToggleRow={toggleRow}
        approveIcon={<ThumbsUp size={13} />}
        removeIcon={<Trash2   size={13} />}
      />
      <TableFooter page={page} totalPages={8} onPageChange={setPage} />
    </TableRoot>
  );
}`}
    >
      <TableRoot>
        <TableToolbar title="All Employees" totalCount={356} onSearch={() => {}} />
        <TableActions>
          <button className="tb-btn" type="button"><ExportIcon />  Export</button>
          <button className="tb-btn" type="button"><UploadIcon />  Upload</button>
          <button className="tb-btn" type="button"><PlusIcon />    Add Employees</button>
          <button className="tb-btn tb-btn-primary" type="button"><OnboardIcon /> Onboard</button>
        </TableActions>
        <TableBody
          data={FEW}
          selectedIds={selectedIds}
          onToggleRow={toggleRow}
          approveIcon={<ThumbUpIcon />}
          removeIcon={<TrashIcon />}
        />
        <TableFooter page={page} totalPages={8} onPageChange={setPage} />
      </TableRoot>
    </Section>
  );
}

/* ── 7. Default (no changes) ── */
function DefaultBlock() {
  const ctrl = useDataTable(["EMP-XY/023", "EMP-OO/045"]);
  return (
    <Section label="Pre-selected rows"
      ts={`const ctrl = useDataTable(["EMP-XY/023", "EMP-OO/045"]);
<DataTable data={employees} totalCount={356} {...ctrl} totalPages={15} />`}
      js={`const ctrl = useDataTable(["EMP-XY/023", "EMP-OO/045"]);
<DataTable data={employees} totalCount={356} {...ctrl} totalPages={15} />`}
    >
      <DataTable data={EMPLOYEES} totalCount={356} {...ctrl} totalPages={15} />
    </Section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function DataTablePage() {
  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Data Table suite
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive guide to icons, action buttons, and every composable piece available.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            <BuiltInIconsBlock />
            <Separator className="bg-slate-100" />

            <CustomIconsBlock />
            <Separator className="bg-slate-100" />

            <TextOnlyBlock />
            <Separator className="bg-slate-100" />

            <ReUseBuiltInBlock />
            <Separator className="bg-slate-100" />

            <DisabledActionsBlock />
            <Separator className="bg-slate-100" />

            <ComposableIconsBlock />
            <Separator className="bg-slate-100" />

            <DefaultBlock />
          </div>

        </div>
      </div>
    </div>
  );
}