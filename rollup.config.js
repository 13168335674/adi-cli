/*
 * @Author: ADI
 * @Date: 2020-12-27 14:08:57
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-21 22:33:40
 */
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import alias from "rollup-plugin-alias";
import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
const { preserveShebangs } = require("rollup-plugin-preserve-shebangs");
const path = require("path");

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

module.exports = {
  input: resolve("./lib/index.ts"),
  output: {
    file: resolve("./", require("./package.json").main), // 为了项目的统一性，这里读取 package.json 中的配置项
    format: "cjs",
  },
  plugins: [
    alias({
      resolve: extensions,
      entries: {
        "@": resolve("lib"),
      },
    }),
    preserveShebangs(),
    commonjs(),
    json(),
    nodeResolve({
      extensions,
      // modulesOnly: true,
    }),
    babel({
      runtimeHelpers: true,
      exclude: "node_modules/**", // only transpile our source code
      presets: ["@babel/preset-env"],
      exclude: "node_modules/**",
      extensions,
    }),
  ],
  watch: {
    include: "lib/**",
  },
};
