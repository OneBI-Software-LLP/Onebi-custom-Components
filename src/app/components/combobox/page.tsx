"use client";

import React, { useState } from "react";
import { CustomComboBox, ComboBoxOption } from "@/components/CustomComboBox";
import { CustomAvatar } from "@/components/CustomAvatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CodeBlock = ({ code, title = "Installation & Usage" }: { code: string, title?: string }) => (
  <div className="mt-10 border-t border-slate-100 pt-8">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {title}
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

const frameworkOptions: ComboBoxOption[] = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building user interfaces' },
  { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
  { value: 'angular', label: 'Angular', description: "The modern web developer's platform" },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
];

const userOptions: ComboBoxOption[] = [
  { 
    value: '1', 
    label: 'John Doe', 
    icon: <CustomAvatar size="sm" initials="JD" />,
    description: 'Senior Developer'
  },
  { 
    value: '2', 
    label: 'Sarah Smith', 
    icon: <CustomAvatar size="sm" initials="SS" />,
    description: 'Product Manager'
  },
];

export default function ComboboxPage() {
  const [singleValue, setSingleValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Custom Combobox
            </h2>
            <p className="text-lg text-slate-500">
              A highly configurable searchable dropdown with support for single select, multi-select, and custom rendering.
            </p>
          </div>
          
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 max-w-xl">
            
            {/* Searchable Single Select */}
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Searchable Single Select
              </Label>
              <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                <CustomComboBox 
                  label="Frontend Framework"
                  options={frameworkOptions} 
                  value={singleValue} 
                  onChange={setSingleValue} 
                  placeholder="Search frameworks..."
                />
                <p className="mt-4 text-sm font-semibold text-slate-600">
                  Selected Value: <span className="text-indigo-600 font-normal">{singleValue || 'None'}</span>
                </p>
              </div>
              <CodeBlock 
                title="Single Select Usage"
                code={`import { useState } from "react";
import { CustomComboBox, ComboBoxOption } from "@/components/CustomComboBox";

const frameworkOptions: ComboBoxOption[] = [
  { value: 'react', label: 'React', description: 'A JavaScript library' },
  { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
  { value: 'angular', label: 'Angular', description: 'The modern web developer\\'s platform' }
];

export default function SingleSelectDemo() {
  const [value, setValue] = useState("");

  return (
    <CustomComboBox 
      label="Frontend Framework"
      options={frameworkOptions} 
      value={value} 
      onChange={setValue} 
      placeholder="Search frameworks..."
    />
  );
}`}
              />
            </div>

            <Separator className="bg-slate-100" />

            {/* Multi-Select with Custom Rendering */}
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Multi-Select with Custom Rendering
              </Label>
              <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                <CustomComboBox 
                  label="Assign Team Members"
                  multiple
                  options={userOptions} 
                  value={multiValue} 
                  onChange={setMultiValue} 
                  placeholder="Find users..."
                />
                <div className="mt-4 flex flex-wrap gap-2 min-h-[28px]">
                  {multiValue.length === 0 && <span className="text-sm text-slate-400">No users selected</span>}
                  {multiValue.map(id => (
                    <Badge key={id} variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                      ID: {id}
                    </Badge>
                  ))}
                </div>
              </div>
              <CodeBlock 
                title="Multi-Select Usage"
                code={`import { useState } from "react";
import { CustomComboBox, ComboBoxOption } from "@/components/CustomComboBox";
import { CustomAvatar } from "@/components/CustomAvatar";

const userOptions: ComboBoxOption[] = [
  { 
    value: '1', 
    label: 'John Doe', 
    icon: <CustomAvatar size="sm" initials="JD" />,
    description: 'Senior Developer'
  },
  { 
    value: '2', 
    label: 'Sarah Smith', 
    icon: <CustomAvatar size="sm" initials="SS" />,
    description: 'Product Manager'
  }
];

export default function MultiSelectDemo() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <CustomComboBox 
      label="Assign Team Members"
      multiple
      options={userOptions} 
      value={values} 
      onChange={setValues} 
      placeholder="Find users..."
    />
  );
}`}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
