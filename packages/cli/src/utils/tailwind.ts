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
 
    --primary: 222.2 47.4% 11.2%;
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
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 210 40% 98%;
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
    --ring: 212.7 26.8% 83.9%;
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
