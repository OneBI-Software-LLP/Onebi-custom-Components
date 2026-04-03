"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, X, Filter, Clock } from "lucide-react";

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

const recentSearches = [
  "Dashboard analytics",
  "User management settings",
  "API integration docs",
  "Billing history",
];

const suggestions = [
  { label: "Account Settings", category: "Settings" },
  { label: "API Keys", category: "Developer" },
  { label: "Add New Team Member", category: "Action" },
  { label: "Analytics Dashboard", category: "Page" },
  { label: "Audit Logs", category: "Security" },
];

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRecent, setShowRecent] = useState(false);

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Search
            </h2>
            <p className="text-lg text-slate-500">
              Intelligent search inputs with suggestions, recent history, and keyboard shortcuts.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Search
              </Label>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search anything..."
                  className="pl-10 h-11"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Search with Clear Button
              </Label>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search and clear..."
                  className="pl-10 pr-10 h-11"
                  value="Dashboard analytics"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 transition-colors">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Command Palette Style
              </Label>
              <div className="max-w-lg space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Type a command or search..."
                    className="pl-12 h-12 text-base rounded-xl border-slate-200 focus-visible:ring-indigo-500"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                      setShowRecent(e.target.value.length === 0);
                    }}
                    onFocus={() => {
                      if (searchValue.length > 0) setShowSuggestions(true);
                      else setShowRecent(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setShowSuggestions(false);
                        setShowRecent(false);
                      }, 200);
                    }}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-500 rounded border border-slate-200">
                      ESC
                    </kbd>
                  </div>
                </div>

                {(showRecent || showSuggestions) && (
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-lg bg-white">
                    {showRecent && !showSuggestions && (
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-2 px-2">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent</span>
                        </div>
                        {recentSearches.map((item, i) => (
                          <button
                            key={i}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                          >
                            <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                    {showSuggestions && (
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-2 px-2">
                          <Filter className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suggestions</span>
                        </div>
                        {suggestions
                          .filter((s) =>
                            s.label.toLowerCase().includes(searchValue.toLowerCase())
                          )
                          .map((item, i) => (
                            <button
                              key={i}
                              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
                            >
                              <span>{item.label}</span>
                              <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-500">
                                {item.category}
                              </Badge>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Size Variants
              </Label>
              <div className="space-y-4 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input placeholder="Small search" className="pl-9 h-9 text-sm" />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Default search" className="pl-10 h-10" />
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input placeholder="Large search" className="pl-12 h-12 text-base rounded-xl" />
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { Input } from "onebi-ui";
import { Search, X } from "lucide-react";

export default function SearchDemo() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        placeholder="Search..."
        className="pl-10 pr-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setQuery("")}
        >
          <X className="h-4 w-4 text-slate-400" />
        </button>
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
