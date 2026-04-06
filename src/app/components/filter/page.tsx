"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FilterBar, FilterOption } from "@/components/ui/filter-bar";

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

const filters: FilterOption[] = [
  {
    label: "Status",
    value: "status",
    options: [
      { label: "Active", value: "active" },
      { label: "Pending", value: "pending" },
      { label: "Completed", value: "completed" },
      { label: "Archived", value: "archived" },
    ],
  },
  {
    label: "Priority",
    value: "priority",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
      { label: "Critical", value: "critical" },
    ],
  },
  {
    label: "Category",
    value: "category",
    options: [
      { label: "Bug", value: "bug" },
      { label: "Feature", value: "feature" },
      { label: "Enhancement", value: "enhancement" },
      { label: "Documentation", value: "docs" },
    ],
  },
];

export default function FilterPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    status: ["active", "pending"],
  });

  const handleFilterChange = (key: string, value: any) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Filter
            </h2>
            <p className="text-lg text-slate-500">
              Dynamic filtering controls with multi-select dropdowns and active state indicators.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Task Board Filters
              </Label>
              <FilterBar
                filters={filters}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
              <div className="bg-slate-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-slate-600 mb-2 font-medium">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(activeFilters).map(([key, values]) =>
                    Array.isArray(values)
                      ? values.map((v) => (
                          <Badge key={`${key}-${v}`} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 capitalize">
                            {key}: {v}
                          </Badge>
                        ))
                      : (
                          <Badge key={key} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 capitalize">
                            {key}: {String(values)}
                          </Badge>
                        )
                  )}
                  {Object.keys(activeFilters).length === 0 && (
                    <span className="text-sm text-slate-400 italic">No filters applied</span>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                E-Commerce Filters
              </Label>
              <FilterBar
                filters={[
                  {
                    label: "Brand",
                    value: "brand",
                    options: [
                      { label: "Apple", value: "apple" },
                      { label: "Samsung", value: "samsung" },
                      { label: "Google", value: "google" },
                      { label: "OnePlus", value: "oneplus" },
                    ],
                  },
                  {
                    label: "Price Range",
                    value: "price",
                    options: [
                      { label: "Under $200", value: "under-200" },
                      { label: "$200 - $500", value: "200-500" },
                      { label: "$500 - $1000", value: "500-1000" },
                      { label: "Over $1000", value: "over-1000" },
                    ],
                  },
                  {
                    label: "Rating",
                    value: "rating",
                    options: [
                      { label: "4+ Stars", value: "4" },
                      { label: "3+ Stars", value: "3" },
                      { label: "2+ Stars", value: "2" },
                    ],
                  },
                ]}
                activeFilters={{ brand: ["apple", "google"], price: ["500-1000"] }}
                onFilterChange={() => {}}
                onClearFilters={() => {}}
              />
            </div>

            <CodeBlock
              code={`import { FilterBar } from "onebi-ui";
import { useState } from "react";

const filters = [
  {
    label: "Status",
    value: "status",
    options: [
      { label: "Active", value: "active" },
      { label: "Pending", value: "pending" },
      { label: "Completed", value: "completed" },
    ],
  },
  {
    label: "Priority",
    value: "priority",
    options: [
      { label: "Low", value: "low" },
      { label: "High", value: "high" },
    ],
  },
];

export default function TaskFilters() {
  const [activeFilters, setActiveFilters] = useState({});

  return (
    <FilterBar
      filters={filters}
      activeFilters={activeFilters}
      onFilterChange={(key, value) =>
        setActiveFilters((prev) => ({ ...prev, [key]: value }))
      }
      onClearFilters={() => setActiveFilters({})}
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
