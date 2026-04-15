"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CustomTooltip from "@/components/CustomTooltip";
import CustomAvatar from "@/components/CustomAvatar";

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-6 border-t border-slate-100 pt-6">
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

function Section({ title, description, code, children }: { title: string; description?: string; code?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          {title}
        </Label>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      <div>{children}</div>
      {code && <CodeBlock code={code} />}
    </div>
  );
}

export default function TooltipPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Tooltip
            </h2>
            <p className="text-lg text-slate-500">
              A highly configurable popup component for providing contextual information on hover or click.
            </p>
          </div>
          
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            {/* 1. Placements */}
            <Section 
              title="1. Placements" 
              description="Align the tooltip to any side of the trigger element."
              code={`<CustomTooltip content="Appears on the top" placement="top">
  <button>Top</button>
</CustomTooltip>

<CustomTooltip content="Appears on the right" placement="right">
  <button>Right</button>
</CustomTooltip>`}
            >
              <div className="flex flex-wrap gap-8 items-center justify-center pt-8 pb-4">
                <CustomTooltip content="Appears on the top" placement="top">
                  <button className="px-6 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm">Top</button>
                </CustomTooltip>

                <CustomTooltip content="Appears on the bottom" placement="bottom">
                  <button className="px-6 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm">Bottom</button>
                </CustomTooltip>

                <CustomTooltip content="Appears on the left" placement="left">
                  <button className="px-6 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm">Left</button>
                </CustomTooltip>

                <CustomTooltip content="Appears on the right" placement="right">
                  <button className="px-6 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm">Right</button>
                </CustomTooltip>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* 2. Themes & Triggers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Section 
                title="2. Visual Themes" 
                description="Support for Dark (default) and Light themes."
                code={`<CustomTooltip content="I'm the default dark theme" theme="dark">
  <span>Hover for Dark</span>
</CustomTooltip>

<CustomTooltip content="I'm the clean light theme" theme="light">
  <span>Hover for Light</span>
</CustomTooltip>`}
              >
                <div className="flex gap-4 items-center">
                  <CustomTooltip content="I'm the default dark theme" theme="dark">
                    <span className="px-3 py-1 rounded bg-slate-100 text-slate-600 text-sm cursor-pointer hover:bg-slate-200 transition-colors">Hover for Dark</span>
                  </CustomTooltip>
                  <CustomTooltip content="I'm the clean light theme" theme="light">
                    <span className="px-3 py-1 rounded bg-slate-100 text-slate-600 text-sm cursor-pointer hover:bg-slate-200 transition-colors">Hover for Light</span>
                  </CustomTooltip>
                </div>
              </Section>
              
              <Section 
                title="3. Interactive Triggers" 
                description="Trigger on hover (default) or on click."
                code={`<CustomTooltip content="Hover logic is standard" trigger="hover">
  <button>Hover me</button>
</CustomTooltip>

<CustomTooltip content="Click outside to close this" trigger="click">
  <button>Click me</button>
</CustomTooltip>`}
              >
                <div className="flex gap-4 items-center">
                  <CustomTooltip content="Hover logic is standard" trigger="hover">
                    <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Hover me</button>
                  </CustomTooltip>
                  <CustomTooltip content="Click outside to close this" trigger="click">
                    <button className="px-4 py-2 border rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-black transition-colors shadow-lg shadow-slate-200">Click me</button>
                  </CustomTooltip>
                </div>
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            {/* 3. Real World Example */}
            <Section 
              title="4. Complex Content" 
              description="Tooltips can wrap any component and show rich fallback info."
              code={`<CustomTooltip content="John Doe (Online)" placement="right" theme="light">
  <div>
    <CustomAvatar initials="JD" size="lg" status="online" />
  </div>
</CustomTooltip>

<CustomTooltip content="Minimalist style, no arrow." showArrow={false}>
  <div>?</div>
</CustomTooltip>`}
            >
              <div className="flex gap-12 items-center">
                <div className="flex items-center gap-4">
                  <CustomTooltip content="John Doe (Online)" placement="right" theme="light">
                    <div className="cursor-pointer">
                      <CustomAvatar initials="JD" size="lg" status="online" />
                    </div>
                  </CustomTooltip>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">User Profile</span>
                    <span className="text-sm text-slate-500">Hover avatar for status</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <CustomTooltip content="Minimalist style, no arrow." showArrow={false}>
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white cursor-help shadow-lg">
                      ?
                    </div>
                  </CustomTooltip>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">No Arrow</span>
                    <span className="text-sm text-slate-500">Cleaner minimalist look</span>
                  </div>
                </div>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
