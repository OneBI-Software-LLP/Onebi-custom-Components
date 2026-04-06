"use client";

import React, { useState, useEffect } from "react";
import { 
  SearchInput, 
  CommandPalette, 
  useCommandPalette, 
  type CommandGroup 
} from "@/components/ui/search-input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ── Icons for Command Palette ──
const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const COMMANDS: CommandGroup[] = [
  {
    label: 'Pages',
    items: [
      { id: 'dashboard', name: 'Dashboard',    subtitle: 'Overview & analytics',    icon: <GridIcon />,     shortcut: 'G D', onSelect: () => console.log('→ dashboard')    },
      { id: 'reports',   name: 'Reports',      subtitle: 'View all reports',         icon: <FileIcon />,     shortcut: 'G R', onSelect: () => console.log('→ reports')      },
      { id: 'team',      name: 'Team members', subtitle: 'Manage your team',         icon: <UsersIcon />,                     onSelect: () => console.log('→ team')         },
      { id: 'settings',  name: 'Settings',     subtitle: 'Account & preferences',    icon: <SettingsIcon />, shortcut: 'G S', onSelect: () => console.log('→ settings')     },
    ],
  },
  {
    label: 'Actions',
    items: [
      { id: 'new-proj',  name: 'New project',  subtitle: 'Create a new project',     icon: <PlusIcon />,    shortcut: 'C P', onSelect: () => console.log('new project')     },
    ],
  },
];

const SUGGESTIONS = [
  'dashboard', 'dashboard analytics', 'dashboard settings',
  'data export', 'deployments', 'developer tools', 'documents',
];

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
    <div className="space-y-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {label}
      </Label>
      <div className="grid gap-6">
        {children}
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const { open, setOpen } = useCommandPalette();

  useEffect(() => {
    if (query) {
      const match = SUGGESTIONS.find(s => s.startsWith(query.toLowerCase()));
      setSuggestion(match && match !== query.toLowerCase() ? match : '');
    } else {
      setSuggestion("");
    }
  }, [query]);

  function simulateSearch(value: string) {
    setQuery(value);
    if (value) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    }
  }

  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Search Component
            </h2>
            <p className="text-lg text-slate-500">
              Highly configurable search inputs with command palette, autocomplete, and more.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            {/* ── BASIC ── */}
            <Section label="Foundations">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-[11px] text-slate-400">Default Outlined</Label>
                  <SearchInput placeholder="Search anything..." clearable />
                </div>
                <div className="space-y-4">
                  <Label className="text-[11px] text-slate-400">Shortcut Hint</Label>
                  <SearchInput placeholder="Press ⌘K to search..." shortcutHint="⌘K" onClick={() => setOpen(true)} />
                </div>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── VARIANTS ── */}
            <Section label="Visual Variants">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-400">FILLED</Label>
                  <SearchInput variant="filled" placeholder="Filled search..." />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-400">UNDERLINE</Label>
                  <SearchInput variant="underline" placeholder="Underline style..." />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-400">GHOST</Label>
                  <SearchInput variant="ghost" placeholder="Ghost input..." />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-400">PILL</Label>
                  <SearchInput shape="pill" placeholder="Pill shape..." />
                </div>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── SIZES ── */}
            <Section label="Size Scale">
              <div className="space-y-6 max-w-xl">
                <SearchInput size="xs" placeholder="XSmall (26px)..." />
                <SearchInput size="sm" placeholder="Small (32px)..." />
                <SearchInput size="md" placeholder="Medium (38px)..." />
                <SearchInput size="lg" placeholder="Large (44px)..." />
                <SearchInput size="xl" placeholder="XLarge (52px)..." />
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── INTELLIGENCE ── */}
            <Section label="Intelligence & States">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Label className="text-[11px] text-slate-400 font-bold uppercase">Autocomplete Suggestion</Label>
                  <p className="text-xs text-slate-500 mb-2">Type "dash" and press Tab to accept.</p>
                  <SearchInput 
                    value={query} 
                    onChange={setQuery} 
                    suggestion={suggestion} 
                    placeholder="Search dashboard..." 
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-[11px] text-slate-400 font-bold uppercase">Loading State</Label>
                  <p className="text-xs text-slate-500 mb-2">Type to trigger animated loading bar.</p>
                  <SearchInput 
                    loading={loading} 
                    onChange={simulateSearch} 
                    placeholder="Search results..." 
                    clearable
                  />
                </div>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── STATUS ── */}
            <Section label="Validation Status">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <SearchInput status="error" placeholder="Error state..." defaultValue="invalid query" />
                <SearchInput status="success" placeholder="Success state..." defaultValue="results found" />
                <SearchInput status="warning" placeholder="Warning state..." defaultValue="limited access" />
              </div>
            </Section>

            <CodeBlock
              code={`import { SearchInput, CommandPalette, useCommandPalette } from "onebi-ui";

export default function App() {
  const { open, setOpen } = useCommandPalette(); // Handles ⌘K / Ctrl+K

  return (
    <>
      <SearchInput 
        placeholder="Search commands..." 
        shortcutHint="⌘K" 
        onClick={() => setOpen(true)} 
        clearable
      />

      <CommandPalette 
        open={open}
        onClose={() => setOpen(false)}
        groups={[
          {
            label: "Actions",
            items: [{ id: "1", name: "Create New User", icon: <UserIcon /> }]
          }
        ]}
      />
    </>
  );
}`}
            />
          </div>
        </div>
      </div>

      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        groups={COMMANDS}
        onSelect={(item) => alert(`Selected: ${item.name}`)}
      />
    </div>
  );
}
