/*
 * @Author: ADI
 * @Date: 2021-01-21 09:58:59
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-21 22:27:16
 */
import tips from "./tips";
const Table = require("cli-table");

const table = new Table({
  head: ["name", "description"],
  style: {
    head: ["cyan"],
  },
});

export function tableList(config) {
  const keys = Object.keys(config);
  if (keys.length) {
    keys.forEach(key => {
      table.push([`${key}`, config[key].description]);
    });
    const tableListStr = table.toString();
    if (tableListStr) {
      tips.info("当前模板列表: ");
      console.log(`${tableListStr}\n`);
    } else {
      tips.fail("模板文件不存在!");
    }
  } else {
    tips.fail("模板文件不存在!");
  }
}
