const jot = require('json-over-tcp');


jot.createServer((socket) => {
    socket.pipe(process.stdout);
}).listen(5000, () => console.log('started'));