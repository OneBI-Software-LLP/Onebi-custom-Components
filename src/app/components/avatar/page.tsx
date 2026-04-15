"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

export default function AvatarPage() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Avatar
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive profile image component with fallback initials, availability statuses, and multiple geometric shapes.
            </p>
          </div>
          
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            {/* 1. Standard Images with Status */}
            <Section 
              title="1. Standard Images with Status" 
              description="Different sizes with availability indicators."
              code={`<CustomAvatar src="https://i.pravatar.cc/150?img=32" size="sm" status="online" />
<CustomAvatar src="https://i.pravatar.cc/150?img=47" size="md" status="busy" />
<CustomAvatar src="https://i.pravatar.cc/150?img=68" size="lg" status="away" />
<CustomAvatar src="https://i.pravatar.cc/150?img=12" size="xl" status="offline" />`}
            >
              <div className="flex gap-6 items-end mt-4">
                <CustomAvatar src="https://i.pravatar.cc/150?img=32" size="sm" status="online" />
                <CustomAvatar src="https://i.pravatar.cc/150?img=47" size="md" status="busy" />
                <CustomAvatar src="https://i.pravatar.cc/150?img=68" size="lg" status="away" />
                <CustomAvatar src="https://i.pravatar.cc/150?img=12" size="xl" status="offline" />
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* 2. Initials Fallback */}
            <Section 
              title="2. Fallback Mechanism" 
              description="Automatically shows initials if the image fails to load."
              code={`<CustomAvatar src="https://broken-link.com/img.jpg" initials="JD" size="md" />
<CustomAvatar initials="AW" size="lg" status="online" />
<CustomAvatar initials="MS" size="xl" shape="rounded" statusPosition="top-right" status="busy" />`}
            >
              <div className="flex gap-6 items-end mt-4">
                {/* Broken link trigger */}
                <CustomAvatar src="https://broken-link.com/img.jpg" initials="JD" size="md" />
                <CustomAvatar initials="AW" size="lg" status="online" />
                <CustomAvatar initials="MS" size="xl" shape="rounded" statusPosition="top-right" status="busy"/>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* 3. Shapes */}
            <Section 
              title="3. Geometric Shapes" 
              description="Visual styles: Circle, Rounded (2XL), and Square."
              code={`<CustomAvatar initials="C" shape="circle" size="lg" />
<CustomAvatar initials="R" shape="rounded" size="lg" />
<CustomAvatar initials="S" shape="square" size="lg" />`}
            >
              <div className="flex gap-6 items-center mt-4">
                <div className="flex flex-col items-center gap-2">
                  <CustomAvatar initials="C" shape="circle" size="lg" />
                  <span className="text-[10px] text-slate-400 font-mono">circle</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CustomAvatar initials="R" shape="rounded" size="lg" />
                  <span className="text-[10px] text-slate-400 font-mono">rounded</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CustomAvatar initials="S" shape="square" size="lg" />
                  <span className="text-[10px] text-slate-400 font-mono">square</span>
                </div>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            {/* 4. Interactive */}
            <Section 
              title="4. Interactive Buttons" 
              description="Avatars can act as triggers with hover effects."
              code={`<CustomAvatar 
  src="https://i.pravatar.cc/150?img=3" 
  size="lg" 
  onClick={() => console.log('Avatar clicked!')} 
  status="online"
/>`}
            >
              <div className="flex items-center gap-4 mt-4">
                <CustomAvatar 
                  src="https://i.pravatar.cc/150?img=3" 
                  size="lg" 
                  onClick={() => setClickCount(c => c + 1)} 
                  status="online"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">Click the Avatar</span>
                  <span className="text-sm text-slate-500">Clicked {clickCount} times</span>
                </div>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
