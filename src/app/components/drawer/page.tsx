"use client";

import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings, PanelLeftOpen } from "lucide-react";

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

export default function DrawerPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Drawer
            </h2>
            <p className="text-lg text-slate-500">
              Slide-out panel for additional content and settings.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Drawer
              </Label>
              <div className="flex gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="h-14 px-8 rounded-2xl bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-200">
                      <PanelLeftOpen className="h-4 w-4 mr-2" />
                      Open Right Drawer
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[450px] border-l-border/30 shadow-2xl p-0">
                    <div className="h-full flex flex-col p-8 bg-white">
                      <SheetHeader className="mb-8 text-left">
                        <SheetTitle className="text-2xl font-black text-slate-900 tracking-tighter">Settings Panel</SheetTitle>
                        <SheetDescription className="text-slate-500">Manage your application preferences.</SheetDescription>
                      </SheetHeader>
                      <div className="flex-1 space-y-6">
                        <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                          <Label className="text-xs font-bold text-slate-500 block mb-4">SYSTEM STATUS</Label>
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200" />
                            <span className="text-sm font-bold text-slate-700">All systems operational</span>
                          </div>
                        </div>
                        <Separator className="bg-slate-100" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-bold text-slate-800">Debug Mode</Label>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-bold text-slate-800">Auto-Refresh</Label>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Drawer Positions
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-12">Left Drawer</Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Left Panel</SheetTitle>
                      <SheetDescription>This drawer slides in from the left.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-8">
                      <p className="text-sm text-slate-600">Left drawer content goes here.</p>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-12">Right Drawer</Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Right Panel</SheetTitle>
                      <SheetDescription>This drawer slides in from the right.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-8">
                      <p className="text-sm text-slate-600">Right drawer content goes here.</p>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-12">Top Drawer</Button>
                  </SheetTrigger>
                  <SheetContent side="top" className="h-[300px]">
                    <SheetHeader>
                      <SheetTitle>Top Panel</SheetTitle>
                      <SheetDescription>This drawer slides in from the top.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-8">
                      <p className="text-sm text-slate-600">Top drawer content goes here.</p>
                    </div>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-12">Bottom Drawer</Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[300px]">
                    <SheetHeader>
                      <SheetTitle>Bottom Panel</SheetTitle>
                      <SheetDescription>This drawer slides in from the bottom.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-8">
                      <p className="text-sm text-slate-600">Bottom drawer content goes here.</p>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <CodeBlock
              code={`import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "onebi-ui";
import { Button } from "onebi-ui";

export default function DrawerDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your settings here.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <p>Your content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
