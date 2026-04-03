"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

export default function RadioboxPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Radiobox
            </h2>
            <p className="text-lg text-slate-500">
              Select a single option from a list of choices.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Radio Group
              </Label>
              <RadioGroup defaultValue="option-1" className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <RadioGroupItem value="option-1" id="radio-1" className="h-5 w-5 border-2 border-slate-300" />
                  <Label htmlFor="radio-1" className="cursor-pointer text-sm font-medium text-slate-600">
                    Option One
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <RadioGroupItem value="option-2" id="radio-2" className="h-5 w-5 border-2 border-slate-300" />
                  <Label htmlFor="radio-2" className="cursor-pointer text-sm font-medium text-slate-600">
                    Option Two
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <RadioGroupItem value="option-3" id="radio-3" className="h-5 w-5 border-2 border-slate-300" />
                  <Label htmlFor="radio-3" className="cursor-pointer text-sm font-medium text-slate-600">
                    Option Three
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Plan Selection
              </Label>
              <RadioGroup defaultValue="monthly" className="space-y-4">
                <div className="flex items-center justify-between p-5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="monthly" id="plan-monthly" className="h-5 w-5 border-2 border-slate-300" />
                    <div>
                      <Label htmlFor="plan-monthly" className="cursor-pointer text-sm font-bold text-slate-700">Monthly Plan</Label>
                      <p className="text-xs text-slate-400 mt-1">Billed monthly, cancel anytime</p>
                    </div>
                  </div>
                  <Badge className="bg-indigo-500 text-white">$9.99/mo</Badge>
                </div>
                <div className="flex items-center justify-between p-5 border-2 border-indigo-500 rounded-xl bg-indigo-50/50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yearly" id="plan-yearly" className="h-5 w-5 border-2 border-indigo-500" />
                    <div>
                      <Label htmlFor="plan-yearly" className="cursor-pointer text-sm font-bold text-slate-700">Yearly Plan</Label>
                      <p className="text-xs text-slate-400 mt-1">Save 20% with annual billing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Save 20%</Badge>
                    <Badge className="bg-indigo-500 text-white">$95.88/yr</Badge>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <CodeBlock
              code={`import { RadioGroup, RadioGroupItem, Label } from "onebi-ui";

export default function RadioDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
