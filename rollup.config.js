/*
 * @Author: ADI
 * @Date: 2021-01-22 21:49:29
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-22 23:13:46
 */
const nodeResolve = require("rollup-plugin-node-resolve");
const path = require("path");
const babel = require("rollup-plugin-babel");
const uglify = require("rollup-plugin-uglify").uglify;
const merge = require("lodash.merge");
const pkg = require("./package.json");
import json from "rollup-plugin-json";
import alias from "rollup-plugin-alias";

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
    input: resolve("./src/index.ts"),
    output: {},
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
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
    ],
    watch: {
      include: "lib/**",
    },
  },
  mergeConfig,
);
