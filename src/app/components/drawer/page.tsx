"use client";

import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CustomDrawer, { DrawerHeader, DrawerBody, DrawerFooter, useDrawer, DrawerPlacement, DrawerSize, DrawerBackdrop } from "@/components/CustomDrawer";

// ─── Shared mini button style ──────────────────────────────────────────────────
const btn = (primary?: boolean): React.CSSProperties => ({
  padding: "7px 16px", fontSize: 13, borderRadius: 8, cursor: "pointer",
  border: primary ? "none" : "1px solid #d3d1c7",
  background: primary ? "#0F172A" : "transparent",
  color: primary ? "#fff" : "inherit",
  transition: "opacity 0.15s, background 0.15s",
});

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-6 border-t border-slate-100 pt-6">
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

function Section({ title, description, code, children }: { title: string; description?: string; code?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          {title}
        </Label>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      <div>{children}</div>
      {code && <CodeBlock code={code} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLES (Ported from Drawer.usage.jsx)
// ─────────────────────────────────────────────────────────────────────────────

function BasicExample() {
  const drawer = useDrawer();
  return (
    <div className="mt-4">
      <button style={btn(true)} onClick={drawer.open}>Open Custom Drawer</button>
      <CustomDrawer open={drawer.isOpen} onClose={drawer.close} title="Basic drawer" description="Slides in from the right">
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b" }}>
          This is the default drawer. It overlays the page content, dims the backdrop, and closes on Esc or backdrop click.
        </p>
      </CustomDrawer>
    </div>
  );
}

function PlacementsExample() {
  const [active, setActive] = useState<DrawerPlacement | null>(null);
  const placements: DrawerPlacement[] = ["left", "right", "top", "bottom"];

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "16px" }}>
      {placements.map((p) => (
        <button key={p} style={btn()} onClick={() => setActive(p)}>From {p}</button>
      ))}
      {placements.map((p) => (
        <CustomDrawer
          key={p}
          open={active === p}
          onClose={() => setActive(null)}
          placement={p}
          title={`${p.charAt(0).toUpperCase() + p.slice(1)} drawer`}
          description={`Slides in from the ${p}`}
          size={p === "top" || p === "bottom" ? 280 : 320}
        >
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b" }}>Content for the {p} drawer.</p>
        </CustomDrawer>
      ))}
    </div>
  );
}

function VariantsExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlay  = useDrawer();
  const push     = useDrawer();
  const floating = useDrawer();

  return (
    <div ref={containerRef} style={{ display: "flex", gap: 8, flexWrap: "wrap", overflow: "hidden", padding: "10px", border: "1px dashed #cbd5e1", borderRadius: 8, marginTop: "16px" }}>
      <button style={btn()} onClick={overlay.open}>Overlay Variant</button>
      <button style={btn()} onClick={push.open}>Push Variant</button>
      <button style={btn()} onClick={floating.open}>Floating Variant</button>

      <CustomDrawer open={overlay.isOpen} onClose={overlay.close} variant="overlay" title="Overlay drawer">
        <p style={{ fontSize: 14, color: "#64748b" }}>Slides over the page. Backdrop dims the content behind.</p>
      </CustomDrawer>

      <CustomDrawer open={push.isOpen} onClose={push.close} variant="push" title="Push drawer"
        containerRef={containerRef} backdrop="none" portalTarget={containerRef.current}>
        <p style={{ fontSize: 14, color: "#64748b" }}>Pushes the container content to the side. Uses a localized portal target (the dashed box).</p>
      </CustomDrawer>

      <CustomDrawer open={floating.isOpen} onClose={floating.close} variant="floating" title="Floating drawer"
        borderRadius={16} backdrop="blur">
        <p style={{ fontSize: 14, color: "#64748b" }}>Detached from the edge with rounded corners and a blur backdrop.</p>
      </CustomDrawer>
    </div>
  );
}

