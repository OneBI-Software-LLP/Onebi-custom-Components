"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CustomCard } from "@/components/CustomCard";

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

export default function CardPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const plans = [
    { id: 'starter', label: 'Starter', price: '₹0/mo', desc: 'For individuals' },
    { id: 'pro',     label: 'Pro',     price: '₹499/mo', desc: 'For small teams' },
    { id: 'team',    label: 'Team',    price: '₹999/mo', desc: 'For growing orgs' },
  ];

  return (
    <div className="p-12 lg:p-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Card
            </h2>
            <p className="text-lg text-slate-500">
              Versatile container for content and actions with advanced compound components.
            </p>
          </div>
          
          <div className="grid gap-12 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 text-slate-900">
            
            {/* Legacy Fallback */}
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-4">
                Legacy / Shorthand Props
              </Label>
              <CustomCard
                title="Shorthand Card"
                subtitle="Uses the title, subtitle, and footer props"
                footer={<CustomCard.Button variant="primary">Submit</CustomCard.Button>}
              >
                <p className="text-slate-600 text-[14px]">
                  This maintains backward compatibility with older components using the shorthand approach.
                </p>
              </CustomCard>
            </div>
            <Separator className="bg-slate-100" />

            {/* Profile Card */}
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-4">
                Profile Card (Compound)
              </Label>
              <CustomCard variant="outlined" radius="lg" hover="lift" maxWidth="380px">
                <CustomCard.Header
                  avatar="AR"
                  avatarColor="blue"
                  avatarSize="md"
                  badge="Pro member"
                  badgeVariant="info"
                  title="Arjun Rao"
                  subtitle="Senior Product Designer · Bhubaneswar"
                  divider
                />
                <CustomCard.Body>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(0,0,0,0.55)' }}>
                    Designing systems and shipping components since 2017. Loves clean APIs
                    and obsessive spacing.
                  </p>
                  <CustomCard.Divider />
                  <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>
                    arjun@example.com · +91 98765 43210
                  </div>
                </CustomCard.Body>
                <CustomCard.Footer align="end">
                  <CustomCard.Button variant="ghost">Message</CustomCard.Button>
                  <CustomCard.Button variant="primary">View profile</CustomCard.Button>
                </CustomCard.Footer>
              </CustomCard>
            </div>
            <Separator className="bg-slate-100" />

            {/* Media Card */}
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-4">
                Media Card
              </Label>
              <CustomCard variant="elevated" radius="lg" shadow="sm" maxWidth="360px">
                <CustomCard.Media
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=720"
                  alt="Scenic landscape"
                  height={200}
                  objectFit="cover"
                />
                <CustomCard.Header
                  badge="Travel"
                  badgeVariant="success"
                  title="Waterfalls of Odisha"
                  subtitle="Published · June 2025"
                  divider={false}
                />
                <CustomCard.Body>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(0,0,0,0.55)' }}>
                    A curated trail guide through the hidden waterfalls of the Eastern Ghats.
                  </p>
                </CustomCard.Body>
                <CustomCard.Footer align="between">
                  <CustomCard.Button variant="ghost">Save</CustomCard.Button>
                  <CustomCard.Button variant="primary">Read article</CustomCard.Button>
                </CustomCard.Footer>
              </CustomCard>
            </div>
            <Separator className="bg-slate-100" />

            {/* Stats Card */}
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-4">
                Stats Card
              </Label>
              <CustomCard variant="outlined" radius="lg" maxWidth="400px">
                <CustomCard.Header
                  title="Dashboard overview"
                  subtitle="Last 30 days"
                  divider
                />
                <CustomCard.Body
                  stats={[
                    { label: 'Users',    value: '12.4k' },
                    { label: 'Revenue',  value: '₹2.1L' },
                    { label: 'Uptime',   value: '99.9%' },
                  ]}
                >
                  <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.55)', lineHeight: 1.65 }}>
                    All systems are operating normally. No incidents reported.
                  </p>
                </CustomCard.Body>
              </CustomCard>
            </div>
            <Separator className="bg-slate-100" />
            
            {/* Selectable Cards */}
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-4">
                Selectable Cards (Hover & Select State)
              </Label>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {plans.map(p => (
                  <CustomCard
                    key={p.id}
                    clickable
                    onClick={() => setSelected(p.id)}
                    selected={selected === p.id}
                    variant="outlined"
                    radius="lg"
                    hover="border"
                    style={{ flex: 1, minWidth: '150px' }}
                  >
                    <CustomCard.Body padding="16px">
                      <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 2 }}>{p.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 500, color: '#378ADD', margin: '6px 0' }}>{p.price}</div>
                      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)' }}>{p.desc}</div>
                    </CustomCard.Body>
                  </CustomCard>
                ))}
              </div>
            </div>
            <Separator className="bg-slate-100" />

            {/* Skeleton Loading Card */}
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-4">
                Loading State (Skeleton)
              </Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
                <CustomCard loading={loading} variant="outlined" radius="lg">
                  {!loading && (
                    <>
                      <CustomCard.Header avatar="JD" title="Jane Doe" subtitle="Loaded successfully" divider />
                      <CustomCard.Body>
                        <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.55)' }}>
                          Content has finished loading.
                        </p>
                      </CustomCard.Body>
                    </>
                  )}
                </CustomCard>
                <div className="self-start">
                  <CustomCard.Button variant="secondary" onClick={() => setLoading(l => !l)}>
                    Toggle Loading
                  </CustomCard.Button>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`import { CustomCard } from "onebi-ui";

export default function CardDemo() {
  return (
    <CustomCard variant="outlined" hover="lift">
      <CustomCard.Header 
        avatar="JD" 
        title="John Doe" 
        subtitle="Software Engineer" 
        badge="New" 
      />
      <CustomCard.Body>
        <p>Main content goes here</p>
      </CustomCard.Body>
      <CustomCard.Footer align="end">
        <CustomCard.Button variant="primary">Accept</CustomCard.Button>
      </CustomCard.Footer>
    </CustomCard>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
