# Theme System & ThemeProvider Documentation

The **Theme System** provides dynamic CSS variable injection, automatic light/dark mode resolution, built-in color presets, custom brand color overrides, and localized scoped containers across all components in the library.

---

## 1. Quick Start: Single Root Setup

Wrap your application **once** in the root layout (`app/layout.tsx` for Next.js App Router or `App.tsx` for React Vite):

```tsx
// src/app/layout.tsx
import { ThemeProvider } from '@/theme'; // or 'CustomComponentLibrary'
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Single ThemeProvider at the app root */}
        <ThemeProvider defaultMode="light" theme="indigo">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 2. Consuming Theme with `useTheme()` Hook

Any component inside the application can use the `useTheme()` hook to read or update theme state without wrapping another `<ThemeProvider>`.

```tsx
import { useTheme } from '@/theme';

function MyComponent() {
  const { theme, mode, resolvedMode, colors, setTheme, setMode, toggleMode } = useTheme();

  return (
    <div>
      <p>Current Active Mode: {resolvedMode}</p>
      <button onClick={toggleMode}>Toggle Dark/Light Mode</button>
      <button onClick={() => setTheme('emerald')}>Switch to Emerald Theme</button>
    </div>
  );
}
```

---

## 3. ThemeControls Component Example

Here is a complete, production-ready `ThemeControls` component that provides controls for mode switching, preset selection, and custom color picking:

```tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/theme';
import { ThemePreset } from '@/theme/types';
import { CustomButton } from '@/components/CustomButton';
import { CustomCard } from '@/components/CustomCard';

export function ThemeControls() {
  // 1. Extract theme state & actions from useTheme hook
  const { theme, mode, resolvedMode, setTheme, setMode, toggleMode } = useTheme();

  // Local state for color picker
  const [customPrimary, setCustomPrimary] = useState('#4f46e5');
  const [customRadius, setCustomRadius] = useState('0.5rem');

  // List of available presets
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

  // Apply custom primary color & radius
  const applyCustomColor = (color: string) => {
    setCustomPrimary(color);
    setTheme({
      primary: color,
      radius: customRadius,
    });
  };

  return (
    <CustomCard title="Theme & Color Controls" padding="24px">
      
      {/* SECTION 1: Dark / Light Mode Controls */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>
          Mode Controls (Active: <strong>{resolvedMode}</strong>)
        </h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <CustomButton onClick={toggleMode} variant="primary">
            Toggle {resolvedMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </CustomButton>
          <CustomButton onClick={() => setMode('light')}>Light</CustomButton>
          <CustomButton onClick={() => setMode('dark')}>Dark</CustomButton>
          <CustomButton onClick={() => setMode('system')}>System</CustomButton>
        </div>
      </div>

      {/* SECTION 2: Preset Theme Selectors */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Preset Themes</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {presets.map((preset) => (
            <CustomButton
              key={preset.value}
              onClick={() => setTheme(preset.value)}
              variant={theme === preset.value ? 'primary' : 'secondary'}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: preset.color,
                  marginRight: '6px',
                  display: 'inline-block',
                }}
              />
              {preset.label}
            </CustomButton>
          ))}
        </div>
      </div>

      {/* SECTION 3: Custom Hex Color Picker */}
      <div>
        <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Custom Primary Color</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="color"
            value={customPrimary}
            onChange={(e) => applyCustomColor(e.target.value)}
            style={{ width: '40px', height: '40px', cursor: 'pointer', border: 'none', borderRadius: '8px' }}
          />
          <span>{customPrimary}</span>
        </div>
      </div>

    </CustomCard>
  );
}
```

---

## 4. Scoped Theming (Section-Level Overrides)

To apply a specific theme or color override to a specific container without changing the rest of the application, pass `scoped`:

```tsx
import { ThemeProvider, CustomCard, CustomButton } from '@/theme';

export function ScopedSection() {
  return (
    <ThemeProvider scoped mode="dark" theme={{ primary: '#8b5cf6' }}>
      <CustomCard title="Scoped Container">
        <p>This card uses a localized dark purple theme.</p>
        <CustomButton variant="primary">Scoped Button</CustomButton>
      </CustomCard>
    </ThemeProvider>
  );
}
```

---

## 5. `useTheme()` API Reference

| Return Field | Type | Description |
| :--- | :--- | :--- |
| `theme` | `ThemeInput` | Current theme preset name or custom theme object. |
| `mode` | `'light' \| 'dark' \| 'system'` | User-selected mode preference. |
| `resolvedMode` | `'light' \| 'dark'` | Actual active mode (resolves `'system'` to system preference). |
| `colors` | `ThemeColors` | Computed color palette object. |
| `setTheme` | `(theme: ThemeInput) => void` | Updates theme to a preset name or custom color object. |
| `setMode` | `(mode: ThemeMode) => void` | Changes mode preference (`'light'`, `'dark'`, `'system'`). |
| `toggleMode` | `() => void` | Toggles between Light and Dark mode. |