function SizesExample() {
  const [active, setActive] = useState<DrawerSize | null>(null);
  const sizes: { label: string, size: DrawerSize }[] = [
    { label: "sm (240px)", size: "sm" },
    { label: "md (320px)", size: "md" },
    { label: "lg (440px)", size: "lg" },
    { label: "full", size: "full" }
  ];

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "16px" }}>
      {sizes.map(({ label, size }) => (
        <button key={size.toString()} style={btn()} onClick={() => setActive(size)}>{label}</button>
      ))}
      {sizes.map(({ size }) => (
        <CustomDrawer key={size.toString()} open={active === size} onClose={() => setActive(null)} size={size}
          title={`Size: ${size}`}>
          <p style={{ fontSize: 14, color: "#64748b" }}>Drawer width: <strong>{size}</strong>.</p>
        </CustomDrawer>
      ))}
    </div>
  );
}

function BackdropExample() {
  const [active, setActive] = useState<DrawerBackdrop | null>(null);
  const variants: DrawerBackdrop[] = ["dim", "blur", "none"];

  return (
    <div style={{ display: "flex", gap: 8, marginTop: "16px" }}>
      {variants.map((v) => (
        <button key={v} style={btn()} onClick={() => setActive(v)}>Backdrop: {v}</button>
      ))}
      {variants.map((v) => (
        <CustomDrawer key={v} open={active === v} onClose={() => setActive(null)} backdrop={v}
          title={`Backdrop: ${v}`} description={v === "blur" ? "Blurs the content behind" : v === "none" ? "No backdrop at all" : "Dims the background"}>
          <p style={{ fontSize: 14, color: "#64748b" }}>Try clicking outside — {v === "none" ? "no backdrop to click, use Esc." : "closes the drawer."}</p>
        </CustomDrawer>
      ))}
    </div>
  );
}

