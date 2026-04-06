import fs from "fs-extra";
import path from "path";

export type Framework = "next" | "vite" | "react" | "unknown";

export function detectFramework(): Framework {
  const pkgJsonPath = path.resolve(process.cwd(), "package.json");
  if (!fs.existsSync(pkgJsonPath)) return "unknown";

  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  if ("next" in deps) return "next";
  if ("vite" in deps) return "vite";
  if ("react-scripts" in deps) return "react";
  
  return "unknown";
}

export function isTypeScript(): boolean {
  return fs.existsSync(path.resolve(process.cwd(), "tsconfig.json"));
}

export function getDefaultComponentPath(framework: Framework): string {
  if (framework === "next") {
    // Next.js - usually checks if src/app exists, otherwise app/, otherwise components/
    if (fs.existsSync(path.resolve(process.cwd(), "src/app"))) {
      return "src/components/ui";
    }
    if (fs.existsSync(path.resolve(process.cwd(), "app"))) {
      return "components/ui";
    }
    return "components/ui";
  } else if (framework === "vite" || framework === "react") {
    return "src/components/ui";
  }
  return "components/ui";
}

export function getDefaultStylesPath(framework: Framework): string {
  if (framework === "next") {
    if (fs.existsSync(path.resolve(process.cwd(), "src/app/globals.css"))) {
      return "src/app/globals.css";
    }
    if (fs.existsSync(path.resolve(process.cwd(), "app/globals.css"))) {
      return "app/globals.css";
    }
  } else if (framework === "vite") {
    return "src/index.css";
  } else if (framework === "react") {
    return "src/index.css";
  }
  return "src/index.css";
}
