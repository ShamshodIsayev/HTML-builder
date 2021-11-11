const process = require("process");
const path = require("path");
const fs = require("fs");
const { readdir } = require("fs/promises");
let result = ``;
async function showFile() {
  try {
    for (const file of await readdir(path.join(__dirname, "/secret-folder"))) {
      const files = path.join(__dirname, "/secret-folder", file);
      fs.stat(files, (err, date) => {
        if (err) {
          result += `\x1b[31mEror!\n${err}`;
        } else if (!date.isDirectory()) {
          const extName = path.extname(files);
          result += `\n\x1b[34m\x1b[32m${path.basename(files, extName)}\t\t\x1b[34m\x1b[32m${extName.substring(1)}\t\t\x1b[34m\x1b[32m${date.size} bytes\t\t\x1b[34m`;
        }
      });
    }
  } catch (err) {
    result += `\x1b[31mEror!\n${err}`;
  }
}
showFile();
process.on("beforeExit", () => {
  console.log(result);
});
