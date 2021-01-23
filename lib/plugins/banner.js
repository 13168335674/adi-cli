/*
 * @Author: ADI
 * @Date: 2021-01-23 09:08:26
 * @LastEditors: ADI
 * @LastEditTime: 2021-01-23 11:27:44
 */
/**
 * 小丑竟是我自己
 */
// const fs = require("fs");
// const path = require("path");
// const writeStrToHeader = (file, content) => {
//   console.log("file :>> ", file);
//   let data = "";
//   let stream = fs.createReadStream(file);
//   stream.unshift(Buffer.from(`${content}\n`));
//   stream.on("data", function (chunk) {
//     data += chunk;
//   });
//   stream.on("end", function () {
//     fs.writeFile(file, data, err => {
//       console.log("err :>> ", err);
//     });
//   });
// };
// function writeShebangs(outputDir) {
//   fs.readdir(outputDir, function (err, files) {
//     if (err) {
//       return console.log("目录不存在", outputDir);
//     }
//     console.log("files :>> ", files);
//     files.forEach(file => {
//       writeStrToHeader(path.resolve(outputDir, file), "#!/usr/bin/env node");
//     });
//   });
// }

// rollup plugin hooks
// https://www.rollupjs.com/guide/plugin-development#renderchunk
export default function banner(options = { banner: "#!/usr/bin/env node" }) {
  return {
    name: "banner",
    renderChunk(code) {
      return `${options.banner}\n${code}`;
    },
  };
}
