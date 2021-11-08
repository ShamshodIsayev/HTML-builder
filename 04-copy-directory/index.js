const fs = require("fs");
const path = require("path");
const readLine = require("readline");
const fileDir = path.join(__dirname, "files");
const newFilePath = path.join(__dirname, "files-copy");

fs.readdir(fileDir, (err,files) => {
  files.forEach(file => {
    fs.copyFile(fileDir+'/'+file, newFilePath+'/'+file, (err) => {
});
  })
})

fs.mkdir(newFilePath, { recursive: true }, (err) => {
  console.log("create");
});
console.log(newFilePath);
