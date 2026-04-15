"use client";

import React, { useState } from "react";
import { CustomSwitch } from "@/components/CustomSwitch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CodeBlock = ({ code, title = "Installation & Usage" }: { code: string, title?: string }) => (
  <div className="mt-10 border-t border-slate-100 pt-8">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {title}
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
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Custom Switch
            </h2>
            <p className="text-lg text-slate-500">
              A highly customizable switch component with sizes, colors, and states.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            {/* Sizes & Colors section */}
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Sizes & Colors
              </Label>
              <div className="flex flex-col gap-6 p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="flex flex-wrap items-center gap-8">
                  <CustomSwitch size="sm" defaultChecked color="neutral" label="Small (sm)" />
                  <CustomSwitch size="md" defaultChecked color="primary" label="Medium (md)" />
                  <CustomSwitch size="lg" defaultChecked color="success" label="Large (lg)" />
                </div>
                <div className="flex flex-wrap items-center gap-8 pt-4">
                   <CustomSwitch defaultChecked color="danger" label="Danger" />
                   <CustomSwitch defaultChecked color="warning" label="Warning" />
                </div>
              </div>
              <CodeBlock title="Sizes & Colors Usage" code={`import { CustomSwitch } from "@/components/CustomSwitch";

<CustomSwitch size="sm" defaultChecked color="neutral" label="Small (sm)" />
<CustomSwitch size="md" defaultChecked color="primary" label="Medium (md)" />
<CustomSwitch size="lg" defaultChecked color="success" label="Large (lg)" />
<CustomSwitch defaultChecked color="danger" label="Danger" />
<CustomSwitch defaultChecked color="warning" label="Warning" />`} />
            </div>

            <Separator className="bg-slate-100" />

            {/* States section */}
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                States
              </Label>
              <div className="flex flex-wrap items-center gap-8 p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                <CustomSwitch defaultChecked={false} label="Unchecked" />
                <CustomSwitch defaultChecked={true} label="Checked" />
                <CustomSwitch disabled defaultChecked={false} label="Disabled (Off)" />
                <CustomSwitch disabled defaultChecked={true} color="success" label="Disabled (On)" />
              </div>
              <CodeBlock title="States Usage" code={`import { CustomSwitch } from "@/components/CustomSwitch";

<CustomSwitch defaultChecked={false} label="Unchecked" />
<CustomSwitch defaultChecked={true} label="Checked" />
<CustomSwitch disabled defaultChecked={false} label="Disabled (Off)" />
<CustomSwitch disabled defaultChecked={true} color="success" label="Disabled (On)" />`} />
            </div>

            <Separator className="bg-slate-100" />

            {/* Real-World Settings Panel */}
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Real-World Settings Panel
              </Label>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Wi-Fi</p>
                    <p className="text-sm text-slate-500">Connect to available networks</p>
                  </div>
                  <CustomSwitch 
                    checked={wifiEnabled} 
                    onChange={setWifiEnabled} 
                    color="primary" 
                    size="lg"
                  />
                </div>

                <Separator className="bg-slate-100" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Airplane Mode</p>
                    <p className="text-sm text-slate-500">Disable all wireless connections</p>
                  </div>
                  <CustomSwitch 
                    checked={airplaneMode} 
                    onChange={setAirplaneMode} 
                    color="warning" 
                    size="lg"
                  />
                </div>
              </div>

              <CodeBlock
                title="Real-World Usage"
                code={`import { useState } from "react";
import { CustomSwitch } from "@/components/CustomSwitch";

export default function SettingsPanel() {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Wi-Fi</p>
          <p className="text-sm text-gray-500">Connect to available networks</p>
        </div>
        <CustomSwitch 
          checked={wifiEnabled} 
          onChange={setWifiEnabled} 
          color="primary" 
          size="lg"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Airplane Mode</p>
          <p className="text-sm text-gray-500">Disable all wireless connections</p>
        </div>
        <CustomSwitch 
          checked={airplaneMode} 
          onChange={setAirplaneMode} 
          color="warning" 
          size="lg"
        />
      </div>
    </div>
  );
}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
