/*
 * @Author: ADI
 * @Date: 2021-01-21 10:46:01
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-23 11:31:13
 */
import { hasDir } from "@/utils/file";
import { downloadTemplate } from "@/utils/git";
import templates from "../config/templates.json";
const inquirer = require("inquirer");

export async function createProject(dirName) {
  await hasDir(dirName);
  inquirer
    .prompt([
      {
        name: "templateType",
        message: "which template type you need to create?",
        type: "list",
        choices: Object.keys(templates),
      },
      {
        name: "description",
        message: "please enter a description:",
        default: dirName,
      },
      {
        name: "author",
        message: "please enter a author:",
        default: "author",
      },
    ])
    .then(answers => {
      const { downloadUrl } = templates[answers.templateType];
      downloadTemplate(dirName, downloadUrl, answers);
    });
}
