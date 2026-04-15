"use client";

import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CustomTimeRangePicker, TimeRange, TimePreset } from '@/components/CustomTimeRangePicker';
import { Separator } from '@/components/ui/separator';

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

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          {title}
        </Label>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

const PRESETS: TimePreset[] = [
  { label: "Morning Shift", range: { start: "08:00", end: "16:00" } },
  { label: "Night Shift", range: { start: "22:00", end: "06:00" } },
  { label: "Standard 9-5", range: { start: "09:00", end: "17:00" } },
];

export default function TimePickerPage() {
  const [basicRange, setBasicRange] = useState<TimeRange>();
  const [presetRange, setPresetRange] = useState<TimeRange>({ start: '09:00', end: '17:00' });

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Time Range Picker
            </h2>
            <p className="text-lg text-slate-500">
              A configurable picker for selecting time intervals natively utilizing an intuitive 12-hour AM/PM structure. Features preset memory and 24-hour underlying parsing.
            </p>
          </div>

          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <Section 
              title="Basic Selection" 
              description="A standard time range picker component initialized without any constraints."
            >
              <div className="max-w-sm">
                 <CustomTimeRangePicker 
                   value={basicRange} 
                   onChange={setBasicRange} 
                   placeholder="Select Shift Hours..." 
                 />
              </div>
              <p className="text-xs text-gray-500 mt-3 font-mono">
                Current stored value (24h): {JSON.stringify(basicRange || {})}
              </p>
              <CodeBlock
                code={`import { useState } from 'react';
import { CustomTimeRangePicker, TimeRange } from '@/components/CustomTimeRangePicker';

export default function BasicTimeRangeDemo() {
  const [shift, setShift] = useState<TimeRange>();

  return (
    <CustomTimeRangePicker 
      value={shift} 
      onChange={setShift} 
      placeholder="Select shift time..."
    />
  );
}`}
              />
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section 
              title="Selection with Presets" 
              description="Save users time by injecting a presets array alongside the custom time functionality."
            >
              <div className="max-w-sm">
                 <CustomTimeRangePicker 
                   value={presetRange} 
                   onChange={setPresetRange} 
                   presets={PRESETS}
                 />
              </div>
              <p className="text-xs text-gray-500 mt-3 font-mono">
                Current stored value (24h): {JSON.stringify(presetRange)}
              </p>
              <CodeBlock
                code={`import { useState } from 'react';
import { CustomTimeRangePicker, TimeRange } from '@/components/CustomTimeRangePicker';

export default function PresetTimeRangeDemo() {
  const [shift, setShift] = useState<TimeRange>({ start: '09:00', end: '17:00' });

  const presets = [
    { label: "Morning Shift", range: { start: "08:00", end: "16:00" } },
    { label: "Night Shift", range: { start: "22:00", end: "06:00" } },
    { label: "Standard 9-5", range: { start: "09:00", end: "17:00" } },
  ];

  return (
    <CustomTimeRangePicker 
      value={shift} 
      onChange={setShift} 
      presets={presets}
    />
  );
}`}
              />
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
