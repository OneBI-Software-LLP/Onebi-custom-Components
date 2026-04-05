"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

export default function DropdownPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Dropdown
            </h2>
            <p className="text-lg text-slate-500">
              Select from a dropdown list of options.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 max-w-xl">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Dropdown
              </Label>
              <Select>
                <SelectTrigger className="h-12 rounded-xl border-slate-200 shadow-sm focus:ring-4 focus:ring-indigo-50">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                  <SelectItem value="option-1">Option One</SelectItem>
                  <SelectItem value="option-2">Option Two</SelectItem>
                  <SelectItem value="option-3">Option Three</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                With Label
              </Label>
              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">Framework</Label>
                <Select defaultValue="next">
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 shadow-sm focus:ring-4 focus:ring-indigo-50">
                    <SelectValue placeholder="Choose framework" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Disabled State
              </Label>
              <Select disabled>
                <SelectTrigger className="h-12 rounded-xl border-slate-200 shadow-sm">
                  <SelectValue placeholder="Disabled dropdown" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100">
                  <SelectItem value="disabled">Cannot select this</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CodeBlock
              code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "onebi-ui";

export default function DropdownDemo() {
  return (
    <Select onValueChange={(value) => console.log(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
