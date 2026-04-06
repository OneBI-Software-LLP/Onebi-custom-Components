import { Command } from "commander";
import prompts from "prompts";
// @ts-ignore
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { logger } from "../utils/logger.js";
import { detectFramework, isTypeScript, getDefaultComponentPath, getDefaultStylesPath } from "../utils/framework.js";
import { setupTailwind } from "../utils/tailwind.js";
import { installDependencies } from "../utils/install.js";

export const initCommand = new Command()
  .name("init")
  .description("Initialize your project and install dependencies")
  .option("-t, --template <framework>", "Framework to use (next, vite, react)")
  .action(async (options) => {
    logger.break();
    console.log("Welcome to OneBI UI!\n");
    
    // Check existing config
    const configPath = path.resolve(process.cwd(), "onebi.config.json");
    if (fs.existsSync(configPath)) {
      const { force } = await prompts({
        type: "confirm",
        name: "force",
        message: "onebi.config.json already exists. Do you want to overwrite?",
        initial: false
      });
      if (!force) process.exit(0);
    }
    
    try {
      // 1. Detection
      const defaultFramework = detectFramework();
      const hasTS = isTypeScript();
      
      const response = await prompts([
        {
          type: "select",
          name: "framework",
          message: "Which framework are you using?",
          choices: [
             { title: "Next.js", value: "next" },
             { title: "Vite", value: "vite" },
             { title: "React", value: "react" }
          ],
          initial: defaultFramework === "next" ? 0 : defaultFramework === "vite" ? 1 : 2
        },
        {
          type: "confirm",
          name: "typescript",
          message: "Would you like to use TypeScript (recommended)?",
          initial: hasTS
        },
        {
          type: "text",
          name: "componentsPath",
          message: "Configure the import alias or path for components:",
          initial: (prev, values) => getDefaultComponentPath(values.framework)
        },
        {
          type: "text",
          name: "stylesPath",
          message: "Where is your global CSS file?",
          initial: (prev, values) => getDefaultStylesPath(values.framework)
        }
      ]);

      const spinner = ora("Initializing project...").start();

      // Ensure directory exists
      fs.ensureDirSync(path.resolve(process.cwd(), response.componentsPath));

      // Build Config
      const config = {
        framework: response.framework,
        typescript: response.typescript,
        tailwind: true,
        componentsPath: response.componentsPath,
        stylesPath: response.stylesPath
      };

      await fs.writeFile(
        configPath,
        JSON.stringify(config, null, 2),
        "utf8"
      );
      
      spinner.text = "Configuring Tailwind CSS...";
      await setupTailwind(response.stylesPath);

      spinner.text = "Installing core utilities...";
      // Core UI dependencies that variants and basic components usually rely on
      installDependencies(["class-variance-authority", "clsx", "tailwind-merge", "lucide-react"], false);

      spinner.succeed("Initialization complete! Configuration saved to onebi.config.json.");
      logger.break();
    } catch (error) {
      logger.error("Initialization failed.");
      process.exit(1);
    }
  });
