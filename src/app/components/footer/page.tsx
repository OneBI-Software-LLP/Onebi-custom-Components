"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Footer,
  FooterSection,
  FooterBrand,
  FooterLinks,
  FooterSocial,
  FooterVariant,
  FooterColor,
  FooterSize,
} from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Linkedin,
  Send,
} from "lucide-react";

const CodeBlock = ({ code, language, onToggle }: { code: string; language: "JS" | "TS"; onToggle: () => void }) => (
  <div className="mt-10 border-t border-slate-100 pt-8">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        Installation & Usage
      </Label>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
          <button
            onClick={onToggle}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              language === "JS"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            JS
          </button>
          <button
            onClick={onToggle}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              language === "TS"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            TS
          </button>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] bg-slate-50 text-slate-500 font-mono tracking-widest border-slate-200"
        >
          npm i onebi-ui
        </Badge>
      </div>
    </div>
    <pre className="p-5 rounded-2xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[13px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

function SimpleFooter() {
  return (
    <Footer variant="simple" color="default" layout="horizontal" size="md">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
          O
        </div>
        <span className="text-sm">
          &copy; 2026 Onebi UI. All rights reserved.
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#" className="text-sm hover:opacity-80 transition-colors">Privacy</a>
        <a href="#" className="text-sm hover:opacity-80 transition-colors">Terms</a>
        <a href="#" className="text-sm hover:opacity-80 transition-colors">Support</a>
      </div>
    </Footer>
  );
}

function MultiColumnFooter() {
  return (
    <Footer variant="dark" color="default" layout="grid" size="lg">
      <FooterSection>
        <FooterBrand
          name="Onebi UI"
          description="A modern component library for building beautiful web applications."
        />
        <div className="flex gap-3 mt-4">
          <a href="#" className="p-2 rounded-lg transition-colors bg-slate-800 hover:bg-slate-700">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="#" className="p-2 rounded-lg transition-colors bg-slate-800 hover:bg-slate-700">
            <Github className="h-4 w-4" />
          </a>
          <a href="#" className="p-2 rounded-lg transition-colors bg-slate-800 hover:bg-slate-700">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </FooterSection>
      <FooterSection>
        <h4 className="font-semibold text-white text-sm mb-3">Product</h4>
        <ul className="space-y-2">
          {["Features", "Pricing", "Changelog", "Docs"].map((item) => (
            <li key={item}>
              <a href="#" className="text-sm hover:text-white transition-colors">{item}</a>
            </li>
          ))}
        </ul>
      </FooterSection>
      <FooterSection>
        <h4 className="font-semibold text-white text-sm mb-3">Company</h4>
        <ul className="space-y-2">
          {["About", "Blog", "Careers", "Press"].map((item) => (
            <li key={item}>
              <a href="#" className="text-sm hover:text-white transition-colors">{item}</a>
            </li>
          ))}
        </ul>
      </FooterSection>
      <FooterSection>
        <h4 className="font-semibold text-white text-sm mb-3">Stay Updated</h4>
        <p className="text-xs mb-3">Get the latest updates on new features.</p>
        <div className="flex gap-2">
          <Input
            placeholder="Email address"
            className="h-9 text-sm bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
          <Button size="sm" className="h-9 px-3">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </FooterSection>
    </Footer>
  );
}

