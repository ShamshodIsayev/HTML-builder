const fs = require('fs')
const path = require('path')
const events = require('events')

// const EventEmitter = events
// class MyEmitter extends EventEmitter{
//   execute(asyncFunc, file) {
//     asyncFunc(file, 'utf-8',(err, data) => {
//       console.log(data);
//     })
//   }
// }


// const mit = new MyEmitter()

// mit.execute(fs.readFile, __dirname+"/text.txt")


const stream = fs.createReadStream(__dirname+'/text.txt', 'utf-8')

stream.on('data', (chunk)=> {
  console.log(chunk);
})
stream.on('error', (err) => {
  console.log(`возникла ошибка: ${data}`);
})
