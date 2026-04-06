"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Plus } from "lucide-react";

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

interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: "default" | "secondary" | "outline";
}

function Chip({ label, onRemove, variant = "default" }: ChipProps) {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
        ${variant === "default" ? "bg-indigo-500 text-white shadow-md shadow-indigo-100" : ""}
        ${variant === "secondary" ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : ""}
        ${variant === "outline" ? "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50" : ""}
      `}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-0.5 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export default function ChipsPage() {
  const [chips, setChips] = useState([
    { id: 1, label: "React", variant: "default" as const },
    { id: 2, label: "TypeScript", variant: "secondary" as const },
    { id: 3, label: "Next.js", variant: "outline" as const },
    { id: 4, label: "Tailwind", variant: "default" as const },
  ]);

  const removeChip = (id: number) => {
    setChips(chips.filter((chip) => chip.id !== id));
  };

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Chips
            </h2>
            <p className="text-lg text-slate-500">
              Compact interactive elements for filters, tags, and selections.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Chip Variants
              </Label>
              <div className="flex flex-wrap gap-3">
                <Chip label="Default Chip" variant="default" />
                <Chip label="Secondary Chip" variant="secondary" />
                <Chip label="Outline Chip" variant="outline" />
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Removable Chips (Tags)
              </Label>
              <div className="flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <Chip
                    key={chip.id}
                    label={chip.label}
                    variant={chip.variant}
                    onRemove={() => removeChip(chip.id)}
                  />
                ))}
              </div>
              {chips.length === 0 && (
                <p className="text-sm text-slate-400 italic">All chips removed. Add more below!</p>
              )}
              <button
                onClick={() =>
                  setChips([
                    ...chips,
                    {
                      id: Date.now(),
                      label: `New Tag ${chips.length + 1}`,
                      variant: "default",
                    },
                  ])
                }
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Chip
              </button>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Filter Chips
              </Label>
              <div className="flex flex-wrap gap-3">
                {["All", "Active", "Pending", "Completed", "Archived"].map(
                  (filter, idx) => (
                    <Chip
                      key={filter}
                      label={filter}
                      variant={idx === 0 ? "default" : "outline"}
                    />
                  )
                )}
              </div>
            </div>

            <CodeBlock
              code={`import { Chip } from "onebi-ui";

export default function ChipsDemo() {
  const [tags, setTags] = useState([
    { id: 1, label: "React", variant: "default" },
    { id: 2, label: "Vue", variant: "secondary" },
  ]);

  const removeChip = (id) => {
    setTags(tags.filter((chip) => chip.id !== id));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.label}
          variant={chip.variant}
          onRemove={() => removeChip(chip.id)}
        />
      ))}
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
