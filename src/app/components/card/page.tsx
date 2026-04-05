"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CustomCard } from "@/components/CustomCard";

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

export default function CardPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Card
            </h2>
            <p className="text-lg text-slate-500">
              Versatile container for content and actions.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Card
              </Label>
              <CustomCard
                title="Card Title"
                subtitle="This is a basic card with title, description, and some content."
                footer="Card Footer"
              >
                <p className="text-slate-600">
                  Card content goes here. This can include any type of content like
                  text, images, forms, or other components.
                </p>
              </CustomCard>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Card with Actions
              </Label>
              <CustomCard
                title="Action Card"
                subtitle="Card with action buttons"
                footer={
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                      Primary
                    </button>
                    <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg">
                      Secondary
                    </button>
                  </div>
                }
              >
                <p className="text-slate-600">
                  This card includes action buttons in the footer.
                </p>
              </CustomCard>
            </div>

            <CodeBlock
              code={`import { CustomCard } from "onebi-ui";

export default function CardDemo() {
  return (
    <CustomCard
      title="Card Title"
      description="Card description"
      footer="Card Footer"
    >
      <p>Card content goes here.</p>
    </CustomCard>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
