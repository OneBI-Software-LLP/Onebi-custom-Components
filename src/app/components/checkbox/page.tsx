"use client";

import React from "react";
import { Checkbox, CheckboxGroup, CheckboxGroupItem, useCheckbox, useCheckboxGroup } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// ── Shared code block (copied from NavbarPage) ─────────────────────────────

function SectionCodeBlock({ ts, js }: { ts: string; js: string }) {
  const [lang, setLang] = React.useState<"ts" | "js">("ts");
  const [copied, setCopied] = React.useState(false);
  const activeCode = lang === "ts" ? ts : js;

  function copy() {
    navigator.clipboard.writeText(activeCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700 bg-[#0F172A] mt-5">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/70"
        style={{ background: "rgba(255,255,255,0.04)" }}>
        <div style={{ display:"flex", gap:"2px", background:"rgba(255,255,255,0.08)", borderRadius:"8px", padding:"3px" }}>
          {(["ts","js"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding:"3px 12px", borderRadius:"6px", border:"none", cursor:"pointer",
              fontSize:"12px", fontWeight:600, fontFamily:"monospace",
              transition:"background 140ms, color 140ms",
              background: lang === l ? "rgba(255,255,255,0.18)" : "transparent",
              color: lang === l ? "#f8fafc" : "#94a3b8",
            }}>{l === "ts" ? "Ts" : "Js"}</button>
          ))}
        </div>
        <button onClick={copy} style={{
          display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"12px",
          color: copied ? "#4ade80" : "#94a3b8",
          background:"rgba(255,255,255,0.07)", border:"none",
          padding:"4px 10px", borderRadius:"8px", cursor:"pointer",
          transition:"color 150ms",
        }}>
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{ padding:"1.25rem 1.5rem", overflowX:"auto", fontSize:"13px",
        fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",
        color:"#e2e8f0", lineHeight:"1.7", margin:0 }}>
        <code>{activeCode}</code>
      </pre>
    </div>
  );
}

function Section({ label, ts, js, children }: { label: string; ts: string; js: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">{label}</Label>
      <div className="flex flex-col gap-4">{children}</div>
      <SectionCodeBlock ts={ts} js={js} />
    </div>
  );
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius:"0.75rem", border:"0.5px solid #e2e8f0",
      background:"#f8fafc", padding:"1.25rem 1.5rem" }}>
      {children}
    </div>
  );
}

// ── 1. Basic ───────────────────────────────────────────────────────────────

