/*
 * @Author: ADI
 * @Date: 2021-01-22 21:49:29
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-23 12:20:49
 */
const path = require("path");
const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify").uglify;
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const json = require("rollup-plugin-json");
const alias = require("rollup-plugin-alias");
const merge = require("lodash.merge");
const pkg = require("./package.json");
import banner from "./lib/plugins/banner";

const extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx"];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

// 打包任务的个性化配置
const jobs = {
  esm: {
    output: {
      format: "esm",
      file: resolve(pkg.module),
    },
  },
  umd: {
    output: {
      format: "umd",
      file: resolve(pkg.main),
      name: "rem",
    },
  },
  min: {
    output: {
      format: "umd",
      file: resolve(pkg.main.replace(/(.\w+)$/, ".min$1")),
      name: "rem",
    },
    plugins: [uglify()],
  },
};

// 从环境变量获取打包特征
console.log("process.env.FORMAT", process.env.FORMAT);
const mergeConfig = jobs[process.env.FORMAT || "esm"];

module.exports = merge(
  {
    input: resolve("./lib/index.ts"),
    output: {},
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**",
        extensions,
      }),
      alias({
        resolve: extensions,
        entries: {
          "@": resolve("lib"),
        },
      }),
      commonjs(),
      json(),
      // preserveShebangs({
      //   entry: resolve("./lib/index.ts"),
      //   shebang: "#!/usr/bin/env node",
      // }),
      banner(),
    ],
    watch: {
      include: "lib/**",
    },
  },
  mergeConfig,
);
