"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CustomAccordion, { AccordionItem, useAccordion } from "@/components/CustomAccordion";

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

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4 mt-8 first:mt-0">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {title}
      </Label>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}

export default function AccordionPage() {
  const { open, setOpen, expandAll, collapseAll } = useAccordion(["faq1", "faq2", "faq3"], []);
  const [controlledOpen, setControlledOpen] = useState<string[]>(["panel1"]);

  const items = (
    <>
      <AccordionItem value="a" title="Section A" subtitle="Subtitle text">Body content goes here. Keep it brief and contextual.</AccordionItem>
      <AccordionItem value="b" title="Section B" subtitle="Subtitle text">Body content goes here. Keep it brief and contextual.</AccordionItem>
    </>
  );

  const InfoIcon = () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </svg>
  );

  const btnStyle: React.CSSProperties = {
    padding: "5px 14px", fontSize: 12, border: "0.5px solid #d3d1c7",
    borderRadius: 8, background: "transparent", cursor: "pointer",
  };

  const faqs = [
    { q: "Is there a free plan?",          a: "Yes — our free tier includes up to 3 projects and 5 team members." },
    { q: "Can I cancel anytime?",           a: "Absolutely. No lock-in contracts. Cancel from your billing page with one click." },
    { q: "Do you offer annual discounts?",  a: "Yes, annual billing saves you 20% compared to monthly." },
    { q: "Where is my data stored?",        a: "All data is stored in ISO 27001-certified data centres in the EU and US." },
  ];

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Accordion
            </h2>
            <p className="text-lg text-slate-500">
              A highly configurable, accessible React accordion component supporting variants, accents, rich headers, and an imperative API.
            </p>
          </div>
          
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 relative overflow-hidden">
            
            {/* 1. Basic Usage */}
            <SectionTitle title="1. Basic Usage" subtitle="Drop it in, pass props, done." />
            <CustomAccordion>
              <AccordionItem value="q1" title="What is this component?">
                An accessible, fully configurable accordion for React.
              </AccordionItem>
              <AccordionItem value="q2" title="Does it support TypeScript?">
                Yes! We have fully typed `CustomAccordion.tsx` ready for use.
              </AccordionItem>
              <AccordionItem value="q3" title="Any dependencies?">
                None. Zero external dependencies beyond React itself.
              </AccordionItem>
            </CustomAccordion>
            <Separator className="bg-slate-100 my-8" />

            {/* 2. Default Open & Exclusive Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <SectionTitle title="2. Default Open" subtitle="Specific items opened by default." />
                <CustomAccordion defaultOpen={["intro", "setup"]}>
                  <AccordionItem value="intro" title="Introduction" subtitle="Start here">
                    Welcome! This section is open by default.
                  </AccordionItem>
                  <AccordionItem value="setup" title="Setup" subtitle="Install & configure">
                    Copy the custom hook into your project. Use it instantly.
                  </AccordionItem>
                  <AccordionItem value="advanced" title="Advanced usage">
                    See other examples below.
                  </AccordionItem>
                </CustomAccordion>
              </div>
              <div>
                <SectionTitle title="3. Single-Open (Exclusive)" subtitle="Toggling one closes others." />
                <CustomAccordion allowMultiple={false} defaultOpen="step1">
                  <AccordionItem value="step1" title="Step 1 — Install" badge="Done" badgeColor="#1D9E75">
                    Run: npm install (or just copy the file).
                  </AccordionItem>
                  <AccordionItem value="step2" title="Step 2 — Import">
                    import CustomAccordion from '@/components/CustomAccordion';
                  </AccordionItem>
                  <AccordionItem value="step3" title="Step 3 — Use">
                    Wrap your content sections in AccordionItem with a unique value prop.
                  </AccordionItem>
                </CustomAccordion>
              </div>
            </div>
            <Separator className="bg-slate-100 my-8" />

            {/* 4. Variants */}
            <SectionTitle title="4. Variants" subtitle="Different structural styles." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <p className="text-xs mb-2 text-slate-400 font-mono">variant="default"</p>
                <CustomAccordion variant="default">{items}</CustomAccordion>
              </div>
              <div>
                <p className="text-xs mb-2 text-slate-400 font-mono">variant="flush"</p>
                <CustomAccordion variant="flush">{items}</CustomAccordion>
              </div>
              <div>
                <p className="text-xs mb-2 text-slate-400 font-mono">variant="card"</p>
                <CustomAccordion variant="card">{items}</CustomAccordion>
              </div>
              <div>
                <p className="text-xs mb-2 text-slate-400 font-mono">variant="ghost"</p>
                <CustomAccordion variant="ghost">{items}</CustomAccordion>
              </div>
              <div>
                <p className="text-xs mb-2 text-slate-400 font-mono">variant="filled" accent="blue"</p>
                <CustomAccordion variant="filled" accent="blue">{items}</CustomAccordion>
              </div>
            </div>
            <Separator className="bg-slate-100 my-8" />

            {/* 5. Icons and Positions */}
            <SectionTitle title="5. Icons & Positions" subtitle="Customize the expand/collapse indicator." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                {(["chevron", "plus", "arrow", "caret", "none"] as const).map((type) => (
                  <div key={type}>
                    <p className="text-xs mb-1 text-slate-400 font-mono">iconType="{type}"</p>
                    <CustomAccordion iconType={type}>
                      <AccordionItem value="x" title="Click to toggle">Content for this icon variant.</AccordionItem>
                    </CustomAccordion>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs mb-2 text-slate-400 font-mono">iconPosition="left"</p>
                <CustomAccordion iconPosition="left" iconType="chevron" accent="purple">
                  <AccordionItem value="a" title="Notifications" subtitle="Manage your alerts">
                    Configure when and how you receive notifications from this app.
                  </AccordionItem>
                  <AccordionItem value="b" title="Privacy" subtitle="Data and permissions">
                    Control what data is collected and who can see your profile.
                  </AccordionItem>
                  <AccordionItem value="c" title="Appearance" subtitle="Themes and display">
                    Switch between light and dark mode, adjust font size, and more.
                  </AccordionItem>
                </CustomAccordion>
              </div>
            </div>
            <Separator className="bg-slate-100 my-8" />

            {/* 6. Sizes and Accents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <SectionTitle title="6. Sizes" subtitle="sm, md, and lg." />
                <div className="flex flex-col gap-4">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <div key={s}>
                      <p className="text-xs mb-2 text-slate-400 font-mono">size="{s}"</p>
                      <CustomAccordion size={s}>
                        <AccordionItem value="x" title={`Size ${s.toUpperCase()} accordion`} subtitle="Subtitle line">
                          Body text size scales alongside the header.
                        </AccordionItem>
                      </CustomAccordion>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle title="7. Accents" subtitle="Built-in harmonious colors." />
                <div className="flex flex-col gap-3">
                  {(["teal", "blue", "purple", "coral", "amber", "gray"] as const).map((acc) => (
                    <CustomAccordion key={acc} accent={acc} defaultOpen="x">
                      <AccordionItem value="x" title={`Accent: ${acc}`} badge={acc} badgeColor={
                        { teal:"#1D9E75", blue:"#378ADD", purple:"#7F77DD", coral:"#D85A30", amber:"#EF9F27", gray:"#888780" }[acc]
                      }>
                        The open-state title, border-left indicator, and badge all use this accent.
                      </AccordionItem>
                    </CustomAccordion>
                  ))}
                </div>
              </div>
            </div>
            <Separator className="bg-slate-100 my-8" />

            {/* 8. Advanced Headers & Cards */}
            <SectionTitle title="8. Rich Headers & Card Grid" subtitle="Complex compositions." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CustomAccordion accent="blue" variant="card">
                <AccordionItem
                  value="a"
                  title="Getting started"
                  subtitle="Installation and first steps"
                  badge="New"
                  badgeColor="#1D9E75"
                  icon={<InfoIcon />}
                >
                  Everything you need to get up and running in under five minutes.
                </AccordionItem>
                <AccordionItem
                  value="b"
                  title="Configuration"
                  subtitle="Props and settings"
                  badge="14 props"
                  badgeColor="#378ADD"
                >
                  Full list of props with types and default values documented in the component file.
                </AccordionItem>
                <AccordionItem
                  value="c"
                  title="Deprecated API"
                  subtitle="Will be removed in v3"
                  badge="Deprecated"
                  badgeColor="#D85A30"
                  disabled
                >
                  This content is unreachable because the item is disabled.
                </AccordionItem>
              </CustomAccordion>

              <CustomAccordion variant="card" gap={10} borderRadius={12} accent="purple">
                <AccordionItem value="billing" title="Billing" subtitle="Plans and invoices" badge="Pro" badgeColor="#7F77DD">
                  Manage your subscription, view invoices, and update payment methods.
                </AccordionItem>
                <AccordionItem value="team" title="Team" subtitle="Members and roles">
                  Invite team members, assign roles, and manage access permissions.
                </AccordionItem>
                <AccordionItem value="api" title="API keys" subtitle="Authentication tokens">
                  Generate, rotate, and revoke API keys for your integrations.
                </AccordionItem>
              </CustomAccordion>
            </div>
            <Separator className="bg-slate-100 my-8" />

            {/* 9. Controlled and Imperative */}
            <SectionTitle title="9. API & Control" subtitle="Controlled mode and imperative hook." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs mb-2 text-slate-400 font-mono">Controlled Open: [{controlledOpen.join(", ")}]</p>
                <CustomAccordion value={controlledOpen} onChange={setControlledOpen} allowMultiple={false}>
                  <AccordionItem value="panel1" title="Panel 1">Content for panel 1.</AccordionItem>
                  <AccordionItem value="panel2" title="Panel 2">Content for panel 2.</AccordionItem>
                  <AccordionItem value="panel3" title="Panel 3">Content for panel 3.</AccordionItem>
                </CustomAccordion>
              </div>

              <div>
                <div className="flex gap-2 mb-3">
                  <button onClick={expandAll} style={btnStyle}>Expand all</button>
                  <button onClick={collapseAll} style={btnStyle}>Collapse all</button>
                </div>
                <CustomAccordion value={open} onChange={setOpen}>
                  <AccordionItem value="faq1" title="What's included?">Everything in the component file — no external deps.</AccordionItem>
                  <AccordionItem value="faq2" title="Is it accessible?">Uses aria-expanded, role=button, keyboard navigation (Enter, Space).</AccordionItem>
                  <AccordionItem value="faq3" title="Can I animate the body?">Yes — height animates via max-height transition. Adjust the 0.28s duration in bodyRef logic.</AccordionItem>
                </CustomAccordion>
              </div>
            </div>
            <Separator className="bg-slate-100 my-8" />

            {/* 10. Real-World Patterns */}
            <SectionTitle title="10. Real-World Patterns" subtitle="FAQ Pages and Settings Panel." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-[17px] font-medium mb-4 text-slate-800">Frequently asked questions</h2>
                <CustomAccordion variant="flush" accent="teal">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} title={f.q}>
                      {f.a}
                    </AccordionItem>
                  ))}
                </CustomAccordion>
              </div>

              <div>
                <CustomAccordion
                  variant="default"
                  accent="blue"
                  iconType="chevron"
                  iconPosition="left"
                  allowMultiple={true}
                  size="md"
                  borderRadius={10}
                  gap={6}
                >
                  <AccordionItem value="profile"  title="Profile"       subtitle="Name, avatar, and bio"       badge="Complete" badgeColor="#1D9E75">
                    <div className="flex flex-col gap-2.5">
                      <input placeholder="Display name" className="px-3 py-2 rounded-md border border-[#d3d1c7] text-[13px] bg-white outline-none focus:border-blue-500" />
                      <input placeholder="Bio"          className="px-3 py-2 rounded-md border border-[#d3d1c7] text-[13px] bg-white outline-none focus:border-blue-500" />
                    </div>
                  </AccordionItem>
                  <AccordionItem value="security" title="Security"      subtitle="Password and 2FA"             badge="Action needed" badgeColor="#EF9F27">
                    <p className="text-[13px] mb-2 text-slate-600">Two-factor authentication is not enabled.</p>
                    <button style={btnStyle}>Enable 2FA</button>
                  </AccordionItem>
                  <AccordionItem value="notifs"   title="Notifications" subtitle="Email and push preferences">
                    <label className="flex gap-2 items-center text-[13px] text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked /> Email digest (weekly)
                    </label>
                  </AccordionItem>
                  <AccordionItem value="danger"   title="Danger zone"   subtitle="Irreversible actions"         badge="Caution" badgeColor="#D85A30">
                    <p className="text-[13px] text-[#993C1D] mb-2.5">Deleting your account is permanent and cannot be undone.</p>
                    <button style={{ ...btnStyle, borderColor: "#D85A30", color: "#993C1D" }}>Delete account</button>
                  </AccordionItem>
                </CustomAccordion>
              </div>
            </div>

            <CodeBlock
              code={`import { useState } from "react";
import CustomAccordion, { AccordionItem, useAccordion } from "@/components/CustomAccordion";

export default function App() {
  const [openItems, setOpenItems] = useState(["item-1"]);

  return (
    <CustomAccordion
      value={openItems}
      onChange={setOpenItems}
      variant="flush"
      accent="blue"
      size="md"
      iconType="chevron"
      allowMultiple={true}
    >
      <AccordionItem value="item-1" title="Question 1?">
        Answer to question 1 goes here.
      </AccordionItem>
      <AccordionItem value="item-2" title="Question 2?" subtitle="Optional subtitle">
        Answer to question 2 goes here.
      </AccordionItem>
    </CustomAccordion>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