function BasicBlock() {
  const c1 = useCheckbox(false);
  const c2 = useCheckbox(true);

  return (
    <Section label="Basic"
      ts={`import { Checkbox, useCheckbox } from "onebi-ui";

export default function BasicDemo() {
  const cb = useCheckbox(false);
  return <Checkbox label="Accept terms and conditions" {...cb} />;
}`}
      js={`import { Checkbox, useCheckbox } from "onebi-ui";

export default function BasicDemo() {
  const cb = useCheckbox(false);
  return <Checkbox label="Accept terms and conditions" {...cb} />;
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Checkbox label="Unchecked" {...c1} />
          <Checkbox label="Checked by default" {...c2} />
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" checked disabled />
        </div>
      </Preview>
    </Section>
  );
}

// ── 2. Sizes ───────────────────────────────────────────────────────────────

function SizesBlock() {
  return (
    <Section label="Sizes"
      ts={`import { Checkbox } from "onebi-ui";
import type { CheckboxSize } from "onebi-ui";

export default function SizesDemo() {
  const sizes: CheckboxSize[] = ["sm", "md", "lg"];
  return (
    <>
      {sizes.map((size) => (
        <Checkbox key={size} size={size} label={size} checked />
      ))}
    </>
  );
}`}
      js={`import { Checkbox } from "onebi-ui";

export default function SizesDemo() {
  return (
    <>
      <Checkbox size="sm" label="Small"  checked />
      <Checkbox size="md" label="Medium" checked />
      <Checkbox size="lg" label="Large"  checked />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", gap:24, alignItems:"center", flexWrap:"wrap" }}>
          <Checkbox size="sm" label="Small"  checked onChange={() => {}} />
          <Checkbox size="md" label="Medium" checked onChange={() => {}} />
          <Checkbox size="lg" label="Large"  checked onChange={() => {}} />
        </div>
      </Preview>
    </Section>
  );
}

// ── 3. Colors ──────────────────────────────────────────────────────────────

function ColorsBlock() {
  return (
    <Section label="Colors"
      ts={`import { Checkbox } from "onebi-ui";

export default function ColorsDemo() {
  return (
    <>
      <Checkbox color="primary" label="Primary" checked />
      <Checkbox color="success" label="Success" checked />
      <Checkbox color="danger"  label="Danger"  checked />
      <Checkbox color="warning" label="Warning" checked />
    </>
  );
}`}
      js={`import { Checkbox } from "onebi-ui";

export default function ColorsDemo() {
  return (
    <>
      <Checkbox color="primary" label="Primary" checked />
      <Checkbox color="success" label="Success" checked />
      <Checkbox color="danger"  label="Danger"  checked />
      <Checkbox color="warning" label="Warning" checked />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
          <Checkbox color="primary" label="Primary" checked onChange={() => {}} />
          <Checkbox color="success" label="Success" checked onChange={() => {}} />
          <Checkbox color="danger"  label="Danger"  checked onChange={() => {}} />
          <Checkbox color="warning" label="Warning" checked onChange={() => {}} />
        </div>
      </Preview>
    </Section>
  );
}

// ── 4. Variants ────────────────────────────────────────────────────────────

function VariantsBlock() {
  const d = useCheckbox(false);
  const f = useCheckbox(true);
  const c = useCheckbox(true);

  return (
    <Section label="Variants"
      ts={`import { Checkbox, useCheckbox } from "onebi-ui";

export default function VariantsDemo() {
  const cb = useCheckbox(false);
  return (
    <>
      <Checkbox variant="default" label="Default variant" {...cb} />
      <Checkbox variant="filled"  label="Filled variant"  {...cb} />
      <Checkbox variant="card"    label="Card variant"    description="Wraps the checkbox in a bordered card" {...cb} />
    </>
  );
}`}
      js={`import { Checkbox, useCheckbox } from "onebi-ui";

export default function VariantsDemo() {
  const cb = useCheckbox(false);
  return (
    <>
      <Checkbox variant="default" label="Default variant" {...cb} />
      <Checkbox variant="filled"  label="Filled variant"  {...cb} />
      <Checkbox variant="card"    label="Card variant"    description="Wraps the checkbox in a bordered card" {...cb} />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <Checkbox variant="default" label="Default variant" {...d} />
          <Checkbox variant="filled"  label="Filled variant"  {...f} />
          <Checkbox variant="card"    label="Card variant"    description="Wraps the checkbox in a bordered card" {...c} />
        </div>
      </Preview>
    </Section>
  );
}

// ── 5. With description ────────────────────────────────────────────────────

function WithDescriptionBlock() {
  const c1 = useCheckbox(true);
  const c2 = useCheckbox(false);

  return (
    <Section label="With description"
      ts={`import { Checkbox, useCheckbox } from "onebi-ui";

export default function WithDescriptionDemo() {
  const cb = useCheckbox(false);
  return (
    <Checkbox
      label="Email notifications"
      description="Receive updates about your account activity."
      {...cb}
    />
  );
}`}
      js={`import { Checkbox, useCheckbox } from "onebi-ui";

export default function WithDescriptionDemo() {
  const cb = useCheckbox(false);
  return (
    <Checkbox
      label="Email notifications"
      description="Receive updates about your account activity."
      {...cb}
    />
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Checkbox label="Email notifications" description="Receive updates about your account activity." {...c1} />
          <Checkbox label="SMS alerts" description="Get real-time alerts sent to your phone number." {...c2} />
        </div>
      </Preview>
    </Section>
  );
}

// ── 6. Indeterminate ───────────────────────────────────────────────────────

function IndeterminateBlock() {
  const [items, setItems] = React.useState([
    { id:1, label:"Design system",  checked: true  },
    { id:2, label:"Components",     checked: false },
    { id:3, label:"Documentation",  checked: true  },
  ]);

  const allChecked   = items.every(i => i.checked);
  const someChecked  = items.some(i => i.checked) && !allChecked;

  function toggleAll(checked: boolean) {
    setItems(prev => prev.map(i => ({ ...i, checked })));
  }

  function toggle(id: number, checked: boolean) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, checked } : i));
  }

  return (
    <Section label="Indeterminate"
      ts={`import React from "react";
import { Checkbox } from "onebi-ui";

export default function IndeterminateDemo() {
  const [items, setItems] = React.useState([
    { id:1, label:"Design system",  checked: true  },
    { id:2, label:"Components",     checked: false },
    { id:3, label:"Documentation",  checked: true  },
  ]);

  const allChecked  = items.every(i => i.checked);
  const someChecked = items.some(i => i.checked) && !allChecked;

  return (
    <div>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(c) => setItems(prev => prev.map(i => ({ ...i, checked: c })))}
      />
      {items.map((item) => (
        <Checkbox
          key={item.id}
          label={item.label}
          checked={item.checked}
          onChange={(c) => setItems(prev => prev.map(i => i.id === item.id ? { ...i, checked: c } : i))}
        />
      ))}
    </div>
  );
}`}
      js={`import React from "react";
import { Checkbox } from "onebi-ui";

export default function IndeterminateDemo() {
  const [items, setItems] = React.useState([
    { id:1, label:"Design system",  checked: true  },
    { id:2, label:"Components",     checked: false },
    { id:3, label:"Documentation",  checked: true  },
  ]);

  const allChecked  = items.every(i => i.checked);
  const someChecked = items.some(i => i.checked) && !allChecked;

  return (
    <div>
      <Checkbox label="Select all" checked={allChecked} indeterminate={someChecked}
        onChange={(c) => setItems(prev => prev.map(i => ({ ...i, checked: c })))} />
      {items.map((item) => (
        <Checkbox key={item.id} label={item.label} checked={item.checked}
          onChange={(c) => setItems(prev => prev.map(i => i.id === item.id ? { ...i, checked: c } : i))} />
      ))}
    </div>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <Checkbox
            label="Select all"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
          />
          <div style={{ paddingLeft:24, display:"flex", flexDirection:"column", gap:8 }}>
            {items.map(item => (
              <Checkbox key={item.id} label={item.label} checked={item.checked}
                onChange={(c) => toggle(item.id, c)} />
            ))}
          </div>
        </div>
      </Preview>
    </Section>
  );
}

// ── 7. CheckboxGroup ───────────────────────────────────────────────────────

function GroupBlock() {
  const vertical   = useCheckboxGroup(["react"]);
  const horizontal = useCheckboxGroup(["email"]);

  return (
    <Section label="CheckboxGroup"
      ts={`import { CheckboxGroup, CheckboxGroupItem, useCheckboxGroup } from "onebi-ui";

export default function GroupDemo() {
  const group = useCheckboxGroup(["react"]);

  return (
    <CheckboxGroup {...group}>
      <CheckboxGroupItem value="react"  label="React"  />
      <CheckboxGroupItem value="vue"    label="Vue"    />
      <CheckboxGroupItem value="svelte" label="Svelte" />
      <CheckboxGroupItem value="solid"  label="Solid"  />
    </CheckboxGroup>
  );
}`}
      js={`import { CheckboxGroup, CheckboxGroupItem, useCheckboxGroup } from "onebi-ui";

export default function GroupDemo() {
  const group = useCheckboxGroup(["react"]);

  return (
    <CheckboxGroup {...group}>
      <CheckboxGroupItem value="react"  label="React"  />
      <CheckboxGroupItem value="vue"    label="Vue"    />
      <CheckboxGroupItem value="svelte" label="Svelte" />
      <CheckboxGroupItem value="solid"  label="Solid"  />
    </CheckboxGroup>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div>
            <p style={{ fontSize:12, color:"#64748b", marginBottom:8, fontWeight:500 }}>Vertical (default)</p>
            <CheckboxGroup {...vertical}>
              <CheckboxGroupItem value="react"  label="React"  />
              <CheckboxGroupItem value="vue"    label="Vue"    />
              <CheckboxGroupItem value="svelte" label="Svelte" />
              <CheckboxGroupItem value="solid"  label="Solid"  disabled />
            </CheckboxGroup>
          </div>
          <div>
            <p style={{ fontSize:12, color:"#64748b", marginBottom:8, fontWeight:500 }}>Horizontal</p>
            <CheckboxGroup orientation="horizontal" {...horizontal}>
              <CheckboxGroupItem value="email" label="Email" />
              <CheckboxGroupItem value="sms"   label="SMS"   />
              <CheckboxGroupItem value="push"  label="Push"  />
            </CheckboxGroup>
          </div>
        </div>
      </Preview>
    </Section>
  );
}

// ── 8. Card variant group ──────────────────────────────────────────────────

function CardGroupBlock() {
  const group = useCheckboxGroup(["pro"]);

  return (
    <Section label="Card variant group"
      ts={`import { CheckboxGroup, CheckboxGroupItem, useCheckboxGroup } from "onebi-ui";

export default function CardGroupDemo() {
  const group = useCheckboxGroup(["pro"]);

  return (
    <CheckboxGroup {...group}>
      <CheckboxGroupItem variant="card" value="free"       label="Free"       description="Up to 3 projects" />
      <CheckboxGroupItem variant="card" value="pro"        label="Pro"        description="Unlimited projects" />
      <CheckboxGroupItem variant="card" value="enterprise" label="Enterprise" description="Custom limits" />
    </CheckboxGroup>
  );
}`}
      js={`import { CheckboxGroup, CheckboxGroupItem, useCheckboxGroup } from "onebi-ui";

export default function CardGroupDemo() {
  const group = useCheckboxGroup(["pro"]);

  return (
    <CheckboxGroup {...group}>
      <CheckboxGroupItem variant="card" value="free"       label="Free"       description="Up to 3 projects" />
      <CheckboxGroupItem variant="card" value="pro"        label="Pro"        description="Unlimited projects" />
      <CheckboxGroupItem variant="card" value="enterprise" label="Enterprise" description="Custom limits" />
    </CheckboxGroup>
  );
}`}
    >
      <Preview>
        <CheckboxGroup {...group}>
          <CheckboxGroupItem variant="card" value="free"       label="Free"       description="Up to 3 projects" />
          <CheckboxGroupItem variant="card" value="pro"        label="Pro"        description="Unlimited projects, priority support" />
          <CheckboxGroupItem variant="card" value="enterprise" label="Enterprise" description="Custom limits and SLA" />
        </CheckboxGroup>
      </Preview>
    </Section>
  );
}

// ── 9. Required ────────────────────────────────────────────────────────────

function RequiredBlock() {
  const cb = useCheckbox(false);

  return (
    <Section label="Required"
      ts={`import { Checkbox, useCheckbox } from "onebi-ui";

export default function RequiredDemo() {
  const cb = useCheckbox(false);
  return (
    <Checkbox
      required
      label="I agree to the terms and conditions"
      description="You must accept the terms to continue."
      {...cb}
    />
  );
}`}
      js={`import { Checkbox, useCheckbox } from "onebi-ui";

export default function RequiredDemo() {
  const cb = useCheckbox(false);
  return (
    <Checkbox required label="I agree to the terms and conditions"
      description="You must accept the terms to continue." {...cb} />
  );
}`}
    >
      <Preview>
        <Checkbox
          required
          label="I agree to the terms and conditions"
          description="You must accept the terms to continue."
          {...cb}
        />
      </Preview>
    </Section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function CheckboxPage() {
  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Checkbox suite
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive guide to every variant, color, size, and state available.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            <BasicBlock />
            <Separator className="bg-slate-100" />
            <SizesBlock />
            <Separator className="bg-slate-100" />
            <ColorsBlock />
            <Separator className="bg-slate-100" />
            <VariantsBlock />
            <Separator className="bg-slate-100" />
            <WithDescriptionBlock />
            <Separator className="bg-slate-100" />
            <IndeterminateBlock />
            <Separator className="bg-slate-100" />
            <GroupBlock />
            <Separator className="bg-slate-100" />
            <CardGroupBlock />
            <Separator className="bg-slate-100" />
            <RequiredBlock />
          </div>
        </div>
      </div>
    </div>
  );
}