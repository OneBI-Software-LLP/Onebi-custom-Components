"use client";

import React from "react";
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
} from "@/components/ui/skeleton";
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

function Section({ label, ts, js, children }: {
  label: string; ts: string; js: string; children: React.ReactNode;
}) {
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
  return (
    <Section label="Basic"
      ts={`import { Skeleton } from "onebi-ui";

export default function BasicDemo() {
  return (
    <>
      <Skeleton width="100%" height={16} />
      <Skeleton width="80%"  height={16} />
      <Skeleton width="60%"  height={16} />
    </>
  );
}`}
      js={`import { Skeleton } from "onebi-ui";

export default function BasicDemo() {
  return (
    <>
      <Skeleton width="100%" height={16} />
      <Skeleton width="80%"  height={16} />
      <Skeleton width="60%"  height={16} />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <Skeleton width="100%" height={16} />
          <Skeleton width="80%"  height={16} />
          <Skeleton width="60%"  height={16} />
        </div>
      </Preview>
    </Section>
  );
}

// ── 2. Variants ────────────────────────────────────────────────────────────

function VariantsBlock() {
  return (
    <Section label="Variants"
      ts={`import { Skeleton } from "onebi-ui";
import type { SkeletonVariant } from "onebi-ui";

const variants: SkeletonVariant[] = ["default", "shimmer", "wave", "pulse"];

export default function VariantsDemo() {
  return (
    <>
      {variants.map((v) => (
        <Skeleton key={v} variant={v} width="100%" height={20} />
      ))}
    </>
  );
}`}
      js={`import { Skeleton } from "onebi-ui";

export default function VariantsDemo() {
  return (
    <>
      <Skeleton variant="default" width="100%" height={20} />
      <Skeleton variant="shimmer" width="100%" height={20} />
      <Skeleton variant="wave"    width="100%" height={20} />
      <Skeleton variant="pulse"   width="100%" height={20} />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {(["default","shimmer","wave","pulse"] as const).map((v) => (
            <div key={v}>
              <p style={{ fontSize:12, color:"#64748b", marginBottom:6, fontWeight:500 }}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </p>
              <Skeleton variant={v} width="100%" height={20} />
            </div>
          ))}
        </div>
      </Preview>
    </Section>
  );
}

// ── 3. Shapes ──────────────────────────────────────────────────────────────

function ShapesBlock() {
  return (
    <Section label="Shapes"
      ts={`import { Skeleton } from "onebi-ui";
import type { SkeletonShape } from "onebi-ui";

export default function ShapesDemo() {
  return (
    <>
      <Skeleton shape="rectangle" width={100} height={60} />
      <Skeleton shape="rounded"   width={100} height={60} />
      <Skeleton shape="pill"      width={100} height={32} />
      <Skeleton shape="circle"    width={60}  height={60} />
    </>
  );
}`}
      js={`import { Skeleton } from "onebi-ui";

export default function ShapesDemo() {
  return (
    <>
      <Skeleton shape="rectangle" width={100} height={60} />
      <Skeleton shape="rounded"   width={100} height={60} />
      <Skeleton shape="pill"      width={100} height={32} />
      <Skeleton shape="circle"    width={60}  height={60} />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          {(["rectangle","rounded","pill","circle"] as const).map((s) => (
            <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <Skeleton shape={s}
                width={s === "circle" ? 56 : s === "pill" ? 96 : 80}
                height={s === "circle" ? 56 : s === "pill" ? 28 : 52}
              />
              <span style={{ fontSize:11, color:"#94a3b8" }}>{s}</span>
            </div>
          ))}
        </div>
      </Preview>
    </Section>
  );
}

// ── 4. Sizes ───────────────────────────────────────────────────────────────

function SizesBlock() {
  return (
    <Section label="Sizes"
      ts={`import { Skeleton } from "onebi-ui";
import type { SkeletonSize } from "onebi-ui";

export default function SizesDemo() {
  const sizes: SkeletonSize[] = ["sm", "md", "lg"];
  return (
    <>
      {sizes.map((size) => (
        <Skeleton key={size} size={size} shape="pill" width="70%" />
      ))}
    </>
  );
}`}
      js={`import { Skeleton } from "onebi-ui";

export default function SizesDemo() {
  return (
    <>
      <Skeleton size="sm" shape="pill" width="70%" />
      <Skeleton size="md" shape="pill" width="70%" />
      <Skeleton size="lg" shape="pill" width="70%" />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {(["sm","md","lg"] as const).map((s) => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:11, color:"#94a3b8", width:20 }}>{s}</span>
              <Skeleton size={s} shape="pill" width="70%" />
            </div>
          ))}
        </div>
      </Preview>
    </Section>
  );
}

// ── 5. SkeletonText ────────────────────────────────────────────────────────

function SkeletonTextBlock() {
  return (
    <Section label="SkeletonText"
      ts={`import { SkeletonText } from "onebi-ui";

export default function SkeletonTextDemo() {
  return (
    <>
      <SkeletonText lines={4} />
      <SkeletonText lines={3} lastLineWidth="40%" variant="wave" />
    </>
  );
}`}
      js={`import { SkeletonText } from "onebi-ui";

export default function SkeletonTextDemo() {
  return (
    <>
      <SkeletonText lines={4} />
      <SkeletonText lines={3} lastLineWidth="40%" variant="wave" />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <SkeletonText lines={4} />
          <SkeletonText lines={3} lastLineWidth="40%" variant="wave" />
          <SkeletonText lines={2} size="lg" variant="pulse" />
        </div>
      </Preview>
    </Section>
  );
}

// ── 6. SkeletonAvatar ──────────────────────────────────────────────────────

function SkeletonAvatarBlock() {
  return (
    <Section label="SkeletonAvatar"
      ts={`import { SkeletonAvatar } from "onebi-ui";

export default function SkeletonAvatarDemo() {
  return (
    <>
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size={80} />
      <SkeletonAvatar size="md" shape="rounded" />
    </>
  );
}`}
      js={`import { SkeletonAvatar } from "onebi-ui";

export default function SkeletonAvatarDemo() {
  return (
    <>
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size={80} />
      <SkeletonAvatar size="md" shape="rounded" />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", gap:16, alignItems:"flex-end", flexWrap:"wrap" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <SkeletonAvatar size="sm" />
            <span style={{ fontSize:11, color:"#94a3b8" }}>sm</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <SkeletonAvatar size="md" />
            <span style={{ fontSize:11, color:"#94a3b8" }}>md</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <SkeletonAvatar size="lg" />
            <span style={{ fontSize:11, color:"#94a3b8" }}>lg</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <SkeletonAvatar size={80} />
            <span style={{ fontSize:11, color:"#94a3b8" }}>80px</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <SkeletonAvatar size="md" shape="rounded" />
            <span style={{ fontSize:11, color:"#94a3b8" }}>rounded</span>
          </div>
        </div>
      </Preview>
    </Section>
  );
}

// ── 7. SkeletonCard ────────────────────────────────────────────────────────

function SkeletonCardBlock() {
  return (
    <Section label="SkeletonCard"
      ts={`import { SkeletonCard } from "onebi-ui";

export default function SkeletonCardDemo() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:16 }}>
      <SkeletonCard />
      <SkeletonCard hasImage lines={2} hasActions />
      <SkeletonCard hasAvatar={false} lines={4} variant="pulse" />
    </div>
  );
}`}
      js={`import { SkeletonCard } from "onebi-ui";

export default function SkeletonCardDemo() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:16 }}>
      <SkeletonCard />
      <SkeletonCard hasImage lines={2} hasActions />
      <SkeletonCard hasAvatar={false} lines={4} variant="pulse" />
    </div>
  );
}`}
    >
      <Preview>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16 }}>
          <SkeletonCard />
          <SkeletonCard hasImage lines={2} hasActions />
          <SkeletonCard hasAvatar={false} lines={4} variant="pulse" />
        </div>
      </Preview>
    </Section>
  );
}

// ── 8. SkeletonTable ───────────────────────────────────────────────────────

function SkeletonTableBlock() {
  return (
    <Section label="SkeletonTable"
      ts={`import { SkeletonTable } from "onebi-ui";

export default function SkeletonTableDemo() {
  return (
    <>
      <SkeletonTable rows={5} cols={4} />
      <SkeletonTable rows={3} cols={3} hasHeader={false} variant="wave" />
    </>
  );
}`}
      js={`import { SkeletonTable } from "onebi-ui";

export default function SkeletonTableDemo() {
  return (
    <>
      <SkeletonTable rows={5} cols={4} />
      <SkeletonTable rows={3} cols={3} hasHeader={false} variant="wave" />
    </>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <SkeletonTable rows={5} cols={4} />
          <SkeletonTable rows={3} cols={3} hasHeader={false} variant="wave" />
        </div>
      </Preview>
    </Section>
  );
}

// ── 9. Real-world: Profile page ────────────────────────────────────────────

function ProfilePatternBlock() {
  return (
    <Section label="Pattern — profile page"
      ts={`import { Skeleton, SkeletonText, SkeletonAvatar } from "onebi-ui";

export default function ProfileSkeletonDemo() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
        <SkeletonAvatar size={64} />
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
          <Skeleton shape="pill" width="35%" height={16} />
          <Skeleton shape="pill" width="22%" height={12} />
        </div>
        <Skeleton shape="pill" width={88} height={34} />
      </div>
      <SkeletonText lines={4} lastLineWidth="55%" />
      <div style={{ display:"flex", gap:12 }}>
        {[1,2,3].map((i) => (
          <Skeleton key={i} shape="rounded" height={100} style={{ flex:1 }} />
        ))}
      </div>
    </div>
  );
}`}
      js={`import { Skeleton, SkeletonText, SkeletonAvatar } from "onebi-ui";

export default function ProfileSkeletonDemo() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
        <SkeletonAvatar size={64} />
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
          <Skeleton shape="pill" width="35%" height={16} />
          <Skeleton shape="pill" width="22%" height={12} />
        </div>
        <Skeleton shape="pill" width={88} height={34} />
      </div>
      <SkeletonText lines={4} lastLineWidth="55%" />
    </div>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <SkeletonAvatar size={64} />
            <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
              <Skeleton shape="pill" width="35%" height={16} />
              <Skeleton shape="pill" width="22%" height={12} />
            </div>
            <Skeleton shape="pill" width={88} height={34} />
          </div>
          <SkeletonText lines={4} lastLineWidth="55%" />
          <div style={{ display:"flex", gap:12 }}>
            {[1,2,3].map((i) => (
              <Skeleton key={i} shape="rounded" height={100} style={{ flex:1 }} />
            ))}
          </div>
        </div>
      </Preview>
    </Section>
  );
}

// ── 10. Real-world: Feed ───────────────────────────────────────────────────

function FeedPatternBlock() {
  return (
    <Section label="Pattern — feed / list"
      ts={`import { Skeleton, SkeletonText, SkeletonAvatar } from "onebi-ui";

export default function FeedSkeletonDemo() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {[1,2,3].map((i) => (
        <div key={i} style={{ display:"flex", gap:12 }}>
          <SkeletonAvatar size="md" />
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
            <Skeleton shape="pill" width="30%" height={12} />
            <SkeletonText lines={2} lastLineWidth="80%" />
          </div>
        </div>
      ))}
    </div>
  );
}`}
      js={`import { Skeleton, SkeletonText, SkeletonAvatar } from "onebi-ui";

export default function FeedSkeletonDemo() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {[1,2,3].map((i) => (
        <div key={i} style={{ display:"flex", gap:12 }}>
          <SkeletonAvatar size="md" />
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
            <Skeleton shape="pill" width="30%" height={12} />
            <SkeletonText lines={2} lastLineWidth="80%" />
          </div>
        </div>
      ))}
    </div>
  );
}`}
    >
      <Preview>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {[1,2,3].map((i) => (
            <div key={i} style={{ display:"flex", gap:12 }}>
              <SkeletonAvatar size="md" />
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
                <Skeleton shape="pill" width="30%" height={12} />
                <SkeletonText lines={2} lastLineWidth="80%" />
              </div>
            </div>
          ))}
        </div>
      </Preview>
    </Section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function SkeletonPage() {
  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Skeleton suite
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive guide to every variant, shape, size, and composite pattern available.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            <BasicBlock />
            <Separator className="bg-slate-100" />
            <VariantsBlock />
            <Separator className="bg-slate-100" />
            <ShapesBlock />
            <Separator className="bg-slate-100" />
            <SizesBlock />
            <Separator className="bg-slate-100" />
            <SkeletonTextBlock />
            <Separator className="bg-slate-100" />
            <SkeletonAvatarBlock />
            <Separator className="bg-slate-100" />
            <SkeletonCardBlock />
            <Separator className="bg-slate-100" />
            <SkeletonTableBlock />
            <Separator className="bg-slate-100" />
            <ProfilePatternBlock />
            <Separator className="bg-slate-100" />
            <FeedPatternBlock />
          </div>
        </div>
      </div>
    </div>
  );
}