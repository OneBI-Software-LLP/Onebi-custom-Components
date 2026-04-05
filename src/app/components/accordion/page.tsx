"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronRight } from "lucide-react";

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

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  variant?: "default" | "bordered";
}

function AccordionItem({ title, children, isOpen, onToggle, variant = "default" }: AccordionItemProps) {
  return (
    <div className={variant === "bordered" ? "border border-slate-200 rounded-lg" : ""}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-slate-50 transition-colors rounded-lg"
      >
        <span className="font-semibold text-slate-900">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-slate-500 transition-transform" />
        ) : (
          <ChevronRight className="h-5 w-5 text-slate-500 transition-transform" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-slate-600">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AccordionPage() {
  const [openItems, setOpenItems] = useState<string[]>(["item-1"]);
  const [openItemsBordered, setOpenItemsBordered] = useState<string[]>([]);

  const toggleItem = (id: string, items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>) => {
    setItems(items.includes(id) ? items.filter(i => i !== id) : [...items, id]);
  };

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Accordion
            </h2>
            <p className="text-lg text-slate-500">
              Vertically stacked collapsible sections for organizing content.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Default Accordion
              </Label>
              <div className="space-y-1">
                <AccordionItem
                  title="What is Onebi UI?"
                  isOpen={openItems.includes("item-1")}
                  onToggle={() => toggleItem("item-1", openItems, setOpenItems)}
                >
                  <p>Onebi UI is a comprehensive component library built for modern web applications. It provides reusable, accessible, and customizable UI components that follow design best practices.</p>
                </AccordionItem>
                <AccordionItem
                  title="How do I install it?"
                  isOpen={openItems.includes("item-2")}
                  onToggle={() => toggleItem("item-2", openItems, setOpenItems)}
                >
                  <p>Install Onebi UI using your preferred package manager: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">npm install onebi-ui</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">yarn add onebi-ui</code>. Then import components as needed.</p>
                </AccordionItem>
                <AccordionItem
                  title="Is it customizable?"
                  isOpen={openItems.includes("item-3")}
                  onToggle={() => toggleItem("item-3", openItems, setOpenItems)}
                >
                  <p>Absolutely! All components support className overrides and many accept style props. You can easily theme components to match your brand guidelines.</p>
                </AccordionItem>
                <AccordionItem
                  title="What about accessibility?"
                  isOpen={openItems.includes("item-4")}
                  onToggle={() => toggleItem("item-4", openItems, setOpenItems)}
                >
                  <p>Accessibility is a core priority. Components include proper ARIA attributes, keyboard navigation support, and screen reader compatibility out of the box.</p>
                </AccordionItem>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Bordered Variant
              </Label>
              <div className="space-y-3">
                <AccordionItem
                  title="Project Settings"
                  isOpen={openItemsBordered.includes("border-1")}
                  onToggle={() => toggleItem("border-1", openItemsBordered, setOpenItemsBordered)}
                  variant="bordered"
                >
                  <div className="space-y-2">
                    <p className="text-sm">Configure your project name, description, and team members.</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Settings</Badge>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  title="Notification Preferences"
                  isOpen={openItemsBordered.includes("border-2")}
                  onToggle={() => toggleItem("border-2", openItemsBordered, setOpenItemsBordered)}
                  variant="bordered"
                >
                  <div className="space-y-2">
                    <p className="text-sm">Choose how and when you want to receive notifications.</p>
                    <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                      <li>Email notifications</li>
                      <li>Push notifications</li>
                      <li>In-app alerts</li>
                    </ul>
                  </div>
                </AccordionItem>
                <AccordionItem
                  title="Billing Information"
                  isOpen={openItemsBordered.includes("border-3")}
                  onToggle={() => toggleItem("border-3", openItemsBordered, setOpenItemsBordered)}
                  variant="bordered"
                >
                  <div className="space-y-2">
                    <p className="text-sm">Manage your subscription and payment methods.</p>
                    <div className="bg-slate-50 p-3 rounded-lg mt-2">
                      <p className="text-xs text-slate-500">Current Plan</p>
                      <p className="font-semibold text-slate-900">Pro - $29/month</p>
                    </div>
                  </div>
                </AccordionItem>
              </div>
            </div>

            <CodeBlock
              code={`import { useState } from "react";
import { Accordion, AccordionItem } from "onebi-ui";

export default function FAQ() {
  const [openItems, setOpenItems] = useState(["item-1"]);

  return (
    <Accordion>
      <AccordionItem title="Question 1?" isOpen={openItems.includes("item-1")}>
        <p>Answer to question 1 goes here.</p>
      </AccordionItem>
      <AccordionItem title="Question 2?" isOpen={openItems.includes("item-2")}>
        <p>Answer to question 2 goes here.</p>
      </AccordionItem>
    </Accordion>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