function CustomHeaderFooterExample() {
  const drawer = useDrawer();
  return (
    <div className="mt-4">
      <button style={btn()} onClick={drawer.open}>Custom Header & Footer</button>
      <CustomDrawer
        open={drawer.isOpen}
        onClose={drawer.close}
        header={
          <DrawerHeader onClose={drawer.close} style={{ background: "#0F172A", borderBottom: 0 }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Custom Branding</p>
              <p style={{ fontSize: 13, color: "#94a3b8" }}>Fully isolated slot</p>
            </div>
          </DrawerHeader>
        }
        footer={
          <DrawerFooter>
            <button style={btn(false)} onClick={drawer.close}>Discard</button>
            <button style={btn(true)} onClick={drawer.close}>Save changes</button>
          </DrawerFooter>
        }
      >
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b" }}>
          Pass any JSX to the <code>header</code> and <code>footer</code> props to fully control those slots.
        </p>
      </CustomDrawer>
    </div>
  );
}

function NavigationDrawerExample() {
  const drawer = useDrawer();
  const [active, setActive] = useState("Dashboard");
  const navItems = [
    { label: "Dashboard",  color: "#1D9E75" },
    { label: "Analytics",  color: "#378ADD" },
    { label: "Projects",   color: "#7F77DD" },
    { label: "Team",       color: "#EF9F27" },
    { label: "Settings",   color: "#888780" },
  ];

  return (
    <div className="mt-4">
      <button style={btn()} onClick={drawer.open}>☰ Open Navigation</button>
      <CustomDrawer open={drawer.isOpen} onClose={drawer.close} placement="left" size="sm"
        title="My App" showClose backdrop="dim">
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(({ label, color }) => (
            <button key={label} onClick={() => { setActive(label); drawer.close(); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, textAlign: "left", width: "100%",
                background: active === label ? "#f1efe8" : "transparent",
                fontWeight: active === label ? 500 : 400, color: active === label ? color : "inherit",
                transition: "background 0.15s" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
              {label}
            </button>
          ))}
          <div style={{ height: 1, background: "#d3d1c7", margin: "8px 0" }} />
          <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, background: "transparent",
            color: "#b91c1c" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#b91c1c" }} />
            Sign out
          </button>
        </div>
      </CustomDrawer>
    </div>
  );
}

function BottomSheetExample() {
  const drawer = useDrawer();
  return (
    <div className="mt-4">
      <button style={btn()} onClick={drawer.open}>Open Bottom Sheet</button>
      <CustomDrawer open={drawer.isOpen} onClose={drawer.close} placement="bottom" size={240}
        showHandle backdrop="dim" title="Share" description="Share this item">
        <div style={{ display: "flex", gap: 20, justifyContent: "center", padding: "8px 0" }}>
          {[["📋", "Copy"], ["✉️", "Email"], ["💬", "Message"], ["🔗", "Embed"]].map(([icon, label]) => (
            <button key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center",
              gap: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, color: "inherit" }}>
              <span style={{ fontSize: 32 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </CustomDrawer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function DrawerPageContent() {
  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Drawer
            </h2>
            <p className="text-lg text-slate-500">
              A highly configurable slide-out panel component for navigation, filters, settings, and complex forms.
            </p>
          </div>
          
          <div className="grid gap-10 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 relative overflow-hidden">
            
            <Section 
              title="1. Basic Usage" 
              description="Drop it in, trigger it."
              code={`import CustomDrawer, { useDrawer } from "@/components/CustomDrawer";

export default function App() {
  const drawer = useDrawer();

  return (
    <>
      <button onClick={drawer.open}>Open Custom Drawer</button>
      <CustomDrawer 
        open={drawer.isOpen} 
        onClose={drawer.close} 
        title="Basic drawer" 
        description="Slides in from the right"
      >
        <p>Drawer content goes here</p>
      </CustomDrawer>
    </>
  );
}`}
            >
              <BasicExample />
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section 
              title="2. Placements" 
              description="Slide in from any direction."
              code={`<CustomDrawer open={open} onClose={onClose} placement="left" title="Left drawer" />`}
            >
              <PlacementsExample />
            </Section>

            <Separator className="bg-slate-100" />
            
            <Section 
              title="3. Variants" 
              description="Overlay, Push, or Floating panel behaviors."
              code={`<CustomDrawer open={open} onClose={onClose} variant="floating" borderRadius={16} />`}
            >
              <VariantsExample />
            </Section>

            <Separator className="bg-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Section 
                title="4. Sizes" 
                description="sm, md, lg, or full width."
                code={`<CustomDrawer open={open} onClose={onClose} size="lg" />`}
              >
                <SizesExample />
              </Section>
              
              <Section 
                title="5. Backdrops" 
                description="Dim, Blur, or no backdrop at all."
                code={`<CustomDrawer open={open} onClose={onClose} backdrop="blur" />`}
              >
                <BackdropExample />
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Section 
                title="6. Custom Header & Footer" 
                description="Replace the default slots."
                code={`<CustomDrawer
  open={drawer.isOpen}
  onClose={drawer.close}
  header={<DrawerHeader onClose={drawer.close}><div>Custom Branding</div></DrawerHeader>}
  footer={<DrawerFooter><button>Save</button></DrawerFooter>}
>
  <p>Body</p>
</CustomDrawer>`}
              >
                <CustomHeaderFooterExample />
              </Section>
              
              <Section 
                title="7. Navigation Drawer" 
                description="Sidebar navigation pattern."
                code={`<CustomDrawer placement="left" size="sm" title="My App" showClose backdrop="dim">
  <nav>
    <button>Dashboard</button>
  </nav>
</CustomDrawer>`}
              >
                <NavigationDrawerExample />
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            <Section 
              title="8. Bottom Sheet" 
              description="A mobile-oriented share sheet."
              code={`<CustomDrawer placement="bottom" size={240} showHandle backdrop="dim" title="Share">
  <div>Share Content Here</div>
</CustomDrawer>`}
            >
              <BottomSheetExample />
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawerPageContent;
