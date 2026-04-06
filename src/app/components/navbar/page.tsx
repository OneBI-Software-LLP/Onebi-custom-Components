"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Menu, X, LayoutDashboard, Users, Settings, ChevronDown } from "lucide-react";

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

function BasicNavbar() {
  return (
    <nav className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            O
          </div>
          <span className="font-bold text-slate-900">Onebi UI</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-900">Home</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Features</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Docs</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}

function DashboardNavbar() {
  return (
    <nav className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-4">
          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search..." className="pl-9 h-9 w-64 text-sm" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <button className="flex items-center gap-2 pl-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function MobileNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 hover:bg-slate-100 rounded-lg">
            {isOpen ? <X className="h-5 w-5 text-slate-600" /> : <Menu className="h-5 w-5 text-slate-600" />}
          </button>
          <div className="w-7 h-7 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            O
          </div>
          <span className="font-bold text-slate-900">Onebi</span>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs">Sign In</Button>
          <Button size="sm" className="text-xs h-8">Sign Up</Button>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-slate-100 px-4 py-4 space-y-1">
          {[
            { label: "Home", active: true },
            { label: "Features" },
            { label: "Pricing" },
            { label: "Documentation" },
            { label: "Contact" },
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default function NavbarPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Navbar
            </h2>
            <p className="text-lg text-slate-500">
              Responsive top navigation bars with branding, links, and action items.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Marketing Navbar
              </Label>
              <BasicNavbar />
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Dashboard Navbar
              </Label>
              <DashboardNavbar />
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Mobile Responsive
              </Label>
              <MobileNavbar />
            </div>

            <CodeBlock
              code={`import { Button } from "onebi-ui";
import { Menu, Search, Bell } from "lucide-react";

export default function DashboardNav() {
  return (
    <nav className="bg-white border-b px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search..." className="pl-9" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
        <Avatar initials="JD" />
      </div>
    </nav>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
