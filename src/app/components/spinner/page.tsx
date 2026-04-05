"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

function DotSpinner() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-3 w-3 rounded-full bg-indigo-600 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function PulseSpinner() {
  return (
    <div className="relative h-10 w-10">
      <div className="absolute inset-0 rounded-full bg-indigo-600/30 animate-ping" />
      <div className="absolute inset-2 rounded-full bg-indigo-600 animate-pulse" />
    </div>
  );
}

function BarSpinner() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1 bg-indigo-600 rounded-full animate-pulse"
          style={{
            height: "24px",
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.8s",
          }}
        />
      ))}
    </div>
  );
}

export default function SpinnerPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Spinner
            </h2>
            <p className="text-lg text-slate-500">
              Loading indicators with multiple styles, sizes, and color variants.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Default Spinner
              </Label>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Spinner size={16} />
                  <span className="text-xs text-slate-500">Small (16px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner size={24} />
                  <span className="text-xs text-slate-500">Default (24px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner size={36} />
                  <span className="text-xs text-slate-500">Medium (36px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner size={48} className="text-indigo-600" />
                  <span className="text-xs text-slate-500">Large (48px)</span>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Color Variants
              </Label>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="text-slate-400" />
                  <span className="text-xs text-slate-500">Slate</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="text-indigo-600" />
                  <span className="text-xs text-slate-500">Indigo</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="text-green-600" />
                  <span className="text-xs text-slate-500">Green</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="text-amber-600" />
                  <span className="text-xs text-slate-500">Amber</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="text-red-600" />
                  <span className="text-xs text-slate-500">Red</span>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Alternative Spinners
              </Label>
              <div className="flex flex-wrap items-center gap-12">
                <div className="flex flex-col items-center gap-3">
                  <DotSpinner />
                  <span className="text-xs text-slate-500">Dot Bounce</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <PulseSpinner />
                  <span className="text-xs text-slate-500">Pulse</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <BarSpinner />
                  <span className="text-xs text-slate-500">Audio Bars</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                  <span className="text-xs text-slate-500">Lucide Loader</span>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Button Loading States
              </Label>
              <div className="flex flex-wrap items-center gap-4">
                <Button disabled className="min-w-[120px]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </Button>
                <Button variant="outline" disabled className="min-w-[120px]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </Button>
                <Button variant="secondary" disabled size="sm" className="min-w-[100px]">
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Please wait
                </Button>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Full Page Loading
              </Label>
              <div className="h-48 border border-slate-200 rounded-xl flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                  <Spinner size={40} className="text-indigo-600" />
                  <p className="text-sm text-slate-500 font-medium">Loading your dashboard...</p>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { Spinner } from "onebi-ui";
import { Loader2 } from "lucide-react";

export default function LoadingDemo() {
  return (
    <div className="space-y-4">
      {/* Default spinner */}
      <Spinner size={24} />

      {/* Custom color */}
      <Spinner size={32} className="text-indigo-600" />

      {/* Button loading state */}
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Saving...
      </Button>

      {/* Centered loading */}
      <div className="flex items-center justify-center h-48">
        <div className="flex flex-col items-center gap-3">
          <Spinner size={40} className="text-indigo-600" />
          <p>Loading...</p>
        </div>
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
