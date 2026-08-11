# OneBI UI CLI

A robust, production-ready Node.js CLI tool inspired by `shadcn/ui`. It intelligently initializes your environment and allows you to fetch fully customizable, raw components directly into your source code.

## 🚀 Features

- **Intelligent Framework Detection:** Automatically determines whether your project uses **Next.js**, **Vite**, or raw **React**.
- **Automatic Tailwind Setup:** Checks for existing configuration and injects premium design tokens automatically.
- **Recursive Dependency Installation:** Resolves and installs child components and npm packages (e.g. `framer-motion`, `lucide-react`) dynamically.
- **Localized Component Structure:** Every component now includes its own localized CSS, ensuring a perfect look regardless of your global style setup.
- **TypeScript / JavaScript Fallback:** Seamlessly supports both `.tsx` and `.jsx` environments.

***

## 📦 How to Install and Use

Getting started with OneBI UI is incredibly simple. Our CLI manages everything from installing dependencies to placing the components right into your source code.

### 1. Initialize Project
Run this in your existing Next.js, React, or Vite project to set up your configuration. This will configure Tailwind and inject the global CSS tokens automatically.

```bash
npx onebi-ui@latest init
```

*Note: The CLI will prompt you to confirm your framework and base paths.*

### 2. Add Components
You can now add any component directly into your project!

```bash
npx onebi-ui@latest add <component-name>
```

For instance, to add a button and a table, simply run:
```bash
npx onebi-ui@latest add buttons table
```

### 3. Use in your App
Once added, the components will typically be available in `src/components/ui/` (or your configured path). You can import and use them like any other standard React component, modifying them deeply if needed.

```tsx
import { Button } from "@/components/ui/buttons";
import { Table } from "@/components/ui/table";

export default function MyPage() {
  return (
    <div className="p-4">
      <Table data={myAwesomeData} />
      <Button variant="primary">Submit Data</Button>
    </div>
  );
}
```

***

## 📋 Available Components

Our library components are carefully crafted, feature-rich, and ready to be used. They are organized neatly so you can scale your UI seamlessly.

### 🧩 Layout & Navigation
| Component | CLI Command |
| :--- | :--- |
| **Drawer** | `npx onebi-ui@latest add drawer` |
| **Footer** | `npx onebi-ui@latest add footer` |
| **Navbar** | `npx onebi-ui@latest add navbar` |
| **Sidebar** | `npx onebi-ui@latest add sidebar` |
| **Tab** | `npx onebi-ui@latest add tab` |

### 📊 Data Display
| Component | CLI Command |
| :--- | :--- |
| **Accordion** | `npx onebi-ui@latest add accordion` |
| **Card** | `npx onebi-ui@latest add card` |
| **Table** | `npx onebi-ui@latest add table` |

### 📝 Inputs & Forms
| Component | CLI Command |
| :--- | :--- |
| **Buttons** | `npx onebi-ui@latest add buttons` |
| **Checkbox** | `npx onebi-ui@latest add checkbox` |
| **Combobox** | `npx onebi-ui@latest add combobox` |
| **Date Picker** | `npx onebi-ui@latest add date-picker` |
| **Dropdown** | `npx onebi-ui@latest add dropdown` |
| **File Upload** | `npx onebi-ui@latest add file-upload` |
| **Filter** | `npx onebi-ui@latest add filter` |
| **Radiobox** | `npx onebi-ui@latest add radiobox` |
| **Search** | `npx onebi-ui@latest add search` |
| **Switch Button** | `npx onebi-ui@latest add switch-button` |
| **Text Area** | `npx onebi-ui@latest add text-area` |
| **Text Field** | `npx onebi-ui@latest add text-field` |
| **Time Picker** | `npx onebi-ui@latest add time-picker` |

### 💡 Feedback & Overlays
| Component | CLI Command |
| :--- | :--- |
| **Avatar** | `npx onebi-ui@latest add avatar` |
| **Badge** | `npx onebi-ui@latest add badge` |
| **Chips** | `npx onebi-ui@latest add chips` |
| **Modal** | `npx onebi-ui@latest add modal` |
| **Popover** | `npx onebi-ui@latest add popover` |
| **Skeleton Loader** | `npx onebi-ui@latest add skeleton-loader` |
| **Spinner** | `npx onebi-ui@latest add spinner` |
| **Toast** | `npx onebi-ui@latest add toast` |
| **Tooltip** | `npx onebi-ui@latest add tooltip` |

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
