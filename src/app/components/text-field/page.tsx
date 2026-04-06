"use client";

import React from "react";
import { Input } from "@/components/ui/input";
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

export default function TextFieldPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Text Field
            </h2>
            <p className="text-lg text-slate-500">
              Styled input fields for form data entry.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Input
              </Label>
              <Input placeholder="Enter your text..." className="rounded-xl h-11 border-slate-200 focus:ring-4 focus:ring-indigo-100 transition-all" />
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                With Label & Helper Text
              </Label>
              <div className="space-y-2">
                <Label htmlFor="email-input" className="text-sm font-bold text-slate-700">Email Address</Label>
                <Input id="email-input" placeholder="hello@example.com" type="email" className="rounded-xl h-11 border-slate-200 focus:ring-4 focus:ring-indigo-100 transition-all" />
                <p className="text-xs text-slate-400">We&apos;ll never share your email with anyone else.</p>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                States
              </Label>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="disabled-input" className="text-sm font-bold text-slate-700">Disabled</Label>
                  <Input id="disabled-input" placeholder="Disabled input" disabled className="rounded-xl h-11 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="error-input" className="text-sm font-bold text-slate-700">Error State</Label>
                  <Input id="error-input" placeholder="Error input" className="rounded-xl h-11 border-red-300 focus:ring-4 focus:ring-red-100 transition-all" />
                  <p className="text-xs text-red-500">This field is required</p>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { Input, Label } from "onebi-ui";

export default function TextFieldDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        type="email" 
        placeholder="hello@example.com"
        className="rounded-xl"
      />
      <p className="text-xs text-slate-400">Helper text</p>
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
