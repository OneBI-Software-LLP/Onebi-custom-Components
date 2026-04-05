"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
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

export default function TextAreaPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Text Area
            </h2>
            <p className="text-lg text-slate-500">
              Multi-line text input for longer content.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Textarea
              </Label>
              <Textarea
                placeholder="Type your message here..."
                className="rounded-xl border-slate-200 focus:ring-4 focus:ring-indigo-100 transition-all min-h-[120px]"
              />
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                With Label & Character Count
              </Label>
              <div className="space-y-2">
                <Label htmlFor="bio-textarea" className="text-sm font-bold text-slate-700">Biography</Label>
                <Textarea
                  id="bio-textarea"
                  placeholder="Tell us about yourself..."
                  className="rounded-xl border-slate-200 focus:ring-4 focus:ring-indigo-100 transition-all min-h-[150px]"
                />
                <p className="text-xs text-slate-400">Write a short bio (max 500 characters)</p>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Disabled State
              </Label>
              <Textarea
                placeholder="Disabled textarea"
                disabled
                className="rounded-xl border-slate-200 min-h-[100px]"
              />
            </div>

            <CodeBlock
              code={`import { Textarea, Label } from "onebi-ui";

export default function TextAreaDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea 
        id="message" 
        placeholder="Type your message..."
        className="min-h-[120px]"
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
