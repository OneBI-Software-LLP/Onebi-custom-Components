"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar-context";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { LayoutDashboard, Users, Settings, FolderOpen, BarChart3, Mail, PanelLeftClose, PanelLeftOpen } from "lucide-react";

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

interface SidebarNavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  badge?: string;
}

function DemoSidebar({ collapsed }: { collapsed: boolean }) {
  const navItems: SidebarNavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#" },
    { icon: Users, label: "Team Members", href: "#" },
    { icon: FolderOpen, label: "Projects", href: "#", badge: "12" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Mail, label: "Messages", href: "#", badge: "3" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  if (collapsed) {
    return (
      <div className="w-16 bg-slate-900 text-slate-300 flex flex-col rounded-xl overflow-hidden">
        <div className="p-3 flex items-center justify-center border-b border-slate-700">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            O
          </div>
        </div>
        <nav className="flex-1 py-3 space-y-1">
          {navItems.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-center py-2.5 px-2 hover:bg-slate-800 transition-colors"
            >
              <item.icon className="h-5 w-5" />
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className="w-60 bg-slate-900 text-slate-300 flex flex-col rounded-xl overflow-hidden">
      <div className="p-4 flex items-center gap-3 border-b border-slate-700">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          O
        </div>
        <span className="font-bold text-white">Onebi App</span>
      </div>
      <nav className="flex-1 py-3 space-y-1 px-2">
        {navItems.map((item, i) => (
          <button
            key={i}
            className={`w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm transition-colors ${
              i === 0
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-indigo-500/30 text-indigo-200 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-slate-700">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-slate-400 truncate">john@onebi.io</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SidebarPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Sidebar
            </h2>
            <p className="text-lg text-slate-500">
              Navigation panels with collapsible menus, icons, and user profiles.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Collapsed & Expanded states
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500">Collapsed (Icon-only)</Label>
                  <div className="h-80 flex justify-center">
                    <DemoSidebar collapsed />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500">Expanded (Full)</Label>
                  <div className="h-80 flex justify-center">
                    <DemoSidebar collapsed={false} />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Light Variant
              </Label>
              <div className="h-80 flex justify-center">
                <div className="w-60 bg-white border border-slate-200 text-slate-600 flex flex-col rounded-xl overflow-hidden shadow-sm">
                  <div className="p-4 flex items-center gap-3 border-b border-slate-100">
                    <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      O
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Onebi UI</p>
                      <p className="text-[10px] text-slate-400">Component Library</p>
                    </div>
                  </div>
                  <nav className="flex-1 py-3 space-y-1 px-2">
                    {[
                      { icon: LayoutDashboard, label: "Dashboard", active: true },
                      { icon: Users, label: "Team" },
                      { icon: FolderOpen, label: "Projects" },
                      { icon: BarChart3, label: "Analytics" },
                      { icon: Settings, label: "Settings" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg text-sm transition-colors ${
                          item.active
                            ? "bg-indigo-50 text-indigo-700"
                            : "hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { SidebarProvider, useSidebar } from "onebi-ui";
import { AppSidebar } from "onebi-ui";

export default function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
