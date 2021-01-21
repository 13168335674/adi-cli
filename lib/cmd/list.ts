/*
 * @Author: ADI
 * @Date: 2021-01-21 22:28:13
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-21 22:31:36
 */
import { tableList } from "@/utils/table";
import templates from "../config/templates.json";

export function showTemplatesList() {
  tableList(templates);
}
