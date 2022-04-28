import path from 'path';
import glob from 'glob';
import CONFIG from '../config/index.ts';

const __dirname = path.resolve();

const resolveRoot = dir => path.join(__dirname, dir);
const ORIGIN = '[origin]';
const getEntryConfig = entry => {
  const entryArr = entry.split('/');
  const name = generateDirName(entryArr);
  const nameReg = /\[name\]/g;
  return {
    name,
    nameReg,
    entryArr,
  };
};

const generateDirName = entryArr => entryArr.slice(-2, -1).join('/');
const generateJsOutput = entry => {
  const { name, nameReg, entryArr } = getEntryConfig(entry);
  const jsOutput = CONFIG.JS_OUTPUT.replace(nameReg, name);
  if (CONFIG.JS_OUTPUT_PATH === ORIGIN) {
    return entry.replace(entryArr[entryArr.length - 1], jsOutput);
  }
  return jsOutput;
};
const generateCssOutput = entry => {
  const { name, nameReg } = getEntryConfig(entry);
  const cssOutput = CONFIG.CSS_OUTPUT.replace(nameReg, name);
  return cssOutput;
};
const generateCssInput = entry => {
  const { name, nameReg, entryArr } = getEntryConfig(entry);
  const cssOutput = CONFIG.CSS_OUTPUT.replace(nameReg, name);
  if (CONFIG.CSS_INPUT === ORIGIN) {
    return entry.replace(entryArr[entryArr.length - 1], cssOutput);
  }
  return CONFIG.CSS_INPUT;
};
const generateCssOutputPath = entry => {
  const { name, nameReg, entryArr } = getEntryConfig(entry);
  const cssOutput = CONFIG.CSS_OUTPUT.replace(nameReg, name);
  if (CONFIG.CSS_OUTPUT_PATH === ORIGIN) {
    return entry.replace(entryArr[entryArr.length - 1], cssOutput);
  }
  return CONFIG.CSS_OUTPUT_PATH + cssOutput;
};

const entries = getEntry(); // 获得入口 js 文件
// console.log(`ADI-LOG => entries`, entries);

function getEntry(globPath = CONFIG.JS_INPUT) {
  const res = [];

  glob.sync(globPath).forEach(function (entry) {
    const entryArr = entry.split('/');
    const name = generateDirName(entryArr);
    const jsOutput = resolveRoot(generateJsOutput(entry));
    const cssInput = resolveRoot(generateCssInput(entry));
    const cssOutput = resolveRoot(generateCssOutput(entry));
    const cssOutputPath = resolveRoot(generateCssOutputPath(entry));

    res.push({
      name,
      jsInput: resolveRoot(entry),
      jsOutput,
      cssInput,
      cssOutput,
      cssOutputPath,
    });
  });
  return res;
}

export { entries };
