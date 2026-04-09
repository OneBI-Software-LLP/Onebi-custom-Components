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
    const STYLES_DIR = path.join(ROOT_DIR, "src", "styles", "ui");
    
    let indexData = [];

    for (const file of files) {
      const componentName = file.replace(".tsx", "").toLowerCase();
      const content = fs.readFileSync(path.join(UI_SRC, file), "utf8");
      
      // Basic dependency inference
      const dependencies = [];
      const registryDependencies = [];

      if (content.includes("lucide-react")) dependencies.push("lucide-react");
      if (content.includes("framer-motion")) dependencies.push("framer-motion");
      if (content.includes("class-variance-authority")) dependencies.push("class-variance-authority");
      if (content.includes("react-hook-form")) dependencies.push("react-hook-form");
      if (content.includes("clsx")) dependencies.push("clsx");
      if (content.includes("tailwind-merge")) dependencies.push("tailwind-merge");

      // Manual registry dependencies
      if (componentName === "toaster") {
        registryDependencies.push("toast", "use-toast");
      }

      // Files to include in the component manifest
      const componentFiles = [
        {
          name: file, // Keep original filename for the code
          content
        }
      ];

      // Check for matching CSS file in styles directory
      // We look for both lowercase and original case CSS
      const cssPaths = [
        path.join(STYLES_DIR, `${componentName}.css`),
        path.join(STYLES_DIR, `${file.replace(".tsx", "")}.css`)
      ];

      for (const cssPath of cssPaths) {
        if (fs.existsSync(cssPath) && !componentFiles.some(f => f.name.endsWith(".css"))) {
          const cssName = path.basename(cssPath);
          componentFiles.push({
            name: cssName,
            content: fs.readFileSync(cssPath, "utf8")
          });
          console.log(`  📎 Attached ${cssName} to ${componentName}`);
        }
      }

      const componentDef = {
        name: componentName,
        dependencies,
        registryDependencies,
        files: componentFiles
      };

      // Write individual component JSON
      fs.writeFileSync(
        path.join(REGISTRY_DIR, `${componentName}.json`),
        JSON.stringify(componentDef, null, 2)
      );
      
      indexData.push({
        name: componentName,
        dependencies,
        files: componentFiles.map(f => f.name)
      });
      console.log(`✅ Built metadata for ${componentName}`);
    }

    // Generate main index
    fs.writeFileSync(
      path.join(REGISTRY_DIR, "index.json"),
      JSON.stringify(indexData, null, 2)
    );
    console.log("✅ Registry index built successfully!");
  } else {
    console.warn(`Could not find UI directory at ${UI_SRC}`);
  }
}

buildRegistry().catch(console.error);
