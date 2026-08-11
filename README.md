# Custom Component Library

A modular React component library featuring dynamic theming, dark mode support, and customizable UI components.

## Features

- **Dynamic Theme Engine**: Automatic CSS variable injection with support for light, dark, and system modes.
- **Color Presets**: Built-in color palettes (`default`, `indigo`, `emerald`, `purple`, `ocean`, `amber`, `rose`, `midnight`).
- **Custom Brand Overrides**: Real-time custom primary color hex and border radius customization.
- **Scoped Containers**: Apply isolated themes to specific UI sections without polluting global styles.
- **App Router Compatible**: Full compatibility with Next.js 14+ App Router client/server component boundaries.

## Documentation

- 📘 [Theme System & ThemeProvider Guide](./THEMING.md) - Learn how to set up `<ThemeProvider>`, use the `useTheme()` hook, and build custom theme control panels.

## Quick Start

### 1. Root Setup

Wrap your app once at the root layout level (`src/app/layout.tsx`):

```tsx
import { ThemeProvider } from "@/theme";

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
}
```

### 2. Controlling Themes in Components

Use the `useTheme()` hook anywhere in your child components:

```tsx
'use client';

import { useTheme } from "@/theme";
import { CustomButton } from "@/components/CustomButton";

export function ThemeToggle() {
  const { mode, toggleMode, setTheme } = useTheme();

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <CustomButton onClick={toggleMode}>
        Toggle {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </CustomButton>
      <CustomButton onClick={() => setTheme('emerald')}>
        Switch to Emerald
      </CustomButton>
    </div>
  );
}
```

For full details, see the [THEMING.md](./THEMING.md) documentation.
