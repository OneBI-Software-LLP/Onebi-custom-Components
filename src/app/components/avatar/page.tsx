"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CustomAvatar from "@/components/CustomAvatar";

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

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4 mt-8 first:mt-0">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {title}
      </Label>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
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
            <div>
              <SectionTitle title="1. Standard Images with Status" subtitle="Different sizes with availability indicators." />
              <div className="flex gap-6 items-end">
                <CustomAvatar src="https://i.pravatar.cc/150?img=32" size="sm" status="online" />
                <CustomAvatar src="https://i.pravatar.cc/150?img=47" size="md" status="busy" />
                <CustomAvatar src="https://i.pravatar.cc/150?img=68" size="lg" status="away" />
                <CustomAvatar src="https://i.pravatar.cc/150?img=12" size="xl" status="offline" />
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* 2. Initials Fallback */}
            <div>
              <SectionTitle title="2. Fallback Mechanism" subtitle="Automatically shows initials if the image fails to load." />
              <div className="flex gap-6 items-end">
                {/* Broken link trigger */}
                <CustomAvatar src="https://broken-link.com/img.jpg" initials="JD" size="md" />
                <CustomAvatar initials="AW" size="lg" status="online" />
                <CustomAvatar initials="MS" size="xl" shape="rounded" statusPosition="top-right" status="busy"/>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* 3. Shapes */}
            <div>
              <SectionTitle title="3. Geometric Shapes" subtitle="Visual styles: Circle, Rounded (2XL), and Square." />
              <div className="flex gap-6 items-center">
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
            </div>

            <Separator className="bg-slate-100" />

            {/* 4. Interactive */}
            <div>
              <SectionTitle title="4. Interactive Buttons" subtitle="Avatars can act as triggers with hover effects." />
              <div className="flex items-center gap-4">
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
            </div>

            <CodeBlock
              code={`import CustomAvatar from "@/components/CustomAvatar";

export default function App() {
  return (
    <div className="flex gap-4">
      {/* Standard Image */}
      <CustomAvatar 
        src="https://pravatar.cc/150" 
        size="md" 
        status="online" 
      />

      {/* Fallback to Initials */}
      <CustomAvatar 
        initials="JD" 
        size="lg" 
        shape="rounded" 
        status="busy" 
      />
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
