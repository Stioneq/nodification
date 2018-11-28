/*
    [ 1 byte Channel ID | 4 bytes Content-Length | data
 */

const net = require('net');
const fs = require('fs');

function demux(source, destinations) {
    let chanId;
    let contentSize;
    console.log('dasdas');
    source.on('readable', function(){
        console.log('Become readable');
        let chunk;
        if (!chanId) {
            chunk = this.read(1);
            chanId = chunk && chunk.readUInt8(0);
        }
        if (!contentSize) {
            chunk = this.read(4);
            contentSize = chunk && chunk.readUInt32BE(0);
        }
        if (!contentSize) {
            return;
        }
        chunk = this.read(contentSize)
        if (!chunk) {
            return;
        }
        destinations[chanId].write(chunk);
        chanId = null;
        contentSize = null;


    })
        .on('end', () => {
            destinations.forEach(d => d.end());
        });
}

net.createServer(socket => {
    // silent true means that child std* pipe to the parent
    console.log(111);
    const stdoutStream = fs.createWriteStream('stdout.log');
    const stderrStream = fs.createWriteStream('stderr.log');
    demux(socket, [stdoutStream, stderrStream]);
}).listen(3000)
    .on('error', (err) => console.log(err));

//child_process.fork(process.argv[2], )