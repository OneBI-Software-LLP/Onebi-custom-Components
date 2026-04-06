"use client";

import React from "react";
import { Tabs, TabsRoot, TabsList, TabsTrigger, TabsContent, useTab } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// ── Icons ──────────────────────────────────────────────────────────────────

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const BarChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
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

const basicTabs = [
  { value: "overview",      label: "Overview",      content: <p className="text-slate-600">Overview panel content goes here.</p> },
  { value: "analytics",     label: "Analytics",     content: <p className="text-slate-600">Analytics data and charts live here.</p> },
  { value: "reports",       label: "Reports",       content: <p className="text-slate-600">Generated reports will appear here.</p> },
  { value: "notifications", label: "Notifications", content: <p className="text-slate-600">You have no new notifications.</p> },
];
const panelStyle = "pt-5 text-slate-600 text-sm leading-relaxed";

// ── SectionCodeBlock ───────────────────────────────────────────────────────
// Dark code panel with a JS / TS tab switcher + copy button.
// The switcher itself is built with our own <Tabs> component.

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
    <div
      className="rounded-2xl overflow-hidden border border-slate-700 bg-[#0F172A] mt-5"
      style={{ background: "#0F172A" }}
    >
      {/* ── toolbar ── */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-slate-700/70"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {/* language switcher */}
        <div style={{ display: "flex", gap: "2px", background: "rgba(255,255,255,0.08)", borderRadius: "8px", padding: "3px" }}>
          {(["ts", "js"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: "3px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "monospace",
                transition: "background 140ms, color 140ms",
                background: lang === l ? "rgba(255,255,255,0.18)" : "transparent",
                color: lang === l ? "#f8fafc" : "#94a3b8",
              }}
            >
              {l === "ts" ? "Ts" : "Js"}
            </button>
          ))}
        </div>

        {/* copy button */}
        <button
          onClick={copy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: copied ? "#4ade80" : "#94a3b8",
            background: "rgba(255,255,255,0.07)",
            border: "none",
            padding: "4px 10px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "color 150ms, background 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* ── code ── */}
      <pre
        style={{
          padding: "1.25rem 1.5rem",
          overflowX: "auto",
          fontSize: "13px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          color: "#e2e8f0",
          lineHeight: "1.7",
          margin: 0,
        }}
      >
        <code>{activeCode}</code>
      </pre>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────

