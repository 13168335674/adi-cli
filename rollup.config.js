/*
 * @Author: ADI
 * @Date: 2021-01-22 21:49:29
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2022-04-27 15:48:34
 */
import path from "path";
import babel from "@rollup/plugin-babel";
import {uglify} from "rollup-plugin-uglify";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "rollup-plugin-json";
import alias from '@rollup/plugin-alias';
import {merge} from "lodash";
import pkg from "./package.json";
// import banner from "./lib/plugins/banner";
console.log(`ADI-LOG => babel`, babel);

const extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx"];
const banner = "#!/usr/bin/env node";

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

// 打包任务的个性化配置
const jobs = {
  esm: {
    output: {
      format: "esm",
      file: resolve(pkg.module),
      banner,
    },
  },
  umd: {
    output: {
      format: "umd",
      file: resolve(pkg.main),
      name: "adi-cli",
      banner,
    },
  },
  min: {
    output: {
      format: "umd",
      file: resolve(pkg.main.replace(/(.\w+)$/, ".min$1")),
      name: "adi-cli",
      banner,
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
      // banner(),
    ],
    watch: {
      include: "lib/**",
    },
  },
  mergeConfig,
);
