"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastProvider } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

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

function ToastDemoContent() {
  const { toast } = useToast();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-4xl font-black tracking-tight text-slate-900">
          Toast
        </h2>
        <p className="text-lg text-slate-500">
          Temporary notification messages that auto-dismiss.
        </p>
      </div>
      <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
        <div className="space-y-4">
          <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
            Basic Toast
          </Label>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="default"
              onClick={() => {
                toast({
                  title: "Success!",
                  description: "Your action was completed successfully.",
                });
              }}
            >
              Show Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Scheduled: Catch up",
                  description: "Friday, February 10, 2024 at 5:57 PM",
                  action: <ToastAction>Try again</ToastAction>,
                });
              }}
            >
              With Action
            </Button>
          </div>
        </div>
        <Separator className="bg-slate-100" />
        <div className="space-y-4">
          <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
            Toast Variants
          </Label>
          <div className="grid gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700 justify-start h-auto py-4 px-6"
              onClick={() => {
                toast({
                  title: "Success",
                  description: "Operation completed successfully!",
                });
              }}
            >
              <CheckCircle className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-bold">Success Toast</div>
                <div className="text-xs opacity-80">Green success notification</div>
              </div>
            </Button>
            <Button
              variant="destructive"
              className="justify-start h-auto py-4 px-6"
              onClick={() => {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Something went wrong. Please try again.",
                });
              }}
            >
              <XCircle className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-bold">Error Toast</div>
                <div className="text-xs opacity-80">Red error notification</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-4 px-6"
              onClick={() => {
                toast({
                  title: "Information",
                  description: "Here's some useful information.",
                });
              }}
            >
              <Info className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-bold">Info Toast</div>
                <div className="text-xs opacity-80">Blue info notification</div>
              </div>
            </Button>
          </div>
        </div>

        <CodeBlock
          code={`import { useToast } from "onebi-ui";

export default function ToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Success!",
          description: "Your action was completed.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}`}
        />
      </div>
    </div>
  );
}

export default function ToastPage() {
  return (
    <ToastProvider>
      <div className="p-12 lg:p-24">
        <Toaster />
        <div className="max-w-5xl mx-auto pb-24">
          <ToastDemoContent />
        </div>
      </div>
    </ToastProvider>
  );
}
