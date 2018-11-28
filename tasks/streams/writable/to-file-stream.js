const stream = require('stream');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

class ToFileStream extends stream.Writable {
    constructor() {
        super({objectMode: true});
    }

    _write(chunk, encoding, callback) {
        mkdirp(path.dirname(chunk.path), err => {
            if (err) {
                return callback(err);
            }
            fs.writeFile(chunk.path, chunk.content, callback);
        })
    }
}


const tfs = new ToFileStream();
tfs.write({path: "file1.txt", content: "Hello"}, (e, d) => {
});

tfs.write({path: "file2.txt", content: "Node.js"});
tfs.write({path: "file3.txt", content: "Streams"})
tfs.end(() => console.log("All files created"));