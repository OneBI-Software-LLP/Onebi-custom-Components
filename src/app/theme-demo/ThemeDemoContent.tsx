'use client';

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@/theme';
import { ThemePreset } from '@/theme/types';
import Button from '@/components/ui/button';
import { CustomButton } from '@/components/CustomButton';
import { CustomCard } from '@/components/CustomCard';
import { CustomTextField } from '@/components/CustomTextField';
import { CustomBadge } from '@/components/CustomBadge';
import { Chip } from '@/components/CustomChip';
import { CustomSwitch } from '@/components/CustomSwitch';
import { CustomSpinner } from '@/components/CustomSpinner';
import CustomTable, { Employee } from '@/components/CustomTable';

function ThemeControls() {
  const { theme, mode, resolvedMode, setTheme, toggleMode } = useTheme();

  const [customPrimary, setCustomPrimary] = useState('#4f46e5');
  const [customRadius, setCustomRadius] = useState('0.5rem');

  const presets: { label: string; value: ThemePreset; color: string }[] = [
    { label: 'Default', value: 'default', color: '#1a1a1a' },
    { label: 'Indigo', value: 'indigo', color: '#4f46e5' },
    { label: 'Emerald', value: 'emerald', color: '#059669' },
    { label: 'Purple', value: 'purple', color: '#7c3aed' },
    { label: 'Ocean', value: 'ocean', color: '#0284c7' },
    { label: 'Amber', value: 'amber', color: '#d97706' },
    { label: 'Rose', value: 'rose', color: '#e11d48' },
    { label: 'Midnight', value: 'midnight', color: '#0f172a' },
  ];

  const applyCustomColor = (color: string) => {
    setCustomPrimary(color);
    setTheme({
      primary: color,
      radius: customRadius,
    });
  };

  const sampleEmployees: Employee[] = [
    { id: '1', name: 'Alice Smith', email: 'alice@company.com', dept: 'Engineering', grade: 'L5', designation: 'Senior Engineer', status: 'Active' },
    { id: '2', name: 'Bob Jones', email: 'bob@company.com', dept: 'Product', grade: 'L4', designation: 'Product Manager', status: 'Invited' },
    { id: '3', name: 'Carol White', email: 'carol@company.com', dept: 'Design', grade: 'L5', designation: 'Lead Designer', status: 'Active' },
  ];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text">ThemeProvider System</h1>
            <p className="text-sm text-text-muted mt-1">
              Dynamic themes & theme color application across all package components.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
              Active Mode: {resolvedMode.toUpperCase()}
            </span>
            <Button
              variant="solid"
              color="primary"
              onClick={toggleMode}
            >
              Toggle Mode ({mode === 'dark' ? '🌙 Dark' : '☀️ Light'})
            </Button>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="mt-6 pt-6 border-t border-border">
          <label className="text-sm font-semibold text-text mb-3 block">
            Select Preset Theme
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => {
              const isActive =
                typeof theme === 'string' && theme === preset.value;
              return (
                <button
                  key={preset.value}
                  onClick={() => setTheme(preset.value)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'ring-2 ring-primary ring-offset-2 bg-surface text-text shadow-sm'
                      : 'bg-surface hover:bg-surface-hover text-text-muted'
                  }`}
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: preset.color }}
                  />
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Color Input */}
        <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-text">
              Custom Primary Color:
            </label>
            <input
              type="color"
              value={customPrimary}
              onChange={(e) => applyCustomColor(e.target.value)}
              className="w-9 h-9 p-0.5 rounded cursor-pointer border border-border bg-surface"
            />
            <input
              type="text"
              value={customPrimary}
              onChange={(e) => applyCustomColor(e.target.value)}
              placeholder="#4f46e5"
              className="px-3 py-1.5 text-sm rounded-md border border-border bg-surface text-text font-mono w-28"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-text">
              Border Radius:
            </label>
            <select
              value={customRadius}
              onChange={(e) => {
                setCustomRadius(e.target.value);
                if (typeof theme === 'object') {
                  setTheme({ ...theme, radius: e.target.value });
                } else {
                  setTheme({ primary: customPrimary, radius: e.target.value });
                }
              }}
              className="px-3 py-1.5 text-sm rounded-md border border-border bg-surface text-text"
            >
              <option value="0px">Square (0px)</option>
              <option value="0.25rem">Small (4px)</option>
              <option value="0.5rem">Medium (8px)</option>
              <option value="0.75rem">Large (12px)</option>
              <option value="1rem">XL (16px)</option>
              <option value="999px">Pill (Full)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Component Gallery showcasing theme variables in effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buttons */}
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
          <h2 className="text-lg font-bold text-text">Button Variants & Colors</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="solid" color="primary">Primary Solid</Button>
            <Button variant="solid" color="secondary">Secondary</Button>
            <Button variant="outline" color="primary">Outline</Button>
            <Button variant="soft" color="primary">Soft</Button>
            <Button variant="ghost" color="primary">Ghost</Button>
            <Button variant="solid" color="danger">Danger</Button>
            <Button variant="solid" color="success">Success</Button>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <CustomButton variant="primary">CustomButton Primary</CustomButton>
            <CustomButton variant="secondary">CustomButton Secondary</CustomButton>
            <CustomButton variant="outline">CustomButton Outline</CustomButton>
          </div>
        </div>

        {/* Inputs & Controls */}
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
          <h2 className="text-lg font-bold text-text">Inputs & Controls</h2>
          <CustomTextField
            label="Username / Email"
            placeholder="Enter username..."
            helperText="Themed borders & focus rings apply automatically"
          />
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text font-medium">Switch Toggle:</span>
              <CustomSwitch checked={true} onChange={() => {}} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text font-medium">Spinner:</span>
              <CustomSpinner size="md" />
            </div>
          </div>
        </div>

        {/* Badges & Chips */}
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
          <h2 className="text-lg font-bold text-text">Badges & Chips</h2>
          <div className="flex flex-wrap gap-2">
            <CustomBadge color="primary">Primary Badge</CustomBadge>
            <CustomBadge color="success">Active</CustomBadge>
            <CustomBadge color="warning">Pending</CustomBadge>
            <CustomBadge color="danger">Error</CustomBadge>
            <CustomBadge color="neutral">Info</CustomBadge>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Chip label="React" variant="filled" />
            <Chip label="TypeScript" variant="soft" />
            <Chip label="Tailwind" variant="outlined" />
          </div>
        </div>

        {/* Custom Card */}
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-3">
          <h2 className="text-lg font-bold text-text">Card Component</h2>
          <CustomCard
            title="Themed Card Header"
            subtitle="Cards react to theme surface & border tokens automatically."
          >
            <p className="text-sm text-text-muted">
              Card body text automatically uses text-muted color tokens.
            </p>
          </CustomCard>
        </div>
      </div>

      {/* Custom Table showing theme integration */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <h2 className="text-lg font-bold text-text">Custom Table Theme</h2>
        <CustomTable data={sampleEmployees} />
      </div>

      {/* Demonstration of Scoped Sub-Tree ThemeProvider */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div>
          <h2 className="text-lg font-bold text-text">Scoped Sub-Tree Theme Demo</h2>
          <p className="text-sm text-text-muted">
            You can also wrap specific sub-trees in a scoped ThemeProvider with independent themes!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Emerald Scope */}
          <ThemeProvider theme="emerald" scoped className="p-5 rounded-xl border border-border bg-surface">
            <div className="space-y-3">
              <h3 className="font-semibold text-text">Emerald Scoped Container</h3>
              <p className="text-xs text-text-muted">Uses emerald primary color inside this box only.</p>
              <Button variant="solid" color="primary">Emerald Button</Button>
            </div>
          </ThemeProvider>

          {/* Rose Scope */}
          <ThemeProvider theme="rose" scoped className="p-5 rounded-xl border border-border bg-surface">
            <div className="space-y-3">
              <h3 className="font-semibold text-text">Rose Scoped Container</h3>
              <p className="text-xs text-text-muted">Uses rose primary color inside this box only.</p>
              <Button variant="solid" color="primary">Rose Button</Button>
            </div>
          </ThemeProvider>
        </div>
      </div>

      {/* How to Use Code Guide Section */}
      <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
        <div>
          <h2 className="text-lg font-bold text-text">How to Use (Code Examples)</h2>
          <p className="text-sm text-text-muted">
            Follow these code examples to integrate ThemeProvider and useTheme into your app.
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Root Setup */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">1. Wrap ThemeProvider in App Root (layout.tsx)</h3>
            <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 text-xs overflow-x-auto font-mono">
{`// src/app/layout.tsx
import { ThemeProvider } from '@/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultMode="light" theme="indigo">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
            </pre>
          </div>

          {/* 2. Using useTheme Hook */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">2. Control Theme in Child Components (useTheme)</h3>
            <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 text-xs overflow-x-auto font-mono">
{`'use client';

import { useTheme } from '@/theme';
import { CustomButton } from '@/components/CustomButton';

export function ThemeToggle() {
  const { mode, toggleMode, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <CustomButton onClick={toggleMode}>
        Toggle {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </CustomButton>
      <CustomButton onClick={() => setTheme('emerald')}>
        Switch to Emerald
      </CustomButton>
    </div>
  );
}`}
            </pre>
          </div>

          {/* 3. Scoped Container Usage */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">3. Scoped / Section-Level Theme Overrides</h3>
            <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 text-xs overflow-x-auto font-mono">
{`<ThemeProvider theme="rose" scoped className="p-5 rounded-xl border border-border">
  <div>
    <h3>Rose Scoped Container</h3>
    <Button variant="solid" color="primary">Rose Button</Button>
  </div>
</ThemeProvider>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemeDemoContent() {
  return <ThemeControls />;
}
