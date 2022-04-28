import path from 'path';

const __dirname = path.resolve();
// utils: current module absolute path
const _resolveRoot = dir => path.join(__dirname, '../../', dir);

// JS打包配置
const jsConfig = {
  input: 'res/version2/js/**/index.mjs',
  output: 'index.src.js',
  outputPath: '[origin]',
};

// CSS打包配置
const cssConfig = {
  extract: true,
  input: '[origin]',
  output: '[name].src.css',
  outputPath: 'res/version2/css/',
};

const RELOAD_CONFIG = {
  port: 5000,
};

export default {
  JS_INPUT: jsConfig.input,
  JS_OUTPUT: jsConfig.output,
  JS_OUTPUT_PATH: jsConfig.outputPath,
  CSS_EXTRACT: cssConfig.extract,
  CSS_INPUT: cssConfig.input,
  CSS_OUTPUT: cssConfig.output,
  CSS_OUTPUT_PATH: cssConfig.outputPath,
  RELOAD_CONFIG: RELOAD_CONFIG,
};
