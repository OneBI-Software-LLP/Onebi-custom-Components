"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

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

export default function ButtonsPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Buttons
            </h2>
            <p className="text-lg text-slate-500">
              High-performance interactors with dynamic variants.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Variants
              </Label>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Sizes & States
              </Label>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" className="rounded-full">
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <CodeBlock
              code={`import { Button } from "onebi-ui";

export default function App() {
  return (
    <div className="space-x-4">
      <Button variant="default">Primary Action</Button>
      <Button variant="outline" size="sm">Secondary</Button>
      <Button variant="destructive" size="icon">
        <Icon />
      </Button>
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
