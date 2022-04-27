#!/usr/bin/env node
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('commander'), require('shelljs')) :
  typeof define === 'function' && define.amd ? define(['commander', 'shelljs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.program, global.shell));
})(this, (function (program, shell) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var program__default = /*#__PURE__*/_interopDefaultLegacy(program);
  var shell__default = /*#__PURE__*/_interopDefaultLegacy(shell);

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  /*
   * @Author: ADI
   * @Date: 2021-01-21 10:13:25
   * @LastEditors: ADI
   * @LastEditTime: 2021-01-23 11:32:37
   */
  var fs$1 = require("fs");

  var chalk$1 = require("chalk");

  function hasDir(dirName) {
    return new Promise(function (resolve, reject) {
      fs$1.exists(dirName, function (error) {
        if (error) {
          console.log(chalk$1.red("The ".concat(dirName, " folder already exists in the current directory. Please try to use another project name!")));
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
  var chalk = require('chalk');

  var tips = {
    success: function success(msg) {
      return console.log(chalk.green.bold("\n \u2705   ".concat(msg, "\n")));
    },
    fail: function fail(msg) {
      return console.log(chalk.red.bold("\n \u274C   ".concat(msg, "\n")));
    },
    info: function info(msg) {
      return console.log(chalk.yellow("\n \uD83C\uDF08   ".concat(msg, "\n")));
    }
  };

  /*
   * @Author: ADI
   * @Date: 2021-01-21 11:12:56
   * @LastEditors: ADI
   * @LastEditTime: 2021-01-21 22:44:44
   */

  var fs = require("fs");

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
      var content = fs.readFileSync(fileName).toString();
      var result = handlebars.compile(content)(meta);
      fs.writeFileSync(fileName, result);
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
    _createProject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dirName) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
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

  var name = "adi-cli";
  var version = "1.2.0";
  var main = "bin/index.umd.js";
  var module = "bin/index.esm.js";
  var author = "ADI <569643843@qq.com>";
  var license = "MIT";
  var bin = {
  	"adi-cli": "bin/index.umd.js"
  };
  var bugs = {
  	url: "https://github.com/13168335674/adi-cli/issues"
  };
  var homepage = "https://github.com/13168335674/adi-cli#readme";
  var scripts = {
  	lint: "eslint 'lib/**/*.{js,ts}'",
  	dev: "cross-env FORMAT=umd rollup -w -c",
  	"build:esm": "cross-env FORMAT=esm rollup -c",
  	"build:umd": "cross-env FORMAT=umd rollup -c",
  	"build:min": "cross-env FORMAT=min rollup -c",
  	build: "rimraf bin/* && run-p build:esm build:umd build:min"
  };
  var dependencies = {
  	"cli-table": "^0.3.4",
  	commander: "^6.2.1",
  	"cross-env": "^7.0.3",
  	shelljs: "^0.8.5"
  };
  var devDependencies = {
  	"@babel/core": "^7.14.6",
  	"@babel/plugin-transform-runtime": "^7.12.10",
  	"@babel/preset-env": "^7.14.7",
  	"@babel/preset-typescript": "^7.12.7",
  	"@rollup/plugin-alias": "^3.1.2",
  	"@rollup/plugin-babel": "^5.3.0",
  	"@rollup/plugin-commonjs": "^14.0.0",
  	"@rollup/plugin-node-resolve": "^9.0.0",
  	"@rollup/plugin-replace": "^4.0.0",
  	"@types/node": "^17.0.29",
  	"@typescript-eslint/eslint-plugin": "^4.14.0",
  	"@typescript-eslint/parser": "^4.14.0",
  	"@vue/cli-plugin-babel": "^4.5.13",
  	"@vue/cli-service": "^4.5.13",
  	add: "^2.0.6",
  	autoprefixer: "^9.0.0",
  	"babel-cli": "^6.26.0",
  	"babel-env": "^2.4.1",
  	chalk: "^4.1.0",
  	"cross-env": "^7.0.3",
  	"download-git-repo": "^3.0.2",
  	eslint: "^7.18.0",
  	express: "^4.17.3",
  	glob: "^7.2.0",
  	handlebars: "^4.7.6",
  	husky: "^4.3.8",
  	ini: "^2.0.0",
  	inquirer: "^7.3.3",
  	"lint-staged": "^10.5.3",
  	"lodash.merge": "^4.6.2",
  	"log-symbols": "^4.0.0",
  	minimist: "^1.2.5",
  	"node-sass": "^7.0.1",
  	"npm-run-all": "^4.1.5",
  	ora: "^5.1.0",
  	postcss: "8.1.9",
  	"postcss-loader": "4.1.0",
  	prettier: "^2.6.2",
  	rimraf: "^3.0.2",
  	rollup: "^2.52.8",
  	"rollup-plugin-alias": "^2.2.0",
  	"rollup-plugin-babel": "^4.4.0",
  	"rollup-plugin-commonjs": "^10.1.0",
  	"rollup-plugin-copy": "^3.4.0",
  	"rollup-plugin-css-only": "^3.1.0",
  	"rollup-plugin-json": "^4.0.0",
  	"rollup-plugin-node-resolve": "^5.2.0",
  	"rollup-plugin-postcss": "^4.0.2",
  	"rollup-plugin-preserve-shebang": "^1.0.1",
  	"rollup-plugin-preserve-shebangs": "^0.2.0",
  	"rollup-plugin-scss": "3",
  	"rollup-plugin-terser": "^7.0.2",
  	"rollup-plugin-typescript2": "^0.29.0",
  	"rollup-plugin-uglify": "^6.0.4",
  	"rollup-plugin-vue": "^5.1.9",
  	sass: "^1.49.0",
  	typescript: "^4.1.3",
  	vue: "^2.6.14",
  	"vue-template-compiler": "^2.6.14",
  	ws: "^8.5.0",
  	yarn: "^1.22.10"
  };
  var husky = {
  	hooks: {
  		"pre-commit": "lint-staged"
  	}
  };
  var packageInfo = {
  	name: name,
  	version: version,
  	main: main,
  	module: module,
  	author: author,
  	license: license,
  	bin: bin,
  	bugs: bugs,
  	homepage: homepage,
  	scripts: scripts,
  	dependencies: dependencies,
  	devDependencies: devDependencies,
  	husky: husky,
  	"lint-staged": {
  	"*./lib/**/*.{js,ts,json,css,less,md}": [
  		"prettier --write",
  		"yarn lint"
  	]
  }
  };

  console.log("\n\n    ___    ____  ____   ________    ____\n   /   |  / __ /  _/  / ____/ /   /  _/\n  / /| | / / / // /   / /   / /    / /\n / ___ |/ /_/ // /   / /___/ /____/ /\n/_/  |_/_____/___/   ____/_____/___/\n\n");
  program__default["default"].version(packageInfo.version, "-v, --version");
  program__default["default"].command("create <projectName>").description("create project").alias("c").action(function (projectName) {
    return createProject(projectName);
  });
  program__default["default"].command("list").description("view the list of templates").alias("l").action(function () {
    showTemplatesList();
  });
  program__default["default"].command("dev").description("dev").alias("d").action(function () {
    console.log("ADI-LOG => cwd", process.cwd());

    if (shell__default["default"].exec('git commit -am "Auto-commit"').code !== 0) {
      shell__default["default"].echo("Error: Git commit failed");
      shell__default["default"].exit(1);
    }
  }); // 其他参数

  program__default["default"].parse(process.argv);

  if (!program__default["default"].args.length) {
    program__default["default"].help();
  }

}));
