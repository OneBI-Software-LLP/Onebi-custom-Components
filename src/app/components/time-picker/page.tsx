"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Clock, Timer, Sunrise, Sunset, Coffee, Moon } from "lucide-react";

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

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  format?: "12h" | "24h";
  label?: string;
}

function TimePicker({ value, onChange, format = "12h", label }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(() => {
    const parts = value.split(":");
    return parseInt(parts[0], 10);
  });
  const [minutes, setMinutes] = useState(() => {
    const parts = value.split(":");
    return parseInt(parts[1], 10);
  });
  const [period, setPeriod] = useState(() => {
    if (format === "12h") {
      return hours >= 12 ? "PM" : "AM";
    }
    return "";
  });

  const displayHours = format === "12h" ? (hours % 12 || 12) : hours;
  const displayMinutes = minutes.toString().padStart(2, "0");

  const hoursList = format === "12h"
    ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    : Array.from({ length: 24 }, (_, i) => i);

  const minutesList = Array.from({ length: 60 }, (_, i) => i);

  const handleConfirm = () => {
    let finalHours = hours;
    if (format === "12h") {
      if (period === "PM" && hours !== 12) finalHours = hours + 12;
      if (period === "AM" && hours === 12) finalHours = 0;
    }
    const timeStr = `${finalHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    onChange(timeStr);
    setOpen(false);
  };

  return (
    <div className="relative">
      {label && <Label className="mb-2 block">{label}</Label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 h-11 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors text-left w-full"
      >
        <Clock className="h-4 w-4 text-slate-400 flex-shrink-0" />
        <span className="font-mono text-sm text-slate-900">
          {displayHours.toString().padStart(2, "0")}:{displayMinutes}
          {format === "12h" && <span className="text-slate-500 ml-1">{period}</span>}
        </span>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 p-4 border border-slate-200 rounded-xl bg-white shadow-xl w-72 animate-in fade-in-80">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-900">Select Time</h4>
            {format === "12h" && (
              <div className="flex bg-slate-100 rounded-lg p-0.5">
                <button
                  onClick={() => setPeriod("AM")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    period === "AM" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() => setPeriod("PM")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    period === "PM" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                  }`}
                >
                  PM
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 text-center">Hours</p>
              <div className="grid grid-cols-4 gap-1 max-h-32 overflow-y-auto">
                {hoursList.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHours(h)}
                    className={`py-1.5 text-sm rounded-md transition-colors ${
                      hours === h
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {h.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-2xl font-bold text-slate-300">:</span>
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 text-center">Minutes</p>
              <div className="grid grid-cols-4 gap-1 max-h-32 overflow-y-auto">
                {minutesList.filter((_, i) => i % 5 === 0).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutes(m)}
                    className={`py-1.5 text-sm rounded-md transition-colors ${
                      minutes === m
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {m.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleConfirm} size="sm" className="flex-1 h-9">
              Confirm
            </Button>
            <Button onClick={() => setOpen(false)} variant="outline" size="sm" className="flex-1 h-9">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function QuickTimeButton({ icon: Icon, label, time, isActive, onClick }: {
  icon: React.ElementType;
  label: string;
  time: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-left ${
        isActive
          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon className="h-4 w-4" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs opacity-70">{time}</p>
      </div>
    </button>
  );
}

export default function TimePickerPage() {
  const [meetingTime, setMeetingTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:30");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [activeQuick, setActiveQuick] = useState("morning");

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Time Picker
            </h2>
            <p className="text-lg text-slate-500">
              Intuitive time selection with 12/24 hour formats and quick presets.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Meeting Time
              </Label>
              <div className="flex flex-wrap items-end gap-6">
                <div className="w-48">
                  <TimePicker
                    value={meetingTime}
                    onChange={setMeetingTime}
                    format="12h"
                    label="Start Time"
                  />
                </div>
                <div className="flex items-center pb-1">
                  <span className="text-sm text-slate-400 font-medium">to</span>
                </div>
                <div className="w-48">
                  <TimePicker
                    value={endTime}
                    onChange={setEndTime}
                    format="12h"
                    label="End Time"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                24-Hour Format
              </Label>
              <div className="flex flex-wrap items-end gap-6">
                <div className="w-48">
                  <TimePicker
                    value="14:30"
                    onChange={() => {}}
                    format="24h"
                    label="24h Format"
                  />
                </div>
                <div className="w-48">
                  <TimePicker
                    value="23:45"
                    onChange={() => {}}
                    format="24h"
                    label="Late Night"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Quick Time Presets
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <QuickTimeButton
                  icon={Sunrise}
                  label="Morning"
                  time="06:00 AM"
                  isActive={activeQuick === "morning"}
                  onClick={() => { setActiveQuick("morning"); setReminderTime("06:00"); }}
                />
                <QuickTimeButton
                  icon={Coffee}
                  label="Coffee Break"
                  time="10:30 AM"
                  isActive={activeQuick === "coffee"}
                  onClick={() => { setActiveQuick("coffee"); setReminderTime("10:30"); }}
                />
                <QuickTimeButton
                  icon={Timer}
                  label="Afternoon"
                  time="02:00 PM"
                  isActive={activeQuick === "afternoon"}
                  onClick={() => { setActiveQuick("afternoon"); setReminderTime("14:00"); }}
                />
                <QuickTimeButton
                  icon={Moon}
                  label="Evening"
                  time="07:00 PM"
                  isActive={activeQuick === "evening"}
                  onClick={() => { setActiveQuick("evening"); setReminderTime("19:00"); }}
                />
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Reminder Setup
              </Label>
              <div className="bg-slate-50 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Daily Standup Reminder</p>
                    <p className="text-xs text-slate-500">Get notified every weekday</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Remind me at:</span>
                  <div className="w-40">
                    <TimePicker
                      value={reminderTime}
                      onChange={setReminderTime}
                      format="12h"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                    <button
                      key={day}
                      className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { TimePicker } from "onebi-ui";
import { useState } from "react";

export default function TimeDemo() {
  const [time, setTime] = useState("09:00");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Meeting Time</label>
      <TimePicker
        value={time}
        onChange={setTime}
        format="12h"
      />
      <p className="text-xs text-slate-500">
        Selected: {time}
      </p>
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
