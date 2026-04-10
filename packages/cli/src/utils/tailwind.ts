import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import { logger } from "./logger.js";
import { installDependencies } from "./install.js";

const TAILWIND_CONFIG_TEMPLATE = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

const GLOBAL_CSS_INJECTION = `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
 
    --radius: 0.5rem;

    /* OneBI Extra Tokens */
    --color-primary      : #1a1a1a;
    --color-primary-hover: #333333;
    --color-danger       : #dc2626;
    --color-danger-hover : #b91c1c;
    --color-success      : #16a34a;
    --color-success-hover: #15803d;
    --color-warning      : #d97706;
    --color-warning-hover: #b45309;
    --color-info         : #2563eb;
    --color-info-hover   : #1d4ed8;
    --color-surface      : #f3f4f6;
    --color-surface-hover: #e5e7eb;
    --color-border       : #d1d5db;
    --color-text         : #111827;
    --color-text-muted   : #6b7280;
    --ring-primary       : rgba(0, 0, 0, 0.25);
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;

    /* OneBI Extra Tokens - Dark */
    --color-primary      : #f9fafb;
    --color-primary-hover: #e5e7eb;
    --color-surface      : #1f2937;
    --color-surface-hover: #374151;
    --color-border       : #374151;
    --color-text         : #f9fafb;
    --color-text-muted   : #9ca3af;
    --ring-primary       : rgba(249, 250, 251, 0.25);
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

export function isTailwindSetup(): boolean {
  return (
    fs.existsSync(path.resolve(process.cwd(), "tailwind.config.js")) ||
    fs.existsSync(path.resolve(process.cwd(), "tailwind.config.ts")) ||
    fs.existsSync(path.resolve(process.cwd(), "tailwind.config.cjs")) ||
    fs.existsSync(path.resolve(process.cwd(), "tailwind.config.mjs"))
  );
}

export async function setupTailwind(stylesPath: string) {
  if (isTailwindSetup()) {
    return;
  }

  logger.info("Tailwind not found. Initializing Tailwind CSS...");

  // Install basic tailwind dependencies
  try {
    installDependencies(["tailwindcss", "postcss", "autoprefixer"], true);
    
    // Create tailwind Config
    fs.writeFileSync(
      path.resolve(process.cwd(), "tailwind.config.js"),
      TAILWIND_CONFIG_TEMPLATE
    );

    // Inject styles
    const resolvedStylesPath = path.resolve(process.cwd(), stylesPath);
    let cssContent = "";
    
    // Only fetch existing if it exists
    if (fs.existsSync(resolvedStylesPath)) {
      cssContent = fs.readFileSync(resolvedStylesPath, "utf-8");
      if (!cssContent.includes("@tailwind base")) {
        cssContent = GLOBAL_CSS_INJECTION + "\n" + cssContent;
        fs.writeFileSync(resolvedStylesPath, cssContent);
      }
    } else {
      fs.ensureDirSync(path.dirname(resolvedStylesPath));
      fs.writeFileSync(resolvedStylesPath, GLOBAL_CSS_INJECTION);
    }
  } catch (error) {
    logger.error("Failed to setup Tailwind CSS automatically.");
  }
}
