import fs from "fs";
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import minimist from "minimist";
import autoprefixer from "autoprefixer";
import copy from "rollup-plugin-copy";
import { entries } from "./utils/index.ts";
import CONFIG from "./config/index.ts";
import { ReloadPlugin } from "./plugins/rollup-reload-plugin.ts";
import { ServeLogPlugin } from "./plugins/rollup-serve-log-plugin.ts";
// import css from 'rollup-plugin-css-only';
// import CleanCSS from 'clean-css';

const isDev = process.env.NODE_ENV === "development";
const isPro = !isDev;

// console.log(`ADI-LOG => process.env.NODE_ENV`, process.env.NODE_ENV);

// 提取babel预置环境配置，结合ESbrowserslist
const esbrowserslist = fs
  .readFileSync("./.browserslistrc")
  .toString()
  .split("\n")
  .filter(entry => entry && entry.substring(0, 2) !== "ie");

// const babelPresetEnvConfig = require('../babel.config').presets.filter(
//   entry => entry[0] === '@babel/preset-env',
// )?.[0]?.[1];

const argv = minimist(process.argv.slice(2));

const resolveRoot = path.resolve(__dirname, "..");

const baseConfig = {
  plugins: {
    replace: {
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    },
    preVue: [
      alias({
        entries: [
          {
            find: "@",
            replacement: `${path.resolve(resolveRoot, "res/version2/js")}`,
          },
        ],
      }),
    ],
    vue: {
      css: true,
      style: {
        postcssPlugins: [autoprefixer],
      },
      template: {
        isProduction: isPro,
      },
    },
    postVue: [
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".scss", ".sass"],
      }),
      commonjs(),
    ],
    babel: {
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      babelHelpers: "bundled",
    },
    resolve: { mainFields: ["module", "jsnext", "main", "browser"] },
    postcss: {
      extract: true,
      inject: false,
      minimize: isPro,
      plugins: [autoprefixer()],
    },
  },
  watch: {
    include: "res/**",
  },
};

// ESM/UMD/IIFE 共享设置: externals
// https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  "vue",
];

// UMD/IIFE 共享设置: output.globals
// https://rollupjs.org/guide/en#output-globals
const globals = {
  // 提供全局变量名来替换外部导入
  vue: "Vue",
  jquery: "$",
};

// Targets
const buildFormats = [];

entries.forEach(
  (
    {
      name,
      jsInput: input,
      jsOutput: output,
      cssInput,
      cssOutput,
      cssOutputPath,
    },
    index,
  ) => {
    const isLast = index === entries.length - 1;
    const unpkgConfig = {
      ...baseConfig,
      input,
      external,
      output: {
        compact: true,
        file: output,
        format: "iife",
        name,
        exports: "auto",
        globals,
      },
      plugins: [
        replace(baseConfig.plugins.replace),
        ...baseConfig.plugins.preVue,
        vue({ ...baseConfig.plugins.vue }),
        ...baseConfig.plugins.postVue,
        postcss({
          ...baseConfig.plugins.postcss,
          ...{ extract: cssOutput },
        }),
        babel(baseConfig.plugins.babel),
        CONFIG.CSS_EXTRACT &&
          copy({
            targets: [
              {
                src: cssInput,
                dest: CONFIG.CSS_OUTPUT_PATH,
              },
            ],
          }),
        false &&
          isPro &&
          terser({
            output: {
              ecma: 5,
            },
          }),
        isLast && new ServeLogPlugin(),
        isDev && ReloadPlugin(),
      ],
    };
    buildFormats.push(unpkgConfig);
  },
);

// console.log(`ADI-LOG => buildFormats`, JSON.stringify(buildFormats, null, 2));

export default buildFormats;
