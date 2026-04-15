"use client";

import React from "react";
import { RadioGroup, useRadio } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// ── Icons ──────────────────────────────────────────────────────────────────

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MonitorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const CreditCardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const BankIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);
const WalletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 12V22H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4z" />
    <path d="M20 12a2 2 0 0 0-2-2h-2a2 2 0 0 0 0 4h2a2 2 0 0 0 2-2z" />
  </svg>
);
const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ── Shared data ────────────────────────────────────────────────────────────

const basicItems = [
  { value: "react",   label: "React" },
  { value: "vue",     label: "Vue" },
  { value: "svelte",  label: "Svelte" },
  { value: "angular", label: "Angular" },
];

const descItems = [
  { value: "starter", label: "Starter",     description: "Perfect for personal projects and side-hustles." },
  { value: "pro",     label: "Pro",          description: "Ideal for freelancers and growing teams." },
  { value: "team",    label: "Team",         description: "Advanced collaboration features for larger teams." },
  { value: "enterprise", label: "Enterprise", description: "Custom limits, SLA, and dedicated support." },
];

// ── SectionCodeBlock ───────────────────────────────────────────────────────

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
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-slate-700/70"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div style={{ display:"flex", gap:"2px", background:"rgba(255,255,255,0.08)", borderRadius:"8px", padding:"3px" }}>
          {(["ts","js"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding:"3px 12px", borderRadius:"6px", border:"none", cursor:"pointer",
                fontSize:"12px", fontWeight:600, fontFamily:"monospace",
                transition:"background 140ms, color 140ms",
                background: lang === l ? "rgba(255,255,255,0.18)" : "transparent",
                color: lang === l ? "#f8fafc" : "#94a3b8",
              }}
            >
              {l === "ts" ? "Ts" : "Js"}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          style={{
            display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"12px",
            color: copied ? "#4ade80" : "#94a3b8",
            background:"rgba(255,255,255,0.07)", border:"none",
            padding:"4px 10px", borderRadius:"8px", cursor:"pointer",
            transition:"color 150ms, background 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{
        padding:"1.25rem 1.5rem", overflowX:"auto", fontSize:"13px",
        fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace",
        color:"#e2e8f0", lineHeight:"1.7", margin:0,
      }}>
        <code>{activeCode}</code>
      </pre>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────

function Section({ label, ts, js, children }: { label: string; ts: string; js: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">{label}</Label>
      <div className="flex flex-col gap-4">{children}</div>
      <SectionCodeBlock ts={ts} js={js} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  SECTION BLOCKS
// ══════════════════════════════════════════════════════════════

/* ── 1. Variants ── */
function VariantsBlock() {
  const r1 = useRadio("react");
  const r2 = useRadio("react");
  const r3 = useRadio("react");
  const r4 = useRadio("react");

  return (
    <Section
      label="Variants"
      ts={`import { RadioGroup, useRadio } from "onebi-ui";

export default function VariantsDemo() {
  const r = useRadio("react");

  const items = [
    { value: "react",  label: "React" },
    { value: "vue",    label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ];

  return (
    <>
      <RadioGroup items={items} variant="default"  value={r.value} onChange={r.onChange} />
      <RadioGroup items={items} variant="soft"     value={r.value} onChange={r.onChange} />
      <RadioGroup items={items} variant="card"     value={r.value} onChange={r.onChange} />
      <RadioGroup items={items} variant="button"   value={r.value} onChange={r.onChange} />
    </>
  );
}`}
      js={`import { RadioGroup, useRadio } from "onebi-ui";

export default function VariantsDemo() {
  const r = useRadio("react");

  const items = [
    { value: "react",  label: "React" },
    { value: "vue",    label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ];

  return (
    <>
      <RadioGroup items={items} variant="default" value={r.value} onChange={r.onChange} />
      <RadioGroup items={items} variant="soft"    value={r.value} onChange={r.onChange} />
      <RadioGroup items={items} variant="card"    value={r.value} onChange={r.onChange} />
      <RadioGroup items={items} variant="button"  value={r.value} onChange={r.onChange} />
    </>
  );
}`}
    >
      {([
        { ctrl: r1, variant: "default" as const, label: "Default" },
        { ctrl: r2, variant: "soft"    as const, label: "Soft" },
        { ctrl: r3, variant: "card"    as const, label: "Card" },
        { ctrl: r4, variant: "button"  as const, label: "Button" },
      ]).map(({ ctrl, variant, label }) => (
        <div key={variant}>
          <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
          <RadioGroup items={basicItems.slice(0, 3)} variant={variant} value={ctrl.value} onChange={ctrl.onChange} />
        </div>
      ))}
    </Section>
  );
}

/* ── 2. Colors ── */
function ColorsBlock() {
  const colors = ["primary","secondary","danger","success","warning","info"] as const;
  const controls = Object.fromEntries(colors.map(c => [c, useRadio("react")])) as Record<typeof colors[number], ReturnType<typeof useRadio>>;

  return (
    <Section
      label="Colors"
      ts={`import { RadioGroup, useRadio } from "onebi-ui";
import type { RadioGroupColor } from "onebi-ui";

export default function ColorsDemo() {
  const r = useRadio("react");
  const colors: RadioGroupColor[] = ["primary","secondary","danger","success","warning","info"];

  return (
    <>
      {colors.map((color) => (
        <RadioGroup
          key={color}
          items={[{ value:"react", label:"React" },{ value:"vue", label:"Vue" }]}
          color={color}
          orientation="horizontal"
          value={r.value}
          onChange={r.onChange}
        />
      ))}
    </>
  );
}`}
      js={`import { RadioGroup, useRadio } from "onebi-ui";

export default function ColorsDemo() {
  const r = useRadio("react");

  return (
    <>
      {["primary","secondary","danger","success","warning","info"].map((color) => (
        <RadioGroup
          key={color}
          items={[{ value:"react", label:"React" },{ value:"vue", label:"Vue" }]}
          color={color}
          orientation="horizontal"
          value={r.value}
          onChange={r.onChange}
        />
      ))}
    </>
  );
}`}
    >
      {colors.map((color) => (
        <div key={color}>
          <p className="text-xs text-slate-400 mb-2 font-medium capitalize">{color}</p>
          <RadioGroup
            items={basicItems.slice(0, 3)}
            color={color}
            orientation="horizontal"
            value={controls[color].value}
            onChange={controls[color].onChange}
          />
        </div>
      ))}
    </Section>
  );
}

/* ── 3. Sizes ── */
function SizesBlock() {
  const sizes = ["xs","sm","md","lg","xl"] as const;
  const controls = Object.fromEntries(sizes.map(s => [s, useRadio("react")])) as Record<typeof sizes[number], ReturnType<typeof useRadio>>;

  return (
    <Section
      label="Sizes"
      ts={`import { RadioGroup, useRadio } from "onebi-ui";
import type { RadioGroupSize } from "onebi-ui";

export default function SizesDemo() {
  const r = useRadio("react");
  const sizes: RadioGroupSize[] = ["xs","sm","md","lg","xl"];

  return (
    <>
      {sizes.map((size) => (
        <RadioGroup
          key={size}
          items={[{ value:"react", label:"React" },{ value:"vue", label:"Vue" }]}
          size={size}
          orientation="horizontal"
          value={r.value}
          onChange={r.onChange}
        />
      ))}
    </>
  );
}`}
      js={`import { RadioGroup, useRadio } from "onebi-ui";

export default function SizesDemo() {
  const r = useRadio("react");

  return (
    <>
      {["xs","sm","md","lg","xl"].map((size) => (
        <RadioGroup
          key={size}
          items={[{ value:"react", label:"React" },{ value:"vue", label:"Vue" }]}
          size={size}
          orientation="horizontal"
          value={r.value}
          onChange={r.onChange}
        />
      ))}
    </>
  );
}`}
    >
      {sizes.map((size) => (
        <div key={size}>
          <p className="text-xs text-slate-400 mb-2 font-medium uppercase">{size}</p>
          <RadioGroup
            items={basicItems.slice(0, 3)}
            size={size}
            orientation="horizontal"
            value={controls[size].value}
            onChange={controls[size].onChange}
          />
        </div>
      ))}
    </Section>
  );
}

/* ── 4. With descriptions ── */
function WithDescriptionsBlock() {
  const ctrl = useRadio("starter");

  return (
    <Section
      label="With descriptions"
      ts={`import { RadioGroup, useRadio } from "onebi-ui";

export default function WithDescriptionsDemo() {
  const r = useRadio("starter");

  const items = [
    { value:"starter",    label:"Starter",    description:"Perfect for personal projects and side-hustles." },
    { value:"pro",        label:"Pro",         description:"Ideal for freelancers and growing teams." },
    { value:"team",       label:"Team",        description:"Advanced collaboration for larger teams." },
    { value:"enterprise", label:"Enterprise",  description:"Custom limits, SLA, and dedicated support." },
  ];

  return <RadioGroup items={items} variant="card" value={r.value} onChange={r.onChange} />;
}`}
      js={`import { RadioGroup, useRadio } from "onebi-ui";

export default function WithDescriptionsDemo() {
  const r = useRadio("starter");

  const items = [
    { value:"starter",    label:"Starter",    description:"Perfect for personal projects and side-hustles." },
    { value:"pro",        label:"Pro",         description:"Ideal for freelancers and growing teams." },
    { value:"team",       label:"Team",        description:"Advanced collaboration for larger teams." },
    { value:"enterprise", label:"Enterprise",  description:"Custom limits, SLA, and dedicated support." },
  ];

  return <RadioGroup items={items} variant="card" value={r.value} onChange={r.onChange} />;
}`}
    >
      <RadioGroup items={descItems} variant="card" value={ctrl.value} onChange={ctrl.onChange} />
    </Section>
  );
}

/* ── 5. With icons ── */
function WithIconsBlock() {
  const ctrl = useRadio("light");
  const r2   = useRadio("card");

  const themeItems = [
    { value:"light",  label:"Light",  icon: <SunIcon /> },
    { value:"dark",   label:"Dark",   icon: <MoonIcon /> },
    { value:"system", label:"System", icon: <MonitorIcon /> },
  ];
  const paymentItems = [
    { value:"card",   label:"Credit / Debit", icon: <CreditCardIcon />, description:"Visa, Mastercard, Amex" },
    { value:"bank",   label:"Bank transfer",  icon: <BankIcon />,       description:"Instant NEFT / RTGS"   },
    { value:"wallet", label:"Wallet",         icon: <WalletIcon />,     description:"Pay via UPI wallet"     },
  ];

  return (
    <Section
      label="With icons"
      ts={`import { RadioGroup, useRadio } from "onebi-ui";
import { SunIcon, MoonIcon, MonitorIcon } from "./icons";

export default function WithIconsDemo() {
  const r = useRadio("light");

  const items = [
    { value:"light",  label:"Light",  icon: <SunIcon />     },
    { value:"dark",   label:"Dark",   icon: <MoonIcon />    },
    { value:"system", label:"System", icon: <MonitorIcon /> },
  ];

  return (
    <>
      {/* Button variant with icons */}
      <RadioGroup items={items} variant="button" orientation="horizontal" value={r.value} onChange={r.onChange} />

      {/* Card variant with icons + descriptions */}
      <RadioGroup items={paymentItems} variant="card" value={r.value} onChange={r.onChange} />
    </>
  );
}`}
      js={`import { RadioGroup, useRadio } from "onebi-ui";
import { SunIcon, MoonIcon, MonitorIcon } from "./icons";

export default function WithIconsDemo() {
  const r = useRadio("light");

  return (
    <>
      <RadioGroup
        items={[
          { value:"light",  label:"Light",  icon: <SunIcon />     },
          { value:"dark",   label:"Dark",   icon: <MoonIcon />    },
          { value:"system", label:"System", icon: <MonitorIcon /> },
        ]}
        variant="button"
        orientation="horizontal"
        value={r.value}
        onChange={r.onChange}
      />
    </>
  );
}`}
    >
      <div>
        <p className="text-xs text-slate-400 mb-2 font-medium">Button variant</p>
        <RadioGroup items={themeItems} variant="button" orientation="horizontal" value={ctrl.value} onChange={ctrl.onChange} />
      </div>
      <div className="mt-2">
        <p className="text-xs text-slate-400 mb-2 font-medium">Card variant</p>
        <RadioGroup items={paymentItems} variant="card" value={r2.value} onChange={r2.onChange} />
      </div>
    </Section>
  );
}

/* ── 6. Disabled ── */
function DisabledBlock() {
  const ctrl = useRadio("react");

  const disabledItems = [
    { value:"react",   label:"React" },
    { value:"vue",     label:"Vue" },
    { value:"svelte",  label:"Svelte",  disabled: true },
    { value:"angular", label:"Angular", disabled: true },
  ];

  return (
    <Section
      label="Disabled items"
      ts={`import { RadioGroup, useRadio } from "onebi-ui";
import type { RadioItem } from "onebi-ui";

export default function DisabledDemo() {
  const r = useRadio("react");

  const items: RadioItem[] = [
    { value:"react",   label:"React"   },
    { value:"vue",     label:"Vue"     },
    { value:"svelte",  label:"Svelte",  disabled: true },
    { value:"angular", label:"Angular", disabled: true },
  ];

  return <RadioGroup items={items} value={r.value} onChange={r.onChange} />;
}`}
      js={`import { RadioGroup, useRadio } from "onebi-ui";

export default function DisabledDemo() {
  const r = useRadio("react");

  return (
    <RadioGroup
      items={[
        { value:"react",   label:"React"   },
        { value:"vue",     label:"Vue"     },
        { value:"svelte",  label:"Svelte",  disabled: true },
        { value:"angular", label:"Angular", disabled: true },
      ]}
      value={r.value}
      onChange={r.onChange}
    />
  );
}`}
    >
      <RadioGroup items={disabledItems} value={ctrl.value} onChange={ctrl.onChange} />
    </Section>
  );
}

/* ── 7. Horizontal ── */
function HorizontalBlock() {
  const ctrl = useRadio("react");

  return (
    <Section
      label="Horizontal orientation"
      ts={`import { RadioGroup, useRadio } from "onebi-ui";

export default function HorizontalDemo() {
  const r = useRadio("react");

  const items = [
    { value:"react",  label:"React" },
    { value:"vue",    label:"Vue"   },
    { value:"svelte", label:"Svelte"},
  ];

  return (
    <RadioGroup items={items} orientation="horizontal" value={r.value} onChange={r.onChange} />
  );
}`}
      js={`import { RadioGroup, useRadio } from "onebi-ui";

export default function HorizontalDemo() {
  const r = useRadio("react");

  return (
    <RadioGroup
      items={[
        { value:"react",  label:"React"  },
        { value:"vue",    label:"Vue"    },
        { value:"svelte", label:"Svelte" },
      ]}
      orientation="horizontal"
      value={r.value}
      onChange={r.onChange}
    />
  );
}`}
    >
      {(["default","soft","card"] as const).map((v) => {
        const r = useRadio("react");
        return (
          <div key={v}>
            <p className="text-xs text-slate-400 mb-2 font-medium capitalize">{v}</p>
            <RadioGroup items={basicItems.slice(0,3)} variant={v} orientation="horizontal" value={r.value} onChange={r.onChange} />
          </div>
        );
      })}
    </Section>
  );
}

/* ── 8. With group label ── */
function WithLabelBlock() {
  const ctrl = useRadio("monthly");

  return (
    <Section
      label="With group label"
      ts={`import { RadioGroup, useRadio } from "onebi-ui";

export default function WithLabelDemo() {
  const r = useRadio("monthly");

  return (
    <RadioGroup
      label="Billing cycle"
      items={[
        { value:"monthly",  label:"Monthly",  description:"Billed every month" },
        { value:"annually", label:"Annually", description:"Save 20% vs monthly" },
      ]}
      variant="card"
      orientation="horizontal"
      value={r.value}
      onChange={r.onChange}
    />
  );
}`}
      js={`import { RadioGroup, useRadio } from "onebi-ui";

export default function WithLabelDemo() {
  const r = useRadio("monthly");

  return (
    <RadioGroup
      label="Billing cycle"
      items={[
        { value:"monthly",  label:"Monthly",  description:"Billed every month" },
        { value:"annually", label:"Annually", description:"Save 20% vs monthly" },
      ]}
      variant="card"
      orientation="horizontal"
      value={r.value}
      onChange={r.onChange}
    />
  );
}`}
    >
      <RadioGroup
        label="Billing cycle"
        items={[
          { value:"monthly",  label:"Monthly",  description:"Billed every month." },
          { value:"annually", label:"Annually", description:"Save 20% vs monthly." },
        ]}
        variant="card"
        orientation="horizontal"
        value={ctrl.value}
        onChange={ctrl.onChange}
      />
    </Section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function RadioGroupPage() {
  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Radio group suite
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive guide to every variant, size, color, and state available.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            <VariantsBlock />
            <Separator className="bg-slate-100" />

            <ColorsBlock />
            <Separator className="bg-slate-100" />

            <SizesBlock />
            <Separator className="bg-slate-100" />

            <WithDescriptionsBlock />
            <Separator className="bg-slate-100" />

            <WithIconsBlock />
            <Separator className="bg-slate-100" />

            <DisabledBlock />
            <Separator className="bg-slate-100" />

            <HorizontalBlock />
            <Separator className="bg-slate-100" />

            <WithLabelBlock />
          </div>
        </div>
      </div>
    </div>
  );
}