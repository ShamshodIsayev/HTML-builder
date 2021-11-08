const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { stdin, stdout } = require("process");
const rl = readline.createInterface(stdin, stdout);

const newFilePath = path.join(__dirname, "newText.txt");
const writeStream = fs.createWriteStream(newFilePath, "utf8");
const farewell = () => stdout.write("Bye \n");

rl.on("line", (a) => {
  if (a === "exit") {
    farewell();
    rl.pause();
  }
  writeStream.write(a + "\n");
});

rl.on("SIGINT", () => {
  farewell();
  rl.pause();
});

stdout.write("Hello, created new file, write something \n");
writeStream.write("Hello, it is new file");
