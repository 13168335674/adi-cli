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
import { build } from "@/cmd/build";
import packageInfo from "../package.json";

// https://www.npmjs.com/package/commander
import program from "commander";
import shell from "shelljs";

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

program
  .command("dev")
  .description("dev server.")
  .action(() => {
    process.env.NODE_ENV = "development";
    build({ useWatch: true });
  });

program
  .command("build")
  .description("build project.")
  .action(() => {
    process.env.NODE_ENV = "production";
    build({ useWatch: false });
  });

// 其他参数
program.parse(process.argv);
if (!program.args.length) {
  program.help();
}
