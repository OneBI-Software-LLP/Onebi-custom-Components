"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CustomDropdown } from "@/components/CustomDropdown";

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-6 border-t border-slate-100 pt-6">
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

function Section({ title, description, code, children }: { title: string; description?: string; code?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          {title}
        </Label>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      <div>{children}</div>
      {code && <CodeBlock code={code} />}
    </div>
  );
}

export default function DropdownPage() {
  const [user, setUser] = useState();
  const [tags, setTags] = useState<string[]>([]);
  const [payment, setPayment] = useState();

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Dropdown Component
            </h2>
            <p className="text-lg text-slate-500">
              Fully configurable dropdown supporting single selection, multi-select tags, searching capabilities, and totally custom render options.
            </p>
          </div>

          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <Section 
              title="Basic Single Select" 
              description="A standard dropdown for picking a single option from a predefined list."
              code={`import { CustomDropdown } from "@/components/CustomDropdown";

export default function Example() {
  const [user, setUser] = useState();

  return (
    <CustomDropdown 
      options={[
        { label: 'Alice', value: '1' },
        { label: 'Bob', value: '2' }
      ]}
      value={user}
      onChange={setUser}
      placeholder="Select a user"
    />
  );
}`}
            >
              <div className="max-w-sm">
                <CustomDropdown 
                  options={[
                    { label: 'Alice', value: '1' },
                    { label: 'Bob', value: '2' }
                  ]}
                  value={user}
                  onChange={setUser}
                  placeholder="Select a user"
                />
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section 
              title="Searchable Multi-Select" 
              description="Filter through options locally, picking multiple choices that render as removable inline tags."
              code={`import { CustomDropdown } from "@/components/CustomDropdown";

export default function Example() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <CustomDropdown 
      multiple
      searchable
      clearable
      options={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' }
      ]}
      value={tags}
      onChange={setTags}
      placeholder="Filter frameworks..."
    />
  );
}`}
            >
              <div className="max-w-sm">
                <CustomDropdown 
                  multiple
                  searchable
                  clearable
                  options={[
                    { label: 'React', value: 'react' },
                    { label: 'Vue', value: 'vue' },
                    { label: 'Angular', value: 'angular' }
                  ]}
                  value={tags}
                  onChange={setTags}
                  placeholder="Filter frameworks..."
                />
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section 
              title="Custom Option Rendering" 
              description="Pass a 'renderOption' method to dynamically construct dropdown elements utilizing icons, descriptions, and disabling logic."
              code={`<CustomDropdown 
  options={[
    { value: 'stripe', label: 'Stripe', description: 'Credit Card processing', icon: '💳' },
    { value: 'bank', label: 'Bank Transfer', disabled: true, description: 'Currently unavailable' }
  ]}
  value={payment}
  onChange={setPayment}
  renderOption={(option, isSelected) => (
    <div className="flex items-center gap-3">
      <div className="text-xl">{option.icon}</div>
      <div>
        <div className={isSelected ? 'font-bold' : ''}>{option.label}</div>
        <div className="text-xs opacity-50">{option.description}</div>
      </div>
    </div>
  )}
/>`}
            >
              <div className="max-w-sm">
                <CustomDropdown 
                  options={[
                    { value: 'stripe', label: 'Stripe', description: 'Credit Card processing', icon: '💳' },
                    { value: 'paypal', label: 'PayPal', description: 'Pay with your balance', icon: '🅿️' },
                    { value: 'bank', label: 'Bank Transfer', disabled: true, description: 'Currently unavailable' }
                  ]}
                  value={payment}
                  onChange={setPayment}
                  renderOption={(option, isSelected) => (
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{option.icon}</div>
                      <div>
                        <div className={isSelected ? 'font-bold' : ''}>{option.label}</div>
                        <div className="text-xs opacity-50">{option.description}</div>
                      </div>
                    </div>
                  )}
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
