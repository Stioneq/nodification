/*
    [ 1 byte Channel ID | 4 bytes Content-Length | data
 */

const child_process = require('child_process');
const net = require('net');

function mux(sources, destination) {
    let totalChannels = sources.length;
    for (let i = 0; i < sources.length; i++) {
        sources[i]
            .on('readable', function() {
                let chunk;
                while((chunk = this.read()) !== null){
                    const buf = Buffer.alloc(1 + 4 + chunk.length);
                    buf.writeUInt8(i, 0);
                    buf.writeUInt32BE(chunk.length, 1);
                    chunk.copy(buf, 5);
                    destination.write(buf);
                }
        }).on('end', () => {
            if(--totalChannels === 0){
                destination.end();
            }
        });
    }
}

const socket = net.connect(3000, () => {
    // silent true means that child std* pipe to the parent
   const child = child_process.fork(process.argv[2], process.argv.slice(3), {silent: true});
   mux([child.stdout, child.stderr], socket);
});

//child_process.fork(process.argv[2], )