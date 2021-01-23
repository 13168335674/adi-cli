/*
 * @Author: ADI
 * @Date: 2021-01-21 10:13:25
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-23 11:32:37
 */
const fs = require("fs");
const chalk = require("chalk");

export function hasDir(dirName) {
  return new Promise((resolve, reject) => {
    fs.exists(dirName, error => {
      if (error) {
        console.log(
          chalk.red(
            `The ${dirName} folder already exists in the current directory. Please try to use another project name!`,
          ),
        );
        process.exit(1);
      } else {
        resolve("");
      }
    });
  });
}
