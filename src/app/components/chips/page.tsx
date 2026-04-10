"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Chip, ChipGroup } from "@/components/CustomChip";

// We'll bring back standard SVG icons here so the user has the exact demo
const Dot = ({ color }: { color?: string }) => (
  <svg width="7" height="7" viewBox="0 0 7 7">
    <circle cx="3.5" cy="3.5" r="3.5" fill={color || "currentColor"} />
  </svg>
);

const AddIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
      {title}
    </Label>
    {children}
  </div>
);

export default function ChipsPage() {
  const [filterSel, setFilterSel] = useState<string[]>(["electronics", "fashion"]);
  const [choiceSel, setChoiceSel] = useState<string[]>(["monthly"]);
  const [tags, setTags] = useState([
    { id: "t1", label: "Design Systems" },
    { id: "t2", label: "React" },
    { id: "t3", label: "TypeScript" },
    { id: "t4", label: "Accessibility" },
    { id: "t5", label: "UI Kit" },
  ]);
  const [tagInput, setTagInput] = useState("");
  const [tagIdCounter, setTagIdCounter] = useState(100);

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !tags.find((t) => t.label === val)) {
      setTags([...tags, { id: `t${tagIdCounter}`, label: val }]);
      setTagIdCounter((n) => n + 1);
    }
    setTagInput("");
  };

  const COLOR_KEYS = ["default", "blue", "teal", "purple", "coral", "amber", "green", "red", "pink"];

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Chips
            </h2>
            <p className="text-lg text-slate-500">
              All modes, variants, sizes, and colors.
            </p>
          </div>
          
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <Section title="Variants">
              <div className="flex flex-col gap-4">
                <ChipGroup mode="filter" color="blue" variant="filled" items={[{id:"1",label:"Filled"},{id:"2",label:"Selected"},{id:"3",label:"Another"}]} defaultValue={["2"]} />
                <ChipGroup mode="filter" color="blue" variant="outlined" items={[{id:"1",label:"Outlined"},{id:"2",label:"Selected"},{id:"3",label:"Another"}]} defaultValue={["2"]} />
                <ChipGroup mode="filter" color="blue" variant="soft" items={[{id:"1",label:"Soft"},{id:"2",label:"Selected"},{id:"3",label:"Another"}]} defaultValue={["2"]} />
                <ChipGroup mode="filter" color="blue" variant="ghost" items={[{id:"1",label:"Ghost"},{id:"2",label:"Selected"},{id:"3",label:"Another"}]} defaultValue={["2"]} />
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Sizes">
              <div className="flex flex-col gap-3">
                {(["xs","sm","md","lg","xl"] as const).map((sz) => (
                  <div key={sz} className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 w-5">{sz}</span>
                    <ChipGroup mode="filter" color="default" variant="filled" size={sz}
                      items={[{id:"a",label:"Unselected"},{id:"b",label:"Selected"}]}
                      defaultValue={["b"]}
                    />
                  </div>
                ))}
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Colors — filled & soft">
              <div className="flex flex-wrap gap-2 mb-3">
                {COLOR_KEYS.map((c: any) => (
                  <Chip key={c} label={c} color={c} variant="filled" active size="sm" />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {COLOR_KEYS.map((c: any) => (
                  <Chip key={c} label={c} color={c} variant="soft" size="sm" />
                ))}
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Filter chips — multi-select">
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Category</p>
                <ChipGroup
                  mode="filter"
                  color="blue"
                  variant="filled"
                  size="sm"
                  value={filterSel}
                  onChange={(ids) => setFilterSel(ids)}
                  items={[
                    { id: "all", label: "All" },
                    { id: "electronics", label: "Electronics", count: 42 },
                    { id: "fashion", label: "Fashion", count: 18 },
                    { id: "home", label: "Home", count: 31 },
                    { id: "sports", label: "Sports", count: 9 },
                    { id: "books", label: "Books", count: 55 },
                  ]}
                />
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            <Section title="Choice chips — single select">
              <ChipGroup
                mode="choice"
                color="coral"
                variant="filled"
                value={choiceSel}
                onChange={(ids) => setChoiceSel(ids)}
                items={[
                  { id: "daily", label: "Daily" },
                  { id: "weekly", label: "Weekly" },
                  { id: "monthly", label: "Monthly" },
                  { id: "yearly", label: "Yearly" },
                ]}
              />
            </Section>

            <Separator className="bg-slate-100" />

            <Section title="Input chips — deletable tags">
              <div className="space-y-3">
                <ChipGroup
                  mode="input"
                  color="purple"
                  variant="outlined"
                  size="sm"
                  items={tags}
                  onDelete={(id, rest) => setTags(rest)}
                />
                <div className="flex gap-2 max-w-[300px]">
                  <input
                    type="text"
                    value={tagInput}
                    placeholder="Add a tag…"
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    className="text-[13px] flex-1 px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                  <button onClick={addTag} className="text-xs px-4 py-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            <Section title="Status chips — static">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "active",   label: "Active",   color: "green",   dot: "#3B6D11" },
                  { id: "pending",  label: "Pending",  color: "amber",   dot: "#BA7517" },
                  { id: "failed",   label: "Failed",   color: "red",     dot: "#E24B4A" },
                  { id: "draft",    label: "Draft",    color: "default", dot: "#888" },
                  { id: "review",   label: "In review",color: "blue",    dot: "#185FA5" },
                  { id: "archived", label: "Archived", color: "default", dot: "#aaa" },
                  { id: "new",      label: "New",      color: "teal",    dot: "#1D9E75" },
                ].map((s) => (
                  <Chip
                    key={s.id as any}
                    label={s.label}
                    color={s.color as any}
                    variant="soft"
                    size="sm"
                    leadingIcon={<Dot color={s.dot} />}
                  />
                ))}
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            <Section title="Suggestion chips — actionable">
              <div className="flex flex-wrap gap-2">
                {[
                  "Add to calendar", "Send reminder", "Schedule meeting",
                  "Export as PDF", "Share link", "Archive thread",
                ].map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    color="default"
                    variant="outlined"
                    size="md"
                    leadingIcon={<AddIcon />}
                    clickable
                    onClick={() => {}}
                  />
                ))}
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            <Section title="Avatar chips">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Anjali Sharma",  color: "purple" },
                  { label: "Ben Okafor",     color: "teal" },
                  { label: "Carmen López",   color: "coral" },
                  { label: "David Kim",      color: "blue" },
                  { label: "Eva Müller",     color: "amber" },
                ].map((p) => (
                  <Chip
                    key={p.label}
                    label={p.label}
                    avatar={p.label}
                    color={p.color as any}
                    variant="soft"
                    size="md"
                    deletable
                    clickable
                    onClick={() => {}}
                  />
                ))}
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            <Section title="States">
              <div className="flex flex-wrap items-center gap-2">
                <Chip label="Default" color="blue" variant="filled" />
                <Chip label="Active" color="blue" variant="filled" active />
                <Chip label="Disabled" color="blue" variant="filled" disabled />
                <Chip label="Loading" color="blue" variant="filled" loading />
                <Chip label="Deletable" color="blue" variant="outlined" deletable onDelete={() => {}} />
                <Chip label="With count" color="teal" variant="filled" count={24} />
                <Chip label="Max width" color="purple" variant="soft" maxWidth={100} />
              </div>
            </Section>

            <CodeBlock
              code={`import { Chip, ChipGroup } from "@/components/CustomChip";

export default function ChipsDemo() {
  const [filterSel, setFilterSel] = useState(["2"]);

  return (
    <div className="space-y-4">
      {/* Individual Chip */}
      <Chip label="Loading..." color="blue" loading />

      {/* Chip Group (Multi-select) */}
      <ChipGroup 
        mode="filter" 
        color="purple" 
        variant="filled" 
        items={[
          { id: "1", label: "Option 1" },
          { id: "2", label: "Option 2" }
        ]} 
        value={filterSel}
        onChange={setFilterSel}
      />
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
