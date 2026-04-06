"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, X, AlertCircle, Info } from "lucide-react";

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

export default function BadgePage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Badge
            </h2>
            <p className="text-lg text-slate-500">
              Status indicators and count tags with multiple variants.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Variants
              </Label>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge className="px-3 py-1 bg-indigo-500 text-white border-none shadow-md shadow-indigo-100">Default</Badge>
                <Badge variant="secondary" className="px-3 py-1">Secondary</Badge>
                <Badge variant="outline" className="px-3 py-1 text-slate-500 border-slate-200">Outline</Badge>
                <Badge variant="destructive" className="px-3 py-1 border-none shadow-md shadow-red-100">Destructive</Badge>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Status Badges
              </Label>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge className="bg-green-500 text-white border-none">
                  <Check className="h-3 w-3 mr-1" />
                  Active
                </Badge>
                <Badge className="bg-yellow-500 text-white border-none">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
                <Badge className="bg-red-500 text-white border-none">
                  <X className="h-3 w-3 mr-1" />
                  Inactive
                </Badge>
                <Badge className="bg-blue-500 text-white border-none">
                  <Info className="h-3 w-3 mr-1" />
                  Info
                </Badge>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Count & Notification Badges
              </Label>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative">
                  <button className="px-4 py-2 bg-slate-100 rounded-lg">
                    Notifications
                  </button>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white border-none text-xs">
                    5
                  </Badge>
                </div>
                <div className="relative">
                  <button className="px-4 py-2 bg-slate-100 rounded-lg">
                    Messages
                  </button>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-indigo-500 text-white border-none text-xs">
                    12
                  </Badge>
                </div>
                <div className="relative">
                  <button className="px-4 py-2 bg-slate-100 rounded-lg">
                    Updates
                  </button>
                  <Badge className="absolute -top-2 -right-2 h-2 w-2 rounded-full p-0 bg-green-500 border-none">
                  </Badge>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { Badge } from "onebi-ui";
import { Check } from "lucide-react";

export default function BadgeDemo() {
  return (
    <div className="space-x-2">
      {/* Basic variants */}
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>

      {/* With icons */}
      <Badge className="bg-green-500">
        <Check className="h-3 w-3 mr-1" />
        Success
      </Badge>

      {/* Notification count */}
      <div className="relative">
        <button>Messages</button>
        <Badge className="absolute -top-2 -right-2 rounded-full">
          12
        </Badge>
      </div>
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
