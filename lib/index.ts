#!/usr/bin/env node

"use strict";

console.log(`

    ___    ____  ____   ________    ____
   /   |  / __ \/  _/  / ____/ /   /  _/
  / /| | / / / // /   / /   / /    / /  
 / ___ |/ /_/ // /   / /___/ /____/ /   
/_/  |_/_____/___/   \____/_____/___/   

`);

import { createProject } from "@/cmd/create";
import { showTemplatesList } from "@/cmd/list";
const packageInfo = require("../package.json");

// https://www.npmjs.com/package/commander
const program = require("commander");

program.version(packageInfo.version, "-v, --version");

program
  .command("create <projectName>")
  .description("create project")
  .alias("c")
  .action(projectName => createProject(projectName));

program
  .command("list")
  .description("view the list of templates")
  .alias("l")
  .action(() => {
    showTemplatesList();
  });

// 其他参数
program.parse(process.argv);
if (!program.args.length) {
  program.help();
}
