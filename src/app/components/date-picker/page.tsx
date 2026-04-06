"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, CalendarDays } from "lucide-react";

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

export default function DatePickerPage() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [inlineDate, setInlineDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Date Picker
            </h2>
            <p className="text-lg text-slate-500">
              Calendar-based date selection with inline and dropdown modes.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Date Picker
              </Label>
              <div className="flex flex-wrap items-center gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date-single">Select Date</Label>
                  <div className="w-60">
                    <DatePicker
                      date={singleDate}
                      setDate={setSingleDate}
                      placeholder="Choose a date"
                    />
                  </div>
                  {singleDate && (
                    <p className="text-xs text-slate-500 mt-1">
                      Selected: {singleDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Unselected State</Label>
                  <div className="w-60">
                    <DatePicker
                      date={undefined}
                      setDate={() => {}}
                      placeholder="Pick a date"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Inline Calendar
              </Label>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="border border-slate-200 rounded-xl p-3 inline-block">
                  <Calendar
                    selected={inlineDate}
                    onSelect={setInlineDate}
                  />
                </div>
                {inlineDate && (
                  <div className="flex-1 bg-indigo-50 rounded-xl p-5 flex flex-col justify-center">
                    <CalendarDays className="h-6 w-6 text-indigo-600 mb-3" />
                    <p className="text-2xl font-bold text-indigo-900">
                      {inlineDate.getDate()}
                    </p>
                    <p className="text-indigo-700 font-medium">
                      {inlineDate.toLocaleDateString("en-US", { weekday: "long", month: "long", year: "numeric" })}
                    </p>
                    <p className="text-xs text-indigo-500 mt-2">
                      Week {Math.ceil(inlineDate.getDate() / 7)} of the month
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Date Range Selection
              </Label>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="w-56">
                      <DatePicker
                        date={startDate}
                        setDate={setStartDate}
                        placeholder="Start date"
                      />
                    </div>
                  </div>
                  <div className="flex items-center pt-6">
                    <span className="text-sm text-slate-400">to</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <div className="w-56">
                      <DatePicker
                        date={endDate}
                        setDate={setEndDate}
                        placeholder="End date"
                      />
                    </div>
                  </div>
                </div>
                {startDate && endDate && (
                  <div className="bg-slate-50 rounded-lg p-3 inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Quick Date Presets
              </Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Today", days: 0 },
                  { label: "Tomorrow", days: 1 },
                  { label: "Next Week", days: 7 },
                  { label: "Next Month", days: 30 },
                ].map((preset) => {
                  const date = new Date();
                  date.setDate(date.getDate() + preset.days);
                  return (
                    <Button
                      key={preset.label}
                      variant="outline"
                      size="sm"
                      onClick={() => setSingleDate(date)}
                      className="gap-1.5"
                    >
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {preset.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <CodeBlock
              code={`import { DatePicker } from "onebi-ui";
import { useState } from "react";

export default function DateDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Date</label>
      <DatePicker
        date={date}
        setDate={setDate}
        placeholder="Choose a date"
      />
      {date && (
        <p className="text-xs text-slate-500">
          Selected: {date.toLocaleDateString()}
        </p>
      )}
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
