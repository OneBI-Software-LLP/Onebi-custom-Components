import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const UI_SRC = path.join(ROOT_DIR, "src", "components", "ui");
const REGISTRY_DIR = path.join(ROOT_DIR, "public", "registry");

// Ensure registry folder exists
if (!fs.existsSync(REGISTRY_DIR)) {
  fs.mkdirSync(REGISTRY_DIR, { recursive: true });
}

async function buildRegistry() {
  console.log("Building Component Registry...");

  // 1. Copy global CSS for init command
  const globalCssSrc = path.join(ROOT_DIR, "src", "styles", "components.css");
  if (fs.existsSync(globalCssSrc)) {
    fs.copyFileSync(globalCssSrc, path.join(REGISTRY_DIR, "components.css"));
    console.log("✅ Copied components.css");
  }

  // 2. Loop through UI components and generate JSON definitions
  if (fs.existsSync(UI_SRC)) {
    const files = fs.readdirSync(UI_SRC).filter(f => f.endsWith(".tsx"));
    
    let index = [];

    for (const file of files) {
      const componentName = file.replace(".tsx", "");
      const content = fs.readFileSync(path.join(UI_SRC, file), "utf8");
      
      // Basic dependency inference (simple MVP)
      const dependencies = [];
      if (content.includes("lucide-react")) dependencies.push("lucide-react");
      if (content.includes("framer-motion")) dependencies.push("framer-motion");
      if (content.includes("class-variance-authority")) dependencies.push("class-variance-authority");
      if (content.includes("react-hook-form")) dependencies.push("react-hook-form");

      const componentDef = {
        name: componentName,
        dependencies,
        files: [
          {
            name: `${componentName}.tsx`,
            content
          }
        ]
      };

      // Write individual component JSON
      fs.writeFileSync(
        path.join(REGISTRY_DIR, `${componentName}.json`),
        JSON.stringify(componentDef, null, 2)
      );
      
      index.push({
        name: componentName,
        dependencies
      });
      console.log(`✅ Built metadata for ${componentName}`);
    }

    // Generate main index
    fs.writeFileSync(
      path.join(REGISTRY_DIR, "index.json"),
      JSON.stringify(index, null, 2)
    );
    console.log("✅ Registry index built successfully!");
  } else {
    console.warn(`Could not find UI directory at ${UI_SRC}`);
  }
}

buildRegistry().catch(console.error);
