"use client";

import React, { useState } from "react";
import { 
  Popover, 
  PopoverMenu, 
  PopoverProfile, 
  PopoverNotifications, 
  PopoverConfirm, 
  PopoverRich, 
  PopoverHeader, 
  PopoverBody, 
  PopoverFooter, 
  type MenuItem, 
  type NotificationItem 
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// ── Icons ─────────────────────────────────────────────────
const EditIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const TrashIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>;
const CopyIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const SettingsIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const ProfileIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LogoutIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const DownloadIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const BellIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const FileIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const CheckIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>;
const WarnIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>;
const AlertIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

// ── Shared trigger component for demo consistency ──
const Trigger = React.forwardRef<HTMLButtonElement, any>(({ children, variant = "outline", className = "", ...props }, ref) => (
  <Button ref={ref} variant={variant} className={`h-11 rounded-xl px-5 font-medium text-black ${className}`} {...props}>
    {children}
  </Button>
));

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-16 border-t border-slate-100 pt-12">
    <div className="flex items-center justify-between mb-6">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        Installation & Usage
      </Label>
      <Badge
        variant="outline"
        className="text-[10px] bg-slate-50 text-slate-500 font-mono tracking-widest border-slate-200"
      >
        npm i onebi-ui
      </Badge>
    </div>
    <pre className="p-6 rounded-2xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[13px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {label}
      </Label>
      <div className="flex flex-wrap gap-6 items-start">
        {children}
      </div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────
const MENU_ITEMS: MenuItem[] = [
  { id: 'edit',  label: 'Edit',      icon: <EditIcon />,     shortcut: '⌘E' },
  { id: 'copy',  label: 'Duplicate', icon: <CopyIcon /> },
  { id: 'dl',    label: 'Export',    icon: <DownloadIcon /> },
  { id: 'sep',   label: 'Delete',    icon: <TrashIcon />,    danger: true, separator: true },
];

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1', read: false,
    text: <><strong>Ankit Joshi</strong> commented on <strong>Q4 Report</strong></>,
    time: '2 min ago',
    icon: <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">AJ</div>,
  },
  {
    id: 'n2', read: false,
    text: <>Your export <strong>users_june.csv</strong> is ready</>,
    time: '14 min ago',
    icon: <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center"><CheckIcon /></div>,
  },
  {
    id: 'n3', read: true,
    text: <>API rate limit at <strong>85%</strong> daily quota</>,
    time: '1 hr ago',
    icon: <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center"><WarnIcon /></div>,
  },
];

