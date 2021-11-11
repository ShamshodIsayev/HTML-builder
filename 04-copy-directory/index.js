const fs = require("fs");
const promises = fs.promises;
const path = require("path");
const source = path.join(__dirname, "files");
const target = path.join(__dirname, "files-copy");
let res = ``;
let res2 = "";
promises
  .mkdir(target)
  .then(() => {
    console.log("files created");
  })
  .catch(() => {
    console.log("files were in your directory");
  });

res += "\n";
fs.readdir(source, (err, file) => {
  let check = 0;
  console.log(`copying-files ...`);
  file.forEach((current, i) => {
    fs.copyFile(`${source}/${current}`, `${target}/${current}`, (err) => {
      if (!err) {
        check++;
        res += ` ${current}  \n`;
      } else {
        console.log("err\x1b[35m", err);
      }
    });
  });
});

const process = require("process");
process.on("beforeExit", () => {
  res2 += `\n please run for 1 more time`;
  res2 += res;
  res2 += `thank you!\n`;
  console.log(res2);
});
