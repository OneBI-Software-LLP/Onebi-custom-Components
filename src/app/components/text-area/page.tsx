"use client";

import React from "react";
import { Textarea, useTextarea } from "@/components/CustomTextarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
  const ta = useTextarea('');

  return (
    <Section label="Basic"
      ts={`import { Textarea, useTextarea } from "onebi-ui";

export default function BasicDemo() {
  const ta = useTextarea('');
  return (
    <Textarea
      label="Message"
      placeholder="Write your message here..."
      {...ta}
    />
  );
}`}
      js={`import { Textarea, useTextarea } from "onebi-ui";

export default function BasicDemo() {
  const ta = useTextarea('');
  return (
    <Textarea label="Message" placeholder="Write your message here..." {...ta} />
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Textarea label="Message" placeholder="Write your message here..." {...ta} />
          <Textarea label="Disabled" placeholder="Cannot edit this..." disabled />
          <Textarea label="Read only" value="This value cannot be changed." readOnly />
        </div>
      </Preview>
    </Section>
  );
}

// ── 2. Sizes ───────────────────────────────────────────────────────────────

function SizesBlock() {
  return (
    <Section label="Sizes"
      ts={`import { Textarea } from "onebi-ui";
import type { TextareaSize } from "onebi-ui";

export default function SizesDemo() {
  const sizes: TextareaSize[] = ["sm", "md", "lg"];
  return (
    <>
      {sizes.map((size) => (
        <Textarea key={size} size={size} label={size} placeholder={\`Size \${size}\`} rows={2} />
      ))}
    </>
  );
}`}
      js={`import { Textarea } from "onebi-ui";

export default function SizesDemo() {
  return (
    <>
      <Textarea size="sm" label="Small"  placeholder="Size sm" rows={2} />
      <Textarea size="md" label="Medium" placeholder="Size md" rows={2} />
      <Textarea size="lg" label="Large"  placeholder="Size lg" rows={2} />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Textarea size="sm" label="Small"  placeholder="Size sm" rows={2} />
          <Textarea size="md" label="Medium" placeholder="Size md" rows={2} />
          <Textarea size="lg" label="Large"  placeholder="Size lg" rows={2} />
        </div>
      </Preview>
    </Section>
  );
}

// ── 3. Variants ────────────────────────────────────────────────────────────

function VariantsBlock() {
  return (
    <Section label="Variants"
      ts={`import { Textarea } from "onebi-ui";

export default function VariantsDemo() {
  return (
    <>
      <Textarea variant="default" label="Default" placeholder="Default variant..." />
      <Textarea variant="filled"  label="Filled"  placeholder="Filled variant..."  />
      <Textarea variant="flushed" label="Flushed" placeholder="Flushed variant..." />
    </>
  );
}`}
      js={`import { Textarea } from "onebi-ui";

export default function VariantsDemo() {
  return (
    <>
      <Textarea variant="default" label="Default" placeholder="Default variant..." />
      <Textarea variant="filled"  label="Filled"  placeholder="Filled variant..."  />
      <Textarea variant="flushed" label="Flushed" placeholder="Flushed variant..." />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <Textarea variant="default" label="Default" placeholder="Default variant..." rows={2} />
          <Textarea variant="filled"  label="Filled"  placeholder="Filled variant..."  rows={2} />
          <Textarea variant="flushed" label="Flushed" placeholder="Flushed variant..." rows={2} />
        </div>
      </Preview>
    </Section>
  );
}

// ── 4. With description ────────────────────────────────────────────────────

function WithDescriptionBlock() {
  const ta = useTextarea('');

  return (
    <Section label="With description"
      ts={`import { Textarea, useTextarea } from "onebi-ui";

export default function WithDescriptionDemo() {
  const ta = useTextarea('');
  return (
    <Textarea
      label="Bio"
      description="Tell us a little about yourself. This will appear on your public profile."
      placeholder="I'm a software engineer who loves..."
      {...ta}
    />
  );
}`}
      js={`import { Textarea, useTextarea } from "onebi-ui";

export default function WithDescriptionDemo() {
  const ta = useTextarea('');
  return (
    <Textarea
      label="Bio"
      description="Tell us a little about yourself."
      placeholder="I'm a software engineer who loves..."
      {...ta}
    />
  );
}`}
    >
      <Preview>
        <Textarea
          label="Bio"
          description="Tell us a little about yourself. This will appear on your public profile."
          placeholder="I'm a software engineer who loves..."
          {...ta}
        />
      </Preview>
    </Section>
  );
}

// ── 5. With hint & error ───────────────────────────────────────────────────

function HintErrorBlock() {
  const ta1 = useTextarea('');
  const ta2 = useTextarea('This is way too short.');

  return (
    <Section label="Hint and error"
      ts={`import { Textarea, useTextarea } from "onebi-ui";

export default function HintErrorDemo() {
  const ta = useTextarea('');
  return (
    <>
      <Textarea label="Notes" hint="Markdown is supported." placeholder="Add notes..." {...ta} />
      <Textarea label="Review" error="Review must be at least 50 characters." value="Too short." onChange={() => {}} />
    </>
  );
}`}
      js={`import { Textarea, useTextarea } from "onebi-ui";

export default function HintErrorDemo() {
  const ta = useTextarea('');
  return (
    <>
      <Textarea label="Notes" hint="Markdown is supported." placeholder="Add notes..." {...ta} />
      <Textarea label="Review" error="Review must be at least 50 characters." value="Too short." onChange={() => {}} />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <Textarea
            label="Notes"
            hint="Markdown is supported."
            placeholder="Add notes..."
            rows={2}
            {...ta1}
          />
          <Textarea
            label="Review"
            error="Review must be at least 50 characters."
            rows={2}
            {...ta2}
          />
        </div>
      </Preview>
    </Section>
  );
}

// ── 6. Character count ─────────────────────────────────────────────────────

function CharCountBlock() {
  const ta = useTextarea('');

  return (
    <Section label="Character count"
      ts={`import { Textarea, useTextarea } from "onebi-ui";

export default function CharCountDemo() {
  const ta = useTextarea('');
  return (
    <Textarea
      label="Tweet"
      placeholder="What's happening?"
      maxLength={280}
      showCount
      {...ta}
    />
  );
}`}
      js={`import { Textarea, useTextarea } from "onebi-ui";

export default function CharCountDemo() {
  const ta = useTextarea('');
  return (
    <Textarea label="Tweet" placeholder="What's happening?" maxLength={280} showCount {...ta} />
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <Textarea
            label="Tweet"
            placeholder="What's happening?"
            maxLength={280}
            showCount
            rows={3}
            {...ta}
          />
        </div>
      </Preview>
    </Section>
  );
}

// ── 7. Resize modes ────────────────────────────────────────────────────────

function ResizeBlock() {
  return (
    <Section label="Resize modes"
      ts={`import { Textarea } from "onebi-ui";
import type { TextareaResize } from "onebi-ui";

export default function ResizeDemo() {
  return (
    <>
      <Textarea resize="none"     label="None"     placeholder="Cannot resize" />
      <Textarea resize="vertical" label="Vertical" placeholder="Drag bottom edge" />
      <Textarea resize="both"     label="Both"     placeholder="Drag any corner" />
      <Textarea resize="auto"     label="Auto"     placeholder="Grows as you type..." />
    </>
  );
}`}
      js={`import { Textarea } from "onebi-ui";

export default function ResizeDemo() {
  return (
    <>
      <Textarea resize="none"     label="None"     placeholder="Cannot resize" />
      <Textarea resize="vertical" label="Vertical" placeholder="Drag bottom edge" />
      <Textarea resize="both"     label="Both"     placeholder="Drag any corner" />
      <Textarea resize="auto"     label="Auto"     placeholder="Grows as you type..." />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {(["none","vertical","both","auto"] as const).map((r) => (
            <Textarea key={r} resize={r} label={r.charAt(0).toUpperCase() + r.slice(1)}
              placeholder={r === "auto" ? "Grows as you type..." : `resize="${r}"`} rows={2} />
          ))}
        </div>
      </Preview>
    </Section>
  );
}

// ── 8. Required ────────────────────────────────────────────────────────────

function RequiredBlock() {
  const ta = useTextarea('');

  return (
    <Section label="Required"
      ts={`import { Textarea, useTextarea } from "onebi-ui";

export default function RequiredDemo() {
  const ta = useTextarea('');
  return (
    <Textarea
      required
      label="Feedback"
      description="Please share your thoughts before submitting."
      placeholder="Your feedback here..."
      {...ta}
    />
  );
}`}
      js={`import { Textarea, useTextarea } from "onebi-ui";

export default function RequiredDemo() {
  const ta = useTextarea('');
  return (
    <Textarea required label="Feedback"
      description="Please share your thoughts before submitting."
      placeholder="Your feedback here..." {...ta} />
  );
}`}
    >
      <Preview>
        <Textarea
          required
          label="Feedback"
          description="Please share your thoughts before submitting."
          placeholder="Your feedback here..."
          rows={4}
          {...ta}
        />
      </Preview>
    </Section>
  );
}

// ── 9. Count + error combo ─────────────────────────────────────────────────

function CountErrorBlock() {
  const ta = useTextarea('');
  const tooShort = ta.value.length > 0 && ta.value.length < 20;

  return (
    <Section label="Count + validation"
      ts={`import React from "react";
import { Textarea, useTextarea } from "onebi-ui";

export default function CountValidationDemo() {
  const ta = useTextarea('');
  const tooShort = ta.value.length > 0 && ta.value.length < 20;

  return (
    <Textarea
      label="Comment"
      placeholder="Write at least 20 characters..."
      maxLength={200}
      showCount
      error={tooShort ? "Comment must be at least 20 characters." : undefined}
      {...ta}
    />
  );
}`}
      js={`import React from "react";
import { Textarea, useTextarea } from "onebi-ui";

export default function CountValidationDemo() {
  const ta = useTextarea('');
  const tooShort = ta.value.length > 0 && ta.value.length < 20;

  return (
    <Textarea label="Comment" placeholder="Write at least 20 characters..."
      maxLength={200} showCount
      error={tooShort ? "Comment must be at least 20 characters." : undefined}
      {...ta} />
  );
}`}
    >
      <Preview>
        <Textarea
          label="Comment"
          placeholder="Write at least 20 characters..."
          maxLength={200}
          showCount
          rows={3}
          error={tooShort ? "Comment must be at least 20 characters." : undefined}
          {...ta}
        />
      </Preview>
    </Section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function TextareaPage() {
  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Textarea suite
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive guide to every variant, size, resize mode, and state available.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            <BasicBlock />
            <Separator className="bg-slate-100" />
            <SizesBlock />
            <Separator className="bg-slate-100" />
            <VariantsBlock />
            <Separator className="bg-slate-100" />
            <WithDescriptionBlock />
            <Separator className="bg-slate-100" />
            <HintErrorBlock />
            <Separator className="bg-slate-100" />
            <CharCountBlock />
            <Separator className="bg-slate-100" />
            <ResizeBlock />
            <Separator className="bg-slate-100" />
            <RequiredBlock />
            <Separator className="bg-slate-100" />
            <CountErrorBlock />
          </div>
        </div>
      </div>
    </div>
  );
}