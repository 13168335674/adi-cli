/*
 * @Author: ADI
 * @Date: 2021-01-21 09:52:57
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-23 11:31:36
 */
const chalk = require('chalk');

export default {
  success: msg => console.log(chalk.green.bold(`\n ✅   ${msg}\n`)),
  fail: msg => console.log(chalk.red.bold(`\n ❌   ${msg}\n`)),
  info: msg => console.log(chalk.yellow(`\n 🌈   ${msg}\n`)),
};
