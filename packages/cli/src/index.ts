#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";

function main() {
  const program = new Command()
    .name("onebi-ui")
    .description("Add components and dependencies to your project")
    .version("1.0.0");

  program.addCommand(initCommand);
  program.addCommand(addCommand);

  program.parse(process.argv);
}

main();
