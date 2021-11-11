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
          result += `${path.basename(files, extName)}-${extName.substring(1)}-${date.size} bytes\n`;
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