function CenteredFooter() {
  return (
    <Footer variant="light" color="default" layout="centered" size="lg">
      <FooterBrand
        name="Onebi UI"
        description="Building the future of web interfaces, one component at a time."
      />
      <div className="flex items-center justify-center gap-6">
        {["Home", "About", "Blog", "Docs", "GitHub"].map((item) => (
          <a key={item} href="#" className="text-sm hover:opacity-80 transition-colors">
            {item}
          </a>
        ))}
      </div>
      <FooterSocial
        links={[
          { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
          { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
          { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com", label: "Facebook" },
          { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
        ]}
      />
      <p className="text-xs">Made with care by the Onebi team &middot; &copy; 2026</p>
    </Footer>
  );
}

// New: Colored Footer Examples
function GradientFooter() {
  return (
    <Footer variant="dark" color="primary" layout="grid" size="lg">
      <FooterSection>
        <FooterBrand
          name="Onebi UI"
          description="A modern component library for building beautiful web applications."
        />
        <FooterSocial
          color="primary"
          links={[
            { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com", label: "Twitter" },
            { icon: <Github className="h-4 w-4" />, href: "https://github.com", label: "GitHub" },
            { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com", label: "LinkedIn" },
          ]}
        />
      </FooterSection>
      <FooterSection>
        <FooterLinks
          color="primary"
          title="Product"
          links={[
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "Docs", href: "/docs" },
            { label: "Changelog", href: "/changelog" },
          ]}
        />
      </FooterSection>
      <FooterSection>
        <FooterLinks
          color="primary"
          title="Company"
          links={[
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" },
          ]}
        />
      </FooterSection>
      <FooterSection>
        <FooterLinks
          color="primary"
          title="Legal"
          links={[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Support", href: "/support" },
            { label: "Contact", href: "/contact" },
          ]}
        />
      </FooterSection>
    </Footer>
  );
}

function BorderedFooter() {
  return (
    <Footer variant="bordered" color="success" layout="horizontal" size="md">
      <FooterBrand name="Onebi UI" description="Building better web interfaces" />
      <div className="flex items-center gap-6">
        <FooterLinks
          color="success"
          links={[
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "Docs", href: "/docs" },
          ]}
        />
      </div>
      <FooterSocial
        color="success"
        links={[
          { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com", label: "Twitter" },
          { icon: <Github className="h-4 w-4" />, href: "https://github.com", label: "GitHub" },
        ]}
      />
    </Footer>
  );
}

export default function FooterPage() {
  const [showJS, setShowJS] = useState(true);

  const jsCode = `import { Footer, FooterBrand, FooterLinks, FooterSocial } from "@/components/ui/footer";
import { Twitter, Github } from "lucide-react";

// Simple footer with color
<Footer variant="simple" color="default" layout="horizontal" size="md">
  <FooterBrand name="Onebi UI" description="A modern component library" />
  <FooterLinks
    links={[
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" }
    ]}
  />
  <FooterSocial
    links={[
      { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com" },
      { icon: <Github className="h-4 w-4" />, href: "https://github.com" }
    ]}
  />
</Footer>

// Gradient footer with primary color
<Footer variant="gradient" color="primary" layout="centered" size="lg">
  <FooterBrand name="Onebi UI" />
  <FooterLinks color="primary" links={[...]} />
  <FooterSocial color="primary" links={[...]} />
</Footer>`;

  const tsCode = `import { 
  Footer, 
  FooterBrand, 
  FooterLinks, 
  FooterSocial,
  FooterVariant,
  FooterColor,
  FooterSize,
} from "@/components/ui/footer";
import { Twitter, Github } from "lucide-react";

interface LinkItem {
  label: string;
  href: string;
}

interface SocialItem {
  icon: React.ReactNode;
  href: string;
  label?: string;
}

export default function AppFooter() {
  const links: LinkItem[] = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" }
  ];

  const social: SocialItem[] = [
    { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com" },
    { icon: <Github className="h-4 w-4" />, href: "https://github.com" }
  ];

  return (
    <Footer 
      variant="simple" 
      color="default" 
      layout="horizontal"
      size="md"
    >
      <FooterBrand
        name="Onebi UI"
        description="A modern component library"
      />
      <FooterLinks links={links} />
      <FooterSocial links={social} />
    </Footer>
  );
}

// Available props:
// variant: 'simple' | 'dark' | 'light' | 'gradient' | 'bordered' | 'minimal'
// color: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
// layout: 'horizontal' | 'grid' | 'centered' | 'stacked'
// size: 'sm' | 'md' | 'lg' | 'xl'`;

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

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Dark Footer (Primary)
              </Label>
              <GradientFooter />
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Bordered Footer (Success)
              </Label>
              <BorderedFooter />
            </div>

            <CodeBlock
              code={showJS ? jsCode : tsCode}
              language={showJS ? "JS" : "TS"}
              onToggle={() => setShowJS(!showJS)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
