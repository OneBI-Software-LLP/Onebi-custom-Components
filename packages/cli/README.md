# OneBI UI CLI

A robust, production-ready Node.js CLI tool inspired by `shadcn/ui`. It intelligently initializes your environment and allows you to fetch fully customizable, raw components directly into your source code.

## 🚀 Features

- **Intelligent Framework Detection:** Automatically determines whether your project uses **Next.js**, **Vite**, or raw **React**.
- **Automatic Tailwind Setup:** Checks for existing configuration and injects premium design tokens automatically.
- **Recursive Dependency Installation:** Resolves and installs child components and npm packages (e.g. `framer-motion`, `lucide-react`) dynamically.
- **Localized Component Structure:** Every component now includes its own localized CSS, ensuring a perfect look regardless of your global style setup.
- **TypeScript / JavaScript Fallback:** Seamlessly supports both `.tsx` and `.jsx` environments.

***

## 📦 Usage

### 1. Initialize Project
Run this in your fresh Next.js, React, or Vite project to set up your configuration.
```bash
npx onebi-ui@latest init
```

### 2. Add a Component
```bash
npx onebi-ui@latest add button
```

***

## 📋 Available Components

Our library is divided into **Premium** (feature-rich, high-fidelity) and **Standard** (core building blocks) components.

### 💎 Premium Components
These components feature complex interactions, advanced styling, and built-in animations.

| Component | CLI Command | Usage Example |
| :--- | :--- | :--- |
| **Navbar** | `add navbar` | `<Navbar brand={<Logo />} items={navLinks} />` |
| **Chips** | `add chips` | `<Chips items={tags} variant="soft" />` |
| **Filter Bar** | `add filter-bar` | `<FilterBar onFilter={handleFilter} />` |
| **Multi Select** | `add multi-select` | `<MultiSelect options={options} />` |
| **File Upload** | `add file-upload` | `<FileUpload onUpload={v => console.log(v)} />` |
| **Search Input** | `add search-input` | `<SearchInput shortcutHint="⌘K" clearable />` |
| **Command Palette**| `add command-palette`| `<CommandPalette groups={groups} open={isOpen} />` |
| **Role Selector** | `add role-permission-selector` | `<RolePermissionSelector data={roles} />` |
| **Text Field** | `add text-field` | `<TextField label="Email" status="error" />` |
| **Modal** | `add modal` | `<Modal title="Account Settings">...</Modal>` |

### 🧱 Standard Components
Clean, accessible building blocks for any application.

- **Actions**: `button`, `badge`, `spinner`
- **Forms**: `input`, `textarea`, `checkbox`, `radio-group`, `switch`, `select`, `combo-box`, `label`, `form`, `password-input`
- **Navigation**: `tabs`, `sheet`, `drawer`, `dropdown-menu`, `popover`, `separator`
- **Data**: `table`, `card`, `accordion`, `empty-state`, `skeleton`
- **Pickers**: `calendar`, `date-picker`
- **Feedback**: `toast`, `tooltip`

---

## 🛠 Advanced Configuration (`onebi.config.json`)

Your configuration file controls where components are placed and how they are handled.

```json
{
  "framework": "next",
  "typescript": true,
  "tailwind": true,
  "componentsPath": "src/components/ui",
  "stylesPath": "src/app/globals.css"
}
```

## 🎨 Styling & Design Tokens
When you run `init`, the CLI injects a set of "OneBI Design Tokens" into your CSS. Premium components rely on these variables (e.g., `--color-primary`, `--color-surface`) to maintain their high-fidelity look. All components are fully open-source—you can tweak the CSS directly in your project!

---
Built by [OneBI](https://onebi.com).
