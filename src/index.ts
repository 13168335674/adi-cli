#!/usr/bin/env node
console.log("adi-cli脚手架工具");
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

console.log(`
  Quick start:
  adi-cli create <template name> <project name>;
    - templates: ${Object.keys(templates).map(temp => `'${temp}'`)}
`);

const { program } = require("commander");
const download = require("download-git-repo");
const handlebars = require("handlebars");
const inquirer = require("inquirer");
const ora = require("ora");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
const fs = require("fs");
const pkg = require("../package.json");

program.version(pkg.version); // -v 或者 --versions输出版本号

program
  .command("create <template> <project>")
  .description("初始化项目模版")
  .action((template, project) => {
    const { downloadUrl } = templates[template] || "";
    const spinner = ora(`正在下载模版${template}...`).start();
    if (!downloadUrl) {
      spinner.fail();
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
        // 把项目下的package.json文件读取出来
        // 使用向导的方式采集用户输入的数据解析导
        // 使用模板引擎把用户输入的数据解析到package.json 文件中
        // 解析完毕，把解析之后的结果重新写入package.json wenjianzhong
        inquirer
          .prompt([
            {
              type: "inpute",
              name: "name",
              message: "请输入项目名称",
            },
            {
              type: "inpute",
              name: "description",
              message: "请输入项目简介",
            },
            {
              type: "inpute",
              name: "author",
              message: "请输入作者名称",
            },
          ])
          .then(answers => {
            const packagePath = `${project}/package.json`;
            const packageContent = fs.readFileSync(packagePath, "utf8");
            const packageResult = handlebars.compile(packageContent)(answers);
            fs.writeFileSync(packagePath, packageResult);
            console.log(chalk.yellow("初始化模版成功"));
          });
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
