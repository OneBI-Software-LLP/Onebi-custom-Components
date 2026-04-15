"use client";

import React from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ToastVariant, ToastPosition } from "@/components/ui/toast";

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

export default function ToastPage() {
  const showToast = (variant: ToastVariant, position: ToastPosition = "bottom-right") => {
    toast({
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: `This is a ${variant} notification shown at ${position}.`,
      variant,
      position,
      duration: 30000, // 30 seconds for verification
    });
  };

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Toast Component
            </h2>
            <p className="text-lg text-slate-500">
              Non-intrusive notifications for temporary feedback layered above your UI.
            </p>
          </div>
          
          <div className="grid gap-10 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <Section 
              title="1. Interactive Variants" 
              description="Different semantic statuses corresponding to system results."
              code={`import { toast } from "@/hooks/use-toast";

<Button onClick={() => toast({
  title: "Success",
  description: "Account created successfully!",
  variant: "success",
  position: "bottom-right",
})}>
  Show Toast
</Button>`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Button onClick={() => showToast("default")} variant="outline" className="w-full">
                  Default Toast
                </Button>
                <Button onClick={() => showToast("success")} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Success Toast
                </Button>
                <Button onClick={() => showToast("warning")} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  Warning Toast
                </Button>
                <Button onClick={() => showToast("danger")} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Error Toast
                </Button>
              </div>
            </Section>

            <Separator className="bg-slate-100" />

            <Section 
              title="2. Positioning Preview" 
              description="Toasts support top/bottom and left/center/right anchors out of the box."
              code={`toast({
  title: "Update",
  description: "System updated successfully.",
  variant: "default",
  position: "top-center" // 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
});`}
            >
              <div className="bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-12 relative min-h-[400px] flex items-center justify-center mt-6">
                <div className="text-slate-400 text-sm italic">Click a position to test</div>
                
                {/* Top Row */}
                <div className="absolute top-4 left-4">
                  <Button size="sm" variant="ghost" className="border border-slate-200" onClick={() => showToast("success", "top-left")}>
                    Top Left
                  </Button>
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <Button size="sm" variant="ghost" className="border border-slate-200" onClick={() => showToast("default", "top-center")}>
                    Top Center
                  </Button>
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="ghost" className="border border-slate-200" onClick={() => showToast("warning", "top-right")}>
                    Top Right
                  </Button>
                </div>

                {/* Bottom Row */}
                <div className="absolute bottom-4 left-4">
                  <Button size="sm" variant="ghost" className="border border-slate-200" onClick={() => showToast("danger", "bottom-left")}>
                    Bottom Left
                  </Button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Button size="sm" variant="ghost" className="border border-slate-200" onClick={() => showToast("default", "bottom-center")}>
                    Bottom Center
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button size="sm" variant="ghost" className="border border-slate-200" onClick={() => showToast("success", "bottom-right")}>
                    Bottom Right
                  </Button>
                </div>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
