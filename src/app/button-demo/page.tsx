"use client";

/**
 * Button Demo Page
 * ──────────────────
 * This page showcases every Button variant, size, state and combination in action.
 */

import React from 'react';
import { Button, ButtonGroup, ButtonGroupItem } from '@/components/ui/button';

// ── Tiny inline SVG icons ──
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

// ── Reusable section wrapper for the demo ──
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <p style={{
        fontSize: '11px', textTransform: 'uppercase',
        letterSpacing: '.08em', color: '#6b7280',
        marginBottom: '.75rem',
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px' }}>
        {children}
      </div>
    </div>
  );
}

// ── Main demo component ──
export default function ButtonDemoPage() {
  const [loading, setLoading] = React.useState(false);

  function handleSave() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div style={{ padding: '3rem', maxWidth: '1000px', margin: '0 auto', background: '#fff', minHeight: '100-vh' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '32px', fontWeight: '900', color: '#111' }}>Button Suite</h1>
        <p style={{ fontSize: '16px', color: '#666' }}>A comprehensive guide to every variant, size, and state available.</p>
      </div>

      {/* ── SOLID ── */}
      <Section label="Solid (default variant)">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="danger">Danger</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="info">Info</Button>
      </Section>

      {/* ── OUTLINE ── */}
      <Section label="Outline">
        <Button variant="outline" color="primary">Primary</Button>
        <Button variant="outline" color="secondary">Secondary</Button>
        <Button variant="outline" color="danger">Danger</Button>
        <Button variant="outline" color="success">Success</Button>
        <Button variant="outline" color="info">Info</Button>
        <Button variant="outline" color="warning">Warning</Button>
      </Section>

      {/* ── SOFT ── */}
      <Section label="Soft">
        <Button variant="soft" color="primary">Primary</Button>
        <Button variant="soft" color="secondary">Secondary</Button>
        <Button variant="soft" color="info">Info</Button>
        <Button variant="soft" color="danger">Danger</Button>
        <Button variant="soft" color="success">Success</Button>
        <Button variant="soft" color="warning">Warning</Button>
      </Section>

      {/* ── GHOST ── */}
      <Section label="Ghost">
        <Button variant="ghost">Default</Button>
        <Button variant="ghost" color="primary">Primary</Button>
        <Button variant="ghost" color="danger">Danger</Button>
        <Button variant="ghost" color="info">Info</Button>
        <Button variant="ghost" color="success">Success</Button>
      </Section>

      {/* ── LINK ── */}
      <Section label="Link">
        <Button variant="link">Learn more</Button>
        <Button variant="link" color="info">Documentation →</Button>
      </Section>

      {/* ── SIZES ── */}
      <Section label="Sizes">
        <Button size="xs">XSmall</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">XLarge</Button>
      </Section>

      {/* ── SHAPES ── */}
      <Section label="Shapes">
        <Button shape="default">Default (8px)</Button>
        <Button shape="rounded">Pill</Button>
        <Button shape="square">Square (4px)</Button>
        <Button variant="outline" color="info" shape="rounded">Outline Pill</Button>
      </Section>

      {/* ── ICONS ── */}
      <Section label="With icons">
        <Button iconLeft={<PlusIcon />}>Add item</Button>
        <Button color="secondary" iconRight={<ArrowIcon />}>Continue</Button>
        <Button iconLeft={<PlusIcon />} iconRight={<ArrowIcon />} variant="outline" color="info">
          Both icons
        </Button>
      </Section>

      {/* ── ICON ONLY ── */}
      <Section label="Icon only">
        <Button size="xs" iconOnly iconLeft={<PlusIcon />} title="Add" />
        <Button size="sm" color="secondary" iconOnly iconLeft={<GearIcon />} title="Settings" />
        <Button size="md" variant="outline" color="danger" iconOnly iconLeft={<TrashIcon />} title="Delete" />
        <Button size="lg" variant="soft" color="info" shape="rounded" iconOnly iconLeft={<GearIcon />} title="Settings" />
        <Button size="md" variant="ghost" shape="rounded" iconOnly iconLeft={<BellIcon />} title="Notifications" />
      </Section>

      {/* ── LOADING ── */}
      <Section label="Loading state">
        <Button loading loadingText="Saving…">Save</Button>
        <Button variant="outline" color="info" loading loadingText="Uploading">Upload</Button>
        <Button variant="soft" color="success" loading iconOnly />
        <Button onClick={handleSave} loading={loading} loadingText="Saving…">
          {loading ? 'Saving…' : 'Click to load'}
        </Button>
      </Section>

      {/* ── DISABLED ── */}
      <Section label="Disabled state">
        <Button disabled>Primary</Button>
        <Button color="secondary" disabled>Secondary</Button>
        <Button variant="outline" color="danger" disabled>Danger</Button>
        <Button variant="soft" color="info" disabled>Info</Button>
      </Section>

      {/* ── BADGE ── */}
      <Section label="With badge">
        <Button badge={3} color="secondary" iconLeft={<BellIcon />}>Notifications</Button>
        <Button badge="9+" variant="ghost" shape="rounded" iconOnly iconLeft={<BellIcon />} />
        <Button badge={1} variant="soft" color="danger">Alerts</Button>
      </Section>

      {/* ── FULL WIDTH ── */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{
          fontSize: '11px', textTransform: 'uppercase',
          letterSpacing: '.08em', color: '#6b7280', marginBottom: '.75rem',
        }}>
          Full width
        </p>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button fullWidth>Full width primary</Button>
          <Button fullWidth variant="outline">Full width outline</Button>
        </div>
      </div>

      {/* ── BUTTON GROUP ── */}
      <Section label="Button group / segmented control">
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

      {/* ── POLYMORPHIC (as="a") ── */}
      <Section label='Polymorphic — render as anchor (as="a")'>
        <Button as="a" href="#" color="info">
          Go to dashboard
        </Button>
        <Button as="a" href="#" variant="outline" color="primary" iconRight={<ArrowIcon />}>
          View docs
        </Button>
      </Section>
    </div>
  );
}
