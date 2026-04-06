import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

export function getPackageManager(targetDir: string) {
  if (fs.existsSync(path.resolve(targetDir, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.resolve(targetDir, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.resolve(targetDir, "bun.lockb"))) return "bun";
  return "npm";
}

export function installDependencies(packages: string[], isDev: boolean = false) {
  if (packages.length === 0) return;
  const pkgManager = getPackageManager(process.cwd());
  let cmd = "";

  if (pkgManager === "npm") {
    cmd = `npm install ${isDev ? "-D " : ""}${packages.join(" ")}`;
  } else if (pkgManager === "yarn") {
    cmd = `yarn add ${isDev ? "-D " : ""}${packages.join(" ")}`;
  } else if (pkgManager === "pnpm") {
    cmd = `pnpm add ${isDev ? "-D " : ""}${packages.join(" ")}`;
  } else if (pkgManager === "bun") {
    cmd = `bun add ${isDev ? "-d " : ""}${packages.join(" ")}`;
  }

  execSync(cmd, { stdio: "ignore" });
}

export function getMissingDependencies(packages: string[]): string[] {
  const pkgJsonPath = path.resolve(process.cwd(), "package.json");
  if (!fs.existsSync(pkgJsonPath)) return packages;
  
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  const existingDeps = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {})
  ]);

  return packages.filter(p => {
    // Drop versions like ^1.0.0
    const cleanName = p.startsWith("@") 
      ? `@${p.split("@")[1]}`.split("@")[0] 
      : p.split("@")[0];
    return !existingDeps.has(cleanName);
  });
}
