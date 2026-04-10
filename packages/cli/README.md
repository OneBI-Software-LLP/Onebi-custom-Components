# OneBI UI CLI

A robust, production-ready Node.js CLI tool inspired by `shadcn/ui`. It intelligently initializes your environment and allows you to fetch fully customizable, raw components directly into your source code.

## 🚀 Features

- **Intelligent Framework Detection:** Automatically determines whether your project uses **Next.js**, **Vite**, or raw **React** to configure the correct component paths out-of-the-box.
- **Automatic Tailwind Setup:** Checks for an existing Tailwind configuration. If none is found, it automatically installs Tailwind CSS, PostCSS, Autoprefixer, generates `tailwind.config.js`, and injects the global design tokens.
- **Recursive Dependency Installation:** When adding a component, the CLI fetches all required dependencies (e.g. `class-variance-authority`, `lucide-react`) and child components, resolving them dynamically.
- **TypeScript / JavaScript Fallback:** Seamlessly swaps extensions (`.tsx` to `.jsx`) based on your `tsconfig.json`.
- **Auto-Formatting:** Runs `prettier` dynamically on the added files so everything visually matches your specific project standard.

***

## 📦 Usage

### 1. Initialize Project

Run the initialization command in your fresh Next.js, React, or Vite project. This will generate your `onebi.config.json` and optionally set up Tailwind.

```bash
npx onebi-ui@latest init
```

### 2. Add a Component

Add any built-in component. The CLI will copy the raw React component code to your initialized folder.

```bash
npx onebi-ui@latest add button
```

You can pass multiple components at once:
```bash
npx onebi-ui@latest add button dialog sidebar
```

### 📋 Available Components

The following components are ready to be added to your project:

- **Premium Components**: `chips`, `dropdown`, `text-field`, `filter`, `accordion`, `card`, `modal`, `drawer`, `combo-box`, `file-upload`
- **Standard Components**: `button`, `badge`, `input`, `textarea`, `checkbox`, `calendar`, `date-picker`, `dialog`, `dropdown-menu`, `empty-state`, `form`, `label`, `popover`, `radio-group`, `select`, `separator`, `sheet`, `skeleton`, `spinner`, `switch`, `table`, `tabs`, `toast`, `tooltip`

***

## 🛠 Advanced Features

### Configuration (`onebi.config.json`)
Running `init` will leave you with a configuration pointing to your paths:

```json
{
  "framework": "next",
  "typescript": true,
  "tailwind": true,
  "componentsPath": "src/components/ui",
  "stylesPath": "src/app/globals.css"
}
```

### Variants System
All interactive components utilize `class-variance-authority` (CVA) allowing you to implement dynamic sizing, spacing, and styling flawlessly.

---
Built by OneBI.
