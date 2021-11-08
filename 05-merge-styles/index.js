const path = require("path");
const fs = require("fs");
const readline = require("readline");
const { readdir } = require("fs/promises");
const targetStyles = path.join(__dirname, "styles");
// const targetStyles2 = path.join(__dirname, "test-files", "styles");
const newFilePath = path.join(__dirname, "project-dist");

let array = [];

function getStyles(dir) {
  fs.readdir(dir, (err, files) => {
    files.forEach((file) => {
      if (path.extname(dir + "/" + file) === ".css") {
        const readStream = fs.createReadStream(dir + "/" + file);
        readStream.on("data", (chunk) => {
          array.push(chunk.toString());
          mergeStyles(chunk);
        });
        readStream.on("error", (err) => console.log(err));
      }
    });
  });
  return array;
}

function mergeStyles(el) {
  fs.open(newFilePath + "/bundle.css", "w", (err, data) => {
    if (err) throw err;
    const writeStream = fs.createWriteStream(
      newFilePath + "/bundle.css",
      "utf-8"
    );
    writeStream.write(el);
  });
}

async function initFunctions() {
  await getStyles(targetStyles);
  // await getStyles(targetStyles2);
}

initFunctions().then((i) => i);
