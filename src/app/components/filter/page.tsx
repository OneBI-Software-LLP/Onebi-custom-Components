"use client";

import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FilterPanel, FilterDefinition, FilterState } from '@/components/FilterPanel';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-10 border-t border-slate-100 pt-8">
    <div className="flex items-center justify-between mb-4">
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
    <pre className="p-5 rounded-2xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[13px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

// Define schema as provided
const userFilters: FilterDefinition[] = [
  { id: 'search', label: 'Search Users', type: 'text', placeholder: 'Name or email...' },
  { 
    id: 'role', 
    label: 'User Role', 
    type: 'select', 
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
      { label: 'Viewer', value: 'viewer' }
    ]
  },
  { id: 'isActive', label: 'Show Active Only', type: 'boolean' },
  { id: 'loginCount', label: 'Login Count Range', type: 'range' },
];

export default function FilterPage() {
  const [currentFilters, setCurrentFilters] = useState<FilterState>({});

  // When filters change, you would typically fetch new data
  const handleFiltersChanged = (filters: FilterState) => {
    setCurrentFilters(filters);
  };

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Filter Panel
            </h2>
            <p className="text-lg text-slate-500">
              A dynamic, schema-driven filter panel supporting text, select, boolean toggles, and range inputs. Generates actionable output data instantly.
            </p>
          </div>

          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <div className="space-y-4">
              <div>
                <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  User Management Example
                </Label>
                <p className="text-sm text-slate-500 mt-1">Play around with the generated inputs below and watch the JSON state update instantly in the table log.</p>
              </div>
              
              <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                 <FilterPanel 
                   filters={userFilters} 
                   onChange={handleFiltersChanged} 
                 />
              </div>

              <div className="mt-8 p-6 bg-gray-100 rounded-xl text-sm text-gray-500 border border-dashed border-gray-300">
                <p className="mb-3 font-semibold text-gray-700">Data API Payload Request:</p>
                <pre className="text-left bg-[#0F172A] text-emerald-400 p-5 rounded-lg overflow-auto font-mono text-xs shadow-inner">
                  {JSON.stringify(currentFilters, null, 2) === "{}" ? "// No filters currently applied" : JSON.stringify(currentFilters, null, 2)}
                </pre>
              </div>

            </div>

            <CodeBlock
              code={`import { useState } from 'react';
import { FilterPanel, FilterDefinition } from '@/components/FilterPanel';

const userFilters: FilterDefinition[] = [
  { id: 'search', label: 'Search Users', type: 'text', placeholder: 'Name or email...' },
  { id: 'isActive', label: 'Show Active Only', type: 'boolean' },
];

export default function UserManagementPage() {
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <FilterPanel 
      filters={userFilters} 
      onChange={setCurrentFilters} 
    />
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
