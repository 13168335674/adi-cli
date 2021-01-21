/*
 * @Author: ADI
 * @Date: 2021-01-21 10:17:17
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-21 10:17:17
 */
const child_process = require("child_process");

/**
 * @description: 检测包管理器 优先级 yarn > cnpm > npm
 * @return {String}
 */

/* eslint-disable */
function packageManagement() {
  try {
    child_process.execSync("yarnpkg --version", { stdio: "ignore" });
    return "yarn";
  } catch (e) {
    return "npm";
  }
}
/* eslint-enable */

module.exports = packageManagement;
