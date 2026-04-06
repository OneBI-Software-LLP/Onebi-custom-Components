import { Command } from "commander";
import prompts from "prompts";
// @ts-ignore
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import { logger } from "../utils/logger.js";
import { fetchComponentFromRegistry } from "../utils/registry.js";
import { getMissingDependencies, installDependencies } from "../utils/install.js";

const fallbackRegistry: Record<string, any> = {
  button: {
    name: "button",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        name: "button.tsx",
        content: `import * as React from "react"\nimport { Slot } from "@radix-ui/react-slot"\nimport { cva, type VariantProps } from "class-variance-authority"\nimport { cn } from "@/lib/utils"\n\nconst buttonVariants = cva(\n  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",\n  {\n    variants: {\n      variant: {\n        default: "bg-primary text-primary-foreground hover:bg-primary/90",\n        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",\n        outline:\n          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",\n        secondary:\n          "bg-secondary text-secondary-foreground hover:bg-secondary/80",\n        ghost: "hover:bg-accent hover:text-accent-foreground",\n        link: "text-primary underline-offset-4 hover:underline",\n      },\n      size: {\n        default: "h-10 px-4 py-2",\n        sm: "h-9 rounded-md px-3",\n        lg: "h-11 rounded-md px-8",\n        icon: "h-10 w-10",\n      },\n    },\n    defaultVariants: {\n      variant: "default",\n      size: "default",\n    },\n  }\n)\n\nexport interface ButtonProps\n  extends React.ButtonHTMLAttributes<HTMLButtonElement>,\n    VariantProps<typeof buttonVariants> {\n  asChild?: boolean\n}\n\nconst Button = React.forwardRef<HTMLButtonElement, ButtonProps>(\n  ({ className, variant, size, asChild = false, ...props }, ref) => {\n    const Comp = asChild ? Slot : "button"\n    return (\n      <Comp\n        className={cn(buttonVariants({ variant, size, className }))}\n        ref={ref}\n        {...props}\n      />\n    )\n  }\n)\nButton.displayName = "Button"\n\nexport { Button, buttonVariants }\n`
      }
    ]
  }
};

export const addCommand = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("[components...]", "the components to add")
  .action(async (components: string[]) => {
    try {
      const configPath = path.resolve(process.cwd(), "onebi.config.json");
      if (!fs.existsSync(configPath)) {
        logger.error("Configuration file not found. Please run init first.");
        process.exit(1);
      }

      const config = JSON.parse(await fs.readFile(configPath, "utf8"));
      let componentsToAdd = components;
      
      if (!componentsToAdd || componentsToAdd.length === 0) {
        const response = await prompts({
          type: "text",
          name: "component",
          message: "Which component would you like to add? (e.g. button)"
        });
        
        if (!response.component) {
           logger.warn("No component selected. Exiting.");
           process.exit(0);
        }
        componentsToAdd = [response.component];
      }

      for (const component of componentsToAdd) {
        logger.break();
        const spinner = ora(`Fetching component '${component}'...`).start();

        let registryComponent = await fetchComponentFromRegistry(component);
        if (!registryComponent) {
          if (fallbackRegistry[component]) {
            registryComponent = fallbackRegistry[component];
          } else {
            spinner.fail(`Component '${component}' not found in registry.`);
            continue;
          }
        }
        spinner.succeed(`Found '${component}'`);

        // Handle NPM Dependencies
        const missingDeps = getMissingDependencies(registryComponent!.dependencies || []);
        if (missingDeps.length > 0) {
           const depSpinner = ora(`Installing dependencies: ${missingDeps.join(", ")}...`).start();
           installDependencies(missingDeps);
           depSpinner.succeed("Dependencies installed.");
        }

        // Install registry dependencies (Recursive)
        if (registryComponent.registryDependencies && registryComponent.registryDependencies.length > 0) {
          const regDeps = registryComponent.registryDependencies;
          logger.info(`Recursively adding registry dependencies: ${regDeps.join(", ")}`);
          for (const rx of regDeps) {
             execSync(`npx onebi-ui add ${rx}`, { stdio: "inherit" });
          }
        }

        // Write files
        const writeSpinner = ora(`Writing files for '${component}'...`).start();
        fs.ensureDirSync(path.resolve(process.cwd(), config.componentsPath));

        const isTS = config.typescript;

        for (const file of registryComponent.files) {
          let fileName = file.name;
          if (!isTS && fileName.endsWith(".tsx")) {
             fileName = fileName.replace(".tsx", ".jsx");
          } else if (!isTS && fileName.endsWith(".ts")) {
             fileName = fileName.replace(".ts", ".js");
          }

          const targetPath = path.resolve(process.cwd(), config.componentsPath, fileName);
          
          if (fs.existsSync(targetPath)) {
            logger.warn(`\nFile ${fileName} already exists. Overwriting.`);
          }

          await fs.writeFile(targetPath, file.content, "utf8");
          
          try {
            execSync(`npx prettier --write "${targetPath}"`, { stdio: "ignore" });
          } catch(e) {}
        }

        writeSpinner.succeed(`Successfully added ${component} to ${config.componentsPath}`);
      }
    } catch (error) {
      logger.error("\nAn error occurred while adding the component.");
      console.error(error);
      process.exit(1);
    }
  });
