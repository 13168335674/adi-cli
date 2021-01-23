#!/usr/bin/env node
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator')) :
  typeof define === 'function' && define.amd ? define(['@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global._regeneratorRuntime, global._asyncToGenerator));
}(this, (function (_regeneratorRuntime, _asyncToGenerator) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
  var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);

  /*
   * @Author: ADI
   * @Date: 2021-01-21 10:13:25
   * @LastEditors: ADI
   * @LastEditTime: 2021-01-23 11:32:37
   */
  var fs = require("fs");

  var chalk = require("chalk");

  function hasDir(dirName) {
    return new Promise(function (resolve, reject) {
      fs.exists(dirName, function (error) {
        if (error) {
          console.log(chalk.red("The ".concat(dirName, " folder already exists in the current directory. Please try to use another project name!")));
          process.exit(1);
        } else {
          resolve("");
        }
      });
    });
  }

  /*
   * @Author: ADI
   * @Date: 2021-01-21 09:52:57
   * @LastEditors: ADI
   * @LastEditTime: 2021-01-23 11:31:36
   */
  var chalk$1 = require('chalk');

  var tips = {
    success: function success(msg) {
      return console.log(chalk$1.green.bold("\n \u2705   ".concat(msg, "\n")));
    },
    fail: function fail(msg) {
      return console.log(chalk$1.red.bold("\n \u274C   ".concat(msg, "\n")));
    },
    info: function info(msg) {
      return console.log(chalk$1.yellow("\n \uD83C\uDF08   ".concat(msg, "\n")));
    }
  };

  /*
   * @Author: ADI
   * @Date: 2021-01-21 11:12:56
   * @LastEditors: ADI
   * @LastEditTime: 2021-01-21 22:44:44
   */

  var fs$1 = require("fs");

  require("commander");

  var download = require("download-git-repo");

  var ora = require("ora");

  var handlebars = require("handlebars");

  function downloadTemplate(dirName, url, mate) {
    var spinner = ora("downloading template...");
    spinner.start();
    download(url, dirName, {
      clone: true
    }, function (err) {
      if (err) {
        spinner.fail();
        tips.fail("".concat(err, "download template fail,please check your network connection and try again"));
        process.exit(1);
      }

      spinner.succeed();
      var meta = {
        name: dirName,
        description: mate.description,
        author: mate.author
      };
      var fileName = "".concat(dirName, "/package.json");
      var content = fs$1.readFileSync(fileName).toString();
      var result = handlebars.compile(content)(meta);
      fs$1.writeFileSync(fileName, result);
      tips.success("".concat(dirName, " project created!"));
      tips.info("cd ".concat(dirName, " && yarn install"));
    });
  }

  var templates = {
  	"vue2+ts": {
  	url: "https://github.com/13168335674/adi-cli-template-vue2-ts",
  	downloadUrl: "https://github.com:13168335674/adi-cli-template-vue2-ts#main",
  	description: "vue@2.6、typescript@3.9"
  },
  	"vue3+ts2": {
  	url: "https://github.com/13168335674/adi-cli-template-vue3-ts",
  	downloadUrl: "https://github.com:13168335674/adi-cli-template-vue3-ts#main",
  	description: "vue@3.x、typescript@3.9"
  },
  	"vue2+vite": {
  	url: "https://github.com/13168335674/js-module-demo",
  	downloadUrl: "https://github.com:13168335674/js-module-demo#master",
  	description: "vue@2.6、vite@1.0-beta.3"
  }
  };

  var inquirer = require("inquirer");

  function createProject(_x) {
    return _createProject.apply(this, arguments);
  }

  function _createProject() {
    _createProject = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(dirName) {
      return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return hasDir(dirName);

            case 2:
              inquirer.prompt([{
                name: "templateType",
                message: "which template type you need to create?",
                type: "list",
                choices: Object.keys(templates)
              }, {
                name: "description",
                message: "please enter a description:",
                default: dirName
              }, {
                name: "author",
                message: "please enter a author:",
                default: "author"
              }]).then(function (answers) {
                var downloadUrl = templates[answers.templateType].downloadUrl;
                downloadTemplate(dirName, downloadUrl, answers);
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _createProject.apply(this, arguments);
  }

  /*
   * @Author: ADI
   * @Date: 2021-01-21 09:58:59
   * @LastEditors: ADI
   * @LastEditTime: 2021-01-21 22:27:16
   */

  var Table = require("cli-table");

  var table = new Table({
    head: ["name", "description"],
    style: {
      head: ["cyan"]
    }
  });
  function tableList(config) {
    var keys = Object.keys(config);

    if (keys.length) {
      keys.forEach(function (key) {
        table.push(["".concat(key), config[key].description]);
      });
      var tableListStr = table.toString();

      if (tableListStr) {
        tips.info("当前模板列表: ");
        console.log("".concat(tableListStr, "\n"));
      } else {
        tips.fail("模板文件不存在!");
      }
    } else {
      tips.fail("模板文件不存在!");
    }
  }

  /*
   * @Author: ADI
   * @Date: 2021-01-21 22:28:13
   * @LastEditors: ADI
   * @LastEditTime: 2021-01-21 22:31:36
   */
  function showTemplatesList() {
    tableList(templates);
  }

  console.log("\n\n    ___    ____  ____   ________    ____\n   /   |  / __ /  _/  / ____/ /   /  _/\n  / /| | / / / // /   / /   / /    / /\n / ___ |/ /_/ // /   / /___/ /____/ /\n/_/  |_/_____/___/   ____/_____/___/\n\n");

  var packageInfo = require("../package.json"); // https://www.npmjs.com/package/commander


  var program = require("commander");

  program.version(packageInfo.version, "-v, --version");
  program.command("create <projectName>").description("create project").alias("c").action(function (projectName) {
    return createProject(projectName);
  });
  program.command("list").description("view the list of templates").alias("l").action(function () {
    showTemplatesList();
  }); // 其他参数

  program.parse(process.argv);

  if (!program.args.length) {
    program.help();
  }

})));
