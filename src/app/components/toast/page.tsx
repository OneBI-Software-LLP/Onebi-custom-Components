"use client";

import React from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import type { ToastVariant, ToastPosition } from "@/components/ui/toast";

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

  const positions: ToastPosition[] = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const variants: ToastVariant[] = ["default", "success", "warning", "danger"];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Toast Component</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
          Interactive Variants
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
          Positioning Preview
        </h2>
        <div className="bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-12 relative min-h-[400px] flex items-center justify-center">
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
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
          Component Usage
        </h2>
        <div className="bg-slate-950 text-slate-50 p-6 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
{`import { toast } from "@/hooks/use-toast";

// Simple usage
toast({
  title: "Success",
  description: "Account created successfully!",
  variant: "success",
  position: "top-right",
});`}
          </pre>
        </div>
      </section>
    </div>
  );
}
