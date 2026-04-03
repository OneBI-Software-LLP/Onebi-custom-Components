"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Bell, Settings, User, Mail, Info, Share2, MoreHorizontal, Copy, ExternalLink } from "lucide-react";

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

export default function PopoverPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Popover
            </h2>
            <p className="text-lg text-slate-500">
              Floating panels that display rich content in context with trigger elements.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Popover
              </Label>
              <div className="flex flex-wrap gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Info className="mr-2 h-4 w-4" />
                      Click for info
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900">About this feature</h4>
                      <p className="text-sm text-slate-600">
                        This popover provides additional context about the feature. It can contain any type of content including text, links, and interactive elements.
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Button size="sm" className="h-7 text-xs">Learn more</Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs">Dismiss</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900">Share this page</h4>
                      <div className="flex gap-2">
                        <Input defaultValue="https://app.onebi.io/share/abc123" readOnly className="h-8 text-xs" />
                        <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Button size="sm" variant="ghost" className="h-7 text-xs flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" /> Email
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs flex items-center gap-1.5">
                          <ExternalLink className="h-3.5 w-3.5" /> Link
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Notification Popover
              </Label>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        3
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="p-4 border-b border-slate-100">
                      <h4 className="font-semibold text-slate-900">Notifications</h4>
                      <p className="text-xs text-slate-500 mt-0.5">You have 3 unread messages</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {[
                        { title: "New comment on PR #42", time: "2 min ago", unread: true },
                        { title: "Deployment successful", time: "1 hour ago", unread: true },
                        { title: "Weekly report ready", time: "3 hours ago", unread: true },
                        { title: "Sprint review scheduled", time: "Yesterday", unread: false },
                      ].map((notif, i) => (
                        <div
                          key={i}
                          className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                            notif.unread ? "border-l-2 border-indigo-500 bg-indigo-50/50" : ""
                          }`}
                        >
                          <p className="text-sm text-slate-800 font-medium">{notif.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-100">
                      <Button variant="ghost" size="sm" className="w-full h-8 text-xs">
                        View all notifications
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                User Profile Popover
              </Label>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        JD
                      </div>
                      <span>John Doe</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="end">
                    <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                          JD
                        </div>
                        <div>
                          <p className="font-semibold text-sm">John Doe</p>
                          <p className="text-xs text-white/80">john@onebi.io</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <User className="h-4 w-4 text-slate-400" /> Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <Settings className="h-4 w-4 text-slate-400" /> Settings
                      </button>
                      <div className="border-t border-slate-100 my-1" />
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <MoreHorizontal className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <CodeBlock
              code={`import { Popover, PopoverTrigger, PopoverContent } from "onebi-ui";
import { Button, Info } from "onebi-ui";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 h-4 w-4" />
          Show Details
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <h4 className="font-semibold">Popover Title</h4>
          <p className="text-sm text-slate-600">
            Rich content goes here with actions and more.
          </p>
          <Button size="sm">Action</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
