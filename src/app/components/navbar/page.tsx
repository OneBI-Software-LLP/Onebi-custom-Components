"use client";

import React from "react";
import {
  Navbar,
  NavbarRoot,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarEnd,
  useNavbar,
} from "@/components/ui/Navbar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// ── Icons ──────────────────────────────────────────────────────────────────

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#6366f1"/>
    <path d="M7 17L12 7l5 10H7z" fill="white"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const LayersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const BarChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

// ── Shared nav items ───────────────────────────────────────────────────────

const basicItems = [
  { key: "home",      label: "Home" },
  { key: "products",  label: "Products" },
  { key: "pricing",   label: "Pricing" },
  { key: "docs",      label: "Docs" },
];

const iconItems = [
  { key: "home",      label: "Home",      icon: <HomeIcon /> },
  { key: "products",  label: "Products",  icon: <LayersIcon /> },
  { key: "analytics", label: "Analytics", icon: <BarChartIcon /> },
  { key: "settings",  label: "Settings",  icon: <SettingsIcon /> },
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
          transition:"color 150ms, background 150ms",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
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

// ── Navbar preview wrapper ─────────────────────────────────────────────────

function Preview({ children, bg = "#f8fafc" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{ borderRadius:"0.75rem", overflow:"hidden", border:"0.5px solid #e2e8f0", background: bg }}>
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  SECTION BLOCKS
// ══════════════════════════════════════════════════════════════

/* ── 1. Variants ── */
function VariantsBlock() {
  const n1 = useNavbar("home");
  const n2 = useNavbar("home");
  const n3 = useNavbar("home");
  const n4 = useNavbar("home");
  const n5 = useNavbar("home");

  const brand = (
    <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>
  );

  return (
    <Section label="Variants"
      ts={`import { Navbar, useNavbar } from "onebi-ui";

export default function VariantsDemo() {
  const nav = useNavbar("home");

  const items = [
    { key:"home",     label:"Home"     },
    { key:"products", label:"Products" },
    { key:"pricing",  label:"Pricing"  },
    { key:"docs",     label:"Docs"     },
  ];

  return (
    <>
      <Navbar variant="default"     brand={<>Acme</>} items={items} {...nav} />
      <Navbar variant="bordered"    brand={<>Acme</>} items={items} {...nav} />
      <Navbar variant="filled"      brand={<>Acme</>} items={items} {...nav} />
      <Navbar variant="floating"    brand={<>Acme</>} items={items} {...nav} />
      <Navbar variant="transparent" brand={<>Acme</>} items={items} {...nav} />
    </>
  );
}`}
      js={`import { Navbar, useNavbar } from "onebi-ui";

export default function VariantsDemo() {
  const nav = useNavbar("home");

  const items = [
    { key:"home",     label:"Home"     },
    { key:"products", label:"Products" },
    { key:"pricing",  label:"Pricing"  },
    { key:"docs",     label:"Docs"     },
  ];

  return (
    <>
      <Navbar variant="default"     brand="Acme" items={items} {...nav} />
      <Navbar variant="bordered"    brand="Acme" items={items} {...nav} />
      <Navbar variant="filled"      brand="Acme" items={items} {...nav} />
      <Navbar variant="floating"    brand="Acme" items={items} {...nav} />
      <Navbar variant="transparent" brand="Acme" items={items} {...nav} />
    </>
  );
}`}
    >
      {([
        { ctrl: n1, variant: "default"     as const, label: "Default" },
        { ctrl: n2, variant: "bordered"    as const, label: "Bordered" },
        { ctrl: n3, variant: "filled"      as const, label: "Filled" },
        { ctrl: n4, variant: "floating"    as const, label: "Floating" },
        { ctrl: n5, variant: "transparent" as const, label: "Transparent" },
      ]).map(({ ctrl, variant, label }) => (
        <div key={variant}>
          <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
          <Preview>
            <Navbar brand={brand} items={basicItems} variant={variant}
              activeKey={ctrl.activeKey} onSelect={ctrl.onSelect} />
          </Preview>
        </div>
      ))}
    </Section>
  );
}

/* ── 2. Colors ── */
function ColorsBlock() {
  const n1 = useNavbar("home");
  const n2 = useNavbar("home");
  const n3 = useNavbar("home");
  const n4 = useNavbar("home");

  const brand = <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>;

  return (
    <Section label="Colors"
      ts={`import { Navbar, useNavbar } from "onebi-ui";

export default function ColorsDemo() {
  const nav = useNavbar("home");

  return (
    <>
      <Navbar color="white"   brand="Acme" items={items} {...nav} />
      <Navbar color="filled"  brand="Acme" items={items} {...nav} />
      <Navbar color="dark"    brand="Acme" items={items} {...nav} />
      <Navbar color="primary" brand="Acme" items={items} {...nav} />
      <Navbar color="blur"    brand="Acme" items={items} {...nav} />
    </>
  );
}`}
      js={`import { Navbar, useNavbar } from "onebi-ui";

export default function ColorsDemo() {
  const nav = useNavbar("home");

  return (
    <>
      <Navbar color="white"   brand="Acme" items={items} {...nav} />
      <Navbar color="dark"    brand="Acme" items={items} {...nav} />
      <Navbar color="primary" brand="Acme" items={items} {...nav} />
      <Navbar color="blur"    brand="Acme" items={items} {...nav} />
    </>
  );
}`}
    >
      <div><p className="text-xs text-slate-400 mb-2 font-medium">White (default)</p>
        <Preview><Navbar brand={brand} items={basicItems} color="white" activeKey={n1.activeKey} onSelect={n1.onSelect}/></Preview>
      </div>
      <div><p className="text-xs text-slate-400 mb-2 font-medium">Dark</p>
        <Preview bg="#0f172a"><Navbar brand={brand} items={basicItems} color="dark" activeKey={n2.activeKey} onSelect={n2.onSelect}/></Preview>
      </div>
      <div><p className="text-xs text-slate-400 mb-2 font-medium">Primary</p>
        <Preview bg="#4f46e5"><Navbar brand={brand} items={basicItems} color="primary" activeKey={n3.activeKey} onSelect={n3.onSelect}/></Preview>
      </div>
      <div><p className="text-xs text-slate-400 mb-2 font-medium">Blur</p>
        <Preview><Navbar brand={brand} items={basicItems} color="blur" activeKey={n4.activeKey} onSelect={n4.onSelect}/></Preview>
      </div>
    </Section>
  );
}

/* ── 3. Sizes ── */
function SizesBlock() {
  const brand = <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>;

  return (
    <Section label="Sizes"
      ts={`import { Navbar, useNavbar } from "onebi-ui";
import type { NavbarSize } from "onebi-ui";

export default function SizesDemo() {
  const nav = useNavbar("home");
  const sizes: NavbarSize[] = ["xs","sm","md","lg","xl"];

  return (
    <>
      {sizes.map((size) => (
        <Navbar key={size} size={size} brand="Acme" items={items} {...nav} />
      ))}
    </>
  );
}`}
      js={`import { Navbar, useNavbar } from "onebi-ui";

export default function SizesDemo() {
  const nav = useNavbar("home");

  return (
    <>
      {["xs","sm","md","lg","xl"].map((size) => (
        <Navbar key={size} size={size} brand="Acme" items={items} {...nav} />
      ))}
    </>
  );
}`}
    >
      {(["xs","sm","md","lg","xl"] as const).map((size) => {
        const nav = useNavbar("home");
        return (
          <div key={size}>
            <p className="text-xs text-slate-400 mb-2 font-medium uppercase">{size}</p>
            <Preview>
              <Navbar brand={brand} items={basicItems} size={size} activeKey={nav.activeKey} onSelect={nav.onSelect}/>
            </Preview>
          </div>
        );
      })}
    </Section>
  );
}

/* ── 4. With icons ── */
function WithIconsBlock() {
  const nav = useNavbar("home");
  const brand = <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>;

  return (
    <Section label="With icons"
      ts={`import { Navbar, useNavbar } from "onebi-ui";
import { HomeIcon, LayersIcon, BarChartIcon, SettingsIcon } from "./icons";

export default function WithIconsDemo() {
  const nav = useNavbar("home");

  const items = [
    { key:"home",      label:"Home",      icon: <HomeIcon />      },
    { key:"products",  label:"Products",  icon: <LayersIcon />    },
    { key:"analytics", label:"Analytics", icon: <BarChartIcon />  },
    { key:"settings",  label:"Settings",  icon: <SettingsIcon />  },
  ];

  return <Navbar brand={<>Acme</>} items={items} {...nav} />;
}`}
      js={`import { Navbar, useNavbar } from "onebi-ui";
import { HomeIcon, LayersIcon, BarChartIcon, SettingsIcon } from "./icons";

export default function WithIconsDemo() {
  const nav = useNavbar("home");

  return (
    <Navbar brand="Acme" items={[
      { key:"home",      label:"Home",      icon: <HomeIcon />     },
      { key:"products",  label:"Products",  icon: <LayersIcon />   },
      { key:"analytics", label:"Analytics", icon: <BarChartIcon /> },
      { key:"settings",  label:"Settings",  icon: <SettingsIcon /> },
    ]} {...nav} />
  );
}`}
    >
      <Preview>
        <Navbar brand={brand} items={iconItems} activeKey={nav.activeKey} onSelect={nav.onSelect} />
      </Preview>
    </Section>
  );
}

/* ── 5. With badges ── */
function WithBadgesBlock() {
  const nav = useNavbar("home");
  const brand = <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>;

  const badgeItems = [
    { key:"home",          label:"Home" },
    { key:"notifications", label:"Notifications", icon: <BellIcon />, badge: 4 },
    { key:"analytics",     label:"Analytics",     badge: "new" },
    { key:"settings",      label:"Settings" },
  ];

  return (
    <Section label="With badges"
      ts={`import { Navbar, useNavbar } from "onebi-ui";

export default function WithBadgesDemo() {
  const nav = useNavbar("home");

  const items = [
    { key:"home",          label:"Home"          },
    { key:"notifications", label:"Notifications", badge: 4     },
    { key:"analytics",     label:"Analytics",     badge: "new" },
    { key:"settings",      label:"Settings"      },
  ];

  return <Navbar brand={<>Acme</>} items={items} {...nav} />;
}`}
      js={`import { Navbar, useNavbar } from "onebi-ui";

export default function WithBadgesDemo() {
  const nav = useNavbar("home");

  return (
    <Navbar brand="Acme" items={[
      { key:"home",          label:"Home"                      },
      { key:"notifications", label:"Notifications", badge: 4   },
      { key:"analytics",     label:"Analytics",     badge:"new"},
      { key:"settings",      label:"Settings"                  },
    ]} {...nav} />
  );
}`}
    >
      <Preview>
        <Navbar brand={brand} items={badgeItems} activeKey={nav.activeKey} onSelect={nav.onSelect} />
      </Preview>
    </Section>
  );
}

/* ── 6. With end slot ── */
function WithEndSlotBlock() {
  const nav = useNavbar("home");
  const brand = <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>;

  const endSlot = (
    <>
      <button style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"0 12px", height:32,
        border:"0.5px solid #e2e8f0", borderRadius:8, background:"transparent",
        fontSize:13, fontWeight:500, color:"#475569", cursor:"pointer" }}>
        <SearchIcon /> Search
      </button>
      <button style={{ display:"inline-flex", alignItems:"center", padding:"0 14px", height:32,
        border:"none", borderRadius:8, background:"#6366f1",
        fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer" }}>
        Sign in
      </button>
    </>
  );

  return (
    <Section label="With end slot"
      ts={`import { Navbar, NavbarEnd, useNavbar } from "onebi-ui";

export default function WithEndSlotDemo() {
  const nav = useNavbar("home");

  return (
    <Navbar
      brand={<>Acme</>}
      items={items}
      endItems={
        <NavbarEnd>
          <button>Search</button>
          <button>Sign in</button>
        </NavbarEnd>
      }
      {...nav}
    />
  );
}`}
      js={`import { Navbar, NavbarEnd, useNavbar } from "onebi-ui";

export default function WithEndSlotDemo() {
  const nav = useNavbar("home");

  return (
    <Navbar
      brand="Acme"
      items={items}
      endItems={
        <NavbarEnd>
          <button>Search</button>
          <button>Sign in</button>
        </NavbarEnd>
      }
      {...nav}
    />
  );
}`}
    >
      <Preview>
        <Navbar brand={brand} items={basicItems} endItems={endSlot}
          activeKey={nav.activeKey} onSelect={nav.onSelect} />
      </Preview>
    </Section>
  );
}

/* ── 7. With dropdown ── */
function WithDropdownBlock() {
  const nav = useNavbar("home");
  const brand = <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>;

  const dropdownItems = [
    { key:"home",   label:"Home" },
    { key:"products", label:"Products", children: [
      { key:"design",     label:"Design system" },
      { key:"components", label:"Components" },
      { key:"icons",      label:"Icon library",    badge:"soon", disabled: true },
    ]},
    { key:"pricing",  label:"Pricing" },
    { key:"docs",     label:"Docs" },
  ];

  return (
    <Section label="With dropdown"
      ts={`import { Navbar, useNavbar } from "onebi-ui";
import type { NavItem } from "onebi-ui";

export default function WithDropdownDemo() {
  const nav = useNavbar("home");

  const items: NavItem[] = [
    { key:"home", label:"Home" },
    {
      key:"products", label:"Products",
      children: [
        { key:"design",     label:"Design system" },
        { key:"components", label:"Components"    },
        { key:"icons",      label:"Icon library", disabled: true },
      ],
    },
    { key:"pricing", label:"Pricing" },
    { key:"docs",    label:"Docs"    },
  ];

  return <Navbar brand={<>Acme</>} items={items} {...nav} />;
}`}
      js={`import { Navbar, useNavbar } from "onebi-ui";

export default function WithDropdownDemo() {
  const nav = useNavbar("home");

  return (
    <Navbar brand="Acme" items={[
      { key:"home", label:"Home" },
      {
        key:"products", label:"Products",
        children: [
          { key:"design",     label:"Design system" },
          { key:"components", label:"Components"    },
          { key:"icons",      label:"Icon library", disabled: true },
        ],
      },
      { key:"pricing", label:"Pricing" },
      { key:"docs",    label:"Docs"    },
    ]} {...nav} />
  );
}`}
    >
      <Preview>
        <Navbar brand={brand} items={dropdownItems} activeKey={nav.activeKey} onSelect={nav.onSelect} />
      </Preview>
    </Section>
  );
}

/* ── 8. Disabled items ── */
function DisabledBlock() {
  const nav = useNavbar("home");
  const brand = <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>;

  const disabledItems = [
    { key:"home",     label:"Home" },
    { key:"products", label:"Products" },
    { key:"enterprise", label:"Enterprise", disabled: true },
    { key:"legacy",   label:"Legacy",    disabled: true },
  ];

  return (
    <Section label="Disabled items"
      ts={`import { Navbar, useNavbar } from "onebi-ui";
import type { NavItem } from "onebi-ui";

export default function DisabledDemo() {
  const nav = useNavbar("home");

  const items: NavItem[] = [
    { key:"home",       label:"Home"       },
    { key:"products",   label:"Products"   },
    { key:"enterprise", label:"Enterprise", disabled: true },
    { key:"legacy",     label:"Legacy",     disabled: true },
  ];

  return <Navbar brand={<>Acme</>} items={items} {...nav} />;
}`}
      js={`import { Navbar, useNavbar } from "onebi-ui";

export default function DisabledDemo() {
  const nav = useNavbar("home");

  return (
    <Navbar brand="Acme" items={[
      { key:"home",       label:"Home"       },
      { key:"products",   label:"Products"   },
      { key:"enterprise", label:"Enterprise", disabled:true },
      { key:"legacy",     label:"Legacy",     disabled:true },
    ]} {...nav} />
  );
}`}
    >
      <Preview>
        <Navbar brand={brand} items={disabledItems} activeKey={nav.activeKey} onSelect={nav.onSelect} />
      </Preview>
    </Section>
  );
}

/* ── 9. Underline style ── */
function UnderlineBlock() {
  const nav = useNavbar("home");
  const brand = <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>;

  return (
    <Section label="Underline style"
      ts={`import { Navbar, useNavbar } from "onebi-ui";

export default function UnderlineDemo() {
  const nav = useNavbar("home");

  return (
    <Navbar
      brand={<>Acme</>}
      items={items}
      className="nb-style-underline"
      {...nav}
    />
  );
}`}
      js={`import { Navbar, useNavbar } from "onebi-ui";

export default function UnderlineDemo() {
  const nav = useNavbar("home");

  return (
    <Navbar brand="Acme" items={items} className="nb-style-underline" {...nav} />
  );
}`}
    >
      <Preview>
        <Navbar brand={brand} items={basicItems} className="nb-style-underline"
          activeKey={nav.activeKey} onSelect={nav.onSelect} />
      </Preview>
    </Section>
  );
}

/* ── 10. Composable API ── */
function ComposableBlock() {
  const [active, setActive] = React.useState("home");

  return (
    <Section label="Composable API (NavbarRoot / NavbarBrand / NavbarLinks / NavbarLink / NavbarEnd)"
      ts={`import React from "react";
import { NavbarRoot, NavbarBrand, NavbarLinks, NavbarLink, NavbarEnd } from "onebi-ui";
import { HomeIcon, LayersIcon } from "./icons";

export default function ComposableDemo() {
  const [active, setActive] = React.useState<string>("home");

  return (
    <NavbarRoot variant="filled" color="white">
      <NavbarBrand>
        <LogoIcon />
        Acme
      </NavbarBrand>

      <NavbarLinks>
        <NavbarLink active={active === "home"}     onClick={() => setActive("home")}     icon={<HomeIcon />}>Home</NavbarLink>
        <NavbarLink active={active === "products"} onClick={() => setActive("products")} icon={<LayersIcon />}>Products</NavbarLink>
        <NavbarLink disabled>Enterprise</NavbarLink>
      </NavbarLinks>

      <NavbarEnd>
        <button>Sign in</button>
      </NavbarEnd>
    </NavbarRoot>
  );
}`}
      js={`import React from "react";
import { NavbarRoot, NavbarBrand, NavbarLinks, NavbarLink, NavbarEnd } from "onebi-ui";
import { HomeIcon, LayersIcon } from "./icons";

export default function ComposableDemo() {
  const [active, setActive] = React.useState("home");

  return (
    <NavbarRoot variant="filled">
      <NavbarBrand><LogoIcon /> Acme</NavbarBrand>
      <NavbarLinks>
        <NavbarLink active={active === "home"}     onClick={() => setActive("home")}     icon={<HomeIcon />}>Home</NavbarLink>
        <NavbarLink active={active === "products"} onClick={() => setActive("products")} icon={<LayersIcon />}>Products</NavbarLink>
        <NavbarLink disabled>Enterprise</NavbarLink>
      </NavbarLinks>
      <NavbarEnd><button>Sign in</button></NavbarEnd>
    </NavbarRoot>
  );
}`}
    >
      <Preview>
        <NavbarRoot variant="filled">
          <NavbarBrand><LogoIcon /><span>Acme</span></NavbarBrand>
          <NavbarLinks>
            <NavbarLink active={active === "home"}      onClick={() => setActive("home")}      icon={<HomeIcon />}>Home</NavbarLink>
            <NavbarLink active={active === "products"}  onClick={() => setActive("products")}  icon={<LayersIcon />}>Products</NavbarLink>
            <NavbarLink active={active === "analytics"} onClick={() => setActive("analytics")} icon={<BarChartIcon />}>Analytics</NavbarLink>
            <NavbarLink disabled icon={<SettingsIcon />}>Enterprise</NavbarLink>
          </NavbarLinks>
          <NavbarEnd>
            <button style={{ display:"inline-flex", alignItems:"center", padding:"0 14px", height:32,
              border:"none", borderRadius:8, background:"#6366f1",
              fontSize:13, fontWeight:600, color:"#fff", cursor:"pointer" }}>
              Sign in
            </button>
          </NavbarEnd>
        </NavbarRoot>
      </Preview>
    </Section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function NavbarPage() {
  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Navbar suite
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive guide to every variant, color, size, and state available.
            </p>
          </div>

          <div className="grid gap-12 p-8 lg:p-12 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50">
            <VariantsBlock />
            <Separator className="bg-slate-100" />

            <ColorsBlock />
            <Separator className="bg-slate-100" />

            <SizesBlock />
            <Separator className="bg-slate-100" />

            <WithIconsBlock />
            <Separator className="bg-slate-100" />

            <WithBadgesBlock />
            <Separator className="bg-slate-100" />

            <WithEndSlotBlock />
            <Separator className="bg-slate-100" />

            <WithDropdownBlock />
            <Separator className="bg-slate-100" />

            <DisabledBlock />
            <Separator className="bg-slate-100" />

            <UnderlineBlock />
            <Separator className="bg-slate-100" />

            <ComposableBlock />
          </div>
        </div>
      </div>
    </div>
  );
}