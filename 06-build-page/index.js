const fs = require("fs");
const path = require("path");

// create folder project-dist
fs.mkdir(__dirname + "/project-dist", (err) => {
  return err;
});

// read each files in source folder
let styles = [];
fs.readdir(`${__dirname}/styles`, (err, styleFiles) => {
  fs.open(`${__dirname}/project-dist/style.css`, "w", (err, data) => {
    const targetFile = `${__dirname}/project-dist/style.css`;
    const writeStream = fs.createWriteStream(targetFile, "utf-8");

    styleFiles.forEach((file) => {
      mergeStyle(file);
    });

    setTimeout(() => {
      const allStylesString = styles.reduce((acc, el) => {
        acc += el;
        return acc;
      }, "");
      writeStream.write(allStylesString);
    }, 1000);
  });
});

function mergeStyle(file) {
  const sourceFile = `${__dirname}/styles/${file}`;
  const readStream = fs.createReadStream(sourceFile);
  readStream.on("data", (chunk) => {
    const newStyleArr = [];
    newStyleArr.push(chunk.toString());
    styles.push(chunk.toString());
  });

  readStream.on("error", (err) => err);
  return file;
}

// create folder
fs.mkdir(`${__dirname}/project-dist/assets`, (err) => {
  return err;
});

//copy assets folder
fs.readdir(`${__dirname}/assets`, (err, data) => {
  data.forEach((folder) => {
    // folder =  folders in assets folder
    makeDir(folder);

    fs.readdir(`${__dirname}/assets/${folder}`, (err, data) => {
      // data = files which situated in folder
      data.forEach((file) => {
        if (file !== null) {
          // copy each file from folder to project-dist folder
          fs.copyFile(
            `${__dirname}/assets/${folder}/${file}`,
            `${__dirname}/project-dist/assets/${folder}/${file}`,
            (err) => {
              return err;
            }
          );
        }
      });
    });
  });
});

function makeDir(dir) {
  return fs.mkdir(
    `${__dirname}/project-dist/assets/${dir}`,
    { recursive: true },
    (err) => err
  );
}

const myReadStreamTemplate = fs.createReadStream(
  path.join(__dirname, "/template.html")
);

let d;
let myWriteStream;
myReadStreamTemplate.on("data", (templateData) => {
  d = templateData.toString();

  //create index.html
  fs.open(__dirname + "/project-dist/index.html", "w", (err, data) => {
    myWriteStream = fs.createWriteStream(
      __dirname + "/project-dist/index.html"
    );

    //read Components
    fs.readdir(path.join(__dirname, "/components"), (err, components) => {
      components.forEach((component) => {
        const myReadStreamComponents = fs.createReadStream(
          path.join(__dirname, "/components", component)
        );

        myReadStreamComponents.on("data", (chunk) => {
          if (component == "header.html") {
            d = d.toString().replace("{{header}}", chunk.toString());
          } else if (component == "articles.html") {
            d = d.toString().replace("{{articles}}", chunk.toString());
          } else if (component == "footer.html") {
            d = d.toString().replace("{{footer}}", chunk.toString());
          }
        });
      });
    });
  });
});

setTimeout(() => {
  myWriteStream.write(d);
}, 1000);
