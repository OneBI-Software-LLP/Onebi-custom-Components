"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function CheckboxPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Checkbox
            </h2>
            <p className="text-lg text-slate-500">
              Select multiple options with toggle checkboxes.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Checkbox
              </Label>
              <div className="flex items-center space-x-3 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <Checkbox id="terms-basic" className="h-5 w-5 rounded-md border-2 border-slate-300" />
                <Label htmlFor="terms-basic" className="cursor-pointer text-sm font-medium text-slate-600">
                  Accept terms and conditions
                </Label>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Notification Preferences
              </Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <Checkbox id="notify-email" defaultChecked className="h-5 w-5 rounded-md border-2 border-slate-300" />
                  <div className="flex-1">
                    <Label htmlFor="notify-email" className="cursor-pointer text-sm font-bold text-slate-700">Email Notifications</Label>
                    <p className="text-xs text-slate-400 mt-1">Receive email updates about your account</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <Checkbox id="notify-sms" className="h-5 w-5 rounded-md border-2 border-slate-300" />
                  <div className="flex-1">
                    <Label htmlFor="notify-sms" className="cursor-pointer text-sm font-bold text-slate-700">SMS Notifications</Label>
                    <p className="text-xs text-slate-400 mt-1">Get text messages for important alerts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <Checkbox id="notify-push" className="h-5 w-5 rounded-md border-2 border-slate-300" />
                  <div className="flex-1">
                    <Label htmlFor="notify-push" className="cursor-pointer text-sm font-bold text-slate-700">Push Notifications</Label>
                    <p className="text-xs text-slate-400 mt-1">Browser push notifications for real-time updates</p>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Disabled State
              </Label>
              <div className="flex items-center space-x-3 p-4 border border-slate-100 rounded-xl bg-slate-50/50 opacity-60">
                <Checkbox id="disabled-check" disabled className="h-5 w-5 rounded-md border-2 border-slate-300" />
                <Label htmlFor="disabled-check" className="cursor-pointer text-sm font-medium text-slate-400">
                  Disabled checkbox option
                </Label>
              </div>
            </div>

            <CodeBlock
              code={`import { Checkbox, Label } from "onebi-ui";

export default function CheckboxDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="notifications" defaultChecked />
        <Label htmlFor="notifications">Enable notifications</Label>
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
