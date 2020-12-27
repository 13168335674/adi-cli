#!/usr/bin/env node
console.log("adi-cli脚手架工具");

var _require = require("commander"),
    program = _require.program;

var download = require("download-git-repo");

var handlebars = require("handlebars");

var inquirer = require("inquirer");

var ora = require("ora");

var logSymbols = require("log-symbols");

var chalk = require("chalk");

var fs = require("fs");

var templates = {
  "vue2+ts": {
    url: "https://github.com/13168335674/adi-cli-template-vue2-ts",
    downloadUrl: "https://github.com:13168335674/adi-cli-template-vue2-ts#main",
    description: "vue2+ts"
  },
  "vue2+ts2": {
    url: "https://github.com/13168335674/adi-cli-template-vue2-ts",
    downloadUrl: "https://github.com:13168335674/adi-cli-template-vue2-ts#main",
    description: "vue2+ts 2"
  }
};
program.version("1.0.0"); // -v 或者 --versions输出版本号

program.command("create <template> <project>").description("初始化项目模版").action(function (template, project) {
  var _ref = templates[template] || "",
      downloadUrl = _ref.downloadUrl;

  var spinner = ora("\u6B63\u5728\u4E0B\u8F7D\u6A21\u7248".concat(template, "...")).start();

  if (!downloadUrl) {
    return console.log(logSymbols.error, chalk.red("".concat(template, "\u6A21\u677F\u4E0D\u5B58\u5728")));
  }

  download(downloadUrl, project, {
    clone: true
  }, function (err) {
    if (err) {
      spinner.fail();
      return console.log(logSymbols.error, chalk.red("下载失败，失败原因:" + err));
    } else {
      spinner.succeed(); // 把项目下的package.json文件读取出来
      // 使用向导的方式采集用户输入的数据解析导
      // 使用模板引擎把用户输入的数据解析到package.json 文件中
      // 解析完毕，把解析之后的结果重新写入package.json wenjianzhong

      inquirer.prompt([{
        type: "inpute",
        name: "name",
        message: "请输入项目名称"
      }, {
        type: "inpute",
        name: "description",
        message: "请输入项目简介"
      }, {
        type: "inpute",
        name: "author",
        message: "请输入作者名称"
      }]).then(function (answers) {
        var packagePath = "".concat(project, "/package.json");
        var packageContent = fs.readFileSync(packagePath, "utf8");
        var packageResult = handlebars.compile(packageContent)(answers);
        fs.writeFileSync(packagePath, packageResult);
        console.log(chalk.yellow("初始化模版成功"));
      });
    }
  });
});
program.command("list").description("查看所有可用的模版").action(function () {
  var listStr = Object.keys(templates).reduce(function (pre, cur) {
    return "".concat(pre, "\n  ").concat(cur, "\n  ");
  }, "");
  console.log(listStr);
});
program.parse(process.argv);
