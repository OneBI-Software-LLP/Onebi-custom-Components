"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Wifi, Bell, Moon, Plane } from "lucide-react";

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

export default function SwitchButtonPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Switch Button
            </h2>
            <p className="text-lg text-slate-500">
              Toggle between on and off states with a smooth switch.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Switch
              </Label>
              <div className="flex items-center space-x-3 p-5 border border-slate-100 rounded-2xl bg-slate-50/50 justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="switch-basic" className="cursor-pointer text-sm font-bold text-slate-700">Airplane Mode</Label>
                  <p className="text-xs text-slate-400">Disable all wireless connectivity</p>
                </div>
                <Switch id="switch-basic" />
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Settings Toggles
              </Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Wifi className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-slate-700">Wi-Fi</Label>
                      <p className="text-xs text-slate-400 mt-0.5">Enable wireless network</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Bell className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-slate-700">Notifications</Label>
                      <p className="text-xs text-slate-400 mt-0.5">Push notification alerts</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Moon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-slate-700">Dark Mode</Label>
                      <p className="text-xs text-slate-400 mt-0.5">Switch to dark theme</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Disabled State
              </Label>
              <div className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl bg-slate-50/50 opacity-60">
                <div>
                  <Label className="text-sm font-bold text-slate-700">Disabled Switch</Label>
                  <p className="text-xs text-slate-400 mt-0.5">This switch cannot be toggled</p>
                </div>
                <Switch disabled />
              </div>
            </div>

            <CodeBlock
              code={`import { Switch, Label } from "onebi-ui";

export default function SwitchDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="notifications">Notifications</Label>
          <p className="text-xs text-slate-400">Enable push notifications</p>
        </div>
        <Switch id="notifications" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <p className="text-xs text-slate-400">Switch to dark theme</p>
        </div>
        <Switch id="dark-mode" />
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