function Section({
  label,
  ts,
  js,
  children,
}: {
  label: string;
  ts: string;
  js: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        {label}
      </Label>
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
  const t1 = useTab("overview");
  const t2 = useTab("overview");
  const t3 = useTab("overview");
  const t4 = useTab("overview");
  const t5 = useTab("overview");
  const items = basicTabs.map((t) => ({ ...t, content: <div className={panelStyle}>{t.content}</div> }));

  return (
    <Section
      label="Variants"
      ts={`import { Tabs, useTab } from "onebi-ui";
import type { TabsVariant } from "onebi-ui";

export default function VariantsDemo() {
  const t = useTab("overview");

  const variants: TabsVariant[] = ["pills", "line", "enclosed", "solid", "soft"];

  return (
    <>
      {variants.map((variant) => (
        <Tabs
          key={variant}
          tabs={[
            { value: "overview",  label: "Overview",  content: <p>Overview</p>  },
            { value: "analytics", label: "Analytics", content: <p>Analytics</p> },
            { value: "reports",   label: "Reports",   content: <p>Reports</p>   },
          ]}
          variant={variant}
          value={t.value}
          onChange={t.onChange}
        />
      ))}
    </>
  );
}`}
      js={`import { Tabs, useTab } from "onebi-ui";

export default function VariantsDemo() {
  const t = useTab("overview");

  return (
    <>
      {["pills", "line", "enclosed", "solid", "soft"].map((variant) => (
        <Tabs
          key={variant}
          tabs={[
            { value: "overview",  label: "Overview",  content: <p>Overview</p>  },
            { value: "analytics", label: "Analytics", content: <p>Analytics</p> },
            { value: "reports",   label: "Reports",   content: <p>Reports</p>   },
          ]}
          variant={variant}
          value={t.value}
          onChange={t.onChange}
        />
      ))}
    </>
  );
}`}
    >
      {([
        { ctrl: t1, variant: "pills"    as const, label: "Pills (default)" },
        { ctrl: t2, variant: "line"     as const, label: "Line" },
        { ctrl: t3, variant: "enclosed" as const, label: "Enclosed" },
        { ctrl: t4, variant: "solid"    as const, label: "Solid" },
        { ctrl: t5, variant: "soft"     as const, label: "Soft" },
      ]).map(({ ctrl, variant, label }) => (
        <div key={variant}>
          <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
          <Tabs tabs={items} variant={variant} value={ctrl.value} onChange={ctrl.onChange} />
        </div>
      ))}
    </Section>
  );
}

/* ── 2. Colors ── */
function ColorsBlock() {
  const colors = ["primary", "secondary", "danger", "success", "warning", "info"] as const;
  const controls = {
    primary:   useTab("overview"),
    secondary: useTab("overview"),
    danger:    useTab("overview"),
    success:   useTab("overview"),
    warning:   useTab("overview"),
    info:      useTab("overview"),
  };

  return (
    <Section
      label="Colors"
      ts={`import { Tabs, useTab } from "onebi-ui";
import type { TabsColor } from "onebi-ui";

export default function ColorsDemo() {
  const t = useTab("overview");

  const colors: TabsColor[] = [
    "primary", "secondary", "danger", "success", "warning", "info",
  ];

  return (
    <>
      {colors.map((color) => (
        <Tabs
          key={color}
          tabs={[
            { value: "overview",  label: "Overview"  },
            { value: "analytics", label: "Analytics" },
            { value: "reports",   label: "Reports"   },
          ]}
          color={color}
          value={t.value}
          onChange={t.onChange}
        />
      ))}
    </>
  );
}`}
      js={`import { Tabs, useTab } from "onebi-ui";

export default function ColorsDemo() {
  const t = useTab("overview");

  return (
    <>
      {["primary","secondary","danger","success","warning","info"].map((color) => (
        <Tabs
          key={color}
          tabs={[
            { value: "overview",  label: "Overview"  },
            { value: "analytics", label: "Analytics" },
            { value: "reports",   label: "Reports"   },
          ]}
          color={color}
          value={t.value}
          onChange={t.onChange}
        />
      ))}
    </>
  );
}`}
    >
      {colors.map((color) => (
        <div key={color}>
          <p className="text-xs text-slate-400 mb-2 font-medium capitalize">{color}</p>
          <Tabs
            tabs={basicTabs.map((t) => ({ ...t, content: <div className={panelStyle}>{t.content}</div> }))}
            color={color}
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
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
  const controls = {
    xs: useTab("overview"),
    sm: useTab("overview"),
    md: useTab("overview"),
    lg: useTab("overview"),
    xl: useTab("overview"),
  };

  return (
    <Section
      label="Sizes"
      ts={`import { Tabs, useTab } from "onebi-ui";
import type { TabsSize } from "onebi-ui";

export default function SizesDemo() {
  const t = useTab("overview");
  const sizes: TabsSize[] = ["xs", "sm", "md", "lg", "xl"];

  return (
    <>
      {sizes.map((size) => (
        <Tabs
          key={size}
          tabs={[
            { value: "overview",  label: "Overview"  },
            { value: "analytics", label: "Analytics" },
            { value: "reports",   label: "Reports"   },
          ]}
          size={size}
          value={t.value}
          onChange={t.onChange}
        />
      ))}
    </>
  );
}`}
      js={`import { Tabs, useTab } from "onebi-ui";

export default function SizesDemo() {
  const t = useTab("overview");

  return (
    <>
      {["xs", "sm", "md", "lg", "xl"].map((size) => (
        <Tabs
          key={size}
          tabs={[
            { value: "overview",  label: "Overview"  },
            { value: "analytics", label: "Analytics" },
            { value: "reports",   label: "Reports"   },
          ]}
          size={size}
          value={t.value}
          onChange={t.onChange}
        />
      ))}
    </>
  );
}`}
    >
      {sizes.map((size) => (
        <div key={size}>
          <p className="text-xs text-slate-400 mb-2 font-medium uppercase">{size}</p>
          <Tabs
            tabs={basicTabs.slice(0, 3).map((t) => ({ ...t, content: undefined }))}
            size={size}
            value={controls[size].value}
            onChange={controls[size].onChange}
          />
        </div>
      ))}
    </Section>
  );
}

/* ── 4. With icons ── */
function WithIconsBlock() {
  const ctrl = useTab("home");
  const iconTabs = [
    { value: "home",      label: "Home",      icon: <HomeIcon />,     content: <div className={panelStyle}>Welcome home.</div> },
    { value: "profile",   label: "Profile",   icon: <UserIcon />,     content: <div className={panelStyle}>Your profile info.</div> },
    { value: "analytics", label: "Analytics", icon: <BarChartIcon />, content: <div className={panelStyle}>Chart data here.</div> },
    { value: "settings",  label: "Settings",  icon: <SettingsIcon />, content: <div className={panelStyle}>Adjust preferences.</div> },
  ];

  return (
    <Section
      label="With icons"
      ts={`import { Tabs, useTab } from "onebi-ui";
import type { TabItem } from "onebi-ui";
import { HomeIcon, UserIcon, BarChartIcon, SettingsIcon } from "./icons";

export default function WithIconsDemo() {
  const t = useTab("home");

  const tabs: TabItem[] = [
    { value: "home",      label: "Home",      icon: <HomeIcon />,     content: <p>Home</p>      },
    { value: "profile",   label: "Profile",   icon: <UserIcon />,     content: <p>Profile</p>   },
    { value: "analytics", label: "Analytics", icon: <BarChartIcon />, content: <p>Analytics</p> },
    { value: "settings",  label: "Settings",  icon: <SettingsIcon />, content: <p>Settings</p>  },
  ];

  return <Tabs tabs={tabs} value={t.value} onChange={t.onChange} />;
}`}
      js={`import { Tabs, useTab } from "onebi-ui";
import { HomeIcon, UserIcon, BarChartIcon, SettingsIcon } from "./icons";

export default function WithIconsDemo() {
  const t = useTab("home");

  const tabs = [
    { value: "home",      label: "Home",      icon: <HomeIcon />,     content: <p>Home</p>      },
    { value: "profile",   label: "Profile",   icon: <UserIcon />,     content: <p>Profile</p>   },
    { value: "analytics", label: "Analytics", icon: <BarChartIcon />, content: <p>Analytics</p> },
    { value: "settings",  label: "Settings",  icon: <SettingsIcon />, content: <p>Settings</p>  },
  ];

  return <Tabs tabs={tabs} value={t.value} onChange={t.onChange} />;
}`}
    >
      <Tabs tabs={iconTabs} value={ctrl.value} onChange={ctrl.onChange} />
    </Section>
  );
}

/* ── 5. With badges ── */
function WithBadgesBlock() {
  const ctrl = useTab("inbox");
  const badgeTabs = [
    { value: "inbox",         label: "Inbox",         badge: 12,  content: <div className={panelStyle}>12 unread messages.</div> },
    { value: "notifications", label: "Notifications", icon: <BellIcon />, badge: "3", content: <div className={panelStyle}>3 new notifications.</div> },
    { value: "drafts",        label: "Drafts",        badge: 0,   content: <div className={panelStyle}>No drafts saved.</div> },
    { value: "sent",          label: "Sent",          content: <div className={panelStyle}>Sent messages.</div> },
  ];

  return (
    <Section
      label="With badges"
      ts={`import { Tabs, useTab } from "onebi-ui";
import type { TabItem } from "onebi-ui";

export default function WithBadgesDemo() {
  const t = useTab("inbox");

  const tabs: TabItem[] = [
    { value: "inbox",         label: "Inbox",         badge: 12  },
    { value: "notifications", label: "Notifications", badge: "3" },
    { value: "drafts",        label: "Drafts",        badge: 0   },
    { value: "sent",          label: "Sent"                      },
  ];

  return <Tabs tabs={tabs} value={t.value} onChange={t.onChange} />;
}`}
      js={`import { Tabs, useTab } from "onebi-ui";

export default function WithBadgesDemo() {
  const t = useTab("inbox");

  const tabs = [
    { value: "inbox",         label: "Inbox",         badge: 12  },
    { value: "notifications", label: "Notifications", badge: "3" },
    { value: "drafts",        label: "Drafts",        badge: 0   },
    { value: "sent",          label: "Sent"                      },
  ];

  return <Tabs tabs={tabs} value={t.value} onChange={t.onChange} />;
}`}
    >
      <Tabs tabs={badgeTabs} value={ctrl.value} onChange={ctrl.onChange} />
    </Section>
  );
}

/* ── 6. Disabled ── */
function DisabledBlock() {
  const ctrl = useTab("active");
  const disabledTabs = [
    { value: "active",   label: "Active",   content: <div className={panelStyle}>This tab is active.</div> },
    { value: "pending",  label: "Pending",  content: <div className={panelStyle}>Pending content.</div> },
    { value: "locked",   label: "Locked",   disabled: true, content: null },
    { value: "archived", label: "Archived", disabled: true, content: null },
  ];

  return (
    <Section
      label="Disabled tabs"
      ts={`import { Tabs, useTab } from "onebi-ui";
import type { TabItem } from "onebi-ui";

export default function DisabledDemo() {
  const t = useTab("active");

  const tabs: TabItem[] = [
    { value: "active",   label: "Active"                   },
    { value: "pending",  label: "Pending"                  },
    { value: "locked",   label: "Locked",   disabled: true },
    { value: "archived", label: "Archived", disabled: true },
  ];

  return <Tabs tabs={tabs} value={t.value} onChange={t.onChange} />;
}`}
      js={`import { Tabs, useTab } from "onebi-ui";

export default function DisabledDemo() {
  const t = useTab("active");

  const tabs = [
    { value: "active",   label: "Active"                   },
    { value: "pending",  label: "Pending"                  },
    { value: "locked",   label: "Locked",   disabled: true },
    { value: "archived", label: "Archived", disabled: true },
  ];

  return <Tabs tabs={tabs} value={t.value} onChange={t.onChange} />;
}`}
    >
      <Tabs tabs={disabledTabs} value={ctrl.value} onChange={ctrl.onChange} />
    </Section>
  );
}

/* ── 7. Full width ── */
function FullWidthBlock() {
  const ctrl = useTab("overview");

  return (
    <Section
      label="Full width list"
      ts={`import { Tabs, useTab } from "onebi-ui";

export default function FullWidthDemo() {
  const t = useTab("overview");

  return (
    <Tabs
      tabs={[
        { value: "overview",      label: "Overview"      },
        { value: "analytics",     label: "Analytics"     },
        { value: "reports",       label: "Reports"       },
        { value: "notifications", label: "Notifications" },
      ]}
      fullWidth
      value={t.value}
      onChange={t.onChange}
    />
  );
}`}
      js={`import { Tabs, useTab } from "onebi-ui";

export default function FullWidthDemo() {
  const t = useTab("overview");

  return (
    <Tabs
      tabs={[
        { value: "overview",      label: "Overview"      },
        { value: "analytics",     label: "Analytics"     },
        { value: "reports",       label: "Reports"       },
        { value: "notifications", label: "Notifications" },
      ]}
      fullWidth
      value={t.value}
      onChange={t.onChange}
    />
  );
}`}
    >
      <Tabs
        tabs={basicTabs.slice(0, 4).map((t) => ({ ...t, content: <div className={panelStyle}>{t.content}</div> }))}
        fullWidth
        value={ctrl.value}
        onChange={ctrl.onChange}
      />
    </Section>
  );
}

/* ── 8. Vertical ── */
function VerticalBlock() {
  const t1 = useTab("overview");
  const t2 = useTab("overview");
  const items = basicTabs.map((t) => ({ ...t, content: <div className={panelStyle}>{t.content}</div> }));

  return (
    <Section
      label="Vertical orientation"
      ts={`import { Tabs, useTab } from "onebi-ui";

export default function VerticalDemo() {
  const t = useTab("overview");

  const tabs = [
    { value: "overview",  label: "Overview",  content: <p>Overview</p>  },
    { value: "analytics", label: "Analytics", content: <p>Analytics</p> },
    { value: "reports",   label: "Reports",   content: <p>Reports</p>   },
  ];

  return (
    <>
      {/* Pills vertical */}
      <Tabs
        tabs={tabs}
        orientation="vertical"
        value={t.value}
        onChange={t.onChange}
      />

      {/* Line vertical */}
      <Tabs
        tabs={tabs}
        orientation="vertical"
        variant="line"
        value={t.value}
        onChange={t.onChange}
      />
    </>
  );
}`}
      js={`import { Tabs, useTab } from "onebi-ui";

export default function VerticalDemo() {
  const t = useTab("overview");

  const tabs = [
    { value: "overview",  label: "Overview",  content: <p>Overview</p>  },
    { value: "analytics", label: "Analytics", content: <p>Analytics</p> },
    { value: "reports",   label: "Reports",   content: <p>Reports</p>   },
  ];

  return (
    <>
      <Tabs tabs={tabs} orientation="vertical" value={t.value} onChange={t.onChange} />
      <Tabs tabs={tabs} orientation="vertical" variant="line" value={t.value} onChange={t.onChange} />
    </>
  );
}`}
    >
      <div>
        <p className="text-xs text-slate-400 mb-2 font-medium">Pills — vertical</p>
        <Tabs tabs={items} orientation="vertical" value={t1.value} onChange={t1.onChange} />
      </div>
      <div className="mt-4">
        <p className="text-xs text-slate-400 mb-2 font-medium">Line — vertical</p>
        <Tabs tabs={items} orientation="vertical" variant="line" value={t2.value} onChange={t2.onChange} />
      </div>
    </Section>
  );
}

/* ── 9. Composable API ── */
function ComposableBlock() {
  const [active, setActive] = React.useState("profile");

  return (
    <Section
      label="Composable API (TabsRoot / TabsList / TabsTrigger / TabsContent)"
      ts={`import React from "react";
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "onebi-ui";
import { UserIcon, BarChartIcon, SettingsIcon } from "./icons";

export default function ComposableDemo() {
  const [active, setActive] = React.useState<string>("profile");

  return (
    <TabsRoot
      value={active}
      onChange={setActive}
      variant="enclosed"
      color="info"
    >
      <TabsList>
        <TabsTrigger value="profile"   icon={<UserIcon />}>
          Profile
        </TabsTrigger>
        <TabsTrigger value="analytics" icon={<BarChartIcon />} badge={5}>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings"  icon={<SettingsIcon />}>
          Settings
        </TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <p>Edit your personal details here.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p>5 new events since last login.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Manage preferences and integrations.</p>
      </TabsContent>
    </TabsRoot>
  );
}`}
      js={`import React from "react";
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "onebi-ui";
import { UserIcon, BarChartIcon, SettingsIcon } from "./icons";

export default function ComposableDemo() {
  const [active, setActive] = React.useState("profile");

  return (
    <TabsRoot
      value={active}
      onChange={setActive}
      variant="enclosed"
      color="info"
    >
      <TabsList>
        <TabsTrigger value="profile"   icon={<UserIcon />}>
          Profile
        </TabsTrigger>
        <TabsTrigger value="analytics" icon={<BarChartIcon />} badge={5}>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings"  icon={<SettingsIcon />}>
          Settings
        </TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <p>Edit your personal details here.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p>5 new events since last login.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Manage preferences and integrations.</p>
      </TabsContent>
    </TabsRoot>
  );
}`}
    >
      <TabsRoot value={active} onChange={setActive} variant="enclosed" color="info">
        <TabsList>
          <TabsTrigger value="profile"   icon={<UserIcon />}>Profile</TabsTrigger>
          <TabsTrigger value="analytics" icon={<BarChartIcon />} badge={5}>Analytics</TabsTrigger>
          <TabsTrigger value="settings"  icon={<SettingsIcon />}>Settings</TabsTrigger>
          <TabsTrigger value="billing"   disabled>Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className={panelStyle}><strong>Profile</strong> — edit your personal details here.</div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className={panelStyle}><strong>Analytics</strong> — 5 new events since last login.</div>
        </TabsContent>
        <TabsContent value="settings">
          <div className={panelStyle}><strong>Settings</strong> — manage preferences and integrations.</div>
        </TabsContent>
        <TabsContent value="billing">
          <div className={panelStyle}>Billing content.</div>
        </TabsContent>
      </TabsRoot>
    </Section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function TabsPage() {
  return (
    <div className="p-8 lg:p-20">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Tabs Suite
            </h2>
            <p className="text-lg text-slate-500">
              A comprehensive guide to every variant, size, and state available.
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

            <DisabledBlock />
            <Separator className="bg-slate-100" />

            <FullWidthBlock />
            <Separator className="bg-slate-100" />

            <VerticalBlock />
            <Separator className="bg-slate-100" />

            <ComposableBlock />
          </div>
        </div>
      </div>
    </div>
  );
}