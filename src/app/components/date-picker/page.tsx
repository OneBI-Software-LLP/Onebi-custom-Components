"use client";

import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CustomDatePicker, DateRange } from '@/components/CustomDatePicker';
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

export default function DatePickerPage() {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Date Selector
            </h2>
            <p className="text-lg text-slate-500">
              A configurable calendar component natively supporting Single Date or Date Range selections. Auto-closes upon completing a range sequence.
            </p>
          </div>

          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <Section 
              title="Single Select Mode" 
              description="A standard calendar dropdown for picking a single distinct date."
            >
              <div className="max-w-sm">
                 <CustomDatePicker 
                   mode="single"
                   singleValue={singleDate} 
                   onChangeSingle={setSingleDate} 
                   placeholder="Pick a date..." 
                 />
              </div>
              <p className="text-xs text-gray-500 mt-3 font-mono">
                Stored value: {singleDate ? singleDate.toDateString() : 'null'}
              </p>
              <CodeBlock
                code={`import { useState } from 'react';
import { CustomDatePicker } from '@/components/CustomDatePicker';

export default function SingleDateDemo() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <CustomDatePicker 
      mode="single"
      singleValue={date} 
      onChangeSingle={setDate} 
      placeholder="Pick a date..." 
    />
  );
}`}
              />
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section 
              title="Range Select Mode" 
              description="Pass 'range' mode to enable a dual input structure with a connecting highlight overlay tying your start and end dates together."
            >
              <div className="max-w-sm">
                 <CustomDatePicker 
                   mode="range"
                   rangeValue={dateRange} 
                   onChangeRange={setDateRange} 
                 />
              </div>
              <p className="text-xs text-gray-500 mt-3 font-mono">
                Start: {dateRange.start ? dateRange.start.toDateString() : 'null'} <br/>
                End: {dateRange.end ? dateRange.end.toDateString() : 'null'}
              </p>
              <CodeBlock
                code={`import { useState } from 'react';
import { CustomDatePicker, DateRange } from '@/components/CustomDatePicker';

export default function DateRangeDemo() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  return (
    <CustomDatePicker 
      mode="range" 
      rangeValue={range} 
      onChangeRange={setRange} 
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
