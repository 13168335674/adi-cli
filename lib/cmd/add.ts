/*
 * @Author: ADI
 * @Date: 2021-01-22 18:06:32
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-22 18:26:12
 */
import inquirer from "inquirer";
import templates from "../config/templates.json";
import tips from "@/utils/tips";
import { tableList } from '@/utils/table';
const fs = require('fs');

const handleWriteFile = (err) => {
  if (err) {
    tips.fail('please run it again!');
    process.exit();
  }
  tableList(templates);
  tips.success('successfully added!');
  process.exit();
};

const addTemplates = template => {
  const { templateName, url, downloadUrl, description } = template;
  if (!templates[templateName]) {
    templates[templateName] = {};
    templates[templateName]['url'] = url;
    templates[templateName]['downloadUrl'] = downloadUrl.replace(/[\u0000-\u0019]/g, ''); // 过滤unicode字符
    templates[templateName]['description'] = description;
  } else {
    tips.fail('the template already exists!');
    process.exit(1);
  };

  // 把模板信息写入templates.json
  fs.writeFile(__dirname + '../templates.json', JSON.stringify(templates), 'utf-8', handleWriteFile);
};

function addTemplate() {
  inquirer
    .prompt([
      {
        name: "templateName",
        message: "please enter a template name:",
      },
      {
        name: "url",
        message: "please enter a github link:",
      },
      {
        name: "downloadUrl",
        message: "please enter a download url:",
      },
      {
        name: "description",
        message: "please enter a description:",
        default: "description",
      },
    ])
    .then(answers => {
      addTemplates(answers);
    });
}
