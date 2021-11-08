const fs = require("fs/promises");
const { readdir, stat } = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "secret-folder");

async function init() {
  try {
    const data = await readdir(filePath);
    // const state = await stat(__filename)
    // console.log(state.size);

    data.forEach(async (file) => {
      const fileExt = path.extname(filePath + file);
      const fileExtension = fileExt.slice(1);
      const fileName = file.slice(0, file.indexOf("."));
      const fileSize = await getSizeInKBytes(filePath + "/" + file);

      console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
    });
  } catch (error) {
    console.log(error);
  }
}
init();

async function getSizeInKBytes(path) {
  try {
    const data = await stat(path);
    return data.size / 125;
  } catch (error) {
    throw error;
    console.log(error);
  }
}
