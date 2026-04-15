"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CustomBadge from "@/components/CustomBadge";
import CustomAvatar from "@/components/CustomAvatar";
import { Bell, Mail, Users, Check, AlertTriangle, XCircle, Info } from "lucide-react";

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
              Dynamic status indicators, semantic labels, and notification overlays.
            </p>
          </div>
          
          <div className="grid gap-10 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            {/* 1. Variants & Colors */}
            <Section 
              title="1. Variants & Colors" 
              description="Solid, Subtile, and Outline styles for every semantic context."
              code={`import CustomBadge from "@/components/CustomBadge";

<CustomBadge variant="solid" color="primary">Solid Primary</CustomBadge>
<CustomBadge variant="subtle" color="success">Approved</CustomBadge>
<CustomBadge variant="outline" color="danger">Rejected</CustomBadge>`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-3">
                  <CustomBadge variant="solid" color="primary">Solid Primary</CustomBadge>
                  <CustomBadge variant="solid" color="success">Success</CustomBadge>
                  <CustomBadge variant="solid" color="warning">Warning</CustomBadge>
                  <CustomBadge variant="solid" color="danger">Danger</CustomBadge>
                  <CustomBadge variant="solid" color="neutral">Neutral</CustomBadge>
                </div>
                <div className="flex flex-wrap gap-3">
                  <CustomBadge variant="subtle" color="primary">Subtle Primary</CustomBadge>
                  <CustomBadge variant="subtle" color="success">Approved</CustomBadge>
                  <CustomBadge variant="subtle" color="warning">Pending</CustomBadge>
                  <CustomBadge variant="subtle" color="danger">Failed</CustomBadge>
                  <CustomBadge variant="subtle" color="neutral">Draft</CustomBadge>
                </div>
                <div className="flex flex-wrap gap-3">
                  <CustomBadge variant="outline" color="primary">Outline Blue</CustomBadge>
                  <CustomBadge variant="outline" color="success">Success</CustomBadge>
                  <CustomBadge variant="outline" color="danger">Rejected</CustomBadge>
                </div>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* 2. Sizes & Shapes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Section 
                title="2. Sizes" 
                description="Scalable from sm to lg."
                code={`<CustomBadge size="lg" color="danger">Large</CustomBadge>`}
              >
                <div className="flex items-center gap-4">
                  <CustomBadge size="sm" color="primary">Small</CustomBadge>
                  <CustomBadge size="md" color="success">Medium</CustomBadge>
                  <CustomBadge size="lg" color="danger">Large</CustomBadge>
                </div>
              </Section>
              
              <Section 
                title="3. Geometric Shapes" 
                description="Pill (default), Rounded, and Square."
                code={`<CustomBadge shape="square" color="danger">Square</CustomBadge>`}
              >
                <div className="flex items-center gap-4">
                  <CustomBadge shape="pill" color="neutral">Pill Shape</CustomBadge>
                  <CustomBadge shape="rounded" color="primary">Rounded</CustomBadge>
                  <CustomBadge shape="square" color="danger">Square</CustomBadge>
                </div>
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            {/* 3. Overlay Notifications */}
            <Section 
              title="4. Overlay & Status Dots" 
              description="Absolute positioning for notification counts and status indicators."
              code={`import { Bell } from "lucide-react";
import CustomBadge from "@/components/CustomBadge";

{/* Notification overlay */}
<div className="relative inline-flex p-3">
  <Bell className="w-6 h-6 text-slate-600" />
  <CustomBadge position="top-right" color="danger" variant="solid" size="sm">
    8
  </CustomBadge>
</div>

{/* Status dot */}
<div className="relative">
  <img src="..." className="rounded-full" />
  <CustomBadge position="bottom-right" isDot color="success" size="lg" />
</div>`}
            >
              <div className="flex flex-wrap gap-12 items-center pt-4 pb-4">
                
                {/* Notification Count */}
                <div className="relative inline-flex p-3 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                  <Bell className="w-6 h-6 text-slate-600" />
                  <CustomBadge position="top-right" color="danger" variant="solid" size="sm" className="ring-2 ring-white">
                    8
                  </CustomBadge>
                </div>

                {/* Unread Dot */}
                <div className="relative inline-flex items-center gap-2 px-4 py-2 border border-slate-900 bg-slate-900 text-white rounded-xl shadow-lg ring-offset-2 hover:bg-black transition-all cursor-pointer group">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-semibold">Inbox</span>
                  <CustomBadge position="top-right" isDot color="primary" size="md" className="ring-2 ring-white" />
                </div>

                {/* Avatar Status */}
                <div className="relative">
                   <CustomAvatar initials="JD" size="lg" />
                   <CustomBadge position="bottom-right" isDot color="success" size="lg" className="ring-4 ring-white shadow-none" />
                </div>

                {/* Team Group Count */}
                <div className="relative inline-flex p-3 bg-indigo-50 border border-indigo-100 rounded-full">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <CustomBadge position="top-right" color="primary" variant="solid" size="sm" className="ring-2 ring-white px-2">
                    +12
                  </CustomBadge>
                </div>

              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* 4. Semantic Examples */}
            <Section 
              title="5. Semantic Status" 
              description="Common patterns for system feedback."
              code={`import { Check } from "lucide-react";
              
<CustomBadge variant="subtle" color="success" className="gap-1.5 pl-2 pr-3">
  <Check className="w-3.5 h-3.5" />
  Payment Success
</CustomBadge>`}
            >
              <div className="flex flex-wrap gap-4">
                <CustomBadge variant="subtle" color="success" className="gap-1.5 pl-2 pr-3">
                  <Check className="w-3.5 h-3.5" />
                  Payment Success
                </CustomBadge>
                <CustomBadge variant="subtle" color="warning" className="gap-1.5 pl-2 pr-3">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Attention
                </CustomBadge>
                <CustomBadge variant="subtle" color="danger" className="gap-1.5 pl-2 pr-3">
                  <XCircle className="w-3.5 h-3.5" />
                  Connection Error
                </CustomBadge>
                <CustomBadge variant="subtle" color="primary" className="gap-1.5 pl-2 pr-3">
                  <Info className="w-3.5 h-3.5" />
                  Update available
                </CustomBadge>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
