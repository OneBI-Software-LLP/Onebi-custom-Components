"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Mail, MapPin, Phone, Facebook, Linkedin, Send } from "lucide-react";

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

function SimpleFooter() {
  return (
    <footer className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            O
          </div>
          <span className="text-sm text-slate-600">
            &copy; 2026 Onebi UI. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}

function MultiColumnFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 rounded-xl p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              O
            </div>
            <span className="font-bold text-white">Onebi UI</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            A modern component library for building beautiful web applications.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm mb-3">Product</h4>
          <ul className="space-y-2">
            {["Features", "Pricing", "Changelog", "Docs"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm mb-3">Company</h4>
          <ul className="space-y-2">
            {["About", "Blog", "Careers", "Press"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white text-sm mb-3">Stay Updated</h4>
          <p className="text-xs text-slate-400 mb-3">Get the latest updates on new features.</p>
          <div className="flex gap-2">
            <Input
              placeholder="Email address"
              className="h-9 text-sm bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
            <Button size="sm" className="h-9 px-3">
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">&copy; 2026 Onebi UI. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" /> hello@onebi.io
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> San Francisco, CA
          </span>
        </div>
      </div>
    </footer>
  );
}

function CenteredFooter() {
  return (
    <footer className="bg-white border border-slate-200 rounded-xl p-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          O
        </div>
        <span className="font-bold text-slate-900">Onebi UI</span>
      </div>
      <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
        Building the future of web interfaces, one component at a time.
      </p>
      <div className="flex items-center justify-center gap-6 mb-6">
        {["Home", "About", "Blog", "Docs", "GitHub"].map((item) => (
          <a key={item} href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
          <Twitter className="h-5 w-5" />
        </a>
        <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
          <Github className="h-5 w-5" />
        </a>
        <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
          <Facebook className="h-5 w-5" />
        </a>
        <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
      <p className="text-xs text-slate-400">Made with care by the Onebi team &middot; &copy; 2026</p>
    </footer>
  );
}

export default function FooterPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Footer
            </h2>
            <p className="text-lg text-slate-500">
              Site footers with navigation, social links, newsletters, and branding.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Simple Footer
              </Label>
              <SimpleFooter />
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Multi-Column Footer
              </Label>
              <MultiColumnFooter />
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Centered Footer
              </Label>
              <CenteredFooter />
            </div>

            <CodeBlock
              code={`export default function AppFooter() {
  return (
    <footer className="bg-slate-50 border-t px-6 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-sm text-slate-600">
            &copy; 2026 Onebi UI. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900">
            Privacy
          </a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900">
            Terms
          </a>
          <a href="#" className="text-sm text-slate-500 hover:text-slate-900">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