export default function PopoverPage() {
  const [deleted, setDeleted] = useState(false);
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Popover
            </h2>
            <p className="text-lg text-slate-500">
              Advanced floating panels with intelligent positioning, triggers, and rich templates.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            {/* ── PLACEMENTS ── */}
            <Section label="Foundations: Placements">
              <Popover placement="bottom-start" content={<PopoverBody>Bottom-start placement (default)</PopoverBody>}>
                <Trigger>Bottom Start</Trigger>
              </Popover>
              <Popover placement="top-center" content={<PopoverBody>Top-center placement</PopoverBody>}>
                <Trigger>Top Center</Trigger>
              </Popover>
              <Popover placement="right-start" content={<PopoverBody>Right-start placement</PopoverBody>}>
                <Trigger>Right Side</Trigger>
              </Popover>
              <Popover placement="left-end" content={<PopoverBody>Left-end placement</PopoverBody>}>
                <Trigger>Left Side</Trigger>
              </Popover>
            </Section>

            <CodeBlock
              code={`import { Popover, PopoverBody } from "@/components/ui/popover";

export default function Demo() {
  return (
    <>
      <Popover placement="bottom-start" content={<PopoverBody>Bottom-start placement (default)</PopoverBody>}>
        <button className="text-black px-4 py-2 border rounded">Bottom Start</button>
      </Popover>
      <Popover placement="top-center" content={<PopoverBody>Top-center placement</PopoverBody>}>
        <button className="text-black px-4 py-2 border rounded">Top Center</button>
      </Popover>
      <Popover placement="right-start" content={<PopoverBody>Right-start placement</PopoverBody>}>
        <button className="text-black px-4 py-2 border rounded">Right Side</button>
      </Popover>
      <Popover placement="left-end" content={<PopoverBody>Left-end placement</PopoverBody>}>
        <button className="text-black px-4 py-2 border rounded">Left Side</button>
      </Popover>
    </>
  );
}`}
            />

            <Separator className="bg-slate-100" />

            {/* ── TRIGGERS ── */}
            <Section label="Interaction Patterns">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="space-y-3">
                  <Label className="text-[10px] text-slate-400">CLICK (DEFAULT)</Label>
                  <Popover content={<PopoverBody>Opened on tap/click.</PopoverBody>}>
                    <Trigger className="w-full">Default Click</Trigger>
                  </Popover>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] text-slate-400">HOVER / TOOLTIP</Label>
                  <Popover trigger="hover" placement="top-center" content={<div className="p-2 text-xs font-medium">Quick tooltip on hover</div>}>
                    <Trigger className="w-full">Hover Trigger</Trigger>
                  </Popover>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] text-slate-400">CONTEXT MENU</Label>
                  <Popover trigger="context-menu" content={<PopoverMenu items={MENU_ITEMS} />}>
                    <div className="h-11 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-500 cursor-context-menu px-4">
                      Right-click this area
                    </div>
                  </Popover>
                </div>
              </div>
            </Section>

            <CodeBlock
              code={`import { Popover, PopoverBody, PopoverMenu, type MenuItem } from "@/components/ui/popover";

const MENU_ITEMS: MenuItem[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'dl', label: 'Export' },
];

export default function Demo() {
  return (
    <>
      <Popover content={<PopoverBody>Opened on tap/click.</PopoverBody>}>
        <button className="text-black">Default Click</button>
      </Popover>

      <Popover trigger="hover" placement="top-center" content={<div className="p-2 text-xs font-medium">Quick tooltip on hover</div>}>
        <button className="text-black">Hover Trigger</button>
      </Popover>

      <Popover trigger="context-menu" content={<PopoverMenu items={MENU_ITEMS} />}>
        <div className="p-4 border border-dashed">Right-click this area</div>
      </Popover>
    </>
  );
}`}
            />

            <Separator className="bg-slate-100" />

            {/* ── PRESETS ── */}
            <Section label="Specialized Presets">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {/* MENU */}
                <div className="space-y-4">
                  <Label className="text-[10px] text-slate-400">MENU DROPDOWN</Label>
                  <Popover placement="bottom-start" content={<PopoverMenu items={MENU_ITEMS} />}>
                    <Trigger className="w-full justify-between">
                      Options <SettingsIcon />
                    </Trigger>
                  </Popover>
                </div>

                {/* NOTIFICATIONS */}
                <div className="space-y-4">
                  <Label className="text-[10px] text-slate-400">NOTIFICATIONS</Label>
                  <Popover placement="bottom-end" closeOnSelect={false} content={<PopoverNotifications items={NOTIFICATIONS} />}>
                    <div className="relative">
                      <Trigger className="w-full"><BellIcon /> Inbox</Trigger>
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </div>
                  </Popover>
                </div>

                {/* PROFILE */}
                <div className="space-y-4">
                  <Label className="text-[10px] text-slate-400">USER PROFILE</Label>
                  <Popover placement="bottom-end" content={
                    <PopoverProfile 
                      name="Rahul Kumar" 
                      email="rahul@onebi.io" 
                      initials="RK" 
                      planLabel="Enterprise Plan"
                      menuItems={[{ id: 'p1', label: 'Billing Settings', icon: <SettingsIcon /> }, { id: 'p2', label: 'Sign out', icon: <LogoutIcon />, danger: true, separator: true }]}
                    />
                  }>
                    <div className="h-11 w-11 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer border border-slate-200">
                      <ProfileIcon />
                    </div>
                  </Popover>
                </div>
              </div>
            </Section>

            <CodeBlock
              code={`import { Popover, PopoverMenu, PopoverNotifications, PopoverProfile } from "@/components/ui/popover";

export default function Demo() {
  return (
    <>
      <Popover placement="bottom-start" content={<PopoverMenu items={MENU_ITEMS} />}>
        <button className="text-black">Options</button>
      </Popover>

      <Popover placement="bottom-end" closeOnSelect={false} content={<PopoverNotifications items={NOTIFICATIONS} />}>
        <button className="text-black">Inbox</button>
      </Popover>

      <Popover placement="bottom-end" content={
        <PopoverProfile 
          name="Rahul Kumar" 
          email="rahul@onebi.io" 
          initials="RK" 
          planLabel="Enterprise Plan"
          menuItems={[
            { id: 'p1', label: 'Billing Settings' }, 
            { id: 'p2', label: 'Sign out', danger: true, separator: true }
          ]}
        />
      }>
        <div className="cursor-pointer">Profile Icon</div>
      </Popover>
    </>
  );
}`}
            />

            <Separator className="bg-slate-100" />

            {/* ── CONFIRM & RICH ── */}
            <Section label="Dialogs & Cards">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="space-y-4">
                  <Label className="text-[10px] text-slate-400">CONFIRMATION</Label>
                  <Popover content={
                    <PopoverConfirm 
                      title="Destructive Action" 
                      description="Are you sure? This will permanently delete the shared workspace. This cannot be undone."
                      confirmLabel="Yes, Delete"
                      onConfirm={() => setDeleted(true)}
                    />
                  }>
                    <Trigger variant="ghost" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100">
                      Delete Workspace {deleted && "✓"}
                    </Trigger>
                  </Popover>
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] text-slate-400">RICH CONTENT CARD</Label>
                  <Popover content={
                    <PopoverRich 
                      title="Productivity.pdf" 
                      description="Modified 2 hours ago by Sarah. Size: 2.4 MB"
                      image={<FileIcon />}
                      stats={[{ label: 'Users', value: '12' }, { label: 'Status', value: <span className="text-green-600">Syncing</span> }]}
                      primaryAction={{ label: 'Open File', onClick: () => {} }}
                    />
                  }>
                    <Trigger className="w-full gap-2"><FileIcon /> productivity.pdf</Trigger>
                  </Popover>
                </div>
              </div>
            </Section>

            <CodeBlock
              code={`import { Popover, PopoverConfirm, PopoverRich } from "@/components/ui/popover";

export default function Demo() {
  return (
    <>
      {/* Confirmation Dialog */}
      <Popover content={
        <PopoverConfirm 
          title="Destructive Action" 
          description="Are you sure? This action cannot be undone."
          confirmLabel="Yes, Delete"
          onConfirm={() => console.log('Deleted!')}
        />
      }>
        <button className="text-red-600">Delete Workspace</button>
      </Popover>

      {/* Rich Content Card */}
      <Popover content={
        <PopoverRich 
          title="Productivity.pdf" 
          description="Modified 2 hours ago by Sarah."
          stats={[{ label: 'Users', value: '12' }]}
          primaryAction={{ label: 'Open File', onClick: () => {} }}
        />
      }>
        <button className="text-black">productivity.pdf</button>
      </Popover>
    </>
  );
}`}
            />

            <Separator className="bg-slate-100" />

            {/* ── CONTROLLED ── */}
            <Section label="Programmatic Control">
              <div className="flex gap-4 items-center">
                <Popover 
                  open={controlledOpen} 
                  onOpenChange={setControlledOpen} 
                  trigger="manual"
                  content={<PopoverBody>Managed via external state.</PopoverBody>}
                >
                  <Trigger variant="ghost" className="border-indigo-100 text-indigo-600">Manual Toggle</Trigger>
                </Popover>
                <Button onClick={() => setControlledOpen(!controlledOpen)} className="h-11 rounded-xl text-black">
                  {controlledOpen ? "Close" : "Open"} Outside
                </Button>
              </div>
            </Section>

            <CodeBlock
              code={`import { Popover, PopoverBody } from "@/components/ui/popover";
import { useState } from "react";

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      <Popover 
        open={open} 
        onOpenChange={setOpen} 
        trigger="manual"
        content={<PopoverBody>Managed via external state.</PopoverBody>}
      >
        <button className="text-black">Manual Toggle</button>
      </Popover>
      <button onClick={() => setOpen(!open)} className="text-black">
        {open ? "Close" : "Open"} Outside
      </button>
    </div>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
