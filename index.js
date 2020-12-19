#!/usr/bin/env node

console.log("adi-cli脚手架工具");
const { program } = require("commander");
const download = require("download-git-repo");
const ora = require("ora");
const chalk = require("chalk");
const logSymbols = require("log-symbols");

const templates = {
  "vue2+ts": {
    url: "https://github.com/13168335674/adi-cli-template-vue2-ts",
    downloadUrl: "https://github.com:13168335674/adi-cli-template-vue2-ts#main",
    description: "vue2+ts",
  },
  "vue2+ts2": {
    url: "https://github.com/13168335674/adi-cli-template-vue2-ts",
    downloadUrl: "https://github.com:13168335674/adi-cli-template-vue2-ts#main",
    description: "vue2+ts 2",
  },
};

program.version("1.0.0"); // -v 或者 --versions输出版本号

program
  .command("create <template> <project>")
  .description("初始化项目模版")
  .action((template, project) => {
    const { downloadUrl } = templates[template] || "";
    const spinner = ora(`正在下载模版${template}...`).start();
    if (!downloadUrl) {
      return console.log(logSymbols.error, chalk.red(`${template}模板不存在`));
    }
    download(downloadUrl, project, { clone: true }, err => {
      if (err) {
        spinner.fail();
        return console.log(
          logSymbols.error,
          chalk.red("下载失败，失败原因:" + err),
        );
      } else {
        spinner.succeed();
        return console.log(logSymbols.success, chalk.yellow("下载成功"));
      }
    });
  });

program
  .command("list")
  .description("查看所有可用的模版")
  .action(() => {
    const listStr = Object.keys(templates).reduce((pre, cur) => {
      return `${pre}
  ${cur}
  `;
    }, "");
    console.log(listStr);
  });

program.parse(process.argv);
