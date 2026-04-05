"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

export default function AvatarPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Avatar
            </h2>
            <p className="text-lg text-slate-500">
              User profile images with fallback initials.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Avatar
              </Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-[3px] border-white ring-4 ring-indigo-50 shadow-lg">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">Shadcn</span>
                  <span className="text-xs text-slate-400 italic leading-none">@shadcnui</span>
                </div>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Sizes
              </Label>
              <div className="flex items-end gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                  <AvatarFallback className="text-xs">SM</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://i.pravatar.cc/150?u=2" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://i.pravatar.cc/150?u=3" />
                  <AvatarFallback className="text-lg">LG</AvatarFallback>
                </Avatar>
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://i.pravatar.cc/150?u=4" />
                  <AvatarFallback className="text-xl">XL</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Avatar Group
              </Label>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="h-12 w-12 border-2 border-white shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 10}`} />
                    <AvatarFallback className="bg-slate-200">U{i}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="h-12 w-12 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500 z-10 shadow-sm">
                  +12
                </div>
              </div>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                With Status Indicator
              </Label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://i.pravatar.cc/150?u=20" />
                    <AvatarFallback>OL</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://i.pravatar.cc/150?u=21" />
                    <AvatarFallback>Away</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://i.pravatar.cc/150?u=22" />
                    <AvatarFallback>Busy</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { Avatar, AvatarFallback, AvatarImage } from "onebi-ui";

export default function AvatarDemo() {
  return (
    <div className="space-y-4">
      {/* Basic avatar */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Sizes */}
      <Avatar className="h-8 w-8">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>

      {/* Avatar group */}
      <div className="flex -space-x-4">
        <Avatar><AvatarImage src="..." /></Avatar>
        <Avatar><AvatarImage src="..." /></Avatar>
        <div className="h-10 w-10 rounded-full bg-slate-100">+5</div>
      </div>

      {/* With status */}
      <div className="relative">
        <Avatar>
          <AvatarImage src="..." />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </div>
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
