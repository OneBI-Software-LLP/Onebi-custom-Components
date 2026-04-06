"use client";

import React from "react";
import { Button, ButtonGroup, ButtonGroupItem } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// ── Icons from the demo ──
const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

const BellIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const GearIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-8 border-t border-slate-100 pt-6 w-full">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
        Installation & Usage
      </Label>
      <Badge
        variant="outline"
        className="text-[10px] bg-slate-50 text-slate-500 font-mono tracking-widest border-slate-200"
      >
        import Button
      </Badge>
    </div>
    <pre className="p-4 rounded-xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[12px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

function Section({ label, code, children }: { label: string; code?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 flex flex-col">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {label}
      </Label>
      <div className="flex flex-wrap gap-4 items-center">
        {children}
      </div>
      {code && <CodeBlock code={code} />}
    </div>
  );
}

export default function ButtonsPage() {
  const [loading, setLoading] = React.useState(false);

  function handleSave() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Button Suite
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive guide to every variant, size, and state available.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            {/* ── SOLID ── */}
            <Section label="Solid (default variant)" code={`import { Button } from "@/components/ui/button";

<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="danger">Danger</Button>`}>
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="danger">Danger</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="info">Info</Button>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── OUTLINE ── */}
            <Section label="Outline" code={`import { Button } from "@/components/ui/button";

<Button variant="outline" color="primary">Primary</Button>
<Button variant="outline" color="secondary">Secondary</Button>`}>
              <Button variant="outline" color="primary">Primary</Button>
              <Button variant="outline" color="secondary">Secondary</Button>
              <Button variant="outline" color="danger">Danger</Button>
              <Button variant="outline" color="success">Success</Button>
              <Button variant="outline" color="info">Info</Button>
              <Button variant="outline" color="warning">Warning</Button>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── SOFT ── */}
            <Section label="Soft" code={`import { Button } from "@/components/ui/button";

<Button variant="soft" color="primary">Primary</Button>
<Button variant="soft" color="secondary">Secondary</Button>`}>
              <Button variant="soft" color="primary">Primary</Button>
              <Button variant="soft" color="secondary">Secondary</Button>
              <Button variant="soft" color="info">Info</Button>
              <Button variant="soft" color="danger">Danger</Button>
              <Button variant="soft" color="success">Success</Button>
              <Button variant="soft" color="warning">Warning</Button>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── GHOST & LINK ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Section label="Ghost" code={`import { Button } from "@/components/ui/button";

<Button variant="ghost">Default</Button>
<Button variant="ghost" color="primary">Primary</Button>`}>
                <Button variant="ghost">Default</Button>
                <Button variant="ghost" color="primary">Primary</Button>
                <Button variant="ghost" color="danger">Danger</Button>
              </Section>
              <Section label="Link" code={`import { Button } from "@/components/ui/button";

<Button variant="link">Learn more</Button>`}>
                <Button variant="link">Learn more</Button>
                <Button variant="link" color="info">Documentation →</Button>
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            {/* ── SIZES ── */}
            <Section label="Sizes" code={`import { Button } from "@/components/ui/button";

<Button size="xs">XSmall</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}>
              <Button size="xs">XSmall</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XLarge</Button>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── SHAPES ── */}
            <Section label="Shapes" code={`import { Button } from "@/components/ui/button";

<Button shape="rounded">Pill</Button>
<Button shape="square">Square (4px)</Button>
<Button variant="outline" color="info" shape="rounded">Outline Pill</Button>`}>
              <Button shape="default">Default (8px)</Button>
              <Button shape="rounded">Pill</Button>
              <Button shape="square">Square (4px)</Button>
              <Button variant="outline" color="info" shape="rounded">Outline Pill</Button>
            </Section>

            <Separator className="bg-slate-100" />

            {/* ── ICONS ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Section label="With icons" code={`import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowIcon } from "lucide-react";

<Button iconLeft={<PlusIcon />}>Add item</Button>
<Button color="secondary" iconRight={<ArrowIcon />}>Continue</Button>`}>
                <Button iconLeft={<PlusIcon />}>Add item</Button>
                <Button color="secondary" iconRight={<ArrowIcon />}>Continue</Button>
              </Section>
              <Section label="Icon only" code={`import { Button } from "@/components/ui/button";
import { GearIcon, TrashIcon } from "lucide-react";

<Button size="sm" color="secondary" iconOnly iconLeft={<GearIcon />} />
<Button size="md" variant="outline" color="danger" iconOnly iconLeft={<TrashIcon />} />`}>
                <Button size="sm" color="secondary" iconOnly iconLeft={<GearIcon />} />
                <Button size="md" variant="outline" color="danger" iconOnly iconLeft={<TrashIcon />} />
                <Button variant="ghost" shape="rounded" iconOnly iconLeft={<BellIcon />} />
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            {/* ── LOADING & DISABLED ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Section label="Loading state" code={`import { Button } from "@/components/ui/button";

<Button loading loadingText="Saving…">Save</Button>
<Button variant="outline" color="info" loading />`}>
                <Button loading loadingText="Saving…">Save</Button>
                <Button variant="outline" color="info" loading />
                <Button onClick={handleSave} loading={loading}>
                  {loading ? 'Saving…' : 'Dynamic load'}
                </Button>
              </Section>
              <Section label="Disabled state" code={`import { Button } from "@/components/ui/button";

<Button disabled>Primary</Button>
<Button variant="soft" color="info" disabled>Info</Button>`}>
                <Button disabled>Primary</Button>
                <Button variant="soft" color="info" disabled>Info</Button>
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            {/* ── BADGE & FULL WIDTH ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Section label="With badge" code={`import { Button } from "@/components/ui/button";

<Button badge={3} color="secondary" iconLeft={<BellIcon />}>Notifications</Button>
<Button badge="9+" variant="ghost" shape="rounded" iconOnly iconLeft={<BellIcon />} />`}>
                <Button badge={3} color="secondary" iconLeft={<BellIcon />}>Notifications</Button>
                <Button badge="9+" variant="ghost" shape="rounded" iconOnly iconLeft={<BellIcon />} />
              </Section>
              <Section label="Full width" code={`import { Button } from "@/components/ui/button";

<Button fullWidth>Stretch to container</Button>`}>
                <Button fullWidth>Stretch to container</Button>
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            {/* ── BUTTON GROUPS ── */}
            <Section label="Button groups / Segmented Control" code={`import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button";

<ButtonGroup>
  <ButtonGroupItem>Day</ButtonGroupItem>
  <ButtonGroupItem active>Week</ButtonGroupItem>
  <ButtonGroupItem>Month</ButtonGroupItem>
</ButtonGroup>`}>
              <ButtonGroup>
                <ButtonGroupItem>Day</ButtonGroupItem>
                <ButtonGroupItem active>Week</ButtonGroupItem>
                <ButtonGroupItem>Month</ButtonGroupItem>
              </ButtonGroup>
              <ButtonGroup>
                <ButtonGroupItem size="sm">List</ButtonGroupItem>
                <ButtonGroupItem size="sm" active>Grid</ButtonGroupItem>
              </ButtonGroup>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
