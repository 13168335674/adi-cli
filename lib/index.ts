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
  .description("dev")
  .alias("d")
  .action(() => {
    console.log(`ADI-LOG => cwd`, process.cwd());
    if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
      shell.echo("Error: Git commit failed");
      shell.exit(1);
    }
  });

// 其他参数
program.parse(process.argv);
if (!program.args.length) {
  program.help();
}
