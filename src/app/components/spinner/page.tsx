"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner, OverlaySpinner } from "@/components/CustomSpinner";

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

const DEMO_COLORS = [
  ["blue",   "#185FA5"],
  ["teal",   "#1D9E75"],
  ["purple", "#534AB7"],
  ["coral",  "#D85A30"],
  ["amber",  "#BA7517"],
  ["green",  "#3B6D11"],
  ["red",    "#E24B4A"],
  ["pink",   "#993556"],
  ["dark",   "#444441"],
  ["muted",  "#B4B2A9"],
];

const DEMO_TYPES = [
  "ring", "arc", "dual-ring", "dots", "bounce",
  "bars", "pulse", "orbit", "clock", "ripple",
];

const DEMO_SIZES = ["xs", "sm", "md", "lg", "xl"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {title}
      </Label>
      {children}
    </div>
  );
}

function GridRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {children}
    </div>
  );
}

function GridCell({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      {label && <span className="text-[10px] text-slate-400 text-center">{label}</span>}
    </div>
  );
}

function LoadingButton({ children, type = "ring", color = "primary", ...props }: any) {
  return (
    <button
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-[13px] cursor-pointer text-slate-900 transition-colors hover:bg-slate-50"
      {...props}
    >
      <Spinner type={type} size="xs" color={color} />
      {children}
    </button>
  );
}

export default function SpinnerPage() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Spinner Component
            </h2>
            <p className="text-lg text-slate-500">
              10 types · 5 sizes · 10 colors · labels · overlay · presets.
            </p>
          </div>

          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            
            <Section title="All spinner types">
              <GridRow>
                {DEMO_TYPES.map((t: any) => (
                  <GridCell key={t} label={t}>
                    <Spinner type={t} size="md" color="blue" />
                  </GridCell>
                ))}
              </GridRow>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Sizes — xs · sm · md · lg · xl">
              <div className="space-y-8">
                <GridRow>
                  {DEMO_SIZES.map((s: any) => (
                    <GridCell key={s} label={s}>
                      <Spinner type="arc" size={s} color="teal" />
                    </GridCell>
                  ))}
                </GridRow>
                <GridRow>
                  {DEMO_SIZES.map((s: any) => (
                    <GridCell key={s} label={s}>
                      <Spinner type="dots" size={s} color="purple" />
                    </GridCell>
                  ))}
                </GridRow>
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Color variants — ring type">
              <GridRow>
                {DEMO_COLORS.map(([name, hex]) => (
                  <GridCell key={name} label={name}>
                    <Spinner type="ring" size="md" color={hex} />
                  </GridCell>
                ))}
              </GridRow>
            </Section>
            
            <div className="pt-2">
              <Section title="Color variants — arc type">
                <GridRow>
                  {DEMO_COLORS.map(([name, hex]) => (
                    <GridCell key={name} label={name}>
                      <Spinner type="arc" size="md" color={hex} />
                    </GridCell>
                  ))}
                </GridRow>
              </Section>
            </div>

            <Separator className="bg-slate-100" />
            
            <Section title="Label positions">
              <GridRow>
                {(["bottom", "right", "top", "left"] as const).map((pos) => (
                  <GridCell key={pos} label={`label ${pos}`}>
                    <Spinner type="ring" size="md" color="coral" label="Loading…" labelPosition={pos} />
                  </GridCell>
                ))}
              </GridRow>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Animation speeds">
              <GridRow>
                {(Object.entries({ fast: 400, normal: 700, slow: 1200 })).map(([name, ms]) => (
                  <GridCell key={name} label={`${name} (${ms}ms)`}>
                    <Spinner type="arc" size="md" color="amber" speed={ms} />
                  </GridCell>
                ))}
                <GridCell label="paused">
                  <Spinner type="arc" size="md" color="amber" paused />
                </GridCell>
              </GridRow>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Button loading states">
              <div className="flex flex-wrap gap-3">
                <LoadingButton type="ring" color="#185FA5">Saving changes</LoadingButton>
                <LoadingButton type="dots" color="#1D9E75">Uploading</LoadingButton>
                <LoadingButton type="arc"  color="#534AB7">Processing</LoadingButton>
                <LoadingButton type="bars" color="#D85A30">Analyzing</LoadingButton>
                <LoadingButton type="pulse" color="#BA7517">Generating</LoadingButton>
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Inline in text / UI">
              <div className="flex flex-col gap-3 max-w-[300px]">
                {[
                  { text: "Fetching your data…", type: "ring",  color: "blue"   },
                  { text: "Syncing to cloud…",   type: "dots",  color: "#1D9E75" },
                  { text: "AI is thinking…",     type: "pulse", color: "#534AB7" },
                ].map(({ text, type, color }) => (
                  <div key={text} className="flex items-center gap-3 text-[13px] text-slate-500 px-4 py-3 bg-slate-50 rounded-lg">
                    <Spinner type={type as any} size="xs" color={color} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Overlay loading state">
              <div className="relative rounded-xl overflow-hidden border border-slate-200">
                <div className="p-6 bg-slate-50 flex flex-col gap-3 blur-[1px]">
                  {[80, 60, 72].map((w, i) => (
                    <div key={i} className="h-3 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
                  ))}
                </div>
                <OverlaySpinner type="arc" size="lg" color="blue" label="Loading data…" overlayBlur />
              </div>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Track opacity variations">
              <GridRow>
                {[0.05, 0.12, 0.2, 0.35].map((op) => (
                  <GridCell key={op} label={`${Math.round(op * 100)}%`}>
                    <Spinner type="ring" size="md" color="#534AB7" trackOpacity={op} />
                  </GridCell>
                ))}
              </GridRow>
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section title="Stroke thickness">
              <GridRow>
                {[1, 2, 3, 5, 7].map((t) => (
                  <GridCell key={t} label={`${t}px`}>
                    <Spinner type="ring" size="md" color="#D85A30" thickness={t} />
                  </GridCell>
                ))}
              </GridRow>
            </Section>

            <CodeBlock
              code={`import { Spinner, OverlaySpinner, InlineSpinner, PageSpinner } from "@/components/CustomSpinner";

export default function SpinnerDemo() {
  return (
    <div className="space-y-4">
      {/* Standard Spinner */}
      <Spinner type="dots" size="lg" color="teal" />

      {/* Button using inline spinner */}
      <button disabled className="flex items-center gap-2">
         <InlineSpinner color="currentColor" />
         Saving changes...
      </button>
      
      {/* Container Overlay */}
      <div className="relative w-full h-48 border">
         <p>Some content being hidden...</p>
         <OverlaySpinner type="arc" size="lg" color="blue" label="Loading data…" overlayBlur />
      </div>
    </div>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
