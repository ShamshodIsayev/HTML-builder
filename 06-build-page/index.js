const fs = require('fs');
const path = require('path');
const projectDist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
const styles = path.join(__dirname, 'styles');
const targetIndex = path.join(projectDist, 'index.html');
const tarAssets = path.join(projectDist, 'assets');
const assets = path.join(__dirname, 'assets');
const targetStyle = path.join(projectDist, 'style.css');
const components = path.join(__dirname, 'components');
let trueMessage = false;
let message = '';
let trueMessage2 = false;

let countOfTable=0;

fs.readFile(template, 'utf-8', (err, data) => {
    if (err) {
        console.log('err\x1b[35m', err);
    }
    fs.writeFile(targetIndex, data, 'utf-8', (err) => {
        if (err) {
            console.log('err\x1b[35m', err);
        }
    })
    fs.readFile(targetIndex, 'utf-8', (err, dataOftargetIndex) => {
        if (err) {
            console.log('err\x1b[35m', err);
        }
        fs.readdir(components, (err, componentData) => {
            if (err) {
                console.log('err\x1b[35m', err);
            }
            message += '\x1b[37m\nCopy files\t|';
            componentData.forEach(fileOfIndex => {
                let pathForIndex = path.join(components, fileOfIndex)
                let createNameOfHtml = fileOfIndex.split('.')[0]
                fs.readFile(pathForIndex, 'utf-8', (err, dataOfHtml) => {
                    if (err) {
                        console.log('err\x1b[35m', err);
                    }
                    dataOftargetIndex = dataOftargetIndex.replace(new RegExp(`{{${createNameOfHtml}}}`, 'g'), dataOfHtml)
                    fs.writeFile(targetIndex, dataOftargetIndex, 'utf-8', (err) => {
                        if  (trueMessage == false){
                        message += '\x1b[37m\nAdd on HTML\t|';  trueMessage = true}
                        message += ` \x1b[34m${createNameOfHtml} \x1b[37m|`;
                        if (err) {
                            console.log('err\x1b[35m', err);
                        }
                    })

                })
            })
        })
    });
})


fs.readdir(styles, (err, files) => {
    fs.mkdir(tarAssets, (err) => {
      fs.mkdir(projectDist, err => {
        message += `\x1b[37mIf no dir, \t|\x1b[36m${projectDist}\x1b[37m| \x1b[33mi am create it!\x1b[37m\n`;
        message += `\x1b[37mIf no dir, \t|\x1b[36m${tarAssets}\x1b[37m| \x1b[33mi am create it!\x1b[37m\n`;
        })
    })
    if (err) {
        console.log('err\x1b[35m', err);
    }
    files.forEach(file => {
        let fileOfCss = path.extname(file).slice(1);
        if(fileOfCss === 'css') {
            let fileOfStyle = path.join(styles, file);
            fs.readFile(fileOfStyle, 'utf-8', (err, data) => {
                if (err) {
                    console.log('err\x1b[35m', err);
                }
                fs.appendFile(targetStyle, data+'\n', (err) => {
                    if  (trueMessage2 == false){
                        message += '\x1b[37mSplit CSS files |';
                        trueMessage2 = true
                    }

                    message += ` \x1b[33m${file} \x1b[37m|`;

                    if (err) {
                        console.log('err\x1b[35m', err);
                    }
                })
            })
        }
    })
})


fs.readdir(assets, (err, dates_) => {
    if (err) {
        console.log('err\x1b[35m', err);
    }
    dates_.forEach(files => {
        let fileOfAssets = path.join(tarAssets, files);
        fs.mkdir(fileOfAssets, {recursive: true} , err => {
            if (err) {
                console.log('err\x1b[35m', err);
            }
        })
        let fileForAssets = path.join(assets, files);
        fs.readdir(fileForAssets, (err, dataForAssets) => {
            if (err) {
                console.log('err\x1b[35m', err);
            }
            dataForAssets.forEach(fileCopyAssets => {
                let full = path.join(fileForAssets, fileCopyAssets)
                fs.readFile(full, 'utf-8', (err, data) => {
                    if (err) {
                        console.log('err\x1b[35m', err);
                    }
                    let dataOfAssetsFile = path.join(fileOfAssets, fileCopyAssets)
                    fs.appendFile(dataOfAssetsFile, data, (err) => {
                    countOfTable +=1;
                    if (countOfTable==5) {
                        message +=`\n\t\t|`
                        countOfTable=0;
                    }
                        message +=` \x1b[32m${fileCopyAssets} \x1b[37m|`
                        if (err) {
                            console.log('err\x1b[35m', err);
                        }
                    })
                })
            })
        })
    })
})
const process = require('process